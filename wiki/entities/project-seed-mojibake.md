---
title: "Seed/Data Mojibake (UTF-8 ↔ cp1252 corruption)"
type: entity
created: 2026-07-25
updated: 2026-07-26
tags: [milos, data-integrity, encoding, bug, grounding, quran]
sources: 1
---

# Seed/Data Mojibake (UTF-8 ↔ cp1252 corruption)

A pre-existing data-integrity defect in MILOS seed/data files: non-ASCII characters (arrows `→`, curly apostrophes/quotes, em/en dashes, accented Latin letters) are stored as **mojibake** — the classic double-encoding where UTF-8 bytes were written, then read back and re-saved as cp1252 (Windows-1252). The intended `→` shows up as `â†'`; `'` as `â€™`; `—` as `â€"`; `é` as `Ã©`. The project [[milos]] `CLAUDE.md` explicitly warns about this hazard ("Watch for cp1252/UTF-8 encoding issues when reading/writing files").

## Key Facts

- **Discovered** 2026-07-25 while verifying the [[2026-07-25-milos-orientation-carousel-redesign]] carousel: the Health pillar's recommended task title rendered "Fajr **â†'** Quran (minimum 1 page) **â†'** morning adhkar **â†'** journal" (intended: `→` arrows). Health was the recommended (weakest) pillar, so the corruption sat at the top of the redesigned UI.
- **Scope (grep `â€|â†|Ã©|Ã¨|â€™|â€œ|Â·|Â `):** 485 occurrences across **3 files** —
  - `src/data/seed-tasks/health-seed-tasks.js` — **388** (nearly every non-ASCII char; confirmed at line 1920).
  - `src/data/ayat/health-readiness-ayat.js` — **87**. ⚠️ **Qur'an-verse data — covenant-sensitive.**
  - `src/data/niyyah-feelings.js` — **10**.
- Other `src/` files scanned clean; the corruption is concentrated, suggesting these specific files went through one bad encoding round-trip (not a systemic write-path bug).
- Claude's `Write`/`Edit` tools produce correct UTF-8 here (the wiki files carry ʿ, ā, ḥ, Arabic, em dashes intact) — this corruption was introduced upstream of this session, not by it.

## Current Status

**Resolved 2026-07-26** (uncommitted, pending operator covenant review of the ayat file — see [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]]). All 485 occurrences repaired in the working tree on `feat/desktop-pillar-glyphs`; repo mojibake grep is 0 outside this page's intentional examples.

**Persisted-title / display dimension — also resolved 2026-07-26** (see [[2026-07-26-milos-orientation-title-repair-font-split]]). The seed-file repair above cleaned the *source of truth*, but any title already saved to a user's `localStorage` **before** that repair still held the corruption — and because seed static content (`description`/`sources`/`tier`/`why`/`how`) is never persisted and re-hydrates by **title-join** at read time, a corrupt persisted title misses the now-clean seed and the task renders bare (garbled title, empty guidance, no sources, "Ungrounded"), while the idle backfill appends a clean duplicate beside the orphan. A one-shot migration (`repairMojibakeTaskTitles`, independent flag `bbiz_mojibake_titles_repaired`, run before the `SCHEMA_VERSION` guard) now reverses the mojibake in persisted task+subtask titles by the same proven byte-reversal, with loss-proof dedup of the duplicate; a `seed-hydrator` fallback that retries the lookup with `repairMojibake(title)` permanently immunizes *content* against any mojibake re-introduced via import/restore. This is the runtime/data half of the defect — the seed-file repair fixed the files it ships, this fixes the corruption that already escaped into saved data.

## How It Was Fixed (differs from the original guidance — recorded for the pattern)

- **git-restore of a clean revision turned out NOT viable for any of the 3 files**: the ayat file was *born corrupt* (`cfad9dd` is its only commit — there is no clean predecessor); niyyah/health-seed's clean revisions (`83839ee` / `fe0a5a9`) predate legitimate later work (the life→health rename, the whole grounding build-out), so restoring them would destroy it.
- **The corruption was a single lenient cp1252 round-trip, fully lossless**: zero U+FFFD, zero dropped bytes. The corrupting decoder mapped even the 5 cp1252-undefined bytes (0x81/0x8D/0x8F/0x90/0x9D) to their C1 control codepoints, so encoding the mojibake back to cp1252 (with a C1 fallback for those five — a naïve `encode('cp1252')` throws on them) and decoding as UTF-8 recovers the **exact original bytes**.
- The fix content came from commit `9f87e8d` (branch `claude/sleepy-lamarr-3f62e8`, authored by a parallel session) and was **proven, not trusted**: an independent scratchpad script applied the mechanical reversal to HEAD's corrupted bytes and byte-diffed against `9f87e8d`'s blobs — **byte-identical for all 3 files** (5,285 / 36,824 / 543,838 bytes). Zero invented or approximated text, including the Qur'an Arabic — the Amanah constraint held by construction.
- The corrupter-added UTF-8 BOM on `niyyah-feelings.js` is gone; residual `â` sequences in health-seed are legitimate Hilali-Khan orthography (Allâh, Ibrâhîm, Qur'ân, Ayât…), not corruption.
- Gates stayed green with no reconciliation needed: `ref:` fields were clean ASCII throughout, so `npm test` (102/102), `lint:grounding-strict`, and `audit:inline-refs` (ratchet 0) passed untouched.
- **Not fixed (out of scope):** mirror copies of the corruption inside `.claude/worktrees/*` (separate worktree checkouts, incl. `vigilant-buck-1a9ff0`'s `tasks/life-ref-index.json` + `tasks/life-review-worklist.md`).

## Connections

- [[milos]] — the affected project; its `CLAUDE.md` warns about this exact class of bug
- [[2026-07-25-milos-orientation-carousel-redesign]] — the session that surfaced it
- [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]] — the seed-file repair decision + proof method (source-of-truth half)
- [[2026-07-26-milos-orientation-title-repair-font-split]] — the persisted-title migration (runtime/saved-data half) + the display symptoms it fixed
- [[amanah-gate]] — the ayat-file corruption makes this a covenant concern, not just a cosmetic one
- [[project-seed-arabic-translation-defect]] — sibling defect in the same files, found in passing during this repair: an *authoring* gap (English translation prose in `arabic:` fields), not encoding; audited and resolved 2026-07-26 (dual-source verified backfill, uncommitted)

## History

- 2026-07-25: Discovered during orientation-redesign verification; quantified (485 occ / 3 files); flagged as `task_2e56b6bf`; page created. See [[2026-07-25-milos-orientation-carousel-redesign]].
- 2026-07-26: Repaired via `9f87e8d` restore + independent byte-reversal proof; sweep 0; gates green; ayat file queued for operator covenant review before commit. See [[2026-07-26-milos-mojibake-repair-glyphs-loader-fix]].
- 2026-07-26: **Persisted-title / display dimension resolved** — a one-shot `localStorage` migration (`repairMojibakeTaskTitles`) reverses mojibake in saved task+subtask titles (independent flag, loss-proof dedup) + a `seed-hydrator` miss-fallback immunizes content hydration; the garbled orientation step now renders clean (title, Why/How, Qur'an Evidence, Grounded). See [[2026-07-26-milos-orientation-title-repair-font-split]].
