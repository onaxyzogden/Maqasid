// Keyboard + screen-reader activation for clickable rows and cards that are
// not <button>s (a <div> card, a <tr> row). Spread onto the element:
//
//   <div className="deal-card" {...rowActivation(() => openDeal(d))}>
//   <tr {...rowActivation(() => edit(exp), { role: null })}>   // keep table semantics
//   <div {...rowActivation(onToggle, { expanded })}>             // disclosure header
//
// A plain function, not a hook, so it can be called inside .map().
// Clicks that land on a nested control (a row's own Edit/Delete button,
// an input) are left to that control; Enter/Space only fire when the row
// itself has focus.

const NESTED_CONTROL = 'a, button, input, select, textarea, label, [role="button"], [role="checkbox"], [role="switch"]';

export function rowActivation(onActivate, { role = 'button', label, expanded } = {}) {
  return {
    role: role || undefined,
    tabIndex: 0,
    'aria-label': label,
    'aria-expanded': expanded,
    onClick: (e) => {
      const hit = e.target.closest?.(NESTED_CONTROL);
      if (hit && hit !== e.currentTarget && e.currentTarget.contains(hit)) return;
      onActivate(e);
    },
    onKeyDown: (e) => {
      if (e.target !== e.currentTarget) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate(e);
      }
    },
  };
}
