---
title: "Atlas — Builtin '351 House' sample project"
type: decision
created: 2026-05-01
tags: [atlas, olos, builtin, sample-project, rbac, postgis, zustand, observe-stage]
sources: 0
---

# Atlas — Builtin "351 House — Atlas Sample" project

## Context

New users (and unauthenticated visitors at atlas.ogden.ag) opened the Atlas
home page to a near-empty "Your Projects" list. There was no way to inspect
the Stage 1 (Roots & Diagnosis) surfaces without first signing in, drawing a
parcel, and waiting on layer fetches. We needed a read-only sample project,
shared across every account, that demonstrates the full Observe pipeline end
to end and works offline / signed-out.

## Decision

Ship a DB-backed builtin project with sentinel UUID
`00000000-0000-0000-0000-0000005a3791`, name "351 House — Atlas Sample".
Surfaced via three mutually-reinforcing layers:

1. **Server (migration 017)** — new `is_builtin boolean default false` column
   on `projects`; one system user + one builtin project + 6 `project_layers`
   + 1 `terrain_analysis` + 1 `site_assessment` + 10 `design_features` +
   2 `spiritual_zones` + 4 `regeneration_events` + 6 `project_relationships`.
   Parcel boundary is a Halton-Hills 5-point polygon stored as PostGIS
   `geometry(Polygon, 4326)`.
2. **API (`apps/api/src/routes/projects/index.ts`)** — `GET /projects` and
   `GET /projects/:id` now `OR p.is_builtin = true` so every authenticated
   list/detail call sees the sample. New unauthenticated `GET
   /projects/builtins` returns `ProjectSummary` + `parcel_boundary_geojson`
   for visitors with no session. RBAC's `resolveProjectRole` short-circuits
   `is_builtin` rows to viewer; mutations (`PATCH`, `DELETE`, boundary
   `POST`) call `refuseIfBuiltin` and return 403.
3. **Frontend (`apps/web/src/store/projectStore.ts`)** — `hydrateBuiltins`
   fetches `/projects/builtins`, falls back to a hard-coded
   `LOCAL_BUILTIN_FALLBACK` (same UUID + boundary) on error so the home
   page works offline. `applyBuiltinsToStore` writes one `LocalProject`
   per builtin row (idempotent on UUID), spreads `BUILTIN_PROJECT_NARRATIVE`
   for `ownerNotes` / `zoningNotes` / `accessNotes` / `waterRightsNotes` /
   `visionStatement`, persists the boundary GeoJSON to IndexedDB
   (`geodataCache: boundary:<id>`), and seeds the six Zustand stores that
   the Stage 1 modules read.

### Stage 1 hydration — `seedBuiltinObserveData`

`apps/web/src/data/builtinSampleObserveData.ts` is a single-purpose fixture
that calls the add/update actions on seven local stores, all keyed by the
freshly-generated local project UUID:

| Store | Module | Sample content |
|---|---|---|
| `useVisionStore` | 1 — Human Context | Steward profile + 3 phase notes |
| `useExternalForcesStore` | 2 + 5 — Hazards / Sectors | 3 hazards (flood, frost, snow), 4 sector arrows (sun_summer, sun_winter, wind_prevailing, noise) |
| `useTopographyStore` | 3 — Topography | "House to creek" transect, 11-point elevation profile 268.4 → 240.1 m |
| `useSoilSampleStore` | 4 — Earth | 2 samples: yard silt loam (pH 6.4 OM 4.2 %) + lower-field clay loam (pH 6.8, jarTest 25/40/35) |
| `useEcologyStore` | 4 — Ecology | 4 observations spanning trophic levels + succession stage 'mid' |
| `useSwotStore` | 6 — SWOT | 1 entry per S/W/O/T bucket |
| `useSiteDataStore` | 2 + 3 numeric rows | Synthesized `climate` + `elevation` `MockLayerResult`s mirroring migration 017 (mean_slope_deg 4.2°, elevation 240.1–268.4 m, hardiness_zone 6a, annual_precip_mm 875) |

