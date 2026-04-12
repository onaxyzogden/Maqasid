import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { safeSet } from '@services/storage';
import './FaithLevelNavigator.css';

const PILLARS = [
  { id: 'shahada', label: 'Shahada', route: '/app/faith-shahada' },
  { id: 'salat',   label: 'Salah',   route: '/app/faith-salah'   },
  { id: 'zakat',   label: 'Zakah',   route: '/app/faith-zakah'   },
  { id: 'siyam',   label: 'Siyam',   route: '/app/faith-sawm'    },
  { id: 'hajj',    label: 'Hajj',    route: '/app/faith-hajj'    },
];
const MODULE_IDS = PILLARS.map((p) => p.id);

const LEVELS = [
  {
    key:      'core',
    label:    'LEVEL 1',
    subtitle: '(DARURIYYAT)',
    title:    'Core Pillars',
    desc:     'Foundational obligations — the essential duties that must be established before all else.',
    color:    '#C8A96E',
    route:    '/app/faith-core',
  },
  {
    key:      'growth',
    label:    'LEVEL 2',
    subtitle: '(HAJIYYAT)',
    title:    'Growth Space',
    desc:     'Development needs — structured progression that deepens practice and knowledge.',
    color:    '#4ab8a8',
    route:    '/app/faith-growth',
  },
  {
    key:      'excellence',
    label:    'LEVEL 3',
    subtitle: '(TAHSINIYYAT)',
    title:    'Embellishments',
    desc:     'Refinement pursuits — aspirational mastery that elevates and perfects.',
    color:    '#8b5cf6',
    route:    '/app/faith-excellence',
  },
];

const PRIORITY_ORDER = { urgent: 0, high: 1, medium: 2, low: 3 };

function taskColor(task) {
  if (task.completedAt || task.columnId?.endsWith('_done')) return '#22c55e';
  if (!task.columnId?.endsWith('_to_do') && !task.columnId?.endsWith('_todo')) return '#F59E0B';
  return 'var(--bg3)';
}

