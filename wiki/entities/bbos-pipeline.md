---
title: "BBOS Pipeline"
type: entity
created: 2026-04-09
updated: 2026-04-25
tags: [bbos, pipeline, islamic-business, covenant, stages, barakah, truth-safe, two-factory]
sources: 4
---

# BBOS Pipeline

The Barakah Business Operating System (BBOS) v2.4 is a fully documented 9-stage operational framework built as a Direct-Injection Auto-Sequence for constructing "truth-safe" businesses within an LLM environment. It enforces strict linear progression (Stage 00 through 08) across three layers — **Think**, **Execute**, **Reckon** — covenantal integrity via [[amanah-gate]], and a Two-Factory architecture at every stage. BBOS is integrated into [[milos]] as a module with dedicated UI components and has a marketing section at `website/bbos/` on the [[ogden-hub]] site.

## Key Facts

- **Version:** 2.4
- **Stages:** IDY (00) -> CRD (01) -> STR (02) -> OFR (03) -> OUT (04) -> SLS (05) -> DEL (06) -> RET (07) -> OPT (08)
- **Stage count:** 9 (plus Patch Plan sub-stages 00A and 01B)
- **Layers:** Think (IDY/CRD/STR/OFR), Execute (OUT/SLS/DEL/RET), Reckon (OPT)
- **Core paradigm:** Direct-Injection Auto-Sequence for truth-safe business formation
- **Source priority:** Stage Canon Index (highest) > Master Operating Protocol
- **UI components:** BbosFullDashboard (unified stage view + Two-Factory tabs + Assembly Gate + StageScoreCard), BbosTaskPanel (stage tasks), BbosRoleBadge, BbosRolePicker. Stage navigation is provided by the shared `LevelNavigator` (with `gateIndicators` prop for 00A/01B patch stages) — there is no dedicated `BbosPipelineHeader` component.
- **Integration:** Module within [[milos]] at `src/components/bbos/`
- **Marketing:** Landing page at `website/bbos/` on [[ogden-hub]]
- **Governing philosophy:** [[covenant-architecture]]

## Architecture — Two-Factory Model

Every stage operates through a dual-factory architecture:

1. **Research Factory** — Synthesizes raw inputs into S-outputs (S1 through S5/S6) that define the strategic landscape for that stage. This is the analytical engine. Task prefixes: S, V, FP.
2. **Asset Factory** — Converts approved research into the final Asset Pack. The Asset Factory is gated: AI is forbidden from running it until the operator explicitly triggers the **Assembly Gate** by typing `ASSEMBLE`. Task prefixes: A, AF, IC.

This separation enforces operator sovereignty over all deliverables. The AI researches and recommends; the operator decides when to crystallize output into assets.

## 9-Stage Covenant Pipeline

| Stage | Code | Label | Layer | Governing Attrs | Purpose |
|---|---|---|---|---|---|
| 00 | IDY | Identity     | Think   | Al-Awwal · Al-Badi          | Establish the foundational identity, mission, and values of the business. |
| 01 | CRD | Credibility  | Think   | Al-Mu'min · Al-Wakil        | Build credibility and the trust infrastructure for the offering. (Includes the qualification ethics gate / Amanah Proof Audit.) |
| 02 | STR | Structure    | Think   | Al-Musawwir · Al-Mudabbir   | Design the operational structure, processes, and team architecture. |
| 03 | OFR | Offering     | Think   | Ar-Razzaq · Al-Karim        | Define and price the service offering with clarity and integrity; produce the frozen OFR Scope Map. |
| 04 | OUT | Reach        | Execute | Al-Hadi · An-Nur            | Reach the right people through ethical, purposeful outreach. |
| 05 | SLS | Convert      | Execute | As-Sami · Al-Basir          | Convert interest into commitment through honest, consultative selling. |
| 06 | DEL | Deliver      | Execute | Al-Muhsin · Al-Latif        | Deliver the promised outcome with excellence and care. |
| 07 | RET | Retain       | Execute | Al-Wadud · Al-Hafiz         | Retain clients through ongoing value, relationship, and stewardship. |
| 08 | OPT | Reckon       | Reckon  | Al-Hasib · Al-Khabir        | Reckon with outcomes, optimize systems, and prepare for the next cycle. |

### Patch Plan Sub-Stages

- **Stage 00A — Input Integrity Gate:** Grades operator proof on a P0-P3 scale before pipeline entry. Renders as a diamond ◆ between IDY and CRD in `LevelNavigator`.
- **Stage 01B — Mechanism Factory:** Bridges the strategy-to-offer gap, ensuring STR outputs translate cleanly into OFR inputs. Renders as a diamond ◆ between STR and OFR.

## Critical Business Rules (Non-Negotiables)

