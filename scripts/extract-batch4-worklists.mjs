import { INTELLECT_SEED_TASKS } from "../src/data/seed-tasks/intellect-seed-tasks.js";
import { FAMILY_SEED_TASKS } from "../src/data/seed-tasks/family-seed-tasks.js";
import { WEALTH_SEED_TASKS } from "../src/data/seed-tasks/wealth-seed-tasks.js";
import { ENVIRONMENT_SEED_TASKS } from "../src/data/seed-tasks/environment-seed-tasks.js";
import fs from "node:fs";

const PILLARS = [
  { name: "intellect", code: "I", data: INTELLECT_SEED_TASKS },
  { name: "family", code: "F", data: FAMILY_SEED_TASKS },
  { name: "wealth", code: "W", data: WEALTH_SEED_TASKS },
  { name: "environment", code: "E", data: ENVIRONMENT_SEED_TASKS },
];

for (const p of PILLARS) {
  const counts = new Map();
  const samples = new Map();
  const entries = [];
  let totalSubs = 0;
  for (const tasks of Object.values(p.data)) {
    for (const task of tasks) {
      if (!Array.isArray(task.subtasks)) continue;
      for (const sub of task.subtasks) {
        totalSubs++;
        const sources = Array.isArray(sub.sources) ? sub.sources : [];
        const hasRatNote = sources.some(s => s && typeof s.ratNote === "string");
        const isSingle = sources.length === 1;
        if (!hasRatNote && !isSingle) continue;
        entries.push({ title: sub.title, hasRatNote, isSingle, refs: sources.map(s => ({ kind: s.kind, ref: s.ref })) });
        for (const s of sources) {
          if (!s.ref) continue;
          counts.set(s.ref, (counts.get(s.ref) || 0) + 1);
          if (!samples.has(s.ref)) samples.set(s.ref, { kind: s.kind, sample: sub.title.slice(0, 80) });
        }
      }
    }
  }
  const arr = [...counts.entries()]
    .map(([ref, n]) => ({ ref, kind: samples.get(ref).kind, n, sample: samples.get(ref).sample }))
    .sort((a, b) => b.n - a.n);
  fs.writeFileSync(`tasks/${p.name}-ref-index.json`, JSON.stringify(arr, null, 1));
  fs.writeFileSync(`tasks/${p.name}-review-worklist.md`,
    `# ${p.name} Pillar — Weak Entries Worklist\n\n` +
    `Total subtasks: ${totalSubs}\n` +
    `Weak entries: ${entries.length}\n` +
    `Unique refs: ${arr.length}\n` +
    `High-freq (n>=2): ${arr.filter(x => x.n >= 2).length}\n` +
    `Long-tail (n=1): ${arr.filter(x => x.n === 1).length}\n`);
  console.log(`\n=== ${p.name.toUpperCase()} ===`);
  console.log(`subtasks=${totalSubs} weak=${entries.length} refs=${arr.length}`);
  console.log("high-freq (n>=2):");
  arr.filter(x => x.n >= 2).forEach(x => console.log(`  n=${x.n} ${x.kind} ${x.ref}`));
}
