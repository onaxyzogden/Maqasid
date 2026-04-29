---
title: "Prophetic Path — Maghrib reset, optional fasts, special-day banner, universal Threshold"
type: decision
date: 2026-04-29
project: milos
tags: [prophetic-path, islamic-day, maghrib, threshold, fasting, banner]
---

# 2026-04-29 — Prophetic Path: Maghrib reset, optional fasts, banner, universal Threshold

Four gaps closed on the Prophetic Path page in one session.

## 1. Maghrib daily-reset (replaces UTC-midnight for prayer/daily state)

New pure store `src/store/islamic-day-store.js`:
- `currentIslamicDayKey(now, maghribMs)` — yesterday's date string before
  today's Maghrib, today's after. Pure + testable.
- `useIslamicDayStore` with `lastKey` (persisted as `bbiz_islamic_day_key`)
  and idempotent `rolloverIfMaghribCrossed({ maghribMs, now, hooks })` that
  fires hooks only when the key changes.
- `DAILY_CEREMONY_MODULES = ['faith-salah', 'faith-siyam', 'work', 'health-physical']`.

Hooks:
- `useTaskStore.resetDailyCadenceTasks()` — clears subtask `done` flags and
  reverts Done-column tasks back to first non-Done column. Daily cadence is
  detected by `t.cadence === 'daily'`, tag `'daily-cadence'`, **or**
  `projectId` matching `/^faith_salah_/`, `/^faith_siyam_/`, `/^prayer_/`.
  Pattern match dodges the 8500-line seed-task tagging the original plan
  called for.
- `useThresholdStore.resetDailyCeremonies(moduleIds)` — clears
  `completedOpening`/`completedClosing` for the given module ids.

Trigger: `PropheticPath.jsx` `useEffect` watching `timings.Maghrib`. Polls
every 60s so the moment Maghrib passes mid-session is caught. Niyyah
rollover stays at UTC midnight (intentional — only prayer/daily state
pivots to Maghrib).

## 2. Optional-fast nodes auto-surface on Sunnah-fast days

`src/data/prophetic-path-submodules.js` gained predicates:
- `isMondayOrThursday(date)`
- `isAyyamAlBid(hijri)` — 13/14/15 of any Hijri month
- `isAshuraOrTasua(hijri)` — 9 + 10 Muharram only
- `isOptionalFastDay({ date, hijri })` — Mon/Thu OR Ayyam al-Bid OR Arafah
  OR Ashura/Tasua, **gated against** Eid al-Fitr, Eid al-Adha, Tashreeq.
- `isFastableDay({ date, hijri })` — Ramadan OR optional fast day.

`fasting-store.js` gets a separate `computeIsFastableDay`. `computeIsFasting`
stays untouched so iftar copy in TIME_CONTENT only fires when the user is
actually fasting.

`PropheticPath.jsx`: `FASTING_ONLY_NODE_IDS` → `FASTABLE_DAY_NODE_IDS`;
`getActiveNodeTiming` now takes `isFastableDay`. `maghrib-iftar` and
`sahari` light up on every Sunnah-fast day without needing the Settings
fasting override.

## 3. Special-day banner

New `src/components/islamic/PropheticPathBanner.jsx` + `.css`. Renders a
single chip strip above `.pp-spine` resolving the highest-priority event
via `getSpecialDayHeadline({ date, hijri })`:

1. Eid al-Fitr → 2. Eid al-Adha → 3. Arafah → 4. Tashreeq →
5. Laylat al-Qadr likely (odd last-10 nights) → 6. Last 10 Nights →
7. Ramadan → 8. Ashura/Tasua → 9. Jumuah → 10. Ayyam al-Bid →
11. Mon/Thu. Returns `null` on ordinary days — banner doesn't render.

## 4. Threshold triggers on every spine node

`THRESHOLD_TRIGGER_NODES` Set replaced with `THRESHOLD_MODULE_BY_NODE` map
covering all 20 nodes:
- Prayer nodes (fajr/dhuhr/asr/maghrib/isha/jumuah/eid-prayer/duha/qiyam/witr)
  → `'faith-salah'`
- sahari/iftar/taraweeh → `'faith-siyam'`
- bedtime/qiyam-rest/qaylulah → `'health-physical'`
- morning/midday-labor → `'work'`

Before/After spine buttons open Opening/Closing Threshold for every node.
Prayer nodes still route the main click to `PrayerSlideUp` (Threshold is
ceremony, slide-up is prayer hero).

## 5. Threshold modal — Skip in step rail (added late in session)

The modal had only `Previous · Next · Bismillah`. Added a **Skip** button
inside `.thr-steps`, right-aligned via `margin-left: auto`, opacity 0.6 →
1 on hover, hidden during the Pause step. Click triggers
`window.confirm(...)`; on confirm, calls `complete()` which marks the
ceremony done and dismisses. Lives in the rail (not the footer) so the
primary action keeps centerline focus.

## Tests + verification

- `src/data/__tests__/prophetic-path-day-helpers.test.js` — 16 cases
  (predicate truth tables, forbidden-day gates, headline priority,
  Maghrib-key boundary).
- `npm run lint`: ESLint + grounding-strict + audit:inline-refs all green
  (8 pillars at ratchet 0).
- `npm test`: 56/56 (40 grounding + 16 helpers).
- Preview snapshot at `/app/prophetic-path` confirmed banner above spine,
  all spine nodes rendered, no console errors. `preview_screenshot` still
  hangs on Windows — known issue per the 2026-04-29 preview decision.

## Files touched

- NEW `src/store/islamic-day-store.js`
- NEW `src/components/islamic/PropheticPathBanner.{jsx,css}`
- NEW `src/data/__tests__/prophetic-path-day-helpers.test.js`
- MOD `src/data/prophetic-path-submodules.js` (predicates + headline resolver)
- MOD `src/store/fasting-store.js` (`computeIsFastableDay`)
- MOD `src/store/threshold-store.js` (`resetDailyCeremonies`)
- MOD `src/store/task-store.js` (`resetDailyCadenceTasks`)
- MOD `src/components/islamic/PropheticPath.jsx` (banner mount, threshold map,
  Maghrib rollover effect, fastable-day filter)
- MOD `src/components/islamic/ThresholdModal.{jsx,css}` (Skip in step rail)
