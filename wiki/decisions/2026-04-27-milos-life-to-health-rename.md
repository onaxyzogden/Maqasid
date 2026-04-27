---
title: "MILOS — Rename Life pillar to Health"
date: 2026-04-27
type: decision
status: accepted
tags: [milos, refactor, naming, pillars]
---

## Context

The second Maqasid pillar — preservation of self/nafs (Hifz al-Nafs) — has been
labeled "Life" in MILOS code since the original scaffold. The classical
Arabic/scholarly framing remains *Vitality / Hifz al-Nafs / al-nafs*, but the
English UI label "Life" was ambiguous (people read it as "lifestyle" or
"life management") and conflicted with surrounding business-modules language.
"Health" is the standard English rendering of this Maqsad in modern
Maqasid scholarship and is far more discoverable.

## Decision

Rename the pillar across MILOS code, routes, board IDs, CSS tokens, file
paths, and tooling from `life` → `health`. The classical Arabic/scholarly
fields (`arabicRootAr`, `vitality*` framings, `Hifz al-Nafs`,
`Vitality / Vitality Stewardship / Vitality Management` triad inside
`src/data/maqasid.js`) are **preserved unchanged** — those are the canonical
Islamic framing and were never renamed.

## Scope

- Pillar id `'life'` → `'health'` in `maqasid.js`, registry, ayat router,
  pillar-content / next-actions / wisdom maps, onboarding store, ayah-banner
  keys, prophetic-path chips and time-of-day mapping
- Submodule ids `life-physical/mental/safety/social` → `health-*` in
  `modules.js`, `prophetic-path-submodules.js`, `pillar-content.js`,
  `islamic-data.js`, `ContextWidgetSlot.jsx`
- Board IDs `life_<dim>_<level>` → `health_*` (12 boards) in
  `project-store.js` `HEALTH_BOARDS` map (renamed from `LIFE_BOARDS`)
- Store fns `ensureLifeProjects` → `ensureHealthProjects`; flag
  `_lifeModule` → `_healthModule`
- File renames: `pages/life/` → `pages/health/` (14 files Life*→Health*),
  `components/health/HealthPathToExcellenceCards.jsx`,
  `seed-tasks/life-seed-tasks.js` → `health-seed-tasks.js`,
  `ayat/life-readiness-ayat.js` → `health-readiness-ayat.js`
- Routes `/app/life-*`, `/app/pillar/life` → `/app/health-*`,
  `/app/pillar/health`
- CSS tokens `--pillar-life`/`-bg`/`-border` → `--pillar-health*`
  (light + dark scopes in `tokens.css`)
- Sidebar label "Life" → "Health"
- Scripts: `migrate-life-grounding.mjs`, `audit-life-migration.mjs`,
  `grade-life-loop.ps1`, `grade-life-only.cmd`, plus internal pillar-id
  references in `audit-source-refs.mjs`, `apply-source-refs.mjs`,
  `apply-hadith-sources.mjs`, `strip-hadith-sources.mjs`,
  `extract-subtask-matrix.mjs`, `generate-hadith-candidates.mjs`,
  `rationale-survey.mjs`, `grade-all-pillars.cmd`
- Stages: `subtask-matrix-life.md`, `_review-life.txt` renamed and headers
  updated; the `life-seed-tasks.js` references inside
  `stages/source-audit/2026-04-21-review.md` are historical diff snapshots
  and were intentionally left as-is

## Excluded (intentionally not renamed)

- `wiki/concepts/maqasid-al-shariah.md` — scholarly framing of Hifz al-Nafs
- `wiki/decisions/2026-04-25-milos-life-grounding-complete.md` — historical
  decision record naming preserved
- `Vitality`, `Vitality Stewardship`, `Vitality Management`, `Hifz al-Nafs`,
  `arabicRootAr` fields in `src/data/maqasid.js`
- `life-*` CSS class names inside `HealthDashboard.{jsx,css}` — private
  scoped class names that share no external consumers
- Generic English "life" / "lifecycle" prose in seed-task descriptions and
  wiki content (e.g. "this resource is life-giving", "life skills",
  "life-saving") — these are natural English usage, not the pillar id
- `tmp/life-original.js` legacy import in `audit-health-migration.mjs`
  (historical pre-migration snapshot, intentionally preserved by name)

## Migration

Persisted user data lives in localStorage via the `safeGet/safeSet`
helpers in `src/services/storage`. Added `migrateLifeToHealth(projects)`
to `src/store/project-store.js`, wired into the migration chain that
hydrates `projects` at store init:

```js
function migrateLifeToHealth(projects) {
  let changed = false;
  const migrated = projects.map((p) => {
    let next = p;
    if (typeof p.id === 'string' && p.id.startsWith('life_')) {
      const newId = 'health_' + p.id.slice('life_'.length);
      const oldTasksKey = `tasks_${p.id}`;
      const newTasksKey = `tasks_${newId}`;
      const oldTasks = safeGetJSON(oldTasksKey, null);
      if (oldTasks !== null) {
        safeSet(newTasksKey, oldTasks);
        safeRemove(oldTasksKey);
      }
      next = { ...next, id: newId };
      changed = true;
    }
    if (next._lifeModule) {
      const { _lifeModule, ...rest } = next;
      next = { ...rest, _healthModule: true };
      changed = true;
    }
    return next;
  });
  if (changed) safeSet('projects', migrated);
  return migrated;
}
```

This rewrites both the project id (`life_*` → `health_*`) and migrates
the per-project task storage key (`tasks_life_*` → `tasks_health_*`) so
no user task data is lost. The internal flag `_lifeModule` is also
upgraded to `_healthModule` to keep seed-board detection consistent in
`prophetic-path-submodules.js` and `pages/modules/Work.jsx`.

`mithaqStore.js` does not need migration: its `activations` map is keyed
by domain string and all entries auto-expire at next Fajr (5am), so any
`'life'` activation drops naturally within 24h. `onboarding-store.js`
does not need migration: `seenPillars` is rebuilt from the runtime
`ALL_PILLARS` list which now contains `'health'`.

## Consequences

- All grounding tooling (`npm run lint`, `npm test`, inline-refs auditor)
  passes at ratchet 0 after the rename
- Existing user localStorage with `life_physical_core` etc. boards will
  be auto-migrated to `health_physical_core` on first load post-deploy
- The `Health` label is the new English UI presentation; the Islamic
  classical frame (`Hifz al-Nafs`, `Vitality`, `An-Nafs`) is unchanged
  in the pillar's `subtitle`, `vitalityFraming`, and `arabicRootAr`
  fields
