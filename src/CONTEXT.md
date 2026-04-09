# src/ — Building Room (Layer 2 Code Workspace)

## Factory Rules
- **Framework**: React 19 SPA — functional components, hooks only, no class components
- **State**: Zustand 5 stores with manual `safeGet`/`safeSet` localStorage persistence (no middleware)
- **Routing**: React Router 7 — all app routes in `App.jsx`, nested under `/app` with `AppShell` wrapper
- **Drag-drop**: dnd-kit (core + sortable) for Kanban boards
- **Icons**: Lucide React — import named icons, never hardcode SVG
- **Dates**: date-fns for formatting/calculation
- **IDs**: nanoid via `services/id.js` factories (`genProjectId()`, `genTaskId()`, etc.)
- **Styling**: CSS custom properties from `styles/tokens.css` — never hardcode colors or spacing
- **Path Aliases** (vite.config.js): `@` → `src/`, `@components`, `@pages`, `@store`, `@data`, `@hooks`, `@services`, `@styles` — always use these in imports
- **Persistence**: All stores use `safeSet`/`safeGetJSON` from `services/storage.js` (prefixed `bbiz_`)

## Sub-Workspace Routing

| If your task involves… | Go to | Read first |
|---|---|---|
| UI components (any module) | `components/` | `components/CONTEXT.md` (routes to specific module) |
| Page-level views, pillar dashboards, routing | `pages/` | `pages/CONTEXT.md` |
| Zustand stores, state shape, persistence | `store/` | `store/CONTEXT.md` |
| Static data (ayat, seed tasks, pillar content, modules) | `data/` | `data/CONTEXT.md` |
| Custom hooks or utility services | `hooks/` + `services/` | `hooks/CONTEXT.md` |
| Design tokens, global CSS, fonts | `styles/` | `styles/CONTEXT.md` |

## Naming Conventions
- **Components**: PascalCase (`KanbanBoard.jsx`)
- **Stores**: kebab-case with `-store` suffix (`task-store.js`)
- **Data files**: kebab-case descriptive (`faith-seed-tasks.js`)
- **CSS**: co-located, same name as component (`KanbanBoard.css`)
- **Hooks**: camelCase with `use` prefix (`useModuleProgress.js`)
- **Pages**: PascalCase, pillar prefix for sub-pages (`FaithSalahPage.jsx`)
