import { Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ column, tasks, onSelectTask, selectedTaskId, onAddTask, bbosRole, draggable }) {
  const { setNodeRef } = useDroppable({ id: column.id, disabled: !draggable });

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <div className="kanban-column-title">
          <div className="kanban-column-dot" style={{ background: column.color }} />
          {column.name}
          <span className="kanban-column-count">{tasks.length}</span>
        </div>
      </div>

      <div className="kanban-column-body" ref={setNodeRef}>
        {draggable ? (
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <KanbanCard
                key={task.id}
                task={task}
                onClick={() => onSelectTask(task.id)}
                isSelected={task.id === selectedTaskId}
                columnColor={column.color}
                bbosRole={bbosRole}
                draggable={draggable}
              />
            ))}
          </SortableContext>
        ) : (
          tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onClick={() => onSelectTask(task.id)}
              isSelected={task.id === selectedTaskId}
              columnColor={column.color}
              bbosRole={bbosRole}
              draggable={false}
            />
          ))
        )}
        {tasks.length === 0 && (
          <div className="kanban-empty-state">No tasks</div>
        )}
      </div>

      <div className="kanban-quickadd">
        <button className="kanban-quickadd-btn" onClick={onAddTask}>
          <Plus size={14} /> Add task
        </button>
      </div>
    </div>
  );
}
