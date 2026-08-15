---
title: "MILOS deferral semantics — complete vs settled, and why task-level snooze stays a board drop-out"
type: decision
date: 2026-08-13
status: active
---

# Deferral semantics: complete vs settled

## Context

Two separate "not now" affordances write the same field name at two different depths.

- **Orientation's footer** writes `snoozedUntilDayKey` on the **task** (`updateTask`). This drops the whole **board** out of the running via `deriveBoardSequence`'s `actionable` flag, and the cross-board / cross-pillar fall-through in `recommendOrientation` depends on exactly that.
- **The Prophetic Path node popup's footer** writes `snoozedUntilDayKey` on the **subtask** (`updateSubtask`, added 2026-07-28). This advances the chain past the deferred step and paints its chip amber.

The subtask-level version had a dead end. `isTaskComplete` reads only `isSubtaskSatisfied`, so a task whose every *remaining* subtask was deferred today was neither complete nor actionable: `findCurrentTaskIndex` kept pointing at it while `findCurrentSubtaskIndex` returned `-1`. The chain stalled on task A even though task B held real work. A patch shipped in the same change classified a previewed snoozed step as *behind* rather than *ahead*, which unlocked the footer — but that treated the symptom, not the cause.

## Decision

**Completion and deferral are different facts. Do not conflate them.**

`isTaskComplete(task)` stays exactly what it was — "every subtask is satisfied" — with no `todayKey` parameter. It is what progress and completion read, and `orientation-selector.test.js` pins the distinction deliberately.

Three predicates now sit beside it in `src/data/orientation-selector.js`:

| Predicate | Meaning |
|---|---|
| `isTaskComplete(task)` | every subtask satisfied — unchanged, no day awareness |
| `isTaskDeferredToday(task, todayKey)` | has real work, is **not** complete, and no subtask is eligible today |
| `isTaskSettledToday(task, todayKey)` | `isTaskComplete \|\| isTaskDeferredToday` |

**The chain walks past *settled*, not past *complete*.** `findCurrentTaskIndex(tasks, todayKey)` returns the first not-settled task; `decorateTaskChain` forwards the `todayKey` it already receives.

`taskPillState` **checks deferred before** the positional `index < currentTaskIndex → 'done'` rule, mirroring `subtaskChipState` one level down. Without that ordering the roll-forward reintroduces the original bug one level up: the rolled-past task falls behind `currentTaskIndex` and gets painted green — reading "finished" for work that was set aside. It reads **amber with a Moon** instead.

`SequentialStepFlow.handlePreviewTask` opens a settled task on its **first deferred step** rather than step 0. A pill is amber precisely because work was set aside there; landing on an already-finished step above it would contradict the pill. A genuinely complete task has no deferred step, so it still opens at 0 — unchanged.

## Scope: subtask deferrals only

`isTaskDeferredToday` **does not consult task-level `snoozedUntilDayKey`.** Task-level snooze keeps working the way it always has: whole-board drop-out via `actionable`, with Orientation's fall-through picking a sibling board in the same pillar first and another pillar only when the pillar is exhausted.

Two reasons.

1. **The fall-through is load-bearing.** Making a task-snoozed task merely "settled" would leave its board actionable, and Orientation would advance *within* a board the operator just set aside for the day rather than falling through out of it. Every existing Orientation test stays green precisely because that path was left alone.
2. **The two gestures mean different things.** "Not today" on a whole task is a decision about the task. "Not now" on a step is a decision about the step; rolling the task forward once every step has been so decided is the consistent reading of the *steps*, not a new decision about the task.

Orientation never writes subtask-level deferrals itself, so in practice only the node popup changes today. If a popup-created deferral later becomes visible to Orientation, it rolls forward there too — which is the intended behavior, not an accident.

## Progress ratios are unaffected

`getPillarTierSubtaskStats` still counts off `isSubtaskSatisfied` alone. A deferred task can never inflate a pillar ratio: the operator sees the chain move on without the numbers claiming work that was not done. This is the property that made the complete/settled split necessary rather than merely tidy.

## Backward compatibility

Every one of these helpers takes `todayKey` as an **optional trailing parameter**, and a falsy key reduces each to its previous behavior byte-for-byte — `isSubtaskEligible(st, undefined)` is identical to `!isSubtaskSatisfied(st)` because `isSubtaskSnoozedToday` short-circuits on a falsy key. `NodePhaseSlideUp` passes `todayKey`; `Orientation.jsx` does not. Threading it through Orientation's `SequentialStepFlow` call would activate all of this there and **requires re-deciding the carousel fall-through question first**.

## Related

- [[2026-07-27-milos-tier-vocabulary-canon]] — Core / Growth / Excellence, the labels the Education level switch shipped in the same change reuses
- `src/components/orientation/CONTEXT.md` — the two-"not now" note and the latent-pill-state caveat
- `src/components/islamic/CONTEXT.md` — the popup side of the same mechanism
