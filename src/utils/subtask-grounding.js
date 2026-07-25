// Shared grounding helpers for subtasks — used anywhere a subtask's evidence
// quality or Amanah tier needs to be displayed (TaskDetailPanel, Orientation).

export function isSubtaskGrounded(sub) {
  if (!sub || !Array.isArray(sub.sources) || sub.sources.length === 0) return null;
  const ok = sub.sources.some(
    (e) =>
      (e?.provenanceTier === 'Bayyinah' || e?.provenanceTier === 'Qarina') &&
      (e?.relevance === 'direct' || e?.relevance === 'contextual'),
  );
  return ok;
}

// Subtask-level `tier` was hand-stamped before per-source `provenanceTier` existed.
// When structured sources are present, treat the subtask tier as the strongest of them
// (Bayyinah > Qarina > Niyyah). Falls back to the stored field otherwise.
const PROVENANCE_TO_T = { Bayyinah: 'T1', Qarina: 'T2', Niyyah: 'T3' };
const T_RANK = { T1: 1, T2: 2, T3: 3 };
export function deriveSubtaskTier(sub) {
  if (Array.isArray(sub?.sources) && sub.sources.length > 0) {
    let best = null;
    for (const s of sub.sources) {
      const t = PROVENANCE_TO_T[s?.provenanceTier];
      if (t && (!best || T_RANK[t] < T_RANK[best])) best = t;
    }
    if (best) return best;
  }
  return sub?.tier || null;
}
