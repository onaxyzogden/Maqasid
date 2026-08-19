---
title: "MILOS — the landing Orientation demo is generated from seed data and playable"
type: decision
date: 2026-07-28
status: accepted
tags: [milos, landing, grounding, codegen, bundle-size, ratchet]
superseded_by: null
---

# MILOS — the landing Orientation demo is generated from seed data and playable

## Context

The landing page's flagship demo — the Orientation card at `src/pages/Landing.jsx` — was hand-written, and it was hand-written on the one page whose entire pitch is that **every task carries its evidence**. Audited against `src/data/`:

| Rendered on the card | Status in the data |
|---|---|
| `Family`, `Core` | Real |
| `Extended Family` | Real — the `family-kinship` label in [modules.js](src/data/modules.js) |
| `Silat al-Rahim` | **Not a board node.** Appears only inside prose in `pillar-content.js` and `modules.js` |
| *"Call one relative you haven't spoken to this month."* | **Zero hits anywhere in `src/data/`** |
| `T2 · QARINA` | **Wrong, and in the wrong direction** — every source on `family_kinship_core` is Bayyinah, so [`deriveSubtaskTier`](src/utils/subtask-grounding.js) returns **T1** |

The drift had a mechanical cause worth recording: real project titles are sentence-length, so the card's **four**-segment ladder had nowhere to put one, and a concept name got substituted for a board node. Fixing the four strings in place would let it drift again the next time the seed files move.

The second half of the problem was that the card *asserted* the four exits and the evidence trail without showing either. The operator asked for it to be *"as interactive as the live site so that visitors can get 'taste a sample' before committing."*

The hard constraint on any fix: `Landing.jsx` must never import `hadith.js`, `quran-wbw.js`, `orientation-selector.js`, `prophetic-path-submodules.js`, or `SubtaskSources`. Built chunk sizes at the time — `SubtaskSources` **1,837 kB**, `seed-ummah` **1,452 kB**, `seed-faith` 730 kB, `seed-wealth` 697 kB. Landing is not its own chunk; it lives in `index-*.js`, so any leak is paid by every first-time visitor.

## Decision

**Generate the demo deck from the real seed files at build time, ratchet it on `npm run lint`, and render it as a card the visitor can click through.**

- **`scripts/generate-landing-demo.mjs`** emits `src/data/generated/landing-demo-deck.js` — seven cards, one per core objective, each `{ pillarId, moduleLabel, level, project, subtask, tierId, sources[] }`. Modelled on [generate-pillar-glyphs.mjs](scripts/generate-pillar-glyphs.mjs): same `--check` contract, same fail-loud posture, wired into `npm run lint` as `generate:landing-demo:check`.
- **Picks are pinned by distinctive substring, not by index.** A `PICKS` table names each card by `projectMatch` / `subtaskMatch` and **throws on zero matches and on more than one**.
- **`tierId` is computed by importing the real `deriveSubtaskTier`**, never typed in. Hand-stamping is the bug being fixed.
- **`arabic` and the multi-KB `description` prose are dropped.** That prose is what makes the seed files megabytes; the demo **cites, it does not recite**.
- **The ladder drops from four segments to three** — `Pillar › Core › Submodule`. Every segment is then a real node, and the sentence-length project title moves into the expanded panel as a dimmed `FROM:` line, where it has room.
- **The four exits become `<button>`s** that advance the deck and collapse the panel, wrapping at the end — honest, because in the live app every exit surfaces a new card. `Why & how` becomes an `aria-expanded` toggle rendering the real citations with provenance badge and relevance chip per source.
- **A shape test** (`src/data/generated/__tests__/landing-demo-deck.test.js`) proves the file is *usable*, not just current: one card per objective in pillar order, every citation complete, every axis id real, every tier re-derived, and `description`/`arabic` absent.

Shipped as `e48a6e6` (generator + wiring, 5 files, +514/−33), `75c8a2e` (playable card, 2 files, +187/−45), `06130e0` (deck test, +68).

## Rationale

- **A generator converts a content-accuracy problem into a build failure.** The old card could only be wrong silently; the new one cannot be stale without `npm run lint` going red.
- **Substring pinning was the load-bearing choice, and it was vindicated within the same session.** Main's PR #33 re-curated `seq` across *every* seed-task file. `generate:landing-demo:check` still reported *up to date (7 cards)* with no regeneration needed. **Index pinning would have silently re-pointed all seven cards at different tasks** — the landing page would then have cited evidence for tasks it was not showing, which is precisely the failure mode this work exists to end.
- **Build-time codegen is the only way to satisfy the bundle guard and the honesty requirement at once.** The generator reads megabytes in Node and emits ~650 bytes per card. Measured delta: **+6.17 kB raw / +2.0 kB gzipped**.
- **The expand is driven by React conditional render, never by a keyframe on an `opacity: 0` resting state.** `global.css` clamps `animation-duration` and `transition-duration` to 0.001ms under `.reduce-motion` but **not `transition-delay`**, so a keyframe-dependent reveal renders permanently blank for genuine reduced-motion users.
- **Extracting `ssrLoad`/`closeSsr` into `scripts/lib/ssr-load.mjs` is safe to do in the same commit** because `npm run lint` runs the glyph `--check`, so a bad extraction fails immediately rather than lying dormant. Only `src/data/maqasid.js` actually needs the SSR loader (extensionless relative imports); every seed file, `modules.js`, `config/*.js` and `utils/subtask-grounding.js` load under plain Node `await import()` — verified by running it, not assumed.

