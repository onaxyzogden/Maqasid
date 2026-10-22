import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { createOutbox } from '../outbox';
import { memoryStore } from '../offline-store';
import { createVersionBook } from '../sync-versions';
import { pullBeforeStart } from '../sync-pull';
import { prepareSync } from '../sync-boot';
import { fakeSyncServer } from './fake-sync-server';

const A = 'user-a';

function fakeLocalStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => void map.set(k, String(v)),
    removeItem: (k) => void map.delete(k),
    key: (i) => [...map.keys()][i] ?? null,
    get length() { return map.size; },
  };
}

const stored = (key) => {
  const text = localStorage.getItem(`bbiz_${key}`);
  return text === null ? null : JSON.parse(text);
};

async function setup() {
  const meta = memoryStore();
  const book = createVersionBook(Promise.resolve(meta));
  await book.load(A);
  const outbox = createOutbox(Promise.resolve(memoryStore()));
  const server = fakeSyncServer();
  const onLate = vi.fn();
  const pull = (ms = 4000) => pullBeforeStart({ owner: A, server, meta, book, outbox, storage: localStorage, ms, onLate });
  return { meta, book, outbox, server, onLate, pull };
}

describe('pull before the stores load', () => {
  beforeEach(() => {
    globalThis.localStorage = fakeLocalStorage();
  });
  afterEach(() => vi.useRealTimers());

  it('brings in records changed on another device, by id, leaving the rest alone', async () => {
    const s = await setup();
    localStorage.setItem('bbiz_expenses', JSON.stringify([{ id: 'e1', amount: 1 }, { id: 'e2', amount: 2 }]));
    s.server.put(A, { collection: 'expenses', recordId: 'e2', data: { id: 'e2', amount: 20 } });
    s.server.put(A, { collection: 'expenses', recordId: 'e3', data: { id: 'e3', amount: 3 } });
    expect(await s.pull()).toBe(true);
    expect(stored('expenses')).toEqual([{ id: 'e1', amount: 1 }, { id: 'e2', amount: 20 }, { id: 'e3', amount: 3 }]);
    expect(s.book.of(A, 'expenses', 'e3')).toBe(1);
  });

  it('removes a record deleted on another device', async () => {
    const s = await setup();
    localStorage.setItem('bbiz_expenses', JSON.stringify([{ id: 'e1' }, { id: 'e2' }]));
    s.server.put(A, { collection: 'expenses', recordId: 'e2', data: null, deleted: true });
    await s.pull();
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
  });

  it('sets and removes a value kept whole, storing text as text', async () => {
    const s = await setup();
    localStorage.setItem('bbiz_thr_niyyah_date', '2026-10-01');
    s.server.put(A, { collection: 'attr_lang', recordId: '_single', data: 'ar' });
    s.server.put(A, { collection: 'goals', recordId: '_single', data: { north: 'x' } });
    s.server.put(A, { collection: 'thr_niyyah_date', recordId: '_single', data: null, deleted: true });
    await s.pull();
    expect(localStorage.getItem('bbiz_attr_lang')).toBe('ar');
    expect(stored('goals')).toEqual({ north: 'x' });
    expect(localStorage.getItem('bbiz_thr_niyyah_date')).toBeNull();
  });

  it('only asks for what changed since the last pull', async () => {
    const s = await setup();
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1' } });
    await s.pull();
    const first = s.server.calls.at(-1);
    expect(first).toEqual(['since', A, null]);
    await s.pull();
    const [, , iso] = s.server.calls.at(-1);
    expect(typeof iso).toBe('string');
    // A few seconds of overlap, so a change committed while the last pull ran is not missed.
    expect(Date.parse(iso)).toBeLessThan(Date.parse(s.server.peek(A, 'expenses', 'e1').updated_at));
  });

  it('does not bring in a record this device has a change waiting for, so the send clashes instead of losing either', async () => {
    const s = await setup();
    localStorage.setItem('bbiz_expenses', JSON.stringify([{ id: 'e1', amount: 9 }]));
    await s.book.set(A, 'expenses', 'e1', 1);
    await s.outbox.add(A, { collection: 'expenses', recordId: 'e1', op: 'upsert', data: { id: 'e1', amount: 9 }, baseVersion: 1 });
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 5 } });
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 7 } });
    await s.pull();
    expect(stored('expenses')).toEqual([{ id: 'e1', amount: 9 }]);
    expect(s.book.of(A, 'expenses', 'e1')).toBe(1);
  });

  it('skips a record already held at that version', async () => {
    const s = await setup();
    localStorage.setItem('bbiz_expenses', JSON.stringify([{ id: 'e1', amount: 1, local: true }]));
    await s.book.set(A, 'expenses', 'e1', 1);
    s.server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 1 } });
    await s.pull();
    expect(stored('expenses')).toEqual([{ id: 'e1', amount: 1, local: true }]);
  });

  it('opens with what the device holds when the pull is slow, and offers a reload instead of applying it late', async () => {
    vi.useFakeTimers();
    const s = await setup();
    localStorage.setItem('bbiz_expenses', JSON.stringify([{ id: 'e1' }]));
    s.server.put(A, { collection: 'expenses', recordId: 'e2', data: { id: 'e2' } });
    const since = s.server.since;
    let release;
    s.server.since = (...args) => new Promise((r) => { release = () => r(since(...args)); });
    const result = s.pull(4000);
    await vi.advanceTimersByTimeAsync(4000);
    expect(await result).toBe(false);
    release();
    await vi.advanceTimersByTimeAsync(0);
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
    expect(s.onLate).toHaveBeenCalledTimes(1);
  });

  it('opens with what the device holds when there is no signal', async () => {
    const s = await setup();
    localStorage.setItem('bbiz_expenses', JSON.stringify([{ id: 'e1' }]));
    s.server.setOffline(true);
    expect(await s.pull()).toBe(false);
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
    expect(s.onLate).not.toHaveBeenCalled();
  });
});

describe('prepareSync', () => {
  it('opens nothing on the device and reaches no server for a guest', async () => {
    const factory = new IDBFactory();
    const open = vi.spyOn(factory, 'open');
    const server = fakeSyncServer();
    expect(await prepareSync({ owner: null, server, factory })).toBeNull();
    expect(open).not.toHaveBeenCalled();
    expect(server.calls).toEqual([]);
  });

  it('loads the account\'s versions and pulls for a signed-in person', async () => {
    globalThis.localStorage = fakeLocalStorage();
    const server = fakeSyncServer();
    server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1' } });
    const ready = await prepareSync({ owner: A, server, factory: new IDBFactory(), storage: localStorage });
    expect(ready.pulled).toBe(true);
    expect(ready.book.of(A, 'expenses', 'e1')).toBe(1);
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
  });
});
