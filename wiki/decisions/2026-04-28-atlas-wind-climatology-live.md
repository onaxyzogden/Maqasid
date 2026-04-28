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

### Web-side fetch (vs server proxy) — deferred polish

Fetch lives in [apps/web/src/lib/wind-climatology/fetchOpenMeteoWind.ts](../atlas/apps/web/src/lib/wind-climatology/fetchOpenMeteoWind.ts),
called directly from a React hook. Rationale: Open-Meteo is CORS-enabled,
keyless, and the response is small (~1 MB / yr). Promoting to a server
adapter (`apps/api/.../openMeteoWindFetch.ts`) is a deferred polish item —
defer until either (a) we want to share the cache server-side, or (b)
client-side payload becomes a pain.

### Window: most-recent complete calendar year

`mostRecentCompleteYear(now)` returns `{ year: now.getUTCFullYear() - 1,
start: "${y}-01-01", end: "${y}-12-31" }`. ~8760 hourly samples is enough
for a stable 8-bin rose without making the payload heavy. Multi-year
averaging (3 or 5 yr rolling) is a deferred upgrade.

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

- Promote fetcher to a server adapter (`apps/api/.../openMeteoWindFetch.ts`)
  if we ever need shared cache or larger payloads.
- Multi-year (3 yr or 5 yr) rolling window for smoother rose.
- Surface "Live ERA5 / Fallback (mock)" provenance chip in the sectors
  legend so designers know which they are reading.
- Speed-weighted petals (currently frequency only — Beaufort-shaded petals
  would tell water/wind designers more).
