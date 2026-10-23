// Which stored keys belong to the account and which stay on this device.
// Keys are the logical names storage.js takes, without the bbiz_ prefix.
// A key that matches nothing here is unclassified: the sync layer leaves it
// alone and sync-keys.test.js fails until it is given a side.
// Decisions recorded in wiki/decisions/2026-10-22-record-sync-keys.md.
import { SYNC_EXCLUDED_KEYS } from './storage';

const SYNCED_EXACT = new Set([
  // Money (inv_counter stays on the device: the server numbers sent invoices)
  'expenses', 'invoices', 'categories', 'budgets',
  'money_vendors', 'money_accounts', 'money_incomes', 'money_assets',
  // CRM, office, people, tech
  'crm_contacts', 'crm_deals', 'crm_pipeline', 'crm_activities',
  'office_channels', 'office_messages', 'office_events', 'office_documents', 'office_qa', 'office_announcements',
  'people_employees', 'people_attendance', 'people_leaves', 'people_time', 'people_departments',
  'tech_monitors', 'tech_breaches', 'tech_dark_web_emails', 'tech_dark_web_enabled', 'tech_integrations', 'tech_campaigns',
  // Contacts and recruitment
  'contacts_v2', 'contacts_companies', 'contacts_hr', 'contacts_absence', 'contacts_clockins',
  'contacts_salary', 'contacts_docs', 'contacts_departments', 'recruit_postings',
  // Projects, the day, and shared notes
  'projects', 'fasting_user_override', 'travel_state',
  'global_discussion_messages', 'global_journal_reflection',
  // Preferences that describe the person rather than the screen
  'values_layer', 'attr_lang', 'show_diacritics', 'tooltips_enabled',
  'disable_l1_threshold_gate', 'disable_l23_threshold_gate',
]);

const SYNCED_PATTERNS = [
  /^tasks_.+$/,                       // one board per project or pillar
  /^[a-z0-9]+_resources_.+$/,         // PillarBoard resources
  /^thr_.+$/,                         // threshold: niyyah, open, close, deferred
  /^hydrate_today_.+$/,               // a day's water count, one key per day
];

const DEVICE_EXACT = new Set([
  ...SYNC_EXCLUDED_KEYS,              // the AI key and this screen's layout
  'inv_counter',
  'theme', 'pillars_exp', 'notif_seen_at', 'prayer_during_mode',
  'user', 'user_prev',                // the local profile; a pull never replaces it
  'dashboard_maqasid_level',
  'schema_version', 'task_completion_reconcile_v1', 'seed_strip_v2',
]);

const DEVICE_PATTERNS = [
  /^onboarding_.+$/,
  /^prayer_.+$/,                      // city, coordinates and today's timings
  /^.+_active_tab$/,
  /^seed_.+$/,                        // one-time upgrade flags
  /^sync_.+$/,                        // the snapshot sync's own bookkeeping
  /^bbiz_.+$/,                        // legacy double-prefixed keys
];

const COUNTER_KEYS = new Set(['inv_counter']);

/** 'synced', 'device', or null when no rule names the key. */
export function classifyKey(key) {
  if (DEVICE_EXACT.has(key) || DEVICE_PATTERNS.some((p) => p.test(key))) return 'device';
  if (SYNCED_EXACT.has(key) || SYNCED_PATTERNS.some((p) => p.test(key))) return 'synced';
  return null;
}

export function isCounterKey(key) {
  return COUNTER_KEYS.has(key);
}

/**
 * How a stored value splits into records. An array whose items all carry a
 * unique string or number id splits by id; anything else is one record, so a
 * list without ids is never half-sent.
 */
export function recordsOf(value) {
  if (Array.isArray(value)) {
    const records = new Map();
    for (const item of value) {
      const id = item && typeof item === 'object' ? item.id : undefined;
      if ((typeof id !== 'string' && typeof id !== 'number') || records.has(String(id))) {
        return { kind: 'single', value };
      }
      records.set(String(id), item);
    }
    return { kind: 'records', records };
  }
  return { kind: 'single', value };
}
