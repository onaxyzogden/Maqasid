---
title: "OLOS pre-live-testing deep audit + remediation (F1-F17)"
type: decision
date: 2026-06-19
status: accepted
tags: [olos, audit, friction, content-integrity, rate-limiting, trust-proxy, ceremony, sync, amanah, env-docs]
superseded_by: null
---

# OLOS pre-live-testing deep audit + remediation (F1-F17)

**Status:** Accepted + implemented (2026-06-19). Before any live testing the operator asked for a comprehensive **read-only** scan of OLOS across two axes -- (A) **friction** in workflow / architecture / UI, and (B) **missing content / incomplete references / inconsistencies** -- followed by a staged, proportionate remediation. 17 findings (F1-F17) were surfaced by two adversarial workflows + firsthand source verification of every load-bearing claim; F1-F15 + F17 are remediated, F16 is an accepted deferral. Six commits on atlas `main` (`54e2a430`, `22b396c6`, `d6ce628a`, `10fb0ed9`, `953371bc`, `f78ad79d`), **NOT pushed** (steward authorizes pushes). Durable report committed at `scripts/audit-out/ATLAS_DEEP_AUDIT_2026-06-19.md`.

> [!note] Operator-locked framing (AskUserQuestion)
> Scope = **remediate everything incl. low polish** (not just the high-severity subset); **write the dated report** under `scripts/audit-out/`; the large in-tree WIP was **intentional** -> fold the confirmed change-sets into the plan rather than reverting them.

## Context

The scan combined two adversarial sweeps -- a friction sweep (`wd6by3hax`) and a content-integrity sweep (`wxn4a8w8v`) -- with firsthand inspection. **Adversarial verification changed the verdict twice:** the completeness critic rated two findings HIGH and **both downgraded on inspection**:

1. *Hydration race* -- the route loader reads an async-IDB store synchronously in `beforeLoad`. But the route-context `planReadOnly` **never redirects** for the mandate lock; the real enforcement is the reactive hook `useObjectivePlanLock`, which self-corrects on hydration. -> **Low** (a stale flag flash + a stale code comment), not a correctness bug.
2. *Multi-device sync clobber* on the append-only `PlanConcern[]` log -- real (`byKey` apply is a whole-bucket replace), but it is a **pre-existing property of the shared blob transport** used by ~8 client-only stores, not a Threshold-3 regression. -> **Medium / systemic.**

**Clean negative confirmation** (lenses that returned ZERO gaps): dangling-refs / dead-imports, ceremony-content-completeness, i18n-missing-keys, wiki-anchor breakage in the ceremony rails, ceremony-store versioning, structured-grounding `sources[]`, cross-app enum drift. The codebase is healthy on those axes. Health baseline at audit time: 222/222 targeted ceremony tests green; typecheck = 4 documented baseline errors + 2 new test-only TS2532 (in the WIP).

## Decision

Remediate in proportion to severity, grouped into six commits. **No re-gating** -- the always-clickable thresholds are a deliberate operator decision ([[2026-06-17-atlas-threshold1-reality-check]] family; `REACHABLE_THRESHOLD_IDS` in `declarationModel.ts`, commit `7b23c547`); the F6 fix touches copy + an unused value only.

### Pre-launch hardening -- F1, F2, F3 (`22b396c6`)

- **F1 (Med-High):** Fastify `trustProxy` was unset, so behind nginx every request shared **one** `req.ip` bucket -- the per-IP portal rate limits (`PORTAL_PUBLIC_RATE_LIMIT_MAX` / `PORTAL_PDF_RATE_LIMIT_MAX`) collapsed to a single global bucket (ineffective *and* a self-DoS vector). Added a pure `parseTrustProxy(raw)` helper (env string -> boolean / hop-count integer / subnet-or-list verbatim; `''` -> `false` safe default) and wired `Fastify({ trustProxy: parseTrustProxy(config.TRUST_PROXY) })`. Deliberately **not** a blind `true` (which trusts any `X-Forwarded-For` -- its own spoofing risk); the operator sets the exact nginx hop count / CIDR via env.
- **F2 (Medium):** `apps/api/.env.example` had **bidirectional drift** -- it documented 8 dead `FEATURE_*` flags (0 reads in `apps/api/src`) and omitted the 4 flags `featureGate.ts` actually reads. Removed the dead block; documented `ATLAS_PHASE_MAX`, `ATLAS_MOONTRANCE`, `ATLAS_LATENT` (+ legacy `ATLAS_FUTURE`) with accepted values.
- **F3 (Low-Med):** `apps/web/.env.example` omitted two consumed client flags. Added `VITE_ATLAS_TELEMETRY_ENABLED` (~9 readers, privacy-relevant) and `VITE_OLOS_FORMAL_PROOF_ENABLED` with their dev/prod default semantics.

