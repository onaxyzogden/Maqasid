---
title: "Unified Module Dashboard Template"
type: decision
created: 2026-04-22
tags: [architecture, ui, module-dashboards, level-overview, comparison-wheel]
---

# Unified Module Dashboard Template

## Context

Prior to this change, each Maqasid module dashboard had drifted into its own layout:

- **Faith** used a clean template — `FaithLevelNavigator` + `FaithLevelOverview` thin-wrapper + per-level routed pages (Core / Growth / Excellence). The route's `levelColor` flowed down to `MaqasidComparisonWheel` which derived its OKLCH palette from that hex.
- **Life / Intellect / Family / Wealth / Environment** rendered `ModuleWheelSection` above `LevelOverviewPage`. That wrapper carried its own in-page level toggle (`useState`-driven), which *duplicated* the LevelNavigator and meant the wheel recoloured from local state, not from the route.
- **Ummah / Moontrance** were bespoke dashboards with a hero, submodule cards, and Frameworks collapsibles — no wheel, no template alignment.

Yousef's directive: *"Consider this (Faith Module) page as the global template for the module main page. Apply it to LIFE … ensuring consistent layout. The goal is to have every single module main page uniform."*

## Decision

All eight module dashboards now share **one** template, rendered by `src/pages/shared/LevelOverviewPage.jsx` via per-module thin wrappers:

```
LevelNavigator (compact)
  → MaqasidComparisonWheel (levelColor-driven)
    → Bento grid of pillar cards with MasteryRings
      → <Module>PathToExcellenceCards (Foundation / Obligation / Aspiration tiers)
        → IstiqamahToast host
```

Each module has three files in the same shape as Faith:

- `src/pages/<module>/<Module>LevelNavigator.jsx` — exports `<MODULE>_PILLARS`, `<MODULE>_LEVEL_ROUTES`, `<MODULE>_STORAGE_KEY`, `<MODULE>_ENSURE_PROJECTS`; default export is the compact LevelNavigator.
- `src/pages/<module>/<Module>LevelOverview.jsx` — thin wrapper taking `{ level, levelColor }`; composes `LevelOverviewPage` with `showComparisonWheel`, `wheelCenterLabel`, `pillarWisdom`, `nextActions`, and an `ExcellenceCardsComponent`.
- `src/components/<module>/<Module>PathToExcellenceCards.jsx` — the three-tier card block. Reuses Faith's `PathToExcellenceCards.css` (`.pte-*` classes) by import — zero CSS duplication.

The three per-level pages (`<Module>CorePage.jsx` / `<Module>GrowthPage.jsx` / `<Module>ExcellencePage.jsx`) each reduce to:
```jsx
<<Module>LevelOverview level="<core|growth|excellence>" levelColor={MODULE_PALETTE.<module>.<level]} />
```

### Level colors

`src/data/module-palette.js` is the single source of truth. Each module has `{ core, growth, excellence }` hexes. The wheel's OKLCH palette derives from whichever hex the route supplies — so the same component recolors per level without any in-page state.

### Ummah and Moontrance

These two modules still have only one dashboard route (`/app/pillar/ummah`, `/app/pillar/moontrance`); their `<MODULE>_LEVEL_ROUTES` all map to the same path, so LevelNavigator renders three pills that are visual-only for now. The unified template is applied as-is; legacy sections (Frameworks, Milestones, OLOS Bridge) are moved **below** the template into a `.ummah-dash--appendix` container that inherits `.flo` horizontal padding for visual continuity.

### Cross-fade on navigation

`AppShell.jsx` previously had `<main key={location.key}>` which force-remounted the entire main subtree on every navigation — the blank frame between unmount and mount defeated any transition attempt. That key was removed. All level-switch and pillar-drill navigations in `LevelOverviewPage` and the wheel now use React Router 7's `navigate(path, { viewTransition: true })`, which triggers the browser's View Transitions API. CSS in `LevelOverviewPage.css` drives a 260 ms opacity crossfade via `::view-transition-old(root)` / `::view-transition-new(root)`, with `prefers-reduced-motion` fallback. Browsers without View Transitions support degrade to instant swap.

## Files Touched

**New (per module):**
- `src/pages/<module>/<Module>LevelNavigator.jsx` — Life, Intellect, Family, Wealth, Environment
- `src/pages/<module>/<Module>LevelOverview.jsx` — Life, Intellect, Family, Wealth, Environment, Ummah, Moontrance
- `src/components/<module>/<Module>PathToExcellenceCards.jsx` — Life, Intellect, Family, Wealth, Environment, Ummah, Moontrance

**Refactored:**
- `src/pages/<module>/<Module>CorePage.jsx` — reduced to thin wrapper; re-exports the `<MODULE>_*` constants for submodule pages and `submodule-registry.js` to keep resolving named imports.
- `src/pages/<module>/<Module>GrowthPage.jsx` + `<Module>ExcellencePage.jsx` — reduced to the same one-line render.
- `src/pages/ummah/UmmahDashboard.jsx`, `src/pages/moontrance/MoontraceDashboard.jsx` — reduced to thin wrappers; Hero + old submodule-cards sections dropped (bento grid replaces them).

**Shared machinery:**
- `src/components/faith/MaqasidComparisonWheel.jsx` — generalized with `pillarWisdom` and `nextActions` props (null-safe; Faith supplies its own real data, other modules pass stubs).
- `src/components/shared/ModuleWheelSection.jsx` — kept on disk but no longer used by any module. Safe to delete in a follow-up.
- `src/data/module-palette.js` — now contains all eight modules including `moontrance`.
- `src/data/pillar-wisdom.js` + `src/data/pillar-next-actions.js` — stub entries for every module; `moontrance` added.
- `src/pages/shared/LevelOverviewPage.{jsx,css}` — navigate calls gained `{ viewTransition: true }`; CSS gained `::view-transition-*` crossfade.
- `src/components/layout/AppShell.jsx` — removed `key={location.key}` on `<main>` that was defeating the view transition.

## Rationale

- **Single source of truth:** level color, pillar wisdom, and next-actions all live in `src/data/*.js` tables — change one hex, all three Life routes recolor.
- **Uniform UX:** every pillar now reads the same way — LevelNavigator, wheel, bento, Path-to-Excellence. Users learn the layout once.
- **Route-driven level state:** the URL is the level; no in-page toggle duplicates the navigator. Back-button works naturally.
- **Zero-cost fallback for Ummah/Moontrance:** they get the template today without requiring per-level boards yet. Adding level routes later is an additive change.

## Follow-ups

- Delete `src/components/shared/ModuleWheelSection.jsx` — no remaining consumers.
- Per-module content sprint for real pillar wisdom (ayahs) and next-action strings. Stub copy is labeled "Reflection coming soon" via the `stub()` helper in both data files.
- Ummah / Moontrance: decide whether to introduce real core/growth/excellence level boards (seed tasks already exist with `ummah_moontrance-land_core` etc. prefixes).

## Connections

- [[milos]] — all dashboards affected
- [[faith-dashboard-wheel-promotion]] (2026-04-21) — the Faith template this rollout mirrors
