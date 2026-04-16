// Generates stages/hadith-enrichment-candidates.md (human review)
// and stages/hadith-enrichment-candidates.json (machine source-of-truth).
//
// The markdown file shows snippets for readability; the JSON sidecar
// carries the FULL Arabic + translation + hadith text. Script 2 reads
// from the JSON so nothing gets truncated on write-back.
//
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
const OUT_MD = resolve(ROOT, 'stages/hadith-enrichment-candidates.md');
const OUT_JSON = resolve(ROOT, 'stages/hadith-enrichment-candidates.json');

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
  return data;
}

function extractHadiths(data, collectionName) {
  const hadiths = data.hadiths ?? data;
  if (!Array.isArray(hadiths)) {
    return Object.values(hadiths).map((h) => ({ collection: collectionName, number: h.hadithnumber, text: h.text ?? '' }));
  }
  return hadiths.map((h) => ({ collection: collectionName, number: h.hadithnumber, text: h.text ?? '' }));
}

// Stop-words we always strip; short meaningful words like "pray", "alms",
// "sins", "hajj", "fast", "zuhd" are preserved even at 3-4 chars.
const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'your', 'you',
  'are', 'not', 'but', 'all', 'any', 'can', 'its', 'was', 'has', 'had',
  'how', 'who', 'why', 'when', 'what', 'where', 'into', 'them', 'their',
  'about', 'after', 'before', 'also', 'have', 'been', 'will', 'would',
  'should', 'could', 'these', 'those', 'each', 'than', 'then', 'over',
]);

function tokenize(query) {
  return query
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
}

function scoreHadith(hadith, queryWords) {
  const lower = hadith.text.toLowerCase();
  return queryWords.filter((w) => lower.includes(w)).length;
}

