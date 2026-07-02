---
title: "OLOS Tier 6 -- Mode 5: Launch Preparation (final Plan stratum restructure + Tier-0 Capacity Bridge)"
type: decision
date: 2026-06-18
status: accepted
tags: [olos, plan, tier-6, mode-5, launch-preparation, progress-tracking, capacity-bridge, demand-capture, amanah]
superseded_by: null
---

# OLOS Tier 6 -- Mode 5: Launch Preparation

**Status:** Accepted + implemented (2026-06-18). Six independently-verified stages on `main` -- `c99d81a2` / `f0443ba0` / `ae6e1994` / `643d513a` / `2304c8bc` / `167b11b8`. **Stages 1-2 are now on `origin/main`** (carried by an unrelated FF push); **Stages 3-6 are local-only** (`main` ahead of `origin/main` by 4). Steward authorizes pushes.

> [!warning] Push-state reconciliation
> A separate "always-clickable spine dividers" commit (`7b23c547`) was fast-forwarded to `origin/main` as `fea2625d..f0443ba0`, which **also carried the entire prior unpushed backlog onto origin** -- [[2026-06-17-atlas-threshold1-reality-check]], [[2026-06-17-atlas-mode4-tier34-design]], [[2026-06-17-atlas-threshold2-coherence-check]], the eyebrow-drop + spine-collapse work, **and Tier-6 Stages 1-2** (`c99d81a2`, `f0443ba0`). Those earlier decision/entity entries still read "NOT pushed"; that is now stale -- they are pushed. Only **Tier-6 Stages 3-6** (`ae6e1994`, `643d513a`, `2304c8bc`, `167b11b8`) remain local (`origin/main` = `f0443ba0`, `HEAD` = `167b11b8`, ahead 4).

## Context

The final and last Plan stratum. Direct sequel to [[2026-06-17-atlas-threshold2-coherence-check]] (Threshold 2) and [[2026-06-17-atlas-mode4-tier34-design]] (Mode-4 Tiers 3-4), for the same configuration: **Regenerative Farm (primary) + Residential/Live-In (secondary) + Silvopasture/Livestock (secondary)**.

Tier 6 is where a steward turns an integrated design into a sequenced, resourced, de-risked launch. Before this work `s7-phasing-resourcing` ("Phasing & Resourcing") was a plain stratum: its objectives carried no design chrome (the Mode-4 chrome arms only on `monitoringProtocol | buildsOnDisplay | planningDirectionMandate`, none of which s7 objectives had). The spec re-frames it as **Mode 5: Launch Preparation** and adds three things: (1) a display-only **progress-tracking** field on every Tier-6 objective (project-management data -- milestone-vs-plan, expenditure-vs-budget, capacity-deployment-vs-estimate -- explicitly distinct from ecological monitoring); (2) a **Tier 0 Capacity Bridge** on objective 6.2 (`s7-resource-plan`) that surfaces the steward team's declared SUPPLY (from Tier 0 Objective 0.2) side-by-side with the Phase-1 DEMAND the resource plan now captures; (3) reference-config Residential + Silvopasture launch-prep patches.

This work ships **Tier 6 only**. Threshold 3 (The Act Mandate) is a separate follow-up session; its operator-locked design is preserved verbatim in the Deferred section.

## Decision

Four operator decisions were locked via AskUserQuestion (2026-06-18):

1. **Scope = Tier 6 first; Threshold 3 separate.** Tier 6 only this session; Threshold 3 deferred with its design preserved.
2. **Capacity Bridge = ADD a real structured Phase-1 demand capture** (the heavier path). Phase-1 demand becomes real structured steward-entered data, joined display-only against existing supply -- not a placeholder.
3. **`progressTracking` = FULL SWEEP.** Authored on every resolving s7 objective across all catalogues (parity with the Mode-4 s4/s5 sweep), not just the 5 reference objectives.
4. **"Begin Act" depth (Threshold 3, deferred)** = `planReadOnly` + Act route guards + a "Raise a Concern" governance escape valve. Locked design in the Deferred section.

**Net-new schema (DISPLAY-ONLY, never gates):** `progressTracking: { milestones: { metric, cadence }[].min(2) }` on `PlanStratumObjectiveSchema`, after `planningDirectionMandate`. Deliberately DISTINCT from `monitoringProtocol` -- it has NO `feeds`, because progress tracking is execution bookkeeping, not an Observe-domain design input. Absent on every legacy objective, so legacy validates unchanged.

