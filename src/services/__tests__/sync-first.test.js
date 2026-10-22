import { describe, it, expect, beforeEach } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { createOutbox } from '../outbox';
import { memoryStore } from '../offline-store';
import { createVersionBook } from '../sync-versions';
import { prepareSync } from '../sync-boot';
import { deviceCounts, joinState, addThisDevice, shelveThisDevice, latestShelf, putShelfBack, chooseFirst } from '../sync-first';
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

const put = (key, value) => localStorage.setItem(`bbiz_${key}`, typeof value === 'string' ? value : JSON.stringify(value));
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
  const add = () => addThisDevice({ owner: A, server, meta, book, outbox, storage: localStorage });
  return { meta, book, outbox, server, add };
}

const seedTask = (id) => ({ id, title: `Seed ${id}`, seedOrder: 0, createdAt: 't0', updatedAt: 't0', completedAt: null });

describe('what this device holds', () => {
  beforeEach(() => { globalThis.localStorage = fakeLocalStorage(); });

  it('counts records per area, leaving out device-only keys, the invoice counter and untouched seed tasks', () => {
    put('expenses', [{ id: 'e1', description: 'Rent' }, { id: 'e2' }]);
    put('global_journal_reflection', 'a note');
    put('tasks_faith_core', [seedTask('s1'), { ...seedTask('s2'), updatedAt: 't1' }, { id: 'u1', title: 'Mine' }]);
    put('theme', 'dark');
    put('inv_counter', '7');
    put('user', { name: 'Y' });
    const counts = deviceCounts(localStorage);
    expect(counts.total).toBe(5);
    const byArea = Object.fromEntries(counts.areas.map((a) => [a.collection, a]));
    expect(byArea.expenses.count).toBe(2);
    expect(byArea.expenses.items).toEqual(['Rent', 'e2']);
    expect(byArea.global_journal_reflection.count).toBe(1);
    expect(byArea.tasks_faith_core.items).toEqual(['Seed s2', 'Mine']);
    expect(byArea.theme).toBeUndefined();
    expect(byArea.inv_counter).toBeUndefined();
  });

  it('finds nothing on a device that holds only seeds and device settings', () => {
    put('tasks_faith_core', [seedTask('s1')]);
    put('expenses', []);
    put('theme', 'dark');
    expect(deviceCounts(localStorage).total).toBe(0);
  });
});

describe('the first sign-in on this device', () => {
  beforeEach(() => { globalThis.localStorage = fakeLocalStorage(); });

  it('has no choice recorded at first, and counts a device that already pulled as joined', async () => {
    const meta = memoryStore();
    expect(await joinState(meta, A)).toBeNull();
    await meta.put(`cursor:${A}`, '2026-10-22T10:00:00Z');
    expect(await joinState(meta, A)).toBe('pulled');
  });

  it('pulls straight away on a device with nothing of its own', async () => {
    const server = fakeSyncServer();
    server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1' } });
    const ready = await prepareSync({ owner: A, server, factory: new IDBFactory(), storage: localStorage });
    expect(ready.undecided).toBeFalsy();
    expect(ready.pulled).toBe(true);
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
    expect(await joinState(ready.meta, A)).toBe('pulled');
  });

  it('asks first, without pulling, when the device holds records of its own', async () => {
    put('expenses', [{ id: 'mine' }]);
    const server = fakeSyncServer();
    server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1' } });
    const ready = await prepareSync({ owner: A, server, factory: new IDBFactory(), storage: localStorage });
    expect(ready.undecided).toBe(true);
    expect(ready.pulled).toBe(false);
    expect(ready.counts.total).toBe(1);
    expect(server.calls.some(([name]) => name === 'since')).toBe(false);
    expect(stored('expenses')).toEqual([{ id: 'mine' }]);
  });

  it('does not ask again once a choice was made', async () => {
    put('expenses', [{ id: 'mine' }]);
    const factory = new IDBFactory();
    const first = await prepareSync({ owner: A, server: fakeSyncServer(), factory, storage: localStorage });
    await first.meta.put(`joined:${A}`, 'added');
    const again = await prepareSync({ owner: A, server: fakeSyncServer(), factory, storage: localStorage });
    expect(again.undecided).toBeFalsy();
  });
});

