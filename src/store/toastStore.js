import { create } from 'zustand';

let nextId = 1;
const DEFAULT_DWELL = 4200;

export const useToastStore = create((set, get) => ({
  toasts: [],
  push({ message, pillar, levelColor, dwell = DEFAULT_DWELL }) {
    const id = nextId++;
    set((s) => ({ toasts: [...s.toasts, { id, message, pillar, levelColor }] }));
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
      }, dwell);
    }
    return id;
  },
  dismiss(id) {
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
  },
  clear() {
    set({ toasts: [] });
  },
  _get: get,
}));
