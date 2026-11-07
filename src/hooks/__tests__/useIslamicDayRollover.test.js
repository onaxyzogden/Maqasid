import { describe, it, expect } from 'vitest';

/** A Map-backed Storage for node; the hook module imports stores that read it on load. */
function memoryStorage() {
  const m = new Map();
  return {
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    clear: () => m.clear(),
  };
}

globalThis.localStorage = memoryStorage();
globalThis.sessionStorage = memoryStorage();
const { islamicDayPivotMs } = await import('../useIslamicDayRollover');

// 2026-11-07, local time.
const NOW = new Date(2026, 10, 7, 12, 30, 0, 0);

describe('islamicDayPivotMs', () => {
  it("uses today's Maghrib from the prayer timings", () => {
    const ms = islamicDayPivotMs({ Maghrib: '17:03 (EST)' }, NOW);
    expect(ms).toBe(new Date(2026, 10, 7, 17, 3, 0, 0).getTime());
  });

  it('falls back to local midnight when timings are absent', () => {
    expect(islamicDayPivotMs(null, NOW)).toBe(new Date(2026, 10, 7, 0, 0, 0, 0).getTime());
    expect(islamicDayPivotMs({}, NOW)).toBe(new Date(2026, 10, 7, 0, 0, 0, 0).getTime());
  });

  it('falls back to local midnight when the Maghrib string is unparseable', () => {
    expect(islamicDayPivotMs({ Maghrib: 'n/a' }, NOW)).toBe(new Date(2026, 10, 7, 0, 0, 0, 0).getTime());
  });
});
