---
title: "OLOS covenant banned-terms unified into one shared two-tier set (deep-audit Amanah cluster)"
type: decision
date: 2026-07-05
status: accepted
tags: [olos, atlas, amanah, covenant, banned-terms, csra, salam, riba, single-source-of-truth, audit, deep-audit-2026-07-03]
superseded_by: null
---

# OLOS covenant banned-terms unified into one shared two-tier set

**Status:** Accepted + implemented (2026-07-05). Closes the four Amanah-class findings (section 2) of the 2026-07-03 OLOS deep audit (`scripts/audit-out/ATLAS_DEEP_AUDIT_2026-07-03.md`) — the last open items after the six HIGH clusters H1–H6 (`79a5635a`, `a67cc52a`, `cf1ded90`, `83be0e69`, `0c5960ef`, `bf82fa71`). One commit on the isolated worktree branch `claude/practical-chaum-e4a6c0` (`a5429228`), **NOT pushed** (steward authorizes pushes).

> [!note] Operator-locked framing (AskUserQuestion)
> Three covenant rulings fixed the term model before any code was written: **presale → hard-ban** (literal *bayʿ mā laysa ʿindak* — the sale of what one does not yet possess); **subscription → conditional** (dual-use — licit for an ordinary recurring service, illicit as advance-purchase of unpossessed yield); **add the riba / equity family** to hard-ban (usury, interest-bearing, equity-stake, return-on-investment / ROI) while **deliberately excluding** bare *shares / interest / dividend / equity* (false-positive risk). New banned-term wording was operator-confirmed before merge.

## Problem

The covenant lint — the guard that keeps CSRA / salam / advance-sale framing out of authored copy (CSRA erased 2026-05-04 on fiqh grounds, *bayʿ mā laysa ʿindak*) — existed in **three divergent, individually-incomplete regex copies**, none catching the full term set, plus a fourth documented-but-absent gate (A4):

- `realityCheckModel.ts` `CSA_LIKE` — missing **salam**, **advance-purchase** (and `captureSampleSeed.ts` inherited the gap through `detectCsaLikeText`).
- `seededRecipes.conformance.test.ts` `FORBIDDEN` — missing bare **CSA**, subscription, presale, yield-share.
- `catalogues.test.ts` banned regex — missing **advance-purchase, riba, investor**.
- **A4:** `authoredSampleSeed.ts` claimed the promoted sample would be "visible to the Amanah lint," but **no static scan ever read `AUTHORED_SAMPLE_SEED`** — the promised lint did not exist.

## Decision

Replace the divergent copies with **one shared, two-tier source of truth** and route every audit-named scan through it.

### The shared module — `packages/shared/src/constants/covenant/bannedTerms.ts` (new)

- **`COVENANT_HARD_BAN`** — terms with **no licit use**, forbidden even inside a disclaimer: community-supported, CSRA, salam, riba, usury, interest-bearing, investor, equity-stake, return-on-investment, ROI, advance-sale, advance-purchase, presale, *bayʿ mā laysa*.
- **`COVENANT_CONDITIONAL`** — **dual-use** terms, licit only inside forbidding copy or a Scholar-Council-gated membership benefit: CSA, subscription, yield-share.
- `COVENANT_BANNED_ALL` = hard-ban ∪ conditional (spreads the same object refs). `matchCovenantBannedTerms(text, terms?)` → array of labels; `detectCovenantBanned(text, terms?)` → boolean. Both null-safe and stateless (no `/g` flag, so `.test()` never carries `lastIndex`); the optional `terms` param scopes a scan to a single tier. Exported from `@ogden/shared`. Built test-first (46 tests, red→green), including false-positive guards for "he shares the boundary", "points of interest", "a fair dividend", "equity and dignity".

### Consumers re-wired to the shared set

