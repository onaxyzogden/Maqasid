# Design Spec: Hadith + Ayah Enrichment Pipeline

**Date:** 2026-04-16
**Project:** MILOS V2.1
**Status:** Approved

---

## Context & Motivation

1,829 subtasks exist across the Seven Maqasid seed-task files. Only 3 currently carry a `sources` field (all in Faith/Shahada). Every other subtask has no Islamic grounding attached to it — a gap that weakens the covenant integrity of the content.

This pipeline uses **quranMCP** (`@quranmcp/server`) as a Claude Code authoring tool to systematically search for and propose Sahih-graded hadith and Quranic ayat for each subtask. A human review gate ensures nothing is injected without explicit approval.

### Theological Rationale for Sahih-Only Constraint

The Sahih-only filter is grounded in the Sunnah itself:

> *"Da' mā yuribuka ilā mā lā yuribuka"* — "Leave what makes you doubt for what does not make you doubt."
> — Tirmidhi 2518, Nasa'i 5711 (Sahih)

> "The halal is clear and the haram is clear, and between them are doubtful matters that most people do not know. Whoever avoids the doubtful has protected his religion and honour..."
> — Bukhari 52, Muslim 1599 (Sahih)

If a hadith's authenticity is in doubt, the more pleasing act before Allah ﷻ is to leave it rather than use it. No Hasan, Da'if, or ungraded narrations are included — ever.

---

## Architecture

Two scripts separated by a human review gate:

```
Script 1 (generate)                   Human gate             Script 2 (write-back)
────────────────────                  ──────────             ─────────────────────
Read all 1,829 subtasks         →     Review file     →     Patch approved entries
call search_hadith_by_topic           approve/reject          into seed-task files
call search_quran_by_topic            each candidate          update sources field
filter: Sahih grade only
output: enrichment-candidates.md
```

No runtime dependency. Both scripts are dev-only. quranMCP is a Claude Code MCP server, not a project package dependency.

---

## MCP Setup

Add to `.claude/settings.local.json` under `mcpServers`:

```json
"mcpServers": {
  "quran": {
    "command": "npx",
    "args": ["-y", "@quranmcp/server"]
  }
}
```

- `-y` skips the npx install prompt
- No authentication or environment variables required
- Tools available: `search_hadith_by_topic`, `search_quran_by_topic`, `search_hadith`, `search_quran`, tafsir tools, and 12 others
- Source collections: Six Major Collections (Sahih Bukhari, Sahih Muslim, Sunan Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah — 34,000+ hadiths), Quran via multiple editions

---

## Script 1: Candidate Generator

**File:** `scripts/generate-hadith-candidates.mjs`

**Trigger:** Run by Claude in an authoring session when enrichment is needed (full backlog or targeted subsets).

### Logic

1. Load all 7 seed-task files via dynamic `import()` (same pattern as `extract-subtask-matrix.mjs`)
2. For each subtask:
   - If `subtask.sources` already exists and is non-empty → **skip** (preserve existing work)
   - Build a search query from `subtask.title` (most semantically dense field)
   - Call `search_hadith_by_topic(query)` → keep only results where `grade === 'Sahih'`; take top 3 (fewer if less available)
   - Call `search_quran_by_topic(query)` → take top 3 ayat (fewer if less available)
   - If both return zero results → mark `NO_RESULTS` (explicit flag, not silent omission)
3. Process in batches of 20 with a 500ms delay between batches to avoid hammering external APIs
4. Write output to `stages/hadith-enrichment-candidates.md`

### Output File Format

One block per subtask:

```markdown
## [faith > shahada > Core] Recite the full Shahada with correct pronunciation

**Status:** PENDING

### Hadith Candidates (Sahih only)
- [ ] Bukhari 8 — "Islam is built on five pillars..."
- [ ] Muslim 16 — "..."

### Ayah Candidates
- [ ] 2:285 — [Arabic] — [Translation]
- [ ] 3:18 — [Arabic] — [Translation]

```

**Status values:**
- `PENDING` — awaiting review
- `APPROVE` — include in write-back
- `REJECT` — do not include
- `NO_RESULTS` — no Sahih hadith and no ayat found; leave sources empty for now

Candidates are marked by checking boxes (`- [x]`) and changing `PENDING` → `APPROVE`.

---

## Script 2: Write-back

**File:** `scripts/apply-hadith-sources.mjs`

**Trigger:** Run by Claude only after you have reviewed and marked the candidates file. Never automatic.

### Logic

1. Parse `stages/hadith-enrichment-candidates.md`
2. Collect all blocks where `Status: APPROVE`
3. For each approved block:
   - Identify the target seed file by pillar
   - Locate the matching subtask by key (pillar + submodule + level) and `subtask.title` (exact match)
   - Format the `sources` string from checked candidates using the standard markdown format (see below)
   - Inject the `sources` field into the subtask object
   - **Will not overwrite** an existing non-empty `sources` field — safe to re-run
4. Print summary: N updated, M skipped (already sourced), K still `NO_RESULTS`

### Sources Field Format

Matching the existing pattern in `faith-seed-tasks.js`:

```
**I. Sources from the Quran**

### [Surah Name] ([Surah:Ayah])
**Arabic:** [Arabic text]
**Translation:** [English translation]

---

**II. Sources from the Hadith**

### [Collection] [Number]
[Hadith text]
*(Grade: Sahih)*
```

---

## Files

| File | Action | Notes |
|---|---|---|
| `.claude/settings.local.json` | Modify | Add `mcpServers.quran` entry |
| `scripts/generate-hadith-candidates.mjs` | Create | Script 1 |
| `scripts/apply-hadith-sources.mjs` | Create | Script 2 |
| `stages/hadith-enrichment-candidates.md` | Generated | Review file — human-owned once generated |
| `src/data/seed-tasks/*.js` | Modified by Script 2 | Only after human approval |

---

## Constraints

- **Sahih grade only** — no exceptions. Hasan, Da'if, Mawdu', or ungraded narrations are discarded at the filter step and never reach the review file.
- **Human gate is mandatory** — Script 2 never runs automatically. Claude runs it only after the user has reviewed the candidates file.
- **No overwrite** — subtasks with existing `sources` fields are skipped by both scripts.
- **No runtime dependency** — quranMCP is a dev/authoring tool only. The seed files remain static JS; the app has no API calls at runtime.
- **Explicit NO_RESULTS** — gaps are surfaced, not hidden. A subtask with no Sahih hadith and no matching ayat gets flagged so it can be addressed differently (e.g., manual sourcing by a scholar).

---

## Verification

1. After MCP setup: confirm `search_hadith_by_topic` is callable in a Claude Code session
2. After Script 1 runs: `stages/hadith-enrichment-candidates.md` exists, contains blocks for all subtasks without existing sources, Sahih-only hadith in candidates
3. After human review and Script 2 runs: spot-check 3 subtasks in seed files — `sources` field present, formatted correctly, matches an approved candidate
4. Re-run Script 1: previously sourced subtasks are skipped (skip count matches)
5. Re-run Script 2: no changes made (idempotent)
