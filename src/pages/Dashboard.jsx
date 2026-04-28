import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Kanban, AlertTriangle,
  Activity, ChevronRight, Clock, Moon,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useAuthStore } from '../store/auth-store';
import { useTaskStore } from '../store/task-store';
import { useSettingsStore } from '../store/settings-store';
import { useThresholdStore } from '../store/threshold-store';
import { useOfficeStore } from '../store/office-store';
import { MAQASID_PILLARS } from '../data/maqasid';
import MaqasidLevelOverview from '../components/dashboard/MaqasidLevelOverview';
import DailyMithaq from '../components/dashboard/DailyMithaq';
import FocusTaskList from '../components/dashboard/FocusTaskList';
import ContextWidgetSlot from '../components/dashboard/ContextWidgetSlot';
import MaqasidBalanceRadar from '../components/dashboard/MaqasidBalanceRadar';
import { useToastStore } from '../store/toast-store';
import TodayFocusSection from './TodayFocusSection';
import { BCG_RANGES } from '../hooks/useDashboard';
import { BBOS_STAGES, BBOS_LAYERS } from '../data/bbos/bbos-pipeline';
import { getBbosTaskDefsByStage } from '../data/bbos/bbos-task-definitions';
import ChartTooltip from '../components/shared/ChartTooltip';
import OnboardingChecklist from '../components/onboarding/OnboardingChecklist';
import SpotlightTour from '../components/onboarding/SpotlightTour';
import { useOnboardingStore } from '../store/onboarding-store';
import './Dashboard.css';
import '../components/bbos/BbosFullDashboard.css';

const TOUR_STEPS = [
  { target: 'sidebar-nav', title: 'Your seven domains', description: 'Each pillar of the Maqasid — Faith, Life, Intellect, and more — lives here. Click any to explore.' },
  { target: 'dashboard-main', title: 'Your command center', description: 'Tasks, priorities, and your Barakah score — everything you need at a glance.' },
  { target: 'onboarding-checklist', title: 'Your getting started guide', description: 'Complete these five steps to unlock the full power of MILOS.' },
];

