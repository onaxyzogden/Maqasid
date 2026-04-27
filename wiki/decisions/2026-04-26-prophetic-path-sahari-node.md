---
date: 2026-04-26
status: shipped
tags: [prophetic-path, sunnah, siyam, suhur, milos]
related: [2026-04-26-prophetic-path-qiyam-rest-node, 2026-04-18-milos-grounding-two-axis]
---

# PropheticPath — Sahari Node (15th Spine Node, Phase 2 of 4)

## Context

The Aladhan API returns `Imsak` (predawn cutoff) but the spine never used it. Fasting users in Ramadan had no spine support between tahajjud and fajr. The suhur sunnah is load-bearing: explicitly named as the locus of barakah (Bukhari 1923), and as the very mark distinguishing Muslim fasting from those before us (Muslim 1096a).

## Decision

Add `sahari` as the 15th spine node, anchored on the Aladhan `Imsak` key directly (no offset math), between `tahajjud` and `fajr`. Renders unconditionally — sahari has barakah outside Ramadan too.

## Implementation

Six files touched (same pattern as Phase 1):

1. **PropheticPath.jsx** — added `UtensilsCrossed` to lucide-react imports; `NODE_TIMING.sahari = { key: 'Imsak', label: 'Sahari' }`; NODES entry between tahajjud and fajr.
2. **prophetic-path-submodules.js** — `TOD_SUBMODULES.sahari` (siyam + life-physical, matchers for sahari/sahur/suhoor/imsak/transition:sahari); `NODE_TIMING_KEY.sahari = 'Imsak'`; `inferNodeFromHour` slot at `h<5.5`.
3. **TimelineIslamicContent.jsx** — `NODE_META.sahari = { label: 'Sahari', ar: 'السحور', accent: '#fbbf24' }`.
4. **time-based-content.js** — `TIME_CONTENT.sahari` before/during/after intent objects citing Bukhari 1923, Bukhari 1921.
5. **prayer-seed-tasks.js** — `classifyTask` mapping `transition:sahari → ['prayer_fajr_before']`.
6. **faith-seed-tasks.js** — parent task "Take suhur — the pre-dawn meal of barakah" with 3 grounded subtasks at the end of `faith_siyam_core` (note: siyam pillar, not salah).

## Grounding (all Bayyinah / Sahih, sunnah.com-verified 2026-04-26)

| Subtask | ref | hadith |
|---|---|---|
| Wake before Imsak and eat suhur | Sahih al-Bukhari 1923 | Anas — "Take suhur, for in suhur there is barakah" |
| Stop suhur ~50 ayat before Fajr | Sahih al-Bukhari 1921 | Zayd ibn Thabit — gap between suhur and Fajr was ~50 ayat |
| Hold suhur as the distinguishing mark | Sahih Muslim 1096a | 'Amr ibn al-'As — "The difference between our fasting and the fasting of the People of the Book is the meal of suhur" |

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — all 3 ratchets at 0
- Preview at port 5173 — `Sahari` / `Pre-Dawn Meal` confirmed in DOM, no console errors

## Carries forward

- Optional fasting-state store to render sahari only when fasting — deferred. Current intent text says "If fasting today…" / "Even outside Ramadan…" branches in copy.
- Phases 3 (adhan-response) and 4 (Jumu'ah variant) per master plan.
