// Keyboard support for role="tablist" (WAI-ARIA tabs pattern, automatic
// activation). Put `onKeyDown={onTablistKeyDown}` on the tablist and
// `tabIndex={selected ? 0 : -1}` on each tab: the group is then one Tab stop,
// Left/Right move between tabs (wrapping), Home/End jump to the ends, and the
// tab that receives focus is selected, matching what a click does.
const STEP = { ArrowRight: 1, ArrowLeft: -1 };

export function onTablistKeyDown(e) {
  const isJump = e.key === 'Home' || e.key === 'End';
  if (!(e.key in STEP) && !isJump) return;
  const tabs = [...e.currentTarget.querySelectorAll('[role="tab"]:not([disabled])')];
  const i = tabs.indexOf(document.activeElement);
  if (i === -1 || tabs.length === 0) return;
  e.preventDefault();
  let next;
  if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = tabs.length - 1;
  else next = (i + STEP[e.key] + tabs.length) % tabs.length;
  tabs[next].focus();
  tabs[next].click();
}
