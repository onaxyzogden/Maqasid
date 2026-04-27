// Canonical submoduleId → PillarLevelPage props.
// Used by SubmoduleSlideUp to render the same dashboard a user would see at
// the corresponding submodule route (e.g., 'wealth-earning' → /app/wealth-earning).

import { getPillarForModule, getSubmoduleLabel } from './maqasid';

import {
  WEALTH_PILLARS, WEALTH_LEVEL_ROUTES, WEALTH_STORAGE_KEY,
  WEALTH_ENSURE_PROJECTS, WEALTH_LEVEL_DESCRIPTIONS,
} from '@pages/wealth/WealthCorePage-constants';
import {
  HEALTH_PILLARS, HEALTH_LEVEL_ROUTES, HEALTH_STORAGE_KEY,
  HEALTH_ENSURE_PROJECTS, HEALTH_LEVEL_DESCRIPTIONS,
} from '@pages/health/HealthCorePage-constants';
import {
  INTELLECT_PILLARS, INTELLECT_LEVEL_ROUTES, INTELLECT_STORAGE_KEY,
  INTELLECT_ENSURE_PROJECTS, INTELLECT_LEVEL_DESCRIPTIONS,
} from '@pages/intellect/IntellectCorePage-constants';
import {
  FAMILY_PILLARS, FAMILY_LEVEL_ROUTES, FAMILY_STORAGE_KEY,
  FAMILY_ENSURE_PROJECTS, FAMILY_LEVEL_DESCRIPTIONS,
} from '@pages/family/FamilyCorePage-constants';
import {
  ENVIRONMENT_PILLARS, ENVIRONMENT_LEVEL_ROUTES, ENVIRONMENT_STORAGE_KEY,
  ENVIRONMENT_ENSURE_PROJECTS, ENVIRONMENT_LEVEL_DESCRIPTIONS,
} from '@pages/environment/EnvironmentCorePage-constants';
import {
  FAITH_PILLARS, FAITH_LEVEL_ROUTES, FAITH_STORAGE_KEY,
  FAITH_ENSURE_PROJECTS,
} from '@pages/faith/FaithLevelNavigator-constants';
import {
  UMMAH_PILLARS, UMMAH_LEVEL_ROUTES, UMMAH_STORAGE_KEY,
  UMMAH_ENSURE_PROJECTS,
} from '@pages/ummah/UmmahLevelNavigator-constants';

// pillarKey (board segment) → moduleId (FAITH_PILLARS.id). Mirrors FaithPillarPage.
const FAITH_PILLAR_MODULE_MAP = {
  shahada: 'shahada',
  salah:   'salat',
  zakah:   'zakat',
  siyam:   'siyam',
  hajj:    'hajj',
};

const PILLAR_CONFIGS = {
  wealth: {
    boardPrefix: 'wealth',
    pillars: WEALTH_PILLARS,
    levelRoutes: WEALTH_LEVEL_ROUTES,
    storageKey: WEALTH_STORAGE_KEY,
    ensureProjects: WEALTH_ENSURE_PROJECTS,
    levelDescriptions: WEALTH_LEVEL_DESCRIPTIONS,
  },
  health: {
    boardPrefix: 'health',
    pillars: HEALTH_PILLARS,
    levelRoutes: HEALTH_LEVEL_ROUTES,
    storageKey: HEALTH_STORAGE_KEY,
    ensureProjects: HEALTH_ENSURE_PROJECTS,
    levelDescriptions: HEALTH_LEVEL_DESCRIPTIONS,
  },
  intellect: {
    boardPrefix: 'intellect',
    pillars: INTELLECT_PILLARS,
    levelRoutes: INTELLECT_LEVEL_ROUTES,
    storageKey: INTELLECT_STORAGE_KEY,
    ensureProjects: INTELLECT_ENSURE_PROJECTS,
    levelDescriptions: INTELLECT_LEVEL_DESCRIPTIONS,
  },
  family: {
    boardPrefix: 'family',
    pillars: FAMILY_PILLARS,
    levelRoutes: FAMILY_LEVEL_ROUTES,
    storageKey: FAMILY_STORAGE_KEY,
    ensureProjects: FAMILY_ENSURE_PROJECTS,
    levelDescriptions: FAMILY_LEVEL_DESCRIPTIONS,
  },
  environment: {
    boardPrefix: 'environment',
    pillars: ENVIRONMENT_PILLARS,
    levelRoutes: ENVIRONMENT_LEVEL_ROUTES,
    storageKey: ENVIRONMENT_STORAGE_KEY,
    ensureProjects: ENVIRONMENT_ENSURE_PROJECTS,
    levelDescriptions: ENVIRONMENT_LEVEL_DESCRIPTIONS,
  },
  faith: {
    boardPrefix: 'faith',
    pillars: FAITH_PILLARS,
    levelRoutes: FAITH_LEVEL_ROUTES,
    storageKey: FAITH_STORAGE_KEY,
    ensureProjects: FAITH_ENSURE_PROJECTS,
    pillarModuleMap: FAITH_PILLAR_MODULE_MAP,
  },
  ummah: {
    boardPrefix: 'ummah',
    pillars: UMMAH_PILLARS,
    levelRoutes: UMMAH_LEVEL_ROUTES,
    storageKey: UMMAH_STORAGE_KEY,
    ensureProjects: UMMAH_ENSURE_PROJECTS,
  },
};

