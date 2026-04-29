import { create } from 'zustand';
import { safeGet, safeGetJSON, safeSet, safeRemove } from '../services/storage';

const hydrateOptionalString = (key) => {
  const v = safeGet(key, null);
  return v === null || v === 'null' ? null : v;
};

const HISTORY_CAP = 30;

// If the store still holds a completed niyyah from a prior day, push it
// into the history ring buffer before the new day overwrites state.
// Returns the next history array, or null if nothing was archived.
function archiveStaleNiyyah(get, today) {
  const { niyyahDate, niyyahFocus, niyyahFeeling, niyyahSubmodule, niyyahLevel, niyyahHistory, niyyahReflection } = get();
  if (!niyyahDate || niyyahDate === today) return null;
  const primary = niyyahFocus?.[0];
  if (!primary || primary === '_skipped') return null;
  if (!niyyahFeeling || !niyyahSubmodule) return null;
  const entry = {
    date: niyyahDate,
    feeling: niyyahFeeling,
    pillars: [...niyyahFocus],
    submodule: niyyahSubmodule,
    ...(niyyahLevel ? { level: niyyahLevel } : {}),
    ...(niyyahReflection ? { reflection: niyyahReflection } : {}),
  };
  const next = [...(niyyahHistory || []), entry].slice(-HISTORY_CAP);
  safeSet('thr_niyyah_history', next);
  return next;
}

