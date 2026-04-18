---
title: "MILOS Grounding — Two-Axis Evidence Schema"
date: 2026-04-18
status: accepted
tags: [grounding, amanah-gate, schema, sources, tiered-evidence]
---

# Decision: Two-axis evidence schema for subtask grounding

## Context

The MILOS universal-grounding plan requires grading Quran/Hadith citations against 1,829 subtasks. Two separate questions need answering per citation:

1. **How verified is this evidence-of-progression?** — governs subtask advancement (Amanah Gate Protocol).
2. **How directly does this verse support this subtask's design?** — governs Sources card display quality.

The draft prompt supplied by the user conflated these two axes under the same tier names (Bayyinah / Qarina / Niyyah), which would have caused UI-level collision with `GLabelBadge` and the existing G-label system.

## Decision

Keep the canonical Amanah Gate tier names exactly as defined in `wiki/concepts/amanah-gate-protocol.md`. Add a second, clearly named axis for citation-to-subtask relevance:

| Axis | Field | Values | Governs |
|---|---|---|---|
| Data provenance | `provenanceTier` | `Bayyinah` \| `Qarina` \| `Niyyah` | Subtask advancement gate |
| Scriptural relevance | `relevance` | `direct` \| `contextual` \| `thematic` | Sources card display; grounding bar |

The Niyyah-blocks rule (`Bayyinah` and `Qarina` may advance; `Niyyah` alone blocks) applies to `provenanceTier` only.

## Consequences

- `GLabelBadge` and all existing G-label rendering are untouched.
- The grounding bar (§3 of `docs/grounding-schema.md`) uses both axes: at least one entry must have `provenanceTier ∈ {Bayyinah, Qarina}` AND `relevance ∈ {direct, contextual}`.
- Phase 6 (MILOS-side Amanah gate UI) should add a Sources-card relevance chip using the new `relevance` field — not a new tier badge.
- Any reuse of this pattern in BBOS or MTC should go through the Amanah Gate Protocol conformance test (`wiki/concepts/amanah-gate-protocol.md §Conformance Test`).
