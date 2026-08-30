import { describe, it, expect } from 'vitest';
import { THRESHOLD_MODULE_BY_NODE } from '../prophetic-path-constants.js';
import { DAILY_CEREMONY_MODULES } from '../../../store/islamic-day-store.js';
import { getModuleData } from '../../../data/islamic/islamic-data.js';

describe('THRESHOLD_MODULE_BY_NODE', () => {
  it('routes the after-asr "Return to Family" node to family ceremony content, not Salah', () => {
    const moduleId = THRESHOLD_MODULE_BY_NODE['after-asr'];
    const data = getModuleData(moduleId, 'islamic');
    // The after-asr node's popup body promises "quality time with spouse and
    // children" — its ceremony dua must not be the pre-Salah dua ("Before
    // Standing in Salah" / Al-Mujib / Al-Baqarah 2:186).
    expect(data?.dua?.title).not.toBe('Before Standing in Salah');
  });

  it('routes the istijabah-hour node to its own ceremony content, not Salah', () => {
    const moduleId = THRESHOLD_MODULE_BY_NODE['istijabah-hour'];
    const data = getModuleData(moduleId, 'islamic');
    // The Hour of Acceptance is the last stretch before Maghrib on Friday, not a
    // prayer — it used to point at 'faith-salah' and so opened on the pre-Salah
    // dua ("Before Standing in Salah" / Al-Baqarah 2:186), asking the operator
    // what they were bringing into a prayer they were not about to pray.
    expect(data, 'istijabah-hour has no ceremony data of its own').toBeTruthy();
    expect(data?.dua?.title).not.toBe('Before Standing in Salah');
    expect(data?.readiness?.rows?.length).toBeGreaterThan(0);
  });

  it("gives each of the five non-prayer nodes its own ceremony, not Salah's and not Work's", () => {
    // Before this pass: jumuah and eid-prayer pointed at 'faith-salah', qaylulah
    // at 'health-physical', and the two travel nodes had no key at all — so they
    // fell through to NodePhaseSlideUp's `|| moduleId || 'work'` and opened the
    // Work threshold on the road. Each now keys its ceremony by its own node id.
    const NODES = ['jumuah', 'eid-prayer', 'qaylulah', 'traveler-departure', 'traveler-arrival'];
    const duaTitles = new Set();

    for (const nodeId of NODES) {
      const moduleId = THRESHOLD_MODULE_BY_NODE[nodeId];
      expect(moduleId, `${nodeId} has no threshold module`).toBe(nodeId);
      const data = getModuleData(moduleId, 'islamic');
      expect(data, `${nodeId} has no ceremony data of its own`).toBeTruthy();
      expect(data?.dua?.title).not.toBe('Before Standing in Salah');
      expect(data?.readiness?.rows?.length, `${nodeId} readiness is empty`).toBeGreaterThan(0);
      expect(data?.reflection?.rows?.length, `${nodeId} reflection is empty`).toBeGreaterThan(0);
      duaTitles.add(data?.dua?.title);
    }

    // Five distinct openings — a copy-pasted ceremony would collapse this set.
    expect(duaTitles.size).toBe(NODES.length);
  });

  it('keeps every distinct threshold module registered for Maghrib rollover clearing', () => {
    const usedModules = new Set(Object.values(THRESHOLD_MODULE_BY_NODE));
    for (const moduleId of usedModules) {
      expect(DAILY_CEREMONY_MODULES).toContain(moduleId);
    }
  });
});
