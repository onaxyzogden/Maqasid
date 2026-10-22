// Brings in what changed on the account since this device last looked, before
// the stores read localStorage, so the app opens on the account's latest. Ported
// from Capacity Routine's src/lib/offline/pull.ts.
//
// Only rows changed after the last pull are asked for, with a few seconds of
// overlap so a change committed while that pull ran is not missed. A record
// this device still has a change waiting for is left alone: its send will meet
// the newer version and clash, so neither change is lost. A record already held
// at that version is left alone too.
//
// If the pull is slower than `ms`, or there is no signal, the app opens on what
// the device holds. A slow pull is not applied late under a running app (the
// stores would write over it); `onLate` offers a reload instead.
import { within } from './offline-store';

const PREFIX = 'bbiz_';
const SINGLE = '_single';
const OVERLAP_MS = 5000;

const cursorKey = (owner) => `cursor:${owner}`;

function readList(storage, collection) {
  try {
    const value = JSON.parse(storage.getItem(PREFIX + collection));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

/** Puts the rows of one collection into localStorage; returns those applied. */
export function apply(storage, collection, rows) {
  const single = rows.filter((r) => r.record_id === SINGLE);
  for (const row of single) {
    if (row.deleted) storage.removeItem(PREFIX + collection);
    else storage.setItem(PREFIX + collection, typeof row.data === 'string' ? row.data : JSON.stringify(row.data));
  }
  const records = rows.filter((r) => r.record_id !== SINGLE);
  if (records.length) {
    const list = readList(storage, collection);
    for (const row of records) {
      const at = list.findIndex((item) => String(item?.id) === row.record_id);
      if (row.deleted) {
        if (at >= 0) list.splice(at, 1);
      } else if (at >= 0) list[at] = row.data;
      else list.push(row.data);
    }
    storage.setItem(PREFIX + collection, JSON.stringify(list));
  }
  return rows;
}

/** Resolves true once the account's changes are on the device, false when it opens without them. */
export async function pullBeforeStart({ owner, server, meta, book, outbox, storage = localStorage, ms = 4000, onLate }) {
  const cursor = await meta.get(cursorKey(owner));
  const iso = cursor ? new Date(Date.parse(cursor) - OVERLAP_MS).toISOString() : null;
  const fetching = Promise.resolve().then(() => server.since(owner, iso));
  const got = await within(fetching.catch(() => 'failed'), ms);
  if (got === null) {
    fetching.then(() => onLate?.(), () => undefined);
    return false;
  }
  if (got === 'failed') return false;

  await outbox.ready;
  const waiting = new Set(outbox.entries(owner).map((e) => `${e.collection}|${e.recordId}`));
  const byCollection = new Map();
  for (const row of got) {
    const key = `${row.collection}|${row.record_id}`;
    if (waiting.has(key)) continue;
    const held = book.of(owner, row.collection, row.record_id);
    if (held != null && row.version <= held) continue;
    if (!byCollection.has(row.collection)) byCollection.set(row.collection, []);
    byCollection.get(row.collection).push(row);
  }

  const applied = [];
  for (const [collection, rows] of byCollection) applied.push(...apply(storage, collection, rows));
  if (applied.length) await book.setMany(owner, applied.map((r) => [r.collection, r.record_id, r.version]));

  const latest = got.reduce((max, r) => (r.updated_at > max ? r.updated_at : max), cursor ?? '');
  if (latest) await meta.put(cursorKey(owner), latest);
  return true;
}
