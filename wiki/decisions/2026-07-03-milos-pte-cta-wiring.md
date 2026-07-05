---
title: "MILOS — Path-to-Excellence CTAs wired to sub-pillar boards across all 8 pillar modules"
type: decision
date: 2026-07-03
status: accepted
tags: [ui, navigation, routing, path-to-excellence, pillars, react-router]
superseded_by: null
---

# MILOS — Path-to-Excellence CTAs wired to sub-pillar boards across all 8 pillar modules

## Context

Every pillar overview page renders a **"Path to Excellence: Closing the Gap"** card with
three CTAs — `foundation` / `obligation` / `aspiration` — one per maqasid excellence tier.
The card component (`*PathToExcellenceCards.jsx`) is passed into the shared
[LevelOverviewPage](src/pages/shared/LevelOverviewPage.jsx) as the `ExcellenceCardsComponent`
prop and rendered **prop-less** (`<ExcellenceCardsComponent />`).

In the immediately-preceding work the **Faith** module's overview was decluttered — the
Maqasid Comparison Wheel was removed from [FaithLevelOverview.jsx](src/pages/faith/FaithLevelOverview.jsx)
(the `showComparisonWheel` / `ComparisonWheelComponent` / `wheelCenterLabel` props promoted in
[[2026-04-21-faith-dashboard-wheel-promotion]] are gone; only `ExcellenceCardsComponent` remains)
— and Faith's three CTAs were wired to navigate to its sub-pillar kanban boards. That made
Faith the working template.

**The same three CTAs on the other seven modules were still inert stubs** — the buttons
rendered as `<button type="button" className="pte-cta">{cta}</button>` with no `onClick`, so
they looked actionable but did nothing. The user asked to wire them up, noting **"each needs
its own destinations."**

Three Explore agents established the change is a clean mechanical repeat of the Faith fix: all
seven siblings (`Health/Family/Intellect/Wealth/Environment/Ummah/Moontrance`) are
self-contained, hardcode a 3-entry `CARDS` array, and use the identical
`pte-card` / `pte-grid` / `pte-item` / `pte-cta` className scheme as Faith. Every destination
sub-pillar route was cross-checked as registered in the router before wiring.

**Amanah gate:** navigation-only, pointing at existing per-pillar task boards. No riba/gharar
surface; Wealth/Ummah/Moontrance copy is already halal-framed (zakah, waqf, MTC) and routing a
nav button to a task board touches **no** capital / CSA / CSRA / salam / advance-purchase /
yield-share surface — neutral.

## Decision

Apply the Faith self-contained navigation pattern to all seven sibling components. Per file, a
~6-line diff:

1. `import { useNavigate } from 'react-router-dom';` (the codebase's confirmed specifier —
   Sidebar, Landing, LevelOverviewPage all use it).
