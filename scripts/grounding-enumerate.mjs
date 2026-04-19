// One-shot enumerator — dumps every subtask idPath + titles for a pillar.
// Usage: node scripts/grounding-enumerate.mjs faith > artifacts/grounding-pilot/faith-queue.json
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const pillar = process.argv[2];
if (!pillar) {
  console.error("usage: node scripts/grounding-enumerate.mjs <pillar>");
  process.exit(2);
}

const seedPath = resolve(`src/data/seed-tasks/${pillar}-seed-tasks.js`);
const mod = await import(pathToFileURL(seedPath).href);
const exportKey = Object.keys(mod).find((k) => k.endsWith("_SEED_TASKS"));
const seed = mod[exportKey];

const out = [];
for (const [moduleKey, tasks] of Object.entries(seed)) {
  tasks.forEach((task, tIdx) => {
    (task.subtasks ?? []).forEach((subtask, sIdx) => {
      out.push({
        idPath: `${pillar}.${moduleKey}[${tIdx}].subtasks[${sIdx}]`,
        moduleKey,
        taskIndex: tIdx,
        subtaskIndex: sIdx,
        taskTitle: task.title,
        subtaskTitle: subtask.title,
        hasLegacySources: typeof subtask.sources === "string" && subtask.sources.length > 0,
      });
    });
  });
}

process.stdout.write(JSON.stringify({ pillar, total: out.length, subtasks: out }, null, 2));
