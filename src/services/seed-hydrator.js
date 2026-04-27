// Hydrates task description and subtask description/sources from bundled seed
// data at read time, so these large reference strings never need to live in
// localStorage.
//
// Seed files are loaded LAZILY per pillar via dynamic import — only the
// pillars whose surfaces a user actually visits get downloaded. Vite splits
// each pillar seed into its own chunk (see manualChunks in vite.config.js).
//
// Sync API is preserved: hydrate*/strip*/getSeedSubtask/getBoardSeeds/
// isPillarBoard return passthrough (no-op) on cache miss. Callers should
// `await preloadBoardSeeds(boardId)` before relying on hydrated output.

const PILLAR_LOADERS = {
  faith:       () => import('@data/seed-tasks/faith-seed-tasks').then((m) => m.FAITH_SEED_TASKS),
  health:      () => import('@data/seed-tasks/health-seed-tasks').then((m) => m.HEALTH_SEED_TASKS),
  intellect:   () => import('@data/seed-tasks/intellect-seed-tasks').then((m) => m.INTELLECT_SEED_TASKS),
  family:      () => import('@data/seed-tasks/family-seed-tasks').then((m) => m.FAMILY_SEED_TASKS),
  wealth:      () => import('@data/seed-tasks/wealth-seed-tasks').then((m) => m.WEALTH_SEED_TASKS),
  environment: () => import('@data/seed-tasks/environment-seed-tasks').then((m) => m.ENVIRONMENT_SEED_TASKS),
  ummah:       () => import('@data/seed-tasks/ummah-seed-tasks').then((m) => m.UMMAH_SEED_TASKS),
  prayer:      () => import('@data/seed-tasks/prayer-seed-tasks').then((m) => m.PRAYER_SEED_TASKS),
  weekly:      () => import('@data/seed-tasks/weekly-seed-tasks').then((m) => m.WEEKLY_SEED_TASKS),
};

const ALL_SEEDS = {}; // boardId -> Task[]
const PILLAR_PROMISES = {}; // pillarKey -> Promise<void>
const BOARD_TASK_MAPS = new Map(); // boardId -> Map<title, seedTask>

function pillarOf(boardId) {
  if (!boardId || typeof boardId !== 'string') return null;
  const i = boardId.indexOf('_');
  return i === -1 ? null : boardId.slice(0, i);
}

/** Dynamically loads the seed file for the pillar that owns this boardId.
 *  Idempotent: returns the same Promise across calls for one pillar. */
export function preloadBoardSeeds(boardId) {
  const pillar = pillarOf(boardId);
  return preloadPillarSeeds(pillar);
}

export function preloadPillarSeeds(pillar) {
  if (!pillar || !PILLAR_LOADERS[pillar]) return Promise.resolve();
  if (PILLAR_PROMISES[pillar]) return PILLAR_PROMISES[pillar];
  PILLAR_PROMISES[pillar] = PILLAR_LOADERS[pillar]()
    .then((seedMap) => {
      Object.assign(ALL_SEEDS, seedMap);
      // Invalidate cached title-maps for boards in this pillar so the next
      // hydrate call rebuilds them with the now-available seed data.
      for (const bid of Object.keys(seedMap)) BOARD_TASK_MAPS.delete(bid);
    })
    .catch((e) => {
      console.warn(`[seed-hydrator] Failed to load ${pillar} seeds`, e);
      delete PILLAR_PROMISES[pillar]; // allow retry on next call
    });
  return PILLAR_PROMISES[pillar];
}

/** Loads every pillar's seeds. Use sparingly — defeats the lazy split. */
export function preloadAllSeeds() {
  return Promise.all(Object.keys(PILLAR_LOADERS).map(preloadPillarSeeds));
}

function getTaskMap(boardId) {
  let map = BOARD_TASK_MAPS.get(boardId);
  if (map) return map;
  const seeds = ALL_SEEDS[boardId];
  map = new Map();
  if (seeds) {
    for (const seed of seeds) map.set(seed.title, seed);
  }
  BOARD_TASK_MAPS.set(boardId, map);
  return map;
}

