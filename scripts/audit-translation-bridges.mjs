#!/usr/bin/env node
// Phase 1 enumerator for the 2026-05-05 translation-bridge cleanup.
// Loads every seed-task pillar, walks its sources[], and flags any hadith/quran
// translation field that contains editorial bridge text appended after the matn.
//
// Output: tasks/translation-bridge-manifest.json
// Usage:  node scripts/audit-translation-bridges.mjs

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const PILLARS = [
  'faith', 'health', 'intellect', 'family', 'wealth',
  'environment', 'ummah', 'moontrance', 'prayer', 'weekly',
];

const ROOT = path.resolve(process.cwd());
const SEED_DIR = path.join(ROOT, 'src/data/seed-tasks');
const OUT = path.join(ROOT, 'tasks/translation-bridge-manifest.json');

// Heuristic: detect editorial bridge after the matn.
// Strategy: split translation on `."` (closing quote of prophetic speech).
// Whatever follows the LAST `."` is candidate bridge text. Treat it as a bridge if:
//   - Non-empty after trim
//   - Starts with a capital letter (sentence boundary)
//   - Doesn't look like attribution (e.g. "Narrated by", "Related by", "[Bukhari]")
//   - Doesn't look like a mid-matn addendum (e.g. starts with "And", "Then", lowercase)
//
// For translations that don't contain `."` (no direct speech quote — e.g. Quran ayahs
// in third-person prose, or hadith reported indirectly), apply a lenient phrase-list:
const BRIDGE_PHRASES = [
  /\bapplies here\b/i,
  /\bin our context\b/i,
  /\bfor this subtask\b/i,
  /\bthe first step (toward|on|in)\b/i,
  /\bextends to\b/i,
  /\breflects the\b/i,
  /\baligns with\b/i,
  /\bis a form of\b/i,
  /\bis an act of\b/i,
  /\bis an expression of\b/i,
];

// A capital-V gerund followed by other content is the strongest editorial-bridge
// signal — the bridge is almost always an "<-ing> something something" advisory.
const BRIDGE_VERB_LEAD = /^[A-Z][a-z]+ing\b/;
// Short single-sentence editorial commentary: tail is < 220 chars, contains exactly
// one terminal `.`, and contains a commentary verb tying matn-meaning to subtask-action.
const COMMENTARY_VERBS = /\b(embodies?|embody|reflects?|expresses?|grounds?|underscores?|exemplifies?|strengthens?|protects?|preserves?|honors?|anchors?|ensures?|builds?|fulfills?|completes?|supports?|enables?|extends?|aligns?|deepens?|cultivates?|secures?|restores?|enacts?|signals?|marks?|traces?|prevents?|advances?|safeguards?|witnesses?|invites?|instills?|frames?|brings?|amounts? to|is the (fullest|essential|natural|first)|is itself|applies (here|directly)|translates?|transforms?)\b/i;
// Demonstrative bridges — "This <verb>" / "These <verb>" / "Such <verb>" — almost always editorial commentary on the cited matn.
const BRIDGE_DEMONSTRATIVE_LEAD = /^(This|These|Such|That)\s+(establishes?|shows?|demonstrates?|illustrates?|reflects?|grounds?|underscores?|highlights?|directly|metaphor|hadith|verse|narration|prophetic|principle|practice|teaching|principle)\b/;

