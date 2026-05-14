# Atlas — Goal Compass: goal-driven plan generation

**Date:** 2026-05-14
**Repo:** atlas
**Module:** apps/web · v3/plan/cards/goal-compass + data + store
**Status:** shipped (MVP — homestead archetype vertical slice)

## Context

Plan-stage data entry was hand-authored: stewards typed phasing
rows, labor hours, and dollar costs for canonical interventions
(keyline tracks, swales, ponds, food forests, paddock rotation,
etc.). The knowledge is *not new* — it lives in Mollison / Yeomans /
Crawford / Holzer and the project corpus. Stewards should declare
**what success looks like** for a parcel and have OLOS propose a
phased, costed, sequenced plan.

## Decision

Introduce **Goal Compass** as the 12th Plan module. It carries:

1. A structured **Goal Tree** (parent goal → sub-goals → measurable
   success criteria with unit, target, deadline year).
2. A **Site Profile** with per-facet provenance stamps
   (`observe` / `manual` / null).
3. A **deterministic sequencing engine** over a curated
   **intervention catalog** that emits ordered `BuildPhase` +
   `PhaseTask` rows into the existing `phaseStore` — live-linked, so
   changes propagate.
4. A **criteria forecast** roll-up at year buckets {1, 3, 5, 7, 10, 20}
   with a confidence attenuator driven by manual-facet density.
5. An **Impact Preview** panel that re-runs the engine with a
   candidate edit applied and surfaces forecast deltas + cascading
   removals before the steward confirms.

No LLM in MVP. Catalog is a typed TS module with MILOS
`sources[]` per entry (Mollison BTP, Yeomans, Crawford, Holzer,
OMAFRA, NRCS as appropriate) following the same two-axis grounding
convention as `substitutionCatalog.ts`.

## Implementation

### Data
- `apps/web/src/v3/plan/data/goalCompassTypes.ts` — `Intervention`,
  `GoalTree`, `SuccessCriterion`, `SiteProfile`, `Facet<T>`,
  `Household`, `SoilCompaction`, `WaterPosture`,
  `emptySiteProfile()`.
- `apps/web/src/v3/plan/data/interventionCatalog.ts` — 13 homestead
  interventions across 6 Yeomans phases (climate, water, access,
  trees, buildings, soil). Every entry has `sources[]`, prereq ids,
  criterion contributions with `appliesAtYearOffset`.
- `apps/web/src/v3/plan/data/homesteadGoalTree.ts` — 5 sub-goals ×
  2–3 criteria seed (food sovereignty, water security, shelter &
  fuel, soil rebuilding, household income optionality).

### Engine
- `apps/web/src/v3/plan/goal-compass/engine/siteRequirementPredicates.ts`
  — pure facet-predicate functions.
- `apps/web/src/v3/plan/goal-compass/engine/sequencingEngine.ts` —
  filter → coverage-gap → greedy topological selection respecting
  Yeomans phase order, acreage budget, season constraints, household
  labor budget. Returns ordered intervention list + year placements.
- `apps/web/src/v3/plan/goal-compass/engine/criteriaForecast.ts` —
  per-bucket Σ `criterionContribution × maturityCurve(yearOffset)` +
  confidence (low/medium/high) attenuator.
- `apps/web/src/v3/plan/goal-compass/engine/impactPreview.ts` —
  re-runs the engine with a candidate edit (currently: remove a
  generated row), computes forecast deltas, cascading removals, and
  miss-deadline regressions.

### Stores
- `apps/web/src/store/goalTreeStore.ts` (Zustand + persist) — per
  project. `ensureDefault(projectId)` seeds the homestead template.
- `apps/web/src/store/siteProfileStore.ts` (Zustand + persist) —
  per-facet writes with provenance.
- `apps/web/src/v3/plan/cards/phasing-budgeting/phaseStore.ts` —
  extended `PhaseTask` and `BuildPhase` with optional provenance
  fields (`generatedFromIntervention?`, `goalCriterionId?`,
  `catalogVersion?`, `status?: 'generated' | 'overridden'`).
  Backward-compatible — existing user-authored rows have
  `status === undefined` and are never touched by
  `replaceGoalCompassRows()`.

