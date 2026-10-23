import { create } from 'zustand';
import { safeGetJSON, safeSet, safeRemove, listKeys, SYNC_EXCLUDED_KEYS } from '../services/storage';
import { supabase } from '../services/supabase';
import { startAuth } from '../services/cloud-auth';

// ─── Local user profile helpers ─────────────────────────────────────────────
// The in-app user profile (name, org, modules) lives in bbiz_user.
// It is separate from the Supabase auth identity.

/** Keys a sign-out that removes the account data still leaves: the local
 *  profile, and everything that never goes to the account (SYNC_EXCLUDED_KEYS). */
const KEPT_ON_REMOVE = new Set(['user', 'user_prev', ...SYNC_EXCLUDED_KEYS]);

// ─── Store ───────────────────────────────────────────────────────────────────

export const useAuthStore = create((set, get) => ({
  // ── Existing local profile (shape preserved for backward compat) ──────────
  user: safeGetJSON('user', null),


  // ── Account state ─────────────────────────────────────────────────────────
  supabaseSession: null,
  /** 'loading' | 'guest' (accounts off) | 'signed-out' | 'signed-in'
   *  | 'offline' (signed in on this device, sign-in not renewed with no signal) */
  authStatus: 'loading',

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
    // Keep the old profile so onboarding can reuse its id/createdAt/name
    // instead of minting a new identity (local data is keyed to this device).
    const prev = get().user;
    if (prev) safeSet('user_prev', prev);
    safeRemove('user');
    set({ user: null });
  },

  // ── Account actions ───────────────────────────────────────────────────────
  // Signing in no longer pulls or pushes the old whole-device snapshot: nothing
  // uploads or overwrites local data without the operator choosing it.

  /** Reads the stored sign-in and follows auth changes. Call once on app mount
   *  (App.jsx). With accounts off or no keys, supabase is null: stays guest. */
  initAuth: async (client = supabase) => {
    if (!client) {
      set({ authStatus: 'guest' });
      return;
    }
    startAuth(client, ({ status, session }) => set({ authStatus: status, supabaseSession: session }));
  },

  /** Signs out of the account. Local data stays unless removeData is chosen,
   *  and then only the account data goes; the profile and device-only keys stay.
   *  If Supabase refuses, nothing changes. */
  signOut: async ({ removeData = false } = {}, client = supabase) => {
    if (client) {
      const { error } = await client.auth.signOut();
      if (error) return { error };
    }
    if (removeData) {
      for (const key of listKeys('')) if (!KEPT_ON_REMOVE.has(key)) safeRemove(key);
    }
    set({ supabaseSession: null, authStatus: 'signed-out' });
    return { error: null };
  },

  /** Emails a sign-in code. The same email carries a link back to this app. */
  sendCode: async (email, client = supabase, origin = window.location.origin) => {
    try {
      const { error } = await client.auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: origin } });
      return { error: error ?? null };
    } catch (error) {
      return { error };
    }
  },

  /** Checks the code from the email. A success arrives as a SIGNED_IN event (see startAuth). */
  verifyCode: async (email, code, client = supabase) => {
    try {
      const { error } = await client.auth.verifyOtp({ email: email.trim(), token: code.replace(/\s/g, ''), type: 'email' });
      return { error: error ?? null };
    } catch (error) {
      return { error };
    }
  },
}));
