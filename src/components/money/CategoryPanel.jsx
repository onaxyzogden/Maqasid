import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useMoneyStore } from '../../store/money-store';
import { CATEGORY_COLORS } from '@data/config/money-categories';
import './CategoryPanel.css';

const DEFAULT_COLOR = '#6b7280';

export default function CategoryPanel({ open, category, onClose }) {
  // onClose(saved?) — passes saved category object on save; no arg on cancel.
  // Intentional: ExpensePanel uses the returned object to auto-select the new category.
  // createPortal is required because ExpensePanel is itself a stacking-context overlay (z-index 100).
  // CategoryPanel must render above it at z-index 1100.
  const addCategory    = useMoneyStore((s) => s.addCategory);
  const updateCategory = useMoneyStore((s) => s.updateCategory);

  const isEdit   = !!category;
  const isPreset = category?.isPreset ?? false;

  const [name,        setName]        = useState('');
  const [color,       setColor]       = useState(DEFAULT_COLOR);
  const [isEssential, setIsEssential] = useState(false);

  const nameRef = useRef(null);

  // Reset form whenever the panel opens
  useEffect(() => {
    if (!open) return;
    setName(category?.name ?? '');
    setColor(category?.color ?? DEFAULT_COLOR);
    setIsEssential(category?.isEssential ?? false);
    // Defer focus until the panel has slid into view
    const t = setTimeout(() => nameRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [open, category]);

  if (!open) return null;

  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    const trimmed = name.trim();
    if (isEdit) {
      const updated = updateCategory(category.id, { name: trimmed, color, isEssential });
      onClose(updated ?? { ...category, name: trimmed, color, isEssential });
    } else {
      const cat = addCategory({ name: trimmed, color, isEssential });
      onClose(cat);
    }
  };

  // Global Escape listener so closing works from any focused element
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canSave) handleSave();
  };

  return createPortal(
    <div className="cp-panel-overlay" onClick={() => onClose()}>
      <div className="money-slidein cp-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="money-slidein-header">
          <span style={{ fontWeight: 600 }}>
            {isEdit ? 'Edit Category' : 'New Category'}
          </span>
          <button className="money-slidein-close" onClick={() => onClose()} aria-label="Close panel">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="money-slidein-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>

          {/* Name */}
          <div className="money-field">
            <label>Name</label>
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Category name"
            />
          </div>

          {/* Color */}
          <div className="money-field">
            <label>Color</label>
            <div className="cp-swatch-grid">
              {CATEGORY_COLORS.map((c) => (
                <button
                  key={c}
                  className={`cp-swatch${color === c ? ' cp-swatch--selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                  title={c}
                  type="button"
                />
              ))}
            </div>
          </div>

          {/* Essential toggle */}
          <div className={`cp-toggle-row${isPreset ? ' cp-toggle-row--disabled' : ''}`}>
            <div>
              <div className="cp-toggle-label">Essential expense</div>
              <div className="cp-toggle-sub">Bills &amp; necessities (rent, utilities…)</div>
            </div>
            <button
              className={`cp-toggle${isEssential ? ' cp-toggle--on' : ''}`}
              onClick={() => setIsEssential((v) => !v)}
              disabled={isPreset}
              aria-pressed={isEssential}
              aria-label="Essential expense"
              type="button"
            />
          </div>

        </div>

        {/* Footer */}
        <div className="money-slidein-footer" style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
          <button className="btn btn-ghost" onClick={() => onClose()}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!canSave || isPreset}
            style={{ background: 'var(--mod-money)' }}
          >
            {isEdit ? 'Save Changes' : 'Save Category'}
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
