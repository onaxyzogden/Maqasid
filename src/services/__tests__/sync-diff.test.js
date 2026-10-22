import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { createSyncDiff } from '../sync-diff';
import { createOutbox } from '../outbox';
import { idbStore, memoryStore } from '../offline-store';
import { safeSet, safeRemove, onStoredChange } from '../storage';

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

function setup({ owner = A, stored = {}, versions = {}, openOutbox } = {}) {
  for (const [k, v] of Object.entries(stored)) safeSet(k, v);
  const outbox = createOutbox(Promise.resolve(memoryStore()));
  const opened = vi.fn(openOutbox ?? (() => outbox));
  let who = owner;
  const diff = createSyncDiff({
    owner: () => who,
    openOutbox: opened,
    read: (key) => {
      const text = localStorage.getItem(`bbiz_${key}`);
      return text === null ? undefined : text;
    },
    versionOf: (collection, recordId) => versions[`${collection}|${recordId}`] ?? null,
  });
  const stop = onStoredChange(diff.noteWrite);
  return { diff, outbox, opened, stop, signOut: () => { who = null; }, signIn: (id) => { who = id; } };
}

describe('record diff', () => {
  let stop;
  beforeEach(() => {
    globalThis.localStorage = fakeLocalStorage();
    globalThis.window = { dispatchEvent: () => true };
    vi.useFakeTimers();
  });
  afterEach(() => {
    stop?.();
    stop = undefined;
    vi.useRealTimers();
  });

  it('waits 500 ms, then sends only the record that changed', async () => {
    const s = setup({
      stored: { expenses: [{ id: 'e1', amount: 5 }, { id: 'e2', amount: 6 }] },
      versions: { 'expenses|e1': 3, 'expenses|e2': 4 },
    });
    stop = s.stop;
    s.diff.start(['expenses']);
    safeSet('expenses', [{ id: 'e1', amount: 5 }, { id: 'e2', amount: 9 }]);
    await vi.advanceTimersByTimeAsync(499);
    expect(s.outbox.entries(A)).toEqual([]);
    await vi.advanceTimersByTimeAsync(1);
    await s.diff.settled();
    expect(s.outbox.entries(A)).toMatchObject([
      { collection: 'expenses', recordId: 'e2', op: 'upsert', data: { id: 'e2', amount: 9 }, baseVersion: 4 },
    ]);
  });

  it('folds many quick writes to one key into one diff', async () => {
    const s = setup({ stored: { expenses: [] } });
    stop = s.stop;
    s.diff.start(['expenses']);
    safeSet('expenses', [{ id: 'e1', amount: 1 }]);
    safeSet('expenses', [{ id: 'e1', amount: 2 }]);
    safeSet('expenses', [{ id: 'e1', amount: 3 }]);
    await vi.advanceTimersByTimeAsync(500);
    await s.diff.settled();
    expect(s.outbox.entries(A)).toMatchObject([{ recordId: 'e1', data: { amount: 3 }, baseVersion: null, rev: 0 }]);
  });

  it('sends a delete for a record that is gone, with its base version', async () => {
    const s = setup({
      stored: { expenses: [{ id: 'e1' }, { id: 'e2' }] },
      versions: { 'expenses|e1': 2, 'expenses|e2': 7 },
    });
    stop = s.stop;
    s.diff.start(['expenses']);
    safeSet('expenses', [{ id: 'e1' }]);
    await vi.advanceTimersByTimeAsync(500);
    await s.diff.settled();
    expect(s.outbox.entries(A)).toMatchObject([{ recordId: 'e2', op: 'delete', baseVersion: 7 }]);
  });

  it('sends a value kept whole as one record, and a removed key as its delete', async () => {
    const s = setup({ stored: { attr_lang: 'en', thr_niyyah_date: '2026-10-21' }, versions: { 'thr_niyyah_date|_single': 2 } });
    stop = s.stop;
    s.diff.start(['attr_lang', 'thr_niyyah_date']);
    safeSet('attr_lang', 'ar');
    safeRemove('thr_niyyah_date');
    await vi.advanceTimersByTimeAsync(500);
    await s.diff.settled();
    expect(s.outbox.entries(A)).toMatchObject([
      { collection: 'attr_lang', recordId: '_single', op: 'upsert', data: 'ar' },
      { collection: 'thr_niyyah_date', recordId: '_single', op: 'delete', baseVersion: 2 },
    ]);
  });

  it('sends nothing when a write leaves every record as it was', async () => {
    const s = setup({ stored: { expenses: [{ id: 'e1', amount: 5 }] } });
    stop = s.stop;
    s.diff.start(['expenses']);
    safeSet('expenses', [{ id: 'e1', amount: 5 }]);
    await vi.advanceTimersByTimeAsync(500);
    await s.diff.settled();
    expect(s.outbox.entries(A)).toEqual([]);
  });

  it('leaves device-only and unclassified keys alone', async () => {
    const s = setup();
    stop = s.stop;
    s.diff.start([]);
    safeSet('theme', 'dark');
    safeSet('inv_counter', 12);
    safeSet('something_new', [1]);
    await vi.advanceTimersByTimeAsync(500);
    await s.diff.settled();
    expect(s.outbox.entries()).toEqual([]);
    expect(s.opened).not.toHaveBeenCalled();
  });

  it('keeps a change for the account it was made under, even if the person signs out before it is diffed', async () => {
    const s = setup({ stored: { expenses: [] } });
    stop = s.stop;
    s.diff.start(['expenses']);
    safeSet('expenses', [{ id: 'e1' }]);
    s.signOut();
    await vi.advanceTimersByTimeAsync(500);
    await s.diff.settled();
    expect(s.outbox.entries()).toMatchObject([{ owner: A, recordId: 'e1' }]);
  });

  it('never touches IndexedDB or the outbox for a guest', async () => {
    const factory = new IDBFactory();
    const open = vi.spyOn(factory, 'open');
    const s = setup({
      owner: null,
      stored: { expenses: [] },
      openOutbox: () => createOutbox(idbStore('outbox', { factory })),
    });
    stop = s.stop;
    s.diff.start(['expenses']);
    safeSet('expenses', [{ id: 'e1' }]);
    safeRemove('expenses');
    await vi.advanceTimersByTimeAsync(1000);
    await s.diff.settled();
    expect(s.opened).not.toHaveBeenCalled();
    expect(open).not.toHaveBeenCalled();
  });

  it('keeps the stored bytes exactly as before, listener or not', () => {
    stop = onStoredChange(() => { throw new Error('a broken listener'); });
    expect(safeSet('expenses', [{ id: 'e1', note: 'x' }])).toBe(true);
    expect(localStorage.getItem('bbiz_expenses')).toBe('[{"id":"e1","note":"x"}]');
    expect(safeSet('attr_lang', 'en')).toBe(true);
    expect(localStorage.getItem('bbiz_attr_lang')).toBe('en');
  });

  it('diffs one change on the largest key quickly', async () => {
    const big = Array.from({ length: 5000 }, (_, i) => ({
      id: `t${i}`, title: `Task ${i}`, notes: 'x'.repeat(200), done: false, tags: ['a', 'b'],
    }));
    const s = setup({ stored: { tasks_big: big } });
    stop = s.stop;
    s.diff.start(['tasks_big']);
    const next = big.slice();
    next[2500] = { ...next[2500], done: true };
    const writeStart = performance.now();
    safeSet('tasks_big', next);
    const writeMs = performance.now() - writeStart;
    const diffStart = performance.now();
    s.diff.flushNow();
    const diffMs = performance.now() - diffStart;
    await s.diff.settled();
    expect(s.outbox.entries(A)).toMatchObject([{ recordId: 't2500', data: { done: true } }]);
    // The write itself only notes the key; the diff of ~1.3 MB stays well under a frame budget on CI.
    expect(diffMs).toBeLessThan(250);
    expect(writeMs).toBeLessThan(100);
  });
});
