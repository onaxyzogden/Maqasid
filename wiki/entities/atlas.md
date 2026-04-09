---
title: "Atlas"
type: entity
created: 2026-04-09
updated: 2026-04-09
tags: [product, geospatial, land-design, react, typescript, mapbox, supabase, ontario]
sources: 0
---

# Atlas

OGDEN Land Design Atlas is a geospatial land intelligence web application linked as a git submodule at `atlas/` in the [[maqasid-os]] monorepo (added 2026-04-09). It lives in a separate repository (onaxyzogden/atlas) with its own monorepo structure using pnpm workspaces and Turborepo. The frontend is React 18 + TypeScript + Vite + MapboxGL JS v3 + Deck.gl; the backend is Fastify + PostgreSQL/PostGIS + Redis/BullMQ with Supabase Auth. Deployed to atlas.ogden.ag. Currently in Phase 1 (Site Intelligence), focused on Ontario with Conservation Halton jurisdiction data.

## Key Facts

- **Location:** `atlas/` git submodule in [[maqasid-os]]; source repo: onaxyzogden/atlas
- **Monorepo tooling:** pnpm workspaces + Turborepo
- **Frontend:** React 18 + TypeScript + Vite + MapboxGL JS v3 + Deck.gl
- **Backend:** Fastify + PostgreSQL/PostGIS + Redis/BullMQ
- **Auth:** Supabase Auth
- **Deployment:** atlas.ogden.ag
- **Current phase:** Phase 1 — Site Intelligence
- **Geographic focus:** Ontario, Canada — Conservation Halton jurisdiction
- **Integration method:** git submodule (added 2026-04-09)

## Current Status

Phase 1 (Site Intelligence) in active development. Submodule linked into the [[maqasid-os]] monorepo but maintains its own independent build pipeline, dependencies, and deployment target. The app is Ontario-focused, ingesting Conservation Halton jurisdiction and geospatial data layers.

## Connections

- [[maqasid-os]] — Parent monorepo; atlas linked as git submodule at `atlas/`
- [[ogden-hub]] — Marketing site includes an Atlas product landing page
- [[bbos-pipeline]] — Land assessment outputs may feed into BBOS strategy stages
- [[maqasid-al-shariah]] — Land stewardship aligns with preservation of wealth and environment maqasid

## Open Questions

- What is the Phase 2 roadmap after Site Intelligence?
- Will Atlas share any auth or data layer with [[maqasid-os]], or remain fully decoupled?
- How will Conservation Halton data be kept current — manual refresh or automated pipeline?
- Is there a plan to expand beyond Ontario jurisdictions?

## History

| Date | Event |
|---|---|
| 2026-04-09 | Wiki entity page bootstrapped. Atlas linked as git submodule in maqasid-os monorepo. Phase 1 (Site Intelligence) in progress. Deployed to atlas.ogden.ag. |
