---
title: "Atlas — Live Wind Climatology (Open-Meteo ERA5) for Diagnose Wind Rose"
type: decision
project: olos
created: 2026-04-28
status: shipped
tags: [atlas, diagnose, permaculture, wind, climate, open-meteo, era5]
---

# Atlas — Live Wind Climatology

The Diagnose page wind rose is now driven by real ERA5 reanalysis data
fetched from Open-Meteo, keyed off the effective anchor (homestead → boundary
centroid → fallback). Pedagogical Eastern-Ontario defaults remain as silent
fallback when the fetch fails or the payload is empty. Atlas commit `aca86a6`
on `feat/atlas-permaculture`.

## Context

`feat(diagnose): wind-prevailing sectors overlay` (commit `35d82e4`) shipped
the wind-rose UI atop hand-tuned `DEFAULT_FREQUENCIES` representing
W/NW-prevailing Eastern-Ontario climatology. Defaults made the rose
pedagogically correct for MTC but useless anywhere else — the petals would
not change shape when a designer placed a homestead in a different
parcel/region. To honor the permaculture Diagnose principle ("the land tells
us"), the rose must reflect the actual site's wind regime, not a regional
average baked into the codebase.

## Decision

### Source: Open-Meteo Archive API (ERA5)

Endpoint: `https://archive-api.open-meteo.com/v1/archive`. ERA5 reanalysis
hourly samples, keyless, CORS-enabled, no rate limits relevant at our scale.
Picked over NASA POWER (already used server-side for solar) because:
1. Hourly direction + speed at 10 m above ground — needed for proper
   compass binning.
2. CORS-enabled — no Fastify proxy required for v3.4.
3. Free, no auth, no quota gate.

### Server-side proxy (promoted from web-side fetch on 2026-04-28)

Initially landed as a browser-side fetcher (`apps/web/src/lib/wind-climatology/fetchOpenMeteoWind.ts`)
called directly from `useWindClimatology`. Promoted to a Fastify adapter on
the same day to remove the dependency on archive-api.open-meteo.com's CORS
posture and keep the binning policy centralized.

- Adapter: [apps/api/src/services/climate/openMeteoWindFetch.ts](../atlas/apps/api/src/services/climate/openMeteoWindFetch.ts)
  mirrors the `nasaPowerFetch.ts` pattern (pino logger, 12 s timeout, single
  5xx retry, silent null on any failure). Binning + calm-filter (0.5 m/s) +
  most-recent-complete-year window-selection live here.
- Route: `GET /api/v1/climate-analysis/wind-rose?lat=..&lng=..` —
  unauthenticated, gated by `requirePhase('P1')` and global rate limit.
  Validates lat ∈ [-90, 90] / lng ∈ [-180, 180] (400 INVALID_LAT / INVALID_LNG).
  Returns 502 + `WIND_ROSE_UNAVAILABLE` on adapter null; web client maps
  that to `null` so the hook surfaces `status: 'fallback'`.
- Payload: server returns binned `WindFrequencies` (~200 B) instead of raw
  hourly samples (~1 MB). Web payload is now tiny.
- Web client: `api.climateAnalysis.windRose(lat, lng, signal)` in
  `apps/web/src/lib/apiClient.ts`. The browser-side fetcher and binner
  files were deleted; only `quantizeAnchor.ts` + `cache.ts` remain web-side.
- Redis cache: `apps/api/src/services/climate/windRoseCache.ts` — key
  prefix `wind-rose:v1:${qLat}:${qLng}` with anchor quantized to 0.1° to
  match the web-side cache, 30-day TTL via `setex`, 200 ms timeout +
  silent-error wrapper so a degraded Redis never fails the request. The
  route writes the cache fire-and-forget after the upstream fetch so the
  response never blocks on Redis. Response envelope adds
  `meta.cached: boolean` for ops visibility.

### Window: 3 most-recent complete calendar years (rolling)

`mostRecentCompleteYears(n=3, now)` returns `{ startYear: y-2, endYear: y,
start: "${y-2}-01-01", end: "${y}-12-31" }` where `y = now.getUTCFullYear() - 1`.
~26 280 hourly samples (~3× one year) smooths year-to-year jet-stream noise
so the rose reflects climatology, not the latest anomalous year. Single fetch
to Open-Meteo — payload is still small and well under the 12 s timeout.

Promoted from 1-yr to 3-yr on 2026-04-29. Verified live at MTC anchor
`[-78.2, 44.5]`: `windowYears: { start: 2023, end: 2025 }`, sampleCount
26 304, frequencies W=0.214, NW=0.194, SW=0.133, S=0.098, E=0.103 (vs.
the 1-yr W=0.217, NW=0.203, SW=0.138 — smoother distribution, same
W/NW-prevailing regime). Bumped both cache prefixes to `v2` so stale
1-yr payloads don't get served (server: `wind-rose:v2:…`; web localStorage:
`ogden-atlas-wind-clim-v2:…`). 5-yr rolling is a further deferred upgrade
if ever needed.

