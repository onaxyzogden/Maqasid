import { create } from 'zustand';
import { safeGet, safeSet } from '../services/storage';

// Islamic day starts at Maghrib. The current Islamic day is identified by
// the Gregorian date of the Maghrib that began it: if `now < todayMaghrib`,
// we're still in the previous Islamic day (yesterday's Maghrib started it);
// once we cross today's Maghrib, the key advances.
//
// `now`/`maghribMs` are accepted as numbers (epoch ms) so the helper is
// pure and testable.
export function currentIslamicDayKey(now, maghribMs) {
  if (!Number.isFinite(now) || !Number.isFinite(maghribMs)) return null;
  const ref = now < maghribMs ? new Date(now - 24 * 60 * 60 * 1000) : new Date(now);
  const y = ref.getFullYear();
  const m = String(ref.getMonth() + 1).padStart(2, '0');
  const d = String(ref.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// Default ceremony module ids cleared at Maghrib rollover. Mirrors the
// PropheticPath THRESHOLD_MODULE_BY_NODE map; centralised here so the
// trigger and the registered hook agree on scope.
export const DAILY_CEREMONY_MODULES = [
  'faith-salah',
  'faith-siyam',
  'work',
  'health-physical',
];

export const useIslamicDayStore = create((set, get) => ({
  lastKey: safeGet('bbiz_islamic_day_key', null),

  // Idempotent: invokes `hooks` and updates the stored key only when the
  // current Islamic day differs from the last-recorded one. Safe to call
  // every minute; the no-op path is one comparison + one read.
  rolloverIfMaghribCrossed: ({ maghribMs, now = Date.now(), hooks = [] } = {}) => {
    const key = currentIslamicDayKey(now, maghribMs);
    if (!key) return false;
    const last = get().lastKey;
    if (last === key) return false;
    for (const fn of hooks) {
      try { fn({ previousKey: last, currentKey: key }); }
      catch (err) { console.warn('[islamic-day rollover hook]', err); }
    }
    safeSet('bbiz_islamic_day_key', key);
    set({ lastKey: key });
    return true;
  },
}));
