---
title: "OLOS Tier-2 (Stratum-3) Reception / Systems-Reading restructure"
type: decision
date: 2026-06-16
status: accepted
tags: [olos, plan, reception, systems-reading, stratum-3, survey, createSurveyStore, threshold, amanah]
---

# OLOS Tier-2 (Stratum-3) Reception / Systems-Reading restructure

**Status:** Accepted + implemented (2026-06-16). Three independently-verified stages + a follow-up, all on `main` and **PUSHED** to `origin/main` (FF `4aa4dc04..9a02d87f`, which published the whole ~28-commit local backlog incl. all of Tier-0 and Tier-2; `08ebadf4` stock-water pushed immediately after; `local == origin`).

## Context

Direct predecessor to [[2026-06-17-atlas-tier1-land-reading-restructure]], for the same configuration: **Regenerative Farm (primary) + Residential/Live-In Stewardship (secondary) + Silvopasture/Livestock (secondary)**.

Tier 2 is the **second reception tier** -- "Systems Reading." Where Tier 1 reads what the land *is* (terrain, climate, ecology, infrastructure, land-health, landscape), Tier 2 reads how its *systems* move: water, soil, nutrient cycling, pest pressure, stock water. The spec reframed the five `s3-*` objectives as a coherent **Systems Reading** tier mirroring the Declaration restructure's chrome: each objective gains (a) a reception-register planning question, (b) a per-type **Intent Lens** ("what to look for" through the Farm / Silvopasture / Live-In lens), and (c) a **dual output** -- an *Observe Output* survey record distinct from the existing *Act Handoff*.

**Terminology bridge (load-bearing):** doc "Tier 2" = codebase **Stratum 3** (`s3-systems-reading`, ordinal 3 of 7). "2.1...2.5" is a presentation layer over real `s3-*` ids, exactly as "Tier 0 / 0.1...0.6" over `s1-*` and "Tier 1 / 1.1...1.6" over `s2-*`. The strata model is **NOT renamed**. "Mode" exists only as a UI constant (`RECEPTION_MODE`), never in the data model.

## The five Systems-Reading surveys -> code

| # | Survey | Real id | Store |
|---|--------|---------|-------|
| 2.1 | Hydrology / water movement | universal `s3-hydrology` | `hydrologySurvey` |
| 2.2 | Soil structure & condition | universal `s3-soil` | `soilSurvey` |
| 2.3 | Nutrient cycling | regen primary `rf-s3-nutrient-cycling` | `nutrientSurvey` |
| 2.4 | Pest & disease pressure | regen primary `rf-s3-pest-pressure` | `pestSurvey` |
| 2.5 | Stock water systems | silvopasture secondary `silv-sec-s3-stock-water` (**NEW**) | `stockWaterSurvey` |

2.5 is a genuinely new secondary-layer objective contributed by the Silvopasture/Livestock secondary -- the only objective *added* in the Tier-2 work; the four universal/regen surveys were reframed in place.

## Decision

1. **Schema reuse, no new fields.** `intentLens` (array of `{typeId, text}`), `observeOutput`, `buildsOnDisplay`, `excludedFromResolution` were added to `PlanStratumObjectiveSchema` and threaded through `obj()` in this work, then reused unchanged by Tier 1. (This is why the Tier-1 restructure needed **no schema work**.)

2. **Global THRESHOLDS move.** Threshold 1 now opens after `s3-systems-reading` (= both Tier 1 *and* Tier 2 complete), Threshold 2 after `s5-system-design`. The threshold model moved globally in Stage 2 so both reception strata share one terminal definition; the Tier-1 terminal is "Tier 2 unlocks" (a sequencing node), NOT a covenant threshold.

