#!/usr/bin/env node
// Task/subtask ORDER audit — read-only. Writes a review report; never edits seeds.
//
// Triggered by the Duha node (2026-10-05): the stepper showed "Pray 2 rak'at of
// Duha at least 5 days this week" (Growth) BEFORE "Learn the time window for Duha
// prayer" (Excellence), because buildTasksForNode sorts its pool by level and the
// beginner content had been authored on the higher level. This script looks for
// the same family of defects everywhere, heuristically. Every hit is a candidate
// for human review, not a verdict.
//
// Checks
//   R1 learn-after-practice  a learn/understand/study step placed after a practice
//                            step on the same topic (within a task, along a board's
//                            seq chain, along a submodule's core→growth→excellence
//                            chain, and along each Prophetic Path node's pool)
//   R2 level-regression      a higher level asks for a smaller cadence/quantity than
//                            a lower level on the same topic (e.g. 3×/week at L3 vs
//                            5 days at L2)
//   R3 near-duplicate        task or subtask titles with high token overlap on
//                            different tasks of the same submodule
//   R4 node-ignores-seq      a node pool shows two tasks from the same board in an
//                            order that contradicts the board's curated `seq`
//   R5 node-fallback         a node's content matchers hit nothing, so the whole
//                            submodule scope is shown instead
//
// Usage: node scripts/audit-task-order.mjs [--out <path>] [--stdout]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SEED_DIR = path.join(ROOT, 'src/data/seed-tasks');

const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const OUT = outIdx !== -1
  ? path.resolve(args[outIdx + 1])
  : path.join(ROOT, 'stages/research-task-order-audit-draft.md');
const TO_STDOUT = args.includes('--stdout');

const PILLAR_SEEDS = [
  ['faith', 'FAITH_SEED_TASKS'],
  ['health', 'HEALTH_SEED_TASKS'],
  ['intellect', 'INTELLECT_SEED_TASKS'],
  ['family', 'FAMILY_SEED_TASKS'],
  ['wealth', 'WEALTH_SEED_TASKS'],
  ['environment', 'ENVIRONMENT_SEED_TASKS'],
  ['ummah', 'UMMAH_SEED_TASKS'],
];

const imp = (rel) => import(pathToFileURL(path.join(ROOT, rel)).href);

const boards = {}; // boardId -> { pillar, tasks }
for (const [pillar, exportName] of PILLAR_SEEDS) {
  const mod = await import(pathToFileURL(path.join(SEED_DIR, `${pillar}-seed-tasks.js`)).href);
  for (const [boardId, tasks] of Object.entries(mod[exportName] || {})) {
    boards[boardId] = { pillar, tasks };
  }
}
let prayerBoards = {};
try {
  const mod = await imp('src/data/seed-tasks/prayer-seed-tasks.js');
  prayerBoards = mod.PRAYER_SEED_TASKS || {};
} catch (e) {
  console.warn(`[audit-task-order] prayer boards skipped: ${e.message}`);
}
for (const [boardId, tasks] of Object.entries(prayerBoards)) {
  boards[boardId] = { pillar: 'prayer', tasks };
}

