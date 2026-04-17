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

// ── Contextual pairing gates ──────────────────────────────────────────────────
//
// These are NOT blacklists. Every ayah is revelation; every Sahih hadith is
// authentic. The gates below record the *proper topical contexts* for specific
// citations that the embedding model tends to mis-pair on unrelated subtasks.
//
// A citation listed here may appear only on a subtask whose title contains at
// least one of the declared topical keywords — affirming that the verse/hadith
// belongs on topics where it belongs, not denying its truth.
//
// Add to these gates when a QA sample shows a citation mis-landing; describe
// the citation's *true subject* via keyword list.

const AYAH_CONTEXTUAL_GATES = {
  // Akhira / paradise / hellfire description verses — belong on
  // Hereafter/akhira-reflection subtasks, not on worldly implementation.
  '76:5':   ['paradise','akhira','jannah','hereafter','reward of','drink of paradise'],
  '76:17':  ['paradise','akhira','jannah','hereafter','reward of','drink of paradise'],
  '76:28':  ['creation of mankind','resurrect','hereafter','akhira'],
  '55:54':  ['paradise','akhira','jannah','hereafter'],
  '56:7':   ['judgment day','akhira','hereafter','three groups'],
  '56:29':  ['paradise','akhira','jannah'],
  '56:56':  ['hereafter','akhira','recompense','hospitality of allah'],
  '56:65':  ['hereafter','akhira','recompense'],
  '56:89':  ['paradise','akhira','jannah','nearness to allah'],
  '44:26':  ['paradise','akhira','jannah','pharaoh'],
  '88:14':  ['paradise','akhira','jannah','hereafter'],
  '77:14':  ['judgment day','yawm al-din','hereafter'],
  '84:21':  ['hereafter','akhira','day of judgment'],
  '79:43':  ['hereafter','resurrection','day of judgment','hour'],
  '13:35':  ['paradise','akhira','jannah','reward of muttaqun'],
  '30:4':   ['roman empire','byzantine','battle of badr','qadar'],
  '45:28':  ['judgment day','akhira','book of deeds'],
  '19:74':  ['past nations','destroyed peoples','hereafter'],
  '19:73':  ['hereafter','past nations','believers vs disbelievers'],
  '59:21':  ['humility before quran','reflect on quran','heart softening'],
  '53:32':  ['major sins','kabair','taqwa','forgiveness'],
  // Stories / historical context verses
  '2:258':  ['nimrud','ibrahim debate','lordship','life and death'],
  '2:132':  ['ibrahim last will','ibrahim commanded sons','tawhid teaching'],
  '12:75':  ['yusuf','prophet joseph','cup story'],
  '12:93':  ['yusuf','prophet joseph','yaqub reunion'],
  '17:63':  ['shaytan','iblis oath','descendants of adam'],
  '81:7':   ['judgment day','souls paired','qiyamah'],
  '68:46':  ['prophet muhammad reward','payment from people','no wage for dawah'],
  '38:54':  ['paradise','akhira','provision of allah'],
  '22:26':  ['ibrahim','kaaba construction','purifying haram','hajj history'],
  // Prayer / qibla-specific
  '2:144':  ['qibla','direction of prayer','kaaba qibla','changing qibla'],
  '40:49':  ['hellfire','punishment','regret of kuffar'],
  '4:103':  ['prayer after battle','post-salah dhikr','shortening prayer'],
  // Iblis irony / false claims
  '7:21':   ['shaytan deception','iblis lies','false advice'],
  // Concrete-instance economic verses
  '2:187':  ['fasting rules','ramadan intimacy','suhoor','dawn of fast'],
  '2:241':  ['divorced women','mata','compensation on divorce'],
  '2:121':  ['people of the book','recite book','bani israil'],
  '2:132':  ['ibrahim','last testament','tawhid teaching'],
  '4:95':   ['jihad','mujahidun','striving vs sitting'],
  '51:4':   ['wind','clouds','distribute affairs','natural signs'],
  '51:47':  ['cosmology','firmament','creation of heavens'],
  '46:11':  ['disbelievers mock poor','rejection of truth'],
  '63:8':   ['hypocrites','munafiqun','madinah nifaq'],
  '72:6':   ['jinn','protection from jinn','pagan customs'],
  // Generic-meaning verses (allow only on exact topical match)
  '94:7':   ['freedom from burden','after hardship','ibadah after work'],
  '3:78':   ['distortion of scripture','tahrif','people of book'],
  '3:19':   ['religion is islam','true religion','islam as deen'],
  '3:33':   ['prophets chosen','ibrahim family','imran family'],
  '33:33':  ['wives of the prophet','ahl al-bayt','modesty of prophet household'],
  '28:78':  ['qarun','wealth arrogance','punishment of greed'],
  '18:108': ['paradise','kahf reward','eternal dwelling'],
  '16:60':  ['worst example','disbelievers','best example'],
  '17:71':  ['judgment day','every nation with imam','book of deeds'],
  '13:16':  ['lordship of heavens','tawhid'],
  '86:12':  ['signs of creation','earth splitting','rain cycle'],
  '39:18':  ['follow best of guidance','listen to speech','good listeners'],
  '5:1':    ['fulfill contracts','covenant with allah','hajj ihram rules'],
  '41:3':   ['arabic quran','clarity of revelation','revelation from allah'],
  '15:1':   ['revelation of quran','clear book'],
  '27:1':   ['revelation of quran','clear signs'],
};

