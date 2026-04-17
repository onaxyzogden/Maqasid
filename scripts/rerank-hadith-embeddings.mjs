// Semantic reranker using sentence-transformer embeddings.
// Replaces lexical scoring with cosine similarity over multilingual embeddings.
// Safety filters (fiqh-sensitive ayah blocklist, domain clash) are preserved
// as post-filters so that high cosine similarity cannot override a veto.
//
// Model: Xenova/paraphrase-multilingual-MiniLM-L12-v2 (~120MB, 384-dim, multilingual).
// First run downloads the model into node_modules cache (~1-2 min). Subsequent
// runs load from cache (instant).
//
// Usage:
//   node scripts/rerank-hadith-embeddings.mjs
//   node scripts/rerank-hadith-embeddings.mjs --threshold 0.5 --top-k 3
//   node scripts/rerank-hadith-embeddings.mjs --dry-run

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { pipeline, env as hfEnv } from '@huggingface/transformers';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const INPUT_JSON  = resolve(ROOT, 'stages/hadith-enrichment-candidates.json');
const OUTPUT_JSON = resolve(ROOT, 'stages/hadith-enrichment-candidates.reranked.json');
const OUTPUT_MD   = resolve(ROOT, 'stages/hadith-enrichment-candidates.reranked.md');
const EMBED_CACHE = resolve(ROOT, 'stages/.embed-cache.json');

function getArg(flag, dflt) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return dflt;
  const v = process.argv[idx + 1];
  return v && !v.startsWith('--') ? v : dflt;
}
const DRY_RUN   = process.argv.includes('--dry-run');
const THRESHOLD = parseFloat(getArg('--threshold', '0.45'));
const TOP_K     = parseInt(getArg('--top-k', '3'), 10);
const BATCH_SIZE = 32;

// Cache to disk — embeddings are expensive but deterministic. Hash = text.
hfEnv.allowLocalModels = false;  // use HF cache
hfEnv.useBrowserCache = false;

// ── Safety filters (preserved from lexical reranker) ──────────────────────────

const FIQH_SENSITIVE_AYAHS = new Set([
  '2:222','2:228','2:229','2:230','2:231','2:232','2:233','2:234',
  '2:235','2:236','2:237',
  '4:3','4:19','4:20','4:21',
  '24:2','24:6','24:7','24:8','24:9',
  '33:4','33:49',
  '58:2','58:3','58:4',
  '65:1','65:2','65:4','65:6','65:7',
]);
// Per-ayah topical gate. The verse only passes if the subtask title
// (lowercased) contains one of these trigger words — otherwise the
// semantic score alone could land an iddah verse on a general-marriage
// or parenting subtask.
const FIQH_ALLOW_KEYWORDS = {
  '2:222': ['menstr','period','hayd','purification','ghusl'],
  '2:228': ['divorce','iddah','waiting period','talaq','khul'],
  '2:229': ['divorce','iddah','talaq','khul'],
  '2:230': ['divorce','iddah','talaq','remarr'],
  '2:231': ['divorce','iddah','talaq'],
  '2:232': ['divorce','iddah','talaq','remarr'],
  '2:233': ['breastfeed','nursing','suckle','wet-nurse','wetnurse'],
  '2:234': ['widow','iddah','mourning','waiting period'],
  '2:235': ['proposal','propose','marriage proposal','khitba','widow during iddah'],
  '2:236': ['mahr','divorce before','unconsummated'],
  '2:237': ['mahr','divorce before','half'],
  '4:3': ['polygyn','multiple wives','orphan girls'],
  '4:19': ['treat wives','kind treatment of wives','coerce wife','inherit women'],
  '4:20': ['mahr','divorce','replace wife'],
  '4:21': ['mahr','mithaq','marriage covenant'],
  '24:2': ['zina','fornicat','adulter','lashes','hadd'],
  '24:6': ['lian','accus','oath'],
  '24:7': ['lian','oath'],
  '24:8': ['lian','oath'],
  '24:9': ['lian','oath'],
  '33:49': ['divorce before','unconsummated','iddah'],
  '65:1': ['divorce','iddah','talaq'],
  '65:2': ['divorce','iddah','talaq','witness of divorce'],
  '65:4': ['divorce','iddah','talaq','menopaus','menstru'],
  '65:6': ['divorce','iddah','breastfeed','pregnant'],
  '65:7': ['maintenance after divorce','nafaqah after divorce'],
  '33:4': ['dhihar','zihar','adoption'],
  '58:2': ['dhihar','zihar'],
  '58:3': ['dhihar','zihar'],
  '58:4': ['dhihar','zihar'],
};
function fiqhGateAllows(ayahKey, subtaskTitle) {
  const kws = FIQH_ALLOW_KEYWORDS[ayahKey];
  if (!kws) return false;
  const t = (subtaskTitle || '').toLowerCase();
  return kws.some(kw => t.includes(kw));
}

