import { useMemo, useState } from 'react';
import {
  AlertTriangle, CheckCircle, Star, Activity, TrendingUp,
  LayoutDashboard,
} from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { PRIORITIES } from '../../data/modules';
import DashboardTaskCard from '../shared/DashboardTaskCard';
import InlineTaskDetail from './InlineTaskDetail';
import ChartTooltip from '../shared/ChartTooltip';
import './PillarLevelDashboard.css';

// ── Constants ─────────────────────────────────────────────────────────────────

const LEVEL_COLORS = {
  core:       '#C8A96E',
  growth:     '#4ab8a8',
  excellence: '#8b5cf6',
};

const LEVEL_LABELS = {
  core:       'CORE · Level 1 · Necessities (Daruriyyat)',
  growth:     'GROWTH · Level 2 · Needs (Hajiyyat)',
  excellence: 'EXCELLENCE · Level 3 · Refinement (Tahsiniyyat)',
};

const LEVEL_DESCRIPTIONS = {
  core:       'Foundational obligations — the essential duties that must be established before all else.',
  growth:     'Development needs — structured progression that deepens practice and knowledge.',
  excellence: 'Refinement pursuits — aspirational mastery that elevates and perfects.',
};

// ── Pure helpers ──────────────────────────────────────────────────────────────

function detectPillarLevel(projectId) {
  if (!projectId) return null;
  const m = projectId.match(/_(core|growth|excellence)$/);
  return m ? m[1] : null;
}

function computeSpans(tasks) {
  const spans = [];
  for (let i = 0; i < tasks.length; i += 2) {
    const a = tasks[i];
    const b = tasks[i + 1];
    if (!b) {
      spans.push(12);
    } else {
      const aLen = a.title.length;
      const bLen = b.title.length;
      spans.push(aLen >= bLen ? 7 : 5, aLen >= bLen ? 5 : 7);
    }
  }
  return spans;
}

function formatDue(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const diff = d - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0)  return { text: 'Overdue', colorVar: 'var(--danger)' };
  if (days === 0) return { text: 'Today',  colorVar: 'var(--warning)' };
  if (days <= 3)  return { text: `${days}d`, colorVar: 'var(--warning)' };
  return { text: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), colorVar: 'var(--text3)' };
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ── Pillar card helper ────────────────────────────────────────────────────────

function statusLabel(s) {
  return s === 'done' ? 'Done' : s === 'in-progress' ? 'In Progress' : 'To Do';
}

function PillarTaskCard({ task, index, span, status, levelColor, onSelectTask }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const hasBody = (task.subtasks?.length > 0) || task.dueDate || (task.tags?.slice(1).length > 0);
  const subtaskTotal = task.subtasks?.length || 0;
  const subtaskDone = subtaskTotal > 0 ? task.subtasks.filter((s) => s.done).length : 0;

  return (
    <DashboardTaskCard
      taskId={task.id}
      index={index}
      title={task.title}
      span={span}
      status={status}
      accentColor={levelColor}
      statusTint={status === 'in-progress'
        ? { background: `color-mix(in srgb, #F59E0B 12%, var(--surface))` }
        : undefined}
      onSelectTask={onSelectTask}
      chips={[
        { label: statusLabel(status), className: `dtc__chip dtc__chip--status-${status}` },
        ...(priority ? [{ label: priority.label, className: 'dtc__chip dtc__chip--priority', style: { background: priority.bg, color: priority.color } }] : []),
      ]}
      subtasks={subtaskTotal > 0 ? { done: subtaskDone, total: subtaskTotal, color: levelColor } : undefined}
      dueDate={formatDue(task.dueDate)}
      tags={task.tags?.slice(1)}
      emptyMessage={!hasBody ? 'No subtasks or due date yet.' : undefined}
    />
  );
}

// ── Stars helper ──────────────────────────────────────────────────────────────

function StarRating({ score, levelColor }) {
  return (
    <span className="pld__stars" style={{ color: levelColor }}>
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= score ? '' : 'pld__star--empty'}
          fill={i <= score ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  );
}

