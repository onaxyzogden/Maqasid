---
title: "Date format canonical"
type: concept
date: 2026-04-25
tags: [conventions, date-format, voice-and-tone]
---

# Date format canonical

## Canonical

`MMM d, yyyy` (e.g., **"Apr 25, 2026"**) is the canonical date format for surfaces where MILOS controls presentation.

Helper: [src/lib/format-date.js](src/lib/format-date.js) — `formatDate(input, variant?, fallback?)`.

```js
import { formatDate } from '@/lib/format-date';

formatDate('2026-04-25');                    // "Apr 25, 2026"
formatDate(date, 'long');                    // "April 25, 2026"
formatDate(date, 'datetime');                // "Apr 25, 2026 14:30"
formatDate(date, 'iso');                     // "2026-04-25"
formatDate(null, 'short', 'unknown');        // "unknown"
formatDate('not a date', 'short', '');       // ""
```

## When to use the helper vs `toLocaleDateString`

**Use `formatDate` (canonical) for:**
- Audit logs, exports, decision records
- Ceremony / niyyah / reflection timestamps
- Any surface that should look the same regardless of user locale
- Fields the user might copy-paste into another system

**Use `toLocaleDateString({...})` (locale-aware) for:**
- Calendar/scheduler UIs that should match the user's OS locale
- Dates the user authors and re-reads in their own context (e.g., journal headers, calendar event labels)
- Anywhere "i18n correctness" outweighs "format consistency"

When in doubt, prefer canonical. A wrong-locale date is rarely worse than a confusing audit trail.

## Migration

This concept was filed during the 2026-04-25 pre-test audit. The audit found ~30 sites using `toLocaleDateString({...})` (locale-aware — left alone) and 1 site using direct `date-fns format()` (migrated to the helper). Future formatting work should reach for `formatDate` first; only fall back to native locale calls for the use-cases above.

## Related

- [[2026-04-25-milos-tier-3-cleanup]]
- [src/lib/format-date.js](src/lib/format-date.js)
