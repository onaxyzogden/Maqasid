import { create } from 'zustand';
import { safeGetJSON, safeSet, safeRemove } from '../services/storage';
import { genProjectId, genColumnId, genTaskId, genSubtaskId } from '../services/id';
import { DEFAULT_COLUMNS, PROJECT_COLORS } from '../data/modules';
import { FAITH_SEED_TASKS } from '@data/seed-tasks/faith-seed-tasks';
import { LIFE_SEED_TASKS } from '@data/seed-tasks/life-seed-tasks';
import { INTELLECT_SEED_TASKS } from '@data/seed-tasks/intellect-seed-tasks';
import { FAMILY_SEED_TASKS } from '@data/seed-tasks/family-seed-tasks';
import { WEALTH_SEED_TASKS } from '@data/seed-tasks/wealth-seed-tasks';
import { ENVIRONMENT_SEED_TASKS } from '@data/seed-tasks/environment-seed-tasks';
import { UMMAH_SEED_TASKS } from '@data/seed-tasks/ummah-seed-tasks';
import { BBOS_TASK_DEFINITIONS } from '@data/bbos/bbos-task-definitions';

function persistProjects(projects) {
  safeSet('projects', projects);
}

/** Returns true if seeding succeeded (or was skipped), false on storage failure. */
function seedBbosTasks(projectId, todoColumnId) {
  const storageKey = `tasks_${projectId}`;
  const existing = safeGetJSON(storageKey, []);
  if (existing.length > 0) return true;
  const now = new Date().toISOString();
  const seeded = BBOS_TASK_DEFINITIONS.map((def, i) => ({
    id: genTaskId(),
    projectId,
    columnId: todoColumnId,
    title: `${def.id} · ${def.label}`,
    description: '',
    priority: 'medium',
    dueDate: null,
    tags: [def.stage],
    subtasks: [],
    checklist: [],
    attachments: [],
    order: i,
    seedOrder: i,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    bbosTaskType: def.id,
    bbosStage: def.stage,
    bbosFieldData: {},
  }));
  return safeSet(storageKey, seeded);
}

function seedTasks(boardId, seedMap) {
  const tasks = seedMap[boardId];
  if (!tasks || tasks.length === 0) return;
  const storageKey = `tasks_${boardId}`;
  const existing = safeGetJSON(storageKey, []);
  if (existing.length > 0) return; // already has tasks
  const todoColId = `col_${boardId}_to_do`;
  const now = new Date().toISOString();
  // Slim shape: description/sources are static reference data, hydrated at read time
  // from the bundled seed (see src/services/seed-hydrator.js). Persisting them would
  // blow the localStorage quota (~8 MB across 1,500+ subtasks).
  const seeded = tasks.map((t, i) => ({
    id: genTaskId(),
    projectId: boardId,
    columnId: todoColId,
    title: t.title,
    priority: t.priority || 'medium',
    dueDate: t.dueDate || null,
    tags: t.tags || [],
    subtasks: (t.subtasks || []).map((s) => ({ id: genSubtaskId(), title: s.title, done: s.done ?? false })),
    checklist: [],
    order: i,
    seedOrder: i,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
  }));
  safeSet(storageKey, seeded);
}

// Backfills structural data (seedOrder, new subtasks added by seed updates) and
// strips static reference data (description, sources) that lives in the bundle.
// One-time migration flag prevents the strip-pass from running on every boot.
const SEED_STRIP_FLAG_KEY = 'seed_strip_v2';

function backfillAndStripSeeds() {
  const ALL_SEEDS = {
    ...FAITH_SEED_TASKS,
    ...LIFE_SEED_TASKS,
    ...INTELLECT_SEED_TASKS,
    ...FAMILY_SEED_TASKS,
    ...WEALTH_SEED_TASKS,
    ...ENVIRONMENT_SEED_TASKS,
    ...UMMAH_SEED_TASKS,
  };
  const firstRun = safeGetJSON(SEED_STRIP_FLAG_KEY, null) === null;
  let totalBefore = 0;
  let totalAfter = 0;

  Object.keys(ALL_SEEDS).forEach((boardId) => {
    const storageKey = `tasks_${boardId}`;
    const tasks = safeGetJSON(storageKey, []);
    if (tasks.length === 0) return;
    const seeds = ALL_SEEDS[boardId];
    const seedMap = {};
    seeds.forEach((s, i) => { seedMap[s.title] = { ...s, _seedIndex: i }; });
    let changed = false;
    const beforeSize = firstRun ? JSON.stringify(tasks).length : 0;

    const updated = tasks.map((t) => {
      const seed = seedMap[t.title];
      if (!seed) return t;
      const patch = {};

      // Structural: set seedOrder if missing
      if (t.seedOrder === undefined) patch.seedOrder = seed._seedIndex;

      // Structural: add any new subtasks introduced by seed updates (slim shape — no description/sources)
      const seedSubs = seed.subtasks || [];
      const storedSubs = t.subtasks || [];
      if (seedSubs.length > storedSubs.length) {
        const storedTitles = new Set(storedSubs.map((s) => s.title));
        const newSubs = seedSubs
          .filter((s) => !storedTitles.has(s.title))
          .map((s) => ({ id: genSubtaskId(), title: s.title, done: false }));
        if (newSubs.length > 0) patch.subtasks = [...storedSubs, ...newSubs];
      }

      // Strip: remove description/sources when a seed match exists.
      // These fields are read-only reference data in the UI — never user-edited —
      // so unconditional strip is safe and avoids retaining stale prior seed versions.
      let stripChanged = false;
      const nextTask = { ...t, ...patch };
      if (nextTask.description !== undefined && seed.description) {
        delete nextTask.description;
        stripChanged = true;
      }
      const subs = nextTask.subtasks || storedSubs;
      const seedSubMap = {};
      seedSubs.forEach((ss) => { seedSubMap[ss.title] = ss; });
      const strippedSubs = subs.map((st) => {
        const ss = seedSubMap[st.title];
        if (!ss) return st;
        if (st.description === undefined && st.sources === undefined) return st;
        const nst = { ...st };
        if (ss.description !== undefined && nst.description !== undefined) delete nst.description;
        if (ss.sources !== undefined && nst.sources !== undefined) delete nst.sources;
        stripChanged = true;
        return nst;
      });
      if (stripChanged) nextTask.subtasks = strippedSubs;

      if (Object.keys(patch).length > 0 || stripChanged) {
        changed = true;
        return nextTask;
      }
      return t;
    });

    if (changed) {
      safeSet(storageKey, updated);
      if (firstRun) {
        totalBefore += beforeSize;
        totalAfter += JSON.stringify(updated).length;
      }
    }
  });

  if (firstRun) {
    safeSet(SEED_STRIP_FLAG_KEY, true);
    if (totalBefore > 0) {
      const mb = (n) => (n / 1024 / 1024).toFixed(2);
      console.info(`[bbiz] Seed reference strip: ${mb(totalBefore)} MB -> ${mb(totalAfter)} MB`);
    }
  }
}
backfillAndStripSeeds();

