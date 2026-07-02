---
title: "Mode 4 Design — Tiers 3 & 4 (Strategic Decisions + System Design)"
type: decision
date: 2026-06-17
status: accepted
tags: [atlas, olos, plan, catalogue, mode4, monitoring, design]
superseded_by: null
---

# Mode 4 Design — Tiers 3 & 4 (Strategic Decisions + System Design)

## Context

After [[2026-06-17-atlas-threshold1-reality-check]] (Threshold 1), the steward has an approved Planning Direction Statement and Mode-4 Design unlocks. The two new Mode-4 strata — **Tier 3 / Stratum 4** (`s4-foundation-decisions`, renamed "Strategic Decisions") and **Tier 4 / Stratum 5** (`s5-system-design`) — already existed in the catalogue but predated the Mode-4 restructure. The restructure adds, per objective:

- A **monitoring protocol** (`monitoringProtocol`): Key Indicators, Response Triggers, and a single Feeds stream label naming where the design input flows in the Observe stage.
- A **Planning Direction mandate** (`planningDirectionMandate`): an amber line saying how this objective carries the approved direction (and, in one case, closes a Tier-3 conditional raised at Threshold 1).
- A **"Builds on"** lineage (`buildsOnDisplay`): the Tier-4 → Tier-3 dependency displayed in the objective detail.

The restructure also retires the now-redundant objective `s4-direction` (old "3.1 — Confirm direction & feasibility"), which Threshold 1 now handles. And it adds a new residential `RES>U-S5.1` patch for the distinct domestic access route.

Reference config: Regenerative Farm (primary) + Residential/Live-In (secondary) + Silvopasture/Livestock (secondary).

## Decision

**Four-stage implementation (all on `main`, NOT pushed as of 2026-06-17):**

### Stage 1 — Schema + authoring + rename + s4-direction retire (`d708d953`)
- Added two display-only optional schema fields to `PlanStratumObjectiveSchema`: `monitoringProtocol` (object with `indicators:string[].min(1)`, `triggers:string[].min(1)`, `feeds:string`) and `planningDirectionMandate:string`.
- Added both to `ObjectiveInput` + conditional spreads in `obj()` in `authoring.ts`.
- Renamed stratum `s4-foundation-decisions` display title to **"Strategic Decisions"** in `stratumObjectives.ts`.
- Added `excludedFromResolution: true` to `s4-direction` in `universal.ts` (keeps the object + all map keys / feeds chips / Act tools valid; the resolver skips it via the established `excludedFromResolution` mechanism).
- Rewired `STRATUM_PREREQS['s5-system-design']` to `['s4-water-strategy', 's4-zones']` (dropping `s4-direction`).

### Stage 2 — Tier-3 (s4) monitoring sweep, all project types (`33500994`)
- Authored `monitoringProtocol` + `buildsOnDisplay` (+ `planningDirectionMandate` where the spec provides one) on every resolving `s4-foundation-decisions` objective across all 14 catalogue files (~70 objectives).
- The spec's 7 reference-config objectives use verbatim copy; all others are faithfully derived from each objective's own `focusedQuestion` / checklist / `actHandoff`.
- `silv-sec-s4-stock-infrastructure` carries a `planningDirectionMandate` that **raises** the Silvopasture water conditional (Option B, display-only).
- Extended the `catalogues.test.ts` Amanah banned-term scanner to cover `monitoringProtocol.{indicators,triggers,feeds}` + `planningDirectionMandate`.

### Stage 3 — Tier-4 (s5) monitoring sweep + residential access patch + conditional close (`f6e76fd6`)
- Authored `monitoringProtocol` + `buildsOnDisplay` on every resolving `s5-system-design` objective across all 14 catalogues (~61 objectives, same authoring principles as Stage 2).
- `s5-water-infrastructure` carries a `planningDirectionMandate` that **closes** the Silvopasture water conditional (Option B, display-only).
- New `RES>U-S5.1` patch on `s5-access`: a distinct domestic access route for live-in residential users, separate from farm operational traffic. Residential applied-patch count 10 → 11; canonical triad 22 → 23.
- New `catalogues.test.ts` "Mode-4 design fields (s5 / Tier 4)" test block: config coverage, all-authored protocol coverage, conditional-close assertion, RES>U-S5.1 rubric, and extended Amanah scan.

