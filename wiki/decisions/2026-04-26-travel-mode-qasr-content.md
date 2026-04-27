---
date: 2026-04-26
status: shipped
tags: [prophetic-path, travel, qasr, jumuah, milos]
related: [2026-04-26-travel-mode-store, 2026-04-26-travel-mode-event-nodes, 2026-04-26-prophetic-path-jumuah-variant]
---

# Travel-Mode Qasr Content + Jumuʿah Filter Inversion (Phase 2 of 3)

## Context

With the travel store live (Phase 1), the spine still rendered ordinary Dhuhr/Asr/Isha intent text and surfaced `jumuah` on Fridays-while-traveling. Travelers' allowance content (qasr, jam', fast deferral) was missing entirely. Jumuʿah is not obligatory on a traveler (Bukhari 1102, Muslim 685 establish qasr; classical fiqh derives non-obligation of jumuʿah for travelers from the same hadith corpus and Q 4:101) — so on Friday-while-traveling, dhuhr should return and jumuah should hide.

## Decision

Two-part: (a) traveler's-allowance content surfaced on the during-phase of affected nodes via `TRAVELER_NOTES`; (b) Friday filter inverted when `isTraveling`.

### (a) Traveler's-allowance content

`TRAVELER_NOTES` map in `time-based-content.js` keyed by node id:
- `dhuhr` / `asr` / `isha` — qasr framing (2 rakʿat instead of 4; Bukhari 1102, Muslim 685)
- `dhuhr` / `maghrib` — jam' framing (combine with following prayer; Bukhari 1107)
- `sahari` / `maghrib-iftar` — fast deferral framing (Q 2:184; defer + make up later)

`getTimeContent(nodeId, phase, opts = {})` accepts `{ isTraveling }` and merges `travelerNote` only into the during-phase payload (lingering reminders feel right at the moment of action).

`TimelineIslamicContent.jsx` subscribes to travel store primitives, computes `isTraveling = getIsTraveling()`, threads it into `getTimeContent`, and renders a "Traveler's Allowance" section when `content?.travelerNote` is present.

### (b) Friday filter inversion

`PropheticPath.jsx` adds `TRAVEL_HIDE_NODE_IDS = new Set(['jumuah'])` and threads `isTraveling` through both `getActiveNodeTiming(date, opts)` and the `dayNodes` memo. Filter chain extended:

```
1. friday && !isTraveling && NON_FRIDAY_HIDE_ON_FRIDAY  → drop  (dhuhr hidden only when Friday-and-not-traveling)
2. !friday && FRIDAY_ONLY_NODE_IDS                       → drop  (jumuah/istijabah-hour hidden on non-Friday)
3. friday && isTraveling && TRAVEL_HIDE_NODE_IDS         → drop  (jumuah hidden when Friday-and-traveling)
... (fasting/ramadan/eid filters unchanged)
```

Net effect: Friday-while-traveling shows dhuhr (qasr-flagged via traveler note) and hides jumuah; non-Friday-while-traveling renders unchanged (existing fiqh — istijabah-hour remains Friday-only regardless of travel).

## Implementation

Three files: `time-based-content.js` (+`TRAVELER_NOTES`, opts param on `getTimeContent`), `TimelineIslamicContent.jsx` (subscribe + render), `PropheticPath.jsx` (filter inversion + subscribe).

## Grounding (all canonical sunnah.com / Quran MCP, verified 2026-04-26)

| Note | Citation | Tier |
|---|---|---|
| Qasr (4→2 rakʿat) | Sahih al-Bukhari 1102 + Sahih Muslim 685 | Bayyinah / Sahih |
| Jam' (combine) | Sahih al-Bukhari 1107 | Bayyinah / Sahih |
| Fast deferral | Q 2:184 | Bayyinah |

Citations carried in the seed-task entries (Phase 3 decision) — Phase 2 surfaces them as in-window guidance prose.

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — 3 ratchets at 0
- Preview verified: travel-on shows Traveler's Allowance section at dhuhr/asr/isha during-phase

## Carried forward

- Per-prayer combine framing (Dhuhr+Asr is the canonical pair; Maghrib+Isha the second) — currently single jam' note covers both; could split if user feedback wants per-pair specificity.