function backfillBbosOrder() {
  const bbosIndexMap = {};
  BBOS_TASK_DEFINITIONS.forEach((def, i) => { bbosIndexMap[def.id] = i; });
  const projects = safeGetJSON('projects', []);
  projects.forEach((proj) => {
    if (!proj.bbosEnabled) return;
    const storageKey = `tasks_${proj.id}`;
    const tasks = safeGetJSON(storageKey, []);
    if (tasks.length === 0) return;
    let changed = false;
    const updated = tasks.map((t) => {
      const idx = bbosIndexMap[t.bbosTaskType];
      if (idx === undefined) return t;
      if (t.seedOrder === idx) return t;
      changed = true;
      return { ...t, seedOrder: idx };
    });
    if (changed) safeSet(storageKey, updated);
  });
}
backfillBbosOrder();

export const FAITH_BOARDS = [
  { id: 'faith_core',       name: 'CORE',       color: '#C8A96E', icon: 'Shield',      description: 'Core Pillars — Level 1: Necessities', moduleId: null },
  { id: 'faith_growth',     name: 'GROWTH',     color: '#4ab8a8', icon: 'TrendingUp',  description: 'Growth Space — Level 2: Needs', moduleId: null },
  { id: 'faith_excellence', name: 'EXCELLENCE', color: '#8b5cf6', icon: 'Star',        description: 'Embellishments — Level 3: Excellence', moduleId: null },
  // Shahada — Core / Growth / Excellence
  { id: 'faith_shahada_core',       name: 'SHAHADA — CORE',       color: '#2d6a4f', icon: 'CheckCircle2', description: 'Shahada: Necessities (Daruriyyat)', moduleId: 'shahada' },
  { id: 'faith_shahada_growth',     name: 'SHAHADA — GROWTH',     color: '#2d6a4f', icon: 'CheckCircle2', description: 'Shahada: Needs (Hajiyyat)', moduleId: 'shahada' },
  { id: 'faith_shahada_excellence', name: 'SHAHADA — EXCELLENCE', color: '#2d6a4f', icon: 'CheckCircle2', description: 'Shahada: Excellence (Tahsiniyyat)', moduleId: 'shahada' },
  // Salah — Core / Growth / Excellence
  { id: 'faith_salah_core',       name: 'SALAH — CORE',       color: '#1d4e89', icon: 'HeartHandshake', description: 'Salah: Necessities (Daruriyyat)', moduleId: 'salat' },
  { id: 'faith_salah_growth',     name: 'SALAH — GROWTH',     color: '#1d4e89', icon: 'HeartHandshake', description: 'Salah: Needs (Hajiyyat)', moduleId: 'salat' },
  { id: 'faith_salah_excellence', name: 'SALAH — EXCELLENCE', color: '#1d4e89', icon: 'HeartHandshake', description: 'Salah: Excellence (Tahsiniyyat)', moduleId: 'salat' },
  // Zakah — Core / Growth / Excellence
  { id: 'faith_zakah_core',       name: 'ZAKAH — CORE',       color: '#6a994e', icon: 'HandHeart', description: 'Zakah: Necessities (Daruriyyat)', moduleId: 'zakat' },
  { id: 'faith_zakah_growth',     name: 'ZAKAH — GROWTH',     color: '#6a994e', icon: 'HandHeart', description: 'Zakah: Needs (Hajiyyat)', moduleId: 'zakat' },
  { id: 'faith_zakah_excellence', name: 'ZAKAH — EXCELLENCE', color: '#6a994e', icon: 'HandHeart', description: 'Zakah: Excellence (Tahsiniyyat)', moduleId: 'zakat' },
  // Sawm — Core / Growth / Excellence
  { id: 'faith_sawm_core',       name: 'SAWM — CORE',       color: '#bc6c25', icon: 'Moon', description: 'Sawm: Necessities (Daruriyyat)', moduleId: 'siyam' },
  { id: 'faith_sawm_growth',     name: 'SAWM — GROWTH',     color: '#bc6c25', icon: 'Moon', description: 'Sawm: Needs (Hajiyyat)', moduleId: 'siyam' },
  { id: 'faith_sawm_excellence', name: 'SAWM — EXCELLENCE', color: '#bc6c25', icon: 'Moon', description: 'Sawm: Excellence (Tahsiniyyat)', moduleId: 'siyam' },
  // Hajj — Core / Growth / Excellence
  { id: 'faith_hajj_core',       name: 'HAJJ — CORE',       color: '#7b2d8e', icon: 'Landmark', description: 'Hajj: Necessities (Daruriyyat)', moduleId: 'hajj' },
  { id: 'faith_hajj_growth',     name: 'HAJJ — GROWTH',     color: '#7b2d8e', icon: 'Landmark', description: 'Hajj: Needs (Hajiyyat)', moduleId: 'hajj' },
  { id: 'faith_hajj_excellence', name: 'HAJJ — EXCELLENCE', color: '#7b2d8e', icon: 'Landmark', description: 'Hajj: Excellence (Tahsiniyyat)', moduleId: 'hajj' },
];