// Recurring false-positives observed across QA samples — absolute vetoes.
const HADITH_BLACKLIST = new Set([
  'muslim:3245',   // Ka'ba burnt during Yazid — resurfaces on 5-pillars, Madinah, etc.
  'bukhari:3340',  // Banquet / cooked food — resurfaces on iman, faith articles
  'bukhari:744',   // Takbir silence — lexical "between" FP on du'a / adhkar
  'bukhari:2426',  // Found purse — FP on monthly reflection, public conduct
  'bukhari:3617',  // Christian apostate — FP on reading sections
  'bukhari:1269',  // Hypocrite son — FP on reading sections
  'bukhari:804',   // Sami'a Allah — FP on migration/heritage
  'bukhari:5441',  // Abu Huraira hosting — FP on zakah distribution
  'bukhari:86',    // Asma eclipse — FP on Fatihah / salah word-study
  'bukhari:922',   // Same Asma eclipse narration
  'bukhari:5051',  // How much Quran in prayer — FP on riba verses study
  'bukhari:3906',  // Suraqa — FP on community liaison
  // Scholar review additions
  'muslim:2951',   // Pilgrim narrations — FP on Ibrahim sacrifice / env ethics
  'bukhari:7517',  // Isra/Mi'raj — FP on "nearest masjid" logistics
  'bukhari:42',    // Generic faith-branches — FP on course evaluation / taharah
  'bukhari:25',    // Generic — FP on mediators / scholars / researchers
  'bukhari:2468',  // Hudaybiyya/attribution-chain padding
  'bukhari:1284',  // Same family — attribution-chain
  'bukhari:3207',  // Mi'raj — FP on istikharah, angels-study
  'bukhari:3887',  // Mi'raj — FP on istikharah
  'bukhari:466',   // Generic book-choosing FP
  'bukhari:3355',  // FP on Arabic letters
  'bukhari:485',   // FP on reliable translation
  'bukhari:486',
  'bukhari:487',
  'bukhari:1359',  // FP on waqf / practitioner report
]);
const AYAH_BLACKLIST = new Set([
  // Lexical false-friends (V3 first pass)
  '56:56',  // "accommodation on Day of Recompense" — FP on workplace accommodation
  '79:43',  // "in what position" — FP on "choose a position"
  '84:21',  // "don't prostrate when Quran is read" — FP on read Quran verses
  '80:33',  // "Deafening Noise" — FP on minimise visual noise
  '19:74',  // "better in assets" — FP on asset strategy
  '77:14',  // "Day of Decision" — FP on document decision
  '30:4',   // "decision of matter with Allah" — FP on decision review
  '46:11',  // "disbelievers say of poor" — weak on al-fuqara
  '2:187',  // sexual relations at night of fast — FP on riba
  '13:35',  // paradise rivers — FP on riba
  '94:7',   // "toil hard when free" — too generic
  '63:8',   // hypocrites returning to Madinah — weak on Sahifat
  '3:78',   // "section who distort" — FP on "read section"
  '39:18',  // "follow best meaning" — weak on word-study
  '4:103',  // "when you finish prayer" — FP on duha time
  '12:93',  // Yusuf shirt — FP on family hosting
  '51:47',  // "construct firmament" — FP on home design
  '5:1',    // "fulfill contracts" — FP on ihram miqat (too generic)
  '72:6',   // jinn protection — FP on community liaison
  '45:28',  // "every community kneeling" — FP on community rights
  // Scholar review additions — paradise/eschatology concrete-noun FPs
  '76:5',   // paradise cup of kafoor — FP on reusable water bottle
  '76:17',  // paradise cup of zanjabeel — FP on reusable water bottle
  '76:28',  // "We created them" — FP on durable garments
  '55:54',  // paradise couches — FP on garden layout
  '56:7',   // "three kinds on Judgment Day" — FP on product categories
  '56:29',  // paradise lote-trees — FP on interplanting
  '56:89',  // paradise honoured ones — FP on native plant nurseries
  '56:65',  // "debris" — FP on israf, tawbah
  '44:26',  // paradise gardens/fountains — FP on green manure cropping
  '88:14',  // paradise drinking cups
  // Scholar review additions — wrong-topic verses
  '2:258',  // Ibrahim-Nimrud debate — FP on "Ibrahim's sacrifice" (correct: 37:102-107)
  '2:144',  // qibla direction — FP on "nearest masjid"
  '40:49',  // dwellers of hellfire — FP on praying in jama'ah
  '22:26',  // Ibrahim purifying Ka'bah — FP on sujud al-sahw / ruku adhkar
  '7:21',   // Iblis's false "sincere advice" — ironic, FP on nasihah
  '2:241',  // divorce-mata'a — FP on just wages
  '4:95',   // mujahidun vs qa'idun — FP on zakah dua
  '68:46',  // "do you ask them for payment" — opposite of "subtract debts"
  '51:4',   // clouds/winds distributing — FP on trustworthy zakah orgs
  '12:75',  // Yusuf finding cup — FP on repayment schedule
  '17:63',  // Shaytan's claim on descendants — FP on forgiving borrower
  '81:7',   // souls paired — FP on budgeting tool
  '3:19',   // "religion is Islam" — FP on course evaluation, book choice
  '16:60',  // "worst example" — FP on will updating
  '18:108', // Kahf reward — FP on inheritance verification
  '19:73',  // "better position" — same trap as 79:43
  // Sura-opening "This is the Book" verses (leak on study/compile tasks)
  '41:3',
  '15:1',
  '27:1',
  // Additional paradise/judgment descriptions
  '59:21',  // mountain humbled by Quran — FP on khilafah ayat
  '53:32',  // "avoid great sins" — FP on khilafah
  '2:132',  // Ibrahim commanded sons — FP on env ethics
  '13:16',  // "who is Lord of heavens" — FP on barakah du'a
  '86:12',  // "splitting land" — FP on native trees/hedgerows
  '38:54',  // "Our provision never ending" — FP on waste bin
  '2:121',  // "those who received Book recite it" — FP on cleanliness, books
  '17:71',  // "every people with their imam" — too generic; FP on leader development
  '28:78',  // Qarun — FP on hadith of knowledge virtue
  '33:33',  // "stay in houses" (Prophet's wives) — FP on jama'ah at home, zakah dua
]);

