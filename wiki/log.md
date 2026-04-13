---
title: "Wiki Log"
type: log
---

# Wiki Log

Append-only chronological record of all wiki operations.

## [2026-04-13] implement | M2 tier 3 — DLR/RET/OPT/remaining renderer expansion (39→77 tasks, 68% coverage)
- Added 38 new TASK_RENDERERS entries across all remaining stages
- DLR stage: DLR-S5, DLR-A1 (StepPanel), DLR-A2/A4 (Matrix2x2), DLR-A3/A6/A7 (StepPanel), DLR-A5 (DualColumn)
- RET stage: RET-S2/S5 (DualColumn), RET-S3/S4 (Matrix2x2), RET-A1 through RET-A6 (StepPanel)
- OPT stage: OPT-S3 (DualColumn), OPT-S4/S6 (StepPanel), OPT-S5/A5 (VerdictBadge), OPT-S7/A2 (MetricBar)
- OUT/SAL remaining: OUT-A2 (DualColumn), OUT-A3/S1/S2/S3/S5/A1 (StepPanel), SAL-S0/S1/S2/S4/A1/A2 (StepPanel)
- ~36 tasks remain on DefaultTaskRenderer — mostly simple textarea-only or mixed-type fields where default is appropriate
- Build passes clean; no new CSS needed (all reuse existing renderer component styles)

## [2026-04-13] implement | M2 tier 2 — SAL/OUT renderer expansion (28→39 tasks, 35% coverage)

Added 11 new TASK_RENDERERS for SAL and OUT stages using 2 new renderer components.

### New renderer components
- **DualColumnRenderer** — paired textareas side-by-side with optional footer. For content that naturally pairs (objections+responses, scripts+alternatives, nurture+proof)
- **StepPanelRenderer** — vertical numbered cards for sequential/phased content. Numbered circle markers with step labels and truncated content

### New TASK_RENDERERS entries
- **DualColumnRenderer** (5 tasks): OUT-S4 (objection intelligence), OUT-A5 (appointment setter + no-fit scripts), OUT-A6 (objection handling matrix), SAL-A5 (objection library), SAL-S5 (pre-call nurture)
- **StepPanelRenderer** (6 tasks): SAL-S3 (fit call script 3-part), SAL-S6 (show-rate reminders 3-step), SAL-S7 (post-call follow-up), SAL-A4 (fit call asset 3-part), SAL-A6 (combined nurture/reminders/follow-up 4-phase), OUT-A7 (content-to-DM pipeline)

### Running totals
- Total renderers: 39/113 tasks (35%), up from 28 (25%)
- Renderer component inventory: 12 types (CategoryGrid, CandidateTable, Matrix2x2, GateChecks, ProofAudit, TransformationArc, ContentGrid, VerdictBadge, Timeline, SegmentList, MetricBar, ScopeMap, DualColumn, StepPanel)
- Remaining: 74 tasks use DefaultTaskRenderer (~40 are simple textarea-only where default is appropriate)

### Files modified
- `src/components/bbos/BbosFullDashboard.jsx` — DualColumnRenderer, StepPanelRenderer components + 11 new TASK_RENDERERS entries
- `src/components/bbos/BbosFullDashboard.css` — DualColumn styles (2-col grid, footer), StepPanel styles (numbered markers, vertical cards), responsive overrides

## [2026-04-13] implement | M2 — Expand BBOS custom renderer coverage (14→28 tasks)

Extended TASK_RENDERERS from 14 to 28 tasks (25% coverage, up from 12%). Created 2 new renderer components and reused 5 existing ones.

### New renderer components
- **MetricBarRenderer** — horizontal progress bars with color-coded thresholds (green ≥75%, amber ≥40%, red <40%). Used by OPT-S1 (4 canonical metrics) and OPT-A1 (5 stewardship dimensions)
- **ScopeMapRenderer** — two-column included/excluded layout with footer note. Used by OFR-A4 (Scope Map)

