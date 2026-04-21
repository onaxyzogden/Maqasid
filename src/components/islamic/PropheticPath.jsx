import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Moon,
  Sparkles,
  Sunrise,
  Briefcase,
  Sun,
  SunMedium,
  Sunset,
  ArrowRight,
} from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { MODULES, PRIORITIES } from '@data/modules';
import {
  buildTasksForNode,
  inferNodeFromHour,
  LEVEL_LABEL,
  LEVEL_FULL_LABEL,
} from '@data/prophetic-path-submodules';
import DashboardTaskCard from '@components/shared/DashboardTaskCard';
import TaskDetailPanel from '@components/work/TaskDetailPanel';
import './PropheticPath.css';

// Maqasid level → accent colour (mirrors PillarLevelDashboard.LEVEL_COLORS).
const LEVEL_COLOR = { 1: '#C8A96E', 2: '#4ab8a8', 3: '#8b5cf6' };

function statusLabel(s) {
  return s === 'done' ? 'Done' : s === 'in-progress' ? 'In Progress' : 'To Do';
}

function deriveStatus(task) {
  const cols = task._project?.columns || [];
  const doneCol = cols.find((c) => c.id.endsWith('_done'))?.id;
  const progressCol = cols.find((c) => c.id.endsWith('_progress'))?.id;
  if (task.columnId === doneCol) return 'done';
  if (task.columnId === progressCol) return 'in-progress';
  return 'todo';
}

function formatDue(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const days = Math.ceil((d - now) / 86400000);
  if (days < 0) return { text: 'Overdue', colorVar: 'var(--danger)' };
  if (days === 0) return { text: 'Today', colorVar: 'var(--warning)' };
  if (days <= 3) return { text: `${days}d`, colorVar: 'var(--warning)' };
  return { text: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), colorVar: 'var(--text3)' };
}

const NODES = [
  {
    id: 'isha',
    side: 'right',
    cardStyle: 'muted',
    eyebrow: 'Late Night',
    eyebrowTone: 'variant',
    title: 'Isha & Rest',
    titleTone: 'on-surface',
    body: 'Preparation for the final third of the night. A time of stillness and surrender.',
    pillars: [{ label: 'Faith', tone: 'secondary' }],
    Icon: Moon,
    markerTone: 'muted',
  },
  {
    id: 'tahajjud',
    side: 'left',
    cardStyle: 'divine',
    eyebrow: 'Divine Moment',
    eyebrowTone: 'tertiary',
    title: 'Tahajjud',
    titleTone: 'tertiary',
    body: 'The sacred dialogue in the depths of night. Seeking profound guidance.',
    pillars: [
      { label: 'Soul', tone: 'tertiary' },
      { label: 'Faith', tone: 'tertiary' },
    ],
    Icon: Sparkles,
    markerTone: 'tertiary',
    pulse: true,
  },
  {
    id: 'fajr',
    side: 'right',
    cardStyle: 'primary',
    eyebrow: 'Dawn',
    eyebrowTone: 'primary',
    title: 'Fajr Prayers',
    titleTone: 'on-surface',
    body: 'The start of the spiritual day. Greeting the light with remembrance.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Life', tone: 'secondary' },
    ],
    Icon: Sunrise,
    markerTone: 'primary',
  },
  {
    id: 'morning',
    side: 'left',
    cardStyle: 'subtle',
    eyebrow: 'Morning',
    eyebrowTone: 'secondary',
    title: 'Official Start of Day',
    titleTone: 'on-surface',
    body: 'Engagement with the world. Productivity, work, and social affairs.',
    pillars: [
      { label: 'Intellect', tone: 'secondary' },
      { label: 'Wealth', tone: 'secondary' },
    ],
    Icon: Briefcase,
    markerTone: 'secondary',
  },
  {
    id: 'dhuhr',
    side: 'right',
    cardStyle: 'primary',
    eyebrow: 'Mid-day',
    eyebrowTone: 'primary',
    title: 'Dhuhr Prayers',
    titleTone: 'on-surface',
    body: 'A spiritual reset amidst the hustle. Realignment with primary purpose.',
    pillars: [{ label: 'Faith', tone: 'primary' }],
    Icon: Sun,
    markerTone: 'primary',
  },
  {
    id: 'asr',
    side: 'left',
    cardStyle: 'primary-flat',
    eyebrow: 'Afternoon',
    eyebrowTone: 'primary',
    title: 'Asr Prayers',
    titleTone: 'on-surface',
    body: 'Continued focus and wrapping up daily worldly duties.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Life', tone: 'secondary' },
    ],
    Icon: SunMedium,
    markerTone: 'primary',
  },
  {
    id: 'maghrib',
    side: 'right',
    cardStyle: 'primary',
    eyebrow: 'Sunset',
    eyebrowTone: 'primary',
    title: 'Maghrib Prayers',
    titleTone: 'on-surface',
    body: 'Transitioning from work to family. The close of the active day.',
    pillars: [
      { label: 'Faith', tone: 'primary' },
      { label: 'Family', tone: 'secondary' },
    ],
    Icon: Sunset,
    markerTone: 'primary',
  },
];

