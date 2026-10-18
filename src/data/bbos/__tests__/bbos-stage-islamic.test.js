// BBOS stage du'a grounding — wiki/decisions/2026-10-17-bbos-stage-grounding-reconciliation.md
//   - every Qur'an / hadith du'a carries schema-valid `sources[]` (docs/grounding-schema.md)
//   - no Name repeats across the nine stages, and no opening text is used twice
//   - readiness rows name only the stage's own attributes
import { describe, it, expect } from 'vitest';
import { BBOS_STAGE_ISLAMIC, getBbosStageIslamic } from '../bbos-stage-islamic';

const KINDS = ['quran', 'hadith'];
const TIERS = ['Bayyinah', 'Qarina', 'Niyyah'];
const RELEVANCE = ['direct', 'contextual', 'thematic'];
const STAGES = Object.entries(BBOS_STAGE_ISLAMIC);
const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[ʿʾ'’]/g, '').toLowerCase();

function duasOf(data) {
  return [['dua', data.dua], ['closingDua', data.closingDua]].filter(([, d]) => d);
}

describe('BBOS stage du\'as', () => {
  it('ground every Qur\'an or hadith du\'a in schema-valid sources', () => {
    for (const [id, data] of STAGES) {
      for (const [slot, dua] of duasOf(data)) {
        const label = `${id}.${slot}`;
        expect(dua.source, label).toBeTruthy();
        // Only Qur'anic or prophetic du'as: no non-prophetic text without attestation.
        expect(dua.source, label).not.toMatch(/not a hadith|non-prophetic/i);
        expect(Array.isArray(dua.sources) && dua.sources.length > 0, label).toBe(true);
        for (const s of dua.sources) {
          expect(KINDS, label).toContain(s.kind);
          expect(TIERS, label).toContain(s.provenanceTier);
          expect(RELEVANCE, label).toContain(s.relevance);
          for (const k of ['ref', 'arabic', 'translation', 'rationale']) expect(s[k], `${label} ${k}`).toBeTruthy();
          if (s.kind === 'quran') expect(s.ref, label).toMatch(/^Quran \d+:\d+(-\d+)?$/);
          if (s.kind === 'hadith') expect(s.hadithGrade, label).toBeTruthy();
        }
      }
    }
  });

  it('never use the same opening text twice', () => {
    const openings = STAGES.map(([, d]) => d.dua.arabic);
    expect(new Set(openings).size).toBe(openings.length);
  });
});

describe('BBOS stage attributes', () => {
  it('never repeat a Name across the nine stages', () => {
    const keys = STAGES.flatMap(([, d]) => d.attrs.map((a) => a.nameKey));
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('name only the stage\'s own attributes in readiness rows', () => {
    for (const [id] of STAGES) {
      const { attrs, readiness } = getBbosStageIslamic(id);
      const names = attrs.map((a) => fold(a.name));
      for (const row of readiness.rows) {
        for (const part of row.attr.split('·').map((p) => fold(p.trim()))) {
          expect(names, `${id}.${row.id}`).toContain(part);
        }
      }
    }
  });
});