describe('Add this device\'s records', () => {
  beforeEach(() => { globalThis.localStorage = fakeLocalStorage(); });

  it('queues every record for an empty account, leaving untouched seeds on the device', async () => {
    const s = await setup();
    put('expenses', [{ id: 'e1' }, { id: 'e2' }]);
    put('global_journal_reflection', 'a note');
    put('tasks_faith_core', [seedTask('s1'), { id: 'u1' }]);
    const result = await s.add();
    expect(result.queued).toBe(4);
    const keys = s.outbox.entries(A).map((e) => `${e.collection}|${e.recordId}|${e.baseVersion}`);
    expect(keys.sort()).toEqual([
      'expenses|e1|null', 'expenses|e2|null', 'global_journal_reflection|_single|null', 'tasks_faith_core|u1|null',
    ]);
    expect(await joinState(s.meta, A)).toBe('added');
  });

  it('when both hold records: the same record is only noted, a different one clashes, and neither side is overwritten', async () => {
    const s = await setup();
    put('expenses', [{ id: 'same', n: 1 }, { id: 'differs', n: 'device' }, { id: 'gone', n: 1 }, { id: 'new' }]);
    s.server.put(A, { collection: 'expenses', recordId: 'same', data: { n: 1, id: 'same' } });
    s.server.put(A, { collection: 'expenses', recordId: 'differs', data: { id: 'differs', n: 'cloud' } });
    s.server.put(A, { collection: 'expenses', recordId: 'gone', data: { id: 'gone', n: 1 } });
    s.server.put(A, { collection: 'expenses', recordId: 'gone', data: null, deleted: true });
    s.server.put(A, { collection: 'expenses', recordId: 'cloud-only', data: { id: 'cloud-only' } });

    const result = await s.add();

    expect(result).toMatchObject({ queued: 1, same: 1, clashed: 2, received: 1 });
    const entries = Object.fromEntries(s.outbox.entries(A).map((e) => [e.recordId, e]));
    expect(entries.new.clash).toBeUndefined();
    expect(entries.differs.clash.server.data).toEqual({ id: 'differs', n: 'cloud' });
    expect(entries.gone.clash.server.deleted).toBe(true);
    expect(entries.same).toBeUndefined();
    expect(s.book.of(A, 'expenses', 'same')).toBe(1);
    // The device keeps its own, and gains what only the account held.
    expect(stored('expenses')).toEqual([
      { id: 'same', n: 1 }, { id: 'differs', n: 'device' }, { id: 'gone', n: 1 }, { id: 'new' }, { id: 'cloud-only' },
    ]);
    expect(s.server.peek(A, 'expenses', 'differs').data).toEqual({ id: 'differs', n: 'cloud' });
  });

  it('gives a device invoice whose number the account already uses a new number when it is sent', async () => {
    const s = await setup();
    put('invoices', [{ id: 'i-dev', number: 'INV-001' }, { id: 'i-ok', number: 'INV-009' }]);
    s.server.put(A, { collection: 'invoices', recordId: 'i-cloud', data: { id: 'i-cloud', number: 'INV-001' } });
    const result = await s.add();
    expect(result.renumbered).toEqual([{ id: 'i-dev', was: 'INV-001' }]);
    const dev = stored('invoices').find((i) => i.id === 'i-dev');
    expect(dev).toMatchObject({ numberPending: true, number: '', formerNumber: 'INV-001' });
    expect(s.outbox.entries(A).find((e) => e.recordId === 'i-dev').data.numberPending).toBe(true);
    expect(stored('invoices').find((i) => i.id === 'i-ok').number).toBe('INV-009');
  });

  it('with no signal, sends nothing, changes nothing and records no choice', async () => {
    const s = await setup();
    put('expenses', [{ id: 'e1' }]);
    s.server.setOffline(true);
    await expect(s.add()).rejects.toThrow();
    expect(s.outbox.entries(A)).toEqual([]);
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
    expect(await joinState(s.meta, A)).toBeNull();
  });
});