### UI surface
- New `'goal-compass'` PlanModule registered in
  `apps/web/src/v3/plan/types.ts`,
  `PlanModuleSlideUp.tsx` (4 lazy-loaded tabs),
  `PlanViewContext.tsx` (`'time-invariant'`),
  `PlanChecklistAside.tsx` (Mollison / Yeomans / Holmgren P1
  guidance copy), `data/planModulePalette.ts` (gold dot),
  `data/planModuleArtifactPresence.ts` (returns false — module has
  no spatial artifacts yet; geometry placement is deferred).
- Cards in `apps/web/src/v3/plan/cards/goal-compass/`:
  `GoalTreeTab.tsx`, `SiteProfileTab.tsx`, `GeneratedPlanTab.tsx`,
  `CriteriaForecastTab.tsx`.

## Verification (2026-05-14 in-app pass)

On a 10-ac, slope-4%, compacted-soil, rainfed fixture with a 2-adult
household:

- 13 generated rows materialise across 6 Yeomans phases (Climate /
  Water / Access / Trees / Buildings / Soil) — exceeds the plan's
  "≥12 rows across ≥5 phases" gate.
- Same rows visible in the existing **Phasing & Budgeting** module
  (live-linked phaseStore): "Climate & assessment" 1 task / 60 h,
  "Water" 3 tasks / 126 h (swale 6 + pond 80 + roof catchment 40),
  "Access" 1 task / 8 h.
- Impact Preview on "Contour swale system" removal: shows ↓ 2 pct
  on growing-season water capture, ↑ 18 on protein (acreage budget
  freed for downstream intervention) at Y10, no orphaned prereqs.
- Criteria Forecast tab: 11 criteria × Y1/Y3/Y5/Y7/Y10/Y20 with
  by-deadline ✓/✗ pills; "low" confidence (100% facets manual).

`tsc --noEmit` clean. 47 vitest files / 710 tests pass.

## Bug fixed during verification

`SiteProfileTab.tsx` initially subscribed to a derived counts selector
that returned a fresh `{filled, manual, observe}` object each call,
triggering an infinite render loop. Moved the count computation
inline from the already-subscribed `profile` slice.

## Deferred / North-Star

1. **Auto-placed geometry on canvas** — engine paints ghost design
   elements onto the map; requires terrain solver + Mapbox draw
   integration.
2. **Right-rail progress wheel companion** — always-glanceable
   forecast summary.
3. **Other archetypes** — regenerative farm, retreat, education,
   conservation, multi-enterprise. Each reuses the engine + base
   catalog with its own additions.
4. **Backend catalog + scholar-council review workflow** —
   post-MVP once catalog exceeds ~50 entries.
5. **LLM extraction of free-text vision into structured goal tree**
   — optional accelerator.
6. **Constraint-satisfaction solver** — replace the greedy
   sequencer if optimality complaints emerge.
7. **Confirm override path** — ~~current MVP Impact Preview
   cancels; `overrideGoalCompassTask()` exists on phaseStore but
   the `Confirm` button is wired to a placeholder.~~ **Shipped
   2026-05-14 (follow-on).** Per-project
   `excludedInterventionsByProject` slice added to `goalTreeStore`
   with `excludeIntervention(projectId, id)` /
   `clearExclusions(projectId)`. `computeImpactPreview` accepts an
   `alreadyExcludedIds` arg and unions it into its reduced catalog
   so the preview reflects the true post-confirm state.
   `GeneratedPlanTab.handleConfirmRemove` calls the exclusion
   action, re-runs the engine with the filtered catalog, and
   writes the new rows via `replaceGoalCompassRows` — the plan
   re-flows live and the removed intervention stays out on future
   regenerates. New "Restore N excluded" affordance next to
   "Generate plan" clears the set and re-runs. Verified live: swale
   removal → engine reallocates freed acreage to pastured-poultry;
   Phasing & Budgeting Water phase 3 tasks/126h → 2 tasks/120h
   (pond 80 + catchment 40); Restore brings swale back, pastured
   poultry yields again.