export function getSeedSubtask(boardId, taskTitle, subtaskTitle) {
  const seedTask = getTaskMap(boardId).get(taskTitle);
  if (!seedTask) return null;
  return (seedTask.subtasks || []).find((s) => s.title === subtaskTitle) || null;
}

export function hydrateTask(task, boardId) {
  if (!task) return task;
  const seedTask = getTaskMap(boardId).get(task.title);
  if (!seedTask) return task;

  let subtasks = task.subtasks;
  if (subtasks && subtasks.length > 0) {
    const seedSubMap = new Map();
    (seedTask.subtasks || []).forEach((s) => seedSubMap.set(s.title, s));
    subtasks = subtasks.map((st) => {
      const seedSub = seedSubMap.get(st.title);
      if (!seedSub) return st;
      const patch = {};
      if (!st.description && seedSub.description) patch.description = seedSub.description;
      if (!st.sources && seedSub.sources) patch.sources = seedSub.sources;
      if (!st.tier && seedSub.tier) patch.tier = seedSub.tier;
      if (!st.amanahRationale && seedSub.amanahRationale) patch.amanahRationale = seedSub.amanahRationale;
      if (!st.why && seedSub.why) patch.why = seedSub.why;
      if (!st.how && seedSub.how) patch.how = seedSub.how;
      return Object.keys(patch).length > 0 ? { ...st, ...patch } : st;
    });
  }

  const hydrated = { ...task };
  if (!task.description && seedTask.description) hydrated.description = seedTask.description;
  if (subtasks !== task.subtasks) hydrated.subtasks = subtasks;
  return hydrated;
}

export function hydrateTasks(tasks, boardId) {
  if (!tasks || tasks.length === 0) return tasks;
  if (!ALL_SEEDS[boardId]) return tasks;
  return tasks.map((t) => hydrateTask(t, boardId));
}

/** Returns a shallow copy of the task with description/sources stripped when
 * a seed match exists. description and sources are read-only reference data
 * in the UI — they can never be user-edited, so unconditional strip is safe
 * and avoids keeping stale copies of earlier seed versions in localStorage. */
export function stripSeedFields(task, boardId) {
  const seedTask = getTaskMap(boardId).get(task.title);
  if (!seedTask) return task;

  let changed = false;
  const out = { ...task };

  if (out.description !== undefined && seedTask.description) {
    delete out.description;
    changed = true;
  }

  if (task.subtasks && task.subtasks.length > 0) {
    const seedSubMap = new Map();
    (seedTask.subtasks || []).forEach((s) => seedSubMap.set(s.title, s));
    let subsChanged = false;
    const subs = task.subtasks.map((st) => {
      const seedSub = seedSubMap.get(st.title);
      if (!seedSub) return st;
      if (st.description === undefined && st.sources === undefined && st.tier === undefined && st.why === undefined && st.how === undefined) return st;
      const nst = { ...st };
      if (seedSub.description !== undefined && nst.description !== undefined) delete nst.description;
      if (seedSub.sources !== undefined && nst.sources !== undefined) delete nst.sources;
      if (seedSub.tier !== undefined && nst.tier !== undefined) delete nst.tier;
      if (seedSub.why !== undefined && nst.why !== undefined) delete nst.why;
      if (seedSub.how !== undefined && nst.how !== undefined) delete nst.how;
      subsChanged = true;
      return nst;
    });
    if (subsChanged) { out.subtasks = subs; changed = true; }
  }

  return changed ? out : task;
}

/** Returns the seed record for a board, or null if the pillar isn't loaded. */
export function getBoardSeeds(boardId) {
  return ALL_SEEDS[boardId] || null;
}

export function isPillarBoard(boardId) {
  // Static check by id prefix — works even before seeds are loaded.
  const pillar = pillarOf(boardId);
  return pillar !== null && Object.prototype.hasOwnProperty.call(PILLAR_LOADERS, pillar);
}