### Ceremony UX consistency + discoverability -- F4, F5, F6, F7, F15 (`d6ce628a`)

- **F4 (Low-Med terminology collision):** the stratum switcher eyebrow rendered a bare **"Checkpoint"** directly above a "Threshold N --" title, while `checkpoint` *already* means the cyclical-review reopened objective in `ObjectiveCard.tsx`. Changed the eyebrow to **"Threshold"** and updated the test pin; `checkpoint` stays reserved for the `ObjectiveCard` meaning.
- **F5 (Medium a11y):** the switcher had no Escape / no outside-click dismissal and focus/ARIA gaps, inconsistent with `StratumLockedPopover`. Mirrored that component's keydown + outside-click + focus/ARIA treatment onto `ActTierStratumSwitcher`.
- **F6 (Medium honesty):** `COHERENCE_COPY.intro` **falsely** asserted design "has been completed across Tiers 3 and 4" even when reached early, and the computed `coherenceProgress` was **never consumed**. Corrected the copy to no longer assert completion, added an honest early/empty readiness state, and **consumed** `coherenceProgress` in `CoherenceCheckSurface` as a readiness indicator. **Did NOT re-gate** (thresholds stay always-clickable).
- **F7 (Medium discoverability):** no breadcrumb from "Raise a concern" to where review happens. Added a single-sourced `reviewLocation` string to `actMandateModel.ts` ("...the 'Concerns under review' queue on the Act Mandate (Threshold 3) surface in Plan."), surfaced as a Plan affordance + an Act briefing pointer toward the locked-objective escape path.
- **F15 (Low):** added a route `errorComponent` to the ceremony routes. `pendingComponent` deliberately omitted (no async loader on those routes -> it would be dead code).

### Sync robustness -- F8 (`10fb0ed9`)

- **F8 (Medium / systemic):** the three append-only governance logs (`ogden-plan-concerns`, coherence `amendments`, mandate `objectiveOverrides`) rode whole-bucket LWW blob sync; concurrent offline edits across devices lost one side. Added an **opt-in** `reconcileForProject` applier shape, used **only on the sync-hydrate path**, that unions the logs by id (plan-concerns by `id` lifecycle-wins; coherence amendments union-by-itemId/earliest-sealedAt; act-mandate earliest-mandatedAt / `planReadOnly`-OR / overrides-union). The destructive `applyForProject` (REPLACE) is **left untouched** to preserve the select<->apply round-trip and `restorePlanSnapshot`. A residual single-active-device assumption remains for the other blob-LWW stores (documented in the report).

### Empty-states, parity, safety nets -- F9-F14 (`953371bc`)

- **F9 (Low-Med):** T1 Phase-2 zero-element state previously read "0 of 0 elements classified. Classify every element..." with nothing to classify -> honest empty-state copy.
- **F10 (Low):** `REALITY_CHECK_COPY.notList` was defined but never rendered on T1 (T2/T3 render theirs) -> rendered for parity.
- **F11 (Low-Med):** reception Save was disabled with **no required-field signal**. Added a required `*` marker + `aria-required` + an "at least N" legend hint (via `VisionFormFields` `missingRequirements`).
- **F12 (Low):** `ActMandateReferenceRail` had no test (T1 + T2 rails do) -> added `ActMandateReferenceRail.test.tsx` mirroring `CoherenceCheckReferenceRail.test.tsx`, including the `detectCsaLikeText` advisory branch.
- **F13 (Low-Med) -- FALSE NEGATIVE, authored nothing:** the audit claimed `progressTracking` had no presence ratchet. On inspection the ratchet **already existed** at `catalogues.test.ts:441-511` (added 2026-06-18 in the [[2026-06-18-atlas-tier6-launch-preparation]] sweep, named after the feature "Mode-5 sweep" not the mechanism "ratchet"). Logged "Already satisfied" in the report; no test written.
- **F14 (Low, latent):** the three ceremony stores pin `version: 1` with no `migrate`. Added in-code **TRIP-WIRE** comments at each `version: 1`: the next persisted-shape change MUST bump `version` AND add `migrate(persisted, from)`, because zustand `persist` discards any stored state whose version != current when no migrate is supplied (which would silently drop the append-only governance logs).

### WIP folded in (operator-confirmed intentional) -- (`f78ad79d`)

