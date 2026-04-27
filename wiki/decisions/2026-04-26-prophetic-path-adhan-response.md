---
date: 2026-04-26
status: shipped
tags: [prophetic-path, sunnah, salah, adhan, shafaah, milos]
related: [2026-04-26-prophetic-path-sahari-node, 2026-04-26-prophetic-path-qiyam-rest-node, 2026-04-18-milos-grounding-two-axis]
---

# PropheticPath — Adhan-Response Content Enrichment (Phase 3 of 4)

## Context

Five adhans are called daily. The post-adhan dua (Bukhari 614) carries an explicit prophetic promise: "Whoever says this when he hears the muezzin, my shafa'ah will be permitted for him on the Day of Resurrection." This was absent from the spine. Prayer nodes today render generic `before` intent only.

## Decision (Option A from plan)

The spine has no micro-node / overlay primitive. Rather than build one (Option B, ~600 LOC + new abstraction), enrich existing prayer-node `before` content. Adhan-response renders on every prayer node automatically via `PRAYER_NODE_TEMPLATE`.

## Implementation

Three files touched:

1. **time-based-content.js** — `ADHAN_RESPONSE` constant (full Bukhari 614 Arabic + meaning); `PRAYER_NODE_TEMPLATE.before.adhanResponse = ADHAN_RESPONSE`. Auto-propagates to fajr/dhuhr/asr/maghrib/isha.
2. **TimelineIslamicContent.jsx** — new render block for `content?.adhanResponse` before the dhikr section, rendered via existing `DuaSection` with the node accent color.
3. **faith-seed-tasks.js** — parent task "Respond to every adhan with the prophetic dua" appended to `faith_salah_growth`, with 2 grounded subtasks (Muslim 384, Bukhari 614).

## Grounding (canonical sunnah.com, verified 2026-04-26)

| Subtask | ref | hadith |
|---|---|---|
| Repeat after the muezzin as he calls | Sahih Muslim 384 | Abu Sa'id — "When you hear the call, say what the muezzin says" |
| Recite the post-adhan dua to earn shafa'ah | Sahih al-Bukhari 614 | Jabir — Allahumma rabba hadhihi ad-da'wati t-tammah… shafa'ah promise |

Bukhari 614 Arabic embedded directly in `time-based-content.js` and in the subtask `arabic` field; Bayyinah-tier in both axes.

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — all 3 ratchets at 0 (one no-useless-escape on `shafa\'ah` in description fixed before lint passed)
- Preview at port 5173 — adhan-response section confirmed on prayer-node `before` view, no console errors

## Carries forward

- Phase 4: Jumu'ah Friday spine variant (day-of-week branching, largest scope).
- Optional habituation tracking per prayer (5-subtask split) deferred — single consolidated parent suffices for now.
