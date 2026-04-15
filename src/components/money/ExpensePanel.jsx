import { useState } from 'react';
import { X, Plus, Pencil } from 'lucide-react';
import { useMoneyStore } from '../../store/money-store';
import { useToastStore } from '../../store/toast-store';
import { CURRENCIES } from '@data/config/money-categories';
import CategoryPanel from './CategoryPanel';

export default function ExpensePanel({ expense, onClose }) {
  const categories = useMoneyStore((s) => s.categories);
  const vendors = useMoneyStore((s) => s.vendors);
  const addExpense = useMoneyStore((s) => s.addExpense);
  const updateExpense = useMoneyStore((s) => s.updateExpense);
  const deleteExpense = useMoneyStore((s) => s.deleteExpense);
  const markExpensePaid = useMoneyStore((s) => s.markExpensePaid);
  const markExpenseUnpaid = useMoneyStore((s) => s.markExpenseUnpaid);
  const addVendor = useMoneyStore((s) => s.addVendor);
  const addToast = useToastStore((s) => s.addToast);
  const isEdit = !!expense;

  const [description, setDescription] = useState(expense?.description || '');
  const [categoryId, setCategoryId] = useState(expense?.categoryId || '');
  const [amount, setAmount] = useState(expense?.amount || '');
  const [currency, setCurrency] = useState(expense?.currency || 'CAD');
  const [dueDate, setDueDate] = useState(expense?.dueDate || '');
  const [vendorId, setVendorId] = useState(expense?.vendorId || '');
  const [note, setNote] = useState(expense?.note || expense?.receiptNotes || '');
  const [tags, setTags] = useState(expense?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState(expense?.status || 'unpaid');
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [newVendorName, setNewVendorName] = useState('');
  const [categoryPanelOpen,     setCategoryPanelOpen]     = useState(false);
  const [categoryPanelCategory, setCategoryPanelCategory] = useState(null);

  // Derived: currently selected category object
  const selectedCategory = categories.find((c) => c.id === categoryId) ?? null;

  const handleSave = () => {
    if (!description.trim()) return;
    const data = { description, categoryId, amount: Number(amount), currency, dueDate, vendorId, note, tags, status };
    if (isEdit) {
      updateExpense(expense.id, data);
      addToast({ message: 'Expense updated', type: 'success', variant: 'chip' });
    } else {
      addExpense({ ...data, date: new Date().toISOString().slice(0, 10) });
      addToast({ message: 'Expense added', type: 'success', variant: 'chip' });
    }
    onClose();
  };

  const handleDelete = () => {
    if (isEdit && confirm('Delete this expense?')) {
      deleteExpense(expense.id);
      addToast({ message: `"${expense.description}" removed`, type: 'info' });
      onClose();
    }
  };

  const handleMarkPaid = () => {
    if (isEdit) {
      if (status === 'paid') { markExpenseUnpaid(expense.id); setStatus('unpaid'); }
      else { markExpensePaid(expense.id); setStatus('paid'); }
    } else {
      setStatus(status === 'paid' ? 'unpaid' : 'paid');
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleAddVendor = () => {
    if (newVendorName.trim()) {
      const v = addVendor({ name: newVendorName.trim() });
      setVendorId(v.id);
      setNewVendorName('');
      setShowAddVendor(false);
    }
  };

  const handleNewCategory = () => {
    setCategoryPanelCategory(null);
    setCategoryPanelOpen(true);
  };

  const handleEditCategory = () => {
    if (!selectedCategory || selectedCategory.isPreset) return;
    setCategoryPanelCategory(selectedCategory);
    setCategoryPanelOpen(true);
  };

  const handleCategoryPanelClose = (saved) => {
    setCategoryPanelOpen(false);
    setCategoryPanelCategory(null);
    if (saved) setCategoryId(saved.id);
  };

  return (
    <>
    <div className="money-slidein-overlay" onClick={onClose}>
      <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
        <div className="money-slidein-header">
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button type="button" className={`money-status-toggle ${status === 'paid' ? 'active-paid' : ''}`} onClick={() => setStatus('paid')}>Paid</button>
            <button type="button" className={`money-status-toggle ${status === 'unpaid' ? 'active-unpaid' : ''}`} onClick={() => setStatus('unpaid')}>Unpaid</button>
          </div>
          <button type="button" className="money-slidein-close" onClick={onClose} aria-label="Close panel"><X size={18} /></button>
        </div>

        <div className="money-slidein-body">
          <div className="money-panel-label">EXPENSE</div>
          <input
            id="expense-description"
            className="money-panel-title-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Expense name"
            aria-label="Expense name"
            aria-required="true"
            autoFocus
          />

          <div className="money-field-row" style={{ marginTop: 'var(--space-4)' }}>
            <div className="money-field" style={{ flex: 1 }}>
              <label htmlFor="expense-category">Category</label>
              <div style={{ display: 'flex', gap: 4 }}>
                <select id="expense-category" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ flex: 1 }}>
                  <option value="">Select...</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              {selectedCategory && !selectedCategory.isPreset && (
                <button type="button" className="btn btn-ghost" onClick={handleEditCategory} title="Edit category" aria-label="Edit category" style={{ padding: '0 6px' }}>
                  <Pencil size={14} />
                </button>
              )}
              <button type="button" className="btn btn-ghost" onClick={handleNewCategory} title="New category" aria-label="New category" style={{ padding: '0 6px', fontSize: '0.85rem' }}>
                <Plus size={14} />
              </button>
              </div>
            </div>
            <div className="money-field" style={{ width: 120 }}>
              <label htmlFor="expense-amount">Amount</label>
              <input id="expense-amount" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" />
            </div>
            <div className="money-field" style={{ width: 100 }}>
              <label htmlFor="expense-currency">Currency</label>
              <select id="expense-currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {CURRENCIES.map((c) => <option key={c.id} value={c.id}>{c.flag} {c.id}</option>)}
              </select>
            </div>
          </div>

          <div className="money-field">
            <label htmlFor="expense-due-date">Due date</label>
            <input id="expense-due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>

          <div className="money-field">
            <label htmlFor="expense-vendor">Vendor</label>
            {showAddVendor ? (
              <div style={{ display: 'flex', gap: 4 }}>
                <input value={newVendorName} onChange={(e) => setNewVendorName(e.target.value)} placeholder="Vendor name" aria-label="New vendor name" style={{ flex: 1 }} autoFocus />
                <button type="button" className="btn btn-ghost" onClick={handleAddVendor}>Add</button>
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddVendor(false)}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 4 }}>
                <select id="expense-vendor" value={vendorId} onChange={(e) => setVendorId(e.target.value)} style={{ flex: 1 }}>
                  <option value="">Select vendor...</option>
                  {vendors.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
                <button type="button" className="btn btn-ghost" onClick={() => setShowAddVendor(true)} title="Add new" aria-label="Add new vendor" style={{ padding: '0 6px', fontSize: '0.85rem' }}><Plus size={14} /></button>
              </div>
            )}
          </div>

          <div className="money-field">
            <label htmlFor="expense-note">Note</label>
            <textarea id="expense-note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" rows={3} className="money-note-input" />
          </div>

          <div className="money-field">
            <label htmlFor="expense-tag-input">Tags</label>
            <div className="money-tags">
              {tags.map((t) => (
                <span key={t} className="money-tag">
                  {t}
                  <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} aria-label={`Remove tag ${t}`}>&times;</button>
                </span>
              ))}
              <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                <input
                  id="expense-tag-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add tag..."
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="money-slidein-footer" style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {isEdit && (
            <>
              <button type="button" className="btn btn-ghost" onClick={handleDelete} style={{ color: 'var(--danger)' }}>Delete</button>
              <button type="button" className="btn btn-ghost" onClick={handleMarkPaid}>
                {status === 'paid' ? 'Mark as unpaid' : 'Mark as paid'}
              </button>
            </>
          )}
          <div style={{ flex: 1 }} />
          <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={handleSave} disabled={!description.trim()} style={{ background: 'var(--mod-money)' }}>
            {isEdit ? 'Save' : 'Add Expense'}
          </button>
        </div>
      </div>
    </div>
    <CategoryPanel
      open={categoryPanelOpen}
      category={categoryPanelCategory}
      onClose={handleCategoryPanelClose}
    />
    </>
  );
}
