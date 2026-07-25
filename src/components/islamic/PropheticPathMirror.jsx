import { ArrowRight, BookOpen, Play } from 'lucide-react';
import { PRIORITIES } from '@data/modules';
import {
  submodulesForNode,
  LEVEL_LABEL,
  LEVEL_FULL_LABEL,
} from '@data/prophetic-path-submodules';
import {
  getSubmoduleDisplayLabel,
  getSubmodulePillarColor,
  getPillarSubmoduleIds,
} from '@data/submodule-registry';
import DashboardTaskCard from '@components/shared/DashboardTaskCard';
import { LEVEL_COLOR } from './prophetic-path-constants';

// Mirror content for a Prophetic Path node: the task list, project rows, and
// Action/Education switch. Extracted from `PropheticPath.jsx` so
// `NodePhaseSlideUp` can render the same surface inside its During tab without
// importing the page component back.

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

export function PPTaskCard({ task, index, onSelectTask }) {
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
        // Prayer-phase rows carry no _level — their board is keyed by window,
        // not by Maqasid level — so the chip is omitted rather than defaulted.
        ...(task._level != null ? [{
          label: `${LEVEL_LABEL[task._level]} · ${LEVEL_FULL_LABEL[task._level]}`,
          className: 'dtc__chip',
          style: { background: `color-mix(in srgb, ${levelColor} 14%, transparent)`, color: levelColor },
        }] : []),
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

export function ProjectRow({ project, onClick }) {
  return (
    <button type="button" className="pp-project-row" onClick={() => onClick(project.id)}>
      <span className="pp-project-row__swatch" style={{ background: project.color || '#70d8c8' }} aria-hidden="true" />
      <span className="pp-project-row__name">{project.name}</span>
      <ArrowRight size={14} strokeWidth={2} className="pp-project-row__chev" />
    </button>
  );
}

export function EducationList({ nodeId, moduleId, onSelectSubmodule }) {
  // Prefer the pillar's canonical submodule list (e.g., Wealth → all 4) when
  // moduleId is a registered pillar. Fall back to the node's moduleGroup scope
  // for non-pillar groups like 'community'.
  const pillarSubs = getPillarSubmoduleIds(moduleId);
  const submoduleIds = pillarSubs.length > 0 ? pillarSubs : submodulesForNode(nodeId, moduleId);
  if (!submoduleIds || submoduleIds.length === 0) {
    return <p className="pp-mirror-empty">No submodules for this window.</p>;
  }
  return (
    <div className="pp-project-list">
      {submoduleIds.map((id) => {
        const label = getSubmoduleDisplayLabel(id, id);
        const color = getSubmodulePillarColor(id);
        return (
          <button
            key={id}
            type="button"
            className="pp-project-row"
            onClick={() => onSelectSubmodule?.(id, label)}
          >
            <span
              className="pp-project-row__swatch"
              aria-hidden="true"
              style={{ background: color }}
            />
            <span className="pp-project-row__name">{label}</span>
            <ArrowRight size={14} strokeWidth={2} className="pp-project-row__chev" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

export function MirrorCard({
  node,
  tasks,
  projects,
  onSelectTask,
  onSelectProject,
  onSelectSubmodule,
  phaseLabel = 'Now',
  viewMode,
  moduleGroups,
  moduleId,
  onViewMode,
  onModuleId,
  showProjects,
}) {
  return (
    <aside className="pp-mirror-card">
      <div className="pp-mirror-header">
        <span className="pp-mirror-eyebrow">{phaseLabel} · {node.eyebrow}</span>
        <h4 className="pp-mirror-title">{node.title}</h4>
        <div className="pp-mirror-toggles">
          {moduleGroups && moduleGroups.length > 1 && (
            <div className="pp-pill-switch" role="tablist" aria-label="Objective">
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
        <EducationList nodeId={node.id} moduleId={moduleId} onSelectSubmodule={onSelectSubmodule} />
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
    </aside>
  );
}
