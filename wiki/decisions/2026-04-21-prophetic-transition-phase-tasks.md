---
title: "Prophetic transition sunnah: Morning & Isha-rest phase-task buckets"
type: decision
date: 2026-04-21
tags: [propheticpath, faith, sunnah, adhkar, schema]
status: accepted
---

# Decision — Transition-sunnah tasks for Morning & Isha-rest nodes

## Context

The sibling ADR [[2026-04-21-prophetic-prayer-phase-tasks]] introduced per-node `phaseMatchers` for the six **prayer** nodes (Isha, Tahajjud, Fajr, Dhuhr, Asr, Maghrib) and flagged an open gap:

> Morning and Isha-rest nodes have no `phaseMatchers` — the phase parameter is ignored there, so Before/Main/After render identical lists. Revisit if we author transition-specific sunnah.

The two non-prayer nodes sit at sunnah-dense thresholds (waking, morning-threshold, evening-threshold, pre-sleep) but the mirror rendered one undifferentiated list. This decision closes that gap.

## Decisions

### D1 — Reuse `prayer-phase:*` tag schema; no new schema

**Accepted:** Transition tasks carry the same `prayer-phase:before` / `prayer-phase:after` authoritative tags as prayer-node tasks, plus descriptive `transition:<kind>` tags (`transition:waking`, `transition:morning-adhkar`, `transition:evening-adhkar`, `transition:pre-sleep`, `transition:end-of-morning`) for auditability and matcher targeting.

**Why:** `buildTasksForNode` already scans title + tags for phase regexes. The phase-tag semantics generalise cleanly from "prayer-phase" to "node-phase" because the matcher pipeline is node-scoped. Introducing a parallel schema would fork the code path without adding signal.

### D2 — Add `faith-salah` to `morning.submodules`; add `phaseMatchers` to both non-prayer nodes

**Accepted:** The morning node was work/intellect/wealth-only. We added `faith-salah` so authored transition tasks can flow in, and added a complete `phaseMatchers` block (before/after). Isha's existing `phaseMatchers` was extended with evening-adhkar + pre-sleep regexes.

**Why:** The Morning node's Main bucket must stay the worldly-engagement complement (work/productivity/learning), so Before/After carve off the sunnah bookends — waking & morning adhkar → Before; end-of-morning Dhuhr-timing discipline → After.

### D3 — Five new parent tasks in `faith_salah_core`, with Amanah-Gate source blocks

**Accepted:** Authored under `faith_salah_core` (Daruriyyat / L1) because these are foundational prophetic practices:

