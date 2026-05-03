// Extract every seeded subtask across the Seven Maqasid pillars into
// per-pillar Markdown matrices at stages/subtask-matrix-<pillar>.md.
//
// Columns: Module | Submodule | Level | Task Name | Subtask Detail | Subtask Source(s) Content

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const PILLARS = [
  { id: 'faith',       label: 'Faith',       file: 'faith-seed-tasks.js',       exportName: 'FAITH_SEED_TASKS' },
  { id: 'health',        label: 'Health',        file: 'health-seed-tasks.js',        exportName: 'HEALTH_SEED_TASKS' },
  { id: 'intellect',   label: 'Intellect',   file: 'intellect-seed-tasks.js',   exportName: 'INTELLECT_SEED_TASKS' },
  { id: 'family',      label: 'Family',      file: 'family-seed-tasks.js',      exportName: 'FAMILY_SEED_TASKS' },
  { id: 'wealth',      label: 'Wealth',      file: 'wealth-seed-tasks.js',      exportName: 'WEALTH_SEED_TASKS' },
  { id: 'environment', label: 'Environment', file: 'environment-seed-tasks.js', exportName: 'ENVIRONMENT_SEED_TASKS' },
  { id: 'ummah',       label: 'Ummah',       file: 'ummah-seed-tasks.js',       exportName: 'UMMAH_SEED_TASKS' },
  { id: 'moontrance',  label: 'Moontrance',  file: 'moontrance-seed-tasks.js',  exportName: 'MOONTRANCE_SEED_TASKS' },
];

const LEVEL_ORDER = ['core', 'growth', 'excellence'];
const LEVEL_LABEL = { core: 'Core', growth: 'Growth', excellence: 'Excellence' };

const KEY_RE = /^([a-z]+)_([a-z-]+)_(core|growth|excellence)$/;

// Make a string safe to drop inside a single GFM table cell.
function cell(value) {
  if (value == null || value === '') return '—';
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\r\n?/g, '\n')
    .replace(/\n/g, '<br>');
}

function compareKey(a, b, pillarSubModuleIds) {
  const ma = a.match(KEY_RE);
  const mb = b.match(KEY_RE);
  if (!ma || !mb) return a.localeCompare(b);
  // Submodule in the key is the part AFTER the pillar prefix, so we have to
  // reconstruct the canonical submodule id to align with pillar.subModuleIds.
  const subA = `${ma[1]}-${ma[2]}`;
  const subB = `${mb[1]}-${mb[2]}`;
  const idxA = pillarSubModuleIds.indexOf(subA);
  const idxB = pillarSubModuleIds.indexOf(subB);
  const ra = idxA === -1 ? Number.MAX_SAFE_INTEGER : idxA;
  const rb = idxB === -1 ? Number.MAX_SAFE_INTEGER : idxB;
  if (ra !== rb) return ra - rb;
  return LEVEL_ORDER.indexOf(ma[3]) - LEVEL_ORDER.indexOf(mb[3]);
}

async function loadPillar(pillar) {
  const url = pathToFileURL(resolve(ROOT, 'src/data/seed-tasks', pillar.file)).href;
  const mod = await import(url);
  const data = mod[pillar.exportName];
  if (!data || typeof data !== 'object') {
    throw new Error(`Missing export ${pillar.exportName} from ${pillar.file}`);
  }
  return data;
}

async function loadMaqasidPillars() {
  const url = pathToFileURL(resolve(ROOT, 'src/data/maqasid.js')).href;
  const mod = await import(url);
  return mod.MAQASID_PILLARS;
}

function buildRows(pillar, dict, pillarRegistry) {
  const registry = pillarRegistry.find((p) => p.id === pillar.id);
  const subOrder = registry ? registry.subModuleIds : [];
  const keys = Object.keys(dict).sort((a, b) => compareKey(a, b, subOrder));
  const rows = [];

  for (const key of keys) {
    const m = key.match(KEY_RE);
    if (!m) {
      console.warn(`  skip unparseable key: ${key}`);
      continue;
    }
    const [, keyPillar, submoduleTail, level] = m;
    if (keyPillar !== pillar.id) {
      console.warn(`  skip foreign pillar key: ${key}`);
      continue;
    }
    const submoduleId = submoduleTail;
    const levelLabel = LEVEL_LABEL[level];
    const tasks = dict[key];
    if (!Array.isArray(tasks)) continue;

    for (const task of tasks) {
      const subtasks = Array.isArray(task.subtasks) ? task.subtasks : [];
      for (const sub of subtasks) {
        const detail = [sub.title, sub.description].filter(Boolean).join('\n\n');
        rows.push({
          module: pillar.label,
          submodule: submoduleId,
          level: levelLabel,
          taskName: task.title ?? '',
          detail,
          sources: sub.sources ?? '',
        });
      }
    }
  }
  return rows;
}

function renderMarkdown(pillar, rows) {
  const header = [
    `# Subtask Matrix — ${pillar.label}`,
    '',
    `Generated from \`src/data/seed-tasks/${pillar.file}\`. One row per subtask.`,
    '',
    `Total subtasks: **${rows.length}**`,
    '',
    '| Module | Submodule | Level | Task Name | Subtask Detail | Subtask Source(s) Content |',
    '|---|---|---|---|---|---|',
  ].join('\n');

  const body = rows
    .map((r) => `| ${cell(r.module)} | ${cell(r.submodule)} | ${cell(r.level)} | ${cell(r.taskName)} | ${cell(r.detail)} | ${cell(r.sources)} |`)
    .join('\n');

  return `${header}\n${body}\n`;
}

async function main() {
  const outDir = resolve(ROOT, 'stages');
  await mkdir(outDir, { recursive: true });

  const pillarRegistry = await loadMaqasidPillars();

  let grandTotal = 0;
  for (const pillar of PILLARS) {
    const dict = await loadPillar(pillar);
    const rows = buildRows(pillar, dict, pillarRegistry);
    const md = renderMarkdown(pillar, rows);
    const outPath = resolve(outDir, `subtask-matrix-${pillar.id}.md`);
    await writeFile(outPath, md, 'utf8');
    const withSources = rows.filter((r) => r.sources && r.sources.trim()).length;
    console.log(`${pillar.label.padEnd(12)} → ${rows.length} subtasks (${withSources} with sources) → ${outPath}`);
    grandTotal += rows.length;
  }
  console.log(`\nTotal subtasks across all pillars: ${grandTotal}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