- **Sequence Strictness:** No stages may be skipped. Linear progression IDY through OPT is enforced.
- **Truth-Gate (G-Labeling):** Every result claim must carry a G1-G4 evidence grade label.
- **Assembly Gate:** AI is forbidden from running the Asset Factory until the operator types `ASSEMBLE`.
- **No External Assumptions:** The system cannot invent operator capabilities, credentials, or resources.
- **Verbatim Extraction:** Voice-of-Customer (VoC) language is extracted directly from sources and never paraphrased.
- **Scarcity Verification:** All urgency claims must be tied to documented real-world constraints.
- **Scope Integrity:** Outreach and sales materials cannot reference anything outside the frozen OFR Scope Map.

## Key Constraints

- **Regulatory Hard Stops:** Pipeline halts if regulatory compliance issues are identified.
- **Operator Strategic Constraints:** Hours available, financial runway, and existing assets bound what the pipeline can propose.
- **Amanah Proof Audit:** [[amanah-gate]] screens for riba, gharar, and covenant alignment at the CRD (Credibility) stage qualification check.

## Current Status

Pipeline UI fully aligned with v2.4 protocol as of Sprint 7 (2026-04-11), with final protocol gaps closed on 2026-04-15, and the canonical stage code rename (FND/TRU/SAL/DLR → IDY/CRD/SLS/DEL) completed on 2026-04-25 to converge code, marketing, and wiki canon. Two-Factory visual split implemented: Research Factory (S/V/FP prefixes) and Asset Factory (A/AF/IC) render as Groundwork/Workshop tabs with slide transitions. Assembly Gate bar renders both LOCKED (amber ⏳) and CLEARED (green ✅) states based on Research task completion; auto-clears when all Research tasks are Done; Asset tasks get viewOnly when locked. G-Label picker shows G1-G4 descriptions inline; GLabelBadge now also renders on BbosFullDashboard task cards (colored badge when assigned, static "G" placeholder when unassigned). Patch Plan sub-stages (00A Input Integrity Gate, 01B Mechanism Factory) shown as inline diamond ◆ indicators between LevelNavigator segments — 3 states: pending (gray), in-progress (amber), complete (green), derived from parent stage completion. Dynamic scoring via StageScoreCard (5 signals × 5 pts → % → verdict). Role-based access via BbosRoleBadge and BbosRolePicker. Marketing section live on [[ogden-hub]].

**DashboardTaskCard** (`src/components/shared/DashboardTaskCard.jsx`) — unified card component used by both BbosFullDashboard and PillarLevelDashboard. Whole card is clickable; dynamically renders subtask bars, field progress, due dates, tags, purpose text, and BBOS custom renderers via children prop.

**Audit system:** Project Audit cards across all dashboards now use a 3-star scale (was 5-star). BBOS `renderStars(score, max=3)` with explicit `max=5` for StageScoreCard.

**IDY stage IFB tasks removed:** IDY-IFB-S1 through IDY-IFB-S5 ("IFB Forms" group) removed from `bbos-task-definitions.js` and `bbos-role-access.js` — backend admin tasks not relevant to operators.

## Connections

- [[milos]] — Host application; BBOS is a module at `src/components/bbos/`
- [[ogden-hub]] — Marketing landing page at `website/bbos/`
- [[amanah-gate]] — Ethical screening gate; Amanah Proof Audit at the CRD qualification stage
- [[covenant-architecture]] — Structural philosophy governing the pipeline; truth-safe covenant enforcement
- [[maqasid-al-shariah]] — Jurisprudential grounding for stage definitions and screening criteria
- [[ceremony-gate-pattern]] — UI pattern used for stage transitions and Assembly Gate
- [[graphify]] — Pipeline structure mapped in the knowledge graph

## Open Questions

- Will BBOS support multiple concurrent pipelines (multiple businesses per operator)? *(deferred — see [decision: bbos-multi-pipeline-deferred](../decisions/2026-04-25-bbos-multi-pipeline-deferred.md). Schema migration scoped for a dedicated future session.)*

### Resolved (2026-04-25)
- ~~Stage code drift across code/marketing/wiki~~ — Single canonical model adopted: IDY/CRD/STR/OFR/OUT/SLS/DEL/RET/OPT. Code, marketing, and wiki now agree.
- ~~Stale BbosPipelineHeader reference~~ — Confirmed removed; key UI components list updated to reference shared `LevelNavigator`.
- ~~Amanah Proof Audit rejection / off-ramp flow~~ — Implemented at CRD stage. `BBOS_REJECTION_REASONS` (riba, gharar, capability_gap, regulatory, withdrawal) defined in `bbos-pipeline.js`. `rejectBbosPipeline` / `unrejectBbosPipeline` actions in `project-store.js` set `rejectedAt` / `rejectionReason` / `rejectedBy`. `advanceBbosStage` guards against rejected pipelines. `BbosFullDashboard` renders a red rejection banner with Resume action; reject button visible only at CRD stage to roles holding `O` access on `CRD-V1` (OW/ST). Verified end-to-end in preview.
- ~~00A/01B dedicated task definitions~~ — `IDY-PATCH-V1` (Input Integrity Gate, 6 fields incl. capitalProofTier/skillsProofTier/gateVerdict) and `STR-PATCH-V1` (Mechanism Factory, 5 fields incl. valueMechanism/bridgeVerdict) added to `bbos-task-definitions.js` with role access in `bbos-role-access.js`. `PATCH` prefix added to `RESEARCH_PREFIXES` so patch tasks gate Asset factory unlock.

