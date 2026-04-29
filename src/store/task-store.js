import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { genTaskId, genSubtaskId, genCheckId, genAttachmentId } from '../services/id';
import { hydrateTasks, stripSeedFields, preloadBoardSeeds } from '../services/seed-hydrator';
import { MAQASID_PILLARS, getPillarForModule } from '../data/maqasid';
import { useProjectStore } from './project-store';

// Faith modules use short IDs on projects (salat) but prefixed IDs on pillars
// (faith-salah). Map the legacy short forms onto the canonical submodule ids.
const FAITH_MODULE_TO_SUBMODULE = {
  shahada: 'faith-shahada',
  salat: 'faith-salah',
  zakat: 'faith-zakah',
  siyam: 'faith-siyam',
  hajj: 'faith-hajj',
};

// Project IDs encode level as `{pillar}_{module}_{core|growth|excellence}`.
// Returns 'core' | 'growth' | 'excellence' | null.
export function getProjectLevel(projectId) {
  if (!projectId) return null;
  const m = projectId.match(/_(core|growth|excellence)$/);
  return m ? m[1] : null;
}

function resolveSubmoduleFromProject(project) {
  if (!project) return { pillarId: null, submoduleId: null };
  const moduleId = project.moduleId ?? null;
  if (!moduleId) return { pillarId: null, submoduleId: null };
  // Faith modules: prefer the Faith pillar + prefixed submodule id.
  if (FAITH_MODULE_TO_SUBMODULE[moduleId]) {
    return { pillarId: 'faith', submoduleId: FAITH_MODULE_TO_SUBMODULE[moduleId] };
  }
  // Otherwise, find a pillar that lists this module id in its subModuleIds.
  const pillar = MAQASID_PILLARS.find((p) => p.subModuleIds.includes(moduleId))
    || getPillarForModule(moduleId);
  return { pillarId: pillar?.id ?? null, submoduleId: moduleId };
}

function persistTasks(projectId, tasks) {
  // Strip seed reference fields (description/sources matching the seed) before
  // writing, so in-memory state can stay hydrated without bloating localStorage.
  const slim = tasks.map((t) => stripSeedFields(t, projectId));
  safeSet(`tasks_${projectId}`, slim);
}

