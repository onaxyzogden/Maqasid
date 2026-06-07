---
title: "ADR — cycle_id on FieldAction and propagation contract"
type: decision
date: 2026-05-29
status: Implemented
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-stage-flow-direction]
tags: [olos, atlas, adr, spiral, cycle, fieldaction, data-model]
---

# ADR 2 — `cycle_id` on FieldAction + propagation contract

## Status
Implemented — 2026-05-30 (accepted 2026-05-29)

## Context
The spiral data substrate requires every data point — every Plan decision, Act task, and Observe record — to carry a `cycle_id` so Plan revisions can be tied back to the cycle they revise (Handoff Index §1.2; Observe Dashboard §7.3: "Cycle IDs are attached to every Act task and every Observe data point").

Current code state: the cycle substrate exists for Observe and WorkItem (`packages/shared/src/schemas/observe/cycle.schema.ts`, append-only history). **FieldAction does not carry `cycle_id`.** Without it, the spiral closes in Observe but never in Act, breaking the audit trail.

## Options considered
- **A. Add `cycle_id` to FieldAction with a defined propagation contract** (recommended).
- B. Derive cycle membership indirectly via the originating Plan objective at read time (no stored field).
- C. Defer until Act map-first work (ADR 7) lands.

## Decision
Add `cycle_id` to the FieldAction schema. Propagation contract:
- Assigned at task creation from the project's currently active cycle.
- Immutable thereafter (matches Observe's "cycle IDs are immutable once assigned").
- Reserved value `"baseline"` sorts before all numbered cycles and is used for `field_survey` tasks that seed baseline Observe data.
- Backfill existing FieldActions to the **current** cycle (not `"baseline"`), since they were authored under the active cycle, not a baseline survey.

## Rationale
Deriving membership indirectly (option B) is fragile: a FieldAction can outlive or be re-pointed relative to its originating objective, and Observe already stores the field directly, so a stored `cycle_id` on Act keeps the two sides symmetric. Storing at creation and freezing it preserves "what evidence existed at the time" semantics.

## Consequences
- One schema addition plus a one-time backfill migration.
- Establishes the contract Observe ingestion relies on for cycle assignment.
- Pairs with ADR 8/9 source-tag fields and the Baseline Mapping spec's reserved `cycle_id: "baseline"`.
- **Unblocks ADR 12's 5-tier offline-sync priority queue.** Verification (2026-05-29) found tier 2-5 unrepresentable today because FieldActions sync as opaque per-project blobs; per-record tiering becomes possible only once records carry `cycle_id` + a `source_type` discriminator and sync as typed ops. This ADR's schema addition is the first prerequisite for that work.

## Implementation
**Phase 0 landed 2026-05-29 (commit `d2937cdf`, `feat/atlas-permaculture`, local).** `cycleId` added to `FieldActionSchema` (`'baseline'` or nonneg int, default 0) with a `compareCycleId` comparator (baseline sorts before all numbered cycles). The propagation contract is enforced in `fieldActionStore`: stamped at creation, immutable, and pre-existing records backfilled to the project's **current** cycle (not baseline) via persist `migrate` v1->v2 plus an `onRehydrateStorage` cross-store fold that reads observeCycleStore (`ogden-observe-cycles`). Backfill domain rule (FieldAction carries no `domainId`; cycles are per-(project, domain)): adopt the project-wide MAX `currentCycleId`; per-domain refinement deferred to ADR 5/6. Companion discriminators landed alongside: 4-value `taskType`, nullable `sourceObjectiveType` (ADR 9 anchor, unpopulated), optional `observedAt`. No transport change yet (rides the opaque blob until ADR 7 Phase 1). Tests green (shared schema + store migrate/backfill). Logged: [[log]] (2026-05-29 implementation entry). **Program close 2026-05-30:** the dependent typed-record program (ADR 7 Phases 1–4) completed and consumes this `cycleId` foundation end-to-end — per-record sync ops carry `cycleId`, and the 5-tier queue derives the baseline-vs-numbered survey tiers from it (`derivePriority`). This ADR is now **implemented**.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-stage-flow-direction]], [[2026-05-29-atlas-spec-cyclical-review-mode]], [[2026-05-29-atlas-spec-plan-output-enum]], [[2026-05-29-atlas-spec-offline-sync-priority-queues]]
