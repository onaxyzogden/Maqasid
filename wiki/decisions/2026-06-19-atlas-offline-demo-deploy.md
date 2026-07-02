---
title: "OLOS free offline 'Try OLOS' demo + GitHub Pages deploy (FEATURE_DEMO_OFFLINE)"
type: decision
date: 2026-06-19
status: accepted
tags: [olos, demo, offline, github-pages, maptiler, vite, feature-flag, deploy, amanah]
superseded_by: null
---

# OLOS free offline "Try OLOS" demo + GitHub Pages deploy

**Status:** Accepted + implemented (2026-06-19). A build-time flag `FEATURE_DEMO_OFFLINE` produces a fully client-only static bundle of `@ogden/web` that boots a synthetic in-browser guest (no backend, no login wall), served free at `try.atlas.ogden.ag` via GitHub Pages. Phases 1-2 of the approved plan are code-complete; Phase 3 (the Pages pipeline + domain files) is authored and its build path is verified end-to-end locally. **None of it is committed or deployed yet** -- the commit + the deploy are operator-gated (covenant: human review gate for outward-facing actions; "commit or push only when the user asks").

> [!warning] Nothing is on `main`, a branch, or origin
> The entire demo changeset (32 files) is uncommitted working-tree state on top of `main`, intermingled with unrelated foreign WIP (Threshold-3 / Act-tier-shell / Plan-draw work). The Actions `checkout` builds the **committed** tree, so the operator must first commit the demo manifest **to a `demo` branch with an explicit pathspec** (NOT `git add -A` -- that would drag the foreign WIP in) and push, or the deploy builds nothing new. See "Operator runbook" below.

## Context

OLOS today only runs as a **paid full-stack Render deployment** (`render.yaml`: managed PostGIS + Redis + Fastify API + nginx, ~$26-40/mo), and its login wall is "currently broken" (`render.yaml:111-116`). The existing `FEATURE_DEMO_MODE` only papers over login by auto-registering a guest **through the API** (`demoSession.ts` `register()`), so it cannot run without the backend. There was **no free way for anyone to actually use OLOS**.

The opening: the core OLOS experience is already **local-first**. Creating a project, drawing on the map, and walking Observe -> Plan -> Act all run client-side, persisted to IndexedDB, with zero backend reads (`projectStore.createProject` is 100% local; the Observe/Plan/Act record stores persist to IndexedDB and only *optionally* sync). A seeded "351 House -- Atlas Sample" project already ships (`maybeCloneBuiltinsForDemo`). Everything that needs the server -- live GIS layers, AI narrative/chat, real-time collaboration, upload, export, portal sharing -- already **degrades gracefully** (null / empty / disabled, no crashes). So a no-backend static build is viable without rewriting features, only by gating the few server-only controls that would otherwise render as dead buttons.

## Decision

Three operator-locked decisions (carried from prior planning sessions) frame the build:

1. **Scope = explainer -> live demo.** The existing `/showcase/three-streams` scrollytelling becomes the landing page, with a new **"Launch the interactive demo"** CTA into the full client-only app. (Not a static brochure; not the full paid app -- a real hands-on demo on the seeded sample + the visitor's own new projects.)
2. **Hosting = GitHub Pages + custom subdomain** `try.atlas.ogden.ag`, so Vite `base` stays `/` (no base rewrite). $0 hosting; the paid Render path is untouched.
3. **Map key = a bundled, HTTP-referrer-locked free MapTiler key.** Inlined into the public bundle (unavoidable for a client-only map) but abuse-limited by a dashboard-side referrer lock to the demo domain.

### Implementation shape

- **Build-time flag.** `vite.config.ts` `define`: `'process.env.FEATURE_DEMO_OFFLINE': JSON.stringify(process.env.FEATURE_DEMO_OFFLINE ?? 'false')` (mirrors the existing `FEATURE_DEMO_MODE` plumbing). `demoSession.ts` reads `DEMO_OFFLINE_ENABLED = process.env.FEATURE_DEMO_OFFLINE === 'true'`; the constant folds to a literal at build time so the dead branch is tree-shaken from the production paid bundle.
- **Client-only guest session (the core change).** New `bootOfflineDemoSession()` mints a synthetic local session directly -- no `register()` / no `/api` call: reuse `makeGuestCredentials()` for the `guest-...@demo.ogden.ag` identity (so `isDemoUser()` keeps working), persist a stable `demo-user-id` so the clone-idempotency flag survives reloads, set the auth store to a sentinel `DEMO_LOCAL_TOKEN`, then call the existing client-side `maybeCloneBuiltinsForDemo()`. `authStore.initFromStorage` short-circuits on the sentinel token (no `api.auth.me()`, no `sessionUnverified` banner). `bootAuthed.bootAuth` branches on `DEMO_OFFLINE_ENABLED` and **skips `syncService.start()` + the login/logout sync subscription** -- the early-return gates the entire server layer (syncService, siteDataSync, session-expiry bridge), and the stores short-circuit before any fetch.
- **Hide server-only surfaces.** Build env drives `FEATURE_MULTI_USER=false` (default is `true`, so it MUST be overridden -- it gates `MapView`/`RelationshipsRail`/`NeedsYieldsAuditCard`), plus `FEATURE_AI/PUBLIC_PORTAL/RELATIONSHIPS/DEMO_MODE=false` (already default-false). Verification-driven `DEMO_OFFLINE_ENABLED` guards then hide the genuinely-broken controls discovered by exercising the app: the **sheet/PDF export** control (`DesignToolRail` -- it POSTs to `api.exports.generate`), `MapSheetExportControl`, the Observe-module export buttons (6 dashboards + SWOT report/journal), `ReportPage` export, and the portfolio map/list export affordances.
- **Honesty banner + handoff.** A slim `DemoBanner` shown when `isDemoUser` / `DEMO_OFFLINE_ENABLED`: *"You're exploring a free demo -- your work is saved in this browser only."* The showcase hero gains a `DemoLaunchCta` -> `/home`; `landingRoute.beforeLoad` prepends a demo-guarded `/` -> `/showcase/three-streams` redirect **ahead of** the `isAuthenticated()` count gate (offline boot mints the token before the router mounts, so without this `/` would bounce straight into the app).
- **Pages pipeline.** New `.github/workflows/deploy-demo.yml` (trigger `workflow_dispatch` + push to a `demo` branch -- **not** `main`): checkout -> `pnpm/action-setup@v4` -> setup-node 20 (cache pnpm) -> `pnpm install --frozen-lockfile` -> `playwright install --with-deps chromium` -> **`pnpm --filter @ogden/web exec vite build`** (the demo env block) -> **`pnpm --filter @ogden/web prerender:showcase`** -> configure-pages -> upload-pages-artifact (`apps/web/dist`) -> deploy-pages. `public/CNAME` = `try.atlas.ogden.ag`; `public/.nojekyll` empty.

### Two load-bearing build-path facts (verified, not assumed)

- **tsc is bypassed by design.** `vite build` is esbuild transpile-only -- no typecheck -- exactly mirroring `infrastructure/Dockerfile.nginx:49` (`pnpm --filter @ogden/web exec vite build`), which is how the paid SPA is built. So the repo's 6 pre-existing **test-only** tsc errors cannot fail this deploy; the workflow deliberately runs `vite build` directly rather than the `build` package script (which would invoke `tsc`).
- **The showcase prerender must be an explicit step.** `postbuild` -> `prerender:showcase` only fires for the `build` package script; turbo and a direct `vite build` do **not** fire `postbuild`. The prerender (`scripts/prerender-showcase.ts`, Playwright chromium spawning `vite preview` on :4173, prerendering the 4 showcase routes) is therefore a separate workflow step. It spawns bare `pnpm` (`shell:true`) -- fine in CI (pnpm on PATH via action-setup), but it fails locally where only `corepack pnpm` exists (worked around locally with a one-shot `pnpm.cmd` shim; pure local-PATH artifact, no code impact).

## Amanah

Benign feature; no riba / gharar / CSA surface. The one honesty obligation -- the demo must **not** imply work is saved to the cloud or make any return/ownership claim -- is satisfied by the "saved in this browser only" banner. No "Sign up" / "Sign in" link is shown (the real `atlas.ogden.ag` login is the one that is "currently broken"; pointing visitors at it would break the honesty promise -- revisit once real login is restored). An adversarial pre-deploy review (5 dimensions) confirmed the banner is truthful, no cloud/ownership/yield-share/CSA framing is introduced, the broken-login link stays hidden, and the Islamic framing of the showcase content is intact. No CSA/CSRA/salam/advance-purchase framing anywhere (CSRA erased 2026-05-04, *bay' ma laysa 'indak*).

## Security finding (acted on)

The adversarial review surfaced one confirmed medium finding: the bundled MapTiler key is inlined into the **public** static bundle (readable via DevTools), and the **only** thing preventing a stranger from spending the operator's quota is the HTTP-referrer lock -- which is **dashboard-side config, not enforced by any code**. The original workflow buried this in a one-line comment. Acted on by expanding `deploy-demo.yml` prerequisite #1 into a loud operator **MUST**: lock the key to `https://try.atlas.ogden.ag` in the MapTiler dashboard *before* storing it as the `DEMO_MAPTILER_KEY` secret; an unrestricted key is a real abuse vector.

## Consequences

- A visitor opens `try.atlas.ogden.ag`, lands on the showcase tour, clicks "Launch the interactive demo," and uses real OLOS -- seeded sample + their own new projects, map drawing, Observe/Plan/Act -- entirely in-browser, no backend, no login, no broken controls, with a clear "saved in this browser only" notice. $0 hosting. The paid Render deploy and its build are untouched (the flag is off everywhere except the demo build).
- The demo bundle ships a real (referrer-locked) credential; quota abuse is dashboard-limited, not code-limited -- an operational responsibility, documented in the workflow.

## Verified

- **Build path end-to-end (empirical, local):** `FEATURE_DEMO_OFFLINE=true FEATURE_MULTI_USER=false ... vite build` -> exit 0 (built in ~40s, 7936 modules); MapTiler key inlined; `process.env.FEATURE_DEMO_OFFLINE` folded (zero occurrences in `dist` = the `define` fired); `CNAME` / `.nojekyll` / `index.html` / `404.html` copied into `dist`. `prerender:showcase` -> exit 0, 4 routes prerendered with real content incl. the Phase-2 CTA (the `[preview] exited with code 1` line is the Windows `taskkill /f` of the preview server on teardown -- expected).
- **Unit:** `demoSession.test.ts` **22/22** in isolation (no `register`/`/me` calls; sentinel token + guest user set; clone runs). The 7 full-suite failures across 4 files are the **pre-existing foreign** set (`completionPathAudit.ratchet`, `projectStore.secondaryReopen`, `VisionLayoutCanvas.surveyLayers`, `BoundaryCaptureLegacy`) -- not introduced by the demo changeset.
- **Changeset disentanglement:** demo-marker grep + `git diff --stat` + mixed-hunk inspection confirm the 32 demo files carry no foreign hunks and are path-disjoint from the foreign WIP. `DesignToolRail.tsx`'s 104-line churn is pure re-indentation around one `{!DEMO_OFFLINE_ENABLED && (...)}` wrap of the existing export block (inner code byte-identical).
- **Adversarial pre-deploy review (Workflow, 5 dimensions -> verify):** Pipeline CLEAN, no-backend Isolation CLEAN (independently traced through `bootAuthed`/`authStore`/stores), Honesty/Amanah CLEAN, Security = the one finding above (acted on), Completeness closed manually.

## Operator runbook (handed off -- I will not execute these)

1. **MapTiler key (security-critical):** create a free MapTiler key, HTTP-referrer-lock it to `https://try.atlas.ogden.ag` in the dashboard, **then** store it as repo secret `DEMO_MAPTILER_KEY`.
2. Repo **Settings -> Pages -> Source = "GitHub Actions"**.
3. Repo **Settings -> Pages -> Custom domain = `try.atlas.ogden.ag`** (this, not the `CNAME` file, is what binds the domain for an Actions-source deploy).
4. **DNS:** `CNAME try.atlas.ogden.ag -> onaxyzogden.github.io`.
5. **Commit the 32-file demo manifest to a `demo` branch with an explicit pathspec** (NOT `git add -A`), then push (or `workflow_dispatch`). Manifest = the 26 tracked-modified + 6 untracked files listed in the project memory topic file.
6. **Post-deploy smoke test:** load the subdomain (showcase at root), hard-reload a deep app route (SPA `404.html` fallback) and a showcase sub-route (prerendered), confirm the map renders and IndexedDB persists across reload.

## Deferred

- A free *backend* tier (rejected -- free PostGIS/Redis/API tiers sleep/expire, fragile for a public demo).
- Fixing the real broken login wall on the paid Render deploy (separate effort); once fixed, reconsider a "Sign up" link in the demo.
- The 6 pre-existing test-only tsc errors (restore `web-ci`/typecheck green; one lives in untracked foreign WIP).
- Optional `"build:demo": "vite build"` convenience script.

## Related

- Reuses the local-first stores + `maybeCloneBuiltinsForDemo` + `makeGuestCredentials`/`isDemoUser` from the existing demo-mode plumbing; builds on the showcase scrollytelling. Entity [[olos]]; logged [[log]] (2026-06-19). Live preview of v3 routes NOT driven for screenshots ([[project-screenshot-hang]]).
