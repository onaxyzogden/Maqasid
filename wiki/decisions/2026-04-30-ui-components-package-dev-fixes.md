---
title: "ui-components package — dev-mode import fixes"
date: 2026-04-30
type: decision
status: closed
---

# ui-components package — dev-mode import fixes

## Context

The `feat(packages): extract ui-components package` commit (6c1fa29) extracted `LevelNavigator`, `MaqasidComparisonWheel`, and related files into `packages/ui-components/`. The follow-up refactor (71cba17) replaced the source copies with re-exports from `@ogden/ui-components/levelnav` and `@ogden/ui-components/wheel`.

The package's `package.json` exports point to `./dist/` which requires a build step (`vite build` inside `packages/ui-components/`). That build step was never run, so the dev server could not resolve the package and the app failed to mount entirely (silent — no Vite overlay, empty `#root`).

## Decision

Rather than adding a required build step to the dev workflow, add Vite `resolve.alias` entries in the root `vite.config.js` that map all `@ogden/ui-components/*` subpath imports directly to the package source files. This means the workspace package is processed by the same Vite pipeline as the main app with no separate compile step.

## Changes

### `vite.config.js`
Added five aliases:
```js
'@ogden/ui-components/levelnav' → packages/ui-components/src/components/levelnav/index.js
'@ogden/ui-components/wheel'    → packages/ui-components/src/components/wheel/index.js
'@ogden/ui-components/hooks'    → packages/ui-components/src/hooks/index.js
'@ogden/ui-components/stores'   → packages/ui-components/src/stores/index.js
'@ogden/ui-components'          → packages/ui-components/src/index.js
```

### Package source fixes (4 bugs from the extraction)

| File | Bug | Fix |
|---|---|---|
| `levelnav/LevelNavigator.jsx` | `../../../stores/` and `../../../services/` — one level too deep | `../../stores/` and `../../services/` |
| `levelnav/IslamicTerm.jsx` | `../../store/settings-store` doesn't exist in package | `@store/settings-store` (main app alias, resolved by Vite) |
| `hooks/useArabic.js` | `../store/settings-store` + `../utils/arabic` don't exist | `@store/settings-store` + `@/utils/arabic` |
| `wheel/MaqasidComparisonWheel.jsx` | `../../../hooks/` + `../../../stores/` — one level too deep | `../../hooks/` + `../../stores/` |
| `wheel/index.js` | `export { default as wheelColor }` but `wheelColor.js` has no default export | `export { deriveWheelPalette }` |

### Added file
`packages/ui-components/src/components/levelnav/IslamicTerm.css` — was missing from the package (copied from `src/components/shared/IslamicTerm.css`).

## Consequence

- Dev server starts cleanly with no build step for the package
- All `@store`, `@data`, `@/` aliases from the main app resolve correctly inside package sources (Vite processes them in the same pipeline)
- `npm run build` for the package itself still requires fixing these same paths in `vite.config.js` of the package — deferred until the package needs a standalone build
