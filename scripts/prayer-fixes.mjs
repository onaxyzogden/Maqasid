#!/usr/bin/env node
// One-shot patch script for the prayer-seed-tasks.js launch-readiness review (2026-05-03).
// Rewrites 8 inline edits using exact byte-for-byte string match. Idempotent (skips when already applied).

import fs from 'node:fs';
import path from 'node:path';

const FILE = path.resolve('src/data/seed-tasks/prayer-seed-tasks.js');
let src = fs.readFileSync(FILE, 'utf8');
let original = src;

const ADR = '[[2026-05-03-milos-prayer-launch-readiness-review]]';
const DASH = '\\u2014'; // literal 6-char escape as it appears in the file
const PBUH = '\\uFDFA';

const fixes = [];

// ---------- Fix 1: Dhuhr Sunnah-before (Muslim 728a, line ~104) ----------
fixes.push({
  name: 'Fix 1 — Dhuhr Sunnah-before Muslim 728a relevance downgrade',
  before:
    `            relevance: 'direct',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "Establishes the twelve daily rawātib ${DASH} including the 4 before Dhuhr ${DASH} as the set the Prophet ${PBUH} promised a house in Paradise for."\n`,
  after:
    `            relevance: 'contextual',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "Anchors the 4-before-Dhuhr inside the twelve-rakʿat rawātib promise. The matn names the count (12 rakʿat = a house in Paradise) but does not enumerate the breakdown; the 4-before-Dhuhr inclusion is by inference from the broader rawātib corpus, hence contextual rather than direct.",\n` +
    `            ratNote: "Relevance downgraded direct ${DASH}> contextual on 2026-05-03 per the launch-readiness review. The cited matn establishes the operative ruling on the twelve-rakʿat promise, not on the 4-before-Dhuhr decomposition specifically. See ${ADR}."\n`,
});

// ---------- Fix 2: Dhuhr Farḍ Bukhari 759 → 760 (line ~113 amanahRationale + line ~119 ref) ----------
fixes.push({
  name: 'Fix 2a — Dhuhr Farḍ amanahRationale Bukhari 759 → 760',
  before: `        amanahRationale: "Khabbab ibn al-Aratt in Sahih al-Bukhari 759 reports that the companions knew the Prophet ${PBUH}'s recitation in Dhuhr and Asr only by the movement of his beard ${DASH} the silent recitation is directly prophetic.",\n`,
  after:  `        amanahRationale: "Khabbab ibn al-Aratt in Sahih al-Bukhari 760 reports that the companions knew the Prophet ${PBUH}'s recitation in Dhuhr and Asr only by the movement of his beard ${DASH} the silent recitation is directly prophetic.",\n`,
});

fixes.push({
  name: 'Fix 2b — Dhuhr Farḍ why-prose Bukhari 759 → 760',
  before: `        why: "Dhuhr's fard is silent because its inward khushūʿ is the work. The tongue does not lead; the heart does. Bukhari 759 shows the companions inferring the Prophet's ${PBUH} recitation only from the motion of his beard.",\n`,
  after:  `        why: "Dhuhr's fard is silent because its inward khushūʿ is the work. The tongue does not lead; the heart does. Bukhari 760 shows the companions inferring the Prophet's ${PBUH} recitation only from the motion of his beard.",\n`,
});

// ---------- Fix 3: Dhuhr Sunnah-after (Muslim 728a, line ~146) ----------
fixes.push({
  name: 'Fix 3 — Dhuhr Sunnah-after Muslim 728a relevance downgrade',
  before:
    `            relevance: 'direct',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "The two rakʿat after Dhuhr sit inside the twelve-rakʿat rawātib promise ${DASH} same hadith anchors the after-count as the before-count."\n`,
  after:
    `            relevance: 'contextual',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "The two rakʿat after Dhuhr sit inside the twelve-rakʿat rawātib promise. The matn names the count (12 rakʿat) but does not enumerate the after-Dhuhr 2-rakʿah specifically; the inclusion is by inference from the broader rawātib corpus, hence contextual.",\n` +
    `            ratNote: "Relevance downgraded direct ${DASH}> contextual on 2026-05-03 per the launch-readiness review (same reasoning as the 4-before-Dhuhr cite of this hadith). See ${ADR}."\n`,
});

