// Schema-conformance test for two-axis grounding (provenanceTier × relevance).
// Ratchets: each pillar has an `expectedLegacy` count of pre-migration entries
// allowed to remain as legacy strings. As pillars migrate to structured arrays,
// shrink the count toward 0. The test fails if a pillar regresses (legacy goes
// up) or if a structured-array entry violates the canonical schema.
//
// Schema reference: wiki/decisions/2026-04-18-milos-grounding-two-axis.md

import { describe, it, expect } from 'vitest';
import { FAITH_SEED_TASKS } from '../faith-seed-tasks';
import { LIFE_SEED_TASKS } from '../life-seed-tasks';
import { INTELLECT_SEED_TASKS } from '../intellect-seed-tasks';
import { FAMILY_SEED_TASKS } from '../family-seed-tasks';
import { WEALTH_SEED_TASKS } from '../wealth-seed-tasks';
import { ENVIRONMENT_SEED_TASKS } from '../environment-seed-tasks';
import { UMMAH_SEED_TASKS } from '../ummah-seed-tasks';
import { PRAYER_SEED_TASKS } from '../prayer-seed-tasks';

const VALID_TIERS = new Set(['Bayyinah', 'Qarina', 'Niyyah']);
const VALID_RELEVANCE = new Set(['direct', 'contextual', 'thematic']);

// Per-pillar ratchet. Set to current legacy count. Decrement as entries migrate.
// Source of truth: `node scripts/lint-grounding.mjs` (shape = legacy string).
const PILLARS = [
  { id: 'faith',       data: FAITH_SEED_TASKS,       expectedLegacy: 0,   allowEmptyArray: 0 },
  { id: 'life',        data: LIFE_SEED_TASKS,        expectedLegacy: 0,   allowEmptyArray: 0 },
  { id: 'intellect',   data: INTELLECT_SEED_TASKS,   expectedLegacy: 0,   allowEmptyArray: 0 },
  { id: 'family',      data: FAMILY_SEED_TASKS,      expectedLegacy: 0,   allowEmptyArray: 0 },
  { id: 'wealth',      data: WEALTH_SEED_TASKS,      expectedLegacy: 0,   allowEmptyArray: 0 },
  { id: 'environment', data: ENVIRONMENT_SEED_TASKS, expectedLegacy: 0,   allowEmptyArray: 0 },
  { id: 'ummah',       data: UMMAH_SEED_TASKS,       expectedLegacy: 0,   allowEmptyArray: 0 },
  // Prayer is fully structured. The optional 4-rakʿat before-Isha sunnah was
  // backfilled with Sahih al-Bukhari 627 / Muslim 838 ("between every two
  // adhans is a prayer") via NotebookLM Muslim Scholar — empty-array ratchet 0.
  { id: 'prayer',      data: PRAYER_SEED_TASKS,      expectedLegacy: 0,   allowEmptyArray: 0 },
];

function walkSubtasks(pillarId, data) {
  const out = [];
  for (const [boardKey, tasks] of Object.entries(data)) {
    if (!Array.isArray(tasks)) continue;
    for (let ti = 0; ti < tasks.length; ti++) {
      const subs = Array.isArray(tasks[ti]?.subtasks) ? tasks[ti].subtasks : [];
      for (let si = 0; si < subs.length; si++) {
        out.push({ idPath: `${pillarId}.${boardKey}[${ti}].subtasks[${si}]`, task: tasks[ti], sub: subs[si] });
      }
    }
  }
  return out;
}

function classify(sub) {
  if (sub.sources === undefined || sub.sources === null) return 'missing';
  if (typeof sub.sources === 'string') return 'string';
  if (Array.isArray(sub.sources)) return sub.sources.length === 0 ? 'empty-array' : 'array';
  return 'invalid';
}

function validateStructuredEntry(entry, idPath, i) {
  const errors = [];
  if (!entry || typeof entry !== 'object') {
    errors.push(`${idPath} entry[${i}] is not an object`);
    return errors;
  }
  const kind = entry.kind;
  if (kind !== 'quran' && kind !== 'hadith') {
    errors.push(`${idPath} entry[${i}].kind must be 'quran' | 'hadith', got ${JSON.stringify(kind)}`);
  }
  for (const req of ['ref', 'translation', 'relevance', 'provenanceTier', 'rationale']) {
    if (typeof entry[req] !== 'string' || entry[req].length === 0) {
      errors.push(`${idPath} entry[${i}].${req} missing or non-string`);
    }
  }
  if (entry.relevance && !VALID_RELEVANCE.has(entry.relevance)) {
    errors.push(`${idPath} entry[${i}].relevance ${JSON.stringify(entry.relevance)} not in {direct,contextual,thematic}`);
  }
  if (entry.provenanceTier && !VALID_TIERS.has(entry.provenanceTier)) {
    errors.push(`${idPath} entry[${i}].provenanceTier ${JSON.stringify(entry.provenanceTier)} not in {Bayyinah,Qarina,Niyyah}`);
  }
  if (kind === 'quran' && (typeof entry.arabic !== 'string' || entry.arabic.length === 0)) {
    errors.push(`${idPath} entry[${i}] quran missing arabic`);
  }
  if (kind === 'hadith' && (typeof entry.hadithGrade !== 'string' || entry.hadithGrade.length === 0)) {
    errors.push(`${idPath} entry[${i}] hadith missing hadithGrade`);
  }
  return errors;
}

describe.each(PILLARS)('grounding schema — $id', ({ id, data, expectedLegacy, allowEmptyArray }) => {
  const buckets = { missing: 0, string: 0, array: 0, 'empty-array': 0, invalid: 0 };
  const allErrors = [];

  for (const { idPath, sub } of walkSubtasks(id, data)) {
    const shape = classify(sub);
    buckets[shape]++;
    if (shape === 'array') {
      sub.sources.forEach((entry, i) => {
        validateStructuredEntry(entry, idPath, i).forEach((e) => allErrors.push(e));
      });
    }
  }

  it(`has no missing-sources subtasks (post-migration must be string or array)`, () => {
    expect(buckets.missing, `${id}: ${buckets.missing} subtasks have no \`sources\` field at all`).toBe(0);
  });

  it(`has no invalid-shape sources (must be string or array)`, () => {
    expect(buckets.invalid, `${id}: ${buckets.invalid} subtasks have non-string non-array sources`).toBe(0);
  });

  it(`legacy-string ratchet: ${expectedLegacy} (decrement as entries migrate)`, () => {
    // Allow ≤ expectedLegacy — migrating entries down is fine, regressing up is not.
    expect(buckets.string, `${id}: legacy count ${buckets.string} exceeds ratchet ${expectedLegacy} — pillar regressed`).toBeLessThanOrEqual(expectedLegacy);
  });

  it(`empty-array ratchet: ${allowEmptyArray}`, () => {
    expect(buckets['empty-array'], `${id}: ${buckets['empty-array']} empty-array sources, ratchet allows ${allowEmptyArray}`).toBeLessThanOrEqual(allowEmptyArray);
  });

  it(`structured entries pass full schema check`, () => {
    expect(allErrors, `${id}: ${allErrors.length} schema violation(s)\n  ${allErrors.slice(0, 5).join('\n  ')}`).toEqual([]);
  });
});
