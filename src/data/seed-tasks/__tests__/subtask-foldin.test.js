// Guard: the six subtasks that lived only on the tasks deleted by the 2026-07-27
// dedupe are folded back onto their surviving siblings, and stay there.
//
// Five are subtask rows on `ummah_community_growth`, restored byte-for-byte at
// curated positions. The sixth — a land waqf endowment — is NOT a row: it
// duplicated an existing subtask on a sibling task of
// `ummah_moontrance-land_excellence`, so its Khaybar hadith and its distinctive
// steps were merged into that subtask instead. Re-adding it as a row would
// recreate exactly the redundancy the dedupe removed, so this file pins the
// merge and pins its absence as a row.
//
// The second half is the drift guard. `FOLDED_SUBTASK_ORDER` in
// src/services/migration.js is a HARDCODED copy of these orders (the boot path
// cannot import the lazy-loaded seed modules — see d9ca679). Nothing else stops
// it from silently diverging from the seed and re-ordering the operator's board
// to a stale sequence.
//
// Approval gate: stages/implement-subtask-foldin-review.md
// Rationale: wiki/decisions/2026-07-27-milos-subtask-foldin.md

import { describe, it, expect } from 'vitest';
import { UMMAH_SEED_TASKS } from '../ummah-seed-tasks';
import { FOLDED_SUBTASK_ORDER } from '../../../services/migration';

const GROWTH = 'ummah_community_growth';
const LAND = 'ummah_moontrance-land_excellence';

// title -> [index the folded subtask must sit at, expected subtask count]
const FOLDED_ROWS = [
  [
    GROWTH,
    'Establish a community dispute resolution (sulh) process — prevent conflicts from escalating',
    "Establish a referral network for cases beyond the community's capacity",
    2, 6,
  ],
  [
    GROWTH,
    'Establish community education — launch a regular halaqa or weekend Islamic school programme',
    'Design a structured curriculum with clear learning outcomes',
    2, 6,
  ],
  [
    GROWTH,
    'Develop a comprehensive youth programme rooted in Islamic identity',
    'Review the programme after three months — assess impact and refine the approach',
    5, 6,
  ],
  [
    GROWTH,
    'Establish a community treasury (bayt al-mal) for collective financial strength',
    'Form a waqf committee with financial, legal, and community representation',
    5, 7,
  ],
  [
    GROWTH,
    'Establish a community treasury (bayt al-mal) for collective financial strength',
    'Draft the waqf deed — define the purpose, beneficiaries, and management structure',
    6, 7,
  ],
];

const findTask = (boardId, title) => UMMAH_SEED_TASKS[boardId].find((t) => t.title === title);

describe('Subtask fold-in (2026-07-27)', () => {
  for (const [boardId, taskTitle, subTitle, index, count] of FOLDED_ROWS) {
    it(`"${subTitle}" sits at index ${index} of ${count}`, () => {
      const subs = findTask(boardId, taskTitle).subtasks;
      expect(subs).toHaveLength(count);
      expect(subs[index].title).toBe(subTitle);
    });

    it(`"${subTitle}" carries structured sources`, () => {
      const sub = findTask(boardId, taskTitle).subtasks[index];
      expect(Array.isArray(sub.sources)).toBe(true);
      expect(sub.sources.length).toBeGreaterThan(0);
      expect(typeof sub.description).toBe('string');
    });
  }

  describe('the land waqf endowment is merged, not added', () => {
    const succession = 'Establish an intergenerational stewardship succession plan — ensure the land outlives its founders';
    const endowment = 'Create a land endowment fund that generates income for perpetual stewardship operations';

    it('no second endowment subtask exists anywhere on the land board', () => {
      const matches = UMMAH_SEED_TASKS[LAND].flatMap((t) =>
        (t.subtasks || []).filter((s) => /waqf endowment/i.test(s.title)).map((s) => `${t.title}: ${s.title}`)
      );
      expect(matches).toEqual([]);
    });

    it('the surviving endowment subtask gained the Khaybar waqf narration', () => {
      const sub = findTask(LAND, succession).subtasks.find((s) => s.title === endowment);
      expect(sub.sources.map((s) => s.ref)).toContain('Sahih al-Bukhari 2737');
      expect(sub.sources.find((s) => s.ref === 'Sahih al-Bukhari 2737').hadithGrade).toBe('Sahih');
    });

    it('the surviving endowment subtask gained the merged steps', () => {
      const sub = findTask(LAND, succession).subtasks.find((s) => s.title === endowment);
      expect(sub.description).toMatch(/mutawallis/);
      expect(sub.description).toMatch(/acquiring further land/);
      expect(sub.description).toMatch(/training new communities/);
    });

    it('the land board is unchanged in shape — 4 tasks, 5 subtasks each', () => {
      expect(UMMAH_SEED_TASKS[LAND]).toHaveLength(4);
      for (const t of UMMAH_SEED_TASKS[LAND]) expect(t.subtasks).toHaveLength(5);
    });
  });

  // The one that matters most: the migration's hardcoded table IS the seed order.
  describe('FOLDED_SUBTASK_ORDER drift guard', () => {
    for (const [boardId, orderTable] of Object.entries(FOLDED_SUBTASK_ORDER)) {
      for (const [taskTitle, order] of Object.entries(orderTable)) {
        it(`${boardId} / "${taskTitle}" matches the seed exactly`, () => {
          const task = findTask(boardId, taskTitle);
          expect(task, 'task title in the migration table no longer exists in the seed').toBeDefined();
          expect(task.subtasks.map((s) => s.title)).toEqual(order);
        });
      }
    }

    it('covers every task that received a folded subtask, and no others', () => {
      const expected = [...new Set(FOLDED_ROWS.map(([, taskTitle]) => taskTitle))].sort();
      expect(Object.keys(FOLDED_SUBTASK_ORDER)).toEqual([GROWTH]);
      expect(Object.keys(FOLDED_SUBTASK_ORDER[GROWTH]).sort()).toEqual(expected);
    });
  });
});
