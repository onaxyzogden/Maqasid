---
title: "Atlas: field-verification axis — wire multi-year observations into layer confidence (OLOS gap #10)"
type: decision
date: 2026-05-23
status: accepted
tags: [atlas, observe, confidence, field-verification, soil-samples, monitoring-transects, living-loop, shared, web]
superseded_by: null
---

# Atlas: field-verification axis — wire multi-year observations into layer confidence (OLOS gap #10)

## Context

The [[olos-story-codebase-map]] (Atlas wiki) identified the "living seasonal
loop" (story Ch15, capability #10) as the highest-value remaining gap: a steward
logs real field observations over years (soil samples via `soilSampleStore`,
monitoring transects via `monitoringTransectStore`), but **nothing flowed that
ground-truth back into the data layers**. Layer confidence is a static 3-tier
enum (`high|medium|low`) hardcoded per data-source at fetch time
(`packages/shared` confidence schema), recomputed fresh every session into
`apps/web/src/store/siteDataStore.ts`, and **immutable at runtime** — so a
steward who has soil-tested the north paddock five years running saw the same
SoilGrids confidence as on day one. The land was being read, but the reading
never updated the map's belief about the land.

Four design forks were resolved with the steward before implementation:
(1) **Sources v1** = soil samples + monitoring transects only (lab-/measurement-
backed, cleanest topic→layer mapping); (2) **Model** = a *distinct second axis*
shown alongside source confidence, **never silently merged** into it;
(3) **Granularity** = sub-region (verification applies near where it was
observed, not blanket across the parcel); (4) **Recency** = sustained with decay
(recent/repeated observations raise verification, stale ones fade).

## Decision

Add a second, distinct **field-verification axis**
(`unverified | corroborated | verified`) derived on the fly from the existing
observation stores — surfaced everywhere source confidence already shows, and as
a decaying glow on the Observe map — **without ever mutating source confidence**.

**Derive, don't duplicate.** Both observation stores already `persist` to
localStorage with `location`/`date` fields, so the verification axis is computed
on demand from them. No new persisted store, single source of truth, auto-updates
as the steward logs.

Two-layer split mirrors the existing pure-vs-turf separation in the codebase:

- **Pure scalar/temporal core** — `packages/shared/src/fieldVerification/`
  (`types.ts`, `computeFieldVerification.ts`, `index.ts`), turf-free:
  - `decayWeight(observedAt, asOf, halfLifeYears = 3)` → `0.5 ** (ageYears / halfLifeYears)` (exponential decay; stale obs fade).
  - `TOPIC_TO_LAYERS`: soil-sample / soil-health → `['soils']`; water-quality → `['watershed','wetlands_flood']`; invasives / indicator-species / wildlife → `['land_cover']`; general → `[]`.
  - `levelFromWeight(weight)` thresholds: `≥1.5` verified, `≥0.5` corroborated, else unverified (`VERIFICATION_THRESHOLDS`).
  - `aggregateByLayer(contributions, asOf)` → `LayerFieldVerification[]` (sum decayed weights per layer; track count + most-recent date).
- **Geometry + React glue** — `apps/web/src/lib/fieldVerification/`:
  - `buildVerificationZones.ts` — turf-backed: buffers each observation into an influence polygon (point sample → 150 m, transect → 75 m), tags each with its decayed contribution, returns a `FeatureCollection<Polygon, VerificationZoneProps>`; `verificationAt(point, layerType, zones)` reuses `isInside` from `spatialSampling.ts`.
  - `useFieldVerification.ts` — hook reading `useSoilSampleStore` + `useMonitoringTransectStore` for the active project, feeding dated/located records through the shared core + zone builder, `useMemo`-keyed on `[projectId, samples, transects, asOf]`. Returns `{ perLayer, zones }`.

**Surfacing** (display both axes, everywhere layer confidence shows, plus the
living map):
- `apps/web/src/features/assessment/FieldVerificationBadge.tsx` — a second pill (earth-green palette: verified `#2a6a3a`, corroborated `#7a7a2a`, unverified `#8a7a68`), sibling to `ConfidenceIndicator`.
- `DataCompletenessWidget.tsx` + `components/panels/EducationalAtlasPanel.tsx` — per-layer field-verification readout alongside the existing source-confidence display.
- `v3/observe/components/layers/ObserveAnnotationLayers.tsx` — a `field-verification` `LayerSpec` (fill + dashed line, opacity/colour by level via a `match` expression on `level`) so verified sub-regions visibly glow and fade with decay.
- `packages/shared/src/index.ts` + `package.json` — barrel + subpath export for the new module.

