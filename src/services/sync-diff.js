// Turns writes to synced keys into one waiting change per record. storage.js
// tells it each key and value as they are written; it keeps, per key, a hash
// of every record as it last stood, and 500 ms after a key's first write it
// compares the key's latest value with those hashes and adds an upsert or a
// delete to the outbox for each record that differs. It never re-reads or
// re-parses stored values on a write.
//
// Only signed-in writes count: with no account, a write is ignored and the
// outbox (and with it IndexedDB) is never opened. A change belongs to the
// account signed in when it was written, even if it is diffed after sign-out.
import { classifyKey, isCounterKey, recordsOf } from './sync-keys';

const SINGLE = '_single';
const BATCH_MS = 500;

// A 53-bit string hash (cyrb53): cheap, and collisions are vanishingly rare at these sizes.
function hash(text) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i++) {
    const c = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

/** A stored string as the value it stands for: JSON when it parses, the text itself otherwise. */
function fromText(text) {
  try { return JSON.parse(text); } catch { return text; }
}

/** recordId → { hash, data } for a key's value; empty when the key holds nothing. */
function recordMap(value) {
  const out = new Map();
  if (value === undefined || value === null) return out;
  const split = recordsOf(value);
  if (split.kind === 'records') {
    for (const [id, item] of split.records) out.set(id, { hash: hash(JSON.stringify(item)), data: item });
  } else {
    out.set(SINGLE, { hash: hash(JSON.stringify(split.value)), data: split.value });
  }
  return out;
}

const synced = (key) => classifyKey(key) === 'synced' && !isCounterKey(key);

/**
 * owner()       the signed-in account's id, or null for a guest
 * openOutbox()  the outbox, called once, on the first change there is to keep
 * read(key)     the stored text of a key (without the bbiz_ prefix), or undefined
 * versionOf(collection, recordId)  the server version this device last saw, or null
 */
export function createSyncDiff({ owner, openOutbox, read, versionOf = () => null, delay = BATCH_MS }) {
  const index = new Map();      // key → Map(recordId → hash)
  const pending = new Map();    // key → { value, owner, timer }
  let outbox = null;
  let work = Promise.resolve();

  const box = () => (outbox ??= openOutbox());

  function diffKey(key, value, who) {
    const before = index.get(key) ?? new Map();
    const now = recordMap(value);
    const changes = [];
    for (const [id, rec] of now) {
      if (before.get(id) !== rec.hash) changes.push({ id, op: 'upsert', data: rec.data, hash: rec.hash });
    }
    for (const id of before.keys()) {
      if (!now.has(id)) changes.push({ id, op: 'delete' });
    }
    if (!changes.length) return;

    const next = new Map(before);
    for (const c of changes) {
      if (c.op === 'delete') next.delete(c.id);
      else next.set(c.id, c.hash);
    }
    index.set(key, next);

    const target = box();
    work = work.then(async () => {
      for (const c of changes) {
        try {
          await target.add(who, {
            collection: key, recordId: c.id, op: c.op, data: c.data, baseVersion: versionOf(key, c.id),
          });
        } catch (e) {
          // Not kept: put the old hash back so the next write to this key tries again.
          const current = index.get(key);
          if (before.has(c.id)) current.set(c.id, before.get(c.id));
          else current.delete(c.id);
          console.warn('[bbiz] change not kept for sending:', key, c.id, e);
        }
      }
    });
  }

  function flushKey(key) {
    const p = pending.get(key);
    if (!p) return;
    clearTimeout(p.timer);
    pending.delete(key);
    diffKey(key, p.value, p.owner);
  }

  return {
    /** Records how `keys` stand now, so later writes are compared with it. */
    start(keys) {
      for (const key of keys) {
        if (!synced(key)) continue;
        const text = read(key);
        const map = recordMap(text === undefined ? undefined : fromText(text));
        index.set(key, new Map([...map].map(([id, rec]) => [id, rec.hash])));
      }
    },

    /** The storage.js listener: `value` is what was written, undefined for a removal. */
    noteWrite(key, value) {
      if (!synced(key)) return;
      const who = owner();
      const p = pending.get(key);
      if (p && p.owner !== who) flushKey(key);
      if (!who) return;
      const v = typeof value === 'string' ? fromText(value) : value;
      const waiting = pending.get(key);
      if (waiting) {
        waiting.value = v;
        return;
      }
      pending.set(key, { value: v, owner: who, timer: setTimeout(() => flushKey(key), delay) });
    },

    /** Diffs every waiting key now (sign-out, the page being hidden). */
    flushNow() {
      for (const key of [...pending.keys()]) flushKey(key);
    },

    /** Resolves once every diffed change has reached the outbox. */
    settled: () => work,
  };
}
