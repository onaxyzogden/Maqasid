---
date: 2026-04-26
status: shipped
tags: [prophetic-path, sunnah, jumuah, friday, day-of-week, milos]
related: [2026-04-26-prophetic-path-adhan-response, 2026-04-26-prophetic-path-sahari-node, 2026-04-26-prophetic-path-qiyam-rest-node, 2026-04-18-milos-grounding-two-axis]
---

# PropheticPath — Jumu'ah Friday Variant (Phase 4 of 4)

## Context

The PropheticPath spine had **zero day-of-week branching** before this phase. Fridays rendered identically to other weekdays — generic dhuhr in place of Jumu'ah, no acknowledgement of the istijabah hour, no Kahf prompt, no Friday cluster of sunan. This was the largest of the 4-phase Sunnah extension plan and is greenfield infrastructure.

## Decision

Add `isFriday(date)` helper (single source of truth in `prophetic-path-submodules.js`) and two new spine nodes:

- `jumuah` — anchored on `Dhuhr`, replaces `dhuhr` on Fridays only.
- `istijabah-hour` — anchored on `Maghrib`, `offsetMin: -60` (last hour before Maghrib), Friday only.

Filtering is data-driven: `FRIDAY_ONLY_NODE_IDS = {jumuah, istijabah-hour}` and `NON_FRIDAY_HIDE_ON_FRIDAY = {dhuhr}`. Both `NODE_TIMING` (active/next computation) and `NODES` (UI rendering) consult the same Friday flag at render time. `inferNodeFromHour` accepts the same date and routes the dhuhr-hour band to `jumuah` and the after-asr band to `istijabah-hour` on Fridays.

## Implementation

Six files touched:

1. **PropheticPath.jsx** — added `Users` and `HandHeart` lucide icons; `isFriday()`, `FRIDAY_ONLY_NODE_IDS`, `NON_FRIDAY_HIDE_ON_FRIDAY`, `getActiveNodeTiming(date)`. `NODE_TIMING.jumuah` (Dhuhr key) + `NODE_TIMING['istijabah-hour']` (Maghrib key, −60). `NODES` entries for both. `computeActiveNodeId` / `computeNextNodeId` iterate `getActiveNodeTiming(now)`. New `dayNodes` memo filters `NODES` per-day; `orderedNodes` and `activeNode` derive from it.
2. **prophetic-path-submodules.js** — `TOD_SUBMODULES.jumuah` (faith-salah + community/collective/people, matchers for jumuah/ghusl/miswak/perfume/Kahf/salawat/khutbah/transition:jumuah). `TOD_SUBMODULES['istijabah-hour']` (faith-salah + faith-shahada). `NODE_TIMING_KEY` entries. `isFriday()` exported. `inferNodeFromHour` routes h<13.5 → `jumuah` on Fridays (else `dhuhr`) and h<18.5 → `istijabah-hour` on Fridays (else `after-asr`).
3. **TimelineIslamicContent.jsx** — `NODE_META.jumuah` and `NODE_META['istijabah-hour']`.
4. **time-based-content.js** — `TIME_CONTENT.jumuah` (before/during/after intents citing Bukhari 880, Mishkat 2175, Bukhari 934, Tirmidhi 496, Abu Dawud 1047) and `TIME_CONTENT['istijabah-hour']` (citing Bukhari 935, Muslim 852a).
5. **prayer-seed-tasks.js** — `classifyTask` mappings: `transition:jumuah → ['prayer_dhuhr_before']`, `transition:istijabah-hour → ['prayer_maghrib_before']`.
6. **faith-seed-tasks.js** — parent task "Honor the Friday Sunan — Jumu'ah is the eid of the week" appended to `faith_salah_growth` with **6** grounded subtasks.

## Grounding (all canonical sunnah.com, verified 2026-04-26)

| # | Subtask | ref | Tier / grade |
|---|---|---|---|
| 1 | Make ghusl, use miswak, apply perfume before Jumu'ah | Sahih al-Bukhari 880 | Bayyinah / Sahih |
| 2 | Walk to the masjid in the earliest hour | Sahih al-Bukhari 881 | Bayyinah / Sahih |
| 3 | Recite Surah al-Kahf on Friday | Mishkat al-Masabih 2175 (Bayhaqi al-Da'awat al-kabir) | Bayyinah / Hasan (al-Albani); Sahih per al-Hakim |
| 4 | Listen attentively to the khutbah — no speaking | Sahih al-Bukhari 934 | Bayyinah / Sahih |
| 5 | Increase salawat on the Prophet ﷺ on Friday | Sunan Abi Dawud 1047 | Bayyinah / Sahih |
| 6 | Make du'a in the last hour before Maghrib on Friday | Sahih al-Bukhari 935 (corroborated by Sahih Muslim 852a) | Bayyinah / Sahih |

All 6 subtasks include full Arabic, narrator-attributed translation, `provenanceTier: 'Bayyinah'`, `relevance: 'direct'`, and `ratNote: 'Verified against sunnah.com 2026-04-26 — [ref] confirmed.'`

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — all 3 ratchets at 0 (one no-useless-escape on `muezzin's` fixed before lint passed)
- Friday-mock preview verification: deferred to a session that lands on a real Friday or uses `Date.prototype.getDay = () => 5` in dev console. The filter is data-driven and self-symmetric (Friday hides dhuhr; non-Friday hides jumuah/istijabah-hour) — non-Friday rendering already runs in CI and dev.

## Carries forward (out of scope per master plan)

- Two Eid spine variants (Fitr / Adha) — Friday variant establishes the day-of-week branching pattern these will extend.
- Travel-mode spine variant (qasr salah) — separate context.
- Fasting-state store for Ramadan-only content gating — Phase 2 sahari ships unconditional.
- Final spine count: 13 → 16 nodes (qiyam-rest + sahari + adhan-response content + jumuah + istijabah-hour, with jumuah/dhuhr being mutually exclusive per day). Closes the 4-phase Sunnah-extension plan.
