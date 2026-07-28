---
title: "Orientation Card Face Leads With the Domain; One Layout at Every Width"
type: decision
date: 2026-07-28
status: accepted
tags: [milos, ui, orientation, carousel, container-query, values-layer, responsive]
superseded_by: null
---

# Orientation Card Face Leads With the Domain; One Layout at Every Width

## Context

Two separate complaints against `/app/orientation`, both traceable to the same root.

1. **The card face was built entirely from task data.** A card showed a breadcrumb (`NECESSITIES › HAJJ`), the current *task* title, an Urgent/High pill, then a `NOW` block holding the current *subtask* title. Nothing on the face said what the domain **is**. Seven cards read as seven unrelated task titles — a task list, not a map of life domains. The operator scanning them had to already know what "Faith" or "Environment" covers.
2. **The face and the sheet said the same thing twice.** The subtask on the face was exactly what tapping the card opened to. The *task* — the unit that actually has a beginning and an end — was buried above a priority pill.

Separately, the page ran **two layouts** gated on `useMobile()`: the scroll-snap carousel below 768px, and `OrientationSpread` (stage + 7-row side rail) above it, delivered one session earlier by [[2026-07-26-milos-centered-popups-node-drill-in]]. Two components, two mental models, ~130 lines of rail CSS, and a header sentence that had to branch to stay true.

Approved plan: `.claude/plans/quiet-swimming-walrus.md`. **Amanah gate:** neutral–positive — presentational and navigational only; it surfaces existing domain copy earlier, authors no fiqh, alters no revelation text, and touches no capital / CSRA / salam / yield-share surface.

## Decision

**Pillar copy moves into the data layer** ([src/data/maqasid.js](src/data/maqasid.js)). All eight pillars gain `description`; the three whose Islamic copy names something layer-specific (faith, wealth, environment — plus `moontrance` for shape uniformity) gain `universalDescription`. A new `getPillarDescription(pillar, valuesLayer)` sits beside `getPillarLabel` / `getPillarStewardship` and **falls through** to the Islamic string when no universal variant exists, rather than duplicating a neutral sentence that would silently drift. Copy was lifted verbatim from Landing's `PILLAR_FEATURES`, which was rewired to read it back with `'islamic'` pinned (the public page has no settings store).

**The face answers "what is this domain" before "what is open in it"** ([OrientationCard.jsx](src/components/orientation/OrientationCard.jsx)). The description renders **outside** the three-way `hasEligible`/`seeded` branch — it is the one line that must survive "Nothing left for today" and "No steps yet" too — and is exposed to assistive tech via `aria-describedby`. Under `NOW` the face now shows `task.title`, not `subtask.title`. The crumb and the priority pill are dropped from the face; both are per-step detail and both still render in the sheet. `subtask` stays on the card object — the sheet's `hasStep` gate and all three container handlers are load-bearing on it.

**One layout at every width.** `OrientationSpread.jsx` is deleted along with its `.orient-spread*` / `.orient-rail*` CSS and the `useMobile()` gate; `Orientation.jsx` mounts `OrientationCarousel` unconditionally. The dot row is now the **only** jump nav, so it became a labelled `role="group"` with the recommended marker folded into each button's `aria-label`. `focusPillarId` survives — the container still writes it to re-front whatever is weakest after a task completes.

**The responsive block is a container query, not a media query.** `.orient-page` sets `container-type: inline-size; container-name: orient` and carries a 620px column cap; one `@container orient (min-width: 480px)` block re-shows the native scrollbar and bumps type.

## Rationale

The description is **static and values-layer aware, never board-derived**, which is exactly why it belongs outside the eligibility branch and in the data layer rather than inline in the component. Putting it in `maqasid.js` also meant the landing page and the card could not drift apart — one string, one owner.

Showing the task rather than the subtask removes a genuine duplication: the sheet opens *to* the subtask, so the face repeating it spent the most valuable line on the card saying what the next tap would say anyway.

On the layout, the decisive evidence was measured, not argued. The first cut used `@media (min-width: 768px)`. `min-width` measures the **viewport**, but the real constraint is the app-shell content column: sidebar (248px) + Islamic panel (280px) take ~470px, so an 800px *viewport* can leave the page a ~285px *column* — narrower than a 390px phone. Measured there, that rule truncated **all seven descriptions and six of seven task titles** — strictly worse than the phone it was meant to improve on. The container query measures the content box instead, so a 390px phone (~358px) stays on the small scale and a capped column (~588px) gets the large one.

Card width stays a **percentage of a percentage** for the same class of reason: `.orient-carousel` has `padding-inline: 11%`, so its content box is 0.78× the column, and `.orient-card { flex: 0 0 78% }` resolves against *that* — ~60.8% of the column at every width, which cannot overflow. A px `flex-basis` does overflow at the narrow end.