// ── Insight cards ─────────────────────────────────────────────────────────────

function InsightMetric({ label, value, sub, children }) {
  return (
    <div className="pld__insight-metric">
      <div className="pld__insight-metric-label">{label}</div>
      {children ?? (
        <>
          <div className="pld__insight-metric-value">{value}</div>
          {sub && <div className="pld__insight-metric-sub">{sub}</div>}
        </>
      )}
    </div>
  );
}

function FoundationHealthCard({ metrics, levelColor }) {
  const { urgentTasks, urgentDone, criticalGaps, completedPct } = metrics;
  const urgentPct = urgentTasks.length > 0
    ? Math.round((urgentDone.length / urgentTasks.length) * 100)
    : 100;
  const verdict =
    urgentPct >= 80 ? 'SOLID' :
    urgentPct >= 50 ? 'BUILDING' :
    urgentPct >= 25 ? 'DEVELOPING' : 'CRITICAL GAPS';
  const verdictColor =
    urgentPct >= 80 ? 'var(--col-done)' :
    urgentPct >= 50 ? levelColor :
    urgentPct >= 25 ? 'var(--pri-high)' : 'var(--pri-urgent)';

  return (
    <div className="pld__insight">
      <div className="pld__insight-left">
        <div className="pld__insight-head">
          <span className="pld__insight-num">F</span>
          <span className="pld__insight-title">Foundation Health</span>
        </div>
        <div className="pld__insight-verdict-box" style={{ background: `color-mix(in srgb, ${levelColor} 8%, var(--surface))` }}>
          <div className="pld__insight-verdict-label" style={{ color: levelColor }}>Daruriyyat Status</div>
          <div className="pld__insight-verdict-value" style={{ color: verdictColor }}>{verdict}</div>
          <div className="pld__insight-verdict-sub">{urgentPct}% of critical tasks addressed</div>
        </div>
      </div>
      <div className="pld__insight-right">
        <div className="pld__insight-metrics-title">Foundation Signals</div>
        <div className="pld__insight-metrics-grid">
          <InsightMetric
            label="Critical Gaps"
            value={criticalGaps.length === 0 ? 'None' : criticalGaps.length}
            sub={criticalGaps.length === 0 ? 'On track' : `Urgent task${criticalGaps.length !== 1 ? 's' : ''} not started`}
          >
            {criticalGaps.length > 0 && (
              <>
                <div className="pld__insight-metric-value" style={{ color: 'var(--pri-urgent)' }}>
                  {criticalGaps.length}
                </div>
                <div className="pld__insight-metric-sub">{criticalGaps.length} urgent task{criticalGaps.length !== 1 ? 's' : ''} not started</div>
              </>
            )}
            {criticalGaps.length === 0 && (
              <>
                <div className="pld__insight-metric-value" style={{ color: 'var(--col-done)' }}>None</div>
                <div className="pld__insight-metric-sub">On track</div>
              </>
            )}
          </InsightMetric>
          <InsightMetric label="Daruriyyat Threshold" value={`${completedPct}%`} sub="Overall completion">
            <div className="pld__insight-metric-value">{completedPct}%</div>
            <div className="pld__insight-metric-sub">Overall completion</div>
            <div className="pld__gauge-track">
              <div className="pld__gauge-fill" style={{ width: `${completedPct}%`, background: levelColor }} />
            </div>
          </InsightMetric>
          <InsightMetric
            label="Priority Coverage"
            value={`${urgentDone.length}/${urgentTasks.length}`}
            sub={urgentTasks.length === 0 ? 'No urgent/high tasks' : 'priority tasks addressed'}
          />
        </div>
      </div>
    </div>
  );
}

