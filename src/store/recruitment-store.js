import { create } from 'zustand';
import { safeGetJSON, safeSet } from '@services/storage';

export const useRecruitmentStore = create((set, get) => ({
  postings: safeGetJSON('recruit_postings', []),

  add: (data) => {
    const posting = {
      id: 'job_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      title: data.title || '',
      openPositions: data.openPositions || 1,
      type: data.type || 'full_time',
      seniority: data.seniority || 'not_specified',
      locationType: data.locationType || 'not_specified',
      stage: data.stage || 'draft',
      description: data.description || '',
      deadline: data.deadline || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const postings = [...get().postings, posting];
    safeSet('recruit_postings', postings);
    set({ postings });
    return posting;
  },

  move: (id, newStage) => {
    const postings = get().postings.map((p) =>
      p.id === id ? { ...p, stage: newStage, updatedAt: new Date().toISOString() } : p
    );
    safeSet('recruit_postings', postings);
    set({ postings });
  },

  remove: (id) => {
    const postings = get().postings.filter((p) => p.id !== id);
    safeSet('recruit_postings', postings);
    set({ postings });
  },

  restore: (record, index) => {
    const postings = [...get().postings];
    postings.splice(Math.min(Math.max(index, 0), postings.length), 0, record);
    safeSet('recruit_postings', postings);
    set({ postings });
  },
}));
