import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { G_LABELS } from '@data/config/g-labels';
import GLabelBadge from './GLabelBadge';

export default function GLabelPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const containerRef = useRef(null);

  // Open: capture trigger position for fixed-positioned portal
  // Flip up if not enough space below
  const DROPDOWN_APPROX_HEIGHT = 180;
  const DROPDOWN_WIDTH = 200;
  const handleOpen = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const showAbove = spaceBelow < DROPDOWN_APPROX_HEIGHT && rect.top > DROPDOWN_APPROX_HEIGHT;
      // Clamp left so dropdown doesn't overflow the right edge of the viewport
      const left = Math.min(rect.left, window.innerWidth - DROPDOWN_WIDTH - 8);
      setDropdownPos(showAbove
        ? { bottom: window.innerHeight - rect.top + 4, top: 'auto', left }
        : { top: rect.bottom + 4, bottom: 'auto', left }
      );
    }
    setOpen((v) => !v);
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (
        containerRef.current && !containerRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on scroll or resize (position would be stale)
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener('scroll', close, { passive: true, capture: true });
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close, { capture: true });
      window.removeEventListener('resize', close);
    };
  }, [open]);

  const dropdown = open && createPortal(
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: dropdownPos.top,
        bottom: dropdownPos.bottom,
        left: dropdownPos.left,
        minWidth: '200px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow)',
        zIndex: 9999,
        padding: '4px',
      }}
    >
      {value && (
        <button
          type="button"
          onClick={() => { onChange(null); setOpen(false); }}
          style={{
            display: 'block',
            width: '100%',
            padding: '6px 8px',
            border: 'none',
            background: 'none',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '0.78rem',
            color: 'var(--text3)',
            borderRadius: 'var(--radius-sm)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          Clear
        </button>
      )}
      {G_LABELS.map((g) => (
        <button
          key={g.id}
          type="button"
          onClick={() => { onChange(g.id); setOpen(false); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '6px 8px',
            border: 'none',
            background: value === g.id ? 'var(--bg2)' : 'none',
            textAlign: 'left',
            cursor: 'pointer',
            fontSize: '0.78rem',
            borderRadius: 'var(--radius-sm)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg2)'}
          onMouseLeave={(e) => e.currentTarget.style.background = value === g.id ? 'var(--bg2)' : 'none'}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600,
              fontSize: '0.7rem',
              color: g.color,
              minWidth: '24px',
            }}
          >
            {g.id}
          </span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ color: 'var(--text)' }}>{g.label}</span>
            <span style={{ fontSize: '0.65rem', color: g.id === 'G4' ? '#f59e0b' : 'var(--text3)', lineHeight: 1.3 }}>{g.description}</span>
          </span>
        </button>
      ))}
    </div>,
    document.body
  );

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 8px',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg)',
          cursor: 'pointer',
          fontSize: '0.78rem',
          color: 'var(--text2)',
        }}
      >
        {value ? <GLabelBadge gLabel={value} /> : 'G-Label'}
      </button>
      {dropdown}
    </div>
  );
}