2. Add a `route:` **string literal** to each of the three `CARDS` entries (hardcoded exactly as
   Faith does — **not** imported from the `*LevelNavigator-constants.js`; hardcoding also
   sidesteps the pre-existing `Moontrace`-vs-`Moontrance` typo in moontrance's constants file).
3. `const navigate = useNavigate();` in the component body.
4. Destructure `route` in `.map(...)` and give the button
   `onClick={() => navigate(route, { viewTransition: true })}` — the exact pattern Faith and the
   pillar grid cards already use.

No CTA-label copy changes, no CSS, no shared-component / router / constants edits.

**Full destination map (8 modules × 3 cards → registered sub-pillar boards):**

| Module | Card → CTA | Destination |
|---|---|---|
| **Faith** *(template)* | Foundation "Shahada & Salah" → *Schedule & Track* | `/app/faith-salah` |
| | Obligation "Zakah & Sawm" → *Plan Giving* | `/app/faith-zakah` |
| | Aspiration "Hajj" → *Plan Hajj* | `/app/faith-hajj` |
| **Health** | Foundation "Physical & Mental Baseline" → *Schedule & Track* | `/app/health-physical` |
| | Obligation "Safety & Responsibility" → *Plan Safeguards* | `/app/health-safety` |
| | Aspiration "Social Character Excellence" → *Grow Character* | `/app/health-social` |
| **Family** | Foundation "Marriage & Parenting" → *Nurture Bonds* | `/app/family-marriage` |
| | Obligation "Kinship Ties" → *Reach Out* | `/app/family-kinship` |
| | Aspiration "Household of Barakah" → *Build Legacy* | `/app/family-home` |
| **Intellect** | Foundation "Learning & Literacy" → *Build Habit* | `/app/intellect-learning` |
| | Obligation "Thinking & Cognition" → *Sharpen Mind* | `/app/intellect-thinking` |
| | Aspiration "Skill Mastery" → *Master Craft* | `/app/intellect-professional` |
| **Wealth** | Foundation "Halal Earning" → *Audit Income* | `/app/wealth-earning` |
| | Obligation "Zakah & Rights" → *Give Rights* | `/app/wealth-ownership` |
| | Aspiration "Circulation & Sadaqah Jariyah" → *Plan Waqf* | `/app/wealth-circulation` |
| **Environment** | Foundation "Resource Stewardship" → *Reduce Waste* | `/app/env-resource` ✅ *(confirmed 2026-07-04)* |
| | Obligation "Ethical Sourcing" → *Audit Sources* | `/app/env-sourcing` |
| | Aspiration "Ecosystem Khalifa" → *Plant & Protect* | `/app/env-ecosystem` |
| **Ummah** | Foundation "Collective Stewardship" → *Join & Serve* | `/app/collective` |
| | Obligation "Rights of Neighbors" → *Reach Out* | `/app/neighbors` |
| | Aspiration "Community Building" → *Contribute* | `/app/community` |
| **Moontrance** | Foundation "Land Stewardship" → *Tend & Plant* | `/app/moontrance-land` |
| | Obligation "Seasonal Rhythm" → *Walk the Season* | `/app/moontrance-seasonal` |
| | Aspiration "Residency & Waqf" → *Root Deeply* | `/app/moontrance-residency` |

## Rationale

- **Self-contained `useNavigate` per component, not prop threading** — `LevelOverviewPage`
  renders `ExcellenceCardsComponent` prop-less, so a nav callback cannot be threaded in from the
  page without changing the shared component's contract for all 8 pillars. Each card component
  owning its own `useNavigate` keeps the change isolated to the leaf files. This is exactly what
  the Faith template already does.
- **Hardcoded route literals over importing the `*LevelNavigator-constants.js`** — mirrors Faith,
  keeps each diff to ~6 lines with no new import coupling, and sidesteps the pre-existing
  `Moontrace` (missing "n") typo baked into moontrance's constants file. The literal is the same
  string the router registers, verified per destination.
- **`{ viewTransition: true }`** — matches the pillar grid cards and the Faith template, giving
  the same cross-fade route transition the rest of the app uses.
- **No CTA-label rewrite** — the evocative labels ("Reduce Waste", "Plan Waqf", "Root Deeply")
  are the product voice; the task was to make them *work*, not restyle them.

## Alternatives Considered

- **Thread an `onNavigate`/route prop through `LevelOverviewPage`** — would touch the shared page
  and all 8 pillars' overview files, and require a per-pillar route table on the page side;
  heavier and against the established self-contained pattern. Rejected.
- **Import routes from each `*LevelNavigator-constants.js`** — couples the card to the constants
  module and trips the `Moontrace` typo; no benefit over a literal that the router already pins.
  Rejected.
- **Build bespoke destination flows now** (Zakah calculator, Hajj/Waqf planner, prayer scheduler)
  — out of scope; the ask was to make the inert CTAs navigate to the existing boards. Deferred.

## Consequences

- **All 8 pillar modules' Path-to-Excellence CTAs now navigate consistently** to their
  sub-pillar boards; the "inert stub" gap is closed. Faith is the template and is now
  behaviourally identical to its siblings.
- ✅ **Environment / Foundation — resolved 2026-07-04: `env-resource` confirmed, not flipped.**
  Originally flagged as a judgment call (title "Resource Stewardship" → `env-resource` vs CTA verb
  "Reduce Waste" → `env-waste`, both registered routes). Reading the two boards' own definitions in
  [modules.js](src/data/modules.js) settled it decisively for `env-resource`: it is
  *"Resource Consumption (Water & Energy) — Anti-Extravagance, Efficiency, Renewable Independence"*,
  whereas `env-waste` is *"Waste & Pollution Management — Harm Reduction, Conscious Consumption,
  Zero-Waste"*. The card matches `env-resource` on **three axes** — title ("Resource Stewardship" ≈
  "Resource Consumption"), body ("water… energy… **Conservation**" = "(Water & Energy) —
  Anti-Extravagance, Efficiency"), and the *"even by a flowing river"* hadith (the classic *israf* /
  anti-extravagance proof — conservation of a resource, not refuse disposal). `env-waste` matched on
  **one** axis only: the surface word "Waste" in the CTA — a false friend, because "Do not **waste**
  water…" uses *waste* as the **verb** *squander* (israf → conservation → `env-resource`), not the
  **noun** *refuse/pollution* (→ `env-waste`, which is garbage / zero-waste / pollution management).
  No code change — the shipped route literal on [EnvironmentPathToExcellenceCards.jsx](src/components/environment/EnvironmentPathToExcellenceCards.jsx) is already correct.
