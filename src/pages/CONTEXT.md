# Pages — CONTEXT.md

## Purpose
70+ page components organized into pillar-based and domain-based subdirectories. Routes defined in App.jsx.

## Routing Table (subdirectories)

| Subdirectory | Content | CONTEXT.md |
|---|---|---|
| `faith/` | FaithDashboard + 8 sub-pages | `faith/CONTEXT.md` |
| `life/` | LifeDashboard + 4 sub-pages | `life/CONTEXT.md` |
| `intellect/` | IntellectDashboard + 4 sub-pages | `intellect/CONTEXT.md` |
| `family/` | FamilyDashboard + 4 sub-pages | `family/CONTEXT.md` |
| `wealth/` | WealthDashboard + 4 sub-pages | `wealth/CONTEXT.md` |
| `environment/` | EnvironmentDashboard + 4 sub-pages | `environment/CONTEXT.md` |
| `ummah/` | UmmahDashboard + Community, Neighbors, Collective, FamilyPage | `ummah/CONTEXT.md` |
| `islamic/` | FivePillars, QuranPage, HadithPage, IslamicKnowledgePage | `islamic/CONTEXT.md` |
| `modules/` | Work, Project, Money, People, Office, Tech, CRM | `modules/CONTEXT.md` |

## Root-Level Pages (stay here)
- `Dashboard.jsx` + `.css` — Main app dashboard (greeting, pillar cards, BCG chart)
- `Landing.jsx` — Public landing page
- `Onboarding.jsx` — New user onboarding
- `Settings.jsx` — App settings
- `PillarDashboard.jsx` + `.css` — Generic pillar reference table (4-column: Aspect | Necessities | Needs | Embellishments)
- `ModulePlaceholder.jsx` — Catch-all for unknown module routes

## Routing (defined in App.jsx)
- All app routes nested under `/app` (wrapped in AppShell + ProtectedRoute)
- Pillar dashboards: `/app/pillar/faith`, `/app/pillar/life`, etc.
- Sub-page routes: `/app/faith-salah`, `/app/life-physical`, etc.
- Business modules: `/app/work`, `/app/money`, `/app/people`, `/app/office`, `/app/tech`
- Project sub-routes: `/app/work/:projectId` with nested tabs
- Catch-all: `/app/pillar/:pillarId` → PillarDashboard
- Fallback: `/:moduleId` → ModulePlaceholder

## Common Dashboard Pattern
All pillar dashboards share identical structure:
1. **Header**: Module badge, title with `<IslamicTerm>`, Quranic verse, progress bar
2. **Hero card**: Background image, gradient, CTA button
3. **Three-tier bento grid**: Necessities (left) | Needs (top-right) | Excellence (bottom-right)
4. **Footer**: Copyright, decorative icons

## Store Dependencies
- `useThresholdStore` — ceremony completion tracking
- `useSettingsStore` — `valuesLayer` (islamic/universal), theme
- `useProjectStore` — project CRUD, `ensureFaithProjects()`, etc.
- `useTaskStore` — task loading
- Domain-specific stores for business modules
