import { useCallback } from 'react';
import { useToastStore } from '@store/toast-store';

/**
 * useUndoToast — after a delete, show "<message> · Undo" for 6s.
 * Usage: const undoToast = useUndoToast(); undoToast('Salary record deleted', () => restore(...));
 * Pass `{ duration }` (ms) as a third argument to hold the toast longer.
 */
export function useUndoToast() {
  const addToast = useToastStore((s) => s.addToast);
  return useCallback(
    (message, undo, { duration } = {}) =>
      addToast({ type: 'info', message, duration, action: { label: 'Undo', onClick: undo } }),
    [addToast]
  );
}
