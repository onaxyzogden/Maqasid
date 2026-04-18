---
title: "NotebookLM Grounding Corpora"
type: reference
created: 2026-04-18
updated: 2026-04-18
tags: [notebooklm, grounding, quran, hadith, islam, prompt-engineering]
---

# NotebookLM Grounding Corpora

Two notebooks wired into the MILOS universal-grounding pipeline (see `docs/grounding-runtime-prompt.md`).

## Muslim Scholar
**ID:** `1c17b03b-3537-4fde-b5ba-562dbe0c1aab`
**Contents:** Quran, Hadith, tafsir, fiqh — primary Islamic source material.
**Role:** Citation retrieval. Query this notebook to find Quranic ayat and hadith candidates for grading subtask sources against the Amanah Gate Protocol tiers (Bayyinah / Qarina / Niyyah).
**When to query:** During grading passes (Phases 2–5 of the grounding plan). Also usable via `/notebooklm 1c17b03b-3537-4fde-b5ba-562dbe0c1aab` for one-off lookups.
**Never:** Use this ID as the "query-craft" corpus. Its job is to return cited content, not methodological guidance.

## Claude (Prompt) Scholar
**ID:** `91d2bd2b-b786-4f0e-a846-6be740ec05ab`
**Contents:** Prompt engineering and Claude best practices — grounding notes on Opus 4.7 literalism, effort calibration, multi-session continuity, agentic patterns.
**Role:** Query formulation only. Before querying Muslim Scholar, ask Claude Scholar how to phrase the retrieval query for maximum precision.
**When to query:** At the start of each subtask grading batch, to formulate the Muslim Scholar query. Not at citation time.
**Never:** Surface Claude Scholar content in a `sources[]` entry, `rationale` field, or any grading output. It shapes *how* we ask, not *what* we cite.

## Corpus discipline rule

> Muslim Scholar answers *what*. Claude Scholar shapes *how*. Never cross the streams.

This rule is enforced in `docs/grounding-runtime-prompt.md §7` (Invariants) and §4 (Grading procedure).

## Related

- `docs/grounding-schema.md` — structured `sources[]` shape and tier definitions
- `docs/grounding-runtime-prompt.md` — full operational runtime using both corpora
- `wiki/concepts/amanah-gate-protocol.md` — Bayyinah / Qarina / Niyyah tier definitions
