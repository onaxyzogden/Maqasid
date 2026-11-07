# Session Execution Plan
**Date:** 2026-11-07
**Project:** MILOS V2.1
**Objective:** every prayer node in the Prophetic Path has its task set reset each night, so each new day starts with all prayer tasks uncompleted, verified by tests and in the app.
**Context Source:** Project Wiki

---

## Estimated Token Usage
| Phase | Estimated Tokens | Notes |
|---|---|---|
| Orientation (already used) | ~30,000 | Wiki grep, islamic/store CONTEXT, task-store, islamic-day-store, PropheticPath trigger |
| Planning (this document) | ~5,000 | |
| Execution — Phase 1 | ~6,000 | Amanah Gate, branch check, storage-prefix and timings-shape check |
| Execution — Phase 2 | ~18,000 | Failing store tests, then `resetDailyCadenceTasks` hardening |
| Execution — Phase 3 | ~14,000 | App-wide rollover hook in AppShell, fallback key, remove page-local trigger |
| Execution — Phase 4 | ~16,000 | `npm test`, `npm run lint`, `npm run build`, preview screenshot of a reset board |
| Execution — Phase 5 | ~7,000 | CONTEXT.md rows, wiki decision + log, commit, debrief |
| **Total Estimated** | **~96,000** | |

> Note: Token estimates are approximate. Flag if any phase exceeds estimate by >50%.

---

## Risks & Assumptions

### Assumptions
- [ ] Recommended option A (chosen): harden the existing Maghrib reset rather than add a second clock. (1) `resetDailyCadenceTasks` clears subtask `done`, `notApplicable` and `snoozedUntilDayKey`, clears task-level `snoozedUntilDayKey`, and reverts any task that is in Done **or** carries `completedAt` back to the first non-Done column. (2) The rollover trigger moves from `PropheticPath.jsx` into a new hook `src/hooks/useIslamicDayRollover.js`, mounted once in `AppShell.jsx` (which already calls `usePrayerTimes`), so the reset fires on any `/app` route. (3) With no prayer timings yet, the key falls back to the local calendar day (the same fallback `computeTodayKey` already uses), so a day never passes without a reset. Skills: `superpowers:test-driven-development` for Phases 2–3, `superpowers:verification-before-completion` for Phase 4.
- [ ] Other options considered: (B) only extend `resetDailyCadenceTasks` and leave the page-local trigger, rejected because a day spent off the Prophetic Path page still never resets; (C) add a separate midnight timer alongside Maghrib, rejected because two clocks would reset Isha tasks completed after Maghrib a second time at midnight.
- [ ] "Every prayer node" = the six `PRAYER_NODE_IDS` boards (`prayer_{id}_{before|after}`) plus the `faith_salah_*` boards the other prayer nodes (duha, witr, jumuah, eid) draw from. Both already match `isDailyProject`; Phase 1 confirms the id patterns and halts if a prayer node reads from a board outside them.
- [ ] Work lands on branch `claude/prayer-node-nightly-reset-49ddf5` in this worktree, committed at Phase 5, not pushed. Phase 1 checks the branch and halts on mismatch.
- [ ] `safeSet('bbiz_islamic_day_key')` writes a key the preview check can find in DevTools; Phase 1 reads `services/storage.js` to confirm the real localStorage key name before the Phase 4 preview step relies on it.

### Must Not
- Must not reset tasks on non-daily boards (work, wealth, family boards without a daily cadence). Test: a `work_*` task in Done stays in Done after the reset.
- Must not leave any snooze standing into the new day: the reset clears every subtask and task `snoozedUntilDayKey`, including one keyed to a future day. Named here so the choice is deliberate.
- Must not fire the reset from two sites once the hook is app-wide. Grep: `rg "rolloverIfMaghribCrossed" src` returns only the store, the hook and tests.
- Must not touch seed-task data or grounding `sources`. Grep: `git diff --stat` lists nothing under `src/data/seed-tasks/`.
- Must not genericize the Islamic-day naming (Maghrib, Isha, Fajr) in code, comments or docs.

### Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Fallback local-day key and later Maghrib key disagree on the switch day, causing one extra reset | Med | Low | Both are `YYYY-MM-DD`; an extra reset only clears steps already reset. Noted in the decision record. |
| Moving the trigger out of PropheticPath breaks a test that imports its constants | Low | Low | `prophetic-path-constants.test.js` is read in Phase 1; constants stay in place. |
| Reverting `completedAt` tasks reopens a task the operator finished manually from a board | Low | Med | Scope is daily boards only; a daily task finished manually is meant to recur. |
| Pre-existing failures in `src/services/__tests__/` (missing `fake-indexeddb`) mask a new failure | Med | Low | Phase 4 compares the failing-file list before and after; only those 5 may fail. |

> If any assumption is wrong, halt and re-plan before continuing.

### Falsifiability Checklist
1. Does every check have a pass condition that can fail? Yes: Phase 2 tests are run red first (Task 2.1), Phase 4 names exact commands and the allowed pre-existing failures (Tasks 4.1–4.3), the preview step needs a screenshot showing untouched pills after a forced rollover (Task 4.4).
2. Is every environment or source assumption checked by a Phase 1 task? Branch (1.2), storage key name (1.3), board id patterns (1.4), constants test (1.5).
3. What does any shared output claim or get named, and is it true? The wiki decision `2026-11-07-milos-prayer-reset-hardened.md` claims the three gaps are closed; Phase 4 evidence backs each. The commit is named in the log entry.
4. Are the Stage 03 contract lines present? Covenant line per phase: Phase 1 Amanah Gate task; Phases 2–5 each keep Islamic naming (Must Not). Token re-total: Task 5.5. State saved against compaction: this plan file and the Task 5.2 log entry.
5. What happens after each step that cannot be undone? The only one is the Phase 5 commit, on a session branch, not pushed; revertible by `git revert`.

