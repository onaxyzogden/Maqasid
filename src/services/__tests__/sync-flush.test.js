import { describe, it, expect, vi } from 'vitest';
import { createOutbox } from '../outbox';
import { memoryStore } from '../offline-store';
import { flush, keepSending } from '../sync-flush';
import { createVersionBook } from '../sync-versions';
import { SyncError } from '../sync-server';
import { fakeSyncServer } from './fake-sync-server';

const A = 'user-a';
const B = 'user-b';

async function setup({ server = fakeSyncServer(), owner = A, invoices } = {}) {
  const outbox = createOutbox(Promise.resolve(memoryStore()));
  const book = createVersionBook(Promise.resolve(memoryStore()));
  await book.load(A);
  await book.load(B);
  let who = owner;
  const renew = vi.fn(async () => who);
  const run = () => flush(outbox, { renew, server, book, invoices });
  return { outbox, book, server, renew, run, signIn: (id) => { who = id; } };
}

describe('flush', () => {
  it('sends a new record as an insert and remembers the version the server gave it', async () => {
    const s = await setup();
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1', amount: 5 }, baseVersion: null });
    await s.run();
    expect(s.server.peek(A, 'expenses', 'e1')).toMatchObject({ version: 1, data: { id: 'e1', amount: 5 }, deleted: false });
    expect(s.outbox.entries()).toEqual([]);
    expect(s.book.of(A, 'expenses', 'e1')).toBe(1);
  });

  it('sends a change on top of the version it was made on', async () => {
    const s = await setup();
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 5 } });
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1', amount: 9 }, baseVersion: 1 });
    await s.run();
    expect(s.server.peek(A, 'expenses', 'e1')).toMatchObject({ version: 2, data: { amount: 9 } });
    expect(s.book.of(A, 'expenses', 'e1')).toBe(2);
  });

  it('only sends the changes of the account that renewed, and never sends with no account', async () => {
    const s = await setup({ owner: null });
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1' }, baseVersion: null });
    await s.outbox.add(B, { collection: 'expenses', recordId: 'e2', op: 'upsert', data: { id: 'e2' }, baseVersion: null });
    expect(await s.run()).toMatchObject({ signInNeeded: true });
    expect(s.server.calls).toEqual([]);

    s.signIn(B);
    await s.run();
    expect(s.server.peek(B, 'expenses', 'e2')).not.toBeNull();
    expect(s.server.peek(A, 'expenses', 'e1')).toBeNull();
    expect(s.server.peek(B, 'expenses', 'e1')).toBeNull();
    expect(s.outbox.entries()).toMatchObject([{ owner: A, recordId: 'e1' }]);
  });

  it('never overwrites a change another device saved: it marks a clash and keeps both', async () => {
    const s = await setup();
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 5 } });
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 7 } }); // the other device, version 2
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1', amount: 9 }, baseVersion: 1 });
    await s.run();
    expect(s.server.peek(A, 'expenses', 'e1')).toMatchObject({ version: 2, data: { amount: 7 } });
    expect(s.outbox.entries()).toMatchObject([
      { recordId: 'e1', data: { amount: 9 }, clash: { server: { version: 2, data: { id: 'e1', amount: 7 }, deleted: false } } },
    ]);
    // A clashed change waits for a choice; the next pass does not send it again.
    const before = s.server.calls.length;
    await s.run();
    expect(s.server.calls.length).toBe(before);
  });

  it('counts a change as sent when its reply was lost but the server holds it', async () => {
    const s = await setup();
    // The insert landed, the reply never came back, so the change is still waiting with no version.
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 5 } });
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1', amount: 5 }, baseVersion: null });
    await s.run();
    expect(s.outbox.entries()).toEqual([]);
    expect(s.book.of(A, 'expenses', 'e1')).toBe(1);
  });

  it('sends a delete as a record marked deleted, so other devices remove it too', async () => {
    const s = await setup();
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1' } });
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'delete', baseVersion: 1 });
    await s.run();
    expect(s.server.peek(A, 'expenses', 'e1')).toMatchObject({ version: 2, deleted: true, data: null });
    expect(s.outbox.entries()).toEqual([]);
  });

  it('stops at the first change that cannot reach the server, and keeps the rest in order', async () => {
    const s = await setup();
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1' }, baseVersion: null });
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e2', op: 'upsert', data: { id: 'e2' }, baseVersion: null });
    s.server.setOffline(true);
    await s.run();
    expect(s.server.calls.length).toBe(1);
    expect(s.outbox.entries().map((e) => e.recordId)).toEqual(['e1', 'e2']);
  });

  it('asks for sign-in again when the server refuses the session', async () => {
    const s = await setup();
    s.server.insert = async () => { throw new SyncError('auth'); };
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1' }, baseVersion: null });
    expect(await s.run()).toMatchObject({ signInNeeded: true });
    expect(s.outbox.entries()).toHaveLength(1);
  });

  it('keeps a change the server will not take, marked so someone can choose', async () => {
    const s = await setup();
    s.server.insert = async () => { throw new SyncError('refused'); };
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1' }, baseVersion: null });
    await s.run();
    expect(s.outbox.entries()).toMatchObject([{ recordId: 'e1', clash: { server: null } }]);
  });

  it('numbers invoices made offline on two devices without giving the same number twice', async () => {
    const server = fakeSyncServer();
    const numbered = [];
    const invoices = { after: () => 0, numbered: (id, number) => numbered.push([id, number]) };
    const phone = await setup({ server, invoices });
    const laptop = await setup({ server, invoices });
    await phone.outbox.add(A, { collection: 'invoices', recordId: 'i-phone', op: 'upsert', data: { id: 'i-phone', number: '', numberPending: true }, baseVersion: null });
    await laptop.outbox.add(A, { collection: 'invoices', recordId: 'i-laptop', op: 'upsert', data: { id: 'i-laptop', number: '', numberPending: true }, baseVersion: null });
    await phone.run();
    await laptop.run();
    const a = server.peek(A, 'invoices', 'i-phone').data;
    const b = server.peek(A, 'invoices', 'i-laptop').data;
    expect(a).toEqual({ id: 'i-phone', number: 'INV-001' });
    expect(b).toEqual({ id: 'i-laptop', number: 'INV-002' });
    expect(numbered).toEqual([['i-phone', 'INV-001'], ['i-laptop', 'INV-002']]);
  });

  it('numbers past the invoices this device already holds', async () => {
    const s = await setup({ invoices: { after: () => 14, numbered: () => {} } });
    await s.outbox.add(A, { collection: 'invoices', recordId: 'i1', op: 'upsert', data: { id: 'i1', numberPending: true }, baseVersion: null });
    await s.run();
    expect(s.server.peek(A, 'invoices', 'i1').data.number).toBe('INV-015');
  });

  it('gives the same number when the send is retried after a lost reply', async () => {
    const s = await setup({ invoices: { after: () => 0, numbered: () => {} } });
    await s.outbox.add(A, { collection: 'invoices', recordId: 'i1', op: 'upsert', data: { id: 'i1', numberPending: true }, baseVersion: null });
    const insert = s.server.insert;
    s.server.insert = async () => { throw new SyncError('offline'); };
    await s.run();
    s.server.insert = insert;
    await s.run();
    expect(s.server.peek(A, 'invoices', 'i1').data.number).toBe('INV-001');
  });
});

