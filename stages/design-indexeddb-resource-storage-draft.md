---
phase: design
slug: indexeddb-resource-storage
status: draft
amanah: pending
created: 2026-04-09 00:00
---

# Review Gate: design — indexeddb-resource-storage

## Summary

Migrate file resource binary storage from localStorage (base64 data URLs) to IndexedDB. This lifts the effective file size limit from 500KB to 5-10MB and prevents localStorage quota exhaustion when storing multiple files across pillars. Metadata stays in localStorage for compatibility with the existing Zustand/safeSet persistence pattern.

## Problem

- **localStorage quota**: 5-10MB total per origin across *all* keys (stores, settings, contacts, tasks, etc.)
- **Base64 overhead**: Data URLs add ~33% size vs raw binary. A 500KB file becomes ~665KB in localStorage.
- **Current limit**: `MAX_FILE_SIZE = 500 * 1024` (enforced at `src/components/work/PillarBoard.jsx:134`)
- **Real capacity**: ~6-8 files at max size before quota exhaustion, and that competes with all other app data
- **Silent failure**: `safeSet` catches the QuotaExceededError but only `console.warn`s — user loses data silently

## Proposed Architecture: Dual-Store Pattern

### Principle
- **Metadata** (title, note, timestamps, mimeType, fileName, fileSizeFmt) stays in localStorage via existing `safeSet`/`safeGetJSON`
- **Binary data** (Blob) moves to IndexedDB — native Blob storage, no base64 encoding
- **Reference link**: resource objects gain a `blobId` field that maps to an IndexedDB record

### IndexedDB Schema

```
Database: bbiz_files (version 1)
Object Store: blobs
  keyPath: id (string — matches resource.id from localStorage)
  value: { id, blob: Blob, mimeType, fileName, storedAt }
```

### New Service: `src/services/idb-storage.js`

```javascript
// Public API
export async function idbPutBlob(id, blob, meta)  // Store blob by resource ID
export async function idbGetBlob(id)               // Retrieve blob by resource ID
export async function idbDeleteBlob(id)            // Delete blob by resource ID
export async function idbHasBlob(id)               // Check existence
export async function idbClearAll()                 // For data export/reset
export async function idbListAll()                  // For data export
```

Implementation: use raw `indexedDB` API (no library). ~60 lines. All methods return Promises.

### Resource Object Shape (after migration)

```javascript
// Before (v5.0)
{
  id, title, note, createdAt, type: 'file',
  fileName, fileSizeFmt, mimeType,
  dataUrl: "data:application/pdf;base64,..." // ← large, stored in localStorage
}

// After (v6.0)
{
  id, title, note, createdAt, type: 'file',
  fileName, fileSizeFmt, mimeType,
  blobId: "same-as-id"  // ← reference to IndexedDB blob
  // dataUrl field removed
}
```

### Component Changes: `PillarResourcesTab`

| Operation | Before | After |
|-----------|--------|-------|
| Upload | `FileReader.readAsDataURL` → store dataUrl in state | `FileReader` not needed for blob — use raw `File` object (it IS a Blob) |
| Save | `safeSet(key, [...resources])` includes dataUrl | `idbPutBlob(id, file)` then `safeSet(key, [...resources])` without dataUrl |
| Display | Icon + fileName (no change) | No change |
| Download | Create `<a>` from `r.dataUrl` | `idbGetBlob(id)` → `URL.createObjectURL(blob)` → `<a>` click → `URL.revokeObjectURL` |
| Delete | `save(resources.filter(...))` | `idbDeleteBlob(id)` then `save(resources.filter(...))` |

### New File Size Limit

```javascript
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
```

IndexedDB typically allows 50MB+ per origin (some browsers offer up to 60% of disk).

### Migration Path (schema v5.0 → v6.0)

Add to `src/services/migration.js`:

1. Check schema version. If already `6.0`, skip.
2. Scan all localStorage keys matching `bbiz_*_resources_*`
3. For each resource array, iterate entries with `type: 'file'` and `dataUrl`:
   a. Convert dataUrl to Blob: `fetch(dataUrl).then(r => r.blob())`
   b. Store in IndexedDB: `idbPutBlob(resource.id, blob, { mimeType, fileName })`
   c. Remove `dataUrl` from resource object, add `blobId: resource.id`
4. Write updated resource arrays back to localStorage (now much smaller)
5. Stamp schema version `6.0`

**Note**: Migration is async (IndexedDB is async). `runMigrations()` must become `async` or return a Promise. React mount (`main.jsx`) must `await` it.

### Export/Import Compatibility

`src/services/storage.js` `exportAll()`/`importAll()` currently only handle localStorage. Add:
- `exportAll`: also export IndexedDB blobs as base64 (for JSON portability)
- `importAll`: detect blob data and write to IndexedDB

### Settings Page Data Export

`src/pages/Settings.jsx` data export must include IndexedDB blobs. Two options:
1. **JSON export**: convert blobs to base64 in the export (larger file, but backwards-compatible)
2. **Zip export**: store blobs as raw files in a zip archive (smaller, but more complex)

Recommendation: JSON export with base64 for now (simplest). Zip can come later.

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/services/idb-storage.js` | Create | IndexedDB blob storage service (~60 lines) |
| `src/services/migration.js` | Modify | Add v5→v6 migration (async), bump SCHEMA_VERSION |
| `src/main.jsx` | Modify | Await async migration before React mount |
| `src/components/work/PillarBoard.jsx` | Modify | Replace dataUrl flow with blob read/write |
| `src/services/storage.js` | Modify | Add IDB awareness to exportAll/importAll |
| `src/pages/Settings.jsx` | Modify | Export includes IndexedDB data |

## Amanah Gate

- [x] Halal purpose confirmed — file storage for Islamic life management resources
- [x] No riba/gharar concerns — pure technical infrastructure
- [ ] Itqan standard met — pending implementation
- [ ] Existing tests still pass — no test framework configured

## Key Decisions

1. **Dual-store over full IDB**: keeping metadata in localStorage preserves compatibility with Zustand stores and the existing safeSet/safeGet pattern. Only binary data moves.
2. **No library**: raw IndexedDB API is sufficient for a single object store with simple CRUD. Avoids adding a dependency.
3. **Async migration**: IndexedDB is inherently async. The migration must complete before React mounts to prevent rendering stale data.
4. **10MB limit**: conservative compared to browser allowance (~50MB+), but generous enough for documents, audio clips, and short videos.

## Open Questions

1. **Offline-first**: should we add a storage quota check UI so users can see how much IDB space they've used?
2. **Large video files**: 10MB may be tight for video. Should we support chunked upload or streaming later?
3. **Backwards compatibility**: if a user downgrades (e.g., restores old code), resources without dataUrl will break. Should we keep dataUrl as a fallback for one version cycle?

## Reviewer Notes

[Space for human reviewer to annotate]

## Decision

- [ ] **Approved** — proceed to implementation
- [ ] **Rejected** — rework needed (see notes above)
