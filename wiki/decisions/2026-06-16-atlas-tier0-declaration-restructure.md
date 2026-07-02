---
title: "OLOS Tier-0 / Stratum-1 Declaration restructured 4 -> 6 canonical objectives (Intent split from Steward/Team)"
type: decision
date: 2026-06-16
status: accepted
project: olos
commit: 5a303425,e7a3040a,1ff30117
tags: [olos, atlas, plan, tier-shell, stratum-1, declaration, steward-team, catalogue, amanah-structural]
---

# OLOS Tier-0 / Stratum-1 Declaration restructured 4 -> 6 canonical objectives

## Context

The steward supplied two artefacts for the OLOS Plan stage **Tier 0 -- Mode 1: Declaration** -- a restructured catalogue spec (`OLOS_Tier0_Restructured.md`) and a dark-themed HTML mockup (`olos_tier0_declaration.html`) -- for the project configuration *Regenerative Farm (primary) + Residential / Live-In Stewardship (secondary) + Silvopasture / Livestock (secondary)*.

**The problem.** The Declaration phase embedded *people, labour, and capital* inside the single "vision" objective -- the system asked about *purpose* and *resources* in the same breath, weakening both. Tiers 1-6 had no single, canonical "who does the work, with what capacity" object to reference, and the Tier-6 capacity-matching engine had no clean supply baseline.

**Terminology bridge (load-bearing).** The doc's "Tier 0" is the codebase's **Stratum 1** (`s1-project-foundation`); "Tiers 1-6" are Strata S2-S7. The "0.1...0.6" numbering is a **presentation layer over real S1 objective ids** -- the strata model was NOT renamed. This is fundamentally a Stratum-1 *catalogue restructure* plus a Declaration-workbench UI evolution.

**Confirmed scope (steward, via clarifying questions):** (1) deliverable = **both**, data first then UI; (2) 0.2 depth = **full structured Team Object** (extend `StewardProfile` + roster with resident status, role allocation, decision-rights-by-domain, capability-by-domain, seasonal labour, capital inventory, governance); (3) UI approach = **evolve the existing workbench** (`ActTierZeroWorkbench` / `PlanTierShell`, reusing `DecisionList` / `ObjectiveCard` / `ActTierSpine`), minimal duplication.

## Decision

Restructure the resolved Stratum-1 set from **4 -> 6 canonical objectives**, splitting the **Intent Object** (`s1-vision`, with labour + capital stripped out) from a NEW **Steward / Team Object** (`s1-steward`) that becomes the canonical people reference -- never re-asked -- and the Tier-6 capacity-matching **supply baseline**.

| # | Objective | id | Layer | Action |
|---|-----------|----|-------|--------|
| 0.1 | Declare intent & vision | `s1-vision` | universal | REVISE (strip labour + capital) |
| 0.2 | Constitute the steward team | `s1-steward` | universal | **NEW** |
| 0.3 | Site boundaries & legal | `s1-boundaries` | universal | unchanged |
| 0.4 | Map stakeholders & community | `s1-stakeholders` | universal | REVISE (wording -- "outside the steward team") |
| 0.5 | Enterprise mix & priorities | `rf-s1-enterprise-mix` (+ silvopasture patch) | primary + secondary patch | REVISE + **NEW patch** |
| 0.6 | Residential intent & household scope | `res-s1-household-needs` | residential secondary | REVISE in place |

**Sequencing DAG:** `0.1 -> [0.2 || 0.3 || 0.4] -> [0.5 || 0.6] -> Tier 1`. 0.2 needs 0.1; 0.5 needs 0.1 + 0.3; 0.6 needs 0.1 + 0.2. **Critical invariant:** `prerequisiteObjectiveIds` and `STRATUM_PREREQS` reference ONLY universal ids -- a type-specific prereq would lock incompatible secondary combinations forever. The universal four gate S2 via `STRATUM_PREREQS`; the type-specific 0.5/0.6 cannot gate the next stratum universally (documented limitation).