export const LIFE_BOARDS = [
  // Physical Health — Core / Growth / Excellence
  { id: 'life_physical_core',       name: 'PHYSICAL HEALTH — CORE',       color: '#4ade80', icon: 'Activity',      description: 'Physical Health: Necessities (Daruriyyat)', moduleId: 'physical' },
  { id: 'life_physical_growth',     name: 'PHYSICAL HEALTH — GROWTH',     color: '#4ade80', icon: 'Activity',      description: 'Physical Health: Needs (Hajiyyat)', moduleId: 'physical' },
  { id: 'life_physical_excellence', name: 'PHYSICAL HEALTH — EXCELLENCE', color: '#4ade80', icon: 'Activity',      description: 'Physical Health: Excellence (Tahsiniyyat)', moduleId: 'physical' },
  // Mental Well-being — Core / Growth / Excellence
  { id: 'life_mental_core',       name: 'MENTAL WELL-BEING — CORE',       color: '#60a5fa', icon: 'BrainCircuit', description: 'Mental Well-being: Necessities (Daruriyyat)', moduleId: 'mental' },
  { id: 'life_mental_growth',     name: 'MENTAL WELL-BEING — GROWTH',     color: '#60a5fa', icon: 'BrainCircuit', description: 'Mental Well-being: Needs (Hajiyyat)', moduleId: 'mental' },
  { id: 'life_mental_excellence', name: 'MENTAL WELL-BEING — EXCELLENCE', color: '#60a5fa', icon: 'BrainCircuit', description: 'Mental Well-being: Excellence (Tahsiniyyat)', moduleId: 'mental' },
  // Safety & Security — Core / Growth / Excellence
  { id: 'life_safety_core',       name: 'SAFETY — CORE',       color: '#f59e0b', icon: 'Shield',       description: 'Safety & Security: Necessities (Daruriyyat)', moduleId: 'safety' },
  { id: 'life_safety_growth',     name: 'SAFETY — GROWTH',     color: '#f59e0b', icon: 'Shield',       description: 'Safety & Security: Needs (Hajiyyat)', moduleId: 'safety' },
  { id: 'life_safety_excellence', name: 'SAFETY — EXCELLENCE', color: '#f59e0b', icon: 'Shield',       description: 'Safety & Security: Excellence (Tahsiniyyat)', moduleId: 'safety' },
  // Social Character — Core / Growth / Excellence
  { id: 'life_social_core',       name: 'SOCIAL CHARACTER — CORE',       color: '#c084fc', icon: 'Sparkles',     description: 'Social Character: Necessities (Daruriyyat)', moduleId: 'social' },
  { id: 'life_social_growth',     name: 'SOCIAL CHARACTER — GROWTH',     color: '#c084fc', icon: 'Sparkles',     description: 'Social Character: Needs (Hajiyyat)', moduleId: 'social' },
  { id: 'life_social_excellence', name: 'SOCIAL CHARACTER — EXCELLENCE', color: '#c084fc', icon: 'Sparkles',     description: 'Social Character: Excellence (Tahsiniyyat)', moduleId: 'social' },
];

export const INTELLECT_BOARDS = [
  // Learning & Literacy — Core / Growth / Excellence
  { id: 'intellect_learning_core',       name: 'LEARNING — CORE',       color: '#3b82f6', icon: 'Library',       description: 'Learning & Literacy: Necessities (Daruriyyat)', moduleId: 'learning' },
  { id: 'intellect_learning_growth',     name: 'LEARNING — GROWTH',     color: '#3b82f6', icon: 'Library',       description: 'Learning & Literacy: Needs (Hajiyyat)', moduleId: 'learning' },
  { id: 'intellect_learning_excellence', name: 'LEARNING — EXCELLENCE', color: '#3b82f6', icon: 'Library',       description: 'Learning & Literacy: Excellence (Tahsiniyyat)', moduleId: 'learning' },
  // Critical Thinking — Core / Growth / Excellence
  { id: 'intellect_thinking_core',       name: 'CRITICAL THINKING — CORE',       color: '#f97316', icon: 'Lightbulb',   description: 'Critical Thinking: Necessities (Daruriyyat)', moduleId: 'thinking' },
  { id: 'intellect_thinking_growth',     name: 'CRITICAL THINKING — GROWTH',     color: '#f97316', icon: 'Lightbulb',   description: 'Critical Thinking: Needs (Hajiyyat)', moduleId: 'thinking' },
  { id: 'intellect_thinking_excellence', name: 'CRITICAL THINKING — EXCELLENCE', color: '#f97316', icon: 'Lightbulb',   description: 'Critical Thinking: Excellence (Tahsiniyyat)', moduleId: 'thinking' },
  // Cognitive Integrity — Core / Growth / Excellence
  { id: 'intellect_cognitive_core',       name: 'COGNITIVE INTEGRITY — CORE',       color: '#14b8a6', icon: 'BrainCircuit', description: 'Cognitive Integrity: Necessities (Daruriyyat)', moduleId: 'cognitive' },
  { id: 'intellect_cognitive_growth',     name: 'COGNITIVE INTEGRITY — GROWTH',     color: '#14b8a6', icon: 'BrainCircuit', description: 'Cognitive Integrity: Needs (Hajiyyat)', moduleId: 'cognitive' },
  { id: 'intellect_cognitive_excellence', name: 'COGNITIVE INTEGRITY — EXCELLENCE', color: '#14b8a6', icon: 'BrainCircuit', description: 'Cognitive Integrity: Excellence (Tahsiniyyat)', moduleId: 'cognitive' },
  // Skill Proficiency — Core / Growth / Excellence
  { id: 'intellect_professional_core',       name: 'SKILL PROFICIENCY — CORE',       color: '#ec4899', icon: 'Wrench',       description: 'Skill Proficiency: Necessities (Daruriyyat)', moduleId: 'professional' },
  { id: 'intellect_professional_growth',     name: 'SKILL PROFICIENCY — GROWTH',     color: '#ec4899', icon: 'Wrench',       description: 'Skill Proficiency: Needs (Hajiyyat)', moduleId: 'professional' },
  { id: 'intellect_professional_excellence', name: 'SKILL PROFICIENCY — EXCELLENCE', color: '#ec4899', icon: 'Wrench',       description: 'Skill Proficiency: Excellence (Tahsiniyyat)', moduleId: 'professional' },
];