describe('keepSending', () => {
  function fakeWindow() {
    const handlers = new Map();
    return {
      addEventListener: (t, h) => handlers.set(t, h),
      removeEventListener: (t) => handlers.delete(t),
      fire: (t) => handlers.get(t)?.(),
      handlers,
    };
  }

  it('sends at start, when the signal comes back and when the app is shown again', async () => {
    const outbox = createOutbox(Promise.resolve(memoryStore()));
    const win = fakeWindow();
    const doc = { ...fakeWindow(), visibilityState: 'visible' };
    const run = vi.fn(async () => ({}));
    const sender = keepSending(outbox, { run, win, doc, online: () => true });
    await sender.idle();
    expect(run).toHaveBeenCalledTimes(1);
    win.fire('online');
    await sender.idle();
    expect(run).toHaveBeenCalledTimes(2);
    doc.fire('visibilitychange');
    await sender.idle();
    expect(run).toHaveBeenCalledTimes(3);
    sender.stop();
    expect(win.handlers.size).toBe(0);
    expect(doc.handlers.size).toBe(0);
  });

  it('sends a new change while online, and runs one pass at a time', async () => {
    const outbox = createOutbox(Promise.resolve(memoryStore()));
    let release;
    const run = vi.fn(() => new Promise((r) => { release = r; }));
    const sender = keepSending(outbox, { run, win: fakeWindow(), doc: { ...fakeWindow(), visibilityState: 'visible' }, online: () => true });
    await outbox.ready;
    await outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: {}, baseVersion: null });
    await outbox.add(A, { collection: 'expenses', recordId: 'e2', op: 'upsert', data: {}, baseVersion: null });
    expect(run).toHaveBeenCalledTimes(1);
    release({});
    await vi.waitFor(() => expect(run).toHaveBeenCalledTimes(2));
    release({});
    await sender.idle();
    expect(run).toHaveBeenCalledTimes(2);
    sender.stop();
  });

  it('waits while offline', async () => {
    const outbox = createOutbox(Promise.resolve(memoryStore()));
    const run = vi.fn(async () => ({}));
    const sender = keepSending(outbox, { run, win: fakeWindow(), doc: { ...fakeWindow(), visibilityState: 'visible' }, online: () => false });
    await outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: {}, baseVersion: null });
    await sender.idle();
    expect(run).not.toHaveBeenCalled();
    sender.stop();
  });
});
