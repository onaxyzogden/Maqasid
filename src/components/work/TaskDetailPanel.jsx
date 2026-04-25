import { useState, useEffect, useLayoutEffect, useRef, lazy, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import {
  X, Check, FileText, LayoutGrid, ArrowLeft,
  Calendar, Tag, User, Flag, Columns3, ChevronRight,
} from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useProjectStore } from '../../store/project-store';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { PRIORITIES } from '../../data/modules';
import { ICON_REGISTRY } from '../../data/icon-registry';
// react-markdown + remark-gfm (~80 KB gz combined) lazy-loaded via LazyMarkdown
// — only the handful of subtasks that actually render a markdown description
// trigger the fetch.
const LazyMarkdown = lazy(() => import('../shared/LazyMarkdown'));
import BbosTaskPanel from '../bbos/BbosTaskPanel';
import AmanahTierBadge from '../shared/AmanahTierBadge';
import ChunkErrorBoundary from '../shared/ChunkErrorBoundary';
// SubtaskSources pulls in hadith.js (1.3 MB) + quran-wbw.js (536 KB) via HadithCard/QuranVerseCard.
// Lazy-load so those 1.8 MB only ship when a user opens the Sources tab on a subtask.
const SubtaskSources = lazy(() => import('./SubtaskSources'));
import './TaskDetailPanel.css';

function SourcesSkeleton() {
  const row = {
    height: 14,
    borderRadius: 4,
    background: 'var(--surface-2, #eee)',
    marginBottom: 10,
    opacity: 0.6,
  };
  return (
    <div aria-busy="true" aria-label="Loading sources" style={{ padding: '12px 0' }}>
      <div style={{ ...row, width: '55%' }} />
      <div style={{ ...row, width: '92%' }} />
      <div style={{ ...row, width: '78%' }} />
    </div>
  );
}

function isSubtaskGrounded(sub) {
  if (!sub || !Array.isArray(sub.sources) || sub.sources.length === 0) return null;
  const ok = sub.sources.some(
    (e) =>
      (e?.provenanceTier === 'Bayyinah' || e?.provenanceTier === 'Qarina') &&
      (e?.relevance === 'direct' || e?.relevance === 'contextual'),
  );
  return ok;
}

/* Lucide icon name → component map for project/module icons.
   Resolved via the shared registry (src/data/icon-registry.js).
   `LayoutGrid` is added locally because it's used as a fallback
   but isn't one of the data-layer icon names. */
const ICON_MAP = { ...ICON_REGISTRY, LayoutGrid };