function PPTaskCard({ task, index, onSelectTask }) {
  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const status = deriveStatus(task);
  const levelColor = LEVEL_COLOR[task._level] || LEVEL_COLOR[3];
  const subtaskTotal = task.subtasks?.length || 0;
  const subtaskDone = subtaskTotal > 0 ? task.subtasks.filter((s) => s.done).length : 0;

  return (
    <DashboardTaskCard
      taskId={task.id}
      index={index}
      title={task.title}
      span={12}
      status={status}
      accentColor={levelColor}
      statusTint={status === 'in-progress'
        ? { background: 'color-mix(in srgb, #F59E0B 12%, var(--surface))' }
        : undefined}
      onSelectTask={onSelectTask}
      chips={[
        {
          label: `${LEVEL_LABEL[task._level]} · ${LEVEL_FULL_LABEL[task._level]}`,
          className: 'dtc__chip',
          style: { background: `color-mix(in srgb, ${levelColor} 14%, transparent)`, color: levelColor },
        },
        { label: statusLabel(status), className: `dtc__chip dtc__chip--status-${status}` },
        ...(priority ? [{
          label: priority.label,
          className: 'dtc__chip dtc__chip--priority',
          style: { background: priority.bg, color: priority.color },
        }] : []),
      ]}
      subtasks={subtaskTotal > 0
        ? { done: subtaskDone, total: subtaskTotal, color: levelColor }
        : undefined}
      dueDate={formatDue(task.dueDate)}
      tags={[task._submoduleName, ...(task.tags?.slice(1) || [])]}
    />
  );
}

function MirrorCard({ node, tasks, mirrorSide, selectedTaskId, onSelectTask, phaseLabel = 'Now' }) {
  return (
    <aside className="pp-mirror-card" data-side={mirrorSide}>
      <div className="pp-mirror-header">
        <span className="pp-mirror-eyebrow">{phaseLabel} · {node.eyebrow}</span>
        <h4 className="pp-mirror-title">{node.title}</h4>
      </div>
      {tasks.length === 0 ? (
        <p className="pp-mirror-empty">No tasks queued for this window.</p>
      ) : (
        <div className="pp-task-list">
          {tasks.map((t, i) => (
            <PPTaskCard
              key={t.id}
              task={t}
              index={i}
              onSelectTask={onSelectTask}
            />
          ))}
        </div>
      )}
      <Link to="/app/work" className="pp-mirror-footer">
        <span>View all in Work</span>
        <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </aside>
  );
}

