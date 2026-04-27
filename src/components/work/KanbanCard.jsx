import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PRIORITIES } from '../../data/modules';
import DashboardTaskCard from '../shared/DashboardTaskCard';
import { statusLabel, formatDue } from './dashboard-card-helpers';
import { getTaskAccessLevel } from '@data/bbos/bbos-role-access';

export default function KanbanCard({
  task,
  onClick,
  bbosRole,
  isSelected = false,
  columnColor,
  draggable,
  isOverlay,
  index = 0,
  status = 'todo',
}) {
  const accessLevel = getTaskAccessLevel(bbosRole, task.bbosTaskType);
  const isViewOnly = accessLevel === 'V';

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    disabled: !draggable,
  });

  const priority = PRIORITIES.find((p) => p.id === task.priority);
  const subtaskTotal = task.subtasks?.length || 0;
  const subtaskDone = subtaskTotal > 0 ? task.subtasks.filter((s) => s.done).length : 0;
  const due = formatDue(task.dueDate);
  const accentColor = columnColor || 'var(--accent)';

  const chips = [
    { label: statusLabel(status), className: `dtc__chip dtc__chip--status-${status}` },
    ...(priority
      ? [{ label: priority.label, className: 'dtc__chip dtc__chip--priority', style: { background: priority.bg, color: priority.color } }]
      : []),
    ...(task.bbosStage
      ? [{ label: task.bbosStage, className: 'dtc__chip', style: { background: 'var(--accent-bg)', color: 'var(--accent)', fontFamily: 'var(--font-mono)' } }]
      : []),
    ...(bbosRole && bbosRole !== 'all' && accessLevel === 'V'
      ? [{ label: 'VIEW', className: 'dtc__chip', style: { background: '#64748b18', color: '#64748b', fontWeight: 600, letterSpacing: '0.05em' } }]
      : []),
    ...(bbosRole && bbosRole !== 'all' && accessLevel === 'E'
      ? [{ label: 'EDIT', className: 'dtc__chip', style: { background: '#3b82f618', color: '#3b82f6', fontWeight: 600, letterSpacing: '0.05em' } }]
      : []),
  ];

  const dragStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : isViewOnly ? 0.55 : undefined,
    cursor: draggable ? 'grab' : isViewOnly ? 'default' : 'pointer',
    boxShadow: isOverlay ? 'var(--shadow-md)' : undefined,
    rotate: isOverlay ? '2deg' : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={dragStyle}
      className={`kanban-card-wrap${isSelected ? ' kanban-card-wrap--selected' : ''}`}
      {...(draggable ? attributes : {})}
      {...(draggable ? listeners : {})}
    >
      <DashboardTaskCard
        taskId={task.id}
        index={index}
        title={task.title}
        status={status}
        accentColor={accentColor}
        statusTint={status === 'in-progress'
          ? { background: 'color-mix(in srgb, #F59E0B 12%, var(--surface))' }
          : undefined}
        onSelectTask={draggable || isViewOnly ? undefined : onClick ? () => onClick() : undefined}
        chips={chips}
        subtasks={subtaskTotal > 0 ? { done: subtaskDone, total: subtaskTotal, color: accentColor } : undefined}
        dueDate={due}
        tags={task.tags?.slice(1)}
      />
    </div>
  );
}
