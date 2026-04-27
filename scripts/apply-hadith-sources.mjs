// Reads stages/hadith-enrichment-candidates.md for APPROVE blocks + checked items,
// pulls the full Arabic/translation/hadith text from the JSON sidecar, and patches
// the `sources` field into the matching subtask in the correct seed file.
//
// Patches are scoped to the specific `{pillar}_{submodule}_{level}` key's array
// so a subtask title that repeats across levels cannot collide.
//
// Usage:
//   node scripts/apply-hadith-sources.mjs
//   node scripts/apply-hadith-sources.mjs --dry-run   # preview changes, no writes
//   node scripts/apply-hadith-sources.mjs --candidates stages/hadith-enrichment-candidates.reranked.md --sidecar stages/hadith-enrichment-candidates.reranked.json

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Allow --candidates and --sidecar flags to override defaults
function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : null;
}
const CANDIDATES_MD   = resolve(ROOT, getArg('--candidates') ?? 'stages/hadith-enrichment-candidates.md');
const CANDIDATES_JSON = resolve(ROOT, getArg('--sidecar')    ?? 'stages/hadith-enrichment-candidates.json');

const PILLARS = [
  { id: 'faith',       file: 'faith-seed-tasks.js' },
  { id: 'health',        file: 'health-seed-tasks.js' },
  { id: 'intellect',   file: 'intellect-seed-tasks.js' },
  { id: 'family',      file: 'family-seed-tasks.js' },
  { id: 'wealth',      file: 'wealth-seed-tasks.js' },
  { id: 'environment', file: 'environment-seed-tasks.js' },
  { id: 'ummah',       file: 'ummah-seed-tasks.js' },
];

const LEVEL_TO_KEY = { Core: 'core', Growth: 'growth', Excellence: 'excellence' };
const DRY_RUN = process.argv.includes('--dry-run');

// ── Parse MD for APPROVE blocks + checked item indices ─────────────────────────

