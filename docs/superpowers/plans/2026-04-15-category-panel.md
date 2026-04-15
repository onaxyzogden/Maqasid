# CategoryPanel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `prompt()` category dialog in `ExpensePanel` with a proper slide-in `CategoryPanel` that supports name, color, and an `isEssential` toggle for user-created categories.

**Architecture:** A new `CategoryPanel` component portals to `document.body` (stacking above `ExpensePanel`) and handles both create and edit modes via an `open/category/onClose` prop API. `ExpensePanel` drives it with two entry points: a `+` button (create) and a pencil icon (edit, non-preset only). The store's `addCategory` action gains an `isEssential` field.

**Tech Stack:** React 19, Zustand 5, Lucide icons, CSS custom properties (tokens), React `createPortal`

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Modify | `src/store/money-store.js` | Add `isEssential` to `addCategory` |
| Create | `src/components/money/CategoryPanel.css` | Panel layout + swatch grid + toggle switch |
| Create | `src/components/money/CategoryPanel.jsx` | Slide-in panel, create + edit modes |
| Modify | `src/components/money/ExpensePanel.jsx` | Replace `prompt()`, add pencil icon, render CategoryPanel |

---

## Task 1 — Update `addCategory` store action

**File:** `src/store/money-store.js`

- [ ] **Step 1.1 — Replace `addCategory` implementation**

Find this exact block (the function starts around line 181):

```js
addCategory: ({ name, color }) => {
  const cat = {
    id: genCategoryId(),
    name: name || 'New Category',
    color: color || '#6b7280',
    isPreset: false,
  };
```

Replace with:

```js
addCategory: ({ name, color, isEssential = false }) => {
  const cat = {
    id: genCategoryId(),
    name: name || 'New Category',
    color: color || '#6b7280',
    isEssential,
    isPreset: false,
  };
```

Everything after (the `set(...)` call and `return cat`) stays unchanged.

- [ ] **Step 1.2 — Verify**

Open the browser dev console on the Money page and run:

```js
const { addCategory } = window.__moneyStore?.getState?.() ?? {};
const cat = addCategory?.({ name: 'Test', color: '#3b82f6', isEssential: true });
console.log(cat); // { id: 'cat_...', name: 'Test', color: '#3b82f6', isEssential: true, isPreset: false }
```

Expected: object with `isEssential: true`. Then undo by refreshing (or deleting from the store).

- [ ] **Step 1.3 — Commit**

```bash
git add src/store/money-store.js
git commit -m "feat(money): add isEssential to addCategory store action"
```

---

## Task 2 — Create `CategoryPanel.css`

**File:** `src/components/money/CategoryPanel.css` *(new)*

- [ ] **Step 2.1 — Write the file**

```css
/* ── CategoryPanel ── */

/* Overlay — stacks above ExpensePanel (money-slidein-overlay) */
.cp-panel-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1100;
  display: flex;
  justify-content: flex-end;
}

/* Panel width */
.cp-panel {
  width: 360px;
  max-width: 100vw;
}

/* ── Color swatch grid ── */
.cp-swatch-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.cp-swatch {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: outline var(--duration) var(--ease);
}

.cp-swatch:hover {
  opacity: 0.85;
}

.cp-swatch--selected {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}

/* ── Essential toggle row ── */
.cp-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--bg2);
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.cp-toggle-row--disabled {
  opacity: 0.5;
  pointer-events: none;
}

.cp-toggle-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text);
}

.cp-toggle-sub {
  font-size: var(--text-xs);
  color: var(--text2);
  margin-top: 2px;
}

/* ── Toggle switch button ── */
.cp-toggle {
  width: 36px;
  height: 20px;
  border-radius: 10px;
  background: var(--bg3);
  border: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background var(--duration) var(--ease);
  padding: 0;
}

.cp-toggle::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff;
  top: 2px;
  left: 2px;
  transition: transform var(--duration) var(--ease);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.cp-toggle--on {
  background: var(--mod-money);
}

.cp-toggle--on::after {
  transform: translateX(16px);
}

.cp-toggle:disabled {
  cursor: not-allowed;
}
```

