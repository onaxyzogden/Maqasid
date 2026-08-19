---
title: "MILOS — one canonical registry for the Divine Names; module data keeps only its application"
type: decision
date: 2026-08-19
status: accepted
tags: [milos, islamic, grounding, ceremony, divine-names, data-architecture]
supersedes: []
superseded_by: []
---

# One canonical registry for the Divine Names

## Context

The operator opened the session with three complaints about the Names of Allah shown in the
opening/closing ceremony Attributes step:

> *"I've got a concern with the length of the descriptions… the scholarly descriptions sounded
> difficult to understand by the general public so easier to understand ones were authored and
> placed above though some suffer from oversimplification… **Each name still needs the detail
> describing the source of the Name (i.e. Quran/Hadith)**"*

Measured, the three complaints had **one root cause: no Name had a canonical definition anywhere.**
Each attribute was a single `body` string holding gloss + application + source line jammed together,
re-authored independently in every module that used the Name.

| Symptom | Measurement at HEAD |
|---|---|
| Cards too long | 114 entries, `body` avg **475 ch**, max **683**, rendered as one undifferentiated `<p>` |
| Glosses drift | Al-Ḥafīẓ appears **8×** with **6 different** opening paragraphs; Ar-Razzāq 7×; Al-Wadūd 6× with 5 |
| Sources missing | **18 entries** — every attribute in `bbos-stage-islamic.js` — had **no gloss and no source at all** |
| Spelling drift | **19 names** carried competing transliterations (`Al-Hafiz`/`Al-Ḥafīẓ`, `Al-Adl`/`Al-ʿAdl`…) |

Shortening the text in place would have fixed ~114 symptoms and prevented **zero** recurrences.

## Decision

Extract the **Name** into a registry. Leave the **application** in module data. Merge at the accessor,
so no downstream consumer changes.

```
DIVINE_NAMES[key] = { name, name_ar, title, gloss, source{…}, inNinetyNine }
                          │
MODULE_ATTRS.work.attrs = [{ nameKey: 'al-muhsin', application: '…' }, …]
                          │
        getModuleData() / resolveCeremonyData() / getBbosStageIslamic()
                          │  ← hydrateAttrs() merges here
                          ▼
   { name, name_ar, title, gloss, application, source, body }
```

`body` is **recomposed on hydration** from gloss + application + source line, so
[prompt-builder.js:158](src/services/ai/prompt-builder.js:158) and the BBOS dashboard adapter keep
working untouched. Only `AttributeCard` opts into the new discrete fields.

Four decisions the operator made by selection, all followed:

1. **Canonical registry** — `src/data/islamic/divine-names.js`; each module attribute becomes `{ nameKey, application }`.
2. **Three visible zones on the card** — gloss + application + source chip, all visible, no progressive disclosure.
3. **Structured source** — `{ kind, ref, arabic, translation, relevance, provenanceTier, rationale }`,
   matching the seed-task convention from [[2026-04-18-milos-grounding-two-axis]] (`Bayyinah`/`Qarina`/`Niyyah`;
   `direct`/`contextual`/`thematic`).
4. **Off-list Names kept and sourced individually**, not forced into the Tirmidhi 99.

### Final shape

| | |
|---|---|
| Registry entries | **107** — 99 `inNinetyNine` + **8** off-list |
| Attestations | 90 Qur'an · 17 hadith · tiers `Bayyinah 83` / `Qarina 24` |
| Gloss budget | ≤130 ch, enforced; actual max **122**, avg **91** |
| Application budget | ≤280 ch, enforced; actual max **277**, avg **235** (was max 432) |
| Module attributes | 114 — 96 `MODULE_ATTRS` + 18 `BBOS_STAGE_ISLAMIC` |
| Distinct Names in use | **52** slugs, collapsed from **72** distinct name strings |

Off-list 8: `ar-rabb`, `ash-shafi`, `al-muhsin`, `al-mudabbir`, `al-jamil`, `al-qarib`, `at-tahir`, `at-tayyib`.
The plan named 7 — `at-tayyib` was added during authoring, for the reason in the next section.

## Provenance honesty, not manufactured citations

**The Tirmidhi enumeration is not treated as prophetic text.** The list of 99 in
*Jāmiʿ at-Tirmidhī* 3507 is held by hadith scholarship to be a narrator's addition. So the Names
that appear **only** inside that enumeration — Ar-Rashīd, Aṣ-Ṣabūr, Al-Khāfiḍ, Al-Mudhill,
Al-Muntaqim, Aḍ-Ḍārr, Al-Mughnī, Al-Māniʿ and the rest of the 24 — carry
`provenanceTier: 'Qarina'` and a `rationale` that says exactly that. **No Quranic citation was
invented to lift them to `Bayyinah`.** This is the same refusal-to-launder principle as
[[2026-04-18-milos-grounding-two-axis]].

