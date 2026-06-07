#!/usr/bin/env node
// Audit grounding *content* quality (not schema shape) for the five
// post-batch-migration pillars: Faith, Intellect, Family, Wealth, Environment.
//
// The 2026-04-25 batch migration converted 931 legacy markdown sources
// into the structured two-axis schema in a single parser pass. The
// schema is correct; the content is uniform but generic. This script
// surfaces the entries that would benefit from per-subtask curation.
//
// Heuristics (a source[i] is flagged if any apply):
//   1 boilerplate-rationale — generic strings stamped by the migration parser
//   2 missing-rationale     — rationale field absent / empty
//   3 missing-hadith-grade  — kind:hadith without hadithGrade
//   4 low-provenance        — provenanceTier / relevance outside the live schema
//                             vocab (src/data/config/amanah-tiers.js,
//                             relevance-chips.js)
//   5 translation-artifact  — translation contains leaked markdown prefix
//                             (**Translation:**), is duplicated into arabic field,
//                             or is empty
//   6 duplicate-hadith-translation — two refs in the same sources[] with identical
//                                    translation strings (parser likely copied wrong)
//   7 near-duplicate-hadith — two refs in the same sources[] that normalize to the
//                             same narration (same hadith, different ref number /
//                             translator wording)
//   8 cluster (computed across the corpus, reported separately): same { ref,
//     rationale } pair repeated across many subtasks
//
// Emits a markdown report to tasks/grounding-content-backlog-{YYYY-MM-DD}.md.

import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { AMANAH_TIERS } from '../src/data/config/amanah-tiers.js';
import { RELEVANCE_CHIPS } from '../src/data/config/relevance-chips.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PILLARS = [
  ['faith',       'FAITH_SEED_TASKS'],
  ['intellect',   'INTELLECT_SEED_TASKS'],
  ['family',      'FAMILY_SEED_TASKS'],
  ['wealth',      'WEALTH_SEED_TASKS'],
  ['environment', 'ENVIRONMENT_SEED_TASKS'],
];

// Tunable: two hadith translations in the same sources[] are the same
// narration if token-Jaccard ≥ JACCARD, or (overlap-coefficient ≥ OVERLAP and
// both have ≥ MIN_TOKENS) — overlap catches "same hadith + extra editorial
// sentence". Transitive closure (below) groups a 3-ref trio off pairwise hits.
const NEAR_DUP_JACCARD = 0.72;
const NEAR_DUP_OVERLAP = 0.8;
const NEAR_DUP_MIN_TOKENS = 6;

// Live grounding vocabulary — sourced from the same config the app + the
// conformance test (src/data/seed-tasks/__tests__/grounding.test.js) use, so
// this audit never drifts from the schema.
const VALID_TIERS = new Set(AMANAH_TIERS.map((t) => t.label));
const VALID_RELEVANCE = new Set(RELEVANCE_CHIPS.map((c) => c.id));

// Exact-match boilerplate rationale strings produced by the 2026-04-25 parser.
const BOILERPLATE_RATIONALES = new Set([
  'Prophetic narration cited as evidence for this subtask.',
  'Quranic basis cited as evidence for this subtask.',
  'Quranic ayah for this subtask.',
  'Quranic reference for this subtask.',
  'Hadith cited as evidence for this subtask.',
  'Cited as evidence for this subtask.',
]);

// ── Helpers ─────────────────────────────────────────────────────────────────

function describeSource(src) {
  return `${src?.kind ?? '?'} ${src?.ref ?? '(no ref)'}`;
}

function isBoilerplate(rationale) {
  if (!rationale) return false;
  if (BOILERPLATE_RATIONALES.has(rationale.trim())) return true;
  // Catch close variants: starts with the boilerplate stem.
  const stem = rationale.trim().toLowerCase();
  return (
    stem.startsWith('prophetic narration cited as evidence') ||
    stem.startsWith('quranic basis cited as evidence') ||
    stem.startsWith('quranic ayah for this subtask') ||
    stem.startsWith('hadith cited as evidence for this subtask') ||
    stem.startsWith('cited as evidence for this subtask')
  );
}

