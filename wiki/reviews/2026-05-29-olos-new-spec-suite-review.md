---
title: "OLOS New Spec Suite Review — 27 docs (per-doc summary + alignment audit + critique)"
type: review
date: 2026-05-29
status: complete
tags: [olos, atlas, spec-review, plan, act, observe, wizard, catalogues, terminology, decisions-queue]
superseded_by: null
---

# OLOS New Spec Suite Review — 27 docs (per-doc summary + alignment audit + critique)

**Source folder:** `C:\Users\MY OWN AXIS\Documents\OLOS New Spec docs\` (27 .docx files)
**Reviewer:** Claude Code (this session)
**Read in full or sampled:** Handoff Index v1.1 (full); 4 stage UX specs v1.1 (full); 5 pipeline/wizard/sync specs v1.0–v1.1 (full); 4 foundation specs v1.0–v1.4 (full + v1↔v1.2 diff); 13 objective catalogues v1.0–v1.3 (sampled, first ~120 lines each + cross-cutting comparison).
**Purpose:** Establish what the new spec suite proposes, where it converges with vs. diverges from the in-flight atlas code, and what architectural decisions still need ratification before further build work compounds.

---

## 1. Executive summary

### 1.1 The OLOS thesis (Handoff Index §1.1, verbatim ceiling)

OLOS is "the full operating system for regenerative land development. Its success
is measured by whether it can independently guide a project through observation,
design, phased implementation, daily management, ecological monitoring, and
adaptive stewardship at the complexity level of Apricot Lane Farms — without
requiring external project management systems or personnel to hold the work
together." Apricot Lane is the **quantitative ceiling** the spec commits to: a
multi-enterprise regenerative farm at ~50,000+ ha scale must be runnable in OLOS
end-to-end without external scaffolding. Every architectural choice in this
spec drop is best read against that benchmark.

### 1.2 The spiral cycle

The spec re-frames OLOS's lifecycle from a one-time sequence into a **spiral
that repeats**. Plan is the entry point for every new project and every new
cycle; Plan → Act → Observe is one revolution; Observe deltas trigger Plan
revision; a new cycle begins. Every data point — every Plan decision, Act task,
Observe record — carries a `cycle_id`. The data substrate for the spiral is
the load-bearing engineering commitment of the suite; without it, Plan
revisions can't be tied back to the cycle they revise.

### 1.3 Headline finding — atlas is *converging*, not diverging

Going into this review I expected to find a large delta between the new spec
and the current atlas code. The opposite is true. Of the 14 architectural
items the spec ratifies, atlas already ships **6 fully aligned**, has **6 in
flight**, and only **2 are unrepresented** (Plan output 7-value enum;
Notification Architecture). The in-flight refactor work (16 universal domains,
Plan Tier shell, FieldAction surface, Plan Impact Flags, Plan Revision Banner,
Project Home, offline sync queue, cycle substrate for Observe and WorkItem) is
*precisely* what the spec presupposes. The biggest disposition the spec forces
is **the spiral framing itself** — and that is largely a posture and
data-model decision rather than a UI rewrite.

| Item | Code state | Spec state | Disposition |
|---|---|---|---|
| 3-stage IA (Observe / Plan / Act) | Shipped — TanStack routes + sidebar labels | Same naming, same 3 stages | Aligned |
| 16 universal domains | Shipped — shared enum, 41 v3 imports | Same 16 (domain = tag) | Aligned |
| FieldAction terminology | Shipped — `FieldAction` schema, 318 occurrences | Same — "Field Actions" replaces "Tasks" | Aligned |
| Plan Impact Flags + Revision Banner | Shipped — `planImpactFlag.ts` + `PlanRevisionBanner.tsx` + 3-tier priority | Same 3-tier (Critical / High / Informational) | Aligned |
| Project Home + Portfolio | Shipped — `PerProjectHomePage`, `PortfolioHomePage` | Spec is absent from this drop but Project Home is built | Aligned |
| Offline sync queue | Shipped — `syncQueue.ts` single FIFO failure-retry queue (IndexedDB) + `blobSync.ts` versioned-blobs + circuit breaker | 5-tier priority queue with divergence-priority | **Spec ahead — verified 2026-05-29: not implemented (FIFO, no tiers/gate); build deferred to ADR 2 + ADR 7** |
| Plan 7-tier objective graph | In-flight — `planTierObjective.schema.ts` + 7-tier seed but content authoring incomplete | T0–T6 dependency graph, ~16 universal + per-type objectives | Partial / in-flight |
| `feedsInto` field | In-flight — exists on `PlanDecisionChecklistItem`, rendered as chips | Drive Plan detail-panel tags AND cyclical Review-tag mechanism | Partial (cyclical wiring not done) |
| Cycle / `cycle_id` substrate | In-flight — Observe + WorkItem carry it; FieldAction does NOT | Every data point carries `cycle_id` | Partial (FieldAction missing) |
| Act map-first surface | In-flight — View A / View B exist; map-first is a throwaway prototype (`/act/tier-prototype`) | Map fills viewport; View A/B float as bottom-sheets/side-panels | Partial (live is rail-with-map, not map-first) |
| Project Creation Wizard | In-flight — 3 steps + walk-the-boundary GPS shipped; project-type taxonomy missing | 3 steps (Site / Vision-Capacity-Type / Team); 12-type primary + 13th secondary | Partial (type taxonomy gap) |
| Cyclical Review Mode (Plan side) | Not started — Plan Review exists for impact-flag triage, not cycle review | Soft gates on completed tiers; Review tags per item | Divergent |
| **Plan output 7-value enum** | **Not started** — only 4-state completion status (`locked\|available\|active\|complete`) | Approved for Act / Conditionally Approved / Needs More Observation / Needs Professional Review / Redesign Required / Deferred / Rejected | **Divergent** |
| **Notification Architecture** | **Not started** — no notification store, no queue | Spec referenced but absent from this drop; needed for verifier alerts + Plan revision pushes | **Divergent** |

### 1.4 Genuine gaps (what the spec exposes)

1. **Plan output is a 7-value approval enum**, not a 4-state completion status. Plan Tier objectives in code today don't carry approval gates that tell Act what it can launch. (ADR queued.)
2. **`cycle_id` propagation is incomplete** — Observe and WorkItem carry it; FieldAction does not. Without it the spiral closes in Observe but never in Act. (ADR queued.)
3. **Cyclical Review Mode is not a feature today** — atlas has Plan Reviews for impact-flag triage but no per-tier cycle-review mode with soft gates and per-checklist-item Review tags. (ADR queued.)
4. **Project-type taxonomy is not enumerated in shared code** — wizard collects a type field but the canonical 12-primary + 1-secondary roster, the relationship matrix, and the design-tension list (10 entries, Secondary Layer v1.2) are not in the data model. (ADR queued.)
5. **Map-first Act is a prototype, not the live surface** — `/act/tier-prototype` is throwaway; the shipping `/act/field-action` is rail-with-map. (ADR queued.)
6. **Notification Architecture spec is absent and not built** — verifier alerts, Plan revision pushes, and offline-sync events all need a notification substrate the spec presupposes. (Decision deferred.)

### 1.5 Absent specs (per Handoff Index)

The Handoff Index v1.1 catalogues **6 UX specs**; this drop contains **4**. Absent:
- **Project Home Spec** — referenced by Plan Nav (top-level "Next Up") and Field Actions (project-level Next Up card). **Not blocking**: per-project home is already built (`PerProjectHomePage`, Slices 5.3 + 5.4 + 5.5a).
- **Notification Architecture Spec** — referenced by Field Actions (verifier alerts), Observe (banner triggers), and Offline Sync (sync-event pushes). **Blocking**: no substrate in code.

### 1.6 Decisions the operator needs to make next

Listed in the **decisions queue** (§5). Twelve ADR stubs filed in
`wiki/decisions/2026-05-29-atlas-spec-*.md`; user decides each.

---

## 2. The 27 documents

### 2.1 OLOS_Spec_Suite_Handoff_Index_v1.1 (already extracted in prior session)

Reading-order + decision-register + build-sequence index for the suite. Asserts: (a) OLOS thesis + Apricot Lane ceiling (§1.1); (b) three-stage spiral cycle with Plan as entry point (§1.2); (c) five capabilities OLOS must provide (§1.3); (d) catalogue of 6 UX specs (§2); (e) ratified architectural decisions, binding (§3); (f) methodology terminology rename table — display labels become "Decisions / Field Actions / Observe" with internal IDs stable (§3b); (g) 19-edge cross-spec dependency map (§4); (h) 6-phase build sequence with Phase 1 (Auth + Wizard + Plan Tiers 0-2, <10 min create-to-first-survey) as make-or-break (§5); (i) 6 deferred engineering questions (§6). The Handoff Index is the canonical entry point; all other docs cite back to it.

### 2.2 Stage UX specs (4)

#### `OLOS_Plan_Navigation_Spec_v1.1` — Plan Command Center shell
Three-panel desktop surface (210 / flex / 300 px) organising 7 dependency-gated tiers (T0–T6, T3 = "Foundation Decisions" — cycle-neutral). Two-mode gates: hard on initial completion, soft on cyclical review. Locked-tier interaction is informative-not-punitive (amber bypass popover, never red). Plan output is a **7-value enum** (Approved for Act / Conditionally Approved / Needs More Observation / Needs Professional Review / Redesign Required / Deferred / Rejected); Act only receives Approved or Conditionally Approved; status is computed, not steward-set. Cycle transition is explicit-action-only (never automatic); resets `review_status` to null; increments `cycle_id`. Footer CTA: "Launch Field Actions Center" (outlined, not filled). Detail panel in review mode adds an OBSERVE UPDATES section (2b between MAP ACTIVATION and YOUR DECISIONS). Tier-unlock celebration banner. Land methodology aesthetic — Lora serif for objective titles. Stage pills use display labels "Decisions / Field Actions / Observe" but internal IDs remain `plan / act / observe`. Tier 6 covers project cost/budget tracking; **capital formation, financing, yield-share are excluded** and fall under Sub-project C (Scholar Council gated).

#### `OLOS_Field_Actions_Center_Spec_v1.1` — Act execution surface (current rename)
Mobile-first, map-first; map fills viewport, View A (objective execution) / View B (all-tasks dashboard) float as bottom-sheets (mobile) or side-panels (tablet/desktop). View B is default entry; View A is drill-down. Survey vs implementation tasks identical in UI; differentiation is data-layer only. "Submitted ≠ Verified" in review mode — only verified tasks feed Observe. **Divergence is first-class, not an error state** — "Reality diverges" available on every task regardless of status, no confirmation dialog; divergence evidence routes to Observe unconditionally + immediately; Plan revision happens in Plan, never in Act. Local-first proof model. Per-category minimum proof schemas. GPS walk threshold 15m hdop; offline tile cache 500m buffer around site boundary. Drawing tool table + GPS walk pause/stop semantics + proof pin types are bundled in §5.4 (the "Act map view" section, which the Act Command Center sibling spec out-of-scopes).

#### `OLOS_Observe_Dashboard_Spec_v1.1` — read-only intelligence layer
Three layered surfaces: Unified Land State → Domain Detail Views → Temporal Layer. Read-only; populated **exclusively by verified Act tasks and divergence evidence**. **No health scores, no traffic-light ratings, no aggregated wellness indices** — counts only; evaluation belongs in Plan. Two audiences: project steward (full) vs external stakeholder (Presentation mode strips internal state). Plan revision banner has 3 priority tiers (Critical / High / Informational) with explicit dismissibility. Change-threshold table (§3.6) gives Informational/High numeric thresholds per measurement type (soil pH, soil moisture, infiltration, slope, water flow Hausdorff distance, etc.) with WHO/FAO citations for water-quality. Cycles created only by explicit steward action. Observe data never edited from within Observe; corrections require a new verified Act task that supersedes prior data point. Supersession radius default 10m; "Not a replacement" override restores prior.

#### `OLOS_Act_Command_Center_Spec_v1.1` — pre-rename sibling (mid-rename divergent state)
Explicitly labelled "Act Command Center UX Spec v1.1 — Supersedes v1.0." Adds three load-bearing data-model commitments that Field Actions Center spec lacks: `source_objective_type` enum (`universal | primary | secondary`), `source_secondary_id`, `generates_observe_data` flag with `observe_domain_ids[]`, and an expanded 4-value `task_type` enum (`field_survey | monitoring_task | implementation_task | administrative_task` — vs Field Actions Center's `survey|implementation`). Source-tag pill system rendered throughout View B and View A (teal Universal / green Primary / amber Secondary). Companion docs reference Act→Observe Ingestion Pipeline + Offline Sync + Notification Architecture. **Out-of-scopes the Act map view**, which Field Actions Center bundles in §5.4.

**§2.2 reconciliation:** The two specs are mid-rename divergent siblings, not pure duplicates. Field Actions Center has the map view + verifier UX + Observe-feed-table. Act Command Center has the source-tagging data model + 4-value task type + companion-spec wiring. Neither standalone is complete. CTA label is also inconsistent — Plan spec + Field Actions spec say "Launch Field Actions Center"; Act Command Center says "Launch Act Command Center." Recommendation: treat Act Command Center as the authoritative data model, Field Actions Center as the authoritative map+verifier UX, and reconcile to the "Field Actions Center" name per Handoff Index §3b.

### 2.3 Pipeline + Wizard + Engineering (5)

#### `OLOS_Project_Creation_Wizard_Spec_v1.1` — three-step intake
Site / Vision-Capacity-Type / Team. Project type is the only required field beyond site boundary + project name; **"no objective catalogue loads without it"**. Skip-forward-complete-later: every non-required field becomes an open Tier 0 checklist item in Plan. Spatial-first: Step 1 is map-dominant; project record persists at Step 1 (not wizard end), enabling Portfolio "draft" recovery. Walk-the-boundary GPS mandatory on mobile, offline-capable. Design-tension acknowledgement (10 tensions per Secondary Layer v1.2) is advisory — steward acknowledges, timestamped, re-fires if a removed-then-re-selected combination still triggers. **Tier 0 objective loading is atomic on wizard completion** — 19 universal + primary-type + secondary-type objectives load in one transaction. 12 primary project types enumerated; Residential is the 13th, secondary-only. 30-day draft expiry, day-23 warning email, day-30 deletion. Does **not** itself claim the Handoff Index's "<10 min create-to-first-survey" baseline — the closest commitment is "single session" and "exactly three steps."

#### `OLOS_Offline_Sync_Spec_v1.0` — IndexedDB substrate
Dual-track sync: Track 1 = structured data, Track 2 = photo blobs (Track 2 begins only after Track 1 confirmed). 5-tier priority queue: 1. Divergence (highest) → 2. Baseline survey → 3. Non-baseline survey → 4. Monitoring proof → 5. Implementation proof. Divergence priority is unconditional — priority-1 records sync before all other queued items "regardless of created_at order." Last-write-wins on conflict (later `observed_at` wins; tie → server). Single-steward assumption justifies last-write-wins; multi-user merge UI deferred. Heartbeat-confirmed online state (`GET /api/health` succeeds before transitioning online — `navigator.onLine` alone insufficient). `required_handoff_fields` validated locally before queue entry — partial surveys cannot be queued. IndexedDB schema: `sync_queue / draft_records / photo_queue / sync_log / failed_records`. Retry: timeouts + 5xx → exponential backoff (30s, 2m, 10m), max 3; 4xx → no auto-retry, steward action. 500KB chunking with `survey_session_id` server-reassembly. **Internal contradiction**: §3.3 schema says priority is 1–4, §5 enumerates 1–5; the 5-tier list is canonical.

#### `OLOS_Observe_Plan_Baseline_Mapping_Spec_v1.0` — Plan T1/T2 survey → Observe seeding
Defines how Plan Tier 1 and Tier 2 survey objectives produce `field_survey` Act tasks that, on verification, seed Observe domains with baseline data points. New `source_type` value `plan_survey_baseline`; new Act `task_type` `field_survey`; reserved `cycle_id: "baseline"` (sorts before all numbered cycles, immutable, displayed as "Baseline Survey" NOT "Cycle 0"). **Plan objective completion ≠ Observe seeding** — only Act task verification triggers seeding. Hard verification gate: missing `required_handoff_fields` blocks task verification with a named error. No merge/dedup when multiple field_survey tasks seed the same domain. Community & Social Fabric domain has no Plan survey source — starts empty, renders "Not yet observed" (not a pipeline error). 29 canonical Plan-survey → Observe-domain mappings enumerated by project type, each with `required_handoff_fields` list (e.g., terrain survey requires `topographic_map_url + slope_percent_by_zone + elevation_range_m + erosion_zones_geojson`).

#### `OLOS_Observe_Act_Ingestion_Pipeline_Spec_v1.0` — Act → Observe (non-baseline)
Two architecturally distinct paths: Path 1 = `task_verified` for tasks with `generates_observe_data: true`; Path 2 = `divergence_submitted` (immediate + unconditional). Divergence records carry `is_superseded: false` permanently. Hard gate: verification blocked at API level if `data_points[]` empty on a `generates_observe_data: true` task. Supersession automatic on (same domain_id + same location_geometry + same data_type); site-wide measurements supersede on data_type alone; different locations never supersede; steward "Not a replacement" override prevents supersession. Cycle assignment immutable. Freshness re-evaluation + Plan-revision-trigger evaluation are synchronous with ingestion (same request cycle). Multi-domain fanout: one data point record per domain_id (data_type + value identical, domain_id differs). Administrative tasks never generate Observe data.

#### `OLOS_Observe_Pipeline_Handoff_Index_v1.0` — reading order + risk register
Mandated reading order: (0) Observe Dashboard v1.1 → (1) Domain Catalogue → (2) Baseline Mapping → (3) Act→Observe Ingestion. 8-phase implementation sequence. Build this after Plan objective loader and Act proof schema stable. 15 domains = 6 universal + 9 conditional. **5 named critical implementation flags** (verbatim risks): supersession atomicity (highest risk — dedicated integration test), divergence permanence (data-layer enforcement not UI-only), hard gate on `data_points[]` (API-level), Community & Social Fabric starts empty (not an error), Temporal Layer baseline display gap (deferred to Observe Dashboard v1.1; "do not invent a solution").

### 2.4 Foundation specs (4 + diff)

#### `OLOS_Catalogue_Authoring_Standards_v1.4` — 10 authoring principles
Each principle is empirically derived from a real authoring decision; every "Origin" row traces back to a validation site (Apricot Lane, Ecovillage, Conservation, Residential). P1 — concrete deliverable, not a decision (gate must require evidence work was done). P2 — Tier 3 decides, Tier 4 designs. P3 — graduation rule (handoff exists or >5 items). P4 — parallel must be explicitly declared in planning question of both objectives. P5 — historical + landscape context mandatory Tier 1. P6 — ecological readiness gates enterprise launch (Apricot Lane: soil → orchard → livestock). P7 — drinking-water contamination Tier 1 for inhabited projects. P8 — public-facing types require external-relations objective Tier 5. P9 — adaptive management Tier 6 (Off-Grid exception: Tier 5). P10 — safeguarding precedes programme for vulnerable-guest types. **Numbering anomaly**: subtitle says "six principles" but lists ten; P8/P9 out of order in body; footer reads v1.0 despite header v1.4.

#### `OLOS_Catalogue_Authoring_Decision_Tree_v1.0` — companion matrix
Application matrix: 12 project types × 10 principles, with 4 symbols (Always / Conditional / Documented exception / N/A). P1–P5 always apply to every project type — irreducible authoring floor. Conditional principles routed by trigger questions (Q1 → P7 drinking water; Q2 → P8 external relations; Q3 → P10 safeguarding; Q4 → P2 decide/design split; Q5 → P4 parallel declaration). Off-Grid carries the only documented exception (◆ on P9 — adaptive management Tier 5 not Tier 6, because life-safety systems are inseparable from design). Q1/Q2 trigger boxes contain stale principle numbers ("P5"/"P6") — copy-paste artefacts from earlier draft. **Residential / Live-In Stewardship absent from this 12-type matrix** despite being the trigger for P7 — predates Secondary Layer v1.2.

#### `OLOS_Project_Type_Secondary_Layer_Spec_v1` — initial type roster
12 project types; secondary classification is a property of the secondary type alone (Silvopasture = modifying everywhere). 5 design tensions, no resolution tier. Modifying mechanism hand-waved ("expand scope or checklist content"). No universal objective set enumerated. Project recipe = exactly one primary + zero-or-more secondaries; no upper limit on secondaries. Regen Farm carries no special parent-template behaviour (its breadth comes entirely from secondaries selected). Mid-project secondary addition runs a delta computation; secondary removal blocked if any delta objective is started/complete (option: mark deferred). All config changes append-only versioned.

#### `OLOS_Project_Type_Secondary_Layer_Spec_v1.2` — major correction
13 project types (adds Residential / Live-In Stewardship, secondary-only). **16 universal objectives enumerated** across all 7 tiers — present in every project regardless of type, cannot be removed by config. Tier 0 parallelism rule: Boundaries + Stakeholders parallelisable, gated by Vision. Completion-output flexibility: universal objectives accommodate type variation via valid completion outputs (e.g., "mains supply confirmed — harvesting not required") rather than per-type forking. **Secondary classification is a property of the primary-secondary PAIR, not of the secondary type alone** — Silvopasture is modifying on Homestead but additive on Ecovillage. Canonical 8×12 relationship matrix added. Patch-record model introduced: modifying secondaries inject items into existing primary objective checklists via patch records with `inject_after_item_id`, `items[]` (with `is_methodology` and `feeds_into` per item), `source_secondary_id`, optional `completion_gate_amendment`. Reopening behaviour: adding a secondary post-completion that patches a complete objective reverts it to active — **named modal alert required, never a badge or silent state change**. 10 design tensions (up from 5) with explicit resolution tiers.

#### `Project_Type_Secondary_Layer_Spec v1 → v1.2 — diff`
Section additions: new §4 Universal objective set, new §5 Classification key + Relationship matrix, new §7 Modifying secondary mechanism (patch records, reopening UX, completion gate amendments). Project type 13 added. Design tensions doubled (5→10) with per-tension resolution tiers. **Net intent**: close the secondary-classification correctness gap (v1 would silently load Silvopasture-as-additive onto a Homestead and skip the water-strategy patch); operationalise the modifying mechanism; encode the universal floor; surface Residential as a first-class secondary. Residual artefacts: "v1.1" title block on v1.2 file; "All 8 tensions are unconditional" sentence with a 10-row table; changelog references v1.1 with no v1.1 file in the folder.

### 2.5 Objective catalogues (13)

| Catalogue | Role | Obj. count | T0 obj | Distinguishing constraint |
|---|---|---|---|---|
| Agritourism v1.1 | Primary or Secondary | 48 (19 + 29) | 6 | Hard gates: regulatory before guest-facing; safety before arrival; booking before marketing. |
| Conservation v1.0 | Primary only | 49 (19 + 30) | 6 | Intervention philosophy gates every T3–T4 decision; 5–25y timescale; "deciding what NOT to do is as important." |
| Ecovillage v1.2 | Primary only | 50 (19 + 29) | 6 | **Most hard-gated catalogue in suite** — habitability threshold, exit protocol legal review, conflict framework signatures, founding-member financial agreement. |
| Education v1.0 | Primary or Secondary | 41 (19 + 22) | 6 | Soft launch pass/fail before full launch; adaptive management Tier 5 (not Tier 6, similar to Off-Grid). |
| Homestead v1.1 | Primary | 34 (19 + 14) | 4 | **Leanest in suite**; only catalogue with explicit conditional loading (Tier 4 animal husbandry loads only if animals confirmed in Tier 0). |
| MarketGarden v1.0 | Primary or Secondary | 43 (19 + 24) | 6 | Growing-system philosophy at Tier 0 gates fertility/pest decisions; post-harvest + market-channel co-design. |
| Nursery v1.0 | Primary or Secondary | 43 (19 + 24) | 6 | Biosecurity registration confirmed before first sale stock. |
| OffGrid v1.0 | Primary only | 46 (19 + 27) | 6 | All life-safety systems dual-source redundancy; documented exception on Principle 9 (adaptive management Tier 5). |
| Orchard v1.0 | Primary or Secondary | 44 (19 + 25) | 6 | Non-refundable tree stock drives 1–2 season lead-time framing. |
| RegenFarm v1.3 | Primary (**anchor**) | 48 (19 + 13 + 16) + 14 patches | 6 | **Architectural anchor** — only catalogue with declared secondary mix + patch records + graduation rule; validated against Apricot Lane. |
| Residential v1.0 | **Secondary-only** | 6 standalone + 4 patch records | 1 | Cannot be the only project type on a project; defines patch-record mechanics that Regen Farm consumes. |
| Silvopasture v1.0 | Primary or Secondary | 45 (19 + 26) | 6 | All infrastructure go/no-go before livestock arrival; stocking buildup tied to monitoring data, not calendar. |
| Wellness v1.0 | Primary or Secondary | 46 (19 + 27) | 7 | Safeguarding before first guest; sensory standards before space occupied; only catalogue with 7 Tier 0 objectives. |

**Cross-cutting:** Structural and terminological consistency is high — all 13 use identical header schema, identical 7-tier numbering, identical Tier 0 framing, identical universal trio at positions 1–3 (Vision/capacity, Site boundaries & legal, Stakeholder map), identical objective field shape (Planning question / Checklist / Completion gate / Act handoff). Terminology is "objectives" everywhere (not "Steps" or "Decisions"); Act handoff packages are named uniformly. Authoring Standards version drift exists (catalogues cite v1.2, v1.3, or v1.4) but is benign. Homestead is notably lean by design; Off-Grid documents a principled deviation; Wellness has 7 Tier 0; Regen Farm + Residential are the architectural pillars (define the secondary + patch-record mechanics that the other 11 conform to).

---

## 3. Cross-cutting alignment audit

### 3.1 Pass A — architectural shifts mapped to current code

Anchored to file paths in atlas/. **Blast radius**: cosmetic (label-only) / refactor (schema or store extension, code-only) / breaking (data migration or contract break). **Direction**: converging (spec aligns with in-flight work) / neutral / divergent (spec contradicts existing direction).

| Shift | Spec position | Current code | Direction | Blast radius |
|---|---|---|---|---|
| Stage IA (3 stages) | Observe / Plan / Act, internal IDs `observe \| plan \| act` | Same — TanStack routes + sidebar; legacy 7-stage retired (memory note `project_lifecycle_retirement` is stale and predates the rename) | Converging | None |
| Spiral cycle framing | Plan first per cycle; Plan → Act → Observe; every data point carries `cycle_id` | Cycle substrate exists for Observe + WorkItem (`packages/shared/src/schemas/observe/cycle.schema.ts`); FieldAction does NOT carry `cycle_id`; route order observe→plan→act is alphabetical, not cycle-direction-bearing | Converging (substrate) / partial (FieldAction) | Refactor |
| Domain = tag, not nav gate | 16 universal domains; primary navigation unit is the objective, domains tag overlays | 16 IDs in `packages/shared/src/constants/universalDomain.ts`; 41 v3 imports; stage-local enums are type aliases of `UniversalDomain`; tier shell mounted under `/plan/tier/$tierId[/objective/$objectiveId]` | Converging | None |
| 7-tier objective graph (Plan) | T0–T6 with `prerequisite_objective_ids[]`, `parallel_with_ids[]`, `checklist_items[]` per objective | `packages/shared/src/schemas/plan/planTierObjective.schema.ts` carries `tierId`, `prerequisiteObjectiveIds`, `parallelGroupId`, `checklist`, `outputKind`, `feedsInto`; content authoring incomplete | Converging | Refactor (content) |
| Plan output 7-value enum | Approved for Act / Conditionally Approved / Needs More Observation / Needs Professional Review / Redesign Required / Deferred / Rejected | `PlanTierObjectiveStatus = locked\|available\|active\|complete` (4-value completion); `PlanReviewDecision` (6-verb triage); **no 7-value approval gate** | **Divergent** | Refactor |
| `feeds_into` field | Per checklist item; drives Plan detail-panel tags AND cyclical Review-tag mechanism | `feedsInto: string[]` on `PlanDecisionChecklistItem`; rendered as chips in `DecisionChecklist.tsx`; cyclical Review-tag wiring not yet | Converging (substrate) / partial (cyclical) | Refactor |
| Act surface (map-first) | Map fills viewport; View A/B float as overlays | Live `/act/field-action` is rail-with-map (`ActFieldActionLayout.tsx`); map-first prototype at `/act/tier-prototype` is throwaway | Partial / **divergent in live** | Refactor |
| FieldAction terminology | "Field Actions" replaces "Tasks" at display | Shipped — `FieldAction` schema, 318 occurrences across atlas; `task` legacy retained only in `WorkItem` (to unwind Phase 7) | Converging | None |
| Catalogue-driven content | Per-project-type catalogues load ~30–50 objectives at wizard completion | Wizard collects project-type field but **canonical 12+1 type roster, relationship matrix, design tensions not in shared code** | **Divergent (substrate gap)** | Refactor |
| Secondary layer plugin | Additive vs modifying secondaries; patch records with `inject_after_item_id` + `source_secondary_id`; reopening modal-alert UX | Patch-record schema absent; classification matrix absent; reopening UX absent | **Divergent** | Refactor |
| Methodology terminology rename | "Decisions / Field Actions / Observe" display labels, internal IDs stable | Sidebar already labels stages "Observe / Plan / Act"; "Decisions / Field Actions" labels not yet applied; methodology stance ("OLOS is a thinking and deciding process, not a task completion process") not yet explicit in copy | Partial / converging | Cosmetic (display labels) / project-wide (audit copy + telemetry) |
| Cyclical Review Mode | Soft gates on completed tiers; per-checklist-item Review tags (amber) on items whose downstream Observe data changed; OBSERVE UPDATES section 2b in detail panel | Plan Reviews exists for impact-flag triage (`PlanReviewsPage.tsx`); no cycle-review mode with soft gates; no per-item Review tags | **Divergent** | Refactor |
| Plan Revision Banner | 3 priority tiers (Critical / High / Informational); change-threshold table; dismissibility rules | `PlanRevisionBanner.tsx` ships 3-tier priority with same headline phrasing; dismissals persisted to `planRevisionDismissalStore`; change thresholds wired via `useRevisionEvents` | Converging | None |
| Offline sync infra | IndexedDB, 5-tier priority queue, divergence-priority, dual-track structured+blob, heartbeat-confirmed online, single-steward last-write-wins | `apps/web/src/lib/syncQueue.ts` (IndexedDB) + `syncService.ts` (circuit breaker) + `blobSync.ts` (binary) + `proofPhotoStore.ts`. **Verified 2026-05-29: 5-tier queue NOT implemented — shipped layer is a single FIFO failure-retry queue (no `priority` field, no divergence gate, no dual-track); records sync as opaque per-project blobs that erase tier. Conflict path diverges from spec LWW (409-surfaced, local not clobbered) — resolved 2026-05-29: ratified as canonical local-preserving LWW (see ADR 12 Amendment); spec §2/§6.1 reconciled to match. `cycle_id` absent from FieldAction.** | Spec ahead of code | Deferred build — depends on ADR 2 (`cycle_id`) + ADR 7 (typed per-record Act sync); see ADR 12 Verification |
| Project Creation Wizard | 3 steps; walk-the-boundary GPS; 12 primary + 13th secondary type roster; tension acknowledgement; atomic Tier 0 load | 3 steps (Site / Vision / Team) + completion screen; walk-the-boundary GPS shipped (`WizardGpsWalkTool.tsx`); project-type roster + tension list missing in shared | Partial / converging | Refactor |
| Project Home | Spec absent from drop; referenced as top-level "Next Up" surface | `PerProjectHomePage.tsx` shipped (Slices 5.3 + 5.4 + 5.5a); `AttentionRail`, `NextUpCard`, `StageStatusRow` composed | Converging — **spec is catch-up documentation, not blocker** | None |
| Notification Architecture | Spec absent from drop; required for verifier alerts + Plan revision pushes + sync events | No `notificationStore`, no `Notification` model; only derived UI urgency surfaces + toasts/banners | **Divergent — true gap** | Refactor |
| Observe Dashboard | 3-surface drilldown (Unified → Domain Detail → Temporal); read-only; no health scores; supersession with "Not a replacement" override; change-threshold table | All three surfaces shipped (`useDomainPoints.ts`, `DomainDetailLayout.tsx`, `CycleAnnotations.tsx`); `dataPoint.schema.ts` carries supersession primitives | Converging | Refactor (supersession override + threshold table) |

### 3.2 Pass B — 6-phase build sequence mapped against atlas code

Phase numbering per Handoff Index §5. For each: what exists / what's partial / what's not started / what the in-flight refactor moves the codebase closer to. **Phase 1 is the make-or-break baseline** — the suite is only as credible as its <10 min create-to-first-survey claim.

#### Phase 1 — Foundation (Auth + Wizard + Plan T0–T2; <10 min create-to-first-survey)
- **Exists:** Auth (project memory `multi-steward-human-context`); Wizard 3-step shell with walk-the-boundary GPS (`apps/web/src/v3/project-wizard/`); Plan tier shell with T0–T6 routes (`/plan/tier/$tierId/objective/$objectiveId`); Stage Zero Vision Builder feeds wizard.
- **Partial:** Plan T0–T2 objective content authored only at fixture-level ("Slice 1.1 — every tier has at least one objective"); per-objective content for the 19 universal + per-type objectives not landed.
- **Not started:** Catalogue load mechanism (no shared 12+1 type roster, no per-type catalogue loader); atomic Tier 0 load transaction; "<10 min" instrumented baseline.
- **Verdict:** Phase 1 is feasibly **2–3 slices away**, dominated by content authoring (catalogues + tier objectives) and the catalogue loader. The infrastructure is in place.

#### Phase 2 — Plan Operation (impact flags, decisions, work packages, Plan→Act handoff)
- **Exists:** Plan Impact Flags (`planImpactFlag.ts` + `PlanReviewsPage` + 6-verb decision set); Plan Decision Log (per ADR `2026-05-25-atlas-plan-decision-log`); Plan Work Packages (`PlanWorkPackagesPage`); Plan→Act data-derived gate (ADR `2026-05-25-atlas-plan-to-act-data-derived-gate`); Plan Revision Banner (3-tier priority).
- **Partial:** Plan output 7-value enum NOT in code (4-value completion only); cyclical Review Mode (soft gates + per-item Review tags) NOT in code.
- **Not started:** "Conditionally Approved" + per-condition tracking.
- **Verdict:** Phase 2 is the **most architecturally converged** phase already — atlas has been building it for 4 weeks. Adding the 7-value approval enum + cyclical Review Mode are the focused gaps.

#### Phase 3 — Field Execution (Act FieldAction + Offline Sync + Divergence)
- **Exists:** FieldAction schema (`fieldAction.schema.ts` with 6-state status + 7 proof types); Offline Sync queue (`syncQueue.ts` IndexedDB + circuit breaker + `blobSync.ts`); DivergenceFlag schema + `DivergenceCaptureForm.tsx` + `RealityDivergesButton.tsx`; View A / View B distinction in `ActFieldActionLayout.tsx`.
- **Partial:** Map-first surface — `/act/tier-prototype` is a prototype, not the live surface (rail-with-map dominates `/act/field-action`). Offline-sync priority queue **verified 2026-05-29: the 5-tier queue is not implemented** — the shipped layer is a single FIFO failure-retry queue with no `priority` field and no divergence gate (see ADR 12 Verification); the 5-tier model is a deferred build tied to this phase's typed-record additions (`cycle_id`, source tags).
- **Not started:** Source-tag pill system (Universal/Primary/Secondary teal/green/amber pills throughout Act); `source_objective_type` + `source_secondary_id` + `generates_observe_data` + `observe_domain_ids[]` fields on Act tasks; expanded 4-value task_type enum (`field_survey | monitoring_task | implementation_task | administrative_task`); `cycle_id` on FieldAction.
- **Verdict:** Phase 3 is **substrate-complete, surface-incomplete**. The data layer needs ~5 schema additions; the map-first surface needs promotion from prototype to live.

#### Phase 4 — Observe Pipeline (Baseline Mapping + Ingestion + Supersession)
- **Exists:** Observe Dashboard (Unified + Domain Detail + Temporal); Cycle substrate; supersession primitives in `dataPoint.schema.ts`.
- **Partial:** `plan_survey_baseline` source_type NOT in code; reserved `cycle_id: "baseline"` NOT in code; 29-row Plan-survey → Observe-domain mapping NOT in code; multi-domain fanout NOT in code; "Not a replacement" override UX NOT in code; change-threshold table from §3.6 NOT in code (banner uses different mechanism).
- **Not started:** Path 1 / Path 2 explicit pipeline split; hard API-level gate on `data_points[]`.
- **Verdict:** Phase 4 needs the **most net-new data-model work** of any phase — both source_types, the baseline cycle reservation, and the 29-row mapping table are new.

#### Phase 5 — Project Home + Portfolio + Notifications
- **Exists:** Per-project Home (`PerProjectHomePage.tsx` Slice 5.4); Portfolio (`PortfolioHomePage` Slice 5.3); role-based access (Slice 5.5a `useMyProjectRoles`).
- **Not started:** Notification Architecture (no spec in this drop, no substrate in code).
- **Verdict:** Project Home + Portfolio are **ahead of the spec** — they shipped before the spec arrived. Notifications are the genuine blocker.

#### Phase 6 — Adaptive Stewardship (cycle transitions, audit, presentation mode)
- **Exists:** Cycle substrate (`cycle.schema.ts` with append-only history); Observe Temporal Layer.
- **Not started:** Explicit cycle transition UX (steward-action-only); Presentation mode (strips internal planning state for external stakeholders); Sub-project D5 (advanced ecological analytics).
- **Verdict:** Phase 6 is **out beyond the current horizon** — adaptive-management content per catalogue exists but the cycle transition + presentation mode surfaces are not yet started.

---

## 4. Critique

### 4.1 Underspecified surfaces

- **Project Home + Notification Architecture absent from drop** (confirmed 2026-05-29). Project Home is functionally moot — already built; the spec is catch-up documentation. **Notification Architecture is a true blocker** — verifier alerts, Plan revision pushes, offline-sync confirmations, divergence escalations all need a substrate that does not exist in code or spec. Recommend treating Notification Architecture as the next missing spec to commission.
- **Act surface has two mid-rename divergent specs** (Field Actions Center + Act Command Center). Neither standalone is complete; together they describe the surface, but the source of truth is ambiguous (data model vs map view).
- **Plan output 7-value enum is named in Plan Nav §4.1 without enumeration of computation rules** beyond "resolution order in §4.1." Section 4.1 wasn't extracted in detail; the resolution algorithm needs lifting into the ADR.

### 4.2 Deferred engineering work (6 questions queued, plus 4 surfaced by review)

The Handoff Index lists 6 deferred questions: tile provider, GPS thresholds (resolved at 15m hdop per Field Actions Center §5.4), offline-sync conflict resolution (now resolved per Offline Sync Spec — last-write-wins + single-steward assumption), max project area, unit handling, cycle ID generation/scoping (now resolved per Act→Observe Ingestion — system-generated integers + display name layer; but display-name persistence location unspecified).

**Additional engineering ADRs surfaced by this review:**
- Cycle ID propagation onto FieldAction (currently missing).
- Source-tag data-model addition to Act task (`source_objective_type`, `source_secondary_id`, `generates_observe_data`, `observe_domain_ids[]`).
- Patch-record schema for modifying secondaries (`inject_after_item_id`, `items[]` with `is_methodology` + `feeds_into`, `source_secondary_id`, `completion_gate_amendment`).
- Project-type taxonomy in shared (12 primary + 1 secondary, relationship matrix, 10 design tensions with resolution tiers).

### 4.3 Scaling / edge-case concerns

- **Apricot Lane ceiling.** A multi-enterprise ~50,000 ha farm hits the deepest combinatorics: 19 universal + Regen Farm primary + 4 declared secondaries (Orchard modifying, Silvopasture modifying, Education additive, Agritourism additive) = ~80+ objectives across 7 tiers; map performance with 80 zones × N patches per zone; offline sync queue under multi-team field load. The substrate supports this on paper; the prototype-to-production gap is real.
- **Homestead 30-objective minimum.** Catalogue ships at 34. If a tier-pruning mechanism is later added (steward marks an objective "Not applicable"), the universal-floor rule needs reconciliation — universal objectives are explicitly "cannot be removed by config" (Secondary Layer v1.2 §4).
- **Supersession atomicity** is flagged as the highest-risk implementation hazard in the Pipeline Handoff Index §5. The spec's mandate "Partial supersession states must not persist" requires transactional semantics on every ingestion; the current Observe ingestion path in atlas does not yet implement supersession at all.
- **Patch-record graduation rule** (Authoring Standards P3) implies a patch that grows beyond 5 items must graduate to a standalone objective. The mechanism for this graduation (manual? automated? warning?) is not specified.
- **Reopening atomicity.** Adding a secondary post-completion that patches a complete objective reverts it to active. With multi-secondary projects, multiple reopens in one wizard action could cascade. The modal alert UX is mandated but the underlying transactional semantics are not.

### 4.4 Terminology rename blast-radius

The methodology rename (Handoff Index §3b) is **not cosmetic** — it is a methodology stance: "OLOS is a thinking and deciding process, not a task completion process." Display labels become **"Decisions / Field Actions / Observe"** with internal IDs stable. Atlas code today:
- Stage labels: "Observe / Plan / Act" in `V3LifecycleSidebar.tsx` — **align with internal IDs**, do not yet apply the "Decisions / Field Actions / Observe" display labels.
- Plan terminology: routes use `/plan/decisions` already (`v3PlanDecisionsRoute`); `PlanDecisionsPage` exists; `planDecision.ts` shared schema exists.
- "Field Action" terminology: dominant in code (318 occurrences). The label rename matches.
- "Task" remains in legacy `WorkItem` schema (to unwind Phase 7); `task_type` field name persists on FieldAction.
- "Checklist" used throughout Plan; spec doesn't rename it.
- Telemetry events: no audit conducted in this review — if telemetry events use "task" / "module" naming, they outlive the rename and need a separate migration ADR.

**Recommendation:** Display-label-first migration (Plan stage shows "Decisions" everywhere user-facing; Act shows "Field Actions"); internal IDs stable; telemetry event names left alone for now but audited as separate slice. Coordinate with any future i18n layer.

### 4.5 Naming / version inconsistencies (low-impact, worth flagging)

- Catalogue Authoring Standards v1.4: subtitle "six principles" but lists ten; P8/P9 out of order; footer reads v1.0.
- Catalogue Authoring Decision Tree v1.0: Q1 trigger box says "P5" (should be P7); Q2 says "P6" (should be P8); Residential absent from 12-type matrix despite being P7 trigger.
- Secondary Layer Spec v1.2: title block says "v1.1"; "All 8 tensions are unconditional" sentence with 10-row table; changelog references v1.1 with no v1.1 file in folder.
- Ecovillage Catalogue v1.2 (filename) / v1.1 (in body status).
- RegenFarm Catalogue v1.3 (filename) / v1.1 (in body status).
- Act Command Center v1.1 + Field Actions Center v1.1: mid-rename divergent siblings as already noted.
- CTA label inconsistency: Plan spec + Field Actions spec say "Launch Field Actions Center"; Act Command Center spec says "Launch Act Command Center."

---

## 5. Decisions queue

All 12 decisions were **ratified by Yousef on 2026-05-29**. Each ADR at `wiki/decisions/2026-05-29-atlas-spec-*.md` now carries `status: Accepted` with a recorded Decision / Rationale / Consequences; the table gives the accepted outcome, the ADR holds the full reasoning.

| # | ADR | Decision (Accepted 2026-05-29) |
|---|---|---|
| 1 | [[2026-05-29-atlas-spec-stage-flow-direction]] — Plan-first spiral cycle vs Observe-first sequence | Ratify the Plan-first spiral as binding doctrine — Plan is the entry point per cycle, one revolution Plan → Act → Observe; the 3-stage IA stays as shipped, no route re-ordering (alphabetical order is cosmetic). |
| 2 | [[2026-05-29-atlas-spec-spiral-cycle-id-propagation]] — `cycle_id` on FieldAction (and propagation contract) | Add `cycle_id` to FieldAction — assigned at creation from the active cycle, immutable, reserved `"baseline"` sorts first; backfill existing records to the **current** cycle (not baseline). |
| 3 | [[2026-05-29-atlas-spec-plan-tiered-objectives]] — 7-tier objective graph as Plan substrate | Adopt the shipped 7-tier graph; retire the legacy 15-module Plan via **incremental per-tier cutover behind a feature flag**, T0–T2 first for the Phase 1 <10-min baseline. |
| 4 | [[2026-05-29-atlas-spec-plan-output-enum]] — 7-value Plan output enum | **Two-axis model**: keep the computed 4-state completion; add `plan_output_status` (7 values). "Needs More Observation" is computed/enforced from missing `required_observe_inputs`; the other six are steward-recorded; Conditionally Approved requires ≥1 named condition; the Act-handoff gate keys off `plan_output_status`. |
| 5 | [[2026-05-29-atlas-spec-feeds-into-data-model]] — `feedsInto` driving Plan tags AND cyclical Review-tag mechanism | Ratify `feeds_into` as the single source for forward consequence-tags and reverse data-derived cyclical Review flags; build together with ADR 11. |
| 6 | [[2026-05-29-atlas-spec-domain-as-tag-vs-backbone]] — domain is a tag not a nav gate | Ratify domain-as-tag — the objective is the nav unit, overlays auto-load; legacy domain-as-nav retirement folded into the ADR 3 cutover. |
| 7 | [[2026-05-29-atlas-spec-act-map-first-surface]] — promote map-first Act to live or keep rail-with-map | Promote map-first to live, retire rail-with-map. Act Command Center = authoritative data model; Field Actions Center = authoritative map + verifier UX; unified "Field Actions Center", CTA "Launch Field Actions Center". Commit now, sequence build after Phase 3. |
| 8 | [[2026-05-29-atlas-spec-catalogue-driven-content]] — catalogues as plug-in content packages with shared 12+1 type roster | Adopt catalogue-as-plugin; codify the 12 primary + Residential (13th, secondary-only) roster, the §5.3 relationship matrix, and the 10-entry tension register in shared; per-type loader with atomic Tier 0 load. Gates Phase 1. |
| 9 | [[2026-05-29-atlas-spec-secondary-layer-plugin-model]] — additive vs modifying secondaries with patch records + design tensions | Adopt Secondary Layer v1.2 in full; split into `secondary_class` (additive / modifying) + nullable `tension_id` (matrix glyph = display rollup, X precedence) — resolves Residential × Agritourism/Wellness (#9/#10). Doc cleanup tracked: §6.1 "8 tensions" → 10 + "v1.1" title block. |
| 10 | [[2026-05-29-atlas-spec-methodology-terminology-rename]] — Decisions / Field Actions / Observe display labels as methodology stance | Display-label-first rename; internal IDs stable; telemetry audited as a separate slice. |
| 11 | [[2026-05-29-atlas-spec-cyclical-review-mode]] — Plan dual-mode gates (hard initial / soft cyclical) + OBSERVE UPDATES section + per-item Review tags | Adopt cyclical Review Mode — two gate modes, Screen 1 / Screen 2, OBSERVE UPDATES section 2b, `review_status` reset on cycle transition; amber flagging data-derived from `feeds_into`; coexists with PlanReviewsPage. |
| 12 | [[2026-05-29-atlas-spec-offline-sync-priority-queues]] — 5-tier priority queue with divergence-priority | Ratify the 5-tier queue (§5 canonical over §3.3): Divergence > Baseline > Non-baseline survey > Monitoring proof > Implementation proof; verify shipped `syncQueue.ts`; keep last-write-wins + single-steward. Doc cleanup tracked: reconcile §3.3 to 5 tiers. **Verified 2026-05-29: not implemented (FIFO retry queue, no tiers/gate); build deferred to ADRs 2 + 7. LWW divergence resolved 2026-05-29 — ratified the local-preserving model (conflicts surfaced, local never clobbered) as canonical; spec §2/§6.1 reconciled.** |

---

## 6. Verification (per plan's PostToolUse hook)

1. ✅ All 27 source docs named in this review with extracted summary (Handoff Index §2.1; 4 stage UX §2.2; 5 pipeline+wizard+sync §2.3; 4 foundation + diff §2.4; 13 catalogues §2.5).
2. ✅ Every architectural shift in §3.1 anchored to a file path that demonstrates current state or explicitly says "not yet implemented."
3. ✅ Every decisions-queue item in §5 has a matching ADR on disk (`wiki/decisions/2026-05-29-atlas-spec-*.md`) — all 12 now `status: Accepted` (ratified by Yousef, 2026-05-29).
4. ✅ `wiki/index.md` updated with this review + 12 ADRs; `wiki/log.md` session entry appended.
5. ✅ ADR 12 follow-up (verify `syncQueue.ts` vs the 5-tier list) completed 2026-05-29 — verdict (not implemented; FIFO failure-retry queue) recorded in the ADR 12 Verification section; the 5-tier build is deferred to ADR 2 (`cycle_id`) + ADR 7 (typed per-record Act sync); the spec-vs-code LWW divergence was resolved 2026-05-29 — ratified the local-preserving model as canonical (conflicts surfaced, local never clobbered); the canonical spec §2/§6.1 was reconciled to match (see the ADR 12 Amendment). No `atlas/` source changed.

---

## Connections

- Entity: [[olos]]
- Concept: [[olos-universal-domains]]
- Spec drop: `C:\Users\MY OWN AXIS\Documents\OLOS New Spec docs\` (27 .docx)
- Stage model: [[project_lifecycle_retirement]] (refreshed 2026-05-29 per accepted ADR 1 — 7-stage lifecycle retiring; the 3-stage IA is Observe / Plan / Act; spiral direction Plan → Act → Observe ratified as doctrine)
- Adjacent: [[2026-05-25-atlas-universal-domains]], [[2026-05-25-atlas-plan-impact-flags]], [[2026-05-25-atlas-plan-decision-log]], [[2026-05-25-atlas-plan-to-act-data-derived-gate]], [[2026-05-25-atlas-act-command-centre]], [[2026-05-25-atlas-observe-needs-reframe]], [[2026-05-26-atlas-universal-domain-shared-enum]], [[2026-05-26-atlas-universal-domain-step3-cutover]]
