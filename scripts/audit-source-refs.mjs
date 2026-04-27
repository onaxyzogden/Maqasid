#!/usr/bin/env node
// scripts/audit-source-refs.mjs
//
// Phase 1 of the source/description reconciliation pipeline.
// Scans every subtask across all seven pillar seed files and classifies
// mismatches between inline references in `description` and canonical
// headings in `sources` into four buckets:
//
//   A — Quran ref in description, missing from sources (auto-fixable)
//   B — Hadith ref with collection+number, missing from sources (auto-fixable)
//   C — Hadith claim in description with NO citation (auto-removable)
//   D — Low-confidence / ambiguous (manual review)
//
// Output: artifacts/source-audit/<pillar>.jsonl
//
// Usage:
//   node scripts/audit-source-refs.mjs                 # all pillars
//   node scripts/audit-source-refs.mjs --pillar=wealth # one pillar
//   node scripts/audit-source-refs.mjs --fail-on=high  # exit 1 if any high-conf

import { pathToFileURL } from 'node:url';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PILLARS = ['faith','family','health','wealth','ummah','intellect','environment'];
const EXPORT_NAMES = {
  faith: 'FAITH_SEED_TASKS',
  family: 'FAMILY_SEED_TASKS',
  health: 'HEALTH_SEED_TASKS',
  wealth: 'WEALTH_SEED_TASKS',
  ummah: 'UMMAH_SEED_TASKS',
  intellect: 'INTELLECT_SEED_TASKS',
  environment: 'ENVIRONMENT_SEED_TASKS',
};

// ── Args ─────────────────────────────────────────────────────────────────────
const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  })
);
const pillarFilter = args.pillar ? [args.pillar] : PILLARS;
const failOn = args['fail-on'] || null;

// ── Canonical collection slugs (mirror TaskDetailPanel.jsx:25-46) ───────────
const HADITH_COLLECTION_SLUGS = {
  'sahih bukhari': 'bukhari',
  'sahih al-bukhari': 'bukhari',
  'sahih muslim': 'muslim',
  'sunan abi dawud': 'abudawud',
  'sunan abu dawud': 'abudawud',
  'sunan ibn majah': 'ibnmajah',
  'sunan an-nasai': 'nasai',
  "sunan an-nasa'i": 'nasai',
  "sunan al-nasa'i": 'nasai',
  'sunan al-nasai': 'nasai',
  'jami at-tirmidhi': 'tirmidhi',
  'sunan al-tirmidhi': 'tirmidhi',
  'muwatta malik': 'malik',
};

// Build a collection-name alternation that tolerates the apostrophe/hyphen
// variants actually written by humans in descriptions.
const COLL_ALT = Object.keys(HADITH_COLLECTION_SLUGS)
  .map(n => n
    .replace(/[-]/g, '[- ]?')
    .replace(/'/g, "['']?")
    .replace(/\s+/g, '\\s+'))
  .join('|');

const INLINE_HADITH_RE = new RegExp(`\\b(${COLL_ALT})\\s+(\\d+)\\b`, 'gi');

// Quran inline patterns
const INLINE_QURAN_RE = /\bQuran\s+\(?(\d+):(\d+)(?:[-–](\d+))?\)?/gi;
const INLINE_SURAH_NUM_RE = /\bSurah\s+[A-Z][\w-]+(?:\s+\([^)]*\))?\s*\(?(\d+):(\d+)(?:[-–](\d+))?\)?/gi;

// Canonical heading patterns (what the renderer accepts)
const HEADING_QURAN_RE = /^###\s+Quran\s+\((\d+):(\d+)(?:-(\d+))?\)\s*$/gm;
const HEADING_HADITH_RE = new RegExp(`^###\\s+(${COLL_ALT})\\s+(\\d+)\\s*$`, 'gim');

// Bucket C: Prophet-attribution verb requirement
const PROPHET_NOUN = /\b(Prophet|Messenger|Rasul(?:ullah)?|Nabi)\b/i;
const ATTRIB_VERB = /\b(said|taught|encouraged|forbade|prohibited|commanded|instructed|warned|advised|told|narrated|explained|reported|stated|replied|answered|spoke|mentioned)\b/i;

