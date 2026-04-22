---
title: "Faith Dashboard Wheel Promotion"
type: decision
date: 2026-04-21
status: accepted
supersedes: 2026-04-20-dashboard-wheel-test-prototype
tags: [dashboard, faith, maqasid-comparison-wheel, level-overview, svg]
---

# Faith Dashboard — Maqasid Comparison Wheel Promoted from Prototype

## Context

The Maqasid Comparison Wheel + Path to Excellence cards were shipped 2026-04-20 as a standalone prototype at `/app/dashboard-wheel-test` ([[2026-04-20-dashboard-wheel-test-prototype]]), hardcoded to demo data. The user wanted them promoted onto the real Faith module overview page, positioned **below the Level Navigator**, wired to live task-store progress, and **re-colored to match the currently selected level** — core gold `#C8A96E`, growth teal `#4ab8a8`, excellence purple `#8b5cf6`. The existing bento grid of submodule `MasteryRing` cards remains — the wheel is an addition, not a replacement.

## Decision

Integrate directly into the shared `LevelOverviewPage` via opt-in props rather than fork a Faith-specific page. Only Faith opts in for now; other pillars render unchanged.

**Prop surface on `LevelOverviewPage`:**
- `showComparisonWheel: boolean`
- `ComparisonWheelComponent: ReactComponent` (passed in — keeps the shared page decoupled from the Faith-specific wheel module)
- `wheelCenterLabel: string`
- `ExcellenceCardsComponent: ReactComponent`

**Render order inside `.flo`:** LevelNavigator → `.flo__wheel` (if opted-in) → `.flo__grid` (bento) → `.flo__excellence` (if provided).

**Data binding:** zero new selectors. The page already computes `const { progressMap } = useModulesProgress(moduleIds, level)` at line 83. The wheel receives `segments = pillars.map(p => ({ id: p.id, label: p.label, current: progressMap[p.id]?.pct ?? 0 }))` — same source the bento `MasteryRing` cards consume, so bento + wheel are in sync by construction.

**Wheel level-recolor:**
- New prop: `levelColor` (hex). The per-segment `color` field on `segments` was removed — the wheel now reflects one level's palette, not five pillar identities.
- Progress gradient: `#mcw-progress-grad` still uses `gradientUnits="userSpaceOnUse"` + `cx/cy/r` for center-origin lighting (retained from the prototype). Stops now derive from `levelColor` via opacity falloff: 1.0 → 0.85 → 0.55 → 0.25 at offsets 0% / 35% / 75% / 100%.
- Outer label band: collapsed the five per-pillar `linearGradient`s into one `mcw-band-level` linearGradient (0.95 → 0.65 opacity top-to-bottom on `levelColor`). Curved `<textPath>` submodule labels unchanged.
- Progress-sector stroke: hardcoded `#3fb0a3` replaced by `var(--mcw-level-color)`, wired via `style={{ '--mcw-level-color': levelColor }}` on the root `<svg>`.

**File moves:** `MaqasidComparisonWheel` + `PathToExcellenceCards` moved from `src/pages/prototypes/components/` to `src/components/faith/`. The `/app/dashboard-wheel-test` route, page files, and sidebar nav entry were deleted. The `FlaskConical` import in Sidebar was preserved because the Prophetic Path prototype still uses it.

## Rationale

- **Opt-in props on the shared page** keep the integration narrow — no duplicated layout code, no risk to Life/Intellect/Family/Wealth/Env/Ummah overviews, and future pillars can opt in with a single line.
- **Pass the wheel component as a prop** instead of importing it inside `LevelOverviewPage` — keeps the shared page decoupled from Faith-only assets and avoids forcing every pillar to load the wheel module.
- **Reuse `useModulesProgress`** (not a new selector) guarantees the wheel and bento rings report identical numbers — no risk of drift.
- **Single level-tinted band** replaces per-pillar ring colors because the wheel's role shifted from "compare five pillars" to "see one level's completion shape." Level identity dominates; submodule identity sits on the labels.

## Consequences

- Faith overview now shows wheel + bento + Path to Excellence at all three levels. Wheel recolors on tab change (gold → teal → purple) alongside segment-length updates.
- `/app/dashboard-wheel-test` no longer exists; the sidebar entry is gone.
- Other pillars untouched and continue to render bento-only.
- Path to Excellence CTAs ("Schedule & Track" / "Plan Giving" / "Plan Hajj") remain non-functional stubs — deferred.
- Any future pillar wanting a wheel can pass its own `ComparisonWheelComponent` + `ExcellenceCardsComponent` props. For Faith-only copy reasons, `PathToExcellenceCards` is still Faith-specific (Shahada/Salah, Zakah/Sawm, Hajj).

## Verification

Preview MCP screenshots captured at `/app/faith-core` (gold) and `/app/faith-excellence` (purple); `preview_eval` confirmed `--mcw-level-color` = `#C8A96E` / `#4ab8a8` / `#8b5cf6` at each of `faith-core` / `faith-growth` / `faith-excellence`. `/app/life-core` regression-checked — no wheel, no excellence cards. `npm run build` clean at 2691 modules. Lint: zero new errors (two flagged items are pre-existing `Icon` false-positives and useEffect dep warnings that existed before this change).

## Files Touched

Modified:
- `src/pages/shared/LevelOverviewPage.jsx` + `.css`
- `src/pages/faith/FaithLevelOverview.jsx`
- `src/App.jsx` (removed prototype route)
- `src/components/layout/Sidebar.jsx` (removed prototype nav link)

Moved:
- `src/pages/prototypes/components/MaqasidComparisonWheel.{jsx,css}` → `src/components/faith/`
- `src/pages/prototypes/components/PathToExcellenceCards.{jsx,css}` → `src/components/faith/`

Deleted:
- `src/pages/prototypes/DashboardWheelTestPage.{jsx,css}`
- `src/pages/prototypes/components/` directory

## Connections

- [[milos]] — host project
- [[2026-04-20-dashboard-wheel-test-prototype]] — superseded by this decision
- [[2026-04-19-dashboard-sanctuary-mode]] — the main `/app` Sanctuary dashboard remains untouched; promotion is a separate future decision
