---
date: 2026-04-26
status: shipped
tags: [prophetic-path, sunnah, witr, milos]
related: [2026-04-25-milos-prophetic-path-spine, 2026-04-18-milos-grounding-two-axis]
---

# PropheticPath — Witr Node (13th Spine Node)

## Context

The PropheticPath spine carried 12 grounded transition nodes (isha → bedtime → tahajjud → fajr → duha → morning → qaylulah → dhuhr → midday-labor → asr → after-asr → maghrib). Witr — the odd prayer the Prophet ﷺ never abandoned in residence or travel — sat as a vague `transition:post-witr` tag without its own node. This left a structural gap between Isha (offset 0) and bedtime (+60), and meant the timeline sidebar showed only generic Isha content during the witr window.

## Decision

Add `witr` as the 13th spine node, anchored to Isha + 45 minutes, between `isha` and `bedtime`.

## Implementation

Six files touched:

1. **[src/components/islamic/PropheticPath.jsx](../../src/components/islamic/PropheticPath.jsx)** — added `Star` to lucide-react imports; inserted `NODE_TIMING.witr = { key: 'Isha', label: 'Witr', offsetMin: 45 }` and the corresponding `NODES` entry between isha and bedtime.
2. **[src/data/prophetic-path-submodules.js](../../src/data/prophetic-path-submodules.js)** — added `TOD_SUBMODULES.witr` with matchers (`witr`, `al-witr`, `odd-rak'ah`, `qunut`, `transition:witr`); added `witr: 'Isha'` to `NODE_TIMING_KEY`; updated `inferNodeFromHour` so `h<21 → isha`, `h<22 → witr`, `h≥22 → bedtime`.
3. **[src/components/islamic/TimelineIslamicContent.jsx](../../src/components/islamic/TimelineIslamicContent.jsx)** — added `NODE_META.witr = { label: 'Witr', ar: 'الوتر', accent: '#9333ea' }`.
4. **[src/data/islamic/time-based-content.js](../../src/data/islamic/time-based-content.js)** — added `TIME_CONTENT.witr` with before/during/after intent objects citing Bukhari 998, Abu Dawud 1422, Muslim 755.
5. **[src/data/seed-tasks/prayer-seed-tasks.js](../../src/data/seed-tasks/prayer-seed-tasks.js)** — added `classifyTask` mapping `transition:witr → ['prayer_isha_after']`.
6. **[src/data/seed-tasks/faith-seed-tasks.js](../../src/data/seed-tasks/faith-seed-tasks.js)** — added parent task "Salat al-Witr — seal the night with the odd prayer" with 4 grounded subtasks at the end of `faith_salah_growth`.

## Grounding (all Bayyinah / Sahih)

| Subtask | ref | hadith |
|---|---|---|
| Pray witr every night between Isha and Fajr | Bukhari 998 + Muslim 751a | "Make the last of your night prayer witr"; "When one of you fears the dawn, pray one rak'ah" |
| Choose 1, 3, or 5 rak'ahs | Abu Dawud 1422 | Abu Ayyub al-Ansari — explicit prophetic authorization |
| Decide: witr now or after tahajjud | Muslim 755a | Jabir — confidence-of-waking decision rule |
| Add qunut dua | Abu Dawud 1425 | Hasan ibn Ali — "Allahumma ihdini fiman hadayt..." |

**Rejected from citation set:** Abu Dawud 1418 + Tirmidhi 452 (red-camels narration) — both Da'if per al-Albani / Darussalam. The all-Sahih set above suffices.

## Verification

- `npm test` — 40/40 pass
- `npm run lint` — all 3 ratchets at 0 (legacy 0/8, empty-array 0, inline-refs 0/77)
- Preview at port 5173 — 13 nodes render in chronological cycle; sidebar shows witr-specific content during 21:00–22:00 window

## Carries forward

- `transition:post-witr` tag on legacy tasks remains untouched; node-level routing uses `transition:witr`.
- The qaylulah-style "rest" node analog for the post-witr→pre-tahajjud sleep window is deferred — that's a sleep node, not a prayer node, and crossing into bedtime territory.
