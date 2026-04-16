// Reads stages/hadith-enrichment-candidates.md, finds APPROVE blocks,
// and patches the sources field into the matching subtask in the seed file.
//
// Usage:
//   node scripts/apply-hadith-sources.mjs
//   node scripts/apply-hadith-sources.mjs --dry-run   # preview changes, no writes

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
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
  const rawBlocks = md.split(/\n(?=## \[)/).filter((b) => b.trim().startsWith('## ['));
  return rawBlocks.map((block) => {
    const headerMatch = block.match(/^## \[([a-z]+) > ([a-z-]+) > (Core|Growth|Excellence)\] (.+)/m);
    if (!headerMatch) return null;
    const [, pillar, submodule, level, subtaskTitle] = headerMatch;

    const statusMatch = block.match(/\*\*Status:\*\*\s*(\w+)/);
    const status = statusMatch?.[1] ?? 'PENDING';

    const hadithSection = block.match(/### Hadith Candidates.*?\n([\s\S]*?)(?=###|$)/)?.[1] ?? '';
    const approvedHadiths = [...hadithSection.matchAll(/- \[x\] (.+)/g)].map((m) => m[1].trim());

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
  const escapedTitle = escapeRegex(subtaskTitle);
  const pattern = new RegExp(
    `(title:\\s*['"\`]${escapedTitle}['"\`],\\s*done:\\s*false,)`,
    'm'
  );

  if (!pattern.test(fileContent)) return null;

  const alreadySourced = new RegExp(
    `title:\\s*['"\`]${escapedTitle}['"\`],\\s*done:\\s*false,[\\s\\S]{0,30}sources:`,
    'm'
  );
  if (alreadySourced.test(fileContent)) return fileContent;

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
