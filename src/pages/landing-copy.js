// Landing lines that make a claim about where data goes. With accounts on,
// a signed-in person's records sync, so "nothing leaves your device" is false.
export function landingCopy(accountsEnabled) {
  if (accountsEnabled) {
    return {
      faqWhere: 'On this device, and in your account once you sign in. Records sync one by one and your name syncs too; your theme and prayer settings stay on this device. You can export everything as JSON from Settings.',
      marquee: 'Local-first · works offline, syncs when you sign in',
      closing: 'Set up in under a minute. No account needed. Already have one? Sign in to keep it on every device.',
    };
  }
  return {
    faqWhere: 'On your device. MIOS keeps everything in your browser’s local storage and runs with no account. Accounts are switched off on this site, so nothing you write is uploaded. You can export everything as JSON from Settings.',
    marquee: 'Local-first · nothing leaves your device',
    closing: 'Set up in under a minute. No account, and nothing leaves your device — export the whole thing as JSON whenever you want.',
  };
}
