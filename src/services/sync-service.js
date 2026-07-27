// Cross-device sync service.
//
// Strategy: full-snapshot, last-write-wins.
//   Push  = exportAll() snapshot (filtered) → Supabase Storage blob +
//           metadata row in user_snapshots.
//   Pull  = compare updated_at timestamps; if cloud is newer, importAll()
//           then reload the page so all Zustand stores re-hydrate cleanly.
//
// Stores hydrate themselves from localStorage at module-load time, so a pull
// ALWAYS requires a full page reload.  Callers must communicate this to the
// user before calling applyPull().
//
// importAll() is additive — it writes cloud keys on top of local ones without
// wiping keys absent from the cloud snapshot.  To fully replace, clearAll()
// first.  applyPull() does this correctly.

import { nanoid } from 'nanoid';
import { exportAll, importAll, createBackup, clearAll, safeGet, safeSet, SYNC_EXCLUDED_KEYS } from './storage';
import { supabase, cloudAccountsEnabled } from './supabase';

// ─── Constants ───────────────────────────────────────────────────────────────

const BUCKET = 'mios-snapshots';
const SCHEMA_VERSION = '5.0';
/** Local data is considered stale (needs push) if no push recorded for this long. */
const CONFLICT_THRESHOLD_MS = 2 * 60 * 60 * 1000; // 2 hours
/** How often the tab-focused periodic pull check runs. */
const PULL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
/** Debounce delay before auto-push after a store mutation. */
const PUSH_DEBOUNCE_MS = 30_000; // 30 seconds
/** Minimum gap between a push and a pull to avoid a race condition. */
const PULL_AFTER_PUSH_GUARD_MS = 60_000; // 1 minute

// ─── Device identity ─────────────────────────────────────────────────────────

/** Returns a stable nanoid that identifies this browser installation.
 *  Generated once and persisted; never synced to cloud. */
export function getDeviceId() {
  let id = safeGet('sync_device_id');
  if (!id) {
    id = nanoid(12);
    safeSet('sync_device_id', id);
  }
  return id;
}

// ─── Snapshot building ───────────────────────────────────────────────────────

/** Strip base64 attachment data from a parsed task array in-place (returns
 *  a new array; does not mutate the input). */
function stripAttachments(tasks) {
  if (!Array.isArray(tasks)) return tasks;
  return tasks.map((task) => {
    if (!task.attachments || task.attachments.length === 0) return task;
    const attachments = task.attachments.map((att) => {
      if (!att.data) return att;
      // Keep metadata, drop the binary payload
      const { data: _data, ...rest } = att;
      return { ...rest, _syncExcluded: true };
    });
    return { ...task, attachments };
  });
}

/** Build the filtered snapshot object ready for upload.
 *  - Removes all SYNC_EXCLUDED_KEYS
 *  - Strips attachment binary data from every tasks_* key
 *  - Adds _sync_meta header */
export function buildSyncSnapshot() {
  const raw = exportAll();

  // Remove excluded keys
  for (const key of SYNC_EXCLUDED_KEYS) {
    delete raw[key];
  }

  // Strip attachment blobs from every per-project task key
  for (const key of Object.keys(raw)) {
    if (key.startsWith('tasks_')) {
      const tasks = raw[key];
      if (Array.isArray(tasks)) {
        raw[key] = stripAttachments(tasks);
      }
    }
  }

  raw['_sync_meta'] = {
    schema_version: SCHEMA_VERSION,
    exported_at: new Date().toISOString(),
    device_id: getDeviceId(),
  };

  return raw;
}

// ─── Push ────────────────────────────────────────────────────────────────────

/** Upload the current snapshot to Supabase.
 *  @returns {{ ok: boolean, error: Error|null }} */
export async function pushSnapshot() {
  if (!cloudAccountsEnabled || !supabase) {
    return { ok: false, error: new Error('Cloud accounts disabled') };
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false, error: new Error('Not authenticated') };

  const userId = session.user.id;
  const storagePath = `${userId}/snapshot.json`;

  try {
    const snapshot = buildSyncSnapshot();
    const blob = new Blob([JSON.stringify(snapshot)], { type: 'application/json' });

    // Upload to Storage (upsert)
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, blob, { upsert: true, contentType: 'application/json' });
    if (uploadError) throw uploadError;

    // Upsert metadata row
    const { error: rowError } = await supabase
      .from('user_snapshots')
      .upsert(
        {
          user_id: userId,
          storage_path: storagePath,
          schema_version: SCHEMA_VERSION,
          device_id: getDeviceId(),
          snapshot_size_bytes: blob.size,
        },
        { onConflict: 'user_id' }
      );
    if (rowError) throw rowError;

    safeSet('sync_last_push_at', new Date().toISOString());
    safeSet('sync_pending_push', 'false');
    return { ok: true, error: null };
  } catch (err) {
    console.warn('[sync] pushSnapshot failed:', err);
    safeSet('sync_pending_push', 'true');
    return { ok: false, error: err };
  }
}

// ─── Pull ────────────────────────────────────────────────────────────────────

/** Fetch the latest snapshot metadata + blob from Supabase.
 *  @returns {{ ok: boolean, data: object|null, cloudUpdatedAt: string|null, error: Error|null }} */
