import { Check, Ban, Clock } from 'lucide-react';
import './OrientationActions.css';

// Three actions on the open sheet: Mark done / Doesn't apply / Not now.
// "Something else" was dropped when the carousel became the pillar picker —
// switching domains is a swipe, not a button (see orientation/CONTEXT.md).
export default function OrientationActions({
  onMarkDone,
  onNotApplicable,
  onNotToday,
  primaryLabel = 'Mark done',
  primaryDisabled = false,
  secondaryDisabled = false,
}) {
  // The disables are split because the primary doubles as the revert control:
  // while previewing an already-completed step it stays enabled (label
  // "Completed", click = mark not done) while the two side actions lock.
  // Both are UI guards only -- the host decides what each handler writes to.
  return (
    <div className="orient-actions">
      <button
        type="button"
        className="orient-actions__btn orient-actions__btn--primary"
        onClick={onMarkDone}
        disabled={primaryDisabled}
      >
        <Check size={18} aria-hidden="true" />
        {primaryLabel}
      </button>
      <button type="button" className="orient-actions__btn" onClick={onNotApplicable} disabled={secondaryDisabled}>
        <Ban size={18} aria-hidden="true" />
        Doesn&apos;t apply
      </button>
      <button
        type="button"
        className="orient-actions__btn orient-actions__btn--ghost"
        onClick={onNotToday}
        disabled={secondaryDisabled}
      >
        <Clock size={18} aria-hidden="true" />
        Not now
      </button>
    </div>
  );
}
