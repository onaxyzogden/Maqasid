# Hadith + Ayah Enrichment Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-script dev pipeline that proposes Sahih-graded hadith (Bukhari + Muslim) and Quranic ayat for each of the 1,826 unsourced seed-task subtasks, with a human review gate before any content is written to source files.

**Architecture:** Script 1 (`generate-hadith-candidates.mjs`) fetches and caches the full Sahih Bukhari and Sahih Muslim collections from the fawazahmed0 CDN, then does in-memory keyword search per subtask alongside Quran.com v4 API search, writing a structured Markdown review file. After human review and approval, Script 2 (`apply-hadith-sources.mjs`) parses the review file and patches the `sources` field into matching subtasks. quranMCP is also wired into Claude Code's MCP settings for interactive use in future sessions.

**Tech Stack:** Node.js 18+ ESM, fawazahmed0 hadith-api CDN (public), Quran.com v4 REST API (public, no auth), existing seed-file loading pattern from `extract-subtask-matrix.mjs`.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `.claude/settings.local.json` | Modify | Add `mcpServers.quran` + permission entries |
| `scripts/generate-hadith-candidates.mjs` | Create | Fetch + search + write candidates review file |
| `scripts/apply-hadith-sources.mjs` | Create | Parse approved candidates, patch seed files |
| `stages/.hadith-cache/eng-bukhari.json` | Generated | Cached Bukhari collection (gitignored) |
| `stages/.hadith-cache/eng-muslim.json` | Generated | Cached Muslim collection (gitignored) |
| `stages/hadith-enrichment-candidates.md` | Generated | Review file — human-owned once generated |
| `src/data/seed-tasks/*.js` | Modified by Script 2 | Only after human approval |
| `.gitignore` | Modify | Ignore `stages/.hadith-cache/` |

---

## Shared Utilities (inline in both scripts)

Both scripts reuse these patterns from `scripts/extract-subtask-matrix.mjs`:
- `loadPillar(pillar)` — dynamic `import()` of seed file by URL
- `loadMaqasidPillars()` — loads `MAQASID_PILLARS` from `src/data/maqasid.js`
- `KEY_RE = /^([a-z]+)_([a-z-]+)_(core|growth|excellence)$/`
- `PILLARS` array (same 7 entries)

---

## Task 1: MCP Config + Permissions

**Files:**
- Modify: `.claude/settings.local.json`
- Modify: `.gitignore`

- [ ] **Step 1: Add quranMCP server and permissions to `.claude/settings.local.json`**

Replace the entire file with:

```json
{
  "permissions": {
    "allow": [
      "mcp__Claude_Preview__preview_start",
      "Bash(curl -fsSL https://claude.ai/install.sh)",
      "Bash(bash)",
      "Bash(pip install:*)",
      "Bash(npm run:*)",
      "Bash(npx eslint:*)",
      "Bash(npx vite:*)",
      "Bash(wc -l \"/c/Users/MY OWN AXIS/Documents/MAQASID OS - V2.1/src/data/seed-tasks\"/*.js)",
      "Bash(node scripts/extract-subtask-matrix.mjs)",
      "Bash(node scripts/generate-hadith-candidates.mjs*)",
      "Bash(node scripts/apply-hadith-sources.mjs*)"
    ]
  },
  "mcpServers": {
    "quran": {
      "command": "npx",
      "args": ["-y", "@quranmcp/server"]
    }
  }
}
```

- [ ] **Step 2: Add hadith cache to `.gitignore`**

Open `.gitignore` and append:

```
# Hadith cache (fetched at authoring time, not committed)
stages/.hadith-cache/
```

- [ ] **Step 3: Commit**

```bash
git add .claude/settings.local.json .gitignore
git commit -m "feat(tooling): add quranMCP server config and enrichment script permissions"
```

---

## Task 2: Script 1 — Candidate Generator

**Files:**
- Create: `scripts/generate-hadith-candidates.mjs`

