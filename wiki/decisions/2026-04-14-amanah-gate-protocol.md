---
title: "Amanah Gate Protocol — Cross-Product Pattern"
type: decision
date: 2026-04-14
status: accepted
tags: [amanah, pattern, atlas, bbos, moontrance, tiered-honesty, architecture]
superseded_by: null
---

## Context

A graphify knowledge graph analysis of the `website/` marketing site (2026-04-14) surfaced a structural pattern operating across all three OGDEN products that was never explicitly named or documented. The graph found a `semantically_similar_to` edge (INFERRED, score 0.72) between:

- `Atlas Confidence Framework (High/Medium/Low)` — rates land data by provenance certainty
- `BBOS G-Label System (Evidential Weight Tiers)` — rates operator claims by evidential weight

Neither product page references the other. The rationale language is nearly verbatim across both ("Honesty about Uncertainty" / "Honesty Architectural Not Aspirational"). A third product, Moontrance, carries the same theological root (`rationale_land_as_trust`, `concept_khilafah`) but has no corresponding mechanism.

The `index_concept_amanah` node on the root homepage is the only node in the graph with EXTRACTED edges pointing simultaneously to both Atlas and BBOS — confirming the homepage knowingly frames Amanah as the shared spine. Moontrance is not wired to this node via any extracted edge.

## Decision

Name and document **the Amanah Gate Protocol** as a first-class cross-product design pattern with three invariants:

1. **Input typing** — every input (data point, claim, commitment) is classified by how it was known (provenance)
2. **Tier assignment** — a confidence tier is assigned based on that provenance, visible at the point of decision
3. **Gate threshold** — a minimum tier is required before the system takes the consequential next action

The pattern name is distinct from the existing `amanah-gate` concept (ethical permissibility check). That gate asks: *"Is this task halal?"* This protocol asks: *"Is the evidence strong enough to proceed?"* Both are applications of Amanah; neither supersedes the other.

## Cross-Product Mapping

| | Atlas | BBOS | Moontrance (proposed) |
|---|---|---|---|
| **Input** | Land data points | Operator self-declarations | Acquisition channel commitments |
| **Tier 1** | High — federal API, auto-populated | G1 — documented evidence | M1 — capital committed, irrevocable |
| **Tier 2** | Medium — user-provided | G2 — pattern-based inference | M2 — agreement signed/awarded |
| **Tier 3** | Low — derived or estimated | G3 — aspiration/intent | M3 — intent declared, applied |
| **Gate** | Site suitability score | Stage 02 Amanah Gate | Community enrollment gate |
| **What it blocks** | Overconfident site recommendations | Pipeline advancement without evidence | Founding member onboarding on unconfirmed channels |
| **What it protects** | Integrity of land decisions | Barakah — corrupt foundations corrupt the business | Community covenant — enrolling on M3-only channels breaks the founding promise |

## Moontrance Gate Rules

| Action | Minimum channel tier required |
|---|---|
| Public storytelling / vision sharing | None |
| Waitlist / expressions of interest | M3 |
| Founding member invitation (paid or pledged) | **M2 on at least one primary channel** |
| Community program design (schedules, slots) | M2 primary + M3 secondary |
| Community enrollment (signed agreements) | **M1 on primary channel** |

## Rationale

The same design commitment appears independently in two products before being named. When a pattern recurs across unconnected contexts with identical rationale language, it is a load-bearing architectural principle — not a coincidence. Naming it:

- Prevents Moontrance from needing to rediscover it a third time
- Makes future products (and future contributors) heirs to the pattern rather than inventors of it
- Creates a testable standard: any new product can be asked "where is your Amanah Gate Protocol?"

## Documentation Gap Identified

`rationale_land_as_trust` ("Land Is a Trust (Amanah) Not an Investment Vehicle") is on the root homepage and points to both Atlas and the Amanah concept via EXTRACTED edges. It does not point to Moontrance — despite Moontrance being the most directly land-related product. This gap should be closed in the website copy and in this wiki.

## Consequences

- `wiki/concepts/amanah-gate.md` updated to include the tiered evidential honesty application
- `website/CONTEXT.md` updated with cross-product rationale section
- Future products must answer: what is your input, what are your tiers, and where is your gate?
- Moontrance Journey page should display M1/M2/M3 tier indicators per acquisition channel
- The land-as-Amanah rationale should be explicitly linked to Moontrance in website copy

## Connections

- [[amanah-gate]] — existing concept page, extended by this decision
- [[bbos-pipeline]] — BBOS implements G-Label and Stage 02 gate
- [[atlas]] — Atlas implements Confidence Framework and site suitability gate
- [[covenant-architecture]] — governing philosophy
- [[graphify]] — the tool that surfaced this pattern from the website corpus
