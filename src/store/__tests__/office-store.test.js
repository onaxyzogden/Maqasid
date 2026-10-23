import { describe, it, expect, beforeEach } from 'vitest';

/** A Map-backed localStorage for node. */
function memoryStorage() {
  const m = new Map();
  return {
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    clear: () => m.clear(),
  };
}

globalThis.localStorage = memoryStorage();
const { useOfficeStore } = await import('../office-store');

const stored = (key) => JSON.parse(localStorage.getItem(`bbiz_${key}`));

beforeEach(() => {
  localStorage.clear();
  useOfficeStore.setState({ messages: [], qaItems: [], announcements: [] });
});

describe('author account id', () => {
  it('keeps the account id on a chat message', () => {
    const msg = useOfficeStore.getState().addMessage({ channelId: 'chn_general', text: 'hi', author: 'Yousef', authorId: 'acct-1' });
    expect(msg.authorId).toBe('acct-1');
    expect(stored('office_messages')[0].authorId).toBe('acct-1');
  });

  it('keeps the account id on a question and its answer', () => {
    const qa = useOfficeStore.getState().addQuestion({ title: 'Q', body: 'B', author: 'Yousef', authorId: 'acct-1' });
    useOfficeStore.getState().addAnswer(qa.id, { text: 'A', author: 'Yousef', authorId: 'acct-1' });
    const saved = stored('office_qa')[0];
    expect(saved.authorId).toBe('acct-1');
    expect(saved.answers[0].authorId).toBe('acct-1');
  });

  it('keeps the account id on an announcement', () => {
    const ann = useOfficeStore.getState().addAnnouncement({ title: 'T', body: 'B', author: 'Yousef', authorId: 'acct-1' });
    expect(ann.authorId).toBe('acct-1');
    expect(stored('office_announcements')[0].authorId).toBe('acct-1');
  });

  it('stores null when written signed out', () => {
    const msg = useOfficeStore.getState().addMessage({ channelId: 'chn_general', text: 'hi', author: 'Yousef' });
    expect(msg.authorId).toBe(null);
  });
});
