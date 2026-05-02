// Group the Faith review worklist into NotebookLM probe batches.
// Priority bands: (1) ratNote AND single-source, (2) ratNote-only, (3) single-only.
// Each batch is ≤5 entries with compact ref+context for one-shot probes.

import { FAITH_SEED_TASKS } from "../src/data/seed-tasks/faith-seed-tasks.js";
import fs from "node:fs";

const rows = [];
for (const [boardId, tasks] of Object.entries(FAITH_SEED_TASKS)) {
  for (const task of tasks) {
    if (!Array.isArray(task.subtasks)) continue;
    for (const sub of task.subtasks) {
      const sources = Array.isArray(sub.sources) ? sub.sources : [];
      const hasRatNote = sources.some(s => s && typeof s.ratNote === "string");
      const isSingle = sources.length === 1;
      if (!hasRatNote && !isSingle) continue;
      rows.push({
        board: boardId,
        parentTitle: task.title,
        subTitle: sub.title,
        sources,
        flags: { ratNote: hasRatNote, single: isSingle },
      });
    }
  }
}

const both = rows.filter(r => r.flags.ratNote && r.flags.single);
const ratOnly = rows.filter(r => r.flags.ratNote && !r.flags.single);
const singleOnly = rows.filter(r => !r.flags.ratNote && r.flags.single);

function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

function fmtEntry(idx, e) {
  const lines = [`(${idx}) [${e.board}] "${e.parentTitle}" → "${e.subTitle}"`];
  e.sources.forEach((s, i) => {
    const meta = `${s.kind}=${s.ref}` + (s.hadithGrade ? ` (${s.hadithGrade})` : "");
    lines.push(`    src${i + 1}: ${meta}`);
    if (s.ratNote) lines.push(`    ratNote: ${s.ratNote}`);
  });
  return lines.join("\n");
}

const out = [];
out.push("# Faith Review — NotebookLM Probe Batches\n");
out.push(`Total: ${rows.length} (both: ${both.length}, ratNote-only: ${ratOnly.length}, single-only: ${singleOnly.length})\n`);

let batchN = 0;
function emitBand(name, items) {
  out.push(`\n## Band: ${name} (${items.length} entries)\n`);
  for (const c of chunk(items, 5)) {
    batchN++;
    out.push(`### Batch ${batchN} (${c.length} entries)\n`);
    c.forEach((e, i) => out.push(fmtEntry(i + 1, e)));
    out.push("");
  }
}

emitBand("ratNote AND single-source (highest risk)", both);
emitBand("ratNote only", ratOnly);
emitBand("single-source only", singleOnly);

fs.writeFileSync("tasks/faith-review-batches.md", out.join("\n"));
console.log(`Wrote tasks/faith-review-batches.md (${batchN} batches)`);
