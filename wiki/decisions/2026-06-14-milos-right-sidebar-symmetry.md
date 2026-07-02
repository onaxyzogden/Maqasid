---
title: "MILOS — Right Islamic sidebar mirrors the left sidebar (5-column symmetry)"
type: decision
created: 2026-06-14
tags: [milos, ui, layout, islamic-layer, app-shell, symmetry]
status: accepted
superseded_by: null
---

# MILOS — Right Islamic sidebar mirrors the left sidebar (5-column symmetry)

## Context

Shortly after the [[2026-06-05-milos-islamic-layer-rail]] pass, the [[milos]] app shell
was still left/right **asymmetric** in its chrome. The **left** sidebar is a *single*
element that swaps between a collapsed icon rail and an expanded panel, with one `col-edge`
affordance (drag-resize + click-toggle). The **right** side, by contrast, was a
**6-column** grid whose Islamic panel (`IslamicPanel`) sat *beside* a permanently-visible
64px `IslamicRail` icon column (col 6). Opening the panel therefore showed the full panel
**plus** the icon bar still pinned to the window edge — two right-hand chrome elements
where the left had one, and no edge handle mirroring the left's.

## Decision

Collapse the right side to **5 symmetric columns**:

```
[sidebar] [left-edge] [main] [right-edge] [right-sidebar]
```

- The **right edge (col 4)** is now an always-present chevron handle mirroring the left
  `col-edge` — same drag-resize + click-toggle behaviour.
- The **right sidebar (col 5)** renders `IslamicRail` when collapsed and `IslamicPanel`
  when expanded — a single toggling column, **no separate always-on icon bar**. The rail
  is now the *collapsed state* of the one right column, exactly as the left rail is the
  collapsed state of the left sidebar.
- The panel header close control becomes a `ChevronRight` (mirroring the left header's
  chevron); title "Collapse panel".
- **No store changes** — the section-navigation state from
  [[2026-06-05-milos-islamic-layer-rail]] (`useIslamicSections`,
  `islamicActiveSection` / `islamicSectionNonce`, `focusIslamicSection`) is carried
  forward unchanged.

### Implementation (commit `6594634`)

- **`AppShell.jsx`** — grid 6 → 5 columns; the right `col-edge` is always rendered; the
  right column is a single toggling div `{islamicPanelOpen ? <IslamicPanel /> : <IslamicRail />}`;
  `--main-balance-end` simplified from `max(0, leftChrome − railPx)` to
  `max(0, sidebarPx − railPx)`.
- **`IslamicPanel.jsx`** — header `<X>` → `<ChevronRight>`.
- **`IslamicPanel.css`** — removed the stale `grid-column: 5`; added `width: 100%`.
- **`IslamicRail.css`** — removed `border-left` (the divider is now owned by the
  always-present right `col-edge`, so it is no longer duplicated).
- **`AppShell.css`** — removed the now-unused `.il-wrapper`, `.il-wrapper--open`, and
  `.col-edge--hidden` rules.
- **`layout/CONTEXT.md` + `islamic/CONTEXT.md`** — document the 5-column symmetric layout.

## Rationale

The [[2026-06-05-milos-islamic-layer-rail]] rail achieved *discoverability* (an
always-visible right rail) but at the cost of *symmetry*: it added a permanent 6th column
rather than making the rail a state of an existing column. Folding the rail into a single
toggling column — plus a mirrored `col-edge` handle — yields one affordance per side and
one right-hand chrome element in either state, matching the left exactly. Because the
section-jump machinery keys off the panel/rail contents (not the grid), it survives the
geometry change untouched, so symmetry is gained with no loss of the rail's navigation
value.

## Alternatives Considered

- **Keep the 6-column permanent rail (the [[2026-06-05-milos-islamic-layer-rail]] design)**
  — rejected: it *is* the asymmetry this decision exists to remove (panel *plus* rail when
  open; no right edge handle).
- **Close-button-only, no edge handle** — rejected: the left side toggles via its
  `col-edge` (drag-resize + click); a right side closable only from a header button would
  not mirror it.

## Consequences

- **Supersedes the grid geometry of [[2026-06-05-milos-islamic-layer-rail]]** — the
  6-column layout and the always-on col-6 rail are replaced by the 5-column
  single-toggling column. That ADR is marked `superseded`, but its
  **section-navigation machinery** (`useIslamicSections`, `focusIslamicSection`,
  `.il-anchor` scroll targets) is retained and still in force.
- `--main-balance-end` is simpler (`max(0, sidebarPx − railPx)`), keeping the main column
  centred when the panel is collapsed — see
  [[2026-04-29-milos-preview-and-dashboard-centering]].
- Desktop-focused chrome change; no JSX behaviour beyond the toggle, no data/store change.

## Delivery

> [!note] Live on `main` (shipped twice)
> - **Commit `6594634`** (2026-06-14) is the sidebar change; at the time it was bundled
>   with the BbosExecView wiring session ([[2026-06-18-milos-bbos-exec-view-wiring]]).
> - Shipped via **PR #12** (`feat/right-sidebar-symmetry` -> `main`, MERGED 2026-06-14,
>   merge commit `7b2cf0b`) and **is on `main`**.
> - Later **re-delivered redundantly** via **PR #14** (cherry-pick `287d529`, MERGED
>   2026-07-02, merge commit `957f0c4`). PR #14 was unnecessary -- the change was already
>   on `main` via PR #12. The 2026-07-02 read that PR #12 had been "orphaned by a `main`
>   history rewrite" was a **stale-local-mirror artifact**: the merge commit `7b2cf0b` had
>   simply not been fetched into the local clone, so it looked absent; on a fresh
>   `git fetch` it is present on `main`. Net effect: the sidebar landed on `main` twice
>   (harmless).

## Verification

`npm run build` ✓ · `npm run lint` ✓ (grounding ratchets at 0) · `npm test` 77/77.
Preview DOM confirmed: collapsed rail / expanded panel-with-no-icon-bar / header chevron /
no double divider.

## Amanah

Neutral — app-shell layout/CSS; no capital / sale / CSA / CSRA / salam / yield-share
surface.

## Connections

- [[milos]] — the app whose shell this restructures
- [[2026-06-05-milos-islamic-layer-rail]] — the prior rail pass whose 6-column geometry
  this supersedes (its section-navigation machinery is retained)
- [[2026-04-29-milos-preview-and-dashboard-centering]] — the `--main-balance-end` centring
  mechanism this simplifies
- [[2026-06-18-milos-bbos-exec-view-wiring]] — filed in the same session bundle / PR #12