function BCGChart({ data }) {
  const svgRef = useRef(null);
  const [range, setRange] = useState('14d');
  const [tip, setTip] = useState(null);
  const rangeDays = BCG_RANGES.find((r) => r.id === range)?.days ?? 14;
  const filtered = (data || []).slice(-rangeDays);
  const hasData = filtered.some((d) => d.count > 0);

  const PAD = { left: 45, right: 15, top: 20, bottom: 30 };
  const W = 520;
  const H = 180;
  const PLOT_W = W - PAD.left - PAD.right;
  const PLOT_H = H - PAD.top - PAD.bottom;

  const maxVal = Math.max(...filtered.map((d) => d.count), 1);
  const points = filtered.map((d, i) => {
    const x = PAD.left + (i / Math.max(filtered.length - 1, 1)) * PLOT_W;
    const y = PAD.top + PLOT_H - (d.count / maxVal) * PLOT_H;
    return { x, y, ...d };
  });

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = points.length > 0
    ? `${points[0].x},${PAD.top + PLOT_H} ${linePoints} ${points[points.length - 1].x},${PAD.top + PLOT_H}`
    : '';

  const gridLines = [0.25, 0.5, 0.75].map((pct) => PAD.top + PLOT_H * (1 - pct));
  const yLabels = [0.25, 0.5, 0.75, 1].map((pct) => ({
    y: PAD.top + PLOT_H * (1 - pct),
    label: Math.round(maxVal * pct),
  }));

  return (
    <div className="bcg-chart">
      <div className="bcg-chart__header">
        <div>
          <span className="bcg-chart__title">Barakah Consistency</span>
        </div>
        <div className="bcg-chart__ranges">
          {BCG_RANGES.map((r) => (
            <button
              key={r.id}
              className={`bcg-range-btn ${range === r.id ? 'active' : ''}`}
              onClick={() => setRange(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      {!hasData ? (
        <div className="bcg-chart__empty">
          {/* Ghost preview — information scent for the shape of the chart */}
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="bcg-chart__svg bcg-chart__svg--ghost"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {yLabels.map((yl, i) => (
              <text key={i} x={PAD.left - 8} y={yl.y + 3} textAnchor="end"
                fill="var(--text3)" fontSize="9" fontFamily="var(--font-mono)" opacity="0.4">
                {i === yLabels.length - 1 ? '—' : ''}
              </text>
            ))}
            {gridLines.map((y, i) => (
              <line key={i} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
                stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
            ))}
            <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={W - PAD.right} y2={PAD.top + PLOT_H}
              stroke="var(--border)" strokeWidth="0.5" />
            {/* Gentle ghost sine to telegraph "this is a trendline" */}
            <path
              d={(() => {
                const pts = [];
                const N = 14;
                for (let i = 0; i < N; i++) {
                  const x = PAD.left + (i / (N - 1)) * PLOT_W;
                  const y = PAD.top + PLOT_H * (0.55 + 0.25 * Math.sin(i * 0.9));
                  pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
                }
                return pts.join(' ');
              })()}
              fill="none"
              stroke="var(--text3)"
              strokeWidth="1.25"
              strokeDasharray="4 4"
              opacity="0.45"
              strokeLinecap="round"
            />
          </svg>
          <div className="bcg-chart__empty-body">
            <Activity size={20} style={{ color: 'var(--text3)' }} />
            <p>Your rhythm appears here — one completed task seeds the curve.</p>
            <Link to="/app/work" className="insight-section-empty__cta">Go to tasks</Link>
          </div>
        </div>
      ) : (
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="bcg-chart__svg" preserveAspectRatio="xMidYMid meet"
          role="img" aria-label="Barakah consistency graph showing daily task completions">
          <title>Barakah Consistency Graph</title>
          <defs>
            <linearGradient id="bcgGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yLabels.map((yl, i) => (
            <text key={i} x={PAD.left - 8} y={yl.y + 3} textAnchor="end"
              fill="var(--text3)" fontSize="9" fontFamily="var(--font-mono)">
              {yl.label}
            </text>
          ))}

          {gridLines.map((y, i) => (
            <line key={i} x1={PAD.left} y1={y} x2={W - PAD.right} y2={y}
              stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />
          ))}

          <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={W - PAD.right} y2={PAD.top + PLOT_H}
            stroke="var(--border)" strokeWidth="0.5" />

          <polygon points={areaPoints} fill="url(#bcgGrad)" />
          <polyline points={linePoints} fill="none" stroke="var(--primary)"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y}
              r={tip?.point === p ? 5 : 3}
              fill="var(--primary)"
              stroke={tip?.point === p ? 'var(--primary-border)' : 'var(--surface)'}
              strokeWidth={tip?.point === p ? 2 : 1.5}
              style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
              onMouseEnter={(e) => {
                const ctm = e.currentTarget.getScreenCTM();
                if (!ctm) return;
                const vx = ctm.a * p.x + ctm.e;
                const vy = ctm.d * p.y + ctm.f;
                const svgRect = svgRef.current?.getBoundingClientRect();
                setTip({ x: vx, y: vy, svgTop: svgRect?.top ?? 0, svgHeight: svgRect?.height ?? 0, point: p });
              }}
              onMouseLeave={() => setTip(null)}
              onClick={(e) => {
                if (!('ontouchstart' in window)) return;
                const ctm = e.currentTarget.getScreenCTM();
                if (!ctm) return;
                const vx = ctm.a * p.x + ctm.e;
                const vy = ctm.d * p.y + ctm.f;
                const svgRect = svgRef.current?.getBoundingClientRect();
                setTip((prev) => prev?.point === p ? null : { x: vx, y: vy, svgTop: svgRect?.top ?? 0, svgHeight: svgRect?.height ?? 0, point: p });
              }}
            />
          ))}

          {points.filter((_, i) => i % Math.ceil(points.length / 7) === 0 || i === points.length - 1).map((p, i) => (
            <text key={`l${i}`} x={p.x} y={H - 6} textAnchor="middle"
              fill="var(--text3)" fontSize="9" fontFamily="var(--font-body)">
              {p.label}
            </text>
          ))}
        </svg>
      )}
      <ChartTooltip visible={!!tip} x={tip?.x ?? 0} y={tip?.y ?? 0} anchor="crosshair"
        crosshairTop={tip?.svgTop ?? 0} crosshairHeight={tip?.svgHeight ?? 0} onDismiss={() => setTip(null)}>
        <div className="chart-tooltip__value">
          {tip?.point?.count ?? 0} task{(tip?.point?.count ?? 0) !== 1 ? 's' : ''}
        </div>
        <div className="chart-tooltip__label">{tip?.point?.day ?? ''}</div>
      </ChartTooltip>
      <div className="bcg-chart__legend">
        <span className="bcg-legend-item">
          <span className="bcg-legend-dot" style={{ background: 'var(--primary)' }} /> Tasks completed per day
        </span>
      </div>
    </div>
  );
}

