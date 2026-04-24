---
title: "Atlas Tier-3 — SSURGO parse + jsonb serialization fixes"
type: decision
created: 2026-04-22
tags: [atlas, olos, tier3, ssurgo, postgres, jsonb, scoring]
project: olos
---

# Atlas Tier-3 — SSURGO parse + jsonb serialization fixes

**Context:** First real end-to-end Tier-3 verification run against Rodale Institute, Kutztown PA (`projectId=26b43c47-e7a2-406f-a6cb-d2d60221a591`). Zero `site_assessments` rows existed before the run. The verification surfaced two production-blocking bugs.

## Decisions

### 1. Fix SSURGO horizon aggregation (Issue #1)
`SsurgoAdapter.postToSda` requested `format=JSON` from USDA SDA. Under that format SDA returns **data rows with no column-name header**, but `parseSdaRows` treats `table[0]` as column names. Every horizon field parsed as `null`; mukey lookup appeared to succeed only because `new Set([null,null,…])` collapses to size=1.

**Fix:** Switched the adapter to `format=JSON+COLUMNNAME`, which prepends a header row. One-line change in `apps/api/src/services/pipeline/adapters/SsurgoAdapter.ts`.

**Verification (Rodale):** Clarksburg silt loam, pH 6.37, OM 2.64%, 31 horizons, Fragipan @ 69cm, confidence=high, 5 mukeys.

Test-mock note: `SsurgoAdapter.test.ts` fixtures already included a header row, so the unit tests hid the bug. Tests are not asserting real SDA wire format — tracked as deferred.

### 2. Fix jsonb double-serialization across 5 files (Issue #2)
Every Tier-1 / Tier-3 writer interpolated `${JSON.stringify(obj)}` into a postgres.js template literal targeting a `jsonb` column. postgres.js then stored the string **as a jsonb string primitive**, not an object. `jsonb_typeof(summary_data)` = `'string'` everywhere. Downstream scorers couldn't unpack the fields, so every label collapsed to defaults.

**Canonical pattern** (already used in `SiteAssessmentWriter.ts:212`):

```ts
${this.db.json(obj as never) as unknown as string}
```

The `as never` is needed because `AdapterResult.summaryData` / `metadata` / `geojsonData` are typed as `unknown` / `Record<string, unknown>`, which don't match postgres.js's `JSONValue` recursive type.

**Files fixed:**
- `apps/api/src/services/pipeline/DataPipelineOrchestrator.ts` (layer UPDATE + error-path metadata UPDATE)
- `apps/api/src/services/terrain/WatershedRefinementProcessor.ts`
- `apps/api/src/services/terrain/SoilRegenerationProcessor.ts`
- `apps/api/src/services/terrain/MicroclimateProcessor.ts`
- `apps/api/src/services/terrain/TerrainAnalysisProcessor.ts` (14 sites: curvature / viewshed / frost-pocket / cold-air / TPI / TWI / TRI / erosion geojson + classification)

## Results (Rodale)

- `jsonb_typeof` = `object` on all 11 `project_layers` rows and all 7 `terrain_analysis` jsonb columns.
- Overall site score: **50 → 78**.
- Agricultural Suitability **100 (high)**, Regenerative Potential **82 (low)**, Water Resilience 85, FAO 84, USDA 74 — all above or in the expected 60–80 band.
- `verify-scoring-parity.ts 26b43c47-…` → exit 0, determinism PASS, DB parity delta = 0.000.
- Writer/scorer agreement confirmed.

## Known real-data caveats (not bugs)

- **OM 2.64%** (below the user's ≥3% expectation for Rodale): reflects SSURGO survey averages for the Clarksburg series at this location. SSURGO generalises across decades and doesn't capture site-specific long-term organic management.
- **Overall confidence = low**: driven by Tier-3 derived layers (microclimate, habitat, soil_regen) declaring low confidence, not by data-pipeline issues.

## Why this pattern, not alternatives

- `JSON.stringify()` is idiomatic Node but wrong for postgres.js template literals — the driver already knows how to encode values, and strings inside a jsonb slot are treated as primitives.
- Widening `AdapterResult` fields to `JSONValue` would force every adapter to thread the type through; `as never` at the call site is a localised cast that matches the existing `SiteAssessmentWriter` pattern and keeps the adapter interface open.

## Connections

- [[olos]] — pipeline lives in `atlas/apps/api`
- [[bbos-pipeline]] — Atlas site assessments are upstream of BBOS land-strategy stages
