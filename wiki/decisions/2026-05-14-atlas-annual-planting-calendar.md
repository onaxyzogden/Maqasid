---
title: "Annual Planting Calendar — phenology catalog + frost-anchored schedule generator"
date: 2026-05-14
project: atlas
status: shipped
---

# Annual Planting Calendar — phenology + frost-anchored schedule

## Context

The plant catalogs already carried shape / light / water / yield data
but no **phenology**: nothing in `PlantSpecies` or `PlantSpeciesInfo`
answered *"when do I start this indoors, direct-sow, transplant, or
harvest"*. Stewards drawing annual crop areas in Plan got yield
estimates but no calendar.

Meanwhile the climate-layer pipeline already exposes per-parcel
`first_frost_date` and `last_frost_date`, and the Goal Compass
`scheduleTasksToCalendar` work (shipped earlier the same day) had
proved the loop from plan-stage output → Act calendar via a
`phaseTask`-style `useEventAggregator` source.

This change closes the loop: phenology on the catalog, frost normals
on `SiteProfile`, and a deterministic scheduler that emits the full
annual planting plan (start-indoors / direct-sow / transplant /
harvest-open) onto the Act calendar from every crop area drawn in
Plan.

## Decision

### Phase 1 — Phenology table

- New `apps/web/src/features/planting/plantPhenologyData.ts` keyed by
  `PlantSpeciesInfo.id`. Each entry: `lifeCycle`,
  `coolOrWarmSeason`, `startIndoorsWeeksBeforeLastFrost`,
  `directSowWeeksRelativeToLastFrost`, `transplantWeeksAfterLastFrost`,
  `daysFromTransplantToHarvest`, `harvestWindowDays`, optional
  `succession { intervalDays, cutoffWeeksBeforeFirstFrost }`.
- Seeded the ~15 annuals the catalog already declared (tomato,
  pepper, cucumber, summer/winter squash, beans, peas, lettuce, kale,
  spinach, carrot, beet, brassica) from Cornell / OMAFRA extension
  tables.

### Phase 2 — Frost-date facets on SiteProfile

- Extended `SiteProfile` with `lastFrostDate: Facet<string>` and
  `firstFrostDate: Facet<string>`; bumped `siteProfileStore` facet
  count to 11.
- `observePrefill.ts` now also returns candidates for both keys from
  `getClimateLayer(siteData?.layers)?.summary` with provenance
  `'observe'`.
- New "Frost normals" section on `SiteProfileTab` exposes the two
  facets to manual override.

### Phase 3 — Scheduler

- `apps/web/src/v3/plan/engine/plantSystems/schedulePlantingFromAreas.ts` —
  pure function `(cropAreas, frostDates, targetYear, catalog) →
  { generatedPhase, phaseTasks, nurseryBatches, rows }`.
- Eligible crop-area types: `row_crop`, `garden_bed`,
  `market_garden`. For each (area × species):
  - Rebase frost normals to `targetYear`.
  - Resolve phenology; skip non-annuals (perennials handled by Goal
    Compass interventions).
  - Compute primary planting date — transplant pathway when
    `startIndoorsWeeksBeforeLastFrost` is set, else direct-sow.
  - Walk successions forward in `intervalDays` until
    `firstFrost − cutoffWeeksBeforeFirstFrost·7d` (cap at 12 cycles).
  - Emit `PropagationBatch` for start-indoors stages, `PhaseTask` for
    direct-sow / transplant / harvest-open events, all stamped with
    `generatedFromPlantingCalendar: '<species>:<cropAreaId>:<year>'`.
- Synthetic carrier `BuildPhase` (`pc-phase-<projectId>-<year>`,
  colour `#9b7bc6`) so the regenerate path is a wholesale replace.

### Phase 4 — Store extensions

- `phaseStore.replacePlantingCalendarRows(projectId, newPhases,
  newTasks)` — mirror of `replaceGoalCompassRows`, filtered on the
  planting-calendar flag. Preserves user-authored and Goal-Compass
  rows.
- `nurseryStore.replacePlantingCalendarBatches(projectId, newBatches)` —
  same shape for nursery propagation batches.

### Phase 5 — Module card

- `apps/web/src/v3/plan/cards/plant-systems/AnnualPlantingCalendarCard.tsx` —
  year picker (defaults to next year if month ≥ October), Generate
  button (disabled until frost dates + eligible crop areas are
  present), summary table with start-indoors / direct-sow /
  transplant / harvest-open / harvest-close columns.
