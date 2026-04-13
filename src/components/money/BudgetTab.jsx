import { useState, useMemo } from 'react';
import { Plus, Search, X, Pencil, Trash2, Target, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';

/* ─── helpers ─── */
const fmt = (n) => formatCurrency(n);
const pct = (spent, limit) => (limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0);

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const currentPrefix = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;

/* ─── Slide-in panel ─── */
function BudgetPanel({ budget, usedCategoryIds, onClose }) {
  const categories = useMoneyStore((s) => s.categories);
  const addBudget = useMoneyStore((s) => s.addBudget);
  const updateBudget = useMoneyStore((s) => s.updateBudget);
  const isEdit = !!budget;

  const [categoryId, setCategoryId] = useState(budget?.categoryId || '');
  const [monthlyLimit, setMonthlyLimit] = useState(budget?.monthlyLimit?.toString() || '');

  // Only show categories that don't already have a budget (unless editing that budget)
  const availableCategories = categories.filter(
    (c) => !usedCategoryIds.has(c.id) || (isEdit && c.id === budget.categoryId),
  );

  const handleSave = () => {
    if (!categoryId || !monthlyLimit) return;
    if (isEdit) updateBudget(budget.id, { categoryId, monthlyLimit: Number(monthlyLimit) });
    else addBudget({ categoryId, monthlyLimit: Number(monthlyLimit) });
    onClose();
  };

  return (
    <div className="money-slidein-overlay" onClick={onClose}>
      <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
        <div className="money-slidein-header">
          <h3>{isEdit ? 'Edit Budget' : 'Add Budget'}</h3>
          <button className="money-slidein-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="money-slidein-body">
          <div className="money-field">
            <label>Category *</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Select a category</option>
              {availableCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="money-field">
            <label>Monthly Limit *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              placeholder="0.00"
              autoFocus
            />
          </div>
        </div>
        <div className="money-slidein-footer">
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!categoryId || !monthlyLimit || Number(monthlyLimit) <= 0}
            style={{ background: 'var(--mod-money)', width: '100%' }}
          >
            {isEdit ? 'Save' : 'Add Budget'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main tab ─── */
export default function BudgetTab() {
  const budgets = useMoneyStore((s) => s.budgets);
  const categories = useMoneyStore((s) => s.categories);
  const expenses = useMoneyStore((s) => s.expenses);
  const deleteBudget = useMoneyStore((s) => s.deleteBudget);

  const [search, setSearch] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [editBudget, setEditBudget] = useState(null);

  // Spending by category for current month
  const spentByCategory = useMemo(() => {
    const m = {};
    expenses.forEach((e) => {
      if (e.date?.startsWith(currentPrefix) && e.categoryId) {
        m[e.categoryId] = (m[e.categoryId] || 0) + (Number(e.amount) || 0);
      }
    });
    return m;
  }, [expenses]);

  // Enrich budgets with category info and spending
  const enriched = useMemo(() => {
    return budgets.map((b) => {
      const cat = categories.find((c) => c.id === b.categoryId);
      const spent = spentByCategory[b.categoryId] || 0;
      const limit = Number(b.monthlyLimit) || 0;
      const remaining = limit - spent;
      const percent = pct(spent, limit);
      return { ...b, cat, spent, limit, remaining, percent };
    });
  }, [budgets, categories, spentByCategory]);

  // Filter by search
  const filtered = useMemo(() => {
    if (!search.trim()) return enriched;
    const q = search.toLowerCase();
    return enriched.filter((b) => b.cat?.name?.toLowerCase().includes(q));
  }, [enriched, search]);

  // Summary totals
  const summary = useMemo(() => {
    const totalBudget = enriched.reduce((s, b) => s + b.limit, 0);
    const totalSpent = enriched.reduce((s, b) => s + b.spent, 0);
    const totalRemaining = totalBudget - totalSpent;
    const overBudgetCount = enriched.filter((b) => b.spent > b.limit).length;
    return { totalBudget, totalSpent, totalRemaining, overBudgetCount };
  }, [enriched]);

  // Set of categoryIds already used by a budget
  const usedCategoryIds = useMemo(() => new Set(budgets.map((b) => b.categoryId)), [budgets]);

  const monthLabel = now.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div>
      {/* Filter bar */}
      <div className="money-filter-bar">
        <div className="money-toggle-group">
          <span style={{ fontSize: '0.85rem', fontWeight: 500, padding: '6px 12px', color: 'var(--text2)' }}>
            {monthLabel}
          </span>
        </div>
        <div className="money-filter-right">
          <button
            className="btn btn-primary"
            onClick={() => { setEditBudget(null); setShowPanel(true); }}
            style={{ background: 'var(--mod-money)' }}
          >
            <Plus size={14} /> Add Budget
          </button>
        </div>
      </div>

      {/* Search */}
      {budgets.length > 0 && (
        <div className="money-search-bar">
          <Search size={14} className="money-search-icon" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by category" className="money-search-input" />
        </div>
      )}

      {/* Summary strip */}
      {budgets.length > 0 && (
        <div className="budget-summary-strip">
          <div className="budget-summary-item">
            <span className="budget-summary-label">Total Budget</span>
            <span className="budget-summary-value">{fmt(summary.totalBudget)}</span>
          </div>
          <div className="budget-summary-item">
            <span className="budget-summary-label">Spent</span>
            <span className="budget-summary-value budget-spent">{fmt(summary.totalSpent)}</span>
          </div>
          <div className="budget-summary-item">
            <span className="budget-summary-label">Remaining</span>
            <span className={`budget-summary-value ${summary.totalRemaining < 0 ? 'budget-over' : 'budget-under'}`}>
              {fmt(summary.totalRemaining)}
            </span>
          </div>
          {summary.overBudgetCount > 0 && (
            <div className="budget-summary-item budget-summary-alert">
              <AlertTriangle size={14} />
              <span>{summary.overBudgetCount} over budget</span>
            </div>
          )}
        </div>
      )}

      {/* Budget list */}
      {filtered.length === 0 ? (
        <div className="money-empty-state">
          <p>{budgets.length === 0 ? 'No budgets set. Add a budget to start tracking spending by category.' : 'No matching budgets.'}</p>
        </div>
      ) : (
        <div className="budget-list">
          {filtered.map((b) => (
            <div key={b.id} className={`budget-card ${b.percent >= 100 ? 'budget-card-over' : ''}`}>
              <div className="budget-card-top">
                <div className="budget-card-category">
                  <div className="budget-cat-dot" style={{ background: b.cat?.color || 'var(--text3)' }} />
                  <span className="budget-cat-name">{b.cat?.name || 'Unknown'}</span>
                </div>
                <div className="row-actions">
                  <button className="row-action-btn" onClick={() => { setEditBudget(b); setShowPanel(true); }} title="Edit">
                    <Pencil size={14} />
                  </button>
                  <button className="row-action-btn danger" onClick={() => { if (confirm('Delete this budget?')) deleteBudget(b.id); }} title="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="budget-card-amounts">
                <span className="budget-amount-spent">{fmt(b.spent)}</span>
                <span className="budget-amount-sep">/</span>
                <span className="budget-amount-limit">{fmt(b.limit)}</span>
              </div>

              <div className="budget-progress-bar">
                <div
                  className={`budget-progress-fill ${b.percent >= 100 ? 'budget-fill-over' : b.percent >= 80 ? 'budget-fill-warn' : ''}`}
                  style={{ width: `${Math.min(b.percent, 100)}%` }}
                />
              </div>

              <div className="budget-card-footer">
                <span className={`budget-status ${b.remaining < 0 ? 'budget-over' : 'budget-under'}`}>
                  {b.remaining < 0
                    ? <><TrendingUp size={12} /> Over by {fmt(Math.abs(b.remaining))}</>
                    : <><TrendingDown size={12} /> {fmt(b.remaining)} left</>
                  }
                </span>
                <span className="budget-pct">{b.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showPanel && (
        <BudgetPanel
          budget={editBudget}
          usedCategoryIds={usedCategoryIds}
          onClose={() => { setShowPanel(false); setEditBudget(null); }}
        />
      )}
    </div>
  );
}
