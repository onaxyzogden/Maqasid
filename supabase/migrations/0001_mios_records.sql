-- MIOS — account records (cloud re-platform, Phase 2)
-- Apply in the Supabase dashboard (SQL editor) or with `supabase db push`.
-- Then run supabase/checks/rls_check.sql. See SETUP.md.
--
-- One table holds every synced record. Each persisted array key in the app
-- (expenses, tasks_<projectId>, office_messages, …) is a collection and each
-- item with an id is a record; a scalar or object key is the one record of a
-- collection named "_single". Deletes are soft (deleted = true) so another
-- device learns of them. Nothing here is readable without signing in.

-- ---------------------------------------------------------------------
-- mios_records
-- ---------------------------------------------------------------------
create table public.mios_records (
  user_id uuid not null references auth.users (id) on delete cascade,
  collection text not null check (char_length(collection) between 1 and 100),
  record_id text not null check (char_length(record_id) between 1 and 200),
  data jsonb,
  version int not null default 1,
  deleted boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by_device text check (char_length(updated_by_device) <= 100),
  primary key (user_id, collection, record_id)
);

-- The pull on start asks for "everything of mine changed since my cursor".
create index mios_records_pull on public.mios_records (user_id, updated_at);

-- Optimistic concurrency. A new record starts at version 1. Every update
-- must send the version it was based on; a stale one is refused, never
-- merged, so the app can show its "Changed elsewhere" choice. The server
-- sets version and updated_at; the app cannot.
--
-- updated_at is the transaction's start time, so a slow write can commit
-- with a time just before another device's cursor. The pull therefore
-- asks from a little before its cursor and drops rows whose version it
-- already has (Phase 4).
create or replace function public.mios_records_version()
returns trigger language plpgsql as $$
begin
  if tg_op = 'INSERT' then
    new.version := 1;
  else
    if (new.user_id, new.collection, new.record_id)
       is distinct from (old.user_id, old.collection, old.record_id) then
      raise exception 'record_keys_fixed' using errcode = 'P0001';
    end if;
    if new.version is distinct from old.version then
      raise exception 'stale_version' using errcode = 'P0001';
    end if;
    new.version := old.version + 1;
  end if;
  new.updated_at := now();
  return new;
end $$;

create trigger mios_records_version
  before insert or update on public.mios_records
  for each row execute function public.mios_records_version();

alter table public.mios_records enable row level security;

create policy mios_records_select on public.mios_records
  for select to authenticated using (user_id = auth.uid());
create policy mios_records_insert on public.mios_records
  for insert to authenticated with check (user_id = auth.uid());
create policy mios_records_update on public.mios_records
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy mios_records_delete on public.mios_records
  for delete to authenticated using (user_id = auth.uid());

-- ---------------------------------------------------------------------
-- Invoice numbers, given by the server the first time an invoice is sent.
-- Two devices offline can each make an invoice; only the server numbers
-- them, so no two share a number. The app's own counter (inv_counter)
-- stays on the device and is never synced.
-- ---------------------------------------------------------------------
create table public.mios_invoice_counters (
  user_id uuid primary key references auth.users (id) on delete cascade,
  last_number int not null default 0 check (last_number >= 0)
);

create table public.mios_invoice_numbers (
  user_id uuid not null references auth.users (id) on delete cascade,
  record_id text not null check (char_length(record_id) between 1 and 200),
  number int not null check (number > 0),
  given_at timestamptz not null default now(),
  primary key (user_id, record_id),
  unique (user_id, number)
);

alter table public.mios_invoice_counters enable row level security;
alter table public.mios_invoice_numbers enable row level security;

-- Readable by their owner; written only through the function below.
create policy mios_invoice_counters_select on public.mios_invoice_counters
  for select to authenticated using (user_id = auth.uid());
create policy mios_invoice_numbers_select on public.mios_invoice_numbers
  for select to authenticated using (user_id = auth.uid());

-- The number for an invoice. Asking again for the same invoice (a lost
-- reply, a retry) returns the number it already has. p_after lets the
-- first sign-in start after the highest number already on the device, so
-- an existing INV-007 is not given again.
create or replace function public.mios_give_invoice_number(p_record_id text, p_after int default 0)
returns int
language plpgsql
security definer
set search_path = ''
as $$
declare
  uid uuid := auth.uid();
  n int;
begin
  if uid is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if p_record_id is null or char_length(p_record_id) not between 1 and 200 then
    raise exception 'bad_record_id' using errcode = '22023';
  end if;
  if p_after is null or p_after < 0 or p_after > 1000000 then
    raise exception 'bad_after' using errcode = '22023';
  end if;

  -- Lock this user's counter first, so two sessions asking at once take
  -- turns, and a second ask for the same invoice sees the first's answer.
  -- (The insert above already waits on an open transaction holding the row;
  -- the explicit lock keeps that true without leaning on it.)
  insert into public.mios_invoice_counters (user_id) values (uid) on conflict do nothing;
  perform 1 from public.mios_invoice_counters where user_id = uid for update;

  select number into n from public.mios_invoice_numbers
    where user_id = uid and record_id = p_record_id;
  if found then
    return n;
  end if;

  update public.mios_invoice_counters
    set last_number = greatest(last_number, p_after) + 1
    where user_id = uid
    returning last_number into n;
  insert into public.mios_invoice_numbers (user_id, record_id, number)
    values (uid, p_record_id, n);
  return n;
end $$;

-- ---------------------------------------------------------------------
-- Access. Supabase hands new public tables and functions to anon by
-- default; take that back. RLS still limits every row to its owner.
-- ---------------------------------------------------------------------
revoke all on public.mios_records, public.mios_invoice_counters, public.mios_invoice_numbers
  from anon, authenticated;
grant select, insert, update, delete on public.mios_records to authenticated;
grant select on public.mios_invoice_counters, public.mios_invoice_numbers to authenticated;

revoke all on function public.mios_give_invoice_number(text, int) from public, anon, authenticated;
grant execute on function public.mios_give_invoice_number(text, int) to authenticated;

revoke all on function public.mios_records_version() from public, anon, authenticated;
