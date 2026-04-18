---
title: "Chart Tooltips"
type: entity
domain: shared
---

# Chart Tooltips

Shared tooltip system for all chart components in MILOS. Portal-rendered via `createPortal` to `document.body`, following the same proven pattern as `IslamicTerm` glossary tooltips.

## Component Location
- JSX: `src/components/shared/ChartTooltip.jsx`
- CSS: `src/components/shared/ChartTooltip.css`
- Design spec: `docs/superpowers/specs/2026-04-15-chart-tooltips-design.md`
- Implementation plan: `docs/superpowers/plans/2026-04-15-chart-tooltips.md`

## Architecture

Single shared component, all charts pass their own `children` content.

**Props:**
| Prop | Type | Description |
|---|---|---|
| `visible` | boolean | Show/hide |
| `x` | number | Viewport X from `getBoundingClientRect()` |
| `y` | number | Viewport Y |
| `anchor` | `'above'` \| `'crosshair'` | Positioning mode |
| `children` | ReactNode | Tooltip content |
| `crosshairTop` | number? | Top of crosshair line |
| `crosshairHeight` | number? | Height of crosshair line |
| `onDismiss` | function? | Called on outside tap (mobile) |

## Anchor Modes

**`above`** — Used by bar charts, ring charts, gauges. Centered horizontally on target, floats above with 10px gap. Down-pointing arrow caret. Flips below if < 180px headroom.

**`crosshair`** — Used by line charts. Vertical dashed line spanning the SVG height. Tooltip floats right of target with 12px offset. Flips left near right viewport edge. Hovered data point enlarges.

## Charts Wired

| Chart | File | Mode | Content |
|---|---|---|---|
| Money bar chart | `MoneyDashboard.jsx` | above | Month, expenses, discretionary, over-budget |
| BCG line chart | `Dashboard.jsx` | crosshair | Task count, day label |
| Activity chart | `ActivityChart.jsx` | crosshair | Task count, day label |
| Savings donut | `MoneyDashboard.jsx` | above | % saved, saved amount, spent amount |
| Mastery ring | `PillarLevelDashboard.jsx` | above | % complete, tasks done/total |
| Workflow pressure | `Dashboard.jsx` | above | Pressure level, filled/10, in-progress count |
| Spending limit | `MoneyDashboard.jsx` | above | Amount/budget, % of/over budget |
| Cost analysis | `MoneyDashboard.jsx` | above | Category name, %, dollar amount |

## Interaction

- **Desktop:** `onMouseEnter` → show, `onMouseLeave` → hide, 150ms CSS opacity fade
- **Mobile:** `onClick` tap-to-toggle, outside-tap dismiss via one-shot `pointerdown` listener
- Touch detection: `'ontouchstart' in window`
- Tooltip has `pointer-events: none` (non-interactive)

## Styling

Uses design tokens: `--bg2`, `--border2`, `--radius`, `--shadow`, `--duration-sm`, `--ease`, `--primary`, `--primary-border`, `--text-base`, `--text-sm`, `--text2`, `--text3`, `--font-heading`. z-index: 200 (tooltip), 199 (crosshair).

## Status
Active. Implemented 2026-04-15. Covers all 8 chart types across Money, Dashboard, Activity, and Work modules.