- Registered as a new card in `MODULE_CARDS['plant-systems']` with
  `sectionId: 'plan-planting-schedule'`; routed by
  `PlanModuleSlideUp.renderPlanCard`.

### Phase 6 — Act calendar integration

- `useEventAggregator` gains a seventh `CalendarSource`:
  `'plantingCalendar'`. Planting-stamped batches and tasks route to
  this source so the calendar filter chip and a distinct dot colour
  (purple, `rgba(170,130,220,0.95)`) work without overloading
  `phaseTask`.
- `EventCalendarCard` + `UpcomingEvents` learn the two new sources
  (`phaseTask`, `plantingCalendar`) — fills in previously missing
  icon/label entries that would have thrown on lookup.

## Reasoning

- **Single synthetic BuildPhase per (project, year)** — wholesale
  replace makes regenerate idempotent: tweak a frost date, click
  Generate, and only the planting-calendar rows turn over.
- **Seventh CalendarSource over overloading `phaseTask`** — filter
  chip and dot styling drop in for free; the cost of one more enum
  value is lower than the cost of source-discriminator logic at
  every consumer.
- **Phase 4 catalog consolidation deferred** — the `pl-XXX` vs
  snake_case ID-format collision is real and persisted in
  `siteAnnotationsStore` localStorage. Migrating it is its own arc;
  the calendar feature does not block on it and reads phenology
  through `plantPhenologyData.ts` keyed on the existing
  `PlantSpeciesInfo.id`.
- **Open-Meteo Archive fallback deferred** — the climate layer
  already covers North American sites via NOAA ACIS + ECCC. When a
  site comes in with no station coverage, the manual `Facet`
  override stays available; the fallback can land later without a
  schema change.

## Files

- Created `apps/web/src/features/planting/plantPhenologyData.ts`
- Created `apps/web/src/v3/plan/engine/plantSystems/schedulePlantingFromAreas.ts`
- Created `apps/web/src/v3/plan/cards/plant-systems/AnnualPlantingCalendarCard.tsx`
- Modified `apps/web/src/v3/plan/data/goalCompassTypes.ts`
- Modified `apps/web/src/store/siteProfileStore.ts`
- Modified `apps/web/src/v3/plan/engine/goalCompass/observePrefill.ts`
- Modified `apps/web/src/v3/plan/cards/goal-compass/SiteProfileTab.tsx`
- Modified `apps/web/src/store/phaseStore.ts`
- Modified `apps/web/src/store/nurseryStore.ts`
- Modified `apps/web/src/v3/plan/types.ts`
- Modified `apps/web/src/v3/plan/PlanModuleSlideUp.tsx`
- Modified `apps/web/src/features/act/useEventAggregator.ts`
- Modified `apps/web/src/features/act/EventCalendarCard.tsx`
- Modified `apps/web/src/features/act/EventCalendarCard.module.css`
- Modified `apps/web/src/v3/act/ops/UpcomingEvents.tsx`

## Verification

- `npx tsc --noEmit` (with `NODE_OPTIONS="--max-old-space-size=8192"`
  to dodge prior heap OOM): exit 0.
- `npm run build`: succeeded in ~42s; PWA precaching 692 entries.

## Follow-ups

- **Phase 4 catalog consolidation** — author union catalog at
  `apps/web/src/data/plantCatalog.ts` with `pl-XXX → snake_case`
  alias map; ship `scripts/migrate-plant-ids.mjs` for persisted
  `siteAnnotationsStore` JSON dumps.
- **Open-Meteo Archive fallback** for sites without ACIS/ECCC
  station coverage (derive `last_frost_date` /
  `first_frost_date` from a 10-year `temperature_2m_min ≤ 0`
  normal; cache 24h alongside the climate layer).
- **Preview e2e walk-through** on Moontrance Creek fixture: draw a
  `garden_bed`, set `species: ['tomato', 'lettuce']`, generate,
  confirm the four dot types land on the calendar in the correct
  year window.

## Addendum — 2026-05-14 — persist migration

Preview-driven e2e on MTC surfaced a stale-state crash:
`AnnualPlantingCalendarCard` dereferenced `profile.lastFrostDate.value`
on a `siteProfileStore` entry persisted before the frost-date facet
bump. Fix: bumped persist `version` to 2 and added a `migrate` that
walks `profilesByProject` and backfills every facet key (including
the two new frost facets) to `{ value: null, provenance: null }` when
missing. Verified post-reload: persisted store reads `version: 2`,
all 11 facets present, card mounts cleanly with Generate plan
correctly disabled until frost facets are filled.

Touched: `apps/web/src/store/siteProfileStore.ts`.
