import { describe, it, expect } from 'vitest';
import { syncStepCopy, profileNameStart } from '../onboarding-sync-copy';

describe('profileNameStart', () => {
  it('prefers the profile left by sign-out', () => {
    expect(profileNameStart({ prevUser: { name: 'Local' }, displayName: 'Synced' })).toBe('Local');
  });

  it('falls back to the synced name, so a new signed-in device does not start blank', () => {
    expect(profileNameStart({ prevUser: null, displayName: 'Synced' })).toBe('Synced');
  });

  it('is empty with neither', () => {
    expect(profileNameStart({})).toBe('');
  });
});

describe('syncStepCopy', () => {
  it('signed out: offers sign-in, never sign-up', () => {
    const copy = syncStepCopy({ authStatus: 'signed-out' });
    expect(copy.signedIn).toBe(false);
    expect(copy.heading).toBe('Already have an account?');
    expect(copy.body).toBe('Sign in with your email to keep your records on every device.');
    expect(copy.primary).toBe('Sign in with email');
    expect(copy.secondary).toBe('Continue on this device');
    expect(copy.footnote).toBe('You can sign in later from Settings.');
    for (const line of Object.values(copy)) {
      if (typeof line === 'string') expect(line).not.toMatch(/create|free account|guest/i);
    }
  });

  it('still loading counts as signed out', () => {
    expect(syncStepCopy({ authStatus: 'loading' }).signedIn).toBe(false);
  });

  it('signed in: names the email and offers only Continue', () => {
    const copy = syncStepCopy({ authStatus: 'signed-in', email: 'a@example.com' });
    expect(copy.signedIn).toBe(true);
    expect(copy.body).toMatch(/Signed in as a@example\.com/);
    expect(copy.primary).toBe('Continue');
    expect(copy.secondary).toBeNull();
    expect(copy.footnote).toBeNull();
  });

  it('offline counts as signed in and keeps the offline line', () => {
    const copy = syncStepCopy({ authStatus: 'offline', email: 'a@example.com' });
    expect(copy.signedIn).toBe(true);
    expect(copy.body).toMatch(/Signed in as a@example\.com/);
    expect(copy.body).toMatch(/Your changes are kept on this device/);
  });

  it('signed in with no email still reads as signed in', () => {
    const copy = syncStepCopy({ authStatus: 'signed-in' });
    expect(copy.body).not.toMatch(/undefined/);
    expect(copy.body).toMatch(/signed in/i);
  });
});
