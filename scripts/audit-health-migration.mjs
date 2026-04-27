#!/usr/bin/env node
// Audit: round-trip 10 random Health (formerly Life) subtasks against pre-migration markdown.

const { HEALTH_SEED_TASKS } = await import(
  new URL('../src/data/seed-tasks/health-seed-tasks.js', import.meta.url).href,
);
const legacyMod = await import(
  new URL('../tmp/life-original.js', import.meta.url).href,
);
const LEGACY = legacyMod.LIFE_SEED_TASKS;

function flatten(data) {
  const items = [];
  for (const [board, tasks] of Object.entries(data)) {
    for (let ti = 0; ti < tasks.length; ti++) {
      const t = tasks[ti];
      if (Array.isArray(t.subtasks)) {
        for (let si = 0; si < t.subtasks.length; si++) {
          items.push({ board, ti, si, sub: t.subtasks[si], parent: t });
        }
      }
    }
  }
  return items;
}

const cur = flatten(HEALTH_SEED_TASKS);
const old = flatten(LEGACY);
const oldByKey = new Map();
for (const x of old) oldByKey.set(`${x.board}::${x.parent.title}::${x.sub.title}`, x);

const candidates = cur.filter((x) => Array.isArray(x.sub.sources) && x.sub.sources.length > 0);
let rnd = 12345;
const sample = [];
while (sample.length < 10 && candidates.length) {
  rnd = (rnd * 9301 + 49297) % 233280;
  const idx = rnd % candidates.length;
  const pick = candidates.splice(idx, 1)[0];
  const key = `${pick.board}::${pick.parent.title}::${pick.sub.title}`;
  if (oldByKey.has(key) && typeof oldByKey.get(key).sub.sources === 'string') {
    sample.push({ cur: pick, old: oldByKey.get(key) });
  }
}

let issues = 0;
for (const { cur, old } of sample) {
  const legacy = old.sub.sources;
  const refsLegacy = [...legacy.matchAll(/###\s+([^\n]+)/g)].map((m) => m[1].trim());
  const refsCur = cur.sub.sources.map((s) => s.ref);
  console.log(`\n--- ${cur.board} / ${cur.sub.title.slice(0, 60)}`);
  console.log(`  legacy refs (${refsLegacy.length}): ${refsLegacy.join(' | ')}`);
  console.log(`  current refs (${refsCur.length}): ${refsCur.join(' | ')}`);
  if (refsLegacy.length !== refsCur.length) {
    console.log(`  ✗ ref count mismatch`);
    issues++;
  }
  for (const s of cur.sub.sources) {
    if (s.kind === 'quran' && s.arabic) {
      const arSnippet = s.arabic.slice(0, 25);
      if (!legacy.includes(arSnippet)) {
        console.log(`  ! arabic for ${s.ref} not found verbatim (snippet: ${arSnippet})`);
      }
    }
    const trSnippet = s.translation.replace(/^["'\u201c\u201d]+/, '').slice(0, 30);
    if (trSnippet.length > 10 && !legacy.includes(trSnippet)) {
      console.log(`  ! translation for ${s.ref} not in legacy (snippet: ${trSnippet})`);
    }
  }
}
console.log(`\nAudit: ${sample.length} sampled, ${issues} ref-count mismatches`);
