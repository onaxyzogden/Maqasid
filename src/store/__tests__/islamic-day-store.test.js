import { describe, it, expect, beforeEach } from 'vitest';

/** A Map-backed localStorage for node. */
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
const { useIslamicDayStore, currentIslamicDayKey } = await import('../islamic-day-store');

// 2026-11-07 local: Maghrib at 17:00, "now" at 18:00 (after Maghrib).
const MAGHRIB = new Date(2026, 10, 7, 17, 0, 0, 0).getTime();
const AFTER_MAGHRIB = new Date(2026, 10, 7, 18, 0, 0, 0).getTime();
const NEXT_DAY_MAGHRIB = new Date(2026, 10, 8, 17, 0, 0, 0).getTime();
const NEXT_DAY_AFTER = new Date(2026, 10, 8, 18, 0, 0, 0).getTime();

beforeEach(() => {
  localStorage.clear();
  useIslamicDayStore.setState({ lastKey: null });
});

describe('currentIslamicDayKey', () => {
  it('returns null when Maghrib is unknown, so a caller needs a fallback', () => {
    expect(currentIslamicDayKey(AFTER_MAGHRIB, null)).toBeNull();
  });

  it('keys the day by the Maghrib that began it', () => {
    expect(currentIslamicDayKey(AFTER_MAGHRIB, MAGHRIB)).toBe('2026-11-07');
    expect(currentIslamicDayKey(MAGHRIB - 60_000, MAGHRIB)).toBe('2026-11-06');
  });
});

describe('rolloverIfMaghribCrossed', () => {
  it('fires the hooks once when the key changes and persists the key', () => {
    let calls = 0;
    const hooks = [() => { calls += 1; }];
    const first = useIslamicDayStore.getState().rolloverIfMaghribCrossed({ maghribMs: MAGHRIB, now: AFTER_MAGHRIB, hooks });
    expect(first).toBe(true);
    expect(calls).toBe(1);
    expect(localStorage.getItem('bbiz_bbiz_islamic_day_key')).toBe("2026-11-07");
  });

  it('no-ops on the same key', () => {
    let calls = 0;
    const hooks = [() => { calls += 1; }];
    const args = { maghribMs: MAGHRIB, now: AFTER_MAGHRIB, hooks };
    useIslamicDayStore.getState().rolloverIfMaghribCrossed(args);
    const second = useIslamicDayStore.getState().rolloverIfMaghribCrossed({ ...args, now: AFTER_MAGHRIB + 60_000 });
    expect(second).toBe(false);
    expect(calls).toBe(1);
  });

  it('fires again on the next Islamic day', () => {
    let calls = 0;
    const hooks = [() => { calls += 1; }];
    useIslamicDayStore.getState().rolloverIfMaghribCrossed({ maghribMs: MAGHRIB, now: AFTER_MAGHRIB, hooks });
    useIslamicDayStore.getState().rolloverIfMaghribCrossed({ maghribMs: NEXT_DAY_MAGHRIB, now: NEXT_DAY_AFTER, hooks });
    expect(calls).toBe(2);
    expect(useIslamicDayStore.getState().lastKey).toBe('2026-11-08');
  });

  it('does nothing when Maghrib is unknown', () => {
    let calls = 0;
    const r = useIslamicDayStore.getState().rolloverIfMaghribCrossed({ maghribMs: null, now: AFTER_MAGHRIB, hooks: [() => { calls += 1; }] });
    expect(r).toBe(false);
    expect(calls).toBe(0);
  });
});
