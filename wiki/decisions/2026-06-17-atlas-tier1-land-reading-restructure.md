---
title: "OLOS Tier-1 (Stratum-2) Reception / Land-Reading restructure"
type: decision
date: 2026-06-17
status: accepted
tags: [olos, plan, reception, land-reading, stratum-2, survey, createSurveyStore, tier-parameterize, amanah]
---

# OLOS Tier-1 (Stratum-2) Reception / Land-Reading restructure

**Status:** Accepted + implemented (2026-06-17). Three independently-verified stages on `main`, **PUSHED** to `origin/main` (range `08ebadf4..fea2625d`; `local == origin`).

## Context

Direct sequel to [[2026-06-16-atlas-tier2-systems-reading-restructure]] and [[2026-06-16-atlas-tier0-declaration-restructure]], for the same configuration: **Regenerative Farm (primary) + Residential/Live-In Stewardship (secondary) + Silvopasture/Livestock (secondary)**.

Tier 1 is the **first reception tier** -- "the land is speaking; the steward listens and records, does not decide." Its six land-reading objectives previously rendered as bare decision/map workbenches with no reception chrome, no per-type intent lens, and a single Act handoff. The spec reframed them as a coherent **Land Reading** tier: each objective gains (a) a reception-register planning question, (b) a per-type **Intent Lens** ("what to look for" through the Farm / Silvopasture / Live-In lens, drawn from the Tier-0 Intent Object), and (c) a **dual output** -- an *Observe Output* survey record that feeds forward within Plan, distinct from the existing *Act Handoff*. The six surveys gate **Tier 2 -- Systems Reading** ("Tier 1 complete -> Tier 2 unlocks"); Threshold 1 still opens only after *both* Tier 1 and Tier 2 complete.

**Terminology bridge:** doc "Tier 1" = codebase **Stratum 2** (`s2-land-reading`, ordinal 2 of 7). "1.1...1.6" is a presentation layer over real `s2-*` ids. Strata model NOT renamed. Both Stratum 2 and Stratum 3 are Mode 2 -- Reception.

## The six Land-Reading objectives -> code

| # | Survey | Real id | Map capture |
|---|--------|---------|-------------|
| 1.1 | Terrain & topography | universal `s2-terrain` | bespoke `slopeSurveyStore` (kept) |
| 1.2 | Climate & sectors | universal `s2-climate` | **NEW** `climateSurvey` |
| 1.3 | Existing ecology & habitat | universal `s2-ecology` | bespoke `vegetationSurveyStore` (kept) |
| 1.4 | Existing infrastructure & access | universal `s2-infrastructure` | **NEW** `infrastructureSurvey` |
| 1.5 | Land health & degradation | regen primary `rf-s2-land-health` | **NEW** `landHealthSurvey` |
| 1.6 | Surrounding landscape context | regen primary `rf-s2-landscape-context` | **NEW** `landscapeSurvey` |

**No objectives added, removed, excluded, or relocated** -- existing scope was already correct (contrast Tier 2, which added `silv-sec-s3-stock-water`). This made the data side materially cleaner: objective-count and `ALL_AUTHORED` floor assertions did NOT move -- only patch-count assertions shifted.

## Decision

1. **Map capture = full, all six.** Build **four** new factory-based reception surveys for the objectives lacking capture (`s2-climate`, `s2-infrastructure`, `rf-s2-land-health`, `rf-s2-landscape-context`). **Terrain & Ecology keep their bespoke `slopeSurveyStore` / `vegetationSurveyStore`** (relocate-not-delete; migrating them would risk the live selectable-polygon integration) and are surfaced through the same Tier-1 reception workbench takeover.

2. **Reception UI = tier-parameterize, not fork.** Extend the reception machinery to a `tier: 'tier1' | 'tier2'` model where every new param defaults to `'tier2'`, so the five live Tier-2 consumers stay **byte-identical** (Approach A -- auto-detect tier from objective-id membership). `receptionModel.ts` gained `TIER_ONE_DISPLAY`, `receptionTierOf(id)`, `receptionDisplayFor(id)`, tier-keyed copy accessors, and a `deriveReceptionSequencing(..., tier='tier2')` that emits a tier-1 terminal node "Tier 2 unlocks".

3. **`buildsOnDisplay` omitted for Tier 1** -- there is no prior reception tier to build on; the intent lens already encodes the Tier-0 connection. The reference panel's "Builds on" block self-hides when the field is absent.

4. **Retain the existing `RES>RF-S2.6` residential patch** on `rf-s2-landscape-context` (domestic water catchment) -- complementary, relocate-not-delete. Residential s2 patches therefore total 5 (1 retained + 4 new).