**Stratum rename is display-only.** `PLAN_STRATA[6].title` "Phasing & Resourcing" -> "Launch Preparation"; `id: 's7-phasing-resourcing'` + `ordinal: 7` + every `s7-*` slug stay byte-identical (the 2026-05-30 stratum-rename ADR: renaming an id is a multi-store migration; the Mode-4 "Strategic Decisions" rename kept the `s4-foundation-decisions` id -- same pattern here).

## Stages

- **Stage 1 -- `progressTracking` schema field + authoring helper (`c99d81a2`):** added the optional `progressTracking` object to `planStratumObjective.schema.ts` (after `planningDirectionMandate`); JSDoc pins DISPLAY-ONLY / never-a-gate / no-`feeds`-distinct-from-`monitoringProtocol`. Added the matching `ObjectiveInput` field + a conditional map-copy spread in `obj()` (authoring.ts) mirroring the `monitoringProtocol` block; round-trip test (preserved when set, `undefined` when omitted).
- **Stage 2 -- stratum rename + Mode-5 framing copy (`f0443ba0`):** `PLAN_STRATA[6]` title -> "Launch Preparation" + Mode-5 `summary` reword; `apps/web/src/v3/copy/plan.ts` `s7-phasing-resourcing` explainer reworded to Launch-Preparation framing. `id`/`ordinal`/all `s7-*` slugs byte-identical (test-pinned).
- **Stage 3 -- `progressTracking` full sweep, all 46 s7 objectives (`ae6e1994`):** authored `progressTracking.milestones` (>=2 `{metric,cadence}`) on every resolving `s7-phasing-resourcing` objective across the 13 catalogue files -- the **5 reference objectives verbatim from spec** (`s7-phase1`/U-S7.1, `s7-resource-plan`/U-S7.2, `s7-risk-register`/U-S7.3, `rf-s7-enterprise-sequencing`/RF-S7.4, `rf-s7-cash-flow`/RF-S7.5) + the **41 others derived faithfully** from each objective's own `focusedQuestion`/checklist/`actHandoff` (the Mode-4 derivation method, nothing fabricated). Extended the Amanah banned-term scanner over `milestones[].metric` + `.cadence`; new coverage test (every resolving s7 objective carries `>=2` milestones).
- **Stage 4 -- Residential + Silvopasture s7 patches (`643d513a`):** Residential +3 + Silvopasture +3 SECONDARY patches injected onto the always-present universal s7 triad via `PatchRecordSchema` (Phase-1 occupancy/sequence, domestic/livestock capital + capacity folded into the resource plan, domestic/livestock risks); injected ids `<target>-pres-<n>` / `<target>-silv-<n>`; occupancy kept distinct from the existing `res-s7-transition-plan` habitability objective (no duplication). Patch-count tests updated; every new patch targets always-present universal objectives (zero skips in the canonical triad).
- **Stage 5 -- structured Phase-1 demand capture (`2304c8bc`):** UPGRADED the existing `s7-resource-plan` c1 (labour by task/season) and c4 (capital by category) checklist items into structured captures **in place** -- no new checklist item, no completion-count change. New `DemandCapture.tsx` (`demandModeFor` / `decode` / `encode` / `summarise` / pure `phase1DemandBaseline` selector); the capital portion constrains its funding channel to the reused closed `CAPITAL_CHANNEL_LIST` enum (decode-constrains-foreign -> ''). Persists via existing `saveVisionFormData` / `visionFormData[projectId][formId]` (`ogden-act-evidence`) -- no new store. Test-pinned: `s7-resource-plan` checklist length + dg membership unchanged; channels constrained to the permitted enum. This capture is entered in the Act tier shell exactly like every other capture (existing Act behaviour, not Plan chrome leaking into Act).
- **Stage 6 -- Plan UI: Mode-5 chrome + Capacity Bridge + progress panel (`167b11b8`, 8 files):** three Plan-only components in `v3/plan/strata`, mounted once in `ObjectiveDetailPanel.tsx` after `<ActProgressBar>` (Plan-only by construction -> Act byte-identical):
  - `LaunchProgressPanel` -- renders `progressTracking.milestones` as a metric line + a cadence pill; blue skin, deliberately distinct from the green `MonitoringStreamPanel` (no `feeds` line).
  - `Mode5LaunchChrome` -- self-arms on `progressTracking` (`if (progressTracking == null) return null`); an `actHandoff` alone never arms it; hardcoded eyebrow "Mode 5 -- Launch Preparation" + the progress panel + the act-handoff chip. SEPARATE from `Mode4DesignChrome` so an objective carrying both fields shows accurate, non-overlapping eyebrows.
  - `CapacityBridgePanel` -- arms ONLY on `s7-resource-plan`; joins real steward SUPPLY (`stewardSupplyBaseline` over `useStewardRoster` + `stewardTeam`, read from Tier-0 Obj 0.2) against the captured Phase-1 DEMAND (`phase1DemandBaseline` over c1/c4); shows the derived hours balance (headroom when supply covers demand, shortfall otherwise); when no demand is captured it shows an honest "not yet captured" reading rather than fabricating numbers, and renders only the permitted funding-channel labels the capture stored.