This script fetches and caches Sahih Bukhari + Muslim, does keyword search, calls Quran.com API, and writes the candidates review file. It processes one pillar at a time (pass `--pillar faith` etc.) to keep runs manageable.

- [ ] **Step 1: Create `scripts/generate-hadith-candidates.mjs`**

```js
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
    // Some editions nest differently — handle flat object keyed by number
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
          // 500ms delay every 10 Quran API calls to be polite
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

  // Append to existing file if it exists, otherwise create fresh
  const existing = existsSync(OUT_FILE) ? await readFile(OUT_FILE, 'utf8') : '';
  const isAppend = existing.trim().length > 0 && pillarArg;
  const content = isAppend ? existing + '\n' + blocks.join('\n') : header + blocks.join('\n');

  await writeFile(OUT_FILE, content, 'utf8');
  console.log(`Written to ${OUT_FILE}`);
  console.log(`  Total: ${total} | Skipped: ${skipped} | Written: ${total - skipped} | NO_RESULTS: ${noResults}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
```

- [ ] **Step 2: Run a dry test against the Faith pillar only (smallest collection)**

```bash
node scripts/generate-hadith-candidates.mjs --pillar faith
```

Expected output:
```
Loading hadith collections (Sahih Bukhari + Sahih Muslim)…
  [fetch] eng-bukhari from CDN…
  [saved] …/stages/.hadith-cache/eng-bukhari.json
  [fetch] eng-muslim from CDN…
  [saved] …/stages/.hadith-cache/eng-muslim.json
Loaded NNNNN hadiths (Bukhari + Muslim combined)

...........[dots for each subtask]

Written to …/stages/hadith-enrichment-candidates.md
  Total: 212 | Skipped: 3 | Written: 209 | NO_RESULTS: N
```

- [ ] **Step 3: Verify output structure**

Open `stages/hadith-enrichment-candidates.md`. Confirm:
- File starts with `# Hadith + Ayah Enrichment Candidates` header
- First block is `## [faith > shahada > Core] …`
- Blocks with matches show `**Status:** PENDING` with candidate checkboxes
- Blocks with zero matches show `**Status:** NO_RESULTS`
- No block has an empty `### Hadith Candidates` section (must show either candidates or `_No matches found._`)
- At least some Bukhari/Muslim candidates appear in the Shahada subtask blocks (Shahada is a common Quran/hadith topic)

- [ ] **Step 4: Run a second time to confirm caching and skip logic**

```bash
node scripts/generate-hadith-candidates.mjs --pillar faith
```

Expected: `[cache]` lines instead of `[fetch]`, and `Skipped: 3` (the 3 already-sourced Faith subtasks).

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-hadith-candidates.mjs
git commit -m "feat(tooling): add hadith+ayah candidate generator script"
```

---

## Task 3: Script 2 — Write-back

**Files:**
- Create: `scripts/apply-hadith-sources.mjs`

This script parses the review file, finds `APPROVE` blocks with checked items (`- [x]`), builds a formatted `sources` string, and patches the matching subtask in the seed file.

- [ ] **Step 1: Create `scripts/apply-hadith-sources.mjs`**

```js
// Reads stages/hadith-enrichment-candidates.md, finds APPROVE blocks,
// and patches the sources field into the matching subtask in the seed file.
//
// Usage:
//   node scripts/apply-hadith-sources.mjs
//   node scripts/apply-hadith-sources.mjs --dry-run   # preview changes, no writes

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const CANDIDATES_FILE = resolve(ROOT, 'stages/hadith-enrichment-candidates.md');

const PILLARS = [
  { id: 'faith',       file: 'faith-seed-tasks.js' },
  { id: 'life',        file: 'life-seed-tasks.js' },
  { id: 'intellect',   file: 'intellect-seed-tasks.js' },
  { id: 'family',      file: 'family-seed-tasks.js' },
  { id: 'wealth',      file: 'wealth-seed-tasks.js' },
  { id: 'environment', file: 'environment-seed-tasks.js' },
  { id: 'ummah',       file: 'ummah-seed-tasks.js' },
];

