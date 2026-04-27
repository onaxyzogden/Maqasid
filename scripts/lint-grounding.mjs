// Lint the `sources` field on every seeded subtask against docs/grounding-schema.md.
//
// Usage:
//   node scripts/lint-grounding.mjs               # all pillars, human summary
//   node scripts/lint-grounding.mjs --pillar=faith
//   node scripts/lint-grounding.mjs --json        # machine output
//
// Read-only. Never writes to seed-task files.

import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PILLARS = [
  { id: 'faith',       file: 'faith-seed-tasks.js',       exportName: 'FAITH_SEED_TASKS' },
  { id: 'health',      file: 'health-seed-tasks.js',      exportName: 'HEALTH_SEED_TASKS' },
  { id: 'intellect',   file: 'intellect-seed-tasks.js',   exportName: 'INTELLECT_SEED_TASKS' },
  { id: 'family',      file: 'family-seed-tasks.js',      exportName: 'FAMILY_SEED_TASKS' },
  { id: 'wealth',      file: 'wealth-seed-tasks.js',      exportName: 'WEALTH_SEED_TASKS' },
  { id: 'environment', file: 'environment-seed-tasks.js', exportName: 'ENVIRONMENT_SEED_TASKS' },
  { id: 'ummah',       file: 'ummah-seed-tasks.js',       exportName: 'UMMAH_SEED_TASKS' },
  { id: 'prayer',      file: 'prayer-seed-tasks.js',      exportName: 'PRAYER_SEED_TASKS' },
];

const VALID_TIERS = new Set(['Bayyinah', 'Qarina', 'Niyyah']);
const VALID_RELEVANCE = new Set(['direct', 'contextual', 'thematic']);

function parseArgs(argv) {
  const out = { pillar: null, json: false, strict: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--json') out.json = true;
    else if (arg === '--strict') out.strict = true;
    else if (arg.startsWith('--pillar=')) out.pillar = arg.slice('--pillar='.length);
  }
  return out;
}

async function loadPillar(pillar) {
  const url = pathToFileURL(resolve(ROOT, 'src/data/seed-tasks', pillar.file)).href;
  const mod = await import(url);
  const data = mod[pillar.exportName];
  if (!data || typeof data !== 'object') {
    throw new Error(`Missing export ${pillar.exportName} from ${pillar.file}`);
  }
  return data;
}

