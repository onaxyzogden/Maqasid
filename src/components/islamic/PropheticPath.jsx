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
  HardHat,
  ArrowRight,
  BookOpen,
  Play,
} from 'lucide-react';
import { useSettingsStore } from '@store/settings-store';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { MODULES, PRIORITIES } from '@data/modules';
import {
  buildTasksForNode,
  buildProjectsForNode,
  getModuleGroups,
  inferNodeFromHour,
  LEVEL_LABEL,
  LEVEL_FULL_LABEL,
} from '@data/prophetic-path-submodules';
import DashboardTaskCard from '@components/shared/DashboardTaskCard';
import TaskDetailPanel from '@components/work/TaskDetailPanel';
import SubtaskSources from '@components/work/SubtaskSources';
import ProjectSlideUp from '@components/work/ProjectSlideUp';
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
    id: 'midday-labor',
    side: 'left',
    cardStyle: 'subtle',
    eyebrow: 'Midday Labor',
    eyebrowTone: 'secondary',
    title: 'Livelihood & Stewardship',
    titleTone: 'on-surface',
    body: 'The post-Dhuhr execution window. Earning rizq with ihsan and serving the community that surrounds the work.',
    pillars: [
      { label: 'Wealth', tone: 'secondary' },
      { label: 'Ummah', tone: 'secondary' },
    ],
    Icon: HardHat,
    markerTone: 'secondary',
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

function ProjectRow({ project, onClick }) {
  return (
    <button type="button" className="pp-project-row" onClick={() => onClick(project.id)}>
      <span className="pp-project-row__swatch" style={{ background: project.color || '#70d8c8' }} aria-hidden="true" />
      <span className="pp-project-row__name">{project.name}</span>
      <ArrowRight size={14} strokeWidth={2} className="pp-project-row__chev" />
    </button>
  );
}

function EducationList({ tasks }) {
  const withSources = (tasks || []).flatMap((t) =>
    (t.subtasks || [])
      .filter((s) => s && s.sources)
      .map((s) => ({ taskTitle: t.title, subtask: s, key: `${t.id}:${s.id || s.title}` })),
  );
  if (withSources.length === 0) {
    return <p className="pp-mirror-empty">No source material yet for this window.</p>;
  }
  return (
    <div className="pp-education-list">
      {withSources.map((row) => (
        <article key={row.key} className="pp-education-card">
          <header className="pp-education-card__header">
            <span className="pp-education-card__eyebrow">{row.taskTitle}</span>
            <h5 className="pp-education-card__title">{row.subtask.title}</h5>
          </header>
          <SubtaskSources subtask={row.subtask} />
        </article>
      ))}
    </div>
  );
}