// ---------- Fix 4: Asr Farḍ Bukhari 759 → 760 (multi-source, only ref renumber) ----------
fixes.push({
  name: 'Fix 4a — Asr Farḍ amanahRationale Bukhari 759 → 760',
  before: `        amanahRationale: "Khabbab ibn al-Aratt in Sahih al-Bukhari 759 testifies that the Prophet ${PBUH}'s recitation in Dhuhr and Asr was silent ${DASH} the same hadith grounding Dhuhr's fard applies here.",\n`,
  after:  `        amanahRationale: "Khabbab ibn al-Aratt in Sahih al-Bukhari 760 testifies that the Prophet ${PBUH}'s recitation in Dhuhr and Asr was silent ${DASH} the same hadith grounding Dhuhr's fard applies here.",\n`,
});

fixes.push({
  name: 'Fix 4b — Asr Farḍ source ref Bukhari 759 → 760',
  before: `            ref: 'Sahih al-Bukhari 759',\n`,
  after:  `            ref: 'Sahih al-Bukhari 760',\n`,
  // intentionally targets BOTH occurrences (Dhuhr farḍ line 119 and Asr farḍ line 190)
  all: true,
});

// ---------- Fix 5: Maghrib Farḍ (Bukhari 765, line ~232) ----------
fixes.push({
  name: 'Fix 5 — Maghrib Farḍ Bukhari 765 relevance downgrade',
  before:
    `            relevance: 'direct',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "Direct prophetic example of aloud recitation in Maghrib ${DASH} and of choosing a mid-length surah rather than the shortest available."\n`,
  after:
    `            relevance: 'contextual',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "Prophetic example of reciting Surat at-Tur aloud in Maghrib. The matn names the surah choice and the aloud quality of recitation but does not name the broader operative ruling that Maghrib's first two rakʿat are aloud and the third silent ${DASH} that ruling is mutawatir from the wider sunnah corpus, hence contextual rather than direct.",\n` +
    `            ratNote: "Relevance downgraded direct ${DASH}> contextual on 2026-05-03 per the launch-readiness review. The cited matn names a single instance (Surat at-Tur in Maghrib) rather than the operative aloud/silent ruling itself. See ${ADR}."\n`,
});

// ---------- Fix 7: Isha Sunnah-before (Bukhari 627, line ~293) ----------
fixes.push({
  name: 'Fix 7 — Isha Sunnah-before Bukhari 627 relevance downgrade + extend ratNote',
  before:
    `            relevance: "direct",\n` +
    `            provenanceTier: "Bayyinah",\n` +
    `            hadithGrade: "Sahih (agreed upon — Bukhari and Muslim)",\n` +
    `            rationale: "The canonical anchor for any optional pre-fard nafl. Establishes that praying between the adhan and iqama for any salah — including Isha — is a meritorious sunnah open to whoever wishes; grounds the optional 4 rakʿat before Isha as a non-muʾakkadah but prophetically encouraged practice.",\n` +
    `            ratNote: "Verified against sunnah.com 2026-04-26 — Bukhari 627 and Muslim 838 both confirmed (Muslim 838 = USC-MSA Book 4 Hadith 1822, same narration under older edition numbering). Earlier PDF references to Bukhari 597/600 reflect the same narration in pre-Fath edition numbering."\n`,
  after:
    `            relevance: "contextual",\n` +
    `            provenanceTier: "Bayyinah",\n` +
    `            hadithGrade: "Sahih (agreed upon — Bukhari and Muslim)",\n` +
    `            rationale: "The canonical anchor for any optional pre-fard nafl. Establishes that praying between the adhan and iqama for any salah — including Isha — is a meritorious sunnah open to whoever wishes; grounds the optional 4 rakʿat before Isha as a non-muʾakkadah but prophetically encouraged practice. Marked contextual rather than direct because the matn names the general adhan/iqama window, not the Isha-specific 4-rakʿat practice.",\n` +
    `            ratNote: "Verified against sunnah.com 2026-04-26 — Bukhari 627 and Muslim 838 both confirmed (Muslim 838 = USC-MSA Book 4 Hadith 1822, same narration under older edition numbering). Earlier PDF references to Bukhari 597/600 reflect the same narration in pre-Fath edition numbering. Relevance further downgraded direct —> contextual on 2026-05-03 per the launch-readiness review — the matn names the general window, not the Isha-specific count. See ${ADR}."\n`,
});

