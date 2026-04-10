import { useState } from 'react';
import { useContactsStore } from '@store/contacts-store';
import { LEAD_STAGES, LEAD_SOURCES } from '@data/config/contact-config';

const field = {
  label: { fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 },
  value: { fontSize: 14, color: 'var(--text)', fontWeight: 500 },
  input: {
    width: '100%', padding: '7px 10px', borderRadius: 7,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  empty: { fontSize: 13, color: 'var(--text3)', fontStyle: 'italic' },
};

export default function LeadTab({ contactId }) {
  const contact       = useContactsStore((s) => s.contacts.find((c) => c.id === contactId));
  const updateContact = useContactsStore((s) => s.updateContact);

  const [editingTitle, setEditingTitle]   = useState(false);
  const [editingDesc,  setEditingDesc]    = useState(false);
  const [editingBudget, setEditingBudget] = useState(false);
  const [titleVal,  setTitleVal]  = useState('');
  const [descVal,   setDescVal]   = useState('');
  const [budgetVal, setBudgetVal] = useState('');

  if (!contact) return null;

  const stage = LEAD_STAGES.find((s) => s.id === contact.leadStatus);
  const source = LEAD_SOURCES.find((s) => s.id === contact.leadSource);

  const startEdit = (field, val, setter) => { setter(val || ''); };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Stage */}
      <div>
        <div style={field.label}>Pipeline Stage</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {stage && (
            <span style={{
              display: 'inline-block', width: 10, height: 10, borderRadius: '50%',
              background: stage.color, flexShrink: 0,
            }} />
          )}
          <select
            value={contact.leadStatus || 'unassigned'}
            onChange={(e) => updateContact(contactId, { leadStatus: e.target.value })}
            style={{ ...field.input, width: 'auto', minWidth: 180 }}
          >
            {LEAD_STAGES.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Source */}
      <div>
        <div style={field.label}>Lead Source</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {LEAD_SOURCES.map((ls) => (
            <button
              key={ls.id}
              onClick={() => updateContact(contactId, { leadSource: ls.id })}
              style={{
                padding: '5px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                border: '1.5px solid',
                borderColor: contact.leadSource === ls.id ? 'var(--mod-people)' : 'var(--border)',
                background: contact.leadSource === ls.id ? 'rgba(139,92,246,0.1)' : 'transparent',
                color: contact.leadSource === ls.id ? 'var(--mod-people)' : 'var(--text2)',
                cursor: 'pointer',
              }}
            >
              {ls.label}
            </button>
          ))}
        </div>
      </div>

      {/* Request Title */}
      <div>
        <div style={field.label}>Request Title</div>
        {editingTitle ? (
          <input
            autoFocus
            style={field.input}
            value={titleVal}
            onChange={(e) => setTitleVal(e.target.value)}
            onBlur={() => { updateContact(contactId, { requestTitle: titleVal }); setEditingTitle(false); }}
            onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); if (e.key === 'Escape') setEditingTitle(false); }}
          />
        ) : (
          <div
            onClick={() => { startEdit('title', contact.requestTitle, setTitleVal); setEditingTitle(true); }}
            style={{ ...field.input, cursor: 'text', minHeight: 34, display: 'flex', alignItems: 'center' }}
          >
            {contact.requestTitle
              ? <span style={field.value}>{contact.requestTitle}</span>
              : <span style={field.empty}>Click to add request title…</span>}
          </div>
        )}
      </div>

      {/* Request Description */}
      <div>
        <div style={field.label}>Request Description</div>
        {editingDesc ? (
          <textarea
            autoFocus
            style={{ ...field.input, resize: 'vertical', minHeight: 80 }}
            value={descVal}
            onChange={(e) => setDescVal(e.target.value)}
            onBlur={() => { updateContact(contactId, { requestDescription: descVal }); setEditingDesc(false); }}
            onKeyDown={(e) => { if (e.key === 'Escape') setEditingDesc(false); }}
          />
        ) : (
          <div
            onClick={() => { startEdit('desc', contact.requestDescription, setDescVal); setEditingDesc(true); }}
            style={{ ...field.input, cursor: 'text', minHeight: 80, alignItems: 'flex-start', display: 'flex' }}
          >
            {contact.requestDescription
              ? <span style={{ ...field.value, whiteSpace: 'pre-wrap' }}>{contact.requestDescription}</span>
              : <span style={field.empty}>Click to add description…</span>}
          </div>
        )}
      </div>

      {/* Estimated Budget */}
      <div>
        <div style={field.label}>Estimated Budget</div>
        {editingBudget ? (
          <input
            autoFocus
            type="number"
            style={field.input}
            value={budgetVal}
            onChange={(e) => setBudgetVal(e.target.value)}
            onBlur={() => {
              updateContact(contactId, { estimatedBudget: budgetVal ? Number(budgetVal) : null });
              setEditingBudget(false);
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); if (e.key === 'Escape') setEditingBudget(false); }}
          />
        ) : (
          <div
            onClick={() => { startEdit('budget', contact.estimatedBudget ?? '', setBudgetVal); setEditingBudget(true); }}
            style={{ ...field.input, cursor: 'text', minHeight: 34, display: 'flex', alignItems: 'center' }}
          >
            {contact.estimatedBudget != null
              ? <span style={field.value}>${Number(contact.estimatedBudget).toLocaleString()}</span>
              : <span style={field.empty}>Click to add budget…</span>}
          </div>
        )}
      </div>
    </div>
  );
}