function looksLikeAttribution(s) {
  return /^(Narrated|Related|Reported|Recorded|Transmitted|\[)/.test(s.trim());
}

function detectBridge(translation) {
  const t = String(translation || '');
  // Pattern 1: closing-quote split.
  // Find the LAST occurrence of `."` (period inside a closing double quote)
  // — this is the typical end of "The Prophet said: \"...\""
  const closingQuoteIdx = t.lastIndexOf('."');
  if (closingQuoteIdx >= 0 && closingQuoteIdx + 2 < t.length) {
    const tail = t.slice(closingQuoteIdx + 2).trim();
    if (tail.length > 0 && !looksLikeAttribution(tail)) {
      // Capital letter or quote start — actual sentence
      if (/^["A-Z]/.test(tail)) {
        return {
          mode: 'closing-quote-split',
          matnPart: t.slice(0, closingQuoteIdx + 2),
          bridge: tail,
          confidence: (BRIDGE_VERB_LEAD.test(tail) || BRIDGE_DEMONSTRATIVE_LEAD.test(tail) || BRIDGE_PHRASES.some(r => r.test(tail))
            || (tail.length < 220 && (tail.match(/\./g) || []).length === 1 && COMMENTARY_VERBS.test(tail) && !/\bsaid\b/.test(tail) && !/\b(he|she|they)\b/i.test(tail.split(' ')[0]) && !/^["']/.test(tail)))
            ? 'unambiguous'
            : 'review',
        };
      }
    }
  }
  // Pattern 2: closing single quote `.'` (rare but possible)
  const closingSingleIdx = t.lastIndexOf(".'");
  if (closingSingleIdx >= 0 && closingSingleIdx + 2 < t.length) {
    const tail = t.slice(closingSingleIdx + 2).trim();
    if (tail.length > 0 && !looksLikeAttribution(tail) && /^["A-Z]/.test(tail)) {
      return {
        mode: 'closing-quote-split',
        matnPart: t.slice(0, closingSingleIdx + 2),
        bridge: tail,
        confidence: BRIDGE_VERB_LEAD.test(tail) || BRIDGE_PHRASES.some(r => r.test(tail))
          ? 'unambiguous'
          : 'review',
      };
    }
  }
  // Pattern 3: no quoted matn — phrase-list scan only (likely Quran ayah or
  // indirectly-narrated hadith). Lenient: only flag if clear bridge phrase.
  for (const re of BRIDGE_PHRASES) {
    const m = t.match(re);
    if (m) {
      // Find sentence boundary before the phrase
      const idx = m.index;
      const sentenceStart = Math.max(
        t.lastIndexOf('. ', idx),
        t.lastIndexOf('? ', idx),
        t.lastIndexOf('! ', idx),
      );
      if (sentenceStart > 0) {
        return {
          mode: 'phrase-only',
          matnPart: t.slice(0, sentenceStart + 1),
          bridge: t.slice(sentenceStart + 2),
          confidence: 'review',
        };
      }
    }
  }
  return null;
}

function* walkSources(node, parentPath = []) {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* walkSources(node[i], [...parentPath, i]);
    return;
  }
  if (node && typeof node === 'object') {
    if (Array.isArray(node.sources)) {
      for (let i = 0; i < node.sources.length; i++) {
        yield { path: [...parentPath, 'sources', i], source: node.sources[i], parent: node };
      }
    }
    for (const [k, v] of Object.entries(node)) {
      if (k === 'sources') continue;
      if (v && (Array.isArray(v) || typeof v === 'object')) {
        yield* walkSources(v, [...parentPath, k]);
      }
    }
  }
}

function findLine(fileText, translation) {
  // Match the first ~80 chars verbatim. Translation strings in the source
  // contain backslash-escaped quotes (\") for the matn's inner quotes — we
  // need to convert the in-memory string back to the source-form.
  const preview = translation.slice(0, 80).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const idx = fileText.indexOf(preview);
  if (idx < 0) return null;
  return fileText.slice(0, idx).split('\n').length;
}

const manifest = [];
const summary = {};

for (const pillar of PILLARS) {
  const file = path.join(SEED_DIR, `${pillar}-seed-tasks.js`);
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const url = pathToFileURL(file).href + `?t=${Date.now()}`;
  const mod = await import(url);
  const exportKey = Object.keys(mod).find(k => k.endsWith('_SEED_TASKS') || k === 'default');
  if (!exportKey) {
    console.warn(`SKIP ${pillar}: no recognizable export`);
    continue;
  }
  const data = mod[exportKey];

  let pillarHits = 0;
  for (const { source, parent } of walkSources(data)) {
    if (!source || (source.kind !== 'hadith' && source.kind !== 'quran')) continue;
    const t = source.translation;
    if (typeof t !== 'string' || t.length === 0) continue;
    const detection = detectBridge(t);
    if (!detection) continue;
    pillarHits++;
    manifest.push({
      pillar,
      file: path.relative(ROOT, file).replace(/\\/g, '/'),
      line: findLine(text, t),
      kind: source.kind,
      ref: source.ref,
      currentTranslation: t,
      suggestedCleanTranslation: detection.matnPart.trim(),
      removedBridge: detection.bridge.trim(),
      detectionMode: detection.mode,
      confidence: detection.confidence,
      existingRationale: source.rationale || null,
      hostSubtaskTitle: parent?.title || null,
    });
  }
  summary[pillar] = pillarHits;
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2));

console.log('--- Per-pillar hit counts ---');
let total = 0;
for (const p of PILLARS) {
  const n = summary[p] ?? 0;
  total += n;
  console.log(`  ${p.padEnd(12)} ${n}`);
}
console.log(`  ${'TOTAL'.padEnd(12)} ${total}`);
console.log('');
console.log(`Manifest written: ${path.relative(ROOT, OUT)}`);
console.log('');
console.log('Confidence breakdown:');
const conf = {};
for (const e of manifest) conf[e.confidence] = (conf[e.confidence] ?? 0) + 1;
for (const [c, n] of Object.entries(conf)) console.log(`  ${c.padEnd(14)} ${n}`);
