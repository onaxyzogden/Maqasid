import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useMoneyStore } from '../../store/money-store';
import { CATEGORY_COLORS } from '@data/config/money-categories';
import './CategoryPanel.css';

export default function CategoryPanel({ open, category, onClose }) {
  const addCategory    = useMoneyStore((s) => s.addCategory);
  const updateCategory = useMoneyStore((s) => s.updateCategory);

  const isEdit   = !!category;
  const isPreset = category?.isPreset ?? false;

  const [name,        setName]        = useState('');
  const [color,       setColor]       = useState(CATEGORY_COLORS[10]); // #6b7280 default
  const [isEssential, setIsEssential] = useState(false);

  const nameRef = useRef(null);

  // Reset form whenever the panel opens
  useEffect(() => {
    if (!open) return;
    setName(category?.name ?? '');
    setColor(category?.color ?? CATEGORY_COLORS[10]);
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
      updateCategory(category.id, { name: trimmed, color, isEssential });
      onClose({ ...category, name: trimmed, color, isEssential });
    } else {
      const cat = addCategory({ name: trimmed, color, isEssential });
      onClose(cat);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canSave) handleSave();
    if (e.key === 'Escape') onClose();
  };

  return createPortal(
    <div className="cp-panel-overlay" onClick={() => onClose()}>
      <div className="money-slidein cp-panel" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="money-slidein-header">
          <span style={{ fontWeight: 600 }}>
            {isEdit ? 'Edit Category' : 'New Category'}
          </span>
          <button className="money-slidein-close" onClick={() => onClose()}>
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
            disabled={!canSave}
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
