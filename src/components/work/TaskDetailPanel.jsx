import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import {
  X, Check, FileText, LayoutGrid, ArrowLeft,
  Shield, TrendingUp, Star, CheckCircle2, HeartHandshake,
  HandHeart, Moon, Landmark, Activity, BrainCircuit,
  Sparkles, Library, Lightbulb, Wrench, Heart,
  Baby, Handshake, Home, Building2, Wallet,
  PiggyBank, Scale, Gift, Droplets, Recycle,
  TreeDeciduous, ShoppingBag, Globe, Users,
  Calendar, Tag, User, Flag, Columns3, ChevronRight,
} from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useProjectStore } from '../../store/project-store';
import { usePeopleStore, getInitials } from '../../store/people-store';
import { PRIORITIES } from '../../data/modules';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import BbosTaskPanel from '../bbos/BbosTaskPanel';
import QuranEmbed from '../islamic/QuranEmbed';
import HadithCard from '../islamic/HadithCard';

const HADITH_COLLECTION_SLUGS = {
  'sahih bukhari': 'bukhari',
  'sahih al-bukhari': 'bukhari',
  'sahih muslim': 'muslim',
  'sunan abi dawud': 'abudawud',
  'sunan abu dawud': 'abudawud',
  'sunan ibn majah': 'ibnmajah',
  'sunan an-nasai': 'nasai',
  "sunan an-nasa'i": 'nasai',
  "sunan al-nasa'i": 'nasai',
  'sunan al-nasai': 'nasai',
  'jami at-tirmidhi': 'tirmidhi',
  'sunan al-tirmidhi': 'tirmidhi',
  'muwatta malik': 'malik',
};

function matchHadithHeading(text) {
  const m = text.match(/^([A-Za-z][A-Za-z' -]+?)\s+(\d+)$/);
  if (!m) return null;
  const slug = HADITH_COLLECTION_SLUGS[m[1].trim().toLowerCase()];
  return slug ? `${slug}:${m[2]}` : null;
}
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
  const employees = usePeopleStore((s) => s.employees);

  const trapRef = useFocusTrap(!!taskId, onClose);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [transformOrigin, setTransformOrigin] = useState(null);
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
            id="task-detail-title"
            className="tdp-title"
            value={title}
            readOnly
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
          <h3 className="tdp-section-label">Subtasks <span className="tdp-section-hint">(tap each one to see why and how)</span></h3>
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
          Complete later
        </button>
        <button
          className="tdp-done-btn"
          disabled={doneCount < totalCount}
          onClick={() => {
            const doneCol = columns.find((c) => c.name === 'Done');
            if (doneCol) {
              moveTask(projectId, taskId, doneCol.id, 0, columns);
              handleClose.current();
            }
          }}
        >
          <Check size={16} />
          Done
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
          <div className="tdp-subtask-detail__body">
            {activeSubtask.sources ? (
              <>
                <div className={`tdp-sources-trust tdp-sources-trust--${activeSubtask.sourcesTrust === 'scholar-reviewed' ? 'reviewed' : 'suggestive'}`}>
                  {activeSubtask.sourcesTrust === 'scholar-reviewed' ? (
                    <>
                      <strong>Scholar-reviewed.</strong> These citations have been attested by a qualified reviewer.
                    </>
                  ) : (
                    <>
                      <strong>Suggestive reference — pending scholar review.</strong>{' '}
                      Citations are curated via semantic matching against the Quran and Sahih Bukhari/Muslim. They are provided as starting points for reflection and study, not as a fatwa. Verify with a qualified scholar before acting on contested matters.
                    </>
                  )}
                </div>
                <div className="tdp-subtask-detail__content">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                      p: ({ children }) => {
                        const flat = [children].flat();
                        const firstStr = flat.find(c => typeof c === 'string' && c.trim());
                        const isArabic = firstStr && /[\u0600-\u06FF]/.test(firstStr.trim()[0]);
                        return <p dir={isArabic ? 'rtl' : undefined} style={isArabic ? { fontFamily: 'var(--font-arabic)', fontSize: '1.5em', lineHeight: '2.2', textAlign: 'center', margin: '12px 0' } : undefined}>{children}</p>;
                      },
                      h3: ({ children }) => {
                        const text = [children].flat().map(c => typeof c === 'string' ? c : '').join('');
                        const quran = text.match(/^Quran \((\d+):(\d+)\)$/);
                        if (quran) {
                          return <QuranEmbed verseKey={`${quran[1]}:${quran[2]}`} />;
                        }
                        const hadith = matchHadithHeading(text);
                        if (hadith) {
                          return <HadithCard hadithKey={hadith} />;
                        }
                        return <h3>{children}</h3>;
                      },
                    }}
                  >{((activeSubtask.sources || '') + '\n\n### __END__ 0')
                    .replace(/\*\*Arabic:\*\* [^\n]*\n\*\*Translation:\*\* [^\n]*/g, '')
                    .replace(/(^### (?:Sahih (?:al-)?Bukhari|Sahih Muslim|Sunan (?:Abi|Abu) Dawud|Sunan Ibn Majah|Sunan a[ln]-Nasa'?i|Jami at-Tirmidhi|Sunan al-Tirmidhi|Muwatta Malik) \d+\s*$)([\s\S]*?)(?=^### )/gm, '$1\n\n')
                    .replace(/\n*### __END__ 0\s*$/, '')
                  }</Markdown>
                </div>
              </>
            ) : (
              <p className="tdp-subtask-detail__text tdp-subtask-detail__empty-text">
                No sources available for this subtask yet.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="tdp-footer tdp-footer--subtask">
        <button className="tdp-later-btn" onClick={closeSources}>
          Back to subtask
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
          </div>

          <div className="tdp-subtask-detail__body">
            {activeSubtask.description ? (
              <div className="tdp-subtask-detail__content">
                <Markdown remarkPlugins={[remarkGfm]}>{activeSubtask.description}</Markdown>
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
          Complete later
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
      style={{
        ...(transformOrigin ? { transformOrigin } : {}),
        ...(accentColor ? { '--tdp-accent': accentColor } : {}),
      }}
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
