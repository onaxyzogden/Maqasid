import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { safeSet } from '@services/storage';
import './LevelNavigator.css';

const LEVELS = [
  {
    key:      'core',
    label:    'LEVEL 1',
    subtitle: '(DARURIYYAT)',
    title:    'Core Pillars',
    desc:     'Foundational obligations — the essential duties that must be established before all else.',
    color:    '#C8A96E',
    routeSuffix: 'core',
  },
  {
    key:      'growth',
    label:    'LEVEL 2',
    subtitle: '(HAJIYYAT)',
    title:    'Growth Space',
    desc:     'Development needs — structured progression that deepens practice and knowledge.',
    color:    '#4ab8a8',
    routeSuffix: 'growth',
  },
  {
    key:      'excellence',
    label:    'LEVEL 3',
    subtitle: '(TAHSINIYYAT)',
    title:    'Embellishments',
    desc:     'Refinement pursuits — aspirational mastery that elevates and perfects.',
    color:    '#8b5cf6',
    routeSuffix: 'excellence',
  },
];

const PRIORITY_ORDER = { urgent: 0, high: 1, medium: 2, low: 3 };
const NOOP = () => {};

function taskColor(task) {
  if (task.completedAt || task.columnId?.endsWith('_done')) return '#22c55e';
  if (!task.columnId?.endsWith('_to_do') && !task.columnId?.endsWith('_todo')) return '#F59E0B';
  return 'var(--bg3)';
}

/**
 * Generic level navigator carousel.
 *
 * Props:
 *   pillars        — array of { id, label, route }
 *   storageKey     — localStorage key for persisting active tab (e.g. 'life_active_tab')
 *   ensureProjects — fn from useProjectStore (e.g. s.ensureLifeProjects)
 *   levelRoutes    — object mapping level key → full route (e.g. { core: '/app/life-core', ... })
 *   controlledLevel — optional, when parent controls active level
 *   onLevelChange  — optional, callback(levelKey) when level changes
 *   currentPillarId — optional, pillar id to highlight as active (for pillar pages)
 *   compact        — optional bool, reduces vertical space and enables ResizeObserver stacking
 */