export const FAMILY_BOARDS = [
  // Foundations of Marriage — Core / Growth / Excellence
  { id: 'family_marriage_core',       name: 'MARRIAGE — CORE',       color: '#f472b6', icon: 'Heart',      description: 'Foundations of Marriage: Necessities (Daruriyyat)', moduleId: 'marriage' },
  { id: 'family_marriage_growth',     name: 'MARRIAGE — GROWTH',     color: '#f472b6', icon: 'Heart',      description: 'Foundations of Marriage: Needs (Hajiyyat)', moduleId: 'marriage' },
  { id: 'family_marriage_excellence', name: 'MARRIAGE — EXCELLENCE', color: '#f472b6', icon: 'Heart',      description: 'Foundations of Marriage: Excellence (Tahsiniyyat)', moduleId: 'marriage' },
  // Parenting & Mentorship — Core / Growth / Excellence
  { id: 'family_parenting_core',       name: 'PARENTING — CORE',       color: '#a78bfa', icon: 'Baby',       description: 'Parenting & Mentorship: Necessities (Daruriyyat)', moduleId: 'parenting' },
  { id: 'family_parenting_growth',     name: 'PARENTING — GROWTH',     color: '#a78bfa', icon: 'Baby',       description: 'Parenting & Mentorship: Needs (Hajiyyat)', moduleId: 'parenting' },
  { id: 'family_parenting_excellence', name: 'PARENTING — EXCELLENCE', color: '#a78bfa', icon: 'Baby',       description: 'Parenting & Mentorship: Excellence (Tahsiniyyat)', moduleId: 'parenting' },
  // Extended Family (Kinship) — Core / Growth / Excellence
  { id: 'family_kinship_core',       name: 'KINSHIP — CORE',       color: '#fb923c', icon: 'Handshake',  description: 'Extended Family (Kinship): Necessities (Daruriyyat)', moduleId: 'kinship' },
  { id: 'family_kinship_growth',     name: 'KINSHIP — GROWTH',     color: '#fb923c', icon: 'Handshake',  description: 'Extended Family (Kinship): Needs (Hajiyyat)', moduleId: 'kinship' },
  { id: 'family_kinship_excellence', name: 'KINSHIP — EXCELLENCE', color: '#fb923c', icon: 'Handshake',  description: 'Extended Family (Kinship): Excellence (Tahsiniyyat)', moduleId: 'kinship' },
  // Home Environment — Core / Growth / Excellence
  { id: 'family_home_core',       name: 'HOME — CORE',       color: '#34d399', icon: 'Home',       description: 'Home Environment: Necessities (Daruriyyat)', moduleId: 'home' },
  { id: 'family_home_growth',     name: 'HOME — GROWTH',     color: '#34d399', icon: 'Home',       description: 'Home Environment: Needs (Hajiyyat)', moduleId: 'home' },
  { id: 'family_home_excellence', name: 'HOME — EXCELLENCE', color: '#34d399', icon: 'Home',       description: 'Home Environment: Excellence (Tahsiniyyat)', moduleId: 'home' },
];

export const WEALTH_BOARDS = [
  // Earning & Provision (Rizq) — Core / Growth / Excellence
  { id: 'wealth_earning_core',       name: 'EARNING — CORE',       color: '#22c55e', icon: 'Wallet',     description: 'Earning & Provision: Necessities (Daruriyyat)', moduleId: 'earning' },
  { id: 'wealth_earning_growth',     name: 'EARNING — GROWTH',     color: '#22c55e', icon: 'Wallet',     description: 'Earning & Provision: Needs (Hajiyyat)', moduleId: 'earning' },
  { id: 'wealth_earning_excellence', name: 'EARNING — EXCELLENCE', color: '#22c55e', icon: 'Wallet',     description: 'Earning & Provision: Excellence (Tahsiniyyat)', moduleId: 'earning' },
  // Financial Literacy & Management — Core / Growth / Excellence
  { id: 'wealth_financial_core',       name: 'FINANCIAL — CORE',       color: '#3b82f6', icon: 'PiggyBank',  description: 'Financial Literacy: Necessities (Daruriyyat)', moduleId: 'financial' },
  { id: 'wealth_financial_growth',     name: 'FINANCIAL — GROWTH',     color: '#3b82f6', icon: 'PiggyBank',  description: 'Financial Literacy: Needs (Hajiyyat)', moduleId: 'financial' },
  { id: 'wealth_financial_excellence', name: 'FINANCIAL — EXCELLENCE', color: '#3b82f6', icon: 'PiggyBank',  description: 'Financial Literacy: Excellence (Tahsiniyyat)', moduleId: 'financial' },
  // Ownership & Rights — Core / Growth / Excellence
  { id: 'wealth_ownership_core',       name: 'OWNERSHIP — CORE',       color: '#f59e0b', icon: 'Scale',      description: 'Ownership & Rights: Necessities (Daruriyyat)', moduleId: 'ownership' },
  { id: 'wealth_ownership_growth',     name: 'OWNERSHIP — GROWTH',     color: '#f59e0b', icon: 'Scale',      description: 'Ownership & Rights: Needs (Hajiyyat)', moduleId: 'ownership' },
  { id: 'wealth_ownership_excellence', name: 'OWNERSHIP — EXCELLENCE', color: '#f59e0b', icon: 'Scale',      description: 'Ownership & Rights: Excellence (Tahsiniyyat)', moduleId: 'ownership' },
  // Circulation & Impact — Core / Growth / Excellence
  { id: 'wealth_circulation_core',       name: 'CIRCULATION — CORE',       color: '#8b5cf6', icon: 'CircleFadingArrowUp',       description: 'Circulation & Impact: Necessities (Daruriyyat)', moduleId: 'circulation' },
  { id: 'wealth_circulation_growth',     name: 'CIRCULATION — GROWTH',     color: '#8b5cf6', icon: 'CircleFadingArrowUp',       description: 'Circulation & Impact: Needs (Hajiyyat)', moduleId: 'circulation' },
  { id: 'wealth_circulation_excellence', name: 'CIRCULATION — EXCELLENCE', color: '#8b5cf6', icon: 'CircleFadingArrowUp',       description: 'Circulation & Impact: Excellence (Tahsiniyyat)', moduleId: 'circulation' },
];

