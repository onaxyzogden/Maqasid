# Boundaries Re-decompose Implementation Plan (SP1 group 1 of 4)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Status:** draft (awaiting human review)
**Date:** 2026-06-07
**Spec:** `stages/spec-ev-s1-foundation-captures-draft.md` (sections 2.1, 5, 10-14)
**Goal:** Re-decompose the shipped `s1-boundaries` objective from 7 checklist items to the mockup's 5, and rebuild `BoundaryCapture` as a register-based 5-mode capture, pixel-faithful to `~/Downloads/olos_boundary_legal_survey.html`, while preserving the shipped component as `BoundaryCaptureLegacy.tsx`.

**Architecture:** One self-routing `BoundaryCapture.tsx` with pure exported helpers (`boundaryModeFor`/`decodeBoundary`/`isBoundaryValid`/`summariseBoundary`) over a FLAT `FormValue` (`Record<string, string | string[]>`). Register rows persist as **parallel arrays** (the StewardCapture precedent) because `FormValue` cannot hold object arrays. The shipped panel arm (`isBoundary`) and detection (`startsWith('s1-boundaries-')`) are unchanged; only the gate-note mode strings, `MODE_LABELS`, the catalogue, and the option sets change.

**Tech Stack:** `@ogden/shared` (Zod catalogue + fieldOptions), `@ogden/web` (React 18 + TS strict + `noUncheckedIndexedAccess`, Zustand 5, CSS modules, lucide-react). Vitest (`--pool=forks --testTimeout=20000`). ASCII-only; apostrophes via double-quoted JS strings.

**Repo root for all paths below:** `C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1\atlas` (the atlas submodule). Branch `feat/structured-capture-forms`.

---

## Encoding decision (READ FIRST - load-bearing)

`FormValue = Record<string, string | string[]>` (from `apps/web/src/v3/act/tier-shell/actToolCatalog.ts`). It holds only string scalars and string arrays - NOT arrays of objects. Each checklist item has its OWN independent `FormValue` at `actEvidenceStore.visionFormData[itemId]`, so field-name collisions only matter WITHIN a single item.

Therefore each register persists as parallel string arrays, zipped to `Math.min` of their lengths on decode (mirrors `decodeSteward` in `StewardCapture.tsx`):

| item | mode | parallel-array / scalar keys in its FormValue |
|---|---|---|
| c1 | `boundaryRegister` | `directions[]`, `secTypes[]`, `names[]`, `obligations[]`, `disputes[]` (dispute as `"true"`/`""`) |
| c2 | `rowRegister` | `rowTypes[]`, `names[]`, `impacts[]`, `holders[]`, `widths[]`, `details[]` |
| c3 | `tenancyRegister` | `tenTypes[]`, `names[]`, `expiries[]`, `flags[]`, `details[]` |
| c4 | `titleRestrictionChecker` | `categories[]` (length 6, positional; each `"present"`/`"absent"`/`"unknown"`) |
| c5 | `landHistoryRegister` | `eras[]`, `histTypes[]`, `names[]`, `bodies[]` (rows) + `wasPriorIC` (scalar) + `contamination[]` + `notes` (scalar) |

