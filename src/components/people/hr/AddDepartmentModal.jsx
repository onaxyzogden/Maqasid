import { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { usePeopleStore } from '@store/people-store';
import { DEPT_COLORS } from '@data/config/people-departments';
import Modal from '../../shared/Modal';
import FieldError from '../../shared/FieldError';
import { useRequiredField } from '../../../hooks/useRequiredField';

export default function AddDepartmentModal({ onClose }) {
  const addDepartment = usePeopleStore((s) => s.addDepartment);
  const [name, setName]   = useState('');
  const [color, setColor] = useState(DEPT_COLORS[0]);
  const [leaving, setLeaving] = useState(false);
  const triggerClose = () => { setLeaving(true); setTimeout(onClose, 200); };

  const canSubmit = name.trim();
  const uid = useId();
  const req = useRequiredField(!!canSubmit, `${uid}-name`);

  function handleSubmit() {
    if (!canSubmit) return;
    addDepartment({ name: name.trim(), color });
    triggerClose();
  }

  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 4, display: 'block' };

  return createPortal(
    <Modal
      onClose={triggerClose}
      labelledBy={`${uid}-title`}
      overlayStyle={{ animation: leaving ? 'fadeOut 200ms var(--ease) forwards' : undefined }}
      className=""
      style={{
        width: 380, background: 'var(--surface)', borderRadius: 12,
        boxShadow: 'var(--shadow-xl)', padding: 24, outline: 'none',
        animation: leaving ? 'scaleOut 200ms var(--ease) forwards' : 'scaleIn 150ms var(--ease)',
      }}
    >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 id={`${uid}-title`} style={{ margin: 0, fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Add Department</h2>
          <button type="button" onClick={triggerClose} aria-label="Close" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 4 }}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label htmlFor={`${uid}-name`} style={labelStyle}>Department name *</label>
            <input id={`${uid}-name`} {...req.fieldProps} style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Product" autoFocus />
            <FieldError id={req.errorId} show={req.show}>Enter a department name</FieldError>
          </div>
          <div>
            <div id={`${uid}-color`} style={labelStyle}>Color</div>
            <div role="group" aria-labelledby={`${uid}-color`} style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {DEPT_COLORS.map((c) => (
                <button type="button" key={c} aria-label={`Colour ${c}`} aria-pressed={color === c} onClick={() => setColor(c)} style={{
                  width: 28, height: 28, borderRadius: '50%', background: c,
                  border: color === c ? '3px solid var(--text)' : '3px solid transparent',
                  cursor: 'pointer', transition: 'border-color var(--duration) var(--ease)',
                }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={triggerClose}>Cancel</button>
          <button
            type="button"
            onClick={req.guard(handleSubmit)}
            style={{
              padding: '8px 20px', borderRadius: 8,
              background: 'var(--text)', color: 'var(--bg)',
              border: 'none', fontWeight: 600, fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Add Department
          </button>
        </div>
    </Modal>,
    document.body
  );
}
