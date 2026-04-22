import { useMemo } from 'react';
import { useProjectStore } from '../store/project-store';
import { useTaskStore } from '../store/task-store';

/**
 * Dev-only simulation override. When `VITE_SIMULATE_PROGRESS` is set to a
 * number 0–100 in `.env.local`, both hooks below short-circuit and report
 * that value for every pillar — useful for eyeballing dashboards with
 * non-zero progress without seeding fake tasks. Inert when unset.
 */
const SIMULATED_PCT = (() => {
  const raw = import.meta.env.VITE_SIMULATE_PROGRESS;
  if (raw == null || raw === '') return null;
  const n = Number(raw);
  return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : null;
})();

function isDoneColumn(columnId) {
  return columnId?.endsWith('_done');
}

function isTodoColumn(columnId) {
  return columnId?.endsWith('_to_do') || columnId?.endsWith('_todo');
}

function isTaskDone(task) {
  return task.completedAt || isDoneColumn(task.columnId);
}

function isTaskStarted(task) {
  return !isTodoColumn(task.columnId);
}

/**
 * Weighted completion for a single task.
 * Done tasks = 1. Tasks with subtasks = doneSubtasks / totalSubtasks.
 * Tasks with no subtasks that aren't done = 0.
 */
function taskWeight(task) {
  if (isTaskDone(task)) return 1;
  const subs = task.subtasks;
  if (!subs || subs.length === 0) return 0;
  const done = subs.filter((s) => s.done).length;
  return done / subs.length;
}

/**
 * Calculate progress for a single module by aggregating tasks
 * across all projects tagged with that moduleId.
 */
export function useModuleProgress(moduleId) {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  return useMemo(() => {
    if (SIMULATED_PCT != null) {
      return {
        total: 10,
        completed: Math.round(SIMULATED_PCT / 10),
        pct: SIMULATED_PCT,
      };
    }
    const moduleProjects = projects.filter((p) => p.moduleId === moduleId);
    let total = 0;
    let completed = 0;

    for (const proj of moduleProjects) {
      const tasks = tasksByProject[proj.id] || [];
      total += tasks.length;
      for (const task of tasks) completed += taskWeight(task);
    }

    return {
      total,
      completed: Math.round(completed),
      pct: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [moduleId, projects, tasksByProject]);
}

/**
 * Calculate progress for multiple modules at once.
 * @param {string[]} moduleIds - submodule identifiers (e.g. 'shahada', 'salat')
 * @param {string} [level] - optional level filter ('core', 'growth', 'excellence').
 *   When provided, only projects whose id ends with `_${level}` are counted.
 * Returns a map of moduleId → { total, completed, pct } plus an overallPct.
 */
export function useModulesProgress(moduleIds, level) {
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  return useMemo(() => {
    const progressMap = {};

    if (SIMULATED_PCT != null) {
      const completed = Math.round(SIMULATED_PCT / 10);
      for (const moduleId of moduleIds) {
        progressMap[moduleId] = { total: 10, completed, started: 10, pct: SIMULATED_PCT };
      }
      return { progressMap, overallPct: SIMULATED_PCT };
    }

    let grandTotal = 0;
    let grandCompleted = 0;

    for (const moduleId of moduleIds) {
      let moduleProjects = projects.filter((p) => p.moduleId === moduleId);
      if (level) {
        moduleProjects = moduleProjects.filter((p) => p.id.endsWith('_' + level));
      }
      let total = 0;
      let completed = 0;
      let started = 0;

      for (const proj of moduleProjects) {
        const tasks = tasksByProject[proj.id] || [];
        total += tasks.length;
        for (const task of tasks) completed += taskWeight(task);
        started += tasks.filter(isTaskStarted).length;
      }

      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      progressMap[moduleId] = {
        total,
        completed: Math.round(completed),
        started,
        pct,
      };

      grandTotal += total;
      grandCompleted += completed;
    }

    return {
      progressMap,
      overallPct: grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0,
    };
  }, [moduleIds, level, projects, tasksByProject]);
}
