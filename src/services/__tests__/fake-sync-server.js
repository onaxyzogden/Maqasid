// An in-memory stand-in for sync-server.js, keeping the rules of
// supabase/migrations/0001_mios_records.sql: a new record starts at version 1,
// an update must name the version it was based on, the server bumps it and
// stamps updated_at, and invoice numbers are unique per account and the same
// on a retry.
import { SyncError } from '../sync-server';

export function fakeSyncServer() {
  const rows = new Map();          // owner|collection|recordId → row
  const counters = new Map();      // owner → last number
  const numbers = new Map();       // owner|recordId → number
  let clock = Date.parse('2026-10-22T10:00:00Z');
  let offline = false;
  const calls = [];

  const at = (owner, c, r) => `${owner}|${c}|${r}`;
  const reach = (name, args) => {
    calls.push([name, ...args]);
    if (offline) throw new SyncError('offline');
  };
  const stamp = () => new Date((clock += 1000)).toISOString();
  const copy = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));

  return {
    calls,
    setOffline: (v) => { offline = v; },
    /** The row as the server holds it, for assertions. */
    peek: (owner, c, r) => rows.get(at(owner, c, r)) ?? null,
    /** A change made by some other device, straight on the server. */
    put(owner, { collection, recordId, data, deleted = false }) {
      const before = rows.get(at(owner, collection, recordId));
      const row = {
        collection, record_id: recordId, data: copy(data) ?? null, deleted,
        version: before ? before.version + 1 : 1, updated_at: stamp(),
      };
      rows.set(at(owner, collection, recordId), row);
      return row;
    },

    async insert(owner, { collection, recordId, data, deleted }) {
      reach('insert', [owner, collection, recordId]);
      if (rows.has(at(owner, collection, recordId))) throw new SyncError('exists');
      const row = { collection, record_id: recordId, data: copy(data) ?? null, deleted, version: 1, updated_at: stamp() };
      rows.set(at(owner, collection, recordId), row);
      return { version: 1 };
    },

    async update(owner, { collection, recordId, data, deleted, version }) {
      reach('update', [owner, collection, recordId, version]);
      const row = rows.get(at(owner, collection, recordId));
      if (!row) throw new SyncError('missing');
      if (row.version !== version) throw new SyncError('stale');
      Object.assign(row, { data: copy(data) ?? null, deleted, version: row.version + 1, updated_at: stamp() });
      return { version: row.version };
    },

    async row(owner, collection, recordId) {
      reach('row', [owner, collection, recordId]);
      const row = rows.get(at(owner, collection, recordId));
      return row ? { version: row.version, data: copy(row.data), deleted: row.deleted } : null;
    },

    async since(owner, iso) {
      reach('since', [owner, iso]);
      return [...rows.entries()]
        .filter(([k, r]) => k.startsWith(`${owner}|`) && (!iso || r.updated_at > iso))
        .map(([, r]) => copy(r))
        .sort((a, b) => (a.updated_at < b.updated_at ? -1 : 1));
    },

    async giveNumber(owner, recordId, after = 0) {
      reach('giveNumber', [owner, recordId, after]);
      const given = numbers.get(`${owner}|${recordId}`);
      if (given) return given;
      const n = Math.max(counters.get(owner) ?? 0, after) + 1;
      counters.set(owner, n);
      numbers.set(`${owner}|${recordId}`, n);
      return n;
    },
  };
}
