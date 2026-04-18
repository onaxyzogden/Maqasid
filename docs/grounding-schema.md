# MILOS Subtask Grounding Schema

**Status:** Phase 0 deliverable, universal-grounding plan
**Governs:** every `sources` entry attached to a subtask in `src/data/seed-tasks/*.js` and to any module in `src/data/islamic/islamic-data.js`
**Companion:** [Amanah Gate Protocol](../wiki/concepts/amanah-gate-protocol.md) (authoritative tier definitions)
**Linter:** `scripts/lint-grounding.mjs`

---

## 1. Why a schema

The existing `sources` field on each subtask is a free-form Markdown string (see `src/data/seed-tasks/faith-seed-tasks.js:14+`). That shape shipped the Sources view but leaves four things unverifiable at scale:

1. Whether each citation is actually a primary source vs. a derivative mention.
2. How *directly* the citation supports the subtask (exegesis, analogy, or thematic resonance).
3. Which NotebookLM query produced the citation (traceability for audit).
4. Whether the subtask has met its grounding bar at all.

A structured schema makes each of those machine-checkable while preserving the existing Markdown-string entries as a legacy shape the linter will flag for migration.

---

## 2. Two orthogonal axes

The draft "Islamic Jurisprudence Research Agent" prompt and the shipped Amanah Gate Protocol both use *Bayyinah / Qarina / Niyyah* — but for different questions. This schema keeps them separate to avoid UI-level collision with `GLabelBadge`.

| Axis | Question it answers | Values | Authority |
|---|---|---|---|
| **`provenanceTier`** | How verified is this *evidence-of-progression-claim*? | `Bayyinah` \| `Qarina` \| `Niyyah` | [Amanah Gate Protocol](../wiki/concepts/amanah-gate-protocol.md) — unchanged |
| **`relevance`** | How directly does this citation support *the subtask's existence or design*? | `direct` \| `contextual` \| `thematic` | This doc |

`provenanceTier` continues to govern subtask advancement per the universal rule: **Bayyinah and Qarina may advance; Niyyah alone blocks.** `relevance` is display-only metadata attached to citations so the Sources card can signal how load-bearing each verse or hadith is for the subtask.

### `relevance` definitions

- **`direct`** — the text names the practice, commands or prohibits it explicitly, or supplies the operative ruling. A reader does not need external inference to connect the citation to the subtask.
- **`contextual`** — the text addresses the same topic or principle and supports the subtask by reasonable inference (asbāb al-nuzūl, parallel hadith, adjacent ruling).
- **`thematic`** — the text aligns with the spirit of the subtask (its underlying Maqsad, virtue, or warning) without a direct textual link. Admissible as supplementary, not sufficient alone.

### Why not overload the tiers

If `Niyyah` meant both "user hasn't evidenced this yet" (Amanah Gate) and "citation is only thematic" (grounding agent), a Sources card would render the same badge for two incompatible meanings. A user could then read a verse marked `Niyyah` and infer *the subtask itself is unconfirmed* — false, and theologically sensitive. The two-axis split keeps each word doing exactly one job.

---

## 3. Target entry shape

Each subtask SHOULD carry `sources` as an **array** of entries conforming to this shape. Free-form Markdown strings (the legacy shape) are TOLERATED by the renderer but FLAGGED by the linter for migration.

```ts
type GroundingSource = {
  kind: "quran" | "hadith";
  ref: string;             // canonical ref: "Quran 47:19" | "Sahih Bukhari 8"
  arabic?: string;         // Arabic text of the cited passage
  translation: string;     // English translation
  relevance: "direct" | "contextual" | "thematic";   // see Section 2
  provenanceTier: "Bayyinah" | "Qarina" | "Niyyah";  // see Amanah Gate Protocol
  rationale: string;       // 1-3 sentences: WHY this citation, WHY this relevance
  hadithGrade?: "Sahih" | "Hasan" | "Daif" | "Mawdu" | string;  // hadith only
  notebookTrace?: {        // audit trail when sourced via /notebooklm
    corpusId: string;      // e.g. "1c17b03b-3537-4fde-b5ba-562dbe0c1aab"
    query: string;
    retrievedAt: string;   // ISO 8601
  };
};
```

### Required fields per entry

`kind`, `ref`, `translation`, `relevance`, `provenanceTier`, `rationale` are required on every entry. `arabic` is required for `kind: "quran"` and recommended for hadith. `hadithGrade` is required for `kind: "hadith"`.

### Subtask-level grounding bar (proposed default)

A subtask is considered **grounded** when:

1. `sources` is a non-empty array.
2. At least one entry has `provenanceTier in { Bayyinah, Qarina }` *and* `relevance in { direct, contextual }`.

A subtask whose only entries are `provenanceTier: Niyyah` or `relevance: thematic` is **not grounded** — it has aspirational or merely thematic citations. Such subtasks surface in the linter report for reviewer attention; they do not fail the build.

---

## 4. Legacy Markdown-string shape

Every currently-shipped subtask has `sources` as a string with this approximate structure:

```
**I. Quran**
### Quran (47:19)
**Arabic:** …
**Translation:** …

**II. Hadith**
### Sahih Bukhari 8
…
*(Grade: Sahih)*
```

The linter parses these by regex for presence-only checks. It cannot infer `relevance` or `provenanceTier` from them — those are human decisions during migration.

---

## 5. Linter output contract

`scripts/lint-grounding.mjs [--pillar=<id>] [--json]` emits:

- A per-subtask record: id path, has-sources, shape (`string` | `array` | `missing`), quran-count, hadith-count, grounded-bar met (`yes` | `no` | `unknown-legacy`).
- Per-pillar totals and a list of non-conforming subtasks.
- Exit code `0` if all subtasks at minimum have some `sources`; exit code `1` if any subtask is completely missing sources.

The linter is **read-only**. It does not modify seed-task files.

---

## 6. Migration sequence

Phase 0 ends here. Phase 1 builds the grounding harness. Phase 2+ migrates pillars one at a time from the legacy string shape to the structured array, with human review of every tier assignment.

Until a pillar is migrated, its entries remain legacy strings and the Sources view renders them as today. The schema and linter coexist with the legacy shape; no behavior breaks.

---

## 7. Niyyah-blocks rule (restated)

Inherited verbatim from the Amanah Gate Protocol and NOT relaxed by this schema:

> Bayyinah and Qarina may advance. Niyyah alone blocks.

Applied to subtask advancement: a subtask whose grounded citations are all `provenanceTier: Niyyah` cannot gate a user's progression even if the subtask's completion is otherwise claimed. This rule is enforced by Phase 6's MILOS-side Amanah Gate UI, not by this schema alone.
