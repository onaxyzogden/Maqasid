#!/usr/bin/env node
// Extract every (parentTitle, subtaskTitle, ref, kind, translation, currentRationale)
// triple for a given pillar and write to scripts/.rationale-work/<pillar>.jsonl.
// Each line is a self-contained job for the rationale-enrichment batcher.
//
// Usage: node scripts/rationale-survey.mjs --pillar=intellect

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const pillar = args.pillar;
if (!pillar) { console.error('Usage: --pillar=<id>'); process.exit(2); }

const PILLARS = {
  faith: 'FAITH_SEED_TASKS', health: 'HEALTH_SEED_TASKS', intellect: 'INTELLECT_SEED_TASKS',
  family: 'FAMILY_SEED_TASKS', wealth: 'WEALTH_SEED_TASKS', environment: 'ENVIRONMENT_SEED_TASKS',
  ummah: 'UMMAH_SEED_TASKS', prayer: 'PRAYER_SEED_TASKS',
};
const exportName = PILLARS[pillar];
if (!exportName) { console.error(`unknown pillar: ${pillar}`); process.exit(2); }

const file = path.join(ROOT, 'src/data/seed-tasks', `${pillar}-seed-tasks.js`);
const url = pathToFileURL(file).href;
const mod = await import(url);
const data = mod[exportName];

const STUB_PATTERNS = [
  /^Prophetic narration cited as evidence/i,
  /^Quranic basis cited as evidence/i,
  /^Quranic verse cited as evidence/i,
  /^Hadith cited as evidence/i,
  /^Cited inline /i,
  /^Hadith cited inline /i,
  /^Quran ayah cited inline /i,
  /^Verse cited inline /i,
  /backfilled into structured sources/i,
  /^Cited as evidence for this subtask\.?$/i,
];

const isStub = (r) => STUB_PATTERNS.some(p => p.test((r || '').trim()));

const outDir = path.join(__dirname, '.rationale-work');
fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, `${pillar}.jsonl`);
const stream = fs.createWriteStream(outFile, { flags: 'w' });

let total = 0, stubs = 0, jobId = 0;
for (const [boardKey, tasks] of Object.entries(data)) {
  if (!Array.isArray(tasks)) continue;
  tasks.forEach((task, ti) => {
    (task.subtasks || []).forEach((sub, si) => {
      if (!Array.isArray(sub.sources)) return;
      sub.sources.forEach((entry, ei) => {
        total++;
        if (!isStub(entry.rationale)) return;
        stubs++;
        jobId++;
        const job = {
          id: jobId,
          pillar,
          boardKey,
          taskTitle: task.title,
          subtaskTitle: sub.title,
          subtaskDescription: (sub.description || '').slice(0, 400),
          ref: entry.ref,
          kind: entry.kind,
          translation: (entry.translation || '').slice(0, 500),
          currentRationale: entry.rationale,
          anchor: { ti, si, ei },
        };
        stream.write(JSON.stringify(job) + '\n');
      });
    });
  });
}
stream.end();
console.log(`Wrote ${stubs} stub jobs (of ${total} total entries) → ${path.relative(ROOT, outFile)}`);
