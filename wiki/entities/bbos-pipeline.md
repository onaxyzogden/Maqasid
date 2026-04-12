---
title: "BBOS Pipeline"
type: entity
created: 2026-04-09
updated: 2026-04-11
tags: [bbos, pipeline, islamic-business, covenant, stages, barakah, truth-safe, two-factory]
sources: 4
---

# BBOS Pipeline

The Barakah Business Operating System (BBOS) v2.4 is a fully documented 8-stage operational framework built as a Direct-Injection Auto-Sequence for constructing "truth-safe" businesses within an LLM environment. It enforces strict linear progression (Stage 00 through 07), covenantal integrity via [[amanah-gate]], and a Two-Factory architecture at every stage. BBOS is integrated into [[maqasid-os]] as a module with dedicated UI components and has a marketing section at `website/bbos/` on the [[ogden-hub]] site.

## Key Facts

- **Version:** 2.4
- **Stages:** PRE (00) -> STR (01) -> OFR (02) -> OUT (03) -> SAL (04) -> FUL (05) -> RET (06) -> OPT (07)
- **Stage count:** 8 (plus Patch Plan sub-stages 00A and 01B)
- **Core paradigm:** Direct-Injection Auto-Sequence for truth-safe business formation
- **Source priority:** Stage Canon Index (highest) > Master Operating Protocol
- **UI components:** BbosFullDashboard (unified stage view), BbosPipelineHeader (progress + sub-stage indicators), BbosTaskPanel (stage tasks), BbosRoleBadge, BbosRolePicker
- **Integration:** Module within [[maqasid-os]] at `src/components/bbos/`
- **Marketing:** Landing page at `website/bbos/` on [[ogden-hub]]
- **Governing philosophy:** [[covenant-architecture]]

## Architecture — Two-Factory Model

Every stage operates through a dual-factory architecture:

1. **Research Factory** — Synthesizes raw inputs into S-outputs (S1 through S5/S6) that define the strategic landscape for that stage. This is the analytical engine.
2. **Asset Factory** — Converts approved research into the final Asset Pack. The Asset Factory is gated: AI is forbidden from running it until the operator explicitly triggers the **Assembly Gate** by typing `ASSEMBLE`.

This separation enforces operator sovereignty over all deliverables. The AI researches and recommends; the operator decides when to crystallize output into assets.

## 8-Stage Covenant Pipeline

| Stage | Code | Name | Purpose |
|---|---|---|---|
| 00 | PRE | Pre-Check | Audits operator skills, proof, and constraints. Includes External Viability Pre-Check. |
| 01 | STR | Strategy | Extracts truthful market "buying language" and identifies the "External Enemy." |
| 02 | OFR | Offer | Constructs a priced, truth-safe offer with a formal Proof Plan. |
| 03 | OUT | Outreach | Builds acquisition engine using "hooks" as attention devices. |
| 04 | SAL | Sales | Installs conversion infrastructure: scripts, objection handling, close sequences. |
| 05 | FUL | Fulfillment | Maps delivery SOPs to promised outcomes with QC checkpoints. |
| 06 | RET | Retention | Maximizes lifetime value through proof-led re-engagement. |
| 07 | OPT | Optimization | Data-driven 30-day optimization cycle identifying the "Weakest Link." |

### Patch Plan Sub-Stages

- **Stage 00A — Input Integrity Gate:** Grades operator proof on a P0-P3 scale before pipeline entry.
- **Stage 01B — Mechanism Factory:** Bridges the strategy-to-offer gap, ensuring STR outputs translate cleanly into OFR inputs.

## Critical Business Rules (Non-Negotiables)

- **Sequence Strictness:** No stages may be skipped. Linear progression 00 through 07 is enforced.
- **Truth-Gate (G-Labeling):** Every result claim must carry a G1-G4 evidence grade label.
- **Assembly Gate:** AI is forbidden from running the Asset Factory until the operator types `ASSEMBLE`.
- **No External Assumptions:** The system cannot invent operator capabilities, credentials, or resources.
- **Verbatim Extraction:** Voice-of-Customer (VoC) language is extracted directly from sources and never paraphrased.
- **Scarcity Verification:** All urgency claims must be tied to documented real-world constraints.
- **Scope Integrity:** Outreach and sales materials cannot reference anything outside the frozen OFR Scope Map.

## Key Constraints

- **Regulatory Hard Stops:** Pipeline halts if regulatory compliance issues are identified.
- **Operator Strategic Constraints:** Hours available, financial runway, and existing assets bound what the pipeline can propose.
- **Amanah Proof Audit:** [[amanah-gate]] screens for riba, gharar, and covenant alignment at qualification.

## Current Status

Pipeline UI fully aligned with v2.4 protocol as of Sprint 7 (2026-04-11). Two-Factory visual split implemented: Research Factory (S/V/FP prefixes) and Asset Factory (A/AF/IC) render as distinct sections with factory headers and tinted backgrounds. Assembly Gate bar between factories shows CLEARED (green) or LOCKED (amber) based on Research task completion; Asset tasks get viewOnly when locked. G-Label picker now shows G1-G4 descriptions inline. Pipeline header shows sub-stage progress indicators (✓/◐/○). Dynamic scoring via StageScoreCard (5 signals × 5 pts → % → verdict). Role-based access via BbosRoleBadge and BbosRolePicker. Marketing section live on [[ogden-hub]].

