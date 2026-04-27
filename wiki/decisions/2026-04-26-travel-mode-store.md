---
date: 2026-04-26
status: shipped
tags: [prophetic-path, travel, qasr, store, milos]
related: [2026-04-26-travel-mode-qasr-content, 2026-04-26-travel-mode-event-nodes, 2026-04-26-prophetic-path-fasting-store-ramadan]
---

# Travel-Mode Store (Phase 1 of 3)

## Context

The Eid + Fasting plan closed 2026-04-26 carrying forward travel-mode (qasr salah) as the next spine variant class. Travel triggers a distinct prophetic structure: 4-rakʿat fard prayers shorten to 2 rakʿat (qasr — Bukhari 1102, Muslim 685); Dhuhr+Asr and Maghrib+Isha may combine (jam' — Bukhari 1107); Ramadan fasts may be deferred (Q 2:184); jumuʿah is not obligatory on the traveler. Two design decisions committed before implementation:

- **(1c) manual toggle + auto-expire** — no geolocation. User flips on travel mode and optionally sets a duration (days); state auto-clears past `expiresAt`.
- **(2b) rich scope** — two new spine event nodes for departure + arrival du'a moments (separate decision).

## Decision

New Zustand store `src/store/travel-store.js` with:

```js
{ active, startedAt, endedAt, expiresAt }
setTravel(durationDays)   // stamps startedAt + computes expiresAt; clears endedAt
clearTravel()             // sets active=false, stamps endedAt
getIsTraveling()          // returns active && (expiresAt == null || now < expiresAt); auto-clears past expiry on read
```

Persists to `bbiz_travel_state` via `safeSet`/`safeGetJSON` (services/storage applies `bbiz_` prefix). No persist middleware — matches every other MILOS store.

`getIsTraveling()` is a function — components must subscribe to the primitive fields (`active`, `startedAt`, `endedAt`) alongside it to force re-renders, since selecting a function reference returns a stable identity.

## Implementation

Single file: `src/store/travel-store.js`. `loadInitial()` reads stored shape from `bbiz_travel_state`; `setTravel`/`clearTravel` both write through `safeSet` before `set()`.

Tashreeq fasting-prohibition (Phase 2 of Eid plan) is unaffected — `isFasting` already force-off on Tashreeq regardless of travel state.

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — 3 ratchets at 0

## Carried forward

- Settings UI for `setTravel(days)` / `clearTravel()` toggles — store + auto-expire ship; UI mount can reuse the eventual fasting `userOverride` settings spot.
- Geolocation auto-detect (78km Shafiʿi / 88km Hanafi distance threshold) — explicitly out of scope per (1c).
