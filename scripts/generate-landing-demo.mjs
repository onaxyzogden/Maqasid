#!/usr/bin/env node
/**
 * generate-landing-demo.mjs
 * ----------------------------------------------------------------------------
 * Source-of-truth generator for the Orientation demo deck on the landing page
 * (src/data/generated/landing-demo-deck.js).
 *
 *   node scripts/generate-landing-demo.mjs           # write the deck
 *   node scripts/generate-landing-demo.mjs --check   # exit 1 if out of date
 *
 * The `--check` mode is a fail-on-drift ratchet wired into `npm run lint`.
 *
 * Why this exists: the demo card used to be hand-written, and it drifted into
 * fiction -- it showed a task ("Call one relative you haven't spoken to this
 * month.") that appears nowhere in src/data/, under a ladder segment that is
 * not a board node, wearing a T2 badge for a subtask whose real sources are
 * Bayyinah (T1). On a page whose entire pitch is that every task carries its
 * evidence, that is the worst possible place for invented copy.
 *
 * Why generate rather than hand-copy: Landing.jsx must never import the seed
 * files. Built chunk sizes make that non-negotiable -- SubtaskSources 1,837 kB,
 * seed-ummah 1,452 kB, seed-faith 730 kB. This script reads them in Node at
 * build time and emits ~650 bytes per card, so the landing bundle grows by a
 * few kB and nothing else. The multi-KB `description` prose and the `arabic`
 * field are dropped: the demo cites, it does not recite.
 *
 * Selection is pinned by SUBSTRING, never by index. Reordering a seed file must
 * not silently swap the demo out for a different task -- a pick that matches
 * zero or more than one entry throws.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { ssrLoad as ssrLoadModule, closeSsr } from './lib/ssr-load.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');
const OUT_PATH = resolve(REPO, 'src/data/generated/landing-demo-deck.js');

const ssrLoad = (rootRelPath) => ssrLoadModule(rootRelPath, REPO);

// ---- the deck -------------------------------------------------------------
// One Core subtask per objective, in MAQASID_CORE_PILLARS order. `moduleId` is
// the canonical submodule id (getSubmoduleLabel resolves the display label);
// note Environment's board keys are `environment_*` while its module ids are
// `env-*`, and Faith's labels come from FIVE_PILLARS rather than MODULES -- so
// the id cannot be derived from the board key and is named explicitly here.
//
// Picks are curated for citation quality as well as subject: some seed entries
// carry an editorial sentence appended inside the `translation` field (e.g.
// Sahih Muslim 780 in family_home_core, Sahih al-Bukhari 6014 as cited in the
// `Identify every household...` subtask). Those are pre-existing seed smells and
// this script must NOT clean them up -- rewriting a translation would be
// authoring text the sources do not say. The remedy is curation: pin a subtask
// whose sources quote cleanly. Every pick below is Bayyinah + direct, so all
// seven cards render T1.
const PICKS = [
  {
    pillarId: 'faith',
    seed: 'faith',
    boardKey: 'faith_salah_core',
    moduleId: 'faith-salah',
    projectMatch: 'Close the morning by praying Dhuhr at its first time',
    subtaskMatch: 'Pause work the moment Dhuhr enters',
  },
  {
    pillarId: 'health',
    seed: 'health',
    boardKey: 'health_physical_core',
    moduleId: 'health-physical',
    projectMatch: 'Begin a daily walk after Fajr or Asr',
    subtaskMatch: 'Choose a safe and pleasant walking route',
  },
  {
    pillarId: 'intellect',
    seed: 'intellect',
    boardKey: 'intellect_learning_core',
    moduleId: 'intellect-learning',
    projectMatch: 'Attain functional literacy in Arabic script',
    subtaskMatch: 'Learn the 28 Arabic letters and their forms',
  },
  {
    pillarId: 'family',
    seed: 'family',
    boardKey: 'family_kinship_core',
    moduleId: 'family-kinship',
    projectMatch: 'Identify any severed family ties',
    subtaskMatch: 'Distinguish between genuine estrangement and simple neglect',
  },
  {
    pillarId: 'wealth',
    seed: 'wealth',
    boardKey: 'wealth_financial_core',
    moduleId: 'wealth-financial',
    projectMatch: 'Close all interest-bearing (riba) accounts',
    subtaskMatch: 'List every bank account, credit card, and financial product',
  },
  {
    pillarId: 'environment',
    seed: 'environment',
    boardKey: 'environment_resource_core',
    moduleId: 'env-resource',
    projectMatch: 'Audit household water usage',
    subtaskMatch: 'Inspect all taps, toilets, and hose connections for leaks',
  },
  {
    pillarId: 'ummah',
    seed: 'ummah',
    boardKey: 'ummah_neighbors_core',
    moduleId: 'neighbors',
    projectMatch: "Learn every immediate neighbor's name",
    subtaskMatch: 'Introduce yourself to any neighbor you have not yet spoken to',
  },
];

// Every citation field the card renders. `arabic` and `rationale` are dropped
// on purpose; `description` (multi-KB of prose per subtask) is what makes the
// seed files megabytes and must never reach the landing bundle.
const SOURCE_FIELDS = ['kind', 'ref', 'translation', 'relevance', 'provenanceTier', 'hadithGrade'];

// ---- loading --------------------------------------------------------------
// The seed files, modules.js and subtask-grounding.js are plain ESM with no
// Vite-only resolution, so they load under a bare dynamic import -- far cheaper
// than routing 5.8 MB of seed data through the SSR loader. Only maqasid.js
// needs Vite (it uses extensionless relative imports).
async function loadSeed(name) {
  const href = pathToFileURL(resolve(REPO, `src/data/seed-tasks/${name}-seed-tasks.js`)).href;
  const mod = await import(href);
  const boards = Object.values(mod)[0];
  if (!boards || typeof boards !== 'object') {
    throw new Error(`no seed board map exported from ${name}-seed-tasks.js`);
  }
  return boards;
}

async function loadLocal(relPath) {
  return import(pathToFileURL(resolve(REPO, relPath)).href);
}

// ---- pinned lookup --------------------------------------------------------
function only(list, needle, what, where) {
  const hits = list.filter((e) => typeof e?.title === 'string' && e.title.includes(needle));
  if (hits.length === 0) {
    throw new Error(
      `${where}: no ${what} title contains "${needle}". ` +
        'The seed data changed -- repin PICKS in scripts/generate-landing-demo.mjs.',
    );
  }
  if (hits.length > 1) {
    throw new Error(
      `${where}: ${hits.length} ${what} titles contain "${needle}" -- the pin is ambiguous. ` +
        'Narrow it in scripts/generate-landing-demo.mjs.',
    );
  }
  return hits[0];
}

function buildCard(pick, boards, getSubmoduleLabel, deriveSubtaskTier) {
  const where = pick.boardKey;
  const projects = boards[pick.boardKey];
  if (!Array.isArray(projects)) {
    throw new Error(`${where}: board key not found in ${pick.seed}-seed-tasks.js`);
  }

  const project = only(projects, pick.projectMatch, 'project', where);
  const subtask = only(project.subtasks || [], pick.subtaskMatch, 'subtask', where);

  const sources = (subtask.sources || []).map((s) => {
    const out = {};
    for (const f of SOURCE_FIELDS) {
      if (s[f] !== undefined && s[f] !== null && s[f] !== '') out[f] = s[f];
    }
    for (const required of ['ref', 'translation', 'relevance', 'provenanceTier']) {
      if (!out[required]) {
        throw new Error(`${where}: source "${s.ref || '(no ref)'}" is missing ${required}`);
      }
    }
    return out;
  });
  if (sources.length === 0) {
    throw new Error(`${where}: the pinned subtask has no sources -- it cannot carry the demo`);
  }

  const tierId = deriveSubtaskTier(subtask);
  if (!tierId) throw new Error(`${where}: could not derive an Amanah tier for the pinned subtask`);

  const moduleLabel = getSubmoduleLabel(pick.moduleId, pick.pillarId);
  if (!moduleLabel) throw new Error(`${where}: no display label for module id "${pick.moduleId}"`);

  return {
    pillarId: pick.pillarId,
    moduleLabel,
    level: 'Core',
    project: project.title,
    subtask: subtask.title,
    tierId,
    sources,
  };
}

// ---- emit -----------------------------------------------------------------
function render(cards) {
  return [
    '// GENERATED FILE -- do not edit by hand.',
    '// Run `npm run generate:landing-demo` to regenerate; `npm run lint` fails if',
    '// this drifts from the seed data. Source: scripts/generate-landing-demo.mjs.',
    '//',
    '// One Core subtask per objective, copied byte-for-byte out of',
    '// src/data/seed-tasks/. This exists so src/pages/Landing.jsx can show real,',
    '// cited tasks without importing the multi-megabyte seed chunks.',
    '',
    `export const LANDING_DEMO_DECK = ${JSON.stringify(cards, null, 2)};`,
    '',
  ].join('\n');
}

// Compare EOL-insensitively: git may check this file out with CRLF on Windows,
// and --check must not fail on a line-ending difference it did not cause.
const normalize = (s) => s.replace(/\r\n/g, '\n');

// ---- main -----------------------------------------------------------------
async function main() {
  const check = process.argv.includes('--check');
  try {
    const [{ getSubmoduleLabel, MAQASID_CORE_PILLARS }, { deriveSubtaskTier }] = await Promise.all([
      ssrLoad('/src/data/maqasid.js'),
      loadLocal('src/utils/subtask-grounding.js'),
    ]);

    // One card per top-level objective, in pillar order -- the deck is the hero's
    // "MIOS names seven" made concrete, so a missing pillar is a bug.
    const pillarIds = MAQASID_CORE_PILLARS.slice(0, 7).map((p) => p.id);
    const pickIds = PICKS.map((p) => p.pillarId);
    if (pillarIds.join(',') !== pickIds.join(',')) {
      throw new Error(
        `PICKS must cover the seven core objectives in order.\n  expected: ${pillarIds.join(', ')}\n  got:      ${pickIds.join(', ')}`,
      );
    }

    const seedCache = new Map();
    const cards = [];
    for (const pick of PICKS) {
      if (!seedCache.has(pick.seed)) seedCache.set(pick.seed, await loadSeed(pick.seed));
      cards.push(buildCard(pick, seedCache.get(pick.seed), getSubmoduleLabel, deriveSubtaskTier));
    }

    const next = render(cards);
    const current = await readFile(OUT_PATH, 'utf8').catch(() => null);

    if (check) {
      if (current === null || normalize(current) !== normalize(next)) {
        console.error(
          'generate-landing-demo --check: the demo deck is out of date. ' +
            'Run: npm run generate:landing-demo',
        );
        process.exitCode = 1;
        return;
      }
      console.log(`generate-landing-demo --check: up to date (${cards.length} cards)`);
      return;
    }

    if (current !== null && normalize(current) === normalize(next)) {
      console.log(`generate-landing-demo: no change (${cards.length} cards)`);
      return;
    }
    await mkdir(dirname(OUT_PATH), { recursive: true });
    await writeFile(OUT_PATH, next);
    console.log(`generate-landing-demo: wrote ${cards.length} cards`);
  } finally {
    await closeSsr();
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