const DRY_RUN = process.argv.includes('--dry-run');

// ── Parse candidates file ─────────────────────────────────────────────────────

function parseBlocks(md) {
  // Split on ## headings
  const rawBlocks = md.split(/\n(?=## \[)/).filter((b) => b.trim().startsWith('## ['));
  return rawBlocks.map((block) => {
    const headerMatch = block.match(/^## \[([a-z]+) > ([a-z-]+) > (Core|Growth|Excellence)\] (.+)/m);
    if (!headerMatch) return null;
    const [, pillar, submodule, level, subtaskTitle] = headerMatch;

    const statusMatch = block.match(/\*\*Status:\*\*\s*(\w+)/);
    const status = statusMatch?.[1] ?? 'PENDING';

    // Checked hadith lines
    const hadithSection = block.match(/### Hadith Candidates.*?\n([\s\S]*?)(?=###|$)/)?.[1] ?? '';
    const approvedHadiths = [...hadithSection.matchAll(/- \[x\] (.+)/g)].map((m) => m[1].trim());

    // Checked ayah lines
    const ayahSection = block.match(/### Ayah Candidates.*?\n([\s\S]*?)(?=---|$)/)?.[1] ?? '';
    const approvedAyahs = [...ayahSection.matchAll(/- \[x\] (.+)/g)].map((m) => m[1].trim());

    return { pillar, submodule, level, subtaskTitle: subtaskTitle.trim(), status, approvedHadiths, approvedAyahs };
  }).filter(Boolean);
}

// ── Format sources string ─────────────────────────────────────────────────────

function formatSources(approvedHadiths, approvedAyahs) {
  const parts = [];

  if (approvedAyahs.length > 0) {
    parts.push('**I. Sources from the Quran**\n');
    for (const ayah of approvedAyahs) {
      // Format: "2:285 — Arabic — Translation"
      const [key, ...rest] = ayah.split(' — ');
      const arabic = rest[0]?.replace(/…"$/, '').replace(/^"/, '') ?? '';
      const translation = rest[1]?.replace(/…"$/, '').replace(/^"/, '') ?? '';
      parts.push(`### Surah (${key})\n**Arabic:** ${arabic}\n**Translation:** ${translation}`);
    }
  }

  if (approvedHadiths.length > 0) {
    const section = approvedAyahs.length > 0 ? 'II' : 'I';
    parts.push(`**${section}. Sources from the Hadith**\n`);
    for (const hadith of approvedHadiths) {
      // Format: "Sahih Bukhari 8 — "snippet…""
      const match = hadith.match(/^(Sahih Bukhari|Sahih Muslim) (\d+) — "(.+)"/);
      if (!match) { parts.push(`### Note\n${hadith}\n*(Grade: Sahih)*`); continue; }
      const [, collection, number, snippet] = match;
      parts.push(`### ${collection} ${number}\n${snippet}\n*(Grade: Sahih)*`);
    }
  }

  return parts.join('\n\n');
}

// ── Patch seed file ───────────────────────────────────────────────────────────

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function patchSeedFile(fileContent, subtaskTitle, sourcesContent) {
  // Match: title: 'the title', done: false,
  // The title may use single or double quotes.
  const escapedTitle = escapeRegex(subtaskTitle);
  const pattern = new RegExp(
    `(title:\\s*['"\`]${escapedTitle}['"\`],\\s*done:\\s*false,)`,
    'm'
  );

  if (!pattern.test(fileContent)) return null; // not found

  // Check sources field doesn't already exist right after this match
  const alreadySourced = new RegExp(
    `title:\\s*['"\`]${escapedTitle}['"\`],\\s*done:\\s*false,[\\s\\S]{0,30}sources:`,
    'm'
  );
  if (alreadySourced.test(fileContent)) return fileContent; // already has sources — skip

  // Inject sources field after "done: false,"
  const backtickSources = sourcesContent.replace(/`/g, '\\`');
  return fileContent.replace(pattern, `$1\n          sources: \`${backtickSources}\`,`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const md = await readFile(CANDIDATES_FILE, 'utf8');
  const blocks = parseBlocks(md);

  const approvedBlocks = blocks.filter(
    (b) => b.status === 'APPROVE' && (b.approvedHadiths.length > 0 || b.approvedAyahs.length > 0)
  );

  console.log(`Parsed ${blocks.length} blocks, ${approvedBlocks.length} approved with checked items.`);
  if (DRY_RUN) console.log('DRY RUN — no files will be written.\n');

  // Group by pillar to minimize file reads
  const byPillar = {};
  for (const block of approvedBlocks) {
    (byPillar[block.pillar] ??= []).push(block);
  }

  let updated = 0, notFound = 0, alreadySourced = 0;

  for (const [pillarId, pillarBlocks] of Object.entries(byPillar)) {
    const pillar = PILLARS.find((p) => p.id === pillarId);
    if (!pillar) { console.warn(`Unknown pillar: ${pillarId}`); continue; }

    const filePath = resolve(ROOT, 'src/data/seed-tasks', pillar.file);
    let content = await readFile(filePath, 'utf8');
    const original = content;

    for (const block of pillarBlocks) {
      const sources = formatSources(block.approvedHadiths, block.approvedAyahs);
      const patched = patchSeedFile(content, block.subtaskTitle, sources);

      if (patched === null) {
        console.warn(`  NOT FOUND: "${block.subtaskTitle}" in ${pillar.file}`);
        notFound++;
      } else if (patched === content) {
        console.log(`  SKIP (already sourced): "${block.subtaskTitle}"`);
        alreadySourced++;
      } else {
        console.log(`  PATCH: "${block.subtaskTitle}"`);
        content = patched;
        updated++;
      }
    }

    if (!DRY_RUN && content !== original) {
      await writeFile(filePath, content, 'utf8');
      console.log(`  Saved: ${pillar.file}`);
    }
  }

  console.log(`\nDone. Updated: ${updated} | Already sourced: ${alreadySourced} | Not found: ${notFound}`);
  if (notFound > 0) console.warn('Check NOT FOUND entries — titles may have changed since candidates file was generated.');
}

main().catch((err) => { console.error(err); process.exit(1); });
```

- [ ] **Step 2: Create a minimal test candidates fixture and verify parsing**

Create `stages/hadith-enrichment-candidates.md` (or append to it) a test block manually — take the first Shahada block generated in Task 2, change its status to `APPROVE`, and check one hadith and one ayah:

```markdown
## [faith > shahada > Core] Recite the full Shahada with correct pronunciation and meaning

**Parent task:** Testify there is no God but Allah

**Status:** APPROVE

### Hadith Candidates (Sahih Bukhari + Sahih Muslim only)
- [x] Sahih Bukhari 8 — "Islam is built on five: the testimony that there is no god but Allah…"
- [ ] Sahih Muslim 16 — "Islam is built upon five things…"

### Ayah Candidates
- [x] 47:19 — فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ إِلَّا ٱللَّهُ — "So know that there is no deity except Allah…"

---
```

- [ ] **Step 3: Dry-run the write-back to confirm parsing is correct**

```bash
node scripts/apply-hadith-sources.mjs --dry-run
```

Expected output:
```
Parsed N blocks, 1 approved with checked items.
DRY RUN — no files will be written.

  PATCH: "Recite the full Shahada with correct pronunciation and meaning"

Done. Updated: 1 | Already sourced: 0 | Not found: 0
```

If output shows `NOT FOUND`, check that the subtask title in the test block exactly matches the title in `faith-seed-tasks.js` (copy-paste from the file).

- [ ] **Step 4: Run for real and verify the patch**

```bash
node scripts/apply-hadith-sources.mjs
```

Then open `src/data/seed-tasks/faith-seed-tasks.js` and search for `Recite the full Shahada with correct pronunciation`. The subtask object should now have a `sources` field with the formatted hadith and ayah content between the backticks.

Confirm the file still parses cleanly:

```bash
node -e "import('./src/data/seed-tasks/faith-seed-tasks.js').then(m => console.log('OK:', Object.keys(m.FAITH_SEED_TASKS).length, 'keys'))"
```

Expected: `OK: N keys` with no error.

- [ ] **Step 5: Re-run write-back to confirm idempotency**

```bash
node scripts/apply-hadith-sources.mjs
```

Expected:
```
Parsed N blocks, 1 approved with checked items.
  SKIP (already sourced): "Recite the full Shahada with correct pronunciation and meaning"
Done. Updated: 0 | Already sourced: 1 | Not found: 0
```

- [ ] **Step 6: Commit**

```bash
git add scripts/apply-hadith-sources.mjs
git commit -m "feat(tooling): add hadith sources write-back script"
```

---

## Task 4: End-to-End Verification + Generator Coverage Check

- [ ] **Step 1: Run generator across remaining pillars**

Run each pillar separately to stay within API rate limits. Delete the candidates file first if starting fresh — the script appends, so re-running the same pillar twice will duplicate its blocks:

```bash
node scripts/generate-hadith-candidates.mjs --pillar faith
node scripts/generate-hadith-candidates.mjs --pillar life
node scripts/generate-hadith-candidates.mjs --pillar intellect
node scripts/generate-hadith-candidates.mjs --pillar family
node scripts/generate-hadith-candidates.mjs --pillar wealth
node scripts/generate-hadith-candidates.mjs --pillar environment
node scripts/generate-hadith-candidates.mjs --pillar ummah
```

Each run appends to `stages/hadith-enrichment-candidates.md`. Confirm no `[fetch]` lines on subsequent runs (cache hit), and `Skipped: 3` only on faith (the 3 existing sourced subtasks).

- [ ] **Step 2: Confirm NO_RESULTS rate**

Check the output summary lines. A `NO_RESULTS` rate above 30% suggests the keyword search may be too strict — adjust by lowering the minimum query word length from 3 to 2 in `scoreHadith` if needed:

```js
// In generate-hadith-candidates.mjs, change:
return queryWords.filter((w) => w.length > 3 && lower.includes(w)).length;
// To:
return queryWords.filter((w) => w.length > 2 && lower.includes(w)).length;
```

Re-run the affected pillar to see if coverage improves.

- [ ] **Step 3: Verify Sahih-only constraint**

Search the candidates file for any collection name other than `Sahih Bukhari` or `Sahih Muslim`:

```bash
grep -n "- \[ \]\|- \[x\]" stages/hadith-enrichment-candidates.md | grep -v "Sahih Bukhari\|Sahih Muslim\|^\|^---\| — [0-9]"
```

Expected: zero matches (all hadith lines reference only Bukhari or Muslim).

- [ ] **Step 4: Confirm app still builds**

```bash
npm run build
```

Expected: build succeeds with no errors. The seed files are not imported at build time in a way that would break, but confirm the build passes after the write-back test patch from Task 3.

- [ ] **Step 5: Final commit**

```bash
git add stages/hadith-enrichment-candidates.md
git commit -m "feat(data): initial hadith+ayah enrichment candidates — all pillars"
```

---

## Theological Constraint Reminder

**Sahih Bukhari and Sahih Muslim only.** These are the two most rigorously authenticated collections in Sunni hadith sciences — all hadiths within them are considered Sahih without needing per-hadith grade checking. The other four books of the Six (Abu Dawud, Tirmidhi, Nasa'i, Ibn Majah) contain mixed grades and are excluded from this pipeline. This is the strictest possible implementation of the Sahih-only rule and is grounded in the prophetic guidance to leave what is doubtful (Tirmidhi 2518).
