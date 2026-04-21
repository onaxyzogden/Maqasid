#!/usr/bin/env node
// scripts/apply-source-refs.mjs
//
// Phase 2 — Apply source/description reconciliation mutations.
//
// Reads artifacts/source-audit/<pillar>.jsonl + <pillar>-promoted.jsonl,
// builds per-subtask mutations, and either:
//   --dry-run (default)  → writes unified diff to stages/source-audit/<date>-review.md
//   --commit             → rewrites src/data/seed-tasks/*.js (node --check verified)
//
// Usage:
//   node scripts/apply-source-refs.mjs --pillar=wealth
//   node scripts/apply-source-refs.mjs                       # all pillars
//   node scripts/apply-source-refs.mjs --commit              # write files

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PILLARS = ['faith','family','life','wealth','ummah','intellect','environment'];

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  })
);
const pillarFilter = args.pillar ? [args.pillar] : PILLARS;
const commit = !!args.commit;

// ── Load findings ────────────────────────────────────────────────────────────

function loadJsonl(path) {
  if (!existsSync(path)) return [];
  return readFileSync(path, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l));
}

function loadFindings(pillar) {
  const base = loadJsonl(resolve(ROOT, `artifacts/source-audit/${pillar}.jsonl`));
  const promoted = loadJsonl(resolve(ROOT, `artifacts/source-audit/${pillar}-promoted.jsonl`));
  // Index promoted by idPath for merge.
  const promotedMap = new Map(promoted.map(p => [p.idPath, p]));
  return base.map(f => promotedMap.get(f.idPath) ?? f);
}

// ── Load Quran WBW ───────────────────────────────────────────────────────────

let quranWBWCache = null;
async function getQuranWBW() {
  if (quranWBWCache) return quranWBWCache;
  const mod = await import(pathToFileURL(resolve(ROOT, 'src/data/quran-wbw.js')).href);
  quranWBWCache = mod.quranWBW;
  return quranWBWCache;
}

function buildQuranBlock(wbw, verseKey) {
  // verseKey: "2:275" or "2:278-279"
  const range = verseKey.match(/^(\d+):(\d+)-(\d+)$/);
  if (range) {
    const s = range[1], from = +range[2], to = +range[3];
    const arabicParts = [];
    const transParts = [];
    let anyMissing = false;
    for (let v = from; v <= to; v++) {
      const d = wbw[`${s}:${v}`];
      if (!d) { anyMissing = true; break; }
      arabicParts.push(d.words.map(w => w.ar).join(' '));
      transParts.push(d.translation);
    }
    if (anyMissing) {
      return `### Quran (${verseKey})\n`;
    }
    return `### Quran (${verseKey})\n**Arabic:** ${arabicParts.join(' ')}  \n**Translation:** ${transParts.join(' ')}\n`;
  }
  const d = wbw[verseKey];
  if (!d) return `### Quran (${verseKey})\n`;
  const arabic = d.words.map(w => w.ar).join(' ');
  return `### Quran (${verseKey})\n**Arabic:** ${arabic}  \n**Translation:** ${d.translation}\n`;
}

function buildHadithBlock(collection, number, note) {
  const body = note ? note.trim() : '';
  return body
    ? `### ${collection} ${number}\n${body}\n*(Grade: Sahih)*\n`
    : `### ${collection} ${number}\n*(Grade: Sahih)*\n`;
}

// ── Insert / remove primitives ───────────────────────────────────────────────

