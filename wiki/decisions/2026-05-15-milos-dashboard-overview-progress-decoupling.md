# ADR: Decouple MAQASID dashboard overview progress from lazy per-board task-store

**Date:** 2026-05-15
**Status:** Accepted
**Project:** MILOS V2.1

## Context

The dashboard MAQASID overview wheel reported **0%** while per-pillar pages
(e.g. FAITH) correctly showed real progress. Two root causes, found in order:

1. **Dev override masking.** `VITE_SIMULATE_PROGRESS=50` in `.env.local` forced
   every pillar to a flat 50%. Commented out — unmasked the genuine bug.
2. **Wrong id space.** `MaqasidLevelOverview` called `useModulesProgress` with
   the 7 *pillar* ids (`faith`, …); no project has `moduleId === 'faith'`
   (submodule boards use `shahada`/`salat`/… ; pillar boards have `moduleId:
   null`), so every segment resolved to 0.
3. **Lazy task-store (architectural).** `task-store.tasksByProject` starts `{}`
   and is only filled by `loadTasks(boardId)`. Per-pillar pages call
   `ensureProjects` + `loadTasks`; the dashboard never did, so even with
   correct ids it had no task data to aggregate.

## Decision

Decouple the overview from per-board task-store mounting, with a single shared
scoring function so the completion rule cannot drift between views.

- **`src/data/task-progress.js` (new)** — single source of truth:
  `SIMULATED_PCT`, `isDoneColumn`, `isTodoColumn`, `isTaskDone`,
  `isTaskStarted`, `taskWeight`, `scoreTasks(tasks) → {total,completed,started}`.
- **`src/hooks/useModuleProgress.js`** — now imports the shared scorers;
  public API (`useModuleProgress`, `useModulesProgress`) unchanged.
- **`src/data/submodule-registry.js`** — replaced the interim
  `getPillarModuleIds` with `getPillarBoardIds(pillarId, level)` →
  `${boardPrefix}_${pillarKey}_${level}` derived from existing
  `PILLAR_CONFIGS` + `PILLAR_SUBMODULES` + `PILLAR_ALIASES`.
- **`src/hooks/usePillarOverviewProgress.js` (new)** — per-pillar pct =
  unweighted avg of its boards' pcts; each board read from in-memory
  `tasksByProject` when loaded, else persisted `safeGetJSON('tasks_'+boardId,
  [])`. Subscribes to `tasksByProject` so in-session edits stay reactive.
  Honors `SIMULATED_PCT`.
- **`src/components/dashboard/MaqasidLevelOverview.jsx`** — uses the new hook;
  `segments = PILLAR_NAV.map(p => ({...p, current: progressMap[p.id] ?? 0}))`.

Rationale for "avg of board pcts": matches how each pillar's own wheel center
is derived, so the dashboard segment equals the number on that pillar's page.

## Consequences

- Dashboard overview now reflects true progress without mounting every board.
- Scoring logic has one definition — dashboard and per-pillar views cannot
  diverge.
- No change to seed data, the `@ogden/ui-components` package, or the public
  `useModuleProgress` API.

## Verification

- `npm test` 62/62 pass; `lint:grounding-strict` + `audit:inline-refs` pass at
  ratchet 0. Touched files ESLint-clean (the 297 repo-wide ESLint errors are
  pre-existing `.claude/worktrees/*/dist/` artifact noise, out of scope).
- DOM check: with `shahada_core` injected as complete, FAITH pillar page wheel
  = 20%, dashboard MAQASID center = 3% = round(20/7) — the two views agree.
  Test data reverted afterward.

## Follow-up — RESOLVED 2026-05-15

The dashboard `LevelNavigator` pillar bars do **not** share the lazy-store
cause: `MaqasidLevelOverview` passes a static synthetic `SUBMODULE_TASKS`
array as `pillarTasks`, which makes the wrapper short-circuit all task
loading ([LevelNavigator.jsx:62](../../src/components/shared/LevelNavigator.jsx)).
The bars were intentional submodule-navigation chips, uniformly
pillar-accent colored — by design they never reflected progress.

Per user decision, the bars now color each submodule chip by that
submodule's completion, sourced via the same decoupled persisted/in-memory
read as the wheel (no re-coupling to the lazy store). Added:
`boardStatusColor(pct)` in `task-progress.js` (palette matches the package's
internal per-task colors), `getSubmoduleBoardId(submoduleId, level)` in
`submodule-registry.js`, a shared `readBoardPct` + `useSubmoduleProgress`
hook in `usePillarOverviewProgress.js`, and a memoized `taskColorFn` in
`MaqasidLevelOverview.jsx`. Submodule-navigation clicks unchanged.

Verified live: with `faith_shahada_core` injected complete, the Faith bar's
Shahada subseg is green (#22c55e) and its siblings faint; level
core→growth recomputes correctly; `/app/faith-core` unchanged; 62/62
tests, grounding gates pass, touched files ESLint-clean.