## Alternatives Considered

- **Correct the four strings by hand.** Rejected: it fixes today's fiction and leaves the mechanism that produced it intact. The card would drift again on the next seed reorder, and nothing would catch it.
- **Import the seed data at runtime and pick live.** Rejected: it drags `SubtaskSources` (1,837 kB) and at minimum one seed chunk into `index-*.js`. The demo would cost more than the app it advertises.
- **Pin the picks by array index.** Rejected on principle, then disproven by evidence — main re-curated `seq` across every seed file mid-session and index pinning would have re-pointed all seven cards without a single test failing.
- **Embed a live instance of the app (iframe or route preview).** Rejected: the live surfaces sit behind the Daily Niyyah ceremony, which writes to the operator's spiritual record, and a marketing page must not.
- **Rewrite the seed `translation` fields that carry editorial sentences.** Rejected outright — rewriting a translation authors text the source does not say. Handled by **curation** instead: all seven picks quote cleanly. The underlying smell is flagged below, not silently patched.

## Consequences

- The landing page now shows **seven real tasks with their real citations**, and cannot show anything else without the build failing.
- **`npm run lint` gains a fifth gate.** Anyone changing a pinned task's title must run `npm run generate:landing-demo`, or `--check` stops the build. This is the intended cost.
- The deck is deliberately narrow — **all seven picks resolve to T1 · Bayyinah with `direct` relevance**, so the demo does not currently exercise the Qarina/Niyyah or contextual/thematic rendering paths. The component handles them (badges are looked up per source, not per card); the deck does not yet exercise them.
- **Flagged, not acted on — a pre-existing seed-data smell.** Several `translation` fields append editorial sentences to the quotation (`Sahih Muslim 780` on `family_home_core`, `Sahih al-Bukhari 6014` on `ummah_neighbors_core`, `Quran 17:24` on `family_kinship_core`); two entries in `health_physical_core` are paraphrase-summaries rather than quotations; and `Sahih al-Bukhari 527` carries two different translations under one ref in different subtasks. **This renders in the live app's `SubtaskSources` too**, so it is a product issue, not a landing-page one. Deferred to the operator as a content call.
- **Amanah:** positive. Every `ref`, `translation`, `relevance`, `provenanceTier` and `hadithGrade` is copied **byte-for-byte** from the seed files. No ruling, rakʿah count or hadith grade is authored, paraphrased, softened or relocated; no FAQ answer and no `DAY_VARIANTS[].quote` is touched.

**Verified:** `npm test` **238/238 across 12 files**; `npm run lint` green (grounding-strict 0/0 across 8 pillars, inline-refs 0 ≤ 0, 41 glyphs, 7 cards up to date); `npm run build` clean in 1.28s. Bundle guard proven by grep of the built `index-BvU_iMgR.js` (284.60 kB): the demo subtask and `Sahih al-Bukhari 5984` present as intended, the seed-prose marker `Silat al-rahim (maintaining family ties)` present **only** in `seed-family`, and the fabricated `Call one relative` at **zero hits anywhere**.

**Screenshots captured — the first on this branch.** The desktop shot required finding a viewport that survives downscaling: 1280×900 renders illegibly, `zoom` with a `region` is unsupported by the pane, and 760px falls below the mobile breakpoint. **1000×812 works** — it keeps the desktop treatment and captures at 800×649. The shot confirms the two-column layout, the fanned deck, `FAITH › CORE › SALAH`, the real task, `T1 · BAYYINAH`, the open evidence panel with its `FROM:` line, `Quran 4:103` and `Sahih al-Bukhari 527 · Sahih` with translations and Bayyinah/Direct chips, and the four exit buttons. Mobile captured at 375×812. [[project-screenshot-hang]] did **not** recur.

## Connections

- [[milos]] — the product this ships in
- [[2026-07-28-milos-orientation-card-face-single-layout]] — the in-app card the demo imitates; that pass moved pillar copy into the data layer for the same reason this one moves task copy into a generated file
- [[2026-04-18-milos-grounding-two-axis]] — the `provenanceTier` × `relevance` model the evidence panel renders
- [[2026-04-25-milos-grounding-tooling]] — the ratchet pattern this generator follows
- [[2026-07-23-milos-orientation-screen]] — the live surface whose loop the demo reproduces
