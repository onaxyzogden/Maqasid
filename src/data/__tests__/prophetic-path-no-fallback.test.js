// buildTasksForNode used to end its content-matcher stage with
//   rows = matched.length > 0 ? matched : scopePool
// so a node whose matchers hit nothing silently inherited its ENTIRE submodule
// pool. Hour of Acceptance matched 0 of 43 rows and rendered twenty generic
// Salah tasks; Isha (Taraweeh) matched 0 of 45 and did the same. Showing
// another practice's content is worse than showing none — the empty states
// already exist (MirrorCard, NodePhaseSlideUp) — so the fallback is gone.
//
// These guards pin that: matching still works, non-matching yields nothing, and
// the pool the fallback would have leaked is genuinely in scope (otherwise an
// empty result would prove nothing).

import { describe, it, expect } from 'vitest';
import { buildTasksForNode } from '../prophetic-path-submodules';

// faith-salah is in scope for both nodes under test; `salat` is the legacy
// project moduleId that MODULE_ID_TO_SUBMODULE_ID maps onto it.
const BOARD_ID = 'faith_salah_growth';
const PROJECTS = [{ id: BOARD_ID, moduleId: 'salat', name: 'Salah' }];

const row = (title) => ({ id: title, title, priority: 'medium', columnId: 'todo', subtasks: [] });

const titlesFor = (nodeId, tasks) =>
  buildTasksForNode(nodeId, PROJECTS, { [BOARD_ID]: tasks }).map((r) => r.title);

const IN_SCOPE_BUT_UNRELATED = 'Establish all five daily prayers on time consistently';

describe('a node whose matchers hit nothing renders nothing', () => {
  it('keeps a row whose title the node actually matches', () => {
    // Precondition: scope resolution works, so an empty result below is the
    // matcher stage doing its job and not a broken project→submodule join.
    const matching = 'Make duʿaʾ in the hour of acceptance before Maghrib on Friday';
    expect(titlesFor('istijabah-hour', [row(matching)])).toEqual([matching]);
  });

  it('drops an in-scope row the node does not match, instead of falling back', () => {
    // The same board, the same scope — only the title differs. Under the old
    // fallback this returned the row (and every other one on the board).
    expect(titlesFor('istijabah-hour', [row(IN_SCOPE_BUT_UNRELATED)])).toEqual([]);
  });

  it('returns [] rather than the pool when no row matches at all', () => {
    const pool = [
      row(IN_SCOPE_BUT_UNRELATED),
      row('Memorise the adhkar recited in salah (Subhanaka, Tashahhud, Salawat)'),
      row('Learn the fiqh of wudu and its nullifiers'),
    ];
    expect(titlesFor('istijabah-hour', pool)).toEqual([]);
  });

  // Isha (Taraweeh)'s only taraweeh text is a SUBTASK, and titleMatches() reads
  // the title alone — so without an `observe ramadan` matcher this node emptied
  // out the moment the fallback was removed.
  it('matches Isha (Taraweeh) on its parent Ramadan task', () => {
    const ramadan = 'Observe Ramadan with the Prophet’s ﷺ structure';
    expect(titlesFor('isha-taraweeh', [row(ramadan)])).toEqual([ramadan]);
  });
});