export const ENVIRONMENT_BOARDS = [
  // Resource Consumption (Water & Energy) — Core / Growth / Excellence
  { id: 'environment_resource_core',       name: 'RESOURCE — CORE',       color: '#22d3ee', icon: 'Droplets',   description: 'Resource Consumption: Necessities (Daruriyyat)', moduleId: 'resource' },
  { id: 'environment_resource_growth',     name: 'RESOURCE — GROWTH',     color: '#22d3ee', icon: 'Droplets',   description: 'Resource Consumption: Needs (Hajiyyat)', moduleId: 'resource' },
  { id: 'environment_resource_excellence', name: 'RESOURCE — EXCELLENCE', color: '#22d3ee', icon: 'Droplets',   description: 'Resource Consumption: Excellence (Tahsiniyyat)', moduleId: 'resource' },
  // Waste & Pollution Management — Core / Growth / Excellence
  { id: 'environment_waste_core',       name: 'WASTE — CORE',       color: '#a3e635', icon: 'Recycle',    description: 'Waste & Pollution: Necessities (Daruriyyat)', moduleId: 'waste' },
  { id: 'environment_waste_growth',     name: 'WASTE — GROWTH',     color: '#a3e635', icon: 'Recycle',    description: 'Waste & Pollution: Needs (Hajiyyat)', moduleId: 'waste' },
  { id: 'environment_waste_excellence', name: 'WASTE — EXCELLENCE', color: '#a3e635', icon: 'Recycle',    description: 'Waste & Pollution: Excellence (Tahsiniyyat)', moduleId: 'waste' },
  // Ecosystem & Biodiversity — Core / Growth / Excellence
  { id: 'environment_ecosystem_core',       name: 'ECOSYSTEM — CORE',       color: '#4ade80', icon: 'TreeDeciduous', description: 'Ecosystem & Biodiversity: Necessities (Daruriyyat)', moduleId: 'ecosystem' },
  { id: 'environment_ecosystem_growth',     name: 'ECOSYSTEM — GROWTH',     color: '#4ade80', icon: 'TreeDeciduous', description: 'Ecosystem & Biodiversity: Needs (Hajiyyat)', moduleId: 'ecosystem' },
  { id: 'environment_ecosystem_excellence', name: 'ECOSYSTEM — EXCELLENCE', color: '#4ade80', icon: 'TreeDeciduous', description: 'Ecosystem & Biodiversity: Excellence (Tahsiniyyat)', moduleId: 'ecosystem' },
  // Ethical Sourcing & Circularity — Core / Growth / Excellence
  { id: 'environment_sourcing_core',       name: 'SOURCING — CORE',       color: '#f97316', icon: 'ShoppingBag', description: 'Ethical Sourcing: Necessities (Daruriyyat)', moduleId: 'sourcing' },
  { id: 'environment_sourcing_growth',     name: 'SOURCING — GROWTH',     color: '#f97316', icon: 'ShoppingBag', description: 'Ethical Sourcing: Needs (Hajiyyat)', moduleId: 'sourcing' },
  { id: 'environment_sourcing_excellence', name: 'SOURCING — EXCELLENCE', color: '#f97316', icon: 'ShoppingBag', description: 'Ethical Sourcing: Excellence (Tahsiniyyat)', moduleId: 'sourcing' },
];

export const UMMAH_BOARDS = [
  // Collective (sidebar: "MTC" label) — Core / Growth / Excellence
  { id: 'ummah_collective_core',       name: 'COLLECTIVE — CORE',       color: '#5B8E6E', icon: 'Moon',   description: 'Collective: Necessities (Daruriyyat)', moduleId: 'collective' },
  { id: 'ummah_collective_growth',     name: 'COLLECTIVE — GROWTH',     color: '#5B8E6E', icon: 'Moon',   description: 'Collective: Needs (Hajiyyat)', moduleId: 'collective' },
  { id: 'ummah_collective_excellence', name: 'COLLECTIVE — EXCELLENCE', color: '#5B8E6E', icon: 'Moon',   description: 'Collective: Excellence (Tahsiniyyat)', moduleId: 'collective' },
  // Neighbors — Core / Growth / Excellence
  { id: 'ummah_neighbors_core',       name: 'NEIGHBORS — CORE',       color: '#8E6EAD', icon: 'Home',   description: 'Neighbors: Necessities (Daruriyyat)', moduleId: 'neighbors' },
  { id: 'ummah_neighbors_growth',     name: 'NEIGHBORS — GROWTH',     color: '#8E6EAD', icon: 'Home',   description: 'Neighbors: Needs (Hajiyyat)', moduleId: 'neighbors' },
  { id: 'ummah_neighbors_excellence', name: 'NEIGHBORS — EXCELLENCE', color: '#8E6EAD', icon: 'Home',   description: 'Neighbors: Excellence (Tahsiniyyat)', moduleId: 'neighbors' },
  // Community (sidebar: "Collective" label) — Core / Growth / Excellence
  { id: 'ummah_community_core',       name: 'COMMUNITY — CORE',       color: '#6E8EAD', icon: 'Shapes', description: 'Community: Necessities (Daruriyyat)', moduleId: 'community' },
  { id: 'ummah_community_growth',     name: 'COMMUNITY — GROWTH',     color: '#6E8EAD', icon: 'Shapes', description: 'Community: Needs (Hajiyyat)', moduleId: 'community' },
  { id: 'ummah_community_excellence', name: 'COMMUNITY — EXCELLENCE', color: '#6E8EAD', icon: 'Shapes', description: 'Community: Excellence (Tahsiniyyat)', moduleId: 'community' },
  // MTC Land — Core / Growth / Excellence
  { id: 'ummah_moontrance-land_core',       name: 'MOONTRANCE LAND — CORE',       color: '#6E8E5B', icon: 'Mountain', description: 'MTC Land: Necessities (Daruriyyat)', moduleId: 'moontrance-land' },
  { id: 'ummah_moontrance-land_growth',     name: 'MOONTRANCE LAND — GROWTH',     color: '#6E8E5B', icon: 'Mountain', description: 'MTC Land: Needs (Hajiyyat)', moduleId: 'moontrance-land' },
  { id: 'ummah_moontrance-land_excellence', name: 'MOONTRANCE LAND — EXCELLENCE', color: '#6E8E5B', icon: 'Mountain', description: 'MTC Land: Excellence (Tahsiniyyat)', moduleId: 'moontrance-land' },
  // MTC Seasonal — Core / Growth / Excellence
  { id: 'ummah_moontrance-seasonal_core',       name: 'MOONTRANCE SEASONAL — CORE',       color: '#8E9E5B', icon: 'Leaf', description: 'MTC Seasonal: Necessities (Daruriyyat)', moduleId: 'moontrance-seasonal' },
  { id: 'ummah_moontrance-seasonal_growth',     name: 'MOONTRANCE SEASONAL — GROWTH',     color: '#8E9E5B', icon: 'Leaf', description: 'MTC Seasonal: Needs (Hajiyyat)', moduleId: 'moontrance-seasonal' },
  { id: 'ummah_moontrance-seasonal_excellence', name: 'MOONTRANCE SEASONAL — EXCELLENCE', color: '#8E9E5B', icon: 'Leaf', description: 'MTC Seasonal: Excellence (Tahsiniyyat)', moduleId: 'moontrance-seasonal' },
  // MTC Residency — Core / Growth / Excellence
  { id: 'ummah_moontrance-residency_core',       name: 'MOONTRANCE RESIDENCY — CORE',       color: '#5B6E8E', icon: 'Building', description: 'MTC Residency: Necessities (Daruriyyat)', moduleId: 'moontrance-residency' },
  { id: 'ummah_moontrance-residency_growth',     name: 'MOONTRANCE RESIDENCY — GROWTH',     color: '#5B6E8E', icon: 'Building', description: 'MTC Residency: Needs (Hajiyyat)', moduleId: 'moontrance-residency' },
  { id: 'ummah_moontrance-residency_excellence', name: 'MOONTRANCE RESIDENCY — EXCELLENCE', color: '#5B6E8E', icon: 'Building', description: 'MTC Residency: Excellence (Tahsiniyyat)', moduleId: 'moontrance-residency' },
];

