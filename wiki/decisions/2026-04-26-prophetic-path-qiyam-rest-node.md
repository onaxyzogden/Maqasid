---
date: 2026-04-26
status: shipped
tags: [prophetic-path, sunnah, qiyam, tahajjud, milos]
related: [2026-04-26-prophetic-path-witr-node, 2026-04-18-milos-grounding-two-axis]
---

# PropheticPath — Qiyam-Rest Node (14th Spine Node, Phase 1 of 4-Phase Sunnah Extension)

## Context

The witr-node ship brought the spine to 13 nodes. Bedtime (Isha+60) and Tahajjud (Lastthird) bracketed a long sleep window with no spine support for the niyyah-to-rise-for-qiyam sunnah. Sleep with the explicit intention to pray at night is itself recorded as the prayer (Nasa'i 1787) — a load-bearing sunnah that lifts the all-or-nothing pressure around tahajjud.

## Decision

Add `qiyam-rest` as the 14th spine node, anchored at `Lastthird − 90min`, between `bedtime` and `tahajjud`.

## Implementation

Six files touched:

1. **[src/components/islamic/PropheticPath.jsx](../../src/components/islamic/PropheticPath.jsx)** — added `MoonStar` to lucide-react imports; inserted `NODE_TIMING['qiyam-rest'] = { key: 'Lastthird', label: 'Qiyam Rest', offsetMin: -90 }` and the corresponding `NODES` entry between bedtime and tahajjud.
2. **[src/data/prophetic-path-submodules.js](../../src/data/prophetic-path-submodules.js)** — added `TOD_SUBMODULES['qiyam-rest']` with matchers (qiyam-rest, sleep-with-niyyah, satan-knot, transition:qiyam-rest); added `'qiyam-rest': 'Lastthird'` to `NODE_TIMING_KEY`; updated `inferNodeFromHour` to route `h<4` to qiyam-rest (was stale `'isha'`).
3. **[src/components/islamic/TimelineIslamicContent.jsx](../../src/components/islamic/TimelineIslamicContent.jsx)** — added `NODE_META['qiyam-rest'] = { label: 'Qiyam Rest', ar: 'نية القيام', accent: '#a855f7' }`.
4. **[src/data/islamic/time-based-content.js](../../src/data/islamic/time-based-content.js)** — added `TIME_CONTENT['qiyam-rest']` with before/during/after intent objects citing Nasa'i 1787, Bukhari 1142, Bukhari 1145.
5. **[src/data/seed-tasks/prayer-seed-tasks.js](../../src/data/seed-tasks/prayer-seed-tasks.js)** — added `classifyTask` mapping `transition:qiyam-rest → ['prayer_isha_after']`.
6. **[src/data/seed-tasks/faith-seed-tasks.js](../../src/data/seed-tasks/faith-seed-tasks.js)** — added parent task "Sleep with niyyah to rise for tahajjud" with 3 grounded subtasks at the end of `faith_salah_growth`.

## Grounding (all Bayyinah / Sahih, sunnah.com-verified 2026-04-26)

| Subtask | ref | hadith |
|---|---|---|
| Set niyyah to rise for qiyam before sleeping | Sunan an-Nasa'i 1787 | Abu Ad-Darda — sleep with niyyah is recorded as the prayer; sleep is charity |
| Untie three knots of Satan on waking | Sahih al-Bukhari 1142 | Abu Hurayrah — three knots, undone in turn by dhikr → wudu → prayer |
| Receive Allah's descent in the last third | Sahih al-Bukhari 1145 | Abu Hurayrah — "Our Lord descends to the lowest heaven when the last third remains…" |

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — all 3 ratchets at 0
- Preview at port 5173 — `qiyam-rest` confirmed rendering in spine cycle alongside witr, bedtime, tahajjud; no console errors

## Carries forward (Phases 2–4 of plan)

- Phase 2: `sahari` node anchored on Aladhan `Imsak` key
- Phase 3: adhan-response dua content embedded in 5 prayer nodes' `before` phase
- Phase 4: Jumu'ah Friday spine variant with day-of-week branching infra