// ---------- Fix 8: Isha Farḍ (Bukhari 657, line ~315) ----------
fixes.push({
  name: 'Fix 8 — Isha Farḍ Bukhari 657 relevance downgrade',
  before:
    `            relevance: 'direct',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "Prophetic diagnostic: Isha's congregation is one of two live tests of sincerity ${DASH} raising its covenantal weight above ordinary fard."\n`,
  after:
    `            relevance: 'contextual',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "Prophetic diagnostic on the covenantal weight of Isha (and Fajr) congregational attendance. The matn names the diagnostic, not the four-rakʿah aloud/silent structural ruling itself ${DASH} which is mutawatir from the wider sunnah corpus. Hence contextual: same topic (Isha fard), by inference rather than naming the operative ruling.",\n` +
    `            ratNote: "Relevance downgraded direct ${DASH}> contextual on 2026-05-03 per the launch-readiness review. The cited matn anchors Isha's covenantal weight, not its operative recitation/rakʿah structure. See ${ADR}."\n`,
});

// ---------- Fix 9: Isha Sunnah-after (Muslim 728a, line ~339) ----------
fixes.push({
  name: 'Fix 9 — Isha Sunnah-after Muslim 728a relevance downgrade',
  before:
    `            relevance: 'direct',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "The two rakʿat after Isha sit inside the twelve-rakʿat rawātib promise ${DASH} direct textual basis for their muʾakkadah status."\n`,
  after:
    `            relevance: 'contextual',\n` +
    `            provenanceTier: 'Bayyinah',\n` +
    `            hadithGrade: 'Sahih',\n` +
    `            rationale: "The two rakʿat after Isha sit inside the twelve-rakʿat rawātib promise. The matn names the count (12 rakʿat = a house in Paradise) but does not enumerate the after-Isha 2-rakʿah specifically; the inclusion is by inference from the broader rawātib corpus, hence contextual.",\n` +
    `            ratNote: "Relevance downgraded direct ${DASH}> contextual on 2026-05-03 per the launch-readiness review (same reasoning as the other Muslim 728a cites in this file). See ${ADR}."\n`,
});

// ---------- Apply ----------
let applied = 0;
let skipped = 0;
for (const fix of fixes) {
  if (!src.includes(fix.before)) {
    if (src.includes(fix.after)) {
      console.log(`SKIP (already applied) — ${fix.name}`);
      skipped++;
      continue;
    }
    console.error(`FAIL — ${fix.name}: before-block not found`);
    process.exit(1);
  }
  if (fix.all) {
    src = src.split(fix.before).join(fix.after);
  } else {
    const first = src.indexOf(fix.before);
    const second = src.indexOf(fix.before, first + 1);
    if (second !== -1) {
      console.error(`FAIL — ${fix.name}: before-block matches multiple times (need 'all: true' or more context)`);
      process.exit(1);
    }
    src = src.replace(fix.before, fix.after);
  }
  console.log(`OK   — ${fix.name}`);
  applied++;
}

if (src === original) {
  console.log(`No changes (all ${skipped} fixes already applied).`);
} else {
  fs.writeFileSync(FILE, src);
  console.log(`Wrote ${FILE}: ${applied} applied, ${skipped} skipped.`);
}
