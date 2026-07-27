// Supabase client singleton.
// All auth and storage operations import from here — never construct
// a second client elsewhere. When the client is null (feature disabled, or
// local dev without credentials) every call will throw; callers must guard
// with cloudAccountsEnabled before attempting network operations.

import { createClient } from '@supabase/supabase-js';

// ─── MASTER SWITCH ───────────────────────────────────────────────────────────
// Online accounts (signup / login / cross-device sync) are DISABLED because the
// backend is not ready. This is a hardcoded switch, deliberately not an env var,
// so a stray .env file or a re-added CI secret cannot silently re-expose signup.
//
// To restore the feature:
//   1. Flip this to true
//   2. Re-add the AuthPage/AccountPage lazy imports + routes in src/App.jsx
//   3. Re-add the VITE_SUPABASE_* env block to .github/workflows/deploy.yml
//
// See wiki/decisions/2026-07-27-milos-disable-online-accounts.md
export const CLOUD_ACCOUNTS_ENABLED = false;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when both env vars are set. Describes credential presence only —
 *  it does NOT mean the feature is on. Guard behaviour with
 *  cloudAccountsEnabled instead. */
export const isSupabaseConfigured =
  typeof SUPABASE_URL === 'string' && SUPABASE_URL.length > 0 &&
  typeof SUPABASE_ANON_KEY === 'string' && SUPABASE_ANON_KEY.length > 0;

/** The single flag every caller should branch on: the feature is switched on
 *  AND credentials exist. False here means no client, no network, no UI. */
export const cloudAccountsEnabled = CLOUD_ACCOUNTS_ENABLED && isSupabaseConfigured;

export const supabase = cloudAccountsEnabled
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,        // session survives tab close
        autoRefreshToken: true,      // keeps token fresh silently
        detectSessionInUrl: true,    // handles magic-link callback URL hash
      },
    })
  : null;