### Stage 4 — Plan UI Mode-4 design chrome (`4cd4b398`)
- New `MonitoringStreamPanel.tsx` + `.module.css` in `apps/web/src/v3/plan/strata/` — the green "monitoring stream" panel rendered from `objective.monitoringProtocol`. CSS var `--ms-accent: #3f8f5f`; distinct from the amber Threshold-1 register.
- New `Mode4DesignChrome.tsx` + `.module.css` — the Plan-only chrome container. Renders four affordances in spec order: "Builds on" line, amber Planning Direction mandate, `MonitoringStreamPanel`, act-handoff chip. **Arms only on `monitoringProtocol || buildsOnDisplay || planningDirectionMandate`** — `actHandoff` alone never arms it (it predates the restructure and appears on many non-Design objectives).
- Mounted in `ObjectiveDetailPanel.tsx` just after `ActProgressBar`. `ObjectiveDetailPanel` is rendered only by `PlanTierShell` and `PlanStratumShell` → Plan-only by construction → **Act byte-identical**.
- Tests: `Mode4DesignChrome.test.tsx` (6/6): full fixture render, eyebrow, and arming logic (arms on each individual Mode-4 field; renders nothing for legacy and actHandoff-only objectives).

## Rationale

- **Display-only fields** match the covenant: Mode-4 monitoring protocols inform the Observe stage design but never become prerequisites or gates. Threshold 2 (which will audit monitoring) is deferred.
- **`s4-direction` retire** is doc-faithful (old 3.1 migrated to Threshold 1) and zero-breakage (the `excludedFromResolution` mechanism was already tested on two other objectives; all 70 feeds chips and map keys remain valid).
- **Option B conditional closure** (display-only mandate copy) respects the never-hard-gate covenant while clearly surfacing the design package that answers the Threshold-1 condition to the steward.
- **`feeds` as free-text** (not wired to `UniversalDomain` enum) defers the Observe-domain wiring to Threshold 2 without losing authoring value.

> [!note] Superseded by Threshold 2 (2026-06-17)
> The "`feeds` as free-text" and `indicators: string[]` shape were **tightened** in [[2026-06-17-atlas-threshold2-coherence-check]] Stage 1 (`fdb87fb3`): `monitoringProtocol` is now `{ indicators: {metric,frequency}[].min(2), triggers: string[].min(1), feeds: UniversalDomain }`, and the ~130 Mode-4 protocols authored here were migrated to it. The display-only / never-a-gate invariant is unchanged.
- **actHandoff-alone does NOT arm the chrome** — it appears on pre-Mode-4 objectives; arming on it would pollute non-Design objective details.

## Alternatives Considered

- **Conditional closure Option A (new store state / hard gate)** — rejected: violates the never-hard-gate covenant; the existing conditional register in `RealityCheckGateBanner` already surfaces the condition narratively; display-only mandate copy achieves the same communication without architectural cost.
- **Wiring `feeds` to `UniversalDomain` enum now** — deferred to Threshold 2 (which designs the Observe-domain audit); free-text is cleaner for the authoring sweep and does not prevent future promotion.

## Consequences

- Every s4/s5 objective now carries a monitoring protocol in the shared catalogue — the design input to the Observe stage is authored and locked against regressions.
- The Plan detail panel surfaces the Mode-4 chrome automatically for any objective that carries the fields; non-Design objectives are untouched.
- `STRATUM_PREREQS['s5-system-design'] = ['s4-water-strategy', 's4-zones']` — the gate is leaner and doc-faithful.
- Foreign web test failures (`completionPathAudit.ratchet` — baseline predates `silv-sec-s3-stock-water`; `projectStore.secondaryReopen` — s3-hydrology lock predates Mode-4) are **proven foreign via revert** and predate this work.

## Connections

- [[olos]] — the primary entity affected
- [[2026-06-17-atlas-threshold1-reality-check]] — predecessor; Mode-4 chrome reads from its `RealityCheckGateBanner` (Conditional register narrates the mandate)
- [[2026-06-16-atlas-tier2-systems-reading-restructure]] — introduced `intentLens`/`observeOutput`/`buildsOnDisplay`/`excludedFromResolution` schema plumbing reused here
- [[2026-06-17-atlas-threshold2-coherence-check]] — successor; audits this s4/s5 design work and tightens the `monitoringProtocol` schema (supersedes the free-text `feeds` sub-decision above)
- [[amanah-gate]] — every monitoring/mandate string passes the banned-term scanner
