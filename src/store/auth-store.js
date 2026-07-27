import { create } from 'zustand';
import { safeGetJSON, safeGet, safeSet, safeRemove, listKeys } from '../services/storage';
import { supabase, cloudAccountsEnabled } from '../services/supabase';
import { pullSnapshot, pushSnapshot, detectConflict, applyPull, initSync, teardownSync } from '../services/sync-service';

// ─── Local user profile helpers ─────────────────────────────────────────────
// The in-app user profile (name, org, modules) lives in bbiz_user.
// It is separate from the Supabase auth identity.

function hasLocalData() {
  // True when there are meaningful bbiz_* keys beyond just the user profile
  const keys = listKeys('');
  return keys.some((k) => k !== 'user' && !k.startsWith('sync_'));
}

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAuthStore = create((set, get) => ({
  // ── Existing local profile (shape preserved for backward compat) ──────────
  user: safeGetJSON('user', null),

  // ── Supabase / sync state ─────────────────────────────────────────────────
  supabaseSession: null,
  /** 'loading' | 'guest' | 'authenticated' */
  authStatus: 'loading',
  /** 'idle' | 'syncing' | 'synced' | 'error' | 'conflict' | 'pull_available' */
  syncStatus: 'idle',
  lastSyncedAt: null,
  /** null | 'has_local_and_cloud' | 'has_local_no_cloud' | 'no_local_has_cloud' */
  firstLoginConflict: null,
  /** Snapshot data waiting to be applied (set by sync-service periodic pull) */
  _pendingPullData: null,
  /** In-memory guard: user id whose first-login conflict has already been
   *  evaluated this page load. Prevents onAuthStateChange refires (focus-driven
   *  SIGNED_IN, TOKEN_REFRESHED) from re-running detection. Not persisted. */
  _authBootUserId: null,

  // ── Existing profile actions (unchanged API) ──────────────────────────────
  login: (userData) => {
    safeSet('user', userData);
    set({ user: userData });
  },

  updateUser: (updates) => set((s) => {
    const user = { ...s.user, ...updates };
    safeSet('user', user);
    return { user };
  }),

  logout: () => {
    safeRemove('user');
    set({ user: null });
  },

  // ── Sync state setters (called by sync-service) ───────────────────────────
  setSyncStatus: (syncStatus) => set({ syncStatus }),
  _setPendingPullData: (data) => set({ _pendingPullData: data, syncStatus: 'pull_available' }),

  // ── Supabase auth actions ─────────────────────────────────────────────────

  /** Initialise Supabase session and subscribe to auth changes.
   *  Call once on app mount (App.jsx useEffect). */
  initAuth: async () => {
    if (!cloudAccountsEnabled || !supabase) {
      // Online accounts disabled (or no credentials) — stay in guest mode.
      // authStatus can never reach 'authenticated', which is what keeps
      // SyncStatusChip, FirstLoginModal, useSyncObserver and the Settings
      // Account & Sync panel from rendering.
      set({ authStatus: 'guest' });
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await get()._handleAuthenticatedSession(session);
    } else {
      set({ authStatus: 'guest' });
    }

    // Subscribe to future auth state changes (magic link callback, token refresh, sign-out)
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        await get()._handleAuthenticatedSession(session, event);
      } else {
        teardownSync();
        set({ authStatus: 'guest', supabaseSession: null, syncStatus: 'idle' });
      }
    });
  },

  /** Internal: called when a valid Supabase session is present. */
  _handleAuthenticatedSession: async (session, event) => {
    set({ supabaseSession: session, authStatus: 'authenticated' });

    // Dedupe auth-event refires: supabase-js re-emits SIGNED_IN on tab refocus
    // and TOKEN_REFRESHED on a timer. Only run conflict detection once per page
    // load for a given user; refires just refresh the session ref above.
    if (get()._authBootUserId === session.user.id) return; // refire — already handled
    set({ _authBootUserId: session.user.id });
    void event; // event reserved for future per-event handling

    // Determine first-login conflict state
    const local = hasLocalData();
    const { data: cloudData, cloudUpdatedAt } = await pullSnapshot();
    const cloudExists = !!cloudData;

    if (local && cloudExists) {
      set({ firstLoginConflict: 'has_local_and_cloud' });
    } else if (local && !cloudExists) {
      // Only offer the backup prompt if the user hasn't dismissed it on this
      // device. Device-local flag (excluded from cloud snapshot); once they back
      // up, cloud exists and this branch can no longer fire anyway.
      if (safeGet('sync_backup_dismissed') !== 'true') {
        set({ firstLoginConflict: 'has_local_no_cloud' });
      }
    } else if (!local && cloudExists) {
      set({ firstLoginConflict: 'no_local_has_cloud' });
      // Auto-pull on new device — no conflict to resolve
      get()._applyCloudData(cloudData);
      return;
    }
    // else: both empty — nothing to do

    initSync();
    set({ syncStatus: 'synced', lastSyncedAt: new Date().toISOString() });

    // On subsequent logins (conflict already resolved), check if cloud is newer
    if (!get().firstLoginConflict) {
      const verdict = detectConflict(cloudUpdatedAt);
      if (verdict === 'cloud_newer' && cloudData) {
        set({ syncStatus: 'pull_available', _pendingPullData: cloudData });
      }
    }
  },

  /** Apply a pending cloud snapshot — triggers reload. */
  _applyCloudData: (data) => {
    set({ syncStatus: 'syncing' });
    applyPull(data); // calls window.location.reload()
  },

  /** Sign up with email + password, then set local profile. */
  signUpWithEmail: async (email, password, profileData) => {
    if (!supabase) return { error: new Error('Supabase not configured') };
    set({ syncStatus: 'syncing' });
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) { set({ syncStatus: 'error' }); return { error }; }
    if (profileData) get().login(profileData);
    return { data, error: null };
  },

  /** Sign in with email + password. */
  signInWithEmail: async (email, password) => {
    if (!supabase) return { error: new Error('Supabase not configured') };
    set({ syncStatus: 'syncing' });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { set({ syncStatus: 'error' }); return { error }; }
    return { data, error: null };
  },

  /** Send a magic link (passwordless sign-in). */
  sendMagicLink: async (email) => {
    if (!supabase) return { error: new Error('Supabase not configured') };
    const { error } = await supabase.auth.signInWithOtp({ email });
    return { error };
  },

  /** Sign out of Supabase; keep local bbiz_* data intact. */
  signOut: async () => {
    if (supabase) await supabase.auth.signOut();
    teardownSync();
    set({ supabaseSession: null, authStatus: 'guest', syncStatus: 'idle', firstLoginConflict: null });
    // Note: local bbiz_* data is preserved; user can keep using the app in guest mode
  },

  /** Resolve the first-login data conflict.
   *  @param {'keep_local'|'use_cloud'|'keep_local_no_push'} choice */
  resolveFirstLoginConflict: async (choice) => {
    const { _pendingPullData } = get();
    set({ firstLoginConflict: null });

    if (choice === 'use_cloud' && _pendingPullData) {
      get()._applyCloudData(_pendingPullData);
      return;
    }
    if (choice === 'keep_local') {
      set({ syncStatus: 'syncing' });
      const { ok } = await pushSnapshot();
      set({ syncStatus: ok ? 'synced' : 'error', lastSyncedAt: ok ? new Date().toISOString() : null });
    }
    if (choice === 'keep_local_no_push') {
      // Persist the dismissal so the backup prompt doesn't reappear on this
      // device (across auth-event refires and page reloads). User can still
      // back up manually via Settings → "Sync now".
      safeSet('sync_backup_dismissed', 'true');
    }
    initSync();
  },

  /** Manually trigger an immediate push (used by AccountPage "Sync now" button). */
  syncNow: async () => {
    set({ syncStatus: 'syncing' });
    const { ok, error } = await pushSnapshot();
    set({
      syncStatus: ok ? 'synced' : 'error',
      lastSyncedAt: ok ? new Date().toISOString() : get().lastSyncedAt,
    });
    return { ok, error };
  },

  /** Apply pending pull data (called from SyncStatusChip or pull_available banner). */
  applyPendingPull: () => {
    const { _pendingPullData } = get();
    if (_pendingPullData) get()._applyCloudData(_pendingPullData);
  },
}));
