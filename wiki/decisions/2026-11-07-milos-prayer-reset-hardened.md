---
title: "MILOS — every prayer node's task set resets each night, from any page"
type: decision
date: 2026-11-07
project: milos
tags: [prophetic-path, islamic-day, maghrib, task-store, daily-reset, app-shell]
amends: 2026-04-29-prophetic-path-maghrib-reset-and-banner
---

# 2026-11-07 — Prayer-node nightly reset hardened

**Decision:** the Maghrib daily reset introduced on 2026-04-29 is kept as the one clock, and its four gaps are closed so that every prayer node in the Prophetic Path starts each Islamic day with all its tasks uncompleted. No second (midnight) timer is added. Amends [[2026-04-29-prophetic-path-maghrib-reset-and-banner]] §1.

## Symptom

The operator reported that prayer-node task sets were not resetting each night. Orientation found that the 2026-04-29 reset existed but left four ways for a day to pass with stale state.

## The four gaps and what closed them

| # | Gap | Fix |
|---|---|---|
| 1 | `resetDailyCadenceTasks` cleared only subtask `done` and Done-column tasks. A step marked **Doesn't apply** (`notApplicable`), a step or task **snoozed** (`snoozedUntilDayKey`), and a task carrying `completedAt` outside Done all survived the night. | The reset now clears `done`, `notApplicable` and every `snoozedUntilDayKey` on daily boards, and reverts any task in Done **or** carrying `completedAt` to the first non-Done column (`completedAt: null`, `order: 0`). |
| 2 | The trigger lived in a `PropheticPath.jsx` effect, so a day spent on any other `/app` page never rolled over. | New `src/hooks/useIslamicDayRollover.js`, mounted once in `AppShell.jsx` beside `usePrayerTimes`. The `PropheticPath` effect and its imports are removed; `rg rolloverIfMaghribCrossed src` shows only the store, the hook and tests. |
| 3 | `currentIslamicDayKey` returns `null` without a Maghrib time, so with prayer times unavailable (no location, offline) the rollover never fired at all. | `islamicDayPivotMs(timings, now)` falls back to **local midnight** when `timings.Maghrib` is absent or unparseable. |
| 4 | **Found in Phase 4 verification, not in orientation.** Boards load lazily; on the dashboard none of the prayer boards is in `tasksByProject`, so the reset walked nothing. The old page-local trigger had masked this because the Prophetic Path page loads its boards first. | The reset also walks every persisted `tasks_*` key that `isDailyProject` matches and is not in memory, resets it in storage without loading it, and falls back to `col_${projectId}_to_do` (project-store naming) when the board has no project record. |

## Options considered

- **A (chosen):** harden the existing Maghrib reset and move the trigger app-wide.
- **B:** only extend the reset and leave the page-local trigger. Rejected: gap 2 remains.
- **C:** add a separate midnight timer. Rejected: two clocks would reset ʿIshāʾ tasks completed after Maghrib a second time at midnight.

## Accepted risk

On the day the midnight fallback gives way to a real Maghrib key (prayer times arrive mid-day), the two keys can disagree once and cause one extra reset. Both keys are `YYYY-MM-DD`; the extra reset only clears steps already reset. Niyyah rollover stays at UTC midnight, as on 2026-04-29.

## Evidence

- `src/store/__tests__/task-store-daily-reset.test.js` — 9 tests (gaps 1 and 4; non-daily `work_*` and `wealth_*` boards untouched), each seen red first.
- `src/store/__tests__/islamic-day-store.test.js` — 6 tests (key pivot, idempotent rollover, null Maghrib).
- `src/hooks/__tests__/useIslamicDayRollover.test.js` — 3 tests (today's Maghrib; midnight fallback for missing and unparseable timings).
- `npm test`: 706 tests pass. The 5 files under `src/services/__tests__/` fail to load because `fake-indexeddb` is not installed; they fail the same way without this change.
- `npm run lint`: 0 errors, 1 pre-existing warning (`IslamicPanel.jsx:32` unused eslint-disable). `npm run build` clean.
- Preview (Windows, built-in browser): Fajr → Before at 2/3 (Step A done, Step B doesn't apply); stale key forced from the **dashboard**, reload, reopen the board: 0/3, Step A current, B and C locked. With "Prayer times unavailable", the key still advanced to `2026-11-07` (gap 3).

## Files

- NEW `src/hooks/useIslamicDayRollover.js`, `src/hooks/__tests__/useIslamicDayRollover.test.js`
- NEW `src/store/__tests__/islamic-day-store.test.js`, `src/store/__tests__/task-store-daily-reset.test.js`
- MOD `src/store/task-store.js` (`resetDailyCadenceTasks`, imports `listKeys`)
- MOD `src/components/layout/AppShell.jsx` (mounts the hook)
- MOD `src/components/islamic/PropheticPath.jsx` (trigger effect and imports removed)
- MOD `src/hooks/CONTEXT.md`, `src/store/CONTEXT.md`, `src/components/islamic/CONTEXT.md`
- Plan: `.claude/plans/prayer-node-nightly-reset.md`. Branch `claude/prayer-node-nightly-reset-49ddf5`, merged into `main` as onaxyzogden/Maqasid#84 (`4366c17`, 2026-11-07).

## Left as found

- The stored key is double-prefixed (`bbiz_bbiz_islamic_day_key`) because the call site passes the prefix `safeSet` already adds. Harmless; renaming it would need a migration.
- The `"HH:MM (TZ)"` parser `timeToMs` now exists in four places (hook, `PropheticPath.jsx`, `utils/islamic-day-key`, `usePrayerTimes`). Not consolidated here.
