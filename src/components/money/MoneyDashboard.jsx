import { useMemo, useState } from 'react';
import {
  TrendingUp, TrendingDown, CreditCard, Target, PiggyBank,
  ArrowUpRight, ArrowDownRight, Plus, MoreHorizontal,
  Store, Package, FileText, ChevronRight,
} from 'lucide-react';
import { useMoneyStore, formatCurrency, getInvoiceTotal } from '../../store/money-store';
import ChartTooltip from '../shared/ChartTooltip';

/* ─── small helpers ─── */
function fmt(n) { return formatCurrency(n); }
function pct(current, target) { return target ? Math.min(100, Math.round((current / target) * 100)) : 0; }

const MONTH_COUNT = 9;
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function niceMax(val) {
  if (val <= 4) return 4;
  const mag = Math.pow(10, Math.floor(Math.log10(val)));
  const n = val / mag;
  if (n <= 1) return mag;
  if (n <= 2) return 2 * mag;
  if (n <= 5) return 5 * mag;
  return 10 * mag;
}

function fmtTick(v) {
  if (v >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'k';
  return String(v);
}

/* ─── bar chart (pure CSS, stacked monthly) ─── */
function BarChart({ data, budgetTarget = 0 }) {
  const [tip, setTip] = useState(null);
  if (!data.length) return null;

  const stackMax = Math.max(
    ...data.map((d) => Math.max(d.expenses, budgetTarget)),
    1,
  );
  const ceiling = niceMax(stackMax);
  const TICK_COUNT = 4;
  const ticks = Array.from({ length: TICK_COUNT + 1 }, (_, i) =>
    Math.round((ceiling / TICK_COUNT) * i),
  );
  const budgetPct = budgetTarget > 0 ? (budgetTarget / ceiling) * 100 : 0;

  return (
    <div className="md-chart-outer">
      <div className="md-chart-wrapper">
        {/* Y-axis */}
        <div className="md-chart-yaxis">
          {[...ticks].reverse().map((t, i) => (
            <span key={i} className="md-yaxis-label">{fmtTick(t)}</span>
          ))}
        </div>

        {/* Chart area */}
        <div className="md-chart-area">
          {/* Gridlines */}
          {ticks.slice(1).map((t, i) => (
            <div key={i} className="md-gridline" style={{ bottom: `${(t / ceiling) * 100}%` }} />
          ))}

          {/* Budget target line */}
          {budgetTarget > 0 && (
            <>
              <div className="md-budget-line" style={{ bottom: `${budgetPct}%` }} />
              <span className="md-budget-label" style={{ bottom: `${budgetPct}%` }}>
                Max Target Spending
              </span>
            </>
          )}

          {/* Bars */}
          <div className="md-chart-bars">
            {data.map((d, i) => {
              const barTop = budgetTarget > 0 ? Math.max(d.expenses, budgetTarget) : d.expenses;
              const totalPct = (barTop / ceiling) * 100;
              const overBudget = budgetTarget > 0 ? Math.max(0, d.expenses - budgetTarget) : 0;
              const discret = budgetTarget > 0 ? Math.max(0, budgetTarget - d.expenses) : 0;

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
            })}
          </div>
        </div>
      </div>

      {/* X-axis */}
      <div className="md-chart-xaxis">
        {data.map((d, i) => (
          <span key={i} className="md-chart-label">{d.month}</span>
        ))}
      </div>
      <ChartTooltip visible={!!tip} x={tip?.x ?? 0} y={tip?.y ?? 0} anchor="above" onDismiss={() => setTip(null)}>
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
    </div>
  );
}
const COLORS = ['#f59e0b', '#f97316', '#fbbf24', '#fcd34d', '#22c55e', '#4ab8a8', '#94a3b8', '#8b5cf6', '#3b82f6', '#ec4899'];

export default function MoneyDashboard({ onNavigate }) {
  const expenses = useMoneyStore((s) => s.expenses);
  const incomes = useMoneyStore((s) => s.incomes);
  const accounts = useMoneyStore((s) => s.accounts);
  const categories = useMoneyStore((s) => s.categories);
  const budgets = useMoneyStore((s) => s.budgets);
  const vendors = useMoneyStore((s) => s.vendors);
  const assets = useMoneyStore((s) => s.assets);
  const invoices = useMoneyStore((s) => s.invoices);

  const { totalIncome, totalExpenses, balance, accountsBalance } = useMemo(() => {
    const ti = incomes.reduce((s, i) => s + (Number(i.amount) || 0), 0);
    const te = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
    const ab = accounts.reduce((s, a) => s + (Number(a.balance) || 0), 0);
    return { totalIncome: ti, totalExpenses: te, balance: ti - te, accountsBalance: ab };
  }, [incomes, expenses, accounts]);

  // Monthly chart data (last 9 months)
  const chartData = useMemo(() => {
    const now = new Date();
    const results = [];
    for (let i = MONTH_COUNT - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const prefix = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const monthIncome = incomes
        .filter((x) => x.date?.startsWith(prefix))
        .reduce((s, x) => s + (Number(x.amount) || 0), 0);
      const monthExpenses = expenses.filter((x) => x.date?.startsWith(prefix));
      const monthExpense = monthExpenses.reduce((s, x) => s + (Number(x.amount) || 0), 0);
      const monthEssential = monthExpenses
        .filter((x) => categories.find((c) => c.id === x.categoryId)?.isEssential ?? false)
        .reduce((s, x) => s + (Number(x.amount) || 0), 0);
      results.push({
        month: MONTHS[d.getMonth()],
        income: monthIncome,
        expenses: monthExpense,
        essential: monthEssential,
        discretionary: monthExpense - monthEssential,
        savings: Math.max(0, monthIncome - monthExpense),
      });
    }
    return results;
  }, [incomes, expenses, categories]);

  // Cost analysis by category
  const costCategories = useMemo(() => {
    if (!totalExpenses) return [];
    const byCategory = {};
    expenses.forEach((e) => {
      const cid = e.categoryId || 'other';
      byCategory[cid] = (byCategory[cid] || 0) + (Number(e.amount) || 0);
    });
    return Object.entries(byCategory)
      .map(([cid, amount], i) => {
        const cat = categories.find((c) => c.id === cid);
        return { name: cat?.name || cid, pct: Math.round((amount / totalExpenses) * 100), color: COLORS[i % COLORS.length] };
      })
      .sort((a, b) => b.pct - a.pct);
  }, [expenses, categories, totalExpenses]);

  // Saved ratio for donut
  const savedPct = totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0;
  const clampedPct = Math.max(0, Math.min(100, savedPct));

  // Budget as spending limit
  const monthlyBudget = budgets.reduce((s, b) => s + (Number(b.monthlyLimit) || 0), 0);
  const spendingPct = monthlyBudget > 0 ? Math.min(100, Math.round((totalExpenses / monthlyBudget) * 100)) : 0;

  // Tooltip state
  const [donutTip, setDonutTip] = useState(null);
  const [limitTip, setLimitTip] = useState(null);
  const [costTip, setCostTip] = useState(null);

  // Vendor metrics
  const vendorMetrics = useMemo(() => {
    const active = vendors.filter((v) => v.status === 'active');
    const spentByVendor = {};
    expenses.forEach((e) => {
      if (e.vendorId) spentByVendor[e.vendorId] = (spentByVendor[e.vendorId] || 0) + (Number(e.amount) || 0);
    });
    const topVendors = active
      .map((v) => ({ ...v, spent: spentByVendor[v.id] || 0 }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 3);
    return { activeCount: active.length, topVendors };
  }, [vendors, expenses]);

  // Asset metrics
  const assetMetrics = useMemo(() => {
    const active = assets.filter((a) => a.status === 'active');
    const totalValue = active.reduce((s, a) => s + (Number(a.currentValue) || 0), 0);
    const totalPurchase = active.reduce((s, a) => s + (Number(a.purchasePrice) || 0), 0);
    const gainLoss = totalValue - totalPurchase;
    const gainPct = totalPurchase > 0 ? Math.round((gainLoss / totalPurchase) * 100) : 0;
    const topAssets = [...active].sort((a, b) => (Number(b.currentValue) || 0) - (Number(a.currentValue) || 0)).slice(0, 3);
    return { activeCount: active.length, totalValue, gainLoss, gainPct, topAssets };
  }, [assets]);

  // Invoice metrics
  const invoiceMetrics = useMemo(() => {
    const now = new Date().toISOString().slice(0, 10);
    const enriched = invoices.map((inv) => ({
      ...inv,
      displayStatus: inv.status === 'sent' && inv.dueDate && inv.dueDate < now ? 'overdue' : inv.status,
    }));
    const counts = { draft: 0, sent: 0, paid: 0, overdue: 0, issued: 0 };
    enriched.forEach((inv) => { counts[inv.displayStatus] = (counts[inv.displayStatus] || 0) + 1; });
    const outstanding = enriched
      .filter((inv) => inv.displayStatus !== 'paid' && inv.displayStatus !== 'draft')
      .reduce((s, inv) => s + getInvoiceTotal(inv), 0);
    return { total: invoices.length, counts, outstanding };
  }, [invoices]);

  // Recent transactions (most recent 6 from both incomes + expenses)
  const recentTx = useMemo(() => {
    const all = [
      ...incomes.map((i) => ({ ...i, type: 'credit', color: '#22c55e' })),
      ...expenses.map((e) => ({ ...e, type: 'debit', color: '#f97316' })),
    ]
      .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
      .slice(0, 6);
    return all;
  }, [incomes, expenses]);

  return (
    <div className="money-dash">
      {/* ── Row 1: Balance overview + Summary cards + My Card ── */}
      <div className="md-row md-row-top">
        {/* Balance overview */}
        <div className="md-card md-card-balance">
          <div className="md-card-head">
            <div>
              <h2 className="md-big-number">{fmt(accountsBalance || balance)}</h2>
              <span className="md-label">Balance overview</span>
            </div>
          </div>
          <BarChart data={chartData} budgetTarget={monthlyBudget} />
          <div className="md-chart-legend">
            <span><span className="md-legend-dot md-dot-essential" />Expenses</span>
            <span><span className="md-legend-dot md-dot-expenses" />Discretionary Spending</span>
            {monthlyBudget > 0 && (
              <span><span className="md-legend-dot md-dot-overbudget" />Over budget</span>
            )}
          </div>
        </div>

        {/* Summary cards */}
        <div className="md-summary-stack">
          <div className="md-card md-summary-item" onClick={() => onNavigate?.('income')} style={{ cursor: onNavigate ? 'pointer' : undefined }}>
            <span className="md-label">Total income</span>
            <h3 className="md-mid-number">{fmt(totalIncome)}</h3>
          </div>
          <div className="md-card md-summary-item" onClick={() => onNavigate?.('expenses')} style={{ cursor: onNavigate ? 'pointer' : undefined }}>
            <span className="md-label">Total expenses</span>
            <h3 className="md-mid-number">{fmt(totalExpenses)}</h3>
          </div>
          <div className="md-card md-summary-item">
            <span className="md-label">Net balance</span>
            <h3 className="md-mid-number">{fmt(balance)}</h3>
          </div>
        </div>

        {/* My Card */}
        <div className="md-card md-my-card">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Accounts</h4>
              <span className="md-label">{accounts.length} account{accounts.length !== 1 ? 's' : ''}</span>
            </div>
            <span className="md-link" onClick={() => onNavigate?.('accounts')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          {accounts.length > 0 ? (
            <div className="md-goals-list">
              {accounts.slice(0, 3).map((a) => (
                <div key={a.id} className="md-goal-row">
                  <CreditCard size={16} style={{ color: 'var(--mod-money)', flexShrink: 0 }} />
                  <div className="md-goal-info">
                    <div className="md-goal-top">
                      <span style={{ fontWeight: 500 }}>{a.name || 'Account'}</span>
                      <span className="md-label">{fmt(Number(a.balance) || 0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="md-label" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              No accounts yet. Add one in the Accounts tab.
            </p>
          )}
          <div className="md-quick-actions">
            <button className="md-action-btn"><PiggyBank size={18} /><span>Top up</span></button>
            <button className="md-action-btn"><ArrowUpRight size={18} /><span>Send</span></button>
            <button className="md-action-btn"><ArrowDownRight size={18} /><span>Request</span></button>
            <button className="md-action-btn"><MoreHorizontal size={18} /><span>More</span></button>
          </div>
        </div>
      </div>

      {/* ── Row 2: Spending limit + Budget tips ── */}
      <div className="md-row md-row-mid">
        <div className="md-card md-spending-limit">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Monthly spending limit</h4>
              <span className="md-label">{monthlyBudget > 0 ? 'From your budgets' : 'Set budgets to track spending'}</span>
            </div>
            <span className="md-link" onClick={() => onNavigate?.('budgets')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
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
          <div className="md-limit-labels">
            <span>{fmt(totalExpenses)}</span>
            <span>{monthlyBudget > 0 ? fmt(monthlyBudget) : '—'}</span>
          </div>
          <ChartTooltip visible={!!limitTip} x={limitTip?.x ?? 0} y={limitTip?.y ?? 0} anchor="above" onDismiss={() => setLimitTip(null)}>
            <div className="chart-tooltip__value">{fmt(totalExpenses)} / {monthlyBudget > 0 ? fmt(monthlyBudget) : 'No budget'}</div>
            {monthlyBudget > 0 && (
              <div className="chart-tooltip__label" style={totalExpenses > monthlyBudget ? { color: 'var(--danger)' } : undefined}>
                {totalExpenses > monthlyBudget
                  ? `${Math.round(((totalExpenses - monthlyBudget) / monthlyBudget) * 100)}% over budget`
                  : `${spendingPct}% of budget`}
              </div>
            )}
          </ChartTooltip>
        </div>
        <div className="md-card md-budget-tips">
          <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>Optimize your budget with these quick tips</h4>
          <p className="md-label" style={{ marginBottom: 'var(--space-3)' }}>
            Track every expense, set category budgets, and review your spending weekly to stay on course.
          </p>
        </div>
      </div>

      {/* ── Row 3: Vendors + Assets + Invoices ── */}
      <div className="md-row md-row-new">
        {/* Vendors */}
        <div className="md-card md-vendors">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Vendors</h4>
              <span className="md-label">{vendorMetrics.activeCount} active</span>
            </div>
            <span className="md-link" onClick={() => onNavigate?.('vendors')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          {vendorMetrics.topVendors.length > 0 ? (
            <div className="md-goals-list">
              {vendorMetrics.topVendors.map((v) => (
                <div key={v.id} className="md-goal-row">
                  <Store size={16} style={{ color: 'var(--mod-money)', flexShrink: 0 }} />
                  <div className="md-goal-info">
                    <div className="md-goal-top">
                      <span style={{ fontWeight: 500 }}>{v.name}</span>
                      <span className="md-label">{fmt(v.spent)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="md-label" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              No vendors yet. Add one in the Vendors tab.
            </p>
          )}
        </div>

        {/* Assets */}
        <div className="md-card md-assets">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Assets</h4>
              <span className="md-label">{assetMetrics.activeCount} active</span>
            </div>
            <span className="md-link" onClick={() => onNavigate?.('assets')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          <h3 className="md-mid-number" style={{ margin: 'var(--space-3) 0' }}>
            {fmt(assetMetrics.totalValue)}
          </h3>
          {assetMetrics.totalValue > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 'var(--space-3)' }}>
              {assetMetrics.gainLoss >= 0
                ? <TrendingUp size={14} style={{ color: 'var(--success)' }} />
                : <TrendingDown size={14} style={{ color: 'var(--danger)' }} />}
              <span className={assetMetrics.gainLoss >= 0 ? 'md-up' : 'md-down'}>
                {assetMetrics.gainLoss >= 0 ? '+' : ''}{fmt(assetMetrics.gainLoss)} ({assetMetrics.gainPct}%)
              </span>
            </div>
          )}
          {assetMetrics.topAssets.length > 0 ? (
            <div className="md-goals-list">
              {assetMetrics.topAssets.map((a) => (
                <div key={a.id} className="md-goal-row">
                  <Package size={16} style={{ color: 'var(--mod-money)', flexShrink: 0 }} />
                  <div className="md-goal-info">
                    <div className="md-goal-top">
                      <span style={{ fontWeight: 500 }}>{a.name}</span>
                      <span className="md-label">{fmt(Number(a.currentValue) || 0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="md-label" style={{ padding: 'var(--space-4)', textAlign: 'center' }}>
              No assets yet. Add one in the Assets tab.
            </p>
          )}
        </div>

        {/* Invoices */}
        <div className="md-card md-invoices">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Invoices</h4>
              <span className="md-label">{invoiceMetrics.total} total</span>
            </div>
            <span className="md-link" onClick={() => onNavigate?.('income')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          <h3 className="md-mid-number" style={{ margin: 'var(--space-3) 0' }}>
            {fmt(invoiceMetrics.outstanding)}
          </h3>
          <span className="md-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>Outstanding</span>
          <div className="md-cost-bars">
            {[
              { label: 'Draft', count: invoiceMetrics.counts.draft, color: '#94a3b8' },
              { label: 'Sent', count: invoiceMetrics.counts.sent + (invoiceMetrics.counts.issued || 0), color: '#3b82f6' },
              { label: 'Paid', count: invoiceMetrics.counts.paid, color: '#22c55e' },
              { label: 'Overdue', count: invoiceMetrics.counts.overdue, color: '#ef4444' },
            ].map((s) => (
              <div key={s.label} className="md-cost-row">
                <div className="md-cost-dot" style={{ background: s.color }} />
                <span className="md-cost-name">{s.label}</span>
                <span className="md-cost-pct">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Row 4: Cost analysis + Financial health + Goals + Transactions ── */}
      <div className="md-row md-row-bottom">
        {/* Cost analysis */}
        <div className="md-card md-cost">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Cost analysis</h4>
              <span className="md-label">Spending by category</span>
            </div>
            <span className="md-link" onClick={() => onNavigate?.('expenses')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          <h3 className="md-mid-number" style={{ margin: 'var(--space-3) 0' }}>{fmt(totalExpenses)}</h3>
          <div className="md-cost-bars">
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
              <p className="md-label">No expenses recorded yet.</p>
            )}
          </div>
          <ChartTooltip visible={!!costTip} x={costTip?.x ?? 0} y={costTip?.y ?? 0} anchor="above" onDismiss={() => setCostTip(null)}>
            <div className="chart-tooltip__value">
              {costTip?.item?.name} &mdash; {costTip?.item?.pct}%
            </div>
            <div className="chart-tooltip__label">
              {fmt(Math.round(totalExpenses * ((costTip?.item?.pct ?? 0) / 100)))} of {fmt(totalExpenses)}
            </div>
          </ChartTooltip>
        </div>

        {/* Financial health */}
        <div className="md-card md-health">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Financial health</h4>
              <span className="md-label">Current status</span>
            </div>
          </div>
          <h3 className="md-mid-number" style={{ margin: 'var(--space-3) 0' }}>{fmt(accountsBalance || balance)}</h3>
          <div className="md-donut-wrap">
            <svg viewBox="0 0 120 120" className="md-donut">
              <circle cx="60" cy="60" r="50" fill="none" stroke="var(--bg3)" strokeWidth="14" />
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
            </svg>
            <div className="md-donut-label">
              <strong>{clampedPct}%</strong>
              <span>{totalIncome > 0 ? 'Of income saved' : 'No income yet'}</span>
            </div>
          </div>
          <ChartTooltip visible={!!donutTip} x={donutTip?.x ?? 0} y={donutTip?.y ?? 0} anchor="above" onDismiss={() => setDonutTip(null)}>
            <div className="chart-tooltip__value">{clampedPct}% saved</div>
            <div className="chart-tooltip__label">Saved: {fmt(Math.max(0, totalIncome - totalExpenses))}</div>
            <div className="chart-tooltip__detail">Spent: {fmt(totalExpenses)}</div>
          </ChartTooltip>
        </div>

        {/* Budget tracker */}
        <div className="md-card md-goals">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Budget tracker</h4>
            </div>
            <span className="md-link" onClick={() => onNavigate?.('budgets')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          <div className="md-goals-list">
            {budgets.length > 0 ? budgets.map((b) => {
              const cat = categories.find((c) => c.id === b.categoryId);
              const spent = expenses
                .filter((e) => e.categoryId === b.categoryId)
                .reduce((s, e) => s + (Number(e.amount) || 0), 0);
              const limit = Number(b.monthlyLimit) || 0;
              return (
                <div key={b.id} className="md-goal-row">
                  <Target size={16} style={{ color: 'var(--mod-money)', flexShrink: 0 }} />
                  <div className="md-goal-info">
                    <div className="md-goal-top">
                      <span style={{ fontWeight: 500 }}>{cat?.name || 'Budget'}</span>
                      <span className="md-label">{fmt(spent)}/{fmt(limit)}</span>
                    </div>
                    <div className="md-progress-bar">
                      <div className="md-progress-fill" style={{ width: `${pct(spent, limit)}%` }} />
                    </div>
                  </div>
                </div>
              );
            }) : (
              <p className="md-label" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                No budgets set. Add budgets to track spending by category.
              </p>
            )}
          </div>
        </div>

        {/* Transaction history */}
        <div className="md-card md-transactions">
          <div className="md-card-head">
            <h4 style={{ fontWeight: 600 }}>Transaction history</h4>
            <span className="md-link" onClick={() => onNavigate?.('income')}>
              View all <ChevronRight size={14} />
            </span>
          </div>
          <div className="md-tx-list">
            {recentTx.length > 0 ? recentTx.map((t) => (
              <div key={t.id} className="md-tx-row">
                <div className="md-tx-icon" style={{ background: t.color + '18', color: t.color }}>
                  {t.type === 'credit' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
                <div className="md-tx-info">
                  <span className="md-tx-name">{t.description || t.source || 'Transaction'}</span>
                  <span className="md-label">{t.date || ''}</span>
                </div>
                <div className="md-tx-amount-col">
                  <span className={`md-tx-amount ${t.type === 'credit' ? 'md-up' : ''}`}>
                    {t.type === 'credit' ? '+' : '-'} {fmt(Number(t.amount) || 0)}
                  </span>
                </div>
              </div>
            )) : (
              <p className="md-label" style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                No transactions yet. Add income or expenses to see them here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
