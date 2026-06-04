---
title: "ADR — Catalogue-driven content with shared 12+1 type roster"
type: decision
date: 2026-05-29
status: Accepted
deciders: Yousef
supersedes: null
related: [2026-05-29-atlas-spec-secondary-layer-plugin-model, 2026-05-29-atlas-spec-plan-tiered-objectives]
tags: [olos, atlas, adr, catalogue, project-type, roster]
---

# ADR 8 — Catalogue-driven content + shared 12+1 type roster

## Status
Accepted — 2026-05-29

## Context
The spec models per-project-type objective catalogues as plug-in content packages that load ~30–50 objectives at wizard completion, keyed off a canonical project-type roster. Project type is the only required wizard field beyond site boundary and project name — "no objective catalogue loads without it" (Project Creation Wizard Spec). The canonical roster is **12 primary project types + Residential / Live-In Stewardship as the 13th, secondary-only** (Secondary Layer Spec v1.2 — confirmed canonical).

Current code state: the wizard collects a project-type field, but the canonical roster, the relationship matrix, and the design-tension list are **not in shared code**. This is a true substrate gap and gates Phase 1.

## Options considered
- **A. Adopt the catalogue-as-plugin model and codify the roster + matrix + tensions in shared** (recommended).
- B. Hard-code per-type objective lists in the Plan tier shell without a catalogue abstraction.

## Decision
Adopt the catalogue-as-plugin model. Codify in shared:
- the **12 primary types + Residential (13th, secondary-only)** roster;
- the **relationship matrix** (Secondary Layer v1.2 §5.3, including the Residential row);
- the **design-tension register** (10 entries with resolution tiers — see ADR 9);
and build a per-type catalogue loader that performs the atomic Tier 0 load (16 universal + primary-type + secondary delta objectives) on wizard completion.

## Rationale
A catalogue abstraction keeps per-type content as data, not code, which is what lets new types and the secondary-layer mechanism (ADR 9) plug in without touching the Plan shell. The roster has to live in shared because the wizard, the loader, the matrix, and the tension detector all reference it.

## Consequences
- Gates Phase 1 (catalogue load mechanism + atomic Tier 0 transaction).
- Tightly paired with ADR 9; the roster and matrix are shared by both.
- Content authoring (the per-type catalogues themselves) becomes a tracked deliverable alongside the loader.

## Connections
- Review: [[2026-05-29-olos-new-spec-suite-review]]
- Related: [[2026-05-29-atlas-spec-secondary-layer-plugin-model]], [[2026-05-29-atlas-spec-plan-tiered-objectives]], [[2026-05-29-atlas-spec-plan-output-enum]]
- Concept: [[olos-universal-domains]]
