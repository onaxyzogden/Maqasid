// Generates stages/hadith-enrichment-candidates.md — one block per unsourced subtask.
// Sahih sources only: Sahih Bukhari + Sahih Muslim (fawazahmed0 CDN) + Quran.com v4.
//
// Usage:
//   node scripts/generate-hadith-candidates.mjs              # all pillars
//   node scripts/generate-hadith-candidates.mjs --pillar faith

import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CACHE_DIR = resolve(ROOT, 'stages/.hadith-cache');
const OUT_FILE = resolve(ROOT, 'stages/hadith-enrichment-candidates.md');

const PILLARS = [
  { id: 'faith',       label: 'Faith',       file: 'faith-seed-tasks.js',       exportName: 'FAITH_SEED_TASKS' },
  { id: 'life',        label: 'Life',        file: 'life-seed-tasks.js',        exportName: 'LIFE_SEED_TASKS' },
  { id: 'intellect',   label: 'Intellect',   file: 'intellect-seed-tasks.js',   exportName: 'INTELLECT_SEED_TASKS' },
  { id: 'family',      label: 'Family',      file: 'family-seed-tasks.js',      exportName: 'FAMILY_SEED_TASKS' },
  { id: 'wealth',      label: 'Wealth',      file: 'wealth-seed-tasks.js',      exportName: 'WEALTH_SEED_TASKS' },
  { id: 'environment', label: 'Environment', file: 'environment-seed-tasks.js', exportName: 'ENVIRONMENT_SEED_TASKS' },
  { id: 'ummah',       label: 'Ummah',       file: 'ummah-seed-tasks.js',       exportName: 'UMMAH_SEED_TASKS' },
];

const KEY_RE = /^([a-z]+)_([a-z-]+)_(core|growth|excellence)$/;
const LEVEL_LABEL = { core: 'Core', growth: 'Growth', excellence: 'Excellence' };

// ── Hadith cache ──────────────────────────────────────────────────────────────

const COLLECTIONS = {
  bukhari: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari.min.json',
  muslim:  'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-muslim.min.json',
};

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.json();
}

async function loadHadithCollection(name, url) {
  const cachePath = resolve(CACHE_DIR, `${name}.json`);
  if (existsSync(cachePath)) {
    console.log(`  [cache] ${name}`);
    return JSON.parse(await readFile(cachePath, 'utf8'));
  }
  console.log(`  [fetch] ${name} from CDN…`);
  const data = await fetchJson(url);
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(cachePath, JSON.stringify(data), 'utf8');
  console.log(`  [saved] ${cachePath}`);
  return data;
}

// fawazahmed0 structure: { metadata: {...}, hadiths: [ { hadithnumber, text } ] }
function extractHadiths(data, collectionName) {
  const hadiths = data.hadiths ?? data;
  if (!Array.isArray(hadiths)) {
    return Object.values(hadiths).map((h) => ({ collection: collectionName, number: h.hadithnumber, text: h.text ?? '' }));
  }
  return hadiths.map((h) => ({ collection: collectionName, number: h.hadithnumber, text: h.text ?? '' }));
}

function scoreHadith(hadith, queryWords) {
  const lower = hadith.text.toLowerCase();
  return queryWords.filter((w) => w.length > 3 && lower.includes(w)).length;
}

