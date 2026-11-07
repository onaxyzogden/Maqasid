import { useEffect } from 'react';
import { useIslamicDayStore, DAILY_CEREMONY_MODULES } from '../store/islamic-day-store';
import { useTaskStore } from '../store/task-store';
import { useThresholdStore } from '../store/threshold-store';

const POLL_MS = 60_000;

// Local copy of the "HH:MM (TZ)" → epoch-ms parser duplicated across the
// codebase (usePrayerTimes.js, PropheticPath.jsx, utils/islamic-day-key.js).
function timeToMs(raw, dayStart) {
  if (typeof raw !== 'string') return null;
  const clean = raw.replace(/\s*\(.*\)/, '');
  const match = /^(\d{1,2}):(\d{2})/.exec(clean);
  if (!match) return null;
  const d = new Date(dayStart);
  d.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return d.getTime();
}

// The instant today's Islamic day pivots on: today's Maghrib when the prayer
// timings are known, otherwise local midnight so a day never passes without a
// rollover (the same fallback `computeTodayKey` uses). Pure; `now` is a Date.
export function islamicDayPivotMs(timings, now = new Date()) {
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return timeToMs(timings?.Maghrib, dayStart) ?? dayStart.getTime();
}

// Maghrib daily-reset, mounted once in AppShell so it runs on every /app
// route: when the Islamic day flips, clear daily-cadence task state (prayer
// boards and the other daily boards) and ceremony completion so the new day
// begins fresh. Idempotent — the store no-ops if the key has not changed.
export function useIslamicDayRollover(timings) {
  const rolloverIfMaghribCrossed = useIslamicDayStore((s) => s.rolloverIfMaghribCrossed);
  const maghribRaw = timings?.Maghrib ?? null;
  useEffect(() => {
    const check = () => {
      rolloverIfMaghribCrossed({
        maghribMs: islamicDayPivotMs(maghribRaw ? { Maghrib: maghribRaw } : null),
        now: Date.now(),
        hooks: [
          () => useTaskStore.getState().resetDailyCadenceTasks(),
          () => useThresholdStore.getState().resetDailyCeremonies(DAILY_CEREMONY_MODULES),
        ],
      });
    };
    check();
    const id = setInterval(check, POLL_MS);
    return () => clearInterval(id);
  }, [maghribRaw, rolloverIfMaghribCrossed]);
}