function MirrorCard({
  node,
  tasks,
  projects,
  mirrorSide,
  onSelectTask,
  onSelectProject,
  phaseLabel = 'Now',
  viewMode,
  moduleGroups,
  moduleId,
  onViewMode,
  onModuleId,
  showProjects,
}) {
  return (
    <aside className="pp-mirror-card" data-side={mirrorSide}>
      <div className="pp-mirror-header">
        <span className="pp-mirror-eyebrow">{phaseLabel} · {node.eyebrow}</span>
        <h4 className="pp-mirror-title">{node.title}</h4>
        <div className="pp-mirror-toggles">
          {moduleGroups && moduleGroups.length > 1 && (
            <div className="pp-pill-switch" role="tablist" aria-label="Module">
              {moduleGroups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  role="tab"
                  aria-selected={moduleId === g.id}
                  className="pp-pill-switch__btn"
                  data-active={moduleId === g.id || undefined}
                  onClick={() => onModuleId(g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}
          <div className="pp-pill-switch" role="tablist" aria-label="View">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'action'}
              className="pp-pill-switch__btn"
              data-active={viewMode === 'action' || undefined}
              onClick={() => onViewMode('action')}
            >
              <Play size={12} strokeWidth={2.25} />
              Action
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'education'}
              className="pp-pill-switch__btn"
              data-active={viewMode === 'education' || undefined}
              onClick={() => onViewMode('education')}
            >
              <BookOpen size={12} strokeWidth={2.25} />
              Education
            </button>
          </div>
        </div>
      </div>
      {viewMode === 'education' ? (
        <EducationList tasks={tasks} />
      ) : showProjects ? (
        (projects || []).length === 0 ? (
          <p className="pp-mirror-empty">No projects in this scope yet.</p>
        ) : (
          <div className="pp-project-list">
            {projects.map((p) => (
              <ProjectRow key={p.id} project={p} onClick={onSelectProject} />
            ))}
          </div>
        )
      ) : (tasks.length === 0 ? (
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
      ))}
      <Link to="/app/work" className="pp-mirror-footer">
        <span>View all in Work</span>
        <ArrowRight size={14} strokeWidth={2} />
      </Link>
    </aside>
  );
}

function TimelineNode({
  node,
  expandedSlot,
  onToggle,
  projects,
  tasksByProject,
  submoduleNameById,
  onSelectTask,
  onSelectProject,
}) {
  const { Icon, pulse } = node;
  const mirrorSide = node.side === 'left' ? 'right' : 'left';
  const isExpanded = expandedSlot !== null;
  const mirrorId = `pp-mirror-${node.id}`;

  const moduleGroups = useMemo(() => getModuleGroups(node.id), [node.id]);
  const [moduleId, setModuleId] = useState(() => moduleGroups[0]?.id || null);
  const [viewMode, setViewMode] = useState('action');

  const phaseTasks = useMemo(() => {
    if (!isExpanded) return [];
    return buildTasksForNode(node.id, projects, tasksByProject, {
      limit: 8,
      submoduleNameById,
      phase: expandedSlot,
      moduleId,
    });
  }, [isExpanded, node.id, projects, tasksByProject, submoduleNameById, expandedSlot, moduleId]);

  const showProjects = node.id === 'midday-labor' && expandedSlot === 'main' && viewMode === 'action';
  const scopeProjects = useMemo(() => (
    showProjects ? buildProjectsForNode(node.id, projects, { moduleId }) : []
  ), [showProjects, node.id, projects, moduleId]);

  const handleSelectTask = (taskId) => {
    const row = phaseTasks.find((r) => r.id === taskId);
    if (row) onSelectTask(row);
  };

  const mirror = isExpanded ? (
    <div id={mirrorId}>
      <MirrorCard
        node={node}
        tasks={phaseTasks}
        projects={scopeProjects}
        mirrorSide={mirrorSide}
        onSelectTask={handleSelectTask}
        onSelectProject={onSelectProject}
        phaseLabel={slotLabel(expandedSlot)}
        viewMode={viewMode}
        moduleGroups={moduleGroups}
        moduleId={moduleId}
        onViewMode={setViewMode}
        onModuleId={setModuleId}
        showProjects={showProjects}
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
  // projectId for the slide-up overlay (null = closed)
  const [slideUpProjectId, setSlideUpProjectId] = useState(null);

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

  const toggleNode = (id, slot) => {
    setExpanded((curr) =>
      curr && curr.nodeId === id && curr.slot === slot ? null : { nodeId: id, slot }
    );
  };

  const openTask = (row) => {
    if (!row) { setSelectedTask(null); return; }
    setSelectedTask({
      taskId: row.id,
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
                  projects={projects}
                  tasksByProject={tasksByProject}
                  submoduleNameById={submoduleNameById}
                  onSelectTask={openTask}
                  onSelectProject={setSlideUpProjectId}
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
      {slideUpProjectId && (
        <ProjectSlideUp
          projectId={slideUpProjectId}
          onClose={() => setSlideUpProjectId(null)}
        />
      )}
    </div>
  );
}