### Resolved (2026-04-15)
- ~~Patch Plan sub-stages in stage nav~~ — 00A and 01B shown as inline diamond indicators between LevelNavigator segments via `gateIndicators` prop; data in `BBOS_PATCH_STAGES` array
- ~~Assembly Gate CLEARED state~~ — Both LOCKED and CLEARED states now render (was only LOCKED)
- ~~G-Label badge on dashboard cards~~ — GLabelBadge renders on BbosFullDashboard task cards when a G-Label is assigned

### Resolved (Sprint 7, 2026-04-11)
- ~~Two-Factory UI~~ — Implemented: Research/Asset factory sections as Groundwork/Workshop tabs
- ~~G-Labeling in UI~~ — G-Label picker now shows G1-G4 descriptions; GLabelBadge displays assigned label
- ~~Assembly Gate UI~~ — Rendered as a status bar (CLEARED/LOCKED), not ASSEMBLE command — Asset tasks lock when Research incomplete

## History

| Date | Event |
|---|---|
| 2026-04-25 | Pre-live-test hardening Phase 5 — Amanah rejection flow + Patch sub-stage tasks. Added `BBOS_REJECTION_REASONS` constant + `rejectBbosPipeline` / `unrejectBbosPipeline` store actions; `BbosFullDashboard` shows reject button at CRD, rejection banner across all stages, and blocks `advanceBbosStage` when rejected. Added `IDY-PATCH-V1` and `STR-PATCH-V1` task definitions (role-gated to OW/ST), wired `PATCH` into `RESEARCH_PREFIXES` so they participate in the Assembly Gate. Multi-pipeline support (Q2) deferred — see decision record. |
| 2026-04-25 | Pre-live-test hardening pass. Renamed legacy stage codes to canonical v2.4 codes across code, marketing, and wiki: FND→IDY, TRU→CRD, SAL→SLS, DLR→DEL. Resolves the three-way canonicality drift between code (FND/TRU/SAL/DLR), marketing (INT/QAL/SAL/DLR), and the prior wiki claim (PRE/STR/OFR/OUT/SAL/FUL/RET/OPT — 8-stage). The 9-stage model in code is the single source of truth. Fixed stale `BbosPipelineHeader` reference in key UI components list. |
| 2026-04-15 | Closed 3 remaining UI/Protocol gaps from system report §11.4: (1) Assembly Gate CLEARED state rendering, (2) GLabelBadge on BbosFullDashboard task cards, (3) 00A/01B patch stage inline diamond indicators in LevelNavigator via `gateIndicators` prop and `BBOS_PATCH_STAGES` data. Fixed stale CONTEXT.md reference to non-existent BbosPipelineHeader.jsx. |
| 2026-04-11 | Consolidated all per-stage dashboards into unified `BbosFullDashboard.jsx`, then extended dynamic scoring (5 signals × 5 pts → % → verdict) to all stages via `StageScoreCard`, restoring the prior CRD-stage (then-named TRU) scoring that was lost during initial consolidation. STR / OFR / OUT signals defined; CRD-AF5 ProofAuditRenderer renders graduated stars for known rating strings. Verdicts: ≥75% QUALIFIED, ≥50% DEVELOPING, ≥25% REVIEW NEEDED, <25% BLOCKED. File: `src/components/bbos/BbosFullDashboard.jsx`. |
| 2026-04-11 | Task card color coding fixed: `--active` now uses amber (`--pri-high`) not teal primary; status detection switched from `completedAt` (always null) to `columnId === doneColumnId`. Stage tabs now show same color system via `stageStatusMap` prop from `ProjectBoard`. Auto-advance to "In Progress" added in `BbosTaskPanel.jsx` — fires on field data entry, AI draft population, and template import. |
| 2026-04-11 | UI polish: unified DashboardTaskCard shared component (whole card clickable, dynamic features); 3-star audit system across all dashboards; CSS consistency pass (padding 20px, star gap 2px, opacity 0.2); removed IFB Forms task group; removed empty card message box from BBOS cards; Tasks page (`/work/:id/tasks`) generic dashboard updated to 3-star. |
| 2026-04-11 | Sprint 7 audit remediation: Two-Factory visual split with Research (S/V/FP) and Asset (A/AF/IC) factory sections (#32A). Assembly Gate bar — CLEARED/LOCKED based on Research completion (#32B). G-Label descriptions added to picker dropdown (#32C). Sub-stage progress indicators (✓/◐/○) in pipeline header (#32D). Mobile breadcrumb visibility fix (#33). |
| 2026-04-09 | Wiki entity page bootstrapped. Pipeline integrated into maqasid-os with header, task panel, role badge, and role picker components. Marketing section live on ogden-hub. Initial canon ingested from NotebookLM extraction (notebook `84220e85`); the 8-stage PRE/STR/OFR/OUT/SAL/FUL/RET/OPT model recorded that day was superseded on 2026-04-25 by the 9-stage code-aligned canon. |
