---
title: "Ceremony Gate Pattern"
type: concept
created: 2026-04-09
updated: 2026-04-09
tags: [ui-pattern, islamic-ux, intentionality, niyyah, gating]
sources: 0
---

# Ceremony Gate Pattern

A UI access gating pattern used in [[maqasid-os]] that requires users to encounter an Islamic grounding overlay before entering any module. The pattern ensures that interaction with the system begins with intentionality (niyyah) -- displaying relevant Quranic ayat and requiring acknowledgment before proceeding.

## Core Idea

The Ceremony Gate Pattern treats the boundary between "not yet working" and "working" as a sacred threshold. Rather than dropping users directly into a dashboard, the system presents a moment of pause: a Quranic ayah relevant to the module's pillar, a brief reflection, and an explicit act of acknowledgment. This is not decoration -- it is a structural commitment to the principle that purposeful work begins with purposeful intention.

The pattern is implemented in `src/components/islamic/CeremonyGate.jsx` and is supported by a family of related gating components:

- **ThresholdModal** -- gates significant or irreversible actions with additional confirmation
- **ReadinessCheck** -- assesses pillar readiness through structured self-reflection
- **ResumeOverlay** -- presents a return ceremony after periods of inactivity

The [[graphify]] knowledge graph identified this pattern as semantically similar to the [[amanah-gate]] (confidence 0.75). Both gate access based on Islamic principles, but they operate at different layers: the Ceremony Gate at the UI/interaction layer, and the Amanah Gate at the ethical/task layer.

## Application

- Every module in [[maqasid-os]] is wrapped with a CeremonyGate. Users cannot bypass it to reach the dashboard content beneath.
- The Quranic ayat displayed are specific to each pillar of the [[maqasid-al-shariah]] -- the Faith module shows ayat about din, the Wealth module shows ayat about rizq, and so on.
- The ReadinessCheck component extends the pattern into a structured assessment, asking the user to evaluate their current state against pillar-specific criteria before beginning work.
- The ResumeOverlay activates when a user returns after inactivity, re-establishing intentionality rather than allowing stale context to persist.
- In the [[bbos-pipeline]], the pattern influences the operator onboarding flow -- new operators encounter a covenant acknowledgment before accessing pipeline tools.

## Connections

- [[amanah-gate]] -- ethical-layer parallel (Ceremony Gate gates UI; Amanah Gate gates task ethics)
- [[maqasid-al-shariah]] -- the framework whose pillars determine which ayat appear in each gate
- [[covenant-architecture]] -- the design philosophy that mandates intentionality at every system boundary
- [[maqasid-os]] -- the operating system where this pattern is implemented
- [[graphify]] -- identified the semantic relationship between this pattern and the Amanah Gate

## Sources

No sources indexed yet.