describe('Start this account empty', () => {
  beforeEach(() => { globalThis.localStorage = fakeLocalStorage(); });

  it('shelves the records, checks the copy, and only then takes them off the screen', async () => {
    const meta = memoryStore();
    const shelf = memoryStore();
    put('expenses', [{ id: 'e1' }]);
    put('global_journal_reflection', 'a note');
    put('theme', 'dark');
    const result = await shelveThisDevice({ owner: A, shelf, meta, storage: localStorage, now: () => '2026-10-22T12:00:00Z' });
    expect(result.kept).toBe(2);
    expect(stored('expenses')).toBeNull();
    expect(localStorage.getItem('bbiz_global_journal_reflection')).toBeNull();
    expect(localStorage.getItem('bbiz_theme')).toBe('dark');
    expect(await joinState(meta, A)).toBe('empty');
    expect(await latestShelf(shelf)).toMatchObject({ at: '2026-10-22T12:00:00Z', keys: 2 });
  });

  it('removes nothing when the copy does not read back the same', async () => {
    const meta = memoryStore();
    const real = memoryStore();
    const shelf = { ...real, get: async (k) => ({ ...(await real.get(k)), keys: { expenses: '[]' } }) };
    put('expenses', [{ id: 'e1' }]);
    await expect(shelveThisDevice({ owner: A, shelf, meta, storage: localStorage })).rejects.toThrow(/copy/i);
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
    expect(await joinState(meta, A)).toBeNull();
  });

  it('removes nothing when there is no shelf to keep them on', async () => {
    const meta = memoryStore();
    put('expenses', [{ id: 'e1' }]);
    await expect(shelveThisDevice({ owner: A, shelf: null, meta, storage: localStorage })).rejects.toThrow();
    expect(stored('expenses')).toEqual([{ id: 'e1' }]);
  });
});

describe('the choice the sheet makes', () => {
  beforeEach(() => { globalThis.localStorage = fakeLocalStorage(); });

  async function undecided() {
    put('expenses', [{ id: 'mine' }]);
    const server = fakeSyncServer();
    const ready = await prepareSync({ owner: A, server, factory: new IDBFactory(), storage: localStorage });
    return { server, ready };
  }

  it('Add joins the records to the account', async () => {
    const { server, ready } = await undecided();
    const result = await chooseFirst({ choice: 'add', ready, server, storage: localStorage });
    expect(result.queued).toBe(1);
    expect(await joinState(ready.meta, A)).toBe('added');
  });

  it('Start empty shelves the records on the shelf it is given', async () => {
    const { server, ready } = await undecided();
    const shelf = memoryStore();
    const result = await chooseFirst({ choice: 'empty', ready, server, storage: localStorage, openShelf: async () => shelf });
    expect(result.kept).toBe(1);
    expect(stored('expenses')).toBeNull();
    expect(await latestShelf(shelf)).not.toBeNull();
  });

  it('Start empty removes nothing when the shelf will not open', async () => {
    const { server, ready } = await undecided();
    const openShelf = async () => { throw new Error('blocked'); };
    await expect(chooseFirst({ choice: 'empty', ready, server, storage: localStorage, openShelf })).rejects.toThrow(/nothing was removed/);
    expect(stored('expenses')).toEqual([{ id: 'mine' }]);
  });

  it('refuses a choice it does not know', async () => {
    const { server, ready } = await undecided();
    await expect(chooseFirst({ choice: 'other', ready, server, storage: localStorage })).rejects.toThrow();
  });
});

describe('Put this device\'s earlier records back', () => {
  beforeEach(() => { globalThis.localStorage = fakeLocalStorage(); });

  it('replaces the account\'s records with the latest shelf, then lets the shelf go', async () => {
    const meta = memoryStore();
    const shelf = memoryStore();
    put('expenses', [{ id: 'mine' }]);
    await shelveThisDevice({ owner: A, shelf, meta, storage: localStorage, now: () => '2026-10-22T12:00:00Z' });
    put('expenses', [{ id: 'account' }]);
    put('crm_deals', [{ id: 'd1' }]);
    put('theme', 'dark');
    const result = await putShelfBack({ shelf, storage: localStorage });
    expect(result.restored).toBe(1);
    expect(stored('expenses')).toEqual([{ id: 'mine' }]);
    expect(stored('crm_deals')).toBeNull();
    expect(localStorage.getItem('bbiz_theme')).toBe('dark');
    expect(await latestShelf(shelf)).toBeNull();
  });

  it('says so when there is nothing to put back', async () => {
    await expect(putShelfBack({ shelf: memoryStore(), storage: localStorage })).rejects.toThrow(/nothing/i);
  });
});