function GrowthMomentumCard({ metrics, levelColor }) {
  const { inProgress, recentlyDone, subtaskPct, total, doneTasks } = metrics;
  const todoCount = total - inProgress.length - doneTasks.length;

  const verdict =
    inProgress.length > total * 0.3 ? 'ACCELERATING' :
    recentlyDone.length > 0         ? 'ACTIVE' :
    inProgress.length > 0           ? 'STALLED' : 'DORMANT';
  const verdictColor =
    verdict === 'ACCELERATING' ? 'var(--col-done)' :
    verdict === 'ACTIVE'       ? levelColor :
    verdict === 'STALLED'      ? 'var(--pri-high)' : 'var(--text3)';

  return (
    <div className="pld__insight">
      <div className="pld__insight-left">
        <div className="pld__insight-head">
          <span className="pld__insight-num"><TrendingUp size={14} /></span>
          <span className="pld__insight-title">Growth Momentum</span>
        </div>
        <div className="pld__insight-verdict-box" style={{ background: `color-mix(in srgb, ${levelColor} 8%, var(--surface))` }}>
          <div className="pld__insight-verdict-label" style={{ color: levelColor }}>Momentum State</div>
          <div className="pld__insight-verdict-value" style={{ color: verdictColor }}>{verdict}</div>
          <div className="pld__insight-verdict-sub">{inProgress.length} task{inProgress.length !== 1 ? 's' : ''} in progress</div>
        </div>
      </div>
      <div className="pld__insight-right">
        <div className="pld__insight-metrics-title">Growth Signals</div>
        <div className="pld__insight-metrics-grid">
          <InsightMetric
            label="Recent Activity"
            value={recentlyDone.length}
            sub={`task${recentlyDone.length !== 1 ? 's' : ''} completed (7 days)`}
          />
          <InsightMetric label="Learning Depth" value={subtaskPct !== null ? `${subtaskPct}%` : '—'} sub={subtaskPct !== null ? 'subtask completion rate' : 'No subtasks defined'}>
            {subtaskPct !== null ? (
              <>
                <div className="pld__insight-metric-value">{subtaskPct}%</div>
                <div className="pld__insight-metric-sub">subtask completion rate</div>
                <div className="pld__gauge-track">
                  <div className="pld__gauge-fill" style={{ width: `${subtaskPct}%`, background: levelColor }} />
                </div>
              </>
            ) : (
              <>
                <div className="pld__insight-metric-value" style={{ color: 'var(--text3)' }}>—</div>
                <div className="pld__insight-metric-sub">No subtasks defined</div>
              </>
            )}
          </InsightMetric>
          <InsightMetric
            label="Pipeline Split"
            value={`${inProgress.length} active`}
            sub={`${todoCount > 0 ? todoCount + ' waiting' : 'nothing waiting'}`}
          />
        </div>
      </div>
    </div>
  );
}

function MasteryDepthCard({ metrics, levelColor }) {
  const { completedPct, masteryCandidates, total } = metrics;
  const verdict =
    completedPct >= 80 ? 'MASTERY' :
    completedPct >= 60 ? 'ADVANCING' :
    completedPct >= 40 ? 'PROGRESSING' : 'EARLY STAGE';
  const verdictColor =
    completedPct >= 80 ? 'var(--col-done)' :
    completedPct >= 60 ? levelColor :
    completedPct >= 40 ? 'var(--pri-high)' : 'var(--text3)';
  const starScore = Math.max(1, Math.round((completedPct / 100) * 3));

  return (
    <div className="pld__insight">
      <div className="pld__insight-left">
        <div className="pld__insight-head">
          <span className="pld__insight-num"><Activity size={14} /></span>
          <span className="pld__insight-title">Mastery Depth</span>
        </div>
        <div className="pld__insight-verdict-box" style={{ background: `color-mix(in srgb, ${levelColor} 8%, var(--surface))` }}>
          <div className="pld__insight-verdict-label" style={{ color: levelColor }}>Excellence Level</div>
          <div className="pld__insight-verdict-value" style={{ color: verdictColor }}>{verdict}</div>
          <div className="pld__insight-verdict-sub">{completedPct}% of tasks completed</div>
        </div>
      </div>
      <div className="pld__insight-right">
        <div className="pld__insight-metrics-title">Mastery Signals</div>
        <div className="pld__insight-metrics-grid">
          <InsightMetric label="Overall Completion" value={`${completedPct}%`} sub={`${metrics.doneTasks.length}/${total} tasks done`}>
            <div className="pld__insight-metric-value">{completedPct}%</div>
            <div className="pld__insight-metric-sub">{metrics.doneTasks.length}/{total} tasks done</div>
            <div className="pld__gauge-track">
              <div className="pld__gauge-fill" style={{ width: `${completedPct}%`, background: levelColor }} />
            </div>
          </InsightMetric>
          <InsightMetric
            label="Mastery Candidates"
            value={masteryCandidates.length}
            sub={masteryCandidates.length === 1 ? 'task fully complete' : 'tasks fully complete'}
          />
          <InsightMetric label="Excellence Score">
            <StarRating score={starScore} levelColor={levelColor} />
            <div className="pld__insight-metric-sub" style={{ marginTop: 4 }}>
              {starScore}/3 — {verdict.toLowerCase()}
            </div>
          </InsightMetric>
        </div>
      </div>
    </div>
  );
}