Default for c4 unset categories is `"unknown"` - this starts the hard gate LOCKED, forcing positive assessment (the mockup's `updateGate4()` behaviour).

ASCII normalisation: the mockup uses em-dashes, middots, and curly quotes. Transcribe user-facing strings VERBATIM in wording but normalise punctuation to ASCII (em-dash -> ` - `, `·` -> `,`, curly quotes -> straight), matching the existing catalogue/option-set style (e.g. `"Rural - General agriculture"`).

---

## File Structure

**Shared (`packages/shared/`):**
- `src/constants/plan/fieldOptions.ts` - MODIFY: add 11 new `_base`-only boundary option sets (keep the 10 shipped ones; no deletion).
- `src/constants/plan/catalogues/universal.ts` - MODIFY: rewrite the `s1-boundaries` objective (7 items/2 groups -> 5 items/3 groups).
- `src/constants/plan/__tests__/fieldOptions.test.ts` - MODIFY: add new-set assertions.
- `src/constants/plan/__tests__/catalogues.test.ts` - the existing conformance loop covers the rewrite automatically; add one targeted shape test.

**Web (`apps/web/src/v3/act/tier-shell/`):**
- `BoundaryCapture.tsx` -> RENAME to `BoundaryCaptureLegacy.tsx` (keep all exports; unwired).
- `__tests__/BoundaryCapture.test.tsx` -> RENAME to `__tests__/BoundaryCaptureLegacy.test.tsx` (retarget import; stays green).
- `BoundaryCapture.module.css` -> RENAME to `BoundaryCaptureLegacy.module.css` (retarget the legacy import).
- `BoundaryCapture.tsx` - CREATE fresh (new 5-mode register component + pure helpers).
- `BoundaryCapture.module.css` - CREATE fresh.
- `__tests__/BoundaryCapture.test.tsx` - CREATE fresh (new behaviour).
- `DecisionWorkingPanel.tsx` - MODIFY: gate-note arm mode strings only (lines ~317-327).
- `DecisionList.tsx` - MODIFY: `MODE_LABELS` - add 5 new mode keys (lines ~53-64).

**Docs (`wiki/` - in the atlas repo):**
- `wiki/log/2026-06-07-atlas-boundaries-redecompose.md`, `wiki/decisions/2026-06-07-atlas-boundaries-redecompose.md`, `wiki/index.md`. (Do NOT touch `wiki/log.md` if foreign-staged - verify at execution.)

No change to `ActTierShell.tsx` (`s1-boundaries` already in `TIER_ZERO_OBJECTIVE_IDS`), `ActTierZeroWorkbench.tsx` (`isBoundary` still `startsWith('s1-boundaries-')`; map strip unchanged), or `buildDecisionTarget`.

---

## Commands (Windows PowerShell)

- Shared test (bounded): `pnpm --filter @ogden/shared exec vitest run <relPath> --pool=forks --testTimeout=20000`
- Web test (bounded): `pnpm --filter @ogden/web exec vitest run <relPath> --pool=forks --testTimeout=20000`
- Shared tsc: `pnpm --filter @ogden/shared exec tsc --noEmit`
- Web tsc: `$env:NODE_OPTIONS='--max-old-space-size=8192'; pnpm --filter @ogden/web exec tsc --noEmit`

**Branch hygiene (every commit):** confirm branch `feat/structured-capture-forms`; `git -C <atlas> fetch` + divergence check `git -C <atlas> rev-list --left-right --count HEAD...origin/feat/structured-capture-forms` BEFORE each commit; stage by EXPLICIT pathspec (never `git add -A`); `git add -- <path>` new untracked files first; partial-commit `git commit -F <msgfile> -- <paths>` (foreign WIP is staged in the index); NO `--amend`; commit each task on green; DO NOT push; ASCII-only (no em-dashes); commit-message temp file UTF-8 WITHOUT BOM (verify first 3 bytes are NOT 239 187 191); end every message `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`; verify `git -C <atlas> diff --cached --name-only` after staging; NEVER stage/touch foreign WIP.

---

## Task BR0: Prep - branch, divergence, old-id reference sweep

**Files:** none (read-only investigation).

- [ ] **Step 1: Confirm branch + divergence.**
  Run: `git -C "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1\atlas" rev-parse --abbrev-ref HEAD`
  Expected: `feat/structured-capture-forms`. Then `git -C <atlas> fetch` and `git -C <atlas> rev-list --left-right --count HEAD...origin/feat/structured-capture-forms`. Note the counts; if the branch has diverged remotely, surface it before proceeding.

- [ ] **Step 2: Sweep for hard-coded references to the retiring ids `s1-boundaries-c6` and `s1-boundaries-c7`** (these ids disappear in BR2).
  Use Grep: pattern `s1-boundaries-c[67]`, path `atlas`, output_mode `files_with_matches`.
  Expected matches: only `BoundaryCapture.tsx` and `__tests__/BoundaryCapture.test.tsx` (both retargeted to legacy in BR3). If ANY other file (a panel test, workbench test, grounding test, actToolCatalog) references c6/c7, record it - it must be reconciled in the task that owns that file (flag to the controller; do not silently leave a dangling reference).

- [ ] **Step 3: Sweep for references to the retiring boundary modes** `'doc'`, `'mapEntry'` as boundary modes is fine (legacy keeps them); confirm `MODE_LABELS` in `DecisionList.tsx` and the gate-note arm in `DecisionWorkingPanel.tsx` are the only consumers of `boundaryModeFor`'s return values (Grep pattern `boundaryModeFor`, path `atlas/apps/web/src/v3/act/tier-shell`). Record consumers; BR8 updates them.

No commit (investigation only). Report findings to the controller before BR1.

---

## Task BR1: Shared boundary option sets (11 new `_base` sets)

**Files:**
- Modify: `packages/shared/src/constants/plan/fieldOptions.ts` (insert a new block AFTER the existing `boundaryPermitActivities` set, ~line 357, INSIDE `FIELD_OPTION_SETS`).
- Test: `packages/shared/src/constants/plan/__tests__/fieldOptions.test.ts`.

- [ ] **Step 1: Write the failing test.** Append to `fieldOptions.test.ts`:

```ts
describe('boundary re-decompose option sets (BR1)', () => {
  const NEW_SETS: ReadonlyArray<[string, number]> = [
    ['boundaryDirection', 4],
    ['boundarySectionType', 4],
    ['boundaryRowType', 4],
    ['boundaryRowImpact', 3],
    ['boundaryTenancyType', 3],
    ['boundaryTenancyExpiry', 3],
    ['boundaryTenancyFlag', 3],
    ['boundaryTitleState', 3],
    ['boundaryHistoryType', 4],
    ['boundaryContamination', 5],
    ['boundaryPriorCommunity', 2],
  ];

  it.each(NEW_SETS)('%s exists with a non-empty _base of %i entries', (id, n) => {
    const set = FIELD_OPTION_SETS[id];
    expect(set, id).toBeDefined();
    expect(set!._base, id).toBeDefined();
    expect(set!._base!.length, id).toBe(n);
  });

  it.each(NEW_SETS)('%s resolves _base verbatim for an undefined project type', (id) => {
    const set = FIELD_OPTION_SETS[id]!;
    expect(resolveFieldOptions(id, undefined)).toEqual([...set._base!]);
  });

  it('boundaryTitleState is Present/Absent/Unknown in order', () => {
    expect(resolveFieldOptions('boundaryTitleState', undefined)).toEqual([
      'Present',
      'Absent',
      'Unknown',
    ]);
  });
});
```

- [ ] **Step 2: Run; expect FAIL** (sets undefined).
  Run: `pnpm --filter @ogden/shared exec vitest run src/constants/plan/__tests__/fieldOptions.test.ts --pool=forks --testTimeout=20000`

- [ ] **Step 3: Implement.** Insert into `FIELD_OPTION_SETS` (after `boundaryPermitActivities`):

```ts
  // REVIEW: Boundary RE-DECOMPOSE option sets (SP1) -- content transcribed
  // verbatim from olos_boundary_legal_survey.html, ASCII-normalised. Operator
  // to confirm/extend before treating as authoritative. The shipped boundary*
  // sets above are retained (used by BoundaryCaptureLegacy).
  boundaryDirection: {
    _base: ['N', 'E', 'S', 'W'],
  },
  boundarySectionType: {
    _base: [
      'Shared / dividing fence',
      'Creek / natural boundary',
      'Council road frontage',
      'Unfenced / in dispute',
    ],
  },
  boundaryRowType: {
    _base: [
      'Utility easement',
      'Access easement',
      'Public right of way',
      'Drainage easement',
    ],
  },
  boundaryRowImpact: {
    _base: ['Restricts', 'Enables', 'Minor impact'],
  },
  boundaryTenancyType: {
    _base: ['Agistment', 'Lease', 'Water license'],
  },
  boundaryTenancyExpiry: {
    _base: ['Near', 'Far', 'Expired'],
  },
  boundaryTenancyFlag: {
    _base: [
      'Must terminate before community occupation',
      'Monitor',
      'No termination required',
    ],
  },
  boundaryTitleState: {
    _base: ['Present', 'Absent', 'Unknown'],
  },
  boundaryHistoryType: {
    _base: ['Agricultural', 'Community', 'Development', 'Industrial'],
  },
  boundaryContamination: {
    _base: [
      'Chemical storage / AST',
      'Asbestos structures',
      'Rubbish dump / landfill',
      'Mining or extraction',
      'None known',
    ],
  },
  boundaryPriorCommunity: {
    _base: ['Yes - detail below', 'No prior community'],
  },
```

- [ ] **Step 4: Run test + shared tsc; expect PASS / EXIT 0.**
  `pnpm --filter @ogden/shared exec vitest run src/constants/plan/__tests__/fieldOptions.test.ts --pool=forks --testTimeout=20000`
  `pnpm --filter @ogden/shared exec tsc --noEmit`

- [ ] **Step 5: Commit** (explicit pathspec):
  `feat(shared): boundary re-decompose option sets (SP1 BR1)`

---

## Task BR2: Catalogue rewrite - s1-boundaries 7 items / 2 groups -> 5 items / 3 groups

**Files:**
- Modify: `packages/shared/src/constants/plan/catalogues/universal.ts` (the `s1-boundaries` `obj({...})` block, lines ~153-192).
- Test: `packages/shared/src/constants/plan/__tests__/catalogues.test.ts`.

- [ ] **Step 1: Write the failing test.** Append to `catalogues.test.ts`:

```ts
describe('s1-boundaries re-decompose (BR2)', () => {
  const boundaries = UNIVERSAL_PLAN_OBJECTIVES.find(
    (o) => o.id === 's1-boundaries',
  );

  it('exists and has exactly 5 checklist items c1..c5', () => {
    expect(boundaries).toBeDefined();
    expect(boundaries!.checklist.map((c) => c.id)).toEqual([
      's1-boundaries-c1',
      's1-boundaries-c2',
      's1-boundaries-c3',
      's1-boundaries-c4',
      's1-boundaries-c5',
    ]);
  });

  it('partitions the 5 items across 3 decision groups', () => {
    const groups = boundaries!.decisionGroups;
    expect(groups.map((g) => g.id)).toEqual([
      's1-boundaries-dg1',
      's1-boundaries-dg2',
      's1-boundaries-dg3',
    ]);
    expect(groups[0]!.itemIds).toEqual([
      's1-boundaries-c1',
      's1-boundaries-c2',
    ]);
    expect(groups[1]!.itemIds).toEqual([
      's1-boundaries-c3',
      's1-boundaries-c4',
    ]);
    expect(groups[2]!.itemIds).toEqual(['s1-boundaries-c5']);
  });

  it('no longer references the retired c6/c7 ids', () => {
    const ids = boundaries!.checklist.map((c) => c.id).join(',');
    expect(ids).not.toMatch(/s1-boundaries-c[67]/);
  });
});
```

- [ ] **Step 2: Run; expect FAIL** (still 7 items).
  `pnpm --filter @ogden/shared exec vitest run src/constants/plan/__tests__/catalogues.test.ts --pool=forks --testTimeout=20000`

- [ ] **Step 3: Implement.** Replace the entire `s1-boundaries` `obj({...})` block with:

```ts
  obj({
    id: 's1-boundaries',
    stratumId: 's1-project-foundation',
    ref: 'U-S1.2',
    source: 'universal',
    title: 'Settled site boundaries & legal constraints',
    shortTitle: 'Site boundaries & legal constraints',
    focusedQuestion:
      'What are the legal conditions on this land - its boundaries, obligations, encumbrances, and title restrictions - and what constraints do these place on communal use?',
    checklist: [
      ck(
        's1-boundaries-c1',
        'Map all shared boundary conditions and obligations',
      ),
      ck(
        's1-boundaries-c2',
        'Identify rights of way affecting communal land use and movement',
      ),
      ck(
        's1-boundaries-c3',
        'Record any existing tenancy, lease, or occupation agreements on the land',
      ),
      ck(
        's1-boundaries-c4',
        'Identify any title conditions that restrict multi-dwelling or communal use',
      ),
      ck(
        's1-boundaries-c5',
        'Record any prior community or development history on the land',
      ),
    ],
    decisionGroups: [
      dg(
        's1-boundaries-dg1',
        'Boundaries & rights of way',
        ['s1-boundaries-c1', 's1-boundaries-c2'],
        ['Access design', 'Spatial framework', 'Exclusion zones'],
      ),
      dg(
        's1-boundaries-dg2',
        'Tenancy & title conditions',
        ['s1-boundaries-c3', 's1-boundaries-c4'],
        ['Pre-occupation Act tasks', 'Community form constraints'],
      ),
      dg(
        's1-boundaries-dg3',
        'Land history',
        ['s1-boundaries-c5'],
        ['Tier 1 ecology survey', 'Cultural heritage obligations'],
      ),
    ],
    completionGate:
      'Land tenure and boundary conditions fully surveyed. All constraints on communal use identified.',
    actHandoff: 'Legal & Boundary Constraints Brief',
  }),
```

- [ ] **Step 4: Run the targeted test + the full catalogue conformance test + shared tsc; expect PASS / EXIT 0.**
  `pnpm --filter @ogden/shared exec vitest run src/constants/plan/__tests__/catalogues.test.ts --pool=forks --testTimeout=20000`
  (This also re-runs the schema-parse loop and the group-partition invariant - both must stay green. checklist.length=5 satisfies the 5-15 bound.)
  `pnpm --filter @ogden/shared exec tsc --noEmit`

- [ ] **Step 5: Commit** (explicit pathspec):
  `feat(shared): re-decompose s1-boundaries to 5 items / 3 groups (SP1 BR2)`

---

## Task BR3: Preserve the shipped component as BoundaryCaptureLegacy (no-deletion)

**Files (all under `apps/web/src/v3/act/tier-shell/`):**
- Rename `BoundaryCapture.tsx` -> `BoundaryCaptureLegacy.tsx`
- Rename `BoundaryCapture.module.css` -> `BoundaryCaptureLegacy.module.css`
- Rename `__tests__/BoundaryCapture.test.tsx` -> `__tests__/BoundaryCaptureLegacy.test.tsx`

Goal: the shipped 7-id doc/map/mapEntry/decision component stays compiling + tested but UNWIRED, per [[feedback-no-deletion]]. (`DecisionWorkingPanel.tsx` imports `./BoundaryCapture.js` - that name will be re-created fresh in BR4, so the panel keeps pointing at the NEW component.)

- [ ] **Step 1: Move the three files** (PowerShell `git mv` to preserve history):
  ```powershell
  $tp = "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1\atlas\apps\web\src\v3\act\tier-shell"
  git -C "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1\atlas" mv "apps/web/src/v3/act/tier-shell/BoundaryCapture.tsx" "apps/web/src/v3/act/tier-shell/BoundaryCaptureLegacy.tsx"
  git -C "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1\atlas" mv "apps/web/src/v3/act/tier-shell/BoundaryCapture.module.css" "apps/web/src/v3/act/tier-shell/BoundaryCaptureLegacy.module.css"
  git -C "C:\Users\MY OWN AXIS\Documents\MAQASID OS - V2.1\atlas" mv "apps/web/src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx" "apps/web/src/v3/act/tier-shell/__tests__/BoundaryCaptureLegacy.test.tsx"
  ```

- [ ] **Step 2: Retarget the legacy CSS import** in `BoundaryCaptureLegacy.tsx`:
  change `import css from './BoundaryCapture.module.css';`
  to `import css from './BoundaryCaptureLegacy.module.css';`

- [ ] **Step 3: Retarget the legacy test import** in `__tests__/BoundaryCaptureLegacy.test.tsx`:
  change `from '../BoundaryCapture.js'` to `from '../BoundaryCaptureLegacy.js'`.
  Also update the top-of-file docblock first line wording to say "BoundaryCaptureLegacy" (cosmetic; keep `@vitest-environment happy-dom`).

- [ ] **Step 4: Run the legacy test; expect PASS** (behaviour unchanged, just relocated).
  `pnpm --filter @ogden/web exec vitest run src/v3/act/tier-shell/__tests__/BoundaryCaptureLegacy.test.tsx --pool=forks --testTimeout=20000`
  NOTE: `DecisionWorkingPanel.tsx` still imports `./BoundaryCapture.js`, which no longer exists until BR4 - so DO NOT run web `tsc` here (it will error on the missing module). tsc is deferred to BR8 after the new component lands.

- [ ] **Step 5: Commit** (explicit pathspec - include all three renamed paths, old and new):
  `refactor(act-tier0): preserve shipped BoundaryCapture as BoundaryCaptureLegacy (SP1 BR3)`

---

## Task BR4: New BoundaryCapture - types + pure helpers (no JSX yet)

**Files:**
- Create: `apps/web/src/v3/act/tier-shell/BoundaryCapture.tsx`
- Test: `apps/web/src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx`

Build the pure core first (TDD): the 5-value `BoundaryMode`, the model union, `boundaryModeFor`, `decodeBoundary`, `encodeBoundary` (private), `isBoundaryValid`, `summariseBoundary`, plus the fixed `TITLE_CATEGORIES` constant. The default component is added as a throwaway stub now and fleshed out in BR5-BR7.

- [ ] **Step 1: Write the failing helper test.** Create `__tests__/BoundaryCapture.test.tsx`:

```tsx
/**
 * @vitest-environment happy-dom
 *
 * BoundaryCapture (SP1 re-decompose) -- a CONTROLLED, SELF-ROUTING renderer over
 * a FLAT FormValue (Record<string, string | string[]>) for the re-decomposed
 * s1-boundaries objective (5 items / 5 modes). Register rows persist as parallel
 * arrays (FormValue cannot hold object arrays). Mirrors the StewardCapture /
 * StakeholderCapture test pattern (happy-dom + testing-library + lucide stub).
 */

import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

vi.mock('lucide-react', async (importOriginal) => {
  const actual = await importOriginal<Record<string, unknown>>();
  const stubbed: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(actual)) {
    const isComponent =
      (typeof value === 'object' &&
        value !== null &&
        '$$typeof' in (value as object)) ||
      typeof value === 'function';
    if (isComponent) {
      const Stub = React.forwardRef<SVGSVGElement, Record<string, unknown>>(
        function LucideStub(_props, ref) {
          return React.createElement('svg', {
            ref,
            'data-lucide-icon': key,
            'aria-hidden': 'true',
          });
        },
      );
      Stub.displayName = `LucideStub(${key})`;
      stubbed[key] = Stub;
    } else {
      stubbed[key] = value;
    }
  }
  return stubbed;
});

import BoundaryCapture, {
  boundaryModeFor,
  decodeBoundary,
  isBoundaryValid,
  summariseBoundary,
  TITLE_CATEGORIES,
  type BoundaryRegisterModel,
  type RowRegisterModel,
  type TenancyRegisterModel,
  type TitleCheckerModel,
  type LandHistoryModel,
} from '../BoundaryCapture.js';
import type { FormValue } from '../actToolCatalog.js';

// minimal option resolver for render tests (BR5-BR7)
const OPTS: Record<string, readonly string[]> = {
  boundaryDirection: ['N', 'E', 'S', 'W'],
  boundarySectionType: [
    'Shared / dividing fence',
    'Creek / natural boundary',
    'Council road frontage',
    'Unfenced / in dispute',
  ],
  boundaryRowType: [
    'Utility easement',
    'Access easement',
    'Public right of way',
    'Drainage easement',
  ],
  boundaryRowImpact: ['Restricts', 'Enables', 'Minor impact'],
  boundaryTenancyType: ['Agistment', 'Lease', 'Water license'],
  boundaryTenancyExpiry: ['Near', 'Far', 'Expired'],
  boundaryTenancyFlag: [
    'Must terminate before community occupation',
    'Monitor',
    'No termination required',
  ],
  boundaryTitleState: ['Present', 'Absent', 'Unknown'],
  boundaryHistoryType: ['Agricultural', 'Community', 'Development', 'Industrial'],
  boundaryContamination: [
    'Chemical storage / AST',
    'Asbestos structures',
    'Rubbish dump / landfill',
    'Mining or extraction',
    'None known',
  ],
  boundaryPriorCommunity: ['Yes - detail below', 'No prior community'],
};
function resolveOptions(id: string): readonly string[] {
  return OPTS[id] ?? [];
}
function renderCapture(itemId: string, value: FormValue) {
  const onChange = vi.fn();
  render(
    <BoundaryCapture
      itemId={itemId}
      value={value}
      onChange={onChange}
      resolveOptions={resolveOptions}
    />,
  );
  return { onChange };
}

describe('BoundaryCapture -- boundaryModeFor (BR4)', () => {
  const cases: ReadonlyArray<[string, ReturnType<typeof boundaryModeFor>]> = [
    ['s1-boundaries-c1', 'boundaryRegister'],
    ['s1-boundaries-c2', 'rowRegister'],
    ['s1-boundaries-c3', 'tenancyRegister'],
    ['s1-boundaries-c4', 'titleRestrictionChecker'],
    ['s1-boundaries-c5', 'landHistoryRegister'],
  ];
  it.each(cases)('maps %s -> %s', (id, mode) => {
    expect(boundaryModeFor(id)).toBe(mode);
  });
  it('defaults unknown id to boundaryRegister', () => {
    expect(boundaryModeFor('s1-boundaries-cX')).toBe('boundaryRegister');
  });
});

describe('BoundaryCapture -- c1 boundaryRegister decode/valid/summary (BR4)', () => {
  it('empty -> zero sections -> invalid', () => {
    const m = decodeBoundary('s1-boundaries-c1', {}) as BoundaryRegisterModel;
    expect(m.kind).toBe('boundaryRegister');
    expect(m.sections).toEqual([]);
    expect(isBoundaryValid('s1-boundaries-c1', m)).toBe(false);
  });
  it('zips parallel arrays to min length and validates on a typed section', () => {
    const m = decodeBoundary('s1-boundaries-c1', {
      directions: ['N', 'E'],
      secTypes: ['Shared / dividing fence', 'Creek / natural boundary'],
      names: ['North'],
      obligations: ['Shared upkeep'],
      disputes: ['', 'true'],
    }) as BoundaryRegisterModel;
    // min length across directions(2)/secTypes(2)/names(1)/obligations(1)/disputes(2) = 1
    expect(m.sections).toHaveLength(1);
    expect(m.sections[0]).toEqual({
      direction: 'N',
      type: 'Shared / dividing fence',
      name: 'North',
      obligation: 'Shared upkeep',
      disputeFlag: false,
    });
    expect(isBoundaryValid('s1-boundaries-c1', m)).toBe(true);
  });
  it('summary counts sections and flagged disputes', () => {
    const m = decodeBoundary('s1-boundaries-c1', {
      directions: ['N', 'W'],
      secTypes: ['Shared / dividing fence', 'Unfenced / in dispute'],
      names: ['North', 'West'],
      obligations: ['', ''],
      disputes: ['', 'true'],
    }) as BoundaryRegisterModel;
    const s = summariseBoundary('s1-boundaries-c1', m);
    expect(s).toMatch(/2 boundary section/);
    expect(s).toMatch(/1 flagged/);
  });
});

describe('BoundaryCapture -- c2 rowRegister (BR4)', () => {
  it('empty is valid (zero rights of way is a valid answer)', () => {
    const m = decodeBoundary('s1-boundaries-c2', {}) as RowRegisterModel;
    expect(m.kind).toBe('rowRegister');
    expect(isBoundaryValid('s1-boundaries-c2', m)).toBe(true);
  });
  it('summary counts rows', () => {
    const m = decodeBoundary('s1-boundaries-c2', {
      rowTypes: ['Utility easement', 'Access easement'],
      names: ['Power', 'Driveway'],
      impacts: ['Restricts', 'Enables'],
      holders: ['', ''],
      widths: ['', ''],
      details: ['', ''],
    }) as RowRegisterModel;
    expect(summariseBoundary('s1-boundaries-c2', m)).toMatch(/2 right/);
  });
});

describe('BoundaryCapture -- c3 tenancyRegister (BR4)', () => {
  it('empty is valid (zero agreements is valid)', () => {
    const m = decodeBoundary('s1-boundaries-c3', {}) as TenancyRegisterModel;
    expect(m.kind).toBe('tenancyRegister');
    expect(isBoundaryValid('s1-boundaries-c3', m)).toBe(true);
  });
  it('summary counts agreements and termination-required rows', () => {
    const m = decodeBoundary('s1-boundaries-c3', {
      tenTypes: ['Agistment', 'Lease'],
      names: ['Cattle', 'Shed'],
      expiries: ['Near', 'Far'],
      flags: ['Must terminate before community occupation', 'Monitor'],
      details: ['', ''],
    }) as TenancyRegisterModel;
    const s = summariseBoundary('s1-boundaries-c3', m);
    expect(s).toMatch(/2 agreement/);
    expect(s).toMatch(/1 require/);
  });
});

describe('BoundaryCapture -- c4 titleRestrictionChecker hard gate (BR4)', () => {
  it('exposes 6 fixed categories', () => {
    expect(TITLE_CATEGORIES).toHaveLength(6);
  });
  it('empty -> all six default to unknown -> INVALID (gate locked)', () => {
    const m = decodeBoundary('s1-boundaries-c4', {}) as TitleCheckerModel;
    expect(m.kind).toBe('titleRestrictionChecker');
    expect(m.categories).toEqual([
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
      'unknown',
    ]);
    expect(isBoundaryValid('s1-boundaries-c4', m)).toBe(false);
  });
  it('all six present/absent (none unknown) -> VALID (gate open)', () => {
    const m = decodeBoundary('s1-boundaries-c4', {
      categories: ['present', 'absent', 'absent', 'absent', 'absent', 'absent'],
    }) as TitleCheckerModel;
    expect(isBoundaryValid('s1-boundaries-c4', m)).toBe(true);
  });
  it('a single remaining unknown keeps it INVALID', () => {
    const m = decodeBoundary('s1-boundaries-c4', {
      categories: ['present', 'absent', 'unknown', 'absent', 'absent', 'absent'],
    }) as TitleCheckerModel;
    expect(isBoundaryValid('s1-boundaries-c4', m)).toBe(false);
  });
  it('summary reports present count', () => {
    const m = decodeBoundary('s1-boundaries-c4', {
      categories: ['present', 'present', 'absent', 'absent', 'absent', 'absent'],
    }) as TitleCheckerModel;
    expect(summariseBoundary('s1-boundaries-c4', m)).toMatch(/2 .*present/i);
  });
});

describe('BoundaryCapture -- c5 landHistoryRegister (BR4)', () => {
  it('empty is valid (always recordable)', () => {
    const m = decodeBoundary('s1-boundaries-c5', {}) as LandHistoryModel;
    expect(m.kind).toBe('landHistoryRegister');
    expect(isBoundaryValid('s1-boundaries-c5', m)).toBe(true);
  });
  it('decodes rows + contamination + prior-community + notes', () => {
    const m = decodeBoundary('s1-boundaries-c5', {
      eras: ['1960s-present'],
      histTypes: ['Agricultural'],
      names: ['Grazing'],
      bodies: ['Cattle run'],
      wasPriorIC: 'No prior community',
      contamination: ['Asbestos structures'],
      notes: 'Check creek corridor',
    }) as LandHistoryModel;
    expect(m.rows).toHaveLength(1);
    expect(m.contamination).toEqual(['Asbestos structures']);
    expect(m.wasPriorIC).toBe('No prior community');
    expect(m.notes).toBe('Check creek corridor');
  });
  it('summary counts records and contamination concerns', () => {
    const m = decodeBoundary('s1-boundaries-c5', {
      eras: ['1960s'],
      histTypes: ['Industrial'],
      names: ['Mill'],
      bodies: [''],
      contamination: ['Chemical storage / AST', 'Asbestos structures'],
    }) as LandHistoryModel;
    const s = summariseBoundary('s1-boundaries-c5', m);
    expect(s).toMatch(/1 historical record/);
    expect(s).toMatch(/2 contamination/);
  });
});
```

- [ ] **Step 2: Run; expect FAIL** (module/exports missing).
  `pnpm --filter @ogden/web exec vitest run src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx --pool=forks --testTimeout=20000`

- [ ] **Step 3: Implement the pure core.** Create `BoundaryCapture.tsx` with the types, helpers, and a STUB component (replaced in BR5-BR7):

```tsx
import * as React from 'react';
import css from './BoundaryCapture.module.css';
import type { FormValue } from './actToolCatalog.js';

// ---------------------------------------------------------------------------
// Modes (one bespoke body per re-decomposed s1-boundaries item).
// ---------------------------------------------------------------------------
export type BoundaryMode =
  | 'boundaryRegister' // c1
  | 'rowRegister' // c2
  | 'tenancyRegister' // c3
  | 'titleRestrictionChecker' // c4
  | 'landHistoryRegister'; // c5

export function boundaryModeFor(itemId: string): BoundaryMode {
  switch (itemId) {
    case 's1-boundaries-c1':
      return 'boundaryRegister';
    case 's1-boundaries-c2':
      return 'rowRegister';
    case 's1-boundaries-c3':
      return 'tenancyRegister';
    case 's1-boundaries-c4':
      return 'titleRestrictionChecker';
    case 's1-boundaries-c5':
      return 'landHistoryRegister';
    default:
      return 'boundaryRegister';
  }
}

// ---------------------------------------------------------------------------
// Models (decoded from the flat FormValue's parallel arrays).
// ---------------------------------------------------------------------------
export interface BoundarySection {
  direction: string;
  type: string;
  name: string;
  obligation: string;
  disputeFlag: boolean;
}
export interface BoundaryRegisterModel {
  kind: 'boundaryRegister';
  sections: BoundarySection[];
}
export interface RowOfWay {
  type: string;
  name: string;
  impact: string;
  holder: string;
  width: string;
  detail: string;
}
export interface RowRegisterModel {
  kind: 'rowRegister';
  rows: RowOfWay[];
}
export interface TenancyAgreement {
  type: string;
  name: string;
  expiry: string;
  flag: string;
  detail: string;
}
export interface TenancyRegisterModel {
  kind: 'tenancyRegister';
  rows: TenancyAgreement[];
}
export type TitleState = 'present' | 'absent' | 'unknown';
export interface TitleCheckerModel {
  kind: 'titleRestrictionChecker';
  categories: TitleState[]; // length 6, positional (TITLE_CATEGORIES order)
}
export interface HistoryRecord {
  era: string;
  type: string;
  name: string;
  body: string;
}
export interface LandHistoryModel {
  kind: 'landHistoryRegister';
  rows: HistoryRecord[];
  wasPriorIC: string;
  contamination: string[];
  notes: string;
}
export type BoundaryModel =
  | BoundaryRegisterModel
  | RowRegisterModel
  | TenancyRegisterModel
  | TitleCheckerModel
  | LandHistoryModel;

// ---------------------------------------------------------------------------
// Fixed title-restriction categories (REVIEW: labels/descriptions/consequences
// transcribed verbatim from olos_boundary_legal_survey.html, ASCII-normalised).
// ---------------------------------------------------------------------------
export interface TitleCategory {
  label: string;
  description: string;
  consequence: string; // shown when state === 'present'
  actNote: string; // "Act task will be created: ..." shown when present
}
export const TITLE_CATEGORIES: readonly TitleCategory[] = [
  {
    label: 'Zoning: Single residential only',
    description: 'Planning zone restricts this title to one dwelling unit',
    consequence:
      'The planning zone permits only one dwelling. Multi-dwelling or communal use requires rezoning or a planning permit before the community form is viable.',
    actNote:
      'Act task will be created: Investigate rezoning or permit pathway before finalising community form',
  },
  {
    label: 'Planning permit required for multiple dwellings',
    description: 'Rural zone - additional dwellings require planning approval',
    consequence:
      'Each additional dwelling beyond the existing one requires a planning permit from the relevant council. This is standard in rural zones - it does not prohibit the community, but it requires a permit application for every dwelling cluster. Applications typically take 3-9 months. Community design should be finalised in outline before permits are lodged.',
    actNote:
      'Act task will be created: Lodge planning permit applications for all dwellings before construction begins',
  },
  {
    label: 'Conservation covenant or land management agreement',
    description:
      'Voluntary or statutory conservation obligation on part of the title',
    consequence:
      'A conservation covenant may apply to part of the title. Restrictions can include no clearing of native vegetation, no structures within the covenant area, and no introduction of feral animals. A covenant runs with the land permanently and cannot be removed.',
    actNote:
      'Covenant boundary must be mapped and applied as a design exclusion zone before Tier 3 spatial framework',
  },
  {
    label: 'Title deed covenant restricting dwelling count',
    description:
      'Private covenant registered on title limiting number of structures or dwellings',
    consequence:
      'A private covenant registered on title may limit the number of structures or dwellings. Resolving or working within it requires legal advice before the community form is settled.',
    actNote:
      'Act task will be created: Obtain legal advice on the title-deed covenant restricting dwelling count',
  },
  {
    label: 'Heritage overlay or heritage listing',
    description:
      'State or local heritage protection restricting alterations to structures',
    consequence:
      'A heritage overlay or listing restricts alterations to protected structures and may constrain new works nearby. Heritage approval is required before affected works proceed.',
    actNote:
      'Act task will be created: Confirm heritage controls and approval pathway before affected works',
  },
  {
    label: 'Subdivision restriction',
    description: 'Title cannot be subdivided into multiple lots',
    consequence:
      'The title cannot be subdivided into multiple lots. Any tenure model relying on subdivision is not available and an alternative (e.g. company-title or community land trust) is required.',
    actNote:
      'Act task will be created: Confirm a non-subdivision tenure model with legal advice',
  },
];

// ---------------------------------------------------------------------------
// FormValue helpers.
// ---------------------------------------------------------------------------
function asArr(v: string | string[] | undefined): string[] {
  if (Array.isArray(v)) return v;
  return typeof v === 'string' && v !== '' ? [v] : [];
}
function asStr(v: string | string[] | undefined): string {
  return typeof v === 'string' ? v : '';
}
function zipLen(...arrs: string[][]): number {
  return arrs.length ? Math.min(...arrs.map((a) => a.length)) : 0;
}

// ---------------------------------------------------------------------------
// decode: FormValue -> BoundaryModel (totally defensive; never throws).
// ---------------------------------------------------------------------------
export function decodeBoundary(itemId: string, value: FormValue): BoundaryModel {
  const mode = boundaryModeFor(itemId);
  switch (mode) {
    case 'boundaryRegister': {
      const directions = asArr(value.directions);
      const secTypes = asArr(value.secTypes);
      const names = asArr(value.names);
      const obligations = asArr(value.obligations);
      const disputes = asArr(value.disputes);
      const n = zipLen(directions, secTypes, names, obligations, disputes);
      const sections: BoundarySection[] = [];
      for (let i = 0; i < n; i++) {
        sections.push({
          direction: directions[i] ?? '',
          type: secTypes[i] ?? '',
          name: names[i] ?? '',
          obligation: obligations[i] ?? '',
          disputeFlag: disputes[i] === 'true',
        });
      }
      return { kind: 'boundaryRegister', sections };
    }
    case 'rowRegister': {
      const rowTypes = asArr(value.rowTypes);
      const names = asArr(value.names);
      const impacts = asArr(value.impacts);
      const holders = asArr(value.holders);
      const widths = asArr(value.widths);
      const details = asArr(value.details);
      const n = zipLen(rowTypes, names, impacts, holders, widths, details);
      const rows: RowOfWay[] = [];
      for (let i = 0; i < n; i++) {
        rows.push({
          type: rowTypes[i] ?? '',
          name: names[i] ?? '',
          impact: impacts[i] ?? '',
          holder: holders[i] ?? '',
          width: widths[i] ?? '',
          detail: details[i] ?? '',
        });
      }
      return { kind: 'rowRegister', rows };
    }
    case 'tenancyRegister': {
      const tenTypes = asArr(value.tenTypes);
      const names = asArr(value.names);
      const expiries = asArr(value.expiries);
      const flags = asArr(value.flags);
      const details = asArr(value.details);
      const n = zipLen(tenTypes, names, expiries, flags, details);
      const rows: TenancyAgreement[] = [];
      for (let i = 0; i < n; i++) {
        rows.push({
          type: tenTypes[i] ?? '',
          name: names[i] ?? '',
          expiry: expiries[i] ?? '',
          flag: flags[i] ?? '',
          detail: details[i] ?? '',
        });
      }
      return { kind: 'tenancyRegister', rows };
    }
    case 'titleRestrictionChecker': {
      const raw = asArr(value.categories);
      const categories: TitleState[] = [];
      for (let i = 0; i < TITLE_CATEGORIES.length; i++) {
        const v = raw[i];
        categories.push(
          v === 'present' || v === 'absent' ? v : 'unknown',
        );
      }
      return { kind: 'titleRestrictionChecker', categories };
    }
    case 'landHistoryRegister': {
      const eras = asArr(value.eras);
      const histTypes = asArr(value.histTypes);
      const names = asArr(value.names);
      const bodies = asArr(value.bodies);
      const n = zipLen(eras, histTypes, names, bodies);
      const rows: HistoryRecord[] = [];
      for (let i = 0; i < n; i++) {
        rows.push({
          era: eras[i] ?? '',
          type: histTypes[i] ?? '',
          name: names[i] ?? '',
          body: bodies[i] ?? '',
        });
      }
      return {
        kind: 'landHistoryRegister',
        rows,
        wasPriorIC: asStr(value.wasPriorIC),
        contamination: asArr(value.contamination),
        notes: asStr(value.notes),
      };
    }
  }
}

// ---------------------------------------------------------------------------
// encode: BoundaryModel -> FormValue (exact inverse of decode).
// ---------------------------------------------------------------------------
function encodeBoundary(model: BoundaryModel): FormValue {
  switch (model.kind) {
    case 'boundaryRegister':
      return {
        directions: model.sections.map((s) => s.direction),
        secTypes: model.sections.map((s) => s.type),
        names: model.sections.map((s) => s.name),
        obligations: model.sections.map((s) => s.obligation),
        disputes: model.sections.map((s) => (s.disputeFlag ? 'true' : '')),
      };
    case 'rowRegister':
      return {
        rowTypes: model.rows.map((r) => r.type),
        names: model.rows.map((r) => r.name),
        impacts: model.rows.map((r) => r.impact),
        holders: model.rows.map((r) => r.holder),
        widths: model.rows.map((r) => r.width),
        details: model.rows.map((r) => r.detail),
      };
    case 'tenancyRegister':
      return {
        tenTypes: model.rows.map((r) => r.type),
        names: model.rows.map((r) => r.name),
        expiries: model.rows.map((r) => r.expiry),
        flags: model.rows.map((r) => r.flag),
        details: model.rows.map((r) => r.detail),
      };
    case 'titleRestrictionChecker':
      return { categories: [...model.categories] };
    case 'landHistoryRegister':
      return {
        eras: model.rows.map((r) => r.era),
        histTypes: model.rows.map((r) => r.type),
        names: model.rows.map((r) => r.name),
        bodies: model.rows.map((r) => r.body),
        wasPriorIC: model.wasPriorIC,
        contamination: [...model.contamination],
        notes: model.notes,
      };
  }
}

// ---------------------------------------------------------------------------
// validity gates.
// ---------------------------------------------------------------------------
export function isBoundaryValid(_itemId: string, model: BoundaryModel): boolean {
  switch (model.kind) {
    case 'boundaryRegister':
      return model.sections.some((s) => s.type !== '');
    case 'rowRegister':
      return true; // zero rights of way is a valid answer
    case 'tenancyRegister':
      return true; // zero agreements is a valid answer
    case 'titleRestrictionChecker':
      return (
        model.categories.length === TITLE_CATEGORIES.length &&
        model.categories.every((s) => s !== 'unknown')
      );
    case 'landHistoryRegister':
      return true; // always recordable
  }
}

// ---------------------------------------------------------------------------
// record-summary mirror.
// ---------------------------------------------------------------------------
function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}
export function summariseBoundary(_itemId: string, model: BoundaryModel): string {
  switch (model.kind) {
    case 'boundaryRegister': {
      const flagged = model.sections.filter((s) => s.disputeFlag).length;
      const base = plural(model.sections.length, 'boundary section', 'boundary sections');
      return flagged ? `${base}, ${flagged} flagged` : base;
    }
    case 'rowRegister':
      return plural(model.rows.length, 'right of way', 'rights of way');
    case 'tenancyRegister': {
      const term = model.rows.filter(
        (r) => r.flag === 'Must terminate before community occupation',
      ).length;
      const base = plural(model.rows.length, 'agreement', 'agreements');
      return term ? `${base}, ${term} require termination` : base;
    }
    case 'titleRestrictionChecker': {
      const present = model.categories.filter((s) => s === 'present').length;
      const unknown = model.categories.filter((s) => s === 'unknown').length;
      if (unknown) return `${unknown} condition(s) unknown - resolve with legal advice`;
      return present
        ? `${plural(present, 'restriction present', 'restrictions present')}`
        : 'All conditions assessed - none present';
    }
    case 'landHistoryRegister': {
      const recs = plural(model.rows.length, 'historical record', 'historical records');
      const conc = model.contamination.filter((c) => c !== 'None known').length;
      return conc
        ? `${recs}, ${plural(conc, 'contamination concern', 'contamination concerns')}`
        : recs;
    }
  }
}

// ---------------------------------------------------------------------------
// Component contract (body fleshed out in BR5-BR7).
// ---------------------------------------------------------------------------
export interface BoundaryCaptureProps {
  itemId: string;
  value: FormValue;
  onChange: (next: FormValue) => void;
  resolveOptions: (optionSetId: string) => readonly string[];
}

export default function BoundaryCapture(
  props: BoundaryCaptureProps,
): JSX.Element {
  // BR5-BR7 replace this stub with the per-mode bodies. The stub keeps the
  // module compiling and the helper tests green.
  const model = decodeBoundary(props.itemId, props.value);
  return <div className={css.root} data-boundary-mode={model.kind} />;
}

// emit helper used by the bodies in BR5-BR7
export function emitBoundary(
  onChange: (next: FormValue) => void,
  model: BoundaryModel,
): void {
  onChange(encodeBoundary(model));
}
```

- [ ] **Step 4: Create a minimal `BoundaryCapture.module.css`** so the import resolves (BR5-BR7 extend it):

```css
.root {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
```

- [ ] **Step 5: Run the helper tests; expect PASS** (render-body tests in this file are added in BR5-BR7; for now only the `*Model`/decode/valid/summary `describe` blocks must pass - run the whole file and confirm the BR4 describes are green; the render describes do not exist yet).
  `pnpm --filter @ogden/web exec vitest run src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx --pool=forks --testTimeout=20000`

- [ ] **Step 6: Commit** (explicit pathspec - new tsx, css, test):
  `feat(act-tier0): BoundaryCapture re-decompose core + helpers (SP1 BR4)`

---

## Task BR5: Bodies c1 (boundaryRegister) + c2 (rowRegister)

**Files:**
- Modify: `apps/web/src/v3/act/tier-shell/BoundaryCapture.tsx` (replace the stub component with a mode router + the c1/c2 bodies; c3/c4/c5 fall through to a temporary placeholder until BR6/BR7).
- Modify: `apps/web/src/v3/act/tier-shell/BoundaryCapture.module.css` (register/row styles).
- Test: append render tests to `__tests__/BoundaryCapture.test.tsx`.

- [ ] **Step 1: Write failing render tests.** Append:

```tsx
describe('BoundaryCapture -- render c1 (boundaryRegister) (BR5)', () => {
  it('add-section appends an empty section', () => {
    const { onChange } = renderCapture('s1-boundaries-c1', {});
    fireEvent.click(screen.getByTestId('section-add'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.secTypes as string[])).toEqual(['']);
  });
  it('selecting a section type emits it at row 0', () => {
    const { onChange } = renderCapture('s1-boundaries-c1', {
      directions: ['N'],
      secTypes: [''],
      names: [''],
      obligations: [''],
      disputes: [''],
    });
    fireEvent.change(screen.getByTestId('section-type-0'), {
      target: { value: 'Creek / natural boundary' },
    });
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.secTypes as string[])[0]).toBe('Creek / natural boundary');
  });
  it('toggling the dispute flag on row 0 emits "true"', () => {
    const { onChange } = renderCapture('s1-boundaries-c1', {
      directions: ['N'],
      secTypes: ['Shared / dividing fence'],
      names: [''],
      obligations: [''],
      disputes: [''],
    });
    fireEvent.click(screen.getByTestId('section-dispute-0'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.disputes as string[])[0]).toBe('true');
  });
  it('remove-section-0 deletes the row', () => {
    const { onChange } = renderCapture('s1-boundaries-c1', {
      directions: ['N'],
      secTypes: ['Shared / dividing fence'],
      names: [''],
      obligations: [''],
      disputes: [''],
    });
    fireEvent.click(screen.getByTestId('section-remove-0'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.secTypes as string[])).toEqual([]);
  });
  it('the map button is rendered disabled', () => {
    renderCapture('s1-boundaries-c1', {});
    expect((screen.getByTestId('open-map') as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('BoundaryCapture -- render c2 (rowRegister) (BR5)', () => {
  it('add-row appends an empty right of way', () => {
    const { onChange } = renderCapture('s1-boundaries-c2', {});
    fireEvent.click(screen.getByTestId('row-add'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.rowTypes as string[])).toEqual(['']);
  });
  it('selecting an impact emits it at row 0', () => {
    const { onChange } = renderCapture('s1-boundaries-c2', {
      rowTypes: ['Utility easement'],
      names: [''],
      impacts: [''],
      holders: [''],
      widths: [''],
      details: [''],
    });
    fireEvent.change(screen.getByTestId('row-impact-0'), {
      target: { value: 'Restricts' },
    });
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.impacts as string[])[0]).toBe('Restricts');
  });
});
```

- [ ] **Step 2: Run; expect FAIL** (testids absent - stub renders nothing).

- [ ] **Step 3: Implement.** Replace the stub `BoundaryCapture` default export with a router + c1/c2 bodies. Keep all helper exports above unchanged. Use this component code:

```tsx
export default function BoundaryCapture({
  itemId,
  value,
  onChange,
  resolveOptions,
}: BoundaryCaptureProps): JSX.Element {
  const model = decodeBoundary(itemId, value);
  const emit = (next: BoundaryModel) => emitBoundary(onChange, next);

  if (model.kind === 'boundaryRegister') {
    const directions = resolveOptions('boundaryDirection');
    const types = resolveOptions('boundarySectionType');
    const set = (i: number, patch: Partial<BoundarySection>) =>
      emit({
        ...model,
        sections: model.sections.map((s, j) => (j === i ? { ...s, ...patch } : s)),
      });
    return (
      <div className={css.root} data-boundary-mode="boundaryRegister">
        <MapStrip resolveOptions={resolveOptions} />
        <div className={css.regHead}>
          <span className={css.regTitle}>Boundary register</span>
          <span className={css.regCount}>
            {model.sections.length} sections
          </span>
        </div>
        {model.sections.map((s, i) => (
          <div
            key={i}
            className={css.row}
            data-dispute={s.disputeFlag ? 'true' : 'false'}
          >
            <select
              className={css.sel}
              data-testid={`section-dir-${i}`}
              aria-label={`Boundary ${i + 1} direction`}
              value={s.direction}
              onChange={(e) => set(i, { direction: e.target.value })}
            >
              <option value="">Direction</option>
              {directions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select
              className={css.sel}
              data-testid={`section-type-${i}`}
              aria-label={`Boundary ${i + 1} type`}
              value={s.type}
              onChange={(e) => set(i, { type: e.target.value })}
            >
              <option value="">Type</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              className={css.inp}
              data-testid={`section-name-${i}`}
              aria-label={`Boundary ${i + 1} name`}
              value={s.name}
              placeholder="Name / description"
              onChange={(e) => set(i, { name: e.target.value })}
            />
            <input
              className={css.inp}
              data-testid={`section-obligation-${i}`}
              aria-label={`Boundary ${i + 1} obligation`}
              value={s.obligation}
              placeholder="Obligation"
              onChange={(e) => set(i, { obligation: e.target.value })}
            />
            <button
              type="button"
              className={css.flagBtn}
              data-testid={`section-dispute-${i}`}
              aria-pressed={s.disputeFlag}
              onClick={() => set(i, { disputeFlag: !s.disputeFlag })}
            >
              <Flag size={13} aria-hidden="true" />
              {s.disputeFlag ? 'Dispute flagged' : 'Flag dispute'}
            </button>
            <button
              type="button"
              className={css.delBtn}
              data-testid={`section-remove-${i}`}
              aria-label={`Remove boundary ${i + 1}`}
              onClick={() =>
                emit({
                  ...model,
                  sections: model.sections.filter((_, j) => j !== i),
                })
              }
            >
              <Trash2 size={13} aria-hidden="true" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={css.addBtn}
          data-testid="section-add"
          onClick={() =>
            emit({
              ...model,
              sections: [
                ...model.sections,
                { direction: '', type: '', name: '', obligation: '', disputeFlag: false },
              ],
            })
          }
        >
          <Plus size={14} aria-hidden="true" /> Add boundary section
        </button>
      </div>
    );
  }

  if (model.kind === 'rowRegister') {
    const types = resolveOptions('boundaryRowType');
    const impacts = resolveOptions('boundaryRowImpact');
    const set = (i: number, patch: Partial<RowOfWay>) =>
      emit({
        ...model,
        rows: model.rows.map((r, j) => (j === i ? { ...r, ...patch } : r)),
      });
    return (
      <div className={css.root} data-boundary-mode="rowRegister">
        <MapStrip resolveOptions={resolveOptions} />
        <div className={css.regHead}>
          <span className={css.regTitle}>Rights of way register</span>
          <span className={css.regCount}>{model.rows.length} rights</span>
        </div>
        {model.rows.map((r, i) => (
          <div key={i} className={css.row}>
            <select
              className={css.sel}
              data-testid={`row-type-${i}`}
              aria-label={`Right of way ${i + 1} type`}
              value={r.type}
              onChange={(e) => set(i, { type: e.target.value })}
            >
              <option value="">Type</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              className={css.inp}
              data-testid={`row-name-${i}`}
              aria-label={`Right of way ${i + 1} name`}
              value={r.name}
              placeholder="Name / description"
              onChange={(e) => set(i, { name: e.target.value })}
            />
            <select
              className={css.sel}
              data-testid={`row-impact-${i}`}
              aria-label={`Right of way ${i + 1} impact`}
              value={r.impact}
              onChange={(e) => set(i, { impact: e.target.value })}
            >
              <option value="">Impact</option>
              {impacts.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <input
              className={css.inp}
              data-testid={`row-holder-${i}`}
              aria-label={`Right of way ${i + 1} holder`}
              value={r.holder}
              placeholder="Holder"
              onChange={(e) => set(i, { holder: e.target.value })}
            />
            <input
              className={css.inp}
              data-testid={`row-width-${i}`}
              aria-label={`Right of way ${i + 1} width`}
              value={r.width}
              placeholder="Width / route"
              onChange={(e) => set(i, { width: e.target.value })}
            />
            <button
              type="button"
              className={css.delBtn}
              data-testid={`row-remove-${i}`}
              aria-label={`Remove right of way ${i + 1}`}
              onClick={() =>
                emit({ ...model, rows: model.rows.filter((_, j) => j !== i) })
              }
            >
              <Trash2 size={13} aria-hidden="true" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={css.addBtn}
          data-testid="row-add"
          onClick={() =>
            emit({
              ...model,
              rows: [
                ...model.rows,
                { type: '', name: '', impact: '', holder: '', width: '', detail: '' },
              ],
            })
          }
        >
          <Plus size={14} aria-hidden="true" /> Add right of way
        </button>
      </div>
    );
  }

  // c3/c4/c5 bodies land in BR6/BR7. Temporary placeholder keeps the router total.
  return <div className={css.root} data-boundary-mode={model.kind} />;
}

// Decorative, disabled map affordance (deferred rich I/O; boundary precedent).
function MapStrip({
  resolveOptions: _resolveOptions,
}: {
  resolveOptions: (id: string) => readonly string[];
}): JSX.Element {
  return (
    <div className={css.mapPreview}>
      <svg className={css.mapSvg} viewBox="0 0 320 90" aria-hidden="true">
        <rect x="6" y="6" width="308" height="78" rx="8" />
      </svg>
      <button
        type="button"
        className={css.mapBtn}
        data-testid="open-map"
        disabled
      >
        <MapPin size={13} aria-hidden="true" /> Open map - coming soon
      </button>
    </div>
  );
}
```

- [ ] **Step 2b: Add the lucide import** at the top of `BoundaryCapture.tsx` (after the css import):
  ```tsx
  import { Plus, Trash2, Flag, MapPin } from 'lucide-react';
  ```

- [ ] **Step 3: Extend `BoundaryCapture.module.css`** with the register/row/map/button styles (token vocabulary from `BoundaryCaptureLegacy.module.css`):

```css
.regHead {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.regTitle {
  font-family: var(--font-serif, Georgia, serif);
  font-style: italic;
  font-size: 15px;
  color: var(--color-text, #1b1e22);
}
.regCount {
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  color: var(--color-text-subtle, #7a808a);
}
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  padding: 10px;
  border: 1px solid var(--color-border-subtle, #e6e9ee);
  border-radius: 8px;
  background: var(--color-surface-alt, #f6f7f9);
}
.row[data-dispute='true'] {
  border-color: color-mix(in srgb, var(--color-error, #c45a4a) 35%, transparent);
}
.sel,
.inp {
  flex: 1 1 120px;
  min-width: 0;
  font-size: 13px;
  padding: 6px 8px;
  border: 1px solid var(--color-border, #d4d8de);
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #1b1e22);
}
.flagBtn,
.delBtn,
.addBtn,
.mapBtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--color-border, #d4d8de);
  background: var(--color-surface, #fff);
  color: var(--color-text-muted, #565b63);
  cursor: pointer;
}
.flagBtn[aria-pressed='true'] {
  color: var(--color-error, #c45a4a);
  border-color: color-mix(in srgb, var(--color-error, #c45a4a) 40%, transparent);
}
.addBtn {
  align-self: flex-start;
  color: var(--color-stage-act, #d9a036);
}
.mapPreview {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.mapSvg {
  width: 100%;
  height: 90px;
}
.mapSvg rect {
  fill: var(--color-surface-alt, #f6f7f9);
  stroke: var(--color-border, #d4d8de);
}
.mapBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

- [ ] **Step 4: Run the BR4+BR5 tests; expect PASS.**
  `pnpm --filter @ogden/web exec vitest run src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx --pool=forks --testTimeout=20000`

- [ ] **Step 5: Commit:** `feat(act-tier0): BoundaryCapture c1/c2 register bodies (SP1 BR5)`

---

## Task BR6: Bodies c3 (tenancyRegister) + c4 (titleRestrictionChecker hard gate)

**Files:**
- Modify: `BoundaryCapture.tsx` (add c3 + c4 branches before the placeholder).
- Modify: `BoundaryCapture.module.css` (tri-state + consequence styles).
- Test: append to `__tests__/BoundaryCapture.test.tsx`.

- [ ] **Step 1: Write failing render tests.** Append:

```tsx
describe('BoundaryCapture -- render c3 (tenancyRegister) (BR6)', () => {
  it('add-tenancy appends an empty agreement', () => {
    const { onChange } = renderCapture('s1-boundaries-c3', {});
    fireEvent.click(screen.getByTestId('tenancy-add'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.tenTypes as string[])).toEqual(['']);
  });
  it('selecting a termination flag emits it', () => {
    const { onChange } = renderCapture('s1-boundaries-c3', {
      tenTypes: ['Agistment'],
      names: [''],
      expiries: [''],
      flags: [''],
      details: [''],
    });
    fireEvent.change(screen.getByTestId('tenancy-flag-0'), {
      target: { value: 'Must terminate before community occupation' },
    });
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.flags as string[])[0]).toBe(
      'Must terminate before community occupation',
    );
  });
});

