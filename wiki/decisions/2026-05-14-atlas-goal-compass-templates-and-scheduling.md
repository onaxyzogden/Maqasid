---
title: "Goal Compass — project-type templates + auto-scheduled tasks to Act calendar"
date: 2026-05-14
project: atlas
status: shipped
---

# Goal Compass — project-type templates + Act calendar auto-schedule

## Context

After shipping the 4-tab Goal Compass MVP earlier the same day, two
gaps surfaced from review:

1. **Goal tree was a blank-slate editor.** Stewards saw the same
   homestead-seeded tree regardless of project type, with full
   add/remove/edit on every criterion. Decision fatigue dominated;
   most stewards just wanted the canonical shape for their archetype
   with the option to tune targets.
2. **Generated tasks never reached the calendar.** The sequencing
   engine emitted `PhaseTask` rows with a `season` string but no
   concrete dates, so they did not appear in Act's calendar. The
   bridge from "I generated a plan" to "I see this week's work" was
   missing.

## Decision

### Templates by project type

- Added `goalTreeTemplates.ts` with one `GoalTree` per
  `PlanProjectTypeKey` (homestead, regenerative_farm,
  retreat_center, educational_farm, conservation,
  multi_enterprise). Homestead reuses `HOMESTEAD_GOAL_TREE_TEMPLATE`
  unchanged.
- `goalTreeStore.ensureDefault(projectId, projectType?)` clones the
  matching template on first mount; falls back to homestead if the
  key is unknown.
- New `switchTemplate(projectId, projectType)` action replaces the
  tree (with a UI confirm). GoalTreeTab hero exposes a `<select>`
  picker; criterion description and add/remove move behind an
  Advanced `<details>` collapse so the default UI only shows
  editable `target` / `deadlineYear`.

### Auto-schedule + role tags

- Extended `PhaseTask` with `scheduledStart` / `scheduledEnd` (ISO
  YYYY-MM-DD, nullable) and `roleAccess: ProjectRole[]`. Added
  `LocalProject.startDate` to anchor the schedule.
- New `scheduleTasksToCalendar(phases, tasks, projectStartDate)`
  distributes tasks across season windows:
  - Year offset = `phase.order - 1` from anchor year.
  - Seasons map to fixed 90-day windows (spring Mar 1–May 31,
    summer Jun 1–Aug 31, fall Sep 1–Nov 30, winter Dec 1–Feb 28;
    winter wraps to next year).
  - Tasks within a (phase, season) bucket distribute evenly:
    `offset = floor(i * windowLen / count)`.
  - `scheduledEnd = scheduledStart + ceil(laborHrs / 8)` days
    (one workday per 8 hrs, min 1).
- Every task is tagged with all four `ProjectRole` values
  (`owner` / `designer` / `reviewer` / `viewer`) — forward-compat
  for per-role calendar filtering; no UI gate yet.
- `GeneratedPlanTab.handleGenerate` /  `handleConfirmRemove` /
  `handleRestoreAll` all call `scheduleTasksToCalendar` before
  `replaceGoalCompassRows`.
- New `DevelopPlanTab` (now tab 4/5) carries the project start-date
  input and a `Re-schedule tasks` button that re-runs the scheduler
  against existing phases.

### Calendar wiring

- `useEventAggregator` adds a 6th `CalendarSource` `'phaseTask'`
  (label "Plan tasks") that emits one entry per task with
  `scheduledStart != null`. Meta is
  `"<phase.name> · <hrs>h · <roles>"`.
- Verified live: Mar 1, 2026 cell renders
  `Parcel assessment & base map · Climate & assessment · 60h · owner/designer/reviewer/viewer`
  on the Schedule → Event calendar view for the Moontrance Creek
  fixture.

## Reasoning

- **Templates over a blank slate** — each project archetype already
  has a canonical permaculture shape in the literature; surfacing it
  reduces the decision surface to a single dropdown + numeric
  tuning. Add/remove stays one click away under Advanced for the
  unusual case.
- **Deterministic season-window distribution** rather than a single
  date per phase — spreads labor across the appropriate window and
  avoids the "20 tasks all on day 1" failure mode without inventing
  finer-grained calendar metadata in the catalog. The window
  matches the natural seasonality of permaculture work (earthworks
  in winter dry, plantings in spring, observation in summer).
- **All-four-role tagging today** keeps the persisted shape ready
  for future role-gated views without coupling the data migration
  to a UI feature that hasn't been designed.

## Files

**Modify**
- `apps/web/src/store/phaseStore.ts` (PhaseTask: +scheduledStart/End, +roleAccess)
- `apps/web/src/store/projectStore.ts` (LocalProject: +startDate)
- `apps/web/src/store/goalTreeStore.ts` (template-aware seeding + switchTemplate)
- `apps/web/src/features/act/useEventAggregator.ts` (phaseTask source)
- `apps/web/src/v3/plan/cards/goal-compass/GoalTreeTab.tsx` (picker + advanced collapse)
- `apps/web/src/v3/plan/cards/goal-compass/GeneratedPlanTab.tsx` (call scheduler)

**Create**
- `apps/web/src/v3/plan/data/goalTreeTemplates.ts`
- `apps/web/src/v3/plan/engine/goalCompass/scheduleTasksToCalendar.ts`
- `apps/web/src/v3/plan/cards/goal-compass/DevelopPlanTab.tsx`

## Verification

- `npx tsc --noEmit` exits 0 on `apps/web`.
- Goal tree dropdown shows all 6 templates; default UI hides
  add/remove/description-edit until Advanced is opened.
- Generate proposal populates 13 tasks across 6 phases on the
  Moontrance Creek fixture; every task has `scheduledStart`,
  `scheduledEnd`, and `roleAccess: ['owner','designer','reviewer','viewer']`.
- Tasks distribute across each 90-day window (Mar 1 / Mar 23 /
  Apr 15 / May 8 within spring Year 4); year offsets shift per
  `phase.order`.
- Act → Schedule → Event calendar shows the "Plan tasks" filter
  chip and surfaces each scheduled task at its `scheduledStart`
  date with the expected meta line.

## Follow-ups

- Per-role filtered calendar views (consume `roleAccess` once
  authentication / member-role context lands).
- Season-window override per intervention (currently fixed
  90-day calendar quarters; some interventions are seasonally
  asymmetric).
- Authoring tools for the non-homestead templates — they were
  hand-seeded against Mollison/Yeomans defaults and should be
  reviewed by domain stewards before claiming archetype parity.
