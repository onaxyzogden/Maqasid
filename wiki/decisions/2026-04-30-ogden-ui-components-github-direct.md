---
title: "@ogden/ui-components — GitHub-direct release + MILOS wrapper adoption"
date: 2026-04-30
type: decision
status: accepted
---

# @ogden/ui-components — GitHub-direct release + MILOS wrapper adoption

## Context

`LevelNavigator`, `MaqasidComparisonWheel`, and their satellites
(`IslamicTerm`, `WheelWisdomTooltip`, `MaqasidNextActionCard`,
`wheelHoverStore`, `mithaqStore`, `useMilestoneWatcher`, `useMithaqHold`,
`arabic` utils) are needed by Atlas and Moontrance, not just MILOS. The
prior session extracted the 12 source files into a standalone Vite library
package at `C:\Users\MY OWN AXIS\Documents\ogden-ui-components\` with
MILOS coupling stripped (project/task/settings stores, `@hooks/`/`@store/`
aliases, `useArabic`, glossary lookups all removed); this session shipped
the package and adopted it in MILOS without disturbing ~60 import sites.

## Decisions

### 1. GitHub direct, not npm

The package installs via the `github:owner/repo#tag` URL syntax rather
than the npm registry:

```json
"@ogden/ui-components": "github:onaxyzogden/ogden-ui-components#v0.1.0"
```

**Why:** avoids needing an npm org, publish credentials, and 2FA flows
for what is currently a private ecosystem of three apps under the same
GitHub owner. If the package later becomes public-facing, npm publishing
can be added on top — the `dist/` build is already npm-ready.

### 2. Commit `dist/` to the repo

The `.gitignore` explicitly does **not** ignore `dist/`. The bundled
ESM/CJS/CSS artifacts are checked in.

**Why:** GitHub-pin installs run no build step on the consumer side. If
`dist/` weren't in the repo, every consumer would need a postinstall
build, which fragments the build environment and pulls dev-deps into
prod installs.

**How to apply:** any future contributor running `npm run build` in the
package repo must commit the resulting `dist/` change. A future CI step
could enforce this; for now it's a contributor convention.

### 3. MILOS adopts via wrapper pattern

The three MILOS-facing component paths
(`src/components/shared/LevelNavigator.jsx`,
`src/components/shared/IslamicTerm.jsx`,
`src/components/faith/MaqasidComparisonWheel.jsx`) become thin wrappers
that re-export the package component, injecting MILOS store data via
props.

**Why:** zero churn at ~60 call sites — none of them change. The
package stays "pure" (no MILOS coupling), MILOS injects context at the
boundary. Atlas and Moontrance will get their own wrappers when they
adopt.

**How to apply:**

- `LevelNavigator` wrapper imports `useProjectStore` + `useTaskStore`
  and derives `pillarTasks` for the active level (matching
  PillarLevelDashboard ordering: tag-group desc → priority asc).
  Maps `pillar.glossaryId` → `pillar.glossaryEntry`. Decorates
  `onSegmentClick` to preserve the BBOS gate scrollIntoView side
  effect. Always runs the package in controlled mode.
- `IslamicTerm` wrapper looks up `entry` via `getGlossaryEntry(id)` and
  reads `tooltipsEnabled` + `showDiacritics` from `useSettingsStore`.
- `MaqasidComparisonWheel` wrapper injects `showDiacritics` only.

### 4. Singleton stores re-exported (single-module-instance constraint)

The package's `wheelHoverStore`, `mithaqStore`, and the
`useMilestoneWatcher` / `useMithaqHold` hooks are singleton Zustand
stores. MILOS's `src/store/wheelHoverStore.js`, `src/store/mithaqStore.js`,
`src/hooks/useMilestoneWatcher.js`, and `src/hooks/useMithaqHold.js` are
collapsed to one-line re-exports from `@ogden/ui-components`.

**Why:** if MILOS code imported the MILOS copy and the package
component imported the package copy, they'd be two separate module
instances of the same Zustand store — cross-component hover sync and
press-and-hold ritual state would silently desync. Re-exporting forces
both paths to resolve to the same module instance.

**How to apply:** never duplicate a singleton store across the package
boundary. If the package owns the store, the MILOS path must
re-export, not redefine.

### 5. Vite `optimizeDeps.exclude: ['@ogden/ui-components']`

Added to MILOS `vite.config.js`.

**Why:** the package is built with React and react-router-dom
externalized as peers. When Vite pre-bundles the package, those
externalized peer references resolve to `null` at runtime, producing
"Invalid hook call" + "Cannot read properties of null (reading
'useContext')" errors — effectively a dual-React-instance bug. Excluding
the package from pre-bundling makes Vite serve the package's ESM
directly so externals resolve to MILOS's React/RR.

**How to apply:** any consumer (MILOS, Atlas, Moontrance) using Vite
must add this exclude. After adding it, also clear `node_modules/.vite`
and restart the dev server — Vite caches optimization results and
won't pick up the change otherwise.

## Persist key delta (accepted)

The package's `useMithaqStore` persists to localStorage key
`bbiz_ogden-mithaq` (was `bbiz_milos-mithaq` in MILOS pre-extraction).
Pre-existing covenant activations don't carry over, but they expire at
next Fajr (5 AM) anyway — worst case is one extra press-and-hold at
midday on adoption day.

## Verification

- `npm run build` (1.75s, no errors)
- `npm run lint` (8 pillars conformant, 3 ratchets at 0)
- `npm test` (56/56 pass)
- Browser smoke at `/app` (home dashboard with both wheel +
  LevelNavigator):
  - Wheel renders 7 sectors + center hub + Faith aura
  - LevelNavigator renders 7 segment columns with
    `fln__segment-col--hover-sync` state
  - Hovering Faith sector lights only the Faith segment in the
    LevelNavigator (singleton store working)
  - No console errors

## Files touched

**Package** (`onaxyzogden/ogden-ui-components`):
- `.gitignore` — removed `dist` line
- `.github/workflows/publish.yml` — deleted (npm-publish workflow no
  longer needed)
- `dist/` — committed (33 kB ESM, 24 kB CJS, 20 kB CSS)
- `README.md` — install instructions updated to GitHub-pin form
- Initial commit + `v0.1.0` tag pushed

**MILOS** (this worktree):
- `package.json` — added GitHub-pinned dependency
- `src/main.jsx` — added `import '@ogden/ui-components/style.css'`
- `vite.config.js` — added `optimizeDeps.exclude`
- `src/components/shared/LevelNavigator.jsx` — converted to wrapper
- `src/components/shared/IslamicTerm.jsx` — converted to wrapper
- `src/components/faith/MaqasidComparisonWheel.jsx` — converted to wrapper
- `src/store/wheelHoverStore.js` — one-line re-export
- `src/store/mithaqStore.js` — one-line re-export
- `src/hooks/useMilestoneWatcher.js` — one-line re-export
- `src/hooks/useMithaqHold.js` — one-line re-export
- Deleted (superseded by package):
  `src/components/faith/MaqasidComparisonWheel.css`,
  `MaqasidNextActionCard.{jsx,css}`,
  `WheelWisdomTooltip.{jsx,css}`,
  `wheelColor.js`,
  `src/components/shared/IslamicTerm.css`,
  `src/components/shared/LevelNavigator.css`

## Carry-forward

- Atlas + Moontrance adopt the same package via their own wrapper
  layers — out of scope for this session.
- If any third app needs `IslamicTerm` / `LevelNavigator` /
  `MaqasidComparisonWheel`, prefer importing from
  `@ogden/ui-components` directly and keep store wiring in the
  consumer.
