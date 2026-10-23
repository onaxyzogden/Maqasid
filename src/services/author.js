// Who wrote a chat message, forum post or announcement. The profile name is
// per device, so a message also carries the account id it was written under;
// your own messages then show the account's synced display name on every device.
// Decision: wiki/decisions/2026-10-23-chat-author-from-account.md.

export function authorLabel(msg, { accountId, displayName } = {}) {
  if (accountId && displayName && msg?.authorId === accountId) return displayName;
  return msg?.author;
}

export function authorStamp({ user, session, displayName } = {}) {
  return {
    author: displayName || user?.name || 'You',
    authorId: session?.user?.id ?? null,
  };
}
