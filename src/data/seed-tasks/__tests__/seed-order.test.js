// Conformance test for curated seed-chain order (`seq`).
//
// Sequential locking walks a board's tasks in curated order: `seq` on the seed
// task becomes `seedOrder` on the persisted task (project-store.seedChainOrder),
// which orientation-selector.orderBoardTasks sorts by. A board with partial,
// duplicated, or out-of-range `seq` values would silently mis-order the chain —
// the operator would be locked out of a step for no legible reason. So the
// invariant is strict: a board either has NO `seq` at all (not yet curated,
// falls back to array order) or a COMPLETE permutation of 0..n-1.
//
// Rubric + rationale: wiki/decisions/2026-07-27-milos-seed-order-curation.md

import { describe, it, expect } from 'vitest';
import { FAITH_SEED_TASKS } from '../faith-seed-tasks';
import { HEALTH_SEED_TASKS } from '../health-seed-tasks';
import { INTELLECT_SEED_TASKS } from '../intellect-seed-tasks';
import { FAMILY_SEED_TASKS } from '../family-seed-tasks';
import { WEALTH_SEED_TASKS } from '../wealth-seed-tasks';
import { ENVIRONMENT_SEED_TASKS } from '../environment-seed-tasks';
import { UMMAH_SEED_TASKS } from '../ummah-seed-tasks';

const PILLARS = [
  { id: 'faith',       data: FAITH_SEED_TASKS },
  { id: 'health',      data: HEALTH_SEED_TASKS },
  { id: 'intellect',   data: INTELLECT_SEED_TASKS },
  { id: 'family',      data: FAMILY_SEED_TASKS },
  { id: 'wealth',      data: WEALTH_SEED_TASKS },
  { id: 'environment', data: ENVIRONMENT_SEED_TASKS },
  { id: 'ummah',       data: UMMAH_SEED_TASKS },
];

function boardsOf(data) {
  return Object.entries(data).filter(([, tasks]) => Array.isArray(tasks) && tasks.length > 0);
}

function seqReport(boardKey, tasks) {
  const withSeq = tasks.filter((t) => t.seq !== undefined);
  return {
    boardKey,
    total: tasks.length,
    curated: withSeq.length > 0,
    values: withSeq.map((t) => t.seq),
    missing: tasks.filter((t) => t.seq === undefined).map((t) => t.title),
  };
}

describe('curated seed order (`seq`)', () => {
  for (const { id, data } of PILLARS) {
    describe(id, () => {
      it('every curated board carries a complete 0..n-1 permutation', () => {
        const broken = [];
        for (const [boardKey, tasks] of boardsOf(data)) {
          const r = seqReport(boardKey, tasks);
          if (!r.curated) continue; // uncurated board — array order still governs

          if (r.missing.length > 0) {
            broken.push(`${boardKey}: partial coverage — ${r.missing.length} task(s) without seq (first: "${r.missing[0]}")`);
            continue;
          }
          const bad = r.values.filter((v) => !Number.isInteger(v) || v < 0 || v >= r.total);
          if (bad.length > 0) {
            broken.push(`${boardKey}: out-of-range/non-integer seq ${JSON.stringify(bad)} (board has ${r.total} tasks)`);
            continue;
          }
          const unique = new Set(r.values);
          if (unique.size !== r.values.length) {
            broken.push(`${boardKey}: duplicate seq values ${JSON.stringify(r.values.slice().sort((a, b) => a - b))}`);
          }
        }
        expect(broken).toEqual([]);
      });

      it('every core-tier board is curated (curation ratchet — core is the tier orientation surfaces first)', () => {
        const uncurated = boardsOf(data)
          .filter(([boardKey]) => boardKey.endsWith('_core'))
          .filter(([boardKey, tasks]) => !seqReport(boardKey, tasks).curated)
          .map(([boardKey]) => boardKey);
        expect(uncurated).toEqual([]);
      });
    });
  }
});
