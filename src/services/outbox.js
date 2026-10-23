// The changes waiting to be sent to the account, one entry per record. Ported
// from Capacity Routine's src/lib/offline/outbox.ts, reduced to what the record
// sync needs: the diff (sync-diff) adds changes, the flush sends them.
//
// Each entry is stored under `${owner}|${collection}|${recordId}`:
//   owner        the account the change was made under; it is only ever sent for that account
//   collection   the stored key, without the bbiz_ prefix (see sync-keys.js)
//   recordId     the record's id, or '_single' for a value kept whole
//   op           'upsert' or 'delete'
//   data         the record as it now is (none for a delete)
//   baseVersion  the server version the first waiting change was made on; null for a record
//                the server has never held. Later changes keep it, so the server can tell
//                whether someone else changed the record meanwhile.
//   seq          order of sending
//   rev          bumped by each later change merged into this one
//   clash        set when the server holds the record differently: { server }. A clashed
//                change is not sent again until someone chooses which one stays.

const keyOf = (owner, collection, recordId) => `${owner}|${collection}|${recordId}`;
const keyOfEntry = (e) => keyOf(e.owner, e.collection, e.recordId);

/**
 * `store` is a promise of an offline-store; when it fails to open, changes wait
 * in memory for this visit and `durable()` says false.
 */
export function createOutbox(store, { now = () => new Date().toISOString() } = {}) {
  const waiting = new Map();
  const listeners = new Set();
  // Keys of changes on their way to the server: one of them may land even if it is deleted meanwhile.
  const flying = new Set();
  let nextSeq = 1;
  let db = null;
  let kept = true;

  const ready = store
    .then(async (s) => {
      db = s;
      for (const [at, entry] of await s.all()) {
        waiting.set(at, entry);
        nextSeq = Math.max(nextSeq, entry.seq + 1);
      }
    })
    .catch(() => {
      db = null;
      kept = false;
      waiting.clear();
    });

  // Every change runs after the one before it, so two made at once merge in order.
  let line = ready;
  const inLine = (fn) => {
    const run = line.then(fn);
    line = run.catch(() => undefined);
    return run;
  };

  const changed = () => {
    for (const listener of listeners) listener();
  };

  const keep = async (at, entry) => {
    if (db) {
      if (entry) await db.put(at, entry);
      else await db.delete(at);
    }
    if (entry) waiting.set(at, entry);
    else waiting.delete(at);
    changed();
  };

  const settle = (entry, next) => inLine(async () => {
    const at = keyOfEntry(entry);
    const current = waiting.get(at);
    if (current) await keep(at, next(current));
  });

  return {
    /** Resolves once the changes kept by an earlier visit are loaded. */
    ready,
    /** False when this device can't keep changes past this visit. */
    durable: () => kept,

    /** Adds `{ collection, recordId, op, data, baseVersion }` for `owner`, merging it into any change waiting for that record. */
    add(owner, { collection, recordId, op, data, baseVersion }) {
      if (typeof owner !== 'string' || !owner) return Promise.reject(new Error('A change needs the account it belongs to.'));
      return inLine(async () => {
        const at = keyOf(owner, collection, String(recordId));
        const before = waiting.get(at);
        if (op === 'delete') {
          const base = before ? before.baseVersion : baseVersion;
          // A record the server never held, and none on its way: nothing to send.
          if (base == null && !flying.has(at)) {
            if (before) await keep(at, null);
            return;
          }
        }
        const entry = before
          ? { ...before, op, data: op === 'delete' ? undefined : data, rev: before.rev + 1 }
          : {
            owner, collection, recordId: String(recordId), op,
            data: op === 'delete' ? undefined : data,
            baseVersion: baseVersion ?? null, seq: nextSeq++, rev: 0, queuedAt: now(),
          };
        await keep(at, entry);
      });
    },

    /** The waiting changes, in the order they will be sent; only `owner`'s when given. */
    entries: (owner) => [...waiting.values()]
      .filter((e) => owner === undefined || e.owner === owner)
      .sort((a, b) => a.seq - b.seq),

    subscribe(listener) {
      listeners.add(listener);
      return () => void listeners.delete(listener);
    },

    /** Marks `entry` as on its way to the server until the returned function is called. */
    sending(entry) {
      const at = keyOfEntry(entry);
      flying.add(at);
      return () => void flying.delete(at);
    },

    /**
     * After `entry` reached the server as `version`: it leaves, or, when a later
     * change was merged into it meanwhile, stays on top of `version`.
     */
    async sent(entry, version) {
      let left = true;
      await settle(entry, (current) => {
        if (current.rev === entry.rev) return null;
        left = false;
        return { ...current, baseVersion: version };
      });
      return { left };
    },

    /** Marks `entry` as clashing with `server` ({ version, data, deleted }). */
    markClash: (entry, server) => settle(entry, (current) => ({ ...current, clash: { server } })),

    /** Keep this device's: the change goes out again, over the server's version. */
    keepMine: (entry) => settle(entry, ({ clash, ...current }) => ({
      ...current, baseVersion: clash?.server?.version ?? current.baseVersion, rev: current.rev + 1,
    })),

    /** Keep the saved one: the change is dropped. */
    keepSaved: (entry) => settle(entry, () => null),
  };
}
