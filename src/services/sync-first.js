// The first time an account signs in on a device that already holds records of
// its own, nothing is sent or pulled until the operator chooses (see
// FirstSignInSheet.jsx):
//   Add this device's records   each record joins the account by id. One the
//                                account lacks is queued to send; one it holds
//                                the same is only noted; one it holds differently
//                                (or deleted) waits as a clash for someone to
//                                choose. Records only the account holds come in.
//                                Nothing on either side is written over.
//   Start this account empty     the device's records are copied to a shelf in
//                                IndexedDB, the copy is read back and checked, and
//                                only then are they taken off the screen. The
//                                shelf is never sent and never read by the sync.
//   Put them back (on sign-out)  the latest shelf replaces the account's records.
//
// The choice is kept per account in the sync's meta store as `joined:<owner>`.
import { apply } from './sync-pull';
import { canonical } from './sync-flush';
import { classifyKey, isCounterKey, recordsOf } from './sync-keys';

const PREFIX = 'bbiz_';
const SINGLE = '_single';
const SHELF = 'shelf:';

const joinedKey = (owner) => `joined:${owner}`;
const cursorKey = (owner) => `cursor:${owner}`;

/** A seed task the operator has not touched: every device makes its own, so it is not this device's record. */
const untouchedSeed = (collection, item) => collection.startsWith('tasks_')
  && typeof item?.seedOrder === 'number' && item.createdAt === item.updatedAt && !item.completedAt;

function parse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

/** The synced keys this device holds, without the prefix. */
function syncedNames(storage) {
  const names = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!key?.startsWith(PREFIX)) continue;
    const name = key.slice(PREFIX.length);
    if (classifyKey(name) === 'synced' && !isCounterKey(name)) names.push(name);
  }
  return names.sort();
}

/** Each synced key's records: Map recordId → data, untouched seeds left out. */
function deviceRecords(storage) {
  const out = new Map();
  for (const collection of syncedNames(storage)) {
    const value = parse(storage.getItem(PREFIX + collection));
    const split = recordsOf(value);
    const records = new Map();
    if (split.kind === 'records') {
      for (const [id, item] of split.records) if (!untouchedSeed(collection, item)) records.set(id, item);
    } else if (value !== null && value !== undefined) {
      records.set(SINGLE, value);
    }
    out.set(collection, records);
  }
  return out;
}

const label = (id, data) => {
  if (id === SINGLE) return typeof data === 'string' ? data.slice(0, 80) : 'Saved settings';
  return String(data?.title || data?.name || data?.description || id);
};

/** `{ total, areas: [{ collection, count, items }] }`: what this device holds that would go to an account. */
export function deviceCounts(storage) {
  const areas = [];
  let total = 0;
  for (const [collection, records] of deviceRecords(storage)) {
    if (!records.size) continue;
    areas.push({ collection, count: records.size, items: [...records].map(([id, data]) => label(id, data)) });
    total += records.size;
  }
  return { total, areas };
}

/** 'added', 'empty' or 'pulled' once this device has joined the account; null before any choice. */
export async function joinState(meta, owner) {
  const joined = await meta.get(joinedKey(owner));
  if (joined) return joined;
  // A device that pulled before this choice existed has already joined.
  if (await meta.get(cursorKey(owner))) return 'pulled';
  return null;
}

/** Records that this device has already joined the account by pulling. */
export const markPulled = (meta, owner) => meta.put(joinedKey(owner), 'pulled');

/**
 * Joins this device's records to the account, by id. Throws, having changed
 * nothing, when the account can't be reached.
 * Resolves `{ queued, same, clashed, received, renumbered: [{ id, was }] }`.
 */
