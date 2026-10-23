-- MIOS — a stand-in for the parts of Supabase the migration relies on.
-- LOCAL USE ONLY: run.sh loads it into a throwaway Postgres database so the
-- migration and rls_check.sql can be tested without the live project.
-- Never run this in the Supabase SQL Editor; Supabase already has all of it.

do $$
begin
  if not exists (select 1 from pg_roles where rolname = 'anon') then
    create role anon nologin;
  end if;
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
end $$;

create schema if not exists auth;

create table if not exists auth.users (
  id uuid primary key,
  email text,
  created_at timestamptz not null default now()
);

-- Supabase reads the signed-in user from the request's JWT claims.
create or replace function auth.uid() returns uuid
language sql stable as $$
  select nullif(nullif(current_setting('request.jwt.claims', true), '')::json ->> 'sub', '')::uuid
$$;

grant usage on schema auth to anon, authenticated;
grant execute on function auth.uid() to anon, authenticated;

-- Supabase gives new public tables to anon and authenticated by default;
-- copy that here so the migration's revokes are actually tested.
alter default privileges in schema public grant all on tables to anon, authenticated;
alter default privileges in schema public grant execute on functions to anon, authenticated;
grant usage on schema public to anon, authenticated;

-- Two users: the operator, and someone else whose sequence must stay separate.
insert into auth.users (id, email, created_at) values
  ('11111111-1111-1111-1111-111111111111', 'operator@example.test', now() - interval '1 day'),
  ('22222222-2222-2222-2222-222222222222', 'someone-else@example.test', now())
on conflict do nothing;
