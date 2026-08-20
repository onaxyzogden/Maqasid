---
title: "MILOS — the ceremony card carries one blended description, not gloss above application"
type: decision
date: 2026-08-19
status: accepted
tags: [milos, islamic, ceremony, divine-names, ui, content]
supersedes: []
superseded_by: []
---

# One blended description per Name

Amends the card-layout half of [[2026-08-19-milos-divine-names-registry]]. The registry itself —
canonical `{ name, name_ar, title, gloss, source{…}, inNinetyNine }`, module data holding only a
`nameKey`, hydration at the accessor — is unchanged and remains in force. What changes is what the
card renders.

## Context

The registry decision gave the card three zones: registry **gloss** (canonical definition) above
module **application** (what the Name asks of this module) above the **source** chip. Shipped and
seen, the operator's verdict:

> *"I don't like what occurred with the descriptions and would rather have a blend of the two
> descriptions appear as one instead of two separate ones that often appear redundant"*

The redundancy is structural, not stylistic, and it was measurable:

| Measurement | Value |
|---|---|
| Applications opening by restating the Name | **79 of 114 (69%)** |
| BBOS applications opening by restating the Name | **18 of 18 (100%)** |
| Combined gloss + application text | ~332 ch avg |

The 18 BBOS entries restate universally because they were authored when **no gloss existed** — they
had to define the Name themselves. Putting a canonical gloss above them turned every one into a
sentence followed by its own paraphrase. The clearest case:

> **gloss:** *"He originates without precedent — nothing He made was copied from a prior pattern."*
> **application:** *"**Al-Badi creates without precedent.** Your foundation need not copy…"*

The fix is not more shortening — the block was already down from 475 ch. It is to stop saying the
same thing twice.

## Decision

Each module attribute carries **one** authored `description` that **leads with the application and
folds the definition in as a subordinate clause**. The card renders that paragraph plus the source
chip. Two zones, not three.

```
work / Al-Muḥsin

  description: "Work done with ihsan carries a quality beyond its specification — completed as
                though God sees it, because He does. That standard is Al-Muḥsin's own: He does
                everything with perfect care, and prescribes the same care of us."
```

```
IDY / Al-Badīʿ   (the worst redundancy class)

  description: "Your foundation need not copy what already exists — it is an invitation for
                Al-Badīʿ, who originates without precedent and copied nothing from a prior
                pattern, to bring something new through your effort and surrender."
```

Three alternatives were put to the operator; this one was chosen over the recommended
uniform-paragraph option, and it is the most expensive of the three — it required rewriting all 114
from scratch rather than editing openers.

**The registry `gloss` is unchanged and stays the canonical definition of record.** It still lives on
the hydrated object, still feeds the review document, and still anchors the lint rule below. It is
simply no longer rendered beside a paragraph that repeats it.

## Consequences

- **`application` → `description` across all 114 entries**, prose rewritten, in
  `src/data/islamic/islamic-data.js` (96) and `src/data/bbos/bbos-stage-islamic.js` (18). Zero
  `.application` references remain in `src/` or `scripts/`.
- **`hydrateAttrs()` recomposes `body` as `[description, sourceLine]`.** The definition still reaches
  [prompt-builder.js:158](src/services/ai/prompt-builder.js:158) and the BBOS dashboard adapter
  because it is folded into the description itself — those consumers needed no change, again.
- **`.attr-card-gloss` deleted** from JSX and CSS, and with it the `color: var(--text)` contrast fix
  that existed only to separate two zones that no longer exist. `.attr-card-body` keeps
  `white-space: pre-line`, which is load-bearing: `UNIVERSAL_EQUIV` principles pass `{ name, body }`
  with embedded newlines through the same element.
- **Total visible text falls while the budget rises.** `DESCRIPTION_MAX` goes 280 → 320 because the
  description now carries the definition too; actual max **284 ch**, avg **265 ch**. The card loses a
  whole paragraph. The win is redundancy, not length.

### The trade-off, stated plainly

Rendering an authored per-module description instead of the shared gloss **gives up part of the
anti-drift property the registry won**. 114 hand-written blends *can* drift apart in a way one shared
sentence could not. Three things hold it:

1. The registry `gloss` remains the single canonical definition to check against.
2. **A new ratchet rule requires the description to contain its own Name** (diacritic-folded) —
   proving the definition was *folded in* rather than dropped. This is what stops a future edit
   quietly reverting to a bare application with no definition. It replaces the old anti-restatement
   intent with its inverse.
3. `stages/review-divine-names-descriptions-review.md` puts all 114 blends beside their gloss and
   source in one pass, for human review.

Both ratchets (`scripts/lint-divine-names.mjs`, `src/data/islamic/__tests__/divine-names.test.js`,
now 11 tests) enforce rules 2 and the unchanged "no literal `name`/`gloss`/`body`/`source` in module
data" check.

### Known blind spot

The fold-based Name check is blind by construction to the `Al-Walī` / `Al-Wālī` collision — both fold
to `al-wali`. That is the exact class of defect that bit the registry migration, and the registry
disambiguates those keys explicitly rather than relying on the fold.

## Carried forward — since resolved

**Aṭ-Ṭāhir is not an established Name of Allah.** Unchanged from
[[2026-08-19-milos-divine-names-registry]]: the environment/waste module uses it, the attested Name
carrying that meaning is **Aṭ-Ṭayyib** (*Sahih Muslim* 1015), `at-tahir` stays `needsReview: true`
with `at-tayyib` beside it. Its description was rewritten in this pass like the other 113; the module
was **not** re-pointed.

> **Resolved 2026-08-20 by operator instruction — *"re-point the module to Aṭ-Ṭayyib"*.**
> `env-waste` attr 2 now carries `nameKey: 'at-tayyib'`, and the `at-tahir` registry entry was
> **deleted** rather than left flagged: with no consumer remaining, an unattested Name sitting in a
> registry of Divine Names *is* the defect the flag described. Registry now holds **106** entries
> (99 of the ninety-nine + 7 off-list). The module description was rewritten to name Aṭ-Ṭayyib and
> to carry his sense — *wholesome at its source rather than clean on its surface* — so the attestation
> the card shows (*Sahih Muslim* 1015, `direct` / `Bayyinah`) is now the Name's own rather than a
> `contextual` / `Qarina` stand-in.

