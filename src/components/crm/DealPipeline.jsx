import { useState, useMemo } from 'react';
import { Plus, Kanban, Trash2, X } from 'lucide-react';
import { useCRMStore, formatDealValue } from '../../store/crm-store';
import { useToastStore } from '../../store/toast-store';
import './DealPipeline.css';
import { rowActivation } from '../../lib/row-activation';
import { useRequiredField } from '../../hooks/useRequiredField';
import FieldError from '../../components/shared/FieldError';

function DealForm({ deal, onClose }) {
  const contacts = useCRMStore((s) => s.contacts);
  const pipeline = useCRMStore((s) => s.pipeline);
  const addDeal = useCRMStore((s) => s.addDeal);
  const updateDeal = useCRMStore((s) => s.updateDeal);
  const addToast = useToastStore((s) => s.addToast);
  const isEdit = !!deal;
  const [name, setName] = useState(deal?.name || '');
  const req = useRequiredField(!!name.trim(), 'dealpipeli-deal-name');
  const [contactId, setContactId] = useState(deal?.contactId || '');
  const [value, setValue] = useState(deal?.value || '');
  const [stage, setStage] = useState(deal?.stage || pipeline[0]?.id || '');
  const [expectedClose, setExpectedClose] = useState(deal?.expectedClose || '');
  const [notes, setNotes] = useState(deal?.notes || '');

  const handleSave = () => {
    if (!name.trim()) return;
    const data = { name, contactId, value: Number(value), stage, expectedClose, notes };
    if (isEdit) {
      updateDeal(deal.id, data);
      addToast({ message: 'Deal updated', type: 'success', variant: 'chip' });
    } else {
      addDeal(data);
      addToast({ message: 'Deal created', type: 'success', variant: 'chip' });
    }
    onClose();
  };

  return (
    <div className="expense-form-overlay">
      <div className="expense-form-modal" style={{ maxWidth: 460 }}>
        <div className="expense-form-header"><h3>{isEdit ? 'Edit Deal' : 'New Deal'}</h3><button className="expense-form-close" onClick={onClose}><X size={18} /></button></div>
        <div className="expense-form-body">
          <div className="expense-form-field"><label htmlFor="dealpipeli-deal-name">Deal Name *</label><input id="dealpipeli-deal-name" {...req.fieldProps} value={name} onChange={(e) => setName(e.target.value)} placeholder="Deal name" autoFocus />
<FieldError id={req.errorId} show={req.show}>Deal name is required</FieldError></div>
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label htmlFor="dealpipeli-contact">Contact</label>
              <select id="dealpipeli-contact" value={contactId} onChange={(e) => setContactId(e.target.value)}><option value="">Select...</option>{contacts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
            </div>
            <div className="expense-form-field" style={{ flex: 1 }}><label htmlFor="dealpipeli-value">Value ($)</label><input id="dealpipeli-value" type="number" min="0" value={value} onChange={(e) => setValue(e.target.value)} placeholder="0" /></div>
          </div>
          <div className="expense-form-row">
            <div className="expense-form-field" style={{ flex: 1 }}>
              <label htmlFor="dealpipeli-stage">Stage</label>
              <select id="dealpipeli-stage" value={stage} onChange={(e) => setStage(e.target.value)}>{pipeline.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>
            </div>
            <div className="expense-form-field" style={{ flex: 1 }}><label htmlFor="dealpipeli-expected-close">Expected Close</label><input id="dealpipeli-expected-close" type="date" value={expectedClose} onChange={(e) => setExpectedClose(e.target.value)} /></div>
          </div>
          <div className="expense-form-field"><label htmlFor="dealpipeli-notes">Notes</label><textarea id="dealpipeli-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Deal notes..." rows={2} /></div>
        </div>
        <div className="expense-form-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={req.guard(handleSave)} style={{ background: 'var(--mod-crm)' }}>{isEdit ? 'Save' : 'Add Deal'}</button>
        </div>
      </div>
    </div>
  );
}

export default function DealPipeline() {
  const deals = useCRMStore((s) => s.deals);
  const pipeline = useCRMStore((s) => s.pipeline);
  const contacts = useCRMStore((s) => s.contacts);
  const moveDeal = useCRMStore((s) => s.moveDeal);
  const deleteDeal = useCRMStore((s) => s.deleteDeal);
  const addToast = useToastStore((s) => s.addToast);
  const [showForm, setShowForm] = useState(false);
  const [editDeal, setEditDeal] = useState(null);

  const contactMap = useMemo(() => { const m = {}; contacts.forEach((c) => { m[c.id] = c; }); return m; }, [contacts]);

  const dealsByStage = useMemo(() => {
    const m = {};
    pipeline.forEach((s) => { m[s.id] = []; });
    deals.forEach((d) => { if (m[d.stage]) m[d.stage].push(d); });
    return m;
  }, [deals, pipeline]);

  if (deals.length === 0 && !showForm) {
    return (
      <div className="money-empty">
        <Kanban size={40} className="money-empty-icon" />
        <h4>No deals yet</h4>
        <p>Create your first deal to track your sales pipeline.</p>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-crm)' }}><Plus size={16} /> Add Deal</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-4)' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ background: 'var(--mod-crm)' }}><Plus size={16} /> Add Deal</button>
      </div>

      <div className="deal-pipeline">
        {pipeline.map((stage) => {
          const stageDeals = dealsByStage[stage.id] || [];
          const totalValue = stageDeals.reduce((s, d) => s + (d.value || 0), 0);
          return (
            <div key={stage.id} className="deal-column">
              <div className="deal-column-header">
                <div className="deal-column-title">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: stage.color }} />
                  {stage.name}
                  <span className="deal-column-count">{stageDeals.length}</span>
                </div>
                {totalValue > 0 && <span className="deal-column-value">{formatDealValue(totalValue)}</span>}
              </div>
              <div className="deal-column-body">
                {stageDeals.map((deal) => {
                  const contact = contactMap[deal.contactId];
                  return (
                    <div key={deal.id} className="deal-card" {...rowActivation(() => { setEditDeal(deal); setShowForm(true); })}>
                      <div className="deal-card-name">{deal.name}</div>
                      {contact && <div className="deal-card-contact">{contact.name}</div>}
                      <div className="deal-card-meta">
                        <span className="amount">{formatDealValue(deal.value)}</span>
                        {deal.expectedClose && <span>{new Date(deal.expectedClose).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</span>}
                      </div>
                      <div className="deal-card-actions">
                        <select
                          className="deal-move-select"
                          value=""
                          aria-label={`Move ${deal.name} to stage`}
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                          onChange={(e) => { if (e.target.value) moveDeal(deal.id, e.target.value); }}
                        >
                          <option value="">Move to…</option>
                          {pipeline.filter((s) => s.id !== stage.id).map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                        <button className="row-action-btn danger" onClick={(e) => { e.stopPropagation(); if (confirm(`Delete deal "${deal.name}"? This can't be undone.`)) { deleteDeal(deal.id); addToast({ message: `"${deal.name}" removed`, type: 'info' }); } }} aria-label={`Delete deal ${deal.name}`}><Trash2 size={14} aria-hidden="true" /></button>
                      </div>
                    </div>
                  );
                })}
                {stageDeals.length === 0 && <div className="deal-empty">No deals</div>}
              </div>
            </div>
          );
        })}
      </div>

      {showForm && <DealForm deal={editDeal} onClose={() => { setShowForm(false); setEditDeal(null); }} />}
    </div>
  );
}
