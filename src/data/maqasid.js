// Maqasid al-Shari'ah pillar definitions
// Seven pillars governing the BBOS module hierarchy

import { MODULES } from './modules';
import { FIVE_PILLARS } from './islamic/five-pillars-content';

export const MAQASID_PILLARS = [
  {
    id: 'faith',
    order: 1,
    sidebarLabel: 'Faith',
    universalLabel: 'Purpose',
    stewardshipLabel: 'Spiritual Governance',
    universalStewardship: 'Purpose Alignment',
    arabicRoot: 'Hifz al-Din',
    arabicRootAr: 'حفظ الدين',
    rootAction: 'Aligning',
    accentColor: '#C8A96E',
    icon: 'Compass',
    subModuleIds: ['faith-shahada', 'faith-salah', 'faith-zakah', 'faith-siyam', 'faith-hajj', 'sources'],
    status: 'active',
    relationship: 'reserved-active',
    readinessAyatKey: 'faith',
  },
  {
    id: 'life',
    order: 2,
    sidebarLabel: 'Life',
    universalLabel: 'Vitality',
    stewardshipLabel: 'Vitality Stewardship',
    universalStewardship: 'Vitality Management',
    arabicRoot: 'Hifz al-Nafs',
    arabicRootAr: 'حفظ النفس',
    rootAction: 'Nurturing',
    accentColor: '#6EAD8A',
    icon: 'HeartPulse',
    subModuleIds: ['life-physical', 'life-mental', 'life-safety', 'life-social'],
    status: 'active',
    relationship: 'reserved-active',
    readinessAyatKey: 'life',
  },
  {
    id: 'intellect',
    order: 3,
    sidebarLabel: 'Intellect',
    universalLabel: 'Clarity',
    stewardshipLabel: 'Cognitive Integrity',
    universalStewardship: 'Cognitive Clarity',
    arabicRoot: "Hifz al-\u02BFAql",
    arabicRootAr: 'حفظ العقل',
    rootAction: 'Clarifying',
    accentColor: '#6E8EAD',
    icon: 'Brain',
    subModuleIds: ['intellect-learning', 'intellect-thinking', 'intellect-cognitive', 'intellect-professional'],
    status: 'active',
    relationship: 'reserved-active',
    readinessAyatKey: 'intellect',
  },
  {
    id: 'family',
    order: 4,
    sidebarLabel: 'Family',
    universalLabel: 'Legacy',
    stewardshipLabel: 'Lineage & Legacy',
    universalStewardship: 'Legacy Stewardship',
    arabicRoot: 'Hifz al-Nasl',
    arabicRootAr: 'حفظ النسل',
    rootAction: 'Connecting',
    accentColor: '#AD6E9E',
    icon: 'Users',
    subModuleIds: ['family-marriage', 'family-parenting', 'family-kinship', 'family-home', 'family-office'],
    status: 'active',
    relationship: 'moontrance-partial',
    readinessAyatKey: 'people',
  },
  {
    id: 'wealth',
    order: 5,
    sidebarLabel: 'Wealth',
    universalLabel: 'Resources',
    stewardshipLabel: 'Resource Orchestration',
    universalStewardship: 'Resource Management',
    arabicRoot: 'Hifz al-Mal',
    arabicRootAr: 'حفظ المال',
    rootAction: 'Flowing',
    accentColor: '#8EAD6E',
    icon: 'ChessRook',
    subModuleIds: ['wealth-earning', 'wealth-financial', 'wealth-ownership', 'wealth-circulation', 'work', 'money', 'people', 'office', 'tech'],
    status: 'active',
    relationship: 'bbos-contained',
    readinessAyatKey: 'wealth',
  },
  {
    id: 'environment',
    order: 6,
    sidebarLabel: 'Environment',
    universalLabel: 'Ecology',
    stewardshipLabel: 'Ecological Symbiosis',
    universalStewardship: 'Ecological Balance',
    arabicRoot: "Hifz al-Bi\u02BFah",
    arabicRootAr: 'حفظ البيئة',
    rootAction: 'Integrating',
    accentColor: '#6EADAD',
    icon: 'TreePine',
    subModuleIds: ['env-resource', 'env-waste', 'env-ecosystem', 'env-sourcing'],
    status: 'active',
    relationship: 'self-contained',
    readinessAyatKey: 'environment',
  },
  {
    id: 'ummah',
    order: 7,
    sidebarLabel: 'Community',
    universalLabel: 'Collective',
    stewardshipLabel: 'Collective Stewardship',
    universalStewardship: 'Community Impact',
    arabicRoot: 'Hifz al-Ummah',
    arabicRootAr: 'حفظ الأمة',
    rootAction: 'Unifying',
    accentColor: '#AD8E6E',
    icon: 'Globe',
    subModuleIds: ['collective', 'neighbors', 'community'],
    status: 'active',
    relationship: 'self-contained',
    readinessAyatKey: 'community',
  },
  {
    id: 'moontrance',
    order: 8,
    sidebarLabel: 'Moontrance',
    universalLabel: 'Territory',
    stewardshipLabel: 'Land Stewardship',
    universalStewardship: 'Territorial Stewardship',
    arabicRoot: 'Hifz al-Ard',
    arabicRootAr: 'حفظ الأرض',
    rootAction: 'Cultivating',
    accentColor: '#6E8E5B',
    icon: 'Moon',
    subModuleIds: ['moontrance-land', 'moontrance-seasonal', 'moontrance-residency'],
    status: 'active',
    relationship: 'moontrance-atlas',
    readinessAyatKey: 'community',
  },
];

