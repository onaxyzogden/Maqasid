---
title: "Act tier-shell: s1-vision grouping + artifact badges; 12px font floor"
type: decision
date: 2026-06-10
status: accepted
tags: [atlas, ui, act, tier-shell, accessibility, css]
superseded_by: null
---

# Act tier-shell: s1-vision grouping + artifact badges; 12px font floor

## Context

A steward-supplied reference mockup (`olos_tier0_vision_capacity.html`) of the
Tier-0 objective "Define vision, goals & stewardship capacity" (`s1-vision`)
showed the center "Your Decisions" column with (a) the decisions clustered under
group eyebrows, (b) each decision carrying a colored artifact pill/badge, and
(c) a baseline body text floor. Three asks reconciled against the real code:

1. The real `s1-vision` objective ALREADY carries `decisionGroups` (2 groups) in
   `packages/shared` and `DecisionList` ALREADY renders group eyebrows + mode
   badges -- but `s1-vision` had NO entry in `workbenchAffordances.ts`, so it
   fell to the frozen `EMPTY_AFFORDANCES` (`showGroups: false`, `modeFor: null`)
   and rendered as a flat, badge-less list. ~23 other objectives already use the
   exact group+badge pattern.
2. The seven Vision input panels (SuccessCriteria, LabourInventory, etc.) already
   exist as React components.
3. The Act tier-shell carried hundreds of sub-12px `font-size` declarations
   across its `*.module.css` files (and some `var(--text-xs)` = 11px usages).

Four steward decisions (AskUserQuestion) governed scope: keep the existing 2
groups (no catalogue re-authoring); add all 7 artifact badges plus the optional
Steward item (8 total); polish + 12px floor only on the input panels (no
structural redesign); apply the 12px floor across ALL of the Act tier-shell.

## Decision

- **Wire `s1-vision` into the existing affordance pattern**, not a new one.
  Added a `VISION_ARTIFACT_BADGE` map (itemId -> namespaced `vs-*` key) and an
  `s1-vision` MAP entry `{ mapStrips: [], registerStrip: null, showGroups: true,
  modeFor: (id) => VISION_ARTIFACT_BADGE[id] ?? null }`. `showGroups: true`
  switches on the catalogue's existing "Purpose & intent" / "Capacity &
  constraints" eyebrows with no data change.
- **Per-kind badge color** via a new `MODE_BADGE_KIND` map driving a `data-kind`
  attribute on the badge span, with per-kind CSS variants (doc / assess / labour
  / capital / decision / neutral). Only `vs-*` keys carry a kind, so the other
  ~23 objectives keep the default uniform-amber badge unchanged.
- **A 12px minimum font floor across the entire Act tier-shell**: every
  `font-size: <N>px` with N < 12 raised to 12px, and tier-shell-local
  `var(--text-xs)` usages flattened to a literal 12px. The global `--text-xs`
  token (11px) was deliberately NOT bumped (that would bleed into Plan/Observe;
  scope was Act tier-shell only).

## Rationale

The mockup's grouped/badged look was already a first-class capability of
`DecisionList`; the only thing missing was the one-line affordance registration.
Re-using the established `modeFor` + `MODE_LABELS` + `MODE_ICONS` mechanism (the
same `li-*` / `hb-*` / `si-*` / `es-*` namespacing convention) avoided inventing
a parallel system and kept the change to additive map entries. Flattening
sub-12px text to a hard floor is a legibility decision the steward owns; doing it
across the whole tier-shell (not just Vision) keeps the surface internally
consistent rather than producing one objective with larger text than its peers.

## Alternatives Considered

- **Re-author `decisionGroups` to match the mockup grouping** -- rejected; the
  existing 2 groups were kept per steward decision (no catalogue churn).
- **Bump the global `--text-xs` token to 12px** -- rejected; it is shared with
  Plan/Observe and the approved scope was Act tier-shell only. A flat per-file
  12px substitution kept the blast radius bounded.
- **Redesign the seven Vision input panels** -- rejected; steward chose polish +
  floor only.

## Consequences

- The live `s1-vision` workbench now renders 2 group eyebrows + 8 artifact badges
  (icon + label + per-kind color), matching the mockup, with no `packages/shared`
  data change. Verified live: 8 `mode-badge-s1-vision-*` badges with correct
  labels/data-kind, 2 group eyebrows, badge computed `font-size: 12px` (was 9px),
  group eyebrow `font-size: 12px` (was 10px).
- **Accepted consequence:** flattening sub-12px text removes some visual
  hierarchy -- former eyebrows / units / sublabels become body-sized. Dense grids
  (frost calendar, skill categories, terrain cells) use flexible columns so the
  floor should not clip, but a human preview pass on those was flagged as a
  non-blocking follow-up.
- Two commits on `main`, explicit-path staging, all foreign WIP left undisturbed:
  `91f52d3f` (feat -- affordance + badges, 5 files +206/-6) and `db198a80`
  (style -- 12px floor across tier-shell CSS). Ahead of origin by 2; NOT pushed.

## Connections

- [[olos]] -- the Act tier-shell lives in this entity
- [[2026-06-10-atlas-exit-succession-capture]] -- same-day sibling Act work; uses
  the `es-*` badge namespace this decision parallels with `vs-*`
- [[project-screenshot-hang]] -- why proof is DOM/computed-style, not a JPEG
