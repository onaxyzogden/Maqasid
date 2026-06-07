---
title: "MILOS — Always-visible Islamic Layer icon rail"
type: decision
created: 2026-06-05
tags: [milos, ui, layout, islamic-layer, app-shell, accessibility]
status: accepted
---

# MILOS — Always-visible Islamic Layer icon rail

## Context

The [[milos]] app shell was left/right asymmetric. The **left** edge always shows a
vertical icon rail (the collapsed `Sidebar` — pillar icons) plus a collapse edge. The
**right** edge — home of the Islamic Layer panel (`IslamicPanel`) — was empty whenever
the panel was closed: its grid column collapsed to `0px`, with no visible rail or
handle. The panel could only be opened via the TopBar button or `Cmd+I`, and once open
there was no quick way to jump to a specific section.

## Decision

Add an **always-visible 64px vertical icon rail** pinned to the far-right grid column
(desktop only), mirroring the collapsed left sidebar. Each icon corresponds to one of
the Islamic panel's sections; clicking it opens the panel (if closed) and
expands/scrolls to that section. The rail persists even when the panel body is closed,
giving true left/right symmetry.

### Implementation

- **Single source of truth** — new hook `src/components/islamic/useIslamicSections.js`
  returns the ordered section descriptors `{ id, label, Icon, color, available }` for
  `prayer`, `opening`, `attributes`, `readiness`, `during`, `reflection`, `citations`.
  Availability is computed from the same inputs the panel uses (`valuesLayer`, route,
  `activeModule`/`activeBbosStage`, citation count). **Both** the rail and the panel
  consume it so their availability can never drift.
- **Section-target state (non-persisted)** in `src/store/app-store.js`:
  `islamicActiveSection`, `islamicSectionNonce`, and `focusIslamicSection(id)` — opens
  the panel (persisting `il_open`), sets the active section, and bumps the nonce so
  re-clicking the same icon re-triggers the scroll.
- **The rail** — `IslamicRail.jsx` + `IslamicRail.css`: icon-only column styled like the
  collapsed sidebar; Begin/Close ceremony icons at top, divider, then one button per
  available section. Active item highlighted when `islamicPanelOpen && activeSection`.
- **App shell** — `AppShell.jsx` grid grew to **6 columns**:
  `[sidebar] [left-edge 28px] [main 1fr] [right-edge 0|28px] [il-body 0|panelPx] [il-rail 64px]`.
  The rail (col 6) is permanent; `--main-balance-end` now pads the main column by
  `max(0, leftChrome − railPx)` so content stays centered when the panel is closed.
- **Panel wiring** — `IslamicPanel.jsx`: `ILSection` accepts `id`/`activeSection`/`nonce`
  and force-opens + `scrollIntoView` when targeted; `prayer` and `citations` have
  `.il-anchor` wrappers scrolled by a panel-level effect (citations auto-revealed via the
  existing `toggleCitations`). `scroll-margin-top: var(--space-3)` on `.il-anchor` keeps
  smooth-scroll clear of the sticky header.

## Consequences

- True left/right shell symmetry; the Islamic Layer is now discoverable and
  section-navigable without opening the panel first.
- Rail and panel availability are guaranteed consistent (shared hook).
- Desktop-only — mobile keeps its existing overlay path unchanged.
- Verified: `npm run build` green, `npm run lint` green (grounding ratchets unaffected —
  no seed-task changes), `npm test` 70 passing; preview confirmed the rail renders
  far-right, section-jump works (Readiness, Citations), Universal mode drops
  Prayer/Citations, Islamic restores all sections, and the rail persists with the panel
  closed.

## Related

- [[milos]]
- [[2026-04-29-milos-preview-and-dashboard-centering]] — prior `--main-balance-end`
  centering mechanism this decision extends.
