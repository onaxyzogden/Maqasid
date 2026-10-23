// The one-time bring-in of the old snapshot sync's copy of an account (bucket
// `mios-snapshots`, table `user_snapshots`). The copy is read, never changed or
// removed, and is offered once per account (see SnapshotSheet.jsx):
//   Bring it in   each record joins by id, as sync-first.js addThisDevice does.
//                 A record the device already holds keeps the device's copy. One
//                 the account lacks is put on the device and queued to send; one
//                 it holds the same is only noted; one it holds differently (or
//                 deleted) waits as a clash, both copies kept.
//   Leave it      nothing changes; the copy stays where it is.
// Nothing on the device is cleared or written over.
//
// The answer is kept per account in the sync's meta store as `snapshot:<owner>`:
// 'imported', 'left', or 'none' when the account never had a copy.
import { apply } from './sync-pull';
import { canonical } from './sync-flush';
import { classifyKey, isCounterKey, recordsOf } from './sync-keys';

const BUCKET = 'mios-snapshots';
const PREFIX = 'bbiz_';
const SINGLE = '_single';

const stateKey = (owner) => `snapshot:${owner}`;

function parse(text) {
  if (text === null) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** `{ updatedAt, data }` for the account's old copy, or null when it never had one. Throws when it can't be read. */
export async function readSnapshot(client, owner) {
  const { data: row, error } = await client
    .from('user_snapshots')
    .select('storage_path, updated_at')
    .eq('user_id', owner)
    .maybeSingle();
  if (error) throw new Error(error.message || 'The old copy could not be read.');
  if (!row) return null;
  const { data: blob, error: fault } = await client.storage.from(BUCKET).download(row.storage_path);
  if (fault) throw new Error(fault.message || 'The old copy could not be read.');
  return { updatedAt: row.updated_at, data: JSON.parse(await blob.text()) };
}

/** 'imported', 'left' or 'none' once answered for this account; null before. */
export const snapshotState = async (meta, owner) => (await meta.get(stateKey(owner))) ?? null;

export const leaveSnapshot = (meta, owner) => meta.put(stateKey(owner), 'left');

export const noSnapshot = (meta, owner) => meta.put(stateKey(owner), 'none');

/** The copy's records: Map collection → Map recordId → data. */
function snapshotRecords(snapshot) {
  const out = new Map();
  for (const [collection, value] of Object.entries(snapshot ?? {})) {
    if (classifyKey(collection) !== 'synced' || isCounterKey(collection)) continue;
    if (value === null || value === undefined) continue;
    const split = recordsOf(value);
    out.set(collection, split.kind === 'records' ? split.records : new Map([[SINGLE, value]]));
  }
  return out;
}

/** Whether the device already holds this record, so its copy is kept. */
function deviceHolds(storage, collection, recordId) {
  const value = parse(storage.getItem(PREFIX + collection));
  if (value === null) return false;
  if (recordId === SINGLE || !Array.isArray(value)) return true;
  return value.some((item) => String(item?.id) === recordId);
}

/**
 * Brings the old copy's records into the account, by id. Throws, having changed
 * nothing, when the account can't be reached.
 * Resolves `{ added, kept, same, clashed, renumbered: [{ id, was }] }`.
 */
export async function importSnapshot({ owner, server, meta, book, outbox, snapshot, storage = localStorage }) {
  const rows = await server.since(owner, null);
  const cloud = new Map();
  for (const row of rows) cloud.set(`${row.collection}|${row.record_id}`, row);
  const incoming = snapshotRecords(snapshot);

  let kept = 0;
  for (const [collection, records] of incoming) {
    for (const recordId of [...records.keys()]) {
      if (deviceHolds(storage, collection, recordId)) {
        records.delete(recordId);
        kept++;
      }
    }
  }

  // An old invoice whose number the account or the device already gives
  // another invoice waits for a new one, given by the account when it is sent.
  const taken = new Map();
  for (const row of rows) {
    if (row.collection === 'invoices' && !row.deleted && row.data?.number) taken.set(row.data.number, row.record_id);
  }
  const held = parse(storage.getItem(`${PREFIX}invoices`));
  for (const inv of Array.isArray(held) ? held : []) if (inv?.number) taken.set(inv.number, String(inv.id));
  const renumbered = [];
  const invoices = incoming.get('invoices');
  for (const [id, inv] of invoices ?? []) {
    const user = taken.get(inv?.number);
    if (user === undefined || user === id) continue;
    invoices.set(id, { ...inv, number: '', numberPending: true, formerNumber: inv.number });
    renumbered.push({ id, was: inv.number });
  }

  const queue = [];
  const clashes = [];
  const noted = [];
  for (const [collection, records] of incoming) {
    const onDevice = [];
    for (const [recordId, data] of records) {
      const row = cloud.get(`${collection}|${recordId}`);
      if (!row) queue.push({ collection, recordId, data });
      else if (!row.deleted && canonical(row.data) === canonical(data)) noted.push([collection, recordId, row.version]);
      else clashes.push({ collection, recordId, data, row });
      onDevice.push({ record_id: recordId, data, deleted: false });
    }
    if (onDevice.length) apply(storage, collection, onDevice);
  }

  for (const { collection, recordId, data } of [...queue, ...clashes]) {
    await outbox.add(owner, { collection, recordId, op: 'upsert', data, baseVersion: null });
  }
  for (const { collection, recordId, row } of clashes) {
    await outbox.markClash({ owner, collection, recordId }, { version: row.version, data: row.data, deleted: row.deleted });
  }
  if (noted.length) await book.setMany(owner, noted);
  await meta.put(stateKey(owner), 'imported');
  return { added: queue.length, kept, same: noted.length, clashed: clashes.length, renumbered };
}
