// Storage service — localStorage with bbiz_ prefix
// Mirrors bbos-v4 safeSet/safeGet pattern

const PREFIX = 'bbiz_';

// Pre-write quota probe — fired async on large writes (>200 KB serialized).
// We can't await navigator.storage.estimate() inside the sync safeSet, so we
// kick off a fire-and-forget probe; if usage is >90% of quota the user gets
// the same toast they'd get from a hard quota error, but ahead of the next
// write that would actually fail.
const LARGE_WRITE_BYTES = 200 * 1024;
let _quotaProbedAt = 0;
function probeQuotaIfLarge(key, byteSize) {
  if (byteSize < LARGE_WRITE_BYTES) return;
  const now = Date.now();
  if (now - _quotaProbedAt < 30_000) return; // throttle to once per 30s
  _quotaProbedAt = now;
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) return;
  navigator.storage.estimate().then((est) => {
    if (!est?.quota || !est?.usage) return;
    const ratio = est.usage / est.quota;
    if (ratio < 0.9) return;
    window.dispatchEvent(new CustomEvent('bbiz:storage-error', {
      detail: { key, error: new Error(`Storage near quota: ${(ratio * 100).toFixed(0)}%`) },
    }));
  }).catch(() => { /* best-effort probe */ });
}

/** Returns true on success, false on failure (e.g. quota exceeded). */
export function safeSet(key, value) {
  try {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    probeQuotaIfLarge(key, v.length);
    localStorage.setItem(PREFIX + key, v);
    return true;
  } catch (e) {
    console.warn('[bbiz] storage write failed:', key, e);
    window.dispatchEvent(new CustomEvent('bbiz:storage-error', {
      detail: { key, error: e },
    }));
    return false;
  }
}

export function safeGet(key, fallback = null) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    return v !== null ? v : fallback;
  } catch (e) {
    console.warn('[bbiz] storage read failed:', key, e);
    return fallback;
  }
}

export function safeGetJSON(key, fallback = null) {
  try {
    const v = localStorage.getItem(PREFIX + key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch (e) {
    console.warn('[bbiz] storage JSON parse failed:', key, e);
    return fallback;
  }
}

export function safeRemove(key) {
  try { localStorage.removeItem(PREFIX + key); }
  catch (e) { console.warn('[bbiz] storage remove failed:', key, e); }
}

export function listKeys(prefix = '') {
  const full = PREFIX + prefix;
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(full)) keys.push(k.slice(PREFIX.length));
  }
  return keys;
}

export function exportAll() {
  const data = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(PREFIX)) {
      try { data[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k)); }
      catch { data[k.slice(PREFIX.length)] = localStorage.getItem(k); }
    }
  }
  return data;
}

/**
 * Validates imported data has expected structure before overwriting.
 * Returns { valid, errors } where errors is an array of strings.
 */
export function validateImport(data) {
  const errors = [];
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    errors.push('Import data must be a JSON object.');
    return { valid: false, errors };
  }
  if (Object.keys(data).length === 0) {
    errors.push('Import file is empty.');
    return { valid: false, errors };
  }
  // Validate value types — each entry should be a string, array, object, number, or boolean
  for (const [key, val] of Object.entries(data)) {
    if (val === undefined || val === null) continue;
    const t = typeof val;
    if (t !== 'string' && t !== 'number' && t !== 'boolean' && t !== 'object') {
      errors.push(`Key "${key}" has unsupported type: ${t}`);
    }
  }
  return { valid: errors.length === 0, errors };
}

const BACKUP_KEY = '__bbiz_import_backup';

/** Snapshot current localStorage to a backup key before import. */
export function createBackup() {
  const snapshot = exportAll();
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(snapshot));
    return true;
  } catch (e) {
    console.warn('[bbiz] backup create failed:', e);
    window.dispatchEvent(new CustomEvent('bbiz:storage-error', {
      detail: { key: BACKUP_KEY, error: e },
    }));
    return false;
  }
}

/** Restore from the pre-import backup. */
export function restoreBackup() {
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    if (!raw) return false;
    const snapshot = JSON.parse(raw);
    clearAll();
    for (const [key, val] of Object.entries(snapshot)) {
      safeSet(key, val);
    }
    localStorage.removeItem(BACKUP_KEY);
    return true;
  } catch (e) {
    console.warn('[bbiz] backup restore failed:', e);
    window.dispatchEvent(new CustomEvent('bbiz:storage-error', {
      detail: { key: BACKUP_KEY, error: e },
    }));
    return false;
  }
}

/** Returns true if a backup exists. */
export function hasBackup() {
  return localStorage.getItem(BACKUP_KEY) !== null;
}

export function importAll(data) {
  for (const [key, val] of Object.entries(data)) {
    safeSet(key, val);
  }
}

// Surface storage errors as a visible warning (installed once on module load)
if (typeof window !== 'undefined') {
  let _lastWarn = 0;
  window.addEventListener('bbiz:storage-error', () => {
    const now = Date.now();
    if (now - _lastWarn < 5000) return; // debounce 5s
    _lastWarn = now;
    // Use a non-blocking banner instead of alert so it doesn't interrupt workflow
    const el = document.createElement('div');
    el.textContent = 'Storage full \u2014 your changes may not be saved. Free up space or export your data.';
    Object.assign(el.style, {
      position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
      background: '#d32f2f', color: '#fff', padding: '10px 20px', borderRadius: '8px',
      fontSize: '0.85rem', zIndex: '99999', boxShadow: '0 4px 12px rgba(0,0,0,.3)',
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 6000);
  });
}

export function clearAll() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k?.startsWith(PREFIX)) keys.push(k);
  }
  keys.forEach(k => localStorage.removeItem(k));
}