## Amanah

OLOS authors no CSA / CSRA / salam / advance-sale / subscription / yield-share content (CSRA erased 2026-05-04, *bay' ma laysa 'indak* -- Islam does not permit the sale of what one does not yet possess). The mockup's "deferred CSA" / "Commercial CSA" strings are **not transcribed** -- any deferred enterprise is framed as a covenant-clean generic placeholder, Scholar-Council-gated if it ever becomes a real instrument. The banned-term scanner is extended over the new `progressTracking` milestone strings and all new patch + capture text. The capital demand capture uses only the permitted `CAPITAL_CHANNEL_LIST` channels (charitable donation, restricted donation, qard hasan, in-kind contribution, sponsorship) with the decode-constrains-foreign -> '' guard, so the channel labels the Capacity Bridge renders are covenant-clean by construction; the bridge authors no channel string of its own. Any real yield-share / membership instrument remains Scholar-Council-gated and out of scope.

## Verification

All six stage gates met. The 46-objective sweep is proven shape-correct + covenant-clean by `catalogues.test.ts` (round-trip + extended Amanah scan + new coverage test) + `spineTraceability.conformance.test.ts` staying green with no patch/resolution-count regression and no banned term. Stage 5: a test that `s7-resource-plan` checklist length + dg membership are unchanged after the c1/c4 upgrade, plus the channel-enum constraint. Stage 6: the new Mode-5 chrome / bridge suite is **7/7** (Mode-5 arms only on `progressTracking`; `LaunchProgressPanel` renders each cadence pill; the Capacity Bridge arms only on `s7-resource-plan`, joins seeded supply 23 hrs against captured demand 20 hrs -> "3 hrs/week headroom", and shows the honest empty reading when demand is absent); `plan/strata` **307/307**; web `tsc --noEmit` clean to the **standing 6-error foreign baseline** (`syncServiceWorkItemsFallback` x1, `WorkConflictSection` x3, `useDimensionDrawTool.commit` x2 -- none in the Tier-6 files); a grep confirms none of the three new panels is imported by the Act tier shell (Act render path unchanged). Each stage committed stage-scoped (explicit pathspec, Opus 4.8 trailer); heavy foreign WIP left intact. Live preview NOT driven (v3 routes hang the headless renderer -- [[project-screenshot-hang]]); structure DOM-asserted by unit/render tests.

## Alternatives Considered

- **Rename the stratum id** (`s7-phasing-resourcing` -> a launch-prep slug) -- rejected: an id rename is a multi-store migration (2026-05-30 stratum-rename ADR). A display-title rename keeps `id`/`ordinal`/all `s7-*` slugs byte-identical, exactly the Mode-4 "Strategic Decisions" precedent.
- **Capacity Bridge over a placeholder / static demand** -- rejected (operator Q2): Phase-1 demand is real structured steward-entered data (c1/c4 captures), joined display-only against existing supply -- never a fabricated figure.
- **Add NEW checklist items for the demand capture** -- rejected: the c1/c4 ids are upgraded in place so checklist length + dg membership + completion math are unchanged (test-pinned). No item added or removed.
- **A new store for demand** -- rejected: the capture rides the existing `saveVisionFormData` / `visionFormData[projectId][formId]` (`ogden-act-evidence`) pipeline; a pure `phase1DemandBaseline` selector does the join. No new store.
- **`progressTracking` carrying a `feeds` like `monitoringProtocol`** -- rejected: progress tracking is execution bookkeeping with no Observe-domain destination, so the field deliberately omits `feeds`.
- **A hard launch-readiness gate** -- rejected: `progressTracking` + all Mode-5 chrome are DISPLAY-ONLY, never gate; `STRATUM_PREREQS['s7-phasing-resourcing'] = ['s6-monitoring']` is untouched.

