import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import './InlineBlankPicker.css';

/**
 * Inline "Mad-Libs" style dropdown blank. Renders as an underlined
 * trigger that reads like part of a sentence; opens a portal dropdown.
 *
 * Options: [{ id, label, sublabel?, color?, disabled? }]
 *
 * Props:
 *   value        — selected id (or null)
 *   onChange     — (id|null) => void
 *   options      — option array
 *   placeholder  — shown when value is null
 *   accentColor  — underline/text color when filled
 *   disabled     — disable trigger (e.g. pending upstream selection)
 *   label        — optional aria-label
 */
export default function InlineBlankPicker({
  value,
  onChange,
  options,
  placeholder = 'choose',
  accentColor,
  disabled = false,
  label,
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const DROPDOWN_H = 240;
  const DROPDOWN_W = 260;

  const reposition = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - r.bottom;
    const above = spaceBelow < DROPDOWN_H && r.top > DROPDOWN_H;
    const left = Math.min(r.left, window.innerWidth - DROPDOWN_W - 8);
    setPos(above
      ? { bottom: window.innerHeight - r.top + 6, top: 'auto', left }
      : { top: r.bottom + 6, bottom: 'auto', left }
    );
  };

  const handleOpen = () => {
    if (disabled) return;
    if (!open) reposition();
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScroll = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      reposition();
    };
    const onResize = () => setOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const selected = options.find((o) => o.id === value) || null;

  const triggerStyle = {
    color: selected ? (accentColor || 'var(--accent)') : 'var(--text3)',
    borderBottomColor: selected ? (accentColor || 'var(--accent)') : 'var(--text3)',
  };

  const menu = open && createPortal(
    <div
      ref={menuRef}
      className="ibp-menu"
      style={{ top: pos.top, bottom: pos.bottom, left: pos.left }}
      role="listbox"
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="option"
          aria-selected={value === o.id}
          disabled={o.disabled}
          onClick={() => { onChange(o.id); setOpen(false); }}
          className={`ibp-option${value === o.id ? ' ibp-option--selected' : ''}`}
        >
          {o.color && <span className="ibp-dot" style={{ background: o.color }} />}
          <span className="ibp-option-text">
            <span className="ibp-option-label">{o.label}</span>
            {o.sublabel && <span className="ibp-option-sub">{o.sublabel}</span>}
          </span>
        </button>
      ))}
    </div>,
    document.body
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`ibp-trigger${disabled ? ' ibp-trigger--disabled' : ''}${selected ? ' ibp-trigger--filled' : ''}`}
        onClick={handleOpen}
        disabled={disabled}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={triggerStyle}
      >
        <span className="ibp-trigger-text">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={12} aria-hidden="true" />
      </button>
      {menu}
    </>
  );
}
