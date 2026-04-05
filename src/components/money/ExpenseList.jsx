import { useState, useMemo } from 'react';
import { Plus, Receipt, TrendingUp, TrendingDown, BarChart3, DollarSign, ChevronRight, Search, MoreVertical } from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';
import ExpensePanel from './ExpensePanel';
import './ExpenseList.css';

const PAGE_SIZES = [10, 20, 30, 50];

export default function ExpenseList() {
  const expenses = useMoneyStore((s) => s.expenses);
  const categories = useMoneyStore((s) => s.categories);
  const vendors = useMoneyStore((s) => s.vendors);
  const [statusFilter, setStatusFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(new Date().getFullYear() + '-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [showPanel, setShowPanel] = useState(false);
  const [editExpense, setEditExpense] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);

  const catMap = useMemo(() => {
    const m = {};
    categories.forEach((c) => { m[c.id] = c; });
    return m;
  }, [categories]);

  const vendorMap = useMemo(() => {
    const m = {};
    vendors.forEach((v) => { m[v.id] = v; });
    return m;
  }, [vendors]);

  const filtered = useMemo(() => {
    let list = [...expenses];
    // Status filter
    if (statusFilter === 'paid') list = list.filter((e) => e.status === 'paid');
    else if (statusFilter === 'unpaid') list = list.filter((e) => e.status !== 'paid');
    // Category filter
    if (catFilter !== 'all') list = list.filter((e) => e.categoryId === catFilter);
    // Date range
    if (startDate) list = list.filter((e) => (e.date || e.createdAt?.slice(0, 10)) >= startDate);
    if (endDate) list = list.filter((e) => (e.date || e.createdAt?.slice(0, 10)) <= endDate);
    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((e) =>
        (e.description || '').toLowerCase().includes(q) ||
        (e.payee || '').toLowerCase().includes(q) ||
        (vendorMap[e.vendorId]?.name || '').toLowerCase().includes(q)
      );
    }
    // Sort by date desc
    list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    return list;
  }, [expenses, statusFilter, catFilter, search, startDate, endDate, vendorMap]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  // Stats
  const stats = useMemo(() => {
    if (filtered.length === 0) return { largest: 0, smallest: 0, average: 0, cumulative: 0 };
    const amounts = filtered.map((e) => e.amount || 0);
    const cumulative = amounts.reduce((s, a) => s + a, 0);
    return {
      largest: Math.max(...amounts),
      smallest: Math.min(...amounts),
      average: cumulative / amounts.length,
      cumulative,
    };
  }, [filtered]);

  // Category breakdown for pie
  const catBreakdown = useMemo(() => {
    const m = {};
    filtered.forEach((e) => {
      const cat = catMap[e.categoryId];
      const key = cat?.name || 'Uncategorized';
      if (!m[key]) m[key] = { amount: 0, color: cat?.color || '#6b7280' };
      m[key].amount += e.amount || 0;
    });
    return Object.entries(m).sort((a, b) => b[1].amount - a[1].amount);
  }, [filtered, catMap]);

  // Monthly totals for chart
  const monthlyData = useMemo(() => {
    const m = {};
    filtered.forEach((e) => {
      const month = (e.date || '').slice(0, 7);
      if (month) m[month] = (m[month] || 0) + (e.amount || 0);
    });
    return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const handleEdit = (exp) => { setEditExpense(exp); setShowPanel(true); };
  const closePanel = () => { setShowPanel(false); setEditExpense(null); };
  const currency = expenses[0]?.currency || 'CAD';

  if (expenses.length === 0 && !showPanel) {
    return (
      <div className="money-empty">
        <Receipt size={40} className="money-empty-icon" />
        <h4>No expenses yet</h4>
        <p>Track your business expenses to understand where money goes.</p>
        <button className="btn btn-primary" onClick={() => setShowPanel(true)} style={{ background: 'var(--mod-money)' }}>
          <Plus size={16} /> Add Expense
        </button>
        {showPanel && <ExpensePanel expense={null} onClose={closePanel} />}
      </div>
    );
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="expense-filter-bar">
        <div className="expense-filter-left">
          <div className="money-toggle-group">
            <button className={`money-toggle-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
            <button className={`money-toggle-btn paid ${statusFilter === 'paid' ? 'active' : ''}`} onClick={() => setStatusFilter('paid')}>Paid</button>
            <button className={`money-toggle-btn unpaid ${statusFilter === 'unpaid' ? 'active' : ''}`} onClick={() => setStatusFilter('unpaid')}>Unpaid</button>
          </div>
        </div>
        <div className="expense-filter-right">
          <div className="money-search-compact">
            <Search size={14} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" />
          </div>
          <div className="money-date-range">
            <div className="money-date-field"><span>Start</span><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
            <span className="money-date-sep">&mdash;</span>
            <div className="money-date-field"><span>End</span><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditExpense(null); setShowPanel(true); }} style={{ background: 'var(--mod-money)' }}>
            <Plus size={14} /> Add Expense
          </button>
        </div>
      </div>

      {/* Category tabs */}
      <div className="expense-cat-tabs">
        <button className={`expense-cat-tab ${catFilter === 'all' ? 'active' : ''}`} onClick={() => setCatFilter('all')}>Across all</button>
        {categories.map((c) => (
          <button key={c.id} className={`expense-cat-tab ${catFilter === c.id ? 'active' : ''}`} onClick={() => setCatFilter(catFilter === c.id ? 'all' : c.id)}>
            {c.name}
          </button>
        ))}
        <div className="expense-cat-scroll-hint"><ChevronRight size={14} /></div>
      </div>

      {/* Main layout */}
      <div className="expense-layout">
        {/* Table */}
        <div className="expense-table-area">
          <table className="money-table">
            <thead>
              <tr>
                <th>Created on</th>
                <th>Vendor</th>
                <th>Expense</th>
                <th>Category</th>
                <th>Due Date</th>
                <th>Date Paid</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                <th style={{ width: 32 }} />
              </tr>
            </thead>
            <tbody>
              {paginated.map((exp) => {
                const cat = catMap[exp.categoryId];
                const vendor = vendorMap[exp.vendorId];
                return (
                  <tr key={exp.id} className="expense-row" onClick={() => handleEdit(exp)}>
                    <td>{new Date(exp.date || exp.createdAt).toLocaleDateString('en', { month: 'short', day: '2-digit', year: 'numeric' })}</td>
                    <td>{vendor?.name || exp.payee || '—'}</td>
                    <td className="expense-name-cell">{exp.description || '—'}</td>
                    <td>{cat?.name || '—'}</td>
                    <td>{exp.dueDate ? new Date(exp.dueDate).toLocaleDateString('en', { month: 'short', day: '2-digit', year: 'numeric' }) : '—'}</td>
                    <td>{exp.datePaid ? new Date(exp.datePaid).toLocaleDateString('en', { month: 'short', day: '2-digit', year: 'numeric' }) : '—'}</td>
                    <td><span className={`status-badge status-${exp.status || 'unpaid'}`}>{exp.status === 'paid' ? 'Paid' : 'Unpaid'}</span></td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="amount" style={{ color: 'var(--danger)' }}>-{formatCurrency(exp.amount, exp.currency || currency)}</span>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}><button className="row-action-btn"><MoreVertical size={14} /></button></td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: 'var(--space-6)', color: 'var(--text2)' }}>No expenses match filters</td></tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="expense-pagination">
            <div className="expense-pagination-size">
              Rows per page:
              <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}>
                {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <span>{(page - 1) * pageSize + 1}&ndash;{Math.min(page * pageSize, filtered.length)} of {filtered.length}</span>
            <div className="expense-pagination-nav">
              <button disabled={page <= 1} onClick={() => setPage(page - 1)}>&lsaquo;</button>
              <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>&rsaquo;</button>
            </div>
          </div>
        </div>

        {/* Stats sidebar */}
        <aside className="expense-stats-sidebar">
          <div className="expense-stat-cards">
            <div className="expense-stat-card">
              <TrendingUp size={18} className="expense-stat-icon" />
              <div className="expense-stat-value">{formatCurrency(stats.largest, currency)}</div>
              <div className="expense-stat-label">largest expense</div>
            </div>
            <div className="expense-stat-card">
              <TrendingDown size={18} className="expense-stat-icon" />
              <div className="expense-stat-value">{formatCurrency(stats.smallest, currency)}</div>
              <div className="expense-stat-label">smallest expense</div>
            </div>
            <div className="expense-stat-card">
              <BarChart3 size={18} className="expense-stat-icon" />
              <div className="expense-stat-value">{formatCurrency(stats.average, currency)}</div>
              <div className="expense-stat-label">average expense</div>
            </div>
            <div className="expense-stat-card">
              <DollarSign size={18} className="expense-stat-icon" />
              <div className="expense-stat-value">{formatCurrency(stats.cumulative, currency)}</div>
              <div className="expense-stat-label">cumulative expenses</div>
            </div>
          </div>

          {/* Monthly chart */}
          <div className="expense-chart-card">
            <div className="expense-mini-chart">
              {monthlyData.length > 0 ? (
                <div className="bar-chart-mini">
                  {monthlyData.map(([month, amount]) => {
                    const maxVal = Math.max(...monthlyData.map(([, a]) => a));
                    const pct = maxVal ? (amount / maxVal) * 100 : 0;
                    return (
                      <div key={month} className="bar-chart-col">
                        <div className="bar-chart-bar" style={{ height: `${pct}%` }} />
                        <span>{new Date(month + '-01').toLocaleDateString('en', { month: 'short' })}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text2)', padding: 'var(--space-4)' }}>No data</div>
              )}
            </div>
          </div>

          {/* Category pie */}
          <div className="expense-chart-card">
            <div className="expense-pie-legend">
              {catBreakdown.map(([name, { color }]) => (
                <div key={name} className="pie-legend-item">
                  <span className="pie-legend-dot" style={{ background: color }} />
                  {name}
                </div>
              ))}
            </div>
            <div className="expense-pie-container">
              <svg viewBox="0 0 100 100" className="expense-pie-svg">
                {(() => {
                  const total = catBreakdown.reduce((s, [, { amount }]) => s + amount, 0);
                  if (total === 0) return <circle cx="50" cy="50" r="40" fill="var(--border)" />;
                  let cumAngle = 0;
                  return catBreakdown.map(([name, { amount, color }]) => {
                    const pct = amount / total;
                    const startAngle = cumAngle * 2 * Math.PI;
                    cumAngle += pct;
                    const endAngle = cumAngle * 2 * Math.PI;
                    const largeArc = pct > 0.5 ? 1 : 0;
                    const x1 = 50 + 40 * Math.sin(startAngle);
                    const y1 = 50 - 40 * Math.cos(startAngle);
                    const x2 = 50 + 40 * Math.sin(endAngle);
                    const y2 = 50 - 40 * Math.cos(endAngle);
                    if (catBreakdown.length === 1) return <circle key={name} cx="50" cy="50" r="40" fill={color} />;
                    return <path key={name} d={`M50,50 L${x1},${y1} A40,40 0 ${largeArc},1 ${x2},${y2} Z`} fill={color} />;
                  });
                })()}
              </svg>
            </div>
          </div>
        </aside>
      </div>

      {showPanel && <ExpensePanel expense={editExpense} onClose={closePanel} />}
    </div>
  );
}