// Migrate any existing BBOS projects from 9-column layout to standard columns
function migrateBbosProjects(projects) {
  let changed = false;
  const migrated = projects.map((p) => {
    if (p.bbosEnabled && p.columns?.[0]?.id?.startsWith('bbos_')) {
      changed = true;
      return {
        ...p,
        columns: DEFAULT_COLUMNS.map((col) => ({
          id: genColumnId(),
          name: col.name,
          color: col.color,
        })),
      };
    }
    return p;
  });
  if (changed) safeSet('projects', migrated);
  return migrated;
}

// Remove "Review" column from all projects; move its tasks to "In Progress"
function migrateRemoveReviewColumn(projects) {
  let changed = false;
  const migrated = projects.map((p) => {
    const reviewCol = p.columns?.find((c) => c.name === 'Review');
    if (!reviewCol) return p;

    changed = true;
    const inProgressCol = p.columns.find((c) => c.name === 'In Progress');
    if (inProgressCol) {
      // Reassign any tasks in Review → In Progress
      const storageKey = `tasks_${p.id}`;
      const tasks = safeGetJSON(storageKey, []);
      const updated = tasks.map((t) =>
        t.columnId === reviewCol.id ? { ...t, columnId: inProgressCol.id } : t
      );
      if (tasks.some((t) => t.columnId === reviewCol.id)) {
        safeSet(storageKey, updated);
      }
    }
    return { ...p, columns: p.columns.filter((c) => c.name !== 'Review') };
  });
  if (changed) safeSet('projects', migrated);
  return migrated;
}

// Set defaultView to 'dashboard' for all projects that still have 'board'
function migrateDefaultViewToDashboard(projects) {
  let changed = false;
  const migrated = projects.map((p) => {
    if (p.defaultView === 'board') { changed = true; return { ...p, defaultView: 'dashboard' }; }
    return p;
  });
  if (changed) safeSet('projects', migrated);
  return migrated;
}

// Remove BBOS tasks whose definitions no longer exist (e.g. FND-IFB-S1–S5)
function migrateRemoveStaleBbosTasks(projects) {
  const validIds = new Set(BBOS_TASK_DEFINITIONS.map((d) => d.id));
  projects.forEach((p) => {
    if (!p.bbosEnabled) return;
    const storageKey = `tasks_${p.id}`;
    const tasks = safeGetJSON(storageKey, []);
    const cleaned = tasks.filter(
      (t) => !t.bbosTaskType || validIds.has(t.bbosTaskType)
    );
    if (cleaned.length < tasks.length) {
      safeSet(storageKey, cleaned);
    }
  });
  return projects;
}