// Legacy markdown string → presence counts. Cannot infer tier/relevance.
function analyzeLegacyString(s) {
  const quran = (s.match(/###\s*Quran\b/gi) || []).length;
  const hadith = (s.match(/###\s*(Sahih|Musnad|Sunan|Jami|Muwatta|Nasai|Abu\s*Dawud|Tirmidhi|Ibn\s*Majah|Bukhari|Muslim|Daraqutni|Bayhaqi|Hakim)\b/gi) || []).length;
  return { quran, hadith };
}

// Structured array → full conformance check.
function analyzeArray(arr) {
  const errors = [];
  let quran = 0;
  let hadith = 0;
  let passesBar = false;
  arr.forEach((entry, i) => {
    if (!entry || typeof entry !== 'object') {
      errors.push(`entry[${i}] not an object`);
      return;
    }
    if (entry.kind === 'quran') quran++;
    else if (entry.kind === 'hadith') hadith++;
    else errors.push(`entry[${i}].kind must be quran|hadith, got ${JSON.stringify(entry.kind)}`);
    for (const req of ['ref', 'translation', 'relevance', 'provenanceTier', 'rationale']) {
      if (!entry[req] || typeof entry[req] !== 'string') errors.push(`entry[${i}].${req} missing or non-string`);
    }
    if (entry.relevance && !VALID_RELEVANCE.has(entry.relevance)) {
      errors.push(`entry[${i}].relevance ${JSON.stringify(entry.relevance)} not in {direct,contextual,thematic}`);
    }
    if (entry.provenanceTier && !VALID_TIERS.has(entry.provenanceTier)) {
      errors.push(`entry[${i}].provenanceTier ${JSON.stringify(entry.provenanceTier)} not in {Bayyinah,Qarina,Niyyah}`);
    }
    if (entry.kind === 'quran' && !entry.arabic) errors.push(`entry[${i}] quran entry missing arabic`);
    if (entry.kind === 'hadith' && !entry.hadithGrade) errors.push(`entry[${i}] hadith entry missing hadithGrade`);
    const meetsBar = VALID_TIERS.has(entry.provenanceTier)
      && entry.provenanceTier !== 'Niyyah'
      && VALID_RELEVANCE.has(entry.relevance)
      && entry.relevance !== 'thematic';
    if (meetsBar) passesBar = true;
  });
  return { quran, hadith, errors, groundedBar: passesBar ? 'yes' : 'no' };
}

function lintSubtask({ pillarId, boardKey, taskIndex, subtaskIndex, task, sub }) {
  const idPath = `${pillarId}.${boardKey}[${taskIndex}].subtasks[${subtaskIndex}]`;
  const record = {
    idPath,
    taskTitle: task.title,
    subtaskTitle: sub.title,
    shape: 'missing',
    quran: 0,
    hadith: 0,
    groundedBar: 'no',
    errors: [],
  };
  if (sub.sources == null) {
    record.errors.push('sources field absent');
    return record;
  }
  if (typeof sub.sources === 'string') {
    record.shape = 'string';
    const counts = analyzeLegacyString(sub.sources);
    record.quran = counts.quran;
    record.hadith = counts.hadith;
    record.groundedBar = (counts.quran + counts.hadith) > 0 ? 'unknown-legacy' : 'no';
    if (sub.sources.trim() === '') record.errors.push('sources string is empty');
    return record;
  }
  if (Array.isArray(sub.sources)) {
    record.shape = 'array';
    const r = analyzeArray(sub.sources);
    record.quran = r.quran;
    record.hadith = r.hadith;
    record.errors = r.errors;
    record.groundedBar = r.errors.length === 0 ? r.groundedBar : 'no';
    if (sub.sources.length === 0) record.errors.push('sources array is empty');
    return record;
  }
  record.errors.push(`sources has unsupported type: ${typeof sub.sources}`);
  return record;
}

function walkPillar(pillarId, data) {
  const records = [];
  for (const [boardKey, tasks] of Object.entries(data)) {
    if (!Array.isArray(tasks)) continue;
    tasks.forEach((task, taskIndex) => {
      const subs = Array.isArray(task?.subtasks) ? task.subtasks : [];
      subs.forEach((sub, subtaskIndex) => {
        records.push(lintSubtask({ pillarId, boardKey, taskIndex, subtaskIndex, task, sub }));
      });
    });
  }
  return records;
}

function summarize(records) {
  const s = {
    total: records.length,
    byShape: { missing: 0, string: 0, array: 0 },
    byGroundedBar: { yes: 0, no: 0, 'unknown-legacy': 0 },
    withErrors: 0,
    noCitationsAtAll: 0,
  };
  for (const r of records) {
    s.byShape[r.shape] = (s.byShape[r.shape] || 0) + 1;
    s.byGroundedBar[r.groundedBar] = (s.byGroundedBar[r.groundedBar] || 0) + 1;
    if (r.errors.length > 0) s.withErrors++;
    if (r.shape !== 'array' && r.quran + r.hadith === 0 && r.shape !== 'missing') s.noCitationsAtAll++;
    if (r.shape === 'missing') s.noCitationsAtAll++;
  }
  return s;
}

function printHumanSummary(pillarId, records, summary) {
  const bar = '─'.repeat(60);
  console.log(bar);
  console.log(`Pillar: ${pillarId}`);
  console.log(bar);
  console.log(`  subtasks total:          ${summary.total}`);
  console.log(`  shape = missing:         ${summary.byShape.missing}`);
  console.log(`  shape = legacy string:   ${summary.byShape.string}`);
  console.log(`  shape = structured arr:  ${summary.byShape.array}`);
  console.log(`  grounded-bar = yes:      ${summary.byGroundedBar.yes}`);
  console.log(`  grounded-bar = no:       ${summary.byGroundedBar.no}`);
  console.log(`  grounded-bar = unknown:  ${summary.byGroundedBar['unknown-legacy']}`);
  console.log(`  subtasks with errors:    ${summary.withErrors}`);
  console.log(`  zero citations at all:   ${summary.noCitationsAtAll}`);
  const offenders = records.filter((r) => r.shape === 'missing' || r.errors.length > 0);
  if (offenders.length > 0) {
    console.log(`\n  First ${Math.min(10, offenders.length)} non-conforming subtasks:`);
    for (const r of offenders.slice(0, 10)) {
      console.log(`    • ${r.idPath}`);
      console.log(`        "${r.subtaskTitle}"`);
      for (const e of r.errors.slice(0, 3)) console.log(`        ✗ ${e}`);
    }
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const pillars = args.pillar
    ? PILLARS.filter((p) => p.id === args.pillar)
    : PILLARS;
  if (pillars.length === 0) {
    console.error(`No pillar matches --pillar=${args.pillar}`);
    process.exit(2);
  }

  const allRecords = {};
  const allSummaries = {};
  let anyMissing = false;

  for (const pillar of pillars) {
    let data;
    try {
      data = await loadPillar(pillar);
    } catch (err) {
      console.error(`Failed to load ${pillar.id}: ${err.message}`);
      process.exitCode = 2;
      continue;
    }
    const records = walkPillar(pillar.id, data);
    const summary = summarize(records);
    allRecords[pillar.id] = records;
    allSummaries[pillar.id] = summary;
    if (summary.byShape.missing > 0) anyMissing = true;
  }

  if (args.json) {
    console.log(JSON.stringify({ summaries: allSummaries, records: allRecords }, null, 2));
  } else {
    for (const pillar of pillars) {
      if (!allSummaries[pillar.id]) continue;
      printHumanSummary(pillar.id, allRecords[pillar.id], allSummaries[pillar.id]);
    }
    console.log('\nSchema: docs/grounding-schema.md');
  }

  if (anyMissing) process.exit(1);

  if (args.strict) {
    // Strict mode: any legacy-string entry, structured-entry error, or empty-array
    // counts as a build-breaking violation. Default mode stays informational so
    // existing CI / dev workflows aren't broken.
    let totalLegacy = 0;
    let totalErrors = 0;
    let totalEmpty = 0;
    for (const [pid, summary] of Object.entries(allSummaries)) {
      const legacy = summary.byShape.string || 0;
      totalLegacy += legacy;
      totalErrors += summary.withErrors || 0;
      // empty-array isn't tracked separately by summarize() — recompute here
      const empty = (allRecords[pid] || []).filter((r) => Array.isArray(r) ? false : (r.shape === 'array' && r.errors.some((e) => /empty/.test(e)))).length;
      totalEmpty += empty;
    }
    // Ratchet 0 — the optional 4-rakʿat before-Isha sunnah was backfilled with
    // Sahih al-Bukhari 627 / Muslim 838 via NotebookLM Muslim Scholar.
    const ALLOW_EMPTY = 0;
    const nonEmptyErrors = totalErrors - Math.min(totalEmpty, ALLOW_EMPTY);
    if (totalLegacy > 0 || nonEmptyErrors > 0) {
      console.error(`\n[STRICT] Failed: ${totalLegacy} legacy-string entries, ${nonEmptyErrors} unexpected schema errors (${totalEmpty} empty-array, ratchet allows ${ALLOW_EMPTY}).`);
      console.error('Migrate legacy entries to structured arrays per wiki/decisions/2026-04-18-milos-grounding-two-axis.md');
      process.exit(1);
    }
    console.log(`\n[STRICT] Pass: all entries conform to two-axis schema (${totalEmpty} empty-array under ratchet ${ALLOW_EMPTY}).`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
