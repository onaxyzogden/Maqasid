// Migration service — runs synchronously before React mounts
// Schema version: 5.0 — unified contacts model

import { listKeys } from './storage';
import { repairBoardTasks } from './mojibake';

const PREFIX = 'bbiz_';
const SCHEMA_VERSION = '5.0';
const MOJIBAKE_FLAG = 'mojibake_titles_repaired';

function read(key) {
  try { return JSON.parse(localStorage.getItem(PREFIX + key)); }
  catch (e) { console.warn('[bbiz:migration] read failed:', key, e); return null; }
}
function write(key, val) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(val)); }
  catch (e) {
    console.warn('[bbiz:migration] write failed:', key, e);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('bbiz:storage-error', {
        detail: { key, error: e, source: 'migration' },
      }));
    }
  }
}

const AVATAR_COLORS = [
  '#4ab8a8', '#8b5cf6', '#ec4899', '#f59e0b',
  '#14b8a6', '#22c55e', '#6366f1', '#06b6d4',
  '#ef4444', '#f97316', '#3b82f6', '#0ea5e9',
];

function avatarColor(id = '') {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = id.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}

function nanoidLite(len = 12) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

// One-shot repair of cp1252-over-UTF-8 mojibake in persisted task/subtask
// titles. The title is the join key that hydrates seed content by title, so a
// stale corrupt title (saved before the seed files were repaired) orphans its
// task from the now-clean seed — bare card, no sources, "Ungrounded". This
// reverses the exact corruption in place so the join re-matches, deduping any
// clean duplicate the idle backfill appended (never dropping a completion or
// snooze). Gated by its own flag, independent of SCHEMA_VERSION, so it runs
// once for existing 5.0 users without re-running the contacts migration.
export function repairMojibakeTaskTitles() {
  if (localStorage.getItem(PREFIX + MOJIBAKE_FLAG) === '1') return;
  let boards = 0;
  for (const key of listKeys('tasks_')) {
    const tasks = read(key);
    if (!Array.isArray(tasks) || tasks.length === 0) continue;
    const boardId = key.slice('tasks_'.length);
    const next = repairBoardTasks(tasks, boardId);
    if (next !== tasks) { write(key, next); boards++; }
  }
  localStorage.setItem(PREFIX + MOJIBAKE_FLAG, '1');
  if (boards) console.info(`[bbiz] mojibake title repair: ${boards} board(s) updated.`);
}

