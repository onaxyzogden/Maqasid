# Session Execution Plan
**Date:** 2026-11-01
**Project:** MILOS V2.1
**Objective:** a fix so that opening a Prophetic Path node whose steps are all done (e.g. Tahajjud) still lists those steps with their done state, instead of only the "Nothing left in this task today" empty card.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~25,000 | Wiki grep, shared/orientation CONTEXT, SequentialStepFlow, SubtaskStepDetail |
| Planning (this document) | ~4,000 | |
| Execution — Phase 1 | ~6,000 | Amanah Gate, branch check, confirm Tahajjud data shape |
| Execution — Phase 2 | ~12,000 | Failing test, then SubtaskStepDetail change |
| Execution — Phase 3 | ~15,000 | Preview screenshots (Prophetic Path + Orientation), test, lint, build |
| Execution — Phase 4 | ~5,000 | CONTEXT.md row, wiki log, debrief |
| **Total Estimated** | **~67,000** | |

---

## Risks & Assumptions

### Assumptions
- [ ] Cause: `SequentialStepFlow` clamps the subtask index, so `previewedSubtask` is null only when the previewed task has **zero subtasks**. `SubtaskStepDetail` then returns the "Nothing left in this task today" card early, which also drops the crumb, tags and task stepper, so the operator cannot see the task or move to another. Phase 1 confirms this against Tahajjud's real Before-tab tasks; halt and re-plan if they have subtasks.
- [ ] Fix (recommended option A): when `subtask` is null but `task` is present, render the **task itself** as the step: crumb, progress, task stepper, tags, a Now box with the task title/description and its done state. Keep the calm complete card only for `task == null`.
- [ ] Other options considered: (B) hide zero-subtask tasks from the stepper, rejected because it hides practice the board shows; (C) keep the card but also render the steppers above it, rejected because it still doesn't show what the task is.
- [ ] Work stays uncommitted in the current working tree (branch `feat/03b-stress-exit`, which has unrelated wiki edits). Nothing is committed or pushed unless you ask. Phase 1 checks the branch and halts on a mismatch.
- [ ] The fix sits in shared `SubtaskStepDetail`, so the Orientation sheet gets the same behaviour. That's intended, and Phase 3 checks it.

### Must Not
- Change any seed content, Islamic text, attributes or grounding (`git diff --stat` touches only `src/components/shared/` plus tests and CONTEXT.md)
- Move sequence/locking logic into components (`orientation-selector.js` stays unchanged: `git diff src/data/orientation-selector.js` is empty)
- Put a `useEffect` reset into `SequentialStepFlow` (grep `useEffect` in that file is still empty)
- Claim the UI works without a screenshot

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Tahajjud tasks do have subtasks and the cause is elsewhere (e.g. host passes a different task) | Low | High | Phase 1 reproduces it with real data before any edit; halt and re-plan |
| Footer "Completed" (revert) on a zero-subtask task calls `onRevert(task, null)` and a host crashes | Med | Med | Phase 2 reads both `onRevert` hosts; disable the primary when there's no subtask if a host can't handle null |
| Orientation sheet's "nothing left today" variant changes look | Low | Low | Phase 3 screenshot of Orientation too |

> If any assumption is wrong, halt and re-plan before continuing.

---

## Staged Execution Checklist

### Phase 1 — Gate and confirm
- [ ] Task 1.1 — Run the Amanah Gate (`docs/principles.md`) on this task: does it serve a halal purpose, and does any riba, gharar or other ethical concern arise? On any non-pass verdict, stop all phases and report.
- [ ] Task 1.2 — Confirm the branch and working tree match the assumption; halt on mismatch.
- [ ] Task 1.3 — Reproduce: open the Tahajjud node in preview (`superpowers:systematic-debugging`), inspect the Before-tab `items` and confirm which tasks have zero subtasks.
**Gate:** Approve / Round robin / Deny, after the Amanah verdict and the confirmed cause.

### Phase 2 — Test, then fix (`superpowers:test-driven-development`)
- [ ] Task 2.1 — Add a failing test: `SubtaskStepDetail` with a `task` and `subtask == null` renders the task title and the `taskStepper` slot, and not "Nothing left in this task today".
- [ ] Task 2.2 — Change `SubtaskStepDetail`: a zero-subtask task renders as its own step (crumb, progress, task stepper, tags, Now box with title/description); the complete card only when `task` is null.
- [ ] Task 2.3 — Check both `onRevert` hosts (`OrientationSheet`, `NodePhaseSlideUp`) handle a null subtask; if not, disable the primary for that case in `SequentialStepFlow`.
**Gate:** Approve / Round robin / Deny, with the test passing.

### Phase 3 — Verify (`superpowers:verification-before-completion`)
- [ ] Task 3.1 — `npm test`, `npm run lint`, `npm run build`, all clean.
- [ ] Task 3.2 — Preview screenshots at phone width: Tahajjud Before tab after tapping each task pill, plus one Orientation sheet card.
**Gate:** Approve / Round robin / Deny, with the screenshots shown.

### Phase 4 — Close
- [ ] Task 4.1 — Update the `SubtaskStepDetail.jsx` row in `src/components/shared/CONTEXT.md` (null-subtask behaviour).
- [ ] Task 4.2 — Stage 05: prepend the `wiki/log.md` entry, then the debrief.
**Gate:** Session complete when Phase 4 is written.

---

## Definition of Done
On the Tahajjud node's Before tab, tapping any of the task pills shows that task's title, tags and done state, with the task stepper still visible for moving between tasks. The Orientation sheet still renders. `npm test`, `npm run lint` and `npm run build` pass, with screenshots as proof.
Checked against the Objective: "a fix so that opening a Prophetic Path node whose steps are all done (e.g. Tahajjud) still lists those steps with their done state, instead of only the "Nothing left in this task today" empty card."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
