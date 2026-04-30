---
title: "Educational Layout Templates — MaqasidLevelOverview + PillarLevelPage extracted to @ogden/ui-components v0.3.0"
date: 2026-04-30
status: accepted
tags: [ogden-ui-components, extraction, educational, maqasid, pillar-level-page, maqasid-level-overview]
---

# Educational Layout Templates — extracted to @ogden/ui-components v0.3.0

## Context

Two UI surfaces in MILOS implement the standard "educational layout template":

1. **`MaqasidLevelOverview`** (`div.flo.flo--dashboard`) — the compact FLN level navigator + Maqasid Comparison Wheel on the main dashboard. Showed all 7 pillars at the current Daruriyyat/Hajiyyat/Tahsiniyyat tier with progress rings and submodule segment bars.
2. **`PillarLevelPage`** (`div.fpb-page-wrapper`) — the generic two-level layout used by every pillar's submodule pages. Compact FLN + cross-fading Kanban board + task detail panel slot.

Both components were fully self-contained with hardcoded MILOS store dependencies, making them unusable by Atlas or Moontrance.

The goal was to lift them into `@ogden/ui-components` as prop-driven, store-free components so that Atlas/Moontrance can mount the same pattern against their own data.

## Decision

### Scope — main entry (`.`), not a new subpath

These components are general Maqasid educational UI, not BBOS-specific. They belong in the main `@ogden/ui-components` export (alongside `LevelNavigator`, `MaqasidComparisonWheel`). Adding a subpath would fragment the import surface unnecessarily.

### Coupling strategy

Same pattern as the v0.1.0/v0.2.0 extractions:

- **Store coupling stripped via prop callbacks.** `MaqasidLevelOverview` receives `pillars`, `pillarTasks`, `progressMap`, `level`, callbacks (`onLevelChange`, `onSegmentClick`, `onSubsegClick`, `onReach100`), and an optional `storageKey`. `PillarLevelPage` receives data callbacks (`getProject`, `onMount`, `onBoardChange`) and render-props (`renderBoard`, `renderTaskPanel`, `renderAyahEffect`).
- **`useAyahBanner` lifecycle constraint.** This hook must remain inside a component body — its cleanup fires on unmount and governs banner timing on route changes. Moved to a null-rendering `<AyahBannerEffect>` component in the MILOS wrapper, passed into the package via `renderAyahEffect?({ boardPrefix, pillarKey }) → ReactNode`.
- **`localStorage` access.** Package implements its own two-line `localGet/localSet` inline (no dependency on MILOS's `@services/storage`).
- **`SkeletonCard`.** MILOS-private. Replaced with two inline `<div className="fpb-skeleton">` divs in the package's fallback — acceptable for Atlas/Moontrance; MILOS's wrapper never reaches the fallback in practice.

### CSS migration

`.flo*` (417 lines) and `.fpb-*` (60 lines) CSS namespaces moved into `ogden-ui-components.css`. The MILOS global `import '@ogden/ui-components/style.css'` in `main.jsx` already covered all consumers, so local CSS imports in `LevelOverviewPage.jsx` and `PrayerLevelPage.jsx` were removed.

### onBoardChange vs "reload all 3 levels when projects change"

The original `PillarLevelPage` had a `useEffect` that re-fired on every `projects` array change (to load tasks for all 3 levels when `ensureProjects` resolved async). The package's `onBoardChange` fires only when `boardId` changes. The `onMount(boardIds)` callback handles the initial async-seed case instead: MILOS calls `ensureProjectsFn()` then iterates `boardIds` against `useProjectStore.getState().projects` to load tasks for whichever boards already exist. This is equivalent behavior without coupling the package to the projects-array subscription pattern.

### Versioning

v0.3.0 — minor bump (additive, no breaking change to v0.1.0/v0.2.0 exports). Both new exports added to the main `src/index.js`.

## Consequences

- `MaqasidLevelOverview` and `PillarLevelPage` are now available to Atlas and Moontrance at `import { MaqasidLevelOverview, PillarLevelPage } from '@ogden/ui-components'`.
- MILOS wrappers (`src/components/dashboard/MaqasidLevelOverview.jsx` and `src/pages/shared/PillarLevelPage.jsx`) are thin data-injection layers; all existing call sites remain unchanged.
- The CSS namespace collision risk is low: `.flo*` and `.fpb-*` are scoped enough that Atlas/Moontrance can import `style.css` without conflict.
- `AyahBannerEffect` pattern (null-rendering component for hook lifecycle) is now established as the canonical way to pass side-effect hooks through a render-prop boundary.