function insertIntoSources(sources, block, section /* 'quran' | 'hadith' */) {
  let trimmed = sources.replace(/\s+$/,'');
  const quranMarker = /\*\*I\.\s*Quran\*\*/;
  const hadithMarker2 = /\*\*II\.\s*Hadith\*\*/;
  const hadithMarker1 = /\*\*I\.\s*Hadith\*\*/;

  if (section === 'quran') {
    // If the only section is "**I. Hadith**", demote it to "**II. Hadith**".
    if (!quranMarker.test(trimmed) && hadithMarker1.test(trimmed)) {
      trimmed = trimmed.replace(hadithMarker1, '**II. Hadith**');
    }
    if (hadithMarker2.test(trimmed)) {
      return trimmed.replace(hadithMarker2, `${block}\n$&`);
    }
    if (quranMarker.test(trimmed)) {
      return trimmed + '\n\n\n' + block;
    }
    return `**I. Quran**\n\n\n${block}` + (trimmed ? `\n\n${trimmed}` : '');
  } else {
    if (hadithMarker2.test(trimmed)) {
      return trimmed + '\n\n' + block;
    }
    if (hadithMarker1.test(trimmed)) {
      // Hadith-only section exists — append under its heading.
      return trimmed + '\n\n' + block;
    }
    // Hadith-only file (no Quran section); use "I. Hadith" when there's no Quran.
    const marker = quranMarker.test(trimmed) ? '**II. Hadith**' : '**I. Hadith**';
    return trimmed + `\n\n${marker}\n\n\n${block}`;
  }
}

function removeSentenceFromDescription(desc, sentence) {
  // Sentences are period-terminated; in the audit we captured the sentence
  // including its terminating punctuation via findUncitedHadithSentences.
  // The stored `payload.sentence` should appear verbatim in description.
  const needle = sentence.trim();
  // Try exact match first.
  let idx = desc.indexOf(needle);
  if (idx < 0) {
    // Soft match — collapse whitespace.
    const norm = s => s.replace(/\s+/g, ' ').trim();
    const normDesc = norm(desc);
    const normNeedle = norm(needle);
    const ni = normDesc.indexOf(normNeedle);
    if (ni < 0) return { ok: false, text: desc };
    // Fall back to regex with flexible whitespace.
    const pattern = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
    const re = new RegExp('\\s*' + pattern, 'g');
    const out = desc.replace(re, '');
    return { ok: out !== desc, text: cleanup(out) };
  }
  // Remove plus any leading whitespace (keep paragraph structure).
  let start = idx;
  while (start > 0 && desc[start-1] === ' ') start--;
  const out = desc.slice(0, start) + desc.slice(idx + needle.length);
  return { ok: true, text: cleanup(out) };
}