describe('BoundaryCapture -- render c4 (titleRestrictionChecker) (BR6)', () => {
  it('renders all 6 category rows', () => {
    renderCapture('s1-boundaries-c4', {});
    for (let i = 0; i < 6; i++) {
      expect(screen.getByTestId(`title-cat-${i}`)).toBeTruthy();
    }
  });
  it('clicking Present on category 0 emits categories[0]="present"', () => {
    const { onChange } = renderCapture('s1-boundaries-c4', {});
    fireEvent.click(screen.getByTestId('title-cat-0-present'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.categories as string[])[0]).toBe('present');
  });
  it('shows the consequence + Act-task note when a category is Present', () => {
    renderCapture('s1-boundaries-c4', {
      categories: ['present', 'unknown', 'unknown', 'unknown', 'unknown', 'unknown'],
    });
    expect(screen.getByTestId('title-consequence-0')).toBeTruthy();
    expect(screen.getByText(/Act task will be created/i)).toBeTruthy();
  });
  it('shows the unknown-warning while any category is Unknown', () => {
    renderCapture('s1-boundaries-c4', {});
    expect(screen.getByTestId('title-unknown-warning')).toBeTruthy();
  });
  it('hides the unknown-warning when none remain', () => {
    renderCapture('s1-boundaries-c4', {
      categories: ['absent', 'absent', 'absent', 'absent', 'absent', 'absent'],
    });
    expect(screen.queryByTestId('title-unknown-warning')).toBeNull();
  });
});
```

- [ ] **Step 2: Run; expect FAIL.**

- [ ] **Step 3: Implement c3 + c4 branches** in `BoundaryCapture.tsx`, inserted BEFORE the `// c3/c4/c5 bodies land...` placeholder return. Replace the placeholder comment with c3, c4 (and keep the final placeholder for c5 only until BR7):

