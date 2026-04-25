---
title: "BBOS multi-pipeline support deferred to dedicated session"
type: decision
date: 2026-04-25
status: accepted
tags: [bbos, schema, project-store, deferred, pre-live-test]
superseded_by: null
---

# BBOS multi-pipeline support deferred to dedicated session

## Context

The 2026-04-25 BBOS pre-live-test hardening pass triaged three Open Questions on `wiki/entities/bbos-pipeline.md`. DP2 brought all three into session scope:

- **Q1** — Rejection / off-ramp flow when the Amanah Proof Audit fails at CRD.
- **Q2** — Multi-pipeline support (multiple BBOS businesses per operator).
- **Q3** — Dedicated task definitions for patch sub-stages 00A and 01B.

Q1 and Q3 are self-contained and ship in this session. Q2 is a schema migration, not a contained feature.

## Decision

**Defer Q2 to a dedicated future session.**

Live testing proceeds on the existing single-pipeline assumption (one BBOS pipeline per project). The current `task-store` and `project-store` schemas treat each project as having at most one active BBOS pipeline; this is an acceptable working constraint for the initial test cohort.

### Why deferred

Multi-pipeline is not a single-file change. Implementing it requires:

1. **Schema** — new `pipelines` collection (or array on the project) with `id`, `bbosStage`, `rejectedAt/Reason/By`, `createdAt`. Every BBOS task gains a `pipelineId` foreign key.
2. **Store layer** — `task-store` queries (`getBbosTasks`, `getStageTasksByFactory`, etc.) must filter by `pipelineId`. `project-store` mutations (`startBbosPipeline`, `rejectBbosPipeline`) must operate on a specific pipeline.
3. **Routes** — `/app/work/:projectId/bbos` becomes `/app/work/:projectId/bbos/:pipelineId` with a default-pipeline shim for legacy URLs.
4. **UI** — `BbosFullDashboard` gains a pipeline switcher. `LevelNavigator` and `StageScoreCard` scope to the active pipeline. Empty-state UI for "create new pipeline" on a project that already has one.
5. **Migration** — every existing BBOS task in localStorage gets a synthetic `pipelineId` matching its parent project's first pipeline.
6. **Role access** — `bbos-role-access.js` is pipeline-agnostic today; that stays, but role assignment may need to scope per-pipeline.

This is a 30–50K-token scope change with non-trivial migration risk. Doing it inline alongside Q1 + Q3 immediately before live testing would mix high-stakes refactors with surgical fixes, and inflate blast radius if something regresses.

### What lives in code today

- Each project has at most one active BBOS pipeline.
- BBOS stage state is tracked via `project.bbosStage` (string ID).
- BBOS tasks belong to a project; there is no `pipelineId` field.
- The Q1 rejection flow added in this session writes `rejectedAt`, `rejectionReason`, `rejectedBy` to the project record itself — a single-pipeline model.

### Migration shape (when Q2 ships)

The Q1 rejection fields lift cleanly into a per-pipeline record. The migration script can:
1. For each project with `bbosStage !== null`, synthesize `pipelines: [{ id: nanoid(), bbosStage, rejectedAt, rejectionReason, rejectedBy, createdAt }]`.
2. For each BBOS task, set `task.pipelineId = project.pipelines[0].id`.
3. Remove the legacy fields from the project record after migration.

Future-Claude reading this: do not collapse the rejection fields into the project before this migration runs — they encode the single active pipeline and become the seed for the pipeline record.

## Consequences

- The "one BBOS business per project" working assumption remains correct for live testing.
- An operator with two BBOS businesses today must use two MILOS projects.
- Open Question 2 on `wiki/entities/bbos-pipeline.md` stays open with a pointer to this decision.
- No code or schema work in this session takes a position that would foreclose multi-pipeline; everything stays additive.

## Reopening trigger

Reopen Q2 when at least one of:
- A live-test operator requests multiple BBOS businesses on a single project.
- Pipeline-level data (rejection state, score history, attribute readings) needs aggregation across pipelines for analytics.
- Project-level vs. pipeline-level concerns become genuinely tangled in `project-store` and the single-pipeline assumption is no longer the simpler model.

## See Also

- [[bbos-pipeline]] — entity page; Open Question 2 references this decision
- [[2026-04-25-amanah-rejection-flow]] — Q1 implementation that lives on the project record today
