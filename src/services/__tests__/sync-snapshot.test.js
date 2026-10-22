import { describe, it, expect, beforeEach } from 'vitest';
import { createOutbox } from '../outbox';
import { memoryStore } from '../offline-store';
import { createVersionBook } from '../sync-versions';
import { importSnapshot, snapshotState, leaveSnapshot, readSnapshot } from '../sync-snapshot';
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
  if (text === null) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

async function setup() {
  const meta = memoryStore();
  const book = createVersionBook(Promise.resolve(meta));
  await book.load(A);
  const outbox = createOutbox(Promise.resolve(memoryStore()));
  const server = fakeSyncServer();
  const run = (snapshot) => importSnapshot({ owner: A, server, meta, book, outbox, snapshot, storage: localStorage });
  return { meta, book, outbox, server, run };
}

const snap = (data) => ({ _sync_meta: { schema_version: '5.0', exported_at: 't', device_id: 'd' }, ...data });

describe('bringing in the old account copy', () => {
  beforeEach(() => { globalThis.localStorage = fakeLocalStorage(); });

  it('puts records the account lacks on the device and queues them to send', async () => {
    const { outbox, run } = await setup();
    const result = await run(snap({ expenses: [{ id: 'e1', description: 'Rent' }], global_journal_reflection: 'a note' }));
    expect(stored('expenses')).toEqual([{ id: 'e1', description: 'Rent' }]);
    expect(stored('global_journal_reflection')).toBe('a note');
    const sent = outbox.entries(A).map((e) => [e.collection, e.recordId, e.baseVersion]);
    expect(sent).toEqual(expect.arrayContaining([['expenses', 'e1', null], ['global_journal_reflection', '_single', null]]));
    expect(result.added).toBe(2);
  });

  it('keeps the device copy of a record the device already holds', async () => {
    const { outbox, run } = await setup();
    put('expenses', [{ id: 'e1', description: 'Mine' }]);
    put('global_journal_reflection', 'today');
    const result = await run(snap({ expenses: [{ id: 'e1', description: 'Old' }, { id: 'e2' }], global_journal_reflection: 'old note' }));
    expect(stored('expenses')).toEqual([{ id: 'e1', description: 'Mine' }, { id: 'e2' }]);
    expect(stored('global_journal_reflection')).toBe('today');
    expect(outbox.entries(A).map((e) => e.recordId)).toEqual(['e2']);
    expect(result).toMatchObject({ added: 1, kept: 2 });
  });

  it('notes a record the account already holds the same, sending nothing', async () => {
    const { outbox, book, server, run } = await setup();
    const row = server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 5 } });
    const result = await run(snap({ expenses: [{ id: 'e1', amount: 5 }] }));
    expect(outbox.entries(A)).toEqual([]);
    expect(book.of(A, 'expenses', 'e1')).toBe(row.version);
    expect(stored('expenses')).toEqual([{ id: 'e1', amount: 5 }]);
    expect(result.same).toBe(1);
  });

  it('keeps both copies of a record the account holds differently, as a clash', async () => {
    const { outbox, server, run } = await setup();
    server.put(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 9 } });
    const result = await run(snap({ expenses: [{ id: 'e1', amount: 5 }] }));
    const [entry] = outbox.entries(A);
    expect(entry).toMatchObject({ collection: 'expenses', recordId: 'e1', data: { id: 'e1', amount: 5 } });
    expect(entry.clash.server).toMatchObject({ data: { id: 'e1', amount: 9 } });
    expect(result.clashed).toBe(1);
  });

  it('gives an old invoice a new number when the account or device already uses it', async () => {
    const { server, outbox, run } = await setup();
    server.put(A, { collection: 'invoices', recordId: 'i9', data: { id: 'i9', number: 'INV-001' } });
    put('invoices', [{ id: 'i8', number: 'INV-002' }]);
    const result = await run(snap({ invoices: [{ id: 'i1', number: 'INV-001' }, { id: 'i2', number: 'INV-002' }, { id: 'i3', number: 'INV-003' }] }));
    expect(result.renumbered).toEqual([{ id: 'i1', was: 'INV-001' }, { id: 'i2', was: 'INV-002' }]);
    const byId = Object.fromEntries(stored('invoices').map((i) => [i.id, i]));
    expect(byId.i1).toMatchObject({ number: '', numberPending: true, formerNumber: 'INV-001' });
    expect(byId.i3.number).toBe('INV-003');
    const queued = outbox.entries(A).find((e) => e.recordId === 'i1');
    expect(queued.data.numberPending).toBe(true);
  });

  it('leaves out device-only keys, the invoice counter and the snapshot bookkeeping', async () => {
    const { outbox, run } = await setup();
    await run(snap({ theme: 'dark', inv_counter: 7, user: { name: 'Y' } }));
    expect(stored('theme')).toBeNull();
    expect(stored('inv_counter')).toBeNull();
    expect(stored('_sync_meta')).toBeNull();
    expect(outbox.entries(A)).toEqual([]);
  });

  it('changes nothing when the account cannot be reached', async () => {
    const { server, meta, outbox, run } = await setup();
    server.setOffline(true);
    await expect(run(snap({ expenses: [{ id: 'e1' }] }))).rejects.toThrow();
    expect(stored('expenses')).toBeNull();
    expect(outbox.entries(A)).toEqual([]);
    expect(await snapshotState(meta, A)).toBeNull();
  });

  it('records the choice so it is asked once', async () => {
    const { meta, run } = await setup();
    expect(await snapshotState(meta, A)).toBeNull();
    await run(snap({}));
    expect(await snapshotState(meta, A)).toBe('imported');
    const other = memoryStore();
    await leaveSnapshot(other, A);
    expect(await snapshotState(other, A)).toBe('left');
  });
});

describe('reading the old account copy', () => {
  const client = (row, blob) => ({
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: row, error: null }) }) }) }),
    storage: { from: () => ({ download: async () => ({ data: { text: async () => JSON.stringify(blob) }, error: null }) }) },
  });

  it('is null when the account never had one', async () => {
    expect(await readSnapshot(client(null), A)).toBeNull();
  });

  it('reads the copy the row points to', async () => {
    const got = await readSnapshot(client({ storage_path: 'a/s.json', updated_at: '2026-07-01' }, { expenses: [] }), A);
    expect(got).toEqual({ updatedAt: '2026-07-01', data: { expenses: [] } });
  });

  it('throws when the row cannot be read', async () => {
    const bad = { from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: { message: 'no' } }) }) }) }) };
    await expect(readSnapshot(bad, A)).rejects.toThrow();
  });
});
