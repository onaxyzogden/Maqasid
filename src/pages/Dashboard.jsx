import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Kanban, AlertTriangle, CalendarDays,
  Activity, Zap, ChevronRight, Clock,
} from 'lucide-react';
import { useProjectStore } from '../store/project-store';
import { useAuthStore } from '../store/auth-store';
import { useTaskStore } from '../store/task-store';
import { useSettingsStore } from '../store/settings-store';
import { useThresholdStore } from '../store/threshold-store';
import { useOfficeStore } from '../store/office-store';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { MAQASID_PILLARS } from '../data/maqasid';
import PillarProgressStrip from '../components/dashboard/PillarProgressStrip';
import ManifestoBanner from '../components/dashboard/ManifestoBanner';
import FocusTaskList from '../components/dashboard/FocusTaskList';
import ContextWidgetSlot from '../components/dashboard/ContextWidgetSlot';
import EveningReflectButton from '../components/dashboard/EveningReflectButton';
import { useToastStore } from '../store/toast-store';
import TodayFocusSection from './TodayFocusSection';
import { getGreeting, getMotivation, BCG_RANGES } from '../hooks/useDashboard';
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
          <Activity size={28} style={{ color: 'var(--text3)' }} />
          <p>Your Barakah Consistency Graph appears once you start completing tasks.</p>
          <Link to="/app/work" className="insight-section-empty__cta">Go to tasks</Link>
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

