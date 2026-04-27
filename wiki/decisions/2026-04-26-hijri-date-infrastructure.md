---
date: 2026-04-26
status: shipped
tags: [prophetic-path, hijri, infrastructure, milos]
related: [2026-04-26-prophetic-path-fasting-store-ramadan, 2026-04-26-prophetic-path-eid-variants]
---

# Hijri Date Infrastructure (Phase 1 of 3)

## Context

The PropheticPath spine had no Hijri awareness. Aladhan returns `data.date.hijri = { day, month: { number }, year, weekday }` in the same payload as `timings` but only `timings` was being stored. Without Hijri awareness, Ramadan, Eid al-Fitr (1 Shawwal), Eid al-Adha (10 Dhul-Hijjah), Tashreeq (11–13 Dhul-Hijjah), Arafah (9 Dhul-Hijjah), and the last ten nights of Ramadan all rendered as ordinary days. Phase 1 establishes the plumbing without changing visible behavior.

## Decision

Surface Hijri date from `usePrayerTimes` and add pure Hijri predicate helpers in `prophetic-path-submodules.js`. No spine-node changes in this phase — Phase 2 (fasting-store) and Phase 3 (Eid variants) consume the new helpers.

## Implementation

Two files touched:

1. **src/hooks/usePrayerTimes.js** — added `hijri` state hydrated from `safeGetJSON('prayer_hijri', null)`, populated from `data?.data?.date?.hijri` after each Aladhan fetch, persisted via `safeSet('prayer_hijri', h)`, restored from cache on mount, returned alongside `timings`. Back-compat preserved: pre-existing `prayer_timings` cache reads continue to work.
2. **src/data/prophetic-path-submodules.js** — added private `hijriParts(hijri)` helper (parses `{ day, month: { number } }` defensively, returns `null` when missing) plus six pure exports: `isRamadan` (month=9), `isEidFitr` (10/1), `isEidAdha` (12/10), `isTashreeq` (12/11–13), `isArafah` (12/9), `isLastTenNights` (9/21+). All return `false` when `hijri` is null — safe to call before the prayer-times hook resolves.

## Hijri month numbers used

- Ramadan = 9
- Shawwal = 10 (Eid al-Fitr = 10/1)
- Dhul-Hijjah = 12 (Arafah = 12/9, Eid al-Adha = 12/10, Tashreeq = 12/11–13)

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — 3 ratchets at 0
- Visible behavior unchanged (Phase 1 is plumbing only)