function searchHadiths(allHadiths, query, topN = 3) {
  const words = query.toLowerCase().split(/\s+/);
  return allHadiths
    .map((h) => ({ ...h, score: scoreHadith(h, words) }))
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

// ── Quran search ──────────────────────────────────────────────────────────────

async function searchQuran(query, size = 3) {
  const url = `https://api.quran.com/api/v4/search?q=${encodeURIComponent(query)}&size=${size}&language=en`;
  try {
    const data = await fetchJson(url);
    return (data?.search?.results ?? []).map((v) => ({
      key: v.verse_key,
      arabic: v.text_uthmani ?? '',
      translation: v.translations?.[0]?.text ?? '',
    }));
  } catch (err) {
    console.warn(`  [quran] search failed for "${query}": ${err.message}`);
    return [];
  }
}

// ── Seed file loading ─────────────────────────────────────────────────────────

async function loadPillar(pillar) {
  const url = pathToFileURL(resolve(ROOT, 'src/data/seed-tasks', pillar.file)).href;
  const mod = await import(url);
  return mod[pillar.exportName];
}

// ── Block rendering ───────────────────────────────────────────────────────────

function formatCollectionName(name) {
  return name === 'bukhari' ? 'Sahih Bukhari' : 'Sahih Muslim';
}

function renderBlock(pillarId, submodule, level, task, sub, hadithResults, ayahResults) {
  const header = `## [${pillarId} > ${submodule} > ${level}] ${sub.title}`;
  const taskLine = `**Parent task:** ${task.title}`;

  const status = (hadithResults.length === 0 && ayahResults.length === 0)
    ? 'NO_RESULTS'
    : 'PENDING';

  const hadithSection = hadithResults.length > 0
    ? ['### Hadith Candidates (Sahih Bukhari + Sahih Muslim only)',
        ...hadithResults.map((h) => {
          const snippet = h.text.replace(/\n/g, ' ').slice(0, 120);
          return `- [ ] ${formatCollectionName(h.collection)} ${h.number} — "${snippet}…"`;
        })].join('\n')
    : '### Hadith Candidates (Sahih Bukhari + Sahih Muslim only)\n_No matches found._';

  const ayahSection = ayahResults.length > 0
    ? ['### Ayah Candidates',
        ...ayahResults.map((a) => {
          const trans = a.translation.replace(/<[^>]+>/g, '').slice(0, 120);
          return `- [ ] ${a.key} — ${a.arabic.slice(0, 60)} — "${trans}…"`;
        })].join('\n')
    : '### Ayah Candidates\n_No matches found._';

  return [header, '', taskLine, '', `**Status:** ${status}`, '', hadithSection, '', ayahSection, '', '---', ''].join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const pillarArg = process.argv.includes('--pillar')
    ? process.argv[process.argv.indexOf('--pillar') + 1]
    : null;

  const pillarsToRun = pillarArg
    ? PILLARS.filter((p) => p.id === pillarArg)
    : PILLARS;

  if (pillarsToRun.length === 0) {
    console.error(`Unknown pillar: ${pillarArg}. Valid: ${PILLARS.map((p) => p.id).join(', ')}`);
    process.exit(1);
  }

  console.log('Loading hadith collections (Sahih Bukhari + Sahih Muslim)…');
  const [bukhariRaw, muslimRaw] = await Promise.all([
    loadHadithCollection('eng-bukhari', COLLECTIONS.bukhari),
    loadHadithCollection('eng-muslim', COLLECTIONS.muslim),
  ]);

  const allHadiths = [
    ...extractHadiths(bukhariRaw, 'bukhari'),
    ...extractHadiths(muslimRaw, 'muslim'),
  ];
  console.log(`Loaded ${allHadiths.length} hadiths (Bukhari + Muslim combined)\n`);

  let blocks = [];
  let total = 0, skipped = 0, noResults = 0;

  for (const pillar of pillarsToRun) {
    const dict = await loadPillar(pillar);
    const keys = Object.keys(dict).filter((k) => KEY_RE.test(k));

    for (const key of keys) {
      const m = key.match(KEY_RE);
      const [, pillarId, submoduleTail, levelRaw] = m;
      const level = LEVEL_LABEL[levelRaw];
      const tasks = dict[key];
      if (!Array.isArray(tasks)) continue;

      for (const task of tasks) {
        for (const sub of task.subtasks ?? []) {
          total++;
          if (sub.sources && sub.sources.trim()) { skipped++; continue; }

          const hadithResults = searchHadiths(allHadiths, sub.title);
          if (total % 10 === 0) await new Promise((r) => setTimeout(r, 500));
          const ayahResults = await searchQuran(sub.title);

          if (hadithResults.length === 0 && ayahResults.length === 0) noResults++;

          blocks.push(renderBlock(pillarId, submoduleTail, level, task, sub, hadithResults, ayahResults));
          process.stdout.write('.');
        }
      }
    }
  }
  console.log('\n');

  const header = [
    '# Hadith + Ayah Enrichment Candidates',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Pillars: ${pillarsToRun.map((p) => p.label).join(', ')}`,
    '',
    `- Total subtasks scanned: ${total}`,
    `- Skipped (already sourced): ${skipped}`,
    `- Blocks written: ${total - skipped}`,
    `- NO_RESULTS: ${noResults}`,
    '',
    '## Instructions',
    '',
    '1. For each `PENDING` block: review candidates, check boxes (`- [x]`) for ones to include, change `Status` to `APPROVE`.',
    '2. For `NO_RESULTS` blocks: change status to `REJECT` if you want to leave blank, or manually add candidates.',
    '3. Only `APPROVE` blocks are processed by `apply-hadith-sources.mjs`.',
    '4. Sahih Bukhari + Sahih Muslim only. No other collections.',
    '',
    '---',
    '',
  ].join('\n');

  const existing = existsSync(OUT_FILE) ? await readFile(OUT_FILE, 'utf8') : '';
  const isAppend = existing.trim().length > 0 && pillarArg;
  const content = isAppend ? existing + '\n' + blocks.join('\n') : header + blocks.join('\n');

  await writeFile(OUT_FILE, content, 'utf8');
  console.log(`Written to ${OUT_FILE}`);
  console.log(`  Total: ${total} | Skipped: ${skipped} | Written: ${total - skipped} | NO_RESULTS: ${noResults}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
