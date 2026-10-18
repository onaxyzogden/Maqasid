import { create } from 'zustand';

/**
 * Confirm Store — the app's replacement for window.confirm().
 *
 *   const confirm = useConfirm();
 *   if (!(await confirm({ title: 'Delete vendor "Acme"?', confirmLabel: 'Delete', danger: true }))) return;
 *
 * Outside React (stores, plain functions) call `requestConfirm(...)` directly.
 * One dialog shows at a time; later requests queue behind it. The answer is
 * a Promise<boolean>: true for the confirm button, false for Cancel, Escape
 * or a backdrop click. `<ConfirmDialog />` (mounted once in AppShell) renders
 * the head of the queue.
 *
 * Request shape: { title, body?, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
 *                  danger = false, extraAction?: { label, onClick } }
 * `extraAction` is a third button that runs its handler and leaves the dialog
 * open (e.g. "Export a backup first" on Clear All Data).
 */
let nextId = 1;

export const useConfirmStore = create((set, get) => ({
  queue: [],

  request: (opts) => new Promise((resolve) => {
    set((s) => ({ queue: [...s.queue, { ...opts, id: nextId++, resolve }] }));
  }),

  answer: (id, value) => {
    const item = get().queue.find((q) => q.id === id);
    if (!item) return;
    set((s) => ({ queue: s.queue.filter((q) => q.id !== id) }));
    item.resolve(value);
  },
}));

export const requestConfirm = (opts) => useConfirmStore.getState().request(opts);

export function useConfirm() {
  return useConfirmStore((s) => s.request);
}
