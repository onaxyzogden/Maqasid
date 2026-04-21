---
title: "Prayer slide-up: FLN carousel + 18 real boards + Option-A seed duplication"
type: decision
date: 2026-04-21
status: accepted
supersedes: prior tabs/list PrayerSlideUp (undone in-session)
---

## Context

The prayer node slide-up on `/app/prophetic-path-test` was originally a tabs/list layout that didn't match the approved mockup (`Prayer Dashboard Concept - Before.html`). The mockup required:
- Before/During/After as **levels** (three-level FLN carousel), not tabs
- 5 prayer segments (6 with Tahajjud) as pillars within each level, with task-pill-colored segment bars
- Full kanban body below for Before/After
- During: dark hero card (gold Bismillah + prayer name + live clock) — no kanban

The generic `faith_salah_*` boards aggregate tasks across all prayers; the slide-up needed per-prayer × per-phase attribution.

## Decisions

### 1. Clone, don't parameterize
Cloned `LevelNavigator → PrayerLevelNavigator` and `PillarLevelPage → PrayerLevelPage` rather than extending the existing shared components. User's explicit direction — preserves the seven-maqasid component's stability while letting the prayer variant evolve independently (e.g. `pickDefaultLevel` using `usePrayerTimes`, during-hero branch).

### 2. 18 real boards, not virtual filters
Created `prayer_{fajr|dhuhr|asr|maghrib|isha|tahajjud}_{before|during|after}` as first-class project boards (18 total) rather than computing them as runtime views over `faith_salah_*`. Reason: the slide-up's `ProjectBoard` expects a real `projectId` for task CRUD, drag-drop, and detail panels to function the same way they do in the standalone `/app/<submodule>` route. Virtual views would fork the task pipeline.

### 3. Option-A seed migration (duplicate generic sunan)
Most salah sunan lack prayer-specific attribution (only one task has `prayer:X`; the rest carry generic `prayer-phase:before|after` tags). Three options were surfaced:
- **A** (chosen): duplicate generic sunan across all 5 daily prayers' matching phase board
- B: attribute each generic sunan to a single inferred prayer
- C: pivot the data model

Chose A because users expect to see the same pre-prayer sunnah (siwak, wudu, rawatib) available at every prayer, not arbitrarily assigned to one. Prayer-specific and transition-tagged tasks (e.g. `transition:tahajjud-waking`, `transition:morning-adhkar` → fajr, `transition:pre-sleep` → isha) still route only to their inferred home.

### 4. Non-destructive migration
`FAITH_SEED_TASKS` remains untouched. Main-phase and untagged tasks stay in `faith_salah_*`. The prayer seed builder (`src/data/seed-tasks/prayer-seed-tasks.js`) reads `FAITH_SEED_TASKS` at import time and produces a fresh `PRAYER_SEED_TASKS` map — the faith layer has no knowledge of prayer boards.

### 5. During as a hero, not a kanban
`PrayerLevelPage` branches on `activeLevel === 'during'` and renders `<PrayerHeroDuring nodeId={pillarKey} />` instead of `<ProjectBoard>`. The `prayer_*_during` boards still exist (for schema symmetry) but are intentionally empty of seed tasks.

## Consequences

- 18 new boards × ~1–3 seed tasks per non-during board = ~20 new seeded tasks, well under the localStorage quota thresholds already handled by `seed-hydrator.js`.
- `prayer:fajr` and similar prayer-specific tags now have a semantically correct destination board; if new tasks are added with those tags in `faith-seed-tasks.js`, they auto-flow to the right prayer board on next seed pass.
- Cross-fade transitions between pillar/level switches use the same `fpb-content__layer--in/out` classes as `PillarLevelPage`, keeping UX consistency.
- `usePrayerTimes` drives default level selection (before if prayer time not yet reached, during if active, after otherwise) — slide-up opens in the context-appropriate phase.

## Verification evidence

- `bbiz_projects` → 18 `prayer_*` entries (fajr/dhuhr/asr/maghrib/isha/tahajjud × before/during/after)
- `bbiz_tasks_prayer_*` → 12 seeded boards (6 `_during` empty by design); counts: fajr_before=3, fajr_after=3, dhuhr_before=2, dhuhr_after=2, asr_before=1, asr_after=2, maghrib_before=2, maghrib_after=2, isha_before=1, isha_after=3, tahajjud_before=1, tahajjud_after=1
- `npm run build` clean (1.46s, 2691 modules)
- Manual preview: Before/Dhuhr renders dashboard with correct 2-task count; During/Dhuhr renders hero with bismillah + name + live clock
