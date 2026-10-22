-- MIOS — RLS, version and invoice-number check
-- Run in the Supabase SQL Editor AFTER 0001_mios_records.sql is applied and
-- you have signed in to MIOS once (so your account exists). Changes nothing:
-- every write it makes is undone at the end, and a failed check aborts the
-- whole block, which undoes it too.
--
-- It uses your account (the oldest one; sign-ups are off, so it is yours)
-- and a made-up stranger, and confirms:
--   1. the three tables have row rules on, and anon can reach none of them
--   2. a record you save starts at version 1 and each update moves it on
--   3. an update carrying an old version is refused ("stale_version")
--   4. a record's keys cannot be changed by an update
--   5. invoice numbers: one per invoice, in order, the same number when the
--      same invoice asks again, never shared, and never written directly
--   6. the stranger sees none of your rows and cannot write under your id
-- A failed check stops with "RLS CHECK FAILED: …".
-- Success shows one row: "RLS check passed".
--
-- One DO block on purpose: the checks must run in one transaction, so a
-- failure undoes everything the block tried.

do $$
declare
  me uuid;
  stranger constant uuid := '00000000-0000-0000-0000-00000000beef';
  n int;
  n1 int;
  n2 int;
  t text;
begin
  -- 0. The migration is in.
  foreach t in array array['mios_records', 'mios_invoice_counters', 'mios_invoice_numbers'] loop
    if to_regclass('public.' || t) is null then
      raise exception 'RLS CHECK FAILED: table % is missing. Run 0001_mios_records.sql first.', t;
    end if;
  end loop;
  if to_regprocedure('public.mios_give_invoice_number(text, integer)') is null then
    raise exception 'RLS CHECK FAILED: mios_give_invoice_number is missing. Run 0001_mios_records.sql first.';
  end if;

  select id into me from auth.users order by created_at limit 1;
  if me is null then
    raise exception 'RLS CHECK FAILED: no account yet. Sign in to MIOS once first.';
  end if;

  -- 1. Row rules on; nothing for anon.
  foreach t in array array['mios_records', 'mios_invoice_counters', 'mios_invoice_numbers'] loop
    if not (select relrowsecurity from pg_class where oid = ('public.' || t)::regclass) then
      raise exception 'RLS CHECK FAILED: row level security is off on %', t;
    end if;
    if has_table_privilege('anon', 'public.' || t, 'select, insert, update, delete') then
      raise exception 'RLS CHECK FAILED: anon can reach %', t;
    end if;
  end loop;
  if has_function_privilege('anon', 'public.mios_give_invoice_number(text, integer)', 'execute') then
    raise exception 'RLS CHECK FAILED: anon can ask for an invoice number';
  end if;

  -- Everything below is undone by the last line of this inner block.
  begin
    -- 2–5. As you.
    perform set_config('request.jwt.claims',
      json_build_object('sub', me, 'role', 'authenticated')::text, true);
    set local role authenticated;

    insert into public.mios_records (user_id, collection, record_id, data, version, updated_by_device)
      values (me, '_rls_check', 'r1', '{"a": 1}', 99, 'rls-check');
    select version into n from public.mios_records
      where user_id = me and collection = '_rls_check' and record_id = 'r1';
    if n <> 1 then
      raise exception 'RLS CHECK FAILED: a new record started at version %, not 1', n;
    end if;

    update public.mios_records set data = '{"a": 2}', version = 1
      where user_id = me and collection = '_rls_check' and record_id = 'r1';
    select version into n from public.mios_records
      where user_id = me and collection = '_rls_check' and record_id = 'r1';
    if n <> 2 then
      raise exception 'RLS CHECK FAILED: an update moved the version to %, not 2', n;
    end if;

    begin
      update public.mios_records set data = '{"a": 3}', version = 1
        where user_id = me and collection = '_rls_check' and record_id = 'r1';
      raise exception 'RLS CHECK FAILED: an update carrying an old version was accepted';
    exception when raise_exception then
      if sqlerrm <> 'stale_version' then raise; end if;  -- refused, as it should be
    end;

    begin
      update public.mios_records set record_id = 'r2', version = 2
        where user_id = me and collection = '_rls_check' and record_id = 'r1';
      raise exception 'RLS CHECK FAILED: an update changed a record''s keys';
    exception when raise_exception then
      if sqlerrm <> 'record_keys_fixed' then raise; end if;  -- refused, as it should be
    end;

    n1 := public.mios_give_invoice_number('_rls_check_a', 0);
    n2 := public.mios_give_invoice_number('_rls_check_b', 0);
    if n2 <> n1 + 1 then
      raise exception 'RLS CHECK FAILED: invoice numbers % then % are not in order', n1, n2;
    end if;
    if public.mios_give_invoice_number('_rls_check_a', 0) <> n1 then
      raise exception 'RLS CHECK FAILED: the same invoice was given a second number';
    end if;
    n := public.mios_give_invoice_number('_rls_check_c', n2 + 10);
    if n <> n2 + 11 then
      raise exception 'RLS CHECK FAILED: numbering after % gave %, not %', n2 + 10, n, n2 + 11;
    end if;

    begin
      insert into public.mios_invoice_numbers (user_id, record_id, number)
        values (me, '_rls_check_d', n1);
      raise exception 'RLS CHECK FAILED: an invoice number could be written directly';
    exception when insufficient_privilege then null;  -- refused, as it should be
    end;
    begin
      update public.mios_invoice_counters set last_number = 0 where user_id = me;
      raise exception 'RLS CHECK FAILED: the invoice counter could be changed directly';
    exception when insufficient_privilege then null;  -- refused, as it should be
    end;

    -- Never shared, even by the dashboard role writing directly.
    reset role;
    begin
      insert into public.mios_invoice_numbers (user_id, record_id, number)
        values (me, '_rls_check_d', n1);
      raise exception 'RLS CHECK FAILED: two invoices could share number %', n1;
    exception when unique_violation then null;  -- refused, as it should be
    end;

    -- 6. As a stranger.
    perform set_config('request.jwt.claims',
      json_build_object('sub', stranger, 'role', 'authenticated')::text, true);
    set local role authenticated;

    select (select count(*) from public.mios_records where user_id = me)
         + (select count(*) from public.mios_invoice_counters where user_id = me)
         + (select count(*) from public.mios_invoice_numbers where user_id = me) into n;
    if n <> 0 then
      raise exception 'RLS CHECK FAILED: another user can see % of your rows', n;
    end if;

    begin
      insert into public.mios_records (user_id, collection, record_id, data)
        values (me, '_rls_check', 'r9', '{}');
      raise exception 'RLS CHECK FAILED: another user could write a record under your id';
    exception when insufficient_privilege then null;  -- refused, as it should be
    end;

    update public.mios_records set deleted = true, version = 2 where user_id = me;
    get diagnostics n = row_count;
    if n <> 0 then
      raise exception 'RLS CHECK FAILED: another user changed % of your records', n;
    end if;

    delete from public.mios_records where user_id = me;
    get diagnostics n = row_count;
    if n <> 0 then
      raise exception 'RLS CHECK FAILED: another user deleted % of your records', n;
    end if;

    -- 7. Signed out (anon): no way in.
    perform set_config('request.jwt.claims', '', true);
    set local role anon;
    begin
      perform count(*) from public.mios_records;
      raise exception 'RLS CHECK FAILED: a signed-out visitor could read records';
    exception when insufficient_privilege then null;  -- refused, as it should be
    end;
    begin
      perform public.mios_give_invoice_number('_rls_check_e', 0);
      raise exception 'RLS CHECK FAILED: a signed-out visitor got an invoice number';
    exception when insufficient_privilege then null;  -- refused, as it should be
    end;

    raise exception using errcode = 'MC001', message = 'undo the check''s writes';
  exception when sqlstate 'MC001' then
    null;  -- every write above is undone; role and claims are back as they were
  end;

  perform set_config('rls_check.done', 'yes', false);
end $$;

-- Reached only if every check above passed.
select case
  when current_setting('rls_check.done', true) = 'yes' then 'RLS check passed'
  else 'RLS check did not finish'
end as result;
