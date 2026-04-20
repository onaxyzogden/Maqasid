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
import { MODULES } from '@data/modules';
import {
  buildTasksForNode,
  inferNodeFromHour,
  LEVEL_LABEL,
  LEVEL_FULL_LABEL,
} from '@data/prophetic-path-submodules';
import './PropheticPath.css';

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

const PRIORITY_LABEL = { urgent: 'Urgent', high: 'High', medium: 'Med', low: 'Low' };

function TaskRow({ task }) {
  return (
    <li className="pp-task-row">
      <span className="pp-task-level" data-level={task._level} title={LEVEL_FULL_LABEL[task._level]}>
        {LEVEL_LABEL[task._level]}
      </span>
      <span className="pp-task-priority" data-priority={task.priority} aria-hidden="true" />
      <div className="pp-task-main">
        <div className="pp-task-title" title={task.title}>{task.title}</div>
        <div className="pp-task-meta">
          <span className="pp-task-priority-label">{PRIORITY_LABEL[task.priority] || task.priority}</span>
          <span className="pp-task-sep">·</span>
          <span className="pp-task-submodule">{task._submoduleName}</span>
        </div>
      </div>
    </li>
  );
}

function MirrorCard({ node, tasks, mirrorSide }) {
  return (
    <aside className="pp-mirror-card" data-side={mirrorSide}>
      <div className="pp-mirror-header">
        <span className="pp-mirror-eyebrow">Now · {node.eyebrow}</span>
        <h4 className="pp-mirror-title">{node.title}</h4>
      </div>
      {tasks.length === 0 ? (
        <p className="pp-mirror-empty">No tasks queued for this window.</p>
      ) : (
        <ul className="pp-task-list">
          {tasks.map((t) => <TaskRow key={t.id} task={t} />)}
        </ul>
      )}
      <Link to="/app/work" className="pp-mirror-footer">
        <span>View all in Work</span>
        <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </aside>
  );
}

function TimelineNode({ node, isExpanded, onToggle, tasks }) {
  const { Icon, pulse } = node;
  const mirrorSide = node.side === 'left' ? 'right' : 'left';
  return (
    <div className="pp-node" data-side={node.side} data-expanded={isExpanded || undefined}>
      <div className="pp-marker" data-tone={node.markerTone}>
        <Icon className="pp-marker-icon" size={12} strokeWidth={2.25} />
      </div>
      <button
        type="button"
        className="pp-card"
        data-style={node.cardStyle}
        aria-expanded={isExpanded}
        aria-controls={`pp-mirror-${node.id}`}
        onClick={() => onToggle(node.id)}
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
      {isExpanded && (
        <div id={`pp-mirror-${node.id}`}>
          <MirrorCard node={node} tasks={tasks} mirrorSide={mirrorSide} />
        </div>
      )}
    </div>
  );
}

export default function PropheticPath({ variant }) {
  const appTheme = useSettingsStore((s) => s.theme);
  const theme = variant ?? appTheme ?? 'light';
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  const [expandedId, setExpandedId] = useState(() => inferNodeFromHour(new Date()));

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
      out[node.id] = buildTasksForNode(node.id, projects, tasksByProject, {
        limit: 8,
        submoduleNameById,
      });
    }
    return out;
  }, [projects, tasksByProject, submoduleNameById]);

  const toggleNode = (id) => setExpandedId((curr) => (curr === id ? null : id));

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
                  isExpanded={expandedId === node.id}
                  onToggle={toggleNode}
                  tasks={tasksByNode[node.id] || []}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
