import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import {
  X, Calendar, Plus, CheckCircle2, Square,
} from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { PRIORITIES } from '../../data/modules';
import './InlineTaskDetail.css';

/**
 * InlineTaskDetail — renders the full task editing UI as an expanded card
 * inline within the dashboard grid, rather than as a slide-in side panel.
 *
 * Preserves the same auto-status logic as TaskDetailPanel:
 *   To Do → In Progress on open; revert on close if no subtasks completed.
 */
export default function InlineTaskDetail({ project, projectId, taskId, levelColor, onClose }) {
  const cardRef = useRef(null);
  const task         = useTaskStore((s) => s.getTask(projectId, taskId));
  const updateTask   = useTaskStore((s) => s.updateTask);
  const addSubtask   = useTaskStore((s) => s.addSubtask);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);

  const moveTask     = useTaskStore((s) => s.moveTask);

  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes]           = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  const saveTimeout   = useRef(null);
  const titleRef      = useRef(null);
  const moveTaskRef   = useRef(moveTask);
  useEffect(() => { moveTaskRef.current = moveTask; });

  // ── Auto in-progress tracking (identical to TaskDetailPanel) ──
  const originalToDoColIdRef  = useRef(null);
  const initialDoneCountRef   = useRef(0);
  const currentDoneCountRef   = useRef(0);

  const columns     = project?.columns || [];
  const currentCol  = columns.find((c) => c.id === task?.columnId);

  // Keep currentDoneCount in sync with live subtask data
  useEffect(() => {
    currentDoneCountRef.current = task?.subtasks?.filter((s) => s.done).length ?? 0;
  }, [task?.subtasks]);

  // On open → move To Do→In Progress; on close → revert if no progress
  useEffect(() => {
    if (!task) return;
    const toDoCol      = columns.find((c) => c.name === 'To Do');
    const inProgressCol = columns.find((c) => c.name === 'In Progress');
    const doneCount    = task.subtasks?.filter((s) => s.done).length ?? 0;
    initialDoneCountRef.current  = doneCount;
    currentDoneCountRef.current  = doneCount;

    if (toDoCol && inProgressCol && task.columnId === toDoCol.id) {
      originalToDoColIdRef.current = toDoCol.id;
      moveTaskRef.current(projectId, taskId, inProgressCol.id, 0, columns);
    } else {
      originalToDoColIdRef.current = null;
    }

    return () => {
      if (originalToDoColIdRef.current !== null) {
        if (currentDoneCountRef.current <= initialDoneCountRef.current) {
          moveTaskRef.current(projectId, taskId, originalToDoColIdRef.current, 0, columns);
        }
      }
      originalToDoColIdRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  // Scroll so card top aligns with bottom of FLN on mount
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const raf = requestAnimationFrame(() => {
      const fln = document.querySelector('.fln--compact');
      // Walk up from card to find the actual scrollable container
      let scrollContainer = card.parentElement;
      while (scrollContainer && scrollContainer !== document.body) {
        const oy = getComputedStyle(scrollContainer).overflowY;
        if ((oy === 'auto' || oy === 'scroll') && scrollContainer.scrollHeight > scrollContainer.clientHeight) break;
        scrollContainer = scrollContainer.parentElement;
      }
      if (!fln || !scrollContainer) return;
      const flnBottom = fln.getBoundingClientRect().bottom;
      const cardTop = card.getBoundingClientRect().top;
      const diff = cardTop - flnBottom;
      if (Math.abs(diff) > 4) scrollContainer.scrollBy({ top: diff, behavior: 'smooth' });
    });
    return () => cancelAnimationFrame(raf);
  }, [taskId]);

  // JS fallback for field-sizing: content
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el || CSS.supports('field-sizing', 'content')) return;
    el.style.height = '0px';
    el.style.height = el.scrollHeight + 'px';
  }, [title]);

  // Sync local state when task changes
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setNotes(task.notes || '');
    }
  }, [taskId, task?.title, task?.description, task?.notes]);

  if (!task) return null;

  // ── Helpers ──
  const autoSave = (field, value) => {
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => updateTask(projectId, taskId, { [field]: value }), 300);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      addSubtask(projectId, taskId, newSubtask.trim());
      setNewSubtask('');
    }
  };

  const handleStatusChange = (colId) => {
    if (colId !== task.columnId) {
      moveTask(projectId, taskId, colId, 0, project?.columns);
    }
  };

  const removeTag = (tag) => {
    updateTask(projectId, taskId, { tags: task.tags.filter((t) => t !== tag) });
  };

  const todoSubtasks = task.subtasks?.filter((s) => !s.done) || [];
  const doneSubtasks = task.subtasks?.filter((s) => s.done)  || [];
  const priorityObj  = PRIORITIES.find((p) => p.id === task.priority);

  return (
    <div ref={cardRef} className="iltd" onClick={(e) => e.stopPropagation()}>
      {/* Close */}
      <button className="iltd__close" onClick={onClose} title="Close">
        <X size={16} />
      </button>

      {/* Title */}
      <textarea
        ref={titleRef}
        className="iltd__title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); autoSave('title', e.target.value); }}
        placeholder="Task title"
        rows={1}
      />

      {/* Priority + Status */}
      <div className="iltd__controls">
        <div className="iltd__control">
          <label>Priority</label>
          <select
            className="iltd__select"
            value={task.priority}
            onChange={(e) => updateTask(projectId, taskId, { priority: e.target.value })}
            style={{ borderColor: priorityObj?.color, color: priorityObj?.color }}
          >
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>
        <div className="iltd__control">
          <label>Status</label>
          <select
            className="iltd__select"
            value={task.columnId}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>
        </div>
        <div className="iltd__control">
          <label>Due date</label>
          <div className="iltd__due-row">
            <Calendar size={14} />
            <input
              type="date"
              className="iltd__date-input"
              value={task.dueDate || ''}
              onChange={(e) => updateTask(projectId, taskId, { dueDate: e.target.value || null })}
            />
          </div>
        </div>
      </div>

      <div className="iltd__divider" />

      {/* Description (read-only) */}
      {description && (
        <div>
          <div className="iltd__section-label">Description</div>
          <p className="iltd__description">{description}</p>
        </div>
      )}

      {/* Subtasks */}
      <div>
        <div className="iltd__section-label">Subtasks</div>
        {todoSubtasks.length > 0 && (
          <>
            <div className="iltd__subtask-group-label">To Do</div>
            {todoSubtasks.map((st) => (
              <div key={st.id} className="iltd__subtask-item">
                <button className="iltd__subtask-check" onClick={() => toggleSubtask(projectId, taskId, st.id)}>
                  <Square size={18} />
                </button>
                <div className="iltd__subtask-content">
                  <span className="iltd__subtask-title">{st.title}</span>
                  {st.description && <p className="iltd__subtask-desc">{st.description}</p>}
                </div>
              </div>
            ))}
          </>
        )}

        {doneSubtasks.length > 0 && (
          <>
            <div className="iltd__subtask-group-label">Completed</div>
            {doneSubtasks.map((st) => (
              <div key={st.id} className="iltd__subtask-item">
                <button className="iltd__subtask-check iltd__subtask-check--done" onClick={() => toggleSubtask(projectId, taskId, st.id)}>
                  <CheckCircle2 size={18} />
                </button>
                <div className="iltd__subtask-content">
                  <span className="iltd__subtask-title done">{st.title}</span>
                  {st.description && <p className="iltd__subtask-desc">{st.description}</p>}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="iltd__divider" />

      {/* Notes */}
      <div>
        <div className="iltd__section-label">Notes</div>
        <textarea
          className="iltd__textarea"
          value={notes}
          onChange={(e) => { setNotes(e.target.value); autoSave('notes', e.target.value); }}
          placeholder="Add notes..."
          rows={3}
        />
      </div>

      {/* Tags */}
      {(task.tags?.length > 0 || true) && (
        <div>
          <div className="iltd__section-label">Tags</div>
          <div className="iltd__tags-row">
            {task.tags?.map((tag) => (
              <span key={tag} className="iltd__tag">
                {tag}
                <button className="iltd__tag-remove" onClick={() => removeTag(tag)}><X size={14} /></button>
              </span>
            ))}
            <button
              className="iltd__tag-add"
              onClick={() => {
                const tag = prompt('Tag name:');
                if (tag?.trim() && !task.tags.includes(tag.trim())) {
                  updateTask(projectId, taskId, { tags: [...task.tags, tag.trim()] });
                }
              }}
            >
              <Plus size={14} /> Tag
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