/* ── Sakinah (Tranquility) Meter ──
 * Inverts the old "Workflow Pressure" gauge. Fewer overdue/in-progress =
 * more sakinah (more filled dots, calm teal). More signals = fewer filled
 * dots + a gentle "Ritual of Retreat" invitation. Never screams red.
 */
function SakinahMeter({ overdueCount = 0, inProgressCount = 0, isIslamic = false }) {
  // Semantic flip from WorkflowPressure — these are *tranquility* levels.
  let level;
  if (overdueCount >= 5 || inProgressCount > 15) level = 'restless';
  else if (overdueCount >= 2 || inProgressCount > 8) level = 'stirring';
  else level = 'settled';

  const dots = 10;
  const filled = level === 'settled' ? 8 : level === 'stirring' ? 5 : 2;

  const labelMap = isIslamic
    ? { settled: 'Settled', stirring: 'Stirring', restless: 'Restless' }
    : { settled: 'High', stirring: 'Moderate', restless: 'Low' };

  const hintMap = {
    settled: isIslamic
      ? 'Your heart has room. This is a good time to deepen, not add.'
      : 'Plenty of headroom. Consider a stretch goal, not more load.',
    stirring: isIslamic
      ? 'The current is picking up — tend to what matters, defer the rest.'
      : 'Workload rising — protect the essential, defer the rest.',
    restless: isIslamic
      ? 'A quiet pause may serve you more than another push.'
      : 'A reset may serve you more than another push.',
  };

  return (
    <div className={`sakinah sakinah--${level}`} role="group" aria-label="Sakinah meter">
      <div className="sakinah__header">
        <div className="sakinah__title-group">
          <span className="sakinah__title">
            {isIslamic ? 'Sakinah' : 'Tranquility'}
          </span>
          {isIslamic && <span className="sakinah__title-ar">سكينة</span>}
        </div>
        <span className="sakinah__level">{labelMap[level]}</span>
      </div>
      <div className="sakinah__dots" aria-hidden="true">
        {Array.from({ length: dots }).map((_, i) => (
          <span
            key={i}
            className={`sakinah__dot${i < filled ? ' sakinah__dot--filled' : ''}`}
          />
        ))}
      </div>
      <p className="sakinah__hint">{hintMap[level]}</p>
      {level !== 'settled' && (
        <Link
          to="/app/pillar/faith"
          className="sakinah__retreat"
          aria-label="Ritual of Retreat"
        >
          <Moon size={13} />
          <span>{isIslamic ? 'A ritual of retreat' : 'Take a breath'}</span>
          <span className="sakinah__retreat-arrow" aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

/* ── Main Dashboard ── */
export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const allProjects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const events = useOfficeStore((s) => s.events);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const niyyahSubmodule = useThresholdStore((s) => s.niyyahSubmodule);
  const isIslamic = valuesLayer === 'islamic';

  // Sun & Stars — primary pillar from today's niyyah becomes the accent anchor
  const primaryPillar = useMemo(() => {
    const firstId = (niyyahFocus || []).find((id) => id && id !== '_skipped');
    return MAQASID_PILLARS.find((p) => p.id === firstId) || null;
  }, [niyyahFocus]);

  // Focus submodule progress — completed / total for tasks tagged to today's submodule
  const focusProgress = useMemo(() => {
    if (!niyyahSubmodule || niyyahSubmodule === '_skipped') return { completed: 0, total: 0 };
    let completed = 0;
    let total = 0;
    for (const tasks of Object.values(tasksByProject)) {
      for (const task of tasks) {
        if (task.submoduleId !== niyyahSubmodule) continue;
        total += 1;
        if (task.completedAt) completed += 1;
      }
    }
    return { completed, total };
  }, [tasksByProject, niyyahSubmodule]);

  // Ripple toast — when a focus task transitions uncompleted → completed, nudge the user.
  const completedFocusRef = useRef(null);
  const lastToastAtRef = useRef(0);
  const addToast = useToastStore((s) => s.addToast);
  useEffect(() => {
    if (!niyyahSubmodule || niyyahSubmodule === '_skipped') {
      completedFocusRef.current = null;
      return;
    }
    const current = new Set();
    for (const tasks of Object.values(tasksByProject)) {
      for (const task of tasks) {
        if (task.submoduleId === niyyahSubmodule && task.completedAt) current.add(task.id);
      }
    }
    const prev = completedFocusRef.current;
    if (prev != null) {
      let newCount = 0;
      for (const id of current) if (!prev.has(id)) newCount += 1;
      if (newCount > 0 && primaryPillar) {
        const now = Date.now();
        if (now - lastToastAtRef.current > 2000) {
          lastToastAtRef.current = now;
          const label = isIslamic ? primaryPillar.sidebarLabel : primaryPillar.universalLabel;
          addToast({
            type: 'success',
            message: `One step closer to your ${label}.`,
            variant: 'toast',
          });
        }
      }
    }
    completedFocusRef.current = current;
  }, [tasksByProject, niyyahSubmodule, primaryPillar, addToast, isIslamic]);
  const tourCompleted = useOnboardingStore((s) => s.tourCompleted);
  const completeTourStep = useOnboardingStore((s) => s.completeTourStep);
  const firstLoginAt = useOnboardingStore((s) => s.firstLoginAt);

  const handleTourComplete = useCallback(() => {
    completeTourStep();
  }, [completeTourStep]);

  // One-shot migration: tag tasks with pillarId/submoduleId derived from
  // their project's moduleId. Runs once per browser via a sentinel key.
  useEffect(() => {
    const MIGRATED_KEY = 'bbiz_task_pillar_migrated_v1';
    if (localStorage.getItem(MIGRATED_KEY)) return;
    useTaskStore.getState().backfillPillarFields();
    localStorage.setItem(MIGRATED_KEY, '1');
  }, []);

  // Day-rollover: if yesterday's niyyah is still the current one,
  // archive it (with any evening reflection) into history and clear
  // today's slots so the morning Niyyah Act opens fresh.
  useEffect(() => {
    useThresholdStore.getState().rolloverIfStale();
  }, []);

  const projects = useMemo(() => allProjects.filter((p) => !p.archived), [allProjects]);

  // BBOS projects with per-stage progress
  const bbosProjects = useMemo(() => {
    return projects
      .filter((p) => p.bbosEnabled)
      .map((p) => {
        const tasks = tasksByProject[p.id] || [];
        const doneColId = p.columns?.find((c) => c.name === 'Done')?.id ?? null;
        const tMap = {};
        for (const t of tasks) { if (t.bbosTaskType) tMap[t.bbosTaskType] = t; }
        const progress = {};
        for (const stage of BBOS_STAGES) {
          const defs = getBbosTaskDefsByStage(stage.id);
          if (defs.length === 0) { progress[stage.id] = 0; continue; }
          let done = 0;
          for (const def of defs) {
            const t = tMap[def.id];
            if (t && (t.columnId === doneColId || t.completedAt)) done++;
          }
          progress[stage.id] = Math.round((done / defs.length) * 100);
        }
        return { project: p, progress, activeStage: p.bbosStage || 'IDY' };
      });
  }, [projects, tasksByProject]);
  const allTasks = useMemo(() => Object.values(tasksByProject).flat(), [tasksByProject]);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const firstColIds = new Set();
    const lastColIds = new Set();
    for (const p of projects) {
      if (p.columns.length > 0) {
        firstColIds.add(p.columns[0].id);
        lastColIds.add(p.columns[p.columns.length - 1].id);
      }
    }
    return {
      tasks: allTasks.length,
      projects: projects.length,
      events: events.length,
      completed: allTasks.filter((t) => t.completedAt).length,
      inProgress: allTasks.filter((t) =>
        !t.completedAt && !firstColIds.has(t.columnId) && !lastColIds.has(t.columnId)
      ).length,
      overdue: allTasks.filter((t) =>
        t.dueDate && new Date(t.dueDate) < now && !t.completedAt
      ).length,
    };
  }, [allTasks, projects, events]);

  // Tasks completed today
  const todayCompleted = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return allTasks.filter((t) => t.completedAt && t.completedAt.slice(0, 10) === todayStr).length;
  }, [allTasks]);

  // 30-point BCG data (last 30 days completions — chart filters by range)
  const bcgData = useMemo(() => {
    const days = [];
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      d.setHours(0, 0, 0, 0);
      const dateStr = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
      const count = allTasks.filter((t) =>
        t.completedAt && t.completedAt.slice(0, 10) === dateStr
      ).length;
      days.push({ date: dateStr, label, count });
    }
    return days;
  }, [allTasks]);

  // Upcoming events (next 7 days)
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const weekLater = new Date(now);
    weekLater.setDate(weekLater.getDate() + 7);
    const todayStr = now.toISOString().slice(0, 10);
    const weekStr = weekLater.toISOString().slice(0, 10);
    return events
      .filter((e) => e.date >= todayStr && e.date <= weekStr)
      .sort((a, b) => a.date.localeCompare(b.date) || (a.startTime || '').localeCompare(b.startTime || ''))
      .slice(0, 5);
  }, [events]);

  const focusSummary = useMemo(() => {
    const now = new Date();
    return (niyyahFocus || [])
      .filter((id) => id !== '_skipped')
      .map((id) => {
        const pillar = MAQASID_PILLARS.find((p) => p.id === id);
        if (!pillar) return null;
        const pillarProjects = projects.filter(
          (p) => !p.archived && (
            p.id.startsWith(pillar.id + '_') ||
            (p.moduleId && pillar.subModuleIds.includes(p.moduleId))
          )
        );
        const pillarTasks = pillarProjects.flatMap((p) => tasksByProject[p.id] || []);
        const openCount = pillarTasks.filter((t) => !t.completedAt).length;
        const overdueCount = pillarTasks.filter(
          (t) => t.dueDate && new Date(t.dueDate) < now && !t.completedAt
        ).length;
        return { pillar, openCount, overdueCount };
      })
      .filter(Boolean);
  }, [niyyahFocus, projects, tasksByProject]);

  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  const SNAPSHOT_METRICS = [
    {
      key: 'today',
      label: 'Today',
      icon: Activity,
      value: todayCompleted,
      hint: todayCompleted === 0 ? 'First completion lands here' : 'tasks completed',
      isHero: true,
    },
    {
      key: 'inProgress',
      label: 'In Progress',
      icon: Kanban,
      value: stats.inProgress,
      hint: stats.inProgress === 0 ? 'Nothing moving yet' : 'tasks in motion',
    },
    {
      key: 'overdue',
      label: 'Overdue',
      icon: AlertTriangle,
      value: stats.overdue,
      hint: stats.overdue === 0 ? 'Nothing past due' : 'past due date',
      danger: stats.overdue > 0,
    },
  ];

  return (
    <div
      className={`insight${primaryPillar ? ' insight--sanctuary' : ''}`}
      data-tour="dashboard-main"
      style={primaryPillar ? { '--dashboard-accent': primaryPillar.accentColor } : undefined}
    >
      {/* ── Spotlight Tour ── */}
      {!tourCompleted && firstLoginAt !== null && (
        <SpotlightTour steps={TOUR_STEPS} onComplete={handleTourComplete} />
      )}
      {/* ═══ QALB · Intent — the day begins here ═══ */}
      <section className="dash-tier dash-tier--qalb" aria-labelledby="tier-qalb">
        {isIslamic && (
          <div className="dash-tier__eyebrow" id="tier-qalb">
            <span className="dash-tier__eyebrow-en">Intent</span>
            <span className="dash-tier__eyebrow-sep" aria-hidden="true">·</span>
            <span className="dash-tier__eyebrow-ar">نية</span>
          </div>
        )}

        <TodayFocusSection
          pillarSummary={focusSummary}
          primaryPillarId={primaryPillar?.id ?? null}
          focusProgress={focusProgress}
        />

        <DailyMithaq
          deepWorkPct={focusProgress.total > 0 ? (focusProgress.completed / focusProgress.total) * 100 : 0}
        />
      </section>

      {/* ═══ AMAL · Action — the day unfolds ═══ */}
      <section className="dash-tier dash-tier--amal" aria-labelledby="tier-amal">
        {isIslamic && (
          <div className="dash-tier__eyebrow" id="tier-amal">
            <span className="dash-tier__eyebrow-en">Action</span>
            <span className="dash-tier__eyebrow-sep" aria-hidden="true">·</span>
            <span className="dash-tier__eyebrow-ar">عمل</span>
          </div>
        )}

        <div data-tour="onboarding-checklist">
          <OnboardingChecklist />
        </div>

        <FocusTaskList />

      {/* ── Empty state for new users ── */}
      {projects.length === 0 && allTasks.length === 0 && (
        <div className="insight-empty">
          <h2 className="insight-empty__title">
            Welcome{firstName !== 'there' ? `, ${firstName}` : ''}! Let&apos;s get started.
          </h2>
          <p className="insight-empty__text">
            {isIslamic
              ? 'Set your daily Niyyah or create your first project to begin your Maqasid journey.'
              : 'Create your first project or explore the pillars below to organise your work.'}
          </p>
          <div className="insight-empty__actions">
            <Link to="/app/work" className="insight-action-btn">+ Create Project</Link>
          </div>
          <div className="insight-empty__pillars">
            {MAQASID_PILLARS.map((pillar) => (
              <Link key={pillar.id} to={`/app/pillar/${pillar.id}`} className="insight-empty__pillar" style={{ borderColor: pillar.accentColor + '40', background: pillar.accentColor + '0a' }}>
                <span style={{ color: pillar.accentColor, fontWeight: 600 }}>{pillar.sidebarLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Maqasid Level Overview (LevelNav + Wheel) ── */}
      <MaqasidLevelOverview />

      {/* ── BBOS Pipeline · Now + Next ── */}
      {bbosProjects.length > 0 && bbosProjects.map(({ project: bp, progress, activeStage }) => {
        const currentId = activeStage || BBOS_STAGES[0].id;
        const currentStage = BBOS_STAGES.find((s) => s.id === currentId) || BBOS_STAGES[0];
        const currentLayer = BBOS_LAYERS.find((l) => l.id === currentStage.layer);
        const currentPct = progress[currentStage.id] ?? 0;
        const upcoming = BBOS_STAGES
          .filter((s) => s.order > currentStage.order)
          .slice(0, 2);

        return (
          <div key={bp.id} className="pipeline-now">
            <Link to={`/app/work/${bp.id}`} className="pipeline-now__title">
              {bp.color && <span className="pipeline-now__dot" style={{ background: bp.color }} />}
              <span>{bp.name}</span>
              <ChevronRight size={14} className="pipeline-now__arrow" />
            </Link>

            <div className="pipeline-now__layer" style={{ color: currentLayer?.color }}>
              {currentLayer?.label}
            </div>

            <Link
              to={`/app/work/${bp.id}`}
              state={{ stage: currentStage.id }}
              className="pipeline-now__stage"
              title={currentStage.description}
            >
              <div className="pipeline-now__stage-head">
                <span className="pipeline-now__stage-num">
                  {String(currentStage.order + 1).padStart(2, '0')}
                </span>
                <span className="pipeline-now__stage-label">{currentStage.label}</span>
                {currentPct > 0 && (
                  <span className="pipeline-now__stage-pct">{currentPct}%</span>
                )}
              </div>
              <div className="pipeline-now__bar">
                <div
                  className="pipeline-now__bar-fill"
                  style={{
                    width: `${currentPct}%`,
                    background: currentStage.color,
                  }}
                />
              </div>
            </Link>

            {upcoming.length > 0 && (
              <div className="pipeline-now__next">
                <span className="pipeline-now__next-label">Next</span>
                <span className="pipeline-now__next-crumbs">
                  {upcoming.map((s, i) => (
                    <span key={s.id} className="pipeline-now__next-crumb">
                      {String(s.order + 1).padStart(2, '0')} {s.label}
                      {i < upcoming.length - 1 && <span className="pipeline-now__next-sep"> · </span>}
                    </span>
                  ))}
                </span>
              </div>
            )}

            <Link to={`/app/work/${bp.id}`} className="pipeline-now__expand">
              View full pipeline →
            </Link>
          </div>
        );
      })}

      {/* ── Amal side rail: day signals ── */}
      <div className="insight-side">
          {/* Daily Snapshot — Today / In Progress / Overdue in one card */}
          <div className="daily-snapshot" role="group" aria-label="Daily snapshot">
            {SNAPSHOT_METRICS.map((m, i) => {
              const Icon = m.icon;
              const isZero = m.value === 0;
              return (
                <div
                  key={m.key}
                  className={[
                    'daily-snapshot__metric',
                    m.isHero ? 'daily-snapshot__metric--hero' : '',
                    isZero ? 'daily-snapshot__metric--zero' : '',
                    m.danger && !isZero ? 'daily-snapshot__metric--danger' : '',
                    i > 0 ? 'daily-snapshot__metric--divider' : '',
                  ].filter(Boolean).join(' ')}
                >
                  <div className="daily-snapshot__label">
                    <Icon size={13} aria-hidden="true" />
                    <span>{m.label}</span>
                  </div>
                  <div className="daily-snapshot__value">
                    {isZero ? '—' : m.value}
                  </div>
                  <div className="daily-snapshot__hint">{m.hint}</div>
                </div>
              );
            })}
          </div>

          {/* Context Widget (submodule-aware) */}
          <ContextWidgetSlot />

          {/* Sakinah Meter (replaces Workflow Pressure) */}
          <SakinahMeter
            overdueCount={stats.overdue}
            inProgressCount={stats.inProgress}
            isIslamic={isIslamic}
          />

          {/* Upcoming tasks & events */}
          <div className="insight-upcoming">
            <div className="insight-upcoming__header">
              <span>Upcoming tasks &amp; events</span>
            </div>
            {upcomingEvents.length === 0 && (
              <div className="insight-section-empty">
                <Clock size={24} style={{ color: 'var(--text3)' }} />
                <p>Your week is open — schedule something?</p>
                <Link to="/app/office" className="insight-section-empty__cta">View Calendar</Link>
              </div>
            )}
            {upcomingEvents.map((e) => (
              <div key={e.id} className="insight-upcoming-item">
                <div className="insight-upcoming-dot" />
                <div className="insight-upcoming-info">
                  <span className="insight-upcoming-title">{e.title}</span>
                  <span className="insight-upcoming-date">
                    {new Date(e.date + 'T00:00:00').toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })}
                    {e.startTime ? ` ${e.startTime}` : ''}
                    {e.endTime ? ` - ${e.endTime}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ═══ BARAKAH · Impact — the day bears fruit ═══ */}
      <section className="dash-tier dash-tier--barakah" aria-labelledby="tier-barakah">
        {isIslamic && (
          <div className="dash-tier__eyebrow" id="tier-barakah">
            <span className="dash-tier__eyebrow-en">Impact</span>
            <span className="dash-tier__eyebrow-sep" aria-hidden="true">·</span>
            <span className="dash-tier__eyebrow-ar">بركة</span>
          </div>
        )}

        {/* Istiqamah — steadfastness across 30 days */}
        <BCGChart data={bcgData} />

        {/* Maqasid Balance Radar — 7-axis reflection over last 30 days */}
        <MaqasidBalanceRadar
          projects={projects}
          tasksByProject={tasksByProject}
          valuesLayer={valuesLayer}
        />

      </section>
    </div>
  );
}