// Low-confidence Quran
const LOW_CONF_SURAH_RE = /\bSurah\s+[A-Z][\w-]+\b(?!\s*\(?\d)/g;
// Low-confidence hadith phrasing (no collection+number anywhere in sentence)
const LOW_CONF_HADITH_PHRASE = /\b(a\s+hadith|the\s+hadith|narration|authentic\s+hadith)\b/i;

// ── Helpers ──────────────────────────────────────────────────────────────────
function normalizeQuranKey(s, e) {
  return e ? `${s}-${e}` : String(s);
}

function canonicalCollName(raw) {
  const key = raw.trim().toLowerCase().replace(/\s+/g, ' ').replace(/''/g, "'");
  return HADITH_COLLECTION_SLUGS[key] || HADITH_COLLECTION_SLUGS[key.replace(/'/g, '')] || null;
}

function extractQuranHeadings(sources) {
  const out = new Set();
  if (!sources) return out;
  HEADING_QURAN_RE.lastIndex = 0;
  let m;
  while ((m = HEADING_QURAN_RE.exec(sources))) {
    out.add(`${m[1]}:${normalizeQuranKey(m[2], m[3])}`);
  }
  return out;
}

function extractHadithHeadings(sources) {
  const out = new Set();
  if (!sources) return out;
  HEADING_HADITH_RE.lastIndex = 0;
  let m;
  while ((m = HEADING_HADITH_RE.exec(sources))) {
    const slug = canonicalCollName(m[1]);
    if (slug) out.add(`${slug}:${m[2]}`);
  }
  return out;
}

function extractInlineQuranRefs(desc) {
  const out = new Map(); // key -> count
  if (!desc) return out;
  for (const re of [INLINE_QURAN_RE, INLINE_SURAH_NUM_RE]) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(desc))) {
      const key = `${m[1]}:${normalizeQuranKey(m[2], m[3])}`;
      out.set(key, (out.get(key) || 0) + 1);
    }
  }
  return out;
}

function extractInlineHadithRefs(desc) {
  const out = new Set();
  if (!desc) return out;
  INLINE_HADITH_RE.lastIndex = 0;
  let m;
  while ((m = INLINE_HADITH_RE.exec(desc))) {
    const slug = canonicalCollName(m[1]);
    if (slug) out.add(`${slug}:${m[2]}`);
  }
  return out;
}

