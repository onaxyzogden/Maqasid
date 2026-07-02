---
title: "OLOS a11y axe-core checks wired into the apps/web vitest suite (audit F3)"
type: decision
date: 2026-06-26
status: accepted
tags: [olos, a11y, accessibility, axe-core, jest-axe, vitest, testing, jsdom, audit, amanah]
superseded_by: null
---

# OLOS a11y axe-core checks wired into the apps/web vitest suite (audit F3)

**Status:** Accepted + implemented (2026-06-26). Closes **item F3** of the 2026-06-26 pre-launch deep audit (`scripts/audit-out/ATLAS_DEEP_AUDIT_2026-06-26.md`), which deferred "wire automated accessibility (axe-core) checks into the vitest suite" and folded in the audit's **maps-1 / maps-2** a11y observations. One commit on the isolated worktree branch `claude/festive-keller-1698ff` (`f6a4fabc`, 11 files +475), **NOT pushed** (steward authorizes pushes). [[olos]].

> [!note] Operator-locked framing
> A **conservative first pass** — a tractable rule allowlist + assertions on a handful of high-traffic v3 surfaces, **not** a full-suite a11y gate on day one; **document any knowingly-deferred violations**. Windows constraints: `corepack pnpm` (pnpm not on PATH); vitest BOUNDED `--pool=forks` (threads pool hangs at exit); jsdom unit-level only (NOT preview); `lint` is `tsc`; do NOT push; commit via explicit pathspecs.

## Context

OLOS had **no automated accessibility coverage**. The earlier [[2026-06-19-atlas-deep-audit-remediation]] pass fixed two a11y issues by hand (its F5 — switcher Escape / outside-click / ARIA), but nothing guarded regressions. The 2026-06-26 audit re-surfaced this as **F3** plus the maps a11y notes.

**Hard constraint — jsdom only, never preview/browser.** The v3 ceremony shell hangs the preview tool on Observe-lens mounts ([[project-screenshot-hang]]), so a11y coverage must live as component-level checks in the bounded vitest suite (`pool:'forks'`), not E2E. axe-core runs fine against a happy-dom container; rules that need real layout/paint do not.

## Decision

A small shared helper + a curated rule allowlist, asserted on a handful of high-traffic v3 surfaces. Start narrow and ratchet up — meaningful from day one, never a blunt whole-suite failure.

### The helper — `apps/web/src/test/a11y.ts`
- `A11Y_RULE_ALLOWLIST` — ~24 axe rules that (a) are WCAG-relevant AND computable without real paint/layout (so they give a trustworthy verdict under happy-dom) and (b) the audited surfaces pass today: accessible-name rules (button / link / select / input-button / aria-command / aria-input-field / aria-toggle-field), `label`, the ARIA-correctness family (allowed-attr / allowed-role / required-attr / required-children / required-parent / roles / valid-attr / valid-attr-value / hidden-focus), image/svg alt, list / listitem, `nested-interactive`, `duplicate-id-aria`.
- `expectNoA11yViolations(container, disableRules?)` — runs the allowlist and throws a readable multi-line report (rule id, impact, helpUrl, node targets). No custom matcher / `expect.extend` / `setupFiles` — stays `tsc`-clean and matches the project's matcher-free test style.
- **Excluded by design** (documented in the file — NOT a claim the surfaces pass them): color-contrast, region / landmark-*, document-title, html-has-lang / lang-valid, bypass, meta-viewport, scrollable-region-focusable — all need real CSS geometry / document chrome / landmarks an isolated mount lacks. These belong to a future full-page / E2E axe pass (**item F4**).

### Deferral mechanism (the load-bearing detail)
A surface can knowingly defer one allowlisted rule via `expectNoA11yViolations(container, ['rule-id'])`. Crucially, **a deferral DROPS the rule from the run set** — it is *not* a `rules: { id: { enabled: false } }` toggle. With axe-core's `runOnly: { type: 'rule', values }`, every id in `values` is force-run and a `rules` disable for an id inside that list is **ignored** (verified empirically — the first attempt, a `rules` toggle, did not suppress the violation, which is what surfaced this). So the helper computes the run set as `A11Y_RULE_ALLOWLIST` minus `disableRules`. Every deferral is logged in `apps/web/src/test/A11Y_DEFERRALS.md` with reason + intended fix and carries an inline `DEFERRED` comment.

### Surfaces covered (5)
New a11y blocks on five high-traffic v3 surfaces: **ActTierObjectiveRail** (objectives + protocols + operational-role scope), **HeaderProjectSelector** (collapsed trigger + expanded popover), **ThresholdReviewPhase** (declared-intent + empty states), **ActObjectiveMonitoringPanel**, **MonitoringStreamPanel**. Two are new test files; three extend existing suites (all pre-existing tests still pass). Shared mock helper `lucideStub.ts` (forwardRef `<svg aria-hidden>` factory, for happy-dom re-render stability); jest-axe@10 ships no TypeScript types → local ambient `jest-axe.d.ts` shim typed via axe-core's own `AxeResults` / `RunOptions` / `Spec`.

### One documented deferral (a real finding)
axe caught a genuine WCAG 1.3.1 issue on **HeaderProjectSelector's expanded popover**: the popover carries `role="listbox"` but also contains the footer "All projects →" navigation link, which is not an `option`/`group` child (axe `aria-required-children`, critical; offending node `a[tabindex]`). Rather than restructure a shipped popover + its CSS module blind (preview can't verify it cheaply here), the rule is deferred on that one assertion, documented in `A11Y_DEFERRALS.md`, and tracked as a background fix-task (render the footer link OUTSIDE the listbox element, then drop the deferral). This is the day-one "document knowingly-deferred violations" posture — an honest, tracked deferral, not a silent suppression.

## Amanah
Neutral — accessibility test tooling; no capital / sale / CSA / CSRA / salam / yield-share surface touched.

## Verified
Windows, `corepack pnpm` (pnpm not on PATH). Lint (`tsc --noEmit`) clean; bounded vitest `--pool=forks` (threads pool hangs at exit) **35/35 green across the 5 files**. The `ECONNREFUSED localhost:3000` stderr is the project store's builtin-samples fetch falling back to local ("using local fallback") — benign, fails no test. Committed via explicit pathspecs (never `git add -A`) on the isolated worktree branch; NOT pushed.

## Deferred / follow-ups
- **The HeaderProjectSelector listbox fix** — move the footer link out of `role="listbox"`, then drop the deferral. Flagged as a background task.
- **Item F4 — a full-page / E2E axe pass** that can run the layout / landmark / contrast rules excluded here. *(Update 2026-06-26: the audit's F4 line item was scoped + closed as an offline-demo happy-path **smoke** suite ([[2026-06-26-atlas-offline-demo-e2e-smoke]]) that runs **no** axe assertions — so this full-page/E2E axe pass remains a distinct, still-open follow-on, not delivered by F4.)*
- **Ratchet:** add surfaces + add rules to `A11Y_RULE_ALLOWLIST` as more of the v3 shell is hardened.

## Connections
- Closes F3 of the 2026-06-26 audit; sibling to [[2026-06-19-atlas-deep-audit-remediation]] (which fixed switcher a11y by hand).
- jsdom-only constraint rooted in [[project-screenshot-hang]].
- Touches [[olos]].
