---
title: "Wiki Log"
type: log
---

## [2026-04-21] session | Threshold-trigger Before/After + interactive closing reflection

**Completed:**
- **`src/data/seed-tasks/weekly-seed-tasks.js`** (new) — `WEEKLY_SEED_TASKS` + `WEEKLY_BOARDS` for three new boards (`weekly_work` 4 tasks, `weekly_wealth` 5 tasks, `weekly_community` 4 tasks). Each item is a weekly-cadence planning task (mission-statement review, shutdown review, revenue review, silat al-rahim check-in, etc.) tagged `cadence:weekly`.
- **`src/store/project-store.js`** — imported weekly seeds + boards; added `ensureWeeklyProjects()` action mirroring `ensurePrayerProjects` (idempotent seed + project creation, `_weeklyModule: true` flag); included `WEEKLY_SEED_TASKS` in `backfillAndStripSeeds`' `ALL_SEEDS`.
- **`src/components/islamic/PropheticPath.jsx`** — imported `useThresholdStore`; added `THRESHOLD_TRIGGER_NODES = new Set(['midday-labor','morning'])` + `DEFAULT_THRESHOLD_MODULE_BY_NODE = { morning: 'work' }`. In `TimelineNode`, Before satellite → `setOpeningModuleId(thresholdModuleId)`, After → `setClosingModuleId(thresholdModuleId)` for the two scoped nodes. Module id resolves from the active pill (wealth/community for midday-labor) or falls back to `work`. Non-threshold nodes retain MirrorCard expansion. Added `ensureWeeklyProjects()` effect on mount.
- **`src/components/islamic/ReadinessCheck.jsx`** — `RCInteractive` now auto-advances with a 320 ms crossfade after a card selection (ref-backed timeout, cleared on unmount; deselect/final-row do not advance). Removed the inner Next button (auto-advance handles forward motion); Previous renamed to **Back** and only renders from row 2 onward. New `frame` prop rendered above the card content (closes a pre-existing gap where `community` / `moontrance-*` reflection frames were silently dropped). Top-level `ReadinessCheck` forwards `readiness.frame` through the interactive branch.
- **`src/components/islamic/ReadinessCheck.css`** — new `.rc-card-content--fade` modifier + `@keyframes rcCrossfadeIn` (opacity 0→1, 4px lift) for auto-advance transition; new `.rc-card-wizard__frame` (mirrors `.rc-frame` display-mode styling).
- **`src/components/islamic/ThresholdModal.jsx`** — added `synthesizeReflectionRows()` helper that pairs legacy `reflection.governing[i]` ↔ `notYet[i]` into row objects inheriting top-level `yesLabel`/`notYetLabel`, so every module with a flat reflection block gets `hasInteractiveReflection = true`. Render site passes `{ ...data.reflection, rows: reflectionRows }` so `ReadinessCheck`'s interactive guard fires. Changed `showClosingDuaStep` to `!isOpening && hasInteractiveReflection` (Closing Duʿāʾ always appears on closing, whether aligned or not); removed the `reflectionAllYes` finalize shortcut; simplified `handleNext` on Reflection to a plain `next()`.

**Decisions:**
- **Weekly tasks not deleted from source seeds** — the "weekly" items surfaced on midday-labor/morning Before/After are pulled dynamically by `buildTasksForNode` from `intellect-professional` / `wealth-earning` seed boards (e.g. "Define your professional mission statement" at `intellect-seed-tasks.js:6669`, rich Islamic educational content). Since Before/After no longer opens MirrorCard for these nodes, those tasks no longer double-surface — and they remain accessible in their original boards where their depth belongs. Deleting would have stripped substantive seed content.
- **Reflection rows synthesized, not authored** — rather than hand-authoring `reflection.rows` for 10+ modules, `synthesizeReflectionRows` derives rows from the legacy flat shape at the one read site. Modules that already have `reflection.rows` (community, moontrance-land, moontrance-seasonal) pass through untouched. Display-only `RCSection` fallback kept as a safety net even though it's effectively dead.
- **Closing Duʿāʾ is always shown** — framed as "how we mark the return," not a remedial step for misalignment. This required removing the Reflection-step finalize shortcut; the Reflection → Closing Duʿāʾ → Alhamdulillah path is now unconditional on closing threshold.

**Verified:**
- `npm run build` clean (1.34s, 2691 modules). Multiple intermediate builds during the session — all clean.

**Deferred:**
- Surfacing the Weekly boards in navigation (no UI entry point yet; reachable only via direct project routes).
- Per-row `attr` / `attr_ar` / `attrTitle` / `attrFrame` metadata on synthesized reflection rows — conditional render already handles absent `_attr` gracefully.

**Files changed:** `src/data/seed-tasks/weekly-seed-tasks.js` (new), `src/store/project-store.js`, `src/components/islamic/PropheticPath.jsx`, `src/components/islamic/ReadinessCheck.jsx`, `src/components/islamic/ReadinessCheck.css`, `src/components/islamic/ThresholdModal.jsx`.

---

## [2026-04-21] session | During hero → kanban migration (prayer slide-up)

**Completed:**
- **`src/data/seed-tasks/prayer-seed-tasks.js`** — inlined `PRAYER_GUIDE` (6 prayers × {structure rows, key reminders}) from the deleted `PrayerHeroDuring.jsx`; extended `buildPrayerSeedTasks()` with a during-populating pass: each structure row → `{title: "{kind} · {count} rakʿah(s)", subtasks:[{title: note}], priority: 'high', tags: ['salah','prayer-phase:during',\`prayer:${pillar}\`]}`; each `keys[]` string → `{title: key, priority: 'medium', tags: [...base, 'reminder']}`. Net seed counts per during board: fajr 4, dhuhr 5, asr 5, maghrib 5, isha 7, tahajjud 5.
- **`src/pages/shared/PrayerLevelPage.jsx`** — removed the `isDuring` branch + `PrayerHeroDuring` import; all three levels now render through the same `ProjectBoard` cross-fade layer.
- **`src/components/islamic/PrayerSlideUp.css`** — stripped `.pp-prayer-hero*` rule block (hero, window, guide, structure, struct-row/kind/count/note, keys, key, bismillah, name, subtitle, clock, colon, 560px media query). Kept `.pp-prayer-panel__body` + `> .fpb-page-wrapper` (still used by the panel layout).
- **Deleted:** `src/components/islamic/PrayerHeroDuring.jsx`.

**Decision:** seed tasks stay in TO DO only — IN PROGRESS/DONE remain empty by design, matching the Before/After convention and the `seedTasks()` invariant at `src/store/project-store.js:56`.

**Verified:**
- `npm run build` clean (1.58s, 2690 modules).
- Preview: Maghrib slide-up → switch to During → kanban renders with 5 TO DO cards ("Farḍ · 3 rakʿahs", "Sunnah after · 2 rakʿahs", "Pray promptly — Maghrib's window is the shortest of the day.", "No four-rakʿah farḍ here; its witr-count is the 3.", "If time allows before iqāmah, pray 2 light rakʿahs…"). IN PROGRESS/DONE empty as expected.
- `bbiz_tasks_prayer_*_during` keys written on first prayer-slide-up open via `ensurePrayerProjects` → `seedTasks` (idempotent).

**Deferred:** none.

**Files changed:** `src/data/seed-tasks/prayer-seed-tasks.js`, `src/pages/shared/PrayerLevelPage.jsx`, `src/components/islamic/PrayerSlideUp.css`, `src/components/islamic/PrayerHeroDuring.jsx` (deleted).

---

## [2026-04-21] session | Prayer slide-up → FLN carousel + 18 real prayer boards

**Completed:**
- **New FLN-based prayer dashboard** replacing the earlier tabs/list slide-up. Mockup source: `Prayer Dashboard Concept - Before.html`. Before/During/After are now *levels* (not tabs); 6 prayer pillars are segments within each level.
- **`src/data/prayer-pillars.js`** — new registry: `PRAYER_PILLARS` (fajr/dhuhr/asr/maghrib/isha/tahajjud), `PRAYER_LEVELS`, `PRAYER_PHASE_KEYS`, `PRAYER_LEVEL_COLORS`, `PRAYER_BOARD_PREFIX`, `PRAYER_BOARDS` (18 boards = 6 pillars × 3 phases, id pattern `prayer_{pillar}_{phase}`).
- **`src/data/seed-tasks/prayer-seed-tasks.js`** — Option-A duplication strategy: generic `prayer-phase:before|after` sunan from `faith_salah_{core,growth,excellence}` are duplicated across all 5 daily prayers' matching phase boards; prayer-specific (`prayer:X`) and transition-tagged (`transition:tahajjud-waking`, `transition:morning-adhkar`, etc.) tasks land only in their inferred home. Main-phase and untagged tasks stay in `faith_salah_*` untouched — non-destructive.
- **`src/store/project-store.js`** — added `ensurePrayerProjects` action (mirrors `ensureFaithProjects`), imports `PRAYER_SEED_TASKS`/`PRAYER_BOARDS`, registers `PRAYER_SEED_TASKS` in `ALL_SEEDS` for `backfillAndStripSeeds`.
- **`src/components/islamic/PrayerLevelNavigator.jsx`** — thin wrapper around shared `LevelNavigator` passing `PRAYER_PILLARS` + `PRAYER_LEVELS` + `PRAYER_STORAGE_KEY = 'prayer_active_phase'` + `PRAYER_ENSURE_PROJECTS` selector.
- **`src/pages/shared/PrayerLevelPage.jsx`** — clone of `PillarLevelPage` with controlled-mode `pillarKey`/`onPillarKeyChange`. Default level uses `pickDefaultLevel(pillarKey, timings, activePrayer)` via `usePrayerTimes` (before when prayer time not yet reached, during when active, after otherwise; tahajjud falls back to before). Renders `<PrayerHeroDuring>` when activeLevel==='during', else `<ProjectBoard>` with cross-fade.
- **`src/components/islamic/PrayerSlideUp.jsx`** (rewritten) — portal-based slide-up hosting `PrayerLevelPage`; keeps `pillarKey` in sync with `nodeId` prop and bubbles navigation via `onNavigate`.
- **`src/components/islamic/PrayerSlideUp.css`** — absorbed the `.pp-prayer-hero*` styles from the deleted old file (bismillah gold, tabular-nums clock); reuses `.pp-slideup__*` chrome from `ProjectSlideUp.css`.
- **Deleted:** old `PrayerSlideUp.{jsx,css}`, `PhaseTabs.jsx`, `PrayerStrip.jsx` — `PrayerHeroDuring.jsx` retained.

**Verified:**
- 18 `prayer_*` projects persist to `bbiz_projects`; 12 task boards seeded in `bbiz_tasks_prayer_*` (during boards empty by design).
- FLN renders 6 segments × 3 levels with task-colored subseg pills (10 pills visible at Before-Dhuhr).
- During hero: bismillah + "Dhuhr" + "It is time for prayer." + live `HH:MM` clock.
- Before/After: `ProjectBoard` dashboard renders with correct task counts per pillar×phase.
- `npm run build` clean (1.46s, 2691 modules); no new lint errors in prayer files.

**Deferred:**
- Real adhan-aware copy + rakah counter in the During hero (placeholder still reads "It is time for prayer.").

**Decisions filed:** `wiki/decisions/2026-04-21-prayer-slide-up-fln.md`

---

## [2026-04-21] session | MirrorCard Education → pillar submodules + Work project pillar tagging

**Completed:**
- **MirrorCard Education tab** (`src/components/islamic/PropheticPath.jsx`) — EducationList rewritten to enumerate pillar-canonical submodules via `getPillarSubmoduleIds(pillarId)` from the submodule registry; cards reuse `.pp-project-row` styling. Dead `.pp-education-card*` CSS rules removed.
- **New `SubmoduleSlideUp` component** (`src/components/islamic/SubmoduleSlideUp.jsx`) — portal-rendered slide-up that hosts the canonical `PillarLevelPage` (Wealth/Life/Intellect/Family/Environment/Faith/Ummah) so the MirrorCard mirrors the standalone `/app/<submodule>` route pixel-for-pixel, including task click → TaskDetailPanel popup.
- **submodule-registry** (`src/data/submodule-registry.js`) — added Ummah pillar config + `community → ummah` alias via new `PILLAR_ALIASES` map; `getPillarSubmoduleIds` now resolves through the alias.
- **`buildUserProjectsForScope`** (`src/data/prophetic-path-submodules.js`) — replaced fragile `id.split('-')[0]` prefix heuristic with explicit `PILLAR_TO_SUBMODULES` table (correctly handles Ummah bare ids). User boards are matched whether tagged with a submodule `moduleId` or a pillar-only `moduleId`. Seeded pillar boards filtered out via `_<pillar>Module` flag.
- **`/app/work` New Project dialog** (`src/pages/modules/Work.jsx`) — Pillar + Submodule pickers added; selected submodule (or pillar if no submodule) persisted as `project.moduleId` via `createProject`. Listing filter extended to exclude `_ummahModule` seeded boards.
- **maqasid label fix** (`src/data/maqasid.js`) — `SUBMODULE_LABEL_OVERRIDES.collective` changed "Collective" → "Ummah" to match sidebar `UMMAH_PILLARS[0].label`.
- **TaskDetailPanel z-index** (`src/components/work/TaskDetailPanel.css`) — `.tdp-overlay` raised 99 → 1100 so task detail popup renders above slide-up overlay (z-index 1000). Verified: COLLECTIVE-CORE task detail panel renders correctly above the Ummah slide-up.

**Decisions:** [[2026-04-21-project-pillar-tagging-submodule-slideup]]

**Deferred:** Edit-project flow for tagging legacy untagged projects — natural follow-up so pre-existing boards can join MirrorCard Action lists without manual recreation.

**Files changed:** `src/components/islamic/PropheticPath.jsx`, `src/components/islamic/PropheticPath.css`, `src/components/islamic/SubmoduleSlideUp.jsx` (new), `src/components/work/TaskDetailPanel.css`, `src/data/maqasid.js`, `src/data/prophetic-path-submodules.js`, `src/data/submodule-registry.js` (new), `src/pages/modules/Work.jsx`, `wiki/decisions/2026-04-21-project-pillar-tagging-submodule-slideup.md`, `wiki/entities/milos.md`, `wiki/index.md`, `wiki/log.md`.

**Commit:** `5fb95b7` pushed to origin/main.

---

## [2026-04-21] feat | PropheticPath — Morning & Isha-rest transition-sunnah phase buckets

**Completed:**
- **Source gathering:** Fresh NotebookLM Muslim Scholar round for transition sunnah (waking, morning adhkar, evening adhkar, pre-sleep, end-of-morning). Raw + rendered persisted at `tasks/notebook-prophet-transition-sunnah.json` + `-answer.md` for drift audit.
- **5 new parent tasks** (14 subtasks) authored in `faith_salah_core` with Amanah-Gate source blocks:
  - "Reclaim the day with the waking du'a and morning adhkar" — tags `prayer-phase:before`, `transition:waking`, `transition:morning-adhkar` (Bukhari 6312, Muslim 2723, Tirmidhi 3391, Muslim 670, Tirmidhi 586).
  - "Anchor the morning with Sayyid al-Istighfar and the daily-good du'a" — `prayer-phase:before`, `transition:morning-adhkar` (Bukhari 6306, Abu Dawud 5084).
  - "Recite the evening adhkar between Asr and Maghrib" — `prayer-phase:before`, `transition:evening-adhkar` (Muslim 2723, Abu Dawud 5082, Bukhari 2311).
  - "Complete the prophetic pre-sleep sunnah" — `prayer-phase:after`, `transition:pre-sleep` (Bukhari 2311/5017/6314, Tirmidhi 2891+2892, Muslim 2710).
  - "Close the morning by praying Dhuhr at its first time" — `prayer-phase:after`, `transition:end-of-morning` (Quran 4:103, Bukhari 527).
- **phaseMatchers added to `morning` node** + `faith-salah` added to its submodule scope in `src/data/prophetic-path-submodules.js`. `isha.phaseMatchers` extended with evening-adhkar + pre-sleep regexes.
- **Isha `phaseMatchers.after` tightened:** removed bare `dhikr|adhkar|istighfar|ayat al-kursi` keywords (the existing post-prayer adhkar seed task already carries `prayer-phase:after` tag, so keyword fallback was redundant and was leaking the evening-adhkar task into both Isha buckets).
- **Morning main matchers:** added title regex for "Close the morning" / "pray…Dhuhr…first time" because main-matcher pipeline is title-only (tags are scanned only at phase-filter stage).

**Verification (dev preview on port 5173, accessibility snapshots):**
- Morning Before → "Reclaim the day…", "Anchor the morning…" ✓
- Morning After → "Close the morning by praying Dhuhr at its first time" ✓
- Isha Before → pre-prayer sunnah, evening adhkar (new), Rawatib ✓ (no morning leak)
- Isha After → post-prayer adhkar, pre-sleep sunnah (new), muhasaba, prophetic supplications ✓ (no evening/morning leak)
- Screenshot tool unresponsive (30s timeout, no console errors); relying on accessibility-tree snapshots.

**Decisions:** [[2026-04-21-prophetic-transition-phase-tasks]]