function parseBlocks(md) {
  const rawBlocks = md.split(/\n(?=## \[)/).filter((b) => b.trim().startsWith('## ['));
  return rawBlocks.map((block) => {
    const headerMatch = block.match(/^## \[([a-z]+) > ([a-z-]+) > (Core|Growth|Excellence)\] (.+)/m);
    if (!headerMatch) return null;
    const [, pillar, submodule, level, subtaskTitle] = headerMatch;

    const idMatch = block.match(/<!-- id: (.+?) -->/);
    const id = idMatch?.[1] ?? `${pillar} > ${submodule} > ${level} :: ${subtaskTitle.trim()}`;

    const statusMatch = block.match(/\*\*Status:\*\*\s*(\w+)/);
    const status = statusMatch?.[1] ?? 'PENDING';

    const hadithSection = block.match(/### Hadith Candidates.*?\n([\s\S]*?)(?=###|$)/)?.[1] ?? '';
    const approvedHadithIdx = [...hadithSection.matchAll(/- \[x\] H(\d+):/g)].map((m) => Number(m[1]) - 1);

    const ayahSection = block.match(/### Ayah Candidates.*?\n([\s\S]*?)(?=---|$)/)?.[1] ?? '';
    const approvedAyahIdx = [...ayahSection.matchAll(/- \[x\] A(\d+):/g)].map((m) => Number(m[1]) - 1);

    return {
      id, pillar, submodule, level,
      subtaskTitle: subtaskTitle.trim(),
      status,
      approvedHadithIdx,
      approvedAyahIdx,
    };
  }).filter(Boolean);
}

// ── Format sources string from FULL JSON content ───────────────────────────────

function formatSources(hadiths, ayahs) {
  const parts = [];

  if (ayahs.length > 0) {
    parts.push('**I. Sources from the Quran**\n');
    for (const a of ayahs) {
      parts.push(`### Ayah (${a.key})\n**Arabic:** ${a.arabic}\n**Translation:** ${a.translation}`);
    }
  }

  if (hadiths.length > 0) {
    const section = ayahs.length > 0 ? 'II' : 'I';
    parts.push(`**${section}. Sources from the Hadith**\n`);
    for (const h of hadiths) {
      const collection = h.collection === 'bukhari' ? 'Sahih Bukhari' : 'Sahih Muslim';
      parts.push(`### ${collection} ${h.number}\n${h.text}\n*(Grade: Sahih)*`);
    }
  }

  return parts.join('\n\n');
}

// ── Scoped seed-file patch ─────────────────────────────────────────────────────

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Build a regex fragment for a title that matches the seed-file's raw source text.
// Handles two cases where extracted titles diverge from raw file content:
//   1. ASCII apostrophe `'` → seed file may store as `\'` (escaped in single-quoted string)
//   2. Non-ASCII char (e.g., em dash `—`) → seed file may store as `\uXXXX` literal escape
function titleToRegexFragment(title) {
  let result = '';
  for (const ch of title) {
    const code = ch.charCodeAt(0);
    if (ch === "'") {
      // Straight apostrophe: match either ' or \' (JS escape inside single-quoted string)
      result += "(?:'|\\\\')";
    } else if (code > 127) {
      // Non-ASCII: match either the real character or its \uXXXX source-code form
      const hex = code.toString(16).padStart(4, '0');
      result += `(?:${escapeRegex(ch)}|\\\\u${hex})`;
    } else {
      result += escapeRegex(ch);
    }
  }
  return result;
}

// Find the `<pillar>_<submodule>_<level>: [` block and return [start, end) bounds
// of the array contents (between the opening `[` and matching `]`).
// String-aware: skips over single-quote, double-quote, and backtick literals
// so that `[` / `]` inside string values (e.g., hadith translator interpolations)
// do not corrupt the bracket depth counter.
function findKeyBounds(content, key) {
  const escapedKey = escapeRegex(key);
  // Tolerate both bare identifiers (ummah_collective_core:) and quoted keys
  // ("ummah_moontrance-land_core":) — the latter are required when the key
  // contains hyphens or other non-identifier chars.
  const keyRe = new RegExp(`(?:\\b|["'])${escapedKey}["']?\\s*:\\s*\\[`, 'm');
  const m = keyRe.exec(content);
  if (!m) return null;

  const start = m.index + m[0].length;
  let depth = 1;
  let i = start;
  while (i < content.length && depth > 0) {
    const ch = content[i];

    // Skip string literals to avoid counting brackets inside them
    if (ch === '`') {
      // Template literal — scan to closing backtick, respecting \` escapes
      i++;
      while (i < content.length) {
        if (content[i] === '\\') { i += 2; continue; }  // skip escape
        if (content[i] === '`') { i++; break; }
        i++;
      }
      continue;
    }
    if (ch === '"' || ch === "'") {
      const q = ch;
      i++;
      while (i < content.length) {
        if (content[i] === '\\') { i += 2; continue; }
        if (content[i] === q) { i++; break; }
        i++;
      }
      continue;
    }

    if (ch === '[') depth++;
    else if (ch === ']') depth--;
    i++;
  }
  if (depth !== 0) return null;
  return { start, end: i - 1 };
}

function patchSeedFile(fileContent, arrayKey, subtaskTitle, sourcesContent) {
  const bounds = findKeyBounds(fileContent, arrayKey);
  if (!bounds) return { status: 'key-not-found', content: fileContent };

  const segment = fileContent.slice(bounds.start, bounds.end);
  // Use titleToRegexFragment so non-ASCII chars (em dash, smart quotes) match
  // whether the seed file stores them as actual Unicode or as \uXXXX escapes.
  const titleFrag = titleToRegexFragment(subtaskTitle);
  const titleRe = new RegExp(
    `(title:\\s*['"\`]${titleFrag}['"\`],\\s*done:\\s*false,)`,
    'm'
  );
  const alreadySourcedRe = new RegExp(
    `title:\\s*['"\`]${titleFrag}['"\`],\\s*done:\\s*false,[\\s\\S]{0,40}sources:`,
    'm'
  );

  if (!titleRe.test(segment)) return { status: 'title-not-found', content: fileContent };
  if (alreadySourcedRe.test(segment)) return { status: 'already-sourced', content: fileContent };

  const backtickSources = sourcesContent.replace(/`/g, '\\`');
  const patchedSegment = segment.replace(titleRe, `$1\n          sources: \`${backtickSources}\`,`);

  const newContent = fileContent.slice(0, bounds.start) + patchedSegment + fileContent.slice(bounds.end);
  return { status: 'patched', content: newContent };
}

async function main() {
  if (!existsSync(CANDIDATES_JSON)) {
    console.error(`Missing JSON sidecar: ${CANDIDATES_JSON}`);
    console.error('Run generate-hadith-candidates.mjs first.');
    process.exit(1);
  }

  const md = await readFile(CANDIDATES_MD, 'utf8');
  const sidecar = JSON.parse(await readFile(CANDIDATES_JSON, 'utf8'));
  const blocks = parseBlocks(md);

  const approvedBlocks = blocks.filter(
    (b) => b.status === 'APPROVE' && (b.approvedHadithIdx.length > 0 || b.approvedAyahIdx.length > 0)
  );

  console.log(`Parsed ${blocks.length} blocks, ${approvedBlocks.length} approved with checked items.`);
  if (DRY_RUN) console.log('DRY RUN — no files will be written.\n');

  const byPillar = {};
  for (const block of approvedBlocks) {
    (byPillar[block.pillar] ??= []).push(block);
  }

  let updated = 0, titleNotFound = 0, keyNotFound = 0, alreadySourced = 0, sidecarMiss = 0;

  for (const [pillarId, pillarBlocks] of Object.entries(byPillar)) {
    const pillar = PILLARS.find((p) => p.id === pillarId);
    if (!pillar) { console.warn(`Unknown pillar: ${pillarId}`); continue; }

    const filePath = resolve(ROOT, 'src/data/seed-tasks', pillar.file);
    let content = await readFile(filePath, 'utf8');
    const original = content;

    for (const block of pillarBlocks) {
      const entry = sidecar[block.id];
      if (!entry) {
        console.warn(`  SIDECAR MISS: ${block.id}`);
        sidecarMiss++;
        continue;
      }

      const hadiths = block.approvedHadithIdx.map((i) => entry.hadiths[i]).filter(Boolean);
      const ayahs = block.approvedAyahIdx.map((i) => entry.ayahs[i]).filter(Boolean);

      if (hadiths.length === 0 && ayahs.length === 0) continue;

      const sources = formatSources(hadiths, ayahs);
      const arrayKey = `${block.pillar}_${block.submodule}_${LEVEL_TO_KEY[block.level]}`;
      const result = patchSeedFile(content, arrayKey, block.subtaskTitle, sources);

      if (result.status === 'key-not-found') {
        console.warn(`  KEY NOT FOUND: ${arrayKey} in ${pillar.file}`);
        keyNotFound++;
      } else if (result.status === 'title-not-found') {
        console.warn(`  TITLE NOT FOUND: "${block.subtaskTitle}" in ${arrayKey}`);
        titleNotFound++;
      } else if (result.status === 'already-sourced') {
        console.log(`  SKIP (already sourced): "${block.subtaskTitle}"`);
        alreadySourced++;
      } else {
        console.log(`  PATCH: [${arrayKey}] "${block.subtaskTitle}"`);
        content = result.content;
        updated++;
      }
    }

    if (!DRY_RUN && content !== original) {
      await writeFile(filePath, content, 'utf8');
      console.log(`  Saved: ${pillar.file}`);
    }
  }

  console.log(
    `\nDone. Updated: ${updated} | Already sourced: ${alreadySourced} | Title not found: ${titleNotFound} | Key not found: ${keyNotFound} | Sidecar miss: ${sidecarMiss}`,
  );

  // key-not-found for planned-but-not-yet-seeded submodules (e.g., moontrance-*)
  // are expected and should not abort the run. Only title-not-found and sidecar-miss
  // indicate a real mismatch in existing content.
  const hardFailures = titleNotFound + sidecarMiss;
  if (keyNotFound > 0) {
    console.warn(`\nWARN: ${keyNotFound} block(s) skipped — array key not found in seed file (future/unimplemented submodule?).`);
  }
  if (hardFailures > 0) {
    console.error(`\nFAILURE: ${hardFailures} approved block(s) could not be applied (title mismatch or sidecar miss). Aborting with non-zero exit.`);
    process.exit(1);
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
