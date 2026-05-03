#!/usr/bin/env node
// Scan subtask `description` prose for inline citation references (Quran X:Y,
// Bukhari NNN, Muslim NNN, Abu Dawud NNN, Tirmidhi NNN, etc.) and report any
// that don't appear in the subtask's structured `sources[].ref`. Surfaces the
// "description-mentions-hadith-but-sources-doesn't-include-it" pattern that
// the verbatim two-axis migration could not catch.

import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PILLARS = [
  ['faith', 'FAITH_SEED_TASKS'],
  ['health', 'HEALTH_SEED_TASKS'],
  ['intellect', 'INTELLECT_SEED_TASKS'],
  ['family', 'FAMILY_SEED_TASKS'],
  ['wealth', 'WEALTH_SEED_TASKS'],
  ['environment', 'ENVIRONMENT_SEED_TASKS'],
  ['ummah', 'UMMAH_SEED_TASKS'],
  ['moontrance', 'MOONTRANCE_SEED_TASKS'],
  ['prayer', 'PRAYER_SEED_TASKS'],
];

// Patterns to detect inline refs in prose. Order matters — more specific first.
const PATTERNS = [
  // Quran X:Y or X:Y-Z
  { kind: 'quran',  re: /\bQuran\s+\(?(\d{1,3}:\d{1,3}(?:-\d{1,3})?)\)?/gi, fmt: m => `Quran ${m[1]}` },
  // Hadith collections — collection name + number
  { kind: 'hadith', re: /\b(Sahih\s+al-Bukhari|Sahih\s+Bukhari|Bukhari)\s+(\d{1,5})\b/gi,
    fmt: m => `Sahih al-Bukhari ${m[2]}` },
  { kind: 'hadith', re: /\b(Sahih\s+Muslim|Muslim)\s+(\d{1,5})\b/gi,
    fmt: m => `Sahih Muslim ${m[2]}` },
  { kind: 'hadith', re: /\b(Sunan\s+Abi\s+Dawud|Sunan\s+Abu\s+Dawud|Abu\s+Dawud|Abi\s+Dawud)\s+(\d{1,5})\b/gi,
    fmt: m => `Sunan Abi Dawud ${m[2]}` },
  { kind: 'hadith', re: /\b(Jami\s+at-Tirmidhi|Sunan\s+at-Tirmidhi|Sunan\s+Tirmidhi|Tirmidhi)\s+(\d{1,5})\b/gi,
    fmt: m => `Jami at-Tirmidhi ${m[2]}` },
  { kind: 'hadith', re: /\b(Sunan\s+an-Nasai|Sunan\s+Nasai|Nasai)\s+(\d{1,5})\b/gi,
    fmt: m => `Sunan an-Nasai ${m[2]}` },
  { kind: 'hadith', re: /\b(Sunan\s+Ibn\s+Majah|Ibn\s+Majah)\s+(\d{1,5})\b/gi,
    fmt: m => `Sunan Ibn Majah ${m[2]}` },
  { kind: 'hadith', re: /\b(Musnad\s+Ahmad)\s+(\d{1,5})\b/gi,
    fmt: m => `Musnad Ahmad ${m[2]}` },
  { kind: 'hadith', re: /\b(Muwatta\s+Malik|Muwatta)\s+(\d{1,5})\b/gi,
    fmt: m => `Muwatta Malik ${m[2]}` },
  { kind: 'hadith', re: /\b(Riyad\s+as-Salihin|Riyadh\s+as-Salihin)\s+(\d{1,5})\b/gi,
    fmt: m => `Riyad as-Salihin ${m[2]}` },
];

function normalizeRef(ref) {
  if (!ref) return '';
  return String(ref)
    .replace(/^Quran\s+\(?/i, 'Quran ')
    .replace(/\)$/, '')
    .replace(/Sahih\s+Bukhari/i, 'Sahih al-Bukhari')
    .replace(/Sahih\s+Tirmidhi/i, 'Jami at-Tirmidhi')
    .replace(/Sunan\s+at-Tirmidhi/i, 'Jami at-Tirmidhi')
    .replace(/Sunan\s+Tirmidhi/i, 'Jami at-Tirmidhi')
    .replace(/Sahih\s+Abu\s+Dawud/i, 'Sunan Abi Dawud')
    .replace(/Sunan\s+Abu\s+Dawud/i, 'Sunan Abi Dawud')
    .trim();
}

