// Task-order audit, pass 2 (2026-10-05).
//
// The contract this file pins: moved rows travel by reference (`id`, `done`);
// a retired task is deleted only when it carries no progress; operator rows are
// never dropped; a second run changes nothing. The second half deep-equals every
// migration table against the seed, because the tables are hardcoded literals
// (the boot path cannot import the lazy-loaded seed modules).
//
// Approval gate: stages/implement-task-order-audit-pass-2-review.md

import { describe, it, expect } from 'vitest';
import { FAITH_SEED_TASKS } from '../../data/seed-tasks/faith-seed-tasks';
import { UMMAH_SEED_TASKS } from '../../data/seed-tasks/ummah-seed-tasks';
import { PRAYER_SEED_TASKS } from '../../data/seed-tasks/prayer-seed-tasks';
import {
  AUDIT_V2_MOVES,
  AUDIT_V2_ORDER,
  RETIRED_SEED_TASKS_V2,
  SUNAN_AL_NAWM_TASK,
  moveSeedSubtask,
  seedOrderAuditV2,
} from '../migration';

const SEEDS = { ...FAITH_SEED_TASKS, ...UMMAH_SEED_TASKS, ...PRAYER_SEED_TASKS };
const [IFTAR, WUDU] = AUDIT_V2_MOVES;

let n = 0;
const sub = (title, over = {}) => ({ id: `sub_${n++}`, title, done: false, ...over });
const taskRow = (boardId, title, subtaskTitles, over = {}) => ({
  id: `tsk_${n++}`, title, columnId: `col_${boardId}_to_do`,
  subtasks: subtaskTitles.map((t) => sub(t)), ...over,
});
const titlesOf = (tasks, title) => tasks.find((t) => t.title === title).subtasks.map((s) => s.title);

// Boards as an operator who seeded before 2026-10-05 holds them.
const OLD = {
  faith_siyam_growth: [
    taskRow('faith_siyam_growth', IFTAR.from.task, [
      IFTAR.subtask,
      'Study what the Prophet (SAW) ate for suhoor and iftar',
      'Practice delaying suhoor and hastening iftar as Sunnah',
    ]),
  ],
  faith_siyam_core: [
    taskRow('faith_siyam_core', IFTAR.to.task, AUDIT_V2_ORDER.faith_siyam_core[IFTAR.to.task].slice(1)),
  ],
  faith_salah_growth: [
    taskRow('faith_salah_growth', 'Some other growth task', ['x']),
    taskRow('faith_salah_growth', SUNAN_AL_NAWM_TASK, [
      WUDU.subtask,
      'Recite Surah al-Mulk before sleep on at least 4 nights this week',
      'Recite Ayat al-Kursi on going to bed',
      'Sleep on the right side and recite the dua of sleeping',
    ]),
  ],
  faith_salah_core: [
    taskRow('faith_salah_core', WUDU.to.task, AUDIT_V2_ORDER.faith_salah_core[WUDU.to.task].slice(1)),
  ],
  prayer_isha_after: [
    taskRow('prayer_isha_after', WUDU.to.task, AUDIT_V2_ORDER.prayer_isha_after[WUDU.to.task].slice(1)),
  ],
};
const SOIL = Object.keys(AUDIT_V2_ORDER['ummah_moontrance-land_core'])[0];
const SOIL_ORDER = AUDIT_V2_ORDER['ummah_moontrance-land_core'][SOIL];
OLD['ummah_moontrance-land_core'] = [
  taskRow('ummah_moontrance-land_core', SOIL, [SOIL_ORDER[1], SOIL_ORDER[2], SOIL_ORDER[0], SOIL_ORDER[3], SOIL_ORDER[4]]),
];

const clone = () => structuredClone(OLD);