function searchHadiths(allHadiths, query, topN = 3) {
  const words = tokenize(query);
  if (words.length === 0) return [];
  return allHadiths
    .map((h) => ({ ...h, score: scoreHadith(h, words) }))
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

async function searchQuran(query, size = 3) {
  const url = `https://api.quran.com/api/v4/search?q=${encodeURIComponent(query)}&size=${size}&language=en`;
  const attempts = 3;
  for (let i = 0; i < attempts; i++) {
    try {
      const data = await fetchJson(url);
      return (data?.search?.results ?? []).map((v) => ({
        key: v.verse_key,
        arabic: v.text_uthmani ?? '',
        translation: (v.translations?.[0]?.text ?? '').replace(/<[^>]+>/g, ''),
      }));
    } catch (err) {
      if (i === attempts - 1) {
        console.warn(`  [quran] search failed for "${query}" after ${attempts} attempts: ${err.message}`);
        return [];
      }
      const backoff = 500 * Math.pow(2, i);
      await new Promise((r) => setTimeout(r, backoff));
    }
  }
  return [];
}

async function loadPillar(pillar) {
  const url = pathToFileURL(resolve(ROOT, 'src/data/seed-tasks', pillar.file)).href;
  const mod = await import(url);
  return mod[pillar.exportName];
}

function formatCollectionName(name) {
  return name === 'bukhari' ? 'Sahih Bukhari' : 'Sahih Muslim';
}

// Stable block ID used as the JSON sidecar key and in the MD header.
function blockId(pillarId, submodule, level, subtaskTitle) {
  return `${pillarId} > ${submodule} > ${level} :: ${subtaskTitle}`;
}

function renderBlock(pillarId, submodule, level, task, sub, hadithResults, ayahResults) {
  const id = blockId(pillarId, submodule, level, sub.title);
  const header = `## [${pillarId} > ${submodule} > ${level}] ${sub.title}`;
  const idLine = `<!-- id: ${id} -->`;
  const taskLine = `**Parent task:** ${task.title}`;

  const status = (hadithResults.length === 0 && ayahResults.length === 0) ? 'NO_RESULTS' : 'PENDING';

  const hadithSection = hadithResults.length > 0
    ? ['### Hadith Candidates (Sahih Bukhari + Sahih Muslim only)',
        ...hadithResults.map((h, i) => {
          const snippet = h.text.replace(/\n/g, ' ').slice(0, 120);
          const ellipsis = h.text.length > 120 ? '…' : '';
          return `- [ ] H${i + 1}: ${formatCollectionName(h.collection)} ${h.number} — "${snippet}${ellipsis}"`;
        })].join('\n')
    : '### Hadith Candidates (Sahih Bukhari + Sahih Muslim only)\n_No matches found._';

  const ayahSection = ayahResults.length > 0
    ? ['### Ayah Candidates',
        ...ayahResults.map((a, i) => {
          const trans = a.translation.slice(0, 120);
          const ellipsis = a.translation.length > 120 ? '…' : '';
          return `- [ ] A${i + 1}: ${a.key} — "${trans}${ellipsis}"`;
        })].join('\n')
    : '### Ayah Candidates\n_No matches found._';

  return [header, idLine, '', taskLine, '', `**Status:** ${status}`, '', hadithSection, '', ayahSection, '', '---', ''].join('\n');
}

function parseExistingHeaders(md) {
  const headers = new Set();
  const re = /<!-- id: (.+?) -->/g;
  let m;
  while ((m = re.exec(md)) !== null) headers.add(m[1]);
  return headers;
}

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

  // Load existing data (for append/dedup).
  const existingMd = existsSync(OUT_MD) ? await readFile(OUT_MD, 'utf8') : '';
  const existingJson = existsSync(OUT_JSON) ? JSON.parse(await readFile(OUT_JSON, 'utf8')) : {};
  const existingHeaders = parseExistingHeaders(existingMd);

  const blocks = [];
  const sidecar = { ...existingJson };
  let total = 0, skipped = 0, noResults = 0, dedupSkipped = 0;

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

          const id = blockId(pillarId, submoduleTail, level, sub.title);
          if (existingHeaders.has(id)) { dedupSkipped++; continue; }

          const hadithResults = searchHadiths(allHadiths, sub.title);
          if (total % 10 === 0) await new Promise((r) => setTimeout(r, 500));
          const ayahResults = await searchQuran(sub.title);

          if (hadithResults.length === 0 && ayahResults.length === 0) noResults++;

          sidecar[id] = {
            pillar: pillarId,
            submodule: submoduleTail,
            level,
            subtaskTitle: sub.title,
            parentTask: task.title,
            hadiths: hadithResults.map((h) => ({
              collection: h.collection,
              number: h.number,
              text: h.text,
            })),
            ayahs: ayahResults.map((a) => ({
              key: a.key,
              arabic: a.arabic,
              translation: a.translation,
            })),
          };

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
    `- Skipped (already in candidates file): ${dedupSkipped}`,
    `- Blocks written this run: ${blocks.length}`,
    `- NO_RESULTS this run: ${noResults}`,
    '',
    '## Instructions',
    '',
    '1. For each `PENDING` block: review candidates, check boxes (`- [x]`) for ones to include, change `Status` to `APPROVE`.',
    '2. For `NO_RESULTS` blocks: change status to `REJECT` if you want to leave blank, or manually add candidates.',
    '3. Only `APPROVE` blocks are processed by `apply-hadith-sources.mjs`.',
    '4. Sahih Bukhari + Sahih Muslim only. No other collections.',
    '5. Full Arabic/translation text lives in `hadith-enrichment-candidates.json` — the snippets here are for review only.',
    '',
    '---',
    '',
  ].join('\n');

  const isAppend = existingMd.trim().length > 0 && pillarArg;
  const content = isAppend ? existingMd + '\n' + blocks.join('\n') : header + blocks.join('\n');

  await writeFile(OUT_MD, content, 'utf8');
  await writeFile(OUT_JSON, JSON.stringify(sidecar, null, 2), 'utf8');
  console.log(`Written: ${OUT_MD}`);
  console.log(`Written: ${OUT_JSON}`);
  console.log(`  Total: ${total} | Already sourced: ${skipped} | Dedup skipped: ${dedupSkipped} | Written: ${blocks.length} | NO_RESULTS: ${noResults}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
