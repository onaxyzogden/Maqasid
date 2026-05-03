#!/usr/bin/env node
// One-shot extraction: split Moontrance entries out of ummah-seed-tasks.js
// into moontrance-seed-tasks.js with renamed board IDs.
//
// Discard after running.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_DIR = path.resolve(__dirname, '..', 'src', 'data', 'seed-tasks');
const UMMAH_PATH = path.join(SEED_DIR, 'ummah-seed-tasks.js');
const MOONTRANCE_PATH = path.join(SEED_DIR, 'moontrance-seed-tasks.js');

// 1-based, inclusive bounds (verified manually against the live file).
const SECTION_FIRST_LINE = 12047; // blank line preceding the comment
const SECTION_LAST_LINE = 20778;  // closing `],` of moontrance-residency excellence

const KEY_RENAMES = [
  ['"ummah_moontrance-land_core":',         'moontrance_land_core:'],
  ['"ummah_moontrance-land_growth":',       'moontrance_land_growth:'],
  ['"ummah_moontrance-land_excellence":',   'moontrance_land_excellence:'],
  ['"ummah_moontrance-seasonal_core":',     'moontrance_seasonal_core:'],
  ['"ummah_moontrance-seasonal_growth":',   'moontrance_seasonal_growth:'],
  ['"ummah_moontrance-seasonal_excellence":', 'moontrance_seasonal_excellence:'],
  ['"ummah_moontrance-residency_core":',    'moontrance_residency_core:'],
  ['"ummah_moontrance-residency_growth":',  'moontrance_residency_growth:'],
  ['"ummah_moontrance-residency_excellence":', 'moontrance_residency_excellence:'],
];

const ummahRaw = fs.readFileSync(UMMAH_PATH, 'utf8');
const lines = ummahRaw.split(/\r?\n/);

// Extract section content (lines are 0-indexed in array)
const sectionLines = lines.slice(SECTION_FIRST_LINE - 1, SECTION_LAST_LINE);
let sectionText = sectionLines.join('\n');
for (const [from, to] of KEY_RENAMES) {
  if (!sectionText.includes(from)) {
    throw new Error(`Expected key not found in section: ${from}`);
  }
  sectionText = sectionText.replace(from, to);
}

// Build new moontrance file.
const moontranceFile = `// Seed tasks for Moontrance pillar submodules (Land · Seasonal · Residency).
// Each submodule has tasks across CORE, GROWTH, and EXCELLENCE boards.
// Tasks are placed in the "To Do" column by default.
//
// Board IDs are \`moontrance_<submodule>_<level>\` (renamed 2026-05-03 from
// \`ummah_moontrance-<submodule>_<level>\` as part of the Moontrance hard-split
// from Ummah). The \`moduleId\` field on each board entry in project-store.js
// remains \`moontrance-<submodule>\` — the CeremonyGuard moduleId is unchanged.
// Existing-user localStorage is migrated by \`migrateMoontranceBoardIds_v1\`.

export const MOONTRANCE_SEED_TASKS = {
${sectionText.replace(/\n$/, '')}

};
`;

fs.writeFileSync(MOONTRANCE_PATH, moontranceFile, 'utf8');

// Strip section from ummah file.
const beforeSection = lines.slice(0, SECTION_FIRST_LINE - 1); // up to and excluding line 12047
const afterSection = lines.slice(SECTION_LAST_LINE);          // from line 20779 onward
const newUmmahLines = [...beforeSection, ...afterSection];
const newUmmahText = newUmmahLines.join('\n');
fs.writeFileSync(UMMAH_PATH, newUmmahText, 'utf8');

console.log('Wrote', MOONTRANCE_PATH);
console.log('  size:', fs.statSync(MOONTRANCE_PATH).size, 'bytes');
console.log('Updated', UMMAH_PATH);
console.log('  new line count:', newUmmahLines.length);
