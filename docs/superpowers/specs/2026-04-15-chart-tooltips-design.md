# Chart Tooltips Design Spec

**Date:** 2026-04-15
**Project:** MILOS V2.1
**Objective:** Add hover-over tooltips to all chart components, surfacing exact data values

---

## Decisions

| Decision | Choice |
|---|---|
| Trigger | Hover on desktop, tap-to-toggle on mobile |
| Positioning | Adaptive — floating-above for bar/ring charts, crosshair + floating for line charts |
| Visual style | Dark card matching IslamicTerm tooltip pattern |
| Architecture | Shared `ChartTooltip` component, portal-rendered |

---

## Shared Component: `ChartTooltip`

**Files:** `src/components/shared/ChartTooltip.jsx` + `ChartTooltip.css`

### Props

| Prop | Type | Description |
|---|---|---|
| `visible` | boolean | Show/hide the tooltip |
| `x` | number | Horizontal position (viewport pixels, from `getBoundingClientRect`) |
| `y` | number | Vertical position (viewport pixels) |
| `anchor` | `'above'` \| `'crosshair'` | Positioning mode |
| `children` | ReactNode | Tooltip content (each chart provides its own) |
| `crosshairTop` | number (optional) | Top edge of crosshair line, for `anchor="crosshair"` |
| `crosshairHeight` | number (optional) | Height of crosshair line |

### Rendering

- `createPortal(tooltip, document.body)` — same pattern as `IslamicTerm` tooltips
- `position: fixed` with JS-calculated `top`/`left`

### Positioning Modes

**`anchor="above"`** (bar charts, ring charts, gauges):
- Tooltip centered horizontally on `x`, positioned above `y` with 10px gap
- Down-pointing arrow/caret
- If less than 180px room above, flip below with up-pointing arrow

**`anchor="crosshair"`** (line charts):
- Vertical dashed line from `crosshairTop` spanning `crosshairHeight`
- Tooltip floats to the right of `x` with 12px offset
- If near right viewport edge, flip to left side
- Hovered data point gets enlarged radius (r=3 → r=5) + stroke ring

### Viewport Clamping

- Horizontal: clamp to 8px from viewport edges
- Vertical: flip direction if insufficient room (same logic as IslamicTerm)

### Interaction

**Desktop (hover):**
- `onMouseEnter` → show tooltip with position from `getBoundingClientRect()`
- `onMouseLeave` → hide after 50ms delay (prevents flicker between adjacent elements)
- 150ms CSS opacity fade (`--duration-sm`)

**Mobile (tap-to-toggle):**
- Detected via `@media (pointer: coarse)` or `'ontouchstart' in window`
- `onClick` on chart element toggles visibility
- Tap element → show; tap same element → dismiss
- Dismiss on outside tap: each chart adds a one-shot `document.addEventListener('pointerdown', dismiss)` when tooltip opens; removed on close
- Suppress hover events on touch devices via `pointer-events: none` on tooltip (tooltip is non-interactive)

### Styling (CSS)

```css
.chart-tooltip {
  position: fixed;
  z-index: 200;
  background: var(--bg2);
  border: 1px solid var(--border2);
  border-radius: var(--radius);
  padding: 10px 14px;
  box-shadow: var(--shadow);
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--duration-sm) var(--ease);
}
.chart-tooltip--visible {
  opacity: 1;
}
.chart-tooltip__value {
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--primary);
  font-family: var(--font-heading);
}
.chart-tooltip__label {
  font-size: var(--text-sm);
  color: var(--text2);
  margin-top: 2px;
}
.chart-tooltip__detail {
  font-size: var(--text-sm);
  color: var(--text3);
  margin-top: 2px;
}
.chart-tooltip__arrow { /* down-pointing caret for anchor="above" */ }
.chart-tooltip--below .chart-tooltip__arrow { /* up-pointing caret when flipped */ }
.chart-tooltip__crosshair {
  position: fixed;
  width: 1px;
  border-left: 1px dashed var(--primary-border);
  pointer-events: none;
  z-index: 199;
}
```

---

## Per-Chart Wiring

### 1. Money Bar Chart (MoneyDashboard.jsx)

- **Mode:** `above`
- **Hover target:** Each `.md-chart-stack` column div
- **Events:** `onMouseEnter` / `onMouseLeave` on each stack
- **Position:** center-x of the hovered stack, top of the tallest segment
- **Content:**
  ```
  Line 1: Month name (e.g. "Mar 2026")
  Line 2: Expenses: $X,XXX
  Line 3: Discretionary: $X,XXX
  Line 4 (conditional): Over budget: $XXX (in --danger color)
  ```
- **Data source:** `barData` array already has `month`, `expenses`, `discretionary`, `over` per entry

### 2. BCG Line Chart (Dashboard.jsx)

