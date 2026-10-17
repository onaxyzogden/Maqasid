import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './SlideIn.css';

// Right-hand slide-in panel (the `.money-slidein` pattern) as a real dialog:
// focus is trapped, Escape and a click on the dim backdrop close it, and if
// anything inside has been typed into, those two accidental exits ask
// "Discard unsaved changes?" first. An explicit Cancel / ✕ in the panel
// calls onClose directly.
//
//   <SlideIn onClose={onClose} label="Bank account">…header/body/footer…</SlideIn>
//
// `dirty` overrides the automatic input tracking when a form knows better.
// Pass `active={false}` while a nested panel (e.g. CategoryPanel) is on top
// so the two don't fight over Escape and Tab.
export default function SlideIn({ onClose, label, labelledBy, dirty, active = true, style, className = '', children }) {
  const [touched, setTouched] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const isDirty = dirty ?? touched;

  const requestClose = useCallback(() => {
    if (confirming) { setConfirming(false); return; } // Escape again = keep editing
    if (isDirty) setConfirming(true);
    else onClose();
  }, [confirming, isDirty, onClose]);

  // useFocusTrap re-runs (and re-focuses) whenever its callback changes, so
  // hand it a stable one that reads the latest requestClose.
  const closeRef = useRef(requestClose);
  useEffect(() => { closeRef.current = requestClose; }, [requestClose]);
  const stableClose = useCallback(() => closeRef.current(), []);

  const trapRef = useFocusTrap(active, stableClose);

  // Return focus to whatever opened the panel (the row, the "+ Add" button).
  // Captured at first render: by the time effects run, an autoFocus field
  // inside the panel already holds focus.
  const [opener] = useState(() => document.activeElement);
  useEffect(() => () => {
    if (opener?.isConnected) setTimeout(() => opener.focus(), 0);
  }, [opener]);
  const keepRef = useRef(null);
  useEffect(() => { if (confirming) keepRef.current?.focus(); }, [confirming]);

  const markTouched = () => { if (!touched) setTouched(true); };

  return (
    <div className="money-slidein-overlay" onClick={active ? requestClose : undefined}>
      <div
        ref={trapRef}
        className={`money-slidein ${className}`.trim()}
        style={style}
        role="dialog"
        aria-modal="true"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        onInput={markTouched}
        onChange={markTouched}
      >
        {confirming && (
          <div className="slidein-discard" role="alert">
            <span>Discard unsaved changes?</span>
            <div className="slidein-discard__actions">
              <button type="button" ref={keepRef} className="slidein-discard__keep" onClick={() => setConfirming(false)}>Keep editing</button>
              <button type="button" className="slidein-discard__discard" onClick={onClose}>Discard</button>
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
