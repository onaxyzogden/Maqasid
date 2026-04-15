import { create } from 'zustand';

/**
 * Toast Store — lightweight transient notification system
 *
 * Two types (per NotebookLM design intelligence):
 *   'toast'  — slides up bottom-right, auto-dismisses after 3s (for operations: save, delete, create)
 *   'chip'   — slides up near action site, auto-dismisses after 2s (for micro-actions: copy, toggle)
 *
 * Usage:
 *   const { addToast } = useToastStore();
 *   addToast({ type: 'success', message: 'Task completed' });
 *   addToast({ type: 'error', message: 'Failed to save' });
 *   addToast({ type: 'info', message: 'Copied to clipboard', variant: 'chip' });
 */

let nextId = 1;

export const useToastStore = create((set) => ({
  toasts: [],

  addToast: ({ message, type = 'success', variant = 'toast', duration }) => {
    const id = nextId++;
    const ms = duration ?? (variant === 'chip' ? 2000 : 3000);

    set((state) => ({
      toasts: [...state.toasts, { id, message, type, variant, dismissing: false }],
    }));

    // Auto-dismiss: first mark as dismissing (triggers exit animation), then remove
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.map((t) => (t.id === id ? { ...t, dismissing: true } : t)),
      }));
      setTimeout(() => {
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
      }, 300); // exit animation duration
    }, ms);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, dismissing: true } : t)),
    }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 300);
  },
}));