function TimelineNode({ node, expandedSlot, onToggle, tasks, selectedTaskId, onSelectTask }) {
  const { Icon, pulse } = node;
  const mirrorSide = node.side === 'left' ? 'right' : 'left';
  const isExpanded = expandedSlot !== null;
  const mirrorId = `pp-mirror-${node.id}`;
  const phaseTasks = tasks?.[expandedSlot] || [];
  const mirror = isExpanded ? (
    <div id={mirrorId}>
      <MirrorCard
        node={node}
        tasks={phaseTasks}
        mirrorSide={mirrorSide}
        selectedTaskId={selectedTaskId}
        onSelectTask={onSelectTask}
        phaseLabel={slotLabel(expandedSlot)}
      />
    </div>
  ) : null;
  return (
    <div className="pp-node" data-side={node.side} data-expanded={isExpanded || undefined}>
      <div className="pp-marker" data-tone={node.markerTone}>
        <Icon className="pp-marker-icon" size={12} strokeWidth={2.25} />
      </div>
      <div className="pp-node-stack">
        <button
          type="button"
          className="pp-satellite"
          data-slot="before"
          aria-expanded={expandedSlot === 'before'}
          aria-controls={mirrorId}
          onClick={() => onToggle(node.id, 'before')}
        >
          Before
        </button>
        {expandedSlot === 'before' && mirror}
        <button
          type="button"
          className="pp-card"
          data-style={node.cardStyle}
          aria-expanded={expandedSlot === 'main'}
          aria-controls={mirrorId}
          onClick={() => onToggle(node.id, 'main')}
        >
          {node.cardStyle === 'divine' && <div className="pp-card-glow" aria-hidden="true" />}
          <div className="pp-card-hover" aria-hidden="true" />
          <div className="pp-card-body">
            <span className="pp-eyebrow" data-tone={node.eyebrowTone}>
              {pulse && <span className="pp-pulse-dot" aria-hidden="true" />}
              {node.eyebrow}
            </span>
            <h3 className="pp-title" data-tone={node.titleTone}>
              {node.title}
            </h3>
            <p className="pp-body-text">{node.body}</p>
            <div className="pp-pillars">
              {node.pillars.map((p, i) => (
                <span key={i} className="pp-pillar-chip" data-tone={p.tone}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>
        </button>
        {expandedSlot === 'main' && mirror}
        <button
          type="button"
          className="pp-satellite"
          data-slot="after"
          aria-expanded={expandedSlot === 'after'}
          aria-controls={mirrorId}
          onClick={() => onToggle(node.id, 'after')}
        >
          After
        </button>
        {expandedSlot === 'after' && mirror}
      </div>
    </div>
  );
}

function slotLabel(slot) {
  if (slot === 'before') return 'Before';
  if (slot === 'after') return 'After';
  return 'Now';
}

export default function PropheticPath({ variant }) {
  const appTheme = useSettingsStore((s) => s.theme);
  const theme = variant ?? appTheme ?? 'light';
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  const [expanded, setExpanded] = useState(() => ({ nodeId: inferNodeFromHour(new Date()), slot: 'main' }));
  // { taskId, project, projectId, levelColor } | null
  const [selectedTask, setSelectedTask] = useState(null);

  // Hydrate tasks for all relevant projects once on mount. The task store
  // lazily loads tasks per project — ensure every project referenced in the
  // TOD mapping has its tasks in memory so the mirror card isn't empty.
  useEffect(() => {
    (projects || []).forEach((p) => {
      if (!tasksByProject[p.id]) loadTasks(p.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects]);

  const submoduleNameById = useMemo(() => {
    const map = {};
    MODULES.forEach((m) => { map[m.id] = m.name; });
    return map;
  }, []);

  const tasksByNode = useMemo(() => {
    const out = {};
    for (const node of NODES) {
      out[node.id] = {
        before: buildTasksForNode(node.id, projects, tasksByProject, {
          limit: 8,
          submoduleNameById,
          phase: 'before',
        }),
        main: buildTasksForNode(node.id, projects, tasksByProject, {
          limit: 8,
          submoduleNameById,
          phase: 'main',
        }),
        after: buildTasksForNode(node.id, projects, tasksByProject, {
          limit: 8,
          submoduleNameById,
          phase: 'after',
        }),
      };
    }
    return out;
  }, [projects, tasksByProject, submoduleNameById]);

  const toggleNode = (id, slot) => {
    setExpanded((curr) =>
      curr && curr.nodeId === id && curr.slot === slot ? null : { nodeId: id, slot }
    );
  };

  // Build a flat { taskId → task-row } lookup so clicking any card can pass the
  // right project + level into TaskDetailPanel.
  const taskById = useMemo(() => {
    const map = {};
    for (const phases of Object.values(tasksByNode)) {
      for (const rows of Object.values(phases)) {
        for (const r of rows) map[r.id] = r;
      }
    }
    return map;
  }, [tasksByNode]);

  const openTask = (taskId) => {
    if (!taskId) { setSelectedTask(null); return; }
    const row = taskById[taskId];
    if (!row) return;
    setSelectedTask({
      taskId,
      project: row._project,
      projectId: row.projectId,
      levelColor: LEVEL_COLOR[row._level] || LEVEL_COLOR[3],
    });
  };

  return (
    <div className="prophetic-path" data-theme={theme}>
      <main className="pp-main">
        <div className="pp-ambient pp-ambient--teal" aria-hidden="true" />
        <div className="pp-ambient pp-ambient--gold" aria-hidden="true" />

        <div className="pp-content">
          <div className="pp-timeline-col">
            <div className="pp-intro">
              <h2 className="pp-heading">The Prophetic Path</h2>
              <p className="pp-subheading">A daily rhythm anchored in sacred intention.</p>
            </div>

            <div className="pp-spine">
              {NODES.map((node) => (
                <TimelineNode
                  key={node.id}
                  node={node}
                  expandedSlot={expanded && expanded.nodeId === node.id ? expanded.slot : null}
                  onToggle={toggleNode}
                  tasks={tasksByNode[node.id] || []}
                  selectedTaskId={selectedTask?.taskId || null}
                  onSelectTask={openTask}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      {selectedTask?.project && (
        <TaskDetailPanel
          project={selectedTask.project}
          projectId={selectedTask.projectId}
          taskId={selectedTask.taskId}
          onClose={() => setSelectedTask(null)}
          bbosRole={selectedTask.project.bbosRole || 'all'}
          accentColor={selectedTask.levelColor}
        />
      )}
    </div>
  );
}
