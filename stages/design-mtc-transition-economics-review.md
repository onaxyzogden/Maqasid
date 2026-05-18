---
phase: design
slug: mtc-transition-economics
status: review
amanah: pending
created: 2026-05-18
---

# Review Gate: design — mtc-transition-economics

> **What this is:** The covenant/economic scoping spec for **Sub-project C
> (Transition Economics)** of the Apricot Lane Farms replication
> initiative. It is the **gate** that must clear Scholar Council review
> *before* any Atlas (OLOS) transition-economics tooling is built.
> Artifact 1 (below, §1–§7) is the covenant/economic substance. Artifact 2
> (§8) is a *conditional, design-only* Atlas module outline that ships
> nothing until this gate is `approved`. **This is a design artifact, not
> bylaws, not legal text, not a registration, and not code.**

> **Companion document:** The governing covenant for the entities and roles
> referenced here is
> [design-mtc-waqf-governance-review.md](design-mtc-waqf-governance-review.md).
> Where this doc and the governance doc appear to differ, the governance
> doc governs; this doc only operationalizes the *economic transition*
> mechanics it already established (tri-entity stack, surplus floors,
> permitted capital channels, anti-hīlah review).

> **Tags used in this doc:**
> - **[scholar review]** — fiqh-sensitive claim that needs scholarly attestation
> - **[lawyer review]** — legal-form claim that needs counsel review
> - **[open question]** — unresolved; flagged for a decision

---

## 0. Amanah Gate

This spec tracks the **economic transition** of a regenerative parcel from
ecological baseline to financial viability under the MTC Waqf covenant. It
takes **no fiqh position of its own.** Every capital-instrument, surplus,
valuation, and financing question is enumerated and routed to the Scholar
Council for **binding attestation** (§7). No riba framing, no gharar
framing, no reintroduction of the CSRA / advance-purchase / member-share
model (erased 2026-05-04 on *bayʿ mā laysa ʿindak* grounds), no
investor/equity framing. The post-acquisition membership-benefit
yield-share is **out of scope** here — named only, not designed.

---

## 1. Purpose & Covenant Frame

### 1.1 What "transition economics" means here

"Transition economics" is the bridge between the **A-series ecological
monitoring** already built in Atlas (A1 regeneration trajectories, A2
habitat allocation, A3 biodiversity outcomes) and the **financial
viability** of the land under the Waqf. It answers one question under
covenant constraint:

> As the ecological state of the parcel improves over the transition
> period, does the Operating entity reach and sustain a surplus large
> enough to feed the deed-locked split (Charitable / corpus / reserve)
> **without** any prohibited capital structure?

It is an **outcome/projection** discipline, the economic complement to
A3's ecological-outcome discipline. It does **not** decide the split, set
rents, admit capital instruments, or value the corpus — those are
Scholar-Council / mutawalli decisions. It only *models and surfaces* them
against covenant-fixed inputs.

### 1.2 CSRA-erasure restatement (binding)

The Community-Supported Regenerative Agriculture model — and every
"investor presentation," "member share," "advance purchase," or
"salam-style pre-sale" framing — was **erased 2026-05-04** on the fiqh
ground that Islam does not permit the sale of what one does not yet
possess (*bayʿ mā laysa ʿindak*). This spec does not reintroduce it in
any form, pre- or post-acquisition. Permitted vocabulary follows the
post-2026-05-04 covenant (governance doc §6.4; atlas CSRA-erasure
decision 2026-05-09): public-facing label is **"capital partners &
allies."**

### 1.3 Why this is a gated spec, not an A-style plan

A1/A2/A3 were ecological and additive — buildable directly. C touches how
capital enters and how surplus is split for a Waqf corpus. That is exactly
the territory where the CSRA model was struck. Therefore the economic
substance must clear Scholar Council review **before** any code exists.
This document is sequenced: **Artifact 1 (§1–§7) is the gate; Artifact 2
(§8) is conditional and blocked on it.**

---

## 2. Permitted Capital-Channel Catalog

No new channels are invented. This restates the five permitted channels
(governance doc §6.4) with the accounting/covenant detail the transition
model needs as **fixed inputs**.

