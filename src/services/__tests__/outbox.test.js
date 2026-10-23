import { describe, it, expect, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { createOutbox } from '../outbox';
import { idbStore, memoryStore } from '../offline-store';

const A = 'user-a';
const B = 'user-b';
const up = (collection, recordId, data, baseVersion = 3) => ({ collection, recordId, op: 'upsert', data, baseVersion });
const del = (collection, recordId, baseVersion = 3) => ({ collection, recordId, op: 'delete', baseVersion });

function open(store = memoryStore()) {
  let t = 0;
  return createOutbox(Promise.resolve(store), { now: () => `2026-10-22T00:00:0${t++}Z` });
}

describe('outbox', () => {
  it('keeps a change for the account it was made under', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { id: 'e1', amount: 5 }));
    expect(box.entries(A)).toMatchObject([
      { owner: A, collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1', amount: 5 }, baseVersion: 3, rev: 0 },
    ]);
    expect(box.entries(B)).toEqual([]);
  });

  it('refuses a change with no account, so a guest never fills it', async () => {
    const box = open();
    await expect(box.add(null, up('expenses', 'e1', {}))).rejects.toThrow();
    await expect(box.add('', up('expenses', 'e1', {}))).rejects.toThrow();
    expect(box.entries()).toEqual([]);
  });

  it('merges later changes to one record into the first, keeping its base version and place in line', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { id: 'e1', amount: 5 }, 3));
    await box.add(A, up('invoices', 'i1', { id: 'i1' }, 1));
    await box.add(A, up('expenses', 'e1', { id: 'e1', amount: 9 }, 4));
    const [first, second] = box.entries(A);
    expect(first).toMatchObject({ collection: 'expenses', recordId: 'e1', data: { amount: 9 }, baseVersion: 3, rev: 1 });
    expect(second).toMatchObject({ collection: 'invoices', recordId: 'i1' });
    expect(box.entries(A)).toHaveLength(2);
  });

  it('never merges one account\'s change into another\'s', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { amount: 5 }));
    await box.add(B, up('expenses', 'e1', { amount: 7 }));
    expect(box.entries(A)).toMatchObject([{ data: { amount: 5 }, rev: 0 }]);
    expect(box.entries(B)).toMatchObject([{ data: { amount: 7 }, rev: 0 }]);
  });

  it('turns a waiting save into a delete when the record is deleted', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { amount: 5 }, 3));
    await box.add(A, del('expenses', 'e1', 3));
    expect(box.entries(A)).toMatchObject([{ op: 'delete', data: undefined, baseVersion: 3, rev: 1 }]);
  });

  it('drops a new record deleted before it was ever sent: nothing to send', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { amount: 5 }, null));
    await box.add(A, del('expenses', 'e1', null));
    expect(box.entries(A)).toEqual([]);
  });

  it('keeps that delete while the new record is on its way, since it may land', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { amount: 5 }, null));
    const [entry] = box.entries(A);
    const done = box.sending(entry);
    await box.add(A, del('expenses', 'e1', null));
    done();
    expect(box.entries(A)).toMatchObject([{ op: 'delete', rev: 1 }]);
  });

  it('merges two changes made at once, in the order they came', async () => {
    const box = open();
    await Promise.all([
      box.add(A, up('expenses', 'e1', { amount: 1 })),
      box.add(A, up('expenses', 'e1', { amount: 2 })),
    ]);
    expect(box.entries(A)).toMatchObject([{ data: { amount: 2 }, rev: 1 }]);
  });

  it('lets a sent change leave, and keeps one changed meanwhile on top of the new version', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { amount: 5 }, 3));
    await box.add(A, up('expenses', 'e2', { amount: 6 }, 2));
    const [e1, e2] = box.entries(A);
    expect(await box.sent(e1, 4)).toEqual({ left: true });
    await box.add(A, up('expenses', 'e2', { amount: 7 }, 2));
    expect(await box.sent(e2, 3)).toEqual({ left: false });
    expect(box.entries(A)).toMatchObject([{ recordId: 'e2', data: { amount: 7 }, baseVersion: 3 }]);
  });

  it('holds a clashed change until someone chooses, then keeps theirs over the server\'s version', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { amount: 5 }, 3));
    const [entry] = box.entries(A);
    await box.markClash(entry, { version: 6, data: { amount: 8 }, deleted: false });
    expect(box.entries(A)[0].clash).toEqual({ server: { version: 6, data: { amount: 8 }, deleted: false } });
    await box.keepMine(box.entries(A)[0]);
    expect(box.entries(A)).toMatchObject([{ data: { amount: 5 }, baseVersion: 6, rev: 1 }]);
    expect(box.entries(A)[0].clash).toBeUndefined();
  });

  it('drops a clashed change when the saved one is kept', async () => {
    const box = open();
    await box.add(A, up('expenses', 'e1', { amount: 5 }, 3));
    await box.markClash(box.entries(A)[0], { version: 6, data: { amount: 8 }, deleted: false });
    await box.keepSaved(box.entries(A)[0]);
    expect(box.entries(A)).toEqual([]);
  });

  it('tells listeners when the line changes', async () => {
    const box = open();
    const listener = vi.fn();
    const stop = box.subscribe(listener);
    await box.add(A, up('expenses', 'e1', {}));
    expect(listener).toHaveBeenCalledTimes(1);
    stop();
    await box.add(A, up('expenses', 'e2', {}));
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('keeps waiting changes across a reload, in order', async () => {
    const factory = new IDBFactory();
    const first = createOutbox(idbStore('outbox', { factory }));
    await first.add(A, up('expenses', 'e1', { amount: 5 }));
    await first.add(B, up('invoices', 'i1', { id: 'i1' }));
    await first.add(A, up('expenses', 'e1', { amount: 6 }));

    const again = createOutbox(idbStore('outbox', { factory }));
    await again.ready;
    expect(again.entries().map((e) => [e.owner, e.recordId, e.rev])).toEqual([[A, 'e1', 1], [B, 'i1', 0]]);
    await again.add(A, up('expenses', 'e9', {}));
    expect(again.entries().at(-1).seq).toBeGreaterThan(again.entries()[1].seq);
  });

  it('works for this visit when the device keeps nothing, and says so', async () => {
    const box = createOutbox(Promise.reject(new Error('no IndexedDB')));
    await box.ready;
    expect(box.durable()).toBe(false);
    await box.add(A, up('expenses', 'e1', {}));
    expect(box.entries(A)).toHaveLength(1);
    const kept = open();
    await kept.ready;
    expect(kept.durable()).toBe(true);
  });

  it('fails the change, keeping nothing half-written, when the device refuses to save it', async () => {
    const store = memoryStore();
    store.put = async () => { throw new Error('quota'); };
    const box = open(store);
    await expect(box.add(A, up('expenses', 'e1', {}))).rejects.toThrow();
    expect(box.entries(A)).toEqual([]);
  });
});
