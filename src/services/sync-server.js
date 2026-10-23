// The record sync's only door to the account: reads and writes mios_records
// (supabase/migrations/0001_mios_records.sql) and asks for invoice numbers.
// Every failure comes out as a SyncError of one kind, so the flush and the
// pull decide what to do without knowing Postgres or PostgREST codes:
//   offline   no signal, or an answer this code does not recognise: try again later
//   auth      the session is gone or refused: sign in again
//   exists    an insert met a record already there
//   stale     an update was based on a version the server no longer holds
//   missing   an update matched no record
//   refused   the server will never take this change as it stands
const TABLE = 'mios_records';
const PAGE = 1000;

export class SyncError extends Error {
  constructor(kind, cause) {
    super(`sync ${kind}`);
    this.name = 'SyncError';
    this.kind = kind;
    this.cause = cause;
  }
}

function kindOf(error) {
  const code = String(error?.code ?? '');
  const message = String(error?.message ?? '');
  if (code === '23505') return 'exists';
  if (code === 'P0001' && /stale_version/.test(message)) return 'stale';
  if (code === 'PGRST301' || error?.status === 401 || /jwt/i.test(message)) return 'auth';
  if (/^2[23]/.test(code) || code === '42501') return 'refused';
  return 'offline';
}

/** Runs a query and returns its data, turning any failure (thrown or answered) into a SyncError. */
async function ask(query) {
  let reply;
  try {
    reply = await query();
  } catch (e) {
    throw new SyncError('offline', e);
  }
  if (reply.error) throw new SyncError(kindOf(reply.error), reply.error);
  return reply.data;
}

export function createServer(client) {
  const one = (owner, collection, recordId) => (q) => q
    .eq('user_id', owner).eq('collection', collection).eq('record_id', recordId);

  return {
    async insert(owner, { collection, recordId, data, deleted }) {
      const row = await ask(() => client.from(TABLE)
        .insert({ user_id: owner, collection, record_id: recordId, data, deleted })
        .select('version').single());
      return { version: row.version };
    },

    async update(owner, { collection, recordId, data, deleted, version }) {
      const row = await ask(() => one(owner, collection, recordId)(client.from(TABLE)
        .update({ data, deleted, version }))
        .select('version').maybeSingle());
      if (!row) throw new SyncError('missing');
      return { version: row.version };
    },

    async row(owner, collection, recordId) {
      const row = await ask(() => one(owner, collection, recordId)(client.from(TABLE)
        .select('version, data, deleted'))
        .maybeSingle());
      return row ? { version: row.version, data: row.data, deleted: row.deleted } : null;
    },

    /** Every record changed after `iso` (all of them when null), oldest change first. */
    async since(owner, iso) {
      const rows = [];
      for (let from = 0; ; from += PAGE) {
        const page = await ask(() => {
          let q = client.from(TABLE)
            .select('collection, record_id, data, deleted, version, updated_at')
            .eq('user_id', owner);
          if (iso) q = q.gt('updated_at', iso);
          return q.order('updated_at', { ascending: true }).order('record_id', { ascending: true })
            .range(from, from + PAGE - 1);
        });
        rows.push(...page);
        if (page.length < PAGE) return rows;
      }
    },

    /** The record's invoice number: the same one on every ask, never another record's. */
    giveNumber: (owner, recordId, after = 0) => ask(() => client.rpc('mios_give_invoice_number', {
      p_record_id: recordId, p_after: after,
    })),
  };
}
