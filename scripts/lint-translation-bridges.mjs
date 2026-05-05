#!/usr/bin/env node
// Structural regression guard for the 2026-05-05 translation-bridge cleanup.
// Re-runs the high-confidence ('unambiguous') heuristic from
// audit-translation-bridges.mjs and fails loudly if any entry surfaces — i.e.
// blocks any future seed-task edit that re-introduces an editorial bridge
// sentence in a `translation` field.
//
// Detected patterns (all applied to the tail after the LAST `."` in a translation):
//   - Capital-V gerund lead: "Choosing/Reading/Tracking ..."
//   - Demonstrative lead: "This/These/Such/That + commentary verb or noun"
//   - Bridge phrase: "applies here", "in our context", "the first step on", etc.
//   - Short single-sentence commentary tail with a known commentary verb
//
// Ratchet: 0. Per docs/grounding-schema.md §3, `translation` is matn/ayah
// English only. Editorial framing belongs in `rationale`.
//
// Usage: node scripts/lint-translation-bridges.mjs

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SEED_DIR = path.join(ROOT, 'src/data/seed-tasks');

const PILLARS = [
  'faith', 'health', 'intellect', 'family', 'wealth',
  'environment', 'ummah', 'moontrance', 'prayer', 'weekly',
];

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

const BRIDGE_VERB_LEAD = /^[A-Z][a-z]+ing\b/;
const COMMENTARY_VERBS = /\b(embodies?|embody|reflects?|expresses?|grounds?|underscores?|exemplifies?|strengthens?|protects?|preserves?|honors?|anchors?|ensures?|builds?|fulfills?|completes?|supports?|enables?|extends?|aligns?|deepens?|cultivates?|secures?|restores?|enacts?|signals?|marks?|traces?|prevents?|advances?|safeguards?|witnesses?|invites?|instills?|frames?|brings?|amounts? to|is the (fullest|essential|natural|first)|is itself|applies (here|directly)|translates?|transforms?)\b/i;
const BRIDGE_DEMONSTRATIVE_LEAD = /^(This|These|Such|That)\s+(establishes?|shows?|demonstrates?|illustrates?|reflects?|grounds?|underscores?|highlights?|directly|metaphor|hadith|verse|narration|prophetic|principle|practice|teaching)\b/;

function looksLikeAttribution(s) {
  return /^(Narrated|Related|Reported|Recorded|Transmitted|\[)/.test(s.trim());
}

function isUnambiguousBridge(translation) {
  const t = String(translation || '');
  const closingQuoteIdx = t.lastIndexOf('."');
  if (closingQuoteIdx < 0 || closingQuoteIdx + 2 >= t.length) return false;
  const tail = t.slice(closingQuoteIdx + 2).trim();
  if (tail.length === 0 || looksLikeAttribution(tail)) return false;
  if (!/^["A-Z]/.test(tail)) return false;

  if (BRIDGE_VERB_LEAD.test(tail)) return true;
  if (BRIDGE_DEMONSTRATIVE_LEAD.test(tail)) return true;
  if (BRIDGE_PHRASES.some(r => r.test(tail))) return true;

  if (
    tail.length < 220 &&
    (tail.match(/\./g) || []).length === 1 &&
    COMMENTARY_VERBS.test(tail) &&
    !/\bsaid\b/.test(tail) &&
    !/\b(he|she|they)\b/i.test(tail.split(' ')[0]) &&
    !/^["']/.test(tail)
  ) {
    return true;
  }
  return false;
}

function* walkSources(node, parentPath = []) {
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* walkSources(node[i], [...parentPath, i]);
    return;
  }
  if (node && typeof node === 'object') {
    if (Array.isArray(node.sources)) {
      for (let i = 0; i < node.sources.length; i++) {
        yield { source: node.sources[i], parent: node };
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

const RATCHET = 0;
const violations = [];

for (const pillar of PILLARS) {
  const file = path.join(SEED_DIR, `${pillar}-seed-tasks.js`);
  if (!fs.existsSync(file)) continue;
  const url = pathToFileURL(file).href + `?t=${Date.now()}`;
  const mod = await import(url);
  const exportKey = Object.keys(mod).find(k => k.endsWith('_SEED_TASKS') || k === 'default');
  if (!exportKey) continue;
  const data = mod[exportKey];

  for (const { source, parent } of walkSources(data)) {
    if (!source || (source.kind !== 'hadith' && source.kind !== 'quran')) continue;
    const t = source.translation;
    if (typeof t !== 'string' || t.length === 0) continue;
    if (isUnambiguousBridge(t)) {
      violations.push({
        pillar,
        ref: source.ref,
        hostSubtaskTitle: parent?.title || null,
        translation: t,
      });
    }
  }
}

if (violations.length > 0) {
  console.error('FAIL: editorial-bridge sentences detected in `translation` fields.');
  console.error('Per docs/grounding-schema.md §3, `translation` is matn/ayah English only.');
  console.error('Move editorial framing into the `rationale` field.\n');
  for (const v of violations) {
    console.error(`  [${v.pillar}] ${v.ref} (${v.hostSubtaskTitle ?? '?'}):`);
    console.error(`    ${v.translation}\n`);
  }
  console.error(`[STRICT] FAIL: ${violations.length} > ratchet ${RATCHET}`);
  process.exit(1);
}

console.log(`Scanned all pillars for translation-field bridges.`);
console.log(`[STRICT] OK: 0 ≤ ratchet ${RATCHET}`);