**DashboardTaskCard** (`src/components/shared/DashboardTaskCard.jsx`) — unified card component used by both BbosFullDashboard and PillarLevelDashboard. Whole card is clickable; dynamically renders subtask bars, field progress, due dates, tags, purpose text, and BBOS custom renderers via children prop.

**Audit system:** Project Audit cards across all dashboards now use a 3-star scale (was 5-star). BBOS `renderStars(score, max=3)` with explicit `max=5` for StageScoreCard.

**FND stage IFB tasks removed:** FND-IFB-S1 through FND-IFB-S5 ("IFB Forms" group) removed from `bbos-task-definitions.js` and `bbos-role-access.js` — backend admin tasks not relevant to operators.

## Connections

- [[maqasid-os]] — Host application; BBOS is a module at `src/components/bbos/`
- [[ogden-hub]] — Marketing landing page at `website/bbos/`
- [[amanah-gate]] — Ethical screening gate; Amanah Proof Audit at qualification stage
- [[covenant-architecture]] — Structural philosophy governing the pipeline; truth-safe covenant enforcement
- [[maqasid-al-shariah]] — Jurisprudential grounding for stage definitions and screening criteria
- [[ceremony-gate-pattern]] — UI pattern used for stage transitions and Assembly Gate
- [[graphify]] — Pipeline structure mapped in the knowledge graph

## Open Questions

- Are Patch Plan sub-stages (00A Input Integrity Gate, 01B Mechanism Factory) represented in the stage progression header?
- What is the rejection/off-ramp flow when the Amanah Proof Audit fails at Stage 00?
- Will BBOS support multiple concurrent pipelines (multiple businesses per operator)?

### Resolved (Sprint 7, 2026-04-11)
- ~~Two-Factory UI~~ — Implemented: Research/Asset factory sections with distinct backgrounds and headers
- ~~G-Labeling in UI~~ — G-Label picker now shows G1-G4 descriptions; GLabelBadge displays assigned label
- ~~Assembly Gate UI~~ — Rendered as a status bar (CLEARED/LOCKED), not ASSEMBLE command — Asset tasks lock when Research incomplete

## History

| Date | Event |
|---|---|
| 2026-04-09 | Enriched entity page with BBOS v2.4 framework detail from NotebookLM extraction (notebook `84220e85`). Added Two-Factory architecture, 8-stage definitions (PRE/STR/OFR/OUT/SAL/FUL/RET/OPT), Patch Plan sub-stages (00A, 01B), critical business rules (G-Labeling, Assembly Gate, Verbatim Extraction, Scope Integrity), and key constraints. Updated stage codes from placeholder names to canonical codes. |
| 2026-04-11 | TRU stage: replaced static Integrity Threshold lookup in TRU-AF5 with dynamic weighted score (5 signals × 5 pts = max 25 pts → %). Signals: TRU-S3.overallProofStrength + TRU-V1 gates A/B/C/D. Verdicts: ≥75% QUALIFIED, ≥50% DEVELOPING, ≥25% REVIEW NEEDED, <25% BLOCKED. Audited Claim Strength cards also made dynamic (graduated gate stars + status sub-labels). File: `src/components/bbos/TruDashboard.jsx`. |
| 2026-04-11 | Consolidated all stage dashboards (TRU/STR/OFR/OUT/FND) into unified `BbosFullDashboard.jsx`. TRU dynamic scoring was not ported during consolidation. |
| 2026-04-11 | Extended dynamic scoring to STR, OFR, OUT via `StageScoreCard` in `BbosFullDashboard.jsx`; also restored TRU scoring. Pattern: `STAGE_SCORE_SIGNALS[bbosFilter]` → 5 weighted signals × 5 pts → % → verdict (QUALIFIED/DEVELOPING/REVIEW NEEDED/BLOCKED). STR: integrity verdict + VoC depth + content angles + core belief + arc completeness. OFR: promise G-label + ICP completeness + guarantee rigor + scope map + proof status. OUT: icOut1–icOut5 integrity checks (binary). TRU-AF5 ProofAuditRenderer now shows graduated stars for known rating strings. |
| 2026-04-11 | Task card color coding fixed: `--active` now uses amber (`--pri-high`) not teal primary; status detection switched from `completedAt` (always null) to `columnId === doneColumnId`. Stage tabs in `BbosPipelineHeader` now show same color system via `stageStatusMap` prop from `ProjectBoard`. Auto-advance to "In Progress" added in `BbosTaskPanel.jsx` — fires on field data entry, AI draft population, and template import. |
| 2026-04-11 | UI polish: unified DashboardTaskCard shared component (whole card clickable, dynamic features); 3-star audit system across all dashboards; CSS consistency pass (padding 20px, star gap 2px, opacity 0.2); removed IFB Forms task group (FND-IFB-S1–S5); removed empty card message box from BBOS cards; Tasks page (`/work/:id/tasks`) generic dashboard updated to 3-star. |
| 2026-04-11 | Sprint 7 audit remediation: Two-Factory visual split with Research (S/V/FP) and Asset (A/AF/IC) factory sections (#32A). Assembly Gate bar — CLEARED/LOCKED based on Research completion (#32B). G-Label descriptions added to picker dropdown (#32C). Sub-stage progress indicators (✓/◐/○) in pipeline header (#32D). Mobile breadcrumb visibility fix (#33). |
| 2026-04-09 | Wiki entity page bootstrapped. Pipeline integrated into maqasid-os with header, task panel, role badge, and role picker components. Marketing section live on ogden-hub. |
