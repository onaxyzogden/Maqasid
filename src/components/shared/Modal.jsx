import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './Modal.css';

// Centered dialog — the sibling of SlideIn, which is this same frame dressed
// as a right-hand panel. Focus is trapped, Escape and a click on the dim
// backdrop close it, and if anything inside has been typed into, those two
// accidental exits ask "Discard unsaved changes?" first. An explicit Cancel /
// ✕ inside calls onClose directly. Focus returns to whatever opened it.
//
//   <Modal onClose={onClose} labelledBy="new-project-title">…</Modal>
//
// Existing dialogs keep their look by passing their own classes:
// `overlayClassName` for the backdrop, `className` for the box.
//
// `dirty` overrides the automatic input tracking when a form knows better.
// `active={false}` hands Escape and Tab to a nested dialog on top.
// `dismissible={false}` is for a blocking choice (first-login conflict):
// no Escape, no backdrop close — only the dialog's own buttons end it.
export default function Modal({
  onClose,
  label,
  labelledBy,
  describedBy,
  role = 'dialog',
  dirty,
  active = true,
  dismissible = true,
  overlayClassName = 'ui-modal-overlay',
  overlayStyle,
  className = 'ui-modal',
  style,
  children,
}) {
  const [touched, setTouched] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const isDirty = dirty ?? touched;

  const requestClose = useCallback(() => {
    if (!dismissible) return;
    if (confirming) { setConfirming(false); return; } // Escape again = keep editing
    if (isDirty) setConfirming(true);
    else onClose();
  }, [dismissible, confirming, isDirty, onClose]);

  // useFocusTrap re-runs (and re-focuses) whenever its callback changes, so
  // hand it a stable one that reads the latest requestClose.
  const closeRef = useRef(requestClose);
  useEffect(() => { closeRef.current = requestClose; }, [requestClose]);
  const stableClose = useCallback(() => closeRef.current(), []);

  const trapRef = useFocusTrap(active, stableClose);

  // Return focus to whatever opened the dialog. Captured at first render: by
  // the time effects run, an autoFocus field inside already holds focus.
  // The return is deferred, and a remount cancels it: StrictMode's dev-only
  // unmount/remount would otherwise pull focus off an autoFocus field and the
  // trap would then land on the first control.
  const [opener] = useState(() => document.activeElement);
  const returnTimer = useRef(null);
  useEffect(() => {
    clearTimeout(returnTimer.current);
    return () => {
      if (opener?.isConnected) returnTimer.current = setTimeout(() => opener.focus(), 0);
    };
  }, [opener]);
  const keepRef = useRef(null);
  useEffect(() => { if (confirming) keepRef.current?.focus(); }, [confirming]);

  const markTouched = () => { if (!touched) setTouched(true); };

  return (
    <div
      className={overlayClassName}
      style={overlayStyle}
      onClick={(e) => { if (active && e.target === e.currentTarget) requestClose(); }}
    >
      <div
        ref={trapRef}
        className={className}
        style={style}
        role={role}
        aria-modal="true"
        aria-label={labelledBy ? undefined : label}
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        tabIndex={-1}
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