- [ ] **Step 2.2 — Commit**

```bash
git add src/components/money/CategoryPanel.css
git commit -m "feat(money): add CategoryPanel styles"
```

---

## Task 3 — Create `CategoryPanel.jsx`

**File:** `src/components/money/CategoryPanel.jsx` *(new)*

- [ ] **Step 3.1 — Write the file**

```jsx
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
```

- [ ] **Step 3.2 — Verify the panel renders (isolated smoke test)**

Temporarily add `<CategoryPanel open category={null} onClose={() => {}} />` somewhere in `MoneyDashboard.jsx` and confirm the panel slides in over the page with correct fields. Remove the temp render after checking.

- [ ] **Step 3.3 — Commit**

```bash
git add src/components/money/CategoryPanel.jsx
git commit -m "feat(money): add CategoryPanel component (create + edit modes)"
```

---

## Task 4 — Wire `CategoryPanel` into `ExpensePanel`

**File:** `src/components/money/ExpensePanel.jsx`

- [ ] **Step 4.1 — Update imports (line 1–5)**

Replace:

```jsx
import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useMoneyStore } from '../../store/money-store';
import { useToastStore } from '../../store/toast-store';
import { CURRENCIES } from '@data/config/money-categories';
```

With:

```jsx
import { useState } from 'react';
import { X, Plus, Pencil } from 'lucide-react';
import { useMoneyStore } from '../../store/money-store';
import { useToastStore } from '../../store/toast-store';
import { CURRENCIES } from '@data/config/money-categories';
import CategoryPanel from './CategoryPanel';
```

- [ ] **Step 4.2 — Add store subscription + state (after line 16)**

After the existing `const addCategory = useMoneyStore(...)` line, add:

```jsx
const updateCategory = useMoneyStore((s) => s.updateCategory);
```

After the existing `const [newVendorName, setNewVendorName] = useState('');` line (line 31), add:

```jsx
const [categoryPanelOpen,     setCategoryPanelOpen]     = useState(false);
const [categoryPanelCategory, setCategoryPanelCategory] = useState(null);
```

- [ ] **Step 4.3 — Add derived value + replace/add handlers (after line 31)**

After the two new state lines, add:

```jsx
// Derived: currently selected category object (null if none selected)
const selectedCategory = categories.find((c) => c.id === categoryId) ?? null;
```

Then **replace** the existing `handleAddCategory` function (lines 79–85):

```jsx
const handleAddCategory = () => {
  const name = prompt('New category name:');
  if (name?.trim()) {
    const cat = addCategory({ name: name.trim() });
    setCategoryId(cat.id);
  }
};
```

With these two handlers:

```jsx
const handleNewCategory = () => {
  setCategoryPanelCategory(null);
  setCategoryPanelOpen(true);
};

const handleEditCategory = () => {
  if (!selectedCategory || selectedCategory.isPreset) return;
  setCategoryPanelCategory(selectedCategory);
  setCategoryPanelOpen(true);
};

const handleCategoryPanelClose = (saved) => {
  setCategoryPanelOpen(false);
  setCategoryPanelCategory(null);
  if (saved) setCategoryId(saved.id);
};
```

- [ ] **Step 4.4 — Update the category dropdown row JSX (lines 108–118)**

Replace:

```jsx
<div className="money-field" style={{ flex: 1 }}>
  <label>Category</label>
  <div style={{ display: 'flex', gap: 4 }}>
    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ flex: 1 }}>
      <option value="">Select...</option>
      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select>
    <button className="btn btn-ghost" onClick={handleAddCategory} title="Add option" style={{ padding: '0 6px', fontSize: '0.85rem' }}><Plus size={14} /></button>
  </div>
</div>
```

With:

