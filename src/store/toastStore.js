import { create } from 'zustand';

/**
 * Pillar Toast Store — pulse / Istiqamah success ripple notifications
 *
 * Pillar-aware toast for LevelOverview pages, IstiqamahToast, ModuleWheelSection.
 * Carries pillar identity + level color so the toast can mirror the pillar's accent.
 *
 *   const { push } = useToastStore();
 *   push({ message: 'Subhan Allah', pillar: 'faith', levelColor: '#…', dwell: 4200 });
 *
 * NOT THE SAME as `@store/toast-store` (kebab-case). That one is the generic
 * operation toast (`addToast({ message, type, variant })`) for CRM, HR, and
 * modal save/delete feedback. The two are intentionally separate by purpose:
 * pillar-level pulses use this file; operation-level confirmations use the other.
 */

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
