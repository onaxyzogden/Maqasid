---
title: "Accept 2 MB Bundle Size"
type: decision
date: 2026-04-11
status: accepted
tags: [performance, build, vite, bundle-size, code-splitting]
superseded_by: null
---

## Context

Production build produces a 2.3 MB `dist/` directory:
- **JavaScript:** `index-*.js` — 2.0 MB (single monolithic chunk)
- **CSS:** `index-*.css` — 358 KB

This is above the typical <1 MB target for modern SPAs. The bundle is monolithic because:
1. All routes are eagerly imported (no `React.lazy` / dynamic imports)
2. Vite config (`vite.config.js`) has no manual chunk splitting configured
3. Heavy dependencies (dnd-kit, date-fns, Lucide icons) are bundled inline
4. Inline SVG charts (hand-drawn, no chart library) add significant JSX volume

The technical audit flagged this as Finding #31: no ADR documenting the bundle size decision.

## Decision

**Accept the 2 MB bundle for now.** The app is a single-operator tool with no public-facing traffic. Initial load time on localhost or LAN is acceptable. Optimization effort is better spent on features and stability during V2.1 development.

### Thresholds for Revisiting

- Bundle exceeds **3 MB** uncompressed
- App is deployed for **multi-user** or **public** access
- Lighthouse performance score drops below **60** on target hardware

## Rationale

- Single operator = no cold-start penalty at scale
- Gzip/Brotli compression reduces wire size to ~500-600 KB (acceptable)
- Code splitting adds complexity (loading states, error boundaries per route) that is not justified for one user
- No performance complaints from the operator to date

## Alternatives Considered

| Alternative | Pros | Cons | Verdict |
|---|---|---|---|
| React.lazy route splitting | Smaller initial chunk, faster FCP | Loading spinners per route, error boundaries needed | Deferred — implement when multi-user |
| Vite manualChunks | Vendor chunk caching | Config maintenance, chunk naming | Deferred — low ROI for single user |
| Tree-shake Lucide icons | Remove unused icons from bundle | Already tree-shakeable by default; savings unclear | Investigate if bundle grows |
| Replace date-fns with Temporal | Native API, zero bundle cost | Temporal not yet stable in all targets | Monitor browser support |
| Chart library swap | Replace hand-drawn SVG with lightweight lib | Adds dependency; current SVGs work fine | Not needed |

## Consequences

- Short-term: 2 MB monolithic bundle is accepted. No code splitting or lazy loading.
- Long-term: revisit when thresholds above are hit. Migration path is straightforward (React.lazy per route + Vite manualChunks for vendor splitting).
- Monitoring: check bundle size after major dependency additions (`npm run build` output).

## Connections

- [[milos]] — Host application
- [[2026-04-09-bootstrap-llm-wiki]] — Wiki system where this ADR is tracked