---

## Staged Execution Checklist

### Phase 1 — Amanah Gate and ground checks
- [ ] Task 1.1 — Amanah Gate: screen the task (nightly reset of prayer-practice tasks) for halal purpose, riba, gharar or ethical concern. A non-pass verdict stops the session before any edit.
- [ ] Task 1.2 — Confirm branch is `claude/prayer-node-nightly-reset-49ddf5` and the tree is clean; halt on mismatch.
- [ ] Task 1.3 — Read `src/services/storage.js` to confirm how `safeSet` prefixes keys; record the real key for `bbiz_islamic_day_key`.
- [ ] Task 1.4 — Confirm `PRAYER_NODE_IDS` and the board ids the other prayer nodes use all match `/^prayer_/` or `/^faith_salah_/`; halt if any prayer node reads outside them.
- [ ] Task 1.5 — Read `src/components/islamic/__tests__/prophetic-path-constants.test.js` and `src/data/__tests__/prophetic-path-day-helpers.test.js` for the test style and any dependency on the PropheticPath trigger.
**Gate:** Amanah Gate passed, branch and key name confirmed, no prayer node outside the daily patterns.

### Phase 2 — Harden `resetDailyCadenceTasks` (TDD)
- [ ] Task 2.1 — Write `src/store/__tests__/task-store-daily-reset.test.js`: (a) `done` cleared, (b) `notApplicable` cleared, (c) subtask and task `snoozedUntilDayKey` cleared, (d) Done-column task reverted with `completedAt: null`, (e) a task with `completedAt` but not in Done is also reverted, (f) a non-daily board task is untouched. Run; tests b, c, e must fail against the current store.
- [ ] Task 2.2 — Extend `resetDailyCadenceTasks` in `src/store/task-store.js` to clear those fields and revert on `completedAt`. Run; all six pass.
**Gate:** Phase 2 tests green; no other test newly failing.

### Phase 3 — App-wide rollover trigger (TDD)
- [ ] Task 3.1 — Write `src/store/__tests__/islamic-day-store.test.js`: rollover fires hooks once per key change, no-ops on the same key, and `currentIslamicDayKey` with a null Maghrib returns null (documenting why the hook needs a fallback).
- [ ] Task 3.2 — Add `src/hooks/useIslamicDayRollover.js`: takes `timings`, computes Maghrib ms from today's date, falls back to local midnight when timings are absent, calls `rolloverIfMaghribCrossed` on mount and every 60 s with the two reset hooks.
- [ ] Task 3.3 — Mount it in `AppShell.jsx`; remove the equivalent effect and now-unused imports from `PropheticPath.jsx`. Grep confirms a single trigger site.
**Gate:** `rg rolloverIfMaghribCrossed src` shows store, hook, tests only; `npm run lint:eslint` clean.

### Phase 4 — Verification
- [ ] Task 4.1 — `npm test`: all pass except the 5 pre-existing `src/services/__tests__/` load failures; list them.
- [ ] Task 4.2 — `npm run lint` clean.
- [ ] Task 4.3 — `npm run build` clean.
- [ ] Task 4.4 — Preview: tick one Fajr Before step and mark another "Doesn't apply", go to the dashboard (not the Prophetic Path page), set the stored Islamic-day key to a stale value in DevTools, reload, open Fajr → Before, screenshot showing both steps unticked and the task back at step 1.
**Gate:** Three commands green with the pre-existing exceptions only, and a screenshot proving the reset.

### Phase 5 — Close
- [ ] Task 5.1 — Update `src/components/islamic/CONTEXT.md`, `src/store/CONTEXT.md` and `src/hooks/CONTEXT.md` rows for the moved trigger and the widened reset.
- [ ] Task 5.2 — Write `wiki/decisions/2026-11-07-milos-prayer-reset-hardened.md` (amends 2026-04-29) and prepend a `wiki/log.md` entry; add the index row.
- [ ] Task 5.3 — Commit on the session branch with the required attribution line; do not push.
- [ ] Task 5.4 — Session Debrief per `05_close`.
- [ ] Task 5.5 — Re-total tokens against the estimate; flag any phase over by >50%.
**Gate:** Session complete when the Definition of Done holds.

---

## Definition of Done
`resetDailyCadenceTasks` clears `done`, `notApplicable` and every `snoozedUntilDayKey` on daily boards and reverts completed tasks, with six passing tests. The rollover runs from `AppShell` on every app route with a local-day fallback, from one trigger site, with passing store tests. `npm test`, `npm run lint` and `npm run build` are green apart from the five pre-existing `fake-indexeddb` load failures. A preview screenshot shows a Fajr Before board reset after a forced rollover. CONTEXT rows, decision, log and commit exist. Checked against the Objective: "every prayer node in the Prophetic Path has its task set reset each night, so each new day starts with all prayer tasks uncompleted, verified by tests and in the app."

---

## Awaiting Approval
Choose **Approve** to begin execution, **Round robin** to refine, **Deny** to stop, or **Other** to give feedback (typing "approved" also works).
