---
title: "Icon registry — single source of truth for name → component mapping"
type: decision
date: 2026-04-22
status: accepted
---

# Icon registry — single source of truth for name → component mapping

## Context

`maqasid.js` and `modules.js` store icon references as strings (`icon: 'Shapes'`)
so the data files stay JSON-serializable. Every surface that renders those data
files needed a local `{ IconName: IconComponent }` map to resolve the string
back to a lucide-react component. Over time, 10 files accumulated their own
local maps:

- `src/components/layout/Sidebar.jsx` — two maps (`ICON_MAP` for submodules,
  `PILLAR_ICON_MAP` for parent pillars)
- `src/components/layout/MobileNav.jsx` (`PILLAR_ICONS`)
- `src/pages/Landing.jsx` (`PILLAR_ICON_MAP`)
- `src/pages/Onboarding.jsx` (`PILLAR_ICON_MAP`)
- `src/pages/TodayFocusSection.jsx` (`PILLAR_ICONS`)
- `src/components/dashboard/PillarCard.jsx` (`PILLAR_ICON_MAP`)
- `src/components/onboarding/PillarFirstEntry.jsx` (`ICON_MAP`)
- `src/components/work/TaskDetailPanel.jsx` (`ICON_MAP`)
- `src/components/islamic/CeremonyGate.jsx` (`ICON_MAP`)
- `src/pages/ModulePlaceholder.jsx` (`ICON_MAP`)

This pattern had a recurring failure mode: whenever an icon name changed in
the data layer (e.g. parent Ummah `Globe` → `Shapes`), a consumer whose
import list included the old name but whose local map didn't yet include
the new name would silently render a blank glyph. This bit us twice in
the [[2026-04-22-wheel-two-axis-color-and-wealth-icon-canon]] audit:

1. **First hit:** `Sidebar.jsx` dropped `Globe` from its import when the
   parent Ummah icon changed, not realizing `Globe` was simultaneously
   needed by the *submodule* `ICON_MAP` for the new `collective` glyph.
   Ummah and Neighbors sidebar items rendered blank until fixed in commit `48c2a45`.
2. **Latent risk:** Three other consumers (`TaskDetailPanel`, `CeremonyGate`,
   `ModulePlaceholder`) were also missing the Ummah + Wealth + Family
   icons from their local maps. Swept preventatively in `bd3aec2`.

Root cause: **10 duplicated, hand-maintained lookup tables.** Any icon-name
edit in `modules.js` had to be propagated to every map by hand, with no
compile-time enforcement that the maps stayed in sync.

## Decision

Consolidate all icon-name → component mapping into a single file:
**`src/data/icon-registry.js`**. Export one `ICON_REGISTRY` object covering
every icon name referenced by the data layer (parent pillars, submodules,
legacy names kept for backward compat with stored project data). Every
consumer now does:

```js
import { ICON_REGISTRY } from '@data/icon-registry';
const ICON_MAP = ICON_REGISTRY;  // or use directly
```

Also exports a `getIcon(name, fallback)` helper for ergonomic lookup with
an explicit fallback.

## Consequences

- **One place to edit.** Adding a new icon to `modules.js` now only
  requires adding it to `icon-registry.js`. All 10 consumers pick it up
  automatically.
- **Bundle size unchanged** (tree-shaking unaffected; same set of lucide
  imports are reachable, just routed through one module). Build went
  from 2748 → 2749 modules; gzipped bundle dropped slightly (2534 → 2533 kB)
  from reduced duplicate import statements.
- **TaskDetailPanel exception.** Keeps a local `LayoutGrid` extension
  because it's a fallback-for-any-unknown-module-icon use case, not a
  data-layer icon name. Pattern: `{ ...ICON_REGISTRY, LayoutGrid }`.
- **Sidebar's two-map distinction collapses.** The file previously
  maintained `ICON_MAP` (submodules) and `PILLAR_ICON_MAP` (parents) as
  separate objects with overlapping contents. With a single registry
  keyed by name, both map names now point to the same object — a
  consumer that only looks up parent names only uses those keys.
- **Legacy compat preserved.** `Kanban`, `Wallet`, `PiggyBank`, `Store`,
  `Share2`, `Hammer`, `CalendarHeart`, `GraduationCap`, `BarChart3`,
  `LayoutGrid`, `Boxes`, `UsersRound`, `BookOpen`, `ScrollText`,
  `Mountain`, `Building`, `CirclePile` still registered for any stored
  project data that references them.

## Out of scope

- Migration to direct `ICON_REGISTRY[name]` inline lookup (removing the
  `const ICON_MAP = ICON_REGISTRY` alias) — low-value churn.
- Converting `maqasid.js` / `modules.js` to store `import`ed components
  directly — would break JSON-serializability and has no clear win.
- A codegen step that derives the registry from `maqasid.js` +
  `modules.js` — useful but not justified by current size (8 modules,
  ~40 icons).

## Files touched

- **New:** `src/data/icon-registry.js` (sole source of truth).
- **Refactored:** the 10 consumers listed above — each lost its local
  import block (keeping only direct-JSX-usage icons) and its hand-written
  map, replaced by `import { ICON_REGISTRY } ...`.

## Verification

- `npm run build` clean (2749 modules).
- Spot-check: Ummah sidebar items render `Globe` / `MapPin` / `Users`;
  Family `home` renders `HouseHeart`; Wealth submodules render
  `CircleFadingArrowUp` / `ChessKnight` / `Scale` / `GitPullRequestCreateArrow`.
- Future-proof: adding a new icon name to `modules.js` without touching
  any consumer now renders it correctly on every surface.
