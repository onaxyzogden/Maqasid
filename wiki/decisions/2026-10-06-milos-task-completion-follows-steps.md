---
title: "MILOS — finishing a task's steps completes the task everywhere"
type: decision
date: 2026-10-06
status: accepted
tags: [milos, task-store, orientation, prophetic-path, dashboards, migration]
supersedes: []
superseded_by: []
---

# Task completion follows the steps

Amends [[2026-07-26-milos-centered-popups-node-drill-in]], which kept `toggleSubtask` from setting
`completedAt` so a node's task would not vanish mid-view.

## Context

The operator ticked every step of Health tasks in Orientation. The Health board and the
pillar/level dashboards still showed them open.

- Steppers judge completion from the steps.
- Boards and dashboards read `columnId` / `completedAt`, which `toggleSubtask` never set going
  forward.

## Decision

The operator chose, by selection:

- **One rule:** `services/task-completion.js` `syncTaskCompletion`.
  - Every step satisfied (done or "Doesn't apply") → Done + `completedAt`.
  - A reopened step → back to the column before Done.
  - Step-less tasks are untouched.
- **Where it applies:** `toggleSubtask` and the `done`/`notApplicable` path of `updateSubtask`.
- **Catch-up:** a one-shot catch-up, `task_completion_reconcile_v1`, promotes already-finished
  tasks. It promotes only, and never reopens a manual Done.
- **Nodes:** `buildTasksForNode({ keepCompletedSince })`. The popup passes start of day, so a
  task finished mid-view stays as a ticked pill until tomorrow. That preserves the July
  no-vanish behaviour without hiding completion from the rest of the app.

## Consequences

- Boards, dashboards and level gating now agree with Orientation.
- An operator who finished all Core tasks through Orientation may see the next level unlock on
  first load.
- Gate: `stages/implement-task-completion-sync-review.md`.

## Verification

- `npm test` 365/365. The new store tests fail 3/3 against `main`'s store.
- `npm run lint` and `npm run build` are green.
- Live Chromium run:
  - an old-state Health task was promoted on reload;
  - Orientation "Mark done" on every step moved two Health tasks to Done;
  - the Physical Health board shows both Done at 5/5, and the Health pillar shows Physical
    Health at 40%.
