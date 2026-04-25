---
title: "OGDEN Hub"
type: entity
created: 2026-04-09
updated: 2026-04-25
tags: [website, static, landing-page, ogden, marketing, html]
sources: 0
---

# OGDEN Hub

OGDEN Hub is a static HTML marketing and landing site for the OGDEN platform. It lives at `website/` in the [[milos]] monorepo, merged via git subtree on 2026-04-09, and is deployed to GitHub Pages at bismillah.ogden.ag. The site contains landing pages for three products: MTC (faith-centered land community), [[bbos-pipeline]] (business operating system), and [[olos]] (land assessment tool). It is pure HTML/CSS with no build system and no Node.js dependency.

## Key Facts

- **Location:** `website/` directory in the [[milos]] monorepo
- **Integration method:** git subtree (merged 2026-04-09)
- **Deployment:** GitHub Pages at bismillah.ogden.ag
- **Stack:** Pure HTML + CSS — no build system, no Node.js, no bundler
- **Product pages:** MTC, BBOS (`website/bbos/`), OLOS
- **Purpose:** Public-facing marketing site for the OGDEN platform umbrella

## Current Status

Merged into the [[milos]] monorepo as a subtree. Serving as the primary public landing site for all three OGDEN products. No build pipeline required — changes to HTML/CSS deploy directly via GitHub Pages.

## Connections

- [[milos]] — Parent monorepo; ogden-hub lives at `website/`
- [[bbos-pipeline]] — BBOS product landing page at `website/bbos/`
- [[olos]] — OLOS product landing page linked from the hub
- [[covenant-architecture]] — Marketing language reflects covenant-grounded framing

## Open Questions

- Will the subtree be kept in sync with a standalone repo, or is the monorepo copy now canonical?
- Should the site gain any dynamic elements (e.g., form submissions, waitlist signup)?
- How will DNS and deployment be managed if atlas.ogden.ag and bismillah.ogden.ag diverge?

## History

| Date | Event |
|---|---|
| 2026-04-09 | Wiki entity page bootstrapped. Site merged into maqasid-os monorepo via git subtree. Deployed at bismillah.ogden.ag. |
| 2026-04-25 | BBOS + MILOS hero tonal alignment with OLOS / MTC. Both pages now use the family pattern: ayah → eyebrow (glyph + middot + name + descriptor + stage) → forward-statement headline (verb/noun-led, em-dash, italic key word) → subhead. BBOS H1: _"Build the business — without disappearing inside it."_ MILOS H1: _"A way to organize your whole life — as the trust it always was."_ MILOS subhead reworded — "ummah" → "community", "Maqasid al-Shariah" → "higher objectives of Islamic law"; ayah image ("putting forth for tomorrow") lifted into body copy. No CSS changes — hero classes already shared across product pages. |
| 2026-04-25 | Home page (`website/index.html`) eyebrow brought into the family pattern: `Structured Service · Rooted Intention` → `◆ · OGDEN · Structured Service · Rooted Intention` (`◆` U+25C6 chosen as the umbrella glyph, distinct from the four product glyphs). Glyph audit: BBOS home card had a stray Left-to-Right Isolate (U+2069) + U+29C1 ◈ — replaced with canonical `&#9672;` (U+25C8 ◈, matching the BBOS product-page eyebrow). MILOS product page eyebrow `&loz;` (U+25CA ◊ filled) replaced with `&#9671;` (U+25C7 ◇ open) to match the MILOS home card. Canonical glyphs now consistent across home cards + product-page eyebrows: ◆ OGDEN · ◤ MTC · ○ OLOS · ◈ BBOS · ◇ MILOS. DOM + layout verified across 5 pages × 3 viewports; visual screenshot QA still deferred (`preview_screenshot` unresponsive across both sessions on this Windows env). |