// Each row: [canonical submoduleId, pillarKey (board segment)]
const PILLAR_SUBMODULES = {
  wealth: [
    ['wealth-earning',     'earning'],
    ['wealth-financial',   'financial'],
    ['wealth-ownership',   'ownership'],
    ['wealth-circulation', 'circulation'],
  ],
  health: [
    ['health-physical', 'physical'],
    ['health-mental',   'mental'],
    ['health-safety',   'safety'],
    ['health-social',   'social'],
  ],
  intellect: [
    ['intellect-learning',     'learning'],
    ['intellect-thinking',     'thinking'],
    ['intellect-cognitive',    'cognitive'],
    ['intellect-professional', 'professional'],
  ],
  family: [
    ['family-marriage',  'marriage'],
    ['family-parenting', 'parenting'],
    ['family-kinship',   'kinship'],
    ['family-home',      'home'],
  ],
  environment: [
    ['env-resource',  'resource'],
    ['env-waste',     'waste'],
    ['env-ecosystem', 'ecosystem'],
    ['env-sourcing',  'sourcing'],
  ],
  faith: [
    ['faith-shahada', 'shahada'],
    ['faith-salah',   'salah'],
    ['faith-zakah',   'zakah'],
    ['faith-siyam',   'siyam'],
    ['faith-hajj',    'hajj'],
  ],
  ummah: [
    ['collective', 'collective'],
    ['neighbors',  'neighbors'],
    ['community',  'community'],
  ],
};

const SUBMODULE_ENTRIES = {};
for (const [pillarId, rows] of Object.entries(PILLAR_SUBMODULES)) {
  for (const [submoduleId, pillarKey] of rows) {
    SUBMODULE_ENTRIES[submoduleId] = { ...PILLAR_CONFIGS[pillarId], pillarKey, pillarId };
  }
}

export function lookupSubmodule(id) {
  return SUBMODULE_ENTRIES[id] || null;
}

// Canonical submoduleIds for a top-level pillar (e.g., 'wealth' → all 4 Wealth
// submodules), regardless of which ones happen to appear in a given node's
// moduleGroup. Returns [] if the pillar isn't in the registry.
const PILLAR_ALIASES = { community: 'ummah' };
export function getPillarSubmoduleIds(pillarId) {
  const canonical = PILLAR_ALIASES[pillarId] || pillarId;
  const rows = PILLAR_SUBMODULES[canonical];
  return rows ? rows.map(([id]) => id) : [];
}

export function getSubmodulePillarColor(id) {
  return getPillarForModule(id)?.accentColor || 'var(--accent, #70d8c8)';
}

export function getSubmoduleDisplayLabel(id, fallback) {
  if (!id) return fallback || '';
  const pillar = getPillarForModule(id);
  return getSubmoduleLabel(id, pillar?.id) || fallback || id;
}