## Alternatives Considered

- **Keep the desktop stage + side rail** — rejected. It was a second component and a second mental model for a page whose whole point is "seven domains, one swipe apart," and the carousel already worked at every width by construction (its `centerEl`/`nearestIndex` math is bounding-rect arithmetic with no width assumptions).
- **A media query with a px card width** — rejected on the measurement above; both halves of that pairing failed at a narrowed content column.
- **Fold in `PILLAR_DESCRIPTIONS` from `onboarding/PillarFirstEntry.jsx`** — rejected. That is a deliberately longer, first-run explainer voice ("This higher objective…"). Folding them together would force one of the two voices to lose.
- **Keep the crumb and priority pill on the face alongside the description** — rejected; the card would carry five competing lines and the description would stop being the thing you read first. Both survive in the sheet.
- **Give every pillar a `universalDescription`** — rejected; four are already layer-neutral, and duplicating a neutral sentence into a second field invites the two copies to drift.

## Consequences

- **`.orient-card` must use `min-height`, not `height`.** The track is a flex line, so all seven cards stretch to the tallest — that is what keeps them flush while the description's line count varies by pillar. Restoring a fixed height re-clips the longest description (faith, 138 chars).
- **The carousel's top padding (`var(--space-3)`) is load-bearing.** The `__flag` badge sits at `top:-9px` (+1px border) and the track's `overflow-x:auto` forces computed `overflow-y:auto`, so anything above the scrollport is clipped. Shrinking that padding below ~10px re-clips "Weakest — recommended".
- **Do not "simplify" the container query back to a media query.** The gotcha is recorded in [CONTEXT.md](src/components/orientation/CONTEXT.md) with the measurement, because the media-query version looks more familiar and is wrong in the one case that matters.
- **`getPillarDescription` became single-consumer the same day.** Main's `123fac5 feat(landing): remove the Seven Maqasid pillars section` (PR #34) deleted Landing's entire tab section — `PILLAR_FEATURES`, `PillarMockup`, `activeFeatures` — hours after this change rewired it. `OrientationCard` is now the field's only reader. The landing hero wheel still iterates `MAQASID_CORE_PILLARS` but reads `stewardshipLabel`, **not** `description`, so nothing there should be re-wired to it. Both CONTEXT.md files were corrected in the merge that took the deletion.
- The `'islamic'` pin that justified the fall-through helper no longer has a caller. The helper's layer-awareness is now exercised only by the card, which passes the real `valuesLayer` from settings.
- `useMobile` loses a consumer but the hook stays — other modules use it.

## Verified

`npm run lint:eslint` 0 errors (1 pre-existing warning, `IslamicPanel.jsx:32`); `npm test` **215/215 across 11 files**; `npm run build` ✓; `npm run lint` composite gate green — `[STRICT] Pass`, inline-refs `0 ≤ ratchet 0` across 2052 subtasks, 41 pillar glyphs up to date. No seed `sources[]` or `description` prose was touched, so the grounding ratchets could not move.

Dev server confirmed the helper is reactive and correctly pinned: the landing page rendered faith's sentence and swapped to environment's khalifah sentence on tab change — i.e. it returned the **Islamic** variant, not the universal one, as the explicit `'islamic'` argument required. (That surface has since been deleted upstream; the evidence stands as verification of the helper, not of a live page.)

> [!warning] No visual confirmation
> **No screenshot exists for this change.** The Browser pane has failed to composite frames for six consecutive sessions ("the Browser pane is not displayed, so the page is not compositing frames"). React did eventually mount after a ~28s cold start with zero console errors and no failed modules, and verification is DOM-text and build-gate level only. The rendered card face at the three intended widths — mobile, a narrowed content column, and a capped 620px column — has **not** been seen. See [[project-screenshot-hang]].

## Connections

- [[2026-07-25-milos-orientation-carousel-redesign]] — **partially supersedes** its card-face composition (the crumb, priority pill and subtask line it specified are retired; its engine, tier gate, continuity model and 3 actions all stand)
- [[2026-07-26-milos-centered-popups-node-drill-in]] — **supersedes** its desktop stage + side rail, which this retires outright; its centered-popup and shared-step-internals work is untouched
- [[milos]] — parent entity, `/app/orientation` route
- [[maqasid-al-shariah]] — the seven domains the descriptions describe
- [[amanah-gate]] — assessed neutral–positive: presentational, authors no fiqh, alters no revelation text
- [[project-screenshot-hang]] — the environment limitation that blocked visual verification again
