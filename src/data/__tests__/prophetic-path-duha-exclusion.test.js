import { describe, it, expect, beforeAll } from 'vitest';
import { buildTasksForNode } from '../prophetic-path-submodules';
import { hydrateTasks, preloadBoardSeeds } from '../../services/seed-hydrator';

// Regression: "Sit in remembrance after Fajr until sunrise (Ishraq reward)"
// surfaced on the Duha node because its title carries the word "ishraq", which
// is one of Duha's content-matchers. `belongsToPrayerNode` was written to trim
// it via the seed's `prayer:fajr` tag — but boards written BEFORE that tag
// landed keep an untagged copy forever, because nothing refreshed `task.tags`.
// The fix unions seed tags in at hydration time; these tests pin both halves.

const BOARD_ID = 'faith_salah_growth';
const ISHRAQ_TITLE = 'Sit in remembrance after Fajr until sunrise (Ishraq reward)';
const PROJECTS = [{ id: BOARD_ID, moduleId: 'salat', name: 'Salah' }];

// A row as an old board holds it: same title, no routing tags.
const storedRow = () => ({
  id: 'stored-ishraq',
  title: ISHRAQ_TITLE,
  priority: 'medium',
  columnId: 'todo',
  subtasks: [],
});

const titlesFor = (nodeId, tasks) =>
  buildTasksForNode(nodeId, PROJECTS, { [BOARD_ID]: tasks }).map((r) => r.title);

describe('Duha node excludes the Fajr Ishraq task', () => {
  beforeAll(async () => {
    await preloadBoardSeeds(BOARD_ID);
  });

  it('matches Duha on title alone when the row carries no prayer tag', () => {
    // Not the desired behaviour — the precondition that makes the bug possible.
    // If this ever stops holding, the matcher changed and the guard below is
    // no longer what is doing the work.
    expect(titlesFor('duha', [storedRow()])).toContain(ISHRAQ_TITLE);
  });

  it('gives the stored row the seed prayer:fajr tag on hydration', () => {
    const [hydrated] = hydrateTasks([storedRow()], BOARD_ID);
    expect(hydrated.tags).toContain('prayer:fajr');
  });

  it('drops the hydrated row from the Duha node', () => {
    const hydrated = hydrateTasks([storedRow()], BOARD_ID);
    expect(titlesFor('duha', hydrated)).not.toContain(ISHRAQ_TITLE);
  });

  it('keeps the hydrated row on the Fajr node it belongs to', () => {
    const hydrated = hydrateTasks([storedRow()], BOARD_ID);
    expect(titlesFor('fajr', hydrated)).toContain(ISHRAQ_TITLE);
  });

  it('never drops a tag the operator added by hand', () => {
    const custom = { ...storedRow(), tags: ['my-own-tag'] };
    const [hydrated] = hydrateTasks([custom], BOARD_ID);
    expect(hydrated.tags).toContain('my-own-tag');
    expect(hydrated.tags).toContain('prayer:fajr');
  });
});
