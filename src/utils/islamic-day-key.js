// Maghrib-pivoted "today" key for orientation-style surfaces. Moved verbatim
// from components/orientation/Orientation.jsx so the Prophetic Path node popup
// can share the exact same day arithmetic.
import { currentIslamicDayKey } from '../store/islamic-day-store';

// Local copy of the "HH:MM (TZ)" → epoch-ms parser duplicated across the
// codebase (usePrayerTimes.js, PropheticPath.jsx) rather than centralized —
// following existing precedent, see orientation/CONTEXT.md Gotchas.
function timeToMs(raw, dayStart) {
  if (!raw) return null;
  const clean = raw.replace(/\s*\(.*\)/, '');
  const match = /^(\d{1,2}):(\d{2})/.exec(clean);
  if (!match) return null;
  const d = new Date(dayStart);
  d.setHours(Number(match[1]), Number(match[2]), 0, 0);
  return d.getTime();
}

function localDayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Reads the wall clock (Date.now / new Date), so it must only be called from
// effects and event handlers — never a render body (react-hooks/purity).
// Maghrib-pivoted: before Maghrib the Islamic day key is still yesterday's.
export function computeTodayKey(maghribRaw) {
  if (!maghribRaw) return localDayKey();
  return currentIslamicDayKey(Date.now(), timeToMs(maghribRaw, new Date())) || localDayKey();
}
