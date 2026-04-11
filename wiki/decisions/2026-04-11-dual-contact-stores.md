---
title: "Dual-Contact Store Isolation"
type: decision
date: 2026-04-11
status: accepted
tags: [architecture, contacts, crm, people, data-model]
superseded_by: null
---

## Context

The app has two stores that manage contact-like entities:

- **contacts-store.js** — reads `contacts_v2`. Holds the unified contact model (post-migration), plus HR records, absence, clock-ins, salary, and documents.
- **crm-store.js** — reads `crm_contacts`. Holds CRM-specific contacts with deal pipelines, activity logs, and lead scoring.

A migration in `services/migration.js` (v5.0) attempted to consolidate legacy `people_employees` and `crm_contacts` into the unified `contacts_v2` model, but `crm-store.js` still independently reads/writes to `crm_contacts`. This means:

1. CRM contacts created after migration live only in `crm_contacts`, invisible to contacts-store.
2. Employee contacts live only in `contacts_v2`, invisible to crm-store.
3. No cross-reference or deduplication exists between the two keys.

## Decision

**Do NOT unify the stores in this remediation campaign.** The risk of data loss is too high without a test framework. Instead, accept the current isolation and document the path forward.

### Interim Workaround

- Each store operates independently on its own localStorage key.
- Users who need a contact in both contexts must create it in both places manually.
- No automatic sync or cross-reference is attempted.

### Desired Future State

A single `contacts-store.js` with:
- One `contacts_v3` storage key holding all contact records
- A `source` field per contact: `'hr'`, `'crm'`, or `'both'`
- CRM-specific fields (deals, pipeline stage, activities) as optional extensions
- HR-specific fields (department, salary, leave) as optional extensions
- A one-time migration from `crm_contacts` → `contacts_v3` with dedup by email/phone

### Migration Path

1. Add a test framework (Vitest) — prerequisite for safe data migration
2. Write migration v6.0: merge `crm_contacts` into `contacts_v3`, dedup, preserve all fields
3. Refactor `crm-store.js` to read from `contacts_v3` instead of `crm_contacts`
4. Deprecate and remove the `crm_contacts` key
5. Update all CRM components to use the unified store

### Risk

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Data loss during migration | High | Medium | Test framework + backup before migration |
| Duplicate contacts confuse users | Low | Medium | Document in UI ("Contacts are managed separately in HR and CRM") |
| CRM features depend on crm-store shape | Medium | High | Incremental refactor, not big-bang rewrite |

## Consequences

- Short-term: two parallel contact databases with no sync. Acceptable for current user base (single operator).
- Long-term: must unify before multi-user or contact volume exceeds manual management threshold.
