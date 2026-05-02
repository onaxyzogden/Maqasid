// Extract Ummah pillar review worklist:
//  (a) every subtask whose source array contains a `ratNote`
//  (b) every subtask whose source array has exactly one entry
// Emit a markdown checklist grouped by submodule for batched NotebookLM probes.

import { UMMAH_SEED_TASKS } from "../src/data/seed-tasks/ummah-seed-tasks.js";
import fs from "node:fs";

const rows = [];

for (const [boardId, tasks] of Object.entries(UMMAH_SEED_TASKS)) {
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
        sources: sources.map(s => ({
          kind: s.kind,
          ref: s.ref,
          grade: s.hadithGrade ?? null,
          provenanceTier: s.provenanceTier,
          relevance: s.relevance,
          ratNote: s.ratNote ?? null,
        })),
        flags: { ratNote: hasRatNote, single: isSingle },
      });
    }
  }
}

// Group by board
const byBoard = {};
for (const r of rows) {
  (byBoard[r.board] ||= []).push(r);
}

const lines = [];
lines.push("# Ummah Pillar — Launch-Readiness Review Worklist");
lines.push("");
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push(`Total entries: **${rows.length}**`);
lines.push(`  - With ratNote: ${rows.filter(r => r.flags.ratNote).length}`);
lines.push(`  - Single-source: ${rows.filter(r => r.flags.single).length}`);
lines.push(`  - Both (ratNote AND single): ${rows.filter(r => r.flags.ratNote && r.flags.single).length}`);
lines.push("");
lines.push("Verdict legend: `verified` | `defect:ref` | `defect:grade` | `defect:translation` | `defect:relevance`");
lines.push("");

for (const board of Object.keys(byBoard).sort()) {
  const entries = byBoard[board];
  lines.push(`## ${board} (${entries.length})`);
  lines.push("");
  for (const e of entries) {
    const flagTags = [];
    if (e.flags.ratNote) flagTags.push("`ratNote`");
    if (e.flags.single) flagTags.push("`single-source`");
    lines.push(`- [ ] **${e.parentTitle}** › *${e.subTitle}* — ${flagTags.join(" ")}`);
    for (const s of e.sources) {
      const meta = [s.kind, s.ref, s.grade, s.provenanceTier, s.relevance].filter(Boolean).join(" · ");
      lines.push(`  - ${meta}`);
      if (s.ratNote) lines.push(`    - ratNote: ${s.ratNote}`);
    }
    lines.push(`  - **Verdict:** _pending_`);
  }
  lines.push("");
}

fs.mkdirSync("tasks", { recursive: true });
fs.writeFileSync("tasks/ummah-review-worklist.md", lines.join("\n"));
console.log(`Wrote tasks/ummah-review-worklist.md`);
console.log(`Total: ${rows.length}`);
console.log(`  ratNote: ${rows.filter(r => r.flags.ratNote).length}`);
console.log(`  single-source: ${rows.filter(r => r.flags.single).length}`);
console.log(`  both: ${rows.filter(r => r.flags.ratNote && r.flags.single).length}`);
console.log(`  unique union: ${rows.length}`);
