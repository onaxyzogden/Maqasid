// Guards for the GENERATED prayer boards' curated order.
//
// prayer-seed-tasks.js copies tasks out of FAITH_SEED_TASKS with a spread, so
// each copy arrives carrying its SOURCE board's `seq` — out of range on a 1-3
// task prayer board, duplicated when two source boards contribute the same
// value, and inverted when `faith_salah_excellence`'s seq 0 sorts an excellence
// task ahead of the core adhkar. `curateBoardOrder` overwrites all of it with
// the board's own 0..n-1 position, applying PRAYER_ORDER_OVERRIDES where the
// clock disagrees with emission order.
//
// seed-order.test.js already holds prayer to the permutation + curation
// ratchets. These are the generator-specific guards it cannot express.
//
// Rationale: wiki/decisions/2026-07-27-milos-prayer-board-ordering.md

import { describe, it, expect } from 'vitest';
import { PRAYER_SEED_TASKS, PRAYER_ORDER_OVERRIDES } from '../prayer-seed-tasks';

const CORE_ADHKAR = 'Complete the post-prayer adhkar after every salah (istighfar, tasbih, Ayat al-Kursi)';
const MEMORISE = 'Memorise the prophetic supplications specific to each prayer';
const AFTER_BOARDS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((p) => `prayer_${p}_after`);

const titles = (boardId) => PRAYER_SEED_TASKS[boardId].map((t) => t.title);

describe('prayer board order (generated)', () => {
  it('assigns every board its own seq — no inherited source-board value survives', () => {
    const broken = [];
    for (const [boardId, tasks] of Object.entries(PRAYER_SEED_TASKS)) {
      const seqs = tasks.map((t) => t.seq);
      if (!seqs.every((s, i) => s === i)) {
        broken.push(`${boardId}: ${JSON.stringify(seqs)} (expected 0..${tasks.length - 1})`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('has no duplicate seq on prayer_fajr_after (regression: shipped as [5,5,0])', () => {
    const seqs = PRAYER_SEED_TASKS.prayer_fajr_after.map((t) => t.seq);
    expect(new Set(seqs).size).toBe(seqs.length);
  });

  // The defect this closes: on every `_after` board the excellence-tier
  // memorisation task sorted FIRST, locking the chain behind it.
  it('opens every _after board on the core post-prayer adhkar, not the excellence task', () => {
    for (const boardId of AFTER_BOARDS) {
      const list = titles(boardId);
      expect(list[0], boardId).toBe(CORE_ADHKAR);
      expect(list.indexOf(MEMORISE), boardId).toBeGreaterThan(0);
    }
  });

  it('applies the three clock overrides', () => {
    // You wake before you take siwak and make wudu.
    expect(titles('prayer_fajr_before')[0]).toBe("Reclaim the day with the waking du'a and morning adhkar");
    // The evening adhkar are recited between Asr and Maghrib.
    expect(titles('prayer_maghrib_before')[0]).toBe('Recite the evening adhkar between Asr and Maghrib');
    // The pre-sleep sunnah genuinely ends the night.
    expect(titles('prayer_isha_after').at(-1)).toBe('Complete the prophetic pre-sleep sunnah');
  });

  // Drift guard — the override tables are literal titles, and the titles they
  // name are produced by classifyTask over faith-seed-tasks.js. A retitle or a
  // retag there would silently drop a task out of its override (unlisted titles
  // sort to the end) and degrade that board back to emission order. Set
  // equality, not membership, so BOTH directions fail loudly.
  it('every override lists exactly the tasks on its board', () => {
    for (const [boardId, order] of Object.entries(PRAYER_ORDER_OVERRIDES)) {
      expect(PRAYER_SEED_TASKS[boardId], `${boardId} is not a generated board`).toBeDefined();
      expect([...order].sort(), boardId).toEqual([...titles(boardId)].sort());
    }
  });
});
