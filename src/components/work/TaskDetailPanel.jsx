import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Check, FileText, LayoutGrid,
  Shield, TrendingUp, Star, CheckCircle2, HeartHandshake,
  HandHeart, Moon, Landmark, Activity, BrainCircuit,
  Sparkles, Library, Lightbulb, Wrench, Heart,
  Baby, Handshake, Home, Building2, Wallet,
  PiggyBank, Scale, Gift, Droplets, Recycle,
  TreeDeciduous, ShoppingBag, Globe, Users,
} from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useProjectStore } from '../../store/project-store';
import { PRIORITIES } from '../../data/modules';
import BbosTaskPanel from '../bbos/BbosTaskPanel';
import './TaskDetailPanel.css';

/* Lucide icon name → component map for project/module icons */
const ICON_MAP = {
  Shield, TrendingUp, Star, CheckCircle2, HeartHandshake,
  HandHeart, Moon, Landmark, Activity, BrainCircuit,
  Sparkles, Library, Lightbulb, Wrench, Heart,
  Baby, Handshake, Home, Building2, Wallet,
  PiggyBank, Scale, Gift, Droplets, Recycle,
  TreeDeciduous, ShoppingBag, Globe, Users, LayoutGrid,
};

function computeTransformOrigin(cardRect, panelW) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w = Math.min(panelW ?? 672, vw * 0.92);
  const panelH = vh * 0.85;
  const panelLeft = (vw - w) / 2;
  const panelTop = (vh - panelH) / 2;
  const cardCX = cardRect.left + cardRect.width / 2;
  const cardCY = cardRect.top + cardRect.height / 2;
  const ox = Math.max(0, Math.min(w, cardCX - panelLeft));
  const oy = Math.max(0, Math.min(panelH, cardCY - panelTop));
  return `${Math.round(ox)}px ${Math.round(oy)}px`;
}

export default function TaskDetailPanel({ project, projectId, taskId, onClose, bbosRole, accentColor }) {
  const task = useTaskStore((s) => s.getTask(projectId, taskId));
  const updateTask = useTaskStore((s) => s.updateTask);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const moveTask = useTaskStore((s) => s.moveTask);
  const user = useTaskStore ? undefined : undefined; // removed — footer meta gone

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [transformOrigin, setTransformOrigin] = useState(null);
  const [closing, setClosing] = useState(false);
  const saveTimeout = useRef(null);
  const titleRef = useRef(null);

  const handleClose = useRef(() => {
    setClosing(true);
    setTimeout(() => onClose(), 200);
  });
  useEffect(() => {
    handleClose.current = () => {
      setClosing(true);
      setTimeout(() => onClose(), 200);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    const card = document.querySelector(`[data-task-id="${taskId}"]`);
    if (card) {
      const rect = card.getBoundingClientRect();
      setTransformOrigin(computeTransformOrigin(rect, 672));
    } else {
      setTransformOrigin(null);
    }
  }, [taskId]);

  // ── Auto in-progress tracking ──
  const originalToDoColIdRef = useRef(null);
  const initialDoneCountRef = useRef(0);
  const currentDoneCountRef = useRef(0);
  const moveTaskRef = useRef(moveTask);
  useEffect(() => { moveTaskRef.current = moveTask; });

  const columns = project?.columns || [];

  useEffect(() => {
    currentDoneCountRef.current = task?.subtasks?.filter((s) => s.done).length ?? 0;
  }, [task?.subtasks]);

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

  // JS fallback for field-sizing: content
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el || CSS.supports('field-sizing', 'content')) return;
    el.style.height = '0px';
    el.style.height = el.scrollHeight + 'px';
  }, [title]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setNotes(task.notes || '');
    }
  }, [taskId, task?.title, task?.notes]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') handleClose.current(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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
        accentColor={accentColor}
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

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    autoSave('notes', e.target.value);
  };

  const allSubtasks = task.subtasks || [];
  const doneCount = allSubtasks.filter((s) => s.done).length;
  const totalCount = allSubtasks.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
  const priorityObj = PRIORITIES.find((p) => p.id === task.priority);

  // Build header label from project name
  const headerLabel = project?.name || 'Project';
  const HeaderIcon = (project?.icon && ICON_MAP[project.icon]) || LayoutGrid;

  const panel = (
    <div
      className={`task-detail-panel${closing ? ' tdp-scale-out' : ' tdp-scale-in'}`}
      style={{
        ...(transformOrigin ? { transformOrigin } : {}),
        ...(accentColor ? { '--tdp-accent': accentColor } : {}),
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header ── */}
      <div className="tdp-header">
        <div className="tdp-header__left">
          <span className="tdp-header__icon"><HeaderIcon size={20} /></span>
          <span className="tdp-project-name">{headerLabel}</span>
        </div>
        <button className="tdp-close-btn" onClick={() => handleClose.current()}><X size={18} /></button>
      </div>

      {/* ── Body ── */}
      <div className="tdp-body">
        {/* Priority + Title + Description */}
        <div>
          {priorityObj && (
            <span
              className="tdp-priority-badge"
              style={{ background: priorityObj.bg, color: priorityObj.color }}
            >
              {priorityObj.label} Priority
            </span>
          )}
          <textarea
            ref={titleRef}
            className="tdp-title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Task title"
            rows={1}
          />
          {task.description && (
            <p className="tdp-description-text">{task.description}</p>
          )}
        </div>

        {/* Progress bar */}
        {totalCount > 0 && (
          <div className="tdp-progress">
            <div className="tdp-progress__header">
              <span className="tdp-progress__label">Subtask Completion</span>
              <span className="tdp-progress__pct">{pct}%</span>
            </div>
            <div className="tdp-progress__track">
              <div className="tdp-progress__fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )}

        {/* Subtasks */}
        <div className="tdp-subtasks-section">
          <h3 className="tdp-section-label">Subtasks</h3>
          <div className="tdp-subtask-list">
            {allSubtasks.map((st) => (
              <div key={st.id} className="tdp-subtask-row">
                <button
                  className={`tdp-subtask-circle ${st.done ? 'tdp-subtask-circle--done' : ''}`}
                  onClick={() => toggleSubtask(projectId, taskId, st.id)}
                >
                  {st.done && (
                    <span className="tdp-subtask-circle__check"><Check size={14} /></span>
                  )}
                </button>
                <span className={`tdp-subtask-text ${st.done ? 'tdp-subtask-text--done' : ''}`}>
                  {st.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="tdp-notes-section">
          <h3 className="tdp-section-label">Notes</h3>
          <div className="tdp-notes-container">
            <textarea
              className="tdp-notes"
              value={notes}
              onChange={handleNotesChange}
              placeholder="Write your thoughts or key learnings here..."
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="tdp-footer">
        <button className="tdp-doc-btn">
          <FileText size={16} />
          Task Document
        </button>
      </div>
    </div>
  );

  return createPortal(
    <div className={`tdp-overlay${closing ? ' tdp-overlay--closing' : ''}`} onClick={() => handleClose.current()}>
      {panel}
    </div>,
    document.body
  );
}
