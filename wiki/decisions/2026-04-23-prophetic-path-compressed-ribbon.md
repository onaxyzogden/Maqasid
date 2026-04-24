---
title: "Prophetic Path — Compressed Ribbon layout (Phase 1+2+3)"
type: decision
date: 2026-04-23
tags: [prophetic-path, ui, timeline, hierarchy, islamic]
---

# Prophetic Path — Compressed Ribbon layout (Phase 1)

## Context

The Prophetic Path page rendered ~8 daily time nodes (Isha/Rest → Tahajjud → Fajr → Morning → Dhuhr → Midday-Labor → Asr → Maghrib) as an alternating left/right vertical timeline with all cards sized identically. A two-round UI/UX Scholar consult (NotebookLM conversation `2b89f729-…`, `Modern UI/UX Design Scholar` notebook `995a59d1-…`) diagnosed three problems:

1. The alternating spine permanently wasted ~50% of horizontal space on any given row.
2. No hierarchy — the CURRENT node (happening now) and NEXT node (happening soon) looked almost identical, differentiated only by a tiny colored pill.
3. No overview — the full day took 3–4 scroll-heights; "what phase am I in right now?" could not be answered in under a second.

The Scholar proposed three layout patterns (Compressed Ribbon, Bento Day, Horizon Spool) and picked **Compressed Ribbon** as the best balance of Path-storytelling and density.

## Decision

Adopt **Pattern A — Compressed Ribbon** as the Prophetic Path's layout backbone.

- **Single left spine** at `left: 1.75rem`, markers centered on it — no alternating sides. The `data-side` prop persists on `NODES` data (not yet purged, deferred) but the JSX no longer reads it.
- **State-driven card sizing** via existing `data-prayer-state` attribute on `.pp-card`:
  - `active` → full card (unchanged — title, body, pillars, satellites)
  - `next` / `next-soon` → semi-expanded (title + pillars, body hidden, reduced padding)
  - `past` / `upcoming` → summary row (icon + compact eyebrow + shrunk title only; body and pillar chips `display: none`; transparent background, no border, opacity 0.55 / 0.8)
- **Spine gap reduced** from `8rem` (128px) → `0.75rem` (12px). Summary rows are thin; the active card carries breathing room via its own padding.
- **Satellites hidden on non-active nodes** — `.pp-node:not([data-prayer-state='active']) .pp-satellite { display: none; }`. Before/After triggers belong to the present moment only.
- **Mirror expansions flow inline** below the active card (dropped the absolute-position opposite-side desktop rule, which assumed the alternating layout).

Result: the full 8-node day fits in ~1.5 screens on a 900px viewport; the active card is visually dominant, the next is secondary, the rest recede.

## Files

**Edited:**
- `src/components/islamic/PropheticPath.css` — rewrote `.pp-spine` (spine-left positioning, gap reduction), `.pp-marker` (fixed left rail, no side flipping), `.pp-card-body` (no data-side alignment flip), `.pp-body-text` (no data-side right-align); deleted the `@media (min-width: 768px) { [data-side] }` rules for spine center-offset, node width swap, marker side flip, card-body alignment flip; added new state-sizing block for `past`/`upcoming`/`next`/`next-soon`; added satellite hide rule for non-active nodes; replaced the desktop absolute-positioned mirror card rules with inline-flow comment.

**Not edited (deferred):**
- `src/components/islamic/PropheticPath.jsx` — `data-side` prop remains in the NODES data and is still applied to `.pp-node`, but no CSS reads it. Left intact for a potential future revert or for Phase 2/3 use. No runtime cost.

## Rationale

- Scholar's Pattern A preserves the timeline metaphor (vertical spine, chronological nodes) — which is central to the page's narrative — while eliminating the horizontal-waste pathology of side-alternation.
- State-driven sizing via pre-existing `data-prayer-state` attribute means **no new JSX branching needed**, no new prop plumbing, no new state. The derivation in `deriveNodeTiming` already emits every state we need.
- Hiding satellites on non-active nodes (instead of everywhere) keeps Before/After rituals available for the present moment — satisfies the "sacred presence" goal without cluttering past/future rows.
- Inlining the mirror expansion is a free simplification: mobile already did this; removing the desktop float just makes both modes consistent.

## Consequences

- Page scan time ≪ 1s to find "where am I" — the visually dominant card IS the current moment.
- Desktop and mobile now share one layout — fewer surprises.
- The hover-lift on `.pp-card` (`translateY(-0.25rem)`) is explicitly neutralized on summary rows so inactive nodes don't wobble on hover; they subtly tint instead.
- `data-side` is dead in CSS but alive in data — a future cleanup task could delete the prop entirely; not a blocker.

