---
title: "OLOS offline-demo E2E Playwright smoke suite (audit F4)"
type: decision
date: 2026-06-26
status: accepted
tags: [olos, e2e, playwright, testing, smoke, offline-demo, feature-demo-offline, audit, amanah]
superseded_by: null
---

# OLOS offline-demo E2E Playwright smoke suite (audit F4)

**Status:** Accepted + implemented (2026-06-26). Closes **item F4** of the 2026-06-26 pre-launch deep audit (`scripts/audit-out/ATLAS_DEEP_AUDIT_2026-06-26.md`), which deferred "E2E smoke (offline-demo launch/seed, header switcher, role-scope)." One commit on the worktree branch `claude/quirky-wilbur-30e285` (`1bd4b853`, 13 files +730/-1), **NOT pushed** (operator authorizes pushes). Sibling to the same audit's F3 ([[2026-06-26-atlas-a11y-axe-vitest]]). [[olos]].

> [!note] Operator-locked framing
> A **thin** smoke suite — three critical happy paths, not exhaustive per-route coverage. Build + serve the `FEATURE_DEMO_OFFLINE` bundle for the run rather than relying on a live API. Windows constraints: `corepack pnpm` (pnpm not on PATH); `lint` is `tsc`; do NOT push; commit via explicit pathspecs (operator WIP lives in the tree).

## Context

The offline demo ([[2026-06-19-atlas-offline-demo-deploy]]) is the public "Try OLOS" entry point — a client-only static bundle that boots a synthetic in-browser guest with no backend. It had **no end-to-end coverage**: nothing guarded that the bundle still boots, seeds its sample homestead, switches projects, or honours the Operational Role Layer's never-hide invariant ([[2026-06-24-atlas-spec-operational-role-layer]]). The 2026-06-26 audit tracked this as **F4**.

**Hard constraint — no live API.** The suite must exercise the genuine offline build, not a dev server wired to a backend. So the run *builds* the `FEATURE_DEMO_OFFLINE` bundle and serves the static `dist/` via `vite preview`; there is no `/api`, no auth, no sync.

## Decision

A thin Playwright suite (three specs + a Phase-0 canary) that builds and serves the offline bundle once and drives three happy paths the way a user would, reading production test seams rather than scraping the DOM for store-only data.

### Harness

- **Build + serve in one shot.** The Playwright `webServer` chains `node ../../scripts/build-offline-demo.mjs && corepack pnpm exec vite preview --port 4317 --strictPort`. `build-offline-demo.mjs` sets `process.env.FEATURE_DEMO_OFFLINE = 'true'` *before* importing Vite, because `vite.config.ts` reads the flag through `define` at config-evaluation time. `reuseExistingServer: !CI` lets local reruns reuse a running preview.
- **Dual-package hazard.** Specs run via `@playwright/test`'s own CLI from the repo-root install: `node ../../node_modules/@playwright/test/cli.js test` (wired as `test:e2e` / `test:e2e:install` in `apps/web/package.json`). Routing through a workspace-local `playwright` binary crosses two distinct `playwright` realpaths and trips *"test() did not expect to be called here."*
- **Config (`apps/web/playwright.config.ts`):** port 4317; `fullyParallel:false` + `workers:1` (one preview server, one Cesium-loading context at a time); `serviceWorkers:'block'` (the offline build ships a PWA service worker — blocking it keeps reloads deterministic and avoids a stale precached shell); `screenshot:'only-on-failure'`, `trace:'on-first-retry'`; timeout 60s.
- **Lint is untouched.** `e2e/` is outside the app tsconfig `include` (`["src", "../../packages/shared/src"]`), so `tsc --noEmit` never typechecks the specs; Playwright esbuild-transpiles them at run time.

### Test seams (production, not test-only)

- `window.__ogdenProjectStore` — the projectStore zustand hook. `getState()` reads the seeded roster; `setState()` fabricates state a builtin can't reach (see P2).
- `localStorage['demo-user-id']` — the key the offline boot reads to mint the guest. Overriding it before boot (via `addInitScript`) lets a spec *be* a specific demo member.
- The `homestead-sample-seeded@v1:` localStorage sentinel — written when the async sample seed runs.
- Accessible roles / test-ids: `listbox[aria-label="Switch project"]`, `view-focus-toggle`, `view-focus-role`/`view-focus-full`, `rail-outside-focus-toggle`, and the objective cards' `[role="button"][data-status]`.

Shared boot/store helpers live in `e2e/_helpers.ts` (not a spec; not collected).

## Per-spec design

