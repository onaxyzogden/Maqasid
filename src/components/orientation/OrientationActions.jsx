import { Check, Ban, Clock } from 'lucide-react';
import './OrientationActions.css';

// Three actions on the open sheet: Mark done / Doesn't apply / Not today.
// "Something else" was dropped when the carousel became the pillar picker —
// switching domains is a swipe, not a button (see orientation/CONTEXT.md).
export default function OrientationActions({ onMarkDone, onNotApplicable, onNotToday }) {
  return (
    <div className="orient-actions">
      <button type="button" className="orient-actions__btn orient-actions__btn--primary" onClick={onMarkDone}>
        <Check size={18} aria-hidden="true" />
        Mark done
      </button>
      <button type="button" className="orient-actions__btn" onClick={onNotApplicable}>
        <Ban size={18} aria-hidden="true" />
        Doesn&apos;t apply
      </button>
      <button type="button" className="orient-actions__btn orient-actions__btn--ghost" onClick={onNotToday}>
        <Clock size={18} aria-hidden="true" />
        Not today
      </button>
    </div>
  );
}
