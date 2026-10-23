import { describe, it, expect } from 'vitest';
import { landingCopy, loginModalCopy } from '../landing-copy';

describe('landingCopy', () => {
  describe('accounts off', () => {
    const copy = landingCopy(false);

    it('says accounts are off and nothing is uploaded, without calling the backend unfinished', () => {
      expect(copy.faqWhere).toMatch(/Accounts are switched off on this site/);
      expect(copy.faqWhere).toMatch(/nothing you write is uploaded/);
      expect(copy.faqWhere).not.toMatch(/unfinished/);
    });

    it('keeps the local-only marquee and closing lines', () => {
      expect(copy.marquee).toBe('Local-first · nothing leaves your device');
      expect(copy.closing).toMatch(/No account, and nothing leaves your device/);
    });
  });

  describe('accounts on', () => {
    const copy = landingCopy(true);

    it('says records sync once you sign in, and what stays on the device', () => {
      expect(copy.faqWhere).toMatch(/in your account once you sign in/);
      expect(copy.faqWhere).toMatch(/theme and prayer settings stay on this device/);
    });

    it('says the name syncs, not that the profile stays on the device', () => {
      expect(copy.faqWhere).toMatch(/your name syncs/);
      expect(copy.faqWhere).not.toMatch(/profile stay/);
    });

    it('no line claims nothing leaves the device', () => {
      for (const line of Object.values(copy)) {
        expect(line).not.toMatch(/nothing leaves your device/);
        expect(line).not.toMatch(/nothing you write is uploaded/);
      }
    });

    it('marquee and closing say it syncs when you sign in', () => {
      expect(copy.marquee).toBe('Local-first · works offline, syncs when you sign in');
      // Sign-ups are off: the line speaks to people who already have an account.
      expect(copy.closing).toMatch(/No account needed\. Already have one\? Sign in to keep it on every device\./);
    });
  });

  it('both versions point to the JSON export', () => {
    expect(landingCopy(false).faqWhere).toMatch(/JSON from Settings/);
    expect(landingCopy(true).faqWhere).toMatch(/JSON from Settings/);
  });
});

describe('loginModalCopy', () => {
  it('accounts off: keeps the local-only popup as it is', () => {
    expect(loginModalCopy(false)).toEqual({
      title: 'Continue locally',
      note: 'Your data stays on this device only. You can export a full backup any time from Settings.',
      nameLabel: 'Name *',
      emailLabel: 'Email (optional)',
      showEmail: true,
      footer: 'cancel',
    });
  });

  describe('accounts on', () => {
    const copy = loginModalCopy(true);

    it('says it continues on this device', () => {
      expect(copy.title).toBe('Continue on this device');
    });

    it('says records stay until you sign in, and that you choose whether they join', () => {
      expect(copy.note).toMatch(/stay on this device until you sign in/);
      expect(copy.note).toMatch(/you choose whether they join your account/);
      expect(copy.note).toMatch(/backup any time from Settings/);
    });

    it('never promises the data stays on the device only', () => {
      expect(copy.note).not.toMatch(/device only/);
    });

    // A device-only email field next to an emailed-code sign-in reads as a sign-in.
    it('drops the email field and offers sign-in instead of Cancel', () => {
      expect(copy.showEmail).toBe(false);
      expect(copy.footer).toBe('signin');
    });

    it('never offers to create an account', () => {
      for (const value of Object.values(copy)) {
        expect(String(value)).not.toMatch(/Create account/);
      }
    });
  });
});