export default function LevelNavigator({
  pillars = [],
  storageKey,
  ensureProjects,
  levelRoutes = {},
  controlledLevel,
  onLevelChange,
  currentPillarId,
  compact,
  levelDescriptions,
  levels: customLevels,
  pillarTasks: externalPillarTasks,
  pillarProgress,
  onSegmentClick,
  onSubsegClick,
  taskColorFn,
  gateIndicators,
} = {}) {
  const navigate = useNavigate();
  const [internalIdx, setInternalIdx] = useState(0);

  const baseLevels = customLevels || LEVELS;

  const activeIdx = controlledLevel
    ? Math.max(0, baseLevels.findIndex((l) => l.key === controlledLevel))
    : internalIdx;

  const handlePrev = () => {
    setSlideDir('right');
    setTimeout(() => setSlideDir(null), 300);
    if (onLevelChange) onLevelChange(baseLevels[activeIdx - 1]?.key);
    else setInternalIdx(activeIdx - 1);
  };
  const handleNext = () => {
    setSlideDir('left');
    setTimeout(() => setSlideDir(null), 300);
    if (onLevelChange) onLevelChange(baseLevels[activeIdx + 1]?.key);
    else setInternalIdx(activeIdx + 1);
  };

  const ensureProjectsFn = useProjectStore((s) => ensureProjects ? ensureProjects(s) : NOOP);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const moduleIds = pillars.map((p) => p.id);

  useEffect(() => { if (ensureProjects) ensureProjectsFn(); }, []);

  useEffect(() => {
    if (externalPillarTasks) return;
    const moduleProjects = projects.filter((p) => p.moduleId && moduleIds.includes(p.moduleId));
    for (const proj of moduleProjects) loadTasks(proj.id);
  }, [projects, loadTasks, externalPillarTasks]);

  const [slideDir, setSlideDir] = useState(null); // 'left' | 'right' | null

  const flnRef = useRef(null);
  const segmentsRef = useRef(null);
  const [stacked, setStacked] = useState(false);

  const checkOverflow = useCallback(() => {
    const flnEl = flnRef.current;
    const segEl = segmentsRef.current;
    if (!flnEl || !segEl || !compact) return;

    const containerW = flnEl.offsetWidth;
    const flnGap = parseFloat(getComputedStyle(flnEl).gap) || 16;
    const available = containerW - flnGap * 2;
    const centerW = available * (2.8 / 4.8);

    const centerEl = flnEl.querySelector('.fln__center');
    if (!centerEl) return;
    const cs = getComputedStyle(centerEl);
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const segGap = parseFloat(getComputedStyle(segEl).gap) || 8;
    const barW = (centerW - padX - segGap * (pillars.length - 1)) / pillars.length;

    const navs = segEl.querySelectorAll('.fln__segment-nav');
    for (const nav of navs) {
      if (nav.scrollWidth >= barW * 0.9) {
        setStacked(true);
        return;
      }
    }
    setStacked(false);
  }, [compact, pillars.length]);

  useEffect(() => {
    const el = flnRef.current;
    if (!el || !compact) return;
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    checkOverflow();
    return () => ro.disconnect();
  }, [compact, checkOverflow]);

  const levels = levelDescriptions
    ? baseLevels.map((l) => ({ ...l, ...levelDescriptions[l.key] }))
    : baseLevels;

  const active = levels[activeIdx];
  const prev   = levels[activeIdx - 1] ?? null;
  const next   = levels[activeIdx + 1] ?? null;

  const activeRoute = levelRoutes[active.key] ?? null;
  const prevRoute   = prev ? (levelRoutes[prev.key] ?? null) : null;
  const nextRoute   = next ? (levelRoutes[next.key] ?? null) : null;

  // Build per-pillar task lists for the active level
  const internalPillarTasks = {};
  if (!externalPillarTasks) {
    for (const { id } of pillars) {
      const proj = projects.find((p) => p.moduleId === id && p.id.endsWith('_' + active.key));
      const raw = proj ? (tasksByProject[proj.id] || []) : [];
      // Match PillarLevelDashboard order: group by first tag (largest group first),
      // then sort by priority within each group.
      const grouped = new Map();
      for (const t of raw) {
        const tag = t.tags?.[0] ?? 'General';
        if (!grouped.has(tag)) grouped.set(tag, []);
        grouped.get(tag).push(t);
      }
      internalPillarTasks[id] = [...grouped.entries()]
        .sort((a, b) => b[1].length - a[1].length)
        .flatMap(([, items]) =>
          [...items].sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 4) - (PRIORITY_ORDER[b.priority] ?? 4))
        );
    }
  }
  const finalPillarTasks = externalPillarTasks || internalPillarTasks;
  const resolveTaskColor = taskColorFn || taskColor;

  return (
    <div ref={flnRef} className={`fln${compact ? ' fln--compact' : ''}${stacked ? ' fln--stacked' : ''}`}>

      {/* ── Left: previous level ── */}
      <div
        className={`fln__side fln__side--left${prev ? ' fln__side--active' : ''}`}
        onClick={() => prev && handlePrev()}
        role={prev ? 'button' : undefined}
        tabIndex={prev ? 0 : undefined}
        aria-label={prev ? `Navigate to previous level: ${prev.title}` : undefined}
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
      <div className="fln__center" aria-live="polite">
        <div key={activeIdx} className={`fln__level-content${slideDir ? ` fln__level-content--${slideDir}` : ''}`}>
        <div className="fln__center-head">
          <span className="fln__center-label" style={{ color: active.color }}>{active.label}</span>
          <span className="fln__center-subtitle">{active.subtitle}</span>
        </div>
        <h2 className="fln__center-title">{active.title}</h2>
        <p className="fln__center-desc">{active.desc}</p>

        {/* Segmented progress bar — subdivided per task */}
        <div className="fln__segments" ref={segmentsRef}>
          {pillars.map(({ id, label, route }) => {
            const tasks = finalPillarTasks[id] || [];
            const isCurrent = currentPillarId === id;
            const handleSegClick = () => {
              if (onSegmentClick) { onSegmentClick(id, active.key); }
              else { if (storageKey) safeSet(storageKey, active.key); navigate(route); }
            };
            const gate = gateIndicators?.find((g) => g.afterSegmentId === id);
            return (
              <Fragment key={id}>
                <div
                  className={`fln__segment-col${isCurrent ? ' fln__segment-col--current' : ''}`}
                  style={isCurrent ? { '--seg-color': active.color } : undefined}
                  onClick={handleSegClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSegClick()}
                >
                  <div className="fln__segment-bar">
                    {tasks.length > 0 ? tasks.map((task) => (
                      <button
                        key={task.id}
                        className="fln__subseg"
                        style={{ background: resolveTaskColor(task) }}
                        title={task.title}
                        aria-label={`Task: ${task.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSubsegClick) { onSubsegClick(task.id, id); }
                          else { if (storageKey) safeSet(storageKey, active.key); navigate(`${route}?task=${task.id}`); }
                        }}
                      />
                    )) : (
                      <div className="fln__subseg fln__subseg--empty" />
                    )}
                  </div>
                  <button
                    className="fln__segment-nav"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSegClick();
                    }}
                  >
                    {label}
                  </button>

                </div>
                {gate && (
                  <button
                    type="button"
                    className={`fln__gate-indicator fln__gate-indicator--${gate.status}`}
                    title={`${gate.label} (${gate.status})`}
                    aria-label={`Gate: ${gate.label} — ${gate.status}`}
                    onClick={() => {
                      if (onSegmentClick) onSegmentClick(gate.afterSegmentId, active.key);
                      setTimeout(() => {
                        const target = document.querySelector('.bfd__assembly-gate') || document.querySelector('.bfd__ssc');
                        target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 150);
                    }}
                  >
                    <span className="fln__gate-diamond">&#x25C6;</span>
                  </button>
                )}
              </Fragment>
            );
          })}
        </div>
        </div>{/* end fln__level-content */}
      </div>

      {/* ── Right: next level ── */}
      <div
        className={`fln__side fln__side--right${next ? ' fln__side--active' : ''}`}
        onClick={() => next && handleNext()}
        role={next ? 'button' : undefined}
        tabIndex={next ? 0 : undefined}
        aria-label={next ? `Navigate to next level: ${next.title}` : undefined}
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