export const useTaskStore = create((set, get) => ({
  // { [projectId]: Task[] }
  tasksByProject: {},

  loadTasks: async (projectId) => {
    // Lazy-load the pillar seeds before hydrating so SubtaskSources et al.
    // see description/sources on first render. Cheap on cache hit.
    await preloadBoardSeeds(projectId);
    const raw = safeGetJSON(`tasks_${projectId}`, []);
    const tasks = hydrateTasks(raw, projectId);
    set((s) => ({
      tasksByProject: { ...s.tasksByProject, [projectId]: tasks },
    }));
  },

  getTasksByColumn: (projectId, columnId) => {
    const tasks = get().tasksByProject[projectId] || [];
    return tasks
      .filter((t) => t.columnId === columnId)
      .sort((a, b) => (a.seedOrder ?? a.order) - (b.seedOrder ?? b.order));
  },

  getTask: (projectId, taskId) => {
    const tasks = get().tasksByProject[projectId] || [];
    return tasks.find((t) => t.id === taskId) || null;
  },

  createTask: (projectId, columnId, title, opts = {}) => {
    const tasks = get().tasksByProject[projectId] || [];
    const colTasks = tasks.filter((t) => t.columnId === columnId);
    const project = useProjectStore.getState().projects.find((p) => p.id === projectId);
    const { pillarId, submoduleId } = resolveSubmoduleFromProject(project);
    const task = {
      id: genTaskId(),
      projectId,
      columnId,
      title,
      description: '',
      notes: '',
      priority: 'medium',
      dueDate: null,
      tags: [],
      subtasks: [],
      checklist: [],
      attachments: [],
      assigneeId: null,
      order: colTasks.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: null,
      bbosTaskType: null,
      bbosFieldData: {},
      pillarId,
      submoduleId,
      ...opts,
    };
    set((s) => {
      const updated = [...(s.tasksByProject[projectId] || []), task];
      persistTasks(projectId, updated);
      return { tasksByProject: { ...s.tasksByProject, [projectId]: updated } };
    });
    return task;
  },

  updateTask: (projectId, taskId, updates) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) =>
      t.id === taskId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  deleteTask: (projectId, taskId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).filter((t) => t.id !== taskId);
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  moveTask: (projectId, taskId, toColumnId, newOrder, columns) => set((s) => {
    let tasks = [...(s.tasksByProject[projectId] || [])];
    const taskIdx = tasks.findIndex((t) => t.id === taskId);
    if (taskIdx === -1) return {};

    const task = { ...tasks[taskIdx] };
    const fromColumnId = task.columnId;
    task.columnId = toColumnId;
    task.order = newOrder;
    task.updatedAt = new Date().toISOString();

    // Determine if target/source is a "Done" column
    if (fromColumnId !== toColumnId && columns) {
      const isDoneCol = (colId) => {
        const col = columns.find((c) => c.id === colId);
        return col?.name === 'Done';
      };
      if (isDoneCol(toColumnId)) {
        task.completedAt = new Date().toISOString();
      } else if (isDoneCol(fromColumnId)) {
        task.completedAt = null;
      }
      // Moving between non-done columns: preserve existing completedAt
    }

    tasks[taskIdx] = task;

    // Reorder tasks in the target column
    const colTasks = tasks
      .filter((t) => t.columnId === toColumnId && t.id !== taskId)
      .sort((a, b) => a.order - b.order);

    colTasks.splice(newOrder, 0, task);
    colTasks.forEach((t, i) => {
      const idx = tasks.findIndex((x) => x.id === t.id);
      if (idx !== -1) tasks[idx] = { ...tasks[idx], order: i };
    });

    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  addSubtask: (projectId, taskId, title, description = '') => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        subtasks: [...t.subtasks, { id: genSubtaskId(), title, done: false, description }],
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  toggleSubtask: (projectId, taskId, subtaskId) => set((s) => {
    const now = new Date().toISOString();
    const project = useProjectStore.getState().projects.find((p) => p.id === projectId);
    const columns = project?.columns || [];
    const doneColIdx = columns.findIndex((c) => c.name === 'Done');
    const doneColId = doneColIdx >= 0 ? columns[doneColIdx].id : null;
    const revertCol =
      doneColIdx > 0
        ? columns[doneColIdx - 1]
        : columns.find((c) => c.name !== 'Done') || null;

    let tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      const subtasks = t.subtasks.map((st) =>
        st.id === subtaskId ? { ...st, done: !st.done } : st
      );
      const doneCount = subtasks.filter((st) => st.done).length;
      const total = subtasks.length;
      const shouldRevert =
        doneColId &&
        t.columnId === doneColId &&
        total > 0 &&
        doneCount < total &&
        revertCol;
      if (shouldRevert) {
        return {
          ...t,
          subtasks,
          columnId: revertCol.id,
          completedAt: null,
          order: 0,
          updatedAt: now,
        };
      }
      return { ...t, subtasks, updatedAt: now };
    });

    // If a task was reverted into another column, shift that column's existing
    // tasks to make room at order:0, matching moveTask's reorder pattern.
    const reverted = tasks.find(
      (t) => t.id === taskId && t.columnId !== doneColId && t.columnId === revertCol?.id && t.order === 0
    );
    if (reverted) {
      const colTasks = tasks
        .filter((t) => t.columnId === reverted.columnId && t.id !== taskId)
        .sort((a, b) => a.order - b.order);
      colTasks.unshift(reverted);
      colTasks.forEach((t, i) => {
        const idx = tasks.findIndex((x) => x.id === t.id);
        if (idx !== -1) tasks[idx] = { ...tasks[idx], order: i };
      });
    }

    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  removeSubtask: (projectId, taskId, subtaskId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        subtasks: t.subtasks.filter((st) => st.id !== subtaskId),
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  updateSubtask: (projectId, taskId, subtaskId, patch) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        subtasks: t.subtasks.map((st) =>
          st.id === subtaskId ? { ...st, ...patch } : st
        ),
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  addAttachment: (projectId, taskId, file) => {
    const MAX_BYTES = 500 * 1024; // 500 KB — realistic for localStorage
    const MAX_ATTACHMENTS = 5;
    if (file.size > MAX_BYTES) {
      alert(`File too large. Maximum size is 500 KB.`);
      return;
    }
    const task = (get().tasksByProject[projectId] || []).find((t) => t.id === taskId);
    if ((task?.attachments || []).length >= MAX_ATTACHMENTS) {
      alert(`Maximum ${MAX_ATTACHMENTS} attachments per task.`);
      return;
    }
    // Estimate localStorage usage — warn at 80% of ~5 MB quota
    try {
      const used = new Blob(Object.values(localStorage)).size;
      const quota = 5 * 1024 * 1024;
      if (used + file.size * 1.4 > quota * 0.8) {
        alert('Storage is nearly full. Remove old attachments or export data before adding more.');
        return;
      }
    } catch { /* estimation failed — proceed anyway */ }
    const reader = new FileReader();
    reader.onload = (e) => {
      const attachment = {
        id: genAttachmentId(),
        name: file.name,
        size: file.size,
        type: file.type,
        data: e.target.result, // base64 data URL
        addedAt: new Date().toISOString(),
      };
      set((s) => {
        const tasks = (s.tasksByProject[projectId] || []).map((t) => {
          if (t.id !== taskId) return t;
          return {
            ...t,
            attachments: [...(t.attachments || []), attachment],
            updatedAt: new Date().toISOString(),
          };
        });
        persistTasks(projectId, tasks);
        return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
      });
    };
    reader.readAsDataURL(file);
  },

  removeAttachment: (projectId, taskId, attachmentId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        attachments: (t.attachments || []).filter((a) => a.id !== attachmentId),
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  addChecklistItem: (projectId, taskId, text) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        checklist: [...t.checklist, { id: genCheckId(), text, done: false }],
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  toggleChecklistItem: (projectId, taskId, checkId) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        checklist: t.checklist.map((c) =>
          c.id === checkId ? { ...c, done: !c.done } : c
        ),
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  getTaskStats: (projectId) => {
    const tasks = get().tasksByProject[projectId] || [];
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completedAt).length,
      overdue: tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && !t.completedAt).length,
    };
  },

  searchAllTasks: (query) => {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase();
    const results = [];
    const all = get().tasksByProject;
    for (const [projectId, tasks] of Object.entries(all)) {
      for (const task of tasks) {
        if (results.length >= 15) break;
        const matchTitle = task.title?.toLowerCase().includes(q);
        const matchDesc = task.description?.toLowerCase().includes(q);
        const matchTag = task.tags?.some((t) => t.toLowerCase().includes(q));
        if (matchTitle || matchDesc || matchTag) {
          results.push({ ...task, projectId });
        }
      }
      if (results.length >= 15) break;
    }
    return results;
  },

  getTasksByAssignee: (assigneeId) => {
    if (!assigneeId) return [];
    const results = [];
    const all = get().tasksByProject;
    for (const [projectId, tasks] of Object.entries(all)) {
      for (const task of tasks) {
        if (task.assigneeId === assigneeId) {
          results.push({ ...task, projectId });
        }
      }
    }
    return results;
  },

  updateBbosFieldData: (projectId, taskId, fieldId, value) => set((s) => {
    const tasks = (s.tasksByProject[projectId] || []).map((t) => {
      if (t.id !== taskId) return t;
      return {
        ...t,
        bbosFieldData: { ...(t.bbosFieldData || {}), [fieldId]: value },
        updatedAt: new Date().toISOString(),
      };
    });
    persistTasks(projectId, tasks);
    return { tasksByProject: { ...s.tasksByProject, [projectId]: tasks } };
  }),

  // One-shot migration: tag every task with pillarId/submoduleId derived from
  // its project's moduleId. Idempotent; projects without moduleId (e.g. faith_core
  // cross-cutting) leave their tasks unlabeled.
  backfillPillarFields: () => set((s) => {
    const projects = useProjectStore.getState().projects;
    const projectById = new Map(projects.map((p) => [p.id, p]));
    const next = {};
    for (const [projectId, tasks] of Object.entries(s.tasksByProject)) {
      const { pillarId, submoduleId } = resolveSubmoduleFromProject(projectById.get(projectId));
      const updated = tasks.map((t) => {
        if (t.pillarId === pillarId && t.submoduleId === submoduleId) return t;
        return { ...t, pillarId, submoduleId };
      });
      persistTasks(projectId, updated);
      next[projectId] = updated;
    }
    return { tasksByProject: next };
  }),

  // Returns tasks relevant to today, split by whether they belong to the
  // user's chosen focus submodule.
  //   deepWork     — open tasks whose submoduleId matches the focus
  //   maintenance  — open tasks outside the focus (due today OR any open)
  // If `level` is given, deepWork is filtered to tasks on projects at that
  // level (matched via the `_core|_growth|_excellence` projectId suffix).
  getFocusTasks: (submoduleId, level = null) => {
    const all = get().tasksByProject;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deepWork = [];
    const maintenance = [];
    for (const [projectId, tasks] of Object.entries(all)) {
      const projectLevel = getProjectLevel(projectId);
      for (const task of tasks) {
        if (task.completedAt) continue;
        const hydrated = { ...task, projectId, projectLevel };
        if (submoduleId && task.submoduleId === submoduleId) {
          if (level && projectLevel && projectLevel !== level) continue;
          deepWork.push(hydrated);
        } else {
          const due = task.dueDate ? new Date(task.dueDate) : null;
          if (due) due.setHours(0, 0, 0, 0);
          const dueTodayOrOverdue = due && due.getTime() <= today.getTime();
          maintenance.push({ ...hydrated, _maintenanceUrgent: !!dueTodayOrOverdue });
        }
      }
    }
    return { deepWork, maintenance };
  },

  // Returns { total, completed } counts for tasks at a given (submodule, level).
  // Used to decide whether a level is "complete" and whether to advance.
  getLevelStatus: (submoduleId, level) => {
    if (!submoduleId || !level) return { total: 0, completed: 0 };
    const all = get().tasksByProject;
    let total = 0;
    let completed = 0;
    for (const [projectId, tasks] of Object.entries(all)) {
      if (getProjectLevel(projectId) !== level) continue;
      for (const task of tasks) {
        if (task.submoduleId !== submoduleId) continue;
        total += 1;
        if (task.completedAt) completed += 1;
      }
    }
    return { total, completed };
  },

  // Lowest incomplete level for a submodule. 'core' if core has any open tasks
  // or no tasks at all; 'growth' if core is 100% complete but growth isn't; etc.
  // Falls back to 'excellence' when all three levels are exhausted.
  getSubmoduleActiveLevel: (submoduleId) => {
    const status = get().getLevelStatus;
    for (const lvl of ['core', 'growth', 'excellence']) {
      const { total, completed } = status(submoduleId, lvl);
      if (total === 0 || completed < total) return lvl;
    }
    return 'excellence';
  },

  // { core, growth, excellence } booleans — each true iff EVERY leveled
  // submodule in the pillar has that level at 100% complete (and has at
  // least one task at that level across the pillar). Governs the cross-
  // pillar "advance together" gate for the niyyah advance affordance.
  getPillarLevelProgress: (pillarId) => {
    if (!pillarId) return { core: false, growth: false, excellence: false };
    const projects = useProjectStore.getState().projects;
    const submoduleIds = new Set();
    for (const p of projects) {
      const lvl = getProjectLevel(p.id);
      if (!lvl) continue;
      if (!p.id.startsWith(pillarId + '_')) continue;
      const { submoduleId } = resolveSubmoduleFromProject(p);
      if (submoduleId) submoduleIds.add(submoduleId);
    }
    const result = { core: false, growth: false, excellence: false };
    if (submoduleIds.size === 0) return result;
    const status = get().getLevelStatus;
    for (const lvl of ['core', 'growth', 'excellence']) {
      let pillarTotal = 0;
      let allComplete = true;
      for (const sm of submoduleIds) {
        const { total, completed } = status(sm, lvl);
        pillarTotal += total;
        if (total === 0 || completed < total) { allComplete = false; }
      }
      result[lvl] = allComplete && pillarTotal > 0;
    }
    return result;
  },

  getFilteredTasks: (projectId, filters) => {
    let tasks = get().tasksByProject[projectId] || [];
    if (!filters) return tasks;

    // BBOS stage filter — applied before other filters
    if (filters.bbosStage) {
      tasks = tasks.filter((t) => t.bbosStage === filters.bbosStage);
    }

    // Exclude BBOS tasks (used by Tasks tab to show only standard tasks)
    if (filters.excludeBbos) {
      tasks = tasks.filter((t) => !t.bbosTaskType);
    }

    const { priorities, dueDate, tags } = filters;
    const hasFilters = (priorities?.length > 0) || dueDate || (tags?.length > 0);
    if (!hasFilters) return tasks;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(now);
    endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));

    return tasks.filter((task) => {
      if (priorities?.length > 0 && !priorities.includes(task.priority)) return false;
      if (dueDate) {
        const d = task.dueDate ? new Date(task.dueDate) : null;
        if (d) d.setHours(0, 0, 0, 0);
        switch (dueDate) {
          case 'overdue': if (!d || d >= now) return false; break;
          case 'today': if (!d || d.getTime() !== now.getTime()) return false; break;
          case 'this-week': if (!d || d < now || d > endOfWeek) return false; break;
          case 'no-date': if (d) return false; break;
        }
      }
      if (tags?.length > 0 && !tags.every((t) => task.tags?.includes(t))) return false;
      return true;
    });
  },

  // Maghrib daily-reset: clear subtask checkboxes + revert any Done-column
  // tasks back to the project's first non-Done column. A task is "daily
  // cadence" if (a) its tags include 'daily-cadence', (b) `cadence === 'daily'`,
  // or (c) its projectId matches a daily-rhythm board pattern (faith_salah_*,
  // faith_siyam_*, prayer_*). Pattern-matching avoids tagging hundreds of
  // pre-existing seed tasks individually.
  resetDailyCadenceTasks: () => set((s) => {
    const isDailyProject = (pid) =>
      /^faith_salah_/.test(pid) || /^faith_siyam_/.test(pid) || /^prayer_/.test(pid);
    const isDailyTask = (t, pid) =>
      t.cadence === 'daily' || (t.tags || []).includes('daily-cadence') || isDailyProject(pid);

    const projects = useProjectStore.getState().projects;
    const next = { ...s.tasksByProject };
    for (const [projectId, tasks] of Object.entries(s.tasksByProject)) {
      const project = projects.find((p) => p.id === projectId);
      const columns = project?.columns || [];
      const doneCol = columns.find((c) => c.name === 'Done' || c.id?.endsWith('_done'));
      const todoCol = columns.find((c) => c !== doneCol) || null;
      let touched = false;
      const updated = tasks.map((t) => {
        if (!isDailyTask(t, projectId)) return t;
        const subtasks = (t.subtasks || []).map((st) => (st.done ? { ...st, done: false } : st));
        const subtasksChanged = subtasks.some((st, i) => st !== t.subtasks[i]);
        const inDone = doneCol && t.columnId === doneCol.id;
        if (!subtasksChanged && !inDone) return t;
        touched = true;
        return {
          ...t,
          subtasks,
          ...(inDone && todoCol ? { columnId: todoCol.id, completedAt: null, order: 0 } : {}),
          updatedAt: new Date().toISOString(),
        };
      });
      if (touched) {
        persistTasks(projectId, updated);
        next[projectId] = updated;
      }
    }
    return { tasksByProject: next };
  }),
}));
