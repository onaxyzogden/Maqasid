---
title: "Atlas plant catalog consolidation — one snake_case canonical catalog with alias map"
date: 2026-05-14
project: atlas
status: shipped
---

# Atlas plant catalog consolidation

## Context

Atlas carried three parallel plant data sources that didn't share an id
space:

1. `apps/web/src/data/plantDatabase.ts` — ~36 entries, `pl-XXX` ids,
   perennial-leaning, layering-axis fields (canopy layer / mature size /
   light & water needs / root depth / ecological function). Consumed by
   ~15 files: guild builders, canopy simulator, transect editor, plant
   DB site-match, fertility colocation, draw tools, guild presets.
2. `apps/web/src/features/planting/plantSpeciesData.ts` — ~19 entries,
   snake_case ids (`apple`, `black_walnut`), perennial-leaning,
   site-match fields (hardiness range / drainage / spacing / yield /
   companions / daysToMaturity / canopySpread). Consumed by ~6 files:
   plantingAnalysis, propagationData via id keys, PlantingToolDashboard,
   WindShadeCanopySim, SeasonalProductivityCard.
3. `apps/web/src/features/planting/plantPhenologyData.ts` — ~15 annual
   entries shipped 2026-05-14 with the Annual Planting Calendar,
   frost-anchored phenology shape. Consumed by
   `schedulePlantingFromAreas.ts` + `AnnualPlantingCalendarCard.tsx`.

17 confirmed semantic overlap pairs between (1) and (2) — e.g. `pl-101
Apple ↔ apple`, `pl-001 Black walnut ↔ black_walnut`, `pl-501 Concord
grape ↔ grape`. Catalogs (2) and (3) shared id space but no overlap in
entries.

The pl-XXX ids were persisted in two stores: `polycultureStore`
(`guilds[].members[].speciesId`) and `cropStore`
(`cropAreas[].species[]`). Both needed migration. The Annual Planting
Calendar work surfaced the cost of carrying multiple ids — the
scheduler reads phenology by snake_case while site-match writes
pl-XXX — so consolidation became the unblocking move.

## Decision

### Canonical shape

`apps/web/src/data/plantCatalog.ts` — flat-shape union catalog,
snake_case `id` as canonical. Entry carries both axes optionally:
catalog-A layering fields and catalog-B site-match fields. Legacy
consumers see strongly-typed subsets via narrowed views; entries
populate whichever axis their source catalog supplied.

```ts
export interface PlantCatalogEntry {
  id: string;
  latinName: string;
  commonName: string;
  legacyIds?: string[];

  // catalog-A axis
  layer?: CanopyLayer;
  matureHeightM?: number;
  matureWidthM?: number;
  hardinessZones?: [number, number];
  lightNeeds?: LightNeeds;
  waterNeeds?: WaterNeeds;
  rootDepthM?: number;
  rootPattern?: RootPattern;
  ecologicalFunction?: EcologicalFunction[];

  // catalog-B axis
  category?: PlantCategory;
  hardinessRange?: [number, number];
  drainageSuitability?: string[];
  maxSlopeDeg?: number;
  spacingM?: { inRow: number; betweenRow: number };
  yieldEstimate?: { perTreeKg: number; unit: string } | null;
  frostSensitivity?: FrostSensitivity;
  waterDemand?: WaterDemand;
  companions?: string[];
  incompatible?: string[];
  daysToMaturity?: number;
  canopySpreadM?: number;
}
```

40 entries total: 17 merged overlap pairs (both axes populated) + 21
catalog-A-only (layering only) + 2 catalog-B-only (gooseberry, peach)
— plus a separate `american_chestnut` (Castanea dentata) kept distinct
from `hybrid_chestnut` (Castanea dentata × mollissima) because they are
different organisms.

### Alias map

`apps/web/src/data/plantCatalogAliases.ts` — frozen `Record<string,
string>` mapping every legacy `pl-XXX` to its snake_case canonical id.
`resolveSpeciesId(id)` returns the alias when present, the input
otherwise (identity on snake_case and on unknown ids). The runtime
`findEntry` helper runs every lookup through `resolveSpeciesId` so a
stale pl-XXX paste still resolves.

### Store migrations (Phase B)

- `polycultureStore` bumped `version 2 → 3`. `migrate` walks
  `guilds[].anchorSpeciesId`, `guilds[].members[].speciesId`, and
  `species[].speciesId` through `resolveSpeciesId`. Idempotent on
  snake_case input.
- `cropStore` bumped `version 1 → 2`. `migrate` walks
  `cropAreas[].species[]` through `resolveSpeciesId`.
- `siteAnnotationsStore` (already split into 7 namespace stores per the
  2026-04-30 ADR) does not carry plant ids; no migration needed.

### Shim layer (Phase C)

`plantDatabase.ts` and `plantSpeciesData.ts` are now thin re-export
shims:

- `plantDatabase.ts` exports `PLANT_DATABASE` and `findSpecies` as
  layering-axis-narrowed views: `PLANT_CATALOG.filter(hasLayering)`
  typed as `PlantSpecies[]`. `PlantSpecies` is now an alias for
  `PlantCatalogEntry & Required<Pick<…layering keys>>`.
