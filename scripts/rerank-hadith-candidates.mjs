// Local heuristic reranker for hadith/ayah candidates.
// No API needed — encodes per-submodule topic models + domain-clash detection.
//
// Strategy (two-factor filter):
//   score = overlap_ratio - (2 × clash_ratio)
//   KEEP if score ≥ MIN_SCORE (default 0.04)
//
// overlap_ratio: fraction of subtask title's keywords found in candidate text
// clash_ratio: fraction of candidate text's words that are "wrong domain" for this submodule
//
// Usage:
//   node scripts/rerank-hadith-candidates.mjs
//   node scripts/rerank-hadith-candidates.mjs --min-score 0.05  (stricter)
//   node scripts/rerank-hadith-candidates.mjs --dry-run

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const INPUT_JSON  = resolve(ROOT, 'stages/hadith-enrichment-candidates.json');
const OUTPUT_JSON = resolve(ROOT, 'stages/hadith-enrichment-candidates.reranked.json');
const OUTPUT_MD   = resolve(ROOT, 'stages/hadith-enrichment-candidates.reranked.md');

const DRY_RUN   = process.argv.includes('--dry-run');
const minScoreArg = process.argv.find(a => a.startsWith('--min-score=') || a.startsWith('--min-score '));
const MIN_SCORE = minScoreArg ? parseFloat(minScoreArg.split(/[= ]/)[1]) : 0.04;

// ── Tokenizer (mirrors generate script: len≥3, not a stop-word) ───────────────

const STOP_WORDS = new Set([
  'the','and','for','with','from','this','that','are','was','were','been',
  'have','has','had','will','would','should','could','shall','may','might',
  'not','but','his','her','its','our','your','their','they','them','then',
  'than','when','what','who','whom','which','how','why','where','into',
  'onto','upon','over','under','about','above','below','after','before',
  'during','through','between','among','against','without','within','along',
  'toward','around','behind','beside','through','whether','while','until',
  'although','because','since','though','unless','however','therefore',
  'narrated','said','told','asked','replied','reported','messenger','prophet',
  'allah','peace','blessings','upon','him','her','pbuh','saw','saws',
  'the','was','that','have','with','from','they','their','this','were','what',
  'who','which','when','there','been','will','would','could','should',
  // common hadith text words that add no content signal
  'ibn','abu','bint','bin','also','told','heard','came','went','said',
  'going','being','doing','then','thus','such','some','more','most',
  'one','two','three','four','five','six','seven','eight','nine','ten',
]);

const ISLAMIC_SHORT_WORDS = new Set([
  'god','sin','due','act','eat','run','sit','lie','die','see','law','war',
  'bow','row','key','age','day','sun','sky','man','men','son','ear','eye',
  'arm','leg','pay','buy','ask','say','use','add','put','let','set','get',
  'end','try','way','off','own','lot','old','new','big','few','far','cut',
  // islamic short words to preserve
  'zud','nuh','lut','dua','dhk','dhx','ilm','nafs','ruh','haq',
  'adl','aql','ulul','maal','riba','waqf','qard','wahy','nabi','wali',
  'zuhd','taqw','khul','nikah','mahr','iddah','wudu','ghusl','tayammum',
  'sawm','siyam','hajj','zakat','jiha','taqwa','niyyah',
]);

