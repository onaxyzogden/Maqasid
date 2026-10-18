---
title: "Shared Modal for centred dialogs; .btn-soon for unbuilt controls"
type: decision
date: 2026-10-18
status: implemented
project: milos
tags: [ux, accessibility, dialogs, conventions]
---

# Shared Modal for centred dialogs; .btn-soon for unbuilt controls

## Context

The 2026-10-15 whole-app UX audit (#4, #6) found about a dozen hand-rolled overlays. They were `div`s with a backdrop `onClick`, no `role="dialog"`, no focus trap and no Escape, and one stray click lost typed input. It also found many controls that render as live but have no handler or do nothing: the MoneyDashboard Top up, Send, Request and More buttons, TeamChat's toolbar, Calendar's Week, Day and Agenda views, the DetailPanelHeader Edit button, and the ⋯ menus.

## Decision

1. **`src/components/shared/Modal.jsx`** is the one way to render a centred dialog. It is the sibling of `SlideIn.jsx` and has the same API: `onClose`, `label`/`labelledBy`, `dirty`, `active`, `dismissible`, `overlayClassName`/`overlayStyle`, `className`/`style`.
   - It provides `role="dialog"`, `aria-modal`, `useFocusTrap`, Escape, focus return, and a "Discard unsaved changes?" confirm on backdrop or Escape when `dirty`.
   - `dismissible={false}` makes a dialog blocking (FirstLoginModal).
   - Each migrated dialog keeps its own inner markup and classes.
   - Side panels use `SlideIn`.
2. **Entry overlays are queued:** Niyyah → FirstLogin → PillarFirstEntry → Resume (`AppShell.jsx`). Prayer and Threshold overlays are unchanged.
3. **`.btn-soon` convention** (in `styles/global.css`) for a control whose feature is not built yet. It is not removed and not faked.
   - Markup: `aria-disabled="true"`, `title="Coming soon"`, an explicit `aria-label="X (coming soon)"`, and no click handler.
   - `.btn-soon--tag` adds a visible "Soon" pill where there is space.

## Consequences

- New dialogs must use `Modal` or `SlideIn`. A raw backdrop `div` is a regression.
- When a `.btn-soon` feature ships, remove the class and attributes in the same change. Open items: EditSidePanel mount, Calendar views, Money transfers, and TeamChat formatting.
- PillarLevelPage segment switches now go through the router (`navigate(…, { replace: true })`). Each segment's own CeremonyGuard therefore applies, which the old `history.replaceState` skipped.