// Simple sentence splitter — preserves original offsets loosely.
// Splits on .!? followed by whitespace + uppercase/quote OR by double newline.
function splitSentences(text) {
  if (!text) return [];
  const pieces = [];
  const parts = text.split(/\n\s*\n/);
  for (const para of parts) {
    const chunks = para.split(/(?<=[.!?])(?=\s+["“]?[A-Z])/);
    for (const c of chunks) {
      const t = c.trim();
      if (t) pieces.push(t);
    }
  }
  return pieces;
}

// Bucket C detection: walk sentences, flag any Prophet-attribution sentence
// whose sentence + next sentence contain no hadith collection-with-number ref.
// A sentence that explicitly cites the Quran (with ayah) is NOT a hadith
// claim — skip those. Direct-quote sentences ("said: '…'") are treated more
// strictly than paraphrases.
function findUncitedHadithSentences(desc) {
  const sentences = splitSentences(desc);
  const findings = [];
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    if (!PROPHET_NOUN.test(s) || !ATTRIB_VERB.test(s)) continue;
    const windowText = s + ' ' + (sentences[i + 1] || '');

    INLINE_HADITH_RE.lastIndex = 0;
    const hadithCited = INLINE_HADITH_RE.test(windowText);
    if (hadithCited) continue;

    // If the sentence explicitly cites a Quran ayah, it's a Quranic claim
    // attributed through the Prophet's teaching — not a hadith citation
    // problem. Skip.
    INLINE_QURAN_RE.lastIndex = 0;
    INLINE_SURAH_NUM_RE.lastIndex = 0;
    const quranCited = INLINE_QURAN_RE.test(windowText) || INLINE_SURAH_NUM_RE.test(windowText);
    if (quranCited) continue;

    // Direct quote from the Prophet is the clearest hadith claim.
    const directQuote = /["“][^"”]+["”]/.test(s);
    // Shorthand collection mention (name without number) — e.g. "(Bukhari)",
    // "(Bukhari and Muslim)", "narrated by Muslim". These are promote-able
    // via a NotebookLM lookup instead of being removed outright.
    const shorthandNames = [];
    const shorthandRe = /\b(Sahih\s+(?:al-)?Bukhari|Bukhari|Sahih\s+Muslim|Muslim|Sunan\s+(?:Abi|Abu)\s+Dawud|Abu\s+Dawud|Abi\s+Dawud|Sunan\s+Ibn\s+Majah|Ibn\s+Majah|Sunan\s+a[ln]-Nasa'?i|an-Nasa'?i|al-Nasa'?i|Nasa'?i|Jami\s+at-Tirmidhi|Sunan\s+al-Tirmidhi|at-Tirmidhi|al-Tirmidhi|Tirmidhi|Muwatta\s+Malik|Muwatta|Tabarani|al-Tabarani|Ahmad|Musnad\s+Ahmad)\b(?!\s*\d)/gi;
    let sh;
    while ((sh = shorthandRe.exec(windowText))) shorthandNames.push(sh[1]);
    findings.push({
      sentenceIndex: i,
      sentence: s,
      directQuote,
      subBucket: shorthandNames.length ? 'C2' : 'C1',
      shorthandNames: [...new Set(shorthandNames)],
    });
  }
  return findings;
}

// ── Loader ───────────────────────────────────────────────────────────────────
async function loadSeed(pillar) {
  const url = pathToFileURL(resolve(ROOT, `src/data/seed-tasks/${pillar}-seed-tasks.js`));
  const mod = await import(url.href);
  const data = mod[EXPORT_NAMES[pillar]];
  if (!data) throw new Error(`Missing export ${EXPORT_NAMES[pillar]} in ${pillar}`);
  return data;
}

// ── Main audit ───────────────────────────────────────────────────────────────
async function auditPillar(pillar) {
  const data = await loadSeed(pillar);
  const findings = [];

  for (const [submoduleId, tasks] of Object.entries(data)) {
    for (let tIdx = 0; tIdx < tasks.length; tIdx++) {
      const task = tasks[tIdx];
      const taskPath = `${pillar}.${submoduleId}.t${tIdx}`;
      // Also audit task-level description for completeness.
      auditUnit(task, `${taskPath}`, task.title || '(untitled task)', findings, pillar, submoduleId, tIdx, null);
      if (Array.isArray(task.subtasks)) {
        for (let sIdx = 0; sIdx < task.subtasks.length; sIdx++) {
          const st = task.subtasks[sIdx];
          auditUnit(st, `${taskPath}.s${sIdx}`, st.title || '(untitled subtask)', findings, pillar, submoduleId, tIdx, sIdx);
        }
      }
    }
  }
  return findings;
}

function auditUnit(unit, idPath, title, out, pillar, submoduleId, tIdx, sIdx) {
  const desc = unit.description || '';
  const sources = unit.sources || '';

  const quranInline = extractInlineQuranRefs(desc);
  const hadithInline = extractInlineHadithRefs(desc);
  const quranHeadings = extractQuranHeadings(sources);
  const hadithHeadings = extractHadithHeadings(sources);

  // Bucket A — Quran ref in description, missing from sources
  for (const [key, count] of quranInline) {
    if (!quranHeadings.has(key)) {
      out.push({
        idPath, subtaskTitle: title, bucket: 'A', confidence: 'high',
        payload: { quranKey: key, occurrences: count, hasSourcesField: !!sources },
        locator: { pillar, submoduleId, tIdx, sIdx },
      });
    }
  }

  // Bucket B — Hadith ref with collection+number, missing from sources
  for (const slugKey of hadithInline) {
    if (!hadithHeadings.has(slugKey)) {
      const [slug, num] = slugKey.split(':');
      out.push({
        idPath, subtaskTitle: title, bucket: 'B', confidence: 'high',
        payload: { collectionSlug: slug, number: num, hasSourcesField: !!sources },
        locator: { pillar, submoduleId, tIdx, sIdx },
      });
    }
  }

  // Bucket C — uncited hadith claims (C1 = truly uncited, C2 = shorthand lookup-able)
  const uncited = findUncitedHadithSentences(desc);
  for (const u of uncited) {
    out.push({
      idPath, subtaskTitle: title, bucket: 'C', subBucket: u.subBucket, confidence: 'high',
      payload: {
        sentence: u.sentence,
        sentenceIndex: u.sentenceIndex,
        directQuote: u.directQuote,
        shorthandNames: u.shorthandNames,
      },
      locator: { pillar, submoduleId, tIdx, sIdx },
    });
  }

  // Bucket D — low-confidence Quran (surah named without ayah)
  LOW_CONF_SURAH_RE.lastIndex = 0;
  let m;
  while ((m = LOW_CONF_SURAH_RE.exec(desc))) {
    out.push({
      idPath, subtaskTitle: title, bucket: 'D', confidence: 'low',
      payload: { kind: 'surah-no-ayah', snippet: m[0] },
      locator: { pillar, submoduleId, tIdx, sIdx },
    });
  }
  // Low-conf hadith phrasing without collection+number anywhere in desc
  if (LOW_CONF_HADITH_PHRASE.test(desc) && hadithInline.size === 0) {
    const phraseMatch = desc.match(LOW_CONF_HADITH_PHRASE);
    out.push({
      idPath, subtaskTitle: title, bucket: 'D', confidence: 'low',
      payload: { kind: 'vague-hadith-phrase', snippet: phraseMatch[0] },
      locator: { pillar, submoduleId, tIdx, sIdx },
    });
  }
}

// ── Entry ────────────────────────────────────────────────────────────────────
async function main() {
  mkdirSync(resolve(ROOT, 'artifacts/source-audit'), { recursive: true });
  const summary = { total: 0, byBucket: { A: 0, B: 0, C: 0, C1: 0, C2: 0, D: 0 }, byPillar: {} };

  for (const pillar of pillarFilter) {
    if (!PILLARS.includes(pillar)) {
      console.error(`Unknown pillar: ${pillar}`);
      continue;
    }
    const findings = await auditPillar(pillar);
    const outPath = resolve(ROOT, `artifacts/source-audit/${pillar}.jsonl`);
    writeFileSync(outPath, findings.map(f => JSON.stringify(f)).join('\n') + (findings.length ? '\n' : ''));
    const byBucket = { A: 0, B: 0, C: 0, C1: 0, C2: 0, D: 0 };
    for (const f of findings) {
      byBucket[f.bucket]++;
      if (f.subBucket) byBucket[f.subBucket] = (byBucket[f.subBucket] || 0) + 1;
    }
    summary.byPillar[pillar] = { total: findings.length, byBucket };
    summary.total += findings.length;
    for (const k of Object.keys(byBucket)) summary.byBucket[k] = (summary.byBucket[k] || 0) + byBucket[k];
    console.log(`[${pillar}] total=${findings.length} A=${byBucket.A} B=${byBucket.B} C=${byBucket.C} (C1=${byBucket.C1}/C2=${byBucket.C2}) D=${byBucket.D} → ${outPath}`);
  }

  console.log('\nSUMMARY');
  console.log(JSON.stringify(summary, null, 2));

  if (failOn === 'high') {
    const highCount = summary.byBucket.A + summary.byBucket.B + summary.byBucket.C;
    if (highCount > 0) {
      console.error(`\n--fail-on=high: ${highCount} high-confidence finding(s) — exiting 1`);
      process.exit(1);
    }
  }

  // Baseline comparison: fail if any high-conf bucket count exceeds baseline.
  const baselinePath = resolve(ROOT, 'artifacts/source-audit/.baseline.json');
  if (args['write-baseline']) {
    writeFileSync(baselinePath, JSON.stringify(summary, null, 2) + '\n');
    console.log(`\nbaseline written → ${baselinePath}`);
  } else if (failOn === 'increase') {
    if (!existsSync(baselinePath)) {
      console.error('--fail-on=increase requires an existing .baseline.json (run with --write-baseline first)');
      process.exit(2);
    }
    const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
    const regressions = [];
    for (const p of PILLARS) {
      const bBuckets = baseline.byPillar[p]?.byBucket ?? { A: 0, B: 0, C: 0 };
      const cBuckets = summary.byPillar[p]?.byBucket ?? { A: 0, B: 0, C: 0 };
      for (const k of ['A', 'B', 'C']) {
        if ((cBuckets[k] || 0) > (bBuckets[k] || 0)) {
          regressions.push(`${p}.${k}: ${bBuckets[k] || 0} → ${cBuckets[k] || 0}`);
        }
      }
    }
    if (regressions.length) {
      console.error('\n--fail-on=increase: new high-confidence finding(s):');
      for (const r of regressions) console.error(`  ${r}`);
      process.exit(1);
    }
    console.log('\n--fail-on=increase: no regressions vs baseline.');
  }
}

main().catch(e => { console.error(e); process.exit(2); });
