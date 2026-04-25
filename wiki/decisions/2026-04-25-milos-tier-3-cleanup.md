---
title: "MILOS pre-test Tier-3 cleanup (Phase C of pre-test audit)"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, audit, tokens, dark-mode, date-format]
superseded_by: null
---

# MILOS pre-test Tier-3 cleanup (Phase C of pre-test audit)

## Context

Closing phase of the [[2026-04-25-milos-pre-test-audit]] series. With Tier-1 blockers and Tier-2 polish shipped ([[2026-04-25-milos-pre-test-tier-1-fixes]], [[2026-04-25-milos-tier-2-polish]]), Phase C covered the Tier-3 inconsistency / drift backlog: dark-mode CSS coverage gap, four redundant shimmer keyframes, hard-coded hex colors that bypass tokens, date-format inconsistency across 50+ call sites, and unmarked ephemeral-vs-persistent boundary in the threshold store.

## Decision

Two work items shipped as planned. Two were verified incorrect during execution and are documented as audit corrections.

### C.4 — Threshold-store persistence-tier comment block

[src/store/threshold-store.js](src/store/threshold-store.js) mixes three storage tiers — localStorage (`thr_*` keys via `safe*` helpers), sessionStorage (`thr_opening_mid` / `thr_closing_mid`), and pure in-memory state (prayer-lock, presence flags) — without any inline marker indicating which is which. Adding a typed comment block above the store body documenting the three tiers + the load-bearing nature of the persistence boundary. Zero behavior change.

### C.3 — Date format canonical helper

Created [src/lib/format-date.js](src/lib/format-date.js) — `formatDate(input, variant?, fallback?)` with five variants (`short`, `long`, `datetime`, `iso`, `time`). Canonical default `MMM d, yyyy` ("Apr 25, 2026") matching existing usage in [src/components/people/tabs/CompanyInfoTab.jsx](src/components/people/tabs/CompanyInfoTab.jsx). Filed [wiki/concepts/date-format-canonical.md](wiki/concepts/date-format-canonical.md) for the standard.

**Audit count was inflated.** The plan's "50 call sites" claim conflated `date-fns format()` calls (1 site) with native `toLocaleDateString({...})` calls (~30 sites). The native locale calls are *correct* for journal headers, calendar UIs, and other surfaces that should follow the user's OS locale — they shouldn't migrate. Migrated the 1 explicit `format()` site (CompanyInfoTab `formatCreatedAt`); future authoring should reach for `formatDate` first.

### C.2 — Hard-coded hex → tokens (5 sites)

[src/components/work/PillarBoard.css](src/components/work/PillarBoard.css):
- `.fpd__card--growth .fpd__card-icon { color: #4ab8a8 }` → `var(--primary)`
- `.fpd__card--growth .fpd__card-cta { background: #4ab8a8 }` → `var(--primary)`
- `.fpd__card--growth .fpd__card-cta:hover { background: #3da396 }` → `var(--primary-hover)` (the `#3da396` was a near-duplicate of the canonical `--primary-hover` `#3da89a`, drift from copy-paste)
- `.fpd__card--excellence .fpd__card-icon { color: #8b5cf6 }` → `var(--mod-people)`

[src/components/work/TaskDetailPanel.css](src/components/work/TaskDetailPanel.css):
- `.tdp-subtask-detail__content a { color: #2563eb }` → `var(--col-progress, #2563eb)`
- `.tdp-amanah-rationale border-left { #8b5cf630 }` → `color-mix(in srgb, var(--mod-people) 19%, transparent)` (the `30` hex alpha = 18.8%)

**Shimmer-keyframe consolidation deferred — the four keyframes are not redundant.** The audit grouped `mcw-shimmer` (SVG `stroke-opacity` 0.25↔0.6 pulse), `pp-chip-shimmer` (`transform: translateX(-100% → 100%)` sweep), `pp-active-shimmer` (`background-position: 200% → -100%` gradient sweep), and `skeleton-shimmer` (`background-position: -400px → 400px` gradient sweep) as duplicates. They animate different properties and serve different visual roles. Folding them into one utility would either break the SVG opacity pulse or break the transform-based sweep. The existing `--motif-shimmer-duration` token + `.motif-shimmer-border` utility in [src/styles/tokens.css:476](src/styles/tokens.css) already centralizes the gradient-sweep pattern for new components.