### Quantization: 0.1° (~11 km) cache key

Wind climatology is regional, not parcel-local — the rose at lat/lng X
and lat/lng X + 50 m is statistically identical. `quantizeAnchor(anchor,
0.1)` rounds the anchor to a 0.1° grid before hashing into the cache key,
so a designer dragging the homestead within a parcel does NOT trigger
re-fetches. Cap is large enough that a single 11 km cell almost always
covers an entire CSRA-relevant parcel.

### Cache: localStorage, 30-day TTL, versioned key

Key prefix: `ogden-atlas-wind-clim-v1:`. TTL 30 days (climatology shifts
on decadal scales; 30 days is plenty fresh). Versioned prefix lets us
invalidate-by-redeploy if the binning logic changes. Storage helper is
SSR-safe (`typeof window === 'undefined'` early return) and swallows
quota errors silently.

### Calm-hour filter: 0.5 m/s

Hourly samples below 0.5 m/s have undefined or noisy direction (vane
flapping in still air). Filtered out before binning. Aligns with
WMO conventions for calm-wind reporting.

### Failure policy: silent null + DEFAULT_FREQUENCIES fallback

Mirrors `apps/api/.../nasaPowerFetch.ts`: single retry on 5xx, no retry on
4xx, return null on any error including timeout (15 s) or empty payload.
Caller (`useWindClimatology` hook) receives `status: 'fallback'` and the
DiagnosePage simply omits the override — `computeWindSectors(anchor)` then
uses the pedagogical defaults. No banner, no toast — the rose is
authoritative either way; provenance is stamped on `sources[].provenance`.

### Hook: `useWindClimatology(anchor)` re-fires only on quantum change

The hook quantizes anchor before useEffect dependency tracking, so
sub-quantum drags (e.g., dragging the homestead 200 m around) do NOT
re-fire the fetch. AbortController cleans up in-flight requests on
unmount or quantum change.

### Beaufort-shaded petals (added 2026-04-29)

Promoted petals from a single-color rose to a Beaufort-tinted ramp keyed by
per-bin mean wind speed (m/s). Length is still frequency-driven; color now
reads intensity. Adapter already pulled `wind_speed_10m`, so we threaded
mean-speed-per-bin through the existing payload pipeline.

- Adapter: `binHourlyToFrequencies` now returns `{ frequencies, meanSpeedsMs }`
  where `meanSpeedsMs[code] = sum(speed in bin) / count(bin)` and is `null`
  for bins with zero non-calm samples (lets renderers fall back to neutral
  instead of mis-coloring with the lowest band).
- Payload: `OpenMeteoWindResult.meanSpeedsMs: WindMeanSpeeds` (new field;
  optional on the wire/cache shape so v2 entries pre-Beaufort still render).
- Web type: `WindRoseResponse.meanSpeedsMs?` in `apiClient.ts` (also fixed
  a latent `windowYear: number` → `windowYears: { start, end }` mismatch
  from the 3-yr-window change).
- Web cache: `CacheEntry.meanSpeedsMs?` on the localStorage shape; same v2
  prefix (forward-compatible — old v2 entries simply lack the field).
- Hook: `useWindClimatology` surfaces `meanSpeedsMs: WindMeanSpeeds | undefined`
  alongside `frequencies`.
