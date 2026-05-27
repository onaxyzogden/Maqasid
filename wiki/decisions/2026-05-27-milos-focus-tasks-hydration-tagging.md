---
title: "MILOS — Tag pillarId/submoduleId at task hydration, retire one-shot migration"
type: decision
created: 2026-05-27
tags: [milos, task-store, niyyah, dashboard, focus-task-list, seed-hydrator, bug-fix]
sources: 0
---

# Decision

Replace the one-shot `backfillPillarFields()` Dashboard migration with **tagging at the data
boundary** — `pillarId` and `submoduleId` are now derived from the board id during
`hydrateTasks()` and re-verified on every `loadTasks()` call. Both code paths consult a single
shared resolver in `src/data/maqasid-resolve.js`.

## Context

User report (2026-05-27): the daily Niyyah's "set intention" did not match the selected module on
the main Dashboard, and Today's Deep Work (`FocusTaskList`) was empty or wrong.

Root cause: `getFocusTasks(submoduleId)` filters tasks by `task.submoduleId === submoduleId`, but
the only places that ever set those tags were `createTask()` (good — new tasks always tagged) and a
one-shot migration `useEffect` in [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx) gated by the
sentinel `bbiz_task_pillar_migrated_v1`. Two compounding defects:

- **Lazy load races eager sentinel.** `loadTasks` only fires when a board is opened; the migration
  ran against whatever was in memory at first Dashboard mount, then set the sentinel forever —
  boards loaded later remained un-tagged.
- **`hydrateTasks` wasn't a tagging path.** The seed-hydrator only restored `description`,
  `sources`, `tier` etc., so reading persisted tasks could never repair missing tags.

A second flavor surfaced during preview verification: non-Faith pillars persisted
`submoduleId: 'physical'` (bare module slug) where niyyah uses `'health-physical'` (kebab-prefixed
canonical id from `MAQASID_PILLARS.subModuleIds`). The original `resolveSubmoduleFromProject`
returned the bare moduleId when no pillar listed it — so the filter never matched even for tasks
that *did* go through the broken migration.

## Decision

1. **New shared resolver** [src/data/maqasid-resolve.js](src/data/maqasid-resolve.js) exports
   `FAITH_MODULE_TO_SUBMODULE`, `resolveSubmoduleFromProject(project)`, and
   `resolveSubmoduleFromBoardId(boardId)`. The project-aware variant now tries the board-id parse
   first (since `project.id` follows `{pillar}_{moduleSlug}_{level}`) — this fixes the
   non-Faith prefixed-submodule case without needing per-pillar mapping tables.
2. **Tag in `hydrateTask`** ([src/services/seed-hydrator.js](src/services/seed-hydrator.js)) using
   board-id-derived tags. Idempotent: only patches when `pillarId`/`submoduleId` are missing or
   mismatched. Hydration is read-only by design, so this never writes to localStorage; tagged tasks
   flow naturally into `tasksByProject`.
3. **Second pass in `loadTasks`** ([src/store/task-store.js](src/store/task-store.js)) covers
   user-created tasks that hydration skipped (no seed match) and only persists when something
   actually changed.
4. **Removed dead migration** from [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx). The
   `backfillPillarFields` store action is left in place — harmless and possibly useful for future
   bulk operations, but no longer mounted.

No changes to `ManifestoBanner`, `DailyMithaq`, `ContextWidgetSlot`, `NiyyahAct`, `threshold-store`,
or any seed-task data.

## Verification

End-to-end via Preview MCP (`location.assign('/app')` with `bbiz_task_pillar_migrated_v1` deleted
to simulate legacy users past the broken sentinel):

- Faith → Salah niyyah → `FocusTaskList` header `"TODAY'S DEEP WORK · Salah · LEVEL 1 · FOUNDATION"`,
  count = **14**, rows linking to `SALAH — CORE` projects.
- Health → Physical → header `"Physical Health"`, count = **5** (resolver enhancement caught the
  bare-slug staleness).
- `DailyMithaq` covenant widget reads `"I am honoring my Faith by tending to Salah"` /
  `"Health … Physical Health"`.

Gates: `npm test` 62/62 · `npm run lint` clean (grounding-strict 0, inline-refs 0) ·
`npm run build` succeeds, no import cycles introduced by the new shared resolver.

Screenshot proof was attempted but the `preview_screenshot` MCP tool timed out twice at 30s; DOM
inspection via `preview_eval` is the verification of record for this fix.

## Trade-offs

- **Persisted localStorage stays stale** for tasks already on disk with wrong tags. Hydration
  re-applies the correct tags on every load, so display is always right; on-disk repair happens
  organically when a user edits a task. Accepted because hydration is O(n) per board and a write
  on every load would be wasteful.
- The original `MAQASID_PILLARS` import is no longer needed in `task-store.js` (removed).

## Connections

- [[milos]] — Affected entity
- Files: [src/data/maqasid-resolve.js](src/data/maqasid-resolve.js),
  [src/services/seed-hydrator.js](src/services/seed-hydrator.js),
  [src/store/task-store.js](src/store/task-store.js),
  [src/pages/Dashboard.jsx](src/pages/Dashboard.jsx)
