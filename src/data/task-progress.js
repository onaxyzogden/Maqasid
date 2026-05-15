// Single source of truth for board/task progress scoring.
// useModuleProgress (per-board, in-memory) and usePillarOverviewProgress
// (decoupled, persisted-source) both score through these helpers so the
// completion rule cannot drift between the dashboard and per-pillar views.

/**
 * Dev-only simulation override. When `VITE_SIMULATE_PROGRESS` is set to a
 * number 0–100 in `.env.local`, progress hooks short-circuit and report that
 * value for every pillar — useful for eyeballing dashboards without seeding
 * fake tasks. Inert when unset.
 */
export const SIMULATED_PCT = (() => {
  const raw = import.meta.env.VITE_SIMULATE_PROGRESS;
  if (raw == null || raw === '') return null;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : null;
})();

export function isDoneColumn(columnId) {
  return columnId?.endsWith('_done');
}

export function isTodoColumn(columnId) {
  return columnId?.endsWith('_to_do') || columnId?.endsWith('_todo');
}

export function isTaskDone(task) {
  return task.completedAt || isDoneColumn(task.columnId);
}

export function isTaskStarted(task) {
  return !isTodoColumn(task.columnId);
}

/**
 * Weighted completion for a single task.
 * Done tasks = 1. Tasks with subtasks = doneSubtasks / totalSubtasks.
 * Tasks with no subtasks that aren't done = 0.
 */
export function taskWeight(task) {
  if (isTaskDone(task)) return 1;
  const subs = task.subtasks;
  if (!subs || subs.length === 0) return 0;
  const done = subs.filter((s) => s.done).length;
  return done / subs.length;
}

/**
 * Aggregate a flat task list into { total, completed, started }.
 * `completed` is the summed weighted completion (not yet rounded, so callers
 * can roll several boards together before rounding).
 */
// Aggregated-board status color, matching the @ogden/ui-components per-task
// palette (its internal ee(): done #22c55e, started #F59E0B, else border) so
// dashboard submodule chips read the same as the per-pillar task mosaic.
export function boardStatusColor(pct) {
  if (pct >= 100) return '#22c55e';
  if (pct > 0) return '#F59E0B';
  return 'var(--border2, rgba(255,255,255,0.12))';
}

export function scoreTasks(tasks) {
  let total = 0;
  let completed = 0;
  let started = 0;
  for (const task of tasks) {
    total += 1;
    completed += taskWeight(task);
    if (isTaskStarted(task)) started += 1;
  }
  return { total, completed, started };
}