- Sectors: new `beaufortColor(meanSpeedMs)` lookup with bands at 3.4 / 5.4 /
  7.9 m/s (Beaufort boundaries → light air, gentle, moderate, fresh+).
  Estate-aligned colors: `#7aa3b8` (light teal) → `#5b7a8a` (mid teal) →
  `#b08a3a` (estate gold) → `#8a4f3a` (fired clay). `null` / missing speed
  falls back to the neutral mid teal so a missing-data petal looks the same
  as the prior single-color rose. `computeWindSectors(anchor, { meanSpeedsMs })`
  threads the per-bin lookup; `wedge.color` is the Beaufort tint and
  `wedge.meta.meanSpeedMs` is exposed for any future legend.
- DiagnosePage: hook → `liveWindMeanSpeedsMs` → `computeWindSectors` opts.
- Tests: `openMeteoWindFetch.test.ts` adds two cases (W=5 m/s / others null;
  mixed W=4 + E=8 with independent per-bin means). `wind.test.ts` adds 8
  cases (per-band color assertions, missing-speed fallback, meta threading).

Live verified at MTC anchor `[-78.2, 44.5]`: all 8 bins land in the 2.7-3.8
m/s range — 10 m anemometer height for E. Ontario sits squarely in light /
gentle breeze territory, so the rose reads in two close teal shades. Higher
sites (coastal, ridge-top, taller anemometer) will exercise the gold and
fired-clay bands.

### Provenance: `sourceLabel` on `ComputeWindSectorsOptions`

`computeWindSectors(anchor, { frequencies, sourceLabel })` now stamps
`sources[].provenance` with the caller-supplied label. Live: "Open-Meteo
ERA5 (hourly, most recent complete year)". Fallback: "Eastern Ontario
pedagogical climatology — W/NW prevailing (mock)". Visible in any future
sources panel without overlay refactor.

## Verification

- vitest: 72/72 pass (was 46; +18 helper tests + 8 fetcher tests)
- vite build: clean in 41.31 s
- Browser preview (`/v3/project/mtc/diagnose`, MTC anchor `[-78.198, 44.502]`):
  Cache entry created at `ogden-atlas-wind-clim-v1:-78.20:44.50` with live
  ERA5 frequencies — W=0.217, NW=0.203, SW=0.138, S=0.115, E=0.098,
  NE=0.080, SE=0.076, N=0.073. Westerlies dominant, matches pedagogical
  expectation. Source string: "Open-Meteo ERA5 (hourly, most recent
  complete year)". Wind rose renders W as longest petal labeled "W 22%".

## Files

Atlas (`feat/atlas-permaculture` commit `aca86a6`):

- `apps/web/src/lib/wind-climatology/binHourlyToFrequencies.ts` (new)
- `apps/web/src/lib/wind-climatology/quantizeAnchor.ts` (new)
- `apps/web/src/lib/wind-climatology/cache.ts` (new)
- `apps/web/src/lib/wind-climatology/fetchOpenMeteoWind.ts` (new)
- `apps/web/src/lib/wind-climatology/__tests__/helpers.test.ts` (new, 18 tests)
- `apps/web/src/lib/wind-climatology/__tests__/fetchOpenMeteoWind.test.ts` (new, 8 tests)
- `apps/web/src/v3/data/useWindClimatology.ts` (new)
- `apps/web/src/lib/sectors/wind.ts` (modified — `sourceLabel` option)
- `apps/web/src/v3/pages/DiagnosePage.tsx` (modified — hook wired)

## Deferred

- ~~Promote fetcher to a server adapter~~ — **shipped 2026-04-28**, see
  "Server-side proxy" section above.
- ~~Multi-year (3 yr) rolling window for smoother rose~~ — **shipped
  2026-04-29**, see "Window: 3 most-recent complete calendar years"
  section above. 5-yr rolling still deferred.
- ~~Surface "Live ERA5 / Fallback (mock)" provenance chip~~ — shipped
  earlier (commit `1beb6f5`).
- ~~Speed-weighted petals (currently frequency only — Beaufort-shaded petals
  would tell water/wind designers more).~~ — **shipped 2026-04-29**, see
  "Beaufort-shaded petals" section above.
- ~~Server-side cache (Redis) for the wind-rose adapter~~ — **shipped
  2026-04-28**, see "Redis cache" bullet under "Server-side proxy" above.
