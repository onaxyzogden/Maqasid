---
title: "ADR — Secondary-layer plugin model (additive vs modifying, patch records)"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-catalogue-driven-content]
tags: [olos, atlas, adr, secondary-layer, patch-records, tensions]
canonical_source: OLOS_Project_Type_Secondary_Layer_Spec_v1.2
---

# ADR 9 — Secondary-layer plugin model

## Status
Accepted — 2026-05-29

## Context
Canonical source: **Secondary Layer Spec v1.2** (ratified by Yousef as canon, 2026-05-29). A project recipe is exactly one primary + zero-or-more secondaries. Secondaries are **additive** (append new objectives only) or **modifying** (expand existing primary objectives via patch records, in addition to adding new ones). Classification is a property of the **primary–secondary pair**, not the secondary type alone (e.g. Silvopasture is modifying on Homestead, additive on Ecovillage). The 8×12 relationship matrix (plus the Residential row) is the canonical reference.

Modifying secondaries inject checklist items via **patch records**: `target_objective_id`, `inject_after_item_id`, `items[]` (each with `is_methodology` and `feeds_into`), `source_secondary_id`, optional `completion_gate_amendment`, `scope_note`. Adding a secondary post-completion that patches a complete objective reverts it to active — surfaced by a **named modal alert, never a badge or silent state change**. Mid-project addition runs the 6-step delta computation; removal is blocked if any delta objective is started/complete (offer Deferred instead). All config changes are append-only versioned. The design-tension register holds **10 entries** with resolution tiers; #9 Residential × Agritourism and #10 Residential × Wellness both resolve at Tier 3 Zone Allocation.

Current code state: patch-record schema, classification matrix, and reopening UX are all absent. Net-new mechanism.

## Options considered
- **A. Adopt v1.2 in full; split behaviour-class from tension into independent fields** (recommended).
- B. Adopt v1.2 but keep the single-symbol matrix as the data shape (forces a false M/X either/or).

## Decision
Adopt the v1.2 patch-record model as specified: patch records, reopening modal-alert rule, 6-step delta computation, removal rules, and the §9 data model. Encode the relationship matrix with **two orthogonal fields rather than one symbol**:
- `secondary_class: additive | modifying`
- `tension_id?` (nullable reference into the 10-entry register)

The matrix's single glyph is treated as a **display rollup** where X takes visual precedence; in data, a pair can be both `modifying` and tensioned. This resolves the v1.2 changelog/matrix conflict where Residential is called "modifying on Agritourism, Wellness" while those cells display X (and appear as tensions #9/#10) — the same pattern Silvopasture × Market Garden already follows.

## Rationale
Behaviour class and tension presence answer different questions ("does it patch existing objectives?" vs "does this combination carry a known conflict?"). Collapsing them into one symbol is fine for display but lossy for the data model. Splitting them removes the contradiction without contradicting the matrix as rendered.

## Consequences
- Highest-novelty build in the suite: patch schema, reopening UX, delta computation, append-only version history.
- Pairs with ADR 8 (shares roster + matrix).
- **Doc cleanups (done 2026-05-29):** the §6.1 "All 8 tensions are unconditional" line (now reads 10) and the "v1.1" subtitle/footer (now "v1.2") were corrected in the canonical source doc and the tracked changes accepted, so they no longer propagate.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-catalogue-driven-content]], [[2026-05-29-atlas-spec-plan-tiered-objectives]], [[2026-05-29-atlas-spec-feeds-into-data-model]]