## Rationale

The grounding/honesty culture is the load-bearing reason for the *distinct-axis*
choice: an eyeballed or self-logged field reading must **not** masquerade as USGS
/ SoilGrids authority. Source confidence answers "is the dataset present and how
authoritative is its provenance?"; field verification answers "has a steward
confirmed it on the ground, recently?". Merging them would let casual observation
inflate institutional confidence — exactly the conflation the project's
provenance discipline forbids. Keeping them orthogonal preserves both signals.

Deriving from the existing persisted stores (rather than adding a fourth
persisted structure) means the axis is always consistent with the steward's
logged record and updates the instant they log — there is no sync seam to drift.
The decay model is what makes "verified" a *maintained* state rather than a
one-time stamp, which is the essence of the multi-year living loop the story
depicts.

## Alternatives Considered

- **Merge field verification into source confidence (single axis)** — rejected
  per the steward's design choice and the provenance-honesty culture; it would
  let ground observation silently overwrite institutional provenance.
- **Bump `computeScores.ts` to factor in verification** — deliberately NOT done
  in v1; the scoring engine stays on source-confidence only so the axes remain
  distinct (no conflation). Optional follow-on.
- **A new persisted `fieldVerificationStore`** — rejected; it would duplicate
  data already in the two observation stores and introduce a drift seam. Derive
  on the fly instead.
- **Standalone `FieldVerificationOverlay.tsx` map component** (as the plan
  sketched) — superseded during implementation by integrating one
  `field-verification` `LayerSpec` into the existing `ObserveAnnotationLayers`
  host: lower risk, consistent with the established MapLibre layer-spec pattern,
  fewer mount points. (Deliberate plan deviation, recorded here.)

## Consequences

- A steward's repeated, recent field work now visibly strengthens a sub-region's
  field-verification level and glows on the Observe map; stale observations decay
  and fade — confidence in the *ground-truth* sense is now living, not static.
- Source confidence is unchanged and still authoritative on provenance; the two
  axes are shown side by side, never blended.
- No schema or persisted-store change; works whether the underlying layer summary
  is a real-adapter fetch or the dev `MockLayerResult` shape (the axis attaches
  at the web display layer).
- Buffer radii (150 m point / 75 m transect) and decay half-life (3 yr) are
  first-guess constants, named in one place each for easy tuning.
- **Deferred:** factoring verification into `computeScores`; the "What This Land
  Wants" narrative mentioning field-verification; the year-scrubber tie-in
  (compute `asOf` from `temporalScrubStore` to animate decay over the timeline).
- Verification: `@ogden/shared` field-verification unit suite **15/15**
  (decay halves at the 3 yr half-life; a lone 6 yr sample lands `unverified`;
  three recent nearby soil samples aggregate to `verified`; water-quality maps to
  both hydrology layers). `apps/web` typecheck clean for all 6 touched/new files
  (only the documented 3-error pre-existing baseline remains, in untouched files).
  App boots console-clean. Both shipped modules (shared core + web geometry) were
  exercised in the **live browser bundle** via Vite `/@fs/` dynamic imports —
  decay, aggregation, topic mapping, buffer geometry, and spatial membership all
  confirmed on the actual shipped code. `preview_screenshot` timed out (the
  documented WebGL/Windows capture-hang); per project policy, verification was
  done via DOM/runtime exercise and reported honestly rather than asserted
  visually. Committed in two slices on `feat/atlas-permaculture`: `aae29096`
  (shared core) and `9bd46f84` (web glue + UI surfacing, 6 files, +506).

## Connections

- [[olos]] — Atlas Observe / layer confidence
- [[olos-story-codebase-map]] — closes the actionable half of gap #10 (the
  observation→confidence feedback wire), as a distinct field-verification axis
- [[2026-05-16-atlas-pasture-regeneration]] — sibling living-loop work on the
  same rebased `feat/atlas-permaculture` branch (steward-sovereign ground-truth)
- [[maqasid-al-shariah]] — honest reading of the land (Environment / iḥyāʾ
  al-mawāt); provenance honesty preserved by keeping the axes distinct
