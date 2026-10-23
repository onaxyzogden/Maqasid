// Starts the record sync for a signed-in person, in two steps:
//   prepareSync  before the stores load: opens the device's sync store, loads
//                the versions last seen and pulls what changed on the account
//   startSync    after the app renders: watches writes for changes and keeps
//                sending them
// A guest gets neither: no IndexedDB, no outbox, no network.
import { idbStore, memoryStore } from './offline-store';
import { createOutbox } from './outbox';
import { createVersionBook } from './sync-versions';
import { pullBeforeStart } from './sync-pull';
import { createSyncDiff } from './sync-diff';
import { flush, keepSending } from './sync-flush';
import { deviceCounts, joinState, markPulled } from './sync-first';

/** The store, or one in memory when this device won't keep one (private mode, blocked site data). */
const opened = (name, factory) => idbStore(name, { factory }).catch(() => memoryStore());

/**
 * Resolves null for a guest; otherwise `{ owner, book, outbox, meta, pulled }`,
 * plus `undecided: true` and `counts` while the first-sign-in choice is open.
 */
export async function prepareSync({
  owner, server, factory = typeof indexedDB === 'undefined' ? null : indexedDB,
  storage = localStorage, ms = 4000, onLate,
}) {
  if (!owner) return null;
  const metaReady = opened('meta', factory);
  const book = createVersionBook(metaReady);
  await book.load(owner);
  const outbox = createOutbox(opened('outbox', factory));
  const meta = await metaReady;
  // The first sign-in on a device holding records of its own waits for the
  // operator's choice (sync-first.js) before anything is pulled.
  if (!(await joinState(meta, owner))) {
    const counts = deviceCounts(storage);
    if (counts.total > 0) return { owner, book, outbox, meta, pulled: false, undecided: true, counts };
    await markPulled(meta, owner);
  }
  const pulled = await pullBeforeStart({ owner, server, meta, book, outbox, storage, ms, onLate });
  return { owner, book, outbox, meta, pulled };
}

/**
 * ready     what prepareSync returned
 * owner()   the account signed in now, or null
 * renew()   refreshes the session: the account's id, or null
 * server    sync-server.js
 * invoices  see flush
 * keys      the stored keys now (listKeys)
 * read(key) a key's stored text
 * watch(listener)  storage.js's onStoredChange
 * Returns `{ sender, stop }`.
 */
export function startSync({ ready, owner, renew, server, invoices, keys, read, watch }) {
  const { book, outbox } = ready;
  const diff = createSyncDiff({
    owner,
    openOutbox: () => outbox,
    read,
    versionOf: (collection, recordId) => (owner() ? book.of(owner(), collection, recordId) : null),
  });
  diff.start(keys);
  const unwatch = watch(diff.noteWrite);
  const onHide = () => {
    if (document.visibilityState === 'hidden') diff.flushNow();
  };
  document.addEventListener('visibilitychange', onHide);
  const sender = keepSending(outbox, { run: () => flush(outbox, { renew, server, book, invoices }) });
  return {
    sender,
    stop() {
      diff.flushNow();
      unwatch?.();
      document.removeEventListener('visibilitychange', onHide);
      sender.stop();
    },
  };
}