| # | Channel | Goes to | What the contributor receives | What they explicitly do NOT receive | Accounting treatment | Covenant rationale |
|---|---|---|---|---|---|---|
| 1 | Charitable donation (unrestricted) | Charitable | Tax receipt where applicable; no financial return | No equity, no yield claim, no repayment | Donation revenue, Charitable books | Gift; sadaqah jāriyah |
| 2 | Restricted donation | Charitable → Holdings/Operating (per restriction) | Tax receipt; named-use assurance | No equity, no yield claim, no repayment | Restricted-fund accounting | Gift with donor-imposed use restriction |
| 3 | Qarḍ ḥasan (interest-free loan) | Holdings, Operating, or Charitable | Repayment of principal only, on documented schedule | No interest, no profit-share, no equity conversion, no late-fee-as-interest | Liability (loan payable); not revenue | Loan free of riba; Scholar Council attests non-hīlah |
| 4 | In-kind contribution | Operating or Charitable | Recognition; documented FMV for transparency | No equity, no yield claim, no cash repayment | Recorded at fair-market value, non-cash | Voluntary contribution of labor/materials/expertise |
| 5 | Sponsorship of a beneficiary's program | Charitable | Tax receipt; named beneficiary/class | No equity, no yield claim, no repayment | Restricted gift, Charitable books | Charitable purpose; restricted to beneficiary class |

**Prohibited (carried verbatim from governance doc §6.4 — closed list):**
equity/shares/units/membership-interest in any for-profit form; salam
advance-purchase, share-of-harvest pre-sale, "CSRA pre-sale," or any
instrument conveying ownership of unharvested produce or unrealized
yield; any interest-bearing debt or synthetic-riba late-fee structure;
profit-share, mushārakah-as-investment, or any return-on-capital
structured as a private benefit.

---

## 3. Surplus-Distribution Mechanics

These figures are **fixed inputs** resolved on 2026-05-02 (governance doc
§6.1c / §7.4). This spec restates — it does **not** set or reopen them.

### 3.1 Deed-locked floors

- **≥ 30%** of Operating surplus → Charitable entity
- **≥ 20%** → corpus reinvestment via Holdings
- **≥ 10%** → operating reserve

Starting target for shūrā discussion (subject to land-carrying-cost data
once a parcel is identified): **35% Charitable / 40% corpus / 25%
reserve**. Treated here as a fixed input; flagged provisional **only if**
the Scholar Council / mutawalli reopens it (§7, row S3).

### 3.2 Calculation order (what the model computes, not decides)

Operating surplus is defined as revenue minus (lease to Holdings + payroll
+ materials + operating costs). The transition model, once built, would:

1. Take projected Operating surplus from the existing Atlas financial
   engine (cost/revenue/cashflow/break-even — §8).
2. Apply the deed floors in order: Charitable ≥30% → corpus ≥20% →
   reserve ≥10%, with the residual allocated per the shūrā-set actuals
   above the floors.
3. Surface whether projected surplus is **sufficient** to satisfy all
   three floors across the transition period, and in which year
   sufficiency is first reached.

The model **never** sets the above-floor actuals (shūrā decision), never
distributes anything, and never proposes a capital instrument to close a
shortfall — a projected shortfall is *surfaced as a finding*, not
*solved by financing*.

---

## 4. Tri-Entity Flow — What the Tool May Model vs. What Only the Council May Set

Per governance doc §6.2. The transition model is read-only over covenant
decisions: it may **project and display**, never **set**.

| Flow | From → To | Tool MAY model (projection/display) | Only Council/mutawalli MAY set |
|---|---|---|---|
| Lease rent | Operating → Holdings | The rent figure as a cost input to the surplus projection | The rent amount and its ijārah structure |
| Designated grant | Operating → Charitable | Projected grant volume from the ≥30% floor | The actual above-floor annual ratio (shūrā) |
| Restricted-donation routing | Charitable → Holdings | Capital-improvement inflow as a modeled input | Acceptance of the donation + its restriction |
| Guest revenue | Public → Operating | Revenue projection from the existing engine | Pricing/program decisions (Operating dir.) |
| Qarḍ ḥasan | Capital partner → entity | A repayment schedule as a liability line | Acceptance + non-hīlah attestation (Council) |

---

## 5. Scope Boundary

**In scope (Artifact 1):** the covenant/economic substance above + the
Scholar Council attestation matrix (§7) + the gate definition (§9).

**In scope (Artifact 2, design-only, gate-blocked):** the outline of an
Atlas `transition-economics` plan-module that *projects* viability against
these fixed inputs (§8).

**Out of scope (explicitly):**
- The post-acquisition **membership-benefit yield-share** — named only,
  per the CSRA-erasure decision; not designed, not sketched, deferred to
  a fresh Scholar Council review when the corpus exists.
