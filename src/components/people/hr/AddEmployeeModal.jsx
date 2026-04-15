import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useContactsStore } from '@store/contacts-store';
import { useToastStore } from '@store/toast-store';
import { EMPLOYMENT_TYPES } from '@data/config/contact-config';

export default function AddEmployeeModal({ onClose }) {
  const addContact  = useContactsStore((s) => s.addContact);
  const departments = useContactsStore((s) => s.departments);
  const addToast = useToastStore((s) => s.addToast);

  const [leaving, setLeaving] = useState(false);
  const triggerClose = () => { setLeaving(true); setTimeout(onClose, 200); };

  const [name, setName]             = useState('');
  const [email, setEmail]           = useState('');
  const [phone, setPhone]           = useState('');
  const [role, setRole]             = useState('');
  const [department, setDepartment] = useState('');
  const [empType, setEmpType]       = useState('full_time');
  const [startDate, setStartDate]   = useState(new Date().toISOString().slice(0, 10));

  const canSubmit = name.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    const parts = name.trim().split(/\s+/);
    addContact({
      entityType: 'person',
      contactType: 'employee',
      firstName: parts[0] || '',
      lastName: parts.slice(1).join(' ') || '',
      email: email.trim(),
      phone: phone.trim(),
      jobTitle: role.trim(),
      departmentId: department,
      employmentType: empType,
      startDate,
      status: 'active',
    });
    addToast({ message: `${name.trim()} added to team`, type: 'success', variant: 'chip' });
    triggerClose();
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 4, display: 'block' };

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
      animation: leaving ? 'fadeOut 200ms var(--ease) forwards' : undefined,
    }} onClick={triggerClose}>
      <div
        style={{
          width: 420, height: '100%', background: 'var(--surface)',
          boxShadow: 'var(--shadow-xl)', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
          animation: leaving ? 'slideOutRight 200ms var(--ease) forwards' : 'slideInRight 200ms var(--ease)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Add an Employee</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>Add a new team member to your organization.</div>
          </div>
          <button onClick={triggerClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Full name *</label>
            <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoFocus />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Job title / Role</label>
            <input style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Software Engineer" />
          </div>
          <div>
            <label style={labelStyle}>Department</label>
            <select style={inputStyle} value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select department...</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Employment type</label>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {EMPLOYMENT_TYPES.map((t) => (
                <button key={t.id} onClick={() => setEmpType(t.id)} style={{
                  padding: '5px 12px', borderRadius: 6, border: '1.5px solid',
                  borderColor: empType === t.id ? 'var(--mod-people)' : 'var(--border)',
                  background: empType === t.id ? 'rgba(139,92,246,0.1)' : 'transparent',
                  color: empType === t.id ? 'var(--mod-people)' : 'var(--text2)',
                  fontWeight: 600, fontSize: 12, cursor: 'pointer',
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>Start date</label>
            <input style={inputStyle} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
        </div>

        {/* Submit */}
        <div style={{ padding: '0 20px 20px' }}>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              width: '100%', padding: '11px 0', borderRadius: 10,
              background: canSubmit ? 'var(--text)' : 'var(--bg4)',
              color: canSubmit ? 'var(--bg)' : 'var(--text3)',
              border: 'none', fontWeight: 600, fontSize: 14,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'background var(--duration) var(--ease)',
            }}
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