1. **"Reclaim the day with the waking du'a and morning adhkar"** — 3 subtasks (Bukhari 6312 waking du'a, morning adhkar bundle Muslim 2723 + Tirmidhi 3391, Ishraq Muslim 670 + Tirmidhi 586).
2. **"Anchor the morning with Sayyid al-Istighfar and the daily-good du'a"** — 2 subtasks (Bukhari 6306, Abu Dawud 5084).
3. **"Recite the evening adhkar between Asr and Maghrib"** — 3 subtasks (Amsayna Muslim 2723, three Quls Abu Dawud 5082, Ayat al-Kursi Bukhari 2311).
4. **"Complete the prophetic pre-sleep sunnah"** — 5 subtasks (Ayat al-Kursi Bukhari 2311, Ikhlas/Falaq/Nas Bukhari 5017, Surah al-Mulk Tirmidhi 2891+2892, right-side sleep Bukhari 6314 + Muslim 2710, Bismika Allahumma Bukhari 6314).
5. **"Close the morning by praying Dhuhr at its first time"** — 1 subtask (Quran 4:103 + Bukhari 527).

Grounding corpus: Muslim Scholar NotebookLM `1c17b03b-3537-4fde-b5ba-562dbe0c1aab`. Raw round saved to `tasks/notebook-prophet-transition-sunnah.json` + `-answer.md` for drift audit.

### D4 — Narrow keyword fallbacks on Isha `phaseMatchers.after` to prevent cross-bucket leak

**Accepted:** Removed bare `dhikr|adhkar|istighfar|ayat al-kursi` keywords from Isha's `phaseMatchers.after`. Those keywords were pulling the morning Sayyid task and the evening-adhkar task (which legitimately enters the Isha pool via the "evening" keyword) into the After bucket, duplicating them across Before and After.

**Why:** The existing post-prayer adhkar seed task (line 2466 of `faith-seed-tasks.js`) already carries the `prayer-phase:after` tag, so the keyword fallback was redundant. Keyword matchers are safe when they're specific compound terms (`surah al-mulk`, `prophetic supplications`), not bare keywords that appear inside adjacent-phase task titles.

### D5 — Add "Close the morning" title regex to Morning main matchers

**Accepted:** Morning's main matchers pre-filter the scope pool by title. The new end-of-morning task's title ("Close the morning by praying Dhuhr at its first time") contained no work/productivity/learning keywords and no `transition:*` string in the title (only in tags). Added `/\bclose\s+the\s+morning\b/i` and `/\bpray.*dhuhr.*(?:first|earliest)\s+time\b/i` to admit it.

**Why:** The main-matcher pipeline is title-only (see `titleMatches()` at `prophetic-path-submodules.js:317`); tags are scanned only in the phase-matcher stage. Without this regex the task was excluded from the morning pool entirely.

## Consequences

**Positive:**
- Morning Before now shows the waking du'a + morning adhkar + Sayyid al-Istighfar stack.
- Morning After shows the "Close the morning → pray Dhuhr at its first time" discipline.
- Isha Before shows pre-prayer sunnah + evening adhkar (new) + Rawatib.
- Isha After shows post-prayer adhkar + pre-sleep sunnah bundle + muhasaba + prophetic supplications.
- All 14 new subtasks ship with Amanah-Gate source blocks (Quran + sahih hadith with grades) rendered in TaskDetailPanel → Sources.
- Seed backfill auto-appends the 5 new parent tasks to existing boards on next hydration via `backfillAndStripSeeds()`.

**Negative / tradeoffs:**
- Morning's main matchers are now title-specific for the "Close the morning" task — if we add more end-of-morning tasks, we'll need to either extend the regex list or migrate to tag-aware main matchers.
- Keyword-fallback tightening means any future post-prayer task authored without the `prayer-phase:after` tag will silently fall through Isha's After phase filter. Mitigated by the convention now being documented here; a lint that enforces `prayer-phase:*` on every faith-salah-node-scoped task would close it deterministically.

## Files

- `src/data/prophetic-path-submodules.js` — morning submodules + phaseMatchers; isha phaseMatchers tightened.
- `src/data/seed-tasks/faith-seed-tasks.js` — 5 new parent tasks (14 subtasks) in `faith_salah_core`.
- `tasks/notebook-prophet-transition-sunnah.json` — raw NotebookLM round.
- `tasks/notebook-prophet-transition-sunnah-answer.md` — rendered citation answer.

## Addendum (same day) — Tahajjud transition extension

Same-day follow-up extended the pattern to Tahajjud (previously covered Main only). Two new `faith_salah_core` parent tasks:

- **"Rise for Tahajjud with the prophetic waking protocol"** — 4 subtasks (wipe sleep + Al-Imran 3:190-200 Bukhari 4569; wake du'a Bukhari 1154; siwak Bukhari 245/Muslim 255; istiftah Muslim 770). Tags `prayer-phase:before`, `transition:tahajjud-waking`.
- **"Seal the night with the post-Witr adhkar and last-third du'a"** — 3 subtasks (Subhanal-Malikil-Quddus ×3 Nasa'i 1733/Abu Dawud 1430; Witr Qunut Abu Dawud 1425/Tirmidhi 464/Nasa'i 1745; last-third du'a Bukhari 1145/Muslim 758). Tags `prayer-phase:after`, `transition:post-witr`.

Tahajjud `phaseMatchers` extended with `transition:tahajjud-waking|post-witr` tag matchers plus specific keyword regexes (al-imran, istiftah, wake-du, subhanal-malik, qunut, last third, seal the night).

**D6 — Tahajjud main-matcher narrowing:** Removed bare `du'a|dua|supplication` and `guidance|decision` from Tahajjud's main matchers. Rationale: those generic keywords were admitting morning-transition tasks (whose titles contain "du'a") into Tahajjud's pool, from where the shared `prayer-phase:before` tag routed them into the Tahajjud Before bucket. Retained `munajat`, `istikhara`, `tahajjud`, `qiyam`, `night prayer`, `witr`, `khushu` — all of which are Tahajjud-specific enough not to leak.

Artifact: `tasks/notebook-prophet-tahajjud-transition.md`.

## Related

- Parent ADR: [[2026-04-21-prophetic-prayer-phase-tasks]]
- [[milos]] — PropheticPath section updated.
- Grounding corpus: NotebookLM Muslim Scholar `1c17b03b-3537-4fde-b5ba-562dbe0c1aab`.