- Any DB migration, new server endpoint, or new financial-engine math —
  Artifact 2 reuses the existing engine (precedent:
  [2026-05-15-atlas-regenerative-farm-catalog-cash-enterprises.md](../atlas/wiki/decisions/2026-05-15-atlas-regenerative-farm-catalog-cash-enterprises.md)).
- Setting, ratifying, or reopening any covenant figure — that is §7.

---

## 6. Open Questions (surfaced, not resolved)

| # | Question | Owner | Note |
|---|---|---|---|
| OQ1 | Scholar Council composition | Scholar Council / Yousef | Unresolved in governance doc §4.2 (`[open question]`); the gate (§9) cannot be signed until a Council is constituted |
| OQ2 | OGDEN trustee-reduction trigger value ([X years]) | Scholar Council + counsel | Governance doc §8.1 — affects who controls the corpus during the transition window the model projects over |
| OQ3 | Post-acquisition membership-benefit yield-share | Scholar Council (future) | Explicitly **out of scope** here; named only |
| OQ4 | Transition-period horizon (years) the model projects over | mutawalli + Council | Must align with the A-series goal-tree deadline years; provisional only until set |

---

## 7. Scholar Council Binding-Attestation Matrix

Every fiqh-sensitive item below is **routed, not decided**. This spec
takes no position on any row. Each is marked **"requires binding Scholar
Council attestation before execution."** Per governance doc §7.5, the riba
accountability chain extends to every director, scribe, and witness;
signing or encoding an unattested instrument is itself a breach of amānah.

| # | Item | Question routed to Council | Status |
|---|---|---|---|
| S1 | Permitted capital-channel catalog (§2) | Does the catalog, as the *closed* set the tool will enforce, conform — including the qarḍ-ḥasan non-hīlah condition? | Requires binding Council attestation before execution |
| S2 | Qarḍ ḥasan terms | Repayment-schedule structure, absence of any late-fee-as-interest, no equity/profit conversion | Requires binding Council attestation before execution |
| S3 | Surplus-floor figures (§3) | Ratification (or reopening) of ≥30/≥20/≥10 and the 35/40/25 starting target | Requires binding Council attestation before execution |
| S4 | Lease (Holdings → Operating) as a model input | ijārah-compliance of the rent figure the projection consumes | Requires binding Council attestation before execution |
| S5 | Any financing instrument to close a projected shortfall | murābaḥah / ijārah / mushārakah / diminishing-mushārakah admissibility — **default posture is avoid debt** | Requires binding Council attestation before execution |
| S6 | Anti-hīlah review of the projection itself | That the tool's projection cannot be used to engineer a hīlah pattern (§7.5 governance doc: artificial loss, rent manipulation, benefit concentration) | Requires binding Council attestation before execution |
| S7 | Future membership-benefit yield-share | Out of scope here; raised only so the Council registers it as deferred | Deferred — not for attestation in this pass |

The plan takes **no fiqh position** on S1–S7. It enumerates and frames
only.

---

## 8. Artifact 2 — Conditional Atlas Module Outline (BLOCKED ON GATE)

> **This section is design-only. No code is written under this spec.** It
> is filed as an Atlas ADR **only after** §9's gate is `approved` with the
> §7 matrix signed. Until then it is a forward-reference, not a backlog
> item.

### 8.1 Module

A 16th Atlas `PlanModule`, `transition-economics`, registered through the
proven A1/A2/A3 **6-touchpoint pattern** (no new pattern invented):
`apps/web/src/v3/plan/types.ts`,
`apps/web/src/v3/plan/PlanViewContext.tsx`,
`apps/web/src/v3/plan/PlanChecklistAside.tsx`,
`apps/web/src/v3/plan/data/planModulePalette.ts`,
`apps/web/src/v3/plan/data/planModuleArtifactPresence.ts`,
`apps/web/src/v3/plan/PlanModuleSlideUp.tsx`. The `never`-guarded switch +
`Record<PlanModule,_>` maps enforce touchpoint completeness at tsc time
(A-series lesson).

### 8.2 Reuse, do not rebuild

- `apps/web/src/features/financial/` — costEngine, revenueEngine,
  cashflowEngine, breakEvenEngine, missionScoring, orchestrated by
  `hooks/useFinancialModel.ts`. **No new engine math.**
- `apps/web/src/store/financialStore.ts` — region, missionWeights,
  cost/revenue overrides as existing inputs.
- `apps/web/src/features/economics/` panel + cards, incl. the
  already-covenant-renamed `CapitalPartnerSummaryExport` (do not
  reintroduce investor language).