export const useProjectStore = create((set, get) => ({
  projects: migrateRemoveStaleBbosTasks(migrateDefaultViewToDashboard(migrateRemoveReviewColumn(migrateBbosProjects(safeGetJSON('projects', []))))),

  createProject: ({ name, description = '', color, icon = 'Folder', moduleId = null, bbosEnabled = false }) => {
    const columns = DEFAULT_COLUMNS.map((col) => ({
      id: genColumnId(),
      name: col.name,
      color: col.color,
    }));

    const project = {
      id: genProjectId(),
      name,
      description,
      color: color || PROJECT_COLORS[Math.floor(Math.random() * PROJECT_COLORS.length)],
      icon: bbosEnabled ? 'Workflow' : icon,
      moduleId,
      columns,
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      bbosEnabled,
      bbosStage: bbosEnabled ? 'FND' : null,
      bbosCycle: bbosEnabled ? 1 : null,
      bbosRole: bbosEnabled ? 'all' : null,
      members: [],
    };
    // For BBOS projects, seed tasks first — only persist project if seeding succeeds
    if (bbosEnabled) {
      const seeded = seedBbosTasks(project.id, project.columns[0].id);
      if (!seeded) {
        // Task seeding failed (likely quota) — don't save orphaned project
        return null;
      }
    }
    // Persist project — if this fails after BBOS task seeding, clean up orphaned tasks
    const projectPersisted = { success: true };
    set((s) => {
      const projects = [...s.projects, project];
      projectPersisted.success = safeSet('projects', projects);
      return projectPersisted.success ? { projects } : s;
    });
    if (!projectPersisted.success && bbosEnabled) {
      safeRemove(`tasks_${project.id}`);
      return null;
    }
    return project;
  },

  updateProject: (id, updates) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    );
    persistProjects(projects);
    return { projects };
  }),

  addProjectMember: (projectId, employeeId) => set((s) => {
    const projects = s.projects.map((p) => {
      if (p.id !== projectId) return p;
      const members = p.members || [];
      if (members.includes(employeeId)) return p;
      return { ...p, members: [...members, employeeId] };
    });
    persistProjects(projects);
    return { projects };
  }),

  removeProjectMember: (projectId, employeeId) => set((s) => {
    const projects = s.projects.map((p) => {
      if (p.id !== projectId) return p;
      return { ...p, members: (p.members || []).filter((id) => id !== employeeId) };
    });
    persistProjects(projects);
    return { projects };
  }),

  deleteProject: (id) => {
    safeRemove(`tasks_${id}`);
    set((s) => {
      const projects = s.projects.filter((p) => p.id !== id);
      persistProjects(projects);
      return { projects };
    });
  },

  archiveProject: (id) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === id ? { ...p, archived: !p.archived, updatedAt: new Date().toISOString() } : p
    );
    persistProjects(projects);
    return { projects };
  }),

  setBbosRole: (projectId, roleId) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === projectId && p.bbosEnabled
        ? { ...p, bbosRole: roleId, updatedAt: new Date().toISOString() }
        : p
    );
    persistProjects(projects);
    return { projects };
  }),

  advanceBbosStage: (projectId, stageId) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === projectId && p.bbosEnabled
        ? { ...p, bbosStage: stageId, updatedAt: new Date().toISOString() }
        : p
    );
    persistProjects(projects);
    return { projects };
  }),

  startNewBbosCycle: (projectId) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === projectId && p.bbosEnabled
        ? { ...p, bbosStage: 'FND', bbosCycle: (p.bbosCycle || 1) + 1, updatedAt: new Date().toISOString() }
        : p
    );
    persistProjects(projects);
    return { projects };
  }),

  addColumn: (projectId, name, color = 'var(--col-todo)') => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === projectId
        ? { ...p, columns: [...p.columns, { id: genColumnId(), name, color }], updatedAt: new Date().toISOString() }
        : p
    );
    persistProjects(projects);
    return { projects };
  }),

  removeColumn: (projectId, columnId) => set((s) => {
    const projects = s.projects.map((p) =>
      p.id === projectId
        ? { ...p, columns: p.columns.filter((c) => c.id !== columnId), updatedAt: new Date().toISOString() }
        : p
    );
    persistProjects(projects);
    return { projects };
  }),

  getProject: (id) => get().projects.find((p) => p.id === id) || null,
  getActiveProjects: () => get().projects.filter((p) => !p.archived),
  getProjectsByModule: (moduleId) => get().projects.filter((p) => p.moduleId === moduleId),

  ensureFaithProjects: () => {
    const existing = get().projects;
    const missing = FAITH_BOARDS.filter(
      (fb) => !existing.some((p) => p.id === fb.id)
    );

    // Backfill moduleId for existing projects that lack it
    const moduleIdMap = Object.fromEntries(FAITH_BOARDS.filter((fb) => fb.moduleId).map((fb) => [fb.id, fb.moduleId]));
    const needsPatch = existing.some((p) => moduleIdMap[p.id] && !p.moduleId);
    if (needsPatch) {
      set((s) => {
        const projects = s.projects.map((p) =>
          moduleIdMap[p.id] && !p.moduleId ? { ...p, moduleId: moduleIdMap[p.id] } : p
        );
        persistProjects(projects);
        return { projects };
      });
    }

    // Seed tasks for any empty faith boards (idempotent)
    for (const fb of FAITH_BOARDS) {
      seedTasks(fb.id, FAITH_SEED_TASKS);
    }

    if (missing.length === 0) return;

    const newProjects = missing.map((fb) => ({
      id: fb.id,
      name: fb.name,
      description: fb.description,
      color: fb.color,
      icon: fb.icon,
      moduleId: fb.moduleId || null,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: `col_${fb.id}_${col.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: col.name,
        color: col.color,
      })),
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      _faithModule: true,
    }));

    set((s) => {
      const projects = [...s.projects, ...newProjects];
      persistProjects(projects);
      return { projects };
    });

  },

  ensureLifeProjects: () => {
    const existing = get().projects;

    // Backfill moduleId for existing projects that lack it
    const moduleIdMap = Object.fromEntries(LIFE_BOARDS.filter((lb) => lb.moduleId).map((lb) => [lb.id, lb.moduleId]));
    const needsPatch = existing.some((p) => moduleIdMap[p.id] && !p.moduleId);
    if (needsPatch) {
      set((s) => {
        const projects = s.projects.map((p) =>
          moduleIdMap[p.id] && !p.moduleId ? { ...p, moduleId: moduleIdMap[p.id] } : p
        );
        persistProjects(projects);
        return { projects };
      });
    }

    const missing = LIFE_BOARDS.filter(
      (lb) => !existing.some((p) => p.id === lb.id)
    );

    // Seed tasks for any empty life boards (idempotent)
    for (const lb of LIFE_BOARDS) {
      seedTasks(lb.id, LIFE_SEED_TASKS);
    }

    if (missing.length === 0) return;

    const newProjects = missing.map((lb) => ({
      id: lb.id,
      name: lb.name,
      description: lb.description,
      color: lb.color,
      icon: lb.icon,
      moduleId: lb.moduleId || null,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: `col_${lb.id}_${col.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: col.name,
        color: col.color,
      })),
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      _lifeModule: true,
    }));

    set((s) => {
      const projects = [...s.projects, ...newProjects];
      persistProjects(projects);
      return { projects };
    });
  },

  ensureIntellectProjects: () => {
    const existing = get().projects;

    // Backfill moduleId for existing projects that lack it
    const moduleIdMap = Object.fromEntries(INTELLECT_BOARDS.filter((ib) => ib.moduleId).map((ib) => [ib.id, ib.moduleId]));
    const needsPatch = existing.some((p) => moduleIdMap[p.id] && !p.moduleId);
    if (needsPatch) {
      set((s) => {
        const projects = s.projects.map((p) =>
          moduleIdMap[p.id] && !p.moduleId ? { ...p, moduleId: moduleIdMap[p.id] } : p
        );
        persistProjects(projects);
        return { projects };
      });
    }

    const missing = INTELLECT_BOARDS.filter(
      (ib) => !existing.some((p) => p.id === ib.id)
    );

    // Seed tasks for any empty intellect boards (idempotent)
    for (const ib of INTELLECT_BOARDS) {
      seedTasks(ib.id, INTELLECT_SEED_TASKS);
    }

    if (missing.length === 0) return;

    const newProjects = missing.map((ib) => ({
      id: ib.id,
      name: ib.name,
      description: ib.description,
      color: ib.color,
      icon: ib.icon,
      moduleId: ib.moduleId || null,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: `col_${ib.id}_${col.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: col.name,
        color: col.color,
      })),
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      _intellectModule: true,
    }));

    set((s) => {
      const projects = [...s.projects, ...newProjects];
      persistProjects(projects);
      return { projects };
    });
  },

  ensureFamilyProjects: () => {
    const existing = get().projects;

    // Backfill moduleId for existing projects that lack it
    const moduleIdMap = Object.fromEntries(FAMILY_BOARDS.filter((fb) => fb.moduleId).map((fb) => [fb.id, fb.moduleId]));
    const needsPatch = existing.some((p) => moduleIdMap[p.id] && !p.moduleId);
    if (needsPatch) {
      set((s) => {
        const projects = s.projects.map((p) =>
          moduleIdMap[p.id] && !p.moduleId ? { ...p, moduleId: moduleIdMap[p.id] } : p
        );
        persistProjects(projects);
        return { projects };
      });
    }

    const missing = FAMILY_BOARDS.filter(
      (fb) => !existing.some((p) => p.id === fb.id)
    );

    // Seed tasks for any empty family boards (idempotent)
    for (const fb of FAMILY_BOARDS) {
      seedTasks(fb.id, FAMILY_SEED_TASKS);
    }

    if (missing.length === 0) return;

    const newProjects = missing.map((fb) => ({
      id: fb.id,
      name: fb.name,
      description: fb.description,
      color: fb.color,
      icon: fb.icon,
      moduleId: fb.moduleId || null,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: `col_${fb.id}_${col.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: col.name,
        color: col.color,
      })),
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      _familyModule: true,
    }));

    set((s) => {
      const projects = [...s.projects, ...newProjects];
      persistProjects(projects);
      return { projects };
    });
  },

  ensureWealthProjects: () => {
    const existing = get().projects;

    // Backfill moduleId for existing projects that lack it
    const moduleIdMap = Object.fromEntries(WEALTH_BOARDS.filter((wb) => wb.moduleId).map((wb) => [wb.id, wb.moduleId]));
    const needsPatch = existing.some((p) => moduleIdMap[p.id] && !p.moduleId);
    if (needsPatch) {
      set((s) => {
        const projects = s.projects.map((p) =>
          moduleIdMap[p.id] && !p.moduleId ? { ...p, moduleId: moduleIdMap[p.id] } : p
        );
        persistProjects(projects);
        return { projects };
      });
    }

    const missing = WEALTH_BOARDS.filter(
      (wb) => !existing.some((p) => p.id === wb.id)
    );

    // Seed tasks for any empty wealth boards (idempotent)
    for (const wb of WEALTH_BOARDS) {
      seedTasks(wb.id, WEALTH_SEED_TASKS);
    }

    if (missing.length === 0) return;

    const newProjects = missing.map((wb) => ({
      id: wb.id,
      name: wb.name,
      description: wb.description,
      color: wb.color,
      icon: wb.icon,
      moduleId: wb.moduleId || null,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: `col_${wb.id}_${col.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: col.name,
        color: col.color,
      })),
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      _wealthModule: true,
    }));

    set((s) => {
      const projects = [...s.projects, ...newProjects];
      persistProjects(projects);
      return { projects };
    });
  },

  ensureEnvironmentProjects: () => {
    const existing = get().projects;

    // Backfill moduleId for existing projects that lack it
    const moduleIdMap = Object.fromEntries(ENVIRONMENT_BOARDS.filter((eb) => eb.moduleId).map((eb) => [eb.id, eb.moduleId]));
    const needsPatch = existing.some((p) => moduleIdMap[p.id] && !p.moduleId);
    if (needsPatch) {
      set((s) => {
        const projects = s.projects.map((p) =>
          moduleIdMap[p.id] && !p.moduleId ? { ...p, moduleId: moduleIdMap[p.id] } : p
        );
        persistProjects(projects);
        return { projects };
      });
    }

    const missing = ENVIRONMENT_BOARDS.filter(
      (eb) => !existing.some((p) => p.id === eb.id)
    );

    // Seed tasks for any empty environment boards (idempotent)
    for (const eb of ENVIRONMENT_BOARDS) {
      seedTasks(eb.id, ENVIRONMENT_SEED_TASKS);
    }

    if (missing.length === 0) return;

    const newProjects = missing.map((eb) => ({
      id: eb.id,
      name: eb.name,
      description: eb.description,
      color: eb.color,
      icon: eb.icon,
      moduleId: eb.moduleId || null,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: `col_${eb.id}_${col.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: col.name,
        color: col.color,
      })),
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      _environmentModule: true,
    }));

    set((s) => {
      const projects = [...s.projects, ...newProjects];
      persistProjects(projects);
      return { projects };
    });
  },

  ensureUmmahProjects: () => {
    const existing = get().projects;

    // Backfill moduleId for existing projects that lack it
    const moduleIdMap = Object.fromEntries(UMMAH_BOARDS.filter((ub) => ub.moduleId).map((ub) => [ub.id, ub.moduleId]));
    const needsPatch = existing.some((p) => moduleIdMap[p.id] && !p.moduleId);
    if (needsPatch) {
      set((s) => {
        const projects = s.projects.map((p) =>
          moduleIdMap[p.id] && !p.moduleId ? { ...p, moduleId: moduleIdMap[p.id] } : p
        );
        persistProjects(projects);
        return { projects };
      });
    }

    const missing = UMMAH_BOARDS.filter(
      (ub) => !existing.some((p) => p.id === ub.id)
    );

    // Seed tasks for any empty ummah boards (idempotent)
    for (const ub of UMMAH_BOARDS) {
      seedTasks(ub.id, UMMAH_SEED_TASKS);
    }

    if (missing.length === 0) return;

    const newProjects = missing.map((ub) => ({
      id: ub.id,
      name: ub.name,
      description: ub.description,
      color: ub.color,
      icon: ub.icon,
      moduleId: ub.moduleId || null,
      columns: DEFAULT_COLUMNS.map((col) => ({
        id: `col_${ub.id}_${col.name.toLowerCase().replace(/\s+/g, '_')}`,
        name: col.name,
        color: col.color,
      })),
      defaultView: 'dashboard',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
      _ummahModule: true,
    }));

    set((s) => {
      const projects = [...s.projects, ...newProjects];
      persistProjects(projects);
      return { projects };
    });
  },
}));
