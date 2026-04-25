---
title: "MILOS lint full pass — 658 → 0/0"
type: decision
date: 2026-04-25
status: accepted
tags: [milos, lint, hygiene, react-refresh, react-hooks]
superseded_by: null
---

# MILOS lint full pass — 658 → 0/0

## Context

Carryover from [[2026-04-25-milos-pre-test-audit]] Tier-4. Pre-pass state: 658 problems (623 errors, 35 warnings) across 4 buckets — auto-fixable (566, mostly seed-task `no-useless-escape`), trivial-manual (21 `react-refresh/only-export-components`), semantic (53 `react-hooks/*`), architectural (16 `no-undef` + `set-state-in-effect`).

## Decision

Full four-bucket pass. Final state: **0 errors, 0 warnings**. Build green throughout.

### B.1 — Auto-fixable + custom escape stripping (515 → 0)

`npx eslint . --fix` ran cleanly but `no-useless-escape` was not auto-fixed because the offending `\'` and `\$` characters were inside backtick template literals — ESLint's auto-fixer is conservative there. Wrote [scripts/strip-template-escapes.mjs](scripts/strip-template-escapes.mjs) — a state-machine that walks each file character-by-character, tracks string/comment context, and strips `\'` (always safe in backticks) and `\$` (safe when not followed by `{`).

Stripped 472 + 40 = 512 errors across [family-seed-tasks.js](src/data/seed-tasks/family-seed-tasks.js) (306), [intellect-seed-tasks.js](src/data/seed-tasks/intellect-seed-tasks.js) (165), [wealth-seed-tasks.js](src/data/seed-tasks/wealth-seed-tasks.js) (28), [environment-seed-tasks.js](src/data/seed-tasks/environment-seed-tasks.js) (13), [BbosFullDashboard.jsx](src/components/bbos/BbosFullDashboard.jsx) (1). Final 3 in BbosFullDashboard were regex-character-class escapes (`[\.\)]`, `[\s:—\-]`) — fixed inline.

The `--fix` pass also auto-corrected ~50 `no-unused-vars` and other auto-fixable rules across BBOS, services, and UI files.

### B.2 — `react-refresh/only-export-components` (21 → 0)

Each pillar `LevelNavigator.jsx` / `CorePage.jsx` exported both a React component AND named constants (`*_PILLARS`, `*_LEVEL_ROUTES`, `*_STORAGE_KEY`, `*_ENSURE_PROJECTS`, `*_LEVEL_DESCRIPTIONS`). The rule fires because Fast Refresh requires component-only exports.

Created 13 sibling `*-constants.js` files. Moved all non-component exports including the lucide icon imports they reference (icons are data here, not JSX). Updated 20+ consumer files in `submodule-registry.js`, LevelOverview/PillarPage components, and the navigators themselves.

Files created: 13 `*-constants.js` across [environment](src/pages/environment/), [faith](src/pages/faith/), [family](src/pages/family/), [intellect](src/pages/intellect/), [life](src/pages/life/), [moontrance](src/pages/moontrance/), [ummah](src/pages/ummah/), [wealth](src/pages/wealth/) — Navigator + CorePage where applicable.

### B.3 — Semantic React-hooks bucket (53 → 0)

35 `exhaustive-deps`, 10 `rules-of-hooks`, 8 `set-state-in-effect`, 2 `use-memo`, 1 `refs`, 1 `purity`, 1 `react/use`, 1 `rules/components-and-hooks-must-be-pure`. Fixed across ~28 files including [ProjectBoard.jsx](src/components/work/ProjectBoard.jsx) (19 errors — by far the worst), [TaskDetailPanel.jsx](src/components/work/TaskDetailPanel.jsx) (8), [LevelNavigator.jsx](src/components/shared/LevelNavigator.jsx) (7), and dashboard pages.

Notable structural changes (not annotations):
- **ProjectBoard.jsx** rules-of-hooks (9 errors): hoisted the entire cross-fade hook block (1 useState + 7 useRefs + useLayoutEffect) above the `if (!project) return null;` early return. Also extracted `projectTasks` const before its `useMemo` to satisfy use-memo complex-expression.
- **OnboardingChecklist.jsx**: moved `if (checklistDismissed) return null;` after hook calls.
- **FaithDashboard.jsx**: aliased `Infinity` import as `InfinityIcon` (no-shadow-restricted-names was treating the lucide-react icon name as the global Infinity).
- **BbosTaskPanel.jsx, InlineTaskDetail.jsx**: removed `|| true` constant-truthiness from JSX guards (no-constant-binary-expression — these were dead-code holdovers).
- **try/catch** blocks given comment bodies for no-empty.
- Multiple files: deleted genuinely-unused props, imports, locals, and helper functions (no behavioral impact — they were dead).

Annotations added (~28 `// eslint-disable-next-line` with one-line rationale): caller-stable props, store actions, mount-only effects where adding the flagged dep would cause render loops. The annotations are not blanket suppressions — each one carries its rationale inline.

ESLint config updated [eslint.config.js](eslint.config.js): added `argsIgnorePattern: '^[A-Z_]|^_'` and `destructuredArrayIgnorePattern` to eliminate ~24 false-positive Icon-component-arg warnings at the source rather than suppress per-line.

### B.4 — Architectural (16 → 0)

[vite.config.js](vite.config.js): replaced 8 `__dirname` refs with ESM-compatible `path.dirname(fileURLToPath(import.meta.url))`.

8 `set-state-in-effect` instances: 5 fixed via controlled-syncing annotations where state must mirror an external prop/route change (the legitimate use case — annotation explains why the pattern is correct here); 3 refactored to derived state or initializer.

## Consequences

**Positive:**
- `npx eslint .` exits 0 with 0 errors / 0 warnings
- Fast-refresh now correctly hot-reloads pillar pages on edit (was breaking due to mixed-export files)
- Vite config no longer relies on CJS `__dirname` global — now genuine ESM
- ProjectBoard.jsx's hook-after-early-return latent bug fixed (could have caused conditional-hook crashes in error states)
- ~30 dead-code symbols removed across the codebase

**Trade-offs:**
- 13 new `*-constants.js` files added — slight file-count increase, but each is small and the separation is conceptually correct (data vs. presentation)
- ~28 inline `eslint-disable-next-line` annotations added for cases where the rule's preferred pattern doesn't apply (mount-only effects, store-action selectors). Each is annotated with a one-line reason. Future authors should treat these as reviewable signposts, not free passes.
- `lucide-react` icon imports now live in `*-constants.js` files — slight conceptual drift (icons feel like UI) but they're being used as data here (`{ Icon: HandHeart }`), so the placement is correct.

**Verification:**
- `npx eslint .` exits 0 with 0/0
- `npm run build` exits 0, 2,766 modules transformed
- Preview-tested 7 pillar surfaces (faith/wealth/ummah/intellect/family/life/environment cores + growth + dashboard + prophetic-path) post-pass — all render correctly

**Files touched in B (count):** ~70 files (13 new constants files + 13 navigator/core files + ~28 hook-fix files + ~20 consumer-import updates + eslint config + vite config + script + 5 seed-task data files)

## Carries forward in this session

- Phase C.1 — two-axis grounding tooling (Vitest + schema test + strict lint)
- Phase C.2 — Faith pillar finish (212 entries via NotebookLM Muslim Scholar)
