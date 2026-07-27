# Pages — CONTEXT.md

## Purpose
70+ page components organized into pillar-based and domain-based subdirectories. Routes defined in App.jsx.

## Routing Table (subdirectories)

| Subdirectory | Content | CONTEXT.md |
|---|---|---|
| `faith/` | FaithDashboard + 8 sub-pages | `faith/CONTEXT.md` |
| `health/` | HealthDashboard + 4 sub-pages | `health/CONTEXT.md` |
| `intellect/` | IntellectDashboard + 4 sub-pages | `intellect/CONTEXT.md` |
| `family/` | FamilyDashboard + 4 sub-pages | `family/CONTEXT.md` |
| `wealth/` | WealthDashboard + 4 sub-pages | `wealth/CONTEXT.md` |
| `environment/` | EnvironmentDashboard + 4 sub-pages | `environment/CONTEXT.md` |
| `ummah/` | UmmahDashboard (social) + Neighbors, Community, CollectivePage, Moontrance sub-pages (legacy location) | `ummah/CONTEXT.md` |
| `moontrance/` | MoontraceDashboard + MoontraceLevelNavigator (pillar 8 — land/seasonal/residency) | — |
| `ogden/` | OGDEN Ecosystem meta-module (Foundation/Integration/Realization × BBOS·Maqasid·Atlas) | `ogden/CONTEXT.md` |
| `islamic/` | FivePillars, QuranPage, HadithPage, IslamicKnowledgePage | `islamic/CONTEXT.md` |
| `modules/` | Work, Project, Money, People, Office, Tech, CRM | `modules/CONTEXT.md` |

## Root-Level Pages (stay here)
- `Dashboard.jsx` + `.css` — Main app dashboard (greeting, pillar cards, BCG chart)
- `Landing.jsx` — Public landing page
- `Onboarding.jsx` — New user onboarding
- `Settings.jsx` — App settings
- `PillarDashboard.jsx` + `.css` — Generic pillar reference table (4-column: Aspect | Core | Growth | Excellence)
- `ModulePlaceholder.jsx` — Catch-all for unknown module routes
- `AuthPage.jsx` — **DORMANT.** Supabase sign-in / sign-up / magic-link form. Not imported by `App.jsx`; `/auth` redirects to `/get-started`
- `AccountPage.jsx` — **DORMANT.** Cloud account + sync management. Not imported by `App.jsx`; `/app/account` redirects to `/app/settings`

## Routing (defined in App.jsx)
- All app routes nested under `/app` (wrapped in AppShell + ProtectedRoute)
- Pillar dashboards: `/app/pillar/faith`, `/app/pillar/health`, … `/app/pillar/ummah`, `/app/pillar/moontrance`
- Sub-page routes: `/app/faith-salah`, `/app/health-physical`, etc.
- Business modules: `/app/work`, `/app/money`, `/app/people`, `/app/office`, `/app/tech`
- Project sub-routes: `/app/work/:projectId` with nested tabs
- Catch-all: `/app/pillar/:pillarId` → PillarDashboard
- Fallback: `/:moduleId` → ModulePlaceholder
- **There is no `*` 404 route.** An unmatched top-level path renders a blank white page — this is why the dormant `/auth` and `/app/account` paths use `<Navigate replace>` instead of being deleted outright

## Dormant: online accounts
`AuthPage` / `AccountPage` and the whole Supabase cloud-sync surface are switched off behind `CLOUD_ACCOUNTS_ENABLED = false` (`src/services/supabase.js`) — the backend isn't ready. `Landing.jsx`, `Onboarding.jsx` and `Settings.jsx` all branch on `cloudAccountsEnabled` (**not** `isSupabaseConfigured`, which now means "creds present" only and is never the right guard). Onboarding is 3 steps while off, 4 while on. Restore path and the full sync design: `wiki/decisions/2026-07-27-milos-disable-online-accounts.md`.

## Common Dashboard Pattern
All pillar dashboards share identical structure:
1. **Header**: Module badge, title with `<IslamicTerm>`, Quranic verse, progress bar
2. **Hero card**: Background image, gradient, CTA button
3. **Three-tier bento grid**: Core (left) | Growth (top-right) | Excellence (bottom-right)
4. **Footer**: Copyright, decorative icons

## Store Dependencies
- `useThresholdStore` — ceremony completion tracking
- `useSettingsStore` — `valuesLayer` (islamic/universal), theme
- `useProjectStore` — project CRUD, `ensureFaithProjects()`, etc.
- `useTaskStore` — task loading
- Domain-specific stores for business modules
