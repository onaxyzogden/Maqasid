# zoneThresholds disclosure tightening backlog (2026-05-12)

Two non-blocking polish items surfaced during the smoke-test of the
Plan-stage zoneThresholds cascade (see
`notes/scratch/2026-05-12-zonethresholds-smoke-test.md`). The disclosure
ships as-is; these are quality-of-life follow-ups.

## 1. ~~Reset click → optical lag (~1 React tick)~~ — RETRACTED 2026-05-12

**Original observation:** synchronous DOM read after `preview_click` on
Reset showed stale 80/60 inputs and `· custom` summary for ~one tick
before catching up.

**Re-investigation:** the Reset handler in
`FertilityColocationCard.tsx` (lines 195–199) already does the right
thing — it clears the store *and* resets both local draft states in
the same synchronous handler:

```ts
function handleResetThresholds(): void {
  clearZoneThresholds(project.id);
  setCloseDraft(String(DEFAULT_ZONE_THRESHOLDS.closeM));
  setMediumDraft(String(DEFAULT_ZONE_THRESHOLDS.mediumM));
}
```

The "lag" observed in the smoke-test was a measurement artifact of
reading the DOM *synchronously after* `preview_click` fires —
before React commits the state updates. A real user clicking sees the
commit cycle, not the immediate post-click DOM. **No fix needed.**

## 2. ~~Soil module default sub-card is "Soil fertility designer", not "Fertility colocation"~~ — RESOLVED 2026-05-12

**Resolution:** Option C (reorder). Moved
`{ label: 'Fertility colocation', sectionId: 'plan-fertility-colocation' }`
to index 0 of `MODULE_CARDS['soil-fertility']` in
`apps/web/src/v3/plan/types.ts`. The shared `ModuleSlideUp`'s
`cards[0]` default now lands the Soil tile on the readout that hosts
the Tune-zones disclosure — closing the discoverability loop for the
6-card zoneThresholds family. Tab strip visible order changed from
designer-first to colocation-first; designer remains one click away.

Rejected alternatives:
- (a) per-module last-viewed memory in the shared ModuleSlideUp —
  touches a 3-stage shared component for a small UX nudge.
- (b) rewrite `handleSelectModule` to keep slide-up open on same-module
  navigation — doesn't change the cold-open default.

Verified: `npx tsc --noEmit` on `apps/web` → exit 0.

---

### Original observation (preserved for context)

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

**Triage:** Item 1 retracted (measurement artifact). Item 2 resolved
2026-05-12 via option C (single-line reorder). Backlog closed.