Delivered in three independently-verified stages, all on `main`, **NOT pushed**:

- **Stage 1 -- catalogue / data (`5a303425`).** Edits to universal / regenFarm / silvopasture / residential catalogues; `parallelGroupId` plumbed through `authoring.ts` (`ObjectiveInput` + `obj()`); relaxed the `spineTraceability.conformance` prereq rule from *strictly-earlier-stratum* to *earlier-or-equal* + an intra-S1 acyclicity DFS guard; +1 universal across ~11 count assertions; `SILVOPASTURE_SECONDARY_PATCHES` 3 -> 4 (regen-farm-only landing, possessed-split allocation Amanah guard).
- **Stage 2 -- Team Object model + captures (`e7a3040a`).** Extended `StewardProfile` (residentStatus, roleAllocation, teamRole, decisionRights, capabilityByDomain, seasonalLabour, capitalContribution -- all optional, back-compat decode) + a project-level `StewardTeam` on `VisionData`; `visionStore` persist v4 -> 5; new `StewardTeamCapture` (6 modes c1..c6) wired via `DecisionWorkingPanel` `isStewardTeam` + `workbenchAffordances` `st-<mode>`; read-only `stewardSupplyBaseline` derivation. Client-only IndexedDB; no server / sync change.
- **Stage 3 -- Declaration UI (`1ff30117`).** Plan-only chrome on the SHARED `ActTierZeroWorkbench` via an additive `mode="declaration"` prop (Act passes nothing -> byte-identical). New pure `declarationModel.ts` (`TIER_ZERO_DISPLAY` / `THRESHOLDS` / `DECLARATION_MODE` / `deriveSequencing` / `deriveCanonicalObjects`) + `selectTeamRoster.ts`; new `DeclarationCenter` (mode header + Intent/Team cards + sequencing diagram) + `TeamRegistryPanel` (roster reference). Additive-by-omission props on `ActTierSpine` (`typeChips` / `thresholds`) and `DecisionList` (`actHandoff` / `showActHandoff`). `PlanTierShell` wires all; `ActTierShell` untouched. 20 files, +2911/-10.

## Rationale

- **Separation of concerns.** Purpose and capacity are different questions with different downstream consumers; bundling them weakened both and starved the Tier-6 capacity engine of a clean supply baseline. The split gives each its own canonical object.
- **Invariant-safe gating.** Routing every prereq through universal ids keeps every secondary combination resolvable -- the one rule that, if broken, silently locks objectives forever.
- **Reuse over rebuild.** Evolving the existing workbench (additive-by-omission props, shared `DecisionList` / `ActTierSpine`) kept the Act stage byte-identical and avoided a parallel Declaration screen to maintain.
- **Extends, does not replace, the catalogue-load model.** The 3-pass resolver + relationship matrix from the catalogue-driven-content decision are unchanged; this restructure is content + one additive authoring field (`parallelGroupId`), not an engine change.

## Alternatives Considered

- **Deliverable = data only / UI only.** Rejected for *both, data first* -- a catalogue restructure with no surfaced UI strands the steward; a UI with no clean data model fabricates structure.
- **0.2 = lightweight tag on `s1-vision`.** Rejected for the *full structured Team Object* -- a tag cannot serve as the Tier-6 supply baseline; the steward explicitly chose the structured capture.
- **New standalone Declaration screen.** Rejected for *evolve the existing workbench* -- a second screen duplicates `DecisionList` / `ObjectiveCard` / `ActTierSpine` and risks Act/Plan drift.
- **Rename the strata model to "Tier 0..6".** Rejected -- the codebase strata ids are load-bearing across catalogues, resolver, conformance suites, and persisted data; "0.x" stays a presentation layer only.

## Amanah

The fiqh boundary is **structural**, not prose:

