import { describe, expect, it } from 'vitest';
import { intro, summary, snapshotSummary } from '../first-sign-in-copy';

describe('FirstSignInSheet intro', () => {
  it('says one record is not in the account, in the singular', () => {
    expect(intro(1)).toBe('1 record on this device is not in your account yet.');
  });

  it('says several records are not in the account, in the plural', () => {
    expect(intro(23)).toBe('23 records on this device are not in your account yet.');
  });
});

const added = (over) => summary('add', { queued: 0, same: 0, received: 0, clashed: 0, renumbered: [], ...over });

describe('FirstSignInSheet summary', () => {
  it('says one record differs, in the singular', () => {
    expect(added({ clashed: 1 })).toEqual(['1 record differs from your account’s copy. Both are kept until you choose.']);
  });

  it('says several records differ, in the plural', () => {
    expect(added({ clashed: 3 })).toEqual(['3 records differ from your account’s copy. Both are kept until you choose.']);
  });

  it('says the account already held everything when nothing moved', () => {
    expect(added({})).toEqual(['Your account already held everything on this device.']);
  });
});

const brought = (over) => snapshotSummary({ added: 0, kept: 0, same: 0, clashed: 0, renumbered: [], ...over });

describe('SnapshotSheet summary', () => {
  it('says how many old records join the account, in the plural', () => {
    expect(brought({ added: 4 })).toEqual(['4 earlier records will be sent to your account.']);
  });

  it('says the device kept its own copy of one record, in the singular', () => {
    expect(brought({ kept: 1 })).toEqual(['1 record was already on this device, so this device’s copy is kept.']);
  });

  it('says nothing was new when everything was already there', () => {
    expect(brought({ same: 2 })).toEqual(['2 records your account already held the same.']);
    expect(brought({})).toEqual(['The earlier copy held nothing new.']);
  });

  it('names an old invoice that gets a new number', () => {
    expect(brought({ renumbered: [{ id: 'i1', was: 'INV-001' }] })).toEqual(['Invoice INV-001 gets a new number, since your account already uses it.']);
  });
});
