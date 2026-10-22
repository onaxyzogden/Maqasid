// Supabase client singleton.
// All auth and storage operations import from here — never construct
// a second client elsewhere. When the client is null (feature disabled, or
// local dev without credentials) every call will throw; callers must guard
// with cloudAccountsEnabled before attempting network operations.

import { createClient } from '@supabase/supabase-js';

// ─── MASTER SWITCH ───────────────────────────────────────────────────────────
// Online accounts are a build switch: a Vite `define` constant set from
// VITE_CLOUD_ACCOUNTS=1 in the build environment (build-switches.js). Off when
// unset, and the deploy workflow never sets it, so the live site stays
// guest-only. A constant, not an import.meta.env read, so a build with the
// switch off carries no supabase-js at all (tasks/lessons.md #16).
//
// Accounts were switched off on 2026-07-27
// (wiki/decisions/2026-07-27-milos-disable-online-accounts.md) and come back
// with the record sync of the cloud re-platform. SETUP.md lists the steps.
export const CLOUD_ACCOUNTS_ENABLED = __CLOUD_ACCOUNTS__;

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
        detectSessionInUrl: true,    // handles the link in the sign-in email
      },
    })
  : null;
