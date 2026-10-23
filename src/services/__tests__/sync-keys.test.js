import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { classifyKey, isCounterKey, recordsOf } from '../sync-keys';
import { SYNC_EXCLUDED_KEYS } from '../storage';

const SRC = fileURLToPath(new URL('../../', import.meta.url));

function sourceFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== '__tests__') out.push(...sourceFiles(full));
    } else if (/\.(js|jsx)$/.test(name) && !/\.test\./.test(name)) {
      out.push(full);
    }
  }
  return out;
}

// Call sites whose key arrives as a parameter, so a scan can't name it. Each one
// is listed with where its keys come from; those keys are covered elsewhere.
const PASS_THROUGH = new Set([
  'services/storage.js key',          // the storage helpers themselves
  'store/app-store.js key',           // local safeGetJSON wrapper; callers use literals
  'store/auth-store.js key',          // listKeys('') sweep on "Remove it from this device"
  'main.jsx key',                     // record sync reads back each key it was told was written
  'store/contacts-store.js key',      // p(key, val) wrapper; callers use literals
  'store/threshold-store.js key',     // local reader; callers use literals
  'pages/shared/PillarLevelPage.jsx storageKey', // prop: the *_STORAGE_KEY constants below
  'components/work/PillarBoard.jsx oldKey',      // `bbiz_${modulePrefix}_resources_…` legacy key
  'services/migration.js key',        // listKeys('tasks_') and `tasks_${…}`
  'services/migration.js gKey',       // `tasks_…` board keys
  'services/migration.js eKey',
  'services/migration.js k',          // storage.js export/backup loops over raw keys
  'services/storage.js k',
  'services/storage.js BACKUP_KEY',   // '__bbiz_import_backup', listed as excluded
]);

