import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOnboardingStore = create(
  persist(
    (set) => ({
      // ── State ──
      wizardIntent: null,
      tourCompleted: false,
      checklistItems: [
        { id: 'profile', completed: true },
        { id: 'first-task', completed: false },
        { id: 'sources', completed: false },
        { id: 'second-pillar', completed: false },
        { id: 'weekly-review', completed: false },
      ],
      seenPillars: [],
      firstSubmodule: null,
      firstLoginAt: null,

      // ── Actions ──
      setWizardIntent: (intent) => set({ wizardIntent: intent }),

      completeTourStep: () => set({ tourCompleted: true }),

      completeChecklistItem: (id) =>
        set((state) => ({
          checklistItems: state.checklistItems.map((item) =>
            item.id === id ? { ...item, completed: true } : item
          ),
        })),

      markPillarSeen: (pillarId) =>
        set((state) => ({
          seenPillars: state.seenPillars.includes(pillarId)
            ? state.seenPillars
            : [...state.seenPillars, pillarId],
        })),

      setFirstSubmodule: (submoduleId) => set({ firstSubmodule: submoduleId }),

      recordFirstLogin: () =>
        set((state) => ({
          firstLoginAt: state.firstLoginAt === null ? Date.now() : state.firstLoginAt,
        })),
    }),
    {
      name: 'maqasid-onboarding',
      version: 1,
    }
  )
);
