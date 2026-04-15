---
title: "Money Dashboard"
type: entity
domain: wealth
---

# Money Dashboard

The Money module's primary dashboard within Maqasid OS. Lives at `/app/money` under the Wealth pillar (Hifz al-Mal). Provides financial overview across income, expenses, accounts, vendors, assets, and invoices.

## Component Location
- JSX: `src/components/money/MoneyDashboard.jsx`
- CSS: `src/components/money/MoneyDashboard.css`
- Store: `src/store/money-store.js` (Zustand, `bbiz_`-prefixed localStorage)

## Balance Overview Chart

Pure CSS stacked bar chart. No chart library.

**Data model:**
- Source: `useMoneyStore` → `incomes[]`, `expenses[]`, `budgets[]`
- Aggregation: monthly (last 9 months), filtered by `date.startsWith("YYYY-MM")`
- `chartData` shape: `{ month, income, expenses, savings }`

**Bar anatomy (bottom → top):**
1. Over-budget segment (purple hatched) — `Math.min(expenses, Math.max(0, expenses − budgetTarget))`
2. Within-budget expenses (yellow `#fde68a`)
3. Transparent spacer (savings = income − expenses) — income background shows through
- Bar total height = `income / ceiling * 100%`
- `ceiling` = `niceMax(max monthly income or budgetTarget)`

**Supporting elements:**
- Y-axis labels (4 ticks, formatted as `2.5k` etc.)
- Horizontal gridlines at each tick
- Dashed budget target line at `monthlyBudget / ceiling %` ("Max Target Spending")
- Legend below chart: Income · Expenses · Over budget (conditional)

**Key design decisions:**
- Bar height = income (not savings+income+expenses, which double-counts)
- Savings is implicit — shown as the income-colored gap above the expense segment
- A transparent spacer child holds the savings proportion so expenses don't stretch to fill the bar
- `md-chart-stack` background = `var(--mod-money)` so income color shows through spacer

## Status
Active. Redesigned 2026-04-14 from weekly side-by-side to monthly stacked layout.
