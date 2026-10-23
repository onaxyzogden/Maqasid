import { describe, it, expect } from 'vitest';
import { authorLabel, authorStamp } from '../author';

describe('authorLabel', () => {
  const mine = { author: 'Old name', authorId: 'acct-1' };

  it('shows the synced display name on your own message', () => {
    expect(authorLabel(mine, { accountId: 'acct-1', displayName: 'Yousef' })).toBe('Yousef');
  });

  it('keeps the stored author when no display name has synced yet', () => {
    expect(authorLabel(mine, { accountId: 'acct-1', displayName: null })).toBe('Old name');
  });

  it('keeps the stored author on another account’s message', () => {
    expect(authorLabel(mine, { accountId: 'acct-2', displayName: 'Yousef' })).toBe('Old name');
  });

  it('keeps the stored author on a message written before accounts', () => {
    expect(authorLabel({ author: 'Old name' }, { accountId: 'acct-1', displayName: 'Yousef' })).toBe('Old name');
  });

  it('keeps the stored author when signed out', () => {
    expect(authorLabel(mine, { accountId: null, displayName: 'Yousef' })).toBe('Old name');
  });
});

describe('authorStamp', () => {
  const session = { user: { id: 'acct-1' } };

  it('stamps the display name and the account id', () => {
    expect(authorStamp({ user: { name: 'Device name' }, session, displayName: 'Yousef' }))
      .toEqual({ author: 'Yousef', authorId: 'acct-1' });
  });

  it('falls back to the device name, then to You', () => {
    expect(authorStamp({ user: { name: 'Device name' }, session }).author).toBe('Device name');
    expect(authorStamp({ session }).author).toBe('You');
  });

  it('has no account id when signed out', () => {
    expect(authorStamp({ user: { name: 'Device name' } }))
      .toEqual({ author: 'Device name', authorId: null });
  });
});