- Goal-tree: a `transition-economics` sub-goal in `REGENERATIVE_FARM`
  (`apps/web/src/v3/plan/data/goalTreeTemplates.ts`) — **sibling, not
  nested**, mirroring how A3's `biodiversity-outcomes` sat beside A2's
  `biodiversity-habitat`. Criterion IDs/targets left as **`TBD-Council`**
  until §9 clears.

### 8.3 Covenant-safe surface only

The module **displays/computes** transition viability and a surplus
*projection* against the Council-ratified floors. It **never** lets a user
configure a prohibited instrument; capital-channel inputs are limited to
the five permitted channels (§2) as a closed enum. A projected shortfall
is surfaced as a finding, never auto-resolved with a financing structure.
No investor/equity/CSRA/member-share/advance-purchase string may appear in
any copy, enum, comment, or export.

### 8.4 Explicit blocker

> **Not implementable until
> `stages/design-mtc-transition-economics-review.md` reaches status
> `approved` with the Scholar Council attestation matrix (§7) signed and
> open questions OQ1/OQ2/OQ4 resolved.** Building the module before the
> gate clears is itself a covenant breach (§7.5 governance doc — encoding
> an unattested economic structure).

---

## 9. Gate Definition

Artifact 2 may be implemented **only when all** of the following exist:

1. **§7 matrix S1–S6 each attested** by a constituted Scholar Council
   (binding on fiqh) and recorded in writing per governance doc §5.4.
2. **OQ1 resolved** — a Scholar Council is actually constituted
   (governance doc §4.2).
3. **OQ4 resolved** — the transition-period horizon is set by the
   mutawalli/Council and aligned to the A-series goal-tree deadline years.
4. **OQ2 noted** — the OGDEN trustee-reduction trigger value is recorded
   (its absence does not block code but must be logged as a known risk).
5. This doc promoted `review` → `approved` and `amanah: pending` →
   `amanah: attested` by the Council pass.

Until then this doc stays `review`. **This session does not advance it to
`approved`.**

---

## 10. Verification (covenant-correctness, not tests)

- **Self-review checklist:** no riba/gharar framing; no
  equity/investor/salam/CSRA/member-share/advance-purchase language; only
  the five permitted channels appear and as a *closed* set; surplus floors
  stated exactly as resolved 2026-05-02 (≥30/≥20/≥10; 35/40/25 target);
  yield-share named-only and marked out of scope; every §7 row carries
  "requires binding Council attestation."
- **Cross-source consistency:** contradicts neither the CSRA-erasure
  decision (atlas 2026-05-09), the MTC waqf-governance doc, nor the global
  `CLAUDE.md` capital rules. Governance doc governs on any apparent
  conflict.
- **Gate explicitness:** §8.4 + §9 unmistakably state Artifact 2 ships
  nothing until `approved`.
- **No atlas code touched:** zero edits under `atlas/` for this spec.
- **Human/Council review gate:** left at status `review`,
  `amanah: pending` — for Yousef → Scholar Council. This spec does not
  self-approve.

---

## 11. References

- [design-mtc-waqf-governance-review.md](design-mtc-waqf-governance-review.md)
  — governing covenant: tri-entity stack (§6), surplus floors (§6.1c/§7.4),
  permitted channels (§6.4), anti-hīlah review (§7.5), Council role (§4.2).
- `atlas/wiki/decisions/2026-05-09-atlas-csra-erasure.md` — permitted /
  forbidden vocabulary table; yield-share = membership-benefit deferral.
- `atlas/wiki/decisions/2026-05-15-atlas-regenerative-farm-catalog-cash-enterprises.md`
  — precedent: reuse existing engine/criteria, no new schema.
- `atlas/wiki/decisions/2026-05-18-atlas-biodiversity-outcome-monitoring-a3.md`
  — A3, the ecological-outcome sibling whose 6-touchpoint pattern Artifact
  2 reuses.
- Global covenant: `~/.claude/CLAUDE.md` — "CSRA model erased 2026-05-04
  on fiqh grounds"; permitted capital channels; "capital partners &
  allies" public label.

---

## Status

**review** — Artifact 1 (covenant/economic substance) and Artifact 2
(conditional, gate-blocked Atlas module outline) drafted 2026-05-18. Ready
to be presented to a constituted Scholar Council for the §7 binding
attestations and OQ1/OQ2/OQ4 resolution. On the §7 matrix returning signed
and the gate (§9) met, this doc can be promoted to `approved`, the wiki
follow-ups created, and Artifact 2 filed as an Atlas ADR and built. This
spec takes no fiqh position and does not self-approve.
