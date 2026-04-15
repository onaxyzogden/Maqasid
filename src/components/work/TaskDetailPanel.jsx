import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Calendar, Tag, Plus, Trash2, CheckCircle2, Square,
  MoreVertical, ChevronDown, ChevronUp, Clock, Paperclip, Users, FileText, Image, File,
} from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useTaskActions } from '../../hooks/useTaskActions';
import { useAuthStore } from '../../store/auth-store';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { useProjectStore } from '../../store/project-store';
import { PRIORITIES } from '../../data/modules';
import GLabelPicker from '../shared/GLabelPicker';
import BbosTaskPanel from '../bbos/BbosTaskPanel';
import './TaskDetailPanel.css';

function computeTransformOrigin(cardRect) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const panelW = Math.min(480, vw * 0.92);
  const panelH = vh * 0.85;
  const panelLeft = (vw - panelW) / 2;
  const panelTop = (vh - panelH) / 2;
  const cardCX = cardRect.left + cardRect.width / 2;
  const cardCY = cardRect.top + cardRect.height / 2;
  const ox = Math.max(0, Math.min(panelW, cardCX - panelLeft));
  const oy = Math.max(0, Math.min(panelH, cardCY - panelTop));
  return `${Math.round(ox)}px ${Math.round(oy)}px`;
}

function formatDateTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en', {
    month: 'short', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

