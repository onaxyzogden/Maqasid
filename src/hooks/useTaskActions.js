import { useCallback } from 'react';
import { useTaskStore } from '@store/task-store';
import { useToastStore } from '@store/toast-store';

/**
 * useTaskActions — wraps task store operations with built-in toast feedback.
 *
 * Per NLM design intelligence: every completed action must be confirmed.
 * "When a user completes a task, saves a form, or deletes an item, the interface
 * provides zero confirmation" — this hook fixes that across all task CRUD.
 *
 * Usage (drop-in replacement for direct store calls):
 *   const { completeTask, deleteTask, createTask, updateTask } = useTaskActions(projectId);
 *
 *   // Instead of: store.updateTask(pid, tid, { completedAt: now })
 *   await completeTask(taskId, taskTitle);
 */
export function useTaskActions(projectId) {
  const store = useTaskStore();
  const { addToast } = useToastStore();

  /** Mark a task as complete and confirm with a success toast */
  const completeTask = useCallback(
    (taskId, taskTitle = 'Task') => {
      store.updateTask(projectId, taskId, {
        completedAt: new Date().toISOString(),
        columnId: store.getTask(projectId, taskId)?.columnId,
      });
      addToast({
        type: 'success',
        message: `"${taskTitle}" completed`,
      });
    },
    [projectId, store, addToast]
  );

  /** Delete a task and confirm with a toast */
  const deleteTask = useCallback(
    (taskId, taskTitle = 'Task') => {
      store.deleteTask(projectId, taskId);
      addToast({
        type: 'info',
        message: `"${taskTitle}" removed`,
      });
    },
    [projectId, store, addToast]
  );

  /** Create a task and confirm with a chip toast */
  const createTask = useCallback(
    (columnId, title, opts = {}) => {
      const task = store.createTask(projectId, columnId, title, opts);
      addToast({
        type: 'success',
        message: 'Task created',
        variant: 'chip',
      });
      return task;
    },
    [projectId, store, addToast]
  );

  /** Update a task silently (no toast — for real-time edits) */
  const updateTask = useCallback(
    (taskId, updates) => {
      store.updateTask(projectId, taskId, updates);
    },
    [projectId, store]
  );

  /** Update a task with a save confirmation toast */
  const saveTask = useCallback(
    (taskId, updates, message = 'Changes saved') => {
      store.updateTask(projectId, taskId, updates);
      addToast({
        type: 'success',
        message,
        variant: 'chip',
      });
    },
    [projectId, store, addToast]
  );

  return { completeTask, deleteTask, createTask, updateTask, saveTask };
}

/**
 * useClipboardToast — fires a chip toast on clipboard copy.
 *
 * Usage:
 *   const copyWithFeedback = useClipboardToast();
 *   copyWithFeedback(text); // copies + shows chip
 */
export function useClipboardToast() {
  const { addToast } = useToastStore();

  return useCallback(
    async (text, message = 'Copied to clipboard') => {
      try {
        await navigator.clipboard.writeText(text);
        addToast({ type: 'success', message, variant: 'chip' });
      } catch {
        addToast({ type: 'error', message: 'Copy failed — check browser permissions' });
      }
    },
    [addToast]
  );
}
