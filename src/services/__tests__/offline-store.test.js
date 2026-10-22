import { describe, it, expect } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { StoreUnavailableError, idbStore, memoryStore, within } from '../offline-store';

const kinds = [
  ['memory', async () => memoryStore()],
  ['IndexedDB', () => idbStore('outbox', { factory: new IDBFactory() })],
];

describe.each(kinds)('%s store', (_name, open) => {
  it('gives back what was put, and nothing for a key never put', async () => {
    const store = await open();
    await store.put('a', { n: 1 });
    expect(await store.get('a')).toEqual({ n: 1 });
    expect(await store.get('b')).toBeUndefined();
  });

  it('replaces a value put twice under one key', async () => {
    const store = await open();
    await store.put('a', { n: 1 });
    await store.put('a', { n: 2 });
    expect(await store.all()).toEqual([['a', { n: 2 }]]);
  });

  it('lists every entry in key order, and deletes one', async () => {
    const store = await open();
    await store.put('b', { n: 2 });
    await store.put('a', { n: 1 });
    await store.delete('b');
    expect(await store.all()).toEqual([['a', { n: 1 }]]);
  });

  it('clears everything', async () => {
    const store = await open();
    await store.put('a', { n: 1 });
    await store.clear();
    expect(await store.all()).toEqual([]);
  });
});

describe('idbStore', () => {
  it('keeps what was put across a reload', async () => {
    const factory = new IDBFactory();
    await (await idbStore('outbox', { factory })).put('k', { n: 7 });
    const again = await idbStore('outbox', { factory });
    expect(await again.get('k')).toEqual({ n: 7 });
  });

  it('keeps its stores apart', async () => {
    const factory = new IDBFactory();
    await (await idbStore('meta', { factory })).put('k', { n: 1 });
    expect(await (await idbStore('outbox', { factory })).get('k')).toBeUndefined();
  });

  it("says so when IndexedDB won't open", async () => {
    const refusing = { open: () => { throw new Error('denied'); } };
    await expect(idbStore('outbox', { factory: refusing })).rejects.toBeInstanceOf(StoreUnavailableError);
  });

  it('says so when there is no IndexedDB at all', async () => {
    await expect(idbStore('outbox', { factory: null })).rejects.toBeInstanceOf(StoreUnavailableError);
  });
});

describe('within', () => {
  it('gives the value when it settles in time, and null when it does not', async () => {
    expect(await within(Promise.resolve(3), 50)).toBe(3);
    expect(await within(new Promise(() => {}), 10)).toBeNull();
  });
});
