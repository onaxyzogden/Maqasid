---
title: "Atlas Site Profile acreage staleness root-cause + geodesic acreage fix"
type: decision
date: 2026-05-16
status: accepted
tags: [atlas, olos, postgis, acreage, syncservice, boundary, bug]
---

# Atlas Site Profile acreage staleness root-cause + geodesic acreage fix

## Context

A user hand-drew a parcel boundary in [[olos]] Observe and independently
measured it at **~90 ac** with the OLOS measure-area tool, but the Plan-stage
Goal Compass **Site Profile** panel reported **24.49 ac** (≈ 3.675× under).
Investigated under `superpowers:systematic-debugging` — evidence before fixes.

## Root cause (code-verified, not assumed)

The Site Profile facet reads `project.acreage` verbatim
(`observePrefill.ts:80` → `SiteProfileTab.tsx`), and `project.acreage` in the
client store **only refreshes on a full `initialSync`**. Both
`syncProjectBoundary` and `syncProjectCreate` in `syncService.ts` called
`api.projects.setBoundary(...)` — whose response carries the server-recomputed
acreage — and **discarded the returned value**. So after a redraw the server
recomputed correctly but the stale client `acreage` (e.g. an earlier smaller
draw, or a builtin seed value) stayed on screen until a full app reload.
Compounded by `applyAll` skipping facets with non-null provenance
(`observePrefill.ts:249`). A DB sweep (14 projects, 5 with boundaries, all
Ontario, all stored ≈ geodesic) confirmed no server row held 24.49 or 90 —
the discrepancy was purely client-side staleness.

## Latent secondary bug (fixed regardless)

Server acreage was computed as `ST_Area(ST_Transform(geom, 26917)) / 4046.86`
— **EPSG:26917 (UTM Zone 17N) hardcoded for every project regardless of
location**. UTM scale distortion always *inflates* off-zone area (never
deflates), so it could not cause *this* under-report, but it silently
mismeasures any site outside SW Ontario. SQL proof, identical 0.01°×0.01° box
at three latitudes: Ontario old 223.79 / new 223.83; California old 326.57 /
new 244.08 (+34%); Southern hemisphere old 761.95 / new 253.24 (+200%).

## Decision

1. **`applyServerAcreage` write-back (root-cause fix).** New helper in
   `syncService.ts` writes the `setBoundary` response acreage back into the
   store via `updateProject`, bracketed by the `isSyncing` guard so it does not
   re-enqueue a sync. Called from both `syncProjectBoundary` and the
   `syncProjectCreate` boundary branch. Site Profile now refreshes after a
   redraw without an app reload.
2. **Geodesic acreage (Fix B).** Replace the hardcoded UTM transform with the
   location-independent WGS84 spheroid: `ST_Area(...::geography) / 4046.86`,
   matching the in-app `turf.area` measure tool for any site on Earth. Applied
   in `apps/api/src/routes/projects/index.ts`, `routes/templates/index.ts`,
   and the builtin seed `migrations/017_builtin_sample_project.sql`. New
   `migrations/026_geodesic_acreage_backfill.sql` re-derives every stored
   `acreage` from its persisted boundary.
3. **BoundaryTool robustness (Fix A).** `pickLargestPolygon` makes the
   committed feature the same one the live readout measures (largest outer
   ring), and a `turf.kinks` self-intersection guard refuses to commit a
   bowtie (whose net area silently collapses) while surfacing an `alert`
   warning in the popover.

## Verification

- `tsc --noEmit` clean on all touched web + api files.
- Web vitest 872/872 green.
- Fix B proven by read-only SQL latitude comparison (above).
- **Not done (out of scope / policy-gated):** running migration 026 — a shared
  DB data migration requires a `stages/` approval doc per repo policy and the
  auto-mode classifier blocked it; it runs via the user's `pnpm migrate`. Two
  pre-existing api test failures (`boundary.test.ts`, `projects.test.ts`)
  confirmed failing identically on baseline (stale mock-queue not accounting
  for `refuseIfBuiltin`'s SELECT) — pre-existing, out of scope.

## Related

- [[olos]] — affected product
- [[2026-05-01-atlas-builtin-sample-project]] — `is_builtin` / `refuseIfBuiltin`
  / seed acreage path touched by Fix B
