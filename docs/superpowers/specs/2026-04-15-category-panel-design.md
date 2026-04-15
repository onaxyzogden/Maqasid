# CategoryPanel — Design Spec
**Date:** 2026-04-15
**Module:** Money / Wealth
**Status:** Approved — ready for implementation

---

## Problem

Category creation in `ExpensePanel` uses a bare `prompt()` dialog that accepts only a name. This blocks adding the `isEssential` toggle for user-created categories, and also prevents setting a color or editing existing categories.

---

## Scope

**In scope:**
- New `CategoryPanel` slide-in component (create + edit modes)
- Fields: Name, Color swatch picker, isEssential toggle
- Wire into `ExpensePanel`: `+` button opens create mode, pencil icon opens edit mode
- Update `addCategory` store call to pass `isEssential` and `color`

**Out of scope (deferred):**
- Standalone Categories management tab/section
- Delete category (no safe "referenced by expenses?" guard yet)
- Preset category editing (`isEssential` locked on presets)

---

## Component Structure

### New files
| File | Purpose |
|---|---|
| `src/components/money/CategoryPanel.jsx` | Slide-in panel, create + edit modes |
| `src/components/money/CategoryPanel.css` | Panel styles (reuses `.money-slidein` pattern) |

### Modified files
| File | Change |
|---|---|
| `src/components/money/ExpensePanel.jsx` | Replace `prompt()` with CategoryPanel; add pencil icon |

---

## CategoryPanel Props

```js
CategoryPanel({
  open: boolean,           // controls visibility
  category: object|null,   // null = create mode; category object = edit mode
  onClose: fn(saved?),     // called on cancel (no arg) or after save (new/updated category object)
})
```

`onClose` receives the saved category so `ExpensePanel` can auto-select it in create mode without a separate callback.

---

## Form Fields

### Name
- Text input, required
- Trimmed on save; empty name **disables the Save button** (no inline error message needed)
- Autofocused when panel opens

### Color
- 12 swatches from `CATEGORY_COLORS` in `src/data/config/money-categories.js`
- Single-select; selected swatch shows `outline` ring
- Default on create: `#6b7280` (matches current `addCategory` default)
- Prepopulated in edit mode from `category.color`

### Essential expense toggle
- Label: **"Essential expense"**
- Subtext: *"Bills & necessities (rent, utilities…)"*
- Default: `false` (off) on create
- Prepopulated in edit mode from `category.isEssential ?? false`
- Disabled + visually greyed when `category.isPreset === true` (future-proofing; presets won't surface the edit pencil in practice)

---

## Behaviour

### Create mode (opened via `+` button in ExpensePanel)
1. Panel slides in with empty name, default color (`#6b7280`), toggle off
2. User fills fields and clicks **Save Category**
3. Calls `addCategory({ name, color, isEssential })` from money-store
4. Store returns new category object
5. `ExpensePanel` auto-selects the new category in the dropdown
6. Panel closes

### Edit mode (opened via pencil icon in ExpensePanel)
1. Panel slides in pre-filled with `category.name`, `category.color`, `category.isEssential`
2. User edits and clicks **Save Changes**
3. Calls `updateCategory(category.id, { name, color, isEssential })`
4. Store's existing guard (`!c.isPreset`) blocks preset mutation silently
5. Panel closes; dropdown reflects updated name/color

### Cancel / close (✕ or Cancel button)
- No store calls; panel slides out; no state change in ExpensePanel

---

## ExpensePanel Entry Points

### `+` button (always visible)
- Replaces current `handleAddCategory` that calls `prompt()`
- Sets `categoryPanelMode = 'create'` and `categoryPanelOpen = true`

### Pencil icon (conditional)
- Rendered inline after the category dropdown, only when:
  - A category is selected (`categoryId` is set), **AND**
  - The selected category is not a preset (`!selectedCategory?.isPreset`)
- Sets `categoryPanelMode = 'edit'` and opens panel with the selected category object

```jsx
// Category row in ExpensePanel
<div style={{ display: 'flex', gap: 4 }}>
  <select value={categoryId} onChange={...} style={{ flex: 1 }}>...</select>
  {selectedCategory && !selectedCategory.isPreset && (
    <button className="btn btn-ghost" onClick={handleEditCategory} title="Edit category">
      <Pencil size={14} />
    </button>
  )}
  <button className="btn btn-ghost" onClick={() => openCategoryPanel('create')} title="New category">
    <Plus size={14} />
  </button>
</div>
```

---

## Store — `addCategory` update

Current signature: `addCategory({ name, color })`
Required signature: `addCategory({ name, color, isEssential })`

The store must persist `isEssential` on the new category object and **return the new category** so `CategoryPanel` can pass it to `onClose` for auto-select. Default `false` if omitted.

```js
addCategory: ({ name, color, isEssential = false }) => {
  let cat;
  set((s) => {
    cat = { id: genCategoryId(), name, color: color || '#6b7280', isEssential, isPreset: false };
    const categories = [...s.categories, cat];
    persistCategories(categories);
    return { categories };
  });
  return cat; // returned to CategoryPanel → passed to onClose(cat) for auto-select
},
```

---

## Rendering

- Panel renders as a React **portal** to `document.body` (consistent with `AccountPanel`)
- Overlay (`div.money-overlay`) behind panel dims the rest of the UI
- Panel width: matches `AccountPanel` (~360px on desktop, full-width on mobile)
- Animation: slide in from right (`transform: translateX(100%)` → `translateX(0)`)
- Z-index sits above `ExpensePanel` (which is already a portal)

---

## CSS Pattern (`.money-slidein`)

Reuse the existing slide-in pattern from the Money module:

```css
/* CategoryPanel.css — inherits money-slidein pattern */
.category-panel { /* same structure as .account-panel */ }
.category-panel .money-slidein { width: 360px; }
.category-panel .cp-swatch-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.category-panel .cp-swatch {
  width: 24px; height: 24px; border-radius: 5px; cursor: pointer;
  transition: outline var(--duration) var(--ease);
}
.category-panel .cp-swatch.selected {
  outline: 3px solid var(--primary); outline-offset: 2px;
}
.category-panel .cp-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; background: var(--bg2);
  border-radius: var(--radius); border: 1px solid var(--border);
}
```

---

## Definition of Done

- [ ] `CategoryPanel` renders in create mode when `+` is clicked; auto-selects new category in dropdown
- [ ] `CategoryPanel` renders in edit mode with pre-filled fields when pencil is clicked
- [ ] Pencil icon only visible for non-preset categories
- [ ] Name validation: empty name disables Save button
- [ ] Color swatch selection works; selected swatch shows ring; default `#6b7280`
- [ ] isEssential toggle persists to store on save
- [ ] Panel closes on Cancel, ✕, and after successful save
- [ ] `addCategory` store action accepts and persists `isEssential`
- [ ] `updateCategory` store action accepts and persists `isEssential` (non-presets only)
- [ ] No regressions in ExpensePanel (existing expense create/edit unaffected)
