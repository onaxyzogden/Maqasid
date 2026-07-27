---
phase: refactor
slug: pillar-naming
status: review
amanah: pending
created: 2026-07-27
---

# Review Gate: refactor — pillar-naming

## Summary

The `life` → `health` rename ([wiki/decisions/2026-04-27-milos-life-to-health-rename.md](../wiki/decisions/2026-04-27-milos-life-to-health-rename.md)) moved the pillar's `sidebarLabel` to **Health**; `sidebarLabel: 'Community'` is likewise canonical for the `ummah` pillar ([src/data/maqasid.js](../src/data/maqasid.js)). That decision carries an explicit **Excluded** list of files intentionally left alone — and none of the files below are on it. The staleness is an oversight, not a decision.

I have applied the fixes everywhere I have write access (`src/`, `wiki/`). **This gate covers only the files the Hemisphere Division marks read-only for AI** — `references/`, `docs/`, `website/`. Each edit below is stated as an exact old → new so it can be applied without re-deriving anything.

Two of the four items carry a **recommendation to leave as-is**, stated explicitly rather than decided silently.

## Files Modified

None by me. This document proposes edits to files I may not write.

## Proposed edits

### 1. `references/voice-and-tone.md` — lines 22 and 28 — **recommend applying**

The "Seven Maqasid (Pillar Names)" list is the authority other copy is written against, so a stale entry here propagates. The Arabic on both lines is correct and does not change.

| Line | Current | Change to |
|---|---|---|
| 22 | `2. **Life** (حفظ النفس — Hifz al-Nafs)` | `2. **Health** (حفظ النفس — Hifz al-Nafs)` |
| 28 | `7. **Ummah** (حفظ الأمة — Hifz al-Ummah)` | `7. **Community** (حفظ الأمة — Hifz al-Ummah)` |

The Arabic roots `Hifz al-Nafs` / `Hifz al-Ummah` are the classical framing and are preserved by the rename decision. Only the English UI label moves.

### 2. Root `CLAUDE.md` — line 3 — **recommend applying**

This line is loaded into context at the start of every session, so a stale pillar list here actively teaches the wrong names to every future session.

- **Current:** `…across the Seven Maqasid (Faith, Life, Intellect, Family, Wealth, Environment, Ummah).`
- **Change to:** `…across the Seven Maqasid (Faith, Health, Intellect, Family, Wealth, Environment, Community).`

### 3. `docs/grounding-runtime-prompt.md` — lines 97 and 100 — **recommend leaving as-is**

These are rows in a historical work-plan table (batch number, pillar, subtask count, session estimate) recording how the grounding backfill was actually scheduled:

```
| 4a | Life    | 236 | 1 session  |
| 5  | Ummah   | 450 | 2 sessions (split by submodule) |
```

This is the same class as the wiki decision records the rename deliberately excluded — a record of what happened under the names in use at the time, not a statement of current state. Rewriting it would make the document a less accurate record. Listed here so the call is explicit rather than silent.

**If you disagree:** change `Life` → `Health` and `Ummah` → `Community` on those two lines only; nothing else in the file depends on them.

### 4. `website/` marketing pages — **recommend a separate pass, not this gate**

Read-only for AI, no build system, and a different audience and review standard from the app. Bundling them here would mix two unrelated review judgments. The stale labels, for the record:

| File | Line | Current |
|---|---|---|
| `website/milos/index.html` | 355 | `<p class="stage-name">Life</p>` |
| `website/milos/index.html` | 380 | `<p class="stage-name">Ummah</p>` |
| `website/journey/index.html` | 426 | `<p class="phase-cell-name">Ummah</p>` |
| `website/milos/journey/index.html` | 193 | `<h2 class="phase-name">Ummah</h2>` |

The adjacent `stage-attr` lines (`Hifz al-Nafs`, `Hifz al-Ummah`) are correct and would not change.

`website/.graphify_website_staging/milos/index.md` also carries both roots, but it is generated staging output — it should be regenerated, not hand-edited.

## Amanah Gate

- [x] Halal purpose confirmed — corrects labels to match the covenant-grounded naming already decided
- [x] No riba/gharar concerns — copy-only, no transactional surface
- [ ] Itqan standard met — pending your review of the two "leave as-is" recommendations
- [x] Existing tests still pass — no test asserts on these strings; none of these files are imported by the app

## Key Decisions

- **Pillar ids do not change.** `health` and `ummah` remain the ids, directory names, and route segments (`/app/pillar/ummah`). Only English UI labels move. Existing `localStorage` project ids are unaffected.
- **Classical Arabic framing is preserved** wherever it appears — `Hifz al-Nafs`, `Hifz al-Ummah`, `حفظ الأمة`, and `universalLabel: 'Collective'` all stay.
- **Historical records keep their original names**, consistent with how the rename decision itself treated the wiki decision records.

## Open Questions

1. Do you agree with leaving `docs/grounding-runtime-prompt.md` as a historical record? (My recommendation: yes.)
2. Should `website/` get its own gate doc, or do you want to just apply those four lines directly? (My recommendation: separate pass.)

## Reviewer Notes

_[Space for human reviewer to annotate]_

## Decision

- [ ] **Approved** — apply items 1 and 2; items 3 and 4 left as recommended
- [ ] **Approved with changes** — see notes above
- [ ] **Rejected** — rework needed
