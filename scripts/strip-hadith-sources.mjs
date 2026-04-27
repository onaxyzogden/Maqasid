// Removes `sources: `...`,` fields from subtasks in seed files so that
// apply-hadith-sources.mjs can re-populate them with fresh citations.
//
// Two modes:
//   --all                 Strip every `sources:` field from every pillar seed file
//   --blocks <file.json>  Strip only subtasks listed in a JSON file of
//                         { pillar, submodule, level, subtaskTitle } tuples
//
// Usage:
//   node scripts/strip-hadith-sources.mjs --all --dry-run
//   node scripts/strip-hadith-sources.mjs --all
//   node scripts/strip-hadith-sources.mjs --blocks stages/strip-list.json

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const ALL_MODE = process.argv.includes('--all');

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  return idx !== -1 ? process.argv[idx + 1] : null;
}
const BLOCKS_FILE = getArg('--blocks');

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

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function titleToRegexFragment(title) {
  let result = '';
  for (const ch of title) {
    const code = ch.charCodeAt(0);
    if (ch === "'") {
      result += "(?:'|\\\\')";
    } else if (code > 127) {
      const hex = code.toString(16).padStart(4, '0');
      result += `(?:${escapeRegex(ch)}|\\\\u${hex})`;
    } else {
      result += escapeRegex(ch);
    }
  }
  return result;
}

// Strip ALL `sources: `...`,` occurrences from a file.
// The sources value is a template literal that may contain backticks escaped as \`.
// We scan char-by-char respecting escapes.
function stripAllSources(content) {
  let out = '';
  let i = 0;
  let stripped = 0;
  const markerRe = /\n\s*sources:\s*`/g;

  let lastIndex = 0;
  while (true) {
    markerRe.lastIndex = lastIndex;
    const m = markerRe.exec(content);
    if (!m) {
      out += content.slice(lastIndex);
      break;
    }
    out += content.slice(lastIndex, m.index);
    // Scan from end of opener (the backtick position + 1) to matching backtick
    let j = m.index + m[0].length;
    while (j < content.length) {
      if (content[j] === '\\') { j += 2; continue; }
      if (content[j] === '`') { j++; break; }
      j++;
    }
    // After the closing backtick we expect ',' then newline — consume to end of line
    if (content[j] === ',') j++;
    // Do NOT consume the trailing newline — leaves clean formatting.
    lastIndex = j;
    stripped++;
  }

  return { content: out, stripped };
}

// Strip sources from a specific subtask by title within an array key bounds.
function findKeyBounds(content, key) {
  const escapedKey = escapeRegex(key);
  const keyRe = new RegExp(`(?:\\b|["'])${escapedKey}["']?\\s*:\\s*\\[`, 'm');
  const m = keyRe.exec(content);
  if (!m) return null;
  const start = m.index + m[0].length;
  let depth = 1;
  let i = start;
  while (i < content.length && depth > 0) {
    const ch = content[i];
    if (ch === '`') {
      i++;
      while (i < content.length) {
        if (content[i] === '\\') { i += 2; continue; }
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

function stripOneSubtask(content, arrayKey, subtaskTitle) {
  const bounds = findKeyBounds(content, arrayKey);
  if (!bounds) return { status: 'key-not-found', content };
  const segment = content.slice(bounds.start, bounds.end);

  const titleFrag = titleToRegexFragment(subtaskTitle);
  // Match: title, done:false, then optional whitespace, then sources: `...`,
  const sourcesRe = new RegExp(
    `(title:\\s*['"\`]${titleFrag}['"\`],\\s*done:\\s*false,)\\s*\\n\\s*sources:\\s*\`(?:\\\\.|[^\`\\\\])*\`,`,
    'm'
  );
  if (!sourcesRe.test(segment)) return { status: 'no-sources', content };
  const patched = segment.replace(sourcesRe, '$1');
  const newContent = content.slice(0, bounds.start) + patched + content.slice(bounds.end);
  return { status: 'stripped', content: newContent };
}

async function main() {
  if (!ALL_MODE && !BLOCKS_FILE) {
    console.error('Usage: --all  OR  --blocks <file.json>');
    process.exit(1);
  }

  let blocks = null;
  if (BLOCKS_FILE) {
    const path = resolve(ROOT, BLOCKS_FILE);
    if (!existsSync(path)) { console.error(`Missing: ${path}`); process.exit(1); }
    blocks = JSON.parse(await readFile(path, 'utf8'));
    if (!Array.isArray(blocks)) { console.error('--blocks file must contain a JSON array'); process.exit(1); }
  }

  if (DRY_RUN) console.log('DRY RUN — no files will be written.\n');
  let totalStripped = 0;

  for (const pillar of PILLARS) {
    const filePath = resolve(ROOT, 'src/data/seed-tasks', pillar.file);
    let content = await readFile(filePath, 'utf8');
    const original = content;

    if (ALL_MODE) {
      const { content: newContent, stripped } = stripAllSources(content);
      content = newContent;
      totalStripped += stripped;
      console.log(`${pillar.file}: stripped ${stripped}`);
    } else {
      const pillarBlocks = blocks.filter(b => b.pillar === pillar.id);
      for (const b of pillarBlocks) {
        const arrayKey = `${b.pillar}_${b.submodule}_${LEVEL_TO_KEY[b.level]}`;
        const r = stripOneSubtask(content, arrayKey, b.subtaskTitle);
        if (r.status === 'stripped') {
          content = r.content;
          totalStripped++;
        } else if (r.status === 'no-sources') {
          // skip
        } else {
          console.warn(`  KEY NOT FOUND: ${arrayKey} in ${pillar.file}`);
        }
      }
      console.log(`${pillar.file}: processed ${pillarBlocks.length} targeted blocks`);
    }

    if (!DRY_RUN && content !== original) {
      await writeFile(filePath, content, 'utf8');
    }
  }

  console.log(`\nTotal stripped: ${totalStripped}`);
}

main().catch(err => { console.error(err); process.exit(1); });
