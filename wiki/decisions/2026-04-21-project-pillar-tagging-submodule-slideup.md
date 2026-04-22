---
title: "Project pillar tagging + MirrorCard Education as submodule launcher"
type: decision
date: 2026-04-21
status: accepted
tags: [architecture, ui, prophetic-path, work, maqasid]
superseded_by: null
---

# Project pillar tagging + MirrorCard Education as submodule launcher

## Context

The PropheticPath MirrorCard Education tab previously rendered ad-hoc education cards with no link to the Maqasid submodule structure. Meanwhile, user-created projects in `/app/work` carried no pillar/submodule metadata, so the MirrorCard Action list couldn't surface a user's own Wealth / Life / etc. boards alongside the seeded prophetic tasks. Two user-visible bugs surfaced:

1. A project tagged `moduleId: 'wealth'` (pillar-only) did not appear in the Wealth MirrorCard list because `buildUserProjectsForScope` only matched submodule ids.
2. The Community tab's Education list did not match the sidebar because `submodule-registry.js` had no Ummah entry and the `collective` submodule label displayed as "Collective" while the sidebar used "Ummah."

## Decision

1. **Education tab renders one card per pillar submodule** — `PropheticPath.jsx` EducationList now reads the pillar from the active node's `moduleGroup` and enumerates canonical submodules via `getPillarSubmoduleIds(pillarId)` from the submodule registry. Cards reuse the existing `.pp-project-row` styling.
2. **New `SubmoduleSlideUp` component** opens the canonical `PillarLevelPage` (e.g., `WealthCorePage`) as a slide-up overlay when a submodule card is clicked, so the MirrorCard dashboard is identical to the standalone `/app/<submodule>` route.
3. **New Project dialog in `/app/work` gets Pillar + Submodule pickers** — the selected submodule (or pillar if no submodule chosen) is persisted as `project.moduleId` via `createProject`.
4. **`buildUserProjectsForScope` matches both pillar-only and submodule `moduleId`** — introduces an explicit `PILLAR_TO_SUBMODULES` table (handles Ummah which uses bare ids: `collective`, `neighbors`, `community`, no `ummah-` prefix).
5. **`submodule-registry.js` adds the Ummah pillar** + a `community → ummah` alias so MirrorCard calls passing `moduleId: "community"` resolve.
6. **`maqasid.js` `SUBMODULE_LABEL_OVERRIDES.collective` changes from "Collective" to "Ummah"** to align with the sidebar's `UMMAH_PILLARS[0].label`.
7. **`TaskDetailPanel.css` overlay z-index 99 → 1100** so the task detail popup renders above the slide-up (z-index 1000).

## Rationale

- Tying the Education tab to the canonical submodule registry means the MirrorCard always mirrors the sidebar — one source of truth.
- `moduleId` on projects provides the join key between user boards and Maqasid pillars, unlocking pillar-scoped filters across the app (MirrorCard, future dashboards).
- A registry alias (`community → ummah`) avoids renaming the MirrorCard's `moduleId: "community"` while still resolving to the canonical `ummah` pillar.

## Alternatives Considered

- **Infer pillar from project name / tags** — brittle, no user control, would drift.
- **Rename MirrorCard's `community` moduleId to `ummah`** — would ripple into every caller; an alias is cheaper and reversible.
- **Use `id.split('-')[0]` heuristic for pillar prefix matching** — fails on Ummah (bare submodule ids). Explicit table is robust.

## Consequences

- Legacy projects without `moduleId` are invisible to MirrorCard. An edit-project flow for tagging legacy projects is a natural follow-up.
- `moduleId` is now a first-class field that future features (dashboards, filters, reports) can rely on.
- Slide-up overlays now require task popup z-index to exceed 1000; any new overlay component must respect this stacking.

## Connections

- [[milos]] — project affected
- [[maqasid-al-shariah]] — governing pillar structure
- [[2026-04-17-ummah-pillar-level-page]] — Ummah's adoption of PillarLevelPage pattern (reused by SubmoduleSlideUp)
- [[2026-04-21-prophetic-prayer-phase-tasks]] — MirrorCard phase-filtered Action list (this session complements with Education list)