function isTranslationArtifact(src) {
  const t = src?.translation;
  if (!t || typeof t !== 'string') return { hit: true, why: 'empty-translation' };
  if (t.includes('**Translation:**')) return { hit: true, why: 'leaked-markdown-prefix' };
  if (src.kind === 'quran' && src.arabic && src.arabic.includes('**Translation:**')) {
    return { hit: true, why: 'arabic-contains-translation-prefix' };
  }
  if (src.kind === 'quran' && src.arabic && src.arabic === t) {
    return { hit: true, why: 'arabic-equals-translation' };
  }
  return { hit: false };
}

function provenanceMismatch(src) {
  const r = src?.relevance;
  const t = src?.provenanceTier;
  const problems = [];
  if (r && !VALID_RELEVANCE.has(r)) problems.push(`unknown-relevance:${r}`);
  if (t && !VALID_TIERS.has(t)) problems.push(`unknown-tier:${t}`);
  return problems.length ? problems.join(',') : null;
}

function duplicateHadithTranslations(sources) {
  const seen = new Map(); // translation → first index
  const dupes = [];
  sources.forEach((s, i) => {
    if (s?.kind !== 'hadith') return;
    const t = (s.translation || '').trim();
    if (!t) return;
    if (seen.has(t)) {
      dupes.push({ idx: i, firstIdx: seen.get(t) });
    } else {
      seen.set(t, i);
    }
  });
  return dupes;
}