export async function addThisDevice({ owner, server, meta, book, outbox, storage = localStorage }) {
  const rows = await server.since(owner, null);
  const cloud = new Map();
  for (const row of rows) cloud.set(`${row.collection}|${row.record_id}`, row);
  const device = deviceRecords(storage);

  // A device invoice whose number the account already gives another invoice
  // waits for a new one, given by the account when it is sent.
  const taken = new Map();
  for (const row of rows) {
    if (row.collection === 'invoices' && !row.deleted && row.data?.number) taken.set(row.data.number, row.record_id);
  }
  const renumbered = [];
  const invoices = device.get('invoices');
  if (invoices) {
    for (const [id, inv] of invoices) {
      const owner_ = taken.get(inv?.number);
      if (owner_ === undefined || owner_ === id) continue;
      invoices.set(id, { ...inv, number: '', numberPending: true, formerNumber: inv.number });
      renumbered.push({ id, was: inv.number });
    }
    if (renumbered.length) {
      const list = parse(storage.getItem(`${PREFIX}invoices`));
      storage.setItem(`${PREFIX}invoices`, JSON.stringify(list.map((inv) => invoices.get(String(inv.id)) ?? inv)));
    }
  }

  const queue = [];
  const clashes = [];
  const noted = [];
  for (const [collection, records] of device) {
    for (const [recordId, data] of records) {
      const row = cloud.get(`${collection}|${recordId}`);
      if (!row) queue.push({ collection, recordId, data });
      else if (!row.deleted && canonical(row.data) === canonical(data)) noted.push([collection, recordId, row.version]);
      else clashes.push({ collection, recordId, data, row });
    }
  }

  // What only the account holds comes in.
  const incoming = new Map();
  for (const row of rows) {
    if (row.deleted) continue;
    const held = device.get(row.collection);
    if (row.record_id === SINGLE ? storage.getItem(PREFIX + row.collection) !== null : held?.has(row.record_id)) continue;
    if (row.record_id !== SINGLE && storage.getItem(PREFIX + row.collection) !== null && !Array.isArray(parse(storage.getItem(PREFIX + row.collection)))) continue;
    if (!incoming.has(row.collection)) incoming.set(row.collection, []);
    incoming.get(row.collection).push(row);
  }
  const received = [];
  for (const [collection, list] of incoming) received.push(...apply(storage, collection, list));

  for (const { collection, recordId, data } of [...queue, ...clashes]) {
    await outbox.add(owner, { collection, recordId, op: 'upsert', data, baseVersion: null });
  }
  for (const { collection, recordId, row } of clashes) {
    await outbox.markClash({ owner, collection, recordId }, { version: row.version, data: row.data, deleted: row.deleted });
  }
  await book.setMany(owner, [...noted, ...received.map((r) => [r.collection, r.record_id, r.version])]);
  const latest = rows.reduce((max, r) => (r.updated_at > max ? r.updated_at : max), '');
  if (latest) await meta.put(cursorKey(owner), latest);
  await meta.put(joinedKey(owner), 'added');
  return { queued: queue.length, same: noted.length, clashed: clashes.length, received: received.length, renumbered };
}

/**
 * Copies this device's records to the shelf, checks the copy, and only then
 * removes them. Throws, having removed nothing, when there is no shelf or the
 * copy does not read back the same. Resolves `{ kept }`, the keys shelved.
 */
export async function shelveThisDevice({ owner, shelf, meta, storage = localStorage, now = () => new Date().toISOString() }) {
  if (!shelf) throw new Error("This device can't keep a copy of its records, so nothing was removed.");
  const keys = {};
  for (const name of syncedNames(storage)) keys[name] = storage.getItem(PREFIX + name);
  const at = now();
  const id = `${SHELF}${at}`;
  await shelf.put(id, { at, keys });
  const back = await shelf.get(id);
  if (canonical(back?.keys) !== canonical(keys)) {
    await shelf.delete(id).catch(() => undefined);
    throw new Error('The copy of your records did not read back the same, so nothing was removed.');
  }
  for (const name of Object.keys(keys)) storage.removeItem(PREFIX + name);
  await meta.put(joinedKey(owner), 'empty');
  return { kept: Object.keys(keys).length };
}

/**
 * Carries out the operator's choice on the sheet: 'add' or 'empty'.
 * ready      what prepareSync returned while undecided
 * openShelf  resolves the shelf store (offline-store.js shelfStore)
 */
export async function chooseFirst({ choice, ready, server, storage = localStorage, openShelf }) {
  const { owner, meta, book, outbox } = ready;
  if (choice === 'add') return addThisDevice({ owner, server, meta, book, outbox, storage });
  if (choice === 'empty') {
    const shelf = await Promise.resolve().then(openShelf).catch(() => null);
    return shelveThisDevice({ owner, shelf, meta, storage });
  }
  throw new Error(`Unknown choice: ${choice}`);
}

/** The newest shelf as `{ id, at, keys }` (keys: how many), or null. */
export async function latestShelf(shelf) {
  if (!shelf) return null;
  const all = (await shelf.all()).filter(([k]) => k.startsWith(SHELF));
  if (!all.length) return null;
  const [id, entry] = all[all.length - 1];
  return { id, at: entry.at, keys: Object.keys(entry.keys ?? {}).length };
}

/**
 * Takes the account's records off this device and puts the newest shelf back.
 * The shelf is deleted only once every key reads back as shelved.
 * Resolves `{ restored }`, the keys put back.
 */
export async function putShelfBack({ shelf, storage = localStorage }) {
  const latest = await latestShelf(shelf);
  if (!latest) throw new Error('There is nothing on this device to put back.');
  const { keys } = await shelf.get(latest.id);
  for (const name of syncedNames(storage)) storage.removeItem(PREFIX + name);
  for (const [name, text] of Object.entries(keys)) storage.setItem(PREFIX + name, text);
  const wrong = Object.entries(keys).filter(([name, text]) => storage.getItem(PREFIX + name) !== text);
  if (wrong.length) throw new Error('Some records did not go back, so the copy is kept.');
  await shelf.delete(latest.id);
  return { restored: Object.keys(keys).length };
}
