// A small key-value store for what the record sync keeps on the device: the
// changes waiting to be sent ("outbox") and its own bookkeeping ("meta", such as
// the pull cursor). IndexedDB in the browser, a Map in tests and as a fallback.
// The shelf ("Start this account empty" keeps a device's earlier records there)
// is a database of its own, so nothing the sync does to its stores can reach it.
// Ported from Capacity Routine's src/lib/offline/store.ts.

/** IndexedDB is missing, refused (private mode, blocked site data) or failed to open. */
export class StoreUnavailableError extends Error {
  constructor(cause) {
    super("This device won't keep changes offline.");
    this.name = 'StoreUnavailableError';
    this.cause = cause;
  }
}

/** The promise's value, or null if it has not settled within `ms`. The promise itself keeps going. */
export function within(p, ms) {
  let timer;
  const late = new Promise((resolve) => { timer = setTimeout(() => resolve(null), ms); });
  return Promise.race([p, late]).finally(() => clearTimeout(timer));
}

const SYNC_DB = { name: 'mios-offline', version: 1, stores: ['outbox', 'meta'] };
const SHELF_DB = { name: 'mios-shelf', version: 1, stores: ['shelf'] };

/** get, put, delete, all (every entry in key order) and clear, over a Map. */
export function memoryStore() {
  const map = new Map();
  return {
    get: async (key) => map.get(key),
    put: async (key, value) => void map.set(key, value),
    delete: async (key) => void map.delete(key),
    all: async () => [...map.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)),
    clear: async () => map.clear(),
  };
}

function request(req) {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function openDb(factory, { name: dbName, version, stores }) {
  return new Promise((resolve, reject) => {
    const req = factory.open(dbName, version);
    req.onupgradeneeded = () => {
      for (const name of stores) if (!req.result.objectStoreNames.contains(name)) req.result.createObjectStore(name);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
    req.onblocked = () => reject(new Error('blocked'));
  });
}

/** The same interface as memoryStore, kept in IndexedDB. Opens only when called. */
export function idbStore(name, { factory = typeof indexedDB === 'undefined' ? null : indexedDB } = {}) {
  return openStore(SYNC_DB, name, factory);
}

/** The shelf, in its own database. */
export function shelfStore({ factory = typeof indexedDB === 'undefined' ? null : indexedDB } = {}) {
  return openStore(SHELF_DB, 'shelf', factory);
}

async function openStore(spec, name, factory) {
  if (!factory) throw new StoreUnavailableError();
  let db;
  try {
    db = await openDb(factory, spec);
  } catch (e) {
    throw new StoreUnavailableError(e);
  }
  const run = (mode, op) => request(op(db.transaction(name, mode).objectStore(name)));
  return {
    get: (key) => run('readonly', (s) => s.get(key)),
    put: async (key, value) => void (await run('readwrite', (s) => s.put(value, key))),
    delete: async (key) => void (await run('readwrite', (s) => s.delete(key))),
    all: async () => {
      const [keys, values] = await Promise.all([
        run('readonly', (s) => s.getAllKeys()),
        run('readonly', (s) => s.getAll()),
      ]);
      return keys.map((k, i) => [String(k), values[i]]);
    },
    clear: async () => void (await run('readwrite', (s) => s.clear())),
  };
}
