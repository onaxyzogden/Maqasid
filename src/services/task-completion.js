// Task completion is decided by its steps. A task with at least one subtask is
// complete when every subtask is satisfied — done, or marked "doesn't apply" —
// which is the same verdict Orientation and the Prophetic Path steppers reach
// through orientation-selector's isTaskComplete. The board's Done column and
// `completedAt` (read by the Kanban, Dashboard, PillarLevelDashboard,
// getLevelStatus, getFocusTasks) must agree with it, so this module is the one
// place that reconciles them. Dependency-free on purpose: the pre-mount
// migration uses it, and orientation-selector imports the task store.

// Mirrors isSubtaskSatisfied in src/data/orientation-selector.js.
export function isSubtaskSatisfied(subtask) {
  return !!(subtask?.done || subtask?.notApplicable);
}

export function allSubtasksSatisfied(task) {
  const subs = Array.isArray(task?.subtasks) ? task.subtasks : [];
  return subs.length > 0 && subs.every(isSubtaskSatisfied);
}

// The Done column (by name, as moveTask and the dashboards find it) and the
// column a reopened task returns to: the one before Done, else the first
// non-Done column.
export function completionColumns(columns) {
  const cols = Array.isArray(columns) ? columns : [];
  const doneIdx = cols.findIndex((c) => c.name === 'Done');
  if (doneIdx === -1) return { doneColId: null, revertColId: null };
  const revert = doneIdx > 0 ? cols[doneIdx - 1] : cols.find((c) => c.name !== 'Done');
  return { doneColId: cols[doneIdx].id, revertColId: revert?.id ?? null };
}

// Returns the task with its column and `completedAt` agreeing with its steps,
// or the same object when nothing needs to change.
// - All steps satisfied and not yet complete → Done, completedAt = now
//   (an existing completedAt is kept).
// - In Done but a step is no longer satisfied → back to the revert column,
//   completedAt cleared. Skipped with `promoteOnly`.
// A task with no subtasks is never touched: its completion is whatever the
// operator set by moving the card.
export function syncTaskCompletion(task, columns, now, { promoteOnly = false } = {}) {
  if (!task || !Array.isArray(task.subtasks) || task.subtasks.length === 0) return task;
  const { doneColId, revertColId } = completionColumns(columns);
  if (!doneColId) return task;
  if (allSubtasksSatisfied(task)) {
    if (task.columnId === doneColId && task.completedAt) return task;
    return { ...task, columnId: doneColId, completedAt: task.completedAt || now };
  }
  if (!promoteOnly && task.columnId === doneColId && revertColId) {
    return { ...task, columnId: revertColId, completedAt: null };
  }
  return task;
}

// Places a task whose column just changed: a reopened task goes to the top of
// its column (order 0, the rest shift down), a completed one to the end of
// Done. Pure; returns a new array.
export function placeMovedTask(tasks, taskId, doneColId) {
  const moved = tasks.find((t) => t.id === taskId);
  if (!moved) return tasks;
  const others = tasks
    .filter((t) => t.columnId === moved.columnId && t.id !== taskId)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const column = moved.columnId === doneColId ? [...others, moved] : [moved, ...others];
  const orderOf = new Map(column.map((t, i) => [t.id, i]));
  return tasks.map((t) => (orderOf.has(t.id) && t.order !== orderOf.get(t.id) ? { ...t, order: orderOf.get(t.id) } : t));
}

// Migration helper: promote every stored task whose steps are all satisfied
// into Done (never reopens anything — a card someone dragged to Done stays).
// Promoted tasks are appended to Done in their existing relative order, with
// completedAt = updatedAt (closest to when the last step was ticked) else now.
export function reconcileBoardCompletion(tasks, columns, nowIso) {
  if (!Array.isArray(tasks) || tasks.length === 0) return { next: tasks, promoted: 0 };
  const { doneColId } = completionColumns(columns);
  if (!doneColId) return { next: tasks, promoted: 0 };
  let maxDone = tasks.reduce((m, t) => (t.columnId === doneColId ? Math.max(m, t.order ?? 0) : m), -1);
  let promoted = 0;
  const next = tasks.map((t) => {
    const synced = syncTaskCompletion(t, columns, t.updatedAt || nowIso, { promoteOnly: true });
    if (synced === t) return t;
    promoted += 1;
    if (t.columnId === doneColId) return synced; // already in Done, only completedAt was missing
    maxDone += 1;
    return { ...synced, order: maxDone };
  });
  return { next: promoted ? next : tasks, promoted };
}