export function runMigrations() {
  // Title repair first — before the SCHEMA_VERSION guard below returns early
  // for already-migrated users, and before React mounts / any hydration reads.
  repairMojibakeTaskTitles();

  const version = localStorage.getItem(PREFIX + 'schema_version');
  if (version === SCHEMA_VERSION) return; // already migrated

  const now = new Date().toISOString();
  const contacts = read('contacts_v2') || [];
  const companies = read('contacts_companies') || [];
  const hrRecords = read('contacts_hr') || [];
  const absenceRecords = read('contacts_absence') || [];

  // ── Migrate people_employees → ContactRecord + HRRecord ──
  const employees = read('people_employees') || [];
  for (const emp of employees) {
    const alreadyMigrated = contacts.find((c) => c._legacyId === emp.id);
    if (alreadyMigrated) continue;

    const nameParts = (emp.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName  = nameParts.slice(1).join(' ') || '';
    const conId     = 'con_' + nanoidLite(12);

    contacts.push({
      id:            conId,
      _legacyId:     emp.id,
      entityType:    'person',
      contactType:   'employee',
      status:        emp.status === 'inactive' ? 'archived' : 'active',
      firstName,
      lastName,
      displayName:   '',
      gender:        '',
      dob:           '',
      nationality:   '',
      maritalStatus: '',
      ssn:           '',
      children:      null,
      email:         emp.email   || '',
      phone:         emp.phone   || '',
      privateEmail:  '',
      privatePhone:  '',
      address:       '',
      companyId:     '',
      jobTitle:      emp.role    || '',
      avatarColor:   avatarColor(conId),
      leadSource:    '',
      leadStatus:    'unassigned',
      requestTitle:  '',
      requestDescription: '',
      estimatedBudget: null,
      createdAt:     emp.createdAt || now,
      updatedAt:     emp.updatedAt || now,
      createdBy:     '',
    });

    hrRecords.push({
      id:                   'hr_' + nanoidLite(12),
      contactId:            conId,
      employmentType:       '',
      hiringDate:           emp.startDate || '',
      departmentId:         emp.department || '',
      officeLocation:       '',
      contractEndDate:      '',
      superiorId:           '',
      workingPositionTitle: emp.role || '',
      backgroundCheckStatus: '',
      createdAt:            now,
      updatedAt:            now,
    });

    // Migrate leave balance as vacation plan seed
    if (emp.leaveBalance?.annual) {
      absenceRecords.push({
        id:               'abs_' + nanoidLite(12),
        contactId:        conId,
        type:             'vacation',
        subType:          'annual',
        startDate:        '',
        endDate:          '',
        days:             0,
        note:             'Migrated from leave balance',
        status:           'approved',
        restartCycleDate: '',
        vacationDaysTotal: emp.leaveBalance.annual || 20,
        createdAt:        now,
        createdBy:        '',
      });
    }
  }

  // ── Migrate crm_contacts → ContactRecord ──
  const crmContacts = read('crm_contacts') || [];
  const crmTypeMap = { lead: 'lead', prospect: 'contact', client: 'client', partner: 'contact', other: 'contact' };

  for (const crm of crmContacts) {
    const alreadyMigrated = contacts.find((c) => c._legacyCrmId === crm.id);
    if (alreadyMigrated) continue;

    const nameParts = (crm.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName  = nameParts.slice(1).join(' ') || '';
    const conId     = 'con_' + nanoidLite(12);

    // Ensure the company exists
    let companyId = '';
    if (crm.company) {
      const existing = companies.find((co) => co.name === crm.company);
      if (existing) {
        companyId = existing.id;
      } else {
        const cmpId = 'cmp_' + nanoidLite(12);
        companies.push({
          id:          cmpId,
          name:        crm.company,
          description: '',
          industries:  [],
          website:     '',
          email:       '',
          phone:       '',
          address:     '',
          logoColor:   avatarColor(cmpId),
          status:      'active',
          createdAt:   now,
          updatedAt:   now,
          createdBy:   '',
        });
        companyId = cmpId;
      }
    }

    contacts.push({
      id:            conId,
      _legacyCrmId:  crm.id,
      entityType:    'person',
      contactType:   crmTypeMap[crm.type] || 'contact',
      status:        'active',
      firstName,
      lastName,
      displayName:   '',
      gender:        '',
      dob:           '',
      nationality:   '',
      maritalStatus: '',
      ssn:           '',
      children:      null,
      email:         crm.email   || '',
      phone:         crm.phone   || '',
      privateEmail:  '',
      privatePhone:  '',
      address:       '',
      companyId,
      jobTitle:      crm.role    || '',
      avatarColor:   avatarColor(conId),
      leadSource:    '',
      leadStatus:    'unassigned',
      requestTitle:  '',
      requestDescription: '',
      estimatedBudget: null,
      createdAt:     crm.createdAt || now,
      updatedAt:     crm.updatedAt || now,
      createdBy:     '',
    });
  }

  // ── Write migrated data ──
  if (contacts.length)      write('contacts_v2', contacts);
  if (companies.length)     write('contacts_companies', companies);
  if (hrRecords.length)     write('contacts_hr', hrRecords);
  if (absenceRecords.length) write('contacts_absence', absenceRecords);

  // ── Stamp version (old keys preserved for rollback) ──
  localStorage.setItem(PREFIX + 'schema_version', SCHEMA_VERSION);
  console.info('[bbiz] Migration to schema 5.0 complete.');
}
