import { create } from 'zustand';
import { safeGet, safeGetJSON, safeSet } from '../services/storage';

const DEFAULT_CHECKLIST = [
  { id: 'profile', completed: true },
  { id: 'first-task', completed: false },
  { id: 'sources', completed: false },
  { id: 'second-pillar', completed: false },
  { id: 'weekly-review', completed: false },
];

export const useOnboardingStore = create((set) => {
  // ── Read initial state from storage ──
  const wizardIntent = safeGet('onboarding_wizard_intent', null) || null;
  const tourCompleted = safeGet('onboarding_tour_completed', 'false') === 'true';
  const checklistItems = safeGetJSON('onboarding_checklist', DEFAULT_CHECKLIST);
  const seenPillars = safeGetJSON('onboarding_seen_pillars', []);
  const firstSubmodule = safeGet('onboarding_first_submodule', null) || null;
  const firstLoginAt = safeGetJSON('onboarding_first_login_at', null);
  const checklistDismissed = safeGet('onboarding_checklist_dismissed', 'false') === 'true';

  return {
    // ── State ──
    wizardIntent,
    tourCompleted,
    checklistItems,
    seenPillars,
    firstSubmodule,
    firstLoginAt,
    checklistDismissed,

    // ── Actions ──
    setWizardIntent: (intent) => {
      safeSet('onboarding_wizard_intent', intent ?? '');
      set({ wizardIntent: intent });
    },

    completeTourStep: () => {
      safeSet('onboarding_tour_completed', 'true');
      set({ tourCompleted: true });
    },

    completeChecklistItem: (id) =>
      set((state) => {
        const newItems = state.checklistItems.map((item) =>
          item.id === id ? { ...item, completed: true } : item
        );
        safeSet('onboarding_checklist', newItems);
        return { checklistItems: newItems };
      }),

    markPillarSeen: (pillarId) =>
      set((state) => {
        const newPillars = state.seenPillars.includes(pillarId)
          ? state.seenPillars
          : [...state.seenPillars, pillarId];
        safeSet('onboarding_seen_pillars', newPillars);
        return { seenPillars: newPillars };
      }),

    setFirstSubmodule: (submoduleId) => {
      safeSet('onboarding_first_submodule', submoduleId ?? '');
      set({ firstSubmodule: submoduleId });
    },

    recordFirstLogin: () =>
      set((state) => {
        if (state.firstLoginAt === null) {
          const t = Date.now();
          safeSet('onboarding_first_login_at', t);
          return { firstLoginAt: t };
        }
        return {};
      }),

    dismissChecklist: () => {
      safeSet('onboarding_checklist_dismissed', 'true');
      set({ checklistDismissed: true });
    },

    disableOnboarding: () => {
      const ALL_PILLARS = ['faith', 'life', 'intellect', 'family', 'wealth', 'environment', 'ummah'];
      safeSet('onboarding_tour_completed', 'true');
      safeSet('onboarding_checklist_dismissed', 'true');
      safeSet('onboarding_seen_pillars', ALL_PILLARS);
      set({
        tourCompleted: true,
        checklistDismissed: true,
        seenPillars: ALL_PILLARS,
      });
    },

    resetOnboarding: () => {
      safeSet('onboarding_tour_completed', 'false');
      safeSet('onboarding_checklist_dismissed', 'false');
      safeSet('onboarding_seen_pillars', []);
      safeSet('onboarding_checklist', DEFAULT_CHECKLIST);
      safeSet('onboarding_first_login_at', null);
      set({
        tourCompleted: false,
        checklistDismissed: false,
        seenPillars: [],
        checklistItems: DEFAULT_CHECKLIST,
        firstLoginAt: null,
      });
    },
  };
});
