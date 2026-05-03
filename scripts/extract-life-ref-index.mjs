import { HEALTH_SEED_TASKS } from "../src/data/seed-tasks/health-seed-tasks.js";
import fs from "node:fs";

const counts = new Map();
const samples = new Map();
for (const tasks of Object.values(HEALTH_SEED_TASKS)) {
  for (const task of tasks) {
    if (!Array.isArray(task.subtasks)) continue;
    for (const sub of task.subtasks) {
      const sources = Array.isArray(sub.sources) ? sub.sources : [];
      const hasRatNote = sources.some(s => s && typeof s.ratNote === "string");
      const isSingle = sources.length === 1;
      if (!hasRatNote && !isSingle) continue;
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
fs.writeFileSync("tasks/life-ref-index.json", JSON.stringify(arr, null, 1));
console.log("unique refs:", arr.length);
console.log("top frequency (n>=2):");
arr.filter(x => x.n >= 2).forEach(x => console.log("  n=" + x.n, x.kind, x.ref));
console.log("long-tail n=1:", arr.filter(x => x.n === 1).length);
