---
title: "MILOS LevelNavigator chunk split via lazy seed loading"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, performance, code-splitting, vite, seed-tasks]
superseded_by: null
---

# MILOS LevelNavigator chunk split via lazy seed loading

## Context

Carryover from [[2026-04-25-milos-pre-test-audit]] Phase B. The `LevelNavigator` chunk was 4,699 KB raw / 1,452 KB gz — by far the largest chunk in the bundle. Root cause traced to `src/store/project-store.js` eagerly importing all 8 pillar seed-task files at module load. Because `LevelNavigator.jsx` imports `useProjectStore`, ~4.3 MB of seed data was bundled into the chunk shared by 16 pillar pages. Top contributors: ummah (1,293 KB), wealth (639), faith (614), environment (546), intellect (517).

## Decision

Belt-and-suspenders fix: dynamic per-pillar seed loading + Vite `manualChunks` for predictable chunk naming.

### 1. Lazy per-pillar seed loader ([src/services/seed-hydrator.js](src/services/seed-hydrator.js))

Removed all 8 static seed imports. Replaced with a `PILLAR_LOADERS` map of dynamic-import thunks, with a `PILLAR_PROMISES` cache for idempotent preload:

```js
const PILLAR_LOADERS = {
  faith:       () => import('@data/seed-tasks/faith-seed-tasks').then((m) => m.FAITH_SEED_TASKS),
  // ... 8 more
};
export function preloadPillarSeeds(pillar) { /* idempotent, cached */ }
export function preloadBoardSeeds(boardId) { return preloadPillarSeeds(pillarOf(boardId)); }
```

Sync API preserved for `hydrateTask`/`hydrateTasks`/`stripSeedFields`/`getSeedSubtask`/`getBoardSeeds`/`isPillarBoard` — they passthrough on cache miss. Only entry points (`loadTasks`, `ensureXProjects`) need to `await preloadBoardSeeds()` first. `isPillarBoard` checks via `pillarOf()` + `PILLAR_LOADERS` lookup so it works pre-load.

### 2. Async store entry points

- [src/store/task-store.js](src/store/task-store.js): `loadTasks(projectId)` is now async — `await preloadBoardSeeds(projectId)` before reading.
- [src/store/project-store.js](src/store/project-store.js): all 8 `ensureXProjects` (faith, life, intellect, family, wealth, environment, ummah, prayer, weekly) converted to async with `await preloadPillarSeeds('<pillar>')` first line; `seedTasks(boardId, seedMap)` simplified to `seedTasks(boardId)` reading from `getBoardSeeds(boardId)`.
- `backfillAndStripSeeds()` rewritten as async with **pillar discovery** — reads `localStorage.projects` to find which pillars actually have stored boards, loads only those. Fresh-install user opening one pillar pays for one chunk, not eight. Module-load invocation deferred to `requestIdleCallback` (or `setTimeout(100)` fallback) since it now performs async dynamic imports.
- ~15 callers in `useEffect` use the fire-and-forget pattern `useEffect(() => { fn(); }, [fn])` — they don't await; Zustand store updates trigger re-render when async work completes. No call-site changes needed.

### 3. Vite `manualChunks` ([vite.config.js](vite.config.js))

Added `build.rollupOptions.output.manualChunks(id)` to force one named chunk per pillar seed (`seed-faith`, `seed-life`, `seed-intellect`, `seed-family`, `seed-wealth`, `seed-environment`, `seed-ummah`, `seed-prayer`, `seed-weekly`). Without this, Rollup's default chunking heuristics could re-merge them.

## Consequences

**Positive (verified via `npm run build`, 2,766 modules transformed):**
- LevelNavigator chunk: **4,699 KB → 178 KB raw (47 KB gz)** — 96% reduction
- 9 pillar-seed chunks now standalone, each loaded only when its pillar's surface is visited:
  - `seed-weekly` 4.7 KB · `seed-prayer` 39.9 KB · `seed-life` 403 KB · `seed-family` 489 KB · `seed-intellect` 514 KB · `seed-environment` 547 KB · `seed-faith` 596 KB · `seed-wealth` 642 KB · `seed-ummah` 1,295 KB
- Verified live in preview: faith-core, wealth-core, ummah-core, intellect-core, family-core, life-core, environment-core, prophetic-path all render correctly with their dynamically-loaded seed data
- Backfill discovery means typical user (one or two active pillars) downloads a fraction of the seed payload at idle time, not all of it on every load

**Trade-offs:**
- Two store entry points (`loadTasks` + 9 `ensureXProjects`) are now async. Caller pattern is fire-and-forget useEffect, which already worked because store updates trigger re-renders — no behavior change observable.
- Hydrator sync API kept for non-entry-point callers (UI hydration, strip-on-write) — they passthrough on cache miss, which is benign because the entry point that read the data already preloaded the matching pillar.
- ummah seed remains the largest single chunk at 1,295 KB; future tightening would require splitting ummah by sub-pillar, deferred.

**Files touched:**
- [src/services/seed-hydrator.js](src/services/seed-hydrator.js) — full rewrite (lazy loaders, promise cache, board-map invalidation)
- [src/store/task-store.js](src/store/task-store.js) — async loadTasks + preload
- [src/store/project-store.js](src/store/project-store.js) — 8 async ensureXProjects, async backfill with pillar discovery, idle-deferred init
- [vite.config.js](vite.config.js) — manualChunks for 9 pillar seeds

**Verification:**
- `npm run build` exits 0, 2,766 modules transformed, expected chunk shape produced
- Preview-tested 7 pillar surfaces — all render with correct content
- Console clean (only pre-existing aladhan 400s from lat=0/lng=0 geolocation fallback, unrelated)

## Carries forward

- Original Phase B target of "LevelNavigator < 500 KB" met (178 KB).
- Tier-4 lint backlog and two-axis grounding migration remain open in this same session per [[concurrent-nibbling-rabbit]] plan.