5. **`DecisionWorkingPanel` is Plan-only in production** (only mount of `ActTierZeroWorkbench` is `PlanTierShell.tsx`), so the `s2-*` survey prefix self-gates and cannot leak onto Act -- no `receptionTier` threading needed there. The `ReceptionSurveySummary` rides as a DISPLAY-ONLY prefix above the lead decision body, preserving each c1 item's own capture (COMPOSE not REPLACE).

## Stages

- **Stage 1 -- catalogue authoring (`aab1290f`):** reception `focusedQuestion` + per-type `intentLens` (3 rows on 1.1-1.4, 2 on 1.5-1.6) + `observeOutput` on all six `s2-*` objectives; four new Silvopasture patches (`SILVOPASTURE_SECONDARY_PATCHES` 8->12) + four new Residential patches (`RESIDENTIAL_PATCHES` 6->10, plus the retained `RES>RF-S2.6`); objective counts UNCHANGED, `skippedPatches` empty; an Amanah S2 wording-pin test over the resolved 1.1-1.6 + patch strings.
- **Stage 2 -- workbench tier-parameterization (`8fc8034d`):** `receptionModel.ts` tier-keying + `ReceptionCenter`/`ReceptionReferencePanel`/`ActTierZeroWorkbench` tier props (default `'tier2'`) + `PlanTierShell` deriving `receptionTier = receptionTierOf(...)` and routing the six `s2-*` ids to the Tier-1 reception view. **Act byte-identical; the five Tier-2 consumers unchanged.** The slope/veg + tools/sectors takeovers preserved (the `!surveyActive && !slopeActive` guard already overrides reception chrome when armed).
- **Stage 3 -- map survey-capture (`fea2625d`):** the four new `createSurveyStore` configs in `receptionSurveys.ts` (registry indices 5-8) + sync-manifest registration (all 9 reception stores) + a generic display-only `ReceptionSurveySummary` component + `DecisionWorkingPanel` routing via `receptionSurveyForLeadItem(itemId)` (Tier-1 only -- the five Tier-2 surveys stay unopenable, an acknowledged deferred gap) + tier-scoped `selectReceptionSurveyRecordCount(projectId, tier?)` feeding Tier-1 progress. 9 files, +804/-40.

## Amanah

Tier 1 is observation of existing land and assets -- LOW risk, no capital surface. Residential "conversion potential / domestic services" and Silvopasture "grazing legacy / forage / stocking" are reads of what is present, never advance-sale / CSA / CSRA / salam / yield-share. The S2 wording-pin test enforces this (banned `/(subscription|presale|pre-sale|advance[ -]sale|csa|csra|yield[ -]share)/i` over the resolved corpus). No capital channel touched.

## Verification

Stage-3 gate met: factory/config unit tests green (`receptionSurveys.test.ts` 14 incl. `receptionSurveyForLeadItem` + tier-scoped record count 3/2/5); sync-manifest coverage guard passes (all 9 registered); takeover coexistence verified (`ReceptionSurveySummary.test.tsx` -- opening a survey closes the generic objective-tools takeover, the two focused map modes never coexist). Plus an 83-test regression sweep (DecisionWorkingPanel 60 / ReceptionCenter 14 / ReceptionReferencePanel 9). `tsc` clean to the standing pre-existing baseline (4 committed foreign + 2 foreign-untracked `useDimensionDrawTool` WIP -- none in my Stage-3 files). Live preview NOT driven (v3 hang -- [[project-screenshot-hang]]).

## Relationships

- **Predecessor:** [[2026-06-16-atlas-tier2-systems-reading-restructure]] (reuses its reception machinery + `createSurveyStore` factory + the `intentLens`/`observeOutput`/`buildsOnDisplay` schema -- which is why this needed no schema work).
- **Sibling:** [[2026-06-16-atlas-tier0-declaration-restructure]] (the Declaration restructure for the same config; this is the reception analogue).
- **Extends:** [[2026-05-29-atlas-spec-catalogue-driven-content]], [[2026-05-29-atlas-spec-plan-tiered-objectives]].
- **Builds on:** [[2026-06-10-atlas-slope-survey-draw-tools]], [[2026-06-10-atlas-vegetation-survey-draw]] (the bespoke terrain/ecology capture kept for 1.1/1.3).

## Deferred

- The five Tier-2 (`s3-*`) reception surveys remain unopenable from a lead decision (extend `receptionSurveyForLeadItem` by dropping the `surveyTierOf` filter if ever desired).
- Migrating `slopeSurveyStore` / `vegetationSurveyStore` to the `createSurveyStore` factory for uniformity (kept bespoke to protect the live selectable-polygon integration).
- An attributed `RES>SILV` cross-secondary patch (would require widening `PATCH_REF`).
- Server-side sync of the survey stores (currently client-only IndexedDB).
