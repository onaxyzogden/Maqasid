# Work Module — CONTEXT.md

## Purpose
Project and task management with Kanban, List, and Gantt views. Uses dnd-kit for drag-and-drop.

## File Inventory
| File | Description |
|------|-------------|
| ProjectBoard.jsx | View-switching hub (board/list/gantt), manages filters and side panel |
| DashboardView.jsx | Overview dashboard for projects: task summary cards, audit score, recent activity |
| DashboardView.css | Dashboard grid layout, summary cards, audit score styles |
| PillarLevelDashboard.jsx | Pillar-scoped dashboard aggregating projects under a maqasid pillar |
| PillarLevelDashboard.css | Pillar dashboard layout, project cards, 3-star audit display |
| KanbanBoard.jsx | DndContext orchestrator with drag-drop across columns |
| KanbanColumn.jsx | Droppable column wrapper with sortable cards and quick-add |
| KanbanCard.jsx | Sortable task card with priority/due-date/subtask badges |
| ListView.jsx | Table view grouping tasks by column |
| ListView.css | Table view styles |
| GanttView.jsx | Timeline view with zoom controls (day/week/month) |
| GanttView.css | Gantt chart bar, timeline grid, zoom controls |
| FilterBar.jsx | Pill-based filter UI for priorities, due dates, tags |
| FilterBar.css | Filter pill styles, active states |
| TaskDetailPanel.jsx | Right-side panel for editing task details, subtasks, tags |
| TaskDetailPanel.css | Side panel slide-in, field layouts |
| PillarBoard.jsx | Board variant for pillar sub-pages (behind CeremonyGate) |
| PillarBoard.css | Pillar board layout |
| StageSidebar.jsx | Stage navigation sidebar for BBOS pipeline views |
| StageSidebar.css | Stage sidebar layout, active state highlights |

## Architecture
```
ProjectBoard
├── LevelNavigator (if BBOS enabled, with `gateIndicators` for 00A/01B patch stages)
├── FilterBar
├── DashboardView (default overview)
└── KanbanBoard | ListView | GanttView (switched by `view` state)
    └── TaskDetailPanel (when selectedTaskId set)

PillarLevelDashboard (pillar pages)
├── Project summary cards (3-star audit)
└── DashboardTaskCard (shared component)

StageSidebar (BBOS pipeline navigation)
```

## Store Dependencies
- **task-store**: `tasksByProject`, `getFilteredTasks`, `moveTask`, `createTask`, `updateTask`, `deleteTask`, `addSubtask`, `toggleSubtask`, `removeSubtask`
- **project-store**: `getProject`
- **app-store**: `filters[projectId]`, `setFilters`, `clearFilters`, `getActiveFilterCount`
- **auth-store**: `user` (assignee initials in TaskDetailPanel)

## Key Patterns
- **dnd-kit sensors**: PointerSensor (5px distance), TouchSensor (200ms delay, 5px tolerance)
- **Collision detection**: `pointerWithin` strategy
- **View-only cards**: `accessLevel === 'V'` disables drag via `useSortable({ disabled: true })`
- **Auto-save**: TaskDetailPanel debounces text inputs at 300ms
- **BBOS integration**: Tasks filterable by `bbosStage`; role access via `getTaskAccessLevel()`

## Common Tasks
- Add new view type → add case in ProjectBoard's view switch + ViewToggle options
- Add task field → update task-store shape + TaskDetailPanel form + KanbanCard display
- Change column behavior → modify KanbanColumn (droppable) + KanbanBoard drag handlers

## Gotchas
- Moving to "Done" column does NOT auto-set `completedAt` — component must handle this
- Gantt undated tasks render at bottom without bars
- View-only card opacity hardcoded to 0.55
- No concurrent drag support (single `activeId`)