### Existing renderers reused for new tasks
- **VerdictBadgeRenderer** (5 new): FND-S3 (gap severity), TRU-S3 (proof strength), TRU-S6 (regulatory status), OFR-A1 (G-label promise), SAL-A0 (assembly status)
- **GateChecksRenderer** (1 new): TRU-FP02 (10-question Amanah screening rubric with ★ auto-disqualifiers using inverted polarity)
- **Matrix2x2Renderer** (3 new): OFR-A6 (guarantee 4-part structure), DLR-S2 (quality/risk quadrants), RET-S1 (4-segment client map)
- **TimelineRenderer** (2 new): DLR-S1 (delivery phases), DLR-S4 (proof capture steps)

### Files modified
- `src/components/bbos/BbosFullDashboard.jsx` — MetricBarRenderer, ScopeMapRenderer components + 14 new TASK_RENDERERS entries
- `src/components/bbos/BbosFullDashboard.css` — MetricBar styles (track/fill/labels), ScopeMap styles (2-col grid, tinted columns), responsive override for scope columns

### Remaining unrendered
85 tasks still use DefaultTaskRenderer. ~42 are simple textarea-only tasks where default rendering is appropriate. Priority expansion candidates: SAL stage (scripts, objection libraries), OUT stage (hook/message libraries), RET stage (message spines).

## [2026-04-13] fix | BBOS Phase 2 — design decisions + remaining high-priority fixes

Resolved 4 design decisions and implemented remaining audit fixes (H2, H3, H6, M5). H5 (sidebar link) dropped by user decision — BBOS accessible through Work projects.

### Design decisions resolved
- **D1 (H2):** Keep `STAGE_SCORE_SIGNALS` centralized config; added `fieldIds` metadata to all 50 signals + dev-time validation that cross-checks against `bbos-task-definitions.js` field IDs (runs in `import.meta.env.DEV` only)
- **D2 (H3):** WAI-ARIA Listbox pattern for BbosRolePicker — arrow keys, Enter/Space select, Escape close, Home/End, `aria-activedescendant`, focus-visible ring
- **D3 (H5):** **Dropped** — user confirmed BBOS lives in Work projects, no sidebar entry needed
- **D4 (H6):** V-prefix stays in Research Factory — clarifying comment added above `RESEARCH_PREFIXES`. V tasks gate research→asset transition; moving them would break Assembly Gate semantics
- **D5 (M5):** Panel-level + per-field + per-section error boundaries on BbosTaskPanel. New shared `ErrorBoundary` component created

### Files modified
- `src/components/shared/ErrorBoundary.jsx` — **new** reusable error boundary (class component with retry UI)
- `src/components/bbos/BbosTaskPanel.jsx` — outer ErrorBoundary wrapping export, per-field boundaries on form fields, AI Draft section boundary
- `src/components/bbos/BbosFullDashboard.jsx` — V-prefix classification comment, `fieldIds` on all 50 STAGE_SCORE_SIGNALS entries, dev-time validation loop
- `src/components/bbos/BbosRolePicker.jsx` — full rewrite: ARIA listbox, keyboard navigation, focus styling
- `src/components/bbos/BbosRolePicker.css` — **new** extracted styles (was inline)

### Remaining open items
- M2: Only 14/113 tasks have custom renderers
- M10: 5 BBOS skill files referenced but missing from `.claude/skills/`

## [2026-04-13] audit+fix | BBOS comprehensive friction audit and critical remediation

### Audit (3 parallel explore agents)
Scanned BBOS across 3 dimensions: workflow/data integrity, UI components, and system integration. Found **42 total issues** (5 critical, 7 high, 16 medium, 14 low). Agent findings verified against source code — **3 false positives** identified and excluded:
- C1 (grid overflow): CSS Grid auto-wraps correctly — spans per row sum to 12
- C3 (AI draft non-functional): `buildPrompt()` and `parseAiResponse()` ARE implemented in `src/services/ai/`
- C4 (FND Assembly Gate): FND is research-only by design — no Asset tasks needed

