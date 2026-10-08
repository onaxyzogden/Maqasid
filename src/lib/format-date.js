// Canonical date formatting — see wiki/concepts/date-format-canonical.md
//
// Use this helper instead of inline date-fns format() calls or
// toLocaleDateString({...}) ad-hoc options. Native locale calls are fine
// for user-facing dates that should follow the user's OS locale; this
// helper is for surfaces where MILOS controls the canonical presentation
// (audit logs, exports, decision records, ceremony timestamps).
//
// Variants:
//   'short'    → "Apr 25, 2026"           ← canonical default
//   'long'     → "April 25, 2026"
//   'datetime' → "Apr 25, 2026 14:30"
//   'iso'      → "2026-04-25"             ← machine-readable
//   'time'     → "14:30"

import { format, isValid } from 'date-fns';

const PATTERNS = {
  short:    'MMM d, yyyy',
  long:     'MMMM d, yyyy',
  datetime: 'MMM d, yyyy HH:mm',
  iso:      'yyyy-MM-dd',
  time:     'HH:mm',
};

// Local calendar-day key ("2026-04-25") in the user's timezone. Use this for
// "today" comparisons and date-field defaults — never
// `new Date().toISOString().slice(0, 10)`, which is the UTC day and flips
// to tomorrow/yesterday hours before local midnight.
export function localDayKey(d = new Date()) {
  return format(d, 'yyyy-MM-dd');
}

// `new Date('2026-04-25')` is UTC midnight, which displays as Apr 24 west of
// UTC. Read a bare day string as a local calendar day instead.
export function parseLocal(input) {
  if (typeof input === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(input)) {
    const [y, m, d] = input.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(input);
}

export function formatDate(input, variant = 'short', fallback = '') {
  if (input == null) return fallback;
  const d = input instanceof Date ? input : parseLocal(input);
  if (!isValid(d)) return fallback;
  const pattern = PATTERNS[variant] || PATTERNS.short;
  try {
    return format(d, pattern);
  } catch {
    return fallback;
  }
}