// Hadith contextual gates — narrations whose true subject is narrower than
// their frequent matches. Declare the proper topic so they appear only there.
const HADITH_CONTEXTUAL_GATES = {
  'muslim:3245':   ['kaaba history','yazid','ibn zubayr','kaaba reconstruction'],
  'bukhari:3340':  ['prophet companions meal','banquet of prophet','hospitality of prophet'],
  'bukhari:744':   ['opening takbir','silence between takbir','al-fatiha recitation'],
  'bukhari:2426':  ['finding lost property','luqata','returning found items'],
  'bukhari:3617':  ['christian who embraced islam','apostasy','early muslims'],
  'bukhari:1269':  ['abdullah ibn ubay','hypocrites funeral','prophet kindness to munafiq'],
  'bukhari:804':   ['ruku dhikr','sami allahu','rising from ruku'],
  'bukhari:5441':  ['hospitality of abu huraira','guests of prophet','companion generosity'],
  'bukhari:86':    ['eclipse prayer','solar eclipse','kusuf','aisha narration of eclipse'],
  'bukhari:922':   ['eclipse prayer','kusuf','aisha narration'],
  'bukhari:5051':  ['minimum quran for prayer','recitation amount in salah'],
  'bukhari:3906':  ['hijra','migration of prophet','suraqa chasing prophet'],
  'muslim:2951':   ['jabir narration of hajj','farewell hajj','prophet hajj'],
  'bukhari:7517':  ['isra and miraj','night journey','ascension'],
  'bukhari:42':    ['hearing and obeying rulers','branches of faith'],
  'bukhari:25':    ['muslim kills muslim','fighting muslim','worst sins'],
  'bukhari:2468':  ['hudaybiyya','treaty of hudaybiyya','prophet delegation'],
  'bukhari:1284':  ['patience at first shock','sabr at calamity','grieving mother'],
  'bukhari:3207':  ['isra and miraj','night journey','miraj ascent'],
  'bukhari:3887':  ['isra and miraj','ascent to heavens','gibril accompanying prophet','miraj ascent'],
  'bukhari:466':   ['building of the mosque','masjid nabawi construction'],
  'bukhari:3355':  ['creation of adam','height of adam','first man'],
  'bukhari:485':   ['mosque construction','masjid nabawi'],
  'bukhari:486':   ['mosque construction','masjid nabawi'],
  'bukhari:487':   ['mosque construction','masjid nabawi'],
  'bukhari:1359':  ['funeral','janazah','grave digging'],
};

function contextualGateAllows(gates, key, subtaskTitle) {
  const kws = gates[key];
  if (!kws) return true;  // no gate declared → pass through
  const t = (subtaskTitle || '').toLowerCase();
  return kws.some(kw => t.includes(kw));
}

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
  const stats = { kept: 0, dropped: 0, blocks_zeroed: 0, vetoed_fiqh: 0, vetoed_clash: 0, gated_context: 0 };

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
      const textKey = truncate(h.text || '');
      const vec = cache[textKey];
      if (!vec) { stats.dropped++; continue; }
      const sim = cosine(subtaskVec, vec);
      if (sim < thr) { stats.dropped++; continue; }
      if (!contextualGateAllows(HADITH_CONTEXTUAL_GATES, hKey, subtaskTitle)) {
        stats.gated_context++; stats.dropped++; continue;
      }
      if (hasClash(h.text || '', pillar, submodule)) {
        stats.vetoed_clash++; stats.dropped++; continue;
      }
      scoredHadiths.push({ h, sim });
    }

    const scoredAyahs = [];
    for (const a of block.ayahs) {
      const textKey = truncate((a.translation || '').trim());
      const vec = cache[textKey];
      if (!vec) { stats.dropped++; continue; }
      const sim = cosine(subtaskVec, vec);
      if (sim < thr) { stats.dropped++; continue; }
      if (FIQH_SENSITIVE_AYAHS.has(a.key) && !fiqhGateAllows(a.key, subtaskTitle)) {
        stats.vetoed_fiqh++; stats.dropped++; continue;
      }
      if (!contextualGateAllows(AYAH_CONTEXTUAL_GATES, a.key, subtaskTitle)) {
        stats.gated_context++; stats.dropped++; continue;
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
  console.log(`  Gated (contextual): ${stats.gated_context}`);
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
