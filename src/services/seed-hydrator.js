// Hydrates task description and subtask description/sources from bundled seed data
// at read time, so these large reference strings never need to live in localStorage.
//
// Matching: task by title within the board's seed array; subtask by title within
// the matched seed task. Unmatched tasks/subtasks (user-created) pass through untouched.

import { FAITH_SEED_TASKS } from '@data/seed-tasks/faith-seed-tasks';
import { LIFE_SEED_TASKS } from '@data/seed-tasks/life-seed-tasks';
import { INTELLECT_SEED_TASKS } from '@data/seed-tasks/intellect-seed-tasks';
import { FAMILY_SEED_TASKS } from '@data/seed-tasks/family-seed-tasks';
import { WEALTH_SEED_TASKS } from '@data/seed-tasks/wealth-seed-tasks';
import { ENVIRONMENT_SEED_TASKS } from '@data/seed-tasks/environment-seed-tasks';
import { UMMAH_SEED_TASKS } from '@data/seed-tasks/ummah-seed-tasks';
import { PRAYER_SEED_TASKS } from '@data/seed-tasks/prayer-seed-tasks';

const ALL_SEEDS = {
  ...FAITH_SEED_TASKS,
  ...LIFE_SEED_TASKS,
  ...INTELLECT_SEED_TASKS,
  ...FAMILY_SEED_TASKS,
  ...WEALTH_SEED_TASKS,
  ...ENVIRONMENT_SEED_TASKS,
  ...UMMAH_SEED_TASKS,
  ...PRAYER_SEED_TASKS,
};

const BOARD_TASK_MAPS = new Map(); // boardId -> Map<title, seedTask>

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

/** Returns the seed record for a board (used by seedTasks to build slim records). */
export function getBoardSeeds(boardId) {
  return ALL_SEEDS[boardId] || null;
}

export function isPillarBoard(boardId) {
  return Object.prototype.hasOwnProperty.call(ALL_SEEDS, boardId);
}
