---
title: "MILOS tier vocabulary canon — Core / Growth / Excellence"
type: decision
date: 2026-07-27
status: active
---

# Tier vocabulary canon: Core / Growth / Excellence

## Context

Eight competing namings existed across MILOS for the same three growth tiers. A user moving from `/app/orientation` to a pillar navigator to a pillar dashboard saw **"Necessities"**, then **"Core Higher Objectives"**, then **"CORE · Level 1 · Necessities (Daruriyyat)"** — all naming one thing.

The eight sets: (A) the `@ogden/ui-components` vendor defaults + our `DEFAULT_LEVELS`, (B) `TIER_META` in `orientation-selector.js`, (C) `PillarDashboard` table headers, (D) `FocusTaskList.LEVEL_LABELS`, (E) `PillarLevelDashboard.LEVEL_LABELS`, (F) `Landing.jsx` prose, (G) the three Faith level pages, (H) `BBOS_NAV_LEVELS` — the last being a legitimate separate vocabulary for the BBOS pipeline, out of scope.

## Decision

**The canon is `Core` / `Growth` / `Excellence`.** The English label is now identical to the persisted code key (`core | growth | excellence`), which structurally removes the label-to-key divergence that let eight variants grow in the first place.

Where a label line already carried Arabic, it is retained in the form:

```
LEVEL 1 · CORE (DARURIYYAT)
LEVEL 2 · GROWTH (HAJIYYAT)
LEVEL 3 · EXCELLENCE (TAHSINIYYAT)
```

Transliteration standardises on the **double-y** forms. `orientation-selector.js`'s single-y `Hajiyat` / `Tahsiniyat` was the outlier and moved.

## Key finding: the vendor labels were always ours to set

`@ogden/ui-components` is not installed in the worktree — Node resolution walks up to the parent repo's copy, which is why builds succeed. Reading it:

```js
// dist/ogden-ui-components.es.js
function T({ …, levels: b, … }) { let … D = b || w, …
```

`w` is the package's baked-in `Core Higher Objectives / Growth Space / Embellishments`. **A `levels` prop overrides it.**

Our wrapper already built the right array but never forwarded it:

```js
// src/components/shared/LevelNavigator.jsx
const baseLevels = customLevels || DEFAULT_LEVELS;   // used for state…
levels={customLevels}                                // …but NOT forwarded
```

`customLevels` is `undefined` for all nine per-pillar navigators, so the package silently rendered its own vocabulary and our `DEFAULT_LEVELS.title` strings were **dead code**. Changing the forward to `levels={baseLevels}` made MILOS authoritative across nine navigators plus `MaqasidLevelOverview` — the widest naming surface in the app — with no upstream package change.

BBOS is unaffected by construction: it passes `levels={BBOS_NAV_LEVELS}` explicitly, and since `baseLevels = customLevels || DEFAULT_LEVELS`, that path is byte-identical to before.

## Explicitly not changed

- **Object keys and CSS class names** — `necessities` / `needs` / `embelishments` in `pillar-content.js`, `.pd-th--embelishments`, etc. These are identifiers, not copy. The `embelishments` typo is load-bearing on both sides; renaming it is a data-shape change, not a copy fix.
- **`BBOS_NAV_LEVELS`** (Think / Execute / …) — a separate, legitimate pipeline vocabulary.
- **Seeded `description` strings** in `modules.js` and `project-store.js` (e.g. `'Shahada: Necessities (Daruriyyat)'`). These persist into `localStorage` and **do render** ([DashboardView.jsx:173](src/components/work/DashboardView.jsx)). Changing them would diverge existing users from new ones — a migration question, deliberately left open.

## Why no migration was needed

Unlike the `life` → `health` rename ([[2026-04-27-milos-life-to-health-rename]]), which required `migrateLifeToHealth(projects)`, **English labels here are never identifiers.** Project ids are `{pillarId}_{moduleSlug}_{level}` with lowercase codes; `PillarLevelDashboard`'s `detectPillarLevel` matches `/_(core|growth|excellence)$/`; `src/services/storage.js` has no tier logic. No test asserts on any of these strings, and there is no i18n catalogue.

## Incidental fixes

- **`EMBELISHMENTS`** (missing an `l`) was rendering in two table headers.
- **`community-supported`** — the token banned by the 2026-05-04 CSRA erasure — was present in `FamilyDashboard.jsx`. It survived because MILOS has **no banned-terms linter**; [[2026-07-05-atlas-covenant-banned-terms-consolidation]] is Atlas-side only.

## Verified

`npm test` 94/94 · ESLint unchanged from baseline (1 pre-existing `Date.now()` purity error in `Orientation.jsx:42`) · `npm run build` clean. Live in preview: `faith-core`, `faith-excellence`, `health-growth` render Core / Growth / Excellence from our array with no clipping; `/app/orientation` reads Core / Excellence and Health / Community; zero console errors. Screenshots were unavailable (Browser pane not compositing) — verification was DOM measurement, not pixel inspection.

## Open follow-ups

1. **Six orphaned pillar dashboards.** `Faith|Health|Intellect|Family|Wealth|Environment Dashboard.jsx` have **zero consumers** — unrouted dead code. They were updated for consistency, but they are candidates for deletion.
2. **`community-supported agriculture (CSA)`** appears 4× in `environment-seed-tasks.js` as user-facing guidance. CSA is advance-purchase of a future harvest — the exact structure the CSRA erasure objected to on *bayʿ mā laysa ʿindak* grounds. Left untouched: this is a fiqh call, not a copy call.
3. **No banned-terms linter in MILOS** — worth porting from Atlas.
4. **Seeded description strings** (above) — needs a migration decision.
