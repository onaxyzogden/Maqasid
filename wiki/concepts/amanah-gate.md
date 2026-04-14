---
title: "Amanah Gate"
type: concept
created: 2026-04-09
updated: 2026-04-14
tags: [ethics, permissibility, protocol, amanah, bbos, atlas, moontrance, tiered-honesty]
sources: 0
---

# Amanah Gate

A permissibility check protocol and the first gate before any task execution in [[maqasid-os]]. The Amanah Gate confirms that a task serves a halal purpose. If riba (usury), gharar (deception/uncertainty), or other ethical concerns arise, work stops immediately and the concern is flagged for human review. Named after Amanah -- the Islamic principle of trust and stewardship.

## Core Idea

The Amanah Gate is the ethical instantiation of the [[maqasid-al-shariah]] framework at the task level. Every piece of work -- whether performed by a human operator or an AI agent -- must pass through it before execution begins. The gate operationalizes a simple question: does this task protect or undermine the higher objectives of Shariah?

The protocol is documented in `docs/principles.md` and is a mandatory step in the Context-First Protocol defined in `CLAUDE.md`. It applies equally to code changes, business decisions, and pipeline operations. The gate is non-negotiable: no task proceeds without clearance, and no assumption resolves ambiguity when the cost of being wrong is high.

## Application

- In the **Context-First Protocol** (`CLAUDE.md`), the Amanah Gate is Step 1 -- executed before identifying domains, reading CONTEXT.md files, or touching any source file.
- In the [[bbos-pipeline]], it appears at **Stage 01 QAL (Qualification)** -- the first stage where a potential engagement is screened for alignment with Islamic business standards.
- In the UI, the concept is echoed by the [[ceremony-gate-pattern]] -- the CeremonyGate component that gates module access with Quranic grounding.
- AI subagents operating within [[maqasid-os]] are required to receive the Amanah Gate as part of their prompt context. No autonomous agent bypasses this check.
- When the gate triggers a stop, the concern is surfaced to the human operator with a clear description of which Maqasid objective is at risk.

## Amanah Gate Protocol (Cross-Product Pattern)

A second, deeper application of the Amanah Gate was identified through graphify analysis of the OGDEN website (2026-04-14). Distinct from the ethical permissibility check above, this protocol governs **input quality** rather than task ethics. See [[2026-04-14-amanah-gate-protocol]] for the full decision record.

The protocol asks: *"Is the evidence strong enough to proceed?"* It appears independently in three OGDEN products with identical rationale language but was never previously named.

### Three Invariants

1. **Input typing** — every input is classified by provenance (how was this known?)
2. **Tier assignment** — a confidence tier is assigned, visible at the decision point
3. **Gate threshold** — the system cannot proceed to the consequential next action without meeting the minimum tier

### Per-Product Implementation

| Product | Mechanism | Gate |
|---|---|---|
| **Atlas** | Confidence Framework (High / Medium / Low) — by data source provenance | Site suitability score blocks low-confidence recommendations |
| **BBOS** | G-Label System (G1 / G2 / G3) — by evidential weight of operator claims | Stage 02 Amanah Gate stops pipeline without sufficient evidence |
| **Moontrance** | M1 / M2 / M3 — by acquisition channel commitment level | Community enrollment gate blocks founding member onboarding on unconfirmed channels |

### Shared Theological Root

Amanah (trust) and Khilafah (stewardship) define the same obligation from two directions. The gate operationalizes both: *you cannot claim more certainty than you have, and the asset passes through you, not to you.* A gate failure is not a bad outcome — proceeding without meeting the gate is.

## Connections

- [[maqasid-al-shariah]] -- the evaluative framework the gate enforces
- [[ceremony-gate-pattern]] -- UI-layer parallel (gates interaction; Amanah Gate gates ethics)
- [[covenant-architecture]] -- the design philosophy that mandates this gate
- [[bbos-pipeline]] -- Stage 01 QAL implements the ethical gate; G-Label + Stage 02 implements the evidential gate
- [[atlas]] -- Confidence Framework + site suitability score implements the evidential gate
- [[maqasid-os]] -- the system in which this protocol operates
- [[2026-04-14-amanah-gate-protocol]] -- decision record for the cross-product evidential pattern

## Sources

No sources indexed yet.
