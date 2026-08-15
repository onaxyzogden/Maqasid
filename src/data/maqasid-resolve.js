// Shared resolvers that map projects/boards onto a {pillarId, submoduleId}
// pair. Used by task-store (project-aware path) and seed-hydrator (board-id
// path) so the Faith short-form table and the resolution rules live in
// exactly one place.

import { MAQASID_PILLARS, getPillarForModule, getPillarBoardSegments } from './maqasid';

// Faith projects encode the module with a short Arabic-transliteration id
// (salat / zakat / siyam) while the pillar's canonical submoduleIds use the
// dashed kebab forms (faith-salah / faith-zakah / faith-siyam). Keep this
// table as the single source of truth for that mapping.
export const FAITH_MODULE_TO_SUBMODULE = {
  shahada: 'faith-shahada',
  salat: 'faith-salah',
  zakat: 'faith-zakah',
  siyam: 'faith-siyam',
  hajj: 'faith-hajj',
};

export function resolveSubmoduleFromProject(project) {
  if (!project) return { pillarId: null, submoduleId: null };

  // Project ids follow `{pillar}_{moduleSlug}_{level}` and are the authoritative
  // source of the pillar/submodule. Try the board-id parse first; it handles
  // every pillar's prefixed submoduleIds (`health-physical`, `wealth-earning`,
  // ...) without needing per-pillar mapping tables.
  if (project.id) {
    const fromId = resolveSubmoduleFromBoardId(project.id);
    if (fromId.pillarId && fromId.submoduleId) return fromId;
  }

  const moduleId = project.moduleId ?? null;
  if (!moduleId) return { pillarId: null, submoduleId: null };
  if (FAITH_MODULE_TO_SUBMODULE[moduleId]) {
    return { pillarId: 'faith', submoduleId: FAITH_MODULE_TO_SUBMODULE[moduleId] };
  }
  const pillar = MAQASID_PILLARS.find((p) => p.subModuleIds.includes(moduleId))
    || getPillarForModule(moduleId);
  return { pillarId: pillar?.id ?? null, submoduleId: moduleId };
}

// Board ids follow `{pillar}_{moduleSlug}_{level}` (e.g. `faith_salah_core`).
// The hydrator runs before the project store is consulted, so we parse the
// id directly. Returns nulls for ids that do not fit the pattern.
//
// The board slug is matched against the pillar's canonical submoduleIds BY
// SEGMENT — the submoduleId with its prefix stripped, which is exactly what
// `getPillarBoardSegments` returns, in the same order as `subModuleIds`, so the
// two can be indexed against each other. Matching by segment rather than by
// reassembling `${pillarKey}-${moduleSlug}` is the whole point: a pillar's id
// and its submodule prefix are NOT required to be the same string, and for
// Environment they are not — the pillar is `environment` while its submodules
// are `env-resource`, `env-waste`, `env-ecosystem`, `env-sourcing`. The old
// reassembly tried `environment-resource` and bare `resource`, matched neither,
// and returned `submoduleId: null` for every Environment board. That then fell
// through to the `project.moduleId` path in resolveSubmoduleFromProject, which
// stamped Environment's tasks `{ pillarId: null, submoduleId: 'resource' }` —
// the only tasks in the app with a null pillarId, and a submoduleId in a short
// form nothing else uses. `getFocusTasks`/`getLevelStatus` are called with the
// canonical `env-resource` (that is what the pillar's `subModuleIds` holds, and
// what NiyyahAct maps over), so they matched nothing: an Environment niyyah
// focus showed an EMPTY Deep Work list with every task dumped into Maintenance,
// and its level could never advance because every level counted 0 tasks.
//
// No migration is needed. `hydrateTasks` re-derives these tags from the board id
// on every load (seed-hydrator.js), so in-memory rows carry the corrected values
// from the first boot after this fix — and in-memory is what `getFocusTasks` and
// `getLevelStatus` read. `loadTasks` therefore sees nothing left to change and
// skips its write, so the stale short form lingers in localStorage until the row
// is next persisted for some other reason. That is invisible to every consumer.
//
// Segment matching subsumes the old prefixed-and-bare pair — `faith-salah` has
// segment `salah` and bare `collective` has segment `collective` — so every id
// that resolved before still resolves to the same submoduleId.
export function resolveSubmoduleFromBoardId(boardId) {
  if (!boardId || typeof boardId !== 'string') {
    return { pillarId: null, submoduleId: null };
  }
  const parts = boardId.split('_');
  if (parts.length < 2) return { pillarId: null, submoduleId: null };
  const [pillarKey, moduleSlug] = parts;
  const pillar = MAQASID_PILLARS.find((p) => p.id === pillarKey);
  if (!pillar) return { pillarId: null, submoduleId: null };
  const index = getPillarBoardSegments(pillarKey).indexOf(moduleSlug);
  if (index !== -1) {
    return { pillarId: pillarKey, submoduleId: pillar.subModuleIds[index] };
  }
  // A slug the pillar does not own — e.g. the nine `ummah_moontrance-*` boards,
  // which carry the `ummah_` prefix while `moontrance-land` and its siblings
  // belong to the moontrance pillar. The pillar is still known, so it is
  // reported; the caller falls back to `project.moduleId`, which resolves those
  // boards correctly against the moontrance pillar.
  return { pillarId: pillarKey, submoduleId: null };
}