- **Mode:** `crosshair`
- **Hover target:** Each `<circle>` data point in the SVG
- **Events:** `onMouseEnter` / `onMouseLeave` on each `<circle>`
- **Position:** cx/cy of the circle (converted to viewport coords via SVG `getScreenCTM()`)
- **Crosshair:** Full height of the SVG viewBox
- **Content:**
  ```
  Line 1: N tasks (bold)
  Line 2: Day label (e.g. "Wed, Apr 9")
  ```
- **Data source:** `bcgData` array has `{ day, count }` per entry
- **Extra:** Enlarge hovered circle from r=3 to r=5, add stroke ring

### 3. Activity Chart (ActivityChart.jsx)

- **Mode:** `crosshair`
- **Hover target:** Each `<circle>` data point
- **Events:** `onMouseEnter` / `onMouseLeave` on each `<circle>`
- **Position:** cx/cy via `getScreenCTM()`
- **Crosshair:** Full SVG height
- **Content:**
  ```
  Line 1: N tasks (bold)
  Line 2: Day label
  ```
- **Data source:** `activityData` array with daily counts

### 4. Savings Donut (MoneyDashboard.jsx)

- **Mode:** `above`
- **Hover target:** The progress `<circle>` arc (the colored ring)
- **Events:** `onMouseEnter` / `onMouseLeave` on the arc circle
- **Position:** center of the SVG element
- **Content:**
  ```
  Line 1: XX% saved (bold)
  Line 2: Saved: $X,XXX
  Line 3: Spent: $X,XXX
  ```
- **Data source:** `income`, `expenses` from store; percentage already calculated

### 5. Mastery Rings (PillarLevelDashboard.jsx)

- **Mode:** `above`
- **Hover target:** The progress `<circle>` arc
- **Events:** `onMouseEnter` / `onMouseLeave` on the arc circle
- **Position:** center of the ring SVG
- **Content:**
  ```
  Line 1: XX% complete (bold)
  Line 2: N of M tasks done
  ```
- **Data source:** `pct`, `doneCount`, `totalCount` already available in MasteryRing component

### 6. Workflow Pressure (Dashboard.jsx)

- **Mode:** `above`
- **Hover target:** The `.wf-pressure__bars` container row
- **Events:** `onMouseEnter` / `onMouseLeave` on the container
- **Position:** center of the gauge row
- **Content:**
  ```
  Line 1: [Level] pressure (bold, colored by level)
  Line 2: N of 10 · X tasks in progress
  ```
- **Data source:** `pressureLevel`, `filledCount`, in-progress task count from store

### 7. Spending Limit Bar (MoneyDashboard.jsx)

- **Mode:** `above`
- **Hover target:** The `.md-limit-bar` progress bar
- **Events:** `onMouseEnter` / `onMouseLeave` on the bar
- **Position:** center of the bar element
- **Content:**
  ```
  Line 1: $X,XXX / $X,XXX (bold)
  Line 2: XX% of budget (or "XX% over budget" in --danger)
  ```
- **Data source:** current spending and budget total from store

### 8. Cost Analysis (MoneyDashboard.jsx)

- **Mode:** `above`
- **Hover target:** Each `.md-cost-row` category row
- **Events:** `onMouseEnter` / `onMouseLeave` on each row
- **Position:** center of the hovered row
- **Content:**
  ```
  Line 1: Category — XX% (bold)
  Line 2: $X,XXX of $X,XXX total
  ```
- **Data source:** category breakdown data already rendered in the component

---

## Tooltip Content Pattern

All tooltips follow a consistent 2-3 line structure:

| Line | Style | Purpose |
|---|---|---|
| **Line 1** | `--text-base`, bold, `--primary` color | Primary value or metric |
| **Line 2** | `--text-sm`, `--text2` color | Context label (date, category, description) |
| **Line 3** (optional) | `--text-sm`, `--text3` color | Breakdown or secondary metric |

---

## Files to Create

| File | Purpose |
|---|---|
| `src/components/shared/ChartTooltip.jsx` | Shared tooltip component |
| `src/components/shared/ChartTooltip.css` | Tooltip styles |

## Files to Modify

| File | Change |
|---|---|
| `src/components/money/MoneyDashboard.jsx` | Wire tooltips for bar chart, donut, spending limit, cost analysis |
| `src/pages/Dashboard.jsx` | Wire tooltips for BCG chart, workflow pressure |
| `src/components/dashboard/ActivityChart.jsx` | Wire tooltip for activity line chart |
| `src/components/work/PillarLevelDashboard.jsx` | Wire tooltip for mastery ring |

---

## Out of Scope

- Animated tooltip transitions beyond opacity fade
- Click-to-pin behavior
- Tooltip for the pillar dashboard ring charts in FaithLevelOverview / LevelOverviewPage (these are the same MasteryRing pattern — can be added later)
- JSX inline fontSize tokenization (separate task)
