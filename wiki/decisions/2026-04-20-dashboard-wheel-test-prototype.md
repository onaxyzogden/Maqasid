---
title: "Dashboard Wheel Test Prototype"
type: decision
date: 2026-04-20
status: accepted
tags: [dashboard, prototype, svg, ui, maqasid-comparison-wheel]
---

# Dashboard Wheel Test — Maqasid Comparison Wheel Prototype

## Context

User shared a dark-themed mockup of a radial "Maqasid Comparison Wheel" for the Faith pillar (5 segments: Shahada, Salah, Zakah, Siyam, Hajj) plus a "Path to Excellence" 3-card row (Foundation / Obligation / Aspiration). The intent is to explore a wheel-based alternative to the current Sanctuary dashboard — but not replace it until the user approves.

## Decision

Build as a standalone prototype module at `/app/dashboard-wheel-test` with its own sidebar entry (FlaskConical icon). Current `Dashboard.jsx` untouched. Promotion to primary dashboard is deferred pending explicit approval.

**Implementation:**

- Pure custom SVG — no charting library (codebase has none; Recharts would not handle the annular-sector + curved textPath layout cleanly).
- `MaqasidComparisonWheel.jsx` — three layers: hub (gold-ringed center with "FAITH" label), inner progress sectors (annular sectors HUB_R=56 → PROGRESS_MAX_R=142), outer colored label ring (LABEL_INNER_R=142 → LABEL_OUTER_R=184) with per-pillar `linearGradient` bands and curved `<textPath>` labels via `labelArcPath()` (flips direction in bottom half for upright text).
- **Center-origin gradient** (key fix): progress fills share one `radialGradient` with `gradientUnits="userSpaceOnUse"` + `cx={CX} cy={CY} r={PROGRESS_MAX_R}` so the light source sits at the wheel's center, not each segment's bounding box. Stops: `#7fe3d0 → #2f9a90 → #155553 → #0a2c30`.
- `PathToExcellenceCards.jsx` — 3 static cards with Sparkles/HandHeart/BookOpen icons and gold CTA buttons (non-functional stubs).
- Hardcoded placeholder data (`{ shahada: 100, salah: 95, zakah: 85, siyam: 90, hajj: 25 }`) — no store wiring in this prototype.

**Route wiring:** `src/App.jsx` direct (non-lazy) import + `<Route path="dashboard-wheel-test">` before the catch-all `:moduleId`. Sidebar link added below the pillar nav block.

## Rationale

- **Standalone prototype route** keeps the current Sanctuary dashboard stable while the wheel design iterates. CLAUDE.md rule: HTML-to-React conversions must be pixel-faithful — no "improvements" mid-flight.
- **Custom SVG over chart library** gives precise control over annular-sector geometry, curved `textPath` labels, and the center-origin gradient — which the user iterated on repeatedly.
- **`gradientUnits="userSpaceOnUse"`** was the load-bearing correction. Default `objectBoundingBox` produced a per-segment gradient (each sector lit individually); switching units + absolute cx/cy/r anchored the light at CX/CY so all segments share one wheel-centered glow.
- **No store wiring yet** — UI fidelity first; binding to a real pillars-score store is a follow-up.

## Consequences

- Users see a "Dashboard Wheel Test" entry in the sidebar flagged with FlaskConical (prototype signal).
- Current Dashboard and all existing behavior untouched.
- CTA buttons in Path to Excellence cards are non-functional — will need routing/action wiring if promoted.
- Only Faith pillar is represented; Life/Intellect/Family/Wealth/Environment/Ummah variants deferred.
- Promotion to primary dashboard requires separate explicit decision.

## Verification

Build + lint clean. Preview verified via `/app/dashboard-wheel-test` — curved pillar labels render upright in bottom half (labelArcPath flip), center-origin gradient reads as a single wheel-wide light source, segment widths match outer band widths, hub "FAITH" renders in Cinzel at weight 400 (not bold, per user preference). Iterative refinement across ~24 user messages until visual match was accepted.

**Commit:** `df3924b` — feat(prototype): add Dashboard Wheel Test — Maqasid Comparison Wheel. Pushed to main.

## Files

- `src/pages/prototypes/DashboardWheelTestPage.jsx` + `.css`
- `src/pages/prototypes/components/MaqasidComparisonWheel.jsx` + `.css`
- `src/pages/prototypes/components/PathToExcellenceCards.jsx` + `.css`
- `src/App.jsx` (route)
- `src/components/layout/Sidebar.jsx` (nav entry)

## Connections

- [[milos]] — host project
- [[2026-04-19-dashboard-sanctuary-mode]] — the current dashboard this prototype may eventually replace
