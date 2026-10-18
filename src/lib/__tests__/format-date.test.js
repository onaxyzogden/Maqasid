import { describe, it, expect } from 'vitest';
import { isOverdue, localDayKey, parseLocal } from '../format-date';

describe('parseLocal', () => {
  it('reads a bare day string as local midnight on that day', () => {
    const d = parseLocal('2026-10-18');
    expect(d.getFullYear()).toBe(2026);
    expect(d.getMonth()).toBe(9);
    expect(d.getDate()).toBe(18);
    expect(d.getHours()).toBe(0);
  });

  it('keeps the instant of a full ISO timestamp', () => {
    const iso = '2026-10-18T15:30:00.000Z';
    expect(parseLocal(iso).getTime()).toBe(Date.parse(iso));
  });
});

describe('isOverdue', () => {
  const now = new Date(2026, 9, 18, 23, 30); // late evening, local

  it('is false for a task due today, all day', () => {
    expect(isOverdue(localDayKey(now), now)).toBe(false);
    expect(isOverdue('2026-10-18', new Date(2026, 9, 18, 0, 1))).toBe(false);
  });

  it('is true once the due day has ended', () => {
    expect(isOverdue('2026-10-17', now)).toBe(true);
  });

  it('is false for future days and missing or invalid dates', () => {
    expect(isOverdue('2026-10-19', now)).toBe(false);
    expect(isOverdue(null, now)).toBe(false);
    expect(isOverdue('', now)).toBe(false);
    expect(isOverdue('not a date', now)).toBe(false);
  });
});