describe('seedOrderAuditV2', () => {
  it('lands every board on the curated order and retires Sunan al-Nawm', () => {
    const { next, report } = seedOrderAuditV2(clone());
    for (const [boardId, table] of Object.entries(AUDIT_V2_ORDER)) {
      for (const [title, order] of Object.entries(table)) expect(titlesOf(next[boardId], title)).toEqual(order);
    }
    expect(titlesOf(next.faith_siyam_growth, IFTAR.from.task)).not.toContain(IFTAR.subtask);
    expect(next.faith_salah_growth.map((t) => t.title)).toEqual(['Some other growth task']);
    expect(report.retired).toEqual([SUNAN_AL_NAWM_TASK]);
  });

  it('moves the stored row itself, so id and done travel', () => {
    const boards = clone();
    const wudu = boards.faith_salah_growth[1].subtasks[0];
    wudu.done = true;
    const iftar = boards.faith_siyam_growth[0].subtasks[0];
    const { next } = seedOrderAuditV2(boards);
    expect(next.faith_salah_core[0].subtasks[0]).toMatchObject({ id: wudu.id, done: true });
    expect(next.faith_siyam_core[0].subtasks[0]).toMatchObject({ id: iftar.id, title: IFTAR.subtask });
  });

  it('gives the generated prayer_isha_after copy its own fresh wudu row', () => {
    const { next } = seedOrderAuditV2(clone());
    const row = next.prayer_isha_after[0].subtasks[0];
    expect(row).toMatchObject({ title: WUDU.subtask, done: false });
    expect(row.id).not.toBe(next.faith_salah_core[0].subtasks[0].id);
  });

  it('keeps a retired task that carries progress beyond the moved row', () => {
    const boards = clone();
    boards.faith_salah_growth[1].subtasks[1].done = true;
    const { next, report } = seedOrderAuditV2(boards);
    expect(next.faith_salah_growth.map((t) => t.title)).toContain(SUNAN_AL_NAWM_TASK);
    expect(titlesOf(next.faith_salah_growth, SUNAN_AL_NAWM_TASK)).not.toContain(WUDU.subtask);
    expect(report.keptRetired).toEqual([SUNAN_AL_NAWM_TASK]);
  });

  it('never drops operator-added subtasks', () => {
    const boards = clone();
    boards.faith_siyam_core[0].subtasks.push(sub('my own step'));
    boards['ummah_moontrance-land_core'][0].subtasks.splice(1, 0, sub('call the county office'));
    const { next } = seedOrderAuditV2(boards);
    expect(titlesOf(next.faith_siyam_core, IFTAR.to.task).at(-1)).toBe('my own step');
    expect(titlesOf(next['ummah_moontrance-land_core'], SOIL).at(-1)).toBe('call the county office');
  });

  it('re-orders even when steps are already done, keeping each row object', () => {
    const boards = clone();
    const walk = boards['ummah_moontrance-land_core'][0].subtasks[0];
    walk.done = true;
    const { next } = seedOrderAuditV2(boards);
    expect(next['ummah_moontrance-land_core'][0].subtasks[1]).toBe(walk);
  });

  it('is idempotent — a second run changes no board', () => {
    const first = seedOrderAuditV2(clone());
    const merged = { ...clone(), ...first.next };
    expect(seedOrderAuditV2(merged).next).toEqual({});
  });

  it('touches nothing on boards the operator never seeded', () => {
    expect(seedOrderAuditV2({}).next).toEqual({});
  });
});

describe('moveSeedSubtask', () => {
  const from = () => [taskRow('a', 'A', ['keep', 'move'])];
  const move = { subtask: 'move', from: { board: 'a', task: 'A' }, to: { board: 'b', task: 'B' } };

  it('merges into an existing target row instead of duplicating it', () => {
    const f = from();
    f[0].subtasks[1].done = true;
    const to = [taskRow('b', 'B', ['move'])];
    const { toNext, report } = moveSeedSubtask(f, to, move);
    expect(toNext[0].subtasks).toHaveLength(1);
    expect(toNext[0].subtasks[0].done).toBe(true);
    expect(report.merged).toBe(true);
  });

  it('keeps a done row in place when the target task is not stored', () => {
    const f = from();
    f[0].subtasks[1].done = true;
    const { fromNext, report } = moveSeedSubtask(f, [], move);
    expect(fromNext).toBe(f);
    expect(report.keptDone).toBe(true);
  });

  it('drops an untouched row when the target task is not stored', () => {
    const { fromNext, report } = moveSeedSubtask(from(), null, move);
    expect(fromNext[0].subtasks.map((s) => s.title)).toEqual(['keep']);
    expect(report.dropped).toBe(true);
  });
});

describe('pass-2 drift guard', () => {
  const seedTask = (board, title) => SEEDS[board]?.find((t) => t.title === title);

  for (const [boardId, table] of Object.entries(AUDIT_V2_ORDER)) {
    for (const [title, order] of Object.entries(table)) {
      it(`${boardId} / "${title.slice(0, 40)}…" matches the seed`, () => {
        const task = seedTask(boardId, title);
        expect(task, 'task missing from the seed').toBeDefined();
        expect(task.subtasks.map((s) => s.title)).toEqual(order);
      });
    }
  }

  it('every move has left its source task and reached its target task in the seed', () => {
    for (const m of AUDIT_V2_MOVES) {
      const src = seedTask(m.from.board, m.from.task);
      if (src) expect(src.subtasks.map((s) => s.title)).not.toContain(m.subtask);
      expect(seedTask(m.to.board, m.to.task).subtasks.map((s) => s.title)).toContain(m.subtask);
    }
  });

  it('every retired task is gone from the seed', () => {
    for (const [boardId, titles] of Object.entries(RETIRED_SEED_TASKS_V2)) {
      for (const t of titles) expect(seedTask(boardId, t)).toBeUndefined();
    }
  });
});