export default function TaskDetailPanel({ project, projectId, taskId, onClose, bbosRole }) {
  const task = useTaskStore((s) => s.getTask(projectId, taskId));
  const updateTask = useTaskStore((s) => s.updateTask);
  const addSubtask = useTaskStore((s) => s.addSubtask);
  const { deleteTask } = useTaskActions(projectId);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const removeSubtask = useTaskStore((s) => s.removeSubtask);
  const addAttachment = useTaskStore((s) => s.addAttachment);
  const removeAttachment = useTaskStore((s) => s.removeAttachment);
  const moveTask = useTaskStore((s) => s.moveTask);
  const fileInputRef = useRef(null);
  const user = useAuthStore((s) => s.user);
  const employees = usePeopleStore((s) => s.employees);
  const addProjectMember = useProjectStore((s) => s.addProjectMember);
  const projectMembers = (project?.members || [])
    .map((id) => employees.find((e) => e.id === id))
    .filter(Boolean);
  const allEmployees = employees.filter((e) => e.status !== 'terminated');
  const assignee = task ? employees.find((e) => e.id === task.assigneeId) : null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [newSubtask, setNewSubtask] = useState('');
  const [expandedSubtask, setExpandedSubtask] = useState(null);
  const [transformOrigin, setTransformOrigin] = useState(null);
  const saveTimeout = useRef(null);

  useLayoutEffect(() => {
    const card = document.querySelector(`[data-task-id="${taskId}"]`);
    if (card) {
      setTransformOrigin(computeTransformOrigin(card.getBoundingClientRect()));
    } else {
      setTransformOrigin(null);
    }
  }, [taskId]);
  const titleRef = useRef(null);

  // ── Auto in-progress tracking ──
  const originalToDoColIdRef = useRef(null); // set if we moved task from To Do → In Progress
  const initialDoneCountRef = useRef(0);
  const currentDoneCountRef = useRef(0);
  const moveTaskRef = useRef(moveTask);
  useEffect(() => { moveTaskRef.current = moveTask; });

  const columns = project?.columns || [];
  const currentCol = columns.find((c) => c.id === task?.columnId);

  // Keep currentDoneCount ref in sync with live subtask data
  useEffect(() => {
    currentDoneCountRef.current = task?.subtasks?.filter((s) => s.done).length ?? 0;
  }, [task?.subtasks]);

  // On open: move task To Do → In Progress. On close: revert if no subtasks completed.
  useEffect(() => {
    if (!task) return;
    const toDoCol = columns.find((c) => c.name === 'To Do');
    const inProgressCol = columns.find((c) => c.name === 'In Progress');

    const doneCount = task.subtasks?.filter((s) => s.done).length ?? 0;
    initialDoneCountRef.current = doneCount;
    currentDoneCountRef.current = doneCount;

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

  // JS fallback for browsers that don't support field-sizing: content
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el || CSS.supports('field-sizing', 'content')) return;
    el.style.height = '0px';
    el.style.height = el.scrollHeight + 'px';
  }, [title]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setNotes(task.notes || '');
    }
  }, [taskId, task?.title, task?.description, task?.notes]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!task) return null;

  // BBOS tasks get their own dedicated panel
  if (task.bbosTaskType) {
    return (
      <BbosTaskPanel
        project={project}
        projectId={projectId}
        taskId={taskId}
        onClose={onClose}
        bbosRole={bbosRole}
      />
    );
  }

  const autoSave = (field, value) => {
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      updateTask(projectId, taskId, { [field]: value });
    }, 300);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    autoSave('title', e.target.value);
  };

  const handleDescChange = (e) => {
    setDescription(e.target.value);
    autoSave('description', e.target.value);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    autoSave('notes', e.target.value);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      addSubtask(projectId, taskId, newSubtask.trim());
      setNewSubtask('');
    }
  };

  const removeTag = (tag) => {
    updateTask(projectId, taskId, { tags: task.tags.filter((t) => t !== tag) });
  };

  const handleStatusChange = (colId) => {
    if (colId !== task.columnId) {
      moveTask(projectId, taskId, colId, 0, project?.columns);
    }
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      deleteTask(taskId, task.title);
      onClose();
    }
  };

  const todoSubtasks = task.subtasks?.filter((s) => !s.done) || [];
  const doneSubtasks = task.subtasks?.filter((s) => s.done) || [];
  const priorityObj = PRIORITIES.find((p) => p.id === task.priority);

  const panel = (
    <div
      className="task-detail-panel tdp-scale-in"
      style={transformOrigin ? { transformOrigin } : undefined}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header bar ── */}
      <div className="tdp-header">
        <div className="tdp-header__left">
          <span className="tdp-project-name">{project?.name || 'Project'}</span>
          {task.id && <span className="tdp-task-id">ID: {task.id.slice(-4)}</span>}
        </div>
        <div className="tdp-header__right">
          {task.dueDate && (
            <span className="tdp-due-badge">
              <Calendar size={14} /> Due date
            </span>
          )}
          <button className="tdp-icon-btn"><MoreVertical size={16} /></button>
          <button className="tdp-icon-btn" onClick={onClose}><X size={16} /></button>
        </div>
      </div>

      <div className="tdp-body">
        {/* ── Title ── */}
        <textarea
          ref={titleRef}
          className="tdp-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Task title"
          rows={1}
        />

        {/* ── Assignee + Priority + Status row ── */}
        <div className="tdp-controls-row">
          <div className="tdp-assignee">
            {assignee ? (
              <span className="tdp-assignee-avatar" title={assignee.name}>{getInitials(assignee.name)}</span>
            ) : (
              <span className="tdp-assignee-avatar tdp-assignee-avatar--empty" title="Unassigned">?</span>
            )}
            <select
              className="tdp-assignee-select"
              value={task.assigneeId || ''}
              onChange={(e) => {
                const val = e.target.value;
                updateTask(projectId, taskId, { assigneeId: val || null });
                if (val) addProjectMember(projectId, val);
              }}
              title="Assign member"
            >
              <option value="">Unassigned</option>
              {projectMembers.length > 0 && (
                <optgroup label="Project members">
                  {projectMembers.map((e) => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </optgroup>
              )}
              {allEmployees.filter((e) => !(project?.members || []).includes(e.id)).length > 0 && (
                <optgroup label="Add from team">
                  {allEmployees
                    .filter((e) => !(project?.members || []).includes(e.id))
                    .map((e) => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          <div className="tdp-control-group">
            <label>Priority</label>
            <select
              className="tdp-select tdp-select--priority"
              value={task.priority}
              onChange={(e) => updateTask(projectId, taskId, { priority: e.target.value })}
              style={{ borderColor: priorityObj?.color, color: priorityObj?.color }}
            >
              {PRIORITIES.map((p) => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          <div className="tdp-control-group">
            <label>Status</label>
            <select
              className="tdp-select tdp-select--status"
              value={task.columnId}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {columns.map((col) => (
                <option key={col.id} value={col.id}>{col.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* BBOS Pipeline Stage — only relevant for BBOS tasks, which are
             handled by BbosTaskPanel (see delegation above). Regular tasks
             created in the Tasks tab should never show pipeline controls. */}

        {/* ── G-Label (claim integrity) ── */}
        <div className="tdp-controls-row" style={{ gap: 'var(--space-3)' }}>
          <div className="tdp-control-group">
            <label>Integrity</label>
            <GLabelPicker
              value={task.gLabel || null}
              onChange={(gLabel) => updateTask(projectId, taskId, { gLabel })}
            />
          </div>
        </div>

        {/* ── Due date ── */}
        <div className="tdp-due-row">
          <Calendar size={14} className="tdp-due-icon" />
          <input
            type="date"
            className="tdp-date-input"
            value={task.dueDate || ''}
            onChange={(e) => updateTask(projectId, taskId, { dueDate: e.target.value || null })}
          />
        </div>

        {/* ── Description ── */}
        <div className="tdp-desc-section">
          <textarea
            className="tdp-description"
            value={description}
            onChange={handleDescChange}
            placeholder="Add a description..."
            rows={3}
          />
        </div>

        {/* ── Subtasks ── */}
        <div className="tdp-subtasks-section">
          <div className="tdp-subtask-add-row">
            <Plus size={14} />
            <input
              className="tdp-subtask-input"
              value={newSubtask}
              onChange={(e) => setNewSubtask(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddSubtask(); }}
              placeholder="Subtask"
            />
          </div>

          {/* To Do */}
          {todoSubtasks.length > 0 && (
            <>
              <div className="tdp-subtask-group-label">To Do</div>
              {todoSubtasks.map((st) => (
                <div key={st.id} className="tdp-subtask-item">
                  <button
                    className="tdp-subtask-check"
                    onClick={() => toggleSubtask(projectId, taskId, st.id)}
                  >
                    <Square size={14} />
                  </button>
                  <span
                    className={`tdp-subtask-title ${expandedSubtask === st.id ? 'expanded' : ''}`}
                    onClick={() => setExpandedSubtask(expandedSubtask === st.id ? null : st.id)}
                  >
                    {st.title}
                  </span>
                  <button
                    className="tdp-subtask-expand"
                    onClick={() => setExpandedSubtask(expandedSubtask === st.id ? null : st.id)}
                  >
                    {expandedSubtask === st.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Completed */}
          {doneSubtasks.length > 0 && (
            <>
              <div className="tdp-subtask-group-label tdp-subtask-group-label--done">Completed</div>
              {doneSubtasks.map((st) => (
                <div key={st.id} className="tdp-subtask-item tdp-subtask-item--done">
                  <button
                    className="tdp-subtask-check tdp-subtask-check--done"
                    onClick={() => toggleSubtask(projectId, taskId, st.id)}
                  >
                    <CheckCircle2 size={14} />
                  </button>
                  <span className="tdp-subtask-title done">{st.title}</span>
                  <button
                    className="tdp-subtask-remove"
                    onClick={() => removeSubtask(projectId, taskId, st.id)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* ── Notes ── */}
        <div className="tdp-notes-section">
          <div className="tdp-notes-label">Notes</div>
          <textarea
            className="tdp-notes"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Add notes..."
            rows={4}
          />
        </div>

        {/* ── Attachments ── */}
        <div className="tdp-attachments">
          {(task.attachments || []).length > 0 && (
            <div className="tdp-attachment-list">
              {(task.attachments || []).map((att) => {
                const isImage = att.type.startsWith('image/');
                const isPdf = att.type === 'application/pdf';
                const Icon = isImage ? Image : isPdf ? FileText : File;
                const sizeKb = (att.size / 1024).toFixed(0);
                return (
                  <div key={att.id} className="tdp-attachment-item">
                    {isImage ? (
                      <a href={att.data} download={att.name} className="tdp-attachment-thumb">
                        <img src={att.data} alt={att.name} />
                      </a>
                    ) : (
                      <a href={att.data} download={att.name} className="tdp-attachment-icon">
                        <Icon size={18} />
                      </a>
                    )}
                    <div className="tdp-attachment-meta">
                      <a href={att.data} download={att.name} className="tdp-attachment-name">{att.name}</a>
                      <span className="tdp-attachment-size">{sizeKb} KB</span>
                    </div>
                    <button className="tdp-attachment-remove" onClick={() => removeAttachment(projectId, taskId, att.id)} title="Remove">
                      <X size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addAttachment(projectId, taskId, file);
              e.target.value = '';
            }}
          />
          <button className="tdp-attachment-btn" onClick={() => fileInputRef.current?.click()}>
            <Paperclip size={14} /> Attachment
          </button>
        </div>

        {/* ── Tags ── */}
        <div className="tdp-tags-section">
          <div className="tdp-tags-label">Tags</div>
          <div className="tdp-tags-row">
            {task.tags?.map((tag) => (
              <span key={tag} className="tdp-tag">
                {tag}
                <button className="tdp-tag-remove" onClick={() => removeTag(tag)}>
                  <X size={14} />
                </button>
              </span>
            ))}
            <button className="tdp-tag-add" onClick={() => {
              const tag = prompt('Tag name:');
              if (tag?.trim() && !task.tags.includes(tag.trim())) {
                updateTask(projectId, taskId, { tags: [...task.tags, tag.trim()] });
              }
            }}>
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* ── Status timeline ── */}
        <div className="tdp-status-row">
          <span className="tdp-status-current">
            {currentCol?.name || 'Unknown'}
          </span>
          <span className="tdp-status-time">
            <Clock size={14} />
          </span>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="tdp-footer">
        <div className="tdp-footer__meta">
          <span className="tdp-footer__by">
            By <strong>{user?.name || 'You'}</strong> on{' '}
            <span className="tdp-footer__date">{formatDateTime(task.createdAt)}</span>
          </span>
          <span className="tdp-footer__followers">
            Followers <Users size={14} />
          </span>
        </div>
        <div className="tdp-footer__actions">
          <button className="tdp-footer-btn" onClick={handleDelete}>
            <Trash2 size={14} /> Delete
          </button>
          <button className="tdp-footer-btn">Make Recurring</button>
          <button className="tdp-footer-btn">Show discussion</button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    <div className="tdp-overlay" onClick={onClose}>
      {panel}
    </div>,
    document.body
  );
}
