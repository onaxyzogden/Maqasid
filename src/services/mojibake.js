// Mojibake reversal for task/subtask titles.
//
// Some persisted titles were saved while the seed files were double-encoded:
// original UTF-8 bytes had been decoded as cp1252 and re-stored, so e.g. the
// arrow U+2192 became the three chars U+00E2 U+2020 U+2019 ("a-circumflex,
// dagger, right-quote"). The seed FILES were later repaired, but the persisted
// title is the join key that hydrates seed content by title
// (seed-hydrator.js) -- a stale corrupt title no longer matches the clean seed
// title, so the task is served bare. This module reverses that exact
// corruption on the stored title so the join re-matches.
//
// The reversal is the deterministic inverse of the original damage: strip a
// leading UTF-8 BOM, map each char back to its single cp1252 byte, then decode
// those bytes as UTF-8 (fatal). Three guard gates make it a STRICT no-op on
// anything that is not this precise corruption -- clean ASCII, an
// already-clean arrow, Arabic script, accented Latin-1 that is not a mojibake
// sequence, lone smart quotes / dashes, the BBOS middle dot, etc. Nothing is
// invented or approximated; a string that does not round-trip is returned
// unchanged.
//
// Pure and dependency-free (no localStorage / DOM) so it is unit-testable in
// the `node` test environment and safe to call from a pre-mount migration.

// Unicode code point -> cp1252 byte, for the cp1252 "high" glyphs that live
// outside the Latin-1 (0xA0-0xFF) range. The 0xA0-0xFF tail maps as identity
// and is handled by a range check, not this table.
const CP1252_HIGH = {
  0x20ac: 0x80, 0x201a: 0x82, 0x0192: 0x83, 0x201e: 0x84, 0x2026: 0x85,
  0x2020: 0x86, 0x2021: 0x87, 0x02c6: 0x88, 0x2030: 0x89, 0x0160: 0x8a,
  0x2039: 0x8b, 0x0152: 0x8c, 0x017d: 0x8e, 0x2018: 0x91, 0x2019: 0x92,
  0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
  0x02dc: 0x98, 0x2122: 0x99, 0x0161: 0x9a, 0x203a: 0x9b, 0x0153: 0x9c,
  0x017e: 0x9e, 0x0178: 0x9f,
};

// The five cp1252 bytes that are undefined in cp1252 and were preserved as
// identity code points by the lenient decoder that caused the damage.
const C1_IDENTITY = new Set([0x81, 0x8d, 0x8f, 0x90, 0x9d]);

/**
 * Reverse cp1252-over-UTF-8 mojibake in a single string. Strict no-op on
 * anything that is not exactly this corruption (returns the original string).
 * @param {string} str
 * @returns {string}
 */
export function repairMojibake(str) {
  if (typeof str !== "string" || str.length === 0) return str;
  const s = str.charCodeAt(0) === 0xfeff ? str.slice(1) : str; // strip UTF-8 BOM
  const bytes = new Uint8Array(s.length);
  let sawHigh = false;
  for (let i = 0; i < s.length; i++) {
    const cp = s.charCodeAt(i);
    let byte;
    if (cp <= 0x7f || (cp >= 0xa0 && cp <= 0xff)) {
      byte = cp;
      if (cp >= 0x80) sawHigh = true;
    } else if (C1_IDENTITY.has(cp)) {
      byte = cp;
      sawHigh = true;
    } else if (CP1252_HIGH[cp] !== undefined) {
      byte = CP1252_HIGH[cp];
      sawHigh = true;
    } else {
      return str; // char not representable in cp1252 -> not this mojibake
    }
    bytes[i] = byte;
  }
  if (!sawHigh) return str; // pure ASCII -> strict no-op
  try {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    return decoded !== s ? decoded : str;
  } catch {
    return str; // bytes are not valid UTF-8 -> not this mojibake
  }
}

// ---- Board-level repair + loss-proof dedup ------------------------------

// Has the operator put any of themselves into this SUBTASK row? Exported so the
// subtask prune in migration.js decides deletion with the same predicate the
// dedup uses, rather than a second copy that could drift from it.
export function subtaskHasState(st) {
  return Boolean(st.done || st.notApplicable || st.snoozedUntilDayKey);
}

// Has the operator put any of themselves into this task? Used here to pick the
// survivor of a title collision, and by the seed-dedupe prune in migration.js to
// decide whether a de-duplicated task is safe to delete. Deliberately generous:
// a false positive only leaves a stale row the operator can delete by hand, a
// false negative destroys their work.
export function taskHasState(task, boardId) {
  if (!task) return false;
  if (task.completedAt || task.dueDate || task.notes) return true;
  if (Array.isArray(task.checklist) && task.checklist.length) return true;
  if (Array.isArray(task.attachments) && task.attachments.length) return true;
  if (task.columnId && task.columnId !== "col_" + boardId + "_to_do") return true;
  if (Array.isArray(task.subtasks) && task.subtasks.some(subtaskHasState)) return true;
  return false;
}

