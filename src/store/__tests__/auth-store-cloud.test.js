import { describe, it, expect, beforeEach, vi } from 'vitest';

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
const { useAuthStore } = await import('../auth-store');

const signedInClient = (signOutResult = { error: null }) => ({
  auth: { signOut: vi.fn(async () => signOutResult) },
});

const bbizKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
  return keys.filter((k) => k.startsWith('bbiz_')).sort();
};

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem('bbiz_user', JSON.stringify({ id: 'p1', name: 'Yousef' }));
  localStorage.setItem('bbiz_user_prev', JSON.stringify({ id: 'p1' }));
  localStorage.setItem('bbiz_expenses', JSON.stringify([{ id: 'e1' }]));
  localStorage.setItem('bbiz_tasks_x', JSON.stringify([{ id: 't1' }]));
  localStorage.setItem('bbiz_ai_api_key', 'device-only');
  localStorage.setItem('bbiz_sb_open', 'true');
  useAuthStore.setState({ authStatus: 'signed-in', supabaseSession: { user: { id: 'a' } } });
});

describe('initAuth', () => {
  it('stays guest with no client (switch off or no keys)', async () => {
    useAuthStore.setState({ authStatus: 'loading' });
    await useAuthStore.getState().initAuth(null);
    expect(useAuthStore.getState().authStatus).toBe('guest');
  });
});

describe('signOut', () => {
  it('keeps every bbiz_ key by default', async () => {
    const before = bbizKeys();
    const client = signedInClient();
    await useAuthStore.getState().signOut({}, client);
    expect(client.auth.signOut).toHaveBeenCalled();
    expect(bbizKeys()).toEqual(before);
    expect(useAuthStore.getState().authStatus).toBe('signed-out');
    expect(useAuthStore.getState().supabaseSession).toBe(null);
  });

  it('removes the account data only when asked, keeping the local profile and device-only keys', async () => {
    await useAuthStore.getState().signOut({ removeData: true }, signedInClient());
    expect(bbizKeys()).toEqual(['bbiz_ai_api_key', 'bbiz_sb_open', 'bbiz_user', 'bbiz_user_prev']);
    expect(JSON.parse(localStorage.getItem('bbiz_user'))).toEqual({ id: 'p1', name: 'Yousef' });
  });

  it('keeps data and the session when Supabase refuses to sign out', async () => {
    const before = bbizKeys();
    const result = await useAuthStore.getState().signOut({ removeData: true }, signedInClient({ error: new Error('nope') }));
    expect(result.error).toBeTruthy();
    expect(bbizKeys()).toEqual(before);
    expect(useAuthStore.getState().authStatus).toBe('signed-in');
  });
});

describe('sendCode', () => {
  it('emails a code that also links back to this app', async () => {
    const client = { auth: { signInWithOtp: vi.fn(async () => ({ error: null })) } };
    const result = await useAuthStore.getState().sendCode(' me@example.com ', client, 'https://mios.test');
    expect(client.auth.signInWithOtp).toHaveBeenCalledWith({
      email: 'me@example.com',
      options: { emailRedirectTo: 'https://mios.test' },
    });
    expect(result).toEqual({ error: null });
  });

  it('returns the error when the email could not be sent', async () => {
    const error = { status: 429, message: 'rate limit' };
    const client = { auth: { signInWithOtp: vi.fn(async () => ({ error })) } };
    expect(await useAuthStore.getState().sendCode('me@example.com', client, 'x')).toEqual({ error });
  });
});

describe('verifyCode', () => {
  it('checks the code with spaces removed', async () => {
    const client = { auth: { verifyOtp: vi.fn(async () => ({ error: null })) } };
    await useAuthStore.getState().verifyCode('me@example.com', ' 123 456 ', client);
    expect(client.auth.verifyOtp).toHaveBeenCalledWith({ email: 'me@example.com', token: '123456', type: 'email' });
  });

  it('turns a thrown network failure into an error', async () => {
    const client = { auth: { verifyOtp: vi.fn(async () => { throw new Error('Failed to fetch'); }) } };
    const { error } = await useAuthStore.getState().verifyCode('me@example.com', '123456', client);
    expect(error.message).toBe('Failed to fetch');
  });
});
