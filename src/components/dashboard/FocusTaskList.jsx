import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, CircleDashed, AlertTriangle } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { useProjectStore } from '../../store/project-store';
import { useThresholdStore } from '../../store/threshold-store';
import { MAQASID_PILLARS, getSubmoduleLabel } from '../../data/maqasid';
import './FocusTaskList.css';

function TaskRow({ task, project, accentColor, maintenance }) {
  const due = task.dueDate ? new Date(task.dueDate) : null;
  const overdue = task._maintenanceUrgent && due && due < new Date(new Date().toDateString());
  return (
    <Link
      to={`/app/work/${task.projectId}`}
      className={`ftl__row${overdue ? ' ftl__row--overdue' : ''}`}
      style={accentColor ? { '--ftl-accent': accentColor } : undefined}
    >
      <span className="ftl__dot" aria-hidden />
      <span className="ftl__title">{task.title}</span>
      {project && <span className="ftl__project">{project.name}</span>}
      {maintenance && overdue && (
        <span className="ftl__overdue" title="Overdue">
          <AlertTriangle size={12} />
        </span>
      )}
    </Link>
  );
}

const LEVEL_LABELS = {
  core: 'Level 1 · Foundation',
  growth: 'Level 2 · Growth',
  excellence: 'Level 3 · Excellence',
};

export default function FocusTaskList() {
  const niyyahSubmodule = useThresholdStore((s) => s.niyyahSubmodule);
  const niyyahFocus = useThresholdStore((s) => s.niyyahFocus);
  const niyyahLevel = useThresholdStore((s) => s.niyyahLevel);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const getFocusTasks = useTaskStore((s) => s.getFocusTasks);
  const getSubmoduleActiveLevel = useTaskStore((s) => s.getSubmoduleActiveLevel);
  const projects = useProjectStore((s) => s.projects);
  const [openMaintenance, setOpenMaintenance] = useState(false);

  const primaryPillarId = (niyyahFocus || []).find((id) => id && id !== '_skipped');
  const primaryPillar = MAQASID_PILLARS.find((p) => p.id === primaryPillarId) || null;

  const effectiveLevel = useMemo(
    () => niyyahLevel || (niyyahSubmodule ? getSubmoduleActiveLevel(niyyahSubmodule) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [niyyahLevel, niyyahSubmodule, tasksByProject],
  );

  const { deepWork, maintenance } = useMemo(
    () => getFocusTasks(niyyahSubmodule, effectiveLevel),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [niyyahSubmodule, effectiveLevel, tasksByProject],
  );

  if (!niyyahSubmodule || niyyahSubmodule === '_skipped') return null;

  const projectById = Object.fromEntries(projects.map((p) => [p.id, p]));
  const submoduleLabel = getSubmoduleLabel(niyyahSubmodule, primaryPillarId);
  const accent = primaryPillar?.accentColor ?? 'var(--accent)';
  const levelLabel = effectiveLevel ? LEVEL_LABELS[effectiveLevel] : null;

  return (
    <section className="ftl" style={{ '--ftl-accent': accent }}>
      <header className="ftl__header">
        <h3 className="ftl__title-row">
          <span className="ftl__eyebrow">Today&apos;s Deep Work</span>
          <span className="ftl__sub">{submoduleLabel}</span>
          {levelLabel && <span className="ftl__level">{levelLabel}</span>}
        </h3>
        <span className="ftl__count">{deepWork.length}</span>
      </header>

      {deepWork.length === 0 ? (
        <div className="ftl__empty">
          <CircleDashed size={14} />
          <span>No tasks tagged to {submoduleLabel} yet.</span>
          <Link to="/app/work" className="ftl__empty-cta">Create a focus task →</Link>
        </div>
      ) : (
        <div className="ftl__list">
          {deepWork.map((t) => (
            <TaskRow key={t.id} task={t} project={projectById[t.projectId]} accentColor={accent} />
          ))}
        </div>
      )}

      {maintenance.length > 0 && (
        <div className="ftl__maintenance">
          <button
            type="button"
            className="ftl__maintenance-toggle"
            onClick={() => setOpenMaintenance((v) => !v)}
            aria-expanded={openMaintenance}
          >
            {openMaintenance ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span>Keep the Lights On</span>
            <span className="ftl__count ftl__count--muted">{maintenance.length}</span>
          </button>
          {openMaintenance && (
            <div className="ftl__list ftl__list--muted">
              {maintenance.map((t) => (
                <TaskRow
                  key={t.id}
                  task={t}
                  project={projectById[t.projectId]}
                  maintenance
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
