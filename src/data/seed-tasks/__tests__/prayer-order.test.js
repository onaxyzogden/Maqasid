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
import {
  REORDERED_SUBTASK_ORDER,
  REORDERED_SUBTASK_ORDER_V3,
  SEED_SUBTASK_RENAMES,
} from '../../../services/migration';
import { FAITH_SEED_TASKS } from '../faith-seed-tasks';

const FIVE_DAILY = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
const AFTER_BOARDS = FIVE_DAILY.map((p) => `prayer_${p}_after`);
const PHASE_BOARDS = [...FIVE_DAILY, 'tahajjud'].flatMap((p) => [
  `prayer_${p}_before`,
  `prayer_${p}_after`,
]);

// The per-prayer adhkar task each `_after` board must open on. Titles differ by
// prayer on purpose — that is the whole point of the 2026-08 de-duplication —
// so this maps rather than compares against one constant.
const ADHKAR_TITLE = {
  prayer_fajr_after: 'Complete the Fajr adhkar without leaving your place',
  prayer_dhuhr_after: 'Complete the Dhuhr adhkar before returning to work',
  prayer_asr_after: 'Complete the ʿAṣr adhkar as the day turns',
  prayer_maghrib_after: 'Complete the Maghrib adhkar as the day closes',
  prayer_isha_after: 'Complete the ʿIshāʾ adhkar and keep the silence after it',
};

