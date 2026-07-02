---
title: "OLOS Threshold 2 -- The Coherence Check (Plan-only audit hinge after Mode-4 Design)"
type: decision
date: 2026-06-17
status: accepted
tags: [olos, plan, threshold, coherence-check, mode-4, monitoring, soft-gate, amendments, amanah]
---

# OLOS Threshold 2 -- The Coherence Check

**Status:** Accepted + implemented (2026-06-17). Five independently-verified stages on `main` -- `fdb87fb3` / `486733e5` / `e83faf17` / `b1c67907` / `795f638a`. **NOT pushed** (steward authorizes pushes).

## Context

Direct sequel to [[2026-06-17-atlas-threshold1-reality-check]] (Threshold 1) and [[2026-06-17-atlas-mode4-tier34-design]] (Mode-4 Tiers 3-4), for the same configuration: **Regenerative Farm (primary) + Residential/Live-In (secondary) + Silvopasture/Livestock (secondary)**.

The Mode-4 restructure distributed a `monitoringProtocol` (Indicators / Triggers / Feeds) and a `planningDirectionMandate` into every `s4-foundation-decisions` (Strategic Decisions) and `s5-system-design` objective. Threshold 2 is the hinge that sits **after `s5-system-design`** and **audits that shipped design work** -- it designs nothing new. It is the second non-tier structural hinge (its own **mauve** register, distinct from Threshold 1's amber/gold), and runs as a single pass over three sections:

- **Section A -- System Integration:** 5 config-pinned checks that the s4/s5 designs connect (water isolation, fertility loop, access circulation, spatial zones, vegetation/shelterbelts).
- **Section B -- Closed Loops:** 3 enterprise waste-to-input loops; **B3 (residential kitchen-waste -> compost-bay -> kitchen-garden) is the spec's designed inline gap** -- the one item that surfaces open and is resolved by an amendment.
- **Section C -- Monitoring Protocol Coverage:** presence/coverage over each resolved s4+s5 objective (the schema now guarantees completeness -- see Decision 2).

When all three sections pass, a **Coherence Record** is sealable, and Tier 6 narratively unlocks.

**Terminology bridge:** doc Tier 3 = `s4-foundation-decisions` . doc Tier 4 = `s5-system-design` . doc **Tier 5 = `s6-integration-design`** . doc Tier 6 = `s7-phasing-resourcing`. Threshold 2 was already the second entry in the global `THRESHOLDS` constant (`afterStratumId: 's5-system-design'`), previously a decorative spine divider. The `plan/threshold/$thresholdId` route + `ActTierSpine` clickability props built for Threshold 1 generalise to it unchanged.

## Decision

Three operator decisions were locked via AskUserQuestion (2026-06-17):

1. **Tier 5 / `s6-integration-design` = OVERLAY -- keep s6 intact.** The spec asserts "Threshold 2 replaces Tier 5 entirely", but doc Tier 5 = stratum `s6-integration-design`, which is **not vestigial**: it is fully authored and resolving with ~40 objectives across all 14 project types, and its universal `s6-monitoring` objective is the prereq that gates s7 (`STRATUM_PREREQS['s7-phasing-resourcing'] = ['s6-monitoring']`). Because `excludedFromResolution` is global-per-objective, a literal structural retire would dangle s7's gate for *every* config and delete integration content for the other 13. So "replaces Tier 5" is honoured as **display narrative for the reference config only** -- s6 keeps resolving and gating s7 for all configs. Exactly the Threshold-1 overlay pattern; zero risk to the other 13.

2. **Section C = TIGHTEN the `monitoringProtocol` schema.** Enforce the spec letter: `indicators` becomes `{ metric, frequency }[].min(2)` (structured measurement frequency, >=2 indicators), and `feeds` is drawn from the **Observe-domain enum** (`UniversalDomain`) instead of a free-text label. This **migrates the ~130 just-shipped Mode-4 protocols** (Stage 1, the dominant cost) and **supersedes the "`feeds` as free-text" sub-decision** of [[2026-06-17-atlas-mode4-tier34-design]]. *Consequence:* once the schema guarantees completeness, Section C's runtime audit reduces to a **presence/coverage** check; the substantive inline-gap demo lives in Section B (B3).

3. **Seal effect = SOFT banner on `s6` + `s7`.** On seal, a calm "sealed at Threshold 2" reading shows on the two downstream strata; until sealed, an amber "Coherence Check not yet sealed" reminder arms there -- **display-only, never blocks navigation, `STRATUM_PREREQS` untouched** (A8 / Threshold-1 soft-gate precedent). The shortcut navigates to the threshold route; it never locks.

**Amendments are steward overlays, never catalogue mutation.** Inline gap-resolution amendments live in the new store, **append-only + permanently timestamped** (spec: "cannot be edited after submission"); the static catalogue is never edited at runtime. They surface on their Tier 3/4 objectives as "Threshold 2 amendments" beneath the design content, preserving design history.

## Stages

- **Stage 1 -- schema tighten + protocol migration + chrome update (`fdb87fb3`):** tightened `monitoringProtocol` in `planStratumObjective.schema.ts` (`indicators: {metric,frequency}[].min(2)`, `feeds: UniversalDomain`); migrated every shipped s4/s5 protocol (~130 objects, authored explicitly not regex-split); updated `MonitoringStreamPanel` to render the new shape (metric + frequency chip, `feeds` via the `UniversalDomain` label lookup); extended the Amanah banned-term scanner over the new `indicators[].metric/frequency` nesting; new test that every authored `feeds` is a valid `UniversalDomain` member; conformance + grounding green.
- **Stage 2 -- pure model + A/B/C audit engine (`486733e5`):** `apps/web/src/v3/plan/threshold/coherenceCheckModel.ts` -- `SECTION_A_CHECKS` (A1-A5), `SECTION_B_LOOPS` (B1/B2/B3, B3 `designedGap:true`), `SECTION_AB_REGISTRY` keyed by primary type (other configs **degrade gracefully** -- no A/B checks defined -- while Section C stays active), Section-C coverage evaluator, `evaluateCoherenceAudit`, `coherenceVerdict` (PASS iff every item pass-or-resolved), `coherenceGateState(stratumId, sealedAt)` (downstream = s6/s7; pending = downstream && !sealed), `deriveCoherenceOpen`, `COHERENCE_COPY`/`COHERENCE_GATE_COPY` (mode "Threshold 2", mauve `COHERENCE_PALETTE` accent `#9B7EC8`); re-exports the Amanah `detectCsaLikeText`/`CSA_ADVISORY_COPY` guard.
- **Stage 3 -- store + sync (`e83faf17`):** `apps/web/src/store/coherenceCheckStore.ts` (`ogden-coherence-check` v1, byProject, `idbPersistStorage`, `partialize`, `rehydrateWithLogging`) + syncManifest `SYNCED_STORES` registration (blob next to `ogden-reality-check`). `ProjectCoherenceCheck { itemResolutions, amendments(append-only), sealedAt? }`. `resolveItem` is **APPEND-ONLY** (no-op if the item is already resolved = "cannot be edited after submission"; no-op on empty) and **REFUSES text that trips `detectCsaLikeText`** -- a persistence-boundary Amanah guard. `seal` idempotent (original timestamp stands); `unseal` strips `sealedAt` but keeps history; `reset` drops the record. Mirrors `realityCheckStore` 1:1. 15 store tests.
- **Stage 4 -- surface + reference rail + route gate + spine clickability + mauve CSS (`b1c67907`):** `CoherenceCheckSurface.tsx` (center takeover; single pass through A/B/C; an open item surfaces the objective content inline + an amendment field -> `resolveItem` -> re-evaluate; "Seal Coherence Record" enabled only when the verdict is PASS; the sealed branch renders the Coherence Record) + `CoherenceCheckReferenceRail.tsx` (per-section tally, amendments log, seal state, Amanah advisory) + `Coherence.module.css` (mauve clone of the RealityCheck register) + the `plan/threshold/$thresholdId` `beforeLoad` redirect when `deriveCoherenceOpen` is false + spine clickability (`'threshold-2'` added to `clickableThresholdIds` when coherence is open) + the `thresholdId === 'threshold-2'` mount arms in the existing first-branch `thresholdActive` ternaries (mutually exclusive with Threshold 1 by route param; WebGL never mounts).
- **Stage 5 -- soft gate banner + on-objective amendments overlay (`795f638a`, 9 files, +673):** `CoherenceGateBanner.tsx` (Plan-only; mirrors `RealityCheckGateBanner`; reads `coherenceGateState`; null off s6/s7; **pending** -> amber "not yet sealed" reminder that **navigates** to the threshold route, never locks; **sealed** -> calm "sealed at Threshold 2" reading; both expose one nav shortcut) mounted in the `PlanTierShell` objective-detail rail right after `RealityCheckGateBanner` + `CoherenceObjectiveAmendments.tsx` (Plan-only self-gating overlay rendering store amendments touching this objective beneath the design content; additive, catalogue never mutated) mounted in `ObjectiveDetailPanel.tsx` right after `Mode4DesignChrome` + two new pure model helpers `auditItemObjectiveIds(itemId)` (coverage `c-<id>` -> `[id]`; Section-A/B item -> its `evidenceObjectiveIds`) and `amendmentsForObjective()` + `COHERENCE_COPY.onObjective` copy + mauve `objAmend*` CSS. Soft-gate proof test: an unsealed AND a sealed project BOTH still navigate to s6/s7.

## Amanah

OLOS authors no CSA / CSRA / salam / advance-sale / subscription / yield-share content (CSRA erased 2026-05-04, *bay' ma laysa 'indak* -- Islam does not permit the sale of what one does not yet possess). The mockup's "Commercial CSA" example is **not transcribed**. The banned-term scanner is extended to the migrated `monitoringProtocol` strings (incl. the new `indicators[].metric/frequency` nesting) and all Threshold-2 copy; the store's `resolveItem` **refuses** amendment text that trips `detectCsaLikeText` (banned `/(subscription|presale|pre-sale|advance[ -]sale|csa|csra|yield[ -]share)/i`) -- a persistence-boundary guard, so a violation can never be stored. Any real yield-share / membership instrument remains Scholar-Council-gated and out of scope (permitted capital channels only: charitable donation, restricted donation, qard hasan, in-kind contribution, sponsorship).

## Verification

All five stage gates met. The Stage-1 migration is proven referentially + covenant sound by `catalogues.test.ts` + `spineTraceability.conformance.test.ts` + the grounding suite staying green after the shape change, plus the feeds-enum-membership test (no free-text feed survived). The Stage-5 threshold suite is **141/141**; `ObjectiveDetailPanel` review+verify 8/8 (no regression from the additive import). Web `tsc --noEmit` clean to the **standing 6-error foreign baseline** (`syncServiceWorkItemsFallback.test.ts` x1; `WorkConflictSection.test.tsx` x3; `useDimensionDrawTool.commit.test.tsx` x2 -- none in the Threshold-2 files); canonical typecheck `corepack pnpm --filter @ogden/web run typecheck`. Each stage committed stage-scoped (explicit pathspec, Opus 4.8 trailer); heavy foreign WIP left intact (the operator's `499af95d` eyebrow-drop landed between Stage 4 and Stage 5 -- explicit-pathspec staging kept the two streams disjoint). Live preview NOT driven (v3 routes hang the headless renderer -- [[project-screenshot-hang]]); structure DOM-asserted by unit/render tests.

## Alternatives Considered

- **Literal structural retire of Tier 5 / `s6-integration-design`** (per the spec's "replaces Tier 5 entirely") -- rejected: `excludedFromResolution` is global-per-objective, so retiring `s6-monitoring` would dangle s7's gate for every config and delete integration content for the other 13. The overlay (display narrative + soft gate) gives the spec's intent with zero blast radius.
- **Section C as a runtime content audit** (free-text protocols checked at audit time) -- rejected in favour of tightening the schema so completeness is guaranteed at authoring time; the runtime audit then reduces to presence/coverage, and the substantive inline-gap demo moves to B3.
- **Hard seal gate** (promote the Coherence Record seal into `STRATUM_PREREQS`) -- rejected: would lock s6/s7 and require a covenant review; the soft mauve banner gives the same nudge with zero lock blast radius (A8 / Threshold-1 precedent).
- **Editable amendments** -- rejected: the spec requires "cannot be edited after submission"; `resolveItem` is append-only and idempotent so the design history is preserved.

## Consequences

- A `plan/threshold/threshold-2` surface now renders the three-section audit in its own mauve register, gated open by the design-completion progress, with no WebGL mount; the spine Threshold-2 entry is clickable only when the 14 design objectives are complete; **Act is byte-identical**.
- The `monitoringProtocol` schema is tightened system-wide (`indicators: {metric,frequency}[].min(2)`, `feeds: UniversalDomain`) -- this **supersedes the free-text `feeds` sub-decision** of [[2026-06-17-atlas-mode4-tier34-design]] and is enforced for all future authoring.
- A sealed Coherence Record drives a soft, display-only banner on s6/s7 + on-objective amendment overlays; nothing is hard-gated. `s6-integration-design` keeps resolving + gating s7 for all 14 configs.
- The clickable-spine plumbing + `coherenceGateState` further validate the generalisation to **Threshold 3** (Act Mandate, after `s7-phasing-resourcing`) -- deferred.

## Connections / Relationships

- **Predecessors:** [[2026-06-17-atlas-threshold1-reality-check]] (the 1:1 architectural template -- model/store/surface+rail/gate-banner quartet; route + spine clickability; soft-gate idiom) and [[2026-06-17-atlas-mode4-tier34-design]] (the s4/s5 design work this audits; its free-text `feeds` sub-decision is superseded here).
- **Reuses:** the `THRESHOLDS` constant move from [[2026-06-16-atlas-tier2-systems-reading-restructure]]; the `UniversalDomain` Observe-domain enum for the `feeds` wire; the Amanah `detectCsaLikeText` guard.
- **Mirrors:** the A8 soft-gate / advisory-banner precedent (seal never enforces).
- **Affected entity:** [[olos]].

## Deferred

- **Threshold 3** (Act Mandate, after `s7-phasing-resourcing`) -- the clickable-spine + gate-state plumbing generalises.
- A genuine structural retire/relabel of `s6-integration-design` (overlay was chosen; a real retire needs a per-config stratum mechanism + Scholar/architecture review).
- Structured `triggers` (`{observable, action}[]`) -- kept free-text this round (spec requires only >=1).
- Server-side sync of `ogden-coherence-check` (currently client-only IndexedDB).
- A real yield-share / membership capital instrument (Scholar-Council-gated; permitted capital channels only).
- Pushing the five stage commits (`fdb87fb3..795f638a`) to `origin/main` -- awaits steward authorization.