```jsx
<div className="money-field" style={{ flex: 1 }}>
  <label>Category</label>
  <div style={{ display: 'flex', gap: 4 }}>
    <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} style={{ flex: 1 }}>
      <option value="">Select...</option>
      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
    </select>
    {selectedCategory && !selectedCategory.isPreset && (
      <button className="btn btn-ghost" onClick={handleEditCategory} title="Edit category" style={{ padding: '0 6px' }}>
        <Pencil size={14} />
      </button>
    )}
    <button className="btn btn-ghost" onClick={handleNewCategory} title="New category" style={{ padding: '0 6px', fontSize: '0.85rem' }}>
      <Plus size={14} />
    </button>
  </div>
</div>
```

- [ ] **Step 4.5 — Render CategoryPanel inside the component return**

The `ExpensePanel` currently returns a single `<div className="money-slidein-overlay">`. Wrap it in a fragment and append `CategoryPanel`:

Replace the opening of the return:

```jsx
return (
  <div className="money-slidein-overlay" onClick={onClose}>
```

With:

```jsx
return (
  <>
  <div className="money-slidein-overlay" onClick={onClose}>
```

And replace the closing of the return:

```jsx
    </div>
  </div>
);
```

With:

```jsx
    </div>
  </div>
  <CategoryPanel
    open={categoryPanelOpen}
    category={categoryPanelCategory}
    onClose={handleCategoryPanelClose}
  />
  </>
);
```

- [ ] **Step 4.6 — Verify create flow**

1. Open the dev server (`npm run dev`)
2. Navigate to `/app/money` → Expenses tab → click any expense (or add new)
3. Click **+** next to the Category dropdown
4. `CategoryPanel` should slide in with empty name, default grey swatch selected, toggle off
5. Type a name, pick a color, toggle Essential on, click **Save Category**
6. The new category should appear in the dropdown and be auto-selected
7. Open browser localStorage → `categories` key → verify the new entry has `isEssential: true`

- [ ] **Step 4.7 — Verify edit flow**

1. With a non-preset category selected in the dropdown, confirm the **pencil** icon appears
2. Click the pencil → panel opens pre-filled with the category's current name, color, toggle state
3. Edit the name, change toggle, click **Save Changes**
4. Verify the dropdown updates to the new name
5. With a preset category (e.g. "Food") selected, confirm **no pencil icon** appears

- [ ] **Step 4.8 — Verify no regression**

1. Open an existing expense for edit — all fields load correctly, no console errors
2. Save the expense — works as before
3. Delete an expense — works as before

- [ ] **Step 4.9 — Commit**

```bash
git add src/components/money/ExpensePanel.jsx
git commit -m "feat(money): wire CategoryPanel into ExpensePanel (replace prompt)"
```

---

## Self-Review

**Spec coverage check:**

| Spec requirement | Covered in |
|---|---|
| New `CategoryPanel.jsx` | Task 3 |
| New `CategoryPanel.css` | Task 2 |
| Fields: Name, Color, isEssential toggle | Task 3, Step 3.1 |
| Name validation (empty = Save disabled) | Task 3, Step 3.1 (`disabled={!canSave}`) |
| Default color `#6b7280` | Task 3 (`CATEGORY_COLORS[10]`) |
| Toggle disabled for presets | Task 3 (`disabled={isPreset}`, `.cp-toggle-row--disabled`) |
| `+` button opens create mode | Task 4, Steps 4.3–4.4 |
| Pencil icon opens edit mode (non-presets only) | Task 4, Steps 4.3–4.4 |
| Auto-select new category after create | Task 4, Step 4.3 (`handleCategoryPanelClose`) |
| `addCategory` accepts `isEssential` | Task 1 |
| `updateCategory` already handles `isEssential` via spread | no change needed — `{ ...c, ...updates }` in store |
| Panel portals to body, stacks above ExpensePanel | Task 3 (`createPortal`) + Task 2 (`z-index: 1100`) |
| `onClose(saved?)` API | Task 3 + Task 4 |
| No regressions to ExpensePanel expense CRUD | Task 4, Step 4.8 |

**All spec requirements covered. No placeholders. Types and method names consistent across tasks.**