### P1 — `offline-demo-boot.spec.ts`
`bootDemo` loads `/`, asserts it serves and redirects to `/v3/portfolio`, then waits until the store holds >=3 non-archived projects (the builtin clones). Asserts the demo banner (`/exploring a free demo/i` — a plain substring that sidesteps the curly apostrophe/em-dash in the copy), >=3 sample projects with one carrying `metadata.instantiatedFromTemplate === 'homestead-sample'`, and **polls the seed sentinel** to prove the seed actually ran (it fires asynchronously via `queueMicrotask`), not merely that the clone exists.

### P2 — `header-project-selector.spec.ts`
**Multi-project switch:** land on a project, open the listbox, read the first `option[aria-selected="false"]` (a `<Link>` to `/v3/project/<id>/<stage>`), click it, assert the URL now points at that project. **Single-project state:** the demo samples are `isBuiltin`, and `updateProject` drops non-allowlisted fields for builtins (`status` is not allowlisted, so the call is a no-op) while `archiveProject` early-returns on builtins — so neither store action can archive a sample. Instead, after the selector has mounted (and with no further navigation, since a reload re-injects the samples fresh), fabricate the sole-project state via the raw `__ogdenProjectStore.setState` writer, then assert the listbox shows exactly one `option`, none selectable to switch to, and the "All projects" escape-hatch link.

### P3 — `role-scope-never-hide.spec.ts`
**Surface.** The live default Plan shell is `PlanTierShell`, whose objectives list is the shared `ActTierObjectiveRail` — it mounts `ViewFocusToggle` and implements never-hide as **collapse-not-drop**: in-focus cards in the main list, out-of-focus cards in a one-click "Outside your focus (N)" group. (The legacy `stratum-spine` `ObjectiveColumn` is opt-in and mounts no toggle, so it is not the live surface.) **Precondition.** The layer is active only for a non-solo viewer holding an operational role. The demo seeds a 2-member roster (Yousef + Amina), so `isSoloProject` is false at `memberCount === 2`; the spec overrides `demo-user-id` to Amina *before boot* (via `addInitScript`) so she boots with `operationalRoles: ['food_production']` and the layer engages. A loud guard asserts `view-focus-toggle` mounts, with a message that points at the roster/role/identity precondition rather than the invariant. **Invariant.** Objective cards are `[role="button"][data-status]`. In **My focus** every card carries `data-scope` in `{in, out, out-surfaced}` and at least one is out-of-focus (de-emphasis happened); in **Full view** the card count is **identical** and **no** card carries `data-scope`. Same non-empty objective set across the toggle, scope annotation the only delta => never hidden, only de-emphasized.

## Amanah
Neutral — end-to-end test scaffolding; no capital / sale / CSA / CSRA / salam / yield-share surface touched.

## Verified
Windows, `corepack pnpm` (pnpm not on PATH). Full suite **6/6 green** (the three specs + the Phase-0 `_smoke` canary) via `corepack pnpm --filter @ogden/web run test:e2e`; lint (`tsc --noEmit`) exit 0. `apps/web/.gitignore` added for `test-results`/`playwright-report`/`blob-report`/`.playwright`. Committed via explicit pathspecs (never `git add -A`) on the worktree branch; NOT pushed.

> [!warning] Scope reconciliation with F3
> The F3 decision ([[2026-06-26-atlas-a11y-axe-vitest]]) deferred "**item F4** — a full-page / E2E axe pass" that could run the layout/landmark/contrast a11y rules it excluded under happy-dom. That was the F3 author's a11y-lens extrapolation of F4. The audit's **actual** F4 line item is "E2E smoke (offline-demo launch/seed, header switcher, role-scope)" — happy-path **smoke**, not an axe pass. This suite closes that F4 and runs **no** axe assertions, so the full-page/E2E axe pass F3 anticipated remains a **distinct, still-open follow-on** (not delivered here).

## Deferred / follow-ups
- The full-page/E2E **axe** pass F3 wanted (layout/landmark/contrast rules) — not in scope here; still open.
- No online/live-API path (offline demo only); no visual-regression/screenshot baselines; not exhaustive per-route coverage.
- F1, F2, F5 of the 2026-06-26 audit remain separate deferrals (F3 closed by [[2026-06-26-atlas-a11y-axe-vitest]]).

## Connections
- Closes F4 of the 2026-06-26 audit; sibling to [[2026-06-26-atlas-a11y-axe-vitest]] (F3) and [[2026-06-19-atlas-deep-audit-remediation]].
- Exercises the offline bundle from [[2026-06-19-atlas-offline-demo-deploy]] and the never-hide invariant of [[2026-06-24-atlas-spec-operational-role-layer]].
- Touches [[olos]].