- **Route-shape variety handled:** traditional `-core`-family boards (`/app/health-physical`
  etc.), Environment's `/app/env-*` prefix (not `environment-*`), Ummah's **top-level** routes
  (`/app/collective`, `/app/neighbors`, `/app/community` — not `/app/ummah-*`), and Moontrance's
  `/app/moontrance-*`. All 24 destinations are proven-registered routes.
- **Two boards intentionally left unlinked** — where a card title names two sub-domains (Health
  "Physical & **Mental**", Wealth's `financial` sub-pillar), the CTA points at the lead sub-pillar
  and the secondary is folded. `health-mental` and `wealth-financial` boards remain reachable by
  other nav but are not a PTE CTA target. Repointable on request.
- **Ummah / Moontrance are not moot** — both wrap `LevelOverviewPage` *and* append extra
  dashboard sections, but still render their PTE cards, so wiring them was real work, not dead
  code.
- **Verification (this session):** `npm run lint` 0 errors (grounding-strict + inline-refs
  ratchets both 0); `npm test` 77/77; `npm run build` green (only the pre-existing `auth-store`
  `INEFFECTIVE_DYNAMIC_IMPORT` warning). Static grep confirmed each of the 7 files now carries
  `useNavigate`, 3 `route:` literals, and the button `onClick`. Live preview click-through of the
  `foundation` CTA on **all 7** modules (covering all three route shapes) asserted the mapped
  route after the `viewTransition` URL-update settle: Health→`/app/health-physical`,
  Family→`/app/family-marriage`, Intellect→`/app/intellect-learning`,
  Wealth→`/app/wealth-earning`, Environment→`/app/env-resource`, Ummah→`/app/collective`,
  Moontrance→`/app/moontrance-land`; the 14 remaining obligation/aspiration CTAs confirmed to
  render in order with correct labels and grep-verified route literals. Reaching `/app/*` in the
  throwaway preview browser required seeding the app's `bbiz_`-prefixed localStorage
  (`user` + niyyah-skip + `thr_open` ceremony bypass) — touches no repo files and no real user
  data (disclosed). `preview_screenshot` hit the known 30s renderer hang on the heavy pillar
  pages ([[project-screenshot-hang]]-class) — disclosed; verification stands on DOM/a11y
  `preview_eval` polling.
- **Delivery:** **merged to `main` via PR [#20](https://github.com/onaxyzogden/Maqasid/pull/20)**
  (merge commit `4c289de`, 2026-07-04) — the 7 sibling files plus the two Faith template files
  ([PathToExcellenceCards.jsx](src/components/faith/PathToExcellenceCards.jsx) wiring +
  [FaithLevelOverview.jsx](src/pages/faith/FaithLevelOverview.jsx) wheel-declutter), which had
  never been committed or wiki-documented before this ADR, shipped together in that PR. This ADR
  (with the 2026-07-04 `env-resource` resolution above) is the wiki record, landing on `main`
  via the wiki-only PR [#22](https://github.com/onaxyzogden/Maqasid/pull/22).

## Connections

- [[milos]] — the affected product
- [[2026-04-21-faith-dashboard-wheel-promotion]] — promoted the Comparison Wheel + Path-to-Excellence
  onto the Faith overview; this session **removes** the wheel from the Faith overview (declutter)
  while keeping and wiring the PTE cards, then propagates the wired PTE pattern to the other 7 pillars
- [[project-screenshot-hang]] — the recurring 30s `preview_screenshot` timeout disclosed during verification
