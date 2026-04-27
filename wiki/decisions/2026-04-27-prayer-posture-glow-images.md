# Prayer Postures: SVG Stick Figures → Glow Image Set

**Date:** 2026-04-27
**Status:** Accepted
**Scope:** MILOS — `PrayerHeroDuring` reference rows and pray-along figure

---

## Context

The seven salah posture components in `src/components/islamic/postures/` (Qiyam, Ruku, Itidal, Sujud, Jalsah, Tashahhud, Salam) had been rendered as inline SVG stick figures using `currentColor`. The user produced a set of stylised raster artworks (white silhouettes on black with a soft glow + chromatic-aberration treatment) and wanted to replace the stick figures with these.

Six images were delivered (`qiyam`, `takbir`, `ruku`, `itidal`, `sujud`, `seated`). The three seated postures (Jalsah, Tashahhud, Salam) are visually near-identical and intentionally share the single `seated.png`.

## Decision

1. **Asset location:** `src/assets/postures/*.png`, imported via the `@/` Vite alias so each PNG is hashed and tree-shaken normally.
2. **Component shape:** Each `<Posture>.jsx` is now a thin wrapper rendering an `<img>` inside a `.posture-tile` element. The `color` prop is dropped — images are pre-rendered.
3. **Always-dark backdrop:** A `.posture-tile` wraps each image with `background: #000`, `aspect-ratio: 4 / 3`, `border-radius: 12px`. This preserves the glow aesthetic regardless of the surrounding theme. CSS lives in `src/components/islamic/postures/postures.css`, imported once from `postures/index.js`.
4. **`postureMap` API unchanged:** The named exports and the keys of `postureMap` are byte-identical to the prior implementation, so [PrayerHeroDuring.jsx](../../src/components/islamic/PrayerHeroDuring.jsx), [prayer-sequences.js](../../src/data/prayer-sequences.js), [fajr-during.js](../../src/data/fajr-during.js), and [isha-during.js](../../src/data/isha-during.js) needed no edits. The now-inert `color` prop still passed by `PrayerHeroDuring` is silently ignored by the new components.
5. **`takbir.png` is currently orphaned** — no `takbir` slot exists in `postureMap`. Kept on disk as a deliberate reservation for a future opening-takbir step if we want to distinguish it from steady Qiyam.

## Why

- The new artwork conveys posture more legibly than the SVG stick figures, particularly in the small reference rows.
- A pre-rendered raster with baked highlights gives a richer feel than re-implementing the glow + RGB-shift treatment in SVG/CSS.
- Locking the figure to a dark tile sidesteps any cross-theme contrast problems.

## Trade-offs

- **No theme adaptation:** The figures don't follow `--phd-ink` anymore. Acceptable per user direction ("always render on dark backdrop").
- **Three-way image reuse for seated postures:** Currently fine because the silhouette is identical; if Jalsah/Tashahhud/Salam ever need distinct cues (e.g., raised index finger for tashahhud, head turn for salam), each component can swap to a dedicated import without disturbing the API.

## Verification

- All 7 posture components render as a `.posture-tile` containing the correct PNG (image natural size 1448×1086).
- Vite serves each PNG with `200 / image/png`.
- `postureMap` keys preserved: `qiyam`, `ruku`, `itidal`, `sujud`, `jalsah`, `tashahhud`, `salam`.
- Visual confirmation in dev preview at `localhost:5173`.

## Files Changed

- `src/assets/postures/{qiyam,takbir,ruku,itidal,sujud,seated}.png` — new
- `src/components/islamic/postures/postures.css` — new
- `src/components/islamic/postures/index.js` — imports `postures.css`
- `src/components/islamic/postures/{Qiyam,Ruku,Itidal,Sujud,Jalsah,Tashahhud,Salam}.jsx` — rewritten as `<img>` wrappers
