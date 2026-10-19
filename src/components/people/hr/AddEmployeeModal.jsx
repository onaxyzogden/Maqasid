import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useContactsStore } from '@store/contacts-store';
import { useToastStore } from '@store/toast-store';
import { EMPLOYMENT_TYPES } from '@data/config/contact-config';
import { localDayKey } from '../../../lib/format-date';
import SlideIn from '../../shared/SlideIn';
import FieldError from '../../shared/FieldError';
import { useRequiredField } from '../../../hooks/useRequiredField';

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
  const [startDate, setStartDate]   = useState(localDayKey());

  const canSubmit = name.trim();

  const uid = useId();
  const fid = (name) => `${uid}-${name}`;
  const req = useRequiredField(!!canSubmit, fid('name'));

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
    <SlideIn
      onClose={triggerClose}
      labelledBy={fid('title')}
      overlayStyle={{
        zIndex: 1000, background: 'var(--overlay)',
        animation: leaving ? 'fadeOut 200ms var(--ease) forwards' : undefined,
      }}
      style={{
        boxShadow: 'var(--shadow-xl)',
        animation: leaving ? 'slideOutRight 200ms var(--ease) forwards' : undefined,
      }}
    >
        {/* Header */}
        <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 id={fid('title')} style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Add an Employee</h2>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>Add a new team member to your organization.</div>
          </div>
          <button type="button" onClick={triggerClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 4 }}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label htmlFor={fid('name')} style={labelStyle}>Full name *</label>
            <input id={fid('name')} {...req.fieldProps} style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" autoFocus />
            <FieldError id={req.errorId} show={req.show}>Enter the employee's name</FieldError>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label htmlFor={fid('email')} style={labelStyle}>Email</label>
              <input id={fid('email')} style={inputStyle} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div>
              <label htmlFor={fid('phone')} style={labelStyle}>Phone</label>
              <input id={fid('phone')} style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            </div>
          </div>
          <div>
            <label htmlFor={fid('role')} style={labelStyle}>Job title / Role</label>
            <input id={fid('role')} style={inputStyle} value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Software Engineer" />
          </div>
          <div>
            <label htmlFor={fid('dept')} style={labelStyle}>Department</label>
            <select id={fid('dept')} style={inputStyle} value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Select department...</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          <div>
            <div id={fid('emptype')} style={labelStyle}>Employment type</div>
            <div role="group" aria-labelledby={fid('emptype')} style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {EMPLOYMENT_TYPES.map((t) => (
                <button type="button" key={t.id} aria-pressed={empType === t.id} onClick={() => setEmpType(t.id)} style={{
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
            <label htmlFor={fid('start')} style={labelStyle}>Start date</label>
            <input id={fid('start')} style={inputStyle} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
        </div>

        {/* Submit */}
        <div style={{ padding: '0 20px 20px' }}>
          <button
            type="button"
            onClick={req.guard(handleSubmit)}
            style={{
              width: '100%', padding: '11px 0', borderRadius: 10,
              background: 'var(--text)', color: 'var(--bg)',
              border: 'none', fontWeight: 600, fontSize: 14,
              cursor: 'pointer',
              transition: 'background var(--duration) var(--ease)',
            }}
          >
            Add Employee
          </button>
        </div>
    </SlideIn>,
    document.body
  );
}
