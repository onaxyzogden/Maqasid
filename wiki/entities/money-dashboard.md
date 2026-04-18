---
title: "Money Dashboard"
type: entity
domain: wealth
---

# Money Dashboard

The Money module's primary dashboard within MILOS. Lives at `/app/money` under the Wealth pillar (Hifz al-Mal). Provides financial overview across income, expenses, accounts, vendors, assets, and invoices.

## Component Location
- JSX: `src/components/money/MoneyDashboard.jsx`
- CSS: `src/components/money/MoneyDashboard.css`
- Store: `src/store/money-store.js` (Zustand, `bbiz_`-prefixed localStorage)

## Balance Overview Chart

Pure CSS stacked bar chart. No chart library.

**Data model:**
- Source: `useMoneyStore` → `incomes[]`, `expenses[]`, `budgets[]`, `categories[]`
- Aggregation: monthly (last 9 months), filtered by `date.startsWith("YYYY-MM")`
- `chartData` shape: `{ month, income, expenses, essential, discretionary, savings }`
  - `essential` = expenses in categories with `isEssential: true`
  - `discretionary` = `expenses − essential` (not used by chart render; kept for future use)

**Bar anatomy (bottom → top):**
1. **Expenses** (dark green `var(--mod-money)`) — `d.expenses` — all actual recorded expenses
2. **Discretionary Spending** (light green `#86efac`) — `max(0, budgetTarget − expenses)` — remaining budget headroom
3. **Over Budget** (purple hatched) — `max(0, expenses − budgetTarget)` — only visible when over
- Bar total height = `max(expenses, budgetTarget) / ceiling * 100%`
- `ceiling` = `niceMax(max(expenses, budgetTarget) across all months)`
- When under budget: bar always reaches exactly to the Max Target Spending dashed line

**Supporting elements:**
- Y-axis labels (4 ticks, formatted as `2.5k` etc.)
- Horizontal gridlines at each tick
- Dashed budget target line at `monthlyBudget / ceiling %` ("Max Target Spending")
- Legend below chart: Expenses · Discretionary Spending · Over budget (conditional)

**Category `isEssential` flag:**
- Added to `PRESET_CATEGORIES` in `src/data/config/money-categories.js`
- Essential presets: Rent, Utility, Utility Bills, Transport, Payroll
- Defaults to `false` for user-added categories (no UI toggle yet — deferred)
- Currently carried in `chartData.essential` but chart renders all expenses as one block

## Chart Tooltips

All Money Dashboard charts now have hover tooltips via the shared `ChartTooltip` component (`src/components/shared/ChartTooltip.jsx`), rendered as portals to `document.body`.

| Chart | Anchor Mode | Content |
|---|---|---|
| Balance Overview bars | above | Month name, expenses, discretionary, over-budget |
| Savings donut | above | Percentage saved, saved amount, spent amount |
| Spending limit bar | above | Current/budget amounts, percentage of/over budget |
| Cost analysis rows | above | Category name, percentage, dollar amount |

- Desktop: hover shows tooltip (150ms fade)
- Mobile: tap-to-toggle with outside-tap dismiss
- Tooltip viewport-clamped 8px from edges, flips below if < 180px headroom above

## Status
Active. Redesigned 2026-04-15: expense-based bar height, 3-segment stacked layout, all-corners rounding per segment. Chart tooltips added 2026-04-15.