```tsx
  if (model.kind === 'tenancyRegister') {
    const types = resolveOptions('boundaryTenancyType');
    const expiries = resolveOptions('boundaryTenancyExpiry');
    const flags = resolveOptions('boundaryTenancyFlag');
    const set = (i: number, patch: Partial<TenancyAgreement>) =>
      emit({
        ...model,
        rows: model.rows.map((r, j) => (j === i ? { ...r, ...patch } : r)),
      });
    return (
      <div className={css.root} data-boundary-mode="tenancyRegister">
        <div className={css.regHead}>
          <span className={css.regTitle}>Current agreements on the land</span>
          <span className={css.regCount}>{model.rows.length} agreements</span>
        </div>
        {model.rows.map((r, i) => (
          <div key={i} className={css.row}>
            <select
              className={css.sel}
              data-testid={`tenancy-type-${i}`}
              aria-label={`Agreement ${i + 1} type`}
              value={r.type}
              onChange={(e) => set(i, { type: e.target.value })}
            >
              <option value="">Type</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              className={css.inp}
              data-testid={`tenancy-name-${i}`}
              aria-label={`Agreement ${i + 1} name`}
              value={r.name}
              placeholder="Name / party"
              onChange={(e) => set(i, { name: e.target.value })}
            />
            <select
              className={css.sel}
              data-testid={`tenancy-expiry-${i}`}
              aria-label={`Agreement ${i + 1} expiry`}
              value={r.expiry}
              onChange={(e) => set(i, { expiry: e.target.value })}
            >
              <option value="">Expiry</option>
              {expiries.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <select
              className={css.sel}
              data-testid={`tenancy-flag-${i}`}
              aria-label={`Agreement ${i + 1} status`}
              value={r.flag}
              onChange={(e) => set(i, { flag: e.target.value })}
            >
              <option value="">Status</option>
              {flags.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <button
              type="button"
              className={css.delBtn}
              data-testid={`tenancy-remove-${i}`}
              aria-label={`Remove agreement ${i + 1}`}
              onClick={() =>
                emit({ ...model, rows: model.rows.filter((_, j) => j !== i) })
              }
            >
              <Trash2 size={13} aria-hidden="true" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={css.addBtn}
          data-testid="tenancy-add"
          onClick={() =>
            emit({
              ...model,
              rows: [
                ...model.rows,
                { type: '', name: '', expiry: '', flag: '', detail: '' },
              ],
            })
          }
        >
          <Plus size={14} aria-hidden="true" /> Add tenancy or agreement
        </button>
      </div>
    );
  }

  if (model.kind === 'titleRestrictionChecker') {
    const states = resolveOptions('boundaryTitleState'); // Present/Absent/Unknown
    const stateKey = (label: string): TitleState =>
      label.toLowerCase() === 'present'
        ? 'present'
        : label.toLowerCase() === 'absent'
          ? 'absent'
          : 'unknown';
    const unknownCount = model.categories.filter((s) => s === 'unknown').length;
    const set = (i: number, next: TitleState) =>
      emit({
        ...model,
        categories: model.categories.map((s, j) => (j === i ? next : s)),
      });
    return (
      <div className={css.root} data-boundary-mode="titleRestrictionChecker">
        <div className={css.legalBanner}>
          Title documents should be reviewed with a solicitor familiar with
          community land models. Mark unknowns and address them before completing
          this objective.
        </div>
        {TITLE_CATEGORIES.map((cat, i) => {
          const state = model.categories[i] ?? 'unknown';
          return (
            <div
              key={i}
              className={css.titleCat}
              data-testid={`title-cat-${i}`}
              data-state={state}
            >
              <div className={css.titleCatHead}>
                <div className={css.titleCatLabel}>{cat.label}</div>
                <div className={css.triState}>
                  {states.map((label) => {
                    const k = stateKey(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        className={css.triBtn}
                        data-testid={`title-cat-${i}-${k}`}
                        data-on={state === k ? 'true' : 'false'}
                        aria-pressed={state === k}
                        onClick={() => set(i, k)}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={css.titleCatDesc}>{cat.description}</div>
              {state === 'present' ? (
                <div
                  className={css.consequence}
                  data-testid={`title-consequence-${i}`}
                >
                  <div className={css.consequenceText}>{cat.consequence}</div>
                  <div className={css.actNote}>{cat.actNote}</div>
                </div>
              ) : null}
            </div>
          );
        })}
        {unknownCount > 0 ? (
          <div className={css.unknownWarning} data-testid="title-unknown-warning">
            {unknownCount} condition(s) marked Unknown - resolve with legal advice
            before completing this objective
          </div>
        ) : null}
      </div>
    );
  }

  // c5 body lands in BR7.
  return <div className={css.root} data-boundary-mode={model.kind} />;
```