function cleanup(text) {
  // Collapse 3+ blank lines → 2, trim trailing whitespace per line, drop
  // orphan empty bullets/numbered-list-items, and tidy leading/trailing space
  // inside each paragraph.
  return text
    .split('\n')
    .map(l => l.replace(/[ \t]+$/, ''))
    .filter((l, i, arr) => {
      // Drop empty list items: "- ", "* ", "1. "
      if (/^\s*[-*]\s*$/.test(l)) return false;
      if (/^\s*\d+\.\s*$/.test(l)) return false;
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');
}

// ── Planner ──────────────────────────────────────────────────────────────────

async function buildMutationPlan(pillar) {
  const findings = loadFindings(pillar);
  const wbw = await getQuranWBW();
  // Key = submoduleId|tIdx|sIdx
  const byKey = new Map();
  const add = (loc, fn) => {
    const k = `${loc.submoduleId}|${loc.tIdx}|${loc.sIdx}`;
    if (!byKey.has(k)) byKey.set(k, { locator: loc, sourceInserts: [], descriptionRemovals: [], notes: [] });
    return fn(byKey.get(k));
  };

  for (const f of findings) {
    const loc = f.locator;
    if (f.bucket === 'A') {
      const key = f.payload.quranKey;
      add(loc, m => m.sourceInserts.push({ kind: 'quran', key, block: buildQuranBlock(wbw, key), reason: f.bucket }));
    } else if (f.bucket === 'B') {
      const { collection, number } = f.payload;
      add(loc, m => m.sourceInserts.push({ kind: 'hadith', collection, number, block: buildHadithBlock(collection, number, f.payload.matn), reason: f.bucket }));
    } else if (f.bucket === 'C' && f.subBucket === 'C1') {
      add(loc, m => m.descriptionRemovals.push({ sentence: f.payload.sentence, reason: 'C1 uncited' }));
    } else if (f.bucket === 'C' && f.subBucket === 'C2') {
      if (f.resolved?.status === 'promoted') {
        const { collection, number, note } = f.resolved;
        add(loc, m => m.sourceInserts.push({ kind: 'hadith', collection, number, block: buildHadithBlock(collection, number, note), reason: 'C2 promoted' }));
      } else {
        add(loc, m => m.descriptionRemovals.push({ sentence: f.payload.sentence, reason: `C2 ${f.resolved?.status ?? 'unresolved'}` }));
      }
    }
    // D bucket intentionally ignored — routed to review-needed.md by audit, not here.
  }
  return byKey;
}

// ── Apply to a seed file ─────────────────────────────────────────────────────

async function loadSeedModule(pillar) {
  const path = resolve(ROOT, `src/data/seed-tasks/${pillar}-seed-tasks.js`);
  const url = pathToFileURL(path).href + `?t=${Date.now()}`;
  const mod = await import(url);
  const key = Object.keys(mod).find(k => k.endsWith('_SEED_TASKS'));
  return mod[key];
}

function locateSubtaskStrings(seedData, locator) {
  const task = seedData[locator.submoduleId]?.[locator.tIdx];
  if (!task) return null;
  if (locator.sIdx == null) {
    // Task-level finding — only `description` is present on task objects.
    return { sources: null, description: task.description ?? '', title: task.title, isTask: true };
  }
  const sub = task.subtasks?.[locator.sIdx];
  if (!sub) return null;
  return { sources: sub.sources ?? '', description: sub.description ?? '', title: sub.title, isTask: false };
}

// Replace within a specific subtask block. Anchor = `title: '<title>'` →
// next subtask's title (or closing bracket) bounds the region.
function escapeStr(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// Build a regex pattern that matches either the literal char OR its \uXXXX
// escape — source files may store non-ASCII as escaped sequences.
function toFilePattern(str) {
  return str.split('').map(ch => {
    const code = ch.charCodeAt(0);
    if (ch === "'") return `(?:'|\\\\')`;
    if (ch === '"') return `(?:"|\\\\")`;
    if (ch === '\\') return `\\\\\\\\`;
    if (ch === '\n') return `(?:\\n|\\\\n)`;
    if (code < 0x80) return escapeStr(ch);
    const hex = code.toString(16).padStart(4, '0');
    return `(?:${escapeStr(ch)}|\\\\u${hex})`;
  }).join('');
}

// Locate the first occurrence of `str` in fileText, tolerating \uXXXX escapes.
// Returns { index, length } or null.
function findWithEscapes(fileText, str, fromIndex = 0) {
  if (!str) return null;
  const re = new RegExp(toFilePattern(str));
  re.lastIndex = fromIndex;
  const sub = fileText.slice(fromIndex);
  const m = re.exec(sub);
  if (!m) return null;
  return { index: fromIndex + m.index, length: m[0].length };
}

function replaceInSubtaskBlock(fileText, anchorTitle, oldStr, newStr) {
  if (!oldStr) return { ok: false, text: fileText, reason: 'empty-old' };
  const titleRe = new RegExp(`title:\\s*['"]${toFilePattern(anchorTitle)}['"]`);
  const m = titleRe.exec(fileText);
  if (!m) return { ok: false, text: fileText, reason: 'anchor-miss' };
  const start = m.index;
  const end = Math.min(fileText.length, start + 60000);
  const region = fileText.slice(start, end);
  // Search for oldStr tolerantly within region.
  const first = findWithEscapes(region, oldStr, 0);
  if (!first) return { ok: false, text: fileText, reason: 'not-found' };
  const second = findWithEscapes(region, oldStr, first.index + first.length);
  if (second) return { ok: false, text: fileText, reason: 'ambiguous' };
  // Determine the quote style of the enclosing literal (walk back from match
  // within the region for the nearest unescaped `, ', or ").
  const quoteChar = detectEnclosingQuote(region, first.index);
  const escapedNew = escapeForLiteral(newStr, quoteChar);
  const newRegion = region.slice(0, first.index) + escapedNew + region.slice(first.index + first.length);
  return { ok: true, text: fileText.slice(0, start) + newRegion + fileText.slice(end) };
}

function detectEnclosingQuote(region, matchIdx) {
  // Scan backward for ` | ' | " preceded by non-backslash.
  for (let i = matchIdx - 1; i >= 0; i--) {
    const c = region[i];
    if (c !== '`' && c !== "'" && c !== '"') continue;
    // Count preceding backslashes to check escape.
    let bs = 0;
    for (let j = i - 1; j >= 0 && region[j] === '\\'; j--) bs++;
    if (bs % 2 === 0) return c;
  }
  return '`'; // default
}

function escapeForLiteral(str, quote) {
  // Keep non-ASCII as real chars (matches prevailing seed-file style — real
  // Arabic, em-dashes, smart quotes are stored directly).
  let out = str;
  if (quote === "'") {
    // Escape single quotes and real newlines (since single-quoted strings
    // cannot span lines).
    out = out.replace(/'/g, "\\'").replace(/\n/g, '\\n');
  } else if (quote === '"') {
    out = out.replace(/"/g, '\\"').replace(/\n/g, '\\n');
  }
  // Backtick (template) literals tolerate ', ", and newlines as-is.
  return out;
}

async function applyPillar(pillar) {
  const plan = await buildMutationPlan(pillar);
  if (!plan.size) return { pillar, changes: [], skipped: [], fileText: null, newText: null };

  const seedData = await loadSeedModule(pillar);
  const seedPath = resolve(ROOT, `src/data/seed-tasks/${pillar}-seed-tasks.js`);
  const original = readFileSync(seedPath, 'utf8');
  let current = original;
  const changes = [];
  const skipped = [];

  for (const [key, m] of plan) {
    const strings = locateSubtaskStrings(seedData, m.locator);
    if (!strings) { skipped.push({ key, reason: 'locator-miss' }); continue; }

    let newSources = strings.sources;
    let newDescription = strings.description;

    // Apply source inserts (dedup against existing headings). Skip if task-level.
    if (!strings.isTask) {
      for (const ins of m.sourceInserts) {
        const firstLine = ins.block.split('\n')[0];
        if (newSources.includes(firstLine)) continue;
        newSources = insertIntoSources(newSources, ins.block, ins.kind);
      }
    } else if (m.sourceInserts.length) {
      skipped.push({ key, reason: `task-level-source-insert-not-supported (${m.sourceInserts.length})` });
    }

    // Apply description removals.
    for (const rm of m.descriptionRemovals) {
      const res = removeSentenceFromDescription(newDescription, rm.sentence);
      if (res.ok) newDescription = res.text;
      else skipped.push({ key, reason: `remove-miss: ${rm.sentence.slice(0,60)}...` });
    }

    // Swap into the file text (anchor-scoped replacement).
    if (!strings.isTask && newSources !== strings.sources) {
      const r = replaceInSubtaskBlock(current, strings.title, strings.sources, newSources);
      if (r.ok) { current = r.text; changes.push({ key, field: 'sources', count: m.sourceInserts.length }); }
      else skipped.push({ key, reason: `sources-${r.reason}` });
    }
    if (newDescription !== strings.description) {
      const r = replaceInSubtaskBlock(current, strings.title, strings.description, newDescription);
      if (r.ok) { current = r.text; changes.push({ key, field: 'description', count: m.descriptionRemovals.length }); }
      else skipped.push({ key, reason: `description-${r.reason}` });
    }
  }

  return { pillar, changes, skipped, fileText: original, newText: current, seedPath };
}

// ── Diff rendering ───────────────────────────────────────────────────────────

import { tmpdir } from 'node:os';
import { unlinkSync } from 'node:fs';

function lineDiff(a, b, label) {
  // Use git's diff engine for proper multi-hunk unified diffs.
  const ts = Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const aPath = resolve(tmpdir(), `audit-a-${ts}.txt`);
  const bPath = resolve(tmpdir(), `audit-b-${ts}.txt`);
  writeFileSync(aPath, a, 'utf8');
  writeFileSync(bPath, b, 'utf8');
  const r = spawnSync('git', ['diff', '--no-index', '--no-color', '-U2', aPath, bPath], { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
  try { unlinkSync(aPath); unlinkSync(bPath); } catch {}
  const out = r.stdout || '';
  // Strip the temp-path headers, keep the hunks.
  return out.replace(/^diff --git .*\n/m, `diff --git a/${label} b/${label}\n`)
            .replace(/^--- .*\n/m, `--- a/${label}\n`)
            .replace(/^\+\+\+ .*\n/m, `+++ b/${label}\n`);
}

function renderReview(results) {
  const lines = [];
  const today = new Date().toISOString().slice(0, 10);
  lines.push(`# Source-Audit Review — ${today}`);
  lines.push('');
  lines.push('Stage-doc for review before `--commit`.');
  lines.push('');

  for (const r of results) {
    if (!r.newText || r.newText === r.fileText) {
      lines.push(`## ${r.pillar} — no changes`);
      lines.push('');
      continue;
    }
    lines.push(`## ${r.pillar}`);
    lines.push('');
    lines.push(`- Mutations applied: ${r.changes.length}`);
    lines.push(`- Skipped: ${r.skipped.length}`);
    if (r.skipped.length) {
      lines.push('');
      lines.push('### Skipped');
      for (const s of r.skipped) lines.push(`- \`${s.key}\` — ${s.reason}`);
    }
    lines.push('');
    lines.push('### Unified diff');
    lines.push('```diff');
    lines.push(lineDiff(r.fileText, r.newText, `src/data/seed-tasks/${r.pillar}-seed-tasks.js`));
    lines.push('```');
    lines.push('');
  }
  return lines.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const results = [];
  for (const p of pillarFilter) {
    if (!PILLARS.includes(p)) { console.error(`unknown pillar: ${p}`); continue; }
    const r = await applyPillar(p);
    results.push(r);
    console.log(`[${p}] changes=${r.changes.length} skipped=${r.skipped.length}`);
  }

  const stagesDir = resolve(ROOT, 'stages/source-audit');
  if (!existsSync(stagesDir)) mkdirSync(stagesDir, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const reviewPath = resolve(stagesDir, `${today}-review.md`);
  writeFileSync(reviewPath, renderReview(results), 'utf8');
  console.log(`\nreview doc → ${reviewPath}`);

  if (!commit) {
    console.log('(dry-run; pass --commit to write seed files)');
    return;
  }

  // --commit: write each file via temp + node --check verification.
  for (const r of results) {
    if (!r.newText || r.newText === r.fileText) continue;
    const tmpPath = r.seedPath.replace(/\.js$/, '.tmp.js');
    writeFileSync(tmpPath, r.newText, 'utf8');
    const check = spawnSync(process.execPath, ['--check', tmpPath], { encoding: 'utf8' });
    if (check.status !== 0) {
      console.error(`[${r.pillar}] SYNTAX ERROR — rolling back`);
      console.error(check.stderr);
      continue;
    }
    writeFileSync(r.seedPath, r.newText, 'utf8');
    try { unlinkSync(tmpPath); } catch {}
    console.log(`[${r.pillar}] committed → ${r.seedPath}`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
