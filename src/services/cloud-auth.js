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

/** A sign-in code from the email: digits only. Supabase sends 6 by default; projects can set up to 10. */
export const CODE = /^\d{6,10}$/;

const tooMany = (error) => error?.status === 429 || /rate limit/i.test(error?.message ?? '');

/** What to tell the person when the sign-in email could not be sent. */
export function signInMessage(error) {
  if (tooMany(error)) {
    return 'Too many sign-in emails were sent recently. Use the newest code already in your inbox, or try again in an hour.';
  }
  if (/signups? not allowed/i.test(error?.message ?? '')) {
    return 'New sign-ups are turned off for this app. Use the email you first signed in with.';
  }
  return "We couldn't send the email. Check the address and your connection, then try again.";
}

/** What to tell the person when a code was not accepted. */
export function codeMessage(error) {
  if (tooMany(error)) return 'Too many tries. Wait a few minutes, then type the code from the newest email.';
  if (error?.status === 403 || /expired|invalid|not found/i.test(error?.message ?? '')) {
    return "That code didn't work. It may be mistyped, or from an older email. Use the code in the newest one.";
  }
  return "We couldn't check the code. Check your connection, then try again.";
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