export default function TaskDetailPanel({ project, projectId, taskId, onClose, bbosRole, accentColor }) {
  const task = useTaskStore((s) => s.getTask(projectId, taskId));
  const updateTask = useTaskStore((s) => s.updateTask);
  const toggleSubtask = useTaskStore((s) => s.toggleSubtask);
  const moveTask = useTaskStore((s) => s.moveTask);
  const employees = usePeopleStore((s) => s.employees);

  const trapRef = useFocusTrap(!!taskId, onClose);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [closing, setClosing] = useState(false);
  const [docOpen, setDocOpen] = useState(false);
  const [activeSubtask, setActiveSubtask] = useState(null); // subtask object or null
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [slideDir, setSlideDir] = useState(null); // 'forward' | 'back'
  const subtaskBodyRef = useRef(null);
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

  // Track scroll-to-bottom in subtask detail view
  useEffect(() => {
    if (!activeSubtask) return;
    const el = subtaskBodyRef.current;
    if (!el) return;
    // If content doesn't scroll (fits in viewport), count as "scrolled"
    if (el.scrollHeight <= el.clientHeight + 10) {
      setHasScrolledToBottom(true);
      return;
    }
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 20) {
        setHasScrolledToBottom(true);
      }
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [activeSubtask]);

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
  // Q3 — when every subtask shares the same tier, lift the badge to the
  // section header instead of repeating it on each row (visual noise).
  const tierSet = new Set(allSubtasks.map((s) => s.tier).filter(Boolean));
  const sharedTier = tierSet.size === 1 ? [...tierSet][0] : null;
  const isLocked = totalCount > 0 && doneCount < totalCount;
  const isReady = totalCount > 0 && doneCount === totalCount;

  // Build header label from project name
  const headerLabel = project?.name || 'Project';
  const HeaderIcon = (project?.icon && ICON_MAP[project.icon]) || LayoutGrid;

  const openDoc = () => { setSlideDir('forward'); setActiveSubtask(null); setDocOpen(true); };
  const closeDoc = () => { setSlideDir('back'); setDocOpen(false); };
  const openSubtask = (st) => { setSlideDir('forward'); setDocOpen(false); setActiveSubtask(st); setSourcesOpen(false); setHasScrolledToBottom(false); };
  const closeSubtask = () => { setSlideDir('back'); setActiveSubtask(null); setSourcesOpen(false); };
  const openSources = () => { setSlideDir('forward'); setSourcesOpen(true); };
  const closeSources = () => { setSlideDir('back'); setSourcesOpen(false); };

  // ── Derive status from column ──
  const currentCol = columns.find((c) => c.id === task.columnId);
  const statusLabel = currentCol?.name || 'To Do';

  // Assignee info
  const assignee = employees.find((e) => e.id === task.assigneeId);

  // Format due date for display and input
  const dueDateDisplay = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;
  const dueDateInput = task.dueDate ? task.dueDate.slice(0, 10) : '';

  /* ── Summary view (default) ── */
  const summaryView = (
    <>
      {/* ── Body ── */}
      <div className="tdp-body">
        {/* Title + Priority (eyebrow) + Description */}
        <div className="tdp-header-block">
          <textarea
            ref={titleRef}
            id="task-detail-title"
            className="tdp-title"
            value={title}
            readOnly
            placeholder="Task title"
            rows={1}
          />
          {priorityObj && (
            <span
              className="tdp-priority-badge"
              style={{
                background: `color-mix(in srgb, ${priorityObj.color} 12%, transparent)`,
                color: priorityObj.color,
              }}
            >
              {priorityObj.label} Priority
            </span>
          )}
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
          <h3 className="tdp-section-label">
            <span className="tdp-section-label__text">Subtasks</span>
            {sharedTier && (
              <span className="tdp-section-label__tier">
                <AmanahTierBadge tier={sharedTier} size="sm" />
              </span>
            )}
            <span className="tdp-section-hint">(tap each one to see why and how)</span>
          </h3>
          <div className="tdp-subtask-list">
            {allSubtasks.map((st) => (
              <div key={st.id} className="tdp-subtask-row" onClick={() => openSubtask(st)}>
                <button
                  className={`tdp-subtask-circle ${st.done ? 'tdp-subtask-circle--done' : ''}`}
                  onClick={(e) => { e.stopPropagation(); toggleSubtask(projectId, taskId, st.id); }}
                >
                  {st.done && (
                    <span className="tdp-subtask-circle__check"><Check size={14} /></span>
                  )}
                </button>
                <span className={`tdp-subtask-text ${st.done ? 'tdp-subtask-text--done' : ''}`}>
                  {st.title}
                </span>
                {st.tier && !sharedTier && <AmanahTierBadge tier={st.tier} size="sm" />}
                <ChevronRight size={16} className="tdp-subtask-chevron" />
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
      <div className="tdp-footer tdp-footer--subtask">
        <button className="tdp-later-btn" onClick={() => handleClose.current()}>
          Back
        </button>
        <button
          className={`tdp-done-btn${isReady ? ' motif-shimmer-border' : ''}`}
          data-state={isReady ? 'ready' : isLocked ? 'locked' : 'empty'}
          aria-disabled={!isReady}
          onClick={() => {
            if (!isReady) return;
            const doneCol = columns.find((c) => c.name === 'Done');
            if (doneCol) {
              moveTask(projectId, taskId, doneCol.id, 0, columns);
              handleClose.current();
            }
          }}
        >
          <Check size={16} />
          <span className="tdp-done-btn__label">Done</span>
          {totalCount > 0 && !isReady && (
            <span className="tdp-done-btn__hint">{doneCount}/{totalCount}</span>
          )}
        </button>
      </div>
    </>
  );

  /* ── Document view (slide-in) ── */
  const documentView = (
    <>
      <div className="tdp-body">
        <div className="tdp-doc-title-row">
          <h2 className="tdp-doc-task-title">{task.title}</h2>
          {task.description && (
            <p className="tdp-description-text">{task.description}</p>
          )}
        </div>

        {/* Status */}
        <div className="tdp-doc-field">
          <span className="tdp-doc-field__icon"><Columns3 size={16} /></span>
          <span className="tdp-doc-field__label">Status</span>
          <select
            className="tdp-doc-select"
            value={task.columnId}
            onChange={(e) => moveTask(projectId, taskId, e.target.value, task.order, columns)}
          >
            {columns.map((col) => (
              <option key={col.id} value={col.id}>{col.name}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div className="tdp-doc-field">
          <span className="tdp-doc-field__icon"><Flag size={16} /></span>
          <span className="tdp-doc-field__label">Priority</span>
          <select
            className="tdp-doc-select"
            value={task.priority || 'medium'}
            onChange={(e) => updateTask(projectId, taskId, { priority: e.target.value })}
          >
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>{p.label}</option>
            ))}
          </select>
        </div>

        {/* Assignee */}
        <div className="tdp-doc-field">
          <span className="tdp-doc-field__icon"><User size={16} /></span>
          <span className="tdp-doc-field__label">Assignee</span>
          <select
            className="tdp-doc-select"
            value={task.assigneeId || ''}
            onChange={(e) => updateTask(projectId, taskId, { assigneeId: e.target.value || null })}
          >
            <option value="">Unassigned</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="tdp-doc-field">
          <span className="tdp-doc-field__icon"><Calendar size={16} /></span>
          <span className="tdp-doc-field__label">Due Date</span>
          <input
            type="date"
            className="tdp-doc-date"
            value={dueDateInput}
            onChange={(e) => updateTask(projectId, taskId, { dueDate: e.target.value || null })}
          />
        </div>

        {/* Tags */}
        <div className="tdp-doc-field tdp-doc-field--tags">
          <span className="tdp-doc-field__icon"><Tag size={16} /></span>
          <span className="tdp-doc-field__label">Tags</span>
          <div className="tdp-doc-tags">
            {(task.tags || []).map((tag, i) => (
              <span key={i} className="tdp-doc-tag">
                {tag}
                <button
                  className="tdp-doc-tag__remove"
                  onClick={() => updateTask(projectId, taskId, { tags: task.tags.filter((_, j) => j !== i) })}
                  aria-label={`Remove tag ${tag}`}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            <input
              className="tdp-doc-tag-input"
              placeholder="Add tag..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  updateTask(projectId, taskId, { tags: [...(task.tags || []), e.target.value.trim()] });
                  e.target.value = '';
                }
              }}
            />
          </div>
        </div>

        {/* Created / Updated meta */}
        <div className="tdp-doc-meta">
          {task.createdAt && (
            <span className="tdp-doc-meta__item">
              Created {new Date(task.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
          {task.updatedAt && (
            <span className="tdp-doc-meta__item">
              Updated {new Date(task.updatedAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="tdp-footer">
        <button className="tdp-doc-btn" onClick={closeDoc}>
          <ArrowLeft size={16} />
          Back to Summary
        </button>
      </div>
    </>
  );

  /* ── Sources view (slide-in from subtask) ── */
  const sourcesView = activeSubtask ? (
    <>
      <div className="tdp-body">
        <div className="tdp-subtask-detail">
          <div className="tdp-subtask-detail__header">
            <h2 className="tdp-subtask-detail__title">Source</h2>
          </div>
          <ChunkErrorBoundary label="Could not load Sources.">
            <Suspense fallback={<SourcesSkeleton />}>
              <SubtaskSources subtask={activeSubtask} />
            </Suspense>
          </ChunkErrorBoundary>
        </div>
      </div>
      <div className="tdp-footer tdp-footer--subtask">
        <button className="tdp-later-btn" onClick={closeSources}>
          Back
        </button>
      </div>
    </>
  ) : null;

  /* ── Subtask detail view (slide-in) ── */
  const subtaskDetailView = activeSubtask ? (
    <>
      <div className="tdp-body" ref={subtaskBodyRef}>
        <div className="tdp-subtask-detail">
          <div className="tdp-subtask-detail__header">
            <button
              className={`tdp-subtask-circle ${activeSubtask.done ? 'tdp-subtask-circle--done' : ''}`}
              onClick={() => toggleSubtask(projectId, taskId, activeSubtask.id)}
            >
              {activeSubtask.done && (
                <span className="tdp-subtask-circle__check"><Check size={14} /></span>
              )}
            </button>
            <h2 className={`tdp-subtask-detail__title ${activeSubtask.done ? 'tdp-subtask-text--done' : ''}`}>
              {activeSubtask.title}
            </h2>
            {activeSubtask.tier && <AmanahTierBadge tier={activeSubtask.tier} size="md" />}
            {(() => {
              const grounded = isSubtaskGrounded(activeSubtask);
              if (grounded === null) return null;
              return (
                <span
                  title={grounded
                    ? 'At least one source meets the grounding bar (Bayyinah/Qarina × direct/contextual).'
                    : 'No source meets the grounding bar yet.'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
                    fontSize: '0.7rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
                    color: grounded ? '#15803d' : '#b45309',
                    background: grounded ? '#22c55e18' : '#f59e0b18',
                    border: `1px solid ${grounded ? '#22c55e' : '#f59e0b'}30`,
                    borderRadius: '999px', letterSpacing: '0.03em', lineHeight: 1.4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {grounded ? 'Grounded' : 'Ungrounded'}
                </span>
              );
            })()}
          </div>

          <div className="tdp-subtask-detail__body">
            {(activeSubtask.why || activeSubtask.how) ? (
              <div className="tdp-subtask-detail__content">
                {activeSubtask.why && (
                  <section className="tdp-subtask-section">
                    <h3 className="tdp-subtask-section__label">Why?</h3>
                    <p className="tdp-subtask-section__text">{activeSubtask.why}</p>
                  </section>
                )}
                {activeSubtask.how && (
                  <section className="tdp-subtask-section">
                    <h3 className="tdp-subtask-section__label">How?</h3>
                    <p className="tdp-subtask-section__text">{activeSubtask.how}</p>
                  </section>
                )}
              </div>
            ) : activeSubtask.description ? (
              <div className="tdp-subtask-detail__content">
                <Suspense fallback={<p className="tdp-subtask-detail__text">{activeSubtask.description}</p>}>
                  <LazyMarkdown>{activeSubtask.description}</LazyMarkdown>
                </Suspense>
              </div>
            ) : (
              <p className="tdp-subtask-detail__text tdp-subtask-detail__empty-text">
                No additional guidance available for this subtask yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="tdp-footer tdp-footer--subtask">
        <button className="tdp-later-btn" onClick={closeSubtask}>
          Back
        </button>
        <button className="tdp-sources-btn" onClick={openSources}>
          Source
        </button>
        <button
          className="tdp-done-btn"
          disabled={!hasScrolledToBottom}
          onClick={() => {
            // Mark this subtask as done
            if (!activeSubtask.done) toggleSubtask(projectId, taskId, activeSubtask.id);
            closeSubtask();
          }}
        >
          <Check size={16} />
          Done
        </button>
      </div>
    </>
  ) : null;

  const slideClass = slideDir ? ` tdp-slide-${slideDir}` : '';

  // Determine which view is active
  const activeView = (activeSubtask && sourcesOpen) ? 'sources' : activeSubtask ? 'subtask' : docOpen ? 'doc' : 'summary';
  const viewKey = (activeSubtask && sourcesOpen) ? `sources-${activeSubtask.id}` : activeSubtask ? `subtask-${activeSubtask.id}` : docOpen ? 'doc' : 'summary';

  const panel = (
    <div
      ref={trapRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-detail-title"
      className={`task-detail-panel${closing ? ' tdp-scale-out' : ' tdp-scale-in'}`}
      style={accentColor ? { '--tdp-accent': accentColor } : undefined}
      onClick={(e) => e.stopPropagation()}
    >
      {/* ── Header ── */}
      <div className="tdp-header">
        <div className="tdp-header__left">
          {(docOpen || activeSubtask) && (
            <button
              className="tdp-back-btn"
              onClick={sourcesOpen ? closeSources : activeSubtask ? closeSubtask : closeDoc}
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <span className="tdp-header__icon"><HeaderIcon size={20} /></span>
          <span className="tdp-project-name">{headerLabel}{docOpen ? ' — Document' : sourcesOpen ? ' — Sources' : activeSubtask ? ' — Subtask' : ''}</span>
        </div>
        <button className="tdp-close-btn" onClick={() => handleClose.current()} aria-label="Close task details"><X size={18} /></button>
      </div>

      {/* ── Sliding content ── */}
      <div key={viewKey} className={`tdp-slide-container${slideClass}`}>
        {activeView === 'sources' ? sourcesView : activeView === 'subtask' ? subtaskDetailView : activeView === 'doc' ? documentView : summaryView}
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