- [ ] **Step 4: Extend `BoundaryCapture.module.css`:**

```css
.legalBanner {
  font-size: 12px;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--color-stage-act, #d9a036);
  background: color-mix(in srgb, var(--color-stage-act, #d9a036) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-stage-act, #d9a036) 30%, transparent);
}
.titleCat {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px;
  border: 1px solid var(--color-border-subtle, #e6e9ee);
  border-radius: 8px;
  background: var(--color-surface, #fff);
}
.titleCatHead {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}
.titleCatLabel {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text, #1b1e22);
}
.titleCatDesc {
  font-size: 12px;
  color: var(--color-text-muted, #565b63);
}
.triState {
  display: inline-flex;
  gap: 4px;
}
.triBtn {
  font-size: 11px;
  padding: 4px 9px;
  border-radius: 6px;
  border: 1px solid var(--color-border, #d4d8de);
  background: var(--color-surface, #fff);
  color: var(--color-text-muted, #565b63);
  cursor: pointer;
}
.triBtn[data-on='true'] {
  font-weight: 600;
  color: var(--color-text, #1b1e22);
  border-color: var(--color-text-subtle, #7a808a);
}
.consequence {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--color-error, #c45a4a) 10%, transparent);
}
.consequenceText {
  font-size: 12px;
  line-height: 1.5;
  color: var(--color-text, #1b1e22);
}
.actNote {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-error, #c45a4a);
}
.unknownWarning {
  font-size: 12px;
  font-weight: 600;
  padding: 8px 10px;
  border-radius: 6px;
  color: var(--color-stage-act, #d9a036);
  background: color-mix(in srgb, var(--color-stage-act, #d9a036) 14%, transparent);
}
```

