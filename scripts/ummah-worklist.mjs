// One-shot: build ummah-worklist.md listing every subtask that is
// (a) flagged with `ratNote`, or (b) supported by a single source. Output
// also includes a unique-ref frequency map for cross-pillar dedup planning.

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PILLARS = [
  ['faith', 'FAITH_SEED_TASKS'],
  ['health', 'HEALTH_SEED_TASKS'],
  ['intellect', 'INTELLECT_SEED_TASKS'],
  ['family', 'FAMILY_SEED_TASKS'],
  ['wealth', 'WEALTH_SEED_TASKS'],
  ['environment', 'ENVIRONMENT_SEED_TASKS'],
  ['ummah', 'UMMAH_SEED_TASKS'],
  ['ummah', 'UMMAH_SEED_TASKS'],
  ['prayer', 'PRAYER_SEED_TASKS'],
];

async function loadAll() {
  const out = {};
  for (const [id, exportName] of PILLARS) {
    const url = pathToFileURL(resolve(ROOT, 'src/data/seed-tasks', `${id}-seed-tasks.js`)).href;
    const mod = await import(url);
    out[id] = mod[exportName];
  }
  return out;
}

function walk(pillarId, data) {
  const items = [];
  for (const [boardKey, tasks] of Object.entries(data)) {
    if (!Array.isArray(tasks)) continue;
    tasks.forEach((task, ti) => {
      const subs = Array.isArray(task?.subtasks) ? task.subtasks : [];
      subs.forEach((sub, si) => {
        items.push({
          pillar: pillarId,
          boardKey,
          taskIndex: ti,
          subtaskIndex: si,
          taskTitle: task.title || '',
          subtaskTitle: sub.title || '',
          sources: Array.isArray(sub.sources) ? sub.sources : [],
          ratNote: sub.ratNote || null,
        });
      });
    });
  }
  return items;
}

const all = await loadAll();
const ummah = walk('ummah', all.ummah);

const ratNote = ummah.filter(s => s.ratNote);
const single = ummah.filter(s => s.sources.length === 1);
const worklistMap = new Map();
for (const item of [...ratNote, ...single]) {
  const key = `${item.boardKey}[${item.taskIndex}].subtasks[${item.subtaskIndex}]`;
  if (!worklistMap.has(key)) {
    worklistMap.set(key, { ...item, reasons: [] });
  }
  const entry = worklistMap.get(key);
  if (item.ratNote && !entry.reasons.includes('ratNote')) entry.reasons.push('ratNote');
  if (item.sources.length === 1 && !entry.reasons.includes('single-source')) entry.reasons.push('single-source');
}
const worklist = [...worklistMap.values()];

// Cross-pillar ref frequency
const refCount = new Map();
const refPillars = new Map();
for (const [pid, data] of Object.entries(all)) {
  for (const item of walk(pid, data)) {
    for (const src of item.sources) {
      const ref = src.ref;
      if (!ref) continue;
      refCount.set(ref, (refCount.get(ref) || 0) + 1);
      if (!refPillars.has(ref)) refPillars.set(ref, new Set());
      refPillars.get(ref).add(pid);
    }
  }
}

// Tag worklist items: which of their refs already verified in another pillar?
for (const item of worklist) {
  item.refStatus = item.sources.map(s => {
    const pillars = refPillars.get(s.ref) || new Set();
    const otherPillars = [...pillars].filter(p => p !== 'ummah');
    return {
      ref: s.ref,
      kind: s.kind,
      tier: s.provenanceTier,
      relevance: s.relevance,
      verifiedElsewhere: otherPillars.length > 0,
      otherPillars,
    };
  });
}

const lines = [];
lines.push('# Ummah Grounding Worklist');
lines.push('');
lines.push(`Generated 2026-05-03. Source: \`src/data/seed-tasks/ummah-seed-tasks.js\` (${ummah.length} subtasks total).`);
lines.push('');
lines.push(`- ratNote-flagged: **${ratNote.length}**`);
lines.push(`- single-source:   **${single.length}**`);
lines.push(`- unique union:    **${worklist.length}**`);
lines.push('');
lines.push('Cross-pillar dedup: any worklist source whose `ref` already appears in another pillar (Faith, Ummah, Health, Intellect, Family, Wealth, Environment, Prayer) is tagged `[verified-elsewhere]` — these can skip a fresh NotebookLM probe and inherit the prior verdict.');
lines.push('');
lines.push('---');
lines.push('');

const byBoard = new Map();
for (const item of worklist) {
  if (!byBoard.has(item.boardKey)) byBoard.set(item.boardKey, []);
  byBoard.get(item.boardKey).push(item);
}

for (const [board, items] of [...byBoard.entries()].sort()) {
  lines.push(`## ${board}  (${items.length} items)`);
  lines.push('');
  for (const item of items) {
    lines.push(`### ${item.boardKey}[${item.taskIndex}].subtasks[${item.subtaskIndex}] — ${item.subtaskTitle}`);
    lines.push(`- Task: *${item.taskTitle}*`);
    lines.push(`- Reasons: ${item.reasons.join(', ')}`);
    if (item.ratNote) lines.push(`- ratNote: ${item.ratNote}`);
    lines.push(`- Sources (${item.sources.length}):`);
    for (const r of item.refStatus) {
      const tag = r.verifiedElsewhere ? `[verified-elsewhere: ${r.otherPillars.join(',')}]` : '[novel]';
      lines.push(`  - \`${r.ref}\` (${r.kind}, ${r.tier}/${r.relevance}) ${tag}`);
    }
    lines.push('');
  }
}

const novelCount = worklist.filter(i => i.refStatus.every(r => !r.verifiedElsewhere)).length;
const allVerifiedElsewhere = worklist.filter(i => i.refStatus.every(r => r.verifiedElsewhere)).length;
const mixed = worklist.length - novelCount - allVerifiedElsewhere;

lines.push('---');
lines.push('');
lines.push('## Probe Plan Summary');
lines.push('');
lines.push(`- **Skip (all refs verified-elsewhere)**: ${allVerifiedElsewhere}`);
lines.push(`- **Probe (all refs novel)**: ${novelCount}`);
lines.push(`- **Partial probe (mixed)**: ${mixed}`);
lines.push(`- **Total NotebookLM probes needed**: ${novelCount + mixed}`);

const outDir = resolve(ROOT, 'tasks');
await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, 'ummah-worklist.md'), lines.join('\n') + '\n', 'utf8');
console.log(`Wrote tasks/ummah-worklist.md`);
console.log(`  ratNote: ${ratNote.length}, single-source: ${single.length}, union: ${worklist.length}`);
console.log(`  skip: ${allVerifiedElsewhere}, probe: ${novelCount}, partial: ${mixed}`);