The three coherent in-tree change-sets the operator confirmed were intentional: (a) Plan default view `'current'` + removal of the 3D-Terrain / Year-scrub tabs; (b) the dimension-draw mousedown/mouseup commit gesture; (c) `Plan3DSelectionHandler` design-element selection survival + Open-in-Plan handoff. Folding them in also fixed the 2 new test-only **TS2532** in `useDimensionDrawTool.commit.test.tsx` (non-null assertions on `onComplete.mock.calls[0]![0]` and `geom.coordinates[0]!.length` under `noUncheckedIndexedAccess`), returning typecheck to the 4-error baseline.

### Accepted deferral

- **F16 (Low):** boundary doc-attach is a metadata stub honestly labeled "coming soon" -- tracked only, no change today.

## Amanah

Structural / neutral throughout. No advance-sale / CSA / CSRA / salam / subscription / yield-share framing was authored anywhere (CSRA erased 2026-05-04, *bay' ma laysa 'indak* -- [[fiqh-csra-erased-2026-05-04]]). F12's new test **covers** the `detectCsaLikeText` advisory branch rather than weakening it; the coherence store's persistence-boundary refusal of CSA-like amendment text is untouched. The F7 `reviewLocation` copy and F6 honesty correction make the governance / coherence surfaces *more* truthful, in keeping with the covenant's honesty obligation.

## Verified

- **Typecheck:** the 4-error documented baseline, **0 new** (the prior 6 -> 4 after the Phase-7 TS2532 fix). The 4 remaining are pre-existing foreign test-only errors (`syncServiceWorkItemsFallback.test.ts:119` TS2488; `WorkConflictSection.test.tsx:119/120/134` TS2532).
- **Targeted suites green:** 19 WIP + 76 remediation + 139 catalogues (run bounded via `node ../../node_modules/vitest/vitest.mjs run` from `apps/web` / `packages/shared`, after `check-react-resolution.mjs`).
- **Live preview NOT driven -- disclosed.** The working tree was entangled with the operator's large active uncommitted demo / GitHub-Pages deploy WIP ([[2026-06-19-atlas-offline-demo-deploy]]), which a dev server would build alongside; and the v3 ceremony shell resists headless preview automation ([[project-screenshot-hang]]). The ceremony changes are display/copy/dismissal/required-field, all unit-testable -- pinned by the new/updated vitest suites + the 0-new typecheck rather than a screenshot (per the CLAUDE.md rule: do not claim preview success without a screenshot).
- **Tree partition.** The working tree held ~80 changed files vs the ~17 start-of-conversation snapshot -- the operator was committing parallel work AND carrying the demo-deploy feature. Committed ONLY my files via explicit pathspecs; verified disjoint at file level; never touched a foreign file. `main` is ahead of origin by 18 (operator's 12 + my 6).

## Consequences

- Behind nginx, portal rate limits now key per visitor (F1); the API/web `.env.example` files match the flags the code actually reads (F2/F3); the ceremony surfaces use one consistent "Threshold" vocabulary, are keyboard/outside-click dismissible, tell the truth about progress, and point the steward from "raise a concern" to where it is reviewed (F4-F7); concurrent offline edits to the three governance logs no longer lose a side on reconcile (F8); empty/missing states and parity copy are in place and the `progressTracking` + store-migration safety nets are ratcheted/trip-wired (F9-F14).
- A durable, dated audit report under `scripts/audit-out/` records every finding, its adversarial verdict, the firsthand evidence, and the negative-confirmation list -- the reference for the next pre-live pass.

## Deferred

- **F16** boundary doc-attach (accepted stub).
- The residual single-active-device assumption for the remaining blob-LWW ceremony stores (only the three governance logs got merge-by-id; documented, not yet generalised).
- A live-preview screenshot pass for the ceremony surfaces once the tree is disentangled from the operator's demo-deploy WIP.
- Push -- the 6 commits await steward authorization.

## Related

- Entity [[olos]]; logged [[log]] (2026-06-19). The two HIGH downgrades concern [[2026-06-18-atlas-threshold3-act-mandate]] (mandate lock / `useObjectivePlanLock`) and the shared blob transport. F6 respects the always-clickable model from [[2026-06-17-atlas-threshold1-reality-check]]. F13 references [[2026-06-18-atlas-tier6-launch-preparation]] (where the ratchet was actually added). Sits alongside the operator's [[2026-06-19-atlas-offline-demo-deploy]] WIP. Live preview of v3 routes NOT driven for screenshots ([[project-screenshot-hang]]).