- [ ] **Step 5: Run BR4-BR6 tests; expect PASS.**
  `pnpm --filter @ogden/web exec vitest run src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx --pool=forks --testTimeout=20000`

- [ ] **Step 6: Commit:** `feat(act-tier0): BoundaryCapture c3 tenancy + c4 title hard-gate (SP1 BR6)`

---

## Task BR7: Body c5 (landHistoryRegister)

**Files:**
- Modify: `BoundaryCapture.tsx` (replace the final placeholder with the c5 body).
- Modify: `BoundaryCapture.module.css` (history/chip styles).
- Test: append to `__tests__/BoundaryCapture.test.tsx`.

- [ ] **Step 1: Write failing render tests.** Append:

```tsx
describe('BoundaryCapture -- render c5 (landHistoryRegister) (BR7)', () => {
  it('add-record appends an empty historical record', () => {
    const { onChange } = renderCapture('s1-boundaries-c5', {});
    fireEvent.click(screen.getByTestId('history-add'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.histTypes as string[])).toEqual(['']);
  });
  it('toggling a contamination chip emits it', () => {
    const { onChange } = renderCapture('s1-boundaries-c5', {});
    fireEvent.click(screen.getByTestId('contam-Asbestos structures'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect((arg.contamination as string[])).toEqual(['Asbestos structures']);
  });
  it('selecting prior-community emits wasPriorIC', () => {
    const { onChange } = renderCapture('s1-boundaries-c5', {});
    fireEvent.click(screen.getByTestId('prior-community-Yes - detail below'));
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect(arg.wasPriorIC).toBe('Yes - detail below');
  });
  it('typing notes emits the notes scalar', () => {
    const { onChange } = renderCapture('s1-boundaries-c5', {});
    fireEvent.change(screen.getByTestId('history-notes'), {
      target: { value: 'Check creek corridor' },
    });
    const arg = onChange.mock.calls[0]![0] as FormValue;
    expect(arg.notes).toBe('Check creek corridor');
  });
});
```

