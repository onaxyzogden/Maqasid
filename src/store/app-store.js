import { create } from 'zustand';
import { safeGet, safeSet } from '../services/storage';

const EMPTY_FILTERS = { priorities: [], dueDate: null, tags: [] };

function safeGetJSON(key, fallback) {
  try { const v = safeGet(key, null); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

export const useAppStore = create((set, get) => ({
  sidebarOpen: safeGet('sb_open', 'true') === 'true',
  sidebarWidthPx: Math.max(120, Math.min(400, parseInt(safeGet('sb_width_px', '248'), 10))),
  islamicPanelOpen: safeGet('il_open', 'false') === 'true',
  islamicPanelWidthPx: Math.max(200, Math.min(500, parseInt(safeGet('ip_width_px', '280'), 10))),
  searchOpen: false,
  reflectionOpen: false,
  discussionOpen: false,
  activeModule: safeGet('module', 'work'),
  expandedPillars: safeGetJSON('pillars_exp', {}),
  filters: {}, // { [projectId]: { priorities: [], dueDate: null, tags: [] } }
  activeBbosStage: null, // string | null — BBOS stage ID currently selected in the pipeline header
  activeBbosTaskType: null, // string | null — BBOS task type currently open in BbosTaskPanel
  citationsVisible: false,
  niyyahOverrideOpen: false,

  // Ayah banner — contextual Quran/Hadith in topbar
  ayahBannerData: null,
  ayahBannerCollapsed: safeGet('ayah_collapsed', 'false') === 'true',

  toggleSidebar: () => set((s) => {
    const v = !s.sidebarOpen;
    safeSet('sb_open', String(v));
    return { sidebarOpen: v };
  }),

  setSidebarWidth: (w) => {
    const clamped = Math.max(120, Math.min(400, Math.round(w)));
    safeSet('sb_width_px', String(clamped));
    set({ sidebarWidthPx: clamped, sidebarOpen: true });
  },

  setIslamicPanelWidth: (w) => {
    const clamped = Math.max(200, Math.min(500, Math.round(w)));
    safeSet('ip_width_px', String(clamped));
    set({ islamicPanelWidthPx: clamped, islamicPanelOpen: true });
  },

  toggleIslamicPanel: () => set((s) => {
    const v = !s.islamicPanelOpen;
    safeSet('il_open', String(v));
    return { islamicPanelOpen: v };
  }),

  setSearchOpen: (open) => set({ searchOpen: open }),
  setReflectionOpen: (open) => set({ reflectionOpen: open }),
  setDiscussionOpen: (open) => set({ discussionOpen: open }),

  togglePillar: (pillarId) => set((s) => {
    const next = { ...s.expandedPillars, [pillarId]: !s.expandedPillars[pillarId] };
    safeSet('pillars_exp', JSON.stringify(next));
    return { expandedPillars: next };
  }),

  collapseAllPillars: () => {
    safeSet('pillars_exp', JSON.stringify({}));
    set({ expandedPillars: {} });
  },

  setActiveModule: (mod) => {
    safeSet('module', mod);
    set({ activeModule: mod });
  },

  setFilters: (projectId, partial) => set((s) => {
    const current = s.filters[projectId] || { ...EMPTY_FILTERS };
    return { filters: { ...s.filters, [projectId]: { ...current, ...partial } } };
  }),

  clearFilters: (projectId) => set((s) => ({
    filters: { ...s.filters, [projectId]: { ...EMPTY_FILTERS } },
  })),

  setActiveBbosStage: (stageId) => set({ activeBbosStage: stageId }),
  clearActiveBbosStage: () => set({ activeBbosStage: null }),

  setActiveBbosTaskType: (taskType) => set({ activeBbosTaskType: taskType }),
  clearActiveBbosTaskType: () => set({ activeBbosTaskType: null }),

  toggleCitations: () => set((s) => ({ citationsVisible: !s.citationsVisible })),

  openNiyyahOverride: () => set({ niyyahOverrideOpen: true }),
  closeNiyyahOverride: () => set({ niyyahOverrideOpen: false }),

  setAyahBannerData: (data) => set({ ayahBannerData: data }),
  clearAyahBannerData: () => set({ ayahBannerData: null }),
  toggleAyahBannerCollapsed: () => set((s) => {
    const v = !s.ayahBannerCollapsed;
    safeSet('ayah_collapsed', String(v));
    return { ayahBannerCollapsed: v };
  }),

  getActiveFilterCount: (projectId) => {
    const f = get().filters[projectId];
    if (!f) return 0;
    return (f.priorities?.length || 0) + (f.dueDate ? 1 : 0) + (f.tags?.length || 0);
  },
}));
