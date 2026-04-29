import { describe, it, expect } from 'vitest';
import {
  isMondayOrThursday,
  isAyyamAlBid,
  isAshuraOrTasua,
  isOptionalFastDay,
  isFastableDay,
  getSpecialDayHeadline,
} from '../prophetic-path-submodules.js';
import { currentIslamicDayKey } from '../../store/islamic-day-store.js';

const hijri = (month, day) => ({ month: { number: month }, day });

describe('isMondayOrThursday', () => {
  it('matches Mon (1) and Thu (4) of the week', () => {
    expect(isMondayOrThursday(new Date(2026, 0, 5))).toBe(true);  // Mon
    expect(isMondayOrThursday(new Date(2026, 0, 8))).toBe(true);  // Thu
    expect(isMondayOrThursday(new Date(2026, 0, 6))).toBe(false); // Tue
  });
});

describe('isAyyamAlBid + isAshuraOrTasua', () => {
  it('detects 13–15 of any month', () => {
    expect(isAyyamAlBid(hijri(5, 13))).toBe(true);
    expect(isAyyamAlBid(hijri(5, 14))).toBe(true);
    expect(isAyyamAlBid(hijri(5, 15))).toBe(true);
    expect(isAyyamAlBid(hijri(5, 12))).toBe(false);
    expect(isAyyamAlBid(hijri(5, 16))).toBe(false);
  });
  it('detects 9 + 10 Muharram only', () => {
    expect(isAshuraOrTasua(hijri(1, 9))).toBe(true);
    expect(isAshuraOrTasua(hijri(1, 10))).toBe(true);
    expect(isAshuraOrTasua(hijri(1, 8))).toBe(false);
    expect(isAshuraOrTasua(hijri(2, 10))).toBe(false);
  });
});

describe('isOptionalFastDay forbidden gates', () => {
  it('returns false on the two Eids', () => {
    expect(isOptionalFastDay({ date: new Date(2026, 0, 5), hijri: hijri(10, 1) })).toBe(false);
    expect(isOptionalFastDay({ date: new Date(2026, 0, 5), hijri: hijri(12, 10) })).toBe(false);
  });
  it('returns false on Tashreeq days', () => {
    expect(isOptionalFastDay({ date: new Date(2026, 0, 5), hijri: hijri(12, 11) })).toBe(false);
    expect(isOptionalFastDay({ date: new Date(2026, 0, 5), hijri: hijri(12, 13) })).toBe(false);
  });
  it('returns true on Mon outside forbidden days', () => {
    expect(isOptionalFastDay({ date: new Date(2026, 0, 5), hijri: hijri(7, 20) })).toBe(true);
  });
});

describe('isFastableDay', () => {
  it('is true throughout Ramadan', () => {
    expect(isFastableDay({ date: new Date(2026, 0, 7), hijri: hijri(9, 5) })).toBe(true);
  });
  it('is true on Mon/Thu outside Ramadan', () => {
    expect(isFastableDay({ date: new Date(2026, 0, 5), hijri: hijri(7, 1) })).toBe(true);
  });
  it('is false on a random Tuesday outside any sunnah window', () => {
    expect(isFastableDay({ date: new Date(2026, 0, 6), hijri: hijri(7, 1) })).toBe(false);
  });
});

describe('getSpecialDayHeadline priority', () => {
  it('Eid al-Fitr beats everything else', () => {
    const out = getSpecialDayHeadline({ date: new Date(2026, 0, 5), hijri: hijri(10, 1) });
    expect(out.id).toBe('eid-fitr');
  });
  it('Arafah beats Last 10 Nights', () => {
    const out = getSpecialDayHeadline({ date: new Date(2026, 0, 5), hijri: hijri(12, 9) });
    expect(out.id).toBe('arafah');
  });
  it('Laylat al-Qadr surfaces on odd last-10 nights', () => {
    const out = getSpecialDayHeadline({ date: new Date(2026, 0, 5), hijri: hijri(9, 27) });
    expect(out.id).toBe('laylat-al-qadr');
  });
  it('falls through to Mon/Thu when nothing else applies', () => {
    const out = getSpecialDayHeadline({ date: new Date(2026, 0, 5), hijri: hijri(7, 1) });
    expect(out.id).toBe('mon-thu');
  });
  it('returns null when no event applies', () => {
    const out = getSpecialDayHeadline({ date: new Date(2026, 0, 6), hijri: hijri(7, 1) });
    expect(out).toBeNull();
  });
});

describe('currentIslamicDayKey', () => {
  it('returns yesterday before Maghrib, today after', () => {
    const day = new Date(2026, 4, 1, 0, 0).getTime();
    const maghribMs = new Date(2026, 4, 1, 19, 30).getTime();
    const before = new Date(2026, 4, 1, 12, 0).getTime();
    const after = new Date(2026, 4, 1, 20, 0).getTime();
    expect(currentIslamicDayKey(before, maghribMs)).toBe('2026-04-30');
    expect(currentIslamicDayKey(after, maghribMs)).toBe('2026-05-01');
    void day;
  });
  it('returns null on bad input', () => {
    expect(currentIslamicDayKey(NaN, 1)).toBe(null);
    expect(currentIslamicDayKey(1, null)).toBe(null);
  });
});