- [ ] **Step 2: Run; expect FAIL.**

- [ ] **Step 3: Implement the c5 branch**, replacing the final `// c5 body lands in BR7.` placeholder return:

```tsx
  if (model.kind === 'landHistoryRegister') {
    const histTypes = resolveOptions('boundaryHistoryType');
    const contamOpts = resolveOptions('boundaryContamination');
    const priorOpts = resolveOptions('boundaryPriorCommunity');
    const setRow = (i: number, patch: Partial<HistoryRecord>) =>
      emit({
        ...model,
        rows: model.rows.map((r, j) => (j === i ? { ...r, ...patch } : r)),
      });
    const toggleContam = (c: string) =>
      emit({
        ...model,
        contamination: model.contamination.includes(c)
          ? model.contamination.filter((x) => x !== c)
          : [...model.contamination, c],
      });
    return (
      <div className={css.root} data-boundary-mode="landHistoryRegister">
        <div className={css.regHead}>
          <span className={css.regTitle}>Prior use history - known records</span>
          <span className={css.regCount}>{model.rows.length} records</span>
        </div>
        {model.rows.map((r, i) => (
          <div key={i} className={css.row}>
            <input
              className={css.inp}
              data-testid={`history-era-${i}`}
              aria-label={`Record ${i + 1} era`}
              value={r.era}
              placeholder="Era (e.g. 1960s-present)"
              onChange={(e) => setRow(i, { era: e.target.value })}
            />
            <select
              className={css.sel}
              data-testid={`history-type-${i}`}
              aria-label={`Record ${i + 1} type`}
              value={r.type}
              onChange={(e) => setRow(i, { type: e.target.value })}
            >
              <option value="">Type</option>
              {histTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              className={css.inp}
              data-testid={`history-name-${i}`}
              aria-label={`Record ${i + 1} name`}
              value={r.name}
              placeholder="Name / description"
              onChange={(e) => setRow(i, { name: e.target.value })}
            />
            <input
              className={css.inp}
              data-testid={`history-body-${i}`}
              aria-label={`Record ${i + 1} detail`}
              value={r.body}
              placeholder="Detail"
              onChange={(e) => setRow(i, { body: e.target.value })}
            />
            <button
              type="button"
              className={css.delBtn}
              data-testid={`history-remove-${i}`}
              aria-label={`Remove record ${i + 1}`}
              onClick={() =>
                emit({ ...model, rows: model.rows.filter((_, j) => j !== i) })
              }
            >
              <Trash2 size={13} aria-hidden="true" />
            </button>
          </div>
        ))}
        <button
          type="button"
          className={css.addBtn}
          data-testid="history-add"
          onClick={() =>
            emit({
              ...model,
              rows: [...model.rows, { era: '', type: '', name: '', body: '' }],
            })
          }
        >
          <Plus size={14} aria-hidden="true" /> Add historical record
        </button>

        <div className={css.field}>
          <span className={css.qLabel}>
            Was this land previously used as an intentional community?
          </span>
          <div className={css.chipRow}>
            {priorOpts.map((o) => (
              <button
                key={o}
                type="button"
                className={css.chip}
                data-testid={`prior-community-${o}`}
                data-on={model.wasPriorIC === o ? 'true' : 'false'}
                aria-pressed={model.wasPriorIC === o}
                onClick={() =>
                  emit({
                    ...model,
                    wasPriorIC: model.wasPriorIC === o ? '' : o,
                  })
                }
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        <div className={css.field}>
          <span className={css.qLabel}>Contamination concerns</span>
          <div className={css.chipRow}>
            {contamOpts.map((c) => (
              <button
                key={c}
                type="button"
                className={css.chip}
                data-testid={`contam-${c}`}
                data-on={model.contamination.includes(c) ? 'true' : 'false'}
                aria-pressed={model.contamination.includes(c)}
                onClick={() => toggleContam(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <textarea
          className={css.notesTa}
          data-testid="history-notes"
          aria-label="Land history notes"
          value={model.notes}
          placeholder="Detail any contamination concerns..."
          onChange={(e) => emit({ ...model, notes: e.target.value })}
        />

        <div className={css.culturalBanner}>
          Site may be on the unceded Country of a Traditional Owner group.
          Cultural heritage assessment is recommended before any earthworks.
          Check the relevant cultural-heritage register for this cadastral parcel
          and consult the local Traditional Owner corporation about adjacent
          waterway corridors.
        </div>
      </div>
    );
  }

  // unreachable: every BoundaryMode has a branch above.
  return <div className={css.root} data-boundary-mode={model.kind} />;
```

  NOTE (REVIEW R1): the cultural banner is a GENERALISED version of the mockup's site-specific Dja Dja Wurrung text. The mockup text is project-specific (Kinfolk Ridge); a generic catalogue surface must not hard-code one nation. Operator to confirm whether to (a) keep this generic banner, or (b) drive the Traditional Owner name from project data. Flagged, not blocking.

- [ ] **Step 4: Extend `BoundaryCapture.module.css`:**

