import { useState, useMemo } from 'react';
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { useTaskStore } from '../../store/task-store';
import { getTaskAccessLevel } from '@data/bbos/bbos-role-access';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import './KanbanBoard.css';

export default function KanbanBoard({ project, onSelectTask, selectedTaskId, filters, bbosFilter, bbosRole, draggable }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const getFilteredTasks = useTaskStore((s) => s.getFilteredTasks);
  const createTask = useTaskStore((s) => s.createTask);
  const moveTask = useTaskStore((s) => s.moveTask);
  const [activeTask, setActiveTask] = useState(null);

  const allTasks = tasksByProject[project.id] || [];
  const filteredTasks = useMemo(
    () => getFilteredTasks(project.id, filters),
    [allTasks, filters, project.id, getFilteredTasks]
  );

  const tasks = useMemo(() => {
    if (!bbosRole || bbosRole === 'all') return filteredTasks;
    return filteredTasks.filter((t) => getTaskAccessLevel(bbosRole, t.bbosTaskType) !== '-');
  }, [filteredTasks, bbosRole]);

  const getTasksByColumn = (columnId) =>
    tasks.filter((t) => t.columnId === columnId).sort((a, b) =>
      draggable ? a.order - b.order : (a.seedOrder ?? a.order) - (b.seedOrder ?? b.order)
    );

  const handleAddTask = (columnId) => {
    const opts = bbosFilter ? { bbosStage: bbosFilter } : {};
    const task = createTask(project.id, columnId, 'Untitled', opts);
    onSelectTask(task.id);
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = ({ active }) => {
    setActiveTask(tasks.find((t) => t.id === active.id) || null);
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveTask(null);
    if (!over || active.id === over.id) return;
    const draggedTask = tasks.find((t) => t.id === active.id);
    if (!draggedTask) return;

    const overTask = tasks.find((t) => t.id === over.id);
    const overColumn = project.columns.find((c) => c.id === over.id);

    if (overTask) {
      const toColumnId = overTask.columnId;
      const colTasks = getTasksByColumn(toColumnId);
      const newOrder = colTasks.findIndex((t) => t.id === over.id);
      moveTask(project.id, active.id, toColumnId, Math.max(0, newOrder));
    } else if (overColumn) {
      const colTasks = getTasksByColumn(overColumn.id);
      moveTask(project.id, active.id, overColumn.id, colTasks.length);
    }
  };

  const columns = project.columns.map((col) => {
    const colTasks = getTasksByColumn(col.id);
    return (
      <KanbanColumn
        key={col.id}
        column={col}
        tasks={colTasks}
        onSelectTask={onSelectTask}
        selectedTaskId={selectedTaskId}
        onAddTask={() => handleAddTask(col.id)}
        bbosRole={bbosRole}
        draggable={draggable}
      />
    );
  });

  if (!draggable) {
    return <div className="kanban-board">{columns}</div>;
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="kanban-board">{columns}</div>
      <DragOverlay>
        {activeTask && (
          <KanbanCard
            task={activeTask}
            onClick={() => {}}
            isSelected={false}
            columnColor={project.columns.find((c) => c.id === activeTask.columnId)?.color}
            bbosRole={bbosRole}
            draggable={false}
            isOverlay
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
