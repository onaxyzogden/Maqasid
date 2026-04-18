---
title: "Amanah Gate Protocol"
type: concept
created: 2026-04-18
updated: 2026-04-18
tags: [ethics, amanah, protocol, tiered-honesty, bbos, olos, mtc, milos, cross-product]
sources: 0
---

# Amanah Gate Protocol

A cross-product design pattern governing **input quality** across all OGDEN products. Distinct from the ethical permissibility gate in [[amanah-gate]] (which asks *"Is this task halal?"*), the Amanah Gate Protocol asks: *"Is the evidence strong enough to proceed?"*

Named and formalised on 2026-04-14 after graphify analysis surfaced the same pattern operating independently in OLOS and BBOS with identical rationale language. See [[2026-04-14-amanah-gate-protocol]] for the original decision record.

## Three Invariants

Every implementation of this protocol must satisfy all three:

1. **Input typing** — every input (data point, claim, commitment) is classified by provenance: *how was this known?*
2. **Tier assignment** — a confidence tier is assigned based on that provenance, visible at the point of decision
3. **Gate threshold** — the system cannot take the consequential next action without meeting a minimum tier

## Universal Tier Labels

Three tiers, applied identically across all current and future OGDEN products:

| Tier | Label | Arabic | Meaning |
|---|---|---|---|
| T1 | **Bayyinah** | بَيِّنَة | Verified — named evidence, primary source, or documented pattern |
| T2 | **Qarina** | قَرِينَة | Inferred — limited data, estimated, contextual indication, user-provided |
| T3 | **Niyyah** | نِيَّة | Declared — aspiration or stated intent, not yet evidenced |

**Gate rule (universal):** Bayyinah and Qarina may advance. Niyyah alone blocks. Each product sets its own minimum tier per action type.

### Theological Grounding

- **Bayyinah** is the Qur'anic and fiqh standard for clear proof — what you can demonstrate, not merely assert.
- **Qarina** is contextual indication — reasonable inference from circumstantial evidence, admissible but not conclusive.
- **Niyyah** is the Islamic concept of intention — real, honourable, and the starting point of all deeds — but distinct from deed. The tradition holds the niyyah while requiring the bayyinah before the system acts on it.

The pattern operationalises Amanah (trust): you cannot claim more certainty than you have, and you cannot let aspiration pass through a gate built for evidence.

## Per-Product Implementation

Each product uses the three labels. Products with internal sub-grades (e.g. BBOS G1/G2 within Bayyinah) may preserve that granularity internally; the cross-product surface always shows the universal label.

| | OLOS | BBOS | MTC |
|---|---|---|---|
| **Bayyinah (T1)** | Federal API — auto-populated, verified source | G1 (named evidence) + G2 (documented pattern) | M1 — capital committed, irrevocable |
| **Qarina (T2)** | User-provided data | G3 — informed inference, limited data | M2 — agreement signed or awarded |
| **Niyyah (T3)** | Derived or estimated | G4 — aspiration, not yet evidenced | M3 — intent declared, not yet committed |
| **Gate** | Site suitability score | Stage 02 Amanah Gate | Community enrollment gate |
| **What it blocks** | Overconfident land recommendations | Pipeline advancement without evidence | Founding member onboarding on unconfirmed channels |

## Conformance Test for New Products

Any product joining the OGDEN ecosystem must answer three questions before launch:

1. What is your **input**? (What are you classifying by provenance?)
2. What are your **tiers**? (How does Bayyinah / Qarina / Niyyah map to your domain?)
3. Where is your **gate**? (At what decision point does Niyyah-alone block advancement?)

A product without a clear answer to all three is operating without the protocol.

## Connections

- [[amanah-gate]] — ethical permissibility check (asks "Is this halal?"); distinct from but complementary to this protocol
- [[2026-04-14-amanah-gate-protocol]] — decision record that named and formalised this pattern
- [[bbos-pipeline]] — BBOS G-Label System + Stage 02 gate is the original named implementation
- [[olos]] — Confidence Framework is the OLOS implementation
- [[covenant-architecture]] — governing philosophy; this protocol is one of its structural expressions
- [[maqasid-al-shariah]] — evaluative framework the gate ultimately serves