- The **Intent reference** derives ONLY from the project's own `SharedVision` under neutral labels (Purpose / Non-negotiable / Committed); it fabricates nothing -- an empty `SharedVision` emits no intent rows (`selectTeamRoster` wording-pin test).
- **0.5 enterprise allocation** = a **possessed-production split** (household vs market) only -- explicitly **NOT** an advance sale, membership yield-share, or CSA/CSRA pre-sale (CSRA erased 2026-05-04, *bay' ma laysa 'indak*; see [[fiqh-csra-erased-2026-05-04]]).
- **0.2 capital inventory** records permitted-channel contributions only -- reuses the closed `CAPITAL_CHANNEL_LIST` enum (no advance-purchase channel) + verbatim `CAPITAL_SCOPE_NOTES`. No yield-share channel without Scholar Council.
- A wording-pin test asserts no `subscription | presale | advance sale | csa | csra | yield[- ]share` strings in the rendered Declaration corpus.

## Verification

- **Stage 3:** 43/43 new tests across 6 files (`declarationModel` 13, `selectTeamRoster` 10, `DeclarationCenter` 7, `TeamRegistryPanel` 5, `ActTierSpine` 5, `ActTierZeroWorkbench.declaration` 3), including Act-parity guards (no Declaration chrome when the props are omitted).
- **Typecheck:** `tsc` clean to the 4-error pre-existing baseline (`syncServiceWorkItemsFallback` x1, `WorkConflictSection` x3) + 2 foreign `useDimensionDrawTool` WIP errors.
- **Foreign-failure isolation:** 3 tier-shell suite failures (`BoundaryCaptureLegacy` open-map-disabled x2; `ActTierZeroWorkbench` "Founding cohort composition" x1) PROVEN pre-existing / foreign via stash-to-HEAD isolation -- foreign commit `5e35e8ef` enabled the open-map buttons and drifted a settlement c1 label; not introduced by this work.
- **Live preview** NOT driven (v3 routes hang the headless renderer deterministically -- [[project-screenshot-hang]]); rendered structure DOM-asserted by the component render tests.

## Consequences

- Tiers 1-6 now reference two canonical, never-re-asked objects (Intent + Steward/Team) instead of a bundled vision objective.
- `s1-steward` exists as a read-only **supply baseline** (`stewardSupplyBaseline`); the Tier-6 demand-vs-supply *consumer* rewiring (settlement-plan `capacityFit`, work-plan generators) is a future slice -- only the read seam is added now.
- The Team Object is **client-only IndexedDB** today; server-side sync / migration is deferred.
- **Amends** the two 2026-06-10 Declaration ADRs: their facts about a single bundled `s1-vision` carrying labour/capital badges (and the `s1-vision-labour` affordance) are now stale; their core mechanisms (artifact-badge rendering, the `ExitSuccessionCapture` build pattern) remain valid. See the amend callouts on those pages.
- **Amends** the 2026-06-15 structured-inputs ADR: its prefill source `s1-vision-labour` now reads from the new `s1-steward` objective.

## Connections

- **Extends** [[2026-05-29-atlas-spec-catalogue-driven-content]] (the catalogue-load + 3-pass resolver model is unchanged; this is content + one additive authoring field) and realises a slice of [[2026-05-29-atlas-spec-plan-tiered-objectives]] (the T0 layer).
- **Amends** [[2026-06-10-atlas-vision-grouping-badges-font-floor]] and [[2026-06-10-atlas-exit-succession-capture]] (stale single-bundled-`s1-vision` facts).
- **Amends** [[2026-06-15-atlas-structured-vision-form-inputs]] (stale `s1-vision-labour` prefill source).
- Deepens [[steward-data-model]] -- the steward/team capacity now has a dedicated Stratum-1 objective (`s1-steward`) split out from `s1-vision`.
- Amanah grounding: [[fiqh-csra-erased-2026-05-04]].
- Entity: [[olos]]. Logged [[log]] (2026-06-16).
