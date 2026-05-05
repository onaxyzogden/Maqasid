#!/usr/bin/env node
// Phase 3 patcher for the 2026-05-05 translation-bridge cleanup.
// Reads tasks/translation-bridge-manifest.json (output of audit-translation-bridges.mjs)
// and applies one of two modes per entry:
//   - 'replace-generic-rationale-with-bridge': existing rationale is a generic placeholder;
//     replace it with the orphaned bridge sentence so editorial intent isn't lost.
//   - 'delete-bridge-keep-rationale': existing rationale is substantive; bridge is redundant editorial.
//
// Idempotent: skips when already applied. Fails loudly on byte-level mismatch.
//
// Only operates on entries flagged confidence='unambiguous' by the auditor — 'review' bucket
// is skipped (false-positive heavy; needs manual review in a separate pass).

import fs from 'node:fs';
import path from 'node:path';

const MANIFEST = path.resolve('tasks/translation-bridge-manifest.json');
const ROOT = process.cwd();

const GENERIC_RATIONALE_PATTERNS = [
  /^Prophetic narration cited as evidence for this subtask\.?$/,
  /^Cited as evidence for this subtask\.?$/,
  /^Quranic .* cited as evidence for this subtask\.?$/i,
];

function isGeneric(rationale) {
  if (!rationale) return true;
  const r = String(rationale).trim();
  return GENERIC_RATIONALE_PATTERNS.some(re => re.test(r));
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const targets = manifest.filter(e => e.confidence === 'unambiguous');

// Group by file so we read/write each only once.
const byFile = new Map();
for (const e of targets) {
  if (!byFile.has(e.file)) byFile.set(e.file, []);
  byFile.get(e.file).push(e);
}

let totalApplied = 0;
let totalSkipped = 0;
let totalFailed = 0;

for (const [relFile, entries] of byFile) {
  const file = path.join(ROOT, relFile);
  let src = fs.readFileSync(file, 'utf8');
  const original = src;
  let applied = 0;
  let skipped = 0;
  let failed = 0;

  for (const e of entries) {
    // Convert in-memory translation/clean strings to source-form (escape \" and \\)
    const toSrc = s => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const currSrc = toSrc(e.currentTranslation);
    const cleanSrc = toSrc(e.suggestedCleanTranslation);
    const bridgeText = e.removedBridge.trim();

    // Locate the literal `translation: "..."` field. Both quote styles exist for
    // the field name in the source (`translation:` is always followed by a `"`-string
    // because every entry uses double-quoted translation literals). We look for the
    // exact `"<currSrc>"` substring.
    const needle = `"${currSrc}"`;
    if (!src.includes(needle)) {
      // Maybe already applied — check whether the cleaned form is present and
      // bridge is gone.
      if (src.includes(`"${cleanSrc}"`)) {
        skipped++;
        continue;
      }
      console.error(`FAIL ${relFile}: ${e.ref} — translation needle not found and no cleaned form present`);
      failed++;
      continue;
    }

    // Decide mode based on existing rationale.
    if (isGeneric(e.existingRationale)) {
      // Replace the rationale field on the SAME source object. The rationale follows
      // the translation in the file, typically within a few lines. We do a scoped
      // replace: find the translation-needle position, then replace the next occurrence
      // of the existing rationale field within the next ~600 chars (one source object).
      const tIdx = src.indexOf(needle);
      const scopeEnd = Math.min(src.length, tIdx + needle.length + 800);
      const scope = src.slice(tIdx, scopeEnd);
      const ratNeedle = `rationale: "${toSrc(e.existingRationale)}"`;
      if (!scope.includes(ratNeedle)) {
        console.error(`FAIL ${relFile}: ${e.ref} — rationale field not found within source-object scope`);
        failed++;
        continue;
      }
      const ratNew = `rationale: "${toSrc(bridgeText)}"`;
      const newScope = scope.replace(ratNeedle, ratNew);
      src = src.slice(0, tIdx) + newScope + src.slice(scopeEnd);
      // Then strip the bridge from the translation field.
      src = src.replace(needle, `"${cleanSrc}"`);
    } else {
      // Substantive rationale: just delete the bridge.
      src = src.replace(needle, `"${cleanSrc}"`);
    }
    applied++;
  }

  if (src !== original) {
    fs.writeFileSync(file, src);
  }
  console.log(`${relFile}: applied=${applied} skipped=${skipped} failed=${failed}`);
  totalApplied += applied;
  totalSkipped += skipped;
  totalFailed += failed;
}

console.log('---');
console.log(`TOTAL applied=${totalApplied} skipped=${totalSkipped} failed=${totalFailed}`);
if (totalFailed > 0) process.exit(1);
