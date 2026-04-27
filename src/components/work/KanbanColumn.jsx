import { Plus, ChevronDown } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';
import { statusFromColumnId } from './dashboard-card-helpers';

export default function KanbanColumn({
  column,
  tasks,
  onSelectTask,
  selectedTaskId,
  onAddTask,
  bbosRole,
  draggable,
  collapsed,
  onToggleCollapsed,
}) {
  const { setNodeRef } = useDroppable({ id: column.id, disabled: !draggable });
  const status = statusFromColumnId(column.id);

  const handleHeaderKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleCollapsed?.();
    }
  };

  const cards = tasks.map((task, i) => (
    <KanbanCard
      key={task.id}
      task={task}
      index={i}
      status={status}
      onClick={() => onSelectTask(task.id)}
      isSelected={task.id === selectedTaskId}
      columnColor={column.color}
      bbosRole={bbosRole}
      draggable={draggable}
    />
  ));

  return (
    <div className={`kanban-column kanban-column--${status}`} style={{ '--col-color': column.color }}>
      <div
        className="kanban-column-header"
        role="button"
        tabIndex={0}
        aria-expanded={!collapsed}
        onClick={onToggleCollapsed}
        onKeyDown={handleHeaderKey}
      >
        <div className="kanban-column-title">
          <div className="kanban-column-dot" style={{ background: column.color }} />
          <span className="kanban-column-label">{column.name}</span>
        </div>
        <div className="kanban-column-header-right">
          <span className="kanban-column-count">{tasks.length}</span>
          <ChevronDown
            size={14}
            className={`kanban-column-chevron${collapsed ? ' kanban-column-chevron--collapsed' : ''}`}
          />
        </div>
      </div>

      <div className={`kanban-column-body-wrap${collapsed ? ' kanban-column-body-wrap--collapsed' : ''}`}>
        <div className="kanban-column-body" ref={setNodeRef}>
          {draggable ? (
            <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              {cards}
            </SortableContext>
          ) : (
            cards
          )}
          {tasks.length === 0 && (
            <div className="kanban-empty-state">Drop a task here</div>
          )}
        </div>
      </div>

      {!collapsed && (
        <div className="kanban-quickadd">
          <button className="kanban-quickadd-btn" onClick={onAddTask}>
            <Plus size={14} /> Add task
          </button>
        </div>
      )}
    </div>
  );
}
