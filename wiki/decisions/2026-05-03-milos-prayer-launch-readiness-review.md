---
date: 2026-05-03
project: milos
status: accepted
tags: [prayer, grounding, launch-readiness, two-axis-schema, all-pillars-done]
---

# 2026-05-03 — Prayer Pillar Launch-Readiness Grounding Review

## Context

Prayer was the last remaining pillar in the per-pillar grounding pass (Faith, Health/Life, Intellect, Family, Wealth, Environment, Ummah, Moontrance had all already cleared on 2026-05-02 / 2026-05-03). With Prayer cleared, **all nine pillars are launch-ready**.

This session ran the same dedup-first NotebookLM Muslim Scholar protocol established by Moontrance and Ummah — but added the WebFetch-to-sunnah.com fallback as a primary tool when NotebookLM disclaimed "not in source corpus" (the protocol upgrade documented in [[2026-05-03-milos-ummah-launch-readiness-review]]).

## Tooling

- New script `scripts/prayer-worklist.mjs` (kept in tree, not wired to npm) — sed-derived from `scripts/ummah-worklist.mjs` with all `ummah` identifiers replaced with `prayer`.
- New script `scripts/prayer-fixes.mjs` (kept in tree) — one-shot byte-level patcher with idempotent before/after match. Adopted because the inline `Edit` tool repeatedly failed to match strings containing literal `—` and `ﷺ` JS escape sequences alongside actual UTF-8 ā characters; the script bypasses that ambiguity by using exact byte matches in JS template literals.
- NotebookLM Muslim Scholar (`be921648-2088-4860-bdd8-283a5e7301f3`) — used for one batched probe; superseded mid-session by WebFetch when corpus coverage was incomplete.
- `WebFetch` to sunnah.com — primary verification tool for prayer-fiqh hadith refs (8 parallel fetches).

## Worklist

`tasks/prayer-worklist.md` (87 subtasks scanned across 9 prayer-time boards):

- **0** ratNote-flagged subtasks.
- **38** single-source subtasks.
- After cross-pillar dedup against the eight other pillars: **10 truly novel single-source entries**, 28 inheriting verdicts from prior pillar verification.

## Outcomes

### WebFetch verdicts (8 unique novel hadith refs)

| Ref | Subtask(s) | sunnah.com verdict | Action |
|---|---|---|---|
| Sahih Muslim 728a | Dhuhr Sunnah-before/-after, Maghrib Sunnah-after, Isha Sunnah-after | Confirmed Sahih, matn names the 12-rakʿat-in-day-and-night = house in Paradise promise. Does **not** enumerate which 12. | **Relevance downgraded direct → contextual** on three of four cites (Maghrib Sunnah-after was already correctly tagged contextual). |
| Sahih al-Bukhari 759 | Dhuhr Farḍ + Asr Farḍ (multi-source) | sunnah.com confirms 759 is a different matn (Al-Fatiha + 2 surahs in first 2 rakʿat); the "movement of beard" matn the seed cites is at **Bukhari 760**. | **Ref renumbered 759 → 760** in both occurrences (incl. amanahRationale + why-prose). |
| Sahih al-Bukhari 765 | Maghrib Farḍ | Confirmed Sahih, matn names a single instance (Surat at-Tur in Maghrib) — not the operative aloud/silent ruling. | **Relevance downgraded direct → contextual** with ratNote. |
| Jami at-Tirmidhi 430 | Asr Sunnah-before | Already verified-elsewhere — no change. | — |
| Sahih al-Bukhari 627 | Isha Sunnah-before | Confirmed Sahih agreed-upon, matn names the general adhan-iqama window — not Isha-specific 4-rakʿat. | **Relevance downgraded direct → contextual** with extended ratNote (preserving the prior 2026-04-26 verification note). |
| Sahih al-Bukhari 657 | Isha Farḍ | Confirmed Sahih, matn is the prophetic diagnostic on Isha/Fajr congregation weight — not the four-rakʿah aloud/silent structural ruling. | **Relevance downgraded direct → contextual** with ratNote. |
| Abu Dawud 1422 / Sahih Muslim 752 | Witr | Multi-source, both well-attested across the wider corpus. | **No change.** |
| Sahih al-Bukhari 6410 / Muslim 2677 | Witr (oddness preference) | Multi-source, well-attested. | **No change.** |

### Defects fixed (10 inline patches across 7 subtasks)

