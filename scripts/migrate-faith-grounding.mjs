#!/usr/bin/env node
// Phase C.2 — Faith pillar two-axis grounding migration.
// Parses legacy markdown `sources` strings into structured arrays per
// wiki/decisions/2026-04-18-milos-grounding-two-axis.md.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.resolve(__dirname, '..', 'src', 'data', 'seed-tasks', 'faith-seed-tasks.js');

const src = fs.readFileSync(FILE, 'utf8');

// Find every `sources: \`...\`` block. Template literals may contain
// escaped backticks (\`) — match either escape sequence or non-backtick.
const RE = /(\bsources:\s*)`((?:\\`|[^`])*)`/g;

function unescapeTemplate(s) {
  // Reverse JS template-literal escapes that affect our markdown body.
  return s
    .replace(/\\`/g, '`')
    .replace(/\\\$/g, '$')
    .replace(/\\\\/g, '\\');
}

function gradeToTier(grade) {
  if (!grade) return 'Bayyinah'; // Quran defaults
  const g = grade.toLowerCase();
  if (g.includes('sahih')) return 'Bayyinah';
  if (g.includes('hasan')) return 'Qarina';
  return 'Niyyah';
}

function parseRelevance(annotation) {
  if (!annotation) return 'direct';
  const a = annotation.toLowerCase();
  if (a.startsWith('direct')) return 'direct';
  if (a.startsWith('contextual')) return 'contextual';
  if (a.startsWith('thematic')) return 'thematic';
  return 'direct';
}

function clean(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\s+/g, ' ')
    .replace(/^["'\u201c\u201d]+|["'\u201c\u201d]+$/g, '')
    .trim();
}

function parseMarkdown(md) {
  const items = [];
  // Split on `### ` headers
  const sections = md.split(/\n###\s+/);
  for (let i = 1; i < sections.length; i++) {
    const block = sections[i];
    const headerEnd = block.indexOf('\n');
    const header = (headerEnd === -1 ? block : block.slice(0, headerEnd)).trim();
    const body = headerEnd === -1 ? '' : block.slice(headerEnd + 1);

    const isQuran = /^Quran/i.test(header);
    let ref = header;
    if (isQuran) {
      // Normalize "Quran (X:Y)" → "Quran X:Y"
      ref = header.replace(/^Quran\s*\(([^)]+)\)/i, 'Quran $1').replace(/^Quran\s+/i, 'Quran ');
    } else {
      // Normalize collection names
      ref = header
        .replace(/^Sahih Bukhari\b/i, 'Sahih al-Bukhari')
        .replace(/^Sahih Muslim\b/i, 'Sahih Muslim')
        .replace(/^Sunan Abu Dawud\b/i, 'Sunan Abi Dawud')
        .replace(/^Sahih Abu Dawud\b/i, 'Sunan Abi Dawud')
        .replace(/^Sahih Tirmidhi\b/i, "Sunan al-Tirmidhi");
    }

    // Pull Arabic
    let arabic = '';
    const ar = body.match(/\*\*Arabic:\*\*\s*([\s\S]*?)(?=\n\*\*|\n\*\(|$)/);
    if (ar) arabic = clean(ar[1]);

    // Pull Translation
    let translation = '';
    const tr = body.match(/\*\*Translation:\*\*\s*([\s\S]*?)(?=\n\*\*|\n\*\(|\n###|$)/);
    if (tr) {
      translation = clean(tr[1]);
    } else {
      // No explicit Translation marker — body itself (minus annotations) is the narration
      const stripped = body
        .replace(/\*\(Grade:[^)]+\)\*/gi, '')
        .replace(/\*\([^)]+\)\*/g, '')
        .replace(/\n###[\s\S]*$/, '');
      translation = clean(stripped);
    }

    // Pull grade
    let grade = '';
    const gr = body.match(/\*\(Grade:\s*([^)]+)\)\*/i);
    if (gr) grade = gr[1].trim();

    // Pull annotation (relevance hint + rationale)
    let rationale = '';
    let annotation = '';
    const an = body.match(/\*\(((?:Direct|Contextual|Thematic):\s*[^)]+)\)\*/i);
    if (an) {
      const colonIdx = an[1].indexOf(':');
      annotation = an[1].slice(0, colonIdx).trim();
      rationale = an[1].slice(colonIdx + 1).trim().replace(/\s+/g, ' ');
    }

    if (!rationale) {
      // Synthesize a minimal rationale from ref + kind
      rationale = isQuran
        ? `Quranic basis cited as evidence for this subtask.`
        : `Prophetic narration cited as evidence for this subtask.`;
    }

    const item = {
      kind: isQuran ? 'quran' : 'hadith',
      ref,
      arabic,
      translation,
      relevance: parseRelevance(annotation),
      provenanceTier: isQuran ? 'Bayyinah' : gradeToTier(grade),
      rationale,
    };
    if (!isQuran) item.hadithGrade = grade || 'Sahih';
    items.push(item);
  }
  return items;
}

function serializeItem(it, indent) {
  const pad = ' '.repeat(indent);
  const inner = ' '.repeat(indent + 2);
  const lines = [`${pad}{`];
  lines.push(`${inner}kind: ${JSON.stringify(it.kind)},`);
  lines.push(`${inner}ref: ${JSON.stringify(it.ref)},`);
  if (it.arabic) lines.push(`${inner}arabic: ${JSON.stringify(it.arabic)},`);
  lines.push(`${inner}translation: ${JSON.stringify(it.translation)},`);
  lines.push(`${inner}relevance: ${JSON.stringify(it.relevance)},`);
  lines.push(`${inner}provenanceTier: ${JSON.stringify(it.provenanceTier)},`);
  if (it.hadithGrade) lines.push(`${inner}hadithGrade: ${JSON.stringify(it.hadithGrade)},`);
  lines.push(`${inner}rationale: ${JSON.stringify(it.rationale)},`);
  lines.push(`${pad}}`);
  return lines.join('\n');
}

function serializeArray(items, indent) {
  if (items.length === 0) return '[]';
  const pad = ' '.repeat(indent);
  const body = items.map((it) => serializeItem(it, indent + 2)).join(',\n');
  return `[\n${body},\n${pad}]`;
}

let migrated = 0;
let skipped = 0;
const skippedSamples = [];

const out = src.replace(RE, (match, prefix, body) => {
  // Detect if this is legacy markdown shape — must contain `### ` header
  const md = unescapeTemplate(body);
  if (!/\n###\s+/.test('\n' + md)) {
    skipped++;
    if (skippedSamples.length < 3) skippedSamples.push(md.slice(0, 120));
    return match;
  }
  const items = parseMarkdown(md);
  if (items.length === 0) {
    skipped++;
    if (skippedSamples.length < 3) skippedSamples.push(body.slice(0, 120));
    return match;
  }
  // Determine indent from match position
  // Find start-of-line column for `prefix`
  const line = src.slice(0, src.indexOf(match));
  const lineStart = line.lastIndexOf('\n') + 1;
  const col = src.indexOf(match) - lineStart;
  migrated++;
  return `${prefix}${serializeArray(items, col)}`;
});

if (process.argv.includes('--write')) {
  fs.writeFileSync(FILE, out, 'utf8');
  console.log(`Wrote ${FILE}`);
}
console.log(`Migrated: ${migrated}`);
console.log(`Skipped: ${skipped}`);
if (skippedSamples.length) {
  console.log('Skipped samples:');
  for (const s of skippedSamples) console.log(' -', s);
}
