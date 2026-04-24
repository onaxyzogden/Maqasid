---
title: "Atlas CA Tier-3 verification — HRDEM CRS fix, ECCC date coercion, writer race closure"
type: decision
created: 2026-04-24
updated: 2026-04-24
tags: [atlas, olos, canada, tier3, hrdem, eccc, scoring, bugfix]
project: atlas
---

# Atlas CA Tier-3 Verification — CA-1 / CA-2 / CA-3 / CA-4

**Context:** First real end-to-end Tier-3 verification against a Canadian site (Milton, ON — project `467f8ad4-3c90-459d-881d-7d76ad62c204`, 53.24 acres). The US/Rodale run on 2026-04-22 was already green (parity delta 0.000), so the goal was to prove the pipeline on the Canadian data path: NRCan HRDEM elevation + ECCC climate + provincial soils. Four distinct defects surfaced, all of them pre-existing latent bugs that the US fork never exercised.

## Defects and fixes

### CA-1 — NRCan HRDEM STAC query returned HTTP 500
- **Symptom:** `findCogUrl` against `datacube.services.geo.ca/stac/api/search` returned HTTP 500: `'properties.datetime' is not a valid Queryables`.
- **Cause:** STAC API exposes `datetime` directly as a queryable, not `properties.datetime`.
- **Fix (`ElevationGridReader.ts`):** `sortby: [{ field: 'datetime', direction: 'desc' }]`. Verified with a direct curl — returns TRCA-GTA_2023-1m + NRCAN-HALTON-1m tiles for Milton's bbox.

### CA-2 — ECCC adapter crashed Postgres date serializer
- **Symptom:** "Invalid time value" on the `climate` layer insert.
- **Cause:** `EcccClimateAdapter.fetchForBoundary` returned `dataDate: normals.data_period`, which was a period label (`"1981-2010"` or `"Estimated"`) not a date. postgres.js rejected it when binding a `date` column.
- **Fix (`EcccClimateAdapter.ts`):** Parse start year via `/^(\d{4})[–-]/`, coerce to `${year}-01-01`, fall back to `null` when the label has no year. Real date lands in the column; no-year labels simply drop `data_date` instead of crashing the whole insert.

### CA-3 — NRCan HRDEM CRS mismatch → spurious "numeric field overflow"
- **Symptom:** `compute_terrain` failed with Postgres `numeric field overflow` on a Milton-sized parcel. `compute_microclimate` then cascaded with `missing terrain_analysis`.
- **Real cause (not a column-width issue):** HRDEM COGs are stored in **EPSG:3979 (NAD83(CSRS) / Canada Atlas Lambert)**, with origin in projected metres (e.g. `(1 201 355, −354 010)` for TRCA-GTA). `ElevationGridReader.readNrcanHrdem` computed the pixel read window directly from lon/lat, so `px0 = (minLon − originX) / resX` with `originX = 1 201 355` and `minLon = −79.88` resolved to a wildly negative pixel index, clamped to `0`. The resulting 1-pixel window sat on the tile's nodata edge → `validCount = 0` → `minElev = Infinity` / `maxElev = −Infinity` → Postgres rejected `Infinity` as `numeric field overflow`. The US 3DEP path never triggered this because USGS WCS returns EPSG:4326 rasters directly.
- **Fixes:**
  - **`ElevationGridReader.ts`:** added `proj4` + `@types/proj4`, registered EPSG:3979, reproject the bbox corners before computing the pixel window.
  - **`TerrainAnalysisProcessor.ts`:** fail fast with a readable message if `validCount === 0` or min/max are non-finite, so any future CRS/window regression surfaces as "Elevation grid has no valid pixels for project X — likely a CRS/window mismatch", never again as "numeric field overflow".
  - **`migrations/014_widen_terrain_numerics.sql`:** widened `erosion_{mean,max}`, `twi_mean`, `tri_mean_m`, `curvature_{profile,plan}_mean`. Not load-bearing for this specific bug, but 1m HRDEM is genuinely higher-resolution than the schema originally assumed; keeping as defence.
- **Verification:** Milton terrain row now has real values: elevation 193.88–203.42 m (mean 200.04), TWI 4.43, TRI 0.05 m, erosion mean 0.17 / max 11.11 t/ha/yr, curvature ≈ −0.001; `source_api=nrcan_hrdem`, `confidence=high`.

### CA-4 — writer-vs-layers race produced stale assessment v1
- **Symptom:** After CA-3 landed and Tier-3 completed, `verify-scoring-parity.ts` reported delta = 2.0 (DB 71.0 vs rescore 73.0) — yet determinism PASS and consecutive rescores were byte-identical.
- **Cause:** `maybeWriteAssessmentIfTier3Complete` gated on `count(data_pipeline_jobs.status='complete') >= 4` only. The microclimate job status flipped to `complete` ~1 second before the `project_layers.microclimate` row was visible on the writer's pool connection (evidence: `site_assessments` v1 `data_sources_used` had 10 entries, no `microclimate`; v2 rewrite had 11 entries; v1 overall = 71, v2 = 73; 4 labels differed — Agricultural Suitability 84→91, Stewardship Readiness 88→89, Water Resilience 57→64, Water Retention 18→21). A forced rewrite produced 73.0 matching the fresh parity rescore exactly.
- **Fix (`SiteAssessmentWriter.ts`):** writer now additionally requires `project_layers` rows for `microclimate`, `watershed_derived`, and `soil_regeneration` with `fetch_status = 'complete'` before it will write. Closes the race structurally — no further layer-ordering assumption needed in the Tier-3 workers themselves.
- **Final verification:** `verify-scoring-parity.ts` — DB 73.0 vs rescore 73.0, delta = 0.000, determinism PASS.

## Outcome

End-to-end CA pipeline is green. Milton, ON overall score **73.0** with 14 labels; writer/scorer parity exact. Two defects (CA-1, CA-2) were simple data-format bugs; two (CA-3, CA-4) were structural — the first a latent CRS assumption, the second a latent commit-visibility race — and both were only exposed by running real Canadian data through the full Tier-3 fan-out.

## Files changed

- `apps/api/src/services/terrain/ElevationGridReader.ts` — STAC queryable, EPSG:3979 reprojection.
- `apps/api/src/services/pipeline/adapters/EcccClimateAdapter.ts` — date coercion.
- `apps/api/src/services/terrain/TerrainAnalysisProcessor.ts` — empty-grid fail-fast.
- `apps/api/src/services/assessments/SiteAssessmentWriter.ts` — derived-layer presence gate.
- `apps/api/src/db/migrations/014_widen_terrain_numerics.sql` — widen 6 terrain numeric columns.
- `apps/api/package.json` — added `proj4`, `@types/proj4`.

## Connections

- [[olos]]
- [[2026-04-22-atlas-jsonb-serialization-and-ssurgo-parse]] — prior Tier-3 verification (Rodale/US)
