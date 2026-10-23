// Sends the outbox to the account. Ported from Capacity Routine's
// src/lib/offline/flush.ts and keepSending.ts.
//
// A pass first renews the session and sends only the changes of the account
// that renewed; with no account it sends nothing and says sign-in is needed.
// Changes go in the order they were made. A new record is an insert, a change
// names the version it was made on, and a delete marks the record deleted. When
// the server already holds a record differently (another device changed it),
// the change is marked as a clash and waits for someone to choose: it is never
// sent over the top. When it holds exactly this change (a reply was lost), the
// change counts as sent. A pass stops at the first change that cannot reach the
// server, so the rest keep their order.
//
// An invoice made while signed in has no number yet (numberPending). Just
// before it is sent, the server gives it the next number for the account, the
// same one on every retry, and `invoices.numbered` puts it on this device.
import { SyncError } from './sync-server';

const RECONCILE = new Set(['exists', 'stale', 'missing']);

/** JSON with object keys sorted, so two values compare equal however jsonb ordered them. */
export function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort()
      .filter((k) => value[k] !== undefined)
      .map((k) => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
  }
  return JSON.stringify(value ?? null);
}

const same = (a, b) => canonical(a) === canonical(b);

const pad = (n) => String(n).padStart(3, '0');

/** The invoice as it will be sent: numbered by the server when it is still waiting for a number. */
async function numbered(owner, entry, server, invoices) {
  const data = entry.data;
  if (entry.collection !== 'invoices' || entry.op !== 'upsert' || !data?.numberPending) return data;
  const n = await server.giveNumber(owner, entry.recordId, invoices?.after?.() ?? 0);
  const { numberPending: _, ...rest } = data;
  const next = { ...rest, number: `INV-${pad(n)}` };
  invoices?.numbered?.(entry.recordId, next.number);
  return next;
}

/** Sends one change: `{ version }` once the server holds it, `{ clash: row | null }` when it holds something else. */
async function sendOne(owner, entry, server, invoices) {
  const { collection, recordId } = entry;
  const deleted = entry.op === 'delete';
  const data = deleted ? null : await numbered(owner, entry, server, invoices);
  const payload = { collection, recordId, data, deleted };
  try {
    if (entry.baseVersion != null) return await server.update(owner, { ...payload, version: entry.baseVersion });
    if (!deleted) return await server.insert(owner, payload);
    // A delete of a record whose insert was on its way: delete what the server now holds.
    const row = await server.row(owner, collection, recordId);
    if (!row || row.deleted) return { version: row?.version ?? null };
    return await server.update(owner, { ...payload, version: row.version });
  } catch (e) {
    if (e instanceof SyncError && RECONCILE.has(e.kind)) {
      const row = await server.row(owner, collection, recordId);
      if (deleted && (!row || row.deleted)) return { version: row?.version ?? null };
      if (row && !deleted && !row.deleted && same(row.data, data)) return { version: row.version };
      return { clash: row };
    }
    if (e instanceof SyncError && e.kind === 'refused') return { clash: null };
    throw e;
  }
}

/**
 * One pass over the outbox.
 *   renew()   refreshes the session; the signed-in account's id, or null
 *   server    sync-server.js (or a stand-in)
 *   book      sync-versions.js, loaded for the account
 *   invoices  { after(): highest number on this device, numbered(recordId, number) }
 * Resolves `{ sent, signInNeeded? }`.
 */
export async function flush(outbox, { renew, server, book, invoices }) {
  await outbox.ready;
  if (!outbox.entries().some((e) => !e.clash)) return { sent: 0 };
  const owner = await renew();
  if (!owner) return { sent: 0, signInNeeded: true };
  await book.load(owner);

  let sent = 0;
  for (const entry of outbox.entries(owner)) {
    if (entry.clash) continue;
    const done = outbox.sending(entry);
    try {
      const result = await sendOne(owner, entry, server, invoices);
      if ('clash' in result) {
        await outbox.markClash(entry, result.clash);
        continue;
      }
      if (result.version != null) await book.set(owner, entry.collection, entry.recordId, result.version);
      await outbox.sent(entry, result.version);
      sent += 1;
    } catch (e) {
      if (e instanceof SyncError && e.kind === 'auth') return { sent, signInNeeded: true };
      if (!(e instanceof SyncError)) console.warn('[bbiz] sending a change failed:', entry.collection, entry.recordId, e);
      break;
    } finally {
      done();
    }
  }
  return { sent };
}

/**
 * Runs `run` (a flush) at start, when the signal comes back, when the app is
 * shown again and when a change is added while online; one pass at a time, with
 * one more after it when a reason came up meanwhile.
 */
export function keepSending(outbox, {
  run,
  win = window,
  doc = document,
  online = () => navigator.onLine !== false,
}) {
  let running = null;
  let again = false;
  let stopped = false;
  let signInNeeded = false;
  const listeners = new Set();

  const pass = () => {
    if (stopped || !online()) return;
    if (running) {
      again = true;
      return;
    }
    running = (async () => {
      do {
        again = false;
        try {
          const result = await run();
          const need = Boolean(result?.signInNeeded);
          if (need !== signInNeeded) {
            signInNeeded = need;
            for (const listener of listeners) listener();
          }
        } catch (e) {
          console.warn('[bbiz] sending changes failed:', e);
        }
      } while (again && !stopped && online());
      running = null;
    })();
  };

  const onVisible = () => {
    if (doc.visibilityState === 'visible') pass();
  };
  win.addEventListener('online', pass);
  doc.addEventListener('visibilitychange', onVisible);
  const unsubscribe = outbox.subscribe(pass);
  pass();

  return {
    /** Sends now (a "Try again" button). */
    now: pass,
    /** True when the last pass found the session gone. */
    signInNeeded: () => signInNeeded,
    subscribe(listener) {
      listeners.add(listener);
      return () => void listeners.delete(listener);
    },
    /** Resolves once no pass is running. */
    async idle() {
      while (running) await running;
    },
    stop() {
      stopped = true;
      win.removeEventListener('online', pass);
      doc.removeEventListener('visibilitychange', onVisible);
      unsubscribe();
    },
  };
}
