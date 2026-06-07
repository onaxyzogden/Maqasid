---
phase: deploy
slug: atlas-migration-026-acreage-backfill
status: draft
amanah: pending
created: 2026-05-16 00:00
---

# Review Gate: deploy — atlas-migration-026-acreage-backfill

## Summary

Approval requested to run **Atlas migration 026
(`026_geodesic_acreage_backfill.sql`)** against the shared Atlas
PostgreSQL/PostGIS database. This is a one-shot data migration that
re-derives every project's stored `acreage` from its persisted
`parcel_boundary` using the new location-independent geodesic formula.

It is the data half of the Site Profile acreage fix (code already
committed: atlas `1cafa4c1`). Per repo policy, a shared-DB data
migration requires this `stages/` approval doc before it runs; the
Claude Code auto-mode classifier correctly blocked the run pending it.

## Problem

Prior code computed `acreage = ST_Area(ST_Transform(geom, 26917)) /
4046.86` — **EPSG:26917 (UTM Zone 17N) hardcoded for every project
regardless of location**. UTM scale distortion always *inflates*
off-zone area. The code paths now use the WGS84 spheroid
(`ST_Area(...::geography) / 4046.86`), matching the in-app `turf.area`
measure tool, but **existing stored rows still carry the old
projection-distorted values** until backfilled.

## The migration (verbatim)

```sql
-- Migration 026 — geodesic acreage backfill
UPDATE projects
SET acreage = ST_Area(parcel_boundary::geography) / 4046.86
WHERE parcel_boundary IS NOT NULL;
```

## Files Modified

- `apps/api/src/db/migrations/026_geodesic_acreage_backfill.sql` —
  the migration (new; already committed in atlas `1cafa4c1`)
- No application code changes in this gate — Fix A/B code already
  shipped and pushed.

## Blast Radius

- **Scope:** `UPDATE projects SET acreage = ...` for every row where
  `parcel_boundary IS NOT NULL`. DB sweep at investigation time: 14
  projects total, **5 with boundaries** (all Ontario; stored values
  already ≈ geodesic, so deltas are expected to be near-zero for the
  current dataset — see below).
- **Columns touched:** `projects.acreage` only. No schema change, no
  geometry mutation, no row deletion.
- **Off-Ontario behaviour:** read-only SQL proof of the formula change,
  identical 0.01°×0.01° box at three latitudes — Ontario 223.79 →
  223.83 (negligible); California 326.57 → 244.08 (−25%);
  Southern hemisphere 761.95 → 253.24 (−67%). Confirms the old formula
  only looked right because all real projects sit near zone 17;
  off-zone rows (none today) would correct substantially.
- **Builtin sample project:** seed migration 017 already updated to the
  geodesic formula; the builtin row's `acreage` will re-derive
  consistently.

## Reversibility

- **Not auto-reversible** (overwrites prior `acreage` values). Mitigation:
  the old values are deterministically recomputable from the unchanged
  `parcel_boundary` via the old formula, so a rollback script is trivial
  if ever needed:
  `UPDATE projects SET acreage = ST_Area(ST_Transform(parcel_boundary,26917))/4046.86 WHERE parcel_boundary IS NOT NULL;`
- **Recommended pre-run safeguard:** snapshot `SELECT id, acreage FROM
  projects WHERE parcel_boundary IS NOT NULL` (or a DB backup) before
  applying.

## Amanah Gate

- [ ] Halal purpose confirmed — corrects under/over-reported land area
      for honest land-stewardship decisions (preservation of wealth &
      environment maqasid); no riba/gharar
- [ ] No riba/gharar concerns — pure technical data correction
- [ ] Itqan standard met — formula proven by 3-latitude read-only SQL;
      matches in-app `turf.area`
- [ ] Existing tests still pass — `tsc --noEmit` clean on touched files;
      web vitest 872/872. **Caveat:** 2 api tests
      (`boundary.test.ts`, `projects.test.ts`) fail — confirmed failing
      identically on baseline (pre-existing stale mock-queue vs
      `refuseIfBuiltin` SELECT), not caused by this change

## Key Decisions

1. **`::geography` over dynamic UTM zone** — WGS84 spheroid area is
   location-independent and matches the in-app measure tool exactly;
   a per-project UTM zone would be more code with no accuracy benefit.
2. **Backfill via one-shot UPDATE** — boundary geometry is the source of
   truth and is unchanged; recomputing from it is safe and idempotent
   (re-running yields the same values).

## Open Questions

1. Preferred safeguard before run — full DB backup, or the
   `id, acreage` snapshot above?
2. Run target — confirm this applies to the production/shared Atlas DB
   the user runs `pnpm migrate` against (no separate staging DB).
3. **(blocking)** Confirm migrations 022–025 are already applied on the
   target DB (`SELECT version FROM schema_migrations ORDER BY version;`),
   or explicitly approve applying 022–026 together — see Reviewer Notes.

## Reviewer Notes

Reviewed 2026-05-16 (self-review against actual code, not the draft's
own assertions):

**Verified sound:**
- `parcel_boundary` is `geometry(MultiPolygon, 4326)`
  (`001_initial.sql:54`). The `::geography` cast is therefore valid and
  yields true WGS84-spheroid m². Formula is correct.
- The rollback one-liner in *Reversibility* is valid — source SRID 4326
  is set, so `ST_Transform(parcel_boundary, 26917)` works.
- `migrate.ts` records applied files in `schema_migrations` and runs
  each inside `sql.begin` (a transaction). Migration 026's single
  `UPDATE` is atomic and idempotent (re-running `pnpm migrate` skips
  already-applied versions; the UPDATE itself recomputes from unchanged
  geometry).
- `026_geodesic_acreage_backfill.sql` is the correct next filename,
  unique, sorts last.

**MATERIAL FINDING — blast radius was understated.** `pnpm migrate` is
**not single-file**. The runner (`migrate.ts:41-69`) applies *every*
unapplied `.sql` in the migrations dir in one invocation. Migrations
**022–025** also sit in the tree:
`022_project_moontrance_identity`,
`023_rename_investor_summary_to_capital_partner_summary`,
`024_act_interaction_events`, `025_machinery_items`. If the shared DB
has not already had these applied, running `pnpm migrate` to get 026
will also apply 022–025 (including a column rename in 023). Each is its
own transaction, so a failure is isolated, but the effective change set
is "all pending migrations," not "026 only."

**Mandatory pre-run check (added to Open Questions / Decision):** before
running, confirm what is already applied:
`SELECT version FROM schema_migrations ORDER BY version;`
Approve the run only if 022–025 are already present, OR explicitly
approve applying 022–026 together.

**Verdict:** migration 026 is technically correct and safe in
isolation. The only blocker to approval is confirming the 022–025
state above so the operator is not surprised by a wider change set.
Amanah boxes left unchecked and status left `draft` for the human
gate — I am not self-approving a shared-DB migration.

## Decision

- [ ] **Approved** — run migration 026 via `pnpm migrate` against the
      shared Atlas DB
- [ ] **Rejected** — rework needed (see notes above)