// ── Progress ring (header) ────────────────────────────────────────────────────

function MasteryRing({ percent, pillarColor, pillarKey, doneCount, totalCount }) {
  const r = 42;
  const stroke = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `pldRing_${pillarKey}`;
  const [tip, setTip] = useState(null);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg width="110" height="110" viewBox="0 0 110 110" className="pld__ring-svg">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={pillarColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={pillarColor} />
          </linearGradient>
        </defs>
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx="55" cy="55" r={r} fill="none"
          stroke={`url(#${gradId})`} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dashoffset 0.8s ease', cursor: 'pointer' }}
          onMouseEnter={(e) => {
            const svg = e.currentTarget.closest('svg');
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            setTip({ x: rect.left + rect.width / 2, y: rect.top });
          }}
          onMouseLeave={() => setTip(null)}
          onClick={(e) => {
            if (!('ontouchstart' in window)) return;
            const svg = e.currentTarget.closest('svg');
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            setTip((prev) => prev ? null : { x: rect.left + rect.width / 2, y: rect.top });
          }}
        />
        <text x="55" y="50" textAnchor="middle" className="pld__ring-percent">{percent}%</text>
        <text x="55" y="66" textAnchor="middle" className="pld__ring-label">Complete</text>
      </svg>
      <ChartTooltip visible={!!tip} x={tip?.x ?? 0} y={tip?.y ?? 0} anchor="above" onDismiss={() => setTip(null)}>
        <div className="chart-tooltip__value">{percent}% complete</div>
        {doneCount != null && totalCount != null && (
          <div className="chart-tooltip__label">{doneCount} of {totalCount} tasks done</div>
        )}
      </ChartTooltip>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function PillarLevelDashboard({ project, onSelectTask, selectedTaskId }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const level      = detectPillarLevel(project.id);
  const levelColor = LEVEL_COLORS[level] || '#64748b';

  const columns = project.columns || [];
  const doneColId     = columns.find((c) => c.id.endsWith('_done'))?.id ?? null;
  const progressColId = columns.find((c) => c.id.endsWith('_progress'))?.id ?? null;

  const { tasks, tagGroups, metrics } = useMemo(() => {
    const tasks = tasksByProject[project.id] || [];

    // Tag grouping
    const grouped = new Map();
    for (const task of tasks) {
      const primaryTag = task.tags?.[0] ?? 'General';
      if (!grouped.has(primaryTag)) grouped.set(primaryTag, []);
      grouped.get(primaryTag).push(task);
    }
    const PRIORITY_ORDER = { urgent: 0, high: 1, medium: 2, low: 3 };
    const byPriority = (a, b) =>
      (PRIORITY_ORDER[a.priority] ?? 4) - (PRIORITY_ORDER[b.priority] ?? 4);

    const tagGroups = [...grouped.entries()]
      .map(([tag, items]) => ({ tag, tasks: [...items].sort(byPriority) }))
      .sort((a, b) => b.tasks.length - a.tasks.length);

    // Metrics
    const doneTasks     = tasks.filter((t) => t.columnId === doneColId);
    const inProgress    = tasks.filter((t) => t.columnId === progressColId);
    const total         = tasks.length;
    const completedPct  = total > 0 ? Math.round((doneTasks.length / total) * 100) : 0;
    const urgentTasks   = tasks.filter((t) => t.priority === 'urgent' || t.priority === 'high');
    const urgentDone    = urgentTasks.filter((t) => t.columnId === doneColId);
    const criticalGaps  = urgentTasks.filter((t) => t.priority === 'urgent' && t.columnId !== doneColId);
    const totalSubs     = tasks.reduce((s, t) => s + (t.subtasks?.length ?? 0), 0);
    const doneSubs      = tasks.reduce((s, t) => s + (t.subtasks?.filter((st) => st.done).length ?? 0), 0);
    const subtaskPct    = totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : null;
    const weekAgo       = new Date(Date.now() - 7 * 86400000);
    const recentlyDone  = doneTasks.filter((t) => t.completedAt && new Date(t.completedAt) > weekAgo);
    const masteryCandidates = doneTasks.filter(
      (t) => t.subtasks?.length > 0 && t.subtasks.every((s) => s.done)
    );

    return {
      tasks,
      tagGroups,
      metrics: {
        total, completedPct, doneTasks, inProgress, urgentTasks, urgentDone,
        criticalGaps, totalSubs, doneSubs, subtaskPct, recentlyDone, masteryCandidates,
      },
    };
  }, [tasksByProject, project.id, doneColId, progressColId]);

  function getStatus(task) {
    if (task.columnId === doneColId)     return 'done';
    if (task.columnId === progressColId) return 'in-progress';
    return 'todo';
  }

  // Empty state
  if (tasks.length === 0) {
    return (
      <div className="pld__empty">
        <LayoutDashboard size={48} className="pld__empty-icon" />
        <span className="pld__empty-text">
          No tasks yet — switch to Board view to get started.
        </span>
      </div>
    );
  }

  const InsightCard =
    level === 'core'       ? FoundationHealthCard :
    level === 'growth'     ? GrowthMomentumCard   :
    level === 'excellence' ? MasteryDepthCard      : null;

  return (
    <div className="pld">
      {/* Task Grid */}
      <div className="pld__grid">
        {tagGroups.map(({ tag, tasks: groupTasks }) => {
          return (
            <div key={tag} style={{ display: 'contents' }}>
              {/* Section divider */}
              <div className="pld__divider">
                <span className="pld__divider-label">{capitalize(tag)}</span>
                <span className="pld__divider-count">{groupTasks.length} task{groupTasks.length !== 1 ? 's' : ''}</span>
              </div>
              {/* Task cards — full width, sorted by priority */}
              {groupTasks.map((task, i) => (
                selectedTaskId === task.id ? (
                  <InlineTaskDetail
                    key={task.id}
                    project={project}
                    projectId={project.id}
                    taskId={task.id}
                    levelColor={levelColor}
                    onClose={() => onSelectTask(null)}
                  />
                ) : (
                  <PillarTaskCard
                    key={task.id}
                    task={task}
                    index={i}
                    span={12}
                    status={getStatus(task)}
                    levelColor={levelColor}
                    onSelectTask={onSelectTask}
                  />
                )
              ))}
            </div>
          );
        })}

        {/* Level-specific insight panel */}
        {InsightCard && (
          <InsightCard metrics={metrics} levelColor={levelColor} />
        )}
      </div>

      {/* Footer */}
      <div className="pld__footer">
        <span className="pld__footer-meta">
          {level ? LEVEL_LABELS[level] : ''} · {project.name} · {metrics.total} tasks · {metrics.completedPct}% complete
        </span>
      </div>
    </div>
  );
}
