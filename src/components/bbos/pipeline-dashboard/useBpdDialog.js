// BBOS Pipeline Dashboard - shared modal behaviour for the portaled dialogs.
// ---------------------------------------------------------------------------
// Body scroll-lock, Esc to close, focus moved into the dialog on open and
// returned to the trigger on close, Tab kept inside the dialog, and a discard
// guard: when the dialog holds unsaved typing (dirty), every close path — scrim,
// ×, Esc — asks before throwing it away.
import { useCallback, useEffect, useRef } from "react";
import { requestConfirm } from "../../../store/confirm-store";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useBpdDialog({ onClose, dirty }) {
  const ref = useRef(null);

  const requestClose = useCallback(async () => {
    if (dirty && !(await requestConfirm({
      title: "Discard what you've typed?",
      body: "It has not been saved.",
      confirmLabel: "Discard",
      cancelLabel: "Keep editing",
      danger: true,
    }))) return;
    onClose();
  }, [onClose, dirty]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    ref.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      if (prevFocus && typeof prevFocus.focus === "function") prevFocus.focus();
    };
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.stopPropagation();
      requestClose();
      return;
    }
    if (e.key !== "Tab" || !ref.current) return;
    const nodes = Array.from(ref.current.querySelectorAll(FOCUSABLE));
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return { ref, requestClose, onKeyDown };
}