## Phase 2 — Calm prominence (landed 2026-04-23)

Built on Phase 1's state-driven structure. Three Scholar techniques applied:

- **Editorial serif scale-up on active title:** `.pp-card[data-prayer-state='active'] .pp-title` → `font-size: 2.25rem`, `line-height: 2.5rem`, `font-weight: 400`, `letter-spacing: -0.01em`. Noto Serif confirmed as `--pp-font-headline`. Larger + thinner carries "sacred importance" without alert-weight boldness.
- **Ghost-text receding on past/upcoming:** title color shifted to `color-mix(var(--pp-on-surface), transparent, 45%)`; eyebrow color to `color-mix(var(--pp-on-surface-variant), transparent, 30%)`; hover-lift background killed (was tinting 4% primary, now transparent); hover lifts opacity and restores title color instead of tinting bg.
- **Purposeful aura behind active card:** added `.pp-card[data-prayer-state='active']::after` with `inset: -56px`, radial-gradient from `color-mix(--pp-primary, 22%)` → transparent 65%, `filter: blur(60px)`, `z-index: -1`. Tahajjud (`data-style='divine'`) overrides with `--pp-tertiary` gold aura to match its sparkles marker. `.pp-card[data-prayer-state='active']` gets `overflow: visible` so the aura can bleed past the card edge.
- **Accidental corner washes muted:** `.pp-ambient--teal` opacity `0.05` → `0.025` (dark) and `0.12` → `0.05` (light); `.pp-ambient--gold` removed in both modes. The meaningful glow now lives exclusively behind the active card.

**Files touched (Phase 2):** `src/components/islamic/PropheticPath.css` only — no JSX changes.

## Phase 3 — Pillar chip alignment + shimmer + `data-side` cleanup (landed 2026-04-23)

- **Canonical pillar color resolver.** Added `resolvePillarAccent(label)` in PropheticPath.jsx — builds a lookup against `MAQASID_PILLARS[]` keyed by `id`, `sidebarLabel`, and `universalLabel` (all lowercase), with an explicit `'ummah' → Community accentColor` alias since NODES uses the Islamic `id` form. Unmapped labels (e.g. "Soul" on Tahajjud) return `null` and fall back to the existing `data-tone` styling.
- **Chip renders with `--chip-accent` CSS var** set inline only when a canonical match exists. CSS uses `[style*='--chip-accent']` attribute selector to target only resolved chips without breaking fallbacks.
- **State-driven chip intensity:**
  - `active` — border `color-mix(--chip-accent, 55%)` + bg tint 12% + **4s shimmer sweep** (`::before` pseudo, 100deg linear gradient band translating `-100%` → `100%` via `transform`, `cubic-bezier(0.4, 0, 0.6, 1)`, infinite)
  - `next` / `next-soon` — border `color-mix(--chip-accent, 30%)`, transparent bg, text muted to 75% accent mixed with `--pp-on-surface-variant`
  - `past` / `upcoming` — chips hidden (Phase 1, unchanged)
- **`prefers-reduced-motion` opt-out.** Shimmer `display: none` and `animation: none` for motion-averse users.
- **`data-side` cleanup.** Deleted `side:` key from all 8 NODES entries, deleted `data-side={node.side}` attribute from `.pp-node` render, deleted `mirrorSide` variable + prop chain (no longer meaningful now that the mirror card flows inline). Grep-verified zero residuals in `src/`.

**Files touched (Phase 3):**
- `src/components/islamic/PropheticPath.jsx` — added resolver, applied `--chip-accent` on chip render, removed `side` field from NODES, removed `data-side` attr, removed `mirrorSide` prop threading
- `src/components/islamic/PropheticPath.css` — Phase 3 chip block after Phase 2 block

## Out of scope (future)

- "Soul" as a canonical pillar — remains editorial; no MAQASID_PILLARS change
- 8th pillar (Moontrance) chip appearance on Prophetic Path — pillar exists in MAQASID_PILLARS with `accentColor: '#6E8E5B'` but no NODE currently tags it
- Mobile viewport audit — all three phases assume desktop-first; mobile likely works (single column was already mobile's layout) but not explicitly tested this session

## Related

- [[2026-04-21-prophetic-prayer-phase-tasks]] — Before/After satellite wiring this Phase inherits
- [[2026-04-22-prayerhero-uiux-consult]] — prior Scholar consult pattern applied here
- [[2026-04-23-dashboard-three-tier-redesign]] — sibling page redesign; both land under the same Qalb/Amal/Barakah contemplative framing
