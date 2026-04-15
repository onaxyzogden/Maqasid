import { createPortal } from 'react-dom';
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';
import { useToastStore } from '@store/toast-store';
import './Toast.css';

const ICONS = {
  success: <CheckCircle size={16} />,
  error:   <AlertCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  info:    <Info size={16} />,
};

function ToastItem({ toast }) {
  const { removeToast } = useToastStore();

  return (
    <div
      className={`toast toast--${toast.type} toast--${toast.variant} ${toast.dismissing ? 'toast--out' : 'toast--in'}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast__icon">{ICONS[toast.type] ?? ICONS.info}</span>
      <span className="toast__message">{toast.message}</span>
      <button
        className="toast__close"
        onClick={() => removeToast(toast.id)}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

/**
 * Toast — renders all active toasts via a React portal.
 * Mount once inside AppShell.
 */
export default function Toast() {
  const { toasts } = useToastStore();

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="toast-container" aria-label="Notifications">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  );
}
