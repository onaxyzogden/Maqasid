# Chart Tooltips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add hover-over tooltips to all 8 chart components, surfacing exact data values via a shared portal-rendered `ChartTooltip` component.

**Architecture:** A single shared `ChartTooltip` component renders via `createPortal` to `document.body` (same proven pattern as `IslamicTerm.jsx`). It supports two positioning modes: `above` (bar/ring/gauge charts) and `crosshair` (line charts with vertical dashed line). Each chart wires mouse/touch events to show/hide the tooltip with its own content.

**Tech Stack:** React 19, `createPortal`, CSS custom properties (existing design tokens), `getBoundingClientRect()` / `getScreenCTM()` for positioning.

---

## File Structure

| File | Purpose |
|---|---|
| **Create:** `src/components/shared/ChartTooltip.jsx` | Shared tooltip component with portal rendering, two anchor modes, viewport clamping |
| **Create:** `src/components/shared/ChartTooltip.css` | Tooltip styles using existing design tokens |
| **Modify:** `src/components/money/MoneyDashboard.jsx` | Wire tooltips for bar chart, savings donut, spending limit bar, cost analysis rows |
| **Modify:** `src/pages/Dashboard.jsx` | Wire tooltips for BCG line chart and workflow pressure gauge |
| **Modify:** `src/components/dashboard/ActivityChart.jsx` | Wire tooltip for activity line chart |
| **Modify:** `src/components/work/PillarLevelDashboard.jsx` | Wire tooltip for mastery ring |

---

### Task 1: Create ChartTooltip Component + CSS

**Files:**
- Create: `src/components/shared/ChartTooltip.jsx`
- Create: `src/components/shared/ChartTooltip.css`

- [ ] **Step 1: Create `ChartTooltip.css`**

```css
/* ── Chart Tooltip (portal-rendered) ── */

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
  max-width: 220px;
}
.chart-tooltip--visible {
  opacity: 1;
}

/* Content lines */
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

/* Down-pointing arrow for anchor="above" */
.chart-tooltip__arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 10px;
  height: 10px;
  background: var(--bg2);
  border-right: 1px solid var(--border2);
  border-bottom: 1px solid var(--border2);
  transform: translateX(-50%) rotate(45deg);
}

/* Up-pointing arrow when flipped below */
.chart-tooltip--below .chart-tooltip__arrow {
  bottom: auto;
  top: -6px;
  border-right: none;
  border-bottom: none;
  border-left: 1px solid var(--border2);
  border-top: 1px solid var(--border2);
}

/* Crosshair vertical dashed line */
.chart-tooltip__crosshair {
  position: fixed;
  width: 1px;
  border-left: 1px dashed var(--primary-border);
  pointer-events: none;
  z-index: 199;
  opacity: 0;
  transition: opacity var(--duration-sm) var(--ease);
}
.chart-tooltip__crosshair--visible {
  opacity: 1;
}
```

Write this file to `src/components/shared/ChartTooltip.css`.

- [ ] **Step 2: Create `ChartTooltip.jsx`**

```jsx
import { createPortal } from 'react-dom';
import './ChartTooltip.css';

const MIN_ABOVE = 180;
const EDGE_PAD = 8;

/**
 * ChartTooltip — shared tooltip rendered via portal to document.body.
 *
 * Props:
 *   visible      boolean       Show/hide the tooltip
 *   x            number        Horizontal position (viewport px, from getBoundingClientRect)
 *   y            number        Vertical position (viewport px)
 *   anchor       'above'|'crosshair'   Positioning mode
 *   children     ReactNode     Tooltip content (each chart provides its own)
 *   crosshairTop    number (optional)  Top edge of crosshair line (for anchor="crosshair")
 *   crosshairHeight number (optional)  Height of crosshair line
 */
export default function ChartTooltip({
  visible,
  x,
  y,
  anchor = 'above',
  children,
  crosshairTop,
  crosshairHeight,
}) {
  if (!visible) return null;

  // Determine if we need to flip below (for "above" mode)
  const flipped = anchor === 'above' && y < MIN_ABOVE;

  // Calculate tooltip position
  let style = {};
  if (anchor === 'above') {
    // Center horizontally on x, above y with 10px gap (or below if flipped)
    style = {
      left: Math.max(EDGE_PAD, Math.min(x, window.innerWidth - EDGE_PAD)),
      transform: 'translateX(-50%)',
      ...(flipped
        ? { top: y + 10 }
        : { bottom: window.innerHeight - y + 10 }),
    };
  } else {
    // Crosshair mode — float to the right of x with 12px offset
    const nearRightEdge = x > window.innerWidth - 200;
    style = {
      top: Math.max(EDGE_PAD, y - 30),
      ...(nearRightEdge
        ? { right: window.innerWidth - x + 12 }
        : { left: x + 12 }),
    };
  }

  const className = [
    'chart-tooltip',
    visible && 'chart-tooltip--visible',
    flipped && 'chart-tooltip--below',
  ].filter(Boolean).join(' ');

  return createPortal(
    <>
      <div className={className} style={style}>
        {children}
        {anchor === 'above' && <div className="chart-tooltip__arrow" />}
      </div>
      {anchor === 'crosshair' && crosshairTop != null && crosshairHeight != null && (
        <div
          className={`chart-tooltip__crosshair${visible ? ' chart-tooltip__crosshair--visible' : ''}`}
          style={{
            left: x,
            top: crosshairTop,
            height: crosshairHeight,
          }}
        />
      )}
    </>,
    document.body,
  );
}
```

