import { describe, it, expect } from "vitest";
import { repairMojibake, repairBoardTasks } from "../mojibake";

// Exotic fixtures are literal UTF-8 glyphs, kept honest by construction: the
// reversal assertions below are non-self-referential -- repairMojibake(MOJI_*)
// must equal an independently-written clean glyph -- so any future mis-encode
// of a fixture turns the suite red instead of passing silently. Each line
// names its intended code point.
const ARROW = "→"; // U+2192 rightwards arrow
const MOJI_ARROW = "â†’"; // cp1252-over-UTF-8 mojibake of U+2192
const MOJI_EURO = "â‚¬"; // mojibake of U+20AC euro sign
const MOJI_EACUTE = "Ã©"; // mojibake of U+00E9 e-acute
const MOJI_RSQUO = "â€™"; // mojibake of U+2019 right single quote

describe("repairMojibake — reversal", () => {
  it("reverses the arrow mojibake to a clean arrow", () => {
    expect(repairMojibake(MOJI_ARROW)).toBe(ARROW);
  });

  it("reverses every arrow in a full task title", () => {
    const clean =
      "Establish a morning routine: Fajr " +
      ARROW +
      " Quran (minimum 1 page) " +
      ARROW +
      " morning adhkar " +
      ARROW +
      " journal";
    const moji = clean.split(ARROW).join(MOJI_ARROW);
    expect(repairMojibake(moji)).toBe(clean);
  });

  it("reverses euro, e-acute, and right-single-quote mojibake", () => {
    expect(repairMojibake(MOJI_EURO)).toBe("€");
    expect(repairMojibake(MOJI_EACUTE)).toBe("é");
    expect(repairMojibake(MOJI_RSQUO)).toBe("’");
  });

  it("is idempotent (a repaired string repairs to itself)", () => {
    const once = repairMojibake(MOJI_ARROW);
    expect(repairMojibake(once)).toBe(once);
  });

  it("strips a leading BOM while reversing", () => {
    expect(repairMojibake("﻿" + MOJI_ARROW)).toBe(ARROW);
  });
});

describe("repairMojibake — strict no-op", () => {
  const cases = {
    "empty string": "",
    "plain ASCII": "Write out the exact sequence",
    "already-clean arrow": "Fajr " + ARROW + " Quran",
    "Arabic script": "قرآن", // qaf ra alef noon
    "accented Latin (Cafe)": "Café", // lone 0xE9 is invalid UTF-8
    "smart-quote Quran": "Qur’an", // lone 0x92 continuation byte
    "em-dash": "—",
    "BBOS middle dot": "·",
  };
  for (const [name, input] of Object.entries(cases)) {
    it(`leaves ${name} unchanged`, () => {
      expect(repairMojibake(input)).toBe(input);
    });
  }

  it("returns non-string input unchanged", () => {
    expect(repairMojibake(null)).toBe(null);
    expect(repairMojibake(undefined)).toBe(undefined);
  });
});

describe("repairBoardTasks — dedup + merge", () => {
  const boardId = "health_mental_core";
  const toDo = "col_" + boardId + "_to_do";
  const clean = "Fajr " + ARROW + " Quran";
  const moji = "Fajr " + MOJI_ARROW + " Quran";

  it("done survives: orphan (stateful, mojibake title) beats clean stateless dupe", () => {
    const orphan = {
      id: "t_orphan",
      title: moji,
      order: 0,
      columnId: toDo,
      subtasks: [{ id: "s1", title: "step one", done: true }],
    };
    const dupe = {
      id: "t_dupe",
      title: clean,
      order: 5,
      columnId: toDo,
      subtasks: [{ id: "s1b", title: "step one", done: false }],
    };
    const out = repairBoardTasks([orphan, dupe], boardId);
    expect(out).toHaveLength(1);
    expect(out[0].title).toBe(clean);
    expect(out[0].id).toBe("t_orphan");
    expect(out[0].subtasks.find((s) => s.title === "step one").done).toBe(true);
  });

  it("folds a moved column (stateful) survivor over a to-do dupe", () => {
    const done = {
      id: "t_done",
      title: clean,
      order: 0,
      columnId: "col_" + boardId + "_done",
      subtasks: [],
    };
    const fresh = { id: "t_fresh", title: clean, order: 9, columnId: toDo, subtasks: [] };
    const out = repairBoardTasks([fresh, done], boardId);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("t_done");
  });

  it("appends a loser-only subtask into the survivor", () => {
    const survivor = {
      id: "a",
      title: clean,
      order: 0,
      columnId: "col_" + boardId + "_done",
      subtasks: [{ id: "s1", title: "step one", done: true }],
    };
    const loser = {
      id: "b",
      title: clean,
      order: 3,
      columnId: toDo,
      subtasks: [
        { id: "s1b", title: "step one", done: false },
        { id: "s2", title: "step two", done: true },
      ],
    };
    const out = repairBoardTasks([survivor, loser], boardId);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("a");
    const two = out[0].subtasks.find((s) => s.title === "step two");
    expect(two).toBeTruthy();
    expect(two.done).toBe(true);
  });

  it("both-stateful tie-break picks earliest createdAt", () => {
    const a = {
      id: "a",
      title: "X",
      order: 0,
      completedAt: "2026-01-02",
      createdAt: "2026-01-02",
      columnId: toDo,
      subtasks: [],
    };
    const b = {
      id: "b",
      title: "X",
      order: 0,
      completedAt: "2026-01-01",
      createdAt: "2026-01-01",
      columnId: toDo,
      subtasks: [],
    };
    const out = repairBoardTasks([a, b], boardId);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("b");
  });

  it("preserves a snooze when folding losers", () => {
    const stateful = {
      id: "a",
      title: clean,
      order: 0,
      columnId: "col_" + boardId + "_done",
      subtasks: [{ id: "s1", title: "step one", snoozedUntilDayKey: "2026-08-01" }],
    };
    const dupe = {
      id: "b",
      title: clean,
      order: 2,
      columnId: toDo,
      subtasks: [{ id: "s1b", title: "step one" }],
    };
    const out = repairBoardTasks([stateful, dupe], boardId);
    expect(out).toHaveLength(1);
    expect(out[0].subtasks.find((s) => s.title === "step one").snoozedUntilDayKey).toBe(
      "2026-08-01"
    );
  });

  it("returns the same array reference when nothing changes", () => {
    const cleanBoard = [
      {
        id: "t",
        title: "Plain ASCII title",
        order: 0,
        columnId: toDo,
        subtasks: [{ id: "s", title: "sub", done: false }],
      },
    ];
    expect(repairBoardTasks(cleanBoard, "x")).toBe(cleanBoard);
  });

  it("repairs a mojibake title with no duplicate present", () => {
    const only = [{ id: "t", title: moji, order: 0, columnId: toDo, subtasks: [] }];
    const out = repairBoardTasks(only, boardId);
    expect(out).not.toBe(only);
    expect(out[0].title).toBe(clean);
  });

  it("handles empty / non-array input", () => {
    expect(repairBoardTasks([], boardId)).toEqual([]);
    expect(repairBoardTasks(null, boardId)).toBe(null);
  });
});
