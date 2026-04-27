#!/usr/bin/env node
// Single-job NotebookLM Muslim Scholar rationale enrichment for one pillar.
//
// Multi-job batched prompts time out on Muslim Scholar (it treats them as
// complex retrieval requests). Single-job ultra-simple prompts respond in ~10s.
// At 426 jobs × 10s = ~71 min for the intellect pillar; runs in background.
//
// Reads scripts/.rationale-work/<pillar>.jsonl. Appends one result per line to
// scripts/.rationale-work/<pillar>.results.jsonl as { id, rationale }. Resumable.
//
// Usage:
//   node scripts/rationale-enrich.mjs --pillar=intellect             # full run
//   node scripts/rationale-enrich.mjs --pillar=intellect --limit=5   # smoke test
//   node scripts/rationale-enrich.mjs --pillar=intellect --resume    # skip done

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = Object.fromEntries(process.argv.slice(2).map(a => {
  const [k, v] = a.replace(/^--/, '').split('=');
  return [k, v ?? true];
}));
const pillar = args.pillar;
const limit = args.limit ? parseInt(args.limit, 10) : Infinity;
const resume = !!args.resume;
if (!pillar) { console.error('Usage: --pillar=<id> [--limit=N] [--resume]'); process.exit(2); }

const NOTEBOOK = '1c17b03b-3537-4fde-b5ba-562dbe0c1aab';
const PER_CALL_TIMEOUT_MS = 60_000;
const MAX_RETRIES = 2;

const workDir = path.join(__dirname, '.rationale-work');
const inFile = path.join(workDir, `${pillar}.jsonl`);
const outFile = path.join(workDir, `${pillar}.results.jsonl`);
const failFile = path.join(workDir, `${pillar}.failures.jsonl`);

const jobs = fs.readFileSync(inFile, 'utf8').trim().split('\n').map(l => JSON.parse(l));

const doneIds = new Set();
if (resume && fs.existsSync(outFile)) {
  for (const line of fs.readFileSync(outFile, 'utf8').trim().split('\n')) {
    if (line) doneIds.add(JSON.parse(line).id);
  }
}
const remaining = jobs.filter(j => !doneIds.has(j.id)).slice(0, limit);
console.log(`[${new Date().toISOString()}] ${pillar}: ${remaining.length} jobs to process (${doneIds.size} already done)`);

const outStream = fs.createWriteStream(outFile, { flags: 'a' });
const failStream = fs.createWriteStream(failFile, { flags: 'a' });

function buildPrompt(job) {
  const trans = (job.translation || '').replace(/\s+/g, ' ').slice(0, 280);
  return `Write ONE sentence (max 25 words) on why ${job.ref} grounds the subtask "${job.subtaskTitle}". Lead with the substantive link (e.g., "the command to..." or "establishes..." or "the prophetic principle that..."). Do not begin with "This verse" or "The hadith". No preamble, no closing. Verse/hadith text: "${trans}"`;
}

function callNotebookLM(prompt) {
  return execFileSync(
    'python',
    ['-m', 'notebooklm', 'ask', '--notebook', NOTEBOOK, prompt],
    { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: PER_CALL_TIMEOUT_MS, env: { ...process.env, PYTHONIOENCODING: 'utf-8' } }
  );
}

function parseAnswer(stdout) {
  // Plain text mode output:
  //   Answer:
  //   <body lines, possibly multi-line>
  //
  //   Conversation: <id> (turn N)
  let body = stdout;
  const ansIdx = body.indexOf('Answer:');
  if (ansIdx >= 0) body = body.slice(ansIdx + 'Answer:'.length);
  const convIdx = body.indexOf('\nConversation:');
  if (convIdx >= 0) body = body.slice(0, convIdx);
  body = body.trim();
  // Strip surrounding markdown bold and trailing citation tags like [1, 2]
  body = body.replace(/\*\*/g, '').replace(/\s*\[[\d,\s]+\]\s*\.?\s*$/, '.').trim();
  // Collapse multi-line into single sentence (take first paragraph)
  body = body.split(/\n\s*\n/)[0].replace(/\s+/g, ' ').trim();
  return body;
}

let okCount = 0, failCount = 0, t0 = Date.now();
for (let i = 0; i < remaining.length; i++) {
  const job = remaining[i];
  const prompt = buildPrompt(job);
  let result = null, lastErr = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const out = callNotebookLM(prompt);
      const parsed = parseAnswer(out);
      if (parsed && parsed.length > 5) { result = parsed; break; }
      lastErr = `empty-or-short: ${parsed.length} chars`;
    } catch (err) {
      lastErr = (err.stderr || err.message || '').slice(0, 200);
    }
    if (attempt < MAX_RETRIES) {
      // brief backoff
      const sleep = 2000 * (attempt + 1);
      try { execFileSync('node', ['-e', `setTimeout(()=>{}, ${sleep})`]); } catch {}
    }
  }
  if (result) {
    outStream.write(JSON.stringify({ id: job.id, rationale: result }) + '\n');
    okCount++;
  } else {
    failStream.write(JSON.stringify({ id: job.id, ref: job.ref, subtask: job.subtaskTitle, err: lastErr }) + '\n');
    failCount++;
  }
  if ((i + 1) % 10 === 0 || i === remaining.length - 1) {
    const elapsed = (Date.now() - t0) / 1000;
    const rate = (i + 1) / elapsed;
    const eta = Math.ceil((remaining.length - i - 1) / rate);
    console.log(`[${new Date().toISOString()}] ${i + 1}/${remaining.length} (ok=${okCount} fail=${failCount}) — ${(elapsed).toFixed(0)}s elapsed, ETA ${eta}s`);
  }
}

outStream.end();
failStream.end();
console.log(`[${new Date().toISOString()}] DONE. ${okCount} ok, ${failCount} fail.`);
