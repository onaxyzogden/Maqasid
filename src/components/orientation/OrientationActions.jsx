import { Check, Ban, Shuffle, Clock } from 'lucide-react';

export default function OrientationActions({ onMarkDone, onNotApplicable, onSomethingElse, onNotToday, pickerOpen }) {
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
      <button
        type="button"
        className={`orient-actions__btn${pickerOpen ? ' orient-actions__btn--active' : ''}`}
        onClick={onSomethingElse}
        aria-expanded={pickerOpen}
      >
        <Shuffle size={18} aria-hidden="true" />
        Something else
      </button>
      <button type="button" className="orient-actions__btn orient-actions__btn--ghost" onClick={onNotToday}>
        <Clock size={18} aria-hidden="true" />
        Not today
      </button>
    </div>
  );
}
