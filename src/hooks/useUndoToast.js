import { useCallback } from 'react';
import { useToastStore } from '@store/toast-store';

/**
 * useUndoToast — after a delete, show "<message> · Undo" for 6s.
 * Usage: const undoToast = useUndoToast(); undoToast('Salary record deleted', () => restore(...));
 */
export function useUndoToast() {
  const addToast = useToastStore((s) => s.addToast);
  return useCallback(
    (message, undo) => addToast({ type: 'info', message, action: { label: 'Undo', onClick: undo } }),
    [addToast]
  );
}