3. **Reception workbench as the parallel center.** `receptionModel.ts` declares `RECEPTION_TIER_ONE_STRATUM`/`RECEPTION_TIER_TWO_STRATUM`; `deriveReceptionProgress` reads BOTH strata and computes `thresholdOpen = tierOne complete AND tierTwo complete`. (Tier 1 later tier-parameterized the copy/sequencing accessors; Tier 2 was the original byte-identical baseline.)

4. **Map capture via the `createSurveyStore` factory.** Stage 3 introduced the generic factory (`SurveyStoreBundle<C>`) + generic `SurveyLayer`/`SurveyDrawHost`/`SurveyPanel`/`ReceptionSurveyHosts` + the `RECEPTION_SURVEYS` registry + a `matrixTogglesStore.receptionSurvey` visibility toggle + the sync-manifest pattern. The five reception stores are thin configs (`persistName: 'ogden-recep-<x>-survey'`, class palettes reconciled against the spec checklists + existing Act-tool ids). zustand-v5 hook type = `UseBoundStore<StoreApi<SurveyStoreState<C>>>`.

## Stages

- **Stage 1 -- data (`19bf034b`):** restructured the five `s3-*` objectives to the spec (reception `focusedQuestion` + per-type `intentLens` + `observeOutput`); authored the new `silv-sec-s3-stock-water` secondary objective + the silvopasture/residential patches; the shared `intentLens`/`observeOutput`/`buildsOnDisplay`/`excludedFromResolution` schema + `obj()` plumbing.
- **Stage 2 -- workbench + global threshold (`aabb26a4`):** the `ReceptionCenter` / `ReceptionReferencePanel` reception chrome (mode header, reception rule, 2.1-2.5 sequencing strip, intent-lens accordion, dual Observe/Act output) routed for the five `s3-*` ids; the global THRESHOLDS move. **Act surface byte-identical** (reception is Plan-only).
- **Stage 3 -- map survey-capture (`494a0e5d`):** the `createSurveyStore` factory + the five reception survey stores + registry/host/canvas wiring + sync-manifest registration + `selectReceptionSurveyRecordCount`. **48/48** factory/config/sync-guard tests.
- **Follow-up -- stock-water protocols + Act tools (`08ebadf4`):** seeded standing protocols + Act-tool overrides for the new `silv-sec-s3-stock-water` objective so 2.5 has the same trigger/tool coverage as its siblings.

## Amanah

Tier 2 is observation of existing land systems -- LOW risk, no capital surface. Stock-water "watering points / reticulation / dam condition" and silvopasture "forage / stocking legacy" are reads of what is present, never advance-sale / CSA / CSRA / salam / yield-share (CSRA erased 2026-05-04, *bay' ma laysa 'indak*). No capital channel touched.

## Verification

Stage-3 **48/48** (factory CRUD/totals per config, sync-manifest coverage guard, takeover coexistence, tier-scoped record count); `tsc` clean to the standing pre-existing baseline; live preview NOT driven (v3 routes hang the headless renderer -- [[project-screenshot-hang]]), structure DOM-asserted by unit/render tests.

## Relationships

- **Predecessor:** [[2026-06-16-atlas-tier0-declaration-restructure]] (same config, the Declaration restructure whose chrome this mirrors).
- **Successor:** [[2026-06-17-atlas-tier1-land-reading-restructure]] (reuses this work's reception machinery + survey factory + the `intentLens`/`observeOutput` schema, then tier-parameterizes the workbench).
- **Extends:** [[2026-05-29-atlas-spec-catalogue-driven-content]], [[2026-05-29-atlas-spec-plan-tiered-objectives]].
- **Builds on:** [[2026-06-10-atlas-slope-survey-draw-tools]], [[2026-06-10-atlas-vegetation-survey-draw]] (the bespoke survey precedent the factory generalizes).

## Deferred

- Re-enable `silv-sec-s3-forage-survey` (a sibling secondary survey held back this pass).
- An attributed `RES>SILV` cross-secondary patch (would require widening `PATCH_REF`).
- Server-side sync of the survey stores (currently client-only IndexedDB).
