# zoneThresholds disclosure tightening backlog (2026-05-12)

Two non-blocking polish items surfaced during the smoke-test of the
Plan-stage zoneThresholds cascade (see
`notes/scratch/2026-05-12-zonethresholds-smoke-test.md`). The disclosure
ships as-is; these are quality-of-life follow-ups.

## 1. Reset click → optical lag (~1 React tick)

**Repro:** Open FertilityColocationCard Tune-zones disclosure. Type
`80`/`60` into Zone-1/Zone-2. Click "Reset to defaults".

**Observed:** Store clears immediately (`zoneThresholds` becomes
`undefined`), but the controlled inputs continue to show `80`/`60` and
the summary continues to read `· custom` for ~one render cycle before
catching up. A user could read this as "Reset did nothing" and click
again.

**Suggested fix:** in `FertilityColocationCard.tsx` Reset handler, wrap
the store-clear in `flushSync` (already-imported in `react-dom`?), OR
key the draft inputs by `JSON.stringify(zoneThresholds)` so they
re-mount on Reset, OR explicitly set the local input draft state back
to default values in the same handler that clears the store.

**File:** `apps/web/src/v3/plan/cards/soil-fertility/FertilityColocationCard.tsx` (Reset handler near line 450).

## 2. Soil module default sub-card is "Soil fertility designer", not "Fertility colocation"

**Repro:** From Plan canvas, click the Soil tile in `PlanModuleBar`.
Slide-up opens to the Soil Fertility & Closed-Loop module. The default
visible card is the **designer** (Coverage / Add fertility / Logged
units). To reach the **colocation readout** with the Tune-zones
disclosure, the user has to click "Fertility colocation" in the
`PlanChecklistAside` right-rail — and that click closes the slide-up
(per `handleSelectModule`'s `setSlideUpOpen(false)`). They then re-open
via Soil tile, which brings them back to the designer.

**Effective flow today:** Soil tile → designer (default) → user clicks
Fertility colocation in checklist → slide-up closes + URL updates →
user clicks Soil tile again → slide-up reopens, now showing… the
designer again? (Verify whether the URL change persists the sub-card
selection.)

**Suggested fix:** either (a) make Soil tile remember the last
sub-card the user looked at, or (b) make `handleSelectModule` keep the
slide-up open when navigating between sub-cards of the same module, or
(c) hoist the Fertility colocation card as the default for the Soil
module since the designer is the placement surface (where you go to
*do work*) and the colocation card is the readout (where you go to
*read the result*) — readouts are arguably better defaults.

**Files involved:** `apps/web/src/v3/plan/PlanLayout.tsx`
(`handleSelectModule`), `apps/web/src/v3/plan/PlanChecklistAside.tsx`,
`apps/web/src/v3/plan/PlanModuleSlideUp.tsx` (default sub-card per
module).

---

**Triage:** both are polish, not correctness. Defer until a session is
explicitly about Plan-stage navigation UX.
