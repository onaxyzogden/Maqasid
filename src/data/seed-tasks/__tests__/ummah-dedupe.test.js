// Guard: the five duplicated Ummah tasks removed on 2026-07-27 stay removed.
//
// `ummah_community_growth` carried four near-duplicate pairs (sulh, education,
// youth, treasury) and `ummah_moontrance-land_excellence` one (replicable
// stewardship model). Each pair lost one member outright; the survivors keep
// their titles BYTE-FOR-BYTE, because the seed<->storage join is exact title
// equality (project-store backfill, seed-hydrator) — a rename orphans the
// operator's stored task and appends a duplicate alongside it.
//
// So this file pins two things: the removed titles never come back, and the
// survivors' titles never drift. Rationale + the storage prune that pairs with
// the removal: wiki/decisions/2026-07-27-milos-ummah-task-dedupe.md

import { describe, it, expect } from 'vitest';
import { UMMAH_SEED_TASKS } from '../ummah-seed-tasks';

const REMOVED = [
  'Build a community dispute resolution (sulh) mechanism',
  'Establish a community education institution (halaqa or weekend school)',
  'Build a youth mentorship programme — invest in the next generation of community leaders',
  'Establish a community treasury or waqf — build institutional financial sustainability',
  'Develop a replicable Islamic land stewardship model — document, teach, and support new projects',
];

const SURVIVORS = {
  ummah_community_growth: [
    'Establish a community dispute resolution (sulh) process — prevent conflicts from escalating',
    'Establish community education — launch a regular halaqa or weekend Islamic school programme',
    'Develop a comprehensive youth programme rooted in Islamic identity',
    'Develop dedicated programming for women — ensure equitable access and voice in community life',
    'Develop a structured dawah and outreach programme',
    'Establish a community treasury (bayt al-mal) for collective financial strength',
    // Added 2026-08-29, not a resurrected duplicate: the communal half of the
    // ʻĪd content split, so the eid-prayer node has its own practice to show.
    'Organise the community ʻĪd — Zakat al-Fitr before the prayer, takbir in the open',
  ],
  'ummah_moontrance-land_excellence': [
    'Achieve a fully regenerative closed-loop system — zero external inputs, net-positive soil health',
    'Produce surplus food and resources for community distribution — the land gives more than it consumes',
    'Build a replicable Islamic land stewardship model that other communities can adopt and adapt',
    'Establish an intergenerational stewardship succession plan — ensure the land outlives its founders',
  ],
};

const byCuratedOrder = (tasks) => [...tasks].sort((a, b) => a.seq - b.seq).map((t) => t.title);

describe('Ummah task dedupe (2026-07-27)', () => {
  it('none of the removed duplicates reappear on any Ummah board', () => {
    const found = [];
    for (const [boardKey, tasks] of Object.entries(UMMAH_SEED_TASKS)) {
      if (!Array.isArray(tasks)) continue;
      for (const t of tasks) if (REMOVED.includes(t.title)) found.push(`${boardKey}: "${t.title}"`);
    }
    expect(found).toEqual([]);
  });

  for (const [boardKey, titles] of Object.entries(SURVIVORS)) {
    it(`${boardKey} holds exactly its ${titles.length} survivors, in curated order`, () => {
      expect(byCuratedOrder(UMMAH_SEED_TASKS[boardKey])).toEqual(titles);
    });
  }

  it('the surviving treasury task inherited the removed one\'s high priority', () => {
    const treasury = UMMAH_SEED_TASKS.ummah_community_growth.find((t) =>
      t.title.startsWith('Establish a community treasury (bayt al-mal)')
    );
    expect(treasury?.priority).toBe('high');
  });
});
