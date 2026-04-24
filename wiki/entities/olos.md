---
title: "OLOS"
type: entity
created: 2026-04-09
updated: 2026-04-24
tags: [product, geospatial, land-design, react, typescript, mapbox, supabase, ontario]
sources: 0
---

# OLOS

OLOS (OGDEN Land OS) is a geospatial land intelligence web application linked as a git submodule at `atlas/` in the [[milos]] monorepo (added 2026-04-09). It lives in a separate repository (onaxyzogden/atlas) with its own monorepo structure using pnpm workspaces and Turborepo. The frontend is React 18 + TypeScript + Vite + MapboxGL JS v3 + Deck.gl; the backend is Fastify + PostgreSQL/PostGIS + Redis/BullMQ with Supabase Auth. Deployed to atlas.ogden.ag. Currently in Phase 1 (Site Intelligence), focused on Ontario with Conservation Halton jurisdiction data.

## Key Facts

- **Location:** `atlas/` git submodule in [[milos]]; source repo: onaxyzogden/atlas
- **Monorepo tooling:** pnpm workspaces + Turborepo
- **Frontend:** React 18 + TypeScript + Vite + MapboxGL JS v3 + Deck.gl
- **Backend:** Fastify + PostgreSQL/PostGIS + Redis/BullMQ
- **Auth:** Supabase Auth
- **Deployment:** atlas.ogden.ag
- **Current phase:** Phase 1 — Site Intelligence
- **Geographic focus:** Ontario, Canada — Conservation Halton jurisdiction
- **Integration method:** git submodule (added 2026-04-09)

## Current Status

Phase 1 (Site Intelligence) in active development. Submodule linked into the [[milos]] monorepo but maintains its own independent build pipeline, dependencies, and deployment target. The app is Ontario-focused, ingesting Conservation Halton jurisdiction and geospatial data layers.

**2026-04-24:** First real end-to-end Tier-3 verification against a Canadian site (Milton, ON) passed. Four latent CA-path defects surfaced and fixed: CA-1 NRCan HRDEM STAC queryable (`datetime` not `properties.datetime`), CA-2 ECCC `data_period` label breaking Postgres date binding, CA-3 HRDEM CRS mismatch (COGs are EPSG:3979 — pixel-window math treated lon/lat as projected metres → `validCount=0` → spurious "numeric field overflow"), CA-4 writer-vs-layers race where `site_assessments` was written before `project_layers.microclimate` was visible. Milton overall score 73.0, parity delta 0.000. See [[2026-04-24-atlas-ca-tier3-verification-crs-and-race-fixes]].

**2026-04-22:** First real end-to-end Tier-3 verification against Rodale Institute, PA passed. Two production-blocking bugs fixed: SSURGO SDA parse (`format=JSON` returned no header row) and jsonb double-serialization across 5 writers. DB↔scorer parity PASS (delta = 0.000). Rodale overall score 78.0, Agricultural Suitability 100, Regenerative Potential 82. See [[2026-04-22-atlas-jsonb-serialization-and-ssurgo-parse]].

**2026-04-24:** §6 Solar/Wind/Climate Analysis Phase 4 shipped — three map overlays (microclimate opportunity, comfort grid, windbreak candidates on main Mapbox map) plus a new planning-grade comfort-grid compute endpoint. Feature manifest flipped `seasonal-comfort-outdoor-seasonality` and `microclimate-adaptation-recommendations` from `partial` → `done`. Remaining §6 item `windbreak-ventilation-corridors` stays `partial` pending §9 Structures obstacle model. All overlays mirror the canonical `ViewshedOverlay` pattern (fetch-on-visible + style.load re-sync + spine-btn compact toggle).

## Connections

- [[milos]] — Parent monorepo; atlas linked as git submodule at `atlas/`
- [[ogden-hub]] — Marketing site includes an OLOS product landing page
- [[bbos-pipeline]] — Land assessment outputs may feed into BBOS strategy stages
- [[maqasid-al-shariah]] — Land stewardship aligns with preservation of wealth and environment maqasid

## Open Questions

- What is the Phase 2 roadmap after Site Intelligence?
- Will OLOS share any auth or data layer with [[milos]], or remain fully decoupled?
- How will Conservation Halton data be kept current — manual refresh or automated pipeline?
- Is there a plan to expand beyond Ontario jurisdictions?

## History

| Date | Event |
|---|---|
| 2026-04-24 | End-to-end Tier-3 verification on Milton, ON (CA). CA-1/CA-2/CA-3/CA-4 fixed. Parity PASS (delta 0.000). |
| 2026-04-09 | Wiki entity page bootstrapped. OLOS linked as git submodule in maqasid-os monorepo. Phase 1 (Site Intelligence) in progress. Deployed to atlas.ogden.ag. |