- `plantSpeciesData.ts` exports `PLANT_SPECIES`, `SPECIES_BY_ID`, and
  `parseHardinessZone` as site-match-axis-narrowed views.

This keeps all ~20 existing consumers compiling and running unchanged.

### Guild presets ported (Phase D, partial)

The starter `GUILD_PRESETS` literal in `data/guildPresets.ts` was
rewritten from `pl-XXX` to canonical snake_case ids in-source.
`resolveValidPresets` also runs all incoming ids through
`resolveSpeciesId` so pre-migration persisted state stays compatible.
The test file in `data/__tests__/guildPresets.test.ts` was updated to
match. Other consumers were left on the shims — those ports can land
incrementally without blocking the ship.

### Offline migration script (Phase F)

`scripts/migrate-plant-ids.mjs` (Node ESM, stdlib only) walks any JSON
dump and rewrites legacy `pl-XXX` ids at keys `species`, `speciesId`,
and `anchorSpeciesId`. Args: `node scripts/migrate-plant-ids.mjs
<input.json> [<output.json>]`. Prints `{ rewritten, unknownIds,
pathsTouched, aliasCount }`. `scripts/lib/load-aliases.mjs`
regex-extracts the alias `Object.freeze({...})` literal from
`plantCatalogAliases.ts` at run time so the script and the runtime
share one source of truth.

## Reasoning

- **snake_case canonical** — the two newer catalogs (`plantSpeciesData`,
  `plantPhenologyData`) already used it; the pl-XXX namespace was the
  outlier and only persisted in two stores, both of which we control.
  Migrating one direction was cheaper than carrying two ids forever.
- **Flat optional shape, not nested groups** — the plan considered
  `entry.layering.*` / `entry.growing.*` groupings but rejected them
  because the cost of touching every consumer's field accesses was
  higher than the cost of optional fields. Optional fields plus
  axis-narrowed shim views give strong typing where consumers expect
  it (`PlantSpecies` from `plantDatabase.ts` still has required fields)
  without forcing a one-shot port.
- **Shims left in place** — the per-file consumer port (≈14 files
  beyond `guildPresets.ts`) was scoped out of Phase 4. Shims add no
  runtime cost; they simply re-export and filter. A follow-up arc can
  port the rest and delete the shims.
- **Phenology stays orthogonal** — `plantPhenologyData.ts` has a
  frost-anchored shape (`startIndoorsWeeksBeforeLastFrost`,
  `succession`, etc.) that doesn't overlap with the perennial axes.
  Only one caller reads it. Folding it in would have meant changing
  the entry shape again for marginal value.

## Files

- Created `apps/web/src/data/plantCatalog.ts`
- Created `apps/web/src/data/plantCatalogAliases.ts`
- Created `apps/web/src/data/__tests__/plantCatalog.test.ts`
- Created `scripts/migrate-plant-ids.mjs`
- Created `scripts/lib/load-aliases.mjs`
- Rewrote `apps/web/src/data/plantDatabase.ts` as re-export shim
- Rewrote `apps/web/src/features/planting/plantSpeciesData.ts` as re-export shim
- Modified `apps/web/src/data/guildPresets.ts` (pl-XXX literals → snake_case + resolveSpeciesId in resolver)
- Modified `apps/web/src/data/__tests__/guildPresets.test.ts` (snake_case in fixture assertions)
- Modified `apps/web/src/store/polycultureStore.ts` (v2→v3 migration)
- Modified `apps/web/src/store/cropStore.ts` (v1→v2 migration)

## Verification

- `npx tsc --noEmit` exit 0 with `NODE_OPTIONS="--max-old-space-size=8192"`.
- `npm test` 756/756 pass (including 10 new tests in `plantCatalog.test.ts`).
- `npm run build` succeeded.
- Offline script smoke-test on a fixture containing `pl-101`, `pl-001`,
  `pl-301`, `pl-501`, `apple`, `tomato`, `pl-999`: rewrote 4, preserved
  3 snake_case, flagged 1 unknown pl-XXX — output verified by hand.

## Follow-ups

- ~~Port the remaining ~14 consumers off `plantDatabase.ts` /
  `plantSpeciesData.ts` shims, then delete the shim files.~~ **Done
  2026-05-15 (Phase 5, commit `abe6d884`).** The 4 derived symbols
  (`PLANT_DATABASE`, `findSpecies`, `PLANT_SPECIES`, `SPECIES_BY_ID`)
  were promoted into `plantCatalog.ts` under their existing names; all
  20 consumers (16 layering-axis + 4 site-match-axis) repointed by
  import-path only — no call-site rewrites; both shim files deleted.
  tsc clean, 802/802 tests, build clean. Bundled into the silvopasture
  commit by a concurrent session.
- Fold `plantPhenologyData.ts` into the union catalog when a third
  caller needs both axes.
- Document the localStorage-export → `migrate-plant-ids.mjs` →
  re-import flow in the steward-facing data-portability docs once
  that surface exists.