```css
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.qLabel {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text, #1b1e22);
}
.chipRow {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  font-size: 12px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid var(--color-border, #d4d8de);
  background: var(--color-surface, #fff);
  color: var(--color-text-muted, #565b63);
  cursor: pointer;
}
.chip[data-on='true'] {
  font-weight: 600;
  color: var(--color-text, #1b1e22);
  border-color: var(--color-stage-act, #d9a036);
  background: color-mix(in srgb, var(--color-stage-act, #d9a036) 12%, transparent);
}
.notesTa {
  min-height: 70px;
  resize: vertical;
  font-size: 13px;
  padding: 8px;
  border: 1px solid var(--color-border, #d4d8de);
  border-radius: 6px;
  background: var(--color-surface, #fff);
  color: var(--color-text, #1b1e22);
}
.culturalBanner {
  font-size: 12px;
  line-height: 1.5;
  padding: 10px 12px;
  border-radius: 8px;
  color: var(--color-info, #2f80ed);
  background: color-mix(in srgb, var(--color-info, #2f80ed) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-info, #2f80ed) 28%, transparent);
}
```

- [ ] **Step 5: Run the FULL BoundaryCapture test file; expect PASS** (BR4-BR7 all green).
  `pnpm --filter @ogden/web exec vitest run src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx --pool=forks --testTimeout=20000`

- [ ] **Step 6: Commit:** `feat(act-tier0): BoundaryCapture c5 land-history body (SP1 BR7)`

---

## Task BR8: Wire panel gate-note + DecisionList MODE_LABELS + full typecheck

**Files:**
- Modify: `apps/web/src/v3/act/tier-shell/DecisionWorkingPanel.tsx` (gate-note boundary arm, ~lines 317-327).
- Modify: `apps/web/src/v3/act/tier-shell/DecisionList.tsx` (`MODE_LABELS`, ~lines 53-64).
- Test: `apps/web/src/v3/act/tier-shell/__tests__/DecisionWorkingPanel.test.tsx` (existing - add boundary gate-note cases) and `__tests__/DecisionList.test.tsx` (existing - add badge label cases). Use Grep to confirm exact existing test paths first.

- [ ] **Step 1: Write failing tests.**
  In the DecisionWorkingPanel test, render a panel with a boundary c4 target (unknown categories) and assert the gate-note text "Resolve every Unknown title condition with legal advice before recording." appears and the Record button is disabled; render c1 with zero sections and assert "Add at least one boundary section" + disabled; render c2 (rowRegister) and assert Record is ENABLED (always valid). Mirror the existing boundary-arm test setup in that file (Grep `isBoundary` in the test to copy the target-builder shape).
  In the DecisionList test, render with `modeFor={() => 'titleRestrictionChecker'}` and assert the badge text is "Title conditions"; with `'boundaryRegister'` assert "Boundary register".

- [ ] **Step 2: Run; expect FAIL.**

- [ ] **Step 3: Implement the gate-note arm** in `DecisionWorkingPanel.tsx` - replace the existing boundary `else if (decision.isBoundary) { ... }` gate-note block (the one that switches on `'doc'|'map'|'mapEntry'`) with:

```ts
} else if (decision.isBoundary) {
  const mode = boundaryModeFor(decision.itemId);
  const note =
    mode === 'boundaryRegister'
      ? 'Add at least one boundary section (with a type) to record.'
      : mode === 'titleRestrictionChecker'
        ? 'Resolve every Unknown title condition with legal advice before recording.'
        : 'Complete the required fields to record.';
  gateNote = <div className={css.gateNote}>{note}</div>;
```

  (The validity arm `isBoundaryValid(decision.itemId, boundaryModel!)`, the summary arm `summariseBoundary(...)`, the body arm `<BoundaryCapture .../>`, and the import from `./BoundaryCapture.js` are all UNCHANGED - the new module keeps those export names/signatures.)

- [ ] **Step 4: Implement `MODE_LABELS`** in `DecisionList.tsx` - add the 5 new keys (keep the existing doc/map/mapEntry/decision + stakeholder labels for the legacy/other surfaces):

```ts
const MODE_LABELS: Record<string, string> = {
  doc: 'Document',
  map: 'Map',
  mapEntry: 'Map + entry',
  decision: 'Decision',
  // Stakeholder modes.
  mapContact: 'Map + contact',
  contact: 'Contact entry',
  cultural: 'Cultural',
  annotate: 'Annotate register',
  // Boundary re-decompose modes (SP1). REVIEW: badge copy.
  boundaryRegister: 'Boundary register',
  rowRegister: 'Rights of way',
  tenancyRegister: 'Tenancy register',
  titleRestrictionChecker: 'Title conditions',
  landHistoryRegister: 'Land history',
};
```

- [ ] **Step 5: Run both edited tests + the full BoundaryCapture file; expect PASS.**
  `pnpm --filter @ogden/web exec vitest run src/v3/act/tier-shell/__tests__/DecisionWorkingPanel.test.tsx src/v3/act/tier-shell/__tests__/DecisionList.test.tsx src/v3/act/tier-shell/__tests__/BoundaryCapture.test.tsx src/v3/act/tier-shell/__tests__/BoundaryCaptureLegacy.test.tsx --pool=forks --testTimeout=20000`

- [ ] **Step 6: Full web typecheck; expect EXIT 0** (this is the first tsc run since the legacy rename - it proves the new module satisfies every importer).
  `$env:NODE_OPTIONS='--max-old-space-size=8192'; pnpm --filter @ogden/web exec tsc --noEmit`
  Expected: no new errors outside pre-existing foreign `src/compost/*` WIP. If a foreign-WIP file (or a workbench test) references a retired boundary id/mode surfaced in BR0 Step 2/3, fix it now within this task and re-run.

- [ ] **Step 7: Commit** (explicit pathspec - panel + list + any reconciled references):
  `feat(act-tier0): wire boundary re-decompose gate-notes + mode labels (SP1 BR8)`

---

## Task BR9: Docs + final review + live smoke

**Files:**
- Create: `wiki/log/2026-06-07-atlas-boundaries-redecompose.md`, `wiki/decisions/2026-06-07-atlas-boundaries-redecompose.md`.
- Modify: `wiki/index.md` (add the ADR to the Decisions catalog). Do NOT touch `wiki/log.md` if foreign-staged (verify with `git -C <atlas> status --short -- wiki/log.md`).

- [ ] **Step 1: Write the ADR** - Status Accepted. Record: re-decompose 7->5 (operator override of the triage's defer-boundaries recommendation); the breaking id change (c6/c7 retired); the parallel-array FormValue encoding (FormValue cannot hold object arrays); the c4 Unknown HARD GATE (default unknown -> locked); legacy preservation (`BoundaryCaptureLegacy`); the generic cultural banner decision (R1); Amanah clean (no riba/gharar; no CSA framing in this surface). Cross-link the spec.

- [ ] **Step 2: Write the log entry** - commits BR1-BR9, verification results, hygiene/foreign-WIP caveat.

- [ ] **Step 3: Edit `wiki/index.md`** - Grep for the `## Decisions` heading, offset/limit Read around it, then a unique-string Edit to add the new ADR line (the file is large; do not full-read).

- [ ] **Step 4: Final whole-implementation review** (dispatch a fresh code-reviewer subagent over the BR1-BR8 commits): confirm decode/encode are exact inverses; the c4 hard gate cannot be bypassed; FormValue stays flat (no object arrays leaked); ASCII-clean; tokens match the legacy vocabulary; no foreign WIP staged.

- [ ] **Step 5: Live preview smoke** (no screenshot = no "working" claim; [[project-screenshot-hang]] - if dead API + open modal, bring API up via `preview_start name=api` until `/health` 200, then reload; use `/v3/components` for map-free proof if the map hangs). Drive an Ecovillage-typed project (or `mtc`) to the Act tier-shell on `s1-boundaries`:
  - the non-map 3-pane workbench renders (no MapboxGL), with the existing map-activation strip and 5 decision rows showing the new mode badges;
  - c1: Add boundary section, pick a type -> Record enables -> records + ticks; reopen -> rehydrates; flag a dispute -> summary shows "1 flagged";
  - c4: all six categories start Unknown and the Record button is LOCKED + the unknown-warning shows; mark all six Present/Absent -> the warning clears and Record enables; mark one Present -> the consequence + "Act task will be created" note appears;
  - c2/c3/c5 record even when empty (always-valid);
  - `s1-vision`, `s1-stakeholders`, and a spatial objective render unchanged.
  Screenshot the workbench (c4 in its locked state is the key proof).

- [ ] **Step 6: Commit** (explicit pathspec; `git add --` the two new wiki files first):
  `docs(wiki): boundaries re-decompose ADR + log (SP1 BR9)`

---

## Self-Review (against the spec, fresh eyes)

**1. Spec coverage (spec sections 5, 10-14):**
- 5.1 catalogue rewrite -> BR2. 5.2 five mode bodies -> BR4 (core) + BR5/BR6/BR7 (bodies). c4 Unknown HARD GATE -> BR4 (validity) + BR6 (UI lock via panel gate-note in BR8) + tested. 5.3 legacy rename -> BR3. 5.4 option sets -> BR1. Panel gate-note + MODE_LABELS -> BR8. Predicate widen -> NONE NEEDED (already present; noted). Verification (12) -> per-task bounded vitest + BR8 tsc + BR9 smoke. Branch hygiene (13) -> Commands block + every BRx Step. REVIEW flags (14): R1 cultural/title strings -> BR4 TITLE_CATEGORIES + BR7 cultural banner note; R2 option contents -> BR1 REVIEW banner; R3 gate/summary copy -> helper code (flagged); R6 mode-badge labels -> BR8 REVIEW comment. Covered.
- Gap noted: the mockup's rich per-decision "feeds" prose is decorative and not wired to the objective data model (feedsInto stays empty, matching the shipped pattern); group-level observeFeeds carry an ASCII approximation. Deliberate, documented in BR2.

**2. Placeholder scan:** No "TBD"/"add error handling"/"similar to". Every code step ships complete, paste-ready code. The BR4 component is an explicit, labelled stub that BR5-BR7 replace - each replacement shows the full code. The c3/c4/c5 "placeholder return" lines are real, compiling code removed in the named later task.

**3. Type consistency:** `boundaryModeFor` returns the 5-value `BoundaryMode` used identically in BR4/BR5/BR6/BR7/BR8. `decodeBoundary(itemId, value)` / `isBoundaryValid(itemId, model)` / `summariseBoundary(itemId, model)` signatures match the panel's existing call sites (verified against the BR-research quote of `DecisionWorkingPanel.tsx` lines 290-306, 368-387). Parallel-array keys are consistent between `decodeBoundary`, `encodeBoundary`, and every body's emit calls. `TitleState` union ('present'|'absent'|'unknown') consistent across model, decode, validity, and the c4 body.

No issues found requiring a new task.

---

## Out of scope (this plan - other SP1 groups / later)
- EvLegalGovernanceCapture, EvProvisionBalanceCapture (+ ratification), EvConflictFrameworkCapture - their own writing-plans passes (spec sections 6-9).
- Real spatial I/O (map pin/draw) + real file upload - deferred rich-I/O track (captures keep disabled "coming soon" affordances).
- Driving the Traditional Owner name from project data (R1) - operator decision.
