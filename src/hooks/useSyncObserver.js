// Watches key Zustand stores for state changes and triggers a debounced
// cloud push whenever data mutates.  Mount once in AppShell.jsx.

import { useEffect } from 'react';
import { useAuthStore } from '../store/auth-store';
import { triggerDebouncedPush } from '../services/sync-service';
import { useTaskStore } from '../store/task-store';
import { useProjectStore } from '../store/project-store';
import { useMoneyStore } from '../store/money-store';
import { useContactsStore } from '../store/contacts-store';
import { useThresholdStore } from '../store/threshold-store';

export function useSyncObserver() {
  const authStatus = useAuthStore((s) => s.authStatus);

  useEffect(() => {
    if (authStatus !== 'authenticated') return;

    // Subscribe to each high-value store.  Any state change (however small)
    // schedules a debounced push — the debounce collapses rapid mutations into
    // a single upload 30 s after the last change.
    const unsubs = [
      useTaskStore.subscribe(() => triggerDebouncedPush()),
      useProjectStore.subscribe(() => triggerDebouncedPush()),
      useMoneyStore.subscribe(() => triggerDebouncedPush()),
      useContactsStore.subscribe(() => triggerDebouncedPush()),
      useThresholdStore.subscribe(() => triggerDebouncedPush()),
    ];

    return () => unsubs.forEach((u) => u());
  }, [authStatus]);
}
