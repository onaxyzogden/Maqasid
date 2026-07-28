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
| ProjectSlideUp.jsx | Read-only project popup (Kanban-style snapshot) opened from Prophetic Path surfaces. Uses `useFocusTrap`; panel carries `pp-slideup__panel--wide`. Currently has no live UI trigger (the node popup's projects view was dropped) but stays wired via `onSelectProject` |
| ProjectSlideUp.css | **The app-wide centered-popup chrome** — `.pp-slideup__root/backdrop/panel/header/…`. Root is centered flex (`justify-content/align-items: center`); panel is `width:min(92vw,620px)`, `height:auto; max-height:85vh`, radius 20, `pp-slideup-pop` entrance. `.pp-slideup__panel--wide` = `min(94vw,1100px)` × 88vh. Consumers: ProjectSlideUp, `islamic/SubmoduleSlideUp`, `islamic/NodePhaseSlideUp`, `orientation/OrientationSheet` — each layers overrides by importing its own CSS after this file |
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
- **`orderBoardTasks` is the ONE task comparator — never write `a.seedOrder - b.seedOrder` again.**
  It lives in [orientation-selector.js](../../data/orientation-selector.js) and every sorting surface
  imports it (KanbanBoard, ListView, StageSidebar, PillarLevelDashboard, ProjectBoard,
  BbosTaskPanel). Key = `seedOrder`, else `1e6 + (order ?? index)`, so **user-created tasks sort
  after the whole curated chain**. Ad-hoc copies using `seedOrder ?? order` put them *before* it and
  made the boards disagree with the orientation chain — that is exactly the bug
  [2026-07-27-milos-board-order-single-authority](../../../wiki/decisions/2026-07-27-milos-board-order-single-authority.md)
  closed. `BbosTaskPanel` keeps stage as the primary key by grouping → ordering each group → flattening.
- **Drag of a seeded card is column-only.** `moveTask` renumbers `order`, which `seedOrder` outranks,
  so a same-column reorder of a seeded task was a phantom that snapped back on the next render. It is
  now refused in `handleDragEnd` with a toast; **cross-column drag still works**. Order on seeded
  boards changes by editing `seq` in the seed file, not from the UI.
- **`position: fixed` does not escape `.pb-content__layer`** — that layer sets a `transform`, which
  makes it the containing block for fixed descendants (an identity matrix is enough). A fixed toast
  here rendered ~440 px below the fold. Use the shared `Toast` (`@store/toast-store`), which
  `createPortal`s to `<body>`.
- `ProjectSlideUp.css` is shared chrome — geometry changes there move ALL four popups (see file inventory). Consumer overrides win by import order at equal specificity, so renaming/splitting selectors breaks them silently
- Moving to "Done" column does NOT auto-set `completedAt` — component must handle this
- Gantt undated tasks render at bottom without bars
- View-only card opacity hardcoded to 0.55
- No concurrent drag support (single `activeId`)