- **`realityCheckModel.ts`:** `detectCsaLikeText` now delegates to `detectCovenantBanned` (full union) — closes the salam / advance-purchase gap; the `captureSampleSeed` capture gate inherits the widening for free.
- **`seededRecipes.conformance.test.ts`:** two-tier scan matching the recipe seam — `recipeText()` (title / why / pitfall **incl. scopeNotes**) vs `COVENANT_HARD_BAN`; `recipeStepText()` (active step language only) vs `COVENANT_CONDITIONAL`.
- **`catalogues.test.ts`:** all six Amanah scans route through `detectCovenantBanned`; removed three dead orphaned regex copies plus one live salam-less copy (`BANNED.test`). The s4 / s5 active-copy scans keep scopeNotes deliberately excluded (a forbidding scopeNote legitimately documents the prohibition).
- **A4 — `authoredSampleSeed.amanah.test.ts` (new):** the standing scan the handoff doc had promised. It walks every string leaf of `AUTHORED_SAMPLE_SEED` (currently `null` / dormant) against the shared union; a second non-vacuity test plants a dirty snapshot and asserts the walker + detector catch it. The file doc + capture gate were corrected to match, and the `seedAuthoredSample` gate test now covers salam / advance-purchase / yield-share framings.

## The two-tier seam (load-bearing)

The split maps onto **where a term legitimately appears**, not just which terms exist. Hard-ban terms are forbidden **everywhere**, even in a disclaimer. Conditional terms are forbidden in **active / authored copy** but permitted inside a **forbidding scopeNote** — e.g. a membership-benefit note that names "CSA / advance sale" precisely in order to prohibit them. So the scan *surface* carries covenant meaning as much as the term list does: recipe `recipeText` (incl. scopeNotes) → hard-ban only; `recipeStepText` (active) → conditional; positive authored catalogues / reality-check copy → the full union. Widening a scan therefore requires knowing whether its corpus includes forbidding copy — which is why the remaining copies (below) are not a mechanical swap.

## Deferred — the wider divergence (flagged, operator-gated)

A pre-commit completeness grep proved the audit undercounted the copies. **11 more inline copies** of the same capital-term regex live in files the audit never named: `resolveProjectObjectives.test.ts`, `coherenceCheckModel.test.ts`, `actMandateModel.test.ts`, and seven `v3/act/tier-shell` declaration / reception / roster tests. They were **left untouched**: several scan `scopeNotes` / forbidding copy, so blindly widening them to the full union risks false-positives (e.g. `\bsalam\b` matching an "as-salam" greeting), making it a **per-corpus covenant decision, not a sweep**. Surfaced as a background task for operator direction. Consequence: this ADR's single-source-of-truth is real for the audit-named surface but **not yet universal**.

## Verification

- `bannedTerms.test.ts` 46/46 (TDD). Full `packages/shared` suite **1671/1671**; `catalogues` **139/139** — the total is unchanged, so the `catalogues` widening surfaced no new hit, confirming the s1 enterprise-mix / household / silvopasture scopeNotes are clean under the broader set. `packages/shared` `tsc` exit 0.
- apps/web Amanah suites (`realityCheckModel` + gate, `seedAuthoredSample` round-trip + gates, `authoredSampleSeed.amanah`) **44/44**; apps/web `tsc` exit 0. (The `ECONNREFUSED` builtin-samples stderr is the benign happy-dom fetch → local-fallback.)
- Race-checked before commit (the worktree branch is concurrently raced by parallel sessions): `git fetch`, HEAD unmoved at `bf82fa71`, no `origin/claude/practical-chaum-e4a6c0`, no `MERGE_HEAD`. Committed `a5429228` (10 files, +484 / −67) via explicit pathspecs. **NOT pushed.**

Builds on [[amanah-gate]] / [[amanah-gate-protocol]] and the 2026-05-04 CSRA erasure. Sibling to [[2026-06-19-atlas-deep-audit-remediation]] (the prior OLOS deep audit).
