#!/usr/bin/env node
// scripts/lookup-hadith-refs.mjs
//
// Phase 1.5 — Hadith citation lookup via NotebookLM (Muslim Scholar notebook).
// Reads bucket-C2 findings from artifacts/source-audit/*.jsonl and, for
// each shorthand-cited hadith sentence, asks NotebookLM for the canonical
// collection + number. Writes enriched findings to
// artifacts/source-audit/<pillar>-promoted.jsonl with `resolved` field.
//
// Usage:
//   node scripts/lookup-hadith-refs.mjs --pillar=faith           # one pillar
//   node scripts/lookup-hadith-refs.mjs                          # all pillars
//   node scripts/lookup-hadith-refs.mjs --batch-size=15

import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const NOTEBOOK_ID = '1c17b03b-3537-4fde-b5ba-562dbe0c1aab';
// Restrict to clean hadith + Quran corpora; exclude self-reference to our own seed data.
const SOURCES = [
  '44ca6b8b-a79c-4079-b498-cb6f237b2743', // en_Sahih_Al-Bukhari.pdf
  '4f722378-1646-4d73-a7cc-24ffe6bb93f4', // en_Sahih_Muslim.pdf
  '2b6b4149-bee3-455f-a455-e28b980d950e', // Quran - Saheeh International
];

const NOTEBOOKLM_EXE = 'C:\\Users\\MY OWN AXIS\\AppData\\Roaming\\Python\\Python314\\Scripts\\notebooklm.exe';

const PILLARS = ['faith','family','life','wealth','ummah','intellect','environment'];

// ── Args ─────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  })
);
const pillarFilter = args.pillar ? [args.pillar] : PILLARS;
const batchSize = Number(args['batch-size'] || 15);

function loadC2(pillar) {
  const path = resolve(ROOT, `artifacts/source-audit/${pillar}.jsonl`);
  if (!existsSync(path)) return [];
  const lines = readFileSync(path, 'utf8').trim().split('\n').filter(Boolean);
  return lines.map(l => JSON.parse(l)).filter(o => o.bucket === 'C' && o.subBucket === 'C2');
}

function buildPrompt(batch) {
  const header = `For each numbered hadith claim below, return the canonical collection and hadith number. If multiple canonical collections record it, return the primary or most-authoritative. If the exact quote/claim cannot be identified in the provided sources, set primary_collection to "unknown".

Output ONLY a JSON array (no prose, no markdown fence) with fields: idx (integer matching the prompt number), primary_collection (one of: "Sahih al-Bukhari", "Sahih Muslim", "unknown"), number (integer or null), confidence ("high"|"medium"|"low"|"unknown"), note (brief string).

Claims:
`;
  const lines = batch.map((f, i) => {
    const shorthand = f.payload.shorthandNames?.length
      ? ` (attributed to ${f.payload.shorthandNames.join(', ')})`
      : '';
    // Clean the sentence of problematic chars for the prompt.
    const cleanSent = f.payload.sentence.replace(/\s+/g, ' ').trim();
    return `${i + 1}. ${cleanSent}${shorthand}`;
  }).join('\n');
  return header + lines;
}

function callNotebookLM(prompt) {
  // Write prompt to a tempfile to avoid Windows arg-parsing pitfalls.
  const tmp = resolve(os.tmpdir(), `hadith-lookup-${Date.now()}.txt`);
  writeFileSync(tmp, prompt, 'utf8');
  // Read the prompt back as the first positional arg via PowerShell's Get-Content.
  const promptText = readFileSync(tmp, 'utf8');
  const result = spawnSync(NOTEBOOKLM_EXE, [
    'ask', promptText,
    '-n', NOTEBOOK_ID,
    ...SOURCES.flatMap(s => ['-s', s]),
    '--json',
  ], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, shell: false });

  if (result.status !== 0) {
    console.error('notebooklm ask failed:', result.stderr?.slice(0, 500));
    return null;
  }
  try {
    const outer = JSON.parse(result.stdout);
    // The `answer` field is a string containing the JSON array.
    const inner = JSON.parse(outer.answer);
    return inner;
  } catch (e) {
    console.error('Failed to parse notebooklm response:', e.message);
    console.error('Raw stdout[:500]:', result.stdout?.slice(0, 500));
    return null;
  }
}

function normalizeCollection(name) {
  if (!name) return null;
  const n = name.toLowerCase().trim();
  if (/sahih\s+(al-)?bukhari|^bukhari/.test(n)) return 'Sahih Bukhari';
  if (/sahih\s+muslim|^muslim/.test(n)) return 'Sahih Muslim';
  return null;
}

async function processPillar(pillar) {
  const findings = loadC2(pillar);
  if (!findings.length) {
    console.log(`[${pillar}] no C2 findings`);
    return;
  }
  console.log(`[${pillar}] ${findings.length} C2 findings → batching at ${batchSize}/batch`);

  const enriched = [];
  for (let i = 0; i < findings.length; i += batchSize) {
    const batch = findings.slice(i, i + batchSize);
    const prompt = buildPrompt(batch);
    console.log(`  batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(findings.length / batchSize)} (${batch.length} claims)...`);
    const answers = callNotebookLM(prompt);
    if (!answers) {
      console.warn(`  batch failed — marking as unresolved`);
      for (const f of batch) enriched.push({ ...f, resolved: { status: 'batch-failed' } });
      continue;
    }
    for (let j = 0; j < batch.length; j++) {
      const f = batch[j];
      const a = answers.find(x => x.idx === j + 1);
      if (!a) {
        enriched.push({ ...f, resolved: { status: 'no-answer' } });
        continue;
      }
      const coll = normalizeCollection(a.primary_collection);
      const num = typeof a.number === 'number' ? a.number
                : /^\d+$/.test(String(a.number)) ? parseInt(a.number, 10)
                : null;
      const isResolved = coll && num && ['high', 'medium'].includes(a.confidence);
      enriched.push({
        ...f,
        resolved: {
          status: isResolved ? 'promoted' : 'unresolved',
          collection: coll,
          number: num,
          confidence: a.confidence,
          note: a.note,
        },
      });
    }
  }

  const out = resolve(ROOT, `artifacts/source-audit/${pillar}-promoted.jsonl`);
  writeFileSync(out, enriched.map(e => JSON.stringify(e)).join('\n') + '\n');

  const promoted = enriched.filter(e => e.resolved?.status === 'promoted').length;
  const unresolved = enriched.filter(e => e.resolved?.status === 'unresolved').length;
  const failed = enriched.filter(e => e.resolved?.status === 'batch-failed' || e.resolved?.status === 'no-answer').length;
  console.log(`[${pillar}] promoted=${promoted} unresolved=${unresolved} failed=${failed} → ${out}`);
}

async function main() {
  for (const p of pillarFilter) {
    if (!PILLARS.includes(p)) { console.error(`unknown pillar: ${p}`); continue; }
    await processPillar(p);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