/** Every key the source reads or writes, as stored after the bbiz_ prefix. */
function scanKeys() {
  const keys = new Map(); // key -> first file
  const unresolved = [];
  // The first argument: a quoted or template literal (optionally `+ name`), else anything up to , or ).
  const call = /(safeSet|safeGet|safeGetJSON|safeRemove|localStorage\.(?:setItem|getItem|removeItem)|\bread|\bwrite)\(\s*((?:`[^`]*`|'[^']*'|"[^"]*")(?:\s*\+\s*[\w.]+)?|[^,)]+)/g;
  for (const file of sourceFiles(SRC)) {
    const text = readFileSync(file, 'utf8');
    const rel = relative(SRC, file).replace(/\\/g, '/');
    const consts = {};
    for (const m of text.matchAll(/const\s+([A-Za-z_]\w*)\s*=\s*(['"`])([^'"`]*)\2/g)) consts[m[1]] = m[3];
    const add = (raw, local) => {
      let k = raw.replace(/\$\{[^}]+\}/g, 'x1');
      if (local) {
        if (!k.startsWith('bbiz_')) return; // another app's key, not ours
        k = k.slice('bbiz_'.length);
      }
      if (!keys.has(k)) keys.set(k, rel);
    };
    for (const m of text.matchAll(call)) {
      const fn = m[1];
      if ((fn === 'read' || fn === 'write') && rel !== 'services/migration.js') continue;
      const local = fn.startsWith('localStorage');
      let arg = m[2].trim();
      const viaPrefix = arg.match(/^PREFIX\s*\+\s*(.+)$/);
      if (viaPrefix) arg = viaPrefix[1].trim();
      const lit = arg.match(/^(['"`])([^'"`]*)\1(\s*\+\s*[\w.]+)?$/);
      if (lit) { add(lit[2] + (lit[3] ? 'x1' : ''), local && !viaPrefix); continue; }
      if (arg in consts) { add(consts[arg], local && !viaPrefix); continue; }
      if (!PASS_THROUGH.has(`${rel} ${arg}`)) unresolved.push(`${rel}: ${m[0]}`);
    }
    // Tab keys handed to PillarLevelPage / LevelNavigator as a prop.
    for (const m of text.matchAll(/storageKey="([^"]+)"/g)) add(m[1], false);
    for (const m of text.matchAll(/_STORAGE_KEY\s*=\s*'([^']+)'/g)) add(m[1], false);
  }
  return { keys, unresolved };
}

describe('sync key inventory', () => {
  const { keys, unresolved } = scanKeys();

  it('finds the keys it should (the scan itself works)', () => {
    for (const k of ['expenses', 'tasks_x1', 'thr_niyyah_date', 'ai_api_key', 'health_active_tab', 'global_journal_reflection', 'schema_version']) {
      expect(keys.has(k), k).toBe(true);
    }
  });

  it('can name the key at every call site, or the site is a known pass-through', () => {
    expect(unresolved).toEqual([]);
  });

  it('classifies every key the source uses as synced or device-only', () => {
    const unclassified = [...keys].filter(([k]) => classifyKey(k) === null).map(([k, f]) => `${k} (${f})`);
    expect(unclassified).toEqual([]);
  });

  it('classifies every key a real device holds', () => {
    // Seen in a working copy's localStorage, without the bbiz_ prefix.
    const seen = [
      'tasks_work_9xk2_core', 'user', 'projects', 'office_channels', 'contacts_departments',
      'thr_niyyah_date', 'thr_niyyah_focus', 'schema_version', 'seed_dedupe_v1', 'seed_node_split_v1',
      'task_completion_reconcile_v1', 'mojibake_titles_repaired', 'seed_strip_v2',
      'faith_resources_core', 'work_active_tab', 'hydrate_today_2026-10-22',
    ];
    for (const k of seen) expect(classifyKey(k), k).not.toBeNull();
  });

  it('keeps every snapshot-excluded key on the device', () => {
    for (const k of SYNC_EXCLUDED_KEYS) expect(classifyKey(k), k).toBe('device');
  });

  it('never sends the AI key, the local profile or this device\'s layout', () => {
    for (const k of ['ai_api_key', 'ai_base_url', 'user', 'user_prev', 'sb_open', 'theme', 'module', 'notif_seen_at', 'prayer_coords', 'health_active_tab', 'dashboard_maqasid_level']) {
      expect(classifyKey(k), k).toBe('device');
    }
  });

  it('keeps one-time upgrade flags on the device', () => {
    for (const k of ['schema_version', 'seed_dedupe_v1', 'seed_strip_v2', 'task_completion_reconcile_v1', 'mojibake_titles_repaired', 'bbiz_islamic_day_key']) {
      expect(classifyKey(k), k).toBe('device');
    }
  });

  it('sends the operator\'s own records', () => {
    for (const k of ['expenses', 'invoices', 'projects', 'tasks_abc123', 'crm_deals', 'office_messages', 'people_employees',
      'contacts_v2', 'recruit_postings', 'tech_monitors', 'thr_niyyah_history', 'thr_open', 'travel_state',
      'fasting_user_override', 'global_discussion_messages', 'global_journal_reflection', 'faith_resources_core',
      'values_layer', 'show_diacritics', 'hydrate_today_2026-10-22']) {
      expect(classifyKey(k), k).toBe('synced');
    }
  });

  it('syncs the display name, so chat authors match across devices', () => {
    expect(classifyKey('display_name')).toBe('synced');
  });

  it('treats the invoice counter as a device-local counter', () => {
    expect(isCounterKey('inv_counter')).toBe(true);
    expect(classifyKey('inv_counter')).toBe('device');
    expect(isCounterKey('invoices')).toBe(false);
  });

  it('writes every synced key through storage.js, so the sync sees each change', () => {
    // A direct localStorage write bypasses safeSet; only device-only keys may do that.
    const bypass = [];
    for (const file of sourceFiles(SRC)) {
      const rel = relative(SRC, file).replace(/\\/g, '/');
      if (rel === 'services/storage.js') continue;
      const text = readFileSync(file, 'utf8');
      const consts = {};
      for (const m of text.matchAll(/const\s+([A-Za-z_]\w*)\s*=\s*(['"`])([^'"`]*)\2/g)) consts[m[1]] = m[3];
      for (const m of text.matchAll(/localStorage\.(?:setItem|removeItem)\(\s*([^,)]+)/g)) {
        let arg = m[1].trim();
        const viaPrefix = arg.match(/^PREFIX\s*\+\s*(.+)$/);
        if (viaPrefix) arg = viaPrefix[1].trim();
        const lit = arg.match(/^(['"`])([^'"`]*)\1$/);
        let k = lit ? lit[2] : consts[arg];
        if (k !== undefined && !viaPrefix) k = k.replace(/^bbiz_/, '');
        if (k === undefined || classifyKey(k) !== 'device') bypass.push(`${rel}: ${m[0]}`);
      }
    }
    expect(bypass).toEqual([]);
  });

  it('leaves an unknown key unclassified', () => {
    expect(classifyKey('brand_new_feature')).toBeNull();
  });
});

describe('recordsOf', () => {
  it('splits an array of items with unique ids into records', () => {
    const r = recordsOf([{ id: 'a', n: 1 }, { id: 'b', n: 2 }]);
    expect(r.kind).toBe('records');
    expect([...r.records.keys()]).toEqual(['a', 'b']);
    expect(r.records.get('b')).toEqual({ id: 'b', n: 2 });
  });

  it('treats an empty array as no records', () => {
    const r = recordsOf([]);
    expect(r.kind).toBe('records');
    expect(r.records.size).toBe(0);
  });

  it('keeps an array whose items lack ids as one record', () => {
    expect(recordsOf(['a@example.com', 'b@example.com'])).toEqual({ kind: 'single', value: ['a@example.com', 'b@example.com'] });
    expect(recordsOf([{ id: 'a' }, { n: 2 }]).kind).toBe('single');
  });

  it('keeps an array with a repeated id as one record, so nothing is lost', () => {
    expect(recordsOf([{ id: 'a', n: 1 }, { id: 'a', n: 2 }]).kind).toBe('single');
  });

  it('keeps objects, strings, numbers and booleans as one record', () => {
    for (const v of [{ active: true }, '2026-10-22', 3, false, null]) {
      expect(recordsOf(v)).toEqual({ kind: 'single', value: v });
    }
  });
});