function titleWordCount(title) {
  return (title || '').split(/\s+/).filter(Boolean).length;
}

const DOMAIN_CLUSTERS = {
  hadd_punishment: ['flogging','lashes','lash','whipping','amputation','amputate','stoning',
    'crucifixion','crucify','hadd','hudud','qisas','adultery','adulterer','adulterous',
    'fornicator','fornication','thief','stealing','stolen','execution','beheaded','beheading'],
  war_military: ['battle','troops','cavalry','expedition','army','warrior','sword','raid',
    'battlefield','spoils','booty','captive','captives','siege','combat','combatant',
    'enemies','enemy','slew','slain','conquer','conquest','ghazwa','sariyyah'],
  menstrual: ['menstrual','menstruation','menses','istihadah','menstruating',
    'post-partum','nifas','haidh','hayd'],
  polytheist_customs: ['polytheists','idolaters','idolators','idols','pagans','heathens',
    'mushrikeen','infidels','kuffar'],
};

const ALLOWED_DOMAINS = {
  'faith/hajj': ['menstrual'],
  'life/safety': ['war_military'],
  'family/marriage': ['menstrual'],
  'family/parenting': ['war_military'],
  'wealth/ownership': ['hadd_punishment'],
  'ummah/collective': ['war_military','polytheist_customs'],
};

function hasClash(candidateText, pillar, submodule) {
  const lower = candidateText.toLowerCase();
  const key = `${pillar}/${submodule}`;
  const allowed = new Set(ALLOWED_DOMAINS[key] ?? []);
  for (const [clusterName, words] of Object.entries(DOMAIN_CLUSTERS)) {
    if (allowed.has(clusterName)) continue;
    for (const w of words) {
      if (lower.includes(w)) return true;
    }
  }
  return false;
}

// ── Embedding pipeline ─────────────────────────────────────────────────────────

