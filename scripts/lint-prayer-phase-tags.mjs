// Lint that every parent task in faith_salah_* projects declares a prayer-phase tag.
//
// Tasks surfaced by the PropheticPath prayer/transition nodes (Isha, Tahajjud,
// Fajr, Morning, Dhuhr, Asr, Maghrib) route via tag (prayer-phase:before|after)
// or fall through to the Main bucket as the complement. Adding an explicit
// `prayer-phase:main` or `prayer-phase:none` declaration on every parent task
// makes the routing intent self-documenting and prevents silent leaks when
// titles drift.
//
// Usage:
//   node scripts/lint-prayer-phase-tags.mjs
//   node scripts/lint-prayer-phase-tags.mjs --json
//
// Exit codes: 0 = clean, 1 = violations found.

import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const VALID_PHASES = new Set([
  'prayer-phase:before',
  'prayer-phase:main',
  'prayer-phase:after',
  'prayer-phase:none',
]);

const PROJECT_PREFIX = 'faith_salah_';

function parseArgs(argv) {
  const out = { json: false };
  for (const arg of argv.slice(2)) {
    if (arg === '--json') out.json = true;
  }
  return out;
}

function findPhaseTag(tags) {
  if (!Array.isArray(tags)) return null;
  for (const t of tags) {
    if (typeof t !== 'string') continue;
    if (t.startsWith('prayer-phase:')) return t;
  }
  return null;
}

async function main() {
  const args = parseArgs(process.argv);
  const url = pathToFileURL(resolve(ROOT, 'src/data/seed-tasks/faith-seed-tasks.js')).href;
  const mod = await import(url);
  const seeds = mod.FAITH_SEED_TASKS;

  const violations = [];
  const projectIds = Object.keys(seeds).filter((k) => k.startsWith(PROJECT_PREFIX));

  for (const projectId of projectIds) {
    const tasks = seeds[projectId] || [];
    for (const task of tasks) {
      const phaseTag = findPhaseTag(task.tags);
      if (!phaseTag) {
        violations.push({
          projectId,
          title: task.title,
          issue: 'missing-phase-tag',
          tags: task.tags || [],
        });
      } else if (!VALID_PHASES.has(phaseTag)) {
        violations.push({
          projectId,
          title: task.title,
          issue: 'invalid-phase-tag',
          phaseTag,
          allowed: [...VALID_PHASES],
        });
      }
    }
  }

  if (args.json) {
    process.stdout.write(JSON.stringify({
      checkedProjects: projectIds,
      checkedTaskCount: projectIds.reduce((n, p) => n + (seeds[p]?.length || 0), 0),
      violations,
    }, null, 2) + '\n');
  } else {
    const total = projectIds.reduce((n, p) => n + (seeds[p]?.length || 0), 0);
    if (violations.length === 0) {
      process.stdout.write(
        `OK — ${total} parent tasks across ${projectIds.length} faith_salah_* projects all carry a prayer-phase:* tag.\n`
      );
    } else {
      process.stdout.write(
        `FAIL — ${violations.length} of ${total} parent tasks missing or have invalid prayer-phase:* tag:\n\n`
      );
      for (const v of violations) {
        if (v.issue === 'missing-phase-tag') {
          process.stdout.write(`  [${v.projectId}] ${v.title}\n    tags: ${JSON.stringify(v.tags)}\n\n`);
        } else {
          process.stdout.write(`  [${v.projectId}] ${v.title}\n    invalid: ${v.phaseTag} (allowed: ${v.allowed.join(', ')})\n\n`);
        }
      }
      process.stdout.write(
        `Fix: add one of "prayer-phase:before", "prayer-phase:main", "prayer-phase:after", or "prayer-phase:none" to the task tags array.\n`
      );
    }
  }

  process.exit(violations.length === 0 ? 0 : 1);
}

main().catch((err) => {
  process.stderr.write(`lint-prayer-phase-tags failed: ${err.stack || err.message}\n`);
  process.exit(2);
});