### Positive findings
- 100% task/role/Islamic grounding/scoring coverage (113 tasks, 9 stages, 7 roles)
- All 9 stages have 5-signal scoring (contradicts earlier audit's "5/9 unscored" — fixed in Sprint 7)
- moveTask() completedAt fix confirmed working

### Fixes applied (8 issues)
1. **C2 — Debounce cleanup**: Added `useEffect(() => () => clearTimeout(saveTimeout.current), [])` in `BbosTaskPanel.jsx` — prevents stale store writes after panel close
2. **C5 — Atomic task seeding**: `project-store.js` `addProject()` now rolls back orphaned BBOS tasks if project persistence fails (calls `safeRemove`)
3. **H1 — useMemo optimization**: `BbosFullDashboard.jsx` selector narrowed from `s.tasksByProject` (entire map) to `s.tasksByProject[project.id]` — prevents re-computation on unrelated project changes
4. **H4 — useEffect deps**: Added `bbosFilter` to dependency array in `ProjectBoard.jsx:50` — `setActiveBbosStage` now updates when user switches stages
5. **H7 — Assembly Gate null guard**: Gate defaults to open if Done column is missing (`!doneColumnId`)
6. **M1 — Status detection fallback**: Task card status now checks both `columnId === doneColumnId` and `task.completedAt` for completion
7. **M3 — Auto-advance heuristic**: Changed from "10+ total chars across all fields" to "2+ fields with content OR 1 field with 50+ chars" — reduces false triggers
8. **L2 — ratingToStars case-insensitive**: `.toLowerCase()` applied before string matching
9. **L4 — Breakpoint fix**: `max-width: 767px` → `768px` in `BbosFullDashboard.css`
10. **L11 — Score clamping**: `renderStars()` now clamps score to `[0, max]` via `Math.min(Math.max(score, 0), max)`

### Files modified
- `src/components/bbos/BbosFullDashboard.jsx` — H1, H7, M1, L2, L11
- `src/components/bbos/BbosFullDashboard.css` — L4
- `src/components/bbos/BbosTaskPanel.jsx` — C2, M3
- `src/components/work/ProjectBoard.jsx` — H4
- `src/store/project-store.js` — C5

### Remaining open items (not addressed this session)
- H3: BbosRolePicker keyboard navigation (WCAG 2.1 AA)
- H5: BBOS not in sidebar navigation (discovery friction)
- H6: STR-V prefix classification (design decision needed)
- H2: STAGE_SCORE_SIGNALS hardcoded field names (refactoring scope)
- M2: Only 14/113 tasks have custom renderers
- M5: No error boundary on BbosTaskPanel
- M10: 5 BBOS skill files referenced but missing from `.claude/skills/`

## [2026-04-12] ui | AyahBanner polish + family Islamic data

**AyahBanner (TopBar verse banner) — multiple visual fixes:**
- Arabic font set to `'Amiri', serif` (matching Islamic Layer sidebar) — `AyahBanner.css`
- Source citation (`Quran X:Y`) moved from header row to below translation, centered, background removed
- "OPENING REFLECTION" label centered; `flex: 1` removed so `justify-content: center` takes effect; chevron pinned `position: absolute; right`
- Banner overlap with col-edge fixed: `left: 0` → `left: var(--edge-w, 28px)` so banner starts after the 28px column divider
- Topbar z-index raised from 10 → 16 (above col-edge at 15, below sidebar at 20); banner gets opaque surface background via `linear-gradient(--banner-tint, --banner-tint), var(--surface)` to prevent col-edge bleeding through
- Spacing between banner and page content reduced: `--space-6` (24px) → `--space-3` (12px)
- Translation `border-left` accent removed; text-align: center on both Arabic and translation

**Submodule rename — Intellect / Professional:**
- "Professional Mastery" → "Skills Mastery" → "Skill Proficiency" across 5 files: `modules.js`, `pillar-content.js`, `IntellectDashboard.jsx`, `IntellectCorePage.jsx` (INTELLECT_PILLARS array — source of truth for all Intellect level pages), `project-store.js`

**Family Islamic data bootstrapped:**
- Added `family` entry to `MODULE_ATTRS` in `src/data/islamic/islamic-data.js`
- Dua: Quran 25:74 — *Rabbanā hab lanā min azwājinā wa dhurriyyātinā…* (chosen over nikah-specific dua to serve the full Family pillar)
- Governing attrs: Al-Wadud (The Loving) + Al-Qayyum (The Self-Sustaining Sustainer)
- Closing dua: Quran 46:15 — gratitude + righteous offspring
- Full readiness check (3 rows, 3 governing, 3 not-yet) and reflection (3 governing, 3 not-yet)
- Unblocks ThresholdModal Dua tab for all family sub-modules (marriage, parenting, kinship, home)

## [2026-04-12] ui | Pillar page layout redesign — full-width tasks, centered content, segment box navigation

Redesigned the LevelNavigator and pillar/overview page layouts for visual consistency and usability.

- **Full-width task cards:** Removed `fpb-spacer` divs from `PillarLevelPage`; task cards now span the full content area
- **Centered layout:** `max-width: 900px; margin: 0 auto` on `fpb-layout` and `flo__grid` for wide-viewport centering
- **Consistent spacing:** Added `padding: var(--space-6)` to PillarLevelPage outer container — verse-banner → navigator gap is now 49px on both overview and pillar pages
- **Segment column boxes:** Each pillar column is a rounded box; active column fills with `--seg-color`; clicking the box navigates to the pillar page
- **New shared components:** `src/pages/shared/` (LevelOverviewPage, PillarLevelPage) and `src/components/shared/` (LevelNavigator)
- **Commit:** `b172e5a` → `onaxyzogden/Maqasid` main

## [2026-04-12] implement | Dashboard refresh — LevelNavigator design language

Rewrote the main dashboard (`/app`) using the Faith module's `LevelNavigator` as the visual reference.

**Changes delivered:**
- **`PillarProgressStrip`** (new component, `src/components/dashboard/PillarProgressStrip.jsx`): 7-column horizontal bar strip, one column per Maqasid pillar. Each bar is subdivided proportionally into done (--col-done green) / in-progress (--col-review amber) / todo (--bg3 gray) segments based on real task data. Pillar accent border-top, Arabic root label in Islamic mode, links to `/app/pillar/:pillarId`.
- **Maqasid Focus panel**: Replaced the "coming soon" placeholder inside `.insight-recommendations` with a live panel listing pillars ranked by open task count (overdue first), with accent-colored left bar, open-task count chip, and Arabic root.
- **Stat cards** trimmed from 4 to 2: In Progress + Overdue. Value font size bumped to 1.8rem.
- **EPH metric** renamed → "Today / tasks completed".
- **Section labels** added: "MAQASID AL-SHARI'AH" (above strip) and "OVERVIEW" (above bottom row).
- **CSS polish**: gap var(--space-6), WF bar height 14px, bottom-row columns 1fr 1.4fr, Space Grotesk labels.

**Bugs found and fixed during session:**
1. PillarProgressStrip was using `useThresholdStore.completedOpening` (ceremony state) to color segments green — not task completion. Rewrote to use `useProjectStore` + `useTaskStore` with project ID prefix resolution (`project.id.startsWith(pillar.id + '_')` as primary, `subModuleIds.includes(project.moduleId)` as fallback).
2. Maqasid Focus `pillarSummary` useMemo used only `subModuleIds.includes(p.moduleId)` — broke for all pillars whose project moduleIds don't match subModuleIds verbatim (faith: 'shahada' vs 'faith-shahada'). Applied same prefix-based fix.

**Key architectural note:** Project ID prefix pattern (`{pillarId}_{submodule}_{level}`) is the reliable pillar resolver. `subModuleIds` fallback covers generic modules (wealth, ummah). Neither `useModulesProgress` hook nor raw `subModuleIds` matching alone is sufficient for faith/life/intellect/family/environment.

## [2026-04-11] graphify | Knowledge graph regeneration (post-audit)

Regenerated graphify knowledge graph after completing all 35 audit findings across 8 sprints.

- **Scope:** `src/ + wiki/ + docs/ + tasks/` (314 files, ~295K words)
- **Graph:** 1,012 nodes, 1,517 edges, 8 hyperedges, 126 communities (25 labeled)
- **Token reduction:** 79.7% (383K raw → 78K graph tokens)
- **God nodes:** threshold-store (93 edges, bridges 9 communities), project-store (79), contacts-store (49), task-store (34), settings-store (27)
- **Key insight:** threshold-store centrality is intentional (Islamic ceremony gating is cross-cutting), but 63/93 edges are per-page imports that could be lifted to a single router-level `<CeremonyGuard>` wrapper
- **Outputs:** `graphify-out/graph.html`, `graphify-out/graph.json`, `graphify-out/GRAPH_REPORT.md`
- Updated `wiki/entities/maqasid-os.md` with new graph stats; resolved open question on graph regeneration

## [2026-04-11] implement | Sprint 8 — Documentation & Git Hygiene (#26, #27, #28, #31)

Final sprint of the 35-finding technical audit remediation.

- **#26 CONTEXT.md freshness:** Updated 4 stale files (bbos, work, tech, shared) with current file inventories after Sprint 4-7 additions
- **#27 Wiki entities:** Synced maqasid-os.md and bbos-pipeline.md with Sprint 4-7 history; resolved 3 open questions on bbos-pipeline (Two-Factory UI, G-Label descriptions, Assembly Gate)
- **#28 Lessons learned:** Populated `tasks/lessons.md` with 7 patterns from the remediation (mock data, sessionStorage, quota estimation, pruning, dual stores, CONTEXT.md co-maintenance, false-positive verification)
- **#31 Bundle size ADR:** Created `wiki/decisions/2026-04-11-bundle-size-2mb.md` — accept 2 MB monolithic bundle, revisit at 3 MB or multi-user. Indexed dual-contact-stores ADR from Sprint 5.

**All 35 findings now addressed across 8 sprints.** Branch: `docs/freshness-update`.

## [2026-04-11] audit | Comprehensive 8-submodule system audit

### Scope
Read-only audit across 8 submodules: Build & Lint, BBOS Pipeline Workflow, Dashboard & Navigation, Islamic UI Layer, Store & Persistence, Operational Modules (People/Money/CRM/Office/Tech), Documentation Freshness, Git Hygiene.

### Key findings (35 total: 5 Critical, 12 High, 13 Medium, 5 Low)

**Critical:**
- Rules-of-Hooks violations in ProjectBoard.jsx:87, DashboardView.jsx:17/19, IslamicTerm.jsx:24/36 (conditional hooks)
- safeSet() silently swallows localStorage quota errors — user loses data without notification
- moveTask() resets completedAt to null — tasks appear incomplete in Done column
- BBOS task seeding not atomic — tasks can vanish on reload if second persist fails
- Import (Settings.jsx) has no schema validation or backup — can corrupt entire database

**High:**
- 82 unused vars, 4 impure renders (Date.now in useState/useMemo), 28 exhaustive-deps warnings
- BBOS: auto-advance too permissive, no role filtering in dashboard, 5/9 stages unscored
- Dashboard: no onboarding empty state, pillar dashboards show "Coming Soon"
- Islamic: missing closingDua for People/Wealth pillars, NiyyahAct Skip=Confirm
- Modules: Money dashboard uses mock data, Tech monitoring simulated but unlabeled
- ESLint scans .obsidian/, atlas/, graphify-out/ unnecessarily

**Documentation staleness:**
- 6 CONTEXT.md files stale (work, shared, bbos missing new components)
- Wiki entity pages don't reflect Apr 11 features
- tasks/lessons.md empty despite rapid development

### Files referenced
- Plan: `.claude/plans/bubbly-watching-locket.md`
- Full audit output: conversation log (not persisted to file)

## [2026-04-11] implement | UI polish + unified DashboardTaskCard + BBOS cleanup

- Created `src/components/shared/DashboardTaskCard.jsx` + `.css` — unified card replacing PillarTaskCard and BBOS TaskCard. Whole card clickable; dynamic rendering of subtasks, field progress, due dates, tags, purpose, and custom BBOS renderers via children prop. ~5.4 KB CSS reduction.
- Converted all dashboard audit systems from 5-star to 3-star (BbosFullDashboard, DashboardView, PillarLevelDashboard). Scoring thresholds and verdict logic adjusted for 3-point scale.
- CSS consistency pass: card padding 22px → 20px, star gap 1px → 2px, empty star opacity 0.25 → 0.2 in BbosFullDashboard.css.
- Removed empty card message (`getEmptyMessage`) from BBOS task cards — status communicated via chips and progress bar.
- Removed FND-IFB-S1 through FND-IFB-S5 ("IFB Forms" group) from `bbos-task-definitions.js` and `bbos-role-access.js` — backend admin tasks not operator-facing.
- Tasks page (`/work/:id/tasks`) generic dashboard updated to 3-star audit.

## [2026-04-09] bootstrap | Wiki initialization
- Created wiki directory structure and SCHEMA.md
- Seeded 5 entity pages, 4 concept pages, 3 decision pages, 3 source summaries
- Built initial index.md
- Migrated from NotebookLM-based orientation to wiki-based orientation

## [2026-04-09] implement | Edge column polish + file upload testing
- Polished edge column hover/focus-visible/active states in AppShell.css (primary-bg pattern)
- Boosted dark theme edge line contrast (--border → --border2 override)
- Fixed double `bbiz_` prefix bug in PillarResourcesTab storage key
- Added migration shim for any pre-existing double-prefixed resource data
- E2E tested file upload: txt, pdf, mp3, oversized rejection, link mode, dark theme cards
- Wrote IndexedDB migration design doc (`stages/design-indexeddb-resource-storage-draft.md`)

## [2026-04-11] implement | TRU dynamic scoring + Family Office module

### TRU-AF5 Integrity Threshold — dynamic calculation
- Replaced static `overallProofStrength` lookup with a weighted 5-signal score in `TruDashboard.jsx`
- Signals: TRU-S3.overallProofStrength (max 5) + TRU-V1 gates A/B/C/D (max 5 each) = max 25 pts
- Formula: `Math.round((rawScore / 25) * 100)`
- Verdict thresholds: ≥75% QUALIFIED, ≥50% DEVELOPING, ≥25% REVIEW NEEDED, <25% BLOCKED
- Empty fields score 0 (denominator stays 25)

### TRU-AF5 Audited Claim Strength — dynamic
- Replaced binary pass/fail stars with graduated gate scoring: pass=5★, conditional=3★, fail=1★, empty=0★
- Sub-labels now dynamic: pass → domain label, conditional → "Conditional", fail → "Gate Failed", empty → "Not Assessed"

### Family Office module
- Added Office module to Family section — two access points:
  1. Tab in `FamilyPage.jsx` (`/app/family`) via `mainTab` state + `<Office embedded />`
  2. Dedicated sidebar entry at `/app/family-office` listed under FAMILY after Home Environment
- Files: `FamilyPage.jsx`, `App.jsx`, `maqasid.js` (subModuleIds), `modules.js` (entry), `Sidebar.jsx` (route map)

## [2026-04-11] implement | StageScoreCard — dynamic scoring extended to STR, OFR, OUT

### StageScoreCard component (BbosFullDashboard.jsx)
- Added `StageScoreCard` component rendered above `ProjectAuditCard` for stages with signal definitions
- Reads field values from `taskMap` across multiple tasks, computes weighted score (5 signals × 5 pts = 25 max)
- Verdicts: ≥75% QUALIFIED, ≥50% DEVELOPING, ≥25% REVIEW NEEDED, <25% BLOCKED
- Renders null for stages without signal definitions (FND, SAL, DLR, RET, OPT — unaffected)

### STAGE_SCORE_SIGNALS config
- TRU (5 signals): TRU-S3.overallProofStrength + TRU-V1 gates A/B/C/D — **restores scoring lost when TruDashboard.jsx was deleted**
- STR (5 signals): integrityVerdict, verbatimPhrases line count, contentAngle1-6 filled count, beliefStatement filled, transformation arc fields filled
- OFR (5 signals): promiseGLabel (G1/G2), ICP 4-field completeness, guarantee 4-field completeness, scope map (included+excluded), proofStatus
- OUT (5 signals): icOut1–icOut5 from OUT-IC integrity checks (binary pass=5/fail=0)

### ProofAuditRenderer upgrade (TRU-AF5)
- Claim strength ratings now render as graduated stars via `ratingToStars()`: Strong=5★, Moderate=3★, Weak=2★, Unverifiable/Insufficient=1★
- Unknown rating strings fall back to plain text display

### Helpers hoisted
- `renderStars` moved from inside ProjectAuditCard to module scope (reused by StageScoreCard + ProofAuditRenderer)
- `ratingToStars` helper added

### Files modified
- `src/components/bbos/BbosFullDashboard.jsx` — STAGE_SCORE_SIGNALS config, StageScoreCard component, ProofAuditRenderer upgrade, renderStars hoist
- `src/components/bbos/BbosFullDashboard.css` — `.bfd__ssc-*` styles, `.bfd__audit-rating` flex update, `.bfd__audit-rating-label`, responsive overrides

## [2026-04-11] implement | BbosFullDashboard bento refinements + G-label panel fix

### Bento grid layout
- Switched `.bfd__grid` from `repeat(3, 1fr)` to `repeat(12, 1fr)` 12-column grid
- Replaced `getCardSpan(prefix, indexInGroup)` with `computeGroupSpans(prefix, defs)` — processes defs in pairs, assigns wider span (7) to the task with the longer label, narrower span (5) to the shorter; solo cards at end of odd-count groups span 12; IC prefix always spans 12

### Contextual empty states
- Added `TASK_EMPTY_OVERRIDES` map for all 16 custom-rendered tasks (hand-crafted messages, e.g. "Complete STR-AF1 to populate the core belief statement")
- Added `getEmptyMessage(def)` fallback that derives message from `def.purpose` first sentence for the remaining ~102 tasks
- Purpose line now only shown when card `hasData`; empty cards show only the contextual message

### ProjectAuditCard restored
- Added `ProjectAuditCard` component inside `BbosFullDashboard.jsx` — full-width card at grid bottom
- Computes 4 audit checks (Task Coverage, Completion Rate, Scheduling Discipline, Subtask Depth) scoped to current stage tasks
- STRONG / QUALIFIED / DEVELOPING / NEEDS WORK verdict + health threshold percentage
- Left panel: verdict box; right panel: 2-column star-rated metrics grid

### Completion status backgrounds
- Added `status` computation in `TaskCard`: `empty` / `active` (has data, no completedAt) / `complete` (has completedAt)
- Applied as BEM modifier `bfd__card--${status}` with CSS color-mix tints
- `--active`: faint primary tint + border; `--complete`: faint green tint + border; `--empty`: neutral

### G-Label picker fix
- `BbosTaskPanel.jsx`: gated `GLabelPicker` / Integrity Label row behind `def.hasGLabel`
- Previously rendered unconditionally for all BBOS tasks regardless of flag
- Now only visible on tasks where `hasGLabel: true` (all AF tasks in STR, selected IFB/TRU tasks)

### Files modified
- `src/components/bbos/BbosFullDashboard.jsx` — computeGroupSpans, getEmptyMessage, TASK_EMPTY_OVERRIDES, ProjectAuditCard, status backgrounds
- `src/components/bbos/BbosFullDashboard.css` — 12-col grid, status modifier classes, ProjectAuditCard styles
- `src/components/bbos/BbosTaskPanel.jsx` — def.hasGLabel gate on GLabelPicker

## [2026-04-11] implement | Task card color coding + stage tab status + auto-advance

### Task card status color fix
- Fixed `--active` CSS color: was `var(--primary)` (#4ab8a8 teal → appeared green), changed to `var(--pri-high)` (#f59e0b amber)
- Fixed status detection: was using `task.completedAt` (always null — `moveTask()` resets it explicitly); changed to `task.columnId === doneColumnId`
- `doneColumnId` derived from `project.columns.find(c => c.name === 'Done')?.id` inside `useMemo` in `BbosFullDashboard.jsx`
- Card status now correctly tracks the Kanban column (To Do → neutral, In Progress → amber, Done → green)

### Stage tab color coding (BbosPipelineHeader)
- Added `stageStatusMap` computed in `ProjectBoard.jsx` via `useMemo` — maps each stage ID to `'empty' | 'active' | 'complete'`
- Logic: tasks grouped by stage prefix (`t.bbosTaskType.split('-')[0]`); active = has non-empty `bbosFieldData`; complete = all tasks in Done column
- `stageStatusMap` passed as prop to `BbosPipelineHeader`; applied as `bbos-stage-node--status-${status}` BEM modifier
- CSS: `--status-active` (amber tint) and `--status-complete` (green tint) placed before `--filtered` / `--current` in cascade — filtered/current states always override

### Auto-advance to In Progress
- Added `advanceToInProgress()` helper in `BbosTaskPanel.jsx`: finds "To Do" and "In Progress" columns, calls `moveTask` only if task is currently in "To Do"
- Called in 3 places: (1) `handleFieldChange` — after 300ms debounce, for non-internal non-empty field values; (2) after AI draft field population; (3) after template import
- Does not move tasks backward — condition guards on `task.columnId === toDoCol?.id`

### Files modified
- `src/components/bbos/BbosFullDashboard.jsx` — doneColumnId in useMemo, TaskCard status fix, amber --active
- `src/components/bbos/BbosFullDashboard.css` — `.bfd__card--active` changed to `--pri-high`
- `src/components/work/ProjectBoard.jsx` — stageStatusMap useMemo, stageStatusMap prop on BbosPipelineHeader
- `src/components/bbos/BbosPipelineHeader.jsx` — stageStatusMap prop, status class on each stage node
- `src/components/bbos/BbosPipelineHeader.css` — `.bbos-stage-node--status-active/complete` styles
- `src/components/bbos/BbosTaskPanel.jsx` — advanceToInProgress helper, called from handleFieldChange + AI draft + template import

## [2026-04-09] ingest | NotebookLM migration (Phase 5)
- Queried 3 NotebookLM notebooks: BBOS (84220e85), Maqasid (053ac9ef), Clief Notes (7eb920ab)
- Updated [[bbos-pipeline]] with v2.4 architecture, Two-Factory Model, 7 non-negotiable business rules
- Updated [[maqasid-al-shariah]] with Auda's 6 systems features, ethical screening framework
- Created [[claude-os]] entity page — MWP 3-layer system, 60/30/10 framework, session patterns
- Created [[source-notebooklm-migration]] source summary
- Updated 2 pages, created 2 new pages
- NotebookLM registry marked as legacy — wiki is now authoritative context source
