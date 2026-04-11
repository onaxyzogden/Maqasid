import { useState, useMemo } from 'react';
import { Plus, FileSpreadsheet, DollarSign, Pencil, Trash2, Send, Check, X, Receipt, Clock, Calendar, CreditCard } from 'lucide-react';
import { useMoneyStore, formatCurrency, getInvoiceTotal } from '../../store/money-store';
import { INVOICE_STATUSES, CURRENCIES } from '@data/config/money-categories';
import { genLineItemId } from '../../services/id';
import './ExpenseList.css';

/* ── Invoice Slide-in Panel ── */
function InvoicePanel({ invoice, onClose }) {
  const addInvoice = useMoneyStore((s) => s.addInvoice);
  const updateInvoice = useMoneyStore((s) => s.updateInvoice);
  const accounts = useMoneyStore((s) => s.accounts);
  const isEdit = !!invoice;

  const [clientName, setClientName] = useState(invoice?.clientName || '');
  const [clientEmail, setClientEmail] = useState(invoice?.clientEmail || '');
  const [date, setDate] = useState(invoice?.date || new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(invoice?.dueDate || '');
  const [turnoverDate, setTurnoverDate] = useState(invoice?.turnoverDate || new Date().toISOString().slice(0, 10));
  const [currency, setCurrency] = useState(invoice?.currency || 'CAD');
  const [language, setLanguage] = useState(invoice?.language || 'en');
  const [lineItems, setLineItems] = useState(
    invoice?.lineItems?.length > 0 ? invoice.lineItems : [{ id: genLineItemId(), description: '', quantity: 1, unitPrice: 0, discount: 0, tax: 0 }]
  );
  const [discountTotal, setDiscountTotal] = useState(invoice?.discountTotal || 0);
  const [paymentAccountId, setPaymentAccountId] = useState(invoice?.paymentAccountId || '');
  const [paymentNote, setPaymentNote] = useState(invoice?.paymentNote || '');
  const [isRecurring, setIsRecurring] = useState(invoice?.isRecurring || false);
  const [termsAndConditions, setTermsAndConditions] = useState(invoice?.termsAndConditions || 'THANK YOU!\n1. Full payment is due within the due day displayed on the invoice.\n2. Please pay your invoice on time.');
  const [notes] = useState(invoice?.notes || '');

  const subTotal = lineItems.reduce((s, li) => s + (li.quantity || 0) * (li.unitPrice || 0), 0);
  const total = subTotal - (discountTotal || 0);

  const addLine = () => setLineItems([...lineItems, { id: genLineItemId(), description: '', quantity: 1, unitPrice: 0, discount: 0, tax: 0 }]);
  const removeLine = (id) => { if (lineItems.length > 1) setLineItems(lineItems.filter((li) => li.id !== id)); };
  const updateLine = (id, field, value) => setLineItems(lineItems.map((li) => li.id === id ? { ...li, [field]: value } : li));

  const selectedAccount = accounts.find((a) => a.id === paymentAccountId);

  const handleSave = (status) => {
    if (!clientName) return;
    const data = { clientName, clientEmail, date, dueDate, turnoverDate, currency, language, lineItems, discountTotal, paymentAccountId, paymentNote, isRecurring, termsAndConditions, notes, status };
    if (isEdit) updateInvoice(invoice.id, data);
    else addInvoice(data);
    onClose();
  };

  return (
    <div className="money-slidein-overlay" onClick={onClose}>
      <div className="money-slidein" style={{ width: 600 }} onClick={(e) => e.stopPropagation()}>
        <div className="money-slidein-header">
          <h3>{isEdit ? 'Edit Invoice' : 'New Invoice'}</h3>
          <button className="money-slidein-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="money-slidein-body">
          {/* Billed to */}
          <div className="money-field">
            <label>Billed to *</label>
            <input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client name" autoFocus />
          </div>
          <div className="money-field">
            <label>Client Email</label>
            <input type="email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} placeholder="client@email.com" />
          </div>

          {/* Invoice Details */}
          <div className="money-field-row" style={{ marginBottom: 'var(--space-3)' }}>
            <div className="money-field" style={{ width: 120 }}>
              <label>Language</label>
              <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="en">English (en)</option>
                <option value="fr">French (fr)</option>
                <option value="ar">Arabic (ar)</option>
              </select>
            </div>
            <div className="money-field" style={{ width: 120 }}>
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.id}</option>)}
              </select>
            </div>
          </div>

          <div className="money-field-row">
            <div className="money-field" style={{ flex: 1 }}><label>Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div className="money-field" style={{ flex: 1 }}><label>Due Date *</label><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></div>
            <div className="money-field" style={{ flex: 1 }}><label>Turnover Date</label><input type="date" value={turnoverDate} onChange={(e) => setTurnoverDate(e.target.value)} /></div>
          </div>

          {/* Line Items */}
          <table className="money-table" style={{ marginBottom: 'var(--space-2)', fontSize: '0.8rem' }}>
            <thead>
              <tr><th>Description</th><th style={{ width: 50 }}>Qty</th><th style={{ width: 70 }}>Disc(%)</th><th style={{ width: 60 }}>Tax(%)</th><th style={{ width: 80, textAlign: 'right' }}>Price</th><th style={{ width: 30 }} /></tr>
            </thead>
            <tbody>
              {lineItems.map((li) => (
                <tr key={li.id}>
                  <td><input value={li.description} onChange={(e) => updateLine(li.id, 'description', e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', padding: 4, fontSize: '0.8rem' }} /></td>
                  <td><input type="number" min="1" value={li.quantity} onChange={(e) => updateLine(li.id, 'quantity', Number(e.target.value))} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '0.8rem' }} /></td>
                  <td><input type="number" min="0" max="100" value={li.discount} onChange={(e) => updateLine(li.id, 'discount', Number(e.target.value))} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '0.8rem' }} /></td>
                  <td><input type="number" min="0" value={li.tax} onChange={(e) => updateLine(li.id, 'tax', Number(e.target.value))} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '0.8rem' }} /></td>
                  <td><input type="number" step="0.01" min="0" value={li.unitPrice} onChange={(e) => updateLine(li.id, 'unitPrice', Number(e.target.value))} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'right', fontSize: '0.8rem' }} /></td>
                  <td><button className="row-action-btn danger" onClick={() => removeLine(li.id)} style={{ width: 20, height: 20 }}>&times;</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-ghost" onClick={addLine} style={{ fontSize: '0.8rem', marginBottom: 'var(--space-3)' }}><Plus size={14} /> Add Item</button>

          {/* Totals */}
          <div style={{ textAlign: 'right', marginBottom: 'var(--space-1)', fontSize: '0.85rem' }}>Sub Total <strong>{formatCurrency(subTotal, currency)}</strong></div>
          <div style={{ textAlign: 'right', marginBottom: 'var(--space-2)', fontSize: '0.85rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
            Discount Total <input type="number" value={discountTotal} onChange={(e) => setDiscountTotal(Number(e.target.value))} style={{ width: 80, textAlign: 'right', padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 4, fontSize: '0.85rem' }} />
          </div>
          <div style={{ textAlign: 'right', padding: '8px 12px', background: 'var(--text1)', color: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontWeight: 700, marginBottom: 'var(--space-4)' }}>
            Total {formatCurrency(total, currency)}
          </div>

          {/* Payment Details */}
          <div className="money-field">
            <label>Bank Account</label>
            <select value={paymentAccountId} onChange={(e) => setPaymentAccountId(e.target.value)}>
              <option value="">Choose bank account...</option>
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.bankName} - *{a.accountNumber?.slice(-4) || '0000'} {a.currency}</option>)}
            </select>
          </div>

          {selectedAccount && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: 'var(--space-3)' }}>
              <div>Bank number: <strong>{selectedAccount.accountNumber}</strong></div>
              <div>Bank: <strong>{selectedAccount.bankName}</strong></div>
            </div>
          )}

          <div className="money-field"><label>Payment Note</label><input value={paymentNote} onChange={(e) => setPaymentNote(e.target.value)} placeholder="Payment note" /></div>

          <label className="money-checkbox">
            <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
            Recurring
          </label>

          <div className="money-field">
            <label>Terms & Conditions</label>
            <textarea value={termsAndConditions} onChange={(e) => setTermsAndConditions(e.target.value)} rows={3} />
          </div>
        </div>

        <div className="money-slidein-footer" style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={() => handleSave('draft')} disabled={!clientName}>Create as draft</button>
          <button className="btn btn-secondary" onClick={() => handleSave('issued')} disabled={!clientName}>Create invoice</button>
          <button className="btn btn-primary" onClick={() => handleSave('sent')} disabled={!clientName} style={{ background: 'var(--mod-money)' }}>
            <Send size={14} /> Create & Send
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Income Slide-in Panel ── */
function IncomePanel({ onClose }) {
  const addIncome = useMoneyStore((s) => s.addIncome);
  const accounts = useMoneyStore((s) => s.accounts);
  const [fromType, setFromType] = useState('client');
  const [fromName, setFromName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('CAD');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [accountId, setAccountId] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!fromName.trim()) return;
    addIncome({ fromType, fromName, amount: Number(amount), currency, date, accountId, description });
    onClose();
  };

  return (
    <div className="money-slidein-overlay" onClick={onClose}>
      <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
        <div className="money-slidein-header">
          <h3>Add Income</h3>
          <button className="money-slidein-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="money-slidein-body">
          <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="radio" name="fromType" checked={fromType === 'client'} onChange={() => setFromType('client')} /> From Client
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="radio" name="fromType" checked={fromType === 'other'} onChange={() => setFromType('other')} /> From Other Source
            </label>
          </div>

          <div className="money-field"><label>From *</label><input value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder={fromType === 'client' ? 'Client name' : 'Source name'} autoFocus /></div>

          <div className="money-field-row">
            <div className="money-field" style={{ flex: 1 }}><label>Amount</label><input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" /></div>
            <div className="money-field" style={{ width: 100 }}>
              <label>Currency</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.id}</option>)}
              </select>
            </div>
          </div>

          <div className="money-field"><label>Date</label><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>

          <div className="money-field">
            <label>Bank Account</label>
            <select value={accountId} onChange={(e) => setAccountId(e.target.value)}>
              <option value="">Choose bank account...</option>
              {accounts.map((a) => <option key={a.id} value={a.id}>{a.bankName} - *{a.accountNumber?.slice(-4) || '0000'} {a.currency}</option>)}
            </select>
          </div>

          <div className="money-field"><label>Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" rows={2} /></div>
        </div>
        <div className="money-slidein-footer">
          <button className="btn btn-primary" onClick={handleSave} disabled={!fromName.trim()} style={{ background: 'var(--mod-money)', width: '100%' }}>
            Add new income
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main Income Tab ── */
export default function IncomeTab() {
  const invoices = useMoneyStore((s) => s.invoices);
  const incomes = useMoneyStore((s) => s.incomes);
  const deleteInvoice = useMoneyStore((s) => s.deleteInvoice);
  const deleteIncome = useMoneyStore((s) => s.deleteIncome);
  const setInvoiceStatus = useMoneyStore((s) => s.setInvoiceStatus);
  const [subView, setSubView] = useState('invoices');
  const [statusFilter, setStatusFilter] = useState('all');
  const [payFilter, setPayFilter] = useState('all');
  const [startDate, setStartDate] = useState(new Date().getFullYear() + '-01-01');
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [showInvoicePanel, setShowInvoicePanel] = useState(false);
  const [showIncomePanel, setShowIncomePanel] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  const now = new Date().toISOString().slice(0, 10);

  // Computed invoice statuses
  const enrichedInvoices = useMemo(() =>
    invoices.map((inv) => ({
      ...inv,
      displayStatus: inv.status === 'sent' && inv.dueDate && inv.dueDate < now ? 'overdue' : inv.status,
    })),
  [invoices, now]);

  // Status counts
  const statusCounts = useMemo(() => {
    const m = { all: enrichedInvoices.length };
    INVOICE_STATUSES.forEach((s) => { m[s.id] = 0; });
    enrichedInvoices.forEach((inv) => { m[inv.displayStatus] = (m[inv.displayStatus] || 0) + 1; });
    return m;
  }, [enrichedInvoices]);

  // Filter invoices
  const filteredInvoices = useMemo(() => {
    let list = enrichedInvoices;
    if (statusFilter !== 'all') list = list.filter((inv) => inv.displayStatus === statusFilter);
    if (payFilter === 'paid') list = list.filter((inv) => inv.displayStatus === 'paid');
    else if (payFilter === 'unpaid') list = list.filter((inv) => inv.displayStatus !== 'paid');
    list = list.filter((inv) => inv.date >= startDate && inv.date <= endDate);
    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [enrichedInvoices, statusFilter, payFilter, startDate, endDate]);

  // Filter incomes
  const filteredIncomes = useMemo(() =>
    incomes.filter((i) => i.date >= startDate && i.date <= endDate).sort((a, b) => b.date.localeCompare(a.date)),
  [incomes, startDate, endDate]);

  // Stats
  const stats = useMemo(() => {
    const paidInv = enrichedInvoices.filter((i) => i.displayStatus === 'paid');
    const unpaidInv = enrichedInvoices.filter((i) => i.displayStatus !== 'paid' && i.displayStatus !== 'draft');
    const totalIncome = [...paidInv.map((i) => getInvoiceTotal(i)), ...incomes.map((i) => i.amount || 0)].reduce((s, a) => s + a, 0);
    const totalPaid = paidInv.reduce((s, i) => s + getInvoiceTotal(i), 0);
    const totalUnpaid = unpaidInv.reduce((s, i) => s + getInvoiceTotal(i), 0);
    return { totalIncome, totalPaid, totalUnpaid };
  }, [enrichedInvoices, incomes]);

  // Revenue by source
  const revenueSources = useMemo(() => {
    const m = {};
    incomes.forEach((i) => {
      const src = i.fromName || 'Unknown';
      m[src] = (m[src] || 0) + (i.amount || 0);
    });
    enrichedInvoices.filter((i) => i.displayStatus === 'paid').forEach((inv) => {
      const src = inv.clientName || 'Unknown';
      m[src] = (m[src] || 0) + getInvoiceTotal(inv);
    });
    return Object.entries(m).sort((a, b) => b[1] - a[1]);
  }, [enrichedInvoices, incomes]);

  const currency = invoices[0]?.currency || incomes[0]?.currency || 'CAD';

  return (
    <div>
      {/* Sub toggle + filters */}
      <div className="expense-filter-bar">
        <div className="expense-filter-left" style={{ gap: 'var(--space-3)' }}>
          <div className="income-subtoggle">
            <button className={`income-subtoggle-btn ${subView === 'invoices' ? 'active' : ''}`} onClick={() => setSubView('invoices')}>Invoices</button>
            <button className={`income-subtoggle-btn ${subView === 'incomes' ? 'active' : ''}`} onClick={() => setSubView('incomes')}>Incomes</button>
          </div>
          <div className="money-toggle-group">
            <button className={`money-toggle-btn ${payFilter === 'all' ? 'active' : ''}`} onClick={() => setPayFilter('all')}>All</button>
            <button className={`money-toggle-btn paid ${payFilter === 'paid' ? 'active' : ''}`} onClick={() => setPayFilter('paid')}>Paid</button>
            <button className={`money-toggle-btn unpaid ${payFilter === 'unpaid' ? 'active' : ''}`} onClick={() => setPayFilter('unpaid')}>Unpaid</button>
          </div>
        </div>
        <div className="expense-filter-right">
          <div className="money-date-range">
            <div className="money-date-field"><span>Start</span><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
            <span className="money-date-sep">&mdash;</span>
            <div className="money-date-field"><span>End</span><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditInvoice(null); setShowInvoicePanel(true); }} style={{ background: 'var(--mod-money)' }}>
            <Plus size={14} /> Create Invoice
          </button>
          <button className="btn btn-secondary" onClick={() => setShowIncomePanel(true)}>
            <Plus size={14} /> Add Income
          </button>
        </div>
      </div>

      {/* Status pills (invoices view) */}
      {subView === 'invoices' && (
        <div className="income-status-pills">
          <button className={`income-status-pill ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>
            All ({statusCounts.all})
          </button>
          {INVOICE_STATUSES.map((s) => (
            <button key={s.id} className={`income-status-pill ${statusFilter === s.id ? 'active' : ''}`} onClick={() => setStatusFilter(statusFilter === s.id ? 'all' : s.id)}>
              <span className="income-status-dot" style={{ background: s.color }} />
              {s.label} ({statusCounts[s.id] || 0})
            </button>
          ))}
        </div>
      )}

      {/* Main layout */}
      <div className="income-layout">
        <div className="expense-table-area">
          {subView === 'invoices' ? (
            /* Invoices table */
            filteredInvoices.length === 0 ? (
              <div className="money-empty-state">
                <p>No invoices for {new Date(startDate).toLocaleDateString('en', { day: '2-digit', month: 'short', year: 'numeric' })} - {new Date(endDate).toLocaleDateString('en', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
              </div>
            ) : (
              <table className="money-table">
                <thead><tr><th>Invoice #</th><th>Client</th><th>Date</th><th>Due Date</th><th style={{ textAlign: 'right' }}>Total</th><th>Status</th><th style={{ width: 100 }} /></tr></thead>
                <tbody>
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="expense-row" onClick={() => { setEditInvoice(inv); setShowInvoicePanel(true); }}>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 500 }}>{inv.number}</td>
                      <td>{inv.clientName || '—'}</td>
                      <td>{new Date(inv.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</td>
                      <td>{inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : '—'}</td>
                      <td style={{ textAlign: 'right' }} className="amount">{formatCurrency(getInvoiceTotal(inv), inv.currency)}</td>
                      <td><span className={`status-badge status-${inv.displayStatus}`}>{inv.displayStatus}</span></td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <div className="row-actions" style={{ opacity: 1 }}>
                          {inv.status === 'draft' && <button className="row-action-btn" onClick={() => setInvoiceStatus(inv.id, 'sent')} title="Send"><Send size={14} /></button>}
                          {['sent', 'issued', 'overdue'].includes(inv.displayStatus) && <button className="row-action-btn" onClick={() => setInvoiceStatus(inv.id, 'paid')} title="Mark Paid"><Check size={14} /></button>}
                          <button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteInvoice(inv.id); }}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : (
            /* Incomes table */
            filteredIncomes.length === 0 ? (
              <div className="money-empty-state"><p>No income entries yet</p></div>
            ) : (
              <table className="money-table">
                <thead><tr><th>Date</th><th>From</th><th>Type</th><th>Description</th><th style={{ textAlign: 'right' }}>Amount</th><th style={{ width: 40 }} /></tr></thead>
                <tbody>
                  {filteredIncomes.map((inc) => (
                    <tr key={inc.id}>
                      <td>{new Date(inc.date).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td style={{ fontWeight: 500 }}>{inc.fromName}</td>
                      <td><span style={{ fontSize: '0.75rem', textTransform: 'capitalize' }}>{inc.fromType}</span></td>
                      <td style={{ maxWidth: 200 }} className="truncate">{inc.description || '—'}</td>
                      <td style={{ textAlign: 'right' }}><span className="amount" style={{ color: '#16a34a' }}>+{formatCurrency(inc.amount, inc.currency)}</span></td>
                      <td><button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteIncome(inc.id); }}><Trash2 size={14} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          )}
        </div>

        {/* Stats sidebar */}
        <aside className="income-sidebar">
          <div className="income-stat-cards">
            <div className="income-stat-card"><Receipt size={16} className="stat-icon" /><div className="stat-value">{formatCurrency(stats.totalIncome, currency)}</div><div className="stat-label">total income</div></div>
            <div className="income-stat-card"><DollarSign size={16} className="stat-icon" /><div className="stat-value">{formatCurrency(stats.totalPaid, currency)}</div><div className="stat-label">total paid</div></div>
            <div className="income-stat-card"><CreditCard size={16} className="stat-icon" /><div className="stat-value">{formatCurrency(stats.totalUnpaid, currency)}</div><div className="stat-label">total unpaid</div></div>
            <div className="income-stat-card"><Clock size={16} className="stat-icon" /><div className="stat-value">0 days</div><div className="stat-label">avg. pay time</div></div>
          </div>

          <div className="income-chart-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
              <h4 style={{ margin: 0 }}>Cash Flow</h4>
              <span className="money-currency-badge">{currency}</span>
            </div>
            <div style={{ height: 80, borderBottom: '2px solid var(--mod-money)', opacity: 0.3, borderRadius: '0 0 4px 4px' }} />
          </div>

          <div className="income-chart-card">
            <h4>Revenue by source</h4>
            {revenueSources.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>No data</div>
            ) : (
              <table className="revenue-table">
                <thead><tr><th>#</th><th>Source</th><th style={{ textAlign: 'right' }}>Total Amount</th></tr></thead>
                <tbody>
                  {revenueSources.map(([source, total], i) => (
                    <tr key={source}><td>{i + 1}</td><td>{source}</td><td style={{ textAlign: 'right' }}>{formatCurrency(total, currency)}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </aside>
      </div>

      {showInvoicePanel && <InvoicePanel invoice={editInvoice} onClose={() => { setShowInvoicePanel(false); setEditInvoice(null); }} />}
      {showIncomePanel && <IncomePanel onClose={() => setShowIncomePanel(false)} />}
    </div>
  );
}
