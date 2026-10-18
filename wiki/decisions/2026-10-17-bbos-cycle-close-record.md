---
title: "BBOS Cycle Close Takes a Basis and Is Recorded"
type: decision
date: 2026-10-17
status: accepted
tags: [bbos, gate, record, cycle, legacy-dashboard, projectboard, approval-brief]
superseded_by: null
---

# BBOS Cycle Close Takes a Basis and Is Recorded

## Context

After [[2026-10-17-bbos-legacy-gate-record-path]], every UI gate move left a record with a basis except closing a cycle. `startNewBbosCycle` reset the pipeline to Identity and incremented `bbosCycle` with only a `window.confirm`. Three surfaces did this, all unrecorded:

- the legacy `BbosFullDashboard`'s **Complete Cycle**;
- ProjectBoard's header **New Cycle** button;
- the new Approval Brief, which showed "Close Cycle (deferred)" and could not act.

The operator asked to "give Complete Cycle a required basis and record it". They chose **all three surfaces**, recorded as a **new `'cycle'` decision**.

## Decision

- **A fifth gate decision, `'cycle'`.** `GATE_DECISIONS` gains `'cycle'`. The entry is written in the cycle being closed, with `stageId` set to the stage it closes from (OPT) and `toStageId` fixed to `'IDY'`.
- **The store records it and blocks it.** `startNewBbosCycle(id, record?)`:
  - with a record, it refuses while the closing stage has open conditions in this cycle;
  - otherwise it appends the `'cycle'` entry to the pre-increment project, then resets to IDY and increments the cycle.

  Without a record it resets as before. No UI path calls it that way any more.
- **One dialog for the legacy surfaces.** The legacy Advance dialog was moved out into `BbosGateMoveDialog`, which takes a required basis, lists open conditions with inline Mark resolved, and blocks while any are open. With `nextStage` null it becomes "Complete cycle N". The dashboard's Complete Cycle and the header's New Cycle both use it; the `confirm()` prompts are gone. ProjectBoard's `handleStageAdvance` requires a record to close a cycle, and moves the view to IDY only if the cycle actually incremented.
- **The Brief closes the cycle.** On OPT, Proceed is labelled **Close Cycle** ("Cycle closes; the pipeline returns to Identity"), with "Approve & Close Cycle" and "Confirm Cycle Close". It is blocked by open conditions like Advance. BbosPipelineDashboard calls `startNewBbosCycle(id, { ...record, stageId, by })`. The Gate record shows the entry as "Cycle closed".

## Consequences

- Every UI gate move now leaves a record with a written basis, including the close of a cycle.
- Open conditions on OPT now block closing the cycle in both dashboards, as they block Advance on any other stage.
- Tests: 326 green (1 new gate-log test and 3 new store tests). Lint and build are green.
- Verified in preview on the test project:
  - Header New Cycle listed an OPT condition and was blocked. After Mark resolved and a basis, it closed cycle 1. The log reads conditions → resolved → cycle, and the project went to IDY, cycle 2.
  - Legacy Complete Cycle opened the same dialog and closed cycle 2. The view followed to Identity.
  - The Brief's Close Cycle confirmed, closed cycle 3, and logged `cycle`.
  - The test project was then restored.

See [[bbos-pipeline]].