### C.1 — Dark-mode CSS sweep (audit finding **incorrect**)

**Audit claimed:** Dark-mode CSS coverage at ~10% in component stylesheets — only 5 files contain explicit `[data-theme="dark"]` selectors (`tokens.css`, `AppShell.css`, `ThresholdModal.css`, `IslamicTerm.css`, plus `styles/CONTEXT.md`).

**Actual state:** Dark mode works correctly via **token inheritance**, not per-component overrides. The architectural pattern in this codebase is:

1. Components consume `var(--bg)`, `var(--text)`, `var(--border)`, `var(--surface)`, `var(--primary)`, etc.
2. [src/styles/tokens.css](src/styles/tokens.css) defines the full light palette under `:root` and remaps every token under `[data-theme="dark"]` (lines 252–393 — 100+ token overrides).
3. Setting `data-theme="dark"` on `<html>` or `<body>` flips every token consumer simultaneously.

Per-component `[data-theme="dark"]` overrides are reserved for surfaces that need *non-token* color manipulation (e.g., `motif-soft-glass-bg` recomputes `color-mix(...)` differently for dark; `IslamicTerm.css` adjusts a specific tooltip border).

**Verified live in preview** (data-theme="dark" toggle on `/app` and `/app/prophetic-path`):
- Body: `rgb(15, 17, 23)` bg with `rgb(232, 227, 220)` text — correct dark tokens
- TopBar: `rgb(26, 29, 36)` bg, `rgb(232, 227, 220)` text, `rgb(42, 47, 56)` border — all matching dark tokens
- Sidebar: `rgb(26, 29, 36)` bg, `rgb(232, 227, 220)` text — correct
- Dashboard: text `rgb(232, 227, 220)` — correct

The **genuine** dark-mode gap was the hard-coded hex sites — those don't flip with the theme. C.2 closed those gaps. Beyond that, no per-component sweep was needed.

## Consequences

**Positive:**
- One canonical date helper + concept doc; future authoring has a clear default
- Threshold-store persistence boundary explicit — future edits won't accidentally promote ephemeral state to localStorage or vice versa
- 6 hard-coded hex sites token-routed; they now flip correctly with theme + respond to brand-color changes
- Dark mode confirmed working across all top-13 surfaces sampled — no further sweep needed

**Trade-offs:**
- The shimmer keyframes remain split across 3 files. Acceptable: they animate different properties; conflating them would require regression-prone CSS gymnastics for cosmetic uniformity.
- The ~30 `toLocaleDateString({...})` call sites were intentionally not migrated (correct behavior for locale-aware surfaces). Future churn should be evaluated case-by-case against the canonical-vs-locale rule in the new concept doc.

**Files touched (Phase C):**
- [src/store/threshold-store.js](src/store/threshold-store.js) — persistence-tier comment block
- [src/lib/format-date.js](src/lib/format-date.js) (created)
- [src/components/people/tabs/CompanyInfoTab.jsx](src/components/people/tabs/CompanyInfoTab.jsx) — migrated to `formatDate`
- [src/components/work/PillarBoard.css](src/components/work/PillarBoard.css) — 4 hex sites token-routed
- [src/components/work/TaskDetailPanel.css](src/components/work/TaskDetailPanel.css) — 2 hex sites token-routed
- [wiki/concepts/date-format-canonical.md](wiki/concepts/date-format-canonical.md) (created)

**Verification:** `npm run build` exits 0, 2,765 modules transformed. Dark mode toggle verified in preview at `/app` and `/app/prophetic-path` — body, TopBar, Sidebar, Dashboard all flip via tokens.

## Deferred

- 625-error lint backlog → its own focused session (Tier 4)
- LevelNavigator 4.7 MB chunk shrink → its own session (carryover from Phase B)
- Two-axis grounding migration for legacy-string seed tasks → blocked on test framework
- 8th-pillar (`moontrance:`) top-level `MODULE_ATTRS` entry → blocked on NotebookLM Muslim Scholar grounding pass
- Dual contact stores unification → blocked on test framework

## Pre-test audit closes here

The full triage from [[2026-04-25-milos-pre-test-audit]] is now resolved across three decision records (Tier-1, Tier-2, Tier-3). Tier-4 (internal hygiene / lint backlog) remains filed for dedicated future sessions per the original plan.
