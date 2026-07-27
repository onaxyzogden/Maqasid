import { Check, Ban, Clock } from 'lucide-react';
import './OrientationActions.css';

// Three actions on the open sheet: Mark done / Doesn't apply / Not today.
// "Something else" was dropped when the carousel became the pillar picker —
// switching domains is a swipe, not a button (see orientation/CONTEXT.md).
export default function OrientationActions({
  onMarkDone,
  onNotApplicable,
  onNotToday,
  primaryLabel = 'Mark done',
  disabled = false,
}) {
  // `disabled` guards all three actions while the host previews a locked or
  // completed step; `primaryLabel` relabels the primary. Both are UI guards
  // only -- every handler still writes to the true current step.
  return (
    <div className="orient-actions">
      <button
        type="button"
        className="orient-actions__btn orient-actions__btn--primary"
        onClick={onMarkDone}
        disabled={disabled}
      >
        <Check size={18} aria-hidden="true" />
        {primaryLabel}
      </button>
      <button type="button" className="orient-actions__btn" onClick={onNotApplicable} disabled={disabled}>
        <Ban size={18} aria-hidden="true" />
        Doesn&apos;t apply
      </button>
      <button
        type="button"
        className="orient-actions__btn orient-actions__btn--ghost"
        onClick={onNotToday}
        disabled={disabled}
      >
        <Clock size={18} aria-hidden="true" />
        Not today
      </button>
    </div>
  );
}
