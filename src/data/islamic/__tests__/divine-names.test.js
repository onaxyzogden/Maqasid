// Conformance test for the Divine Names registry.
//
// The registry is the single canonical definition of each Name (transliteration,
// Arabic, title, plain-language gloss, structured attestation). Module data holds
// only `{ nameKey, application }` and is merged against the registry at the
// accessor. These assertions keep that contract honest:
//
//   - every nameKey a module references actually resolves
//   - every registry entry carries a complete, schema-valid attestation
//   - zero hydrated attributes come back without a source (the ratchet that keeps
//     the pre-migration "18 BBOS attributes with no citation" gap closed)
//
// Schema mirrors the seed-task grounding convention:
// wiki/decisions/2026-04-18-milos-grounding-two-axis.md

import { describe, it, expect } from 'vitest';
import { DIVINE_NAMES, NINETY_NINE_COUNT, hydrateAttrs } from '../divine-names';
import { MODULE_ATTRS } from '../islamic-data';
import { BBOS_STAGE_ISLAMIC } from '../../bbos/bbos-stage-islamic';

const VALID_KINDS = new Set(['quran', 'hadith']);
const VALID_TIERS = new Set(['Bayyinah', 'Qarina', 'Niyyah']);
const VALID_RELEVANCE = new Set(['direct', 'contextual', 'thematic']);

const GLOSS_MAX = 130;
const APPLICATION_MAX = 280;

/** Every `{ nameKey, application }` entry across both data sources. */
function allModuleAttrs() {
  const out = [];
  for (const [id, data] of Object.entries(MODULE_ATTRS)) {
    for (const attr of data.attrs || []) out.push({ source: `MODULE_ATTRS.${id}`, attr });
  }
  for (const [id, data] of Object.entries(BBOS_STAGE_ISLAMIC)) {
    for (const attr of data.attrs || []) out.push({ source: `BBOS_STAGE_ISLAMIC.${id}`, attr });
  }
  return out;
}

describe('divine-names registry', () => {
  it('holds the ninety-nine plus the off-list Names MILOS uses', () => {
    expect(NINETY_NINE_COUNT).toBe(99);
    expect(Object.keys(DIVINE_NAMES).length).toBeGreaterThanOrEqual(99);
  });

  it('gives every entry a complete identity', () => {
    for (const [key, entry] of Object.entries(DIVINE_NAMES)) {
      expect(key, `${key}: key must be an ascii slug`).toMatch(/^[a-z0-9-]+$/);
      for (const field of ['name', 'name_ar', 'title', 'gloss']) {
        expect(entry[field], `${key}.${field}`).toBeTruthy();
        expect(typeof entry[field], `${key}.${field}`).toBe('string');
      }
      expect(entry.gloss.length, `${key}.gloss is ${entry.gloss.length}ch`).toBeLessThanOrEqual(
        GLOSS_MAX,
      );
      expect(typeof entry.inNinetyNine, `${key}.inNinetyNine`).toBe('boolean');
    }
  });

  it('gives every entry a schema-valid attestation', () => {
    for (const [key, entry] of Object.entries(DIVINE_NAMES)) {
      const s = entry.source;
      expect(s, `${key}.source`).toBeTruthy();
      expect(VALID_KINDS.has(s.kind), `${key}.source.kind = ${s.kind}`).toBe(true);
      expect(VALID_RELEVANCE.has(s.relevance), `${key}.source.relevance = ${s.relevance}`).toBe(
        true,
      );
      expect(
        VALID_TIERS.has(s.provenanceTier),
        `${key}.source.provenanceTier = ${s.provenanceTier}`,
      ).toBe(true);
      for (const field of ['ref', 'arabic', 'translation', 'rationale']) {
        expect(s[field], `${key}.source.${field}`).toBeTruthy();
      }
    }
  });

  it('keeps transliterations and Arabic forms unique across keys', () => {
    const byArabic = new Map();
    const byName = new Map();
    for (const [key, entry] of Object.entries(DIVINE_NAMES)) {
      expect(byArabic.get(entry.name_ar), `${key} duplicates name_ar of ${byArabic.get(entry.name_ar)}`)
        .toBeUndefined();
      expect(byName.get(entry.name), `${key} duplicates name of ${byName.get(entry.name)}`)
        .toBeUndefined();
      byArabic.set(entry.name_ar, key);
      byName.set(entry.name, key);
    }
  });
});

describe('module attribute entries', () => {
  it('reference only nameKeys the registry resolves', () => {
    const unresolved = allModuleAttrs()
      .filter(({ attr }) => attr.nameKey && !DIVINE_NAMES[attr.nameKey])
      .map(({ source, attr }) => `${source} -> ${attr.nameKey}`);
    expect(unresolved).toEqual([]);
  });

  it('carry a nameKey and an application, and nothing the registry owns', () => {
    for (const { source, attr } of allModuleAttrs()) {
      expect(attr.nameKey, `${source}: missing nameKey`).toBeTruthy();
      expect(attr.application, `${source}/${attr.nameKey}: missing application`).toBeTruthy();
      // Name identity lives in the registry — a literal here would silently
      // reintroduce the per-module drift this refactor removed.
      expect(attr.name, `${source}/${attr.nameKey}: literal name`).toBeUndefined();
      expect(attr.name_ar, `${source}/${attr.nameKey}: literal name_ar`).toBeUndefined();
      expect(attr.body, `${source}/${attr.nameKey}: literal body`).toBeUndefined();
    }
  });

  it('keep applications short enough to read on a ceremony card', () => {
    const over = allModuleAttrs()
      .filter(({ attr }) => (attr.application || '').length > APPLICATION_MAX)
      .map(({ source, attr }) => `${source}/${attr.nameKey} (${attr.application.length}ch)`);
    expect(over).toEqual([]);
  });
});

describe('hydration', () => {
  it('returns a complete attribute for every module entry — zero without a source', () => {
    const sources = [
      ...Object.entries(MODULE_ATTRS),
      ...Object.entries(BBOS_STAGE_ISLAMIC),
    ];
    let hydrated = 0;
    for (const [id, data] of sources) {
      const attrs = hydrateAttrs(data.attrs);
      expect(attrs.length, `${id}: hydration dropped an attribute`).toBe(data.attrs.length);
      for (const attr of attrs) {
        hydrated++;
        expect(attr.name, `${id}: hydrated attr missing name`).toBeTruthy();
        expect(attr.gloss, `${id}/${attr.nameKey}: hydrated attr missing gloss`).toBeTruthy();
        expect(attr.source, `${id}/${attr.nameKey}: hydrated attr missing source`).toBeTruthy();
        // Legacy consumers (AI prompt builder, BBOS dashboard adapter) read `body`.
        expect(attr.body, `${id}/${attr.nameKey}: hydrated attr missing body`).toBeTruthy();
        expect(attr.body).toContain(attr.gloss);
        expect(attr.body).toContain(attr.source.ref);
      }
    }
    expect(hydrated).toBeGreaterThan(100);
  });

  it('passes through entries that carry no nameKey', () => {
    const principle = { name: 'Stewardship', body: 'Line one\n\nLine two' };
    expect(hydrateAttrs([principle])).toEqual([principle]);
  });

  it('is a no-op on non-arrays', () => {
    expect(hydrateAttrs(undefined)).toBeUndefined();
    expect(hydrateAttrs(null)).toBeNull();
  });
});
