import { create } from 'zustand';
import { safeGetJSON, safeSet } from '../services/storage';

// Travel state for qasr salah and traveler du'as. Manual toggle (no
// geolocation) with optional auto-expire — `setTravel(days)` sets
// `expiresAt = now + days*24h`; `getIsTraveling()` auto-clears past expiry.
//
// `startedAt` / `endedAt` drive the ephemeral departure/arrival event
// nodes in the spine (60-min trigger window after each transition).
const STORAGE_KEY = 'travel_state';
const DAY_MS = 24 * 60 * 60 * 1000;

function loadInitial() {
  const raw = safeGetJSON(STORAGE_KEY, null);
  if (!raw || typeof raw !== 'object') {
    return { active: false, startedAt: null, endedAt: null, expiresAt: null };
  }
  return {
    active: !!raw.active,
    startedAt: Number.isFinite(raw.startedAt) ? raw.startedAt : null,
    endedAt:   Number.isFinite(raw.endedAt)   ? raw.endedAt   : null,
    expiresAt: Number.isFinite(raw.expiresAt) ? raw.expiresAt : null,
  };
}

export const useTravelStore = create((set, get) => ({
  ...loadInitial(),

  // Begin travel. `durationDays` is optional; when omitted there is no
  // auto-expire and the user must call clearTravel() manually.
  setTravel: (durationDays) => {
    const now = Date.now();
    const days = Number.isFinite(durationDays) && durationDays > 0 ? durationDays : null;
    const next = {
      active: true,
      startedAt: now,
      endedAt: null,
      expiresAt: days ? now + days * DAY_MS : null,
    };
    safeSet(STORAGE_KEY, next);
    set(next);
  },

  // End travel. Stamps `endedAt` so the arrival event node can render for
  // its 60-min window.
  clearTravel: () => {
    const now = Date.now();
    const next = { active: false, startedAt: null, endedAt: now, expiresAt: null };
    safeSet(STORAGE_KEY, next);
    set(next);
  },

  // Canonical predicate. Auto-clears the store when `expiresAt` has passed,
  // so callers never see a stale `active: true`.
  getIsTraveling: () => {
    const s = get();
    if (!s.active) return false;
    if (s.expiresAt != null && Date.now() > s.expiresAt) {
      const now = Date.now();
      const next = { active: false, startedAt: null, endedAt: now, expiresAt: null };
      safeSet(STORAGE_KEY, next);
      set(next);
      return false;
    }
    return true;
  },
}));
