// Guard: the five non-prayer nodes each show their own practice and nobody
// else's.
//
// Removing buildTasksForNode()'s whole-pool fallback (prophetic-path-no-fallback
// .test.js) exposed five nodes with nothing of their own. Measured before the
// fix: jumuah rendered 3 tasks and none of them was the Friday cluster;
// eid-prayer rendered 1 task and it was jumuah's; traveler-arrival rendered 9
// and all 9 were family_home rows. Four separate defects sat underneath:
//
//   1. jumuah's matcher allowed only ASCII a/' but the seed title carries U+02BB
//      ("Jumuʻah"), so it matched zero rows.
//   2. eid-prayer's matcher was a bare /\beid\b/ — it claimed that same Friday
//      title, because the title contains "the eid of the week".
//   3. traveler-arrival matched bare home/return/arrival, i.e. every family_home
//      title.
//   4. Three node entries scoped 'ummah-community', which is not a submodule id
//      ('community' is), so they could never see the Ummah boards at all.
//
// These cases pin the outcome rather than the regexes: each node's rendered
// title set, and the fact that no title is shared between any two of the five.

import { describe, it, expect } from 'vitest';
import { buildTasksForNode } from '../prophetic-path-submodules';
import { FAITH_SEED_TASKS } from '../seed-tasks/faith-seed-tasks';
import { HEALTH_SEED_TASKS } from '../seed-tasks/health-seed-tasks';
import { UMMAH_SEED_TASKS } from '../seed-tasks/ummah-seed-tasks';
import { FAMILY_SEED_TASKS } from '../seed-tasks/family-seed-tasks';

// The boards that carry the five nodes' content, plus family_home_growth — the
// pool traveler-arrival used to swallow whole, kept here so its absence below is
// evidence rather than an artefact of leaving it out.
const BOARDS = [
  { id: 'faith_salah_growth', moduleId: 'salat', seeds: FAITH_SEED_TASKS },
  { id: 'faith_siyam_core', moduleId: 'siyam', seeds: FAITH_SEED_TASKS },
  { id: 'health_physical_growth', moduleId: 'physical', seeds: HEALTH_SEED_TASKS },
  { id: 'ummah_community_core', moduleId: 'community', seeds: UMMAH_SEED_TASKS },
  { id: 'ummah_community_growth', moduleId: 'community', seeds: UMMAH_SEED_TASKS },
  { id: 'family_home_growth', moduleId: 'home', seeds: FAMILY_SEED_TASKS },
];

const PROJECTS = BOARDS.map(({ id, moduleId }) => ({ id, moduleId, name: id }));

const TASKS_BY_BOARD = Object.fromEntries(
  BOARDS.map(({ id, seeds }) => [
    id,
    (seeds[id] || []).map((t) => ({
      id: `${id}::${t.title}`,
      title: t.title,
      priority: t.priority || 'medium',
      columnId: 'todo',
      subtasks: t.subtasks || [],
    })),
  ])
);

const titlesFor = (nodeId) =>
  buildTasksForNode(nodeId, PROJECTS, TASKS_BY_BOARD, { limit: 20, phase: null }).map((r) => r.title);

// Byte-for-byte from the seed files — these strings are also the seed<->storage
// join, so a drift here is a drift that would orphan the operator's stored row.
const FRIDAY_TASK = 'Honor the Friday Sunan — Jumuʻah is the eid of the week';
const EXPECTED = {
  // Three, not one. The Friday sunan is the row the node was blind to, but
  // jumuah's matcher has always also claimed /congregational\s+prayer/, and
  // two ummah_community_core rows answer to it — one of them literally names
  // Jumu'ah (ASCII apostrophe). Both are Friday-relevant and they are kept.
  // Rendered order is tier-first, so those two daruriyyat rows come ahead of
  // the hajiyyat Friday sunan; the assertions below compare sets, not order.
  jumuah: [
    'Establish regular congregational prayer in your locality',
    "Attend congregational prayers consistently — prioritise Fajr, Isha, and Jumu'ah",
    FRIDAY_TASK,
  ],
  'eid-prayer': [
    'Keep the Sunan of ʻĪd al-Fitr',
    'Keep the Sunan of ʻĪd al-Adha',
    'Organise the community ʻĪd — Zakat al-Fitr before the prayer, takbir in the open',
  ],
  qaylulah: [
    'Qaylulah — implement the prophetic midday rest',
    'Keep the qaylulah adab — how to lie down and how to get up',
  ],
  'traveler-departure': [
    'Travel with the Prophet’s ﷺ structure',
    'Take the travel concessions fully — the fasting allowance and hastening back',
  ],
  'traveler-arrival': [
    'Arrive back the prophetic way — the duʻaʻ of return',
  ],
};

describe('the five non-prayer nodes each render their own practice', () => {
  for (const [nodeId, expected] of Object.entries(EXPECTED)) {
    it(`${nodeId} shows exactly its own ${expected.length} task(s)`, () => {
      expect(titlesFor(nodeId).sort()).toEqual([...expected].sort());
    });
  }

  it('shares no title between any two of the five', () => {
    const seen = new Map();
    for (const nodeId of Object.keys(EXPECTED)) {
      for (const title of titlesFor(nodeId)) {
        expect(seen.has(title), `"${title}" is claimed by both ${seen.get(title)} and ${nodeId}`)
          .toBe(false);
        seen.set(title, nodeId);
      }
    }
  });

  it('never lets eid-prayer claim the Friday task', () => {
    // Defect 2: "Jumuʻah is the eid of the week" contains the word, not the day.
    expect(titlesFor('eid-prayer')).not.toContain(FRIDAY_TASK);
  });

  it('never lets traveler-arrival claim the family home board', () => {
    // Defect 3: bare /home|return|arrival/ matched all nine family_home rows.
    const homeTitles = TASKS_BY_BOARD.family_home_growth.map((t) => t.title);
    expect(homeTitles.length).toBeGreaterThan(0);
    for (const title of titlesFor('traveler-arrival')) {
      expect(homeTitles).not.toContain(title);
    }
  });
});
