// The server version this device last saw of each record, per account. The
// diff reads it on every write, so it is held in memory once loaded; each
// change is also kept in the offline store's "meta" under `versions:<owner>`,
// so a later visit sends its changes on top of the right version.

const keyOf = (owner) => `versions:${owner}`;

/** `meta` is a promise of an offline-store. */
export function createVersionBook(meta) {
  const books = new Map();     // owner → { 'collection|recordId': version }
  let line = Promise.resolve();

  /** Writes `[[collection, recordId, version], …]` into `owner`'s book and keeps it. */
  const write = (owner, changes) => {
    const book = books.get(owner) ?? {};
    books.set(owner, book);
    for (const [collection, recordId, version] of changes) book[`${collection}|${recordId}`] = version;
    const snapshot = { ...book };
    const run = line.then(async () => (await meta).put(keyOf(owner), snapshot));
    line = run.catch(() => undefined);
    return run;
  };

  return {
    /** Loads `owner`'s versions; until then, `of` knows none of them. */
    async load(owner) {
      if (books.has(owner)) return;
      const store = await meta;
      books.set(owner, { ...((await store.get(keyOf(owner))) ?? {}) });
    },

    /** The version last seen of a record, or null. */
    of: (owner, collection, recordId) => books.get(owner)?.[`${collection}|${recordId}`] ?? null,

    /** Notes that the server holds a record at `version`. */
    set: (owner, collection, recordId, version) => write(owner, [[collection, recordId, version]]),

    /** The same for many records at once. */
    setMany: (owner, changes) => write(owner, changes),
  };
}
