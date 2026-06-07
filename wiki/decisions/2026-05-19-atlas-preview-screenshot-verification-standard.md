---
title: "Atlas: preview_screenshot reduce-motion fix + DOM-exercise verification standard"
type: decision
date: 2026-05-19
status: accepted
tags: [atlas, verification, preview, tooling, screenshot]
superseded_by: null
---

# Atlas: preview_screenshot reduce-motion fix + DOM-exercise verification standard

## Context

UI verification in the Atlas web app (`apps/web`) could not produce visual
proof: `preview_screenshot` (Claude_Preview MCP) consistently timed out
(~30 s), forcing DOM/runtime-only verification on recent UI tasks (e.g. the
HomePage delete/archive work, [[2026-05-19-atlas-project-delete-archive-homepage]]).

Root cause is split:

1. **Animation-driven stall (fixable).** The capture renderer waits for paint
   to settle, which never happens with an infinite CSS animation. The sibling
   MILOS app already solved this
   ([[2026-04-29-milos-preview-and-dashboard-centering]]): sniff `Claude/` in
   the user agent and add a `reduce-motion` class collapsing all
   animation/transition durations. **Atlas `apps/web` never received this
   mechanism** — it only had a browser-native
   `@media (prefers-reduced-motion: reduce)` block, which the headless capture
   UA does not trigger.
2. **Inherent capture limit (not code-fixable).** The v3 project routes mount
   a MapLibre WebGL canvas with an internal render loop the capture tool
   cannot settle, and `preview_screenshot` has a separate known Windows hang.

## Decision

- **Port the proven sibling mechanism into `apps/web`.** A boot-time UA sniff
  in `apps/web/src/main.tsx` adds `reduce-motion` to `<html>`; a class-based
  collapse rule in `apps/web/src/app/index.css` mirrors the existing
  `prefers-reduced-motion` media block. This removes the *animation-driven*
  class of stall and is the correct, low-risk fix regardless.

  **Empirical caveat (verified this session):** the mechanism is proven
  functional — under the real Claude preview UA `reduce-motion` is on
  `<html>` and a probe element with `animation: spin 9s infinite` /
  `transition: opacity 5s` computes to `1e-05s` for both durations. But
  `preview_screenshot` *still timed out* on `/home`, which is pure DOM with
  no animations. So on this Windows setup the **second root cause (the known
  Windows capture hang) is dominant**: the fix is necessary and correct but
  does not, on its own, make capture succeed here. The DOM-exercise standard
  below is therefore the operative verification path in practice, not just a
  WebGL-route fallback.
- **DOM-exercise verification is the accepted standard** for routes mounting a
  MapLibre WebGL canvas (v3 `observe`/`plan`/`act`/`design`, the `/new`
  boundary step, `/portal/$slug`) and whenever capture times out on Windows:
  drive state via `preview_eval` / `preview_click` / `preview_fill`, assert
  with `preview_snapshot` / `preview_console_logs`, and **state explicitly in
  the report that screenshot capture was unavailable and why**. No silent
  success claims — the explicit-limitation disclosure satisfies the project
  CLAUDE.md "don't claim working without a screenshot" rule.
- A co-located pointer lives at `apps/web/CONTEXT.md` so the standard is
  visible from inside the atlas repo.

## Rationale

The store/sibling app already owned the hard part; the gap was a missing
port. Reusing the MILOS pattern verbatim keeps the two apps consistent and
the change minimal (CSS + one boot-time guard, no logic change). The
DOM-exercise standard codifies the honest practice already used under
duress so future sessions apply it deliberately rather than ad hoc.

## Alternatives Considered

- **Reinvent a bespoke motion-reduction approach** — rejected; the sibling
  ADR is proven and accepted.
- **Set `preserveDrawingBuffer: true` on all map constructors** — rejected;
  that addresses *blank* WebGL captures, not the settle-timeout / Windows
  hang. Out of scope.
- **Accept screenshots as permanently unavailable, document only** — rejected
  by scope decision; the animation-route fix is low-risk and high-value.

## Consequences

- The animation-driven stall class is eliminated (mechanism proven: durations
  collapse to `1e-05s` under the Claude UA). The known Windows capture hang
  persists empirically even on pure-DOM `/home`, so screenshots remain
  unavailable on this setup despite the fix — the fix is correct and
  necessary but not sufficient here.
- DOM-exercise verification with mandatory limitation disclosure is the
  operative standard for all routes on this setup, not merely a WebGL
  fallback.
- Two apps now share the same Claude-UA reduce-motion convention.
- Parent MILOS `src/main.jsx` / `global.css` untouched (already correct).

## Connections

- [[olos]] — Atlas app verification tooling
- [[2026-04-29-milos-preview-and-dashboard-centering]] — the sibling fix
  ported here
- [[2026-05-19-atlas-project-delete-archive-homepage]] — the task whose
  verification was blocked by this hang
