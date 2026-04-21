---
title: "Opening Threshold: Orient, Don't Excuse"
date: 2026-04-21
type: decision
status: accepted
tags: [threshold, ceremony, islamic-ui, faith-salah]
---

# Opening Threshold: Orient, Don't Excuse

## Decision

The Opening Threshold ceremony is a **naming moment**, not a gate. It orients the user to what they are bringing into the work — it never offers an exit from the work.

Three rules follow:

1. **No Defer exits, anywhere.** No module — salah, or otherwise — surfaces a "Defer to Later" off-ramp on the Pause screen. The Pause screen is a reflection layer; it must route forward, not out.
2. **Readiness is a naming moment, not a binary gate.** Copy shifts from *"Am I ready?"* / *"I can…"* / *"I am still…"* to *"What am I bringing into this?"* / *"I am bringing…"* / *"I am carrying…"*. A "carrying" answer still triggers Pause (the reflection layer remains), but the framing is honest self-witness, not permission to skip.
3. **Finalize is bilingual and covenant-grounded.** The ceremony completes on a `Bismillah بِسْمِ اللَّهِ` (opening) or `Alhamdulillah الْحَمْدُ لِلَّهِ` (closing) button — English label on the left, Arabic on the right — and the previously-required Confirm checkbox step is removed.

## Rationale

The prior design contradicted the operating principle: *the work gets done regardless of how one feels; the threshold exists to orient, not to excuse*. A Defer button invited escape. A binary readiness gate invited dishonest "yes" answers to proceed and an excused "no" to skip. A Confirm checkbox added friction without adding covenant weight.

The reframe preserves the orientation value of the ceremony (you still name what you carry; Pause still surfaces the Maryam 19:59 warning and Ali 'Imran 3:133 "rise now" pair when you name something heavy) while closing the escape routes.

## Scope — this ADR

- Implemented for `faith-salah` as the canonical template.
- Structural changes in `ThresholdModal.jsx` apply universally (no Defer button renders for any module, no Confirm step exists).
- Copy reframe is faith-salah only; other pillars' readiness copy ripples in a follow-up pass using this shape.

## Affected Files

- `src/components/islamic/ThresholdModal.jsx` — removed defer state/screen/button, Confirm step, `confirmed` state, `returnToReadiness`. Finalize IIFE renders Bismillah/Alhamdulillah on Readiness all-yes, Pause, and Closing Dua steps. Pause branch gated on `data?.pauseWarning && data?.pauseRiseNow` rather than a `noDefer` flag.
- `src/data/islamic/islamic-data.js` — `faith-salah.readiness` reframed; `noDefer` removed; `pauseWarning` (Maryam 19:59) and `pauseRiseNow` (Ali 'Imran 3:133) retained.

## Deferred

- Reframe readiness copy for Life, Intellect, Family, Wealth, Environment, Ummah pillars and their sub-modules.
- Delete orphan `.thr-defer-*` CSS rules and `DEFER_CONTENT` / `DEFER_UNIVERSAL` constants.
- Remove `deferOpening` / `deferred` / `isDeferred` from `threshold-store.js` after auditing callers.

## Commits

- `8cc1e4a` — feat(threshold): orient, don't excuse — drop Defer + Confirm, add Bismillah finalize
