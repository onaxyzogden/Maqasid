---
title: "Redesigned BBOS Dashboard as Adapter-Driven Shell Behind a Toggle"
type: decision
date: 2026-06-04
status: accepted
tags: [bbos, ui, dashboard, adapter, feature-flag, redesign]
superseded_by: null
---

# Redesigned BBOS Dashboard as Adapter-Driven Shell Behind a Toggle

## Context

A complete static visual redesign of the [[bbos-pipeline]] dashboard was supplied as a 763-line self-contained mockup (`bbos_dashboard.jsx`): a 240px stage rail (9 stages IDY→OPT with progress arcs + gate status), a center Stage Overview (governing attributes, per-stage duʿāʾ, stage gate, two CTAs), an Execution View modal (Research Factory / Asset Factory / Execution / Gate Check tabs; or for the retrospective OPT stage: Metrics / Barakah Health Index / Restoration Mandate), and an Approval Brief modal (covenant statement, readiness check, gate decision). The mockup was a dark "cosmic" themed static prototype — inline styles, hardcoded palette, all content hardcoded to an OLOS/Atlas launch example, no stores/AI/roles/persistence.

The existing production dashboard `BbosFullDashboard.jsx` (~90KB + `BbosTaskPanel.jsx`) is fully wired: Zustand stores, 118 task definitions, AI drafts, role access, Two-Factory/Assembly-Gate model, rejection flow, light design tokens. The need: make the redesign a working part of [[milos]] without destabilizing the live system, structured so the eventual data-wiring is a clean swap rather than a rewrite.

## Decision

Build the redesign as a **self-contained feature folder driven entirely by a view-model produced by one adapter function**, reproduced pixel-faithfully but with **scoped CSS**, gated behind an **OFF-by-default persisted toggle**.

Four binding scope decisions (user-approved):
1. **Phased** — this pass builds the visual shell driven by a local adapter; a follow-up pass swaps the adapter source mock→live.
2. **Live-generic target** — the adapter's data shape mirrors the real generic model (`BBOS_STAGES` + `getBbosTaskDefsByStage` + per-task fieldData + stage scoring). OLOS text is throwaway seed only.
3. **Keep design exact, refactor to CSS** — pixel-for-pixel reproduction, but inline styles + palette + fonts extracted into a CSS file with variables **scoped to `.bpd`** (the dark theme must NOT leak globally or be forced into the light tokens).
4. **Coexist behind a toggle** — do not replace `BbosFullDashboard`; a persisted flag lets `DashboardView` render either dashboard. Default OFF.

Delivered: `src/components/bbos/pipeline-dashboard/` (10 files) — `adapter/bbos-dashboard-adapter.js` (the single seam: `buildPipelineViewModel({project, bbosFilter})`), `adapter/bbos-dashboard-mock.js` (throwaway OLOS seed re-keyed into the VM shape), `BbosPipelineDashboard.css` (all scoped styles + `.bpd` palette vars + keyframes), `palette.js` (JSX-free color/label helpers using inline `--c`/`--c-dim`/`--c2` custom props), `primitives.jsx` (Ornament/SPill/Arc/Spirit/Dot), `BbosPipelineRail.jsx`, `BbosStageOverview.jsx`, `BbosExecView.jsx` + `BbosApprovalBrief.jsx` (portals + body scroll-lock), `BbosPipelineDashboard.jsx` (root).

Toggle: `bbosNewDashboard` flag + `toggleBbosNewDashboard` action in `app-store.js` (persists `bbiz_bbos_new_dash`, default OFF, added to `SYNC_EXCLUDED_KEYS` as a per-device preference). `DashboardView.jsx` branches on the flag. Surfaced as a "Labs" row in Settings.

## Rationale

- **Single seam = clean follow-up.** Components consume only the view-model, never live stores this pass — so the follow-up wiring pass is a single-module source swap with the same signature, not a rewrite.
- **Scoped `.bpd` palette** keeps the intentional dark theme from leaking into the rest of the (light/teal) app. Verified: app topbar, side-nav, and bottom bar stay light while the dashboard body is dark.
- **OFF-by-default toggle** makes the production path byte-for-byte unchanged — zero regression risk while the redesign matures.
- **Inline custom-property technique** (`--c`/`--c-dim`/`--c2` referencing scoped palette vars; alpha tints via `color-mix`) keeps the exact mockup colors with no color literals in JS and minimal CSS duplication.
- **Portals share var declarations with `.bpd-modal-overlay`** (vars only, no opaque background) so portaled modals inherit the scoped palette without defeating the translucent scrim.

## Alternatives Considered

- **Replace `BbosFullDashboard` outright** — rejected: high regression risk on a fully-wired 90KB production surface before the redesign is data-backed.
- **Wire live data in this pass** — rejected: several mockup concepts have no clean live equivalent (typed exec-task forms, JSON stage-pack import, cycle-completion/close-cycle, "proceed with conditions" gate state, Barakah Health Index / Restoration scoring). Phasing isolates the visual shell from those unknowns.
- **Global dark theme / reuse existing tokens** — rejected: the dark "cosmic" palette is intentional and specific to this surface; forcing it into the global light tokens would distort it and risk leakage.
- **Keep inline styles from the mockup** — rejected: violates the project's CSS conventions and the user's explicit "refactor to CSS" decision.

## Consequences

- **Enables** a clean follow-up: implement `buildPipelineViewModel` against live sources (`getBbosTaskDefsByStage`, `getBbosStageIslamic`, task/project stores) behind the unchanged signature; callers need no change.
- **Constrains** the follow-up to resolve the no-live-equivalent concepts (rendered inert from mock this pass) and to decide whether to retire `BbosFullDashboard` once parity is reached.
- Font fidelity divergence (documented): all non-Arabic roles map to `var(--font-body)` (DM Sans) to match the mockup pixel-for-pixel rather than the plan's literal mono mapping; Arabic → `var(--font-arabic)` (Amiri, since Scheherazade New is not loaded).
- Per-task `governingAttributes`/`attrMeaning` were NOT reintroduced — stage-level attributes remain owned by `bbos-stage-islamic.js`.

## Verification (2026-06-04)

`npm run lint` ✓ and `npm run build` ✓ (only pre-existing chunk-size/dynamic-import warnings). Preview-verified with screenshots: flag ON → new dashboard renders with scoped dark theme; rail + overview, Execution View (Research Factory, Gate Check tri-state, retrospective OPT Metrics/BHI/Restoration), Approval Brief (all 7 sections incl. Covenant Statement + Stage Decision gate radios), body scroll-lock engages/releases; Settings toggle flips + persists; flag OFF → legacy `BbosFullDashboard` renders unchanged. Zero console errors.

## Connections

- [[bbos-pipeline]] — the entity this dashboard visualizes; production dashboard is `BbosFullDashboard`
- [[milos]] — host application
- [[covenant-architecture]] — governing philosophy (covenant statement, gate decisions, duʿāʾ per stage)
- [[ceremony-gate-pattern]] — portal + scroll-lock modal convention reused from `BbosTaskPanel`
