---
title: "OLOS Threshold 1 -- The Reality Check (structural hinge between Reception and Mode-4 Design)"
type: decision
date: 2026-06-17
status: accepted
tags: [olos, plan, threshold, reality-check, reception, mode-4, soft-gate, intent-elements, classification, amanah]
---

# OLOS Threshold 1 -- The Reality Check

**Status:** Accepted + implemented (2026-06-17). Four independently-verified stages (A-D) on `main` -- `80c3b903` / `960cf525` / `35f2fcf5` / `a8aae2ba`. **NOT pushed** (steward authorizes pushes).

## Context

Direct sequel to [[2026-06-17-atlas-tier1-land-reading-restructure]], [[2026-06-16-atlas-tier2-systems-reading-restructure]] and [[2026-06-16-atlas-tier0-declaration-restructure]], for the same configuration: **Regenerative Farm (primary) + Residential/Live-In Stewardship (secondary) + Silvopasture/Livestock (secondary)**.

After the two reception tiers complete (Tier 1 = six `s2-*` Land-Reading surveys, Tier 2 = five `s3-*` Systems-Reading surveys), the steward holds a complete evidence base about the land but **has had no surface to turn back and measure their Tier-0 declaration against what the land actually said**. Tier-2 completion simply unlocked the Mode-4 Design strata with no synthesis step. **Threshold 1 is that missing hinge** -- "the moment OLOS stops being about what the steward wants and starts being about what this land can support." It is a **non-tier structural hinge** with its own amber/gold register (neither Mode-2 Reception nor Mode-4 Design), sitting **after `s3-systems-reading`**, and runs in two phases:

- **Phase 1 -- Review (analytical, no decisions):** the assembled 11-survey evidence, re-organised by **six evidence strands** (Water . Soil & Fertility . Ecology & Habitat . Infrastructure & Access . Land Health . Landscape Context) rather than by tier, plus a read-only intent recap and an optional per-strand steward stance/note. A reading surface only; complete when the steward signals ready.
- **Phase 2 -- Direction (decisional):** each Tier-0 intent element is classified **Feasible / Conditional / Deferred / Released** against the evidence (type-gated); when all are classified, a bounded **Planning Direction Statement** is composed + approved. Approval is the mandate every Mode-4 objective references.

**Terminology bridge:** doc "Tier 0/1/2" = codebase **Strata 1/2/3**; Mode-4 "Tiers 3-4" = **Strata 4-7** (`s4-foundation-decisions`, `s5-system-design`, `s6-integration-design`, `s7-phasing-resourcing`). Threshold 1 was already the first entry in the global `THRESHOLDS` constant (`declarationModel.ts`, `afterStratumId: 's3-systems-reading'`), previously rendered only as a decorative spine divider.

## Decision

1. **Intent is DERIVED, not re-authored at the threshold** (operator decision "Derive + VisionProfile fallback"). `deriveIntentElements({classify, constraints, visionProfile})` projects the two existing Tier-0 `s1-vision` captures into a flat typed `IntentElement[]`: `constraints` severity `'nn'` -> **non-negotiable** (hard `'hc'` excluded); `classify.committed` -> **committed**; `classify.aspirational` -> **aspirational** (both verbatim). When BOTH captures are empty, a `deriveIntentElementsFromProfile` fallback seeds from `VisionProfile` so a sparse project still has something to classify; captures win whenever they yield anything. Stable FNV-1a ids (`ie-<token>-<hash>`) key the downstream classification; idempotent + deduped. **There is NO bespoke `IntentElementsCapture`** -- the original Stage-A plan item was superseded by the derive decision (the intent already exists, typed, in Tier-0).

2. **Classification vocabulary `feasible | conditional | deferred | released`, type-gated** (`statusOptionsForType`): **non-negotiable** -> `['feasible','released']` only (if it cannot be met, the project itself is reconsidered); **committed** and **aspirational** -> all four; `releaseNeedsConfirm(type)` true only for **committed** (and the surface adds an existential release-confirm for non-negotiable too).

3. **The Mode-4 gate is a SOFT amber gate** -- derived (`realityCheckGateState(stratumId, approvedAt)` -> `{mode4, approved, pending}`; `pending` arms only on a Mode-4 stratum that is not yet approved), display-only, and **never blocks navigation**. `prerequisiteObjectiveIds` / `STRATUM_PREREQS` are **NOT touched**. This mirrors the A8 "Act Mandate" / `TrueNorthAdvisoryBanner` soft-gate precedent. The route guard's only hard gate is the reception-open check (Tier-1 6/6 + Tier-2 5/5), which gates *access to the threshold surface*, not progress through Mode 4.

