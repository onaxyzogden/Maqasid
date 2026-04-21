---
title: "Prophetic-prayer phase-tasks: schema + Before-button rewire"
type: decision
date: 2026-04-21
tags: [propheticpath, faith, salah, schema, sunnah]
status: accepted
---

# Decision — Prophetic sunnah task phase schema for PropheticPath

## Context

The PropheticPath timeline surfaces 7 time-of-day nodes. Each node exposes three affordances — **Before**, **Main** (card tap), **After**. Before this change:

- The **Before** button hijacked to open the Threshold ceremony modal (`setOpeningModuleId('faith-salah')`).
- **Main** and **After** rendered the *same* mirror task list; no phase distinction existed.
- `buildTasksForNode()` filtered tasks by submodule + title-regex only; no phase awareness.

The user requested: populate each prayer node with concrete prophetic sunnah actions (what the Prophet ﷺ did before/during/after each salah) sourced from the Muslim Scholar NotebookLM per Amanah-Gate grounding rules.

## Decisions

### D1 — Before button behaviour

**Accepted:** Before button calls `onToggle(node.id, 'before')` (same pattern as After). The Threshold ceremony remains reachable via module entry routes; it is no longer wired into PropheticPath.

**Why:** The Before slot is a fundamentally different UI surface from a modal — it lives in the timeline mirror where users already read phase-appropriate tasks. Threshold is a ceremony, not a task list; conflating them forced a modal on every node tap and prevented per-phase task rendering.

### D2 — Task shape: Hybrid

**Accepted:** Reuse existing salah tasks where they match a sunnah action (e.g., the existing wudu and Rawatib parent tasks stay under Fajr's before bucket by virtue of their content). Author **new dedicated parent tasks** for gaps:

- Pre-prayer sunnah (siwak, thorough wudu, adhan response, sutrah) → `faith_salah_core`
- Post-prayer adhkar (istighfar ×3, tasbih 33/33/34, Ayat al-Kursi) → `faith_salah_core`
- Ishraq (sit after Fajr until sunrise) → `faith_salah_growth`
- Prayer-specific prophetic supplications → `faith_salah_excellence`

**Why:** Authoring everything new would duplicate Rawatib and wudu tasks already present. Reusing everything would leave covenant-relevant sunnah actions absent. Hybrid preserves existing user state (completion, subtask progress) while filling the real gaps.

### D3 — Phase schema via `prayer-phase:*` tags + regex matchers

**Accepted:** Tasks surface in a given phase bucket when either:
1. They carry a tag starting with `prayer-phase:before` or `prayer-phase:after` (authoritative), **or**
2. Their title matches one of the node's `phaseMatchers` regex patterns (content-keyword fallback).

`main` returns the complement — tasks matched by the submodule/content pool that are neither before nor after.

The `phaseMatchers` live per-node on `TOD_SUBMODULES` in `src/data/prophetic-path-submodules.js`. `buildTasksForNode(nodeId, projects, tasksByProject, { phase })` applies the filter after the existing submodule + content matcher pipeline.

**Why tags + regex fallback:** Tags are authoritative for content we authored — safe, deterministic. Regex fallback lets existing user-visible tasks (e.g., "Learn the correct method of wudu with all fard and sunnah acts") appear in the right phase bucket without re-tagging every task. Tags alone would under-match; regex alone would be brittle and miss authored content that should always surface.

### D4 — Seed backfill for existing installs

**Accepted:** `backfillAndStripSeeds()` in `src/store/project-store.js` now detects new seed tasks (by title diff against existing board contents) and appends them into the `to_do` column. New subtasks, descriptions, tags, and source blocks come along.

**Why:** `seedTasks()` only runs on an empty board. Without backfill, existing users would never see the new prophetic tasks. Title-diff is deliberately conservative — renames or edits on the user's side are preserved.

## Consequences

**Positive:**
- 18 prayer-node × phase buckets all populate with ≥1 task.
- Seed state stays canonical — changes to the seed file flow to existing boards on next load.
- Amanah-Gate source blocks (Quran + sahih hadith per subtask) render in the TaskDetailPanel Sources tab with no extra wiring.
- Threshold ceremony decoupled from node affordances; can evolve independently.

**Negative / tradeoffs:**
- `Morning` and `Isha-rest` nodes have no `phaseMatchers` — the phase parameter is ignored there, so Before/Main/After render identical lists. Acceptable because they aren't prayer nodes; revisit if we author transition-specific sunnah (morning adhkar, pre-sleep du'a, waking du'a).
- Regex matchers need to be kept in sync with new task titles. Lint test that returns bucket counts per node would catch regressions — deferred.
- Title-diff backfill will double-add if a user ever renames a seed task to match the incoming new title exactly. Low risk, manually correctable.

## Files

- `src/data/prophetic-path-submodules.js` — `phaseMatchers` per node, phase-aware `buildTasksForNode`.
- `src/components/islamic/PropheticPath.jsx` — three-mirror render, Before-button rewire, phase-label eyebrow.
- `src/data/seed-tasks/faith-seed-tasks.js` — 4 new parent tasks + 11 subtasks with Amanah-Gate source blocks.
- `src/store/project-store.js` — `backfillAndStripSeeds` title-diff append.
- `tasks/notebook-prophet-prayers-answer.md` — raw NotebookLM output kept for future reference/drift audit.

## Related

- [[milos]] — PropheticPath section updated.
- Grounding corpus: NotebookLM Muslim Scholar `1c17b03b-3537-4fde-b5ba-562dbe0c1aab`.