Write this file to `src/components/shared/ChartTooltip.jsx`.

- [ ] **Step 3: Verify the build compiles**

Run: `npm run build`
Expected: Build succeeds (ChartTooltip is not imported anywhere yet, so it's tree-shaken out, but the file should be valid JSX).

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/ChartTooltip.jsx src/components/shared/ChartTooltip.css
git commit -m "feat: add shared ChartTooltip component with portal rendering"
```

---

### Task 2: Wire Money Bar Chart Tooltip

**Files:**
- Modify: `src/components/money/MoneyDashboard.jsx` (BarChart function, lines ~32-103)

The `BarChart` function is a **local function** inside MoneyDashboard.jsx (line 32). It receives `data` (array of `{ month, expenses, discretionary, essential, savings, income }`) and `budgetTarget`. Each bar is a `.md-chart-stack` div.

- [ ] **Step 1: Add imports and state to BarChart**

At the top of `MoneyDashboard.jsx`, add the import (after existing imports):

```jsx
import ChartTooltip from '../shared/ChartTooltip';
```

Inside the `BarChart` function (line 32), add state for the tooltip before the early return:

```jsx
function BarChart({ data, budgetTarget = 0 }) {
  const [tip, setTip] = useState(null); // { x, y, item }

  if (!data.length) return null;
```

Also add `useState` to the existing React import at line 1 if not already present. Check: line 1 currently imports `useMemo` from 'react'. Add `useState`:

```jsx
import { useMemo, useState } from 'react';
```

- [ ] **Step 2: Add mouse event handlers to each bar column**

In the BarChart JSX, the `.md-chart-col` divs are rendered at line 82. Modify the `.md-chart-col` div to add hover events:

Replace the existing bar rendering block (lines 82-89):

```jsx
return (
  <div key={i} className="md-chart-col">
    <div className="md-chart-stack" style={{ height: `${totalPct}%` }}>
      {overBudget  > 0 && <div className="md-bar md-bar-over-budget"    style={{ flex: overBudget }} />}
      {discret     > 0 && <div className="md-bar md-bar-discretionary"  style={{ flex: discret }} />}
      {d.expenses  > 0 && <div className="md-bar md-bar-essential"      style={{ flex: d.expenses }} />}
    </div>
  </div>
);
```

With:

```jsx
return (
  <div key={i} className="md-chart-col"
    onMouseEnter={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setTip({ x: rect.left + rect.width / 2, y: rect.top, item: d });
    }}
    onMouseLeave={() => setTip(null)}
    onClick={(e) => {
      if (!('ontouchstart' in window)) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setTip((prev) => prev?.item === d ? null : { x: rect.left + rect.width / 2, y: rect.top, item: d });
    }}
  >
    <div className="md-chart-stack" style={{ height: `${totalPct}%` }}>
      {overBudget  > 0 && <div className="md-bar md-bar-over-budget"    style={{ flex: overBudget }} />}
      {discret     > 0 && <div className="md-bar md-bar-discretionary"  style={{ flex: discret }} />}
      {d.expenses  > 0 && <div className="md-bar md-bar-essential"      style={{ flex: d.expenses }} />}
    </div>
  </div>
);
```

- [ ] **Step 3: Render ChartTooltip inside BarChart return**

After the closing `</div>` of the `md-chart-outer` wrapper (line 101), but still inside the BarChart return, add the tooltip. Wrap the entire BarChart return in a fragment:

Place the `ChartTooltip` just before the final closing tag of the BarChart return (before closing `</div>` of `md-chart-outer`):

```jsx
<ChartTooltip visible={!!tip} x={tip?.x ?? 0} y={tip?.y ?? 0} anchor="above">
  <div className="chart-tooltip__value">{tip?.item?.month}</div>
  <div className="chart-tooltip__label">Expenses: {fmt(tip?.item?.expenses ?? 0)}</div>
  {(tip?.item?.discretionary ?? 0) > 0 && (
    <div className="chart-tooltip__label">Discretionary: {fmt(tip.item.discretionary)}</div>
  )}
  {budgetTarget > 0 && (tip?.item?.expenses ?? 0) > budgetTarget && (
    <div className="chart-tooltip__detail" style={{ color: 'var(--danger)' }}>
      Over budget: {fmt(tip.item.expenses - budgetTarget)}
    </div>
  )}
</ChartTooltip>
```

Insert this right before the `</div>` closing `md-chart-outer` (before the X-axis labels section is fine — or after the entire chart area div, still inside the outer wrapper).

- [ ] **Step 4: Verify the build compiles and test in browser**

Run: `npm run build`
Expected: Build succeeds with no errors.

Then run `npm run dev` and hover over bar chart columns in Money Dashboard. Verify tooltip shows month name, expenses, and discretionary values.

- [ ] **Step 5: Commit**

```bash
git add src/components/money/MoneyDashboard.jsx
git commit -m "feat: wire tooltip for Money bar chart"
```

---

### Task 3: Wire BCG Line Chart Tooltip (Crosshair Mode)

**Files:**
- Modify: `src/pages/Dashboard.jsx` (BCGChart function, lines ~22-123)

The `BCGChart` function renders an SVG line chart with `<circle>` elements at each data point (r=3). `points` array has `{ x, y, count, label, day }`. SVG viewBox is `0 0 520 180`.

- [ ] **Step 1: Add imports and state to Dashboard.jsx**

Add at the top of Dashboard.jsx (with existing imports):

```jsx
import ChartTooltip from '../components/shared/ChartTooltip';
```

Add `useState, useRef, useCallback` to the React import if not already present.

Inside `BCGChart`, add state before the existing logic:

```jsx
function BCGChart({ data }) {
  const [range, setRange] = useState('14d');
  const svgRef = useRef(null);
  const [tip, setTip] = useState(null); // { x, y, svgTop, svgHeight, point }
```

- [ ] **Step 2: Add ref to the SVG element**

On the `<svg>` element at line 77, add the ref:

```jsx
<svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="bcg-chart__svg" preserveAspectRatio="xMidYMid meet">
```

- [ ] **Step 3: Add hover handlers to each circle**

Replace the existing circle rendering (lines 103-106):

```jsx
{points.map((p, i) => (
  <circle key={i} cx={p.x} cy={p.y} r="3"
    fill="var(--primary)" stroke="var(--surface)" strokeWidth="1.5" />
))}
```

With:

```jsx
{points.map((p, i) => (
  <circle key={i} cx={p.x} cy={p.y}
    r={tip?.point === p ? 5 : 3}
    fill="var(--primary)"
    stroke={tip?.point === p ? 'var(--primary-border)' : 'var(--surface)'}
    strokeWidth={tip?.point === p ? 2 : 1.5}
    style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
    onMouseEnter={(e) => {
      const circle = e.currentTarget;
      const ctm = circle.getScreenCTM();
      if (!ctm) return;
      const vx = ctm.a * p.x + ctm.e;
      const vy = ctm.d * p.y + ctm.f;
      const svgRect = svgRef.current?.getBoundingClientRect();
      setTip({
        x: vx, y: vy,
        svgTop: svgRect?.top ?? 0,
        svgHeight: svgRect?.height ?? 0,
        point: p,
      });
    }}
    onMouseLeave={() => setTip(null)}
    onClick={(e) => {
      if (!('ontouchstart' in window)) return;
      const circle = e.currentTarget;
      const ctm = circle.getScreenCTM();
      if (!ctm) return;
      const vx = ctm.a * p.x + ctm.e;
      const vy = ctm.d * p.y + ctm.f;
      const svgRect = svgRef.current?.getBoundingClientRect();
      setTip((prev) => prev?.point === p ? null : {
        x: vx, y: vy,
        svgTop: svgRect?.top ?? 0,
        svgHeight: svgRect?.height ?? 0,
        point: p,
      });
    }}
  />
))}
```

- [ ] **Step 4: Render ChartTooltip in BCGChart**

Add the `ChartTooltip` inside the BCGChart return, after the `</svg>` closing tag (but still inside the `bcg-chart` div):

```jsx
<ChartTooltip
  visible={!!tip}
  x={tip?.x ?? 0}
  y={tip?.y ?? 0}
  anchor="crosshair"
  crosshairTop={tip?.svgTop ?? 0}
  crosshairHeight={tip?.svgHeight ?? 0}
>
  <div className="chart-tooltip__value">
    {tip?.point?.count ?? 0} task{(tip?.point?.count ?? 0) !== 1 ? 's' : ''}
  </div>
  <div className="chart-tooltip__label">{tip?.point?.day ?? ''}</div>
</ChartTooltip>
```

- [ ] **Step 5: Verify build and test in browser**

Run: `npm run build`
Expected: Build succeeds.

Test: Hover over BCG chart data points. Verify:
- Crosshair vertical dashed line appears
- Hovered circle enlarges from r=3 to r=5
- Tooltip shows "N tasks" and day label

- [ ] **Step 6: Commit**

```bash
git add src/pages/Dashboard.jsx
git commit -m "feat: wire crosshair tooltip for BCG line chart"
```

---

### Task 4: Wire Activity Chart Tooltip (Crosshair Mode)

**Files:**
- Modify: `src/components/dashboard/ActivityChart.jsx`

The ActivityChart is an SVG line chart nearly identical to BCG. Constants: `W=600`, `H=200`, `PAD = { left: 50, right: 20, top: 15, bottom: 35 }`. The `points` array has `{ x, y, count, label, ...d }` where `d` comes from the `data` prop with `{ count, label, day }`. Circles are at r=4 with stroke.

- [ ] **Step 1: Add imports and state**

Update the import line at the top of `ActivityChart.jsx`:

```jsx
import { useState, useRef } from 'react';
import { Activity } from 'lucide-react';
import ChartTooltip from '../shared/ChartTooltip';
import './ActivityChart.css';
```

Inside the `ActivityChart` function, add state and ref after the existing variables (after line 12, before the `if (!hasData)` check):

```jsx
const svgRef = useRef(null);
const [tip, setTip] = useState(null); // { x, y, svgTop, svgHeight, point }
```

- [ ] **Step 2: Add ref to SVG element**

On line 37, add the ref to the `<svg>`:

```jsx
<svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="activity-chart-svg" preserveAspectRatio="xMidYMid meet">
```

- [ ] **Step 3: Replace circle rendering with hover-enabled circles**

Replace lines 59-62 (the data points circles):

```jsx
{points.map((p, i) => (
  <circle key={i} cx={p.x} cy={p.y} r="4"
    fill="var(--primary)" stroke="var(--surface)" strokeWidth="2" />
))}
```

With:

```jsx
{points.map((p, i) => (
  <circle key={i} cx={p.x} cy={p.y}
    r={tip?.point === p ? 6 : 4}
    fill="var(--primary)"
    stroke={tip?.point === p ? 'var(--primary-border)' : 'var(--surface)'}
    strokeWidth="2"
    style={{ cursor: 'pointer', transition: 'r 0.15s ease' }}
    onMouseEnter={(e) => {
      const ctm = e.currentTarget.getScreenCTM();
      if (!ctm) return;
      const vx = ctm.a * p.x + ctm.e;
      const vy = ctm.d * p.y + ctm.f;
      const svgRect = svgRef.current?.getBoundingClientRect();
      setTip({
        x: vx, y: vy,
        svgTop: svgRect?.top ?? 0,
        svgHeight: svgRect?.height ?? 0,
        point: p,
      });
    }}
    onMouseLeave={() => setTip(null)}
    onClick={(e) => {
      if (!('ontouchstart' in window)) return;
      const ctm = e.currentTarget.getScreenCTM();
      if (!ctm) return;
      const vx = ctm.a * p.x + ctm.e;
      const vy = ctm.d * p.y + ctm.f;
      const svgRect = svgRef.current?.getBoundingClientRect();
      setTip((prev) => prev?.point === p ? null : {
        x: vx, y: vy,
        svgTop: svgRect?.top ?? 0,
        svgHeight: svgRect?.height ?? 0,
        point: p,
      });
    }}
  />
))}
```

- [ ] **Step 4: Render ChartTooltip**

After the `</svg>` closing tag (line 79), but still inside the `activity-chart` div, add:

```jsx
<ChartTooltip
  visible={!!tip}
  x={tip?.x ?? 0}
  y={tip?.y ?? 0}
  anchor="crosshair"
  crosshairTop={tip?.svgTop ?? 0}
  crosshairHeight={tip?.svgHeight ?? 0}
>
  <div className="chart-tooltip__value">
    {tip?.point?.count ?? 0} task{(tip?.point?.count ?? 0) !== 1 ? 's' : ''}
  </div>
  <div className="chart-tooltip__label">{tip?.point?.day ?? tip?.point?.label ?? ''}</div>
</ChartTooltip>
```

Note: The data prop for ActivityChart may use `label` (short day name like "Mon") or `day` (full date like "Mon, Apr 7"). Use whichever is available: `tip?.point?.day ?? tip?.point?.label`.

- [ ] **Step 5: Verify build and test**

Run: `npm run build`
Expected: Build succeeds.

Test: Navigate to dashboard, hover over Activity Chart data points. Verify crosshair + tooltip appear.

- [ ] **Step 6: Commit**

```bash
git add src/components/dashboard/ActivityChart.jsx
git commit -m "feat: wire crosshair tooltip for Activity chart"
```

---

### Task 5: Wire Savings Donut Tooltip

**Files:**
- Modify: `src/components/money/MoneyDashboard.jsx` (donut section, lines ~478-489)

The savings donut is inside the `MoneyDashboard` default export (not the `BarChart` function). It renders an SVG with two `<circle>` elements. The progress arc is the second circle (line 480-483). Relevant variables available in scope: `clampedPct`, `totalIncome`, `totalExpenses`, `fmt()`.

- [ ] **Step 1: Add tooltip state to MoneyDashboard**

Inside the `MoneyDashboard` default export function (line 106), add state (after the existing `useMemo` blocks, around line 172):

```jsx
const [donutTip, setDonutTip] = useState(null); // { x, y }
```

- [ ] **Step 2: Add hover events to the donut progress arc**

Replace the progress arc circle (lines 480-483):

```jsx
<circle cx="60" cy="60" r="50" fill="none" stroke="var(--mod-money)" strokeWidth="14"
  strokeDasharray={`${clampedPct * 3.14} ${(100 - clampedPct) * 3.14}`}
  strokeDashoffset="0" strokeLinecap="round"
  transform="rotate(-90 60 60)" />
```

With:

```jsx
<circle cx="60" cy="60" r="50" fill="none" stroke="var(--mod-money)" strokeWidth="14"
  strokeDasharray={`${clampedPct * 3.14} ${(100 - clampedPct) * 3.14}`}
  strokeDashoffset="0" strokeLinecap="round"
  transform="rotate(-90 60 60)"
  style={{ cursor: 'pointer' }}
  onMouseEnter={(e) => {
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setDonutTip({ x: rect.left + rect.width / 2, y: rect.top });
  }}
  onMouseLeave={() => setDonutTip(null)}
  onClick={(e) => {
    if (!('ontouchstart' in window)) return;
    const svg = e.currentTarget.closest('svg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setDonutTip((prev) => prev ? null : { x: rect.left + rect.width / 2, y: rect.top });
  }}
/>
```

- [ ] **Step 3: Render ChartTooltip for donut**

After the `</div>` closing `md-donut-wrap` (line 489), still inside the `md-health` card, add:

```jsx
<ChartTooltip visible={!!donutTip} x={donutTip?.x ?? 0} y={donutTip?.y ?? 0} anchor="above">
  <div className="chart-tooltip__value">{clampedPct}% saved</div>
  <div className="chart-tooltip__label">Saved: {fmt(Math.max(0, totalIncome - totalExpenses))}</div>
  <div className="chart-tooltip__detail">Spent: {fmt(totalExpenses)}</div>
</ChartTooltip>
```

- [ ] **Step 4: Verify build and test**

Run: `npm run build`
Expected: Build succeeds.

Test: Hover over the savings donut ring in Money Dashboard. Verify tooltip shows percentage, saved amount, and spent amount.

- [ ] **Step 5: Commit**

```bash
git add src/components/money/MoneyDashboard.jsx
git commit -m "feat: wire tooltip for savings donut"
```

---

### Task 6: Wire Mastery Ring Tooltip

**Files:**
- Modify: `src/components/work/PillarLevelDashboard.jsx` (MasteryRing function, lines ~325-353)

The `MasteryRing` component receives `{ percent, pillarColor, pillarKey }`. It renders an SVG with a progress arc circle. The MasteryRing is used in the header area of PillarLevelDashboard — but looking at the current code, MasteryRing is defined but **not rendered in the current JSX** (the main export at line 435 does not call MasteryRing). 

Check: search for where MasteryRing is actually used. If it's not currently rendered, we'll still add the tooltip so it's ready when it's wired in, or wire it into the existing PillarLevelDashboard layout.

However, per the design spec, the tooltip should be on the progress arc `<circle>`. We need to also know the done/total counts. Currently MasteryRing only receives `percent`. We need to extend it.

- [ ] **Step 1: Add imports and extend MasteryRing props**

Add at the top of `PillarLevelDashboard.jsx`:

```jsx
import { useMemo, useState } from 'react';
import ChartTooltip from '../shared/ChartTooltip';
```

(Replace the existing `import { useMemo } from 'react';` line.)

- [ ] **Step 2: Add tooltip to MasteryRing**

Replace the MasteryRing function (lines 325-353):

```jsx
function MasteryRing({ percent, pillarColor, pillarKey }) {
  const r = 42;
  const stroke = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `pldRing_${pillarKey}`;

  return (
    <svg width="110" height="110" viewBox="0 0 110 110" className="pld__ring-svg">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pillarColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={pillarColor} />
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke={`url(#${gradId})`} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 55 55)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x="55" y="50" textAnchor="middle" className="pld__ring-percent">{percent}%</text>
      <text x="55" y="66" textAnchor="middle" className="pld__ring-label">Complete</text>
    </svg>
  );
}
```

With:

```jsx
function MasteryRing({ percent, pillarColor, pillarKey, doneCount, totalCount }) {
  const r = 42;
  const stroke = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `pldRing_${pillarKey}`;
  const [tip, setTip] = useState(null);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg width="110" height="110" viewBox="0 0 110 110" className="pld__ring-svg">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={pillarColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={pillarColor} />
          </linearGradient>
        </defs>
        <circle cx="55" cy="55" r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        <circle
          cx="55" cy="55" r={r} fill="none"
          stroke={`url(#${gradId})`} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 55 55)"
          style={{ transition: 'stroke-dashoffset 0.8s ease', cursor: 'pointer' }}
          onMouseEnter={(e) => {
            const svg = e.currentTarget.closest('svg');
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            setTip({ x: rect.left + rect.width / 2, y: rect.top });
          }}
          onMouseLeave={() => setTip(null)}
          onClick={(e) => {
            if (!('ontouchstart' in window)) return;
            const svg = e.currentTarget.closest('svg');
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            setTip((prev) => prev ? null : { x: rect.left + rect.width / 2, y: rect.top });
          }}
        />
        <text x="55" y="50" textAnchor="middle" className="pld__ring-percent">{percent}%</text>
        <text x="55" y="66" textAnchor="middle" className="pld__ring-label">Complete</text>
      </svg>
      <ChartTooltip visible={!!tip} x={tip?.x ?? 0} y={tip?.y ?? 0} anchor="above">
        <div className="chart-tooltip__value">{percent}% complete</div>
        {doneCount != null && totalCount != null && (
          <div className="chart-tooltip__label">{doneCount} of {totalCount} tasks done</div>
        )}
      </ChartTooltip>
    </div>
  );
}
```

- [ ] **Step 3: Update MasteryRing usage to pass doneCount and totalCount**

Search for any existing usage of `<MasteryRing` in the file. If MasteryRing is not currently rendered in the PillarLevelDashboard JSX, no change needed here. If it is rendered somewhere, ensure `doneCount={metrics.doneTasks.length}` and `totalCount={metrics.total}` are passed.

Since MasteryRing is defined locally but not called in the current JSX (the dashboard renders task cards and insight panels but no ring in the header), this step may be a no-op. The component is ready for when it's wired in.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/work/PillarLevelDashboard.jsx
git commit -m "feat: wire tooltip for mastery ring component"
```

---

### Task 7: Wire Workflow Pressure Tooltip

**Files:**
- Modify: `src/pages/Dashboard.jsx` (WorkflowPressure function, lines ~126-149)

The `WorkflowPressure` function receives `{ level }` where `level` is `'low'`/`'medium'`/`'high'`. It derives `filled` (2/5/8) and `color`. The dashboard also has `stats.inProgress` available in the parent scope.

Since `WorkflowPressure` only receives `level`, we need to also pass the `inProgress` count so the tooltip can show it. We'll add an `inProgressCount` prop.

- [ ] **Step 1: Extend WorkflowPressure props and add state**

Replace the WorkflowPressure function signature and add tooltip state (lines 126-128):

```jsx
function WorkflowPressure({ level }) {
  const bars = 10;
  const filled = level === 'low' ? 2 : level === 'medium' ? 5 : 8;
  const color = level === 'low' ? 'var(--success)' : level === 'medium' ? 'var(--warning)' : 'var(--danger)';
```

With:

```jsx
function WorkflowPressure({ level, inProgressCount = 0 }) {
  const bars = 10;
  const filled = level === 'low' ? 2 : level === 'medium' ? 5 : 8;
  const color = level === 'low' ? 'var(--success)' : level === 'medium' ? 'var(--warning)' : 'var(--danger)';
  const [tip, setTip] = useState(null);
```

- [ ] **Step 2: Add hover events to the bars container**

Replace the bars div (lines 137-141):

```jsx
<div className="wf-pressure__bars">
  {Array.from({ length: bars }).map((_, i) => (
    <div key={i} className={`wf-bar ${i < filled ? 'filled' : ''}`}
      style={i < filled ? { background: color } : undefined} />
  ))}
</div>
```

With:

```jsx
<div className="wf-pressure__bars"
  onMouseEnter={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTip({ x: rect.left + rect.width / 2, y: rect.top });
  }}
  onMouseLeave={() => setTip(null)}
  onClick={(e) => {
    if (!('ontouchstart' in window)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTip((prev) => prev ? null : { x: rect.left + rect.width / 2, y: rect.top });
  }}
>
  {Array.from({ length: bars }).map((_, i) => (
    <div key={i} className={`wf-bar ${i < filled ? 'filled' : ''}`}
      style={i < filled ? { background: color } : undefined} />
  ))}
</div>
```

- [ ] **Step 3: Render ChartTooltip in WorkflowPressure**

After the `wf-pressure__bars` div, still inside the `wf-pressure` wrapper, add:

```jsx
<ChartTooltip visible={!!tip} x={tip?.x ?? 0} y={tip?.y ?? 0} anchor="above">
  <div className="chart-tooltip__value" style={{ color }}>
    {level.charAt(0).toUpperCase() + level.slice(1)} pressure
  </div>
  <div className="chart-tooltip__label">
    {filled} of 10 &middot; {inProgressCount} task{inProgressCount !== 1 ? 's' : ''} in progress
  </div>
</ChartTooltip>
```

- [ ] **Step 4: Pass inProgressCount at the call site**

Find where `<WorkflowPressure` is rendered (line 603 in Dashboard.jsx):

```jsx
<WorkflowPressure level={pressureLevel} />
```

Replace with:

```jsx
<WorkflowPressure level={pressureLevel} inProgressCount={stats.inProgress} />
```

- [ ] **Step 5: Verify build and test**

Run: `npm run build`
Expected: Build succeeds.

Test: Hover over the workflow pressure gauge bars. Verify tooltip shows level and in-progress count.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Dashboard.jsx
git commit -m "feat: wire tooltip for workflow pressure gauge"
```

---

### Task 8: Wire Spending Limit Bar Tooltip

**Files:**
- Modify: `src/components/money/MoneyDashboard.jsx` (spending limit section, lines ~314-321)

The spending limit bar is inside MoneyDashboard default export. Variables in scope: `spendingPct`, `totalExpenses`, `monthlyBudget`, `fmt()`.

- [ ] **Step 1: Add tooltip state**

Add another state variable in MoneyDashboard (near the `donutTip` state from Task 5):

```jsx
const [limitTip, setLimitTip] = useState(null); // { x, y }
```

- [ ] **Step 2: Add hover events to the spending limit bar**

Replace the limit bar div (lines 314-316):

```jsx
<div className="md-limit-bar">
  <div className="md-limit-fill" style={{ width: `${spendingPct}%` }} />
</div>
```

With:

```jsx
<div className="md-limit-bar"
  onMouseEnter={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLimitTip({ x: rect.left + rect.width / 2, y: rect.top });
  }}
  onMouseLeave={() => setLimitTip(null)}
  onClick={(e) => {
    if (!('ontouchstart' in window)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setLimitTip((prev) => prev ? null : { x: rect.left + rect.width / 2, y: rect.top });
  }}
>
  <div className="md-limit-fill" style={{ width: `${spendingPct}%` }} />
</div>
```

- [ ] **Step 3: Render ChartTooltip for spending limit**

After the `md-limit-labels` div (line 320), still inside the `md-spending-limit` card, add:

```jsx
<ChartTooltip visible={!!limitTip} x={limitTip?.x ?? 0} y={limitTip?.y ?? 0} anchor="above">
  <div className="chart-tooltip__value">{fmt(totalExpenses)} / {monthlyBudget > 0 ? fmt(monthlyBudget) : 'No budget'}</div>
  {monthlyBudget > 0 && (
    <div className="chart-tooltip__label" style={totalExpenses > monthlyBudget ? { color: 'var(--danger)' } : undefined}>
      {totalExpenses > monthlyBudget
        ? `${Math.round(((totalExpenses - monthlyBudget) / monthlyBudget) * 100)}% over budget`
        : `${spendingPct}% of budget`}
    </div>
  )}
</ChartTooltip>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/money/MoneyDashboard.jsx
git commit -m "feat: wire tooltip for spending limit bar"
```

---

### Task 9: Wire Cost Analysis Tooltip

**Files:**
- Modify: `src/components/money/MoneyDashboard.jsx` (cost analysis section, lines ~456-464)

The cost analysis renders `.md-cost-row` divs from `costCategories` array with `{ name, pct, color }`. Variable `totalExpenses` is in scope.

- [ ] **Step 1: Add tooltip state**

Add another state variable in MoneyDashboard:

```jsx
const [costTip, setCostTip] = useState(null); // { x, y, item }
```

- [ ] **Step 2: Add hover events to each cost row**

Replace the cost row rendering (lines 456-461):

```jsx
{costCategories.length > 0 ? costCategories.map((c) => (
  <div key={c.name} className="md-cost-row">
    <div className="md-cost-dot" style={{ background: c.color }} />
    <span className="md-cost-name">{c.name}</span>
    <span className="md-cost-pct">{c.pct}%</span>
  </div>
)) : (
```

With:

```jsx
{costCategories.length > 0 ? costCategories.map((c) => (
  <div key={c.name} className="md-cost-row"
    onMouseEnter={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setCostTip({ x: rect.left + rect.width / 2, y: rect.top, item: c });
    }}
    onMouseLeave={() => setCostTip(null)}
    onClick={(e) => {
      if (!('ontouchstart' in window)) return;
      const rect = e.currentTarget.getBoundingClientRect();
      setCostTip((prev) => prev?.item === c ? null : { x: rect.left + rect.width / 2, y: rect.top, item: c });
    }}
  >
    <div className="md-cost-dot" style={{ background: c.color }} />
    <span className="md-cost-name">{c.name}</span>
    <span className="md-cost-pct">{c.pct}%</span>
  </div>
)) : (
```

- [ ] **Step 3: Render ChartTooltip for cost analysis**

After the `md-cost-bars` closing `</div>` (line 465), still inside the `md-cost` card, add:

```jsx
<ChartTooltip visible={!!costTip} x={costTip?.x ?? 0} y={costTip?.y ?? 0} anchor="above">
  <div className="chart-tooltip__value">
    {costTip?.item?.name} &mdash; {costTip?.item?.pct}%
  </div>
  <div className="chart-tooltip__label">
    {fmt(Math.round(totalExpenses * ((costTip?.item?.pct ?? 0) / 100)))} of {fmt(totalExpenses)}
  </div>
</ChartTooltip>
```

- [ ] **Step 4: Verify the full build**

Run: `npm run build`
Expected: Build succeeds with zero errors.

- [ ] **Step 5: Full integration test**

Run: `npm run dev`

Test each tooltip:
1. **Money bar chart** — hover over bar columns, verify month/expenses/discretionary
2. **BCG line chart** — hover over data points, verify crosshair + task count
3. **Activity chart** — hover over data points, verify crosshair + task count
4. **Savings donut** — hover over ring arc, verify percentage/saved/spent
5. **Mastery ring** — if visible, hover over ring arc, verify percentage/count
6. **Workflow pressure** — hover over gauge bars, verify level + in-progress count
7. **Spending limit** — hover over progress bar, verify amount/percentage
8. **Cost analysis** — hover over category rows, verify name/percentage/amount

- [ ] **Step 6: Commit**

```bash
git add src/components/money/MoneyDashboard.jsx
git commit -m "feat: wire tooltip for cost analysis rows"
```

---

### Task 10: Final Polish and Mobile Tap-Dismiss

**Files:**
- Modify: `src/components/shared/ChartTooltip.jsx`

The current implementation has basic tap-to-toggle via `onClick` in each chart. The design spec also requires dismissing on outside tap. We need to add a one-shot `pointerdown` listener when any tooltip opens.

- [ ] **Step 1: Add outside-tap dismiss hook**

Create a custom hook at the top of `ChartTooltip.jsx` (or in a separate file if preferred — but keeping it co-located is simpler):

Update `ChartTooltip.jsx` to add a `useEffect` for outside-tap dismiss. But since ChartTooltip itself is stateless (the parent controls `visible`), this dismiss logic needs to live in each chart's tooltip state management.

A simpler approach: Add a `onDismiss` prop to ChartTooltip, and when `visible` is true on a touch device, attach a one-shot `pointerdown` listener to `document` that calls `onDismiss`.

Update ChartTooltip.jsx:

```jsx
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ChartTooltip.css';

const MIN_ABOVE = 180;
const EDGE_PAD = 8;
const IS_TOUCH = typeof window !== 'undefined' && ('ontouchstart' in window);

export default function ChartTooltip({
  visible,
  x,
  y,
  anchor = 'above',
  children,
  crosshairTop,
  crosshairHeight,
  onDismiss,
}) {
  // Outside-tap dismiss for touch devices
  useEffect(() => {
    if (!visible || !IS_TOUCH || !onDismiss) return;
    const handler = () => onDismiss();
    // Delay attaching so the current tap doesn't immediately dismiss
    const id = setTimeout(() => document.addEventListener('pointerdown', handler, { once: true }), 10);
    return () => {
      clearTimeout(id);
      document.removeEventListener('pointerdown', handler);
    };
  }, [visible, onDismiss]);

  if (!visible) return null;

  const flipped = anchor === 'above' && y < MIN_ABOVE;

  let style = {};
  if (anchor === 'above') {
    style = {
      left: Math.max(EDGE_PAD, Math.min(x, window.innerWidth - EDGE_PAD)),
      transform: 'translateX(-50%)',
      ...(flipped
        ? { top: y + 10 }
        : { bottom: window.innerHeight - y + 10 }),
    };
  } else {
    const nearRightEdge = x > window.innerWidth - 200;
    style = {
      top: Math.max(EDGE_PAD, y - 30),
      ...(nearRightEdge
        ? { right: window.innerWidth - x + 12 }
        : { left: x + 12 }),
    };
  }

  const className = [
    'chart-tooltip',
    visible && 'chart-tooltip--visible',
    flipped && 'chart-tooltip--below',
  ].filter(Boolean).join(' ');

  return createPortal(
    <>
      <div className={className} style={style}>
        {children}
        {anchor === 'above' && <div className="chart-tooltip__arrow" />}
      </div>
      {anchor === 'crosshair' && crosshairTop != null && crosshairHeight != null && (
        <div
          className={`chart-tooltip__crosshair${visible ? ' chart-tooltip__crosshair--visible' : ''}`}
          style={{
            left: x,
            top: crosshairTop,
            height: crosshairHeight,
          }}
        />
      )}
    </>,
    document.body,
  );
}
```

- [ ] **Step 2: Wire onDismiss in each chart**

For each chart that uses `setTip(null)` or similar, pass `onDismiss={() => setTip(null)}` (or the equivalent setter) to ChartTooltip. Update all 8 tooltip instances:

In MoneyDashboard's BarChart:
```jsx
<ChartTooltip ... onDismiss={() => setTip(null)}>
```

In Dashboard's BCGChart:
```jsx
<ChartTooltip ... onDismiss={() => setTip(null)}>
```

In ActivityChart:
```jsx
<ChartTooltip ... onDismiss={() => setTip(null)}>
```

In MoneyDashboard (donut):
```jsx
<ChartTooltip ... onDismiss={() => setDonutTip(null)}>
```

In MasteryRing:
```jsx
<ChartTooltip ... onDismiss={() => setTip(null)}>
```

In WorkflowPressure:
```jsx
<ChartTooltip ... onDismiss={() => setTip(null)}>
```

In MoneyDashboard (spending limit):
```jsx
<ChartTooltip ... onDismiss={() => setLimitTip(null)}>
```

In MoneyDashboard (cost analysis):
```jsx
<ChartTooltip ... onDismiss={() => setCostTip(null)}>
```

- [ ] **Step 3: Final build verification**

Run: `npm run build`
Expected: Build succeeds with zero errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/shared/ChartTooltip.jsx src/components/money/MoneyDashboard.jsx src/pages/Dashboard.jsx src/components/dashboard/ActivityChart.jsx src/components/work/PillarLevelDashboard.jsx
git commit -m "feat: add mobile tap-dismiss for all chart tooltips"
```