4. **Plan-only chrome on the shared Act/Plan workbench; Act stays byte-identical.** Threshold clickability and the gate banner are mounted only through `PlanTierShell`; all new `ActTierSpine` props (`id` on `SpineThreshold`, `clickableThresholdIds`, `thresholdActiveId`, `onSelectThreshold`) are additive + defaulted, so Act passes none -> dividers stay decorative `role="separator"`.

5. **Amanah is structural, enforced where text is entered.** OLOS-authored copy seeds no CSA / advance-sale / subscription / yield-share (the spec's "Commercial CSA" example is **not transcribed**); the derive fallback never reads the economic axis (`incomeStreams`/`economicStyle`/`economicIntentLevel`) and fabricates nothing. `detectCsaLikeText` (the verbatim covenant banned-term regex) raises a **non-blocking** advisory naming the permitted capital channels (charitable donation, restricted donation, qard hasan, in-kind contribution, sponsorship) at every threshold text point (Phase-2 element/condition/note/gapNote + the reference rail); it never blocks a save or censors steward text. Wording-pin tests assert no banned framing in the seed-able surface copy + the Mode-4 gate copy.

## Stages

- **Stage A -- intent-element derivation (`80c3b903`):** pure, DOM-free `intentElements.ts` (`deriveIntentElements` + `deriveIntentElementsFromProfile`, FNV-1a ids). 12/12. No store/UI yet.
- **Stage B -- store + pure model + sync (`960cf525`):** `realityCheckModel.ts` (the single source of Threshold-1 logic + copy -- vocabulary/type-gating, six `EVIDENCE_STRANDS` + `STRAND_SURVEY_MAP` folding all 11 surveys exactly once per strand, `deriveStrandEvidence`, `composePlanningDirection`, `phase2Complete`, `detectCsaLikeText`, `REALITY_CHECK_COPY`/`STATUS_META`/`INTENT_TYPE_META`); `realityCheckStore.ts` (byProject zustand-v5, `ogden-reality-check` v1, `idbPersistStorage` + `rehydrateWithLogging`, mirroring `actEvidenceStore`; value types imported FROM the model so the dependency runs store -> model); registered in `syncManifest` `SYNCED_STORES` (the coverage guard fails the build otherwise). 56/56 (29 model + 10 store + 17 sync-manifest guard).
- **Stage C -- surface UI + routing (riskiest) (`35f2fcf5`):** the `v3/plan/threshold/` surface in the amber/gold register -- `RealityCheckSurface` (phase switch; **no WebGL ever mounts** on this route), `ThresholdReviewPhase` (six strands + intent recap + optional stance/note), `ThresholdDirectionPhase` (type-gated classification, Conditional condition field, inline gap-flag + note, release-confirm, compose + approve the Planning Direction Statement -> stamps `approvedAt` + locks; re-open clears), `RealityCheckReferenceRail` (progress + classification digest + CSA advisory). `routes/index.tsx` `v3PlanThresholdRoute` (`plan/threshold/$thresholdId`, `PlanLayout`) with a `beforeLoad` guard that redirects to the bare plan landing unless the reception gate is OPEN (`deriveReceptionProgress`). `PlanTierShell` reads `thresholdActive` from the route param as the **first arm** of both the center + right-rail takeovers (bottom tools dock suppressed). `ActTierSpine` gains the additive clickability props; `declarationModel` gains `ThresholdId` + a required `id` on each `THRESHOLDS` marker. 76 green.
- **Stage D -- soft Mode-4 gate + downstream registers + Amanah (`a8aae2ba`):** `realityCheckModel` pure additions -- `MODE_4_STRATUM_IDS` (pinned to `PLAN_STRATA` ordinals 4-7) + `isMode4Stratum`; `realityCheckGateState(stratumId, approvedAt)`; `groupClassifications(elements, classifications)` -> Feasible/Conditional/Deferred/Released (order-stable, unclassified omitted); `MODE4_GATE_COPY` (covenant-clean). `RealityCheckGateBanner.tsx` (new, Plan-only), mounted at the top of the `PlanTierShell` objective-detail arm: null off a Mode-4 stratum; **pending** -> an amber "approve Threshold 1 first" reminder with a shortcut that **navigates** (does not lock); **approved** -> a calm "in effect" confirmation plus the display-only **Conditional** (design requirements Mode 4 must satisfy, with their named conditions), **Deferred** (retained long-term), and **Released** (archived with note) registers, all read from the store. 16 new (10 `realityCheckModel.gate` + 6 `RealityCheckGateBanner`), 82 green in the threshold suite. 6 files, +831.

## Amanah

The classification surface is covenant-neutral, but the load-bearing guard is that **OLOS never authors / seeds CSA / advance-sale / subscription / yield-share** content (CSRA erased 2026-05-04, *bay' ma laysa 'indak* -- Islam does not permit the sale of what one does not yet possess). Intent derives from the steward's own declared values/outcomes; the empty-capture fallback excludes the economic axis. `detectCsaLikeText` (banned `/(subscription|presale|pre-sale|advance[ -]sale|csa|csra|yield[ -]share)/i`) raises a **non-blocking** advisory naming the permitted channels at every text-entry point; it never blocks classify/approve or censors free-text. Any real yield-share / membership instrument remains Scholar-Council-gated and is out of scope. Wording-pin tests cover the seed-able surface copy + `MODE4_GATE_COPY`.

## Verification

All four stage gates met. Cumulative threshold suite: **82 tests green** (Stage A 12 -> B +44 -> C/D rebalanced to 82 across 8 files). `tsc --noEmit` clean to the **standing 6-error foreign baseline** (`syncServiceWorkItemsFallback.test.ts`; `WorkConflictSection.test.tsx` x3; `useDimensionDrawTool.commit.test.tsx` x2 -- none in the Threshold-1 files). Each stage committed stage-scoped (explicit pathspec, Opus 4.8 trailer); the heavy foreign WIP working tree (routes/index.tsx search-rail, ActSearchRail*, Plan3DSelectionHandler, useDimensionDrawTool, types.ts, + untracked test/script files) left intact. Live preview NOT driven (v3 routes hang the headless renderer -- [[project-screenshot-hang]]); structure DOM-asserted by unit/render tests (the threshold surface is a non-map mount, but the route mounts `PlanLayout`).

## Alternatives Considered

- **Bespoke `IntentElementsCapture` at the threshold** (original Stage-A plan item) -- rejected: the intent already exists typed in the Tier-0 `s1-vision` captures; re-authoring it would duplicate state and risk drift. Superseded by the derive decision.
- **Hard Mode-4 prerequisite** (promote approval into `prerequisiteObjectiveIds`) -- rejected: would silently lock Mode-4 objectives and require a covenant review; the soft amber gate gives the same nudge with zero lock blast radius (mirrors the A8 precedent).
- **Re-organise evidence by tier** (not by strand) -- rejected: the spec's whole point is to re-read the 11 surveys through six cross-tier strands so the steward sees the land's systems, not the survey order.

## Consequences

- A `plan/threshold/$thresholdId` surface now renders the two-phase Reality Check in its own amber/gold register, gated open by the reception progress, with no WebGL mount; the spine Threshold-1 entry is clickable only when open; **Act is byte-identical**.
- An approved Planning Direction drives a soft, display-only Mode-4 gate + Conditional/Deferred/Released downstream registers; nothing is hard-gated.
- The clickable-spine plumbing + `realityCheckGateState` generalise to **Threshold 2** (Coherence Check, after `s5-system-design`) and **Threshold 3** (Act Mandate, after `s7-phasing-resourcing`) -- deferred until this pattern is validated.

## Connections / Relationships

- **Predecessor:** [[2026-06-17-atlas-tier1-land-reading-restructure]] (provides the six Tier-1 surveys this reads); reuses `deriveReceptionProgress().thresholdOpen` for the open-gate and the `THRESHOLDS` constant move from [[2026-06-16-atlas-tier2-systems-reading-restructure]].
- **Reads from:** [[2026-06-16-atlas-tier0-declaration-restructure]] (the typed `s1-vision` intent captures `deriveIntentElements` projects); deepens [[steward-data-model]].
- **Mirrors:** the A8 soft-gate / advisory-banner precedent (gate never enforces).
- **Affected entity:** [[olos]].

## Deferred

- A real yield-share / membership instrument (Scholar-Council-gated; explicitly out of scope).
- **Threshold 2** (Coherence Check, after `s5-system-design`) and **Threshold 3** (Act Mandate, after `s7-phasing-resourcing`) -- the clickable-spine + gate-state plumbing generalises to them.
- Server-side sync of `ogden-reality-check` (currently client-only IndexedDB).
- Promoting any Threshold-1 classification into a hard prerequisite (would require a covenant review -- intentionally avoided).
- Pushing the four stage commits (`80c3b903..a8aae2ba`) to `origin/main` -- awaits steward authorization.
