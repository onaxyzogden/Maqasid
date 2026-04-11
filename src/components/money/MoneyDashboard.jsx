import { useMemo } from 'react';
import {
  TrendingUp, TrendingDown, CreditCard, Target, PiggyBank,
  ArrowUpRight, ArrowDownRight, Plus, MoreHorizontal,
} from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';

/* ─── small helpers ─── */
function fmt(n) { return formatCurrency(n); }
function pct(current, target) { return target ? Math.min(100, Math.round((current / target) * 100)) : 0; }

/* ─── bar chart (pure CSS) ─── */
function BarChart({ data }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.income), 1);
  return (
    <div className="md-chart">
      <div className="md-chart-bars">
        {data.map((d) => (
          <div key={d.day} className="md-chart-col">
            <div className="md-chart-stack" style={{ height: '100%' }}>
              <div className="md-bar md-bar-savings" style={{ height: `${(d.savings / max) * 100}%` }} />
              <div className="md-bar md-bar-income" style={{ height: `${(d.income / max) * 100}%` }} />
              <div className="md-bar md-bar-expenses" style={{ height: `${(d.expenses / max) * 100}%` }} />
            </div>
            <span className="md-chart-label">{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const COLORS = ['#f59e0b', '#f97316', '#fbbf24', '#fcd34d', '#22c55e', '#4ab8a8', '#94a3b8', '#8b5cf6', '#3b82f6', '#ec4899'];

export default function MoneyDashboard() {
  const expenses = useMoneyStore((s) => s.expenses);
  const incomes = useMoneyStore((s) => s.incomes);
  const accounts = useMoneyStore((s) => s.accounts);
  const categories = useMoneyStore((s) => s.categories);
  const budgets = useMoneyStore((s) => s.budgets);

  const { totalIncome, totalExpenses, balance, accountsBalance } = useMemo(() => {
    const ti = incomes.reduce((s, i) => s + (Number(i.amount) || 0), 0);
    const te = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
    const ab = accounts.reduce((s, a) => s + (Number(a.balance) || 0), 0);
    return { totalIncome: ti, totalExpenses: te, balance: ti - te, accountsBalance: ab };
  }, [incomes, expenses, accounts]);

  // Weekly chart data from recent expenses/incomes
  const chartData = useMemo(() => {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    weekStart.setHours(0, 0, 0, 0);

    return DAYS.map((day, i) => {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      const ds = d.toISOString().slice(0, 10);
      const dayIncome = incomes.filter((x) => x.date === ds).reduce((s, x) => s + (Number(x.amount) || 0), 0);
      const dayExpense = expenses.filter((x) => x.date === ds).reduce((s, x) => s + (Number(x.amount) || 0), 0);
      return { day, income: dayIncome, expenses: dayExpense, savings: Math.max(0, dayIncome - dayExpense) };
    });
  }, [incomes, expenses]);

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
            <div className="md-legend">
              <span className="md-legend-dot md-dot-savings" /> Savings
              <span className="md-legend-dot md-dot-income" /> Income
              <span className="md-legend-dot md-dot-expenses" /> Expenses
            </div>
          </div>
          <BarChart data={chartData} />
        </div>

        {/* Summary cards */}
        <div className="md-summary-stack">
          <div className="md-card md-summary-item">
            <span className="md-label">Total income</span>
            <h3 className="md-mid-number">{fmt(totalIncome)}</h3>
          </div>
          <div className="md-card md-summary-item">
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
          </div>
          <div className="md-limit-bar">
            <div className="md-limit-fill" style={{ width: `${spendingPct}%` }} />
          </div>
          <div className="md-limit-labels">
            <span>{fmt(totalExpenses)}</span>
            <span>{monthlyBudget > 0 ? fmt(monthlyBudget) : '—'}</span>
          </div>
        </div>
        <div className="md-card md-budget-tips">
          <h4 style={{ fontWeight: 600, marginBottom: 'var(--space-2)' }}>Optimize your budget with these quick tips</h4>
          <p className="md-label" style={{ marginBottom: 'var(--space-3)' }}>
            Track every expense, set category budgets, and review your spending weekly to stay on course.
          </p>
        </div>
      </div>

      {/* ── Row 3: Cost analysis + Financial health + Goals + Transactions ── */}
      <div className="md-row md-row-bottom">
        {/* Cost analysis */}
        <div className="md-card md-cost">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Cost analysis</h4>
              <span className="md-label">Spending by category</span>
            </div>
          </div>
          <h3 className="md-mid-number" style={{ margin: 'var(--space-3) 0' }}>{fmt(totalExpenses)}</h3>
          <div className="md-cost-bars">
            {costCategories.length > 0 ? costCategories.map((c) => (
              <div key={c.name} className="md-cost-row">
                <div className="md-cost-dot" style={{ background: c.color }} />
                <span className="md-cost-name">{c.name}</span>
                <span className="md-cost-pct">{c.pct}%</span>
              </div>
            )) : (
              <p className="md-label">No expenses recorded yet.</p>
            )}
          </div>
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
                transform="rotate(-90 60 60)" />
            </svg>
            <div className="md-donut-label">
              <strong>{clampedPct}%</strong>
              <span>{totalIncome > 0 ? 'Of income saved' : 'No income yet'}</span>
            </div>
          </div>
        </div>

        {/* Budget tracker */}
        <div className="md-card md-goals">
          <div className="md-card-head">
            <div>
              <h4 style={{ fontWeight: 600 }}>Budget tracker</h4>
            </div>
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
