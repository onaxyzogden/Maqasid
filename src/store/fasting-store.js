import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';
import { isRamadan, isTashreeq, isFastableDay } from '../data/prophetic-path-submodules';

// `userOverride` toggles sunnah-fasting days (Mon/Thu, Ayyam al-Bid, Arafah,
// Ashura) — the user signals "I am fasting today" outside Ramadan. The
// derived `computeIsFasting(hijri)` evaluates the canonical predicate:
//   Tashreeq days override OFF (fasting prohibited per Muslim 1141), else
//   automatic ON during Ramadan, else honor manual override.
export const useFastingStore = create((set, get) => ({
  userOverride: safeGetJSON('fasting_user_override', false),

  setUserOverride: (next) => {
    const value = !!next;
    safeSet('fasting_user_override', value);
    set({ userOverride: value });
  },

  // Pure: pass the current hijri object (or null) and receive the canonical
  // isFasting value. Components read userOverride from the store and call
  // this to combine with hijri from usePrayerTimes.
  computeIsFasting: (hijri) => {
    if (isTashreeq(hijri)) return false;
    if (isRamadan(hijri)) return true;
    return !!get().userOverride;
  },

  // True on every day a Sunnah/obligatory fast is recommended — used to
  // light up iftar/sahari spine nodes even when the user has not toggled
  // the manual override. Distinct from `computeIsFasting` so iftar copy
  // (which addresses someone who actually fasted) only fires when fasting.
  computeIsFastableDay: (hijri, date = new Date()) => isFastableDay({ date, hijri }),
}));
