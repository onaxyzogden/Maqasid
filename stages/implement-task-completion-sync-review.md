---
phase: implement
slug: task-completion-sync
status: review
amanah: neutral
created: 2026-10-06 00:00
---

# Review Gate: implement — task-completion-sync

## Summary

Operator report: Health tasks marked complete in Orientation (every step ticked) still showed as
open on the Health board and in the pillar/level dashboards.

**Root cause.** Orientation's and the Prophetic Path node's "Mark done" call `toggleSubtask`. It
moved a card *out* of Done when a step was unticked, but never moved it *in*, and never set
`completedAt`, when the last step was ticked. Two families of views read completion differently:

- The board columns, `Dashboard.jsx`, `PillarLevelDashboard.jsx`, `getLevelStatus` and
  `getFocusTasks` read `columnId` / `completedAt`.
- Orientation and the node steppers read the steps (`isTaskComplete`).

The gap was deliberate in July: `buildTasksForNode` drops completed rows, and the choice kept a
node's task from vanishing mid-view
(`wiki/decisions/2026-07-26-milos-centered-popups-node-drill-in.md`).

**Fix (operator choices by selection):**

1. A task whose steps are **all satisfied** moves to Done with `completedAt`. Satisfied means
   done, **or "Doesn't apply"**, the same verdict as `isTaskComplete`. Reopening a step moves a
   Done card back to the column before Done. Tasks with no steps are untouched.
2. **Already-finished tasks are caught up once** on the next load.
3. On a node, a task finished today **stays as a ticked pill until tomorrow**:
   `buildTasksForNode({ keepCompletedSince })`, which the popup sets to the start of the local
   day.

## What changes in stored data

- **Ongoing:** `toggleSubtask` / `updateSubtask` write `columnId`, `completedAt` and `order` on
  the one task being changed, through `syncTaskCompletion` (`src/services/task-completion.js`).
- **One-shot:** flag `task_completion_reconcile_v1` (stored `bbiz_task_completion_reconcile_v1`)
  runs `reconcileTaskCompletion()` after every other seed migration.
  - **Promotion only:** for each `tasks_*` board with a `Done` column, tasks with ≥1 subtask that
    are all satisfied and not yet complete move to the end of Done.
  - `completedAt` is set to the task's `updatedAt`, which is closest to when the last step was
    ticked, or to now.
  - **Never reopens** a card someone dragged to Done.

### Why nothing is lost

- Only `columnId`, `completedAt` and `order` change.
- Subtasks, ticks, notes, snoozes and titles are untouched.
- No task is deleted.
- Idempotent: a second run is a no-op (tested).

### Known consequences

- **Level advancement can move forward.** `getLevelStatus` / the lowest-incomplete-level logic
  counts `completedAt`, so an operator who had already finished every Core task through
  Orientation may now see Growth unlocked. That's the correct reading of their progress.
- **A ticked step can't hide in Done.** A task with all steps ticked can no longer be dragged out
  of Done and stay out once a step changes: the next step change re-syncs it. Manual drags
  without step changes are unaffected.

**Reversal:** revert the commit and clear the flag. Promoted cards stay in Done until moved by
hand.

## Files Modified

- `src/services/task-completion.js` (new): `syncTaskCompletion`, `completionColumns`,
  `placeMovedTask`, `reconcileBoardCompletion`.
- `src/store/task-store.js`: `toggleSubtask` / `updateSubtask` go through `applySubtaskChange`.
- `src/services/migration.js`: `reconcileTaskCompletion()`.
- `src/data/prophetic-path-submodules.js`: `keepCompletedSince` option.
- `src/components/islamic/NodePhaseSlideUp.jsx`: passes start of day (`readDay`).
- Tests:
  - new `src/services/__tests__/task-completion.test.js`, whose store tests fail 3/3 on `main`;
  - node-pool cases in `src/data/__tests__/prophetic-path-node-order.test.js`.
- Docs: `src/store/CONTEXT.md` and `src/components/islamic/CONTEXT.md` describe the new
  behaviour.

## Amanah Gate

- [x] Halal purpose confirmed: makes recorded progress truthful across views (sidq).
- [x] No riba/gharar concerns.
- [x] Itqan standard met: one shared rule for every view, promotion-only catch-up, tested both
      ways.
- [x] Existing tests still pass: `npm test` 365/365 across 23 files, `npm run lint` green,
      `npm run build` ✓.
- Live check:
  - an old-state Health task (all steps ticked, card in To Do) was promoted on reload;
  - marking every step done in Orientation moved two Health tasks to Done;
  - the Physical Health board shows both as Done at 5/5;
  - the Health pillar page shows Physical Health at 40%.

## Reviewer Notes

## Decision
- [ ] **Approved** — proceed to next stage
- [ ] **Rejected** — rework needed (see notes above)
