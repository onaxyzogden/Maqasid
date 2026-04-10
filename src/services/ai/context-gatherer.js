// Context Gatherer — resolves upstream task field data for AI prompt context
// Reads completed task data from task-store, organized by BBOS task type

import { useTaskStore } from '../../store/task-store';
import {
  getBbosTaskDef,
  getBbosTaskDeps,
  getBbosTaskDefsByStage,
} from '../../data/bbos/bbos-task-definitions';

const STAGE_ORDER = ['FND', 'TRU', 'STR', 'OFR', 'OUT', 'SAL', 'DLR', 'RET', 'OPT'];

// Max chars per field value for summarized (distant) stages
const SUMMARY_CHAR_LIMIT = 200;

/**
 * Gather upstream task data relevant to the given task.
 * @param {string} projectId
 * @param {object} taskDef - BBOS task definition (from getBbosTaskDef)
 * @param {number|string} contextDepth - 0 | 1 | 'stage'
 * @returns {object} { [bbosTaskType]: { label, fields: { fieldId: value } } }
 */
export function gatherUpstreamContext(projectId, taskDef, contextDepth) {
  if (contextDepth === 0) return {};

  const allTasks = useTaskStore.getState().tasksByProject[projectId] || [];

  // Build map: bbosTaskType → { label, fields }
  const taskDataMap = {};
  for (const task of allTasks) {
    if (task.bbosTaskType && task.bbosFieldData) {
      const def = getBbosTaskDef(task.bbosTaskType);
      if (!def) continue;

      // Filter out internal fields (prefixed with _)
      const fields = {};
      for (const [k, v] of Object.entries(task.bbosFieldData)) {
        if (!k.startsWith('_') && v) fields[k] = v;
      }

      if (Object.keys(fields).length > 0) {
        taskDataMap[task.bbosTaskType] = { label: def.label, fields };
      }
    }
  }

  if (contextDepth === 1) {
    return gatherImmediate(taskDef, taskDataMap);
  }

  return gatherByStage(taskDef, taskDataMap);
}

/**
 * Immediate upstream only (contextDepth === 1)
 */
function gatherImmediate(taskDef, taskDataMap) {
  const { upstream } = getBbosTaskDeps(taskDef.id);
  const result = {};
  for (const dep of upstream) {
    if (taskDataMap[dep.id]) {
      result[dep.id] = taskDataMap[dep.id];
    }
  }
  return result;
}

/**
 * Stage-based gathering (contextDepth === 'stage')
 * Full data for current + immediate prior stage; summarized for earlier stages.
 */
function gatherByStage(taskDef, taskDataMap) {
  const currentIdx = STAGE_ORDER.indexOf(taskDef.stage);
  if (currentIdx === -1) return {};

  const result = {};

  for (let i = 0; i <= currentIdx; i++) {
    const stageId = STAGE_ORDER[i];
    const stageDefs = getBbosTaskDefsByStage(stageId);
    const isNearby = i >= currentIdx - 1; // current stage or immediate prior

    for (const def of stageDefs) {
      // Don't include the task itself
      if (def.id === taskDef.id) continue;

      const data = taskDataMap[def.id];
      if (!data) continue;

      if (isNearby) {
        // Full data for nearby stages
        result[def.id] = data;
      } else {
        // Summarized for distant stages
        result[def.id] = summarize(data);
      }
    }
  }

  return result;
}

/**
 * Truncate field values for token budget management.
 */
function summarize(taskData) {
  const fields = {};
  for (const [k, v] of Object.entries(taskData.fields)) {
    if (typeof v === 'string' && v.length > SUMMARY_CHAR_LIMIT) {
      fields[k] = v.slice(0, SUMMARY_CHAR_LIMIT) + '...';
    } else {
      fields[k] = v;
    }
  }
  return { label: taskData.label, fields };
}