function tokenize(text) {
  const words = text.toLowerCase().match(/[a-z']+/g) || [];
  return new Set(words.filter(w => {
    if (w.length < 3) return ISLAMIC_SHORT_WORDS.has(w);
    if (w.length === 3) return !STOP_WORDS.has(w) || ISLAMIC_SHORT_WORDS.has(w);
    return !STOP_WORDS.has(w);
  }));
}

// ── Domain-clash word clusters ─────────────────────────────────────────────────
// Words that, when dominant in a hadith, signal a wrong domain for most submodules.

const DOMAIN_CLUSTERS = {
  hadd_punishment: new Set([
    'flogging','lashes','lash','whipping','amputation','amputate','stoning',
    'crucifixion','crucify','hadd','hudud','qisas','adultery','adulterer',
    'adulterous','fornicator','fornication','thief','stealing','stolen',
    'execution','beheaded','beheading','slash','slashing',
  ]),
  war_military: new Set([
    'battle','troops','cavalry','expedition','army','warrior','sword','raid',
    'battlefield','spoils','booty','captive','captives','siege','garrison',
    'regiment','battalion','fighters','fighting','fighter','combat','combatant',
    'enemies','enemy','hostiles','slew','slain','conquer','conquest',
    'ghazwa','sariyyah',
  ]),
  menstrual: new Set([
    'menstrual','menstruation','menses','istihadah','menstruating',
    'post-partum','nifas','haidh','hayd',
  ]),
  polytheist_customs: new Set([
    'polytheists','idolaters','idolators','idols','pagans','heathens',
    'associating','disbelievers','mushrikeen','infidels','kuffar',
    'worshipped','worshipping','false gods','graven',
  ]),
  eschatological_signs: new Set([
    'portents','dajjal','antichrist','gog','magog','yajooj','majooj',
    'beast','resurrection','trumpet','blown','earthquake','eclipse',
    'smoke','descend','appear',   // too generic - removed most
  ]),
};

// ── Fiqh-sensitive ayahs: hard-blocked from non-purity/non-marriage submodules ─
// These ayahs deal with menstruation, divorce, iddah, and similar ahkam where
// lexical matches on words like "monthly" or "divorce" produce misleading citations
// on unrelated topics (e.g., "monthly review session" being cited with 65:4).
const FIQH_SENSITIVE_AYAHS = new Set([
  '2:222',  // menstruation
  '2:228',  // divorce waiting period (quruu')
  '2:229',  // divorce rulings
  '2:230',  // divorce / halala
  '2:231',  // divorce rulings
  '2:232',  // divorce rulings
  '2:233',  // breastfeeding / custody
  '2:234',  // widowhood iddah
  '65:1',   // talaq
  '65:2',   // talaq witnesses
  '65:4',   // iddah for non-menstruating / menstruating women
  '65:6',   // housing during iddah
  '65:7',   // maintenance
  '33:4',   // dhihar
  '58:2',   // dhihar expiation
  '58:3',   // dhihar expiation
  '58:4',   // dhihar expiation
]);

// Submodules where the fiqh-sensitive ayahs are genuinely on-topic.
const FIQH_SENSITIVE_ALLOWED = new Set([
  'family/marriage',
  'family/kinship',   // custody/breastfeeding can touch kinship
  'faith/hajj',       // menstruation and hajj
  'faith/siyam',      // menstruation and fasting makeup
]);

// ── Fallback-hadith blacklist ──────────────────────────────────────────────────
// Hadiths observed to recur across unrelated subtasks because they share a single
// keyword with many queries. These require a much stronger overlap to survive.
const FALLBACK_HADITH_BLACKLIST = new Set([
  'bukhari-3',     // commencement of wahy
  'bukhari-22',    // people of Paradise / Fire scene
  'bukhari-40',    // Medina migration / qiblah change
  'bukhari-63',    // man on camel asking about Islam
  'bukhari-64',    // Prophet's letter
  'bukhari-126',   // Aisha's secrets
  'bukhari-160',   // Uthman's wudu
  'bukhari-167',   // washing of deceased daughter (kept only for ghusl/janazah)
  'bukhari-214',   // ablution per prayer
  'bukhari-368',   // forbidden sale types (limais/nibadh)
  'bukhari-378',   // Prophet fell off horse
  'bukhari-380',   // meal invitation
  'bukhari-424',   // prayer place in home
  'bukhari-510',   // passing in front of one praying
  'bukhari-917',   // differing opinions (kept for consultation/differences)
  'bukhari-1166',  // Istikhara
  'bukhari-1338',  // grave questioning
  'bukhari-1584',  // round wall of Ka'ba
  'bukhari-1824',  // Prophet's Hajj
  'bukhari-2032',  // i'tikaf vow
  'bukhari-2042',  // i'tikaf vow (duplicate)
  'bukhari-2661',  // drawing lots for wives
  'bukhari-2731',  // Hudaybiyya
  'bukhari-2732',  // Hudaybiyya (duplicate)
  'bukhari-3168',  // Ibn Abbas / Thursday
  'bukhari-3207',  // Mi'raj
  'bukhari-3700',  // Umar stabbed
  'bukhari-4141',  // drawing lots for wives on travel
  'bukhari-4553',  // Abu Sufyan truce
  'bukhari-7517',  // Isra journey
  'muslim-93',     // qadr discussion in Basra
  'muslim-411',    // al-Buraq
  'muslim-416',    // Mi'raj
  'muslim-1522',   // generic Abu Huraira
  'muslim-3245',   // Ka'ba burnt in Yazid's time
  'muslim-3695',   // Ibn Abbas / Umar
  'muslim-3696',   // Ibn Abbas / Umar (duplicate)
  'muslim-4678',   // Hudaybiyya
  'muslim-7021',   // generic attribution chain
]);
const BLACKLIST_OVERRIDE_THRESHOLD = 0.5;  // ≥50% overlap to survive blacklist

// ── Single-keyword penalty ─────────────────────────────────────────────────────
// For subtask queries with ≥4 content keywords, require ≥2 matches (not just 1).
// Prevents noise where one ambiguous word (share/bank/practice/circle/aligned)
// produces a match on an off-topic text.
const MIN_MATCHES_FOR_LONG_QUERY = 2;
const LONG_QUERY_THRESHOLD = 4;

// Per-submodule: which domain clusters are ALLOWED (not penalised)
const ALLOWED_DOMAINS = {
  // Faith pillar: jihad context is relevant in some areas
  'faith/shahada':   [],
  'faith/salah':     [],
  'faith/zakah':     [],
  'faith/siyam':     [],
  'faith/hajj':      ['menstrual'], // haidh and hajj genuinely intersect
  // Life
  'life/physical':   [],
  'life/mental':     [],
  'life/safety':     ['war_military'],  // safety can include self-defence hadiths
  'life/social':     [],
  // Intellect
  'intellect/cognitive': [],
  'intellect/learning':  [],
  'intellect/professional': [],
  'intellect/thinking':  [],
  // Family
  'family/home':     [],
  'family/kinship':  [],
  'family/marriage': ['menstrual'],  // purity & marriage genuinely intersect
  'family/parenting':['war_military'], // patience in hardship hadiths OK
  // Wealth
  'wealth/circulation': [],
  'wealth/earning':     [],
  'wealth/financial':   [],
  'wealth/ownership':   ['hadd_punishment'], // theft hadiths relevant to property rights
  // Environment
  'environment/ecosystem': [],
  'environment/resource':  [],
  'environment/sourcing':  [],
  'environment/waste':     [],
  // Ummah
  'ummah/collective':           ['war_military','polytheist_customs'],
  'ummah/community':            [],
  'ummah/moontrance-land':      [],
  'ummah/moontrance-residency': [],
  'ummah/moontrance-seasonal':  [],
  'ummah/neighbors':            [],
};

// Returns true if candidate contains any word from a non-allowed clash cluster
function hasClash(candidateTokens, pillar, submodule) {
  const key = `${pillar}/${submodule}`;
  const allowed = new Set(ALLOWED_DOMAINS[key] ?? []);

  for (const [clusterName, clusterWords] of Object.entries(DOMAIN_CLUSTERS)) {
    if (allowed.has(clusterName)) continue;
    for (const word of candidateTokens) {
      if (clusterWords.has(word)) return true;
    }
  }
  return false;
}

// ── Scoring ───────────────────────────────────────────────────────────────────
// Hard veto: if ANY clash word is present, the candidate must have ≥ CLASH_OVERRIDE_THRESHOLD
// overlap to survive. Otherwise it is blocked regardless of MIN_SCORE.
const CLASH_OVERRIDE_THRESHOLD = 0.35;  // ≥35% of query words must appear in text to override a clash

function scoreCandidate(subtaskTitle, candidateText, pillar, submodule, candidateMeta = {}) {
  const queryTokens = tokenize(subtaskTitle);
  const candidateTokens = tokenize(candidateText);

  if (queryTokens.size === 0) return 0;

  // Overlap: fraction of query keywords present in the candidate
  let overlap = 0;
  for (const w of queryTokens) {
    if (candidateTokens.has(w)) overlap++;
  }
  const overlapRatio = overlap / queryTokens.size;

  // Hard veto: clash word present + low overlap → reject
  if (hasClash(candidateTokens, pillar, submodule) && overlapRatio < CLASH_OVERRIDE_THRESHOLD) {
    return -1;
  }

  // Fiqh-sensitive ayah blocklist
  if (candidateMeta.type === 'ayah') {
    if (FIQH_SENSITIVE_AYAHS.has(candidateMeta.key) &&
        !FIQH_SENSITIVE_ALLOWED.has(`${pillar}/${submodule}`)) {
      return -1;
    }
  }

  // Fallback-hadith blacklist: require strong overlap to survive
  if (candidateMeta.type === 'hadith') {
    const hadithId = `${candidateMeta.collection}-${candidateMeta.number}`;
    if (FALLBACK_HADITH_BLACKLIST.has(hadithId) && overlapRatio < BLACKLIST_OVERRIDE_THRESHOLD) {
      return -1;
    }
  }

  // Single-keyword penalty for long queries
  if (queryTokens.size >= LONG_QUERY_THRESHOLD && overlap < MIN_MATCHES_FOR_LONG_QUERY) {
    return -1;
  }

  return overlapRatio;
}

// ── Rerank ────────────────────────────────────────────────────────────────────

function rerankSidecar(sidecar) {
  const reranked = {};
  const stats = { kept: 0, dropped: 0, blocks_zeroed: 0 };

  for (const [blockId, block] of Object.entries(sidecar)) {
    const { subtaskTitle, pillar, submodule } = block;

    const keptHadiths = [];
    for (const h of block.hadiths) {
      const text = h.text || '';
      const score = scoreCandidate(subtaskTitle, text, pillar, submodule, {
        type: 'hadith', collection: h.collection, number: h.number,
      });
      if (score >= MIN_SCORE) {
        keptHadiths.push(h);
        stats.kept++;
      } else {
        stats.dropped++;
      }
    }

    const keptAyahs = [];
    for (const a of block.ayahs) {
      const text = (a.translation || '') + ' ' + (a.arabic || '');
      const score = scoreCandidate(subtaskTitle, text, pillar, submodule, {
        type: 'ayah', key: a.key,
      });
      if (score >= MIN_SCORE) {
        keptAyahs.push(a);
        stats.kept++;
      } else {
        stats.dropped++;
      }
    }

    if (keptHadiths.length === 0 && keptAyahs.length === 0) {
      stats.blocks_zeroed++;
    }

    reranked[blockId] = { ...block, hadiths: keptHadiths, ayahs: keptAyahs };
  }

  return { reranked, stats };
}

// ── Regenerate markdown ────────────────────────────────────────────────────────

function regenerateMarkdown(reranked) {
  const lines = [
    '# Maqasid OS — Hadith + Ayah Candidates (Reranked)',
    '',
    '> Review this file. All items are pre-checked. Uncheck any you want to exclude before running apply-hadith-sources.',
    '',
  ];

  let approved = 0;
  let noResults = 0;

  for (const [blockId, block] of Object.entries(reranked)) {
    const { subtaskTitle, pillar, submodule, level } = block;
    const hadithCount = block.hadiths.length;
    const ayahCount = block.ayahs.length;

    if (hadithCount === 0 && ayahCount === 0) {
      noResults++;
      lines.push(`## [${pillar} > ${submodule} > ${level}] ${subtaskTitle}`);
      lines.push(`<!-- id: ${blockId} -->`);
      lines.push('**Status:** NO_RESULTS');
      lines.push('');
      continue;
    }

    approved++;
    lines.push(`## [${pillar} > ${submodule} > ${level}] ${subtaskTitle}`);
    lines.push(`<!-- id: ${blockId} -->`);
    lines.push('**Status:** APPROVE');
    lines.push('');

    if (ayahCount > 0) {
      lines.push('### Ayah Candidates');
      for (let i = 0; i < ayahCount; i++) {
        const a = block.ayahs[i];
        lines.push(`- [x] A${i + 1}: ${a.key} — ${a.translation.slice(0, 120)}${a.translation.length > 120 ? '…' : ''}`);
      }
      lines.push('');
    }

    if (hadithCount > 0) {
      lines.push('### Hadith Candidates');
      for (let i = 0; i < hadithCount; i++) {
        const h = block.hadiths[i];
        const collection = h.collection === 'bukhari' ? 'Bukhari' : 'Muslim';
        lines.push(`- [x] H${i + 1}: ${collection} ${h.number} — ${h.text.slice(0, 120)}${h.text.length > 120 ? '…' : ''}`);
      }
      lines.push('');
    }

    lines.push('---');
    lines.push('');
  }

  const totalBlocks = Object.keys(reranked).length;
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push(`**Total blocks:** ${totalBlocks} | **Approved (with sources):** ${approved} | **NO_RESULTS:** ${noResults}`);

  return lines.join('\n');
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(INPUT_JSON)) {
    console.error(`Missing input: ${INPUT_JSON}`);
    process.exit(1);
  }

  console.log(`Reading ${INPUT_JSON}...`);
  const sidecar = JSON.parse(await readFile(INPUT_JSON, 'utf8'));
  const blockCount = Object.keys(sidecar).length;
  console.log(`Loaded ${blockCount} blocks | MIN_SCORE: ${MIN_SCORE}`);

  console.log('Reranking...');
  const { reranked, stats } = rerankSidecar(sidecar);

  const keepPct = ((stats.kept / (stats.kept + stats.dropped)) * 100).toFixed(1);
  console.log(`\nResults:`);
  console.log(`  Kept:         ${stats.kept} / ${stats.kept + stats.dropped} candidates (${keepPct}%)`);
  console.log(`  Dropped:      ${stats.dropped}`);
  console.log(`  Blocks zeroed: ${stats.blocks_zeroed} / ${blockCount}`);

  if (DRY_RUN) {
    console.log('\nDRY RUN — no files written.');
    // Show a sample of what survived vs was dropped
    const entries = Object.entries(reranked);
    const withSources = entries.filter(([, b]) => b.hadiths.length + b.ayahs.length > 0);
    console.log('\nSample survivors (first 5):');
    for (const [id, block] of withSources.slice(0, 5)) {
      console.log(`  [${block.pillar}/${block.submodule}] ${block.subtaskTitle} — H:${block.hadiths.length} A:${block.ayahs.length}`);
    }
    const zeroed = entries.filter(([, b]) => b.hadiths.length + b.ayahs.length === 0);
    console.log('\nSample zeroed (first 5):');
    for (const [id, block] of zeroed.slice(0, 5)) {
      console.log(`  [${block.pillar}/${block.submodule}] ${block.subtaskTitle}`);
    }
    return;
  }

  console.log(`\nWriting ${OUTPUT_JSON}...`);
  await writeFile(OUTPUT_JSON, JSON.stringify(reranked, null, 2), 'utf8');

  console.log(`Regenerating ${OUTPUT_MD}...`);
  const md = regenerateMarkdown(reranked);
  await writeFile(OUTPUT_MD, md, 'utf8');

  console.log('\nDone. Next steps:');
  console.log('  1. Review stages/hadith-enrichment-candidates.reranked.md');
  console.log('  2. Uncheck any candidates you want to exclude');
  console.log('  3. Run: node scripts/apply-hadith-sources.mjs --candidates stages/hadith-enrichment-candidates.reranked.md --sidecar stages/hadith-enrichment-candidates.reranked.json');
}

main().catch(err => { console.error(err); process.exit(1); });
