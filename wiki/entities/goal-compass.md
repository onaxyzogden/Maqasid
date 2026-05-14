# Goal Compass

**Type:** Module (Atlas · Plan stage)
**Repo:** atlas (`apps/web`)
**Status:** shipped (MVP — homestead archetype); extended 2026-05-14 with 5-tab structure, project-type templates, auto-scheduled tasks to Act calendar

Goal Compass is the 12th Plan module. The steward declares
**measurable success criteria** for a parcel; a deterministic
sequencing engine reads them against a curated intervention catalog
and emits phased, costed, labor-budgeted rows into the shared
`phaseStore` — visible from both the Goal Compass *Generated plan*
tab and the existing *Phasing & Budgeting* module.

## Surface

Five tabs (lazy-loaded from `PlanModuleSlideUp.tsx`):

1. **Goal tree** — parent goal + sub-goals + criteria editor;
   seeded from a **project-type template** keyed on
   `PlanProjectTypeKey` (homestead / regenerative_farm /
   retreat_center / educational_farm / conservation /
   multi_enterprise — see `goalTreeTemplates.ts`). Default UI lets
   stewards tune criterion `target` and `deadlineYear` only;
   structural edits (add/remove criterion, edit description, edit
   sub-goal title) live behind an **Advanced** `<details>` collapse.
   A template-picker `<select>` in the hero swaps the whole tree
   after a confirm dialog.
2. **Site profile** — 9 facets across Parcel / Conditions /
   Household, each with a provenance pill
   (`Observe` / `Manual` / `Unset`).
3. **Proposal** — read-mostly view of generated phases; each row
   has a "Preview removal" affordance that opens the **Impact
   Preview** panel.
4. **Develop plan** — bridge to Phasing & Budgeting. Carries the
   **project start date** input (`LocalProject.startDate`) that
   anchors the calendar schedule and a **Re-schedule tasks** button
   that re-runs `scheduleTasksToCalendar` against existing phases.
5. **Criteria forecast** — table of every criterion across year
   buckets {1, 3, 5, 7, 10, 20}, with by-deadline ✓/✗ and a
   confidence indicator (manual-facet density).

## Architecture

```
apps/web/src/v3/plan/
├─ data/
│  ├─ goalCompassTypes.ts        # Intervention, GoalTree, SiteProfile, Facet<T>
│  ├─ interventionCatalog.ts     # 13 homestead interventions w/ sources[]
│  ├─ homesteadGoalTree.ts       # homestead template (reused below)
│  └─ goalTreeTemplates.ts       # 6 project-type templates + getter
├─ engine/goalCompass/
│  ├─ siteRequirementPredicates.ts
│  ├─ sequencingEngine.ts        # greedy topological selection
│  ├─ scheduleTasksToCalendar.ts # season-window → ISO date distribution
│  ├─ criteriaForecast.ts        # year-bucket roll-up + confidence
│  └─ impactPreview.ts           # delta / cascade / regression
└─ cards/goal-compass/
   ├─ GoalTreeTab.tsx
   ├─ SiteProfileTab.tsx
   ├─ GeneratedPlanTab.tsx       # Proposal tab
   ├─ DevelopPlanTab.tsx         # start date + Re-schedule
   └─ CriteriaForecastTab.tsx

apps/web/src/store/
├─ goalTreeStore.ts              # per-project, persisted
├─ siteProfileStore.ts           # per-facet writes w/ provenance
└─ … (phaseStore extended with generated-row provenance fields)
```

## Sequencing engine

Greedy, deterministic, no LLM:

1. Filter `interventionCatalog` by `siteRequirements` predicates
   against `siteProfile`.
2. Walk `subGoal.criteria` in declaration order; compute coverage
   gap per criterion.
3. Select the next intervention that
   (a) clears its prereq topology,
   (b) is within or under the current Yeomans phase cap (climate →
       landshape → water → access → trees → buildings →
       subdivision → soil),
   (c) respects acreage budget (Σ footprints ≤ `siteProfile.acres`),
   (d) respects household labor budget (default 40 hr/week ×
       adults).
4. Materialise the result into `phaseStore` via
   `replaceGoalCompassRows()` — preserves any
   `status: 'overridden'` rows.

## Provenance

Every generated `PhaseTask` carries:

- `generatedFromIntervention: '<intervention-id>'`
- `goalCriterionId: '<criterion-id>'`
- `catalogVersion: '<semver>'`
- `status: 'generated'` (until the steward overrides → `'overridden'`)

User-authored rows have `status === undefined` and are
**never touched** by the engine. This is the safety property that
keeps Goal Compass safe to ship alongside hand-authored Phasing &
Budgeting data.

## Exclusion list

Per-project `excludedInterventionsByProject` on `goalTreeStore`
records intervention ids the steward has confirmed-removed via the
Impact Preview. The engine filters its catalog by this set on every
regenerate; the *Generated plan* tab shows a "Restore N excluded"
affordance to clear the set. `computeImpactPreview` takes the
current exclusion list so its post-removal preview reflects the
true future state (existing exclusions remain excluded after the
new one is applied).

## Grounding

Each `Intervention` carries a `sources[]` array following the same
MILOS two-axis convention as `substitutionCatalog.ts` — Mollison
*Permaculture: A Designer's Manual*, Yeomans *Water for Every
Farm*, Crawford *Creating a Forest Garden*, Holzer *Permaculture: A
Practical Guide*, OMAFRA / NRCS for regional cost & labor norms.

## Auto-scheduled tasks → Act calendar

After every `Generate proposal` (and on `Re-schedule`),
`scheduleTasksToCalendar(phases, tasks, projectStartDate)` distributes
each `PhaseTask` to a concrete `scheduledStart` / `scheduledEnd` ISO
date. Year offset = `phase.order - 1` from the project start date;
within a phase, tasks are distributed evenly across their season's
90-day window (spring Mar 1–May 31, summer Jun 1–Aug 31, fall Sep
1–Nov 30, winter Dec 1–Feb 28). Duration = `ceil(laborHrs / 8)` days,
min 1.

Every task is tagged `roleAccess: ['owner','designer','reviewer','viewer']`
— forward-compat for per-role calendar filtering (no UI gate yet).

`useEventAggregator` adds a 6th source `'phaseTask'` (label:
"Plan tasks") that emits one `CalendarEntry` per scheduled task with
meta `"<phase> · <hrs>h · <roles>"`. Result: Goal Compass output is
visible on Act → Schedule → Event calendar.

## Decisions

- [2026-05-14 — Atlas Goal Compass](../decisions/2026-05-14-atlas-goal-compass.md)
- [2026-05-14 — Goal Compass: templates + Act calendar auto-schedule](../decisions/2026-05-14-atlas-goal-compass-templates-and-scheduling.md)

## Related entities

- [OLOS](olos.md) — parent product.