const { TOD_SUBMODULES, buildTasksForNode } = await imp('src/data/prophetic-path-submodules.js');
const PRAYER_NODE_IDS = new Set(['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'tahajjud']);

// ── helpers ────────────────────────────────────────────────────────────────

const LEVELS = ['core', 'growth', 'excellence'];
const LEVEL_NUM = { core: 1, growth: 2, excellence: 3 };
const levelOf = (boardId) => LEVELS.find((l) => boardId.endsWith(`_${l}`)) || null;
// faith_salah_growth -> faith-salah ; ummah_moontrance-land_core -> ummah-moontrance-land
const submoduleOf = (boardId) => {
  const parts = boardId.split('_');
  return parts.length >= 3 ? `${parts[0]}-${parts[1]}` : null;
};

// Board's curated chain: `seq` when present, else array order.
const ordered = (tasks) => tasks
  .map((t, i) => ({ t, i }))
  .sort((a, b) => ((a.t.seq ?? a.i) - (b.t.seq ?? b.i)) || (a.i - b.i))
  .map(({ t }) => t);

const STOP = new Set(`
a an the and or of to for in on at by with from into onto about as is are be your you yours
each every this that these those week weeks day days daily weekly month monthly times time once
least most more less per one two three four five six seven eight nine ten first last next new
learn learning understand understanding study studying memorise memorize know knowing familiarise
familiarize read research review practise practice perform make set build toward towards begin
start establish consistently regularly gradually increase it its their them they his her our we
all any some do does not no without over under after before during until within between how what
why when where who which goal plan habit routine consistent own using use per s t
hour hours minute minutes month months year years
`.split(/\s+/).filter(Boolean));

const norm = (s) => (s || '')
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/[ʿʾ'’`ʻʾ]/g, '')
  .toLowerCase();
const ALIAS = { prayer: 'pray', prayers: 'pray', praying: 'pray', prayed: 'pray' };
const stem = (w) => ALIAS[w] || w.replace(/(?:ing|ed|es|s)$/, '') || w;
const tokens = (s) => new Set(
  norm(s).split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w) && !/^\d+$/.test(w))
    .map(stem),
);
const overlap = (a, b) => { let n = 0; for (const x of a) if (b.has(x)) n++; return n; };
const jaccard = (a, b) => {
  if (!a.size || !b.size) return 0;
  const n = overlap(a, b);
  return n / (a.size + b.size - n);
};

const LEARN_RE = /^(?:learn|understand|study|memori[sz]e|know|familiari[sz]e|read up|research|identify the (?:time|ruling|conditions?)|discover)\b/i;
const PRACTICE_RE = /^(?:pray|perform|practi[cs]e|recite|fast|give|offer|observe|do|attend|complete|keep|sleep|eat|walk|wake|rise|make (?:wudu|du[ʿ'’]?a|dhikr)|say|sit|visit|pay|spend|donate|read (?:surah|the qur)|anchor|maintain|build toward|schedule|establish|make it a habit|seek|use|apply|implement|commit)\b/i;
const isLearn = (title) => LEARN_RE.test(norm(title).trim()) || LEARN_RE.test((title || '').trim());
const isPractice = (title) => !isLearn(title) && PRACTICE_RE.test((title || '').trim());

const WORDNUM = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twice: 2, once: 1 };
// Extract cadence/quantity claims: { unit, value }
function quantities(title) {
  const s = norm(title);
  const out = [];
  const re = /\b(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s*(?:\+\s*)?(days?|times?|nights?|rakat|rakahs?|raka|pages?|verses?|ayat|juz|minutes?|hours?)\b/g;
  let m;
  while ((m = re.exec(s))) {
    const value = /^\d+$/.test(m[1]) ? Number(m[1]) : WORDNUM[m[1]];
    let unit = m[2];
    if (/^day|^time|^night/.test(unit)) unit = 'per-week';
    else if (/^rak/.test(unit)) unit = 'rakat';
    else unit = unit.replace(/s$/, '');
    out.push({ unit, value });
  }
  if (/\b(?:daily|every day|each day)\b/.test(s)) out.push({ unit: 'per-week', value: 7 });
  return out;
}

const findings = [];
const add = (f) => findings.push(f);
const loc = (boardId, task, subIdx = null) => {
  const seq = task?.seq != null ? ` seq ${task.seq}` : '';
  const sub = subIdx != null ? ` · subtask ${subIdx + 1}` : '';
  return `\`${boardId}\`${seq}${sub}`;
};

// Steps flattened in display order for a chain of { boardId, task } entries.
const flatten = (chain) => chain.flatMap(({ boardId, task }, ti) =>
  (task.subtasks || []).map((st, si) => ({ boardId, task, ti, si, title: st.title, tok: tokens(st.title) })));

// R1 over a flattened step list. `scope` names the surface. `crossOnly` limits
// hits to pairs on different tasks (within-task pairs are reported separately).
function learnAfterPractice(steps, scope, { crossOnly = false, minOverlap = 1, extra = {} } = {}) {
  for (let j = 0; j < steps.length; j++) {
    const learn = steps[j];
    if (!isLearn(learn.title)) continue;
    let best = null;
    for (let i = 0; i < j; i++) {
      const p = steps[i];
      if (crossOnly && p.task === learn.task) continue;
      if (!isPractice(p.title)) continue;
      const n = overlap(p.tok, learn.tok);
      if (n >= minOverlap && (!best || n > best.n)) best = { p, n };
    }
    // Within a single task, a learning step after ANY practice step is still worth
    // a look even with no shared topic word — reported at low confidence.
    if (!best && !crossOnly) {
      const p = steps.slice(0, j).find((s) => s.task === learn.task && isPractice(s.title));
      if (p) best = { p, n: 0 };
    }
    if (!best) continue;
    add({
      rule: 'R1', scope,
      confidence: best.n >= 2 ? 'high' : best.n === 1 ? 'medium' : 'low',
      where: loc(learn.boardId, learn.task, learn.si),
      summary: `"${learn.title}" comes after "${best.p.title}" (${loc(best.p.boardId, best.p.task, best.p.si)})`,
      suggestion: 'Move the learning step ahead of the practice step it prepares for (or onto the earlier task/level).',
      ...extra,
    });
  }
}

// ── per-board checks ───────────────────────────────────────────────────────

const bySubmodule = {}; // submodule -> { core: boardId, ... }
for (const [boardId, { pillar, tasks }] of Object.entries(boards)) {
  const chain = ordered(tasks).map((task) => ({ boardId, task }));
  // R1 within a single task
  for (const { task } of chain) {
    const steps = flatten([{ boardId, task }]);
    learnAfterPractice(steps, 'within task', { extra: { pillar, board: boardId } });
  }
  // R1 along the board's seq chain (cross-task only; within-task already done)
  learnAfterPractice(flatten(chain), 'board chain', { crossOnly: true, minOverlap: 2, extra: { pillar, board: boardId } });

  const sub = submoduleOf(boardId);
  const lvl = levelOf(boardId);
  if (pillar !== 'prayer' && sub && lvl) {
    (bySubmodule[sub] ||= { pillar })[lvl] = boardId;
  }
}

// ── per-submodule (cross-level) checks ─────────────────────────────────────

for (const [sub, entry] of Object.entries(bySubmodule)) {
  const { pillar } = entry;
  const chain = LEVELS.filter((l) => entry[l])
    .flatMap((l) => ordered(boards[entry[l]].tasks).map((task) => ({ boardId: entry[l], task, level: l })));

  // R1 across levels: a learn step on a HIGHER level than a practice step on the same topic.
  const steps = chain.flatMap(({ boardId, task, level }) =>
    (task.subtasks || []).map((st, si) => ({ boardId, task, si, level, title: st.title, tok: tokens(st.title) })));
  for (const learn of steps) {
    if (!isLearn(learn.title)) continue;
    let best = null;
    for (const p of steps) {
      if (LEVEL_NUM[p.level] >= LEVEL_NUM[learn.level]) continue;
      if (!isPractice(p.title)) continue;
      const n = overlap(p.tok, learn.tok);
      if (n >= 2 && (!best || n > best.n)) best = { p, n };
    }
    if (best) {
      add({
        rule: 'R1', scope: 'across levels', pillar, board: learn.boardId,
        confidence: best.n >= 3 ? 'high' : 'medium',
        where: loc(learn.boardId, learn.task, learn.si),
        summary: `"${learn.title}" (${learn.level}) is a prerequisite-looking step placed above "${best.p.title}" (${best.p.level}, ${loc(best.p.boardId, best.p.task, best.p.si)})`,
        suggestion: 'Move the learning step down to the lower level, ahead of the practice step.',
      });
    }
  }

  // R2 level regression on cadence/quantity
  const qsteps = [
    ...chain.map(({ boardId, task, level }) => ({ boardId, task, si: null, level, title: task.title })),
    ...steps,
  ].map((s) => ({ ...s, tok: tokens(s.title), qs: quantities(s.title) })).filter((s) => s.qs.length);
  for (const hi of qsteps) {
    for (const lo of qsteps) {
      if (LEVEL_NUM[lo.level] >= LEVEL_NUM[hi.level]) continue;
      if (overlap(lo.tok, hi.tok) < 2) continue;
      for (const qh of hi.qs) {
        const ql = lo.qs.find((q) => q.unit === qh.unit);
        if (ql && qh.value < ql.value) {
          add({
            rule: 'R2', scope: 'across levels', pillar, board: hi.boardId,
            confidence: overlap(lo.tok, hi.tok) >= 3 ? 'high' : 'medium',
            where: loc(hi.boardId, hi.task, hi.si),
            summary: `"${hi.title}" (${hi.level}: ${qh.value} ${qh.unit}) asks for less than "${lo.title}" (${lo.level}: ${ql.value} ${ql.unit}, ${loc(lo.boardId, lo.task, lo.si)})`,
            suggestion: 'Raise the higher level\'s target, move the step down a level, or retire it.',
          });
        }
      }
    }
  }

  // R3 near-duplicates across different tasks in the submodule
  const items = [
    ...chain.map(({ boardId, task, level }) => ({ kind: 'task', boardId, task, si: null, level, title: task.title })),
    ...steps.map((s) => ({ kind: 'subtask', ...s })),
  ].map((s) => ({ ...s, tok: tokens(s.title) })).filter((s) => s.tok.size >= 3);
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const a = items[i];
      const b = items[j];
      if (a.kind !== b.kind || a.task === b.task) continue;
      const jac = jaccard(a.tok, b.tok);
      if (jac < 0.6) continue;
      add({
        rule: 'R3', scope: a.level === b.level ? 'same level' : 'across levels', pillar, board: b.boardId,
        confidence: jac >= 0.8 ? 'high' : 'medium',
        where: loc(b.boardId, b.task, b.si),
        summary: `${b.kind} "${b.title}" (${b.level}) ≈ "${a.title}" (${a.level}, ${loc(a.boardId, a.task, a.si)}) — overlap ${(jac * 100).toFixed(0)}%`,
        suggestion: 'Merge, differentiate the higher-level version, or drop one.',
      });
    }
  }
}

// ── Prophetic Path node pools ──────────────────────────────────────────────

const pillarBoardIds = Object.keys(boards).filter((b) => boards[b].pillar !== 'prayer');
const projects = pillarBoardIds
  .map((id) => ({ id, moduleId: submoduleOf(id), name: id }))
  .filter((p) => p.moduleId);
const tasksByProject = Object.fromEntries(pillarBoardIds.map((id) => [
  id,
  ordered(boards[id].tasks).map((t, i) => ({
    id: `${id}#${i}`, title: t.title, priority: t.priority || 'medium',
    tags: t.tags || [], subtasks: t.subtasks || [], seq: t.seq ?? i, seedOrder: t.seq ?? i, columnId: 'todo',
  })),
]));
const seqOf = new Map();
for (const id of pillarBoardIds) for (const t of tasksByProject[id]) seqOf.set(t.id, t.seq);

const nodeSummaries = [];
for (const [nodeId, entry] of Object.entries(TOD_SUBMODULES)) {
  if (PRAYER_NODE_IDS.has(nodeId)) continue; // prayer nodes show one board in seq order (covered above)
  const missing = (entry.submodules || []).filter((s) => !projects.some((p) => p.moduleId === s));
  const full = buildTasksForNode(nodeId, projects, tasksByProject, { limit: 1000, phase: null });
  const shown = full.slice(0, 20); // NodePhaseSlideUp passes limit: 20

  // R5 fallback: did the matchers hit anything at all?
  const scope = new Set(entry.submodules || []);
  const scoped = projects.filter((p) => scope.has(p.moduleId))
    .flatMap((p) => tasksByProject[p.id]);
  const matched = entry.matchers
    // Mirrors rowMatches in prophetic-path-submodules.js: titles against every
    // matcher, tags against `transition:` matchers only.
    ? scoped.filter((t) => entry.matchers.some((re) => re.test(t.title || ''))
      || (t.tags || []).some((g) => entry.matchers.some((re) => re.source.includes('transition:') && re.test(g))))
    : scoped;
  if (entry.matchers && matched.length === 0 && scoped.length > 0) {
    add({
      rule: 'R5', scope: 'node', pillar: 'prophetic-path', board: `node:${nodeId}`,
      confidence: 'high', where: `node \`${nodeId}\``,
      summary: `No task title matches the node's content matchers — the node falls back to all ${scoped.length} tasks in ${[...scope].join(', ')}.`,
      suggestion: 'Add matchers or tags for this node, or tag the intended tasks.',
    });
  }

  // R4 seq contradiction within the same board
  for (let i = 0; i < shown.length; i++) {
    for (let j = i + 1; j < shown.length; j++) {
      const a = shown[i];
      const b = shown[j];
      if (a.projectId !== b.projectId) continue;
      if (seqOf.get(a.id) > seqOf.get(b.id)) {
        add({
          rule: 'R4', scope: 'node', pillar: 'prophetic-path', board: `node:${nodeId}`,
          confidence: 'medium', where: `node \`${nodeId}\` · \`${a.projectId}\``,
          summary: `Shows "${a.title}" (seq ${seqOf.get(a.id)}) before "${b.title}" (seq ${seqOf.get(b.id)}) — priority sort overrides the curated chain.`,
          suggestion: 'Check buildTasksForNode: within a level it should follow each board\'s curated chain.',
        });
      }
    }
  }

  // R1 along the node's displayed chain (cross-task)
  const chain = shown.map((r) => ({ boardId: r.projectId, task: boards[r.projectId].tasks.find((t) => t.title === r.title) || r }));
  learnAfterPractice(flatten(chain), `node ${nodeId}`, { crossOnly: true, minOverlap: 2, extra: { pillar: 'prophetic-path', board: `node:${nodeId}` } });

  nodeSummaries.push({
    nodeId, total: full.length, shown: shown.length,
    fallback: entry.matchers ? matched.length === 0 : false,
    missing,
    lines: shown.map((r, i) => `${i + 1}. L${r._level} · \`${r.projectId}\` · ${r.title} (${r.priority})`),
  });
}

// ── report ─────────────────────────────────────────────────────────────────

// Dedupe identical summaries (the same pair can surface via several scopes).
const seen = new Set();
const unique = findings.filter((f) => {
  const k = `${f.rule}|${f.where}|${f.summary}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const RULE_NAMES = {
  R1: 'Learning step after practice',
  R2: 'Level regression (higher level asks for less)',
  R3: 'Near-duplicate across tasks',
  R4: 'Node order contradicts curated seq',
  R5: 'Node falls back to whole scope',
};
const CONF_RANK = { high: 0, medium: 1, low: 2 };
const count = (pred) => unique.filter(pred).length;
const today = new Date().toISOString().slice(0, 10);

const lines = [];
lines.push('---', 'phase: research', 'slug: task-order-audit', 'status: draft', 'amanah: neutral', `created: ${today}`, '---', '');
lines.push('# Research: task & subtask order audit', '');
lines.push('Generated by `node scripts/audit-task-order.mjs` (read-only). Heuristic — every row is a **candidate**');
lines.push('for review, not a verdict. Nothing here has been changed in the seed data.', '');
lines.push('Trigger: the Duha node showed "Pray 2 rak\'at of Duha at least 5 days this week" (Growth) before');
lines.push('"Learn the time window for Duha prayer" (Excellence). See `stages/implement-duha-restructure-review.md`.', '');
lines.push('## Summary', '');
lines.push('| Rule | Meaning | High | Medium | Low | Total |', '|---|---|---|---|---|---|');
for (const r of Object.keys(RULE_NAMES)) {
  lines.push(`| ${r} | ${RULE_NAMES[r]} | ${count((f) => f.rule === r && f.confidence === 'high')} | ${count((f) => f.rule === r && f.confidence === 'medium')} | ${count((f) => f.rule === r && f.confidence === 'low')} | ${count((f) => f.rule === r)} |`);
}
lines.push('', `Boards scanned: ${Object.keys(boards).length} (${pillarBoardIds.length} pillar, ${Object.keys(prayerBoards).length} prayer). Non-prayer Prophetic Path nodes: ${nodeSummaries.length}.`, '');

lines.push('## Structural findings', '');
lines.push('1. **Node pools follow each board\'s curated chain** (since 2026-10-06). `buildTasksForNode`');
lines.push('   (`src/data/prophetic-path-submodules.js`) sorts by level → operator due date → board (in the');
lines.push('   node\'s submodule order) → `seedOrder`. Seed `priority` is no longer a key. Any R4 row below');
lines.push('   means that ordering has regressed.');
lines.push('2. **Level is the primary key on a node.** Content authored on the wrong level always sorts');
lines.push('   wrong on the node — it cannot be fixed by reordering within a task. R1 "across levels" and');
lines.push('   R2 rows are the places where level placement itself looks wrong.', '');

const groups = {};
for (const f of unique) (groups[f.pillar] ||= []).push(f);
const order = ['prophetic-path', 'faith', 'prayer', 'health', 'intellect', 'family', 'wealth', 'environment', 'ummah'];
lines.push('## Findings by pillar', '');
for (const p of order.filter((x) => groups[x])) {
  const rows = groups[p].sort((a, b) =>
    (CONF_RANK[a.confidence] - CONF_RANK[b.confidence])
    || a.rule.localeCompare(b.rule) || a.where.localeCompare(b.where));
  lines.push(`### ${p} (${rows.length})`, '');
  lines.push('| # | Rule | Conf. | Scope | Where | Finding | Suggested correction |', '|---|---|---|---|---|---|---|');
  rows.forEach((f, i) => {
    const esc = (s) => String(s).replace(/\|/g, '\\|');
    lines.push(`| ${i + 1} | ${f.rule} | ${f.confidence} | ${esc(f.scope)} | ${esc(f.where)} | ${esc(f.summary)} | ${esc(f.suggestion)} |`);
  });
  lines.push('');
}

lines.push('## Appendix: node pools as shown (seed data, first 20)', '');
for (const n of nodeSummaries) {
  const flags = [n.fallback ? 'FALLBACK' : null, n.total > n.shown ? `truncated ${n.total}→${n.shown}` : null,
    n.missing.length ? `no board for ${n.missing.join(', ')}` : null].filter(Boolean).join(' · ');
  lines.push(`### ${n.nodeId}${flags ? ` — ${flags}` : ''}`, '');
  lines.push(...(n.lines.length ? n.lines : ['_(empty)_']), '');
}

const md = `${lines.join('\n')}\n`;
if (TO_STDOUT) process.stdout.write(md);
else {
  fs.writeFileSync(OUT, md, 'utf8');
  console.log(`[audit-task-order] ${unique.length} finding(s) → ${path.relative(ROOT, OUT)}`);
  for (const r of Object.keys(RULE_NAMES)) console.log(`  ${r} ${RULE_NAMES[r]}: ${count((f) => f.rule === r)}`);
}
