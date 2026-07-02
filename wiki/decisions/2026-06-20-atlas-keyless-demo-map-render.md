---
title: "OLOS keyless map rendering for the offline demo (Esri satellite fallback)"
type: decision
date: 2026-06-20
status: accepted
tags: [olos, demo, offline, maptiler, esri, maplibre, vite, feature-flag, dead-code-elimination]
superseded_by: null
---

# OLOS keyless map rendering for the offline demo

**Status:** Accepted + implemented (2026-06-20). Direct follow-up to [[2026-06-19-atlas-offline-demo-deploy]]. In the offline demo build (`FEATURE_DEMO_OFFLINE=true`, live at `try.atlas.ogden.ag`, landing on `/v3/portfolio`) every map now falls back to the **keyless Esri World Imagery** satellite basemap instead of the `<MapTokenMissing />` paste-wall. The authenticated product stays **byte-identical** because in normal builds `process.env.FEATURE_DEMO_OFFLINE` is `define`-replaced with the literal `false`, so the new gate collapses to `hasMapToken` and the demo branch is dead-code-eliminated.

## Context

The offline demo ships **no MapTiler key** (Option 1 deliberately did not bundle a key for the maps — distinct from the `DEMO_MAPTILER_KEY` referrer-locked option discussed in the deploy ADR). Until now every map gated on `hasMapToken` → a keyless visitor hit `<MapTokenMissing />` instead of a map, even though a fully **keyless Esri World Imagery** raster basemap already existed and was proven in production at `ObserveMap.tsx:95`. Key facts verified during exploration:

- `MAP_STYLES.satellite` **is** `ESRI_WORLD_IMAGERY_STYLE` (keyless raster); all other `MAP_STYLES.*` are `...?key=${key}` URLs that 403 / serve `key=undefined` keyless.
- `MapCanvas` does **not** gate at its own init — it delegates to `useMaplibre.ts`, which has its **own** hard guard + a style line resolving `key=undefined`; both had to change or MapCanvas stays blank in demo.
- `OperateMap` / `HeroMapCanvas` / `InteractiveMapView` already init with `MAP_STYLES['satellite']` → gate-swap only.
- `ESRI_WORLD_IMAGERY_STYLE.glyphs` embedded `?key=${key}` → `key=undefined` keyless → font 404, which fires a map `'error'` event (and `HeroMapCanvas` calls `setFailed(true)` on any error).

## Decision

Scope (operator-locked via AskUserQuestion): **all render-only maps** — the 5 spec maps + landing hero + split-screen + public portal. Both polish items **in**: hide non-satellite basemaps, fix keyless glyphs. Wizard **geocoding** paths (`WizardAddressSearch`, `StepBoundary`) stay gated on `hasMapToken` — geocoding is a metered MapTiler API, not keyless-renderable.

### Implementation shape

- **Core seam** (`apps/web/src/lib/maplibre.ts`): new `export const mapRenderable = hasMapToken || (process.env.FEATURE_DEMO_OFFLINE === 'true')`. Also made `ESRI_WORLD_IMAGERY_STYLE.glyphs` conditional (`...(key ? { glyphs: … } : {})`) so keyless omits `glyphs` entirely instead of emitting `key=undefined` — kills the font-404 `'error'` event. Accepted trade-off: user-added text/label layers won't resolve fonts keyless; base imagery + drawn polygons render fine.
- **Per render map:** swap the gate `!hasMapToken` → `!mapRenderable`; at style-init, when keyless, force `ESRI_WORLD_IMAGERY_STYLE` (`style: hasMapToken ? (MAP_STYLES[chosen] ?? MAP_STYLES['satellite']!) : ESRI_WORLD_IMAGERY_STYLE`). **9 surfaces:** `useMaplibre.ts` (powers `MapCanvas` — its own guard + style line), `MapCanvas.tsx` (gate only), `PortfolioMap`, `DesignMap`, `DiagnoseMap` (gate + ESRI style), `OperateMap` / `HeroMapCanvas` / `InteractiveMapView` (gate only, already satellite), `SplitScreenCompare` (gate + ESRI style + local `AVAILABLE_STYLES`).
- **Switcher hygiene** (`useMapToolStore.ts`): keyless default `basemap: 'satellite'` + new `AVAILABLE_BASEMAP_OPTIONS` (satellite-only when keyless), swapped into the 4 switcher UIs (`MapToolbar`, `CommandCentreMapSidebar`, `BaseMapCard`, `WizardBasemapToggle`). `OfflineMapsPanel` left untouched — it's tile-cache management, not a render switcher.

## Rationale

`mapRenderable` keeps the **authenticated bundle byte-identical**: the `define` fold means `mapRenderable === hasMapToken` in every non-demo build, so the demo branch is tree-shaken away. The keyless Esri raster needs no token and is already a first-class `MAP_STYLES` entry, so the fallback reuses proven code rather than introducing a new basemap. Hiding the non-satellite options prevents the switcher offering basemaps that would 403 keyless.

## Alternatives Considered

- **Bundle a referrer-locked MapTiler key for the maps too** — rejected for this pass: keyless Esri is $0 and leaks no credential. (The deploy ADR's `DEMO_MAPTILER_KEY` remains an option if keyed basemaps are wanted later.)
- **Leave `glyphs` pointing at `key=undefined`** — rejected: the resulting font 404 fires a map `'error'` that `HeroMapCanvas` treats as a hard failure.

## Consequences

- The demo works end-to-end at $0 with no key in the map path and no leak surface. Keyless visitors get the Esri satellite basemap everywhere; the switcher shows Satellite only.
- Drawn **text/label** layers won't resolve fonts keyless (no `glyphs`) — accepted limitation, no longer a hard error.

## Verified

- **Typecheck:** web `tsc --noEmit` 0 new errors (needs `NODE_OPTIONS=--max-old-space-size=8192` or OOM).
- **Unit:** 10/10 targeted vitest — new `basemapDefault.keyless.test.ts` (asserts keyless `basemap === 'satellite'` + `AVAILABLE_BASEMAP_OPTIONS` is satellite-only) + the two `ObjectiveDetailPanel` mocks gained `mapRenderable: false`. The `mapRenderable === true` demo branch can't be unit-tested cleanly — `process.env.FEATURE_DEMO_OFFLINE` is `define`-replaced to the literal `false` during the vitest transform (un-overridable at runtime); verified instead by the real demo build.
- **Demo build:** `FEATURE_DEMO_OFFLINE=true … vite build` exit 0 (postbuild prerendered 4 showcase routes; the `[preview] exited with code 1` line is the prerender helper's teardown, not a failure).
- **Live keyless render (preview MCP):** `/v3/portfolio` + Plan-stage `DesignMap` render the Esri satellite imagery, switcher shows Satellite only, attribution "Imagery © Esri, Maxar, Earthstar Geographics". Local keyless verification gotcha: `apps/web/.env` carries a real key, and PowerShell `$env:VITE_MAPTILER_KEY=''` *drops* the empty var (so `.env` wins) — the reliable override is a temporary `apps/web/.env.local` with `VITE_MAPTILER_KEY=` (empty), deleted after.

## Connections

- [[olos]] — the app this ships in.
- [[2026-06-19-atlas-offline-demo-deploy]] — the demo build + Pages deploy this completes (maps were the remaining dead surface).
- [[project-screenshot-hang]] — the v3 preview hang worked around here by reading live module exports in-page.