async function loadModel() {
  console.log('Loading embedding model (first run downloads ~120MB)...');
  const t0 = Date.now();
  const extractor = await pipeline(
    'feature-extraction',
    'Xenova/paraphrase-multilingual-MiniLM-L12-v2',
    { quantized: true },
  );
  console.log(`Model loaded in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return extractor;
}

async function embedBatch(extractor, texts) {
  const output = await extractor(texts, { pooling: 'mean', normalize: true });
  const dim = output.dims[output.dims.length - 1];
  const data = output.data;
  const n = output.dims[0];
  const vectors = [];
  for (let i = 0; i < n; i++) {
    vectors.push(Array.from(data.slice(i * dim, (i + 1) * dim)));
  }
  return vectors;
}

function cosine(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;  // vectors are already L2-normalized
}

// ── Collect unique texts to embed ──────────────────────────────────────────────

function collectUniqueTexts(sidecar) {
  const texts = new Set();
  for (const block of Object.values(sidecar)) {
    texts.add(block.subtaskTitle);
    for (const h of block.hadiths) {
      if (h.text) texts.add(truncate(h.text));
    }
    for (const a of block.ayahs) {
      const t = (a.translation || '').trim();
      if (t) texts.add(truncate(t));
    }
  }
  return [...texts];
}

// MiniLM context is 128 tokens (~500 chars). Truncate long hadiths.
function truncate(text) {
  return text.length > 500 ? text.slice(0, 500) : text;
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(INPUT_JSON)) {
    console.error(`Missing input: ${INPUT_JSON}`);
    process.exit(1);
  }

  console.log(`Config: threshold=${THRESHOLD}, top_k=${TOP_K}, batch_size=${BATCH_SIZE}`);
  console.log(`Reading ${INPUT_JSON}...`);
  const sidecar = JSON.parse(await readFile(INPUT_JSON, 'utf8'));
  const blockCount = Object.keys(sidecar).length;
  console.log(`Loaded ${blockCount} blocks`);

  const uniqueTexts = collectUniqueTexts(sidecar);
  console.log(`Unique texts to embed: ${uniqueTexts.length}`);

  // Load cache if present
  let cache = {};
  if (existsSync(EMBED_CACHE)) {
    try {
      cache = JSON.parse(await readFile(EMBED_CACHE, 'utf8'));
      console.log(`Cache hit: ${Object.keys(cache).length} pre-computed embeddings`);
    } catch { cache = {}; }
  }

  const toEmbed = uniqueTexts.filter(t => !cache[t]);
  console.log(`Need to embed: ${toEmbed.length} new texts`);

  if (toEmbed.length > 0) {
    const extractor = await loadModel();
    const t0 = Date.now();
    let done = 0;
    for (let i = 0; i < toEmbed.length; i += BATCH_SIZE) {
      const batch = toEmbed.slice(i, i + BATCH_SIZE);
      const vectors = await embedBatch(extractor, batch);
      for (let j = 0; j < batch.length; j++) {
        cache[batch[j]] = vectors[j];
      }
      done += batch.length;
      if (done % (BATCH_SIZE * 10) === 0 || done === toEmbed.length) {
        const rate = done / ((Date.now() - t0) / 1000);
        const eta = (toEmbed.length - done) / rate;
        console.log(`  ${done}/${toEmbed.length} (${rate.toFixed(1)}/s, ETA ${eta.toFixed(0)}s)`);
      }
    }
    console.log(`Embedding complete in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

    // Persist cache
    console.log('Writing embedding cache...');
    await writeFile(EMBED_CACHE, JSON.stringify(cache), 'utf8');
  }

  // Score every block
  console.log('\nScoring blocks...');
  const reranked = {};
  const stats = { kept: 0, dropped: 0, blocks_zeroed: 0, vetoed_fiqh: 0, vetoed_clash: 0, vetoed_blacklist: 0 };

  for (const [blockId, block] of Object.entries(sidecar)) {
    const { subtaskTitle, pillar, submodule } = block;
    const subtaskVec = cache[subtaskTitle];
    if (!subtaskVec) {
      reranked[blockId] = { ...block, hadiths: [], ayahs: [] };
      stats.blocks_zeroed++;
      continue;
    }

    const wc = titleWordCount(subtaskTitle);
    const thr = wc <= 5 ? Math.max(THRESHOLD, 0.50) : THRESHOLD;

    const scoredHadiths = [];
    for (const h of block.hadiths) {
      const hKey = `${h.collection}:${h.number}`;
      if (HADITH_BLACKLIST.has(hKey)) { stats.vetoed_blacklist++; stats.dropped++; continue; }
      const textKey = truncate(h.text || '');
      const vec = cache[textKey];
      if (!vec) { stats.dropped++; continue; }
      const sim = cosine(subtaskVec, vec);
      if (sim < thr) { stats.dropped++; continue; }
      if (hasClash(h.text || '', pillar, submodule)) {
        stats.vetoed_clash++; stats.dropped++; continue;
      }
      scoredHadiths.push({ h, sim });
    }

    const scoredAyahs = [];
    for (const a of block.ayahs) {
      if (AYAH_BLACKLIST.has(a.key)) { stats.vetoed_blacklist++; stats.dropped++; continue; }
      const textKey = truncate((a.translation || '').trim());
      const vec = cache[textKey];
      if (!vec) { stats.dropped++; continue; }
      const sim = cosine(subtaskVec, vec);
      if (sim < thr) { stats.dropped++; continue; }
      if (FIQH_SENSITIVE_AYAHS.has(a.key) && !fiqhGateAllows(a.key, subtaskTitle)) {
        stats.vetoed_fiqh++; stats.dropped++; continue;
      }
      if (hasClash(a.translation || '', pillar, submodule)) {
        stats.vetoed_clash++; stats.dropped++; continue;
      }
      scoredAyahs.push({ a, sim });
    }

    scoredHadiths.sort((x, y) => y.sim - x.sim);
    scoredAyahs.sort((x, y) => y.sim - x.sim);
    const keptHadiths = scoredHadiths.slice(0, TOP_K).map(x => x.h);
    const keptAyahs   = scoredAyahs.slice(0, TOP_K).map(x => x.a);
    stats.kept += keptHadiths.length + keptAyahs.length;
    stats.dropped += (scoredHadiths.length - keptHadiths.length) + (scoredAyahs.length - keptAyahs.length);

    if (keptHadiths.length === 0 && keptAyahs.length === 0) stats.blocks_zeroed++;
    reranked[blockId] = { ...block, hadiths: keptHadiths, ayahs: keptAyahs };
  }

  const total = stats.kept + stats.dropped;
  console.log('\nResults:');
  console.log(`  Kept:          ${stats.kept} / ${total} (${((stats.kept / total) * 100).toFixed(1)}%)`);
  console.log(`  Dropped:       ${stats.dropped}`);
  console.log(`  Vetoed (fiqh):  ${stats.vetoed_fiqh}`);
  console.log(`  Vetoed (clash): ${stats.vetoed_clash}`);
  console.log(`  Vetoed (blacklist): ${stats.vetoed_blacklist}`);
  console.log(`  Blocks zeroed: ${stats.blocks_zeroed} / ${blockCount}`);

  if (DRY_RUN) { console.log('\nDRY RUN — no output files written.'); return; }

  console.log(`\nWriting ${OUTPUT_JSON}...`);
  await writeFile(OUTPUT_JSON, JSON.stringify(reranked, null, 2), 'utf8');

  console.log(`Regenerating ${OUTPUT_MD}...`);
  await writeFile(OUTPUT_MD, regenerateMarkdown(reranked), 'utf8');

  console.log('\nDone. Next: strip-hadith-sources.mjs --all, then apply-hadith-sources.mjs');
}