// Normalize a hadith translation so the *same* narration cited under different
// ref numbers / translator wordings collapses to one string. Catches the
// Bukhari-repeats-across-abwab artifact the 2026-04-25 parser scraped
// redundantly (byte-identical dedup above misses these).
function normalizeHadithText(translation) {
  if (!translation || typeof translation !== 'string') return '';
  let s = translation.replace(/^\s*Narrated\b[^:]{0,160}:\s*/i, '');
  s = s.toLowerCase();
  s = s.replace(/[ﷺﷻ]/g, ' ');          // ﷺ ligatures (pre-NFKD)
  // Translator glosses vary between editions of the *same* hadith — strip
  // parenthetical/bracketed asides so identity rests on the narration frame
  // and the transliterated matn, not on one translator's word choice.
  s = s.replace(/\([^)]*\)/g, ' ').replace(/\[[^\]]*\]/g, ' ');
  s = s.normalize('NFKD').replace(/[̀-ͯ]/g, ''); // fold diacritics
  s = s.replace(/l-lahumma/g, 'allahumma');         // transliteration variants
  s = s.replace(/ighfir/g, 'ghfir');
  s = s.replace(/['`’ʿʾ]/g, '');
  s = s.replace(/[^\p{L}\p{N}]+/gu, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

function tokenStats(a, b) {
  const A = new Set(a.split(' ').filter(Boolean));
  const B = new Set(b.split(' ').filter(Boolean));
  if (A.size === 0 || B.size === 0) return { jaccard: 0, overlap: 0, minSize: 0 };
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  const union = A.size + B.size - inter;
  return {
    jaccard: union === 0 ? 0 : inter / union,
    overlap: inter / Math.min(A.size, B.size), // contained narration ⇒ ≈1
    minSize: Math.min(A.size, B.size),
  };
}

// Group hadith sources that are the same narration. Union-find gives transitive
// closure so a 3-ref trio clusters even if only adjacent pairs clear the
// threshold. Returns [{ indices, repIdx }]; repIdx is the canonical keeper.
function nearDuplicateHadith(sources) {
  const items = [];
  sources.forEach((s, idx) => {
    if (s?.kind !== 'hadith') return;
    const norm = normalizeHadithText(s.translation);
    if (norm) items.push({ idx, norm });
  });
  const parent = new Map(items.map((it) => [it.idx, it.idx]));
  const find = (x) => {
    while (parent.get(x) !== x) {
      parent.set(x, parent.get(parent.get(x)));
      x = parent.get(x);
    }
    return x;
  };
  const union = (a, b) => { parent.set(find(a), find(b)); };
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      if (a.norm === b.norm) { union(a.idx, b.idx); continue; }
      const { jaccard, overlap, minSize } = tokenStats(a.norm, b.norm);
      const same =
        jaccard >= NEAR_DUP_JACCARD ||
        (overlap >= NEAR_DUP_OVERLAP && minSize >= NEAR_DUP_MIN_TOKENS);
      if (same) union(a.idx, b.idx);
    }
  }
  const groups = new Map();
  for (const it of items) {
    const root = find(it.idx);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(it.idx);
  }
  const result = [];
  for (const indices of groups.values()) {
    if (indices.length > 1) {
      indices.sort((x, y) => x - y);
      result.push({ indices, repIdx: indices[0] });
    }
  }
  return result;
}

// ── Walk ────────────────────────────────────────────────────────────────────

const flagsByPillar = {};
const clusterCounter = new Map(); // key: `${ref}::${rationale}` → count + samples
const totals = { subtasks: 0, sources: 0 };

for (const [id, exportName] of PILLARS) {
  const mod = await import(
    pathToFileURL(path.join(ROOT, 'src/data/seed-tasks', `${id}-seed-tasks.js`)).href
  );
  const data = mod[exportName];
  flagsByPillar[id] = [];

  for (const [boardKey, tasks] of Object.entries(data)) {
    if (!Array.isArray(tasks)) continue;
    for (let ti = 0; ti < tasks.length; ti++) {
      const subs = Array.isArray(tasks[ti]?.subtasks) ? tasks[ti].subtasks : [];
      for (let si = 0; si < subs.length; si++) {
        const sub = subs[si];
        const sources = Array.isArray(sub?.sources) ? sub.sources : [];
        totals.subtasks++;

        const dupes = duplicateHadithTranslations(sources);
        const nearDupes = nearDuplicateHadith(sources);

        sources.forEach((src, idx) => {
          totals.sources++;
          const issues = [];

          if (isBoilerplate(src.rationale)) issues.push('boilerplate-rationale');
          if (!src.rationale || !String(src.rationale).trim()) issues.push('missing-rationale');
          if (src.kind === 'hadith' && !src.hadithGrade) issues.push('missing-hadith-grade');
          const provIssue = provenanceMismatch(src);
          if (provIssue) issues.push(`low-provenance:${provIssue}`);
          const ta = isTranslationArtifact(src);
          if (ta.hit) issues.push(`translation-artifact:${ta.why}`);
          if (dupes.some((d) => d.idx === idx)) {
            const firstIdx = dupes.find((d) => d.idx === idx).firstIdx;
            issues.push(`duplicate-hadith-translation-of-idx-${firstIdx}`);
          }
          const ndGroup = nearDupes.find((g) => g.indices.includes(idx));
          if (ndGroup && ndGroup.repIdx !== idx) {
            issues.push(`near-duplicate-hadith-of-idx-${ndGroup.repIdx}`);
          }

          // Cluster tally — only on boilerplate or missing rationale, because
          // a thoughtful per-subtask rationale colliding twice is fine.
          if (isBoilerplate(src.rationale) || !src.rationale) {
            const key = `${src.ref ?? '?'}::${(src.rationale || '').trim()}`;
            const prev = clusterCounter.get(key) || { count: 0, samples: [] };
            prev.count++;
            if (prev.samples.length < 5) {
              prev.samples.push(`${id}.${boardKey}[${ti}].subtasks[${si}]`);
            }
            clusterCounter.set(key, prev);
          }

          if (issues.length) {
            flagsByPillar[id].push({
              idPath: `${id}.${boardKey}[${ti}].subtasks[${si}]`,
              title: sub.title ?? '(untitled)',
              sourceIdx: idx,
              source: describeSource(src),
              issues,
              currentRationale: src.rationale ?? '',
            });
          }
        });
      }
    }
  }
}

// ── Aggregate ───────────────────────────────────────────────────────────────

function tally(pillarFlags) {
  const counts = {
    boilerplate: 0,
    missingRationale: 0,
    missingHadithGrade: 0,
    lowProvenance: 0,
    translationArtifact: 0,
    duplicateHadith: 0,
    nearDuplicateHadith: 0,
  };
  for (const f of pillarFlags) {
    if (f.issues.some((x) => x === 'boilerplate-rationale')) counts.boilerplate++;
    if (f.issues.some((x) => x === 'missing-rationale')) counts.missingRationale++;
    if (f.issues.some((x) => x === 'missing-hadith-grade')) counts.missingHadithGrade++;
    if (f.issues.some((x) => x.startsWith('low-provenance:'))) counts.lowProvenance++;
    if (f.issues.some((x) => x.startsWith('translation-artifact:'))) counts.translationArtifact++;
    if (f.issues.some((x) => x.startsWith('duplicate-hadith-translation-of-idx'))) counts.duplicateHadith++;
    if (f.issues.some((x) => x.startsWith('near-duplicate-hadith-of-idx'))) counts.nearDuplicateHadith++;
  }
  return counts;
}

const subtaskTotals = { faith: 285, intellect: 236, family: 237, wealth: 236, environment: 226 };

const summaryRows = PILLARS.map(([id]) => {
  const flags = flagsByPillar[id];
  const t = tally(flags);
  return {
    pillar: id,
    flagged: flags.length,
    total: subtaskTotals[id],
    ...t,
  };
});

// Cluster findings — only refs/rationales repeated across N+ subtasks.
const CLUSTER_THRESHOLD = 5;
const clusters = [...clusterCounter.entries()]
  .filter(([, v]) => v.count >= CLUSTER_THRESHOLD)
  .sort((a, b) => b[1].count - a[1].count);

// ── Render Markdown ─────────────────────────────────────────────────────────

const today = new Date().toISOString().slice(0, 10);
const outPath = path.join(ROOT, 'tasks', `grounding-content-backlog-${today}.md`);

const lines = [];
lines.push(`# Grounding Content Backlog — ${today}`);
lines.push('');
lines.push('Generated by `scripts/audit-grounding-quality.mjs`. The five pillars below all passed the 2026-04-25 schema migration (`npm run lint:grounding-strict` exits 0). This audit surfaces *content-quality* issues left by the parser — generic rationales, missing hadith grades, translation artifacts, same-hadith-different-ref duplicates — for human / Scholar Council curation.');
lines.push('');
lines.push('## Summary');
lines.push('');
lines.push('| Pillar      | Flagged sources | Total subtasks | Boilerplate rationale | Missing rationale | Missing hadith grade | Low provenance | Translation artifact | Duplicate hadith translation | Near-duplicate hadith |');
lines.push('| ---         | ---             | ---            | ---                   | ---               | ---                  | ---            | ---                  | ---                          | ---                   |');
for (const r of summaryRows) {
  lines.push(`| ${r.pillar.padEnd(11)} | ${String(r.flagged).padStart(15)} | ${String(r.total).padStart(14)} | ${String(r.boilerplate).padStart(21)} | ${String(r.missingRationale).padStart(17)} | ${String(r.missingHadithGrade).padStart(20)} | ${String(r.lowProvenance).padStart(14)} | ${String(r.translationArtifact).padStart(20)} | ${String(r.duplicateHadith).padStart(28)} | ${String(r.nearDuplicateHadith).padStart(21)} |`);
}
lines.push('');
lines.push(`Total subtasks scanned: ${totals.subtasks}. Total \`sources[]\` entries scanned: ${totals.sources}.`);
lines.push('');
lines.push('## Cluster Findings');
lines.push('');
lines.push(`Identical \`{ref, rationale}\` pairs repeated across ${CLUSTER_THRESHOLD}+ subtasks (likely parser stamps — these are the highest-leverage curation targets):`);
lines.push('');
if (clusters.length === 0) {
  lines.push('_None above threshold._');
} else {
  lines.push('| Ref | Repeat count | Rationale | Sample subtasks (up to 5) |');
  lines.push('| --- | ---          | ---       | ---                        |');
  for (const [key, v] of clusters) {
    const [ref, rationale] = key.split('::');
    const rat = (rationale || '_(empty)_').replace(/\|/g, '\\|');
    const samples = v.samples.join(', ');
    lines.push(`| ${ref} | ${v.count} | ${rat} | ${samples} |`);
  }
}
lines.push('');

for (const [id] of PILLARS) {
  const flags = flagsByPillar[id];
  lines.push(`## ${id.charAt(0).toUpperCase() + id.slice(1)} — ${flags.length} flagged sources`);
  lines.push('');
  if (flags.length === 0) {
    lines.push('_No content-quality flags._');
    lines.push('');
    continue;
  }
  lines.push('| Subtask path | Title | Source idx | Source | Issues | Current rationale |');
  lines.push('| ---          | ---   | ---        | ---    | ---    | ---               |');
  for (const f of flags) {
    const title = (f.title || '').replace(/\|/g, '\\|').slice(0, 80);
    const issues = f.issues.join('; ');
    const rat = (f.currentRationale || '_(empty)_').replace(/\|/g, '\\|').replace(/\n/g, ' ').slice(0, 120);
    lines.push(`| ${f.idPath} | ${title} | ${f.sourceIdx} | ${f.source} | ${issues} | ${rat} |`);
  }
  lines.push('');
}

lines.push('## Recommended Curation Order');
lines.push('');
const ranked = [...summaryRows].sort((a, b) => b.flagged - a.flagged);
ranked.forEach((r, i) => {
  lines.push(`${i + 1}. **${r.pillar}** — ${r.flagged} flagged source entries (boilerplate=${r.boilerplate}, missing-grade=${r.missingHadithGrade}, translation-artifact=${r.translationArtifact}, low-provenance=${r.lowProvenance})`);
});
lines.push('');
lines.push('## Heuristics used');
lines.push('');
lines.push('1. **boilerplate-rationale** — `rationale` matches parser-stamped templates ("Quranic basis cited as evidence for this subtask.", "Prophetic narration cited as evidence for this subtask.", etc.).');
lines.push('2. **missing-rationale** — `rationale` is absent or whitespace-only.');
lines.push('3. **missing-hadith-grade** — `kind: "hadith"` without `hadithGrade`.');
lines.push('4. **low-provenance** — `provenanceTier` is not in {Bayyinah, Qarina, Niyyah} or `relevance` is not in {direct, contextual, thematic} (live vocab read from `src/data/config/amanah-tiers.js` / `relevance-chips.js`).');
lines.push('5. **translation-artifact** — `translation` is empty, contains a leaked `**Translation:**` prefix, or `arabic` field duplicates the translation.');
lines.push('6. **duplicate-hadith-translation** — two `kind: "hadith"` entries in the same `sources[]` carry byte-identical translation strings (one of the refs is likely the wrong number).');
lines.push(`7. **near-duplicate-hadith** — two \`kind: "hadith"\` entries in the same \`sources[]\` normalize to the same narration (token-Jaccard ≥ ${NEAR_DUP_JACCARD}, or overlap-coefficient ≥ ${NEAR_DUP_OVERLAP} with ≥ ${NEAR_DUP_MIN_TOKENS} tokens), after stripping the narrator prefix, translator glosses, diacritics, honorifics, and transliteration variants. Catches the same hadith cited under different ref numbers / translator wordings.`);
lines.push('8. **cluster** — same `{ ref, rationale }` repeated across ≥5 subtasks (computed corpus-wide, see Cluster Findings section).');
lines.push('');
lines.push('## Notes');
lines.push('');
lines.push('- This report is a *backlog*, not a worklist. The user / Scholar Council decides which categories to act on and in what order.');
lines.push('- No Qur\'anic or hadith text was generated; every quoted string in this report is verbatim from `src/data/seed-tasks/*.js`. Translation corrections (heuristic 5) should be retrieved from the Muslim Scholar NotebookLM corpus (`be921648`) per the Amanah Gate, not paraphrased.');
lines.push('- Re-run with: `node scripts/audit-grounding-quality.mjs`');
lines.push('');

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, lines.join('\n'), 'utf8');

console.log(`\nScanned ${totals.subtasks} subtasks / ${totals.sources} source entries across ${PILLARS.length} pillars.`);
console.log(`Wrote backlog to ${path.relative(ROOT, outPath)}`);
console.log('\nPer-pillar flag counts:');
for (const r of summaryRows) {
  console.log(`  ${r.pillar.padEnd(12)} ${String(r.flagged).padStart(4)} flagged  (boilerplate=${r.boilerplate} missing-grade=${r.missingHadithGrade} translation-artifact=${r.translationArtifact} low-provenance=${r.lowProvenance} duplicate-hadith=${r.duplicateHadith} near-dup-hadith=${r.nearDuplicateHadith})`);
}
console.log(`\nCluster findings (≥${CLUSTER_THRESHOLD} repeats): ${clusters.length}`);