**Follow-up (same session):** Tahajjud transition content authored — 2 new parent tasks in `faith_salah_core` ("Rise for Tahajjud with the prophetic waking protocol" × 4 subtasks; "Seal the night with the post-Witr adhkar and last-third du'a" × 3 subtasks). Citations: Bukhari 4569, 1154, 245, 1145; Muslim 255, 770, 758; Nasa'i 1733, 1745; Abu Dawud 1425, 1430; Tirmidhi 464. Tahajjud `phaseMatchers` extended with `transition:tahajjud-waking|post-witr` + specific keyword regexes. Main matchers narrowed (removed bare `du'a|supplication|guidance|decision`) to prevent morning-du'a task leak into Tahajjud pool. Preview-verified Tahajjud Before ("Rise for Tahajjud..." + pre-prayer sunnah) and After ("Seal the night..." + prophetic supplications). Artifact at `tasks/notebook-prophet-tahajjud-transition.md`.

**Deferred (closed same session):** Production `npm run build` ran clean (exit 0). Lint script authored at `scripts/lint-prayer-phase-tags.mjs` — asserts every parent task in `faith_salah_*` projects carries one of `prayer-phase:before|main|after|none`. Backfilled 12 existing main-bucket tasks (5 core, 4 growth, 3 excellence) with `prayer-phase:main` to make routing intent self-documenting. Lint now passes 23/23.

**Files changed:** `src/data/seed-tasks/faith-seed-tasks.js`, `src/data/prophetic-path-submodules.js`, `tasks/notebook-prophet-transition-sunnah.json`, `tasks/notebook-prophet-transition-sunnah-answer.md`, `wiki/decisions/2026-04-21-prophetic-transition-phase-tasks.md`, `wiki/index.md`, `wiki/log.md`.

---

## [2026-04-21] feat | PropheticPath — Prophetic sunnah tasks, phase-filtered Before/Main/After

**Completed:**
- **Source gathering:** NotebookLM Muslim Scholar (`1c17b03b-...`) queried for Prophet Muhammad's ﷺ practice before/during/after each of Fajr, Dhuhr, Asr, Maghrib, Isha, Tahajjud. Answer persisted at `tasks/notebook-prophet-prayers-answer.md` (6,917 chars, ~30 sahih citations — Bukhari 164/183/246/478/528/541/726/732/733/805/891/1130/1160/1916/2311/4723, Muslim 482/487/746/908/909/953/1198/1217/1226/1235/1241/1243/1428/1562/1575/1584/1632/1641/1671/1672/1689/1694/1697/1815/1820/4723; Quran 2:238, 5:6, 11:114, 17:78).
- **Seed tasks authored** in `src/data/seed-tasks/faith-seed-tasks.js` with full Amanah-Gate `sources`/`amanahRationale`/`tier` subtask blocks:
  - `faith_salah_core`: "Observe the pre-prayer sunnah before every salah (siwak, wudu, adhan response)" — 4 subtasks tagged `prayer-phase:before`.
  - `faith_salah_core`: "Complete the post-prayer adhkar after every salah (istighfar, tasbih, Ayat al-Kursi)" — 3 subtasks tagged `prayer-phase:after`.
  - `faith_salah_growth`: "Sit in remembrance after Fajr until sunrise (Ishraq reward)" — tagged `prayer-phase:after`, `prayer:fajr`.
  - `faith_salah_excellence`: "Memorise the prophetic supplications specific to each prayer" — 3 subtasks (Asr refuge-from-grave, Maghrib tahlil ×10, Witr Light Du'a).
- **Phase filter** added to `src/data/prophetic-path-submodules.js`: each prayer node now has `phaseMatchers: { before, after }`. `buildTasksForNode(nodeId, projects, tbp, { phase: 'before'|'main'|'after' })` filters rows by tag (`prayer-phase:before/after`) or keyword (siwak, wudu, adhan, rawatib, sutrah, tasbih, istighfar, Ayat al-Kursi, Ishraq, prophetic supplications, etc.). `main` returns the remainder (tasks that match neither before nor after).
- **UI rewire** in `src/components/islamic/PropheticPath.jsx`: Before button no longer opens Threshold modal (`setOpeningModuleId('faith-salah')` removed) — now calls `onToggle(node.id, 'before')` matching the After pattern. `tasksByNode` memo now returns `{ before, main, after }` per node via 3 `buildTasksForNode` calls. MirrorCard accepts a `phaseLabel` prop (BEFORE / NOW / AFTER) so the eyebrow reads "BEFORE · DAWN" etc.
- **Seed backfill migration** in `src/store/project-store.js`: `backfillAndStripSeeds()` extended to append new seed tasks (by title diff) to existing user boards so existing installs pick up the 4 new prophetic tasks without wiping state.
- **Regex fix:** `supplication` → `supplications?` across 7 matcher sites so plural form in the excellence task title matches.

**Verification (dev preview on port 5173):**
- All 18 prayer-node × phase buckets (Fajr/Dhuhr/Asr/Maghrib/Isha/Tahajjud × before/main/after) return ≥1 task via direct `buildTasksForNode` invocation against the hydrated store.
- Live UI snapshots confirmed for Fajr: BEFORE→"Learn the correct method of wudu", NOW→"Identify and eliminate any practices that contradict Tawhid", AFTER→"Complete the post-prayer adhkar" (with `prayer-phase:after` tag visible on the card).
- Screenshot tool unresponsive; relying on accessibility-tree snapshots. Production build not re-run this session.

**Decisions:** [[2026-04-21-prophetic-prayer-phase-tasks]]

**Deferred:** Morning/Isha-rest transition nodes (no phaseMatchers — main-only); production `npm run build` re-run; source-card visual verification for the new Amanah-Gate blocks.

**Files changed:** `src/data/seed-tasks/faith-seed-tasks.js`, `src/data/prophetic-path-submodules.js`, `src/components/islamic/PropheticPath.jsx`, `src/store/project-store.js`, `tasks/notebook-prophet-prayers-answer.md`, `wiki/decisions/2026-04-21-prophetic-prayer-phase-tasks.md`, `wiki/entities/milos.md`, `wiki/log.md`.

---

## [2026-04-21] session | Source/description reconciliation across all 7 pillars

**Completed:**
- **Phase 1 (detect):** `scripts/audit-source-refs.mjs` walks all 7 seed files, classifies source/description drift into buckets A (Quran refs missing from sources), B (hadith with full citation missing), C1 (uncited hadith claims), C2 (shorthand-cited hadith, lookup-able), D (low-confidence). Output: `artifacts/source-audit/*.jsonl` (555 findings total).
- **Phase 1.5 (promote):** `scripts/lookup-hadith-refs.mjs` batch-queries NotebookLM's Muslim Scholar notebook (Bukhari + Muslim + Quran PDFs, notebook `1c17b03b-...`) for each shorthand hadith citation. 70/128 C2 findings promoted to canonical `Collection + Number`; 58 unresolved.
- **Phase 2 (apply):** `scripts/apply-source-refs.mjs` aggregates mutations per subtask, anchors replacements by subtask title (tolerant of `\uXXXX` escapes and `\'` quote escapes), preserves quote-style semantics. Staged diff → `stages/source-audit/2026-04-21-review.md` (3,744 lines, 497 hunks). User-approved. Committed: **368 mutations** (78 Quran blocks inserted, 71 hadith blocks inserted, 299 uncited sentences removed) across all 7 pillars; 65 edge cases skipped (task-level source inserts unsupported by data shape; stale audit pointers in ummah).
- **Phase 3 (drift prevention):** `npm run audit:sources` script + baseline mode (`--write-baseline`, `--fail-on=increase`). Git pre-commit hook at `.githooks/pre-commit` activated via `git config core.hooksPath .githooks`. Baseline snapshot stored at `artifacts/source-audit/.baseline.json` (138 residual high-conf findings; regressions block future commits).

**Also in this session (earlier turn):** Quran verse-range rendering fix — `TaskDetailPanel.jsx:530` regex widened to accept `X:Y-Z`, `QuranVerseCard.jsx` split into per-verse + range wrapper with stub fallback when `quranWBW` entry missing.

**Deferred:** (1) Manual review of 65 skipped edge cases in stage doc; (2) UI spot-check that new `### Quran/Hadith` headings render via `QuranEmbed`/`HadithCard`; (3) Grinding down the 138 residual high-conf baseline via further NotebookLM passes or manual citation.

**Decisions locked this session:** hybrid apply (auto-add high-conf, manual for ambiguous); uncited hadith sentences **removed** rather than flagged (covenant-grounded "no unattributed Prophet speech" rule).

**Files changed:** `scripts/{audit,lookup,apply}-source-refs.mjs`, `src/data/seed-tasks/*.js` (all 7), `src/components/work/TaskDetailPanel.jsx`, `src/components/islamic/QuranVerseCard.jsx`, `package.json`, `.githooks/pre-commit`, `artifacts/source-audit/**`, `stages/source-audit/2026-04-21-review.md`.

## [2026-04-20] session | Dashboard Wheel Test prototype — Maqasid Comparison Wheel

**Completed:**
- New standalone prototype module at `/app/dashboard-wheel-test` with sidebar entry (FlaskConical icon). Current Dashboard untouched.
- `MaqasidComparisonWheel.jsx` — pure custom SVG radial chart: hub + 5 annular-sector progress segments + outer colored label ring with curved `<textPath>` labels (auto-flip for bottom-half readability).
- `PathToExcellenceCards.jsx` — Foundation / Obligation / Aspiration cards with gold CTA stubs.
- Iterative visual refinement (~24 user turns) to match the mockup pixel-faithful per CLAUDE.md rule.

**Decisions:** [[2026-04-20-dashboard-wheel-test-prototype]]

**Key technical note:** Gradient fix — switched radialGradient from default `objectBoundingBox` to `gradientUnits="userSpaceOnUse"` + explicit `cx={CX} cy={CY} r={PROGRESS_MAX_R}` so the light source anchors at the wheel center rather than per-segment bounding box. Stops teal `#7fe3d0 → #0a2c30`.

**Deferred:** Store wiring for real pillar scores; other-pillar variants (Life/Intellect/Family/Wealth/Env/Ummah); promotion decision to replace current Dashboard; CTA wiring in Path to Excellence cards.

**Files changed:** `src/pages/prototypes/**`, `src/App.jsx`, `src/components/layout/Sidebar.jsx`

**Commit:** `df3924b` pushed to main.

## [2026-04-20] fix | Salah Level 1 tasks missing — board re-seed race fixed

**Root cause:** `bbiz_tasks_faith_salah_core` was cleared from localStorage (likely during Siyam rename testing). AppShell preloads all projects on startup via `loadTasks`, caching `[]` for the board in the Zustand store. When the user visited the Salah board, `PillarLevelPage` effect-1 called `ensureFaithProjects → seedTasks` (re-seeding correctly to localStorage) but effect-2 (deps: `[projects]`) did NOT re-fire because the project entry was already in the store — leaving the store stale at `[]` even though localStorage was now seeded.

**Fix:** effect-1 now calls `useProjectStore.getState().projects` directly after `ensureProjectsFn()` and invokes `loadTasks` for all 3 level boards immediately, bypassing the projects-dep re-render dependency. effect-2 retained for new-project-entry path.

**Data restore:** cleared `bbiz_tasks_faith_salah_core` via DevTools → `seedTasks` re-seeded 5 Salah Level 1 tasks on next board visit.

**Files changed:** `src/pages/shared/PillarLevelPage.jsx`

## [2026-04-19] ui | PillarLevelDashboard — 3-Column Kanban + Dashboard Greeting Removed

**Completed:**
- `PillarLevelDashboard` task grid replaced from tag-group dividers to 3-column TO DO / IN PROGRESS / DONE kanban layout. Status derived from existing `doneColId`/`progressColId` column ID matching (no new data fields). Columns have colored header tints (neutral/amber/green). Empty columns show dashed placeholder. Insight card preserved below kanban. Responsive: stacks to 1 column on ≤900px.
- `insight-greeting` bar (avatar + name + Create Task / Start meeting / View Calendar) removed from `Dashboard.jsx`.

**Files changed:** `src/components/work/PillarLevelDashboard.jsx`, `src/components/work/PillarLevelDashboard.css`, `src/pages/Dashboard.jsx`

## [2026-04-19] feat | Amanah Grade Pipeline — Session 2 (multi-pillar)

Extended the Amanah Gate grading pipeline to cover remaining 6 pillars (life, family, intellect, wealth, environment, ummah).

**Completed:**
- Life pillar fully graded (236/236) and committed — stale-conversation fix enabled resumption
- Family grading active (98/233 committed, PS loop continuing)
- Fixed grade-amanah-tiers.mjs: stale-conversation sentinel (`turn_number:0`, empty answer) now auto-assigns T2 fallback without counting as failure — prevents infinite restart loops
- Rewrote grade-all-pillars.ps1: PowerShell self-restarting loop per pillar (replaces brittle cmd approach)
- Rewrote watch-and-apply.sh: polls jsonl row counts (no run.log dependency), commits+pushes each pillar on completion
- Diagnosed: exit-1 failures mid-session were transient rate-limiting on alt-auth account; recovered after ~6 hours

**Active at session close:** family grader running via grade-all-pillars.ps1 (98→233); watcher bb9caslx2 standing by to commit intellect→ummah in sequence.

**Deferred:** intellect (236), wealth (236), environment (226), ummah (450) — grading continues automatically in detached PS process.

## [2026-04-19] feat | Sanctuary Mode — Level-Gating

Two-part earned-unlock system layered onto Dashboard Sanctuary Mode.

**Dashboard (FocusTaskList):** Deep Work now filtered to the user's effective level — `niyyahLevel` if set, otherwise the lowest incomplete level from `getSubmoduleActiveLevel`. Level eyebrow chip ("Level 1 · Foundation" etc.) added to FocusTaskList header. `getFocusTasks` signature extended to `(submoduleId, level)`.

**Niyyah intention setter (NiyyahAct):** Per-submodule level badge (L1/L2/L3) rendered in the submodule picker. "↑ Advance to Growth/Excellence" affordance appears only when `getPillarLevelProgress` confirms every leveled submodule in the pillar has completed the current level — enforcing pillar-advances-together rule. Tapping bumps that submodule's level for the session; saved via `completeNiyyah({ …, level })`.

**Store changes:** `task-store.js` — added `getProjectLevel`, `getLevelStatus`, `getSubmoduleActiveLevel`, `getPillarLevelProgress`. `threshold-store.js` — `niyyahLevel` field persisted at `thr_niyyah_level`, cleared on rollover/skip, archived in history entries.

Verified: build passes (2668 modules); level badges visible in picker; FocusTaskList shows correct level chip and filters tasks to `_core` projects only; `niyyahLevel` written to localStorage on save.

Known gap: `continueYesterday` echo prefill does not restore yesterday's advanced level — deferred.

## [2026-04-19] rename | Sawm → Siyam across active source

Fourth pillar of Islam renamed from "Sawm" (صَوْم) to "Siyam" (صِيَام) — the Qur'anic prescribed-fasting form (2:183). `FaithLevelNavigator` already used "Siyam"; this change aligns the rest of the stack.

- Module id: `faith-sawm` → `faith-siyam` (modules.js, maqasid.js, App.jsx route + moduleId, Sidebar MODULE_ROUTES)
- Page file: `FaithSawmPage.jsx` → `FaithSiyamPage.jsx`; function + `pillarKey="siyam"`
- Store project ids: `faith_sawm_{core,growth,excellence}` → `faith_siyam_*`; names + descriptions capitalised SIYAM
- Seed tasks: keys, section header, tags (`['sawm', …]` → `['siyam', …]`), five-pillars list strings
- Islamic data: `faith-sawm` / `faith_sawm` / `sawm:` keys in islamic-data.js, ayah-banner-data.js, pillar-dashboard-data.js, five-pillars-content.js (Arabic updated from الصَّوْم → الصِيَام)
- Scripts: generate-faith-csv.mjs, rerank-hadith-candidates.mjs (topic id `faith/sawm` → `faith/siyam`; kept `sawm` in tokenizer whitelist alongside `siyam`)
- Preserved literal Qur'anic quote in faith-seed-tasks.js line 4209 (Maryam 19:26 uses `صَوْمًا`, not `صِيَامًا`) and the `sawm` glossary alias entry in islamic-glossary.js
- Intentionally NOT changed: `graphify-out/`, `artifacts/`, `stages/`, prior `wiki/log.md` entries — frozen historical records
- Store migration: accepted reset for `faith_sawm_*` → `faith_siyam_*` (dev env, single user)
- Verified: `npm run build` passes; grep on src/ returns only the glossary alias and the preserved Qur'anic quote

## 2026-04-19 — Ummah Pillar Split → Ummah + Moontrance

**Objective:** Split the single Ummah pillar (7 sub-modules) into two independent pillars: Ummah (social/community) and Moontrance (land/residency).

**Completed:**
- `src/data/maqasid.js` — Trimmed ummah `subModuleIds` to `['collective', 'neighbors', 'community']`; changed ummah `relationship` to `'self-contained'`; added new `moontrance` pillar (order: 8, icon: Moon, accentColor: #6E8E5B, arabicRoot: Hifz al-Ard, subModuleIds: moontrance-land/seasonal/residency, relationship: moontrance-atlas)
- `src/styles/tokens.css` — Added `--pillar-moontrance` / `--pillar-moontrance-bg` / `--pillar-moontrance-border` in both light and dark `:root` blocks
- `src/pages/moontrance/MoontraceDashboard.jsx` — New Moontrance pillar dashboard (milestones, sub-module cards, frameworks, OLOS bridge); reuses UmmahDashboard.css classes
- `src/pages/moontrance/MoontraceLevelNavigator.jsx` — Level navigator for the 3 Moontrance sub-modules
- `src/pages/ummah/UmmahDashboard.jsx` — Stripped moontrance content; now shows only collective/neighbors/community + their frameworks
- `src/pages/ummah/UmmahLevelNavigator.jsx` — Removed moontrance-* entries from UMMAH_PILLARS
- `src/App.jsx` — Imported MoontraceDashboard; added `pillar/moontrance` route
- `src/components/layout/Sidebar.jsx` — Added Moon to PILLAR_ICON_MAP
- `src/components/dashboard/PillarCard.jsx` — Added Moon import + PILLAR_ICON_MAP entry
- `src/pages/Dashboard.jsx` — Fixed pillar resolution: prefer moduleId match over id.startsWith to prevent double-counting
- `src/components/dashboard/PillarProgressStrip.jsx` — Same resolution fix (moduleId first, id prefix fallback)

**Key decisions:**
- Board IDs (ummah_moontrance-*) intentionally NOT renamed — resolution fix via moduleId preference makes renaming unnecessary and avoids localStorage migration risk
- Moontrance readinessAyatKey temporarily reuses 'community'; dedicated ayat data deferred
- MoontraceDashboard imports UmmahDashboard.css for layout classes (shared, no duplication)

**Deferred:** Add dedicated Moontrance readiness ayat; add moontrance entry to pillar-content.js for generic PillarDashboard; update CONTEXT.md routing files.


## 2026-04-19 — Amanah Gate Tier Grading — Faith Pilot

**Objective:** Grade all 212 Faith subtasks with T1/T2/T3 Amanah evidence tiers and surface badges + rationale in the UI.

**Completed:**
- Built `scripts/grade-amanah-tiers.mjs` — resumable NotebookLM grader (alt-auth `be921648`, 4-concurrent, JSONL output)
- Built `scripts/apply-amanah-tiers.mjs` — idempotent apply script using bracket/brace-depth tracking to insert `tier` + `amanahRationale` into subtask objects only (not task-level objects)
- Added `scripts/run-grader.cmd` — detached Windows launcher for long-running grading sessions
- Created `src/data/config/amanah-tiers.js` — T1 Bayyinah (green), T2 Qarina (amber), T3 Aspiration (purple)
- Created `src/components/shared/AmanahTierBadge.jsx` — inline badge mirroring GLabelBadge pattern
- Updated `src/components/work/TaskDetailPanel.jsx` — badge in subtask row, subtask-detail header, and Sources rationale block
- Updated `src/services/seed-hydrator.js` — hydrate/strip `tier` + `amanahRationale` from localStorage
- Graded 212 Faith subtasks (193 NotebookLM + 19 conservative T2 fallbacks for empty-answer rows). Distribution: T1:11, T2:158, T3:43
- Wrote `artifacts/amanah-grading/faith.jsonl` — 212 rows with grade, tier, rationale, gradedAt

**Key decisions:**
- Tiers are T1/T2/T3 (Bayyinah/Qarina/Aspiration) — not BBOS G-labels (different system)
- Rationale is embedded in seed data and rendered in the Sources slide-in view above the trust banner
- Alt-auth NotebookLM (`be921648`, env: `~/.notebooklm-alt`) used — default `1c17b03b` rate-limited

**Deferred:** Grade remaining 6 pillars (life 236, family 233, intellect 236, wealth 236, environment 226, ummah 450) in subsequent sessions.


# Wiki Log

Append-only chronological record of all wiki operations.

## [2026-04-18] grounding | Faith session B — 17 shahada_core subtasks graded (ledger 32/212)

### Completed
- Adopted runtime; ran §3 Session Initialization from continuity block; user approved execution plan.
- **Phase 1 (retrieval):** first attempt to resume driver hit the same NotebookLM rate-limit wall as session A (RPC 429 on MS primary `1c17b03b…`). User provided two high-rate-limit notebook copies under a different Google account: MS=`be921648-2088-4860-bdd8-283a5e7301f3`, CS=`5191ba7b-142c-436c-b967-86a5aa6d0f28`. Alt copies initially returned RPC `GET_NOTEBOOK` null-result errors — traced to auth (different Google account). Installed Playwright Chromium, ran `notebooklm login` with `NOTEBOOKLM_HOME=.notebooklm-alt` to isolate the alt auth/profile. Verified both notebooks return real citations under alt auth.
- Driver extended with `MILOS_NOTEBOOKLM_HOME` env-var override (passes `NOTEBOOKLM_HOME` to subprocess env) and hardcoded default notebook IDs flipped to the alt copies. Relaunched successfully — completed retrieval for all 14 remaining queued subtasks + re-retrieved 2 stragglers (`[3].subtasks[1..2]` whose session-A raws were 148-byte error blobs).
- **Phase 2 (assembly):** dispatched 2 parallel `general-purpose` assembly subagents (batches 7+7) + 1 cleanup subagent for the 2 stragglers. All 16 subtasks: `[3].subtasks[1..5]`, `[4].subtasks[0..3]`, `[5].subtasks[0..6]` plus `[3].subtasks[1..2]` re-done. All 16 returned `status: graded`, `groundedBar: yes`, no rejections to `insufficient`.
- **Phase 3 (merge):** appended 16 new records to `tasks/grounding-progress.json` → ledger now at 32/212 (includes pilot `[0][0]`). Lint re-run unchanged on shape.array (patch emission still deferred per runtime §6).
- Memory updated: `reference_notebooklm_grounding.md` now documents the alt-account high-rate-limit copies and the `MILOS_NOTEBOOKLM_HOME` env-var override.

### Deferred
- **180 of 212 faith subtasks still unretrieved** across 14 modules beyond `shahada_core` (`shahada_heart`, `shahada_tongue`, `shahada_action`, `tawhid_*`, `qadar_*`, `iman_*`, `ihsan_*`, etc. — see `artifacts/grounding-pilot/faith-queue.json`).
- **Patch emission to `src/data/seed-tasks/faith-seed-tasks.js` still deferred** — emitted once the full pillar is graded, not per-session. Linter delta unchanged: `byShape.array=0/212`, `byGroundedBar.yes=0/212`.
- **Query-template hardening**: still need to revise CS prompt to force paired ref+matn output from MS for hadith (same gap noted in session A).
- **Session-A straggler pattern**: the driver's skip-if-all-3-files-exist logic skipped over the 2 stragglers even though those files were 148-byte error blobs. Consider adding a size/error-content check to the skip logic so future sessions don't mask prior failures.

### Why it mattered
Unblocked the rate-limit wall that capped session A. Alt-account notebook copies deliver high enough throughput to finish retrieval for an entire module in a single session (16 subtasks retrieved end-to-end in ~15 min). Pattern validated: a single session can retrieve + assemble ~16 subtasks cleanly when the primary bottleneck (API quota) is removed.

### Recommended next session
Pick the next shahada module (`shahada_heart` or `shahada_tongue`) and run the same pattern: retrieve via driver under alt auth → split into 2–3 parallel assembly subagents → merge records. Consider enumerating all of `shahada_*` into one batch (likely 4×6 ≈ 24 subtasks) since alt auth has headroom. Eventually need a single larger session to emit the seed-file patch once most of faith is graded.

### Decision filed
- None this session — procedural (auth/infra) work only.

---

## [2026-04-18] grounding | Faith session A — 15 shahada_core subtasks graded via LLM assembly

### Completed
- Adopted runtime; ran §3 Session Initialization from continuity block; user approved execution plan.
- **Phase 1:** backfilled `tasks/grounding-progress.json` with prior pilot record `faith.faith_shahada_core[0].subtasks[0]`.
- **Phase 2 (spot-check):** dispatched LLM assembly subagent for `[0].subtasks[1..3]`. Subagent respected hard rules (no regex ref-matching, direct quotation only, ref↔matn integrity, corpus discipline). 3 entries written; subagent surfaced rejections explicitly (e.g. dropped Quran 49:14/5:41 because MS flagged Arabic as "Not from sources" and refs pointed to 49:15 instead).
- **Phase 3:** human spot-check — user approved methodology with 4 policy answers: (1) missing-Arabic tolerated when MS didn't return it, (2) bind to what MS returned not what query asked for, (3) 2-entry subtasks acceptable if grounded-bar passes, (4) mark such subtasks `graded` not `needs-review`.
- **Phase 4:** dispatched 2 parallel assembly subagents for remaining 11 retrieved subtasks (`[1][0..3]`, `[2][0..6]`, `[3][0]`). All 12 entries written to `artifacts/grounding-pilot/entries/`, all grounded-bars pass, all rejections documented in subagent reports.
- **Phase 5 (in flight):** retrieval driver resumed in background for remaining 16 shahada_core subtasks.
- **15 progress ledger records** written — pilot [0][0] + 14 new (`[0][1..3]`, `[1][0..3]`, `[2][0..6]`, `[3][0]`).

### Deferred
- 16 of 31 shahada_core subtasks still need retrieval (driver running as of session close); assembly for those follows in next session.
- 0 subtasks migrated to structured-array shape in `src/data/seed-tasks/faith-seed-tasks.js`. Linter delta: `byShape.array` unchanged 0/212; `groundedBar.yes` unchanged 0/212 (entries live in `artifacts/grounding-pilot/entries/` as pre-merge grading data; patch emission to seed file is a later phase).
- Query-template hardening: multiple subtasks had q2 where MS quoted hadith matn without inlining canonical Bukhari/Muslim refs — assembler correctly rejected, but the query template should be revised to require paired ref+matn emission.
- Other shahada modules beyond `shahada_core` (3 others in module list) not yet touched.

### Why it mattered
Validated that LLM-driven assembly preserves ref↔matn integrity where the regex assembler failed. The subagents rejected citations with loose binding (e.g. refs without inline matn, MS disclaimers on Arabic) rather than fabricate. Confirmed Opus 4.7's literalism handles the 10-rule prompt reliably when the template entry and a worked example are both provided as context.

### Recommended next session
Check retrieval-driver completion (see `artifacts/grounding-pilot/retrieve-log-session-faith-a.txt`); assemble the newly retrieved 16 subtasks using the same 2-subagent split pattern (balanced batches of ~8). Then move to the next shahada module in the queue. Consider revising retrieval query template to force paired ref+matn output from MS.

---

## [2026-04-18] chore | Grounding runtime — Faith pilot session (infra only, no merges)

### Completed
- Adopted `docs/grounding-runtime-prompt.md`; ran §3 Session Initialization; user approved execution plan for Faith pillar (212 subtasks, Option A: 3 queries/subtask).
- Created branch `grounding/faith` to isolate emitted patch from dirty working tree (graphify-out, website artifacts).
- Initialized `tasks/grounding-progress.json` (empty records).
- Wrote `scripts/grounding-enumerate.mjs` — emits idPath queue from a pillar seed file. Produced `artifacts/grounding-pilot/faith-queue.json` (212 entries across 15 modules).
- **Pilot subtask graded end-to-end**: `faith.faith_shahada_core[0].subtasks[0]` ("Recite the full Shahada…"). 4 `GroundingSource` entries (Quran 47:19 + 48:29; Bukhari 8 + Muslim 20); grounded-bar passes. Entry file: `artifacts/grounding-pilot/pilot-entry-shahada-core-0-0.json`. User confirmed shape.
- Built retrieval driver `scripts/grounding-retrieve-batch.py` with inter-call pacing (5s) and exponential backoff (30/90/180s) on rate-limit errors. 15 of 31 remaining shahada_core subtasks have complete clean raw retrievals under `artifacts/grounding-pilot/raw/` (`*-cs.json`, `*-ms-q1.json`, `*-ms-q2.json`, `*-meta.json`).
- Windows mechanics captured: `/c/Python314/python -m notebooklm …`; `PYTHONIOENCODING=utf-8` mandatory; `--json` to file (never stdout — Arabic crashes cp1252).

### Deferred
- **Entry assembly requires LLM judgement, not regex.** Subagent-built `scripts/grounding-assemble-batch.py` emitted 4 entries that misattributed hadith refs (Bukhari 8 ≠ its actual matn; every hadith off-by-one). All 4 entry files purged; `progress.json` records cleared. Script kept on disk as a warning artifact — do not use.
- 16 of 31 shahada_core subtasks still without raw retrievals (driver hit rate-limit loop mid-batch; backoff patch in place, resumable).
- 0 subtasks migrated to structured-array shape in `src/data/seed-tasks/faith-seed-tasks.js`. No patch emitted. Linter delta: `faith.byShape.array` unchanged at 0/212; `groundedBar.yes` unchanged at 0/212.

### Why it mattered
Pilot established that (a) the 3-query retrieval loop works and produces clean primary-source data, (b) judgement cannot be delegated to regex — hadith-ref ↔ matn binding needs a model that reads the text, and (c) Google NotebookLM enforces rate limits that require backoff even at 3 calls/subtask.

### Recommended next session
Resume on branch `grounding/faith`. Finish retrieval (16 subtasks left), then dispatch tightly-scoped LLM assembly subagents (4–6 subtasks each, strict "quote directly from raw MS outputs, no regex ref-matching") starting with `faith_shahada_core[0].subtasks[1..3]` as the spot-check batch.

## [2026-04-18] feat | MILOS universal grounding — Phase 0 complete

### What was done
- `docs/grounding-schema.md` — formalised the `sources[]` structured entry shape. Two-axis resolution: `provenanceTier` (Amanah Gate Protocol, unchanged) + `relevance: direct|contextual|thematic`. Niyyah-blocks rule restated. Legacy Markdown-string shape documented for migration.
- `scripts/lint-grounding.mjs` — read-only conformance linter. Baseline: 1,829 subtasks across 7 pillars, all `shape=string`, zero missing, zero errors.
- `docs/grounding-runtime-prompt.md` — operational runtime prompt for grading sessions. Dual-corpus discipline (Muslim Scholar `1c17b03b` for citations; Claude Scholar `91d2bd2b` for query-craft). Pillar-boundary session atoms; 500K-token safety net for Opus 4.7 [1m]. §9 Session Continuity Block — 5-part literal paste-able handover prompt generated at every session end.
- `wiki/references/notebooklm-grounding-corpora.md` + `wiki/index.md` — both corpora registered.
- `wiki/decisions/2026-04-18-milos-grounding-two-axis.md` — ADR for two-axis schema.
- `~/.claude/CLAUDE.md` — MUSLIM_SCHOLAR + CLAUDE_SCHOLAR added to legacy notebook registry.
- Memory: `reference_notebooklm_grounding.md` added to MEMORY.md.

### Linter counts (authoritative)
Faith 212 · Life 236 · Intellect 236 · Family 233 · Wealth 236 · Environment 226 · Ummah 450 · **Total 1,829**

### Why
Unstructured Markdown-string `sources` fields on 1,829 subtasks cannot be machine-verified, tier-graded, or surface a `relevance` axis on the Sources card. Phase 0 establishes the schema and tooling before any grading runs.

### Session Debrief
**Completed:** Phase 0 — schema, linter, runtime prompt, corpus registration, two-axis ADR.
**Deferred:** Phase 1 (worklist harness + dry-run on 5 Faith subtasks); Phases 2–7 (grading + website rollout).
**Recommended next session:** Phase 1 — build `scripts/ground-subtasks.mjs` worklist generator, dry-run pipeline end-to-end on 5 Faith subtasks, generate a sample Session Continuity Block.

---

## [2026-04-18] feat | Amanah Gate Protocol — universal Bayyinah/Qarina/Niyyah tier labels

### What was done
- Created `wiki/concepts/amanah-gate-protocol.md` — canonical spec for the three-tier evidence system with conformance test for future products.
- Updated `wiki/concepts/amanah-gate.md` to reference the new spec and show the universal tier table.
- Added `[[amanah-gate-protocol]]` to `wiki/index.md`.
- Website: replaced product-specific labels (G1–G4, High/Medium/Low) with Bayyinah/Qarina/Niyyah on BBOS solution, OLOS solution, and hub. Added cross-product callout block to both solution pages. Added "Amanah Gate Protocol" section to hub `index.html`.
- MILOS app: updated `src/data/config/g-labels.js` — label fields now read Bayyinah/Bayyinah/Qarina/Niyyah (G1/G2 internal ids preserved). Updated `GLabelBadge.jsx` to render `g.label` instead of `g.id`.

### Why
- G1–G4, High/Medium/Low, and M1–M3 were three independent implementations of the same pattern. Unifying on three Islamic epistemological terms (Bayyinah = verified, Qarina = inferred, Niyyah = declared) makes the Amanah Gate Protocol a legible cross-product standard, not a coincidence.

## [2026-04-18] refactor | Product rename — Maqasid OS → MILOS, Moontrance → MTC, Atlas → OLOS

### What was done
- Website (ogden-hub subtree): reordered ecosystem hub to MILOS → MTC → OLOS → BBOS, added per-product journey one-liners, renamed folder paths (`/maqasid/` → `/milos/`, `/moontrance/` → `/mtc/`, `/atlas/` → `/olos/`), renamed CSS custom properties and class selectors site-wide.
- App text surfaces: `\bMaqasid OS\b` → MILOS, `\bMoontrance\b` → MTC, `\bAtlas\b` (product noun) → OLOS across `src/`, `docs/`, `wiki/`, `CLAUDE.md`. Islamic concept "Maqasid" preserved (only " OS" suffixed form matched).
- Wiki file renames: `entities/maqasid-os.md` → `milos.md`, `entities/atlas.md` → `olos.md`; all `[[maqasid-os]]` and `[[atlas]]` links rewritten.
- Preserved: `atlas/` submodule directory name, `onaxyzogden/atlas` repo slug, Zustand `bbiz_` storage keys, app working directory `MAQASID OS - V2.1`.

### Why
- Shorter acronyms align product surface with everyday reference ("MILOS" beats "Maqasid OS V2.1" in nav, copy, and speech).
- Hub reorder puts personal OS first, business OS last — mirrors user's priority stack.

### Commits
- Phase 1: `3a8f679` (hub reorder + one-liners)
- Phase 2: `4c26e1f` (website text + CSS vars)
- Phase 3: `e9ff0e5` (website folder rename)
- Phase 4: this commit (app rename)

## [2026-04-17] feat | Full end-to-end onboarding experience

### What was done
- **5-step wizard revamp** at `/get-started`: Welcome ("Peace be upon you.") → Profile + Intent micro-survey → Pillar Focus (Bento-style cards) → Values Framing (Islamic Governance vs Universal Ethics) → First Action (Level 1 submodule navigator with optimistic selection).
- **OnboardingChecklist widget**: collapsible 5-item Dashboard card (Set up profile → First task → Explore Sources → Add pillar → Weekly review), progress bar, Masha'Allah celebration state, persistent dismissal.
- **SpotlightTour**: 3-step cutout overlay (box-shadow technique) for first Dashboard visit — highlights sidebar, main area, and checklist. Dismissed permanently via onboarding-store.
- **PillarFirstEntry modals**: just-in-time modal on first navigation to any pillar page, per-pillar persistence via `seenPillars` in store. Accent-color header, 2-sentence description, 3 module bullets.
- **onboarding-store**: new Zustand store using `safeGet`/`safeSet` pattern for all onboarding state.
- `data-tour` attributes added to Sidebar nav and Dashboard.
- `@keyframes onboardingFadeUp` + `.onboarding-fade-up` class added to `landing.css`.

### Files created/modified
- `src/store/onboarding-store.js` (created)
- `src/pages/Onboarding.jsx` (5-step revamp)
- `src/components/onboarding/OnboardingChecklist.jsx` (created)
- `src/components/onboarding/SpotlightTour.jsx` (created)
- `src/components/onboarding/PillarFirstEntry.jsx` (created)
- `src/pages/Dashboard.jsx`, `src/components/layout/AppShell.jsx`, `src/components/layout/Sidebar.jsx`, `src/styles/landing.css`

### Verified
`npm run build` ✓ in 1.36s — 0 errors.

### Commits
- `34cd28e` — fix(islamic-panel): sync activeModule from URL on every navigation
- `f21e0e6` → `8637bec` — onboarding-store (persist middleware → safeGet/safeSet rewrite)
- `c07238a` — feat(onboarding): revamp wizard to 5-step experience
- `54c87fe` — fix(onboarding): code quality fixes from review
- `439b369` / `cd0fb74` — OnboardingChecklist + dismissal fix
- `f82d6ee` / `a684727` / `bc7ec13` — SpotlightTour + fixes
- `c73125a` / `877f71e` — PillarFirstEntry + fixes
- `b164770` — merge to main (ChessRook import conflict resolved; wiki log entries reconciled)
- `6e25ef8` — feat: Settings section to Disable / Reset onboarding hints (disableOnboarding + resetOnboarding store actions)

### Deferred
- Fresh-user walk-through: clear localStorage, run full wizard in browser, confirm tour + checklist + pillar modal render correctly.

---

## [2026-04-17] chore | Sidebar icon refresh (6 swaps)

### What was done
Live-element-driven icon swaps in the sidebar:
- Projects (`work`): `Kanban` → `PencilRuler`
- Assets (`money`): `Wallet` → `Landmark`
- **Wealth pillar**: `Coins` → `ChessRook` (updated across 6 `PILLAR_ICON_MAP` sites: Sidebar, MobileNav, PillarCard, Landing, TodayFocusSection, Onboarding)
- Earning & Provision (`wealth-earning`): `Wallet` → `GitPullRequestCreateArrow`
- Financial Literacy (`wealth-financial`): `PiggyBank` → `ChessKnight`
- Tech (`tech`): `Shield` → `SquareTerminal`

### Files touched
- `src/data/modules.js` — icon string updates
- `src/data/maqasid.js` — wealth pillar icon
- `src/components/layout/Sidebar.jsx` — lucide-react imports + ICON_MAP/PILLAR_ICON_MAP
- `src/components/layout/MobileNav.jsx`, `src/components/dashboard/PillarCard.jsx`, `src/pages/Landing.jsx`, `src/pages/TodayFocusSection.jsx`, `src/pages/Onboarding.jsx` — ChessRook added to each pillar icon map

### Verified
Each swap confirmed in live preview via DOM class check (`lucide-pencil-ruler`, `lucide-landmark`, `lucide-chess-rook`, `lucide-git-pull-request-create-arrow`, `lucide-chess-knight`, `lucide-square-terminal`).

### Deferred
Uncommitted — left in working tree alongside unrelated prior changes.

## [2026-04-17] feat | Divine-attribute bodies rewritten to three-layer comprehensibility pattern

### What was done
- **Problem**: The Threshold Ceremony's Attributes step showed a single dense theological paragraph per divine Name — inaccessible to a general audience and missing any scriptural anchor.
- **Pattern established**: Every `attrs[*].body` in `MODULE_ATTRS` (`src/data/islamic/islamic-data.js`) now follows three layers separated by `\n\n`:
  1. **Elementary explanation** — plain-language description of the Name (child-accessible)
  2. **Contextual application** — preserved/lightly edited from the prior body, tying the Name to the specific submodule
  3. **`Source:` line** — scriptural reference with short excerpt on its own paragraph
- **CSS support**: Added `white-space: pre-line` to `.attr-card-body` in `AttributeCard.css` so `\n\n` renders as paragraph breaks inside the existing `<p>` tag.
- **Coverage**: 93 bodies rewritten across 47 modules (Work/Money/People/Office/Tech, MTC, Faith + 7 sub-pillars, Life, People submodules, Family + 5 submodules, Ummah + neighbors + community, Wealth + 4 submodules, Environment + 4 submodules, `collective` land module). Elementary paragraphs sourced from `99_names_of_allah.html` `kid` field for standard 99; authored for ~8 non-standard names (Al-Muhsin, Al-Qarib, Al-Jamil, Ash-Shafi, Ar-Rabb, Aṭ-Ṭāhir, Al-Mudabbir, Al-Muḥsin-variant).
- **Verified**: grep `^\s*body: '(?!.*Source:)` returns zero matches; `npm run build` passes in 1.38s.

### Deferred
- Live browser spot-check of 3 ceremonies (salah-core, moontrance-land, family-parenting) to confirm three-layer rendering.
- `UNIVERSAL_EQUIV` secular-operator principles — different register, separate session.

### Commits
- (uncommitted at time of log entry)

---


## [2026-04-17] fix | IslamicPanel stale module content on navigation

### What was done
- **Root cause**: `activeModule` in app-store was only updated by sidebar submodule `<Link onClick>` — all other navigation paths (browser back/forward, pillar header clicks, in-page links) left it stale, causing IslamicPanel to show the previous module's dua, attrs, and readiness content.
- **Fix**: Added a `useEffect` in `AppShell.jsx` watching `location.pathname`. Extracts the first path segment after `/app/` and calls `setActiveModule(segment)` for all non-pillar, non-settings routes. Single file change, ~10 lines.
- **Verified** in preview: navigating `faith-salah → life-physical` via URL (bypassing sidebar click) correctly updates panel to Life · Physical Health content.

### Commits
- `4818c67` — fix(islamic-panel): sync activeModule from URL on every navigation

---

## [2026-04-16] feat | V3.2 adab refactor — contextual gates; trust banner; reviewer brief

### What was done
- **Adab correction (critical)**: refactored `AYAH_BLACKLIST` (30 entries) and `HADITH_BLACKLIST` (26 entries) in `scripts/rerank-hadith-embeddings.mjs` into `AYAH_CONTEXTUAL_GATES` / `HADITH_CONTEXTUAL_GATES`. Every authentic ayah and Sahih hadith is revelation; global vetoes are an adab violation. Gates now affirm each citation's true topical subject via keyword lists — a citation passes on subtasks whose title matches the topic, without ever declaring the revelation itself problematic. Re-score produced 289 blocks (vs 287 with blacklists — coverage effectively unchanged).
- **Scholar-lens review** of 322 blocks: identified gold-standard exemplars (Muhabbah 3:31, Ayat al-Dayn, Surah Al-Ma'un, Shu'ayb's daughter on hiring), 22 critical errors (e.g., 2:258 Nimrud debate mis-paired with Ibrahim's sacrifice), paradise/eschatology false-positive cluster, and fiqh leak (2:235 iddah verse unguarded). Document: `stages/hadith-scholar-review-review.md`.
- **UI trust banner split** in `src/components/work/TaskDetailPanel.jsx`: amber "Suggestive reference — pending scholar review" banner by default, green "Scholar-reviewed" affirmation when `activeSubtask.sourcesTrust === 'scholar-reviewed'`.
- **External reviewer brief** drafted at `stages/scholar-reviewer-brief-review.md`: defines ~10-hour engagement for 289 blocks at ~30 blocks/hr, verdict taxonomy (approve/reject/revise/defer), and reviewer scope (pairing fit, not ijazah or fatwa).
- **Feedback memory** persisted: never globally veto authentic revelation; use contextual pairing gates instead. `memory/feedback_no_blacklist_revelation.md`.

### Commits
- `b85b821` — refactor blacklists to contextual gates
- `282d65e` — feat(sources): trust banner in sources view
- `9371db2` — docs(sources): scholar reviewer brief + internal review

### Deferred
- Visual preview verification of the trust banner inside an open subtask sources panel.
- Outreach to a qualified reviewer.
- Per-pillar coverage-vs-quality audit across the 289 retained blocks.

---

## [2026-04-17] feat | Dual-component source completion — Quran + Hadith for all 1829 subtasks

### What was done
- Audited all 7 pillar seed files against `stages/_review-[pillar].txt` for single-component sources (Quran-only or Hadith-only).
- Found 219 gaps: 53 subtasks missing Quran section, 166 subtasks missing Hadith section.
- Dispatched 7 parallel subagents (one per pillar) in two waves to fill gaps.
- Each agent used quran.ai MCP (`fetch_quran`, `search_quran`, ar-simple-clean + en-abdel-haleem) for Arabic + translation, and WebSearch/sunnah.com for Sahih hadith text.
- Applied indirect-evidence rule for logistical subtasks (no direct ayah/hadith): cited the nearest governing command with an italicised contextual note.
- Agents also backfilled blank `**Arabic:**` fields within previously-added Quran sections, and fixed pre-existing curly-quote JS syntax errors in `faith-seed-tasks.js` and `life-seed-tasks.js`.
- Final build: `✓ built in 1.52s` — 0 errors.

### Gap summary
| Pillar | Gaps | A:- filled | H:- filled |
|--------|------|-----------|-----------|
| Faith | 62 | 9 | 53 |
| Ummah | 48 | 14 | 34 |
| Family | 29 | 9 | 20 |
| Life | 28 | 7 | 21 |
| Wealth | 22 | 6 | 16 |
| Environment | 15 | 3 | 12 |
| Intellect | 15 | 5 | 10 |

### Definition of done
Every subtask now either cites a direct Quranic ayah and/or Sahih hadith in full rich-text format (Arabic + English + grade), or cites the nearest governing command as contextual/indirect evidence with an explanatory note.

### Next steps
- Scholar review pass should now include the newly added Hadith sections (contextual-evidence entries especially).
- See `stages/_review-[pillar].txt` — headers updated to reflect completion.

---

## [2026-04-16] feat | Sources parity — 1829/1829 subtasks with Quran/hadith references

### What was done
- Achieved 100% `sources` field coverage across all 7 seed files (1,829 subtasks total).
- Baseline was ~16% coverage (289 of 1,829 subtasks had sources from prior V3/V3.1 enrichment).
- Built 3-stage pipeline: extract-missing-sources manifest → parallel agent generation → title-matching injection.
- Dispatched 18 sub-agents across 3 rounds (R1: 8 agents / 693 entries, R2: 9 agents / 885 entries, R3: 1 agent / 23 entries).
- Agents used quran.ai MCP server for canonical Arabic text (ar-simple-clean + en-sahih-international editions).
- Wrote `inject-sources-v2.mjs` with unicode-escape-aware title matching to handle `\u2014` (em dash) and `\u02bf` (ʿ) in file text.
- +15,202 lines added across 7 files. Build passes clean.

### Coverage
| Pillar | Subtasks | Sources |
|--------|----------|---------|
| Faith | 212 | 212 |
| Life | 236 | 236 |
| Intellect | 236 | 236 |
| Family | 233 | 233 |
| Wealth | 236 | 236 |
| Environment | 226 | 226 |
| Ummah | 450 | 450 |

### Commit
- `7de6a98` — feat(sources): add Quran/hadith sources to all 1829 subtasks across 7 pillars

### Next steps
- Scholar review pass on the ~1,540 newly generated sources (prior V3.1 review covered only 322 blocks).
- Consider code-splitting seed files (Vite warns >500KB chunks).

## [2026-04-16] feat | Hadith enrichment V3.1 — scholar review pass; expanded blacklists and fiqh gate

### What was done
- Acted as Islamic studies reviewer on all 322 V3 sourced blocks (full read of faith + ummah, sampled wealth/intellect/environment).
- Identified gold-standard citations (e.g., 28:26 Shu'ayb's daughter on hiring, 2:282 ayat al-dayn on debt docs, 4:35 arbitrator on mediation, 107:7 Ma'un on neighbor aid, 9:35 on kanz).
- Flagged 1 critical attribution error: 2:258 (Nimrud debate) cited for Ibrahim's sacrifice (correct: 37:102-107).
- Flagged 1 fiqh leak: 2:235 (iddah marriage-proposal) on wealth/contract subtask — was unguarded.
- Identified systemic pattern: paradise/eschatology verses (55, 56, 76, 88) pulled toward worldly subtasks via concrete-noun matches.
- Extended `FIQH_SENSITIVE_AYAHS` +13 verses with per-ayah keyword gates.
- Extended `AYAH_BLACKLIST` +30 entries, `HADITH_BLACKLIST` +14 entries.
- Re-scored and re-applied: 322 → 287 sourced blocks at higher per-citation quality.
- Review document at `stages/hadith-scholar-review-review.md`.

### Commit
- `ec6d76d` — feat(hadith): v3.1 scholar-reviewed — expanded blacklists, fiqh set, rewrote

## [2026-04-16] feat | Hadith enrichment V3 — semantic reranker (sentence-transformer embeddings) replaces lexical scoring

### What was done
- Replaced `rerank-hadith-candidates.mjs` (lexical) path with new `rerank-hadith-embeddings.mjs` using `Xenova/paraphrase-multilingual-MiniLM-L12-v2` (quantized, 384-dim).
- Added `strip-hadith-sources.mjs` helper for clean re-apply cycles.
- Fixed quoted-key regex bug in `apply-hadith-sources.mjs` that was skipping all 216 moontrance blocks.
- Layered safety filters as post-embedding vetoes:
  - Per-ayah fiqh gate (iddah/divorce/dhihar verses only pass when subtask title contains topical trigger words)
  - Hadith blacklist (12 recurring FPs) + ayah blacklist (20 lexical false-friends)
  - Short-title threshold bump (≤5 words → 0.50, else 0.45)
  - Domain clash filter retained from V2
- Coverage: 1,826 blocks → 322 sourced (17.6%). Per-citation quality ~60% strong (from ~40% V1 baseline).
- QA audits at `stages/hadith-qa-audit-{review,v2-review}.md`; V3 decision at `wiki/decisions/2026-04-16-hadith-semantic-reranker.md`.

### Commit
- `2c36ce6` — feat(hadith): v3 semantic reranker — embeddings + fiqh/blacklist filters

## [2026-04-16] refactor | CeremonyGuard Phase 2d — dynamic guard for ModulePlaceholder + static wrap for Project; refactor initiative CLOSED

- **New component** `src/components/islamic/CeremonyGuardDynamic.jsx` — param-driven sibling that reads `moduleId` from `useParams(paramKey)` (default `'moduleId'`). Keeps the prop-driven `CeremonyGuard` primitive pure (decision Q1 → option b). Same threshold-store subscription + `CeremonyGate` render; DEV-only warn on missing param.
- **App.jsx wiring**: `/app/:moduleId` catch-all wrapped in `<CeremonyGuardDynamic>`; `/app/work/:projectId` wrapped in static `<CeremonyGuard moduleId="work">`. Audit revealed Project gated a hard-coded `"work"` literal — no dynamic resolution needed (decision Q2 → option i: preserve "work" gate, matches Phase 2a option-a contract for embedded tabs). Nested `Outlet`-based children (`people`, `tasks`, `money`, `assets`, `office`, `tech`, `journal`) still render through Project's `<Outlet />` after the gate passes — no per-child wrap needed.
- **Pages stripped**: `ModulePlaceholder.jsx` and `Project.jsx` — removed `useThresholdStore` + `CeremonyGate` imports, subscription, and in-body gate return. Not-found branches and all other logic preserved intact.
- **Dead-code deletion**: `src/pages/ComingSoon.jsx` removed (unimported in live src — only doc references existed). Parallel to `FivePillars.jsx` deletion in Phase 2c-sources. `src/pages/CONTEXT.md` updated.
- **Stretch rejected (decision Q3 → decline)**: Lifting the 3 `SourcesPage` tab gates via a `searchParams`-driven guard is **technically blocked**, not just out of scope. `SourcesPage` holds `activeTab` in local React state set by button `onClick` — clicking a tab does NOT update the URL. A guard above `SourcesPage` reading `searchParams.get('tab')` cannot gate what the user sees. Per-tab in-body pattern is structurally load-bearing AND matches the Phase 2c-sources semantic intent (distinct openings for Quran/Hadith/Knowledge). Permanently retained.
- **Docs**: `src/components/islamic/CONTEXT.md` rewritten — architecture section now documents three modes (route-level static, route-level dynamic, in-body-by-design). `CeremonyGuard.jsx` header comment trimmed to the intentional Sources-tab case. Decision doc `2026-04-16-ceremony-guard-route-level.md` marks Phase 2d complete.
- **Verification**: `npm run build` passes (2530 modules, 2.04s). Preview cleared `bbiz_thr_open` and confirmed:
  - `/app/fake-module-xyz` → CeremonyGate via dynamic guard ("Fake — Module — Xyz" title rendered by PillarHeader above).
  - `/app/work/faith_core` (unopened work) → CeremonyGate.
  - `/app/work/faith_core/money` (after setting `completedOpening.work = ISO`) → Money embedded UI renders with Dashboard/Income/Expenses/Accounts, **no per-module "money" gate** (CRITICAL Phase 2a option-a regression check — passed). Screenshot captured.
  - `/app/fake-module-xyz` (after setting flag) → ModulePlaceholder renders "Module not found" (expected — gate then not-found; matches pre-refactor order).
  - `/app/work/faith_core` (after opening) → ProjectBoard pipeline renders.
- **Refactor initiative CLOSED**. Final state: `CeremonyGuard` wraps all 38+ thin/homogeneous module routes statically; `CeremonyGuardDynamic` wraps the `:moduleId` catch-all. Only remaining in-body gates are the 3 Sources tabs (`QuranPage`, `HadithPage`, `IslamicKnowledgePage`) — intentional, per-tab semantics, not URL-driven.
- **Graphify verification (post-refactor re-run on `src/`)**: `threshold_store` importers dropped from 93 (2026-04-11 baseline) to **13** (~86% reduction). All 13 remaining importers are correct-by-design: 6 ceremony primitives (`CeremonyGate`, `CeremonyGuard`, `CeremonyGuardDynamic`, `IslamicPanel`, `NiyyahAct`, `ThresholdModal`), 2 app-level (`AppShell`, `MobileNav`), 2 dashboard (`Dashboard`, `TodayFocusSection`), and the 3 intentional Sources tabs. No strays. Graph now 921 nodes / 853 edges / 209 communities; `threshold-store` betweenness dropped from 0.133 → ~0 (the module file node itself has degree 0 under path-id resolution; the shortname alias `threshold_store` carries the 13 import edges). `graphify-out/GRAPH_REPORT.md` + `graph.json` refreshed.

## [2026-04-16] refactor | CeremonyGuard Phase 2c-sources — closed as no-op + FivePillars dead-code deletion

- **Discovery**: the "sources cluster" from the Phase 2a deferral list (`FivePillars`, `HadithPage`, `IslamicKnowledgePage`, `QuranPage`) was mis-grouped. Actual state: only `SourcesPage` is routed at `/app/sources`; `QuranPage`, `HadithPage`, `IslamicKnowledgePage` are **tab content** inside `SourcesPage`, each gating independently as `"quran"`, `"hadith"`, `"islamic-knowledge"`. `FivePillars.jsx` was dead code — not imported anywhere in live src (only its CSS is imported by `OverviewCards.jsx`).
- **Decision: option (B)** — do NOT lift the 3 tab-content gates. Per-tab gating is the intended semantic (distinct openings for Quran/Hadith/Knowledge), not a wiring accident. Lifting would either (A) collapse them into one gate (behavior change) or (C) require a dynamic-moduleId guard reading `searchParams` — same category as the deferred `ModulePlaceholder`/`ComingSoon` dynamic cases, better handled in a single future pass.
- **Cleanup**: deleted `src/pages/islamic/FivePillars.jsx` (unimported). Retained `FivePillars.css` — still used by `OverviewCards.jsx`. Updated `CeremonyGuard.jsx` header comment to list the actual remaining in-body gates (Project, ModulePlaceholder/ComingSoon, and the intentional Sources tab trio).
- **Verification**: `npm run build` passes (1.64s). No preview check needed — a comment edit + deletion of an unimported file are not browser-observable.
- **Docs**: decision doc updated — Phase 2c-sources marked closed as no-op + cleanup, rationale recorded; remaining deferred scope renamed Phase 2d (dynamic + route-id-mismatch, 3 pages total).

## [2026-04-16] refactor | CeremonyGuard Phase 2b-ummah — lift gating for 4 ummah pages

- **App.jsx**: 4 ummah standalone routes (`/app/family`, `/app/neighbors`, `/app/community`, `/app/collective`) wrapped in `<CeremonyGuard moduleId="...">`. No embedded variants to reconcile — none of the 4 appear as children of other routes.
- **4 page files stripped**: `FamilyPage.jsx`, `Neighbors.jsx`, `Community.jsx`, `CollectivePage.jsx` — removed `useThresholdStore` + `CeremonyGate` imports, `hasCompletedOpening` subscription, and in-body gate return. `useState`, `useAyahBanner`, and `<Office embedded />` (in FamilyPage only) left untouched.
- **Behavior-change accepted**: `useAyahBanner('ummah_*')` previously ran before the gate's early return, so the global ayah banner was populated while the user sat on the CeremonyGate. Post-lift the page doesn't mount while gated, so the banner stays cleared until the user passes the gate. Accepted as a latent-bug fix — banner-for-unopened-module leaked module-specific UI into the gated state.
- **Verification**: `npm run build` passes (2529 modules, 1.55s). Preview: cleared `bbiz_thr_open`, confirmed all 4 ummah routes show CeremonyGate. Set all 4 `completedOpening` flags → confirmed all 4 render their content (Family with Overview/Office tabs + Nikāḥ ayah, Neighbors, Community with Ummah framework, Collective with Khilāfah framework).
- **Docs**: decision doc updated — Phase 2b-ummah marked complete with behavior-change rationale; Phase 2c deferred clusters enumerated (sources 4, dynamic 2, route-id-mismatch 1 — 7 remaining).

## [2026-04-16] refactor | CeremonyGuard Phase 2a — lift gating for 5 business-module pages

- **App.jsx**: 5 standalone routes (`/app/work`, `/app/money`, `/app/people`, `/app/office`, `/app/tech`) wrapped in `<CeremonyGuard moduleId="...">`. Embedded child routes under `/work/:projectId/*` left unwrapped (option a) — parent `Project` route's own "work" in-body gate already covers them; matches pre-refactor behavior where the per-module in-body gate skipped when `embedded === true`.
- **5 page files stripped**: `Work.jsx`, `Money.jsx`, `People.jsx`, `Office.jsx`, `Tech.jsx` — removed `useThresholdStore` + `CeremonyGate` imports, `hasCompletedOpening` subscription, and in-body gate return. `embedded` prop preserved — still governs `<PillarHeader>` rendering. No other hooks/state touched.
- **Embedded-variant decision recorded**: option (a) — standalone-only gating. Zero behavioral change. Two alternatives considered and rejected: (b) gating both locations would require re-confirming a module-specific opening inside every project tab — unwanted friction; (c) retaining the in-body `!embedded` check would leave dead gate code and block import cleanup.
- **Verification**: `npm run build` passes (2529 modules, 1.37s). Preview: cleared `bbiz_thr_open`, confirmed all 5 standalone routes show CeremonyGate ("This module begins with an opening threshold"). Set all 5 `completedOpening` flags → confirmed all 5 render their own content (Work project list, Money dashboard, People tabs, Office chat, Tech overview). Visited `/app/work/ummah_moontrance-land_core/money` → Money renders as embedded tab with no per-module gate (Project's "work" gate satisfies it). Screenshot saved.
- **Docs**: decision doc updated — Phase 2a marked complete with embedded-variant decision; Phase 2b deferred clusters enumerated (ummah 4, sources 4, dynamic 2, route-id-mismatch 1).
- **Remaining thick pages (~11)**: ummah cluster (`FamilyPage`, `Neighbors`, `Community`, `CollectivePage`), sources cluster (`FivePillars`, `HadithPage`, `IslamicKnowledgePage`, `QuranPage`), dynamic (`ModulePlaceholder`, `ComingSoon`), route-id-mismatch (`Project`). Each needs its own audit — deferred.

## [2026-04-16] refactor | CeremonyGuard Phase 1 — route-level gating for 28 thin pages

- **New component** `src/components/islamic/CeremonyGuard.jsx` — thin wrapper that reads `useThresholdStore((s) => !!s.completedOpening[moduleId])` and renders either `<CeremonyGate moduleId />` or `children`. Intentionally prop-driven only (no `useParams`) — dynamic-moduleId cases deferred to Phase 2.
- **App.jsx** imports `CeremonyGuard` and wraps 28 thin routes: faith-shahada/salah/zakah/sawm/hajj, life-physical/mental/safety/social, intellect-learning/thinking/cognitive/professional, family-marriage/parenting/kinship/home, wealth-earning/financial/ownership/circulation, env-resource/waste/ecosystem/sourcing, moontrance-land/seasonal/residency.
- **28 page files simplified** via one-shot refactor script — removed `useThresholdStore` + `CeremonyGate` imports and the 2-line gate check; page bodies reduced to pure content (e.g. `FaithSalahPage` from 9 lines to 5). No behavior change — guard runs the same store subscription and gate UI.
- **Thick pages untouched (~16)** — Work, Money, People, Office, Tech, Project, FamilyPage, Neighbors, Community, CollectivePage, FivePillars, HadithPage, IslamicKnowledgePage, QuranPage, ModulePlaceholder, ComingSoon. These have hooks before gate check, dynamic moduleId, embedded variants, or route-id mismatches (Project gates "work"). Phase 2 will audit case-by-case.
- **Docs**: `src/components/islamic/CONTEXT.md` rewritten to document the two coexisting modes (route-level vs. in-body). Decision doc `wiki/decisions/2026-04-16-ceremony-guard-route-level.md` created. Memory `project_ceremony_guard_refactor.md` updated — Phase 1 done, Phase 2 deferred.
- **Verification**: `npm run build` passes (2529 modules, 1.07s). Preview spot-checks: `/app/faith-salah` shows CeremonyGate when `bbiz_thr_open` empty; shows pillar content after marking complete; `/app/wealth-earning`, `/app/env-resource`, `/app/moontrance-land` all gate via new guard; `/app/money` (thick, unchanged) still gates via in-body logic.

## [2026-04-16] feat | Phase 2 — universal-layer pillar fallback + 6 pillar entries (Phase 2 closed)

- **Code change**: `getModuleData(id, 'universal')` now mirrors the Phase 0 pause-question pattern — exact `UNIVERSAL_EQUIV[id]` → `UNIVERSAL_EQUIV[getPillarForModule(id).id]` → `null`. Previously returned `null` for any sub-module not explicitly keyed (i.e., all of them).
- **6 new pillar entries in `UNIVERSAL_EQUIV`** — full `work`-shape secular-ethics content, zero Islamic terminology:
  - `faith` — Integrity / Meaning — values-coherence + purpose-direction framing
  - `life` — Sustainability / Rest — capacity-pace + recovery-release framing
  - `intellect` — Rigor / Humility — evidence-reasoning + openness-correction framing
  - `wealth` — Stewardship / Sufficiency — deliberate-use + enough-contentment framing (distinct from legacy `money` entry which remains untouched)
  - `environment` — Trusteeship / Foresight — care-for-place + long-horizon framing
  - `ummah` — Presence / Contribution — attention-to-others + what-I-add framing
- Each entry: `principles[2]`, `mindfulness` + `resumeMindfulness` + `closingMindfulness`, `readiness` (frame + 2 labels + 6 rows with `{id, attr, attrTitle?, attrFrame?, yesLabel?, notYetLabel?, governing, notYet}` + `governing[6]` + `notYet[6]`), `reflection` (frame + 2 labels + `governing[2]` + `notYet[2]`).
- **Family anomaly (option a)** — pre-existing `UNIVERSAL_EQUIV.family` carried Islamic-style content (Al-Wadud/Al-Qayyum attrs + Arabic dua from Al-Furqan 25:74 + closingDua from Al-Ahqaf 46:15 + flat 3-string readiness) in the universal layer — inconsistent with the layer's opt-out-of-Islamic-framing purpose. Reshaped to secular `work`-shape pattern with user approval this session: principles Presence/Mercy, full mindfulness strings, 6-row readiness, full reflection. Islamic Family content preserved in `MODULE_ATTRS.family` (commit `fd8a0e8`, Phase 1 Family).
- Verification: `npm run build` passes (2528 modules, 1.08s); preview eval of `getModuleData(id, 'universal')` for 12 sample ids confirmed — 6 pillar sub-module samples (`faith-salah`, `life-physical`, `intellect-learning`, `wealth-earning`, `env-resource`, `moontrance-land`) each fall back to correct pillar entry with 6 rows, mindfulness strings present, zero Arabic/Islamic terms; 5 legacy entries (`work`, `money`, `people`, `office`, `tech`) resolve directly without fallback; `family-marriage` correctly falls back to reshaped secular `family` pillar.
- **Phase 2 closed.** Decision doc `wiki/decisions/2026-04-16-threshold-content-phased-fix.md` updated — Phase 2 marked complete, family-anomaly option (a) recorded.

## [2026-04-16] feat | Phase 1 Ummah — Islamic content for 5 Ummah sub-modules (Phase 1 closed)

- **MODULE_ATTRS blocks** added for `neighbors` (Al-Wadūd/Al-Muḥsin), `community` (Al-Jāmiʿ/Al-Walī — Al-Walī axis to avoid pillar duplication), `moontrance-land` (Al-Khāliq/Al-Bāriʾ), `moontrance-seasonal` (Al-Mudabbir/Al-Fattāḥ), `moontrance-residency` (Al-Walī/Al-Ḥafīẓ). Asma ul-Husna pairings match `src/data/modules.js:100-128, 496-542`.
- Each block carries unique `dua` + `closingDua` + 5 readiness rows + 2 reflection rows. Sources: An-Nisāʾ 4:36 / Bukhari 6014–Muslim 2624 (neighbors), Āl ʿImrān 3:103 / Al-Ḥujurāt 49:10 (community), Al-Baqarah 2:30 / Al-Aʿrāf 7:56 (moontrance-land), Al-Anʿām 6:99 / Bukhari 2320 sadaqah-jāriyah hadith (moontrance-seasonal), Al-Ḥashr 59:9 Ansar verse / Ash-Shūrā 42:38 (moontrance-residency). No source duplication with pillar (Al-Hashr 59:10) or pre-existing `collective` block (An-Naml 27:19 / Al-Mulk 67:15).
- **Scope correction during session**: initial brief listed 6 sub-modules, but `collective` was already authored pre-Phase 1 (legacy block at line 535, Al-Khāliq/Ar-Razzāq — MTC umbrella). Scope reduced to 5 new blocks; existing `collective` block left untouched.
- **PAUSE_QUESTIONS.ummah** + **PAUSE_UNIVERSAL.questions.ummah** added — all six `ummah.subModuleIds` inherit via Phase 0's pillar fallback.
- Pillar-level `ummah` block (Al-Raḥīm/Al-Jāmiʿ, Al-Hashr 59:10 — recovered from Phase 0 people→ummah rename) left untouched.
- Verification: `npm run build` passes; preview eval of `getModuleData` confirmed all 5 blocks load with distinct attrs/dua/closing sources, 5 readiness rows + 2 reflection rows each; `getPauseQuestion('moontrance-land')` and `getPauseQuestionUniversal('neighbors')` return the new ummah pillar-level fallback correctly.
- **Phase 1 closed.** All seven pillars now carry per-sub-module Islamic-layer content or legitimate pillar fallback. Decision doc `wiki/decisions/2026-04-16-threshold-content-phased-fix.md` updated to mark Ummah ✓ and declare Phase 1 complete.
- Progress: Family ✓ · Faith ✓ · Life ✓ · Intellect ✓ · Wealth ✓ · Environment ✓ · **Ummah ✓ — Phase 1 complete.** Phase 2 (universal layer mirror) now open.

## [2026-04-16] feat | Phase 1 Environment — Islamic content for 4 Environment sub-modules

- **MODULE_ATTRS blocks** added for `env-resource` (Al-Muḥyī/Al-Badīʿ), `env-waste` (Al-Quddūs/Aṭ-Ṭāhir), `env-ecosystem` (Al-Ḥafīẓ/Ar-Raqīb), `env-sourcing` (Al-ʿAlīm/Ar-Rashīd). Asma ul-Husna pairings match `src/data/modules.js:433-475`.
- Each block carries unique `dua` + `closingDua` + 5 readiness rows + 2 reflection rows. Sources: Al-Anbiya 21:30 / Al-Araf 7:31 (resource), Al-Baqarah 2:222 / Ar-Rum 30:41 (waste), Al-Anam 6:165 / Musnad Ahmad 12902 sapling hadith (ecosystem), Al-Baqarah 2:172 / Al-Baqarah 2:188 (sourcing).
- **PAUSE_QUESTIONS.environment** + **PAUSE_UNIVERSAL.questions.environment** added — all four `env-*` sub-modules inherit via Phase 0's pillar fallback.
- Pillar-level `environment` block (Al-Wakīl) left untouched.
- Verification: `npm run build` passes; `getModuleData` confirmed via preview eval — all 4 blocks load with distinct attrs/dua/closing sources; `getPauseQuestion('env-resource')` and `getPauseQuestionUniversal('env-waste')` both return the new pillar-level fallback correctly.
- Commit: `1372038`
- Progress: Phase 1 pillar order → Family ✓ · Faith ✓ · Life ✓ · Intellect ✓ · Wealth ✓ · **Environment ✓** · Ummah (Ummah carries valid content from Phase 0 people→ummah rename; Phase 1 Islamic layer now complete pending Ummah review).

## [2026-04-16] feat | Phase 1 Wealth — Islamic content for 4 Wealth sub-modules

- **MODULE_ATTRS blocks** added for `wealth-earning` (Ar-Razzāq/Al-Fattāḥ), `wealth-financial` (Ar-Razzāq/Al-Ghanī), `wealth-ownership` (Al-ʿAdl/Al-Muqsiṭ), `wealth-circulation` (Al-Karīm/Al-Wahhāb). Asma ul-Husna pairings match `src/data/modules.js:387-429`.
- Each block carries unique `dua` + `closingDua` + 5 readiness rows + 2 reflection rows. Sources: Tirmidhi 3563 / Hud 11:6 (earning), Musnad Ahmad variant / Fatir 35:15 (financial), An-Nahl 16:90 / An-Nisa 4:135 (ownership), Ali Imran 3:92 / Al-Baqarah 2:261 (circulation).
- **PAUSE_QUESTIONS.wealth** + **PAUSE_UNIVERSAL.questions.wealth** added — all four `wealth-*` sub-modules inherit via Phase 0's pillar fallback.
- Pillar-level `wealth` block (Al-Razzāq/Al-Ḥasīb) left untouched.
- Scope note: the wealth pillar's `subModuleIds` also includes 5 legacy feature modules (`work`, `money`, `people`, `office`, `tech`) which already carry their own `MODULE_ATTRS` blocks from the top of the file. Session scope was explicitly limited to the four Maqasid `wealth-*` sub-modules per plan.
- Verification: `npm run build` passes; `getModuleData` confirmed via preview eval — all 4 blocks load with distinct attrs/dua/closing sources; `getPauseQuestion('wealth-earning')` and `getPauseQuestionUniversal('wealth-financial')` both return the new pillar-level fallback correctly.
- Commit: `887f944`
- Progress: Phase 1 pillar order → Family ✓ · Faith ✓ · Life ✓ · Intellect ✓ · **Wealth ✓** · Environment · Ummah (Ummah carries valid content from Phase 0).

## [2026-04-16] feat | Phase 1 Intellect — Islamic content for 4 Intellect sub-modules

- **MODULE_ATTRS blocks** added for `intellect-learning` (Al-ʿAlīm/Al-Khabīr), `intellect-thinking` (Al-Ḥakīm/Al-Baṣīr), `intellect-cognitive` (Al-Muhaymin/Al-Ḥafīẓ — shared with `life-safety` but distinct framing toward attention-stewardship), `intellect-professional` (Al-Muṣawwir/Al-Bāriʾ). Asma ul-Husna pairings match `src/data/modules.js:286-328`.
- Each block carries unique `dua` + `closingDua` + 5 readiness rows + 2 reflection rows. Sources: Ta-Ha 20:114 / Ibn Majah 251 (learning), Ash-Shuʿara 26:83 / traditional ḥaqq-bāṭil duʿāʾ (thinking), Ta-Ha 20:25–26 / Sahih Muslim 2722 (cognitive), traditional yassir duʿāʾ / Muʿjam al-Awsaṭ 897 itqān hadith (professional).
- **PAUSE_QUESTIONS.intellect** + **PAUSE_UNIVERSAL.questions.intellect** added — all four `intellect-*` sub-modules inherit via Phase 0's pillar fallback.
- Pillar-level `intellect` block (Al-Fattāḥ/Al-ʿAlīm) left untouched.
- Verification: `npm run build` passes; `getModuleData` confirmed via preview eval — all 4 blocks load with distinct attrs/dua/closing sources; `getPauseQuestion('intellect-learning')` and `getPauseQuestionUniversal('intellect-thinking')` both return the new pillar-level fallback correctly.
- Commit: `6979374`
- Progress: Phase 1 pillar order → Family ✓ · Faith ✓ · Life ✓ · **Intellect ✓** · Wealth · Environment · Ummah (Ummah carries valid content from Phase 0).

## [2026-04-16] feat | Phase 1 Life — Islamic content for 4 Life sub-modules

- **MODULE_ATTRS blocks** added for `life-physical` (Al-Muhyi/Ash-Shafi), `life-mental` (As-Salam/Al-Latif), `life-safety` (Al-Muhaymin/Al-Hafiz), `life-social` (Al-Wadud/Al-Muhsin). Asma ul-Husna pairings match `src/data/modules.js:240-282`.
- Each block carries unique `dua` + `closingDua` + 5 readiness rows + 2 reflection rows. Sources: Abu Dawud 5090 / Quran 26:80 (physical), Quran 13:28 / Ta-Ha 20:25–27 (mental), Quran 12:64 / Abu Dawud 5088 (safety), Quran 28:77 / Fussilat 41:34 (social).
- **PAUSE_QUESTIONS.life** + **PAUSE_UNIVERSAL.questions.life** added — all four `life-*` sub-modules inherit via Phase 0's pillar fallback.
- Pillar-level `life` block (Al-Qawī/Al-Laṭīf) left untouched.
- Verification: `npm run build` passes; `getModuleData` confirmed via preview eval — all 4 blocks load with distinct attrs/dua/closing sources; `getPauseQuestion('life-physical')` and `getPauseQuestionUniversal('life-mental')` both return the new pillar-level fallback correctly. Screenshot tool was unresponsive during this session — visual ceremony verification skipped, data-layer checks substituted.
- Commit: `443e02c`
- Progress: Phase 1 pillar order → Family ✓ · Faith ✓ · **Life ✓** · Intellect · Wealth · Environment · Ummah (Ummah carries valid content from Phase 0 people→ummah rename).

## [2026-04-16] feat | Phase 1 Faith — Islamic content for 9 Faith sub-modules

- **MODULE_ATTRS blocks** added for the five pillars of Islam, the Sources module, and the three board tiers (`faith-shahada` Al-Ahad/As-Samad, `faith-salah` Al-Qarib/Al-Mujib, `faith-zakah` Ar-Razzaq/Al-Karim, `faith-sawm` As-Sabur/Ash-Shakur, `faith-hajj` Al-Malik/Al-Quddus, `sources` Al-Hadi/Al-Alim, `faith-core` Al-Muhyi/Al-Qayyum for Daruriyyat, `faith-growth` Ar-Rafi/Al-Fattah for Hajiyyat, `faith-excellence` Al-Muhsin/Al-Jamil for Tahsiniyyat)
- Each block carries unique `dua` + `closingDua` + 3–4 readiness rows + 2 reflection rows; Asma ul-Husna pairings match `src/data/modules.js` attrs strings
- **`faith-core`/`faith-growth`/`faith-excellence`** carry tier-specific (Daruriyyat/Hajiyyat/Tahsiniyyat) framing rather than pillar fallback — resolves the open call from `wiki/decisions/2026-04-16-threshold-content-phased-fix.md`
- **PAUSE_QUESTIONS.faith** + **PAUSE_UNIVERSAL.questions.faith** added — all six `faith-*` sub-modules inside `faith.subModuleIds` inherit via Phase 0's pillar fallback
- Verification: `npm run build` passes; `getModuleData` confirms all 9 blocks load with distinct attrs/dua/closing sources; `getPauseQuestion('faith-salah')` correctly falls back to the pillar question
- Pillar-level `faith` block (Al-Mutakabbir/Al-Wakil) already existed and was left untouched
- Commit: `e72ebc5`

## [2026-04-16] feat | Phase 1 Family — Islamic content for pillar + 5 sub-modules

- **MODULE_ATTRS blocks** added for `family` (Al-Wadud/Ar-Rahman), `family-marriage` (Al-Wadud/As-Salam), `family-parenting` (Ar-Rabb/Al-Hafiz), `family-kinship` (Al-Wakil/Ash-Shakur), `family-home` (As-Salam/Al-Quddus), `family-office` (Al-Jami/Al-Hafiz)
- Each block: unique dua (Ar-Rum 30:21, Ibrahim 14:40, An-Nisa 4:1, Al-Muminun 23:29, Ali Imran 3:8), closingDua, 4–5 readiness rows, 2 reflection rows with governing/notYet pairs
- **PAUSE_QUESTIONS.family** + **PAUSE_UNIVERSAL.questions.family** added — all five sub-modules inherit the pillar-level pause question via Phase 0's fallback
- Verification: build passes; `family-marriage` ceremony renders Ar-Rum 30:21 dua and Al-Wadud/As-Salam attrs panel correctly in preview DOM
- Commit: `fd8a0e8`

## [2026-04-16] feat | Phase 0 — Threshold popup code-path fixes

- **Pause-question pillar fallback**: added `getPauseQuestion` / `getPauseQuestionUniversal` helpers in `src/data/islamic/islamic-data.js` that try module id → pillar id → `work` default. Wired into `DEFER_CONTENT.getGuidanceQuestion`, `DEFER_UNIVERSAL.getGuidanceQuestion`, and `ThresholdModal.jsx:222-224`. Replaces silent `PAUSE_QUESTIONS[id] || PAUSE_QUESTIONS.work` default that hit 36 of 42 modules.
- **`people` triple-key collision fixed**: renamed the line 1105 `MODULE_ATTRS.people` block (Al-Raḥīm · Al-Jāmiʿ, Surah Al-Hashr 59:10) to `ummah`, reviving the shadowed line 230 `people` module-level block (Al-Wadud · Al-Adl) and filling the Ummah pillar gap for free.
- **Orphan `crm` content deleted**: removed `MODULE_ATTRS.crm`, `UNIVERSAL_EQUIV.crm`, and `PAUSE_QUESTIONS.crm` / `PAUSE_UNIVERSAL.questions.crm` entries. CRM lives under People → Sales Pipeline tab; standalone module was unrouted.
- **Unrouted dead code deleted**: `src/pages/modules/CRM.jsx` + `CRM.css`.
- Verification: `npm run build` passes; lint clean on touched files; browser smoke test confirmed People module shows module-level Dua and Ummah pillar renders renamed content.
- Decision recorded: `wiki/decisions/2026-04-16-threshold-content-phased-fix.md`. Phase 1 (Islamic content pillar-by-pillar, starting with Family) and Phase 2 (universal layer) still to come.

## [2026-04-16] feat | Expand wealth + environment subtask descriptions with Why/How format

- **Wealth seed file** (`src/data/seed-tasks/wealth-seed-tasks.js`): added `description` template literals to all **236 subtasks** across 4 submodules (Earning & Provision, Financial Literacy & Management, Ownership & Rights, Circulation & Impact) × 3 boards (core, growth, excellence)
- **Environment seed file** (`src/data/seed-tasks/environment-seed-tasks.js`): added `description` template literals to all **226 subtasks** across 4 submodules (Resource Consumption, Waste & Pollution, Ecosystem & Biodiversity, Ethical Sourcing & Circularity) × 3 boards
- **Total: 462 subtask descriptions** added, completing 6 of 7 Maqasid pillars (Faith, Life, Intellect, Family, Wealth, Environment). Ummah remains.
- All descriptions follow the **Why does this matter? / How do I accomplish this?** format with Islamic grounding (Quranic references, hadith, fiqhi principles) and practical actionable steps
- Files grew from ~600 lines each to ~12,000+ lines. Build passes cleanly.

## [2026-04-16] feat | Source(s) button + subtask content system for TaskDetailPanel

- **Source(s) button** added to all subtask footers (always visible, globally standard across all modules)
- **Sources slide-in view** — clicking opens a 4th panel view rendering `activeSubtask.sources` as markdown with blue underlined links opening in new tabs; empty state shown when no sources yet
- **`sources` field** added to subtask data model — propagated by `seedTasks` and backfilled by `backfillSeedDescriptions` in `project-store.js`
- **Backfill upgraded** — now syncs description whenever seed differs from stored (not just when longer), enabling intentional content updates
- **Rich descriptions populated** for 5 faith/shahada subtasks using the `subtask-content` skill: Recite the full Shahada, Study the linguistic meaning, Learn what negation/affirmation entail, Understand worship without partners, Review Quranic ayat on Tawhid
- **Sources data** added to 3 of those subtasks (Understand worship, Review Quranic ayat, Study linguistic meaning)
- **Subtask hint text** updated: "(tap each one for more info)" → "(tap each one to see why and how)"
- **Task title** made globally read-only in TaskDetailPanel (readOnly attribute + CSS pointer-events: none)
- **Ayah banner** corrected: "no god but God" → "no god but Allah" in Quran 47:19 translation

## [2026-04-15] fix | Rename "Task Document" button to "Resources" in TaskDetailPanel footer

## [2026-04-15] feat | Dashboard pipeline stage cards deep-link to correct stage
- Each `.bfd__pipeline-stage` card on the Dashboard now navigates to its specific BBOS stage.
- Implementation: React Router `location.state.stage` (not URL search params — `useSearchParams()` returned empty in the router context; location state is immune to Strict Mode remounting).
- `Dashboard.jsx`: added `state={{ stage: stageId }}` to each stage Link.
- `ProjectBoard.jsx`: added `useLocation`, initializes `bbosFilter` from `location.state?.stage`.

## [2026-04-15] fix | TodayFocusSection light-mode contrast fixes
- **Card name contrast**: `.tfs-card__name` was hardcoded `#e4e8f4` (near-white), invisible on the light-tinted card background. Changed to `var(--text)`.
- **Arabic subtitle opacity**: Inline style changed from `accentColor + '80'` (50% opacity) to full `accentColor` — legible on light surface.
- **CTA card dark-mode bleed**: All hardcoded dark hex values in `.tfs-cta` block replaced with CSS variables (`--bg3/4`, `--border/2`, `--text2/3`).
- **CTA interactivity**: Converted outer `<div class="tfs-cta">` to `<button>` (full-card click target). Removed inner "Set focus →" button element entirely.

## [2026-04-15] fix | Permanent mobile nav bottom-blocking fix + task modal features
- **Mobile nav architecture fix**: Removed `position: fixed` from MobileNav, placed in CSS grid flow (`grid-row: 3`). Eliminates recurring bug where bottom content was obscured (~20 prior fix attempts). Added `--mobile-nav-h` token. Cleaned up padding-bottom hacks in DashboardView, PillarBoard, Sidebar.
- **Task Document slide-in**: Wired "Task Document" footer button in TaskDetailPanel to open secondary panel with status, priority, assignee, due date, tags fields. Keyed remount animation for slide transitions.
- **BBOS form validation**: Done button in BbosTaskPanel now validates all required fields, shows red banner + inline error highlighting + shake animation when empty.
- **Save for Later button**: Added to BbosTaskPanel footer — saves current field data and closes without validation.
- **Gate indicator links**: Made BBOS gate diamonds (◆) in LevelNavigator clickable — navigates to stage and scrolls to Stage Health Score section.
- **Removed segment percentage labels**: Removed `fln__segment-pct` from LevelNavigator per user request.
- **Mobile responsive pass**: Both TaskDetailPanel and BbosTaskPanel go full-screen on mobile with adjusted spacing.
- **AppShell TDZ fix**: Moved `useLocation()` declaration before its usage in useEffect to fix temporal dead zone crash.

## [2026-04-15] audit+fix | WCAG 2.1 AA Accessibility Audit (System Report §11.9)
- Full accessibility audit across 5 component tiers: layout shell (5 files), modals/overlays (5 files), shared widgets (4 files), forms (5 files), dashboards/charts (5 files) + design tokens
- **24 Critical issues identified**, 50+ Major, all addressed in this session
- **New: `useFocusTrap` hook** (`src/hooks/useFocusTrap.js`) — reusable focus trap with Escape-to-close + focus restoration, applied to 6 components
- **Global `:focus-visible` styles** added to `tokens.css` — 2px solid primary outline on all focusable elements across entire app
- **Skip-to-main-content link** added to AppShell (hidden until focused)
- **`prefers-reduced-motion` media query** — global animation/transition suppression for users who request it
- **Color contrast fixes** — Light `--danger` #ef4444→#dc2626, dark `--danger` added #f87171, dark `--text3` #6b6560→#a09a94, `--pri-urgent` aligned to #dc2626. All pairs now meet WCAG AA 4.5:1 ratio
- **Dialog ARIA** — `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap applied to: ThresholdModal, PrayerOverlay, ResumeOverlay, TaskDetailPanel, NotificationsPanel, SearchPalette
- **PrayerOverlay contrast** — text opacity increased from 0.25/0.3 to 0.7 for countdown and dismiss button
- **Icon button `aria-label`s** — 15+ icon-only buttons labeled across TopBar (7), Sidebar (3), NotificationsPanel (1), SkillsTab (1)
- **Sidebar pillar headers** — `aria-expanded` added to collapsible sections
- **NotificationsPanel tabs** — `role="tab"` + `aria-selected` added
- **Nav landmarks** — `aria-label="Main navigation"` on Sidebar nav, `aria-label="Mobile navigation"` on MobileNav
- **Form labels** — 25+ `aria-label` / `htmlFor`+`id` associations added across ExpensePanel, BbosTaskPanel, CompanyNotesTab, SkillsTab, CategoryPanel. `aria-required` on required fields, `type="button"` on 20+ buttons
- **SVG chart accessibility** — `role="img"` + descriptive `aria-label` + `<title>` on 7 chart SVGs (ActivityChart, MoneyDashboard bar/donut/cost, BCGChart, WorkflowPressure, MasteryRing). ChartTooltip gets `role="tooltip" aria-hidden="true"`
- **SearchPalette ARIA combobox** — `role="combobox"` on input, `role="listbox"` on results, `role="option"` + `aria-selected` + `id` on each result, `aria-activedescendant` tracking
- **LevelNavigator** — `aria-live="polite"` on center region, `aria-label` on nav buttons/gates/subsegments
- **IslamicTerm** — `:focus-visible` outline added in CSS, existing `role="note"` + `aria-describedby` + `tabIndex={0}` preserved
- **AppShell edge handles** — `aria-hidden="true"` on decorative resize divs
- Files created: `src/hooks/useFocusTrap.js`
- Files modified (20): tokens.css, AppShell.jsx, Sidebar.jsx, TopBar.jsx, MobileNav.jsx, NotificationsPanel.jsx, ThresholdModal.jsx, PrayerOverlay.jsx, PrayerOverlay.css, ResumeOverlay.jsx, TaskDetailPanel.jsx, SearchPalette.jsx, LevelNavigator.jsx, IslamicTerm.css, ChartTooltip.jsx, ActivityChart.jsx, MoneyDashboard.jsx, Dashboard.jsx, PillarLevelDashboard.jsx, ExpensePanel.jsx, BbosTaskPanel.jsx, CompanyNotesTab.jsx, SkillsTab.jsx, CategoryPanel.jsx

## [2026-04-15] implement | People Module Stabilization (System Report §11.6)
- Audit confirmed module is stable — not mid-refactor as report suggested. 42 .jsx files, 3 stores, 6 sub-directories all functional.
- **CompanyNotesTab:** Wired to contacts-store — notes now persist via `updateCompany(companyId, { notes })`. Was local-only state.
- **WorkTab:** Replaced hardcoded onboarding stubs with real task data from task-store. Added `getTasksByAssignee(assigneeId)` to task-store. Shows tasks across all projects with priority, due date, status.
- **SkillsTab:** Built tag-based skill management UI. Skills stored as `skills` array on contact record via `updateContact`. Add/remove with Enter/click.
- **DetailPanelTabs:** Fixed SkillsTab call to pass `contactId` prop (was called with no props).
- Updated CONTEXT.md files: `people/CONTEXT.md` (master) and `tabs/CONTEXT.md` — removed stale stub references, documented new store dependencies.
- Files modified: CompanyNotesTab.jsx, WorkTab.jsx, SkillsTab.jsx, DetailPanelTabs.jsx, task-store.js, people/CONTEXT.md, tabs/CONTEXT.md

## [2026-04-15] implement | BBOS UI/Protocol Gap Closure (System Report §11.4)
- Closed 3 of 4 gaps from system report section 11.4 (gap #1 Two-Factory was already resolved)
- **Assembly Gate CLEARED state:** Added green CLEARED bar rendering when all Research tasks are Done (was only showing LOCKED)
- **G-Label badge on dashboard cards:** GLabelBadge now renders on BbosFullDashboard task cards when G1-G4 label is assigned; static "G" chip remains as placeholder when unassigned
- **00A/01B patch stage indicators:** Added `BBOS_PATCH_STAGES` data to `bbos-pipeline.js`; `gateIndicators` prop added to LevelNavigator; inline diamond indicators render between FND-TRU and STR-OFR in Think layer with 3-state coloring (pending/in-progress/complete)
- Fixed stale `CONTEXT.md` reference to non-existent `BbosPipelineHeader.jsx`
- Files modified: BbosFullDashboard.jsx, BbosFullDashboard.css, bbos-pipeline.js, ProjectBoard.jsx, LevelNavigator.jsx, LevelNavigator.css, bbos/CONTEXT.md

## [2026-04-15] reskin | Task Modal + BBOS Panel + Factory Tabs
- **Task Detail Modal:** Full CSS rewrite of TaskDetailPanel (672px, 24px radius, `--tdp-accent` theming, circular subtask checkboxes, progress bar, spacious layout). JSX restructured: priority badge, read-only description, single "Task Document" footer button. Removed secondary controls from render.
- **BBOS Task Panel:** CSS rewrite of BbosTaskPanel to match new design language. JSX restructured: badges row (stage + status inline select), meta row (assignee + governing attributes), purpose section, bento grid (dependencies + template cards), rationale accordion, form fields, G-Label, notes container, validation flags, AI draft section, discard-with-confirmation footer.
- **Accent color wiring:** `accentColor` prop threaded from PillarLevelPage/ProjectBoard → TaskDetailPanel → BbosTaskPanel. Level colors: core=#C8A96E, growth=#4ab8a8, excellence=#8b5cf6.
- **Factory tab animation:** Directional slide on Groundwork↔Workshop switch using keyed remount + `useRef` direction tracking. Grid layout fix for wrapper div (mirrors parent 12-col grid). Fixed undefined `--radius-md` token → `--radius`.
- **Bug fixes:** Rationale card flex collapse (overflow:hidden + min-height:auto), accent color mismatch on BBOS modal, factory content losing grid context, undefined radius token.
- Files modified: TaskDetailPanel.jsx/css, BbosTaskPanel.jsx/css, BbosFullDashboard.jsx/css, PillarLevelPage.jsx, ProjectBoard.jsx
- Spec: `docs/superpowers/specs/2026-04-15-task-modal-reskin-design.md`

## [2026-04-15] implement | Chart Tooltips — Shared ChartTooltip component + 8 chart wiring
- **Design:** Brainstormed with visual companion mockups, produced spec at `docs/superpowers/specs/2026-04-15-chart-tooltips-design.md`
- **Shared component:** Created `src/components/shared/ChartTooltip.jsx` + `.css` — portal-rendered tooltip via `createPortal(el, document.body)`, same pattern as IslamicTerm glossary tooltips
- **Two anchor modes:** `above` (bar/ring/gauge — centered above target, flips below if < 180px headroom) and `crosshair` (line charts — vertical dashed line + floating tooltip, enlarges hovered circle)
- **8 charts wired:**
  1. Money bar chart (MoneyDashboard.jsx) — month, expenses, discretionary, over-budget
  2. BCG line chart (Dashboard.jsx) — crosshair, task count + day label
  3. Activity chart (ActivityChart.jsx) — crosshair, task count + day label
  4. Savings donut (MoneyDashboard.jsx) — % saved, saved/spent amounts
  5. Mastery ring (PillarLevelDashboard.jsx) — % complete, tasks done/total
  6. Workflow pressure (Dashboard.jsx) — level, filled/10, in-progress count
  7. Spending limit bar (MoneyDashboard.jsx) — amount/budget, % over
  8. Cost analysis rows (MoneyDashboard.jsx) — category, %, dollar amount
- **Interaction:** Desktop hover (150ms fade), mobile tap-to-toggle with outside-tap dismiss
- **Execution:** Subagent-driven development — 10 tasks, parallel dispatch for independent files
- Files created: ChartTooltip.jsx, ChartTooltip.css | Files modified: MoneyDashboard.jsx, Dashboard.jsx, ActivityChart.jsx, PillarLevelDashboard.jsx
- Wiki: created `wiki/entities/chart-tooltips.md`, updated `wiki/entities/money-dashboard.md`

## [2026-04-15] documentation | Comprehensive System Report — MILOS V2.1
- Produced a full dual-audience system report covering 11 sections: Executive Summary, Foundational Core Principles (Maqasid Al-Shariah, Covenant Architecture, Amanah Gate, Ceremony Gate, Truth-Safe Design), System Architecture (React 19 + Zustand 5 + Router 7 + Vite 8, 13 stores, CONTEXT.md protocol, knowledge graph), Seven Maqasid Pillars (Faith through Ummah, readiness ayah system, three-tier bento dashboards), Functional Modules (Work/Money/People/Office/CRM/Tech/Islamic/Family Office), BBOS Integration (v2.4 Two-Factory model, 8-stage pipeline, 118 tasks, role access matrix, dynamic scoring, Islamic grounding per stage), Islamic UI Layer (CeremonyGate, ThresholdModal, ReadinessCheck, Prayer system, NiyyahAct, ResumeOverlay), Integration Strategies (OLOS, Ogden Hub, Aladhan/Nominatim APIs, LLM/AI, Claude OS/MWP, wiki, graphify), Intended Use Cases, Benefits to Stakeholders, and Known Limitations
- Report saved to: `stages/maqasid-os-system-report-2026-04-11.md`
- Sources used: wiki/entities/maqasid-os.md, wiki/entities/bbos-pipeline.md, wiki/concepts/ (all 4), all src CONTEXT.md files, src/data/bbos/* (4 files), src/data/maqasid.js, package.json

## [2026-04-15] audit+implement | UI/UX Audit — Border/Shadow + Typography Scale Consolidation (Dimensions 4 & 5 continued)
- Continuation of April 14 UI/UX audit; scoped to border+shadow redundancy and typography scale consolidation
- **Phase 1 — New tokens defined in tokens.css:**
  - Typography: added `--text-2xs` (0.7rem), `--text-sm-plus` (0.8rem) to fill gaps in 8-step UI scale
  - Display scale: added `--text-2xl` through `--text-7xl` (1.75rem–3.75rem) for hero/page-level headings
  - Shadows: added `--shadow-card`, `--shadow-card-hover`, `--shadow-accent`, `--shadow-glow-green`, `--shadow-glow-amber`, `--shadow-glow-red`, `--shadow-glow-cyan`
  - Dark theme overrides added for all new shadow tokens
- **Phase 2 — Shadow consolidation (37 hardcoded box-shadow + 7 hardcoded border colors):**
  - Replaced dashboard card shadows (DashboardTaskCard, BbosFullDashboard, PillarLevelDashboard) → `--shadow-card` / `--shadow-card-hover`
  - Replaced audit CTA button shadows across 7 pillar dashboards + QuranPage + HadithPage → `--shadow-xs` / `--shadow-lg`
  - Replaced glow shadows in TechOverview + HealthPulse → `--shadow-glow-*` tokens
  - Replaced accent shadows in ThresholdModal + ResumeOverlay → `--shadow-accent`
  - Replaced panel shadows in TaskDetailPanel + BbosTaskPanel → `--shadow-lg`
  - Replaced hardcoded border colors in BbosFullDashboard, PillarBoard, TechOverview, WealthDashboard → semantic tokens
  - Office focus rings (Announcements, DocumentManager, Forum) → `--col-progress-bg`
- **Phase 3 — Typography scale consolidation (580+ hardcoded font-size declarations):**
  - Mapped all font-size values to nearest token: 0.5–0.65rem → `--text-xs`, 0.66–0.72rem → `--text-2xs`, 0.73–0.77rem → `--text-sm`, 0.78–0.84rem → `--text-sm-plus`, 0.85–0.93rem → `--text-base`, 0.94–1.06rem → `--text-md`, 1.07–1.19rem → `--text-lg`, 1.2–1.5rem → `--text-xl`, 1.6+ → display tokens
  - Converted pixel font-sizes (9px–18px) to rem token equivalents
  - Sub-0.65rem values raised to `--text-xs` (enforcing P1 floor from prior audit)
  - Result: 0 hardcoded font-size values remain in CSS (excluding 2 clamp() responsive declarations)
- **Before:** 5.8% token adoption (36/618 font-size declarations), 37 hardcoded shadows
- **After:** 100% token adoption for font-size, 100% for box-shadow, 100% for border colors
- Build verified clean; preview spot-checked on Money, Dashboard, Faith pillar — no regressions
- Files modified: tokens.css + ~50 CSS files across src/components/ and src/pages/

## [2026-04-15] implement | Money Dashboard chart — expense-based segments + isEssential categories
- **Balance Overview chart restructure:**
  - Bar height now based on `expenses` (was `income`); no surplus/income spacer
  - 3 segments (bottom → top): Expenses (dark green) · Discretionary Spending (light green = budget headroom) · Over Budget (purple hatched)
  - Discretionary Spending = `max(0, budgetTarget − expenses)` — bars reach exactly to Max Target line when under budget
  - All 4 corners rounded per segment (`border-radius: 4px`); stack background removed
  - Ceiling = `niceMax(max(expenses, budgetTarget))` across all months
- **`isEssential` flag on preset categories:**
  - Added to `PRESET_CATEGORIES` in `money-categories.js`
  - Essential: Rent, Utility, Utility Bills, Transport, Payroll; all others `false`
  - `chartData` carries `essential`/`discretionary` per month (chart renders all expenses as one block for now)
- Files: MoneyDashboard.jsx, MoneyDashboard.css, money-categories.js, wiki/entities/money-dashboard.md

## [2026-04-15] implement | Hadith sourcing audit + segment nav wrapping + money chart redesign
- **Hadith audit:** scanned entire codebase for non-Sahih hadith references; found 3 issues
  - NiyyahAct.jsx: Tirmidhi 3391 → Sahih Muslim 2723 (morning/evening duas), added time-of-day logic via `getDua()` selector
  - islamic-data.js LIFE module closing dua: Tirmidhi 3401 → Quran 26:78–80 (Ibrahim AS on creation, sustenance, healing)
  - quran-overview.js HIFZ virtues: Abu Dawud claims → Sahih Muslim 804 & 798 (Quran intercession, reciters' reward)
  - All 40+ Quranic ayat already sourced to Quran; all other module duas already Quran/Sahih
- **LevelNavigator segment nav wrapping:** segment buttons ("EARNING & PROVISION", etc.) overlapping on small screens
  - Root cause: `.fln__segment-nav` had `white-space: nowrap` with no width constraint
  - Fix: `white-space: normal` + `max-width: 100%` allows wrapping into 2 lines on narrow viewports
  - Tested: 600px → labels wrap cleanly; 1280px → single line preserved
- **Money Dashboard chart redesign:** relabel and recolor for clarity
  - Legend changed: "Income" → "Expenses", "Expenses" → "Discretionary Spending"
  - Color change: expense bar from yellow (#fde68a) → light mint (#86efac) for visual distinction from income green (#22c55e)
  - Bar order reordered: over-budget now appears above expenses (visually correct priority)
  - Data binding fixed: bar height still driven by `d.income`; dark green background shows savings gap; light green = `withinExpenses` (budgeted portion); purple = `overBudget` spike
- Files: NiyyahAct.jsx, islamic-data.js, quran-overview.js, LevelNavigator.css, MoneyDashboard.jsx, MoneyDashboard.css
- Commit: 6f0c72d

## [2026-04-14] implement | Money Dashboard — Balance overview chart redesign
- Replaced weekly side-by-side bar chart with monthly stacked bar chart (9 months)
- Chart logic: bar height = monthly income; expenses (yellow) from bottom; transparent spacer holds savings gap; income background shows through
- Added Y-axis labels, horizontal gridlines, dashed budget target line ("Max Target Spending"), over-budget purple hatched segment
- Legend repositioned below chart; Income · Expenses · Over budget
- Fixed double-counting bug (previously stacked savings + income + expenses additively)
- Fixed flex sizing bug (transparent spacer required so expense segment doesn't stretch to fill full bar)
- New wiki entity: `wiki/entities/money-dashboard.md`

## [2026-04-14] implement | Font family tokenization — codebase-wide
- Extended font token system introduced in the P0 session to all remaining files (50+ files)
- New tokens added: `--font-display` (Manrope + DM Sans fallback), `--font-serif` (Noto Serif)
- Full token set: `--font-body`, `--font-heading`, `--font-display`, `--font-serif`, `--font-arabic`, `--font-mono`
- CSS files updated: all 6 pillar dashboards, UmmahDashboard, FaithLevelNavigator, LevelOverviewPage/FaithLevelOverview SVG ring text, FivePillars, QuranPage/HadithPage/IslamicKnowledgePage/SourcesPage, landing.css, BbosFullDashboard/BbosTaskPanel, PillarLevelDashboard, PillarBoard, InlineTaskDetail, TaskDetailPanel, MoneyDashboard, ExpenseList, Sidebar, TopBar, DashboardTaskCard, SearchPalette, IslamicPanel, AyahBanner, PrayerTime, PrayerOverlay, ReadinessCheck, DuaSection, AttributeCard, NiyyahAct, PillarCard, ModuleHealthCard, DealPipeline, HRPage, IslamicTerm, ReferenceList, ThresholdModal, AttendanceView, DocumentManager, LevelNavigator, global.css
- JSX/inline styles updated: ProjectBoard, KanbanCard, GLabelPicker, GLabelBadge, ActivityChart (mono + body SVG attrs), Dashboard (BCG SVG), Work, TimeTracker, StatsTab, Settings (4 instances), InvoiceList, BbosRoleBadge, IncomeTab
- Build verified: `npm run build` clean (0 errors, 2256 modules, 907ms)

## [2026-04-14] audit+implement | UI/UX Audit — Dashboard Design & Typography (Dimensions 4 & 5)
- Audited Dashboard against NotebookLM notebook "Modern UI/UX Design: From Bland to Bespoke Masterpiece" (ID 279ecab6, 10 YouTube sources)
- Scope: Dimension 4 (Dashboard-Specific Design) and Dimension 5 (Typography & Content)
- Scorecard: 2 Pass, 3 Fail, 5 Partial Pass, 1 Warn across 11 criteria
- **P0 remediations implemented:**
  - Empty States Overhaul — 4 section empty states upgraded from plain text to icon + human text + CTA pattern (BCG, Open Tasks, Upcoming, Activity)
  - Font Family Consolidation — added `--font-body`, `--font-heading`, `--font-arabic`, `--font-mono` tokens to tokens.css; replaced hardcoded Space Grotesk and Amiri refs in Dashboard.css with token vars; replaced inline DM Sans in BCG SVG
  - BCG Chart Fixes — renamed to "Barakah Consistency", wired range selector (7d/14d/30d) to actually filter data via `.slice(-rangeDays)`, simplified misleading dual-signal legend to "Tasks completed per day", expanded data from 14→30 days
- **P1 remediations implemented:**
  - Font Size Floor — raised all sub-10px sizes (0.58rem, 0.6rem, 0.62rem) to 0.65rem minimum (7 replacements)
  - Task List Enhancement — removed `projects.slice(0, 4)` cap, added horizontal scroll for project tabs, added due date + overdue highlighting, added "View all N tasks" link with hidden count
  - Empty State Text Rewrite — rewrote in human guiding tone ("All clear — create a task to get started", etc.)
- Verified in browser: light mode, dark mode, empty states, BCG range switching all confirmed working
- P2 items deferred: dashboard hierarchy reorder, letter-spacing standardization, task sort/search
- Files: Dashboard.jsx, Dashboard.css, tokens.css, useDashboard.js
- Audit plan: `.claude/plans/elegant-baking-umbrella.md`

## [2026-04-14] implement | Task clicks → popup modal on pillar level pages
- Removed `inlinePanel` from ProjectBoard in PillarLevelPage — DashboardTaskCard clicks now open TaskDetailPanel portal modal instead of InlineTaskDetail inline
- Added `onSubsegClick` to LevelNavigator in PillarLevelPage — subseg (task progress bar segment) clicks now open TaskDetailPanel modal instead of navigating to `?task=` URL
- State: `subsegTask { taskId, project }` held in PillarLevelPage; project resolved via `getProject(${boardPrefix}_${pillarId}_${activeLevel})`
- Verified in preview: card click opens modal, subseg click opens modal for correct task ("Testify there is no God but Allah")
- Files: PillarLevelPage.jsx

## [2026-04-14] website | MILOS microsite and landing page update
- Created `website/maqasid/index.html` — product landing page with hero (59:18), purpose, threshold, solution, seven-pillar grid, CTA
- Created `website/maqasid/journey/index.html` — journey detail page with spine, now-marker at 18%, 4 phases, 8 milestones (6 done)
- Updated `website/index.html` — four-product grid, hero text, triptych, MILOS product card with diamond badge
- Added MILOS nav link across all 10 existing product pages (BBOS, OLOS, MTC and their subpages)
- Added "Full journey →" link to MILOS row on ecosystem journey page
- Pushed to both onaxyzogden/Maqasid and onaxyzogden/ogden-hub
- Files: website/maqasid/{index,journey/index}.html, website/index.html, 10 nav updates, website/journey/index.html

## [2026-04-14] website | Add MILOS to ecosystem journey page
- Fourth product row on `/journey/` — Development (Al-Musawwir) → Completion (Al-Muhsi) → Opening (Al-Fattah) → Ummah (Al-Wasi')
- Phase 1 at 70%: 6/8 milestones done (seven pillar modules, dashboard, BBOS integration, Islamic UI, audit, pillar viz)
- CSS: `--mq-*` color vars, `.mq` phase/milestone selectors following existing pattern
- Header updated: "Four products. Four journeys. One intention."
- Footer: fourth column with MILOS summary
- Also synced milestone counts on BBOS (+Operator Practice Companion), MTC (+stewardship model, +first founding member), fixed OLOS footer 85→86%, date March→April
- Pushed to both onaxyzogden/Maqasid and onaxyzogden/ogden-hub
- Files: website/journey/index.html

## [2026-04-14] implement | BBOS pipeline overview panel — all 9 stages with completion %
- New `PipelineOverview` internal component in `BbosFullDashboard.jsx` — renders between stage header and task grid
- Shows all 9 stages grouped by 3 layers (Think/Execute/Reckon) with colored layer labels
- Each stage card: number (01-09), label, 3px progress bar (colored per stage), completion %
- Active stage highlighted with accent border and tinted background; labels truncate with ellipsis
- `allStageProgress` useMemo computed via single taskMap pass (O(T + D)) — returns `{ FND: 0, TRU: 45, ... }`
- Clickable stage navigation: `onStageSelect(stageId)` callback threaded ProjectBoard → DashboardView → BbosFullDashboard
- `handleStageSelect` in ProjectBoard calls `setBbosFilter + setActiveBbosStage` (same as LevelNavigator segment click)
- Responsive: layers stack vertically on screens < 768px
- Files: BbosFullDashboard.jsx, BbosFullDashboard.css, DashboardView.jsx, ProjectBoard.jsx

## [2026-04-14] implement | BBOS stage complete gate — callout + advance action
- When `stagePct === 100`, a green "Stage complete" callout appears in the stage header (below the progress strip)
- Callout shows: CheckCircle icon + "Stage complete — N/N tasks done" + "Advance to [Next Stage Label] →" button
- At OPT (last stage): button shows "Complete Cycle →" and triggers `startNewBbosCycle` with a confirm dialog
- Advance handler defined in `ProjectBoard.jsx`: calls `advanceBbosStage(projectId, nextId)` + syncs UI `setBbosFilter` + `setActiveBbosStage`
- Handler threaded as `onStageAdvance` prop: ProjectBoard → DashboardView → BbosFullDashboard
- `BBOS_STAGES` imported in BbosFullDashboard to compute `nextStage` from `stageMeta.order`
- `advanceBbosStage` was already in project-store (lines 447–455) but unused — now wired up
- Files: ProjectBoard.jsx, DashboardView.jsx, BbosFullDashboard.jsx, BbosFullDashboard.css

## [2026-04-14] implement | BBOS pipeline progress tracking wired up
- Added per-stage completion % aggregated from task status (`columnId === doneColumnId || completedAt`)
- Stage header in `BbosFullDashboard.jsx` now shows `X/Y · Z%` with a thin 4px green progress bar below the stage description; computed against all task definitions (not just seeded tasks)
- `ProjectAuditCard` bug fixed: was using `t.completedAt` only for completion count (always null per Sprint 7 fix); now also checks `columnId === doneColumnId`; `doneColumnId` prop passed from parent
- LevelNavigator stage segments now display a `%` completion label below the stage name (e.g. "IDENTITY 0%"); computed via new `pillarProgress` useMemo in `ProjectBoard.jsx`
- Files: BbosFullDashboard.jsx, BbosFullDashboard.css, ProjectBoard.jsx, LevelNavigator.jsx, LevelNavigator.css

## [2026-04-14] implement | Runway date assignment — styled modal with timeline preview
- Replaced raw `confirm()` dialog with `RunwayDateModal` component rendered via `createPortal`
- Modal shows: start-date picker, runway metadata pill, scrollable timeline of all tasks with due dates, overwrite toggle, Apply/Cancel actions
- Live preview recalculates using `useMemo` as start date changes; existing-date rows highlighted with accent tint
- `computePreview()` distributes tasks evenly across runway period (fractions of total ms); `formatPreviewDate()` for display
- CSS: ~200 lines appended to BbosTaskPanel.css — `.rda-overlay`, `.rda-modal`, `.rda-timeline`, `.rda-row`, `.rda-btn` etc.
- Files: BbosTaskPanel.jsx, BbosTaskPanel.css

## [2026-04-14] synthesize | Amanah Gate Protocol — cross-product pattern named via graphify
- Ran `/graphify website/` — 28 HTML pages converted to Markdown, 161 nodes, 162 edges, 38 communities extracted
- Graph found `semantically_similar_to` edge (INFERRED 0.72) between OLOS Confidence Framework and BBOS G-Label System — two independent implementations of the same tiered evidential honesty mechanism
- Traced the pattern: all three products (OLOS, BBOS, MTC) implement Amanah as a decision gate, but BBOS is the only one that named it
- Identified documentation gap: `rationale_land_as_trust` (root homepage) links to OLOS and BBOS but not MTC — the most land-relevant product
- Filed `wiki/decisions/2026-04-14-amanah-gate-protocol.md` — cross-product pattern definition with MTC M1/M2/M3 tier proposal
- Updated `wiki/concepts/amanah-gate.md` — added Protocol section distinguishing ethical gate (halal check) from evidential gate (input quality)
- Updated `website/CONTEXT.md` — cross-product architecture notes, documentation gap, graph reference
- Graph outputs at `website/graphify-out/` (graph.html, GRAPH_REPORT.md, graph.json)

## [2026-04-14] implement | Subsegment colors, TRU task reorder, runway date assignment
- Fixed subsegment in-progress color: `bbosTaskColorFn` now checks `bbosFieldData` for partial field progress, not just `columnId` — tasks with any filled fields show amber even while in the To Do column
- Reordered TRU task definitions: V1/V2/V3/FP02 moved before AF1–AF5, appearing as tasks 7–10 in the Groundwork tab (was 12–15)
- `RESEARCH_PREFIXES` in BbosFullDashboard confirmed as `['S','V','FP']`; V/FP tasks remain in Groundwork, AF tasks in Workshop
- Runway date assignment: when TRU-S5 (Constraint Map) is marked Done, all BBOS tasks in the project receive evenly-spaced due dates from today through the runway period; prompts before overwriting existing dates
- Files: ProjectBoard.jsx, BbosFullDashboard.jsx, BbosTaskPanel.jsx, bbos-task-definitions.js

## [2026-04-14] implement | Scope gate all views, task panel view-only, color picker
- Extracted shared ScopeGate component from BbosFullDashboard into src/components/shared/ScopeGate.jsx
- Passed bbosRole/bbosFilter to Board (KanbanBoard), List (ListView), and Gantt (GanttView) views
- All 4 views now show "OUTSIDE YOUR SCOPE" overlay when role lacks access to a stage
- Added VIEW ONLY banner + readOnly/disabled fields in BbosTaskPanel for V-access roles
- Added clickable project color picker (8-swatch popover) in ProjectBoard header
- Files: ScopeGate.jsx (new), BbosFullDashboard.jsx, BbosTaskPanel.jsx/.css, ProjectBoard.jsx, KanbanBoard.jsx, ListView.jsx, GanttView.jsx, TaskDetailPanel.jsx

## [2026-04-14] implement | BBOS role scope gate and access-level badges
- Added "OUTSIDE YOUR SCOPE" overlay (ScopeGate component) when a role has no accessible tasks in a stage
- Overlay shows role name, stage name, and which roles have access (computed from BBOS_TASK_ACCESS matrix)
- Added View/Edit chip badges on task cards reflecting the active role's permission level (V=blue, E=amber)
- Fixed sidebar button width inconsistency (Notifications narrower than Settings)
- Files: BbosFullDashboard.jsx, BbosFullDashboard.css, DashboardTaskCard.css, Sidebar.css

## [2026-04-14] implement | Task modal, BBOS pipeline to Dashboard, LevelNavigator restyle
- Converted TaskDetailPanel and BbosTaskPanel from slide-in side panel to centered popup modal via `createPortal` to `document.body`; Escape key closes, backdrop click closes, panel click stops propagation
- Moved BBOS pipeline overview from BbosFullDashboard to main Dashboard — shows per-stage progress for all BBOS-enabled projects with project title heading
- Removed PipelineOverview internal component + allStageProgress useMemo from BbosFullDashboard (now dashboard-owned)
- Removed bfd__stage-progress bar, bfd__eyebrow, and bfd__title from BbosFullDashboard header (redundant with pipeline on Dashboard)
- LevelNavigator fln__segment-col--current: changed from solid color fill to subtle tint + outline (color-mix 8% + border + box-shadow) matching bfd__pipeline-stage--active style
- fln__segment-nav: 0.7rem, weight 600, var(--text), left-aligned, uppercase, letter-spacing 0.06em — matching bfd pipeline label style
- Files: TaskDetailPanel.jsx/.css, BbosTaskPanel.jsx/.css, ProjectBoard.jsx, BbosFullDashboard.jsx, Dashboard.jsx/.css, LevelNavigator.css

## [2026-04-13] rewrite | Landing page — Islamic Life OS framing, Seven Maqasid pillars
- Rewrote Landing.jsx: hero, features, How It Works, FAQ, CTA, footer
- Hero: "Organize your life around what truly matters" with 7 pillar chips (Arabic roots)
- Features: Seven Maqasid tabbed showcase replacing 5-module business framing
- Replaced SaaS pricing with 3-step How It Works (Choose Path → Explore Pillars → Track Growth)
- FAQ rewritten for life OS scope (6 questions)
- Fixed missing `getBbosTaskDef` import in BbosFullDashboard (caused blank page)
- Committed and pushed pre-existing BBOS enhancements (renderers, role picker, task panel, ErrorBoundary)

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

## [2026-04-15] feat+fix | Readiness check card wizard + subtask stage progress

### Readiness check redesign
- Replaced interactive readiness check (all rows visible, small yes/not-yet buttons) with card-based wizard
- One row per page: two side-by-side cards (green=yes, beige=not-yet) with checkmark selection
- Internal Next/Previous navigation, progress counter ("X/Y rows completed")
- Mobile responsive: cards stack vertically at <=480px
- Display-only mode (IslamicPanel sidebar) unchanged
- Files: `src/components/islamic/ReadinessCheck.jsx`, `ReadinessCheck.css`

### Subtask stage progress fix
- BBOS `pillarProgress` now includes fractional credit from subtask completion
- Previously: task with 2/4 subtasks done = 0%. Now: = 50% of that task's weight
- Aligned with `useModuleProgress` hook's `taskWeight()` pattern
- File: `src/components/work/ProjectBoard.jsx` (lines 98-118)

### Commit
- `df242af` — pushed to main

## [2026-04-16] feat(seed-data) | Standardize subtask descriptions with Why/How format

### What was done
- Standardized all subtask descriptions in faith-seed-tasks.js (212 subtasks) and life-seed-tasks.js (236 subtasks) to follow a two-section format:
  - **"Why does this matter?"** — 1-3 sentences grounding the subtask in Islamic significance or practical importance
  - **"How do I accomplish this?"** — actionable steps, details, and verification criteria
- Faith file: reorganized existing unstructured descriptions into the new format
- Life file: created 236 new description fields from scratch (previously had none)
- Sources remain in the separate `sources` field, rendered via the Source(s) button
- Normalized 3 legacy "Why This Matters:" headers to "Why does this matter?"

### Execution approach
- Chunked work into parallel subagents by section (5 batches for faith, 4 for life)
- Each agent handled ~40-60 subtasks within a specific pillar submodule range
- Total: 448 subtask descriptions processed

### Remaining
- Intellect, Family, Wealth, Environment seed files still have subtasks with no descriptions
- Recommended: process in future sessions using the same chunked-agent approach

### Commit
- `fe0a5a9` — pushed to main

## [2026-04-17] feat+chore | Rich Quran/Hadith citation cards + module icon refresh

### Citation cards in subtask Sources view
- `QuranEmbed` — hybrid live quran.com iframe (translations=20 Saheeh, reciter=13, wbw + transliteration, tafsir/reflections/lessons/answers off) with offline `QuranVerseCard` fallback on `!navigator.onLine` or 5s load timeout
- `HadithCard` — bundled offline render of 509 hadith across Bukhari, Muslim, Abi Dawud, Ibn Majah, Nasa'i, Tirmidhi (Amiri Arabic + italic English narration + grade chip)
- `scripts/fetch-hadith.py` — concurrent fetch from fawazahmed0/hadith-api via jsdelivr; writes `src/data/hadith.js`
- `scripts/fetch-quran-wbw.py` — companion fetch for word-by-word
- `TaskDetailPanel` — h3 renderer substitutes embed/card for `### Quran (S:V)` and `### <Collection> N` headings; regex strips inline `**Arabic:** / **Translation:**` narration using sentinel workaround (JS has no `\Z`)
- 9 early-Muslim refs (muslim:5,8,26,33,35,46,49,54,60) render graceful "View on sunnah.com" fallback due to fawazahmed0's 92-hadith intro numbering gap vs sunnah.com canonical
- Musnad Ahmad skipped — no fawazahmed0 edition

### Seed-task copy & layout
- "Why does this matter?" → "Why?", "How do I accomplish this?" → "How?" across all 7 seed files
- "Sources from the Quran/Hadith" → "Quran/Hadith"
- Removed `---` HR divider between Why and How; CSS hides any residual hr inside subtask content
- "Source(s)" button and heading → "Source"
- Amiri font applied across DuaSection, TodayFocus, Ummah, HadithCard

### Module icon refresh (lucide-react 0.511 → 1.8)
- Circulation & Impact: `Gift` → `CircleFadingArrowUp`
- MTC Residency: `Building` → `HousePlus`
- MTC Land: `Mountain` → `MapPinned`
- Collective: `UsersRound` → `Shapes`
- Lucide bump required for `HousePlus` / `MapPinned`; Vite dep cache cleared (`rm node_modules/.vite`) to clear stale pre-bundle
- Icon strings synced across `modules.js`, `Sidebar.jsx` ICON_MAP, `TaskDetailPanel` ICON_MAP, `CeremonyGate`, `ModulePlaceholder`, `WealthCorePage`, `WealthDashboard`, `project-store`

### Commits
- `1ae2793` feat(sources) — pushed to main
- `cd5bd55` chore(icons) — pushed to main

### Decisions filed
- [[2026-04-17-quran-hadith-citation-cards]]
- [[2026-04-17-lucide-react-1-8-upgrade]]

### Deferred
- Re-fetch Muslim using sunnah.com canonical numbering to fill 9 empty entries
- Find a Musnad Ahmad source
- Intellect, Family, Wealth, Environment seed files still have bare subtasks with no Why/How descriptions

## 2026-04-17 — Ummah pillar → PillarLevelPage pattern

### Context
All 6 Ummah submodule pages used legacy `PillarHeader + ViewToggle + OverviewCards/MaqasidTable` layout. User requested Shahada-style layout (compact level navigator + kanban board) for parity with Faith.

### Scaffold built
- `UMMAH_BOARDS` (18 entries: collective/neighbors/community/moontrance-{land,seasonal,residency} × core/growth/excellence) added to `src/store/project-store.js`
- `ensureUmmahProjects` store action (mirrors `ensureFaithProjects`) — seeds from `UMMAH_SEED_TASKS` via `seedTasks()` helper
- `src/pages/ummah/UmmahLevelNavigator.jsx` — exports `UMMAH_PILLARS` (6), `UMMAH_LEVEL_ROUTES` (fallback to `/app/pillar/ummah`), `UMMAH_STORAGE_KEY`, `UMMAH_ENSURE_PROJECTS`
- `src/pages/ummah/UmmahPillarPage.jsx` — wraps shared `PillarLevelPage` with `boardPrefix="ummah"` and identity `UMMAH_PILLAR_MODULE_MAP`

### Page rewrites (6 files)
- `MoontraceLandPage.jsx`, `MoontranceSeasonalPage.jsx`, `MoontranceResidencyPage.jsx`
- `CollectivePage.jsx`, `Neighbors.jsx`, `Community.jsx`
- All now: `export default function X() { return <UmmahPillarPage pillarKey="..." />; }` — CeremonyGuard already wraps at route level

### UmmahDashboard updated
- Imports all 6 OVERVIEW + MAQASID datasets
- New "Frameworks" section with collapsible `<details>` per submodule (accent-colored border from `--mod-*` tokens)
- CSS (`.ummah-framework*`) appended to `UmmahDashboard.css`
- Label quirk preserved: `collective` id displays "MTC", `community` id displays "Collective" — matches existing module-id/label mapping in `modules.js`

### Verification
- `npm run build` passes (2645 modules, 1.28s)
- Manual walkthrough not performed — deferred to user

### Deferred
- `useAyahBanner('ummah_*')` no longer invoked from submodule pages — needs re-wiring in `UmmahPillarPage` or `PillarLevelPage` if desired
- Dedicated `/app/ummah-{core,growth,excellence}` level-overview routes (Faith-style `LevelOverviewPage`)
- Citation verification for 450 subtasks in `ummah-seed-tasks.js` (generated in prior session by 6 parallel agents; hadith isnad and translation accuracy never audited)

### Decision filed
- [[2026-04-17-ummah-pillar-level-page]]

## 2026-04-17 — Ayah banner label + 99 Names kid-friendly rewrite

### Context
Two small user-driven UI tasks in one session.

### Done
- `src/components/layout/TopBar.jsx:225` — changed ayah banner label from "Reminder" to "Why?" (triggered via selected-element: TopBar banner header)
- `C:\Users\MY OWN AXIS\Downloads\99_names_of_allah.html` (out-of-repo artifact) — added 7th `kidFriendly` field (2-sentence child-accessible explanation) to all 99 entries in the `names` array; replaced standalone "View toggle" design with a combined card layout showing scholarly label + kid-friendly paragraph stacked. New `.meaning-label` style (small italic). Search now also matches kid-friendly text. Doctrinally grounded — harsher names (Al-Khafid, Al-Mudhill, Al-Muntaqim, Ad-Darr, Al-Jabbar) rendered gently but accurately.

### Verification
- TopBar change: single-line text edit, no build run (trivial)
- 99 Names HTML: standalone file, opens directly in browser — verification deferred to user

### Deferred
- Doctrinal spot-check of the 99 kid-friendly descriptions by a qualified reviewer before any public use
- Plan file at `~/.claude/plans/c-users-my-own-axis-downloads-99-names-precious-cerf.md` can be archived/removed

### Notes
- Session did not open the repo wiki via the 3-Gate protocol — tasks were point-edits flagged by the user via selected-element and an attached out-of-repo HTML file. Formal orientation was skipped; noting it here for audit.

## 2026-04-17 — TaskDetailPanel polish + seed-source bug fixes

### Context
Continuation session covering UI polish on TaskDetailPanel, a silent-failure bug in seed hydration, and a source-curation audit on the "Six Pillars of Iman" task.

### Done
- `src/components/work/TaskDetailPanel.css` — restored header/footer contrast (`.tdp-header`, `.tdp-project-name`, `.tdp-footer`, `.tdp-later-btn` now use `var(--surface)` / `var(--text)` instead of washed-out greys)
- `src/components/work/TaskDetailPanel.jsx:342,550,591` — renamed "Complete later" / "Back to subtask" buttons to "Back"
- `src/data/seed-tasks/faith-seed-tasks.js` — first Shahada subtask source replaced (Sahih Muslim 6384 → Sahih Bukhari 8); "Reflect on what 'no god but Allah' demands" subtask sources updated to Quran 65:3, 98:5 + Bukhari 16, 9
- **Curly-quote bug** — diagnosed silent failure where Edit-introduced U+201C/U+201D in subtask titles broke `seed-hydrator.js:42,55,97` exact-string matching. Audited all 7 seed files: only 5 affected lines (4 in faith, 1 in ummah), all U+2019 in apostrophe positions (Jumu'ah, Ka'bah, Isma'il, du'a). Normalized to ASCII apostrophe.
- `src/components/islamic/QuranEmbed.jsx:57` — added `scrolling="no"` to the Quran.com iframe to suppress nested scrollbar
- **Six Pillars of Iman audit** ([faith-seed-tasks.js:535–712](src/data/seed-tasks/faith-seed-tasks.js#L535)) — fixed 4 source mismatches:
  - Pillar 1 (Allah): swapped Quran 30:56 (Last-Day verse) + Bukhari 16 (sweetness of faith) → Quran 2:163, 2:255, 3:18 + Muslim 8
  - Pillar 4 (Messengers): added Quran 2:285, 4:164, 33:40; replaced lone Bukhari 9 (haya hadith — irrelevant) with Bukhari 4777
  - Pillar 5 (Last Day): added Quran 99:7, 101:4; replaced Bukhari 3611 (khawarij — tangential) with Muslim 8
  - Pillar 6 (Qadar): removed Quran 97:1 and Bukhari 49 (both about Laylat al-Qadr, not divine decree — homonym confusion)

### Verification
- `npm run build` passes (1.32s / 1.40s)
- Audit grep `title:.*[\u2018\u2019\u201C\u201D]` returns 0 matches across `src/data/seed-tasks/`
- Preview navigation through all 4 fixed Iman subtasks confirms correct hadith/ayah cards render via HadithCard / QuranEmbed

### Deferred
- Multi-verse Quran ranges (e.g. `(112:1-4)`) don't match the `^Quran \((\d+):(\d+)\)$` regex in `TaskDetailPanel.jsx:522` — render as plain h3 with stripped Arabic/translation. Existing data uses ranges in places; needs a separate fix to handle ranges in QuranEmbed
- Source-curation audit only covered the "Six Pillars of Iman" task (5 of ~270 faith subtasks); other subtasks may have similar mismatches
- The full hadith narration text inline in seed `sources` markdown is redundant — stripped at render. Could be removed in a future cleanup pass

### Notes
- Session opened mid-flow from a prior compacted conversation; no formal 3-Gate orientation. All work was triggered by user requests on specific UI/data issues.

---

## 2026-04-19 — Dashboard Sanctuary Mode + rollover self-healing

### Context
Continuation of the Ad-lib Niyyah work. The authored sentence (feeling → pillar → submodule) was persisted and surfaced in ManifestoBanner, but the dashboard itself still treated all eight pillars uniformly. Six-phase revamp + follow-up rollover wiring + echo verification.

### Done
- **Phase 1 — Task schema + backfill:** added `pillarId` / `submoduleId` fields to task records; `backfillPillarFields()` idempotent one-shot action on `useTaskStore` gated by `bbiz_task_pillar_migrated_v1` sentinel; `getFocusTasks(submoduleId)` selector returning `{ deepWork, maintenance }`.
- **Phase 2 — Sun & Stars layout:** `--dashboard-accent` CSS var on `.insight` root when niyyah is complete. Primary pillar card on `TodayFocusSection` gets `--sun` (tint, glow, 1.2× type scale); secondary pillars get `--star` demotion. `PillarProgressStrip` bars dimmed to 40% for non-focus pillars.
- **Phase 3 — Guided Task List:** new `FocusTaskList.jsx` — Today's Deep Work (primary section) + collapsible "Keep the Lights On" with count badge. Hidden when niyyah incomplete or skipped.
- **Phase 4 — Ripple Ring + toast:** new `RippleRing.jsx` SVG ring bound to focus-submodule completion %, positioned at top-right of Sun card. 2-second-debounced toast *"One step closer to your {pillar.sidebarLabel}"* on Deep Work completion via `useToastStore`.
- **Phase 5 — Context Widget Slot:** new `ContextWidgetSlot.jsx` with `submoduleId → Component` registry. Widgets: `PrayerCountdownWidget` (extracted shared `useNextPrayer` hook from `PrayerOverlay.jsx`), `PomodoroWidget` (self-contained useReducer, no persistence), `HydrateWidget` (localStorage glass counter), `PriorityProjectWidget` (top open project from `project-store`). Fallback "Focus Tip" card for unmapped submodules.
- **Phase 6 — Evening Reflection:** `niyyahReflection` slice on `threshold-store` with `saveReflection({ feeling, note })`; archived into `niyyahHistory` entry on day-rollover. `EveningReflectButton` appears when Deep Work completion ≥ 50% OR hour ≥ 18. `EveningReflectModal.jsx` reuses the 12-pill ḥāl al-qalb grid for evening feeling.
- **Day-rollover self-healing:** added `rolloverIfStale` action to `threshold-store` (idempotent — early-returns when `niyyahDate === today`). Archives stale niyyah with nested reflection via `archiveStaleNiyyah(get, today)` then clears current-day slots in memory + localStorage (`thr_niyyah_date`, `_feeling`, `_submodule`, `_reflection`; resets `_focus` to `[]`). Wired to Dashboard mount via dedicated useEffect at `src/pages/Dashboard.jsx:310-312`.
- **Yesterday's Echo verified:** morning Niyyah modal step 2 renders `.niyyah-echo` block when `niyyahHistory[last].date === yesterday`. Text: *"Yesterday, you tended to {submodule} with a heart of {feeling}. You closed the day feeling {evening feeling}. Want to chase that feeling again?"* + "Continue the journey" button prefilling Ad-lib with yesterday's values.

### Verification
- Phases 1–6 verified via preview_eval + preview_snapshot + manual interaction during session.
- `rolloverIfStale` verified end-to-end: seeded `bbiz_thr_niyyah_date = '2026-04-17'` + reflection in localStorage + in-memory store → invocation returned `true` → history gained entry with nested `reflection.feeling: 'sakinah'` → all current-day keys cleared in both memory and localStorage (prefix-aware test — the `bbiz_` prefix from `services/storage.js` was the root cause of earlier false negatives).
- Echo verified at `/app` with seeded 2026-04-18 history entry: modal step 2 rendered *"Yesterday, you tended to Learning & Literacy with a heart of Yearning. You closed the day feeling Settled tranquility. Want to chase that feeling again?"*

### Deferred
- Geometric tile / Islamic-pattern variant of the ripple ring (v1 uses plain SVG circle).
- Widgets beyond the four mapped submodules — other submodules fall back to the generic Focus Tip card.
- Pomodoro widget state persistence across reloads (acceptable for v1).
- Reflection comparison history UI (past N days) — data stored, only yesterday's echo surfaced.

### Notes
- HMR fragmentation bug made preview_eval-based verification noisy — `location.reload()` within the iframe didn't always re-evaluate dynamically-imported modules. Workaround: force in-memory store state + localStorage state jointly, then invoke actions directly.
- `services/storage.js` uses a `bbiz_` prefix on every key — tests seeding localStorage raw (without prefix) will diverge from what the store reads. Always seed through `safeSet` or use the prefix explicitly.
- ADR filed: `wiki/decisions/2026-04-19-dashboard-sanctuary-mode.md`.

## 2026-04-21 — Threshold reframe: orient, don't excuse

### Context
The Opening Threshold ceremony had been behaving like a gate: "Am I ready?" with a "Defer to Later" off-ramp on the Pause screen, plus a Confirm checkbox gating the final Begin. This contradicted the operating principle that the work gets done regardless of feeling — the threshold's job is to orient, not to excuse. Two-phase reframe this session.

### Done
- **Phase A — Defer removal (universal) + readiness reframe (faith-salah):** dropped `DEFER_CONTENT`/`DEFER_UNIVERSAL` imports, `deferOpening` store selector, `showingDeferScreen` state, `closeDeferScreen`/`defer` functions, defer-screen ternary branch, and the Defer footer button from `ThresholdModal.jsx`. Pause content branch now data-driven on `data?.pauseWarning && data?.pauseRiseNow` instead of the `noDefer` flag. Reframed `faith-salah.readiness` in `islamic-data.js`: frame shifted from *"Am I ready to begin?"* to *"What am I bringing into this prayer?"*; row labels shifted from *"I can…"* / *"I am still…"* to *"I am bringing…"* / *"I am carrying…"*; `noDefer` flag removed; Maryam 19:59 `pauseWarning` and Ali 'Imran 3:133 `pauseRiseNow` retained.
- **Phase B — Confirm removal + Bismillah finalize:** dropped the Confirm step entirely from the `baseSteps` array, along with `confirmed` state, the Confirm render block, and `returnToReadiness`. Footer finalize now uses an IIFE that renders a single `thr-btn-bismillah` button — `<span class="thr-btn-label">Bismillah</span><span class="thr-btn-arabic arabic" dir="rtl">بِسْمِ اللَّهِ</span>` (opening) or the Alhamdulillah pair (closing) — on three trigger conditions: Readiness all-yes, Pause, and Closing Dua. Previous button preserved on Pause so users can back out without escaping.

### Verification
- `npm run dev` / Vite HMR compiled clean after both waves of edits (earlier parse-error log entries resolved before commit).
- Preview walkthrough on `/app/prophetic-path-test` via Before pill → steps strip shows Dua → Allah ﷻ → Ready? with no Confirm step.
- All-yes on 4 readiness rows: footer rendered Bismillah button with English label at x=704 and Arabic span at x=773 (English-left / Arabic-right confirmed); clicking it closed the modal and completed the ceremony.
- At-least-one nyt: pause button appeared; clicking it advanced to Pause step showing Maryam 19:59 + Ali 'Imran 3:133 + "This prayer has not yet left its time. Rise." + Bismillah finalize + Previous — no Defer button.

### Deferred
- Reframe readiness copy for the other six pillars (Life, Intellect, Family, Wealth, Environment, Ummah) and their sub-modules using the `faith-salah` shape as template.
- Remove orphan `.thr-defer-*` CSS rules and `DEFER_CONTENT` / `DEFER_UNIVERSAL` constants from `islamic-data.js`.
- Remove `deferOpening` / `deferred` / `isDeferred` from `threshold-store.js` after auditing callers (left intact as dead-but-harmless API this pass).
- `.thr-btn-bismillah` uses `justify-content: center` with `gap: 8px` — consider `space-between` + `min-width` for more deliberate anchoring of the English/Arabic pair.

### Notes
- `pauseWarning && pauseRiseNow` is now the branch condition for the "rise now" Pause layout — cleaner than a boolean flag, since the data's presence implies the ceremony carries the covenant weight needed to warrant that specific rendering.
- Commits: `8cc1e4a` (scoped feat on the two files), `c4e39e7` (working-tree snapshot of graphify cache + wiki + seeds + tooling).
- ADR filed: `wiki/decisions/2026-04-21-threshold-orient-not-excuse.md`.

## 2026-04-21 — Threshold defer-orphan cleanup (partial)

### Context
Follow-up sweep from the threshold reframe earlier today. Prior session-close recommended "ripple naming-style readiness across 6 pillars + retire orphan defer artifacts in one sweep." Entered this session to execute that. Scope collapsed on discovery.

### Done
- **Ripple = no-op.** Spot-checked every `readiness:` block in `src/data/islamic/islamic-data.js` (60+ blocks across MODULE_ATTRS + UNIVERSAL_EQUIV). Every block already uses naming-style copy with domain-specific framing — e.g. `work` frames as *"Al-Muhsin asks: am I bringing ihsan to this work, or just getting it done?"* with `yesLabel: 'I am bringing ihsan when'`. Only `faith-salah` had been generic gate-style, and that was fixed yesterday (commit `8cc1e4a`). My 2026-04-21 session-close recommendation was based on an un-verified assumption from the explore agent.
- **Retire (partial).** Deleted `DEFER_CONTENT` and `DEFER_UNIVERSAL` constants from `islamic-data.js` (0 import sites), and the six `.thr-defer-*` CSS rules from `ThresholdModal.css` (0 selectors in use). 64 lines of dead code removed. Commit `4e6a720`.

### Deferred
- **Store-level retire.** `deferOpening` / `deferred` / `isDeferred` in `src/store/threshold-store.js` left in place because callers exist beyond `ThresholdModal`: `CeremonyGate.jsx` (isDeferred → "Return to Opening" UI branch + distinct copy), `Dashboard.jsx:229` (selector), `PillarCard.jsx:32,60` (prop threading + per-module read), `ModuleHealthCard.jsx:6,18,21` (isDeferred prop + yellow status badge via `.mhc-status-deferred`), and `HealthPulse.jsx:9` (cosmetic string). The paths are semantically dead (nothing can ever set `deferred[moduleId]=true` after the defer exit was removed) but removing them changes visible UI and warrants a caller-aware diff pass.
- **CONTEXT.md refresh.** `src/components/islamic/CONTEXT.md` still documents the Defer system; update when the store sweep lands.

### Notes
- Lesson: session-close debriefs must cite *verified* state, not speculative "what's left." The "ripple 6 pillars" recommendation should have been validated against the data file before being written — it would have taken 30 seconds to disprove.
- Commit: `4e6a720` chore(threshold): delete orphan defer constants + CSS (0 callers).