/** Find a pillar by its own ID */
export function getPillarById(id) {
  return MAQASID_PILLARS.find((p) => p.id === id) || null;
}

/** Find the parent pillar for a given module ID */
export function getPillarForModule(moduleId) {
  return MAQASID_PILLARS.find((p) => p.subModuleIds.includes(moduleId)) || null;
}

/** Get display label based on values layer */
export function getPillarLabel(pillar, valuesLayer) {
  return valuesLayer === 'islamic' ? pillar.sidebarLabel : pillar.universalLabel;
}

/** Get stewardship description based on values layer */
export function getPillarStewardship(pillar, valuesLayer) {
  return valuesLayer === 'islamic' ? pillar.stewardshipLabel : pillar.universalStewardship;
}

// Non-prefixed submodule labels (sources, cross-pillar modules, etc.)
// Extended from the local override map previously duplicated in
// PillarFirstEntry.jsx. Prefer MODULES[].name where available.
const SUBMODULE_LABEL_OVERRIDES = {
  sources: "Sources (Qur'an & Hadith)",
  collective: 'Collective',
};

// Bare faith ids (shahada, salah, ...) — pulled from FIVE_PILLARS.name
const FAITH_ID_LABELS = FIVE_PILLARS.reduce((acc, p) => {
  acc[p.id] = p.name;
  return acc;
}, {});

/**
 * Resolve a submodule id to a human-readable display label.
 * Handles:
 *   - prefixed ids  ('faith-salah', 'life-physical')  → strips prefix and title-cases
 *   - faith ids     ('faith-shahada' → 'Shahada')     → via FIVE_PILLARS.name
 *   - module ids    ('work', 'money', 'people', ...)  → via MODULES[].name
 *   - overrides     ('sources', 'collective')
 *
 * @param {string} id        submodule id
 * @param {string} [pillarId] owning pillar id (for prefix stripping)
 */
export function getSubmoduleLabel(id, pillarId) {
  if (!id) return '';
  if (SUBMODULE_LABEL_OVERRIDES[id]) return SUBMODULE_LABEL_OVERRIDES[id];

  // Faith bare ids via FIVE_PILLARS
  if (pillarId === 'faith') {
    const bare = id.startsWith('faith-') ? id.slice('faith-'.length) : id;
    if (FAITH_ID_LABELS[bare]) return FAITH_ID_LABELS[bare];
  }

  // Module-level ids (work, money, people, ...)
  const mod = MODULES.find((m) => m.id === id);
  if (mod?.name) return mod.name;

  // Generic pillar-prefixed id — strip and title-case
  const prefix = pillarId ? pillarId + '-' : null;
  const base = prefix && id.startsWith(prefix) ? id.slice(prefix.length) : id;
  return base.charAt(0).toUpperCase() + base.slice(1);
}