Idempotency: each seeder short-circuits when an entry already references the
project id (or, for `siteDataStore`, when the entry is `status: 'complete'`).
Re-runs on reload are no-ops.

### Pre-existing bug surfaced & fixed

`features/observe/ObserveHub.tsx` typed the `getLayerSummary` calls with
camelCase keys (`hardinessZone`, `annualPrecipMm`, `minElevationM`,
`maxElevationM`, `meanSlopeDeg`) but the canonical `LayerSummaryMap` in
`packages/shared/src/scoring/layerSummary.ts` and every `layerFetcher.ts`
producer use snake_case. Because the cast is non-runtime, the four
Macroclimate/Topography numeric rows would render `'—'` for ANY project —
not just the builtin. Fixed in the same change-set by switching to the
canonical snake_case keys.

## Consequences

- Visitors land on a populated home page without auth; opening the sample
  shows real Stage 1 content for all six modules including the four numeric
  rows that were silently broken before.
- The sentinel UUID + `is_builtin` flag pattern is now established and can
  scale to additional builtin samples (e.g. a US/SSURGO sample, a different
  bioregion) by adding more migration rows without further frontend work.
- `refuseIfBuiltin` enforces read-only at the API; the frontend's
  `updateProject` / `deleteProject` no-op on builtin ids as a UX guard.
- Real authenticated `useSiteDataStore` fetches still overwrite the seeded
  snapshot when they land — the seeder's `status === 'complete'` short-
  circuit only protects against re-seeding the same offline payload.

## Out of scope

- Wiring an authenticated `/projects/:id/layers` endpoint to populate
  `useSiteDataStore` from real `project_layers` DB rows (separate plan).
- Auditing every other `getLayerSummary` consumer in ObserveHub for the
  same camelCase/snake_case mismatch (groundwater `depthClass` / `depthM`
  on line ~196 likely has the same issue but isn't on a row the user
  flagged).
- Surfacing the migration's `design_features` / `spiritual_zones` /
  `regeneration_events` on the Design Map / Intelligence tabs for
  unauthenticated visitors (those tabs still gate on auth).

## Critical files

**New:**
- `apps/api/src/db/migrations/017_builtin_sample_project.sql`
- `apps/web/src/data/builtinSampleObserveData.ts`
- `packages/shared/src/constants/system.ts`

**Modified:**
- `apps/api/src/routes/projects/index.ts` — `is_builtin` OR clause on list/get,
  new `/builtins` public route, `refuseIfBuiltin` on mutations.
- `apps/api/src/plugins/rbac.ts` — short-circuit builtins to viewer.
- `apps/web/src/store/projectStore.ts` — `hydrateBuiltins`,
  `applyBuiltinsToStore`, `LOCAL_BUILTIN_FALLBACK`, narrative spread,
  observe seeding loop.
- `apps/web/src/lib/syncService.ts` — propagate `isBuiltin` through both
  initialSync branches; bypass `updateProject` gate for builtins.
- `apps/web/src/lib/apiClient.ts` — new `listBuiltins()` method.
- `apps/web/src/features/observe/ObserveHub.tsx` — snake_case fix on the
  climate/elevation `getLayerSummary` calls.
- `packages/shared/src/schemas/project.schema.ts` + `index.ts` — `isBuiltin`
  on `ProjectSummary`.

## Verification

- `NODE_OPTIONS=--max-old-space-size=8192 pnpm --filter @ogden/web exec tsc --noEmit` clean.
- Migration 017 applied locally; `INSERT INTO site_assessments` succeeded
  after dropping the legacy per-axis columns (`suitability_score`,
  `buildability_score`, `water_resilience_score`, `ag_potential_score`)
  removed by migration 009.
- Offline reload of the home page shows the "351 House — Atlas Sample"
  card. Opening it: Module 2 → Hardiness zone 6a, Annual precip 875 mm,
  Logged hazards 3. Module 3 → Mean slope 4.2°, Elevation range 240–268 m,
  A–B transects 1. All other modules populated.
- Re-running `applyBuiltinsToStore` (page reload) does not duplicate any
  store entries.
