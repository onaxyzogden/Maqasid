import { useMemo } from 'react';
import { useTaskStore } from '../store/task-store';
import { safeGetJSON } from '../services/storage';
import { getPillarBoardIds, getSubmoduleBoardId } from '../data/submodule-registry';
import { SIMULATED_PCT, scoreTasks } from '../data/task-progress';

// Single board → pct read, shared by both hooks below so the rule (in-memory
// when loaded, else persisted source) cannot drift between the wheel and the
// LevelNavigator bars.
function readBoardPct(boardId, tasksByProject) {
  const tasks = tasksByProject[boardId] || safeGetJSON('tasks_' + boardId, []);
  const { total, completed } = scoreTasks(tasks);
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

/**
 * Decoupled pillar progress for the dashboard MAQASID overview.
 *
 * The per-pillar pages mount each board (ensureProjects + loadTasks) so the
 * lazy task-store is populated for them. The dashboard does not, so reading
 * the in-memory store alone would always report 0%. Instead this hook reads
 * each board's tasks from the in-memory store when loaded, falling back to
 * the persisted source (`tasks_${boardId}`) otherwise. It subscribes to
 * `tasksByProject` so in-session edits stay reactive without the dashboard
 * having to mount every board.
 *
 * A pillar's pct = unweighted average of its boards' pcts — identical to how
 * each pillar's own wheel center is derived, so the dashboard segment equals
 * the number shown on that pillar's page.
 *
 * @param {string[]} pillarIds - top-level pillar ids (faith, health, ...)
 * @param {string} level - 'core' | 'growth' | 'excellence'
 * @returns {{ progressMap: Record<string, number>, overallPct: number }}
 *   progressMap maps pillarId → integer pct.
 */
export function usePillarOverviewProgress(pillarIds, level) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  return useMemo(() => {
    const progressMap = {};

    if (SIMULATED_PCT != null) {
      for (const pid of pillarIds) progressMap[pid] = SIMULATED_PCT;
      return { progressMap, overallPct: SIMULATED_PCT };
    }

    let sum = 0;
    for (const pid of pillarIds) {
      const boardIds = getPillarBoardIds(pid, level);
      const boardPcts = boardIds.map((boardId) => readBoardPct(boardId, tasksByProject));
      const pct = boardPcts.length
        ? Math.round(boardPcts.reduce((a, b) => a + b, 0) / boardPcts.length)
        : 0;
      progressMap[pid] = pct;
      sum += pct;
    }

    return {
      progressMap,
      overallPct: pillarIds.length ? Math.round(sum / pillarIds.length) : 0,
    };
  }, [pillarIds, level, tasksByProject]);
}

/**
 * Decoupled per-submodule progress for the dashboard LevelNavigator bars.
 * Each submodule maps to one board at `level`; pct read via the same
 * in-memory-else-persisted path as the wheel (no `ensureProjects`/`loadTasks`,
 * so the dashboard stays decoupled from the lazy task-store). Honors
 * `SIMULATED_PCT`. Subscribes to `tasksByProject` for in-session reactivity.
 *
 * @param {string[]} submoduleIds - canonical submodule ids (e.g. 'faith-shahada')
 * @param {string} level - 'core' | 'growth' | 'excellence'
 * @returns {Record<string, number>} submoduleId → integer pct
 */
export function useSubmoduleProgress(submoduleIds, level) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  return useMemo(() => {
    const map = {};
    for (const sid of submoduleIds) {
      if (SIMULATED_PCT != null) {
        map[sid] = SIMULATED_PCT;
        continue;
      }
      const boardId = getSubmoduleBoardId(sid, level);
      map[sid] = boardId ? readBoardPct(boardId, tasksByProject) : 0;
    }
    return map;
  }, [submoduleIds, level, tasksByProject]);
}
