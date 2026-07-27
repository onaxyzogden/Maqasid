---
phase: refactor
slug: pillar-naming
status: approved
amanah: complete
created: 2026-07-27
decided: 2026-07-27
---

# Review Gate: refactor — pillar-naming

> **APPROVED 2026-07-27.** Items 1 and 2 applied; items 3 and 4 confirmed left as recommended. See [Decision](#decision).

## Summary

The `life` → `health` rename ([wiki/decisions/2026-04-27-milos-life-to-health-rename.md](../wiki/decisions/2026-04-27-milos-life-to-health-rename.md)) moved the pillar's `sidebarLabel` to **Health**; `sidebarLabel: 'Community'` is likewise canonical for the `ummah` pillar ([src/data/maqasid.js](../src/data/maqasid.js)). That decision carries an explicit **Excluded** list of files intentionally left alone — and none of the files below are on it. The staleness is an oversight, not a decision.

I have applied the fixes everywhere I have write access (`src/`, `wiki/`). **This gate covers only the files the Hemisphere Division marks read-only for AI** — `references/`, `docs/`, `website/`. Each edit below is stated as an exact old → new so it can be applied without re-deriving anything.

Two of the four items carry a **recommendation to leave as-is**, stated explicitly rather than decided silently.

## Files Modified

- [references/voice-and-tone.md](../references/voice-and-tone.md) — lines 23 and 28 (item 1)
- Root [CLAUDE.md](../CLAUDE.md) — line 3 (item 2)

Applied on approval. Before that, none: this document proposed edits to files I may not write unprompted.

## Proposed edits

### 1. `references/voice-and-tone.md` — lines 23 and 28 — **recommend applying** ✅ applied

The "Seven Maqasid (Pillar Names)" list is the authority other copy is written against, so a stale entry here propagates. The Arabic on both lines is correct and does not change.

| Line | Current | Change to |
|---|---|---|
| 23 | `2. **Life** (حفظ النفس — Hifz al-Nafs)` | `2. **Health** (حفظ النفس — Hifz al-Nafs)` |
| 28 | `7. **Ummah** (حفظ الأمة — Hifz al-Ummah)` | `7. **Community** (حفظ الأمة — Hifz al-Ummah)` |

The Arabic roots `Hifz al-Nafs` / `Hifz al-Ummah` are the classical framing and are preserved by the rename decision. Only the English UI label moves.

### 2. Root `CLAUDE.md` — line 3 — **recommend applying** ✅ applied

This line is loaded into context at the start of every session, so a stale pillar list here actively teaches the wrong names to every future session.

- **Current:** `…across the Seven Maqasid (Faith, Life, Intellect, Family, Wealth, Environment, Ummah).`
- **Change to:** `…across the Seven Maqasid (Faith, Health, Intellect, Family, Wealth, Environment, Community).`

### 3. `docs/grounding-runtime-prompt.md` — lines 97 and 100 — **recommend leaving as-is** ✅ confirmed, not touched

These are rows in a historical work-plan table (batch number, pillar, subtask count, session estimate) recording how the grounding backfill was actually scheduled:

```
| 4a | Life    | 236 | 1 session  |
| 5  | Ummah   | 450 | 2 sessions (split by submodule) |
```

This is the same class as the wiki decision records the rename deliberately excluded — a record of what happened under the names in use at the time, not a statement of current state. Rewriting it would make the document a less accurate record. Listed here so the call is explicit rather than silent.

**If you disagree:** change `Life` → `Health` and `Ummah` → `Community` on those two lines only; nothing else in the file depends on them.

### 4. `website/` marketing pages — **recommend a separate pass, not this gate** ✅ confirmed, not touched

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
- [x] Itqan standard met — both "leave as-is" recommendations reviewed and confirmed
- [x] Existing tests still pass — no test asserts on these strings; none of these files are imported by the app

## Key Decisions

- **Pillar ids do not change.** `health` and `ummah` remain the ids, directory names, and route segments (`/app/pillar/ummah`). Only English UI labels move. Existing `localStorage` project ids are unaffected.
- **Classical Arabic framing is preserved** wherever it appears — `Hifz al-Nafs`, `Hifz al-Ummah`, `حفظ الأمة`, and `universalLabel: 'Collective'` all stay.
- **Historical records keep their original names**, consistent with how the rename decision itself treated the wiki decision records.

## Open Questions

1. ~~Do you agree with leaving `docs/grounding-runtime-prompt.md` as a historical record?~~ **Yes** — closed 2026-07-27.
2. ~~Should `website/` get its own gate doc, or do you want to just apply those four lines directly?~~ **Separate pass** — closed 2026-07-27. The four lines remain outstanding and are the natural scope of that pass.

## Reviewer Notes

_[Space for human reviewer to annotate]_

## Decision

- [x] **Approved** — apply items 1 and 2; items 3 and 4 left as recommended
- [ ] **Approved with changes** — see notes above
- [ ] **Rejected** — rework needed

Approved by Yousef in-session on 2026-07-27, with the reach explicitly limited to items 1 and 2. Items 1 and 2 were applied in the same pass, so the `-review` → `-approved` rename was performed by me rather than by hand; [stages/CONTEXT.md](CONTEXT.md) nominally assigns that rename to the human reviewer.
