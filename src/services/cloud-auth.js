// Sign-in state for MIOS accounts, ported from Capacity Routine's src/lib/auth.tsx.
// Pure functions over an injected supabase-js client, so they run in tests
// without a network. The auth store calls them with the real client.
//
// States: 'signed-in' (a session), 'signed-out' (none), and 'offline':
// signed in on this device, but the sign-in could not be renewed with no
// signal. The app stays open in that state.

/** auth-js's own test (isAuthRetryableFetchError): the request never reached the server. */
export const noSignal = (error) => error?.name === 'AuthRetryableFetchError';

/** Reads the stored session, then follows auth events. Calls onState({ status, session })
 *  on each change. Returns a function that stops listening. */
export function startAuth(client, onState) {
  const apply = (session) => onState(session
    ? { status: 'signed-in', session }
    : { status: 'signed-out', session: null });

  client.auth.getSession().then(({ data, error }) => {
    if (!data.session && noSignal(error)) onState({ status: 'offline', session: null });
    else apply(data.session);
  });
  const { data } = client.auth.onAuthStateChange((event, session) => {
    // The first session is read above; this event repeats it, as null when the renewal failed offline.
    if (event === 'INITIAL_SESSION') return;
    apply(session);
  });
  return () => data.subscription.unsubscribe();
}

/** Asks for a fresh session token and says whose it is. Null when it can't be renewed: signed out elsewhere, or offline. */
export async function renewedUser(client) {
  if (!client) return null;
  try {
    const { data, error } = await client.auth.refreshSession();
    return error ? null : (data.session?.user.id ?? null);
  } catch {
    return null;
  }
}
