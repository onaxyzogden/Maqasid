import { useState, useMemo } from 'react';
import { Plus, Search, Store, X, ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { useMoneyStore, formatCurrency } from '../../store/money-store';
import { localDayKey } from '../../lib/format-date';
import SlideIn from '../shared/SlideIn';
import { useRequiredField } from '../../hooks/useRequiredField';
import FieldError from '../../components/shared/FieldError';

function VendorPanel({ vendor, onClose }) {
  const addVendor = useMoneyStore((s) => s.addVendor);
  const updateVendor = useMoneyStore((s) => s.updateVendor);
  const isEdit = !!vendor;
  const [name, setName] = useState(vendor?.name || '');
  const req = useRequiredField(!!name.trim(), 'vendorstab-name');
  const [website, setWebsite] = useState(vendor?.website || '');

  const handleSave = () => {
    if (!name.trim()) return;
    if (isEdit) updateVendor(vendor.id, { name, website });
    else addVendor({ name, website });
    onClose();
  };

  return (
    <SlideIn onClose={onClose} label="Vendor">
        <div className="money-slidein-header">
          <h3>{isEdit ? 'Edit Vendor' : 'Add Vendor'}</h3>
          <button className="money-slidein-close" onClick={onClose} aria-label="Close panel"><X size={18} /></button>
        </div>
        <div className="money-slidein-body">
          <div className="money-field">
            <label htmlFor="vendorstab-name">Name *</label>
            <input id="vendorstab-name" {...req.fieldProps} value={name} onChange={(e) => setName(e.target.value)} placeholder="Vendor name" autoFocus />
<FieldError id={req.errorId} show={req.show}>Vendor name is required</FieldError>
          </div>
          <div className="money-field">
            <label htmlFor="vendorstab-website">Website</label>
            <input id="vendorstab-website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
          </div>
        </div>
        <div className="money-slidein-footer">
          <button className="btn btn-primary" onClick={req.guard(handleSave)} style={{ background: 'var(--mod-money)', width: '100%' }}>
            {isEdit ? 'Save' : 'Submit'}
          </button>
        </div>
      </SlideIn>
  );
}

export default function VendorsTab() {
  const vendors = useMoneyStore((s) => s.vendors);
  const expenses = useMoneyStore((s) => s.expenses);
  const deleteVendor = useMoneyStore((s) => s.deleteVendor);
  const updateVendor = useMoneyStore((s) => s.updateVendor);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState(new Date().getFullYear() + '-01-01');
  const [endDate, setEndDate] = useState(localDayKey());
  const [showPanel, setShowPanel] = useState(false);
  const [editVendor, setEditVendor] = useState(null);

  const spentByVendor = useMemo(() => {
    const m = {};
    expenses.forEach((e) => { if (e.vendorId) m[e.vendorId] = (m[e.vendorId] || 0) + (e.amount || 0); });
    return m;
  }, [expenses]);

  const filtered = useMemo(() => {
    let list = vendors;
    if (statusFilter !== 'all') list = list.filter((v) => v.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((v) => v.name.toLowerCase().includes(q) || (v.website || '').toLowerCase().includes(q));
    }
    return list;
  }, [vendors, statusFilter, search]);

  return (
    <div>
      <div className="money-filter-bar">
        <div className="money-toggle-group">
          {['all', 'active', 'archived'].map((s) => (
            <button key={s} className={`money-toggle-btn ${statusFilter === s ? 'active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="money-filter-right">
          <div className="money-date-range">
            <div className="money-date-field"><span>Start</span><input type="date" aria-label="Start date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
            <span className="money-date-sep">&mdash;</span>
            <div className="money-date-field"><span>End</span><input type="date" aria-label="End date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditVendor(null); setShowPanel(true); }} style={{ background: 'var(--mod-money)' }}>
            <Plus size={14} /> Add Vendor
          </button>
        </div>
      </div>

      <div className="money-search-bar">
        <Search size={14} className="money-search-icon" />
        <input aria-label="Search for anything" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for anything" className="money-search-input" />
      </div>

      {filtered.length === 0 ? (
        <div className="money-empty-state">
          <p>No data available</p>
        </div>
      ) : (
        <table className="money-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Website</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Total Spent</th>
              <th style={{ width: 80 }} />
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id}>
                <td style={{ fontWeight: 500 }}>{v.name}</td>
                <td>
                  {v.website ? (
                    <span style={{ color: 'var(--text2)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {v.website} <ExternalLink size={14} />
                    </span>
                  ) : '—'}
                </td>
                <td><span className={`status-badge status-${v.status}`}>{v.status}</span></td>
                <td style={{ textAlign: 'right' }}><span className="amount">{formatCurrency(spentByVendor[v.id] || 0)}</span></td>
                <td>
                  <div className="row-actions">
                    <button className="row-action-btn" onClick={() => { setEditVendor(v); setShowPanel(true); }} title="Edit" aria-label={`Edit ${v.name}`}><Pencil size={14} aria-hidden="true" /></button>
                    <button className="row-action-btn" onClick={() => updateVendor(v.id, { status: v.status === 'active' ? 'archived' : 'active' })} title={v.status === 'active' ? 'Archive' : 'Activate'} aria-label={v.status === 'active' ? 'Archive' : 'Activate'}>
                      <Store size={14} aria-hidden="true" />
                    </button>
                    <button className="row-action-btn danger" onClick={() => { if (confirm('Delete this vendor?')) deleteVendor(v.id); }} title="Delete" aria-label={`Delete ${v.name}`}><Trash2 size={14} aria-hidden="true" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showPanel && <VendorPanel vendor={editVendor} onClose={() => { setShowPanel(false); setEditVendor(null); }} />}
    </div>
  );
}