export async function pullSnapshot() {
  if (!cloudAccountsEnabled || !supabase) {
    return { ok: false, data: null, cloudUpdatedAt: null, error: new Error('Cloud accounts disabled') };
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return { ok: false, data: null, cloudUpdatedAt: null, error: new Error('Not authenticated') };

  const userId = session.user.id;

  try {
    // Fetch metadata row
    const { data: rows, error: rowError } = await supabase
      .from('user_snapshots')
      .select('storage_path, updated_at')
      .eq('user_id', userId)
      .maybeSingle();
    if (rowError) throw rowError;
    if (!rows) return { ok: true, data: null, cloudUpdatedAt: null, error: null };

    // Download blob
    const { data: fileData, error: dlError } = await supabase.storage
      .from(BUCKET)
      .download(rows.storage_path);
    if (dlError) throw dlError;

    const text = await fileData.text();
    const parsed = JSON.parse(text);
    return { ok: true, data: parsed, cloudUpdatedAt: rows.updated_at, error: null };
  } catch (err) {
    console.warn('[sync] pullSnapshot failed:', err);
    return { ok: false, data: null, cloudUpdatedAt: null, error: err };
  }
}

// ─── Conflict detection ──────────────────────────────────────────────────────

/** Compare local last-push-at with cloud's updated_at.
 *  @returns {'cloud_newer'|'local_newer'|'equal'} */
export function detectConflict(cloudUpdatedAt) {
  if (!cloudUpdatedAt) return 'equal';
  const lastPush = safeGet('sync_last_push_at');
  if (!lastPush) return 'cloud_newer'; // never pushed → cloud wins
  const localMs = new Date(lastPush).getTime();
  const cloudMs = new Date(cloudUpdatedAt).getTime();
  const diff = localMs - cloudMs;
  if (Math.abs(diff) < 5000) return 'equal'; // within 5s — treat as equal
  if (diff > CONFLICT_THRESHOLD_MS) return 'local_newer';
  if (cloudMs > localMs) return 'cloud_newer';
  return 'equal';
}

// ─── Apply pull ──────────────────────────────────────────────────────────────

/** Apply a downloaded snapshot: backup local data, wipe, import, reload. */
export function applyPull(snapshotData) {
  // Strip the internal meta key before importing
  const { _sync_meta, ...userdata } = snapshotData;
  const cloudVersion = _sync_meta?.schema_version ?? '0';

  // Version guard — warn but proceed if incoming is older (migrations run on reload)
  if (cloudVersion > SCHEMA_VERSION) {
    console.warn('[sync] Cloud snapshot is from a newer app version. Some data may not display correctly.');
  }

  createBackup();
  clearAll();
  importAll(userdata);
  if (_sync_meta?.exported_at) {
    safeSet('sync_last_push_at', _sync_meta.exported_at);
  }
  window.location.reload();
}

// ─── Debounced push ──────────────────────────────────────────────────────────

let _pushTimer = null;

export function triggerDebouncedPush() {
  if (_pushTimer) clearTimeout(_pushTimer);
  _pushTimer = setTimeout(() => {
    _pushTimer = null;
    pushSnapshot().then(({ ok, error }) => {
      if (!ok) console.warn('[sync] debounced push failed:', error);
    });
  }, PUSH_DEBOUNCE_MS);
}

// ─── Lifecycle ───────────────────────────────────────────────────────────────

let _pullInterval = null;

/** Call once when the user becomes authenticated.  Registers:
 *  - beforeunload best-effort push
 *  - 5-minute periodic pull check (tab-focused only)
 *  - online-event retry for pending pushes */
export function initSync() {
  // beforeunload — best-effort, may be blocked by browser in some contexts
  window.addEventListener('beforeunload', () => {
    if (safeGet('sync_pending_push') === 'true') {
      pushSnapshot(); // fire-and-forget
    }
  });

  // Periodic pull
  if (_pullInterval) clearInterval(_pullInterval);
  _pullInterval = setInterval(async () => {
    if (!document.hasFocus()) return;
    const lastPushAt = safeGet('sync_last_push_at');
    if (lastPushAt) {
      const sinceLastPush = Date.now() - new Date(lastPushAt).getTime();
      if (sinceLastPush < PULL_AFTER_PUSH_GUARD_MS) return; // too soon after our own push
    }
    const { ok, data, cloudUpdatedAt } = await pullSnapshot();
    if (!ok || !data) return;
    const verdict = detectConflict(cloudUpdatedAt);
    if (verdict === 'cloud_newer') {
      // Notify auth store so UI can surface the reload prompt
      // (imported lazily to avoid circular dep at module load)
      import('../store/auth-store').then(({ useAuthStore }) => {
        useAuthStore.getState().setSyncStatus('pull_available');
        useAuthStore.getState()._setPendingPullData(data);
      });
    }
  }, PULL_INTERVAL_MS);

  // Online retry
  window.addEventListener('online', () => {
    if (safeGet('sync_pending_push') === 'true') {
      pushSnapshot();
    }
  });
}

export function teardownSync() {
  if (_pullInterval) { clearInterval(_pullInterval); _pullInterval = null; }
  if (_pushTimer) { clearTimeout(_pushTimer); _pushTimer = null; }
}
