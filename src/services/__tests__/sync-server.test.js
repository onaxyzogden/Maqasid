import { describe, it, expect } from 'vitest';
import { createServer, SyncError } from '../sync-server';

const A = 'user-a';

/** A supabase client whose every query answers `reply` (or the next of `replies`), recording the chain. */
function fakeClient(...replies) {
  const chains = [];
  const next = () => (replies.length > 1 ? replies.shift() : replies[0]);
  const builder = (chain) => new Proxy({}, {
    get(_, prop) {
      if (prop === 'then') {
        const reply = next();
        return (ok, bad) => Promise.resolve(reply).then(ok, bad);
      }
      return (...args) => { chain.push([prop, ...args]); return builder(chain); };
    },
  });
  return {
    chains,
    from(table) { const chain = [['from', table]]; chains.push(chain); return builder(chain); },
    rpc(name, args) { const chain = [['rpc', name, args]]; chains.push(chain); return builder(chain); },
  };
}

const kindOf = async (p) => {
  try { await p; } catch (e) { return e instanceof SyncError ? e.kind : `not a SyncError: ${e}`; }
  return 'no error';
};

describe('sync server adapter', () => {
  it('inserts a record for the account and returns its version', async () => {
    const client = fakeClient({ data: { version: 1 }, error: null });
    const server = createServer(client);
    expect(await server.insert(A, { collection: 'expenses', recordId: 'e1', data: { id: 'e1' }, deleted: false })).toEqual({ version: 1 });
    expect(client.chains[0]).toContainEqual(['insert', { user_id: A, collection: 'expenses', record_id: 'e1', data: { id: 'e1' }, deleted: false }]);
  });

  it('updates only the account\'s record and names the version it was based on', async () => {
    const client = fakeClient({ data: { version: 4 }, error: null });
    await createServer(client).update(A, { collection: 'expenses', recordId: 'e1', data: null, deleted: true, version: 3 });
    const chain = client.chains[0];
    expect(chain).toContainEqual(['update', { data: null, deleted: true, version: 3 }]);
    expect(chain).toContainEqual(['eq', 'user_id', A]);
    expect(chain).toContainEqual(['eq', 'collection', 'expenses']);
    expect(chain).toContainEqual(['eq', 'record_id', 'e1']);
  });

  it('names each kind of failure', async () => {
    const send = (error) => createServer(fakeClient({ data: null, error })).insert(A, { collection: 'c', recordId: 'r', data: 1, deleted: false });
    expect(await kindOf(send({ code: '23505', message: 'duplicate key' }))).toBe('exists');
    expect(await kindOf(send({ code: 'P0001', message: 'stale_version' }))).toBe('stale');
    expect(await kindOf(send({ code: 'PGRST301', message: 'JWT expired' }))).toBe('auth');
    expect(await kindOf(send({ code: '', message: 'invalid JWT', status: 401 }))).toBe('auth');
    expect(await kindOf(send({ code: '22P02', message: 'invalid input' }))).toBe('refused');
    expect(await kindOf(send({ code: '42501', message: 'row-level security' }))).toBe('refused');
    expect(await kindOf(send({ code: '', message: 'TypeError: Failed to fetch' }))).toBe('offline');
  });

  it('calls an update that matched no row missing', async () => {
    const server = createServer(fakeClient({ data: null, error: null }));
    expect(await kindOf(server.update(A, { collection: 'c', recordId: 'r', data: 1, deleted: false, version: 1 }))).toBe('missing');
  });

  it('counts a thrown fetch as no signal', async () => {
    const client = { from: () => { throw new TypeError('Failed to fetch'); } };
    expect(await kindOf(createServer(client).row(A, 'c', 'r'))).toBe('offline');
  });

  it('reads a row, or null when there is none', async () => {
    const server = createServer(fakeClient({ data: { version: 2, data: { id: 'r' }, deleted: false }, error: null }, { data: null, error: null }));
    expect(await server.row(A, 'c', 'r')).toEqual({ version: 2, data: { id: 'r' }, deleted: false });
    expect(await server.row(A, 'c', 'r')).toBeNull();
  });

  it('reads changes since a time page by page, oldest first', async () => {
    const page = Array.from({ length: 1000 }, (_, i) => ({ record_id: `r${i}` }));
    const client = fakeClient({ data: page, error: null }, { data: [{ record_id: 'last' }], error: null });
    const rows = await createServer(client).since(A, '2026-10-22T10:00:00Z');
    expect(rows).toHaveLength(1001);
    expect(client.chains[0]).toContainEqual(['gt', 'updated_at', '2026-10-22T10:00:00Z']);
    expect(client.chains[0]).toContainEqual(['order', 'updated_at', { ascending: true }]);
    expect(client.chains[1]).toContainEqual(['range', 1000, 1999]);
  });

  it('asks the server for an invoice number', async () => {
    const client = fakeClient({ data: 7, error: null });
    expect(await createServer(client).giveNumber(A, 'i1', 6)).toBe(7);
    expect(client.chains[0][0]).toEqual(['rpc', 'mios_give_invoice_number', { p_record_id: 'i1', p_after: 6 }]);
  });
});
