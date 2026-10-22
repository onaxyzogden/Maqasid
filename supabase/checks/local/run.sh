#!/usr/bin/env bash
# MIOS — test the migration and rls_check.sql against a throwaway local Postgres.
# LOCAL USE ONLY. Never point it at the live project.
#
#   PGPORT=54329 bash supabase/checks/local/run.sh
#
# Needs psql on PATH and a server you can reach as postgres without a password.
# It drops and recreates the database mios_check, then:
#   1. loads auth_shim.sql (Supabase's auth stand-in) and the migration
#   2. runs rls_check.sql, which must print "RLS check passed"
#   3. asks for invoice numbers from 20 sessions at once, and the same invoice's
#      number twice while the first ask is still open, and confirms no number
#      is shared or skipped
set -euo pipefail
shopt -s nullglob

here="$(cd "$(dirname "$0")" && pwd)"
root="$here/../.."
db=mios_check
q() { psql -X -q -v ON_ERROR_STOP=1 -U postgres "$@"; }

q -d postgres -c "drop database if exists $db" -c "create database $db"
q -d $db -f "$here/auth_shim.sql"
for f in "$root"/migrations/*.sql; do q -d $db -f "$f"; done

result="$(q -d $db -tA -f "$root/checks/rls_check.sql")"
echo "$result"
[ "$result" = "RLS check passed" ] || { echo "FAILED: rls_check.sql"; exit 1; }

op=11111111-1111-1111-1111-111111111111
ask() {  # ask <record_id> [seconds to hold the transaction open]: one session, as the operator
  q -d $db -tA -c "begin;
    select set_config('request.jwt.claims', '{\"sub\":\"$op\",\"role\":\"authenticated\"}', true);
    set local role authenticated;
    select public.mios_give_invoice_number('$1', 0);
    select pg_sleep(${2:-0});
    commit;" 2>&1 | grep -E '^[0-9]+$' || true
}

# 20 different invoices at once.
pids=(); for i in $(seq 1 20); do ask "inv-$i" >"$TMPDIR/mios_n_$i" & pids+=($!); done
for p in "${pids[@]}"; do wait "$p"; done

# The same invoice twice, the second asking while the first is still open
# (a retry after a lost reply): both must get one and the same number.
ask "inv-same" 2 >"$TMPDIR/mios_s_1" & first=$!
sleep 0.5; ask "inv-same" >"$TMPDIR/mios_s_2"; wait $first

answers="$(cat "$TMPDIR"/mios_n_* "$TMPDIR"/mios_s_* | wc -l | tr -d ' ')"
distinct="$(cat "$TMPDIR"/mios_n_* "$TMPDIR"/mios_s_* | sort -n | uniq | wc -l | tr -d ' ')"
same="$(cat "$TMPDIR"/mios_s_* | sort -u | wc -l | tr -d ' ')"
last="$(q -d $db -tA -c "select last_number from public.mios_invoice_counters where user_id = '$op'")"
rm -f "$TMPDIR"/mios_n_* "$TMPDIR"/mios_s_*

echo "parallel: $answers of 22 asks answered; $distinct distinct numbers; the same invoice got $same number(s); counter at $last"
[ "$answers" = 22 ] && [ "$distinct" = 21 ] && [ "$same" = 1 ] && [ "$last" = 21 ] \
  || { echo "FAILED: parallel numbering"; exit 1; }
echo "Local check passed"
