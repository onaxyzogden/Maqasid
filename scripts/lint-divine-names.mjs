#!/usr/bin/env node
// Ratchet for the Divine Names registry, mirroring lint-grounding.mjs.
//
// The registry (src/data/islamic/divine-names.js) is the single canonical
// definition of each Name. Module data holds only `{ nameKey, application }`.
// This gate fails when that contract breaks — an unresolved key, an entry with
// no attestation, a gloss or application that has drifted long again, or a
// literal name/body creeping back into module data.
//
// Run: node scripts/lint-divine-names.mjs
// The vitest equivalent is src/data/islamic/__tests__/divine-names.test.js;
// this exists so `npm run lint` catches the same regressions without vitest.

import { registerHooks } from 'node:module';

// App source is written for Vite, which resolves extensionless relative imports.
// Bare Node does not, so teach the resolver the same trick before loading it.
registerHooks({
  resolve(specifier, context, next) {
    try {
      return next(specifier, context);
    } catch (err) {
      if (err?.code === 'ERR_MODULE_NOT_FOUND' && specifier.startsWith('.')) {
        return next(`${specifier}.js`, context);
      }
      throw err;
    }
  },
});

const { DIVINE_NAMES, NINETY_NINE_COUNT } = await import('../src/data/islamic/divine-names.js');
const { MODULE_ATTRS } = await import('../src/data/islamic/islamic-data.js');
const { BBOS_STAGE_ISLAMIC } = await import('../src/data/bbos/bbos-stage-islamic.js');

const VALID_KINDS = new Set(['quran', 'hadith']);
const VALID_TIERS = new Set(['Bayyinah', 'Qarina', 'Niyyah']);
const VALID_RELEVANCE = new Set(['direct', 'contextual', 'thematic']);

const GLOSS_MAX = 130;
const APPLICATION_MAX = 280;

const errors = [];
const fail = (msg) => errors.push(msg);

// --- registry -------------------------------------------------------------
const seenArabic = new Map();
const seenName = new Map();

for (const [key, entry] of Object.entries(DIVINE_NAMES)) {
  if (!/^[a-z0-9-]+$/.test(key)) fail(`${key}: key is not an ascii slug`);

  for (const field of ['name', 'name_ar', 'title', 'gloss']) {
    if (!entry[field] || typeof entry[field] !== 'string') fail(`${key}: missing ${field}`);
  }
  if (entry.gloss && entry.gloss.length > GLOSS_MAX) {
    fail(`${key}: gloss is ${entry.gloss.length}ch (max ${GLOSS_MAX})`);
  }
  if (typeof entry.inNinetyNine !== 'boolean') fail(`${key}: inNinetyNine must be a boolean`);

  const s = entry.source;
  if (!s) {
    fail(`${key}: no source — every Name must carry its Quran/hadith attestation`);
  } else {
    if (!VALID_KINDS.has(s.kind)) fail(`${key}: source.kind "${s.kind}" not in ${[...VALID_KINDS]}`);
    if (!VALID_RELEVANCE.has(s.relevance)) fail(`${key}: source.relevance "${s.relevance}" invalid`);
    if (!VALID_TIERS.has(s.provenanceTier)) {
      fail(`${key}: source.provenanceTier "${s.provenanceTier}" invalid`);
    }
    for (const field of ['ref', 'arabic', 'translation', 'rationale']) {
      if (!s[field]) fail(`${key}: source.${field} is empty`);
    }
  }

  if (seenArabic.has(entry.name_ar)) {
    fail(`${key}: name_ar collides with ${seenArabic.get(entry.name_ar)}`);
  }
  if (seenName.has(entry.name)) fail(`${key}: name collides with ${seenName.get(entry.name)}`);
  seenArabic.set(entry.name_ar, key);
  seenName.set(entry.name, key);
}

if (NINETY_NINE_COUNT !== 99) {
  fail(`registry marks ${NINETY_NINE_COUNT} names as inNinetyNine — expected 99`);
}

// --- module data ----------------------------------------------------------
let attrCount = 0;

for (const [label, table] of [['MODULE_ATTRS', MODULE_ATTRS], ['BBOS_STAGE_ISLAMIC', BBOS_STAGE_ISLAMIC]]) {
  for (const [id, data] of Object.entries(table)) {
    for (const attr of data.attrs || []) {
      attrCount++;
      const where = `${label}.${id}/${attr.nameKey || '(no key)'}`;

      if (!attr.nameKey) {
        fail(`${where}: attribute has no nameKey`);
        continue;
      }
      if (!DIVINE_NAMES[attr.nameKey]) {
        fail(`${where}: nameKey does not resolve in the registry`);
      }
      if (!attr.application) fail(`${where}: no application paragraph`);
      else if (attr.application.length > APPLICATION_MAX) {
        fail(`${where}: application is ${attr.application.length}ch (max ${APPLICATION_MAX})`);
      }
      for (const owned of ['name', 'name_ar', 'title', 'gloss', 'body', 'source']) {
        if (attr[owned] !== undefined) {
          fail(`${where}: carries a literal "${owned}" — that field belongs to the registry`);
        }
      }
    }
  }
}

// --- report ---------------------------------------------------------------
if (errors.length) {
  console.error(`divine-names: ${errors.length} error(s)\n`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(
  `divine-names: OK — ${Object.keys(DIVINE_NAMES).length} names (${NINETY_NINE_COUNT} of the ninety-nine), ` +
    `${attrCount} module attributes, all attested.`,
);
