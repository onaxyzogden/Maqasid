// Supabase client singleton.
// All auth and storage operations import from here — never construct
// a second client elsewhere. When VITE_SUPABASE_URL is absent (local dev
// without credentials) every call will throw; callers must guard with
// isSupabaseConfigured() before attempting network operations.

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when both env vars are set. Used to short-circuit sync logic when
 *  running without credentials (local dev or plain localStorage mode). */
export const isSupabaseConfigured =
  typeof SUPABASE_URL === 'string' && SUPABASE_URL.length > 0 &&
  typeof SUPABASE_ANON_KEY === 'string' && SUPABASE_ANON_KEY.length > 0;

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,        // session survives tab close
        autoRefreshToken: true,      // keeps token fresh silently
        detectSessionInUrl: true,    // handles magic-link callback URL hash
      },
    })
  : null;