function regenerateMarkdown(reranked) {
  const lines = [
    '# Maqasid OS — Hadith + Ayah Candidates (Reranked, Semantic)',
    '',
    '> Review this file. All items are pre-checked. Uncheck any you want to exclude before apply.',
    '',
  ];
  let approved = 0, noResults = 0;
  for (const [blockId, block] of Object.entries(reranked)) {
    const { subtaskTitle, pillar, submodule, level } = block;
    const h = block.hadiths.length, a = block.ayahs.length;
    if (h === 0 && a === 0) {
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
    if (a > 0) {
      lines.push('### Ayah Candidates');
      for (let i = 0; i < a; i++) {
        const x = block.ayahs[i];
        lines.push(`- [x] A${i + 1}: ${x.key} — ${x.translation.slice(0, 120)}${x.translation.length > 120 ? '…' : ''}`);
      }
      lines.push('');
    }
    if (h > 0) {
      lines.push('### Hadith Candidates');
      for (let i = 0; i < h; i++) {
        const x = block.hadiths[i];
        const col = x.collection === 'bukhari' ? 'Bukhari' : 'Muslim';
        lines.push(`- [x] H${i + 1}: ${col} ${x.number} — ${x.text.slice(0, 120)}${x.text.length > 120 ? '…' : ''}`);
      }
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }
  lines.push(`**Generated:** ${new Date().toISOString()}`);
  lines.push(`**Total blocks:** ${Object.keys(reranked).length} | **Approved:** ${approved} | **NO_RESULTS:** ${noResults}`);
  return lines.join('\n');
}

main().catch(err => { console.error(err); process.exit(1); });
