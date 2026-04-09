---
title: "OGDEN Hub"
type: entity
created: 2026-04-09
updated: 2026-04-09
tags: [website, static, landing-page, ogden, marketing, html]
sources: 0
---

# OGDEN Hub

OGDEN Hub is a static HTML marketing and landing site for the OGDEN platform. It lives at `website/` in the [[maqasid-os]] monorepo, merged via git subtree on 2026-04-09, and is deployed to GitHub Pages at bismillah.ogden.ag. The site contains landing pages for three products: Moontrance (faith-centered land community), [[bbos-pipeline]] (business operating system), and [[atlas]] (land assessment tool). It is pure HTML/CSS with no build system and no Node.js dependency.

## Key Facts

- **Location:** `website/` directory in the [[maqasid-os]] monorepo
- **Integration method:** git subtree (merged 2026-04-09)
- **Deployment:** GitHub Pages at bismillah.ogden.ag
- **Stack:** Pure HTML + CSS — no build system, no Node.js, no bundler
- **Product pages:** Moontrance, BBOS (`website/bbos/`), Atlas
- **Purpose:** Public-facing marketing site for the OGDEN platform umbrella

## Current Status

Merged into the [[maqasid-os]] monorepo as a subtree. Serving as the primary public landing site for all three OGDEN products. No build pipeline required — changes to HTML/CSS deploy directly via GitHub Pages.

## Connections

- [[maqasid-os]] — Parent monorepo; ogden-hub lives at `website/`
- [[bbos-pipeline]] — BBOS product landing page at `website/bbos/`
- [[atlas]] — Atlas product landing page linked from the hub
- [[covenant-architecture]] — Marketing language reflects covenant-grounded framing

## Open Questions

- Will the subtree be kept in sync with a standalone repo, or is the monorepo copy now canonical?
- Should the site gain any dynamic elements (e.g., form submissions, waitlist signup)?
- How will DNS and deployment be managed if atlas.ogden.ag and bismillah.ogden.ag diverge?

## History

| Date | Event |
|---|---|
| 2026-04-09 | Wiki entity page bootstrapped. Site merged into maqasid-os monorepo via git subtree. Deployed at bismillah.ogden.ag. |
