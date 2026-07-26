---
title: "MILOS: sub-pillar LevelNavigator glyphs tint with their parent pillar's accent (--pillar-accent) via the generator; pillars + prayers unchanged"
type: decision
date: 2026-07-09
status: accepted
tags: [ui, css, codegen, level-navigator, glyphs, theming, pillar-accent]
superseded_by: null
---

# MILOS: sub-pillar glyphs tint with their parent pillar's accent (`--pillar-accent`)

## Context

The pillar-glyph generator ([[2026-07-05-milos-pillar-glyph-generator]], PR #24, branch `feat/pillar-glyph-generator`) emits all **41** LevelNavigator glyphs filled by `--seg-color` — the package's per-*segment-level* colour. So every sub-pillar glyph, across all 7 pillars, shows the **same** level-tinted fill: the sub-pillar strip carries no per-pillar identity. Yet `src/data/maqasid.js` already holds an `accentColor` per pillar, mirrored as theme-aware `--pillar-<id>` tokens in [src/styles/tokens.css](src/styles/tokens.css) (light lines 225–245, dark 313–333). **The dark hexes differ from the light** (faith `#C8A96E`→`#D4B87A`, health `#6EAD8A`→`#7EBD9A`, …), so the accent must be a **token reference**, never a baked hex.

This is the **pillar-accent** half of that ADR's deferral ("pillar-accent tint for sub-pillar/prayer glyphs — thread a `--pillar-accent` through `::before`"), scoped down by explicit user decision to **sub-pillars only**: the 6 prayers keep their 3-phase colours (Fajr/Dhuhr/… carry meaningful phase identity, not pillar identity); the 7 top-level pillars keep `--seg-color`. Deferred idea #2 (BBOS board glyphs) remains a separate later design cycle — untouched here.

**Amanah gate:** neutral — presentational nav-chrome CSS codegen over an existing UI treatment. No capital / sale / riba / gharar / CSA / CSRA / salam / yield-share surface.

## Decision

Threaded a new `--pillar-accent` custom property through the generator so each sub-pillar's glyph fills with its parent pillar's accent token. Four edits to `scripts/generate-pillar-glyphs.mjs`, then regenerate — **no** JSX, token, or data-file change (the 7 `--pillar-<id>` tokens already exist in both themes).

Mechanism: `--pillar-accent` is **set** per sub-pillar id (as `var(--pillar-<parentId>)`) and **read** as the first fallback in the shared base fill — on the **same** `::before` pseudo-element, so it resolves regardless of rule order:

```
background: var(--pillar-accent, var(--seg-color, var(--accent)));
```

Pillars and prayers **never set** `--pillar-accent`, so the `var()` falls through to `--seg-color` exactly as before — their rules are **byte-unchanged**.

### The four generator edits

1. **Tag sub-pillars with their parent** — `getSubPillars`: the parent `pid` is already in loop scope; the pushed entry gains `pillarId: pid`. `getPillars` / `getPrayers` stay as-is (no `pillarId`).
2. **Derive the accent token per entry** — `main`: `accentVar: t.pillarId ? \`--pillar-${t.pillarId}\` : null`. Only sub-pillars carry `pillarId`, so only they get a non-null `accentVar`.
3. **Emit the accent line in per-id rules** — `perIdRule`/`perIdRules` thread `accentVar`; when set, prepend `    --pillar-accent: var(<accentVar>);` before the two mask-image lines. Entries with `accentVar === null` (7 pillars, 6 prayers) emit byte-identically to before.
4. **Add the fallback layer to the base fill** — both base rules (mobile + desktop): `background: var(--seg-color, var(--accent));` → `background: var(--pillar-accent, var(--seg-color, var(--accent)));`.

### Resulting CSS diff (the correctness gate — CSS is not linted)

Purely additive, exactly as scoped: **2** base-rule `background` lines changed + **28** sub-pillar per-id rules each gain **one** `--pillar-accent: var(--pillar-<parent>);` line in **both** media blocks (56 set-lines) → **58** `--pillar-accent` occurrences in all. The **7 pillar + 6 prayer** per-id rules are **byte-unchanged**; the 82 per-id mask rules (41 × 2) and their data-URIs are untouched. Accent distribution matches the taxonomy: faith 5, health/intellect/family/wealth/environment 4 each, ummah 3 = **28** sub-pillars (×2 blocks → faith 10, five pillars 8, ummah 6).

## Rationale

- **Token reference, not hex** — the dark `--pillar-*` values differ from light, so a baked hex would need per-theme emission and would defeat the token system. `var(--pillar-<id>)` is theme-aware for free.
- **Set + read on the same pseudo-element** — `--pillar-accent` is declared and consumed on the one `::before`, so there is no cascade-order or inheritance hazard; a sub-pillar without the property simply resolves the next fallback.
- **Sub-pillars only** — the user's scope decision: prayers carry phase identity (not pillar identity) and pillars are already the accent source, so tinting either would blur meaning rather than add it.
- **Same drift ratchet** — the change flows entirely through the generator, so `generate:pillar-glyphs:check` still fails lint on any future data→CSS drift; no new hand-maintained strings.

## Alternatives Considered

- **Bake a per-theme hex into each sub-pillar rule** — rejected: dark differs from light, so it doubles the emitted rules and abandons the token indirection that keeps theming centralized.
- **Tint the 6 prayers too** — rejected (user scope): prayer glyphs encode a 3-phase time identity; recolouring them by "parent" would overwrite that with a less meaningful axis.
- **Hand-write a supplementary `--pillar-accent` block outside the generator** — rejected: that reintroduces exactly the hand-maintained-drift surface the generator exists to remove; the accent belongs in the same emit path as the glyphs.
- **A wholly new `accentColor`→CSS variable pipeline** — rejected as unnecessary: the `--pillar-<id>` tokens already exist in `tokens.css` for all 7 pillars in both themes; the generator only needs to *reference* them.

## Consequences

- Each sub-pillar strip now reads in its parent pillar's colour family — Health's 4 sub-pillars fill health-green, Faith's 5 fill faith-gold, Family's 4 fill family-pink, and so on — in **both** media blocks and **both** themes.
- The 7 pillar + 6 prayer glyphs are unchanged; prayers remain intentionally on their phase colours.
- **New contributor obligation is unchanged** — the `--check` ratchet already governs this file; a `maqasid.js` / constants / `prayer-pillars.js` edit must still be regenerated or lint fails.
- **Deferred (unchanged):** BBOS board glyphs (`IDY/CRD/STR/…`) via the same generator — its own design→plan cycle, still open. Prayer-glyph tinting is **declined by scope**, not deferred.

## Verification

- `npm run build` green; `npm run lint` green — eslint, grounding-strict `[STRICT] Pass`, inline-refs `0 ≤ ratchet 0`, and `generate-pillar-glyphs --check: up to date (41 glyphs)`; `npm test` **77/77**. Generator run-twice idempotent.
- **Invariant checker (`verify-accent.mjs`, parses the generated CSS) — PASS:** 82 per-id mask rules across 41 ids × 2 blocks; **7 pillars + 6 prayers untinted** (no `--pillar-accent`); **28 sub-pillars tinted** with a valid `--pillar-<parent>` token in **both** blocks; distribution faith 10 / health 8 / intellect 8 / family 8 / wealth 8 / environment 8 / ummah 6; base `--pillar-accent` fallback present in both blocks (×2).
- **DOM `getComputedStyle` proof** (live, on real rendered elements — the decisive cascade test): **Health** sub-pillar `::before` computes **`rgb(110, 173, 138)`** (`#6EAD8A`) in light / **`rgb(126, 189, 154)`** (`#7EBD9A`) in dark — health-green **overriding** each sub-pillar's inline gold `--seg-color`, proving `--pillar-accent` wins the cascade; **Faith** sub-pillars compute **`rgb(200, 169, 110)`** (`#C8A96E`) light / **`rgb(212, 184, 122)`** (`#D4B87A`) dark. The **7 top-level pillars** compute unchanged (no `--pillar-accent`; fill = `--seg-color`). Both themes confirmed via `data-theme="dark"`.
- **Desktop block:** proven via **CSSOM** (each sub-pillar rule carries the correct `--pillar-<parent>` token, pillar/prayer rules carry none, base fallback present across all 41 ids). The live desktop *layout* could not be rendered — the preview surface reported **0 width** all session (innerWidth/clientWidth/bodyWidth all 0; `matchMedia` locked to mobile), an environmental limit, not a code one. Mobile was proven **live**.
- **Honestly bounded (environmental, not code):** the live **prayer** strip could not be rendered — the guest session sits in the **"Prayer times unavailable"** state (no city), so `PrayerLevelNavigator` degrades to nothing (same environmental block as the [[2026-07-05-milos-pillar-glyph-generator]] session). Prayer correctness therefore rests on (1) all 6 prayer ids confirmed **untinted** in both served blocks (verify-accent.mjs) and (2) the **identical null-accent mechanism** DOM-proven live on the 7 top-level pillars. The `preview_screenshot` channel was environmentally unresponsive (the recurring [[project-screenshot-hang]], compounded by the 0-width surface). Per CLAUDE.md, **no screenshot was claimed**.

## Delivery

Stacks on [[2026-07-05-milos-pillar-glyph-generator]] (PR #24, still open) — the generator lives only on that branch, so this Feature branches off its tip. Branch `feat/pillar-accent-subpillar-glyphs` off `feat/pillar-glyph-generator` (tip `b59ffd4`) in the isolated `glyphgen` worktree. **Merge order:** after PR #24, or rebase onto `main` once #24 lands (trivial — strict superset, same generator file). Two files changed (`scripts/generate-pillar-glyphs.mjs` + the generated `src/styles/level-navigator-responsive.css`). **Push + stacked PR are operator-gated — NOT pushed.** The main tree (`feat/desktop-pillar-glyphs`, with concurrent OLOS/wiki edits) was left untouched.

## Connections
- [[2026-07-05-milos-pillar-glyph-generator]] — the generator this extends; this closes the **sub-pillar** half of its pillar-accent-tint deferral (prayer-tint declined by scope; BBOS glyphs still deferred). Depends on it (stacked PR).
- [[milos]] — the project; the `--pillar-accent` fill is part of its LevelNavigator glyph surface.
- [[project-screenshot-hang]] — the recurring preview-capture failure (here compounded by a 0-width surface) that bounded this session's desktop/prayer visual verification.