## Consequences

- The final Plan stratum now presents as "Launch Preparation" (Mode 5) with `id`/`ordinal`/all `s7-*` slugs byte-identical; every resolving s7 objective carries a display-only `progressTracking` the Mode-5 chrome renders.
- `s7-resource-plan` now captures real Phase-1 demand (c1 labour / c4 capital, Amanah-clean channels) and the Capacity Bridge reads it against Tier-0 supply -- the first cross-tier supply/demand join surfaced in Plan, satisfying "read from 0.2, never re-ask."
- `progressTracking` is a third DISPLAY-ONLY field beside `monitoringProtocol` / `planningDirectionMandate`; Mode-4 and Mode-5 chrome are SEPARATE so an objective carrying both shows accurate, non-overlapping eyebrows.
- **Act is byte-identical** (all chrome Plan-only via `ObjectiveDetailPanel`, rendered only by `PlanTierShell` / `PlanStratumShell`).
- Tier 6 completes the Plan-stage restructure; the only remaining Plan surface is **Threshold 3** (Act Mandate, after `s7`) -- deferred.

## Connections / Relationships

- **Predecessors:** [[2026-06-17-atlas-threshold2-coherence-check]] (immediate predecessor) and [[2026-06-17-atlas-mode4-tier34-design]] (the display-field + Plan-only-chrome template this reuses 1:1).
- **Reuses:** the `monitoringProtocol` schema-shape + Mode-4 authoring spread + `Mode4DesignChrome` / `MonitoringStreamPanel` as the field-and-chrome template; the `EcovillageCapitalPlanCapture` capture pipeline + its closed `CAPITAL_CHANNEL_LIST`; `stewardSupplyBaseline` + `useStewardRoster` (the Obj 0.2 supply read model from [[2026-06-16-atlas-tier0-declaration-restructure]]) for the supply column; the `PatchRecordSchema` RES/SILV patch authoring; the Amanah `detectCsaLikeText` / banned-term scanner.
- **Affected entity:** [[olos]].

## Deferred

- **Threshold 3 -- The Act Mandate** (after `s7-phasing-resourcing`): the final Plan-stage surface -- an assembly + ceremony, not an audit. Build by cloning the Threshold-2 quartet; `THRESHOLDS` already contains `threshold-3`. **"Begin Act" mechanics (operator-locked, Q2):** on Begin Act, record an act-mandate timestamp in a new `ogden-act-mandate` store (byProject, idempotent), set `planReadOnly: true`, navigate to Act. Plan objectives viewed FROM Act render display-only, enforced by **Act-route guards** -- an operator-authorized exception to the standing soft-gate-only / never-block invariant, scoped ONLY to the Plan->Act transition. **Escape valve "Raise a Concern":** raised from Act ONLY; writes to a new `ogden-plan-concerns` store (`{ objectiveRef, observation, proposedChange, raisedBy, timestamp, status }`); governance-reviewed per the Obj 0.2 team structure; approval lifts `planReadOnly` on that specific objective, records the amendment ALONGSIDE the original (additions only -- never overwritten), then re-locks. Observe is read-only ("Eagle Eye" dashboard; never raises concerns). Confirm scope at session start before building the guards.
- A genuine structural retire/relabel of `s6-integration-design` (overlay was chosen at Threshold 2; a real retire needs a per-config stratum mechanism + Scholar/architecture review).
- Pushing **Tier-6 Stages 3-6** (`ae6e1994..167b11b8`) to `origin/main` -- awaits steward authorization.
- A real yield-share / membership capital instrument (Scholar-Council-gated; permitted capital channels only).