**Aṭ-Ṭāhir is not an established Name of Allah** — it is used by the environment/waste module.
The attested Name carrying that meaning is **Aṭ-Ṭayyib** (*Sahih Muslim* 1015: *"Allah is Ṭayyib
and accepts only what is ṭayyib"*). The module was **not silently re-pointed**: `at-tahir` stays,
flagged `needsReview: true` with an explicit rationale, and a proper `at-tayyib` entry sits beside
it. Which Name governs the module is the operator's call, not a refactor's.

**Eight supplied glosses were rewritten for oversimplification** — Al-Jabbār ("decisions are
unstoppable" → restores the *jabr* sense of mending what is broken), Al-Mutakabbir, Al-Hādī (dropped
a GPS metaphor — *hidāyah* is granted, not navigated to), Ar-Rashīd, Al-Wājid ("always has
everything He wants" imports need), Al-Qādir (dropped the disappearing-mountain stunt example),
Aḍ-Ḍārr ("allows hard times" is deist softening — He decrees both benefit and adversity),
Al-Khāfiḍ / Al-Mudhill (abasement is His decree, not moral tit-for-tat).

## A real defect the migration surfaced

Two entries carried `nameKey: 'al-waali'` (الوالي, The Governor) while both their prose and their
pre-migration `name:` said **Al-Walī** (الولي, The Protecting Friend) — the neighbour-right and
residency-walāʾ attributes. Cause: the ASCII fold maps both `Al-Walī` and `Al-Wālī` to `al-wali`,
so the codemod's name map was ambiguous at exactly the collision the plan had flagged. Both keys
were corrected to `al-wali`.

**This class of defect is invisible to a fold-based verifier by construction** — the verifier and
the codemod share the ambiguity. It was caught only by reading each patched entry's prose against
its key. That is why the registry disambiguates all four collision keys explicitly
(`al-wali`/`al-waali`, `al-majid`/`al-maajid`) and why the ratchet asserts `name_ar` uniqueness.

## Card rendering

Three zones with **descending contrast**, decided by measurement. The first cut gave gloss and body
the same `--text-sm-plus` / `--text2`; probed in the browser both rendered at `12.8px` /
`rgb(95,107,122)`, differing only in line-height — which would have merged the two zones straight
back into the wall of prose the refactor exists to remove. `.attr-card-gloss` therefore takes
`color: var(--text)`, giving `rgb(26,29,33)` → `rgb(95,107,122)` → `rgb(139,149,162)`.

`.attr-card-body` keeps `white-space: pre-line` — `UNIVERSAL_EQUIV` principles pass only
`{ name, body }` with embedded newlines and rely on it. Every zone past the header is conditional,
so the universal-values layer renders unchanged.

Net visible text ≈ 130 (gloss) + 280 (application) + a ref chip ≈ **~330 ch in three scannable
zones**, down from a 475-char single block.

## Ratchets

Two gates, mirroring the `lint:grounding-strict` / `audit:inline-refs` pattern:

- `src/data/islamic/__tests__/divine-names.test.js` — 10 tests. The load-bearing one asserts
  **zero hydrated attributes without a source**, which is what keeps the 18-entry BBOS gap closed
  rather than merely closed-once.
- `scripts/lint-divine-names.mjs` — same checks in the `npm run lint` chain. It needs a
  `node:module` `registerHooks` resolve hook because app source uses **Vite-style extensionless
  relative imports** that bare Node cannot resolve.

Both also fail on a literal `name`/`name_ar`/`title`/`gloss`/`body`/`source` reappearing in module
data — the specific regression that would reintroduce per-module drift.

## Consequences

- The BBOS AI prompt now receives **gloss + application + attestation** where 18 stages previously
  supplied a bare uncited paragraph. A grounding improvement that fell out of the architecture
  rather than being authored.
- The registry is built to support a future "browse the 99 Names" glossary surface. **None was
  added** — out of scope, and `ISLAMIC_GLOSSARY` remains a separate untouched tooltip system.
- Which Names govern which module was **not** changed.
- Adding a Name to a module is now `{ nameKey, application }` — the Name's identity and citation
  cannot drift, because there is only one copy of them.

## Verification

`npm test` **225/225 across 12 files** · `npm run lint` green end-to-end
(`divine-names: OK — 107 names (99 of the ninety-nine), 114 module attributes, all attested.`) ·
`npm run build` ✓ 1.76s.

**No screenshot, a seventh consecutive session** ([[project-screenshot-hang]]). Every attempt
returned *"Screenshot timed out after 5s: the Browser pane is not displayed, so the page is not
compositing frames."* The ceremony Attributes step and the `IslamicPanel` were verified
**structurally** — DOM text extraction plus computed-style probes confirming three distinct zones
and the source chip — and the Prophetic Path popup Before tab was **not exercised at all**. Phase 4's
gate is therefore **not met as written**; this is stated rather than worked around.

One pre-existing defect was found and deliberately left alone as out of scope:
`(color || 'var(--accent)') + '66'` in `AttributeCard` composes the invalid CSS value
`var(--accent)66`, so the ceremony card's accent tint silently falls back to the border default.
It is present at HEAD and does work in the `IslamicPanel` BBOS path, where `stageModeColor` is a
real hex.
