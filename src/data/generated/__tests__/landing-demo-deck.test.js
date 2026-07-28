// Shape guard for the generated Orientation demo deck.
//
// `npm run generate:landing-demo:check` already proves the file matches the
// seed data. This proves the file is *usable* by src/pages/Landing.jsx: one
// card per objective, every citation complete, every axis id real, and every
// tier still derived rather than stamped.
//
// The card this replaced was hand-written and drifted into fiction — a task
// that existed nowhere in src/data/, under a ladder segment that was not a
// board node, wearing the wrong tier. These assertions are what stop that
// happening a second time.

import { describe, it, expect } from 'vitest';
import { LANDING_DEMO_DECK } from '../landing-demo-deck';
import { MAQASID_CORE_PILLARS } from '../../maqasid';
import { AMANAH_TIERS } from '../../config/amanah-tiers';
import { RELEVANCE_CHIPS } from '../../config/relevance-chips';
import { deriveSubtaskTier } from '../../../utils/subtask-grounding';

const TIER_IDS = new Set(AMANAH_TIERS.map((t) => t.id));
const TIER_LABELS = new Set(AMANAH_TIERS.map((t) => t.label));
const RELEVANCE_IDS = new Set(RELEVANCE_CHIPS.map((c) => c.id));

// The deck is the hero's "Seven objectives. One next step." made concrete, so
// a missing or duplicated objective is a bug, not a style choice.
const CORE_PILLAR_IDS = MAQASID_CORE_PILLARS.slice(0, 7).map((p) => p.id);

describe('landing demo deck', () => {
  it('carries exactly one card per core objective, in pillar order', () => {
    expect(LANDING_DEMO_DECK.map((c) => c.pillarId)).toEqual(CORE_PILLAR_IDS);
  });

  it.each(LANDING_DEMO_DECK.map((c) => [c.pillarId, c]))('%s renders a real ladder', (_id, card) => {
    expect(card.moduleLabel).toBeTruthy();
    expect(card.level).toBe('Core');
    expect(card.project).toBeTruthy();
    // Long enough to be a real instruction, short enough not to blow the card
    // out of its min-height and reflow the section on every advance.
    expect(card.subtask.length).toBeGreaterThan(10);
    expect(card.subtask.length).toBeLessThanOrEqual(120);
  });

  it.each(LANDING_DEMO_DECK.map((c) => [c.pillarId, c]))('%s cites completely', (_id, card) => {
    expect(card.sources.length).toBeGreaterThan(0);
    for (const s of card.sources) {
      expect(s.ref).toBeTruthy();
      expect(s.translation).toBeTruthy();
      expect(TIER_LABELS.has(s.provenanceTier)).toBe(true);
      expect(RELEVANCE_IDS.has(s.relevance)).toBe(true);
    }
  });

  it.each(LANDING_DEMO_DECK.map((c) => [c.pillarId, c]))('%s derives its tier', (_id, card) => {
    expect(TIER_IDS.has(card.tierId)).toBe(true);
    // The whole point of generating this file: the tier is computed from the
    // sources by the same function the app uses, never typed in by hand.
    expect(deriveSubtaskTier({ sources: card.sources })).toBe(card.tierId);
  });

  it('drops the payload that would drag the seed chunks into the landing bundle', () => {
    for (const card of LANDING_DEMO_DECK) {
      for (const s of card.sources) {
        expect(s.description).toBeUndefined();
        expect(s.arabic).toBeUndefined();
      }
    }
  });
});