// Tasks that must never sort first on an `_after` board: memorisation and
// supererogatory duʿāʾ are excellence-tier, and the original defect was one of
// them locking the chain ahead of the core adhkar.
const EXCELLENCE_AFTER = [
  'Seal Fajr with the tenfold tahlil before you speak',
  'Seek refuge from the grave and the Dajjal at the close of ʿAṣr',
  'Recite the tenfold tahlil after Maghrib',
  "Recite the Prophetic Light Du'a after Witr",
];

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
  // memorisation task sorted FIRST, locking the chain behind it. The generic
  // task it named is gone, but the invariant is not — the prophetic block said
  // in the seat you prayed in still opens the tab, and the supererogatory duʿāʾ
  // still cannot precede it.
  it("opens every _after board on that prayer’s own adhkar, not an excellence task", () => {
    for (const boardId of AFTER_BOARDS) {
      const list = titles(boardId);
      expect(list[0], boardId).toBe(ADHKAR_TITLE[boardId]);
      for (const title of EXCELLENCE_AFTER) {
        const i = list.indexOf(title);
        if (i !== -1) expect(i, `${boardId} / ${title}`).toBeGreaterThan(0);
      }
    }
  });

  // The reported defect, stated as a test: three generic Salah tasks were
  // copied onto every prayer, so Asr Before *was* the shared task and nothing
  // else. Every before/after title must now name exactly one prayer.
  // Deliberately scoped to before/after — the six `during` boards legitimately
  // share row titles ("Farḍ · 4 rakʿahs" is on more than one prayer).
  it('shares no task title across two prayer before/after boards', () => {
    const boardsByTitle = new Map();
    for (const boardId of PHASE_BOARDS) {
      for (const title of titles(boardId)) {
        if (!boardsByTitle.has(title)) boardsByTitle.set(title, []);
        boardsByTitle.get(title).push(boardId);
      }
    }
    const shared = [...boardsByTitle.entries()]
      .filter(([, boards]) => boards.length > 1)
      .map(([title, boards]) => `"${title}" on ${boards.join(', ')}`);
    expect(shared).toEqual([]);
  });

  it('applies the clock overrides', () => {
    // You wake before you answer the adhan and take siwak.
    expect(titles('prayer_fajr_before')[0]).toBe("Reclaim the day with the waking du'a and morning adhkar");
    // The evening adhkar are recited between Asr and Maghrib.
    expect(titles('prayer_maghrib_before')[0]).toBe('Recite the evening adhkar between Asr and Maghrib');
    // The pre-sleep sunnah genuinely ends the night.
    expect(titles('prayer_isha_after').at(-1)).toBe('Complete the prophetic pre-sleep sunnah');
    // Every before/after board is listed in full, so a new task cannot land
    // unordered at the end of one.
    for (const boardId of PHASE_BOARDS) {
      expect(PRAYER_ORDER_OVERRIDES[boardId], `${boardId} has no explicit order`).toBeDefined();
    }
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

  // src/services/migration.js hardcodes REORDERED_SUBTASK_ORDER to re-order two
  // subtask sequences that were wrong when they first shipped (adhan-response
  // sat after siwak/wudu; the Witr Qunut sat after the post-Witr tasbih). The
  // boot path cannot import the lazy-loaded seed modules, so that table is a
  // hand-copied mirror of the seed — same shape as the FOLDED_SUBTASK_ORDER
  // drift guard in subtask-foldin.test.js, applied to this generated layer.
  describe('REORDERED_SUBTASK_ORDER drift guard', () => {
    for (const [boardId, orderTable] of Object.entries(REORDERED_SUBTASK_ORDER)) {
      for (const [taskTitle, order] of Object.entries(orderTable)) {
        it(`${boardId} / "${taskTitle}" matches the seed exactly`, () => {
          const task = PRAYER_SEED_TASKS[boardId]?.find((t) => t.title === taskTitle);
          expect(task, 'task title in the migration table no longer exists on this board').toBeDefined();
          expect(task.subtasks.map((s) => s.title)).toEqual(order);
        });
      }
    }
  });
  // The 2026-08-27 pass (Tahajjud waking protocol, Sunan al-Nawm) lists SOURCE
  // boards as well as generated ones, because both tasks render on two surfaces
  // and the 2026-08 table covered only the prayer_* copy. Resolve across both.
  const boardTasks = (boardId) => PRAYER_SEED_TASKS[boardId] || FAITH_SEED_TASKS[boardId];

  describe('REORDERED_SUBTASK_ORDER_V3 drift guard', () => {
    for (const [boardId, orderTable] of Object.entries(REORDERED_SUBTASK_ORDER_V3)) {
      for (const [taskTitle, order] of Object.entries(orderTable)) {
        it(`${boardId} / "${taskTitle}" matches the seed exactly`, () => {
          const tasks = boardTasks(boardId);
          expect(tasks, `${boardId} is neither a generated nor a faith seed board`).toBeDefined();
          const task = tasks.find((t) => t.title === taskTitle);
          expect(task, 'task title in the migration table no longer exists on this board').toBeDefined();
          expect(task.subtasks.map((s) => s.title)).toEqual(order);
        });
      }
    }
  });

  // A rename table is only correct while the NEW title is what the seed says
  // and the OLD one is gone. If a later edit reverted the seed title, the
  // migration would rewrite storage to a title nothing hydrates.
  describe('SEED_SUBTASK_RENAMES drift guard', () => {
    for (const [boardId, renameTable] of Object.entries(SEED_SUBTASK_RENAMES)) {
      for (const [taskTitle, map] of Object.entries(renameTable)) {
        for (const [from, to] of Object.entries(map)) {
          it(`${boardId} / "${from}" -> "${to}" agrees with the seed`, () => {
            const tasks = boardTasks(boardId);
            expect(tasks, `${boardId} is neither a generated nor a faith seed board`).toBeDefined();
            const task = tasks.find((t) => t.title === taskTitle);
            expect(task, 'task title in the rename table no longer exists on this board').toBeDefined();
            const subs = task.subtasks.map((s) => s.title);
            expect(subs, 'rename target missing from the seed').toContain(to);
            expect(subs, 'rename source still present in the seed').not.toContain(from);
            // The rename exists to make the v3 order table joinable; if the
            // order table ever stops listing the new title they have drifted.
            expect(
              REORDERED_SUBTASK_ORDER_V3[boardId]?.[taskTitle],
              'renamed subtask has no v3 order entry to join against'
            ).toContain(to);
          });
        }
      }
    }
  });
});