// ─── Persistence boundary ───────────────────────────────────────────────
// Three storage tiers in this store:
//   1. PERSISTENT (localStorage via safe* helpers, `thr_*` prefix) — niyyah
//      slots, completed/deferred ceremonies, history ring buffer. Survives
//      reload + tab close. Cleared only by explicit user action or the
//      stale-day rollover archiver.
//   2. SESSION (sessionStorage, `thr_opening_mid`/`thr_closing_mid`) — which
//      module ceremony is currently mid-flow. Survives reload but dies with
//      the tab. Used so refreshing during a ceremony doesn't lose place.
//   3. EPHEMERAL (in-memory only) — prayer-lock state, presence flags,
//      resumeModuleId. Recomputed on each mount; never persisted.
// Edits that change persistence tier are load-bearing: dropping a write or
// flipping a key from `safeSet` to in-memory state will silently regress
// the rollover, ceremony resume, or onboarding niyyah seeding.
export const useThresholdStore = create((set, get) => ({
  // Daily Niyyah Act — pre-entry orientation (PERSISTENT)
  niyyahDate: safeGet('thr_niyyah_date', null),            // plain string (YYYY-MM-DD)
  niyyahFocus: safeGetJSON('thr_niyyah_focus', []),        // array of pillar IDs
  niyyahFeeling: hydrateOptionalString('thr_niyyah_feeling'),      // feeling id from niyyah-feelings.js
  niyyahSubmodule: hydrateOptionalString('thr_niyyah_submodule'),  // submodule id within primary pillar
  niyyahLevel: hydrateOptionalString('thr_niyyah_level'),          // 'core' | 'growth' | 'excellence' | null
  niyyahHistory: safeGetJSON('thr_niyyah_history', []),            // ring buffer of past completed niyyahs
  niyyahReflection: safeGetJSON('thr_niyyah_reflection', null),    // evening reflection { feeling, note }

  // Which module ceremony is active (null = none) — persisted in sessionStorage
  openingModuleId: sessionStorage.getItem('thr_opening_mid') || null,
  closingModuleId: sessionStorage.getItem('thr_closing_mid') || null,

  // Completed ceremonies: { [moduleId]: true }
  completedOpening: safeGetJSON('thr_open', {}),
  completedClosing: safeGetJSON('thr_close', {}),

  // Deferred ceremonies: { [moduleId]: ISO timestamp }
  deferred: safeGetJSON('thr_deferred', {}),

  // Presence awareness (ephemeral — not persisted)
  resumeModuleId: null,
  isPrayerLocked: false,
  currentPrayerName: null,
  prayerMsRemaining: null,
  prayerTimeMs: null,
  prayerWarningName: null,
  prayerWarningDismissed: false,

  completeNiyyah: (arg = []) => {
    const today = new Date().toISOString().slice(0, 10);
    // Back-compat: callers may pass an array of pillar ids (legacy) or
    // a structured object { feeling, pillars, submodule } (Ad-lib flow).
    const isStructured = arg && !Array.isArray(arg) && typeof arg === 'object';
    const pillars = isStructured ? (arg.pillars ?? []) : arg;
    const feeling = isStructured ? (arg.feeling ?? null) : null;
    const submodule = isStructured ? (arg.submodule ?? null) : null;
    const level = isStructured ? (arg.level ?? null) : null;

    const archived = archiveStaleNiyyah(get, today);

    safeSet('thr_niyyah_date', today);
    safeSet('thr_niyyah_focus', pillars);
    if (feeling) safeSet('thr_niyyah_feeling', feeling);
    else safeRemove('thr_niyyah_feeling');
    if (submodule) safeSet('thr_niyyah_submodule', submodule);
    else safeRemove('thr_niyyah_submodule');
    if (level) safeSet('thr_niyyah_level', level);
    else safeRemove('thr_niyyah_level');
    // New day → clear yesterday's reflection so the evening chip can re-appear.
    safeRemove('thr_niyyah_reflection');
    set({
      niyyahDate: today,
      niyyahFocus: pillars,
      niyyahFeeling: feeling,
      niyyahSubmodule: submodule,
      niyyahLevel: level,
      niyyahReflection: null,
      ...(archived ? { niyyahHistory: archived } : {}),
    });
  },

  // Idempotent day-rollover: if stored niyyahDate is older than today,
  // archive it (with its evening reflection) into history and clear the
  // current-day slots so the morning Niyyah Act can re-trigger fresh.
  // Safe to call on every Dashboard mount.
  rolloverIfStale: () => {
    const today = new Date().toISOString().slice(0, 10);
    const { niyyahDate } = get();
    if (!niyyahDate || niyyahDate === today) return false;
    const archived = archiveStaleNiyyah(get, today);
    safeRemove('thr_niyyah_date');
    safeRemove('thr_niyyah_feeling');
    safeRemove('thr_niyyah_submodule');
    safeRemove('thr_niyyah_level');
    safeRemove('thr_niyyah_reflection');
    safeSet('thr_niyyah_focus', []);
    set({
      niyyahDate: null,
      niyyahFocus: [],
      niyyahFeeling: null,
      niyyahSubmodule: null,
      niyyahLevel: null,
      niyyahReflection: null,
      ...(archived ? { niyyahHistory: archived } : {}),
    });
    return true;
  },

  saveReflection: ({ feeling, note = '' }) => {
    const reflection = { feeling, note, savedAt: new Date().toISOString() };
    safeSet('thr_niyyah_reflection', reflection);
    set({ niyyahReflection: reflection });
  },

  skipNiyyah: () => {
    const today = new Date().toISOString().slice(0, 10);
    const archived = archiveStaleNiyyah(get, today);
    safeSet('thr_niyyah_date', today);
    safeSet('thr_niyyah_focus', ['_skipped']);
    safeRemove('thr_niyyah_feeling');
    safeRemove('thr_niyyah_submodule');
    safeRemove('thr_niyyah_level');
    set({
      niyyahDate: today,
      niyyahFocus: ['_skipped'],
      niyyahFeeling: null,
      niyyahSubmodule: null,
      niyyahLevel: null,
      ...(archived ? { niyyahHistory: archived } : {}),
    });
  },

  isNiyyahComplete: () => {
    const today = new Date().toISOString().slice(0, 10);
    return get().niyyahDate === today;
  },

  setOpeningModuleId: (id) => {
    id ? sessionStorage.setItem('thr_opening_mid', id) : sessionStorage.removeItem('thr_opening_mid');
    set({ openingModuleId: id });
  },
  setClosingModuleId: (id) => {
    id ? sessionStorage.setItem('thr_closing_mid', id) : sessionStorage.removeItem('thr_closing_mid');
    set({ closingModuleId: id });
  },

  completeOpening: (moduleId) => {
    const updated = { ...get().completedOpening, [moduleId]: true };
    const deferred = { ...get().deferred };
    delete deferred[moduleId];
    safeSet('thr_open', updated);
    safeSet('thr_deferred', deferred);
    sessionStorage.removeItem('thr_opening_mid');
    set({ completedOpening: updated, openingModuleId: null, deferred });
  },

  completeClosing: (moduleId) => {
    const updated = { ...get().completedClosing, [moduleId]: true };
    safeSet('thr_close', updated);
    sessionStorage.removeItem('thr_closing_mid');
    set({ completedClosing: updated, closingModuleId: null });
  },

  deferOpening: (moduleId) => {
    const deferred = { ...get().deferred, [moduleId]: new Date().toISOString() };
    safeSet('thr_deferred', deferred);
    sessionStorage.removeItem('thr_opening_mid');
    set({ deferred, openingModuleId: null });
  },

  resetOpening: (moduleId) => {
    const updated = { ...get().completedOpening };
    delete updated[moduleId];
    safeSet('thr_open', updated);
    set({ completedOpening: updated });
  },

  // Maghrib daily-reset: clear opening + closing ceremony completion for the
  // given module ids so the next Islamic day's prayers/transitions start
  // from a clean state. Untouched module ids persist (e.g. weekly modules).
  resetDailyCeremonies: (moduleIds = []) => {
    const ids = new Set(moduleIds);
    const opening = { ...get().completedOpening };
    const closing = { ...get().completedClosing };
    let changed = false;
    for (const k of Object.keys(opening)) if (ids.has(k)) { delete opening[k]; changed = true; }
    for (const k of Object.keys(closing)) if (ids.has(k)) { delete closing[k]; changed = true; }
    if (!changed) return;
    safeSet('thr_open', opening);
    safeSet('thr_close', closing);
    set({ completedOpening: opening, completedClosing: closing });
  },

  // Presence actions
  triggerResume: (moduleId) => set({ resumeModuleId: moduleId }),
  dismissResume: () => set({ resumeModuleId: null }),
  setPrayerLock: (locked, prayerName, msRemaining, prayerTimeMs) => set({
    isPrayerLocked: locked,
    currentPrayerName: locked ? prayerName : null,
    prayerMsRemaining: locked ? msRemaining : null,
    prayerTimeMs: locked ? (prayerTimeMs ?? null) : null,
  }),
  showPrayerWarning: (name) => set({ prayerWarningName: name, prayerWarningDismissed: false }),
  dismissPrayerWarning: () => set({ prayerWarningDismissed: true }),
  clearPrayerWarning: () => set({ prayerWarningName: null, prayerWarningDismissed: false }),

  isOpeningComplete: (moduleId) => !!get().completedOpening[moduleId],
  isClosingComplete: (moduleId) => !!get().completedClosing[moduleId],
  isDeferred: (moduleId) => !!get().deferred[moduleId],
}));