/* ── Workflow Pressure Gauge ── */
function WorkflowPressure({ level, inProgressCount = 0 }) {
  const bars = 10;
  const filled = level === 'low' ? 2 : level === 'medium' ? 5 : 8;
  const color = level === 'low' ? 'var(--success)' : level === 'medium' ? 'var(--warning)' : 'var(--danger)';
  const [tip, setTip] = useState(null);

  return (
    <div className="wf-pressure">
      <div className="wf-pressure__header">
        <span className="wf-pressure__title">Workflow Pressure</span>
        <span className="wf-pressure__level" style={{ color }}>{level.toUpperCase()}</span>
      </div>
      <div className="wf-pressure__bars" role="img" aria-label="Workflow pressure gauge"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setTip({ x: rect.left + rect.width / 2, y: rect.top });
        }}
        onMouseLeave={() => setTip(null)}
        onClick={(e) => {
          if (!('ontouchstart' in window)) return;
          const rect = e.currentTarget.getBoundingClientRect();
          setTip((prev) => prev ? null : { x: rect.left + rect.width / 2, y: rect.top });
        }}
      >
        {Array.from({ length: bars }).map((_, i) => (
          <div key={i} className={`wf-bar ${i < filled ? 'filled' : ''}`}
            style={i < filled ? { background: color } : undefined} />
        ))}
      </div>
      <ChartTooltip visible={!!tip} x={tip?.x ?? 0} y={tip?.y ?? 0} anchor="above" onDismiss={() => setTip(null)}>
        <div className="chart-tooltip__value" style={{ color }}>
          {level.charAt(0).toUpperCase() + level.slice(1)} pressure
        </div>
        <div className="chart-tooltip__label">
          {filled} of 10 &middot; {inProgressCount} task{inProgressCount !== 1 ? 's' : ''} in progress
        </div>
      </ChartTooltip>
      <div className="wf-pressure__labels">
        <span>Low</span><span>Medium</span><span>High</span>
      </div>
      <p className="wf-pressure__desc">Workflow pressure is measured by number, priority and due dates of tasks.</p>
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
  const completedOpening = useThresholdStore((s) => s.completedOpening);
  const deferred = useThresholdStore((s) => s.deferred);
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const niyyahSubmodule = useThresholdStore((s) => s.niyyahSubmodule);
  const { nextPrayer } = usePrayerTimes();
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

  const [projectFilter, setProjectFilter] = useState('all');
  const [activityTab, setActivityTab] = useState('all');

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
        return { project: p, progress, activeStage: p.bbosStage || 'FND' };
      });
  }, [projects, tasksByProject]);
  const allTasks = useMemo(() => Object.values(tasksByProject).flat(), [tasksByProject]);

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

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

  // Workflow pressure
  const pressureLevel = useMemo(() => {
    if (stats.overdue >= 5 || stats.inProgress > 15) return 'high';
    if (stats.overdue >= 2 || stats.inProgress > 8) return 'medium';
    return 'low';
  }, [stats]);

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

  // Open tasks sorted by priority
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  const openTasksAll = useMemo(() => {
    let tasks = allTasks.filter((t) => !t.completedAt);
    if (projectFilter !== 'all') {
      tasks = tasks.filter((t) => t.projectId === projectFilter);
    }
    return tasks
      .sort((a, b) => (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9));
  }, [allTasks, projectFilter]);
  const openTasks = openTasksAll.slice(0, 10);
  const hiddenTaskCount = openTasksAll.length - openTasks.length;

  // Activity timeline
  const activityItems = useMemo(() => {
    const items = [];
    allTasks
      .filter((t) => t.completedAt)
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, 8)
      .forEach((t) => {
        const proj = projects.find((p) => (tasksByProject[p.id] || []).some((tt) => tt.id === t.id));
        items.push({
          id: t.id,
          type: 'task_complete',
          text: t.title,
          project: proj?.name || 'General',
          time: t.completedAt,
        });
      });
    allTasks
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 5)
      .forEach((t) => {
        const proj = projects.find((p) => (tasksByProject[p.id] || []).some((tt) => tt.id === t.id));
        items.push({
          id: 'c_' + t.id,
          type: 'task_create',
          text: t.title,
          project: proj?.name || 'General',
          time: t.createdAt,
        });
      });
    events.slice(-3).forEach((e) => {
      items.push({
        id: e.id,
        type: 'event',
        text: e.title,
        project: 'General',
        time: e.createdAt,
      });
    });
    return items
      .sort((a, b) => b.time.localeCompare(a.time))
      .slice(0, 10);
  }, [allTasks, events, projects, tasksByProject]);

  // Pillar focus: pillars with the most open task work
  const pillarSummary = useMemo(() => {
    const now = new Date();
    return MAQASID_PILLARS.map((pillar) => {
      const pillarProjects = projects.filter(
        (p) => !p.archived && (
          (p.moduleId
            ? pillar.subModuleIds.includes(p.moduleId)
            : p.id.startsWith(pillar.id + '_'))
        )
      );
      const pillarTasks = pillarProjects.flatMap((p) => tasksByProject[p.id] || []);
      const openCount = pillarTasks.filter((t) => !t.completedAt).length;
      const overdueCount = pillarTasks.filter(
        (t) => t.dueDate && new Date(t.dueDate) < now && !t.completedAt
      ).length;
      return { pillar, openCount, overdueCount };
    })
      .filter((p) => p.openCount > 0)
      .sort((a, b) => {
        const aN = (niyyahFocus || []).includes(a.pillar.id);
        const bN = (niyyahFocus || []).includes(b.pillar.id);
        if (aN !== bN) return aN ? -1 : 1;
        return b.overdueCount - a.overdueCount || b.openCount - a.openCount;
      })
      .slice(0, 5);
  }, [projects, tasksByProject, niyyahFocus]);

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

  const renderNow = useRef(Date.now());
  function relativeTime(iso) {
    if (!iso) return '';
    const diff = renderNow.current - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return 'a day ago';
    return `${days} days ago`;
  }

  const priorityColor = (p) => {
    if (p === 'urgent') return 'var(--pri-urgent)';
    if (p === 'high') return 'var(--pri-high)';
    if (p === 'medium') return 'var(--pri-medium)';
    return 'var(--pri-low)';
  };

  const greeting = getGreeting();
  const motivation = getMotivation();
  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  const STAT_CARDS = [
    { key: 'inProgress', label: 'In Progress', icon: Kanban,        value: stats.inProgress },
    { key: 'overdue',    label: 'Overdue',     icon: AlertTriangle,  value: stats.overdue, danger: stats.overdue > 0 },
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
      {/* ── Daily Manifesto (Ad-lib banner) + Evening Reflect chip ── */}
      <div className="insight-manifesto-row">
        <ManifestoBanner />
        <EveningReflectButton
          deepWorkPct={focusProgress.total > 0 ? (focusProgress.completed / focusProgress.total) * 100 : 0}
        />
      </div>


      {/* ── Onboarding Checklist ── */}
      <div data-tour="onboarding-checklist">
        <OnboardingChecklist />
      </div>

      {/* ── Today's Focus ── */}
      <TodayFocusSection
        pillarSummary={focusSummary}
        primaryPillarId={primaryPillar?.id ?? null}
        focusProgress={focusProgress}
      />

      {/* ── Guided Task List — Today's Deep Work ── */}
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

      {/* ── Maqasid Progress Strip ── */}
      <div className="insight-section-label">Maqasid al-Shari&apos;ah</div>
      <PillarProgressStrip valuesLayer={valuesLayer} focusPillarIds={niyyahFocus} />

      {/* ── BBOS Pipeline Overviews ── */}
      {bbosProjects.length > 0 && bbosProjects.map(({ project: bp, progress, activeStage }) => (
        <div key={bp.id} className="insight-bbos-pipeline">
          <Link to={`/app/work/${bp.id}`} className="insight-bbos-pipeline__title">
            {bp.color && <span className="insight-bbos-pipeline__dot" style={{ background: bp.color }} />}
            {bp.name}
            <ChevronRight size={14} className="insight-bbos-pipeline__arrow" />
          </Link>
          <div className="bfd__pipeline">
            {BBOS_LAYERS.map((layer) => (
              <div key={layer.id} className="bfd__pipeline-layer">
                <div className="bfd__pipeline-layer-label" style={{ color: layer.color }}>
                  {layer.label}
                </div>
                <div className="bfd__pipeline-stages">
                  {layer.stages.map((stageId) => {
                    const stage = BBOS_STAGES.find((s) => s.id === stageId);
                    if (!stage) return null;
                    const pct = progress[stageId] ?? 0;
                    const isActive = stageId === activeStage;
                    return (
                      <Link
                        key={stageId}
                        className={`bfd__pipeline-stage${isActive ? ' bfd__pipeline-stage--active' : ''}`}
                        to={`/app/work/${bp.id}`}
                        state={{ stage: stageId }}
                        title={stage.description}
                      >
                        <span className="bfd__pipeline-stage-num">
                          {String(stage.order + 1).padStart(2, '0')}
                        </span>
                        <span className="bfd__pipeline-stage-label">{stage.label}</span>
                        <div className="bfd__pipeline-stage-bar">
                          <div
                            className="bfd__pipeline-stage-fill"
                            style={{ width: `${pct}%`, background: stage.color }}
                          />
                        </div>
                        <span className="bfd__pipeline-stage-pct">{pct}%</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* ── Main grid ── */}
      <div className="insight-grid">
        {/* LEFT COLUMN */}
        <div className="insight-left">
          {/* BCG Chart */}
          <BCGChart data={bcgData} />

          {/* Open Tasks */}
          <div className="insight-open-tasks">
            <div className="insight-open-tasks__header">
              <div className="insight-open-tasks__tabs">
                <button
                  className={`insight-proj-tab ${projectFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setProjectFilter('all')}
                >
                  All
                </button>
                {projects.map((p) => (
                  <button
                    key={p.id}
                    className={`insight-proj-tab ${projectFilter === p.id ? 'active' : ''}`}
                    onClick={() => setProjectFilter(p.id)}
                  >
                    <span className="insight-proj-dot" style={{ background: p.color }} />
                    {p.name.length > 12 ? p.name.slice(0, 10) + '...' : p.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="insight-open-tasks__title-row">
              <span>Open Tasks by Priority:</span>
              <span className="insight-open-tasks__count">{openTasks.length}</span>
            </div>
            <div className="insight-open-tasks__list">
              {openTasks.length === 0 && (
                <div className="insight-section-empty">
                  <Kanban size={24} style={{ color: 'var(--text3)' }} />
                  <p>All clear — create a task to get started.</p>
                  <Link to="/app/work" className="insight-section-empty__cta">+ Create Task</Link>
                </div>
              )}
              {openTasks.map((t) => {
                const proj = projects.find((p) => (tasksByProject[p.id] || []).some((tt) => tt.id === t.id));
                const projInitials = proj ? proj.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : 'GP';
                const dueDateLabel = t.dueDate
                  ? new Date(t.dueDate + 'T00:00:00').toLocaleDateString('en', { month: 'short', day: 'numeric' })
                  : null;
                const isOverdue = t.dueDate && new Date(t.dueDate) < new Date() && !t.completedAt;
                return (
                  <div key={t.id} className="insight-task-row">
                    <div className="insight-task-priority" style={{ background: priorityColor(t.priority) }} />
                    <span className="insight-task-title">{t.title}</span>
                    {dueDateLabel && (
                      <span className="insight-task-due" style={isOverdue ? { color: 'var(--danger)' } : undefined}>
                        {dueDateLabel}
                      </span>
                    )}
                    <span className="insight-task-proj">{projInitials}</span>
                    <Link to={proj ? `/app/work/${proj.id}` : '/app/work'} className="insight-task-view">
                      View
                    </Link>
                  </div>
                );
              })}
              {hiddenTaskCount > 0 && (
                <Link to="/app/work" className="insight-open-tasks__view-all">
                  View all {openTasksAll.length} tasks
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="insight-right">
          {/* Today + Stats row */}
          <div className="insight-eph-section">
            <div className="insight-eph">
              <div className="insight-eph__label">
                <span>Today</span>
              </div>
              <div className="insight-eph__value">{todayCompleted}</div>
              <div className="insight-eph__desc">tasks completed</div>
            </div>
            <div className="insight-stat-cards">
              {STAT_CARDS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.key} className="insight-stat-card">
                    <div
                      className="insight-stat-card__value"
                      style={s.danger ? { color: 'var(--danger)' } : undefined}
                    >
                      {s.value}
                    </div>
                    <div className="insight-stat-card__label">
                      <Icon size={14} style={{ marginRight: 3 }} />{s.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Context Widget (submodule-aware) */}
          <ContextWidgetSlot />

          {/* Workflow Pressure */}
          <WorkflowPressure level={pressureLevel} inProgressCount={stats.inProgress} />

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
      </div>

      {/* ── Bottom row: Maqasid Focus + Activity ── */}
      <div className="insight-section-label">Overview</div>
      <div className="insight-bottom-row">
        {/* Maqasid Focus Panel */}
        <div className="insight-recommendations">
          <div className="insight-section-tabs">
            <span className="insight-section-tab active">Maqasid Focus</span>
          </div>
          <div className="pps-focus">
            {pillarSummary.length === 0 ? (
              <div className="insight-empty-line" style={{ textAlign: 'left', padding: 'var(--space-2) 0' }}>
                No open work across pillars yet —{' '}
                <Link to="/app/pillar/faith" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>
                  start with Faith
                </Link>
              </div>
            ) : (
              <>
                {pillarSummary.map(({ pillar, openCount, overdueCount }) => {
                  const isNiyyah = Array.isArray(niyyahFocus) && niyyahFocus.includes(pillar.id);
                  const label = isIslamic ? pillar.sidebarLabel : pillar.universalLabel;
                  return (
                    <div key={pillar.id} className="pps-focus__row">
                      <div className="pps-focus__accent" style={{ background: pillar.accentColor }} />
                      <div className="pps-focus__info">
                        <span className="pps-focus__name">
                          {isNiyyah && <Zap size={14} style={{ color: 'var(--accent)', marginRight: 3, flexShrink: 0 }} />}
                          {label}
                        </span>
                        {isIslamic && (
                          <span className="pps-focus__arabic">{pillar.arabicRootAr}</span>
                        )}
                      </div>
                      <span
                        className="pps-focus__count"
                        style={overdueCount > 0 ? { color: 'var(--danger)' } : undefined}
                      >
                        {openCount} open{overdueCount > 0 ? `, ${overdueCount} overdue` : ''}
                      </span>
                      <Link to={`/app/pillar/${pillar.id}`} className="pps-focus__link">
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  );
                })}
                <p className="pps-focus__hint">Based on open tasks across pillar projects</p>
              </>
            )}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="insight-activity">
          <div className="insight-section-tabs">
            <span className="insight-section-tab active">Activity</span>
            <div className="insight-activity-filter">
              <button
                className={`insight-act-tab ${activityTab === 'all' ? 'active' : ''}`}
                onClick={() => setActivityTab('all')}
              >All</button>
              <button
                className={`insight-act-tab ${activityTab === 'mine' ? 'active' : ''}`}
                onClick={() => setActivityTab('mine')}
              >Mine</button>
            </div>
          </div>
          <div className="insight-activity__list">
            {activityItems.length === 0 && (
              <div className="insight-section-empty">
                <Activity size={24} style={{ color: 'var(--text3)' }} />
                <p>Complete a task and your activity will appear here.</p>
              </div>
            )}
            {activityItems.map((item) => (
              <div key={item.id} className="insight-activity-item">
                <div className="insight-activity-item__dot" />
                <div className="insight-activity-item__body">
                  <span className="insight-activity-item__time">{relativeTime(item.time)}</span>
                  <span className="insight-activity-item__text">
                    {item.type === 'task_complete' && (
                      <><strong>{firstName}</strong> completed: <strong>{item.text}</strong></>
                    )}
                    {item.type === 'task_create' && (
                      <><strong>{firstName}</strong> created: <strong>{item.text}</strong></>
                    )}
                    {item.type === 'event' && (
                      <>New event: <strong>{item.text}</strong></>
                    )}
                  </span>
                  <span className="insight-activity-item__project">
                    in <strong>{item.project}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
