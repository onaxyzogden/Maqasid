// The Profile step's starting name. A signed-in device with no local profile
// starts from the synced name, so finishing onboarding doesn't rename the account.
export function profileNameStart({ prevUser, displayName } = {}) {
  return prevUser?.name || displayName || '';
}

// The onboarding Sync step. Sign-ups are off, so it only ever offers sign-in.
// A device that already signed in (AuthPage sends a new device here) sees
// who it is signed in as, not a second sign-in button.
export function syncStepCopy({ authStatus, email } = {}) {
  if (authStatus === 'signed-in' || authStatus === 'offline') {
    const who = email ? `Signed in as ${email}.` : 'You’re signed in on this device.';
    const offline = authStatus === 'offline'
      ? ' You’re offline. Your changes are kept on this device, and the sign-in renews when you’re back online.'
      : '';
    return {
      signedIn: true,
      heading: 'You’re signed in',
      body: who + offline,
      primary: 'Continue',
      secondary: null,
      footnote: null,
    };
  }
  return {
    signedIn: false,
    heading: 'Already have an account?',
    body: 'Sign in with your email to keep your records on every device.',
    primary: 'Sign in with email',
    secondary: 'Continue on this device',
    footnote: 'You can sign in later from Settings.',
  };
}
