// Shared resolvers that map projects/boards onto a {pillarId, submoduleId}
// pair. Used by task-store (project-aware path) and seed-hydrator (board-id
// path) so the Faith short-form table and the resolution rules live in
// exactly one place.

import { MAQASID_PILLARS, getPillarForModule } from './maqasid';

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
export function resolveSubmoduleFromBoardId(boardId) {
  if (!boardId || typeof boardId !== 'string') {
    return { pillarId: null, submoduleId: null };
  }
  const parts = boardId.split('_');
  if (parts.length < 2) return { pillarId: null, submoduleId: null };
  const [pillarKey, moduleSlug] = parts;
  const pillar = MAQASID_PILLARS.find((p) => p.id === pillarKey);
  if (!pillar) return { pillarId: null, submoduleId: null };
  const submoduleId = `${pillarKey}-${moduleSlug}`;
  if (pillar.subModuleIds.includes(submoduleId)) {
    return { pillarId: pillarKey, submoduleId };
  }
  if (pillar.subModuleIds.includes(moduleSlug)) {
    return { pillarId: pillarKey, submoduleId: moduleSlug };
  }
  return { pillarId: pillarKey, submoduleId: null };
}