| # | File:line | Subtask | Change |
|---|---|---|---|
| 1 | `prayer-seed-tasks.js:101` | Dhuhr Sunnah-before (Muslim 728a) | relevance direct → contextual + ratNote |
| 2a | `prayer-seed-tasks.js:113` | Dhuhr Farḍ amanahRationale | "Bukhari 759" → "Bukhari 760" |
| 2b | `prayer-seed-tasks.js:114` | Dhuhr Farḍ why-prose | "Bukhari 759" → "Bukhari 760" |
| 3 | `prayer-seed-tasks.js:143` | Dhuhr Sunnah-after (Muslim 728a) | relevance direct → contextual + ratNote |
| 4a | `prayer-seed-tasks.js:184` | Asr Farḍ amanahRationale | "Bukhari 759" → "Bukhari 760" |
| 4b | `prayer-seed-tasks.js:119+190` | Both Bukhari 759 source refs | renumbered to 760 (replace-all) |
| 5 | `prayer-seed-tasks.js:232` | Maghrib Farḍ (Bukhari 765) | relevance direct → contextual + ratNote |
| 7 | `prayer-seed-tasks.js:293` | Isha Sunnah-before (Bukhari 627) | relevance direct → contextual + extended ratNote |
| 8 | `prayer-seed-tasks.js:315` | Isha Farḍ (Bukhari 657) | relevance direct → contextual + ratNote |
| 9 | `prayer-seed-tasks.js:336` | Isha Sunnah-after (Muslim 728a) | relevance direct → contextual + ratNote |

(Maghrib Sunnah-after, Muslim 728a cite at line 263 was inspected and **left unchanged** — already correctly tagged contextual.)

## Schema reasoning

Per [[2026-04-18-milos-grounding-two-axis]]:
- `direct` = matn names the practice or operative ruling.
- `contextual` = same topic by inference; matn does not name the specific application.

The seven downgrades all share one pattern: the cited hadith names a *broader* operative ruling (twelve-rakʿat promise; adhan/iqama window; congregational diagnostic; specific surah recitation) and the seed subtask cites it as evidence for a *narrower* application (4 before Dhuhr; 2 after Dhuhr; Isha-specific count; aloud/silent structure of Maghrib's three rakʿat). The narrower application follows by inference from the broader ruling — that is the canonical contextual case.

## Verification

- `npm test`: **61/61 pass**.
- `npm run lint`: `[STRICT] OK` — all three ratchets at minimum (per-pillar legacy 0, empty-array 0, inline-refs 0); 78 inline refs across the corpus, 0 missing-from-sources.

## Decision

The Prayer pillar (87 subtasks across 9 prayer-time boards) is **launch-ready**.

## Pillar grounding-readiness status — final

| Pillar | Status | ADR |
|---|---|---|
| Faith | Launch-ready | [[2026-05-02-milos-faith-launch-readiness-review]] |
| Health/Life | Launch-ready | (per Faith ADR) |
| Intellect | Launch-ready | (Batch-4) |
| Family | Launch-ready | (Batch-4) |
| Wealth | Launch-ready | (Batch-4) |
| Environment | Launch-ready | (Batch-4) |
| Ummah | Launch-ready | [[2026-05-03-milos-ummah-launch-readiness-review]] |
| Moontrance | Launch-ready | [[2026-05-03-milos-moontrance-pillar-hard-split-and-grounding-pass]] |
| **Prayer** | **Launch-ready (this ADR)** | this |

**All 9 pillars launch-ready.** The grounding migration arc that began with the two-axis schema decision on 2026-04-18 is complete.

## Files Changed

- `src/data/seed-tasks/prayer-seed-tasks.js` — 10 inline patches across 7 subtasks (relevance downgrades + Bukhari 759→760 renumber + ratNotes).
- `scripts/prayer-worklist.mjs` (new, in-tree).
- `scripts/prayer-fixes.mjs` (new, in-tree) — kept for replay value and as the canonical example of the byte-level patch script pattern when `Edit` cannot match mixed-escape strings.

## Tooling note: the Edit-tool escape-mismatch trap

Several `Edit` calls in this session failed to match strings containing both literal `—` JS escapes and actual UTF-8 multibyte characters (ā, ʿ) on the same line. The Edit tool's auto-swap-between-escape-and-character heuristic appears not to handle this combination. Going forward, when patching `*-seed-tasks.js` files with mixed escape conventions, the byte-level script pattern in `scripts/prayer-fixes.mjs` is the reliable approach.

## References

- Worklist: `tasks/prayer-worklist.md`
- Patch script: `scripts/prayer-fixes.mjs`
- Schema: [[2026-04-18-milos-grounding-two-axis]]
- Protocol precedent: [[2026-05-03-milos-ummah-launch-readiness-review]], [[2026-05-03-milos-moontrance-pillar-hard-split-and-grounding-pass]], [[2026-05-02-milos-faith-launch-readiness-review]]
- NotebookLM corpora: [[notebooklm-grounding-corpora]]
