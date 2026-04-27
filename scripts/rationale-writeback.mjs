#!/usr/bin/env node
// Apply enriched rationales from scripts/.rationale-work/<pillar>.results.jsonl
// back into src/data/seed-tasks/<pillar>-seed-tasks.js.
//
// Strategy: for each result, look up the original job (jobs.jsonl) for its
// (subtaskTitle, ref, currentRationale). Locate the subtask in the file by its
// title line, then within the next ~120 lines find the structured-source entry
// containing `ref: "<ref>"` whose `rationale:` field still matches the stub
// pattern, and replace just the rationale string. Idempotent.
//
// Usage:
//   node scripts/rationale-writeback.mjs --pillar=intellect           # dry-run
//   node scripts/rationale-writeback.mjs --pillar=intellect --write   # apply

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const pillar = args.pillar;
const WRITE = !!args.write;
if (!pillar) { console.error('Usage: --pillar=<id> [--write]'); process.exit(2); }

const workDir = path.join(__dirname, '.rationale-work');
const jobsFile = path.join(workDir, `${pillar}.jsonl`);
const resultsFile = path.join(workDir, `${pillar}.results.jsonl`);
const seedFile = path.join(ROOT, 'src/data/seed-tasks', `${pillar}-seed-tasks.js`);

const jobs = new Map();
for (const line of fs.readFileSync(jobsFile, 'utf8').trim().split('\n')) {
  const j = JSON.parse(line);
  jobs.set(j.id, j);
}
const results = [];
for (const line of fs.readFileSync(resultsFile, 'utf8').trim().split('\n')) {
  if (line) results.push(JSON.parse(line));
}
console.log(`${results.length} results, ${jobs.size} original jobs`);

let src = fs.readFileSync(seedFile, 'utf8');
let applied = 0, skipped = 0, ambiguous = 0;
const skips = [];

// Escape for use inside RegExp source
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// JS-quote a string (single quotes), escaping ' and \ — matches existing file style
function jsQuote(s) {
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

for (const r of results) {
  const job = jobs.get(r.id);
  if (!job) { skipped++; skips.push({ id: r.id, reason: 'no-job' }); continue; }

  // 1. Find the subtask block by exact title match (try both quote styles)
  const titleSingle = `title: '${job.subtaskTitle.replace(/'/g, "\\'")}'`;
  const titleDouble = `title: "${job.subtaskTitle.replace(/"/g, '\\"')}"`;
  let subtaskIdx = src.indexOf(titleSingle);
  if (subtaskIdx < 0) subtaskIdx = src.indexOf(titleDouble);
  if (subtaskIdx < 0) { skipped++; skips.push({ id: r.id, reason: 'subtask-title-not-found', title: job.subtaskTitle.slice(0, 60) }); continue; }

  // 2. Limit search to the next ~12000 chars (one subtask block max)
  const blockEnd = src.indexOf('\n        {', subtaskIdx + 100); // next sibling subtask, rough
  const blockSliceEnd = blockEnd > 0 ? blockEnd : Math.min(src.length, subtaskIdx + 12000);
  const block = src.slice(subtaskIdx, blockSliceEnd);

  // 3. Find the source entry with this ref. Refs are stored as ref: "..." (double-quoted in our backfill format)
  const refSingle = `ref: '${job.ref.replace(/'/g, "\\'")}'`;
  const refDouble = `ref: "${job.ref.replace(/"/g, '\\"')}"`;
  let refOffsetInBlock = block.indexOf(refDouble);
  if (refOffsetInBlock < 0) refOffsetInBlock = block.indexOf(refSingle);
  if (refOffsetInBlock < 0) { skipped++; skips.push({ id: r.id, reason: 'ref-not-found-in-subtask', ref: job.ref, title: job.subtaskTitle.slice(0, 60) }); continue; }

  // 4. Walk BACKWARD from ref offset to find the entry's opening `{` (depth 0 at unmatched open),
  //    then FORWARD from there to find the matching closing `}`.
  let entryStart = -1, depth = 0;
  for (let i = refOffsetInBlock; i >= 0; i--) {
    const ch = block[i];
    if (ch === '}') depth++;
    else if (ch === '{') { if (depth === 0) { entryStart = i; break; } depth--; }
  }
  if (entryStart < 0) { skipped++; skips.push({ id: r.id, reason: 'entry-open-not-found', ref: job.ref }); continue; }
  let entryEnd = -1;
  depth = 0;
  for (let i = entryStart; i < block.length; i++) {
    const ch = block[i];
    if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) { entryEnd = i; break; } }
  }
  if (entryStart < 0 || entryEnd < 0) { skipped++; skips.push({ id: r.id, reason: 'entry-bounds-not-found', ref: job.ref }); continue; }

  const entryText = block.slice(entryStart, entryEnd + 1);
  // Find rationale: '...' or rationale: "..." — must match the stub pattern exactly to avoid clobbering
  const rationaleRe = /rationale:\s*(['"])((?:\\.|(?!\1).)*)\1/;
  const m = entryText.match(rationaleRe);
  if (!m) { skipped++; skips.push({ id: r.id, reason: 'no-rationale-field', ref: job.ref }); continue; }
  const oldRationale = m[2];
  // Sanity: only replace if old rationale matches the original stub we surveyed
  if (oldRationale !== job.currentRationale.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\')) {
    // Permit alternate escape representations — reconstruct via JSON.parse of quoted form
    let normalizedOld;
    try { normalizedOld = JSON.parse('"' + oldRationale.replace(/"/g, '\\"').replace(/\\'/g, "'") + '"'); }
    catch { normalizedOld = oldRationale; }
    if (normalizedOld !== job.currentRationale) {
      skipped++; skips.push({ id: r.id, reason: 'rationale-already-changed', ref: job.ref, current: oldRationale.slice(0, 80) }); continue;
    }
  }

  // Build the replacement: preserve the original quote char if possible (we use single-quote style for consistency with seed files)
  const newRationale = jsQuote(r.rationale);
  const newEntryText = entryText.replace(rationaleRe, `rationale: ${newRationale}`);

  // Apply replacement to block, then to src
  const absStart = subtaskIdx + entryStart;
  const absEnd = subtaskIdx + entryEnd + 1;

  // Verify the slice in src matches entryText byte-for-byte
  if (src.slice(absStart, absEnd) !== entryText) {
    ambiguous++; skips.push({ id: r.id, reason: 'src-block-mismatch', ref: job.ref });
    continue;
  }

  src = src.slice(0, absStart) + newEntryText + src.slice(absEnd);
  applied++;
}

console.log(`Apply ${WRITE ? 'WRITE' : 'DRY-RUN'}: ${applied} applied, ${skipped} skipped, ${ambiguous} ambiguous`);
if (skips.length > 0) {
  const reasons = {};
  for (const s of skips) reasons[s.reason] = (reasons[s.reason] || 0) + 1;
  console.log('Skip reasons:', reasons);
  console.log('First 5 skips:', skips.slice(0, 5));
}
if (WRITE && applied > 0) {
  fs.writeFileSync(seedFile, src);
  console.log(`Wrote ${path.relative(ROOT, seedFile)}`);
}
