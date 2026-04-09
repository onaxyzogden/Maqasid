import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { usePeopleStore } from '@store/people-store';
import { DEPT_COLORS } from '@data/config/people-departments';

export default function AddDepartmentModal({ onClose }) {
  const addDepartment = usePeopleStore((s) => s.addDepartment);
  const [name, setName]   = useState('');
  const [color, setColor] = useState(DEPT_COLORS[0]);

  const canSubmit = name.trim();

  function handleSubmit() {
    if (!canSubmit) return;
    addDepartment({ name: name.trim(), color });
    onClose();
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
      background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center',
    }} onClick={onClose}>
      <div
        style={{
          width: 380, background: 'var(--surface)', borderRadius: 12,
          boxShadow: 'var(--shadow-xl)', padding: 24,
          animation: 'scaleIn 150ms var(--ease)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Add Department</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={labelStyle}>Department name *</label>
            <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Product" autoFocus />
          </div>
          <div>
            <label style={labelStyle}>Color</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {DEPT_COLORS.map((c) => (
                <button key={c} onClick={() => setColor(c)} style={{
                  width: 28, height: 28, borderRadius: '50%', background: c,
                  border: color === c ? '3px solid var(--text)' : '3px solid transparent',
                  cursor: 'pointer', transition: 'border-color var(--duration) var(--ease)',
                }} />
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            style={{
              padding: '8px 20px', borderRadius: 8,
              background: canSubmit ? 'var(--text)' : 'var(--bg4)',
              color: canSubmit ? 'var(--bg)' : 'var(--text3)',
              border: 'none', fontWeight: 600, fontSize: 13,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            Add Department
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