// Pick the survivor of a title-collision group: a stateful item beats a
// stateless one; within the chosen pool, smallest `order` wins, ties broken by
// earliest `createdAt`, then by first-encountered.
function pickSurvivor(group, hasStateFn) {
  const stateful = group.filter(hasStateFn);
  const pool = stateful.length ? stateful : group;
  return pool.reduce((best, cur) => {
    const bo = Number.isFinite(best.order) ? best.order : Infinity;
    const co = Number.isFinite(cur.order) ? cur.order : Infinity;
    if (co !== bo) return co < bo ? cur : best;
    const bc = typeof best.createdAt === "string" ? best.createdAt : "";
    const cc = typeof cur.createdAt === "string" ? cur.createdAt : "";
    if (cc && bc && cc !== bc) return cc < bc ? cur : best;
    if (cc && !bc) return cur;
    return best;
  });
}

// Merge subtask state (done / notApplicable / snooze) from `loser` into a
// mutable survivor subtask, never losing a completion or a snooze.
function foldSubtaskState(cur, loser) {
  return {
    ...cur,
    done: Boolean(cur.done || loser.done),
    notApplicable: Boolean(cur.notApplicable || loser.notApplicable),
    snoozedUntilDayKey:
      cur.snoozedUntilDayKey != null ? cur.snoozedUntilDayKey : loser.snoozedUntilDayKey,
  };
}

// Dedup subtasks by title within one task; returns the same array reference
// when there are no collisions.
function dedupeSubsByTitle(subs) {
  const byTitle = new Map();
  let hasDupes = false;
  for (const st of subs) {
    if (byTitle.has(st.title)) {
      hasDupes = true;
      byTitle.get(st.title).push(st);
    } else {
      byTitle.set(st.title, [st]);
    }
  }
  if (!hasDupes) return subs;
  const out = [];
  for (const group of byTitle.values()) {
    if (group.length === 1) {
      out.push(group[0]);
      continue;
    }
    const survivor = pickSurvivor(group, subtaskHasState);
    let merged = { ...survivor };
    for (const loser of group) {
      if (loser === survivor) continue;
      merged = foldSubtaskState(merged, loser);
    }
    out.push(merged);
  }
  return out;
}

// Merge a title-collision group of tasks into one survivor, folding every
// loser's subtask state in by subtask title and appending loser-only subtasks.
function mergeTaskGroup(group, hasStateFn) {
  const survivor = pickSurvivor(group, hasStateFn);
  const survivorSubs = Array.isArray(survivor.subtasks) ? survivor.subtasks.slice() : [];
  const subIndex = new Map(survivorSubs.map((s, i) => [s.title, i]));
  for (const loser of group) {
    if (loser === survivor || !Array.isArray(loser.subtasks)) continue;
    for (const ls of loser.subtasks) {
      if (subIndex.has(ls.title)) {
        const i = subIndex.get(ls.title);
        survivorSubs[i] = foldSubtaskState(survivorSubs[i], ls);
      } else {
        subIndex.set(ls.title, survivorSubs.length);
        survivorSubs.push(ls);
      }
    }
  }
  return { ...survivor, subtasks: survivorSubs };
}

// Dedup tasks by title within one board; returns the same array reference when
// there are no collisions.
function dedupeTasksByTitle(tasks, boardId) {
  const hasState = (t) => taskHasState(t, boardId);
  const byTitle = new Map();
  let hasDupes = false;
  for (const t of tasks) {
    if (byTitle.has(t.title)) {
      hasDupes = true;
      byTitle.get(t.title).push(t);
    } else {
      byTitle.set(t.title, [t]);
    }
  }
  if (!hasDupes) return tasks;
  const out = [];
  for (const group of byTitle.values()) {
    out.push(group.length === 1 ? group[0] : mergeTaskGroup(group, hasState));
  }
  return out;
}

/**
 * Repair mojibake in every task + subtask title on a board, then dedup by
 * title (folding user state into the survivor). Returns the SAME array
 * reference when nothing changed, so callers can skip the write.
 * @param {Array} tasks
 * @param {string} boardId  e.g. "health_mental_core"
 * @returns {Array}
 */
export function repairBoardTasks(tasks, boardId) {
  if (!Array.isArray(tasks) || tasks.length === 0) return tasks;
  let changed = false;

  const repaired = tasks.map((task) => {
    const newTitle = repairMojibake(task.title);
    let newSubs = task.subtasks;
    let subsChanged = false;
    if (Array.isArray(task.subtasks)) {
      const titled = task.subtasks.map((st) => {
        const t = repairMojibake(st.title);
        if (t !== st.title) {
          subsChanged = true;
          return { ...st, title: t };
        }
        return st;
      });
      const deduped = dedupeSubsByTitle(titled);
      if (deduped !== titled) subsChanged = true;
      newSubs = deduped;
    }
    if (newTitle !== task.title || subsChanged) {
      changed = true;
      return { ...task, title: newTitle, subtasks: newSubs };
    }
    return task;
  });

  const deduped = dedupeTasksByTitle(repaired, boardId);
  if (deduped !== repaired) changed = true;

  return changed ? deduped : tasks;
}
