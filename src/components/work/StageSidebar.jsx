import { useMemo } from 'react';
import { Inbox } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { BBOS_STAGES } from '../../data/bbos/bbos-pipeline';
import './StageSidebar.css';

const PRI_COLORS = {
  urgent: 'var(--pri-urgent)',
  high:   'var(--pri-high)',
  medium: 'var(--pri-medium)',
  low:    'var(--pri-low)',
};

export default function StageSidebar({ projectId, project, stageId, selectedTaskId, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const tasks = useMemo(() => {
    const all = tasksByProject[projectId] || [];
    return all
      .filter((t) => t.bbosStage === stageId)
      .sort((a, b) => (a.seedOrder ?? a.order ?? 0) - (b.seedOrder ?? b.order ?? 0));
  }, [tasksByProject, projectId, stageId]);

  const stage = useMemo(
    () => BBOS_STAGES.find((s) => s.id === stageId),
    [stageId]
  );

  const colMap = useMemo(
    () => Object.fromEntries((project.columns || []).map((c) => [c.id, c])),
    [project.columns]
  );

  const now = new Date();

  return (
    <div className="stage-sidebar">
      {/* Header */}
      <div className="stage-sidebar__header">
        <div className="stage-sidebar__title-row">
          <span
            className="stage-sidebar__stage-dot"
            style={{ background: stage?.color || 'var(--primary)' }}
          />
          <span className="stage-sidebar__stage-label">
            {stage?.label || stageId}
          </span>
        </div>
        <span className="stage-sidebar__count">{tasks.length}</span>
      </div>

      {/* Task list or empty state */}
      {tasks.length > 0 ? (
        <div className="stage-sidebar__list">
          {tasks.map((task) => {
            const isSelected = task.id === selectedTaskId;
            const col = colMap[task.columnId];
            const isOverdue = task.dueDate && new Date(task.dueDate) < now && !task.completedAt;
            let dueLabel = null;
            if (task.dueDate) {
              const d = new Date(task.dueDate);
              dueLabel = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            }

            const colColor = col?.color;
            const bgStyle = !isSelected && colColor
              ? { background: `color-mix(in srgb, ${colColor} 10%, var(--surface))` }
              : undefined;

            return (
              <button
                key={task.id}
                className={`stage-sidebar__item${isSelected ? ' stage-sidebar__item--selected' : ''}`}
                style={bgStyle}
                onClick={() => onSelectTask(task.id)}
              >
                <span
                  className="stage-sidebar__pri-dot"
                  style={{ background: PRI_COLORS[task.priority] || 'var(--text3)' }}
                />
                <span className="stage-sidebar__body">
                  <span className="stage-sidebar__task-title">{task.title}</span>
                  <span className="stage-sidebar__meta">
                    {col && (
                      <span className="stage-sidebar__col-badge">{col.name}</span>
                    )}
                    {dueLabel && (
                      <span className={`stage-sidebar__due${isOverdue ? ' stage-sidebar__due--overdue' : ''}`}>
                        {dueLabel}
                      </span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="stage-sidebar__empty">
          <Inbox size={28} className="stage-sidebar__empty-icon" />
          <span className="stage-sidebar__empty-text">
            No tasks in {stage?.label || stageId}
          </span>
        </div>
      )}
    </div>
  );
}
