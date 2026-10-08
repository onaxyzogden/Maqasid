# CRM Module — CONTEXT.md

## Purpose
Customer relationship management: contacts, deal pipeline, and activity logging.

## Status
**No UI components.** ContactList, DealPipeline (+ .css), ActivityLog, and NotesView were removed 2026-10-08 — none was imported anywhere in `src/` (no route, page, or re-export). The backing `crm-store` was intentionally kept and currently has no consumers; any future CRM UI should be built fresh against it.

## File Inventory
| File | Description |
|------|-------------|
| CONTEXT.md | This file — no components currently live here |

## Store Dependencies
- **crm-store** (unconsumed): contacts[], deals[], activities[], pipeline[] (stages), CRUD methods, `CONTACT_TYPES`, `ACTIVITY_TYPES`, `formatDealValue`

## Gotchas
- Two separate contact systems exist: crm-store (sales) vs contacts-store (HR/people). `TypeBadge` imports `CONTACT_TYPES` from `@data/config/contact-config`, not from crm-store.