function extractInlineRefs(text) {
  if (!text || typeof text !== 'string') return [];
  const found = [];
  for (const { kind, re, fmt } of PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      found.push({ kind, ref: fmt(m), match: m[0] });
    }
  }
  // Dedupe
  const seen = new Set();
  return found.filter(r => {
    const k = r.ref;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const results = { totalSubtasks: 0, totalInlineRefs: 0, missing: [], byPillar: {} };

for (const [id, exportName] of PILLARS) {
  const mod = await import(pathToFileURL(path.join(ROOT, 'src/data/seed-tasks', `${id}-seed-tasks.js`)).href);
  const data = mod[exportName];
  const pillarMissing = [];

  for (const [boardKey, tasks] of Object.entries(data)) {
    if (!Array.isArray(tasks)) continue;
    for (let ti = 0; ti < tasks.length; ti++) {
      const subs = Array.isArray(tasks[ti]?.subtasks) ? tasks[ti].subtasks : [];
      for (let si = 0; si < subs.length; si++) {
        const sub = subs[si];
        results.totalSubtasks++;
        const inline = extractInlineRefs(sub?.description);
        if (inline.length === 0) continue;
        results.totalInlineRefs += inline.length;
        const sourceRefs = new Set(
          (Array.isArray(sub.sources) ? sub.sources : [])
            .map(s => normalizeRef(s?.ref))
            .filter(Boolean)
        );
        const missing = inline.filter(r => !sourceRefs.has(normalizeRef(r.ref)));
        if (missing.length) {
          pillarMissing.push({
            idPath: `${id}.${boardKey}[${ti}].subtasks[${si}]`,
            title: sub.title,
            missing,
          });
        }
      }
    }
  }
  results.byPillar[id] = pillarMissing.length;
  results.missing.push(...pillarMissing);
}

console.log(`\nScanned: ${results.totalSubtasks} subtasks across ${PILLARS.length} pillars`);
console.log(`Total inline refs detected: ${results.totalInlineRefs}`);
console.log(`Subtasks with missing-from-sources refs: ${results.missing.length}\n`);
console.log('Per pillar:');
for (const [id, n] of Object.entries(results.byPillar)) {
  console.log(`  ${id.padEnd(12)} ${n}`);
}

if (process.argv.includes('--verbose')) {
  console.log('\n--- DETAIL ---');
  for (const { idPath, title, missing } of results.missing) {
    console.log(`\n${idPath}`);
    console.log(`  ${title}`);
    for (const r of missing) {
      console.log(`    [${r.kind}] ${r.ref}  (matched: "${r.match}")`);
    }
  }
}

if (process.argv.includes('--json')) {
  const out = path.join(ROOT, 'tmp', 'inline-refs-audit.json');
  const fs = await import('node:fs');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(results.missing, null, 2));
  console.log(`\nWrote ${out}`);
}

// Ratchet gate. Decrement RATCHET as Phase 2 hadith refs land.
// 2026-04-25: Phase 1 (Quran backfill) reduced 22 → 13. The 13 remainder are
// hadith refs deferred to a NotebookLM Muslim Scholar pass.
const RATCHET = 0;
if (process.argv.includes('--strict')) {
  if (results.missing.length > RATCHET) {
    console.error(`\n[STRICT] Failed: ${results.missing.length} missing inline refs exceeds ratchet ${RATCHET}.`);
    console.error('A subtask description cites a ref that is not in its sources[]. Add it, or run `node scripts/audit-inline-refs.mjs --verbose` to see which.');
    process.exit(1);
  }
  console.log(`\n[STRICT] OK: ${results.missing.length} ≤ ratchet ${RATCHET}`);
}
