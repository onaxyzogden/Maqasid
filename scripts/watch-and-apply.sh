#!/usr/bin/env bash
# Polls jsonl row counts and commits each pillar when target is reached.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

declare -A TARGETS=(
  [life]=236 [family]=233 [intellect]=236
  [wealth]=236 [environment]=226 [ummah]=450
)
PILLARS=(life family intellect wealth environment ummah)

get_rows() {
  local f="$ROOT/artifacts/amanah-grading/$1.jsonl"
  [ -f "$f" ] && wc -l < "$f" || echo 0
}

apply_and_commit() {
  local pillar="$1"
  local jsonl="$ROOT/artifacts/amanah-grading/${pillar}.jsonl"
  local count; count=$(get_rows "$pillar")
  echo "[watch] $pillar: $count rows — applying"

  node "$ROOT/scripts/apply-amanah-tiers.mjs" "$pillar"

  cd "$ROOT"
  git add "artifacts/amanah-grading/${pillar}.jsonl" "src/data/seed-tasks/${pillar}-seed-tasks.js"
  git add "artifacts/amanah-grading/${pillar}.log" 2>/dev/null || true

  local dist
  dist=$(node -e "
    const fs=require('fs');
    const rows=fs.readFileSync('${jsonl}','utf-8').trim().split('\n').filter(Boolean).map(l=>JSON.parse(l));
    const t={T1:0,T2:0,T3:0};
    rows.forEach(r=>{if(t[r.tier]!==undefined)t[r.tier]++;});
    console.log(Object.entries(t).map(([k,v])=>k+':'+v).join(' '));
  " 2>/dev/null || echo "")

  git commit -m "feat(grounding): Amanah Gate tiers — ${pillar} pillar (${count} subtasks)

Applied T1/T2/T3 evidence tiers from NotebookLM grading to all ${count}
${pillar} subtasks. Distribution: ${dist}

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"

  git push origin grounding/faith
  echo "[watch] committed and pushed $pillar"
}

for pillar in "${PILLARS[@]}"; do
  target="${TARGETS[$pillar]}"
  echo "[watch] waiting for $pillar ($target rows)..."
  until [ "$(get_rows "$pillar")" -ge "$target" ]; do sleep 30; done
  apply_and_commit "$pillar"
done

echo "[watch] ALL PILLARS DONE"
