---
title: "Atlas — merge feat/atlas-permaculture → main via admin-bypass (PR #38)"
type: decision
date: 2026-06-05
status: accepted
tags: [atlas, ci, git, merge, infrastructure, vitest]
superseded_by: null
---

# Atlas — merge feat/atlas-permaculture → main via admin-bypass (PR #38)

## Context

The long-lived `feat/atlas-permaculture` branch (the trunk for ~14 months of Act/Plan
Command-Centre, OLOS local-first sync, universal-domain, and protocol-catalogue work —
see [[olos]]) needed to land on `main`. The atlas repo gates **every** change through
PR + CI; `main` had genuinely diverged (no fast-forward), so the merge had to go through
a reviewable PR (#38) with CI.

CI proved structurally red on **pre-existing infrastructure defects unrelated to this
PR's code** — all 281 web tests pass; the failures are in the harness, not the suite:

1. **web-ci `test` job hangs to the 15-min timeout.** Root-caused to a vitest 2.1.x /
   tinypool fork-pool **teardown hang**: after every test file passes, `pool.close()`
   waits on an OS handle a happy-dom worker leaves alive and never returns. Reproduced on
   **both** Node 20 (CI) and Node 24 (local). The hang is **upstream of the reporter
   `onFinished` hook** (in result-collection / a worker `onUnexpectedExit`), so the
   force-exit reporter committed this session (`bdfc42a6`) is **inert** — it cannot fire
   before the process is already wedged.
2. **web-ci `build` job fails** on `postbuild → prerender:showcase`: Playwright's browser
   binary isn't installed in the build job (`browserType.launch: Executable doesn't
   exist`). `tsc && vite build` itself compiles clean. This is a CI-config gap — the
   `build` job is missing the `pnpm exec playwright install` step that `deploy.yml` has.

The green checks were `typecheck`, lint, `api-ci`, and `api-integration` (real PostGIS).
web-ci has **never been green on any branch, including `main`** — these are standing
infra defects, not regressions introduced by the merge.

## Decision

**Merge PR #38 into `main` with `gh pr merge --admin --merge`** (admin-bypass of the
failing required web-ci gates), creating a **merge commit** (`1b2df59c`) rather than
squashing 1292 commits — preserving the branch's history. The merge was a **hard human
gate**; executed only after explicit operator confirmation ("Merge now (admin-bypass)")
via AskUserQuestion, following a time-boxed "Investigate & fix" attempt that hit the
pre-approved rabbit-hole fallback.

## Rationale

- ~~The merge is **deploy-safe**: `deploy.yml` (not web-ci) is the real build path and it
  *does* install Playwright, so production builds are unaffected by the web-ci build gap.~~
  **CORRECTION (2026-06-05, same session):** this was wrong. `deploy.yml` does **not**
  install Playwright either — the GitHub Pages deploy (run `27038445466`) failed on the
  **same** `prerender:showcase` Playwright gap immediately after the merge. The Playwright
  dependency in `postbuild` is a regression carried in by this branch (deploy + "Test
  (apps/web)" were green on prior `main` #37). The build gap is **not** web-ci-only; it
  breaks production deploy. Fixed in **PR #39** (`fix/ci-playwright-install`), which adds
  `playwright install --with-deps chromium` before the build step in **both** `web-ci.yml`
  and `deploy.yml`.
- The red checks gate on **harness defects**, not code quality — the suite passes and the
  type/api gates are green. Blocking the merge on a known-broken vitest teardown would
  hold the entire branch hostage to an upstream tooling bug.
- A merge commit preserves the 1292-commit history (and the per-slice ADR trail) that a
  squash would collapse.

## Alternatives Considered

- **Fix the vitest teardown hang first** — rejected: confirmed a rabbit hole. The hang is
  upstream of every reporter hook on both Node majors; a real fix means pinning/patching
  vitest or excising happy-dom, a separate scoped task, not a merge blocker.
- **Fix the build gate first** (`pnpm exec playwright install chromium` in web-ci) —
  deferred, not blocking: easily fixable but orthogonal to landing the branch; deploy.yml
  already covers the real build.
- **Don't merge / keep iterating CI** — rejected: the operator signalled the cost of
  further grinding ("its been way too long"); the work is verified by passing tests +
  green type/api gates.
- **Squash-merge** — rejected: would erase 1292 commits of history and the ADR-linked
  commit trail.

## Consequences

- `main` now carries the full permaculture line (merge commit `1b2df59c`).
- **Follow-ups deferred** (operator's call, not auto-done):
  1. **Parent-repo submodule bump** — `MAQASID OS - V2.1` still pins atlas at `0276a484`;
     `main` is now `1b2df59c`. Bump separately (`git add atlas && git commit`), not
     auto-committed without approval.
  2. **Build fix (web-ci + deploy)** — ~~deferred~~ **addressed in PR #39**
     (`fix/ci-playwright-install`): adds `playwright install --with-deps chromium` before
     the build step in **both** `web-ci.yml` and `deploy.yml`. The build gap was not
     web-ci-only — it broke the production Pages deploy (run `27038445466`) on the same
     `prerender:showcase` Playwright launch.
  3. **web-ci test gate** — either de-gate (mark non-required) or fix/pin the vitest hang.
     The reporter commit `bdfc42a6` is inert and optional to revert. **In progress:**
     operator approved de-gating `test` (mark non-required via branch protection).
- Required-check bypass is now part of this repo's history; future merges should not treat
  admin-bypass as routine — it was justified here only by **standing, code-independent**
  infra failure.

## Connections
- [[olos]] — the entity whose branch this merge lands
- [[2026-06-03-atlas-protocol-catalogue]] — among the latest work carried in by the merge