export default function FaithLevelNavigator({
  controlledLevel,
  onLevelChange,
  currentPillarId,
  compact,
} = {}) {
  const navigate = useNavigate();
  const [internalIdx, setInternalIdx] = useState(0);

  const activeIdx = controlledLevel
    ? Math.max(0, LEVELS.findIndex((l) => l.key === controlledLevel))
    : internalIdx;

  const handlePrev = () => {
    if (onLevelChange) onLevelChange(LEVELS[activeIdx - 1].key);
    else setInternalIdx(activeIdx - 1);
  };
  const handleNext = () => {
    if (onLevelChange) onLevelChange(LEVELS[activeIdx + 1].key);
    else setInternalIdx(activeIdx + 1);
  };

  const ensureFaithProjects = useProjectStore((s) => s.ensureFaithProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  useEffect(() => { ensureFaithProjects(); }, []);

  useEffect(() => {
    const faithProjects = projects.filter((p) => p.moduleId && MODULE_IDS.includes(p.moduleId));
    for (const proj of faithProjects) loadTasks(proj.id);
  }, [projects, loadTasks]);

  const flnRef = useRef(null);
  const segmentsRef = useRef(null);
  const [stacked, setStacked] = useState(false);

  const checkOverflow = useCallback(() => {
    const flnEl = flnRef.current;
    const segEl = segmentsRef.current;
    if (!flnEl || !segEl || !compact) return;

    // Estimate bar width in side-by-side mode to avoid oscillation.
    // flex ratios: side(1) + center(2.8) + side(1) = 4.8
    const containerW = flnEl.offsetWidth;
    const flnGap = parseFloat(getComputedStyle(flnEl).gap) || 16;
    const available = containerW - flnGap * 2;
    const centerW = available * (2.8 / 4.8);

    const centerEl = flnEl.querySelector('.fln__center');
    if (!centerEl) return;
    const cs = getComputedStyle(centerEl);
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const segGap = parseFloat(getComputedStyle(segEl).gap) || 8;
    const barW = (centerW - padX - segGap * 4) / 5;

    const navs = segEl.querySelectorAll('.fln__segment-nav');
    for (const nav of navs) {
      if (nav.scrollWidth >= barW * 0.9) {
        setStacked(true);
        return;
      }
    }
    setStacked(false);
  }, [compact]);

  useEffect(() => {
    const el = flnRef.current;
    if (!el || !compact) return;
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    checkOverflow();
    return () => ro.disconnect();
  }, [compact, checkOverflow]);

  const active = LEVELS[activeIdx];
  const prev   = LEVELS[activeIdx - 1] ?? null;
  const next   = LEVELS[activeIdx + 1] ?? null;

  // Build per-pillar task lists for the active level, sorted by priority
  // to match the dashboard card order (urgent → high → medium → low)
  const pillarTasks = {};
  for (const moduleId of MODULE_IDS) {
    const proj = projects.find((p) => p.moduleId === moduleId && p.id.endsWith('_' + active.key));
    const raw = proj ? (tasksByProject[proj.id] || []) : [];
    pillarTasks[moduleId] = [...raw].sort(
      (a, b) => (PRIORITY_ORDER[a.priority] ?? 4) - (PRIORITY_ORDER[b.priority] ?? 4)
    );
  }

  return (
    <div ref={flnRef} className={`fln${compact ? ' fln--compact' : ''}${stacked ? ' fln--stacked' : ''}`}>

      {/* ── Left: previous level ── */}
      <div
        className={`fln__side fln__side--left${prev ? ' fln__side--active' : ''}`}
        onClick={() => prev && handlePrev()}
        role={prev ? 'button' : undefined}
        tabIndex={prev ? 0 : undefined}
        onKeyDown={prev ? (e) => e.key === 'Enter' && handlePrev() : undefined}
      >
        {prev ? (
          <>
            <div className="fln__side-text">
              <span className="fln__side-label" style={{ color: prev.color }}>{prev.label}</span>
              <span className="fln__side-subtitle">{prev.subtitle}</span>
              <span className="fln__side-title">{prev.title}</span>
            </div>
            <ChevronLeft className="fln__chevron" style={{ color: prev.color }} size={36} strokeWidth={1.5} />
          </>
        ) : (
          <div className="fln__side-empty" />
        )}
      </div>

      {/* ── Center: active level ── */}
      <div className="fln__center">
        <div className="fln__center-head">
          <span className="fln__center-label" style={{ color: active.color }}>{active.label}</span>
          <span className="fln__center-subtitle">{active.subtitle}</span>
        </div>
        <h2 className="fln__center-title">{active.title}</h2>
        <p className="fln__center-desc">{active.desc}</p>

        {/* Segmented progress bar — subdivided per task */}
        <div className="fln__segments" ref={segmentsRef}>
          {PILLARS.map(({ id, label, route }) => {
            const tasks = pillarTasks[id] || [];
            const isCurrent = currentPillarId === id;
            return (
              <div
                key={id}
                className={`fln__segment-col${isCurrent ? ' fln__segment-col--current' : ''}`}
                style={isCurrent ? { '--seg-color': active.color } : undefined}
              >
                <div className="fln__segment-bar">
                  {tasks.length > 0 ? tasks.map((task) => (
                    <button
                      key={task.id}
                      className="fln__subseg"
                      style={{ background: taskColor(task) }}
                      title={task.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        safeSet('faith_active_tab', active.key);
                        navigate(`${route}?task=${task.id}`);
                      }}
                    />
                  )) : (
                    <div className="fln__subseg fln__subseg--empty" />
                  )}
                </div>
                <button
                  className="fln__segment-nav"
                  onClick={(e) => { e.stopPropagation(); safeSet('faith_active_tab', active.key); navigate(route); }}
                >
                  {label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Right: next level ── */}
      <div
        className={`fln__side fln__side--right${next ? ' fln__side--active' : ''}`}
        onClick={() => next && handleNext()}
        role={next ? 'button' : undefined}
        tabIndex={next ? 0 : undefined}
        onKeyDown={next ? (e) => e.key === 'Enter' && handleNext() : undefined}
      >
        {next ? (
          <>
            <ChevronRight className="fln__chevron" style={{ color: next.color }} size={36} strokeWidth={1.5} />
            <div className="fln__side-text fln__side-text--right">
              <span className="fln__side-label" style={{ color: next.color }}>{next.label}</span>
              <span className="fln__side-subtitle">{next.subtitle}</span>
              <span className="fln__side-title">{next.title}</span>
            </div>
          </>
        ) : (
          <div className="fln__side-empty" />
        )}
      </div>

    </div>
  );
}
