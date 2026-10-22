import { describe, it, expect, vi } from 'vitest';
import { switchOn, buildSwitches } from '../../../build-switches.js';
import { noSignal, startAuth, renewedUser } from '../cloud-auth';

const session = (id) => ({ user: { id, email: `${id}@example.com` } });
const offlineError = () => Object.assign(new Error('Failed to fetch'), { name: 'AuthRetryableFetchError' });

/** A stand-in for supabase-js's auth client: getSession answers once, events are fired by hand. */
function fakeClient({ getSession = { data: { session: null }, error: null }, refresh } = {}) {
  let listener = null;
  const unsubscribe = vi.fn();
  return {
    fire: (event, s) => listener(event, s),
    unsubscribe,
    auth: {
      getSession: vi.fn(async () => getSession),
      onAuthStateChange: vi.fn((cb) => { listener = cb; return { data: { subscription: { unsubscribe } } }; }),
      refreshSession: vi.fn(refresh ?? (async () => ({ data: { session: null }, error: null }))),
    },
  };
}

describe('build switches', () => {
  it('are off when unset, empty or anything but 1', () => {
    expect(switchOn(undefined)).toBe(false);
    expect(switchOn('')).toBe(false);
    expect(switchOn('true')).toBe(false);
    expect(switchOn('0')).toBe(false);
    expect(switchOn('1')).toBe(true);
  });

  it('become define constants that are false with an empty environment', () => {
    expect(buildSwitches({})).toEqual({ __CLOUD_ACCOUNTS__: 'false', __OFFLINE_SHELL__: 'false' });
    expect(buildSwitches({ VITE_CLOUD_ACCOUNTS: '1' })).toEqual({ __CLOUD_ACCOUNTS__: 'true', __OFFLINE_SHELL__: 'false' });
  });

  it('are off in the test build', () => {
    expect(__CLOUD_ACCOUNTS__).toBe(false);
    expect(__OFFLINE_SHELL__).toBe(false);
  });
});

describe('noSignal', () => {
  it('is true only for a request that never reached the server', () => {
    expect(noSignal(offlineError())).toBe(true);
    expect(noSignal(new Error('Invalid Refresh Token'))).toBe(false);
    expect(noSignal(null)).toBe(false);
  });
});

describe('startAuth', () => {
  it('reports signed-in for a stored session', async () => {
    const client = fakeClient({ getSession: { data: { session: session('a') }, error: null } });
    const states = [];
    startAuth(client, (s) => states.push(s));
    await vi.waitFor(() => expect(states).toHaveLength(1));
    expect(states[0]).toEqual({ status: 'signed-in', session: session('a') });
  });

  it('reports signed-out when there is no session', async () => {
    const client = fakeClient();
    const states = [];
    startAuth(client, (s) => states.push(s));
    await vi.waitFor(() => expect(states).toEqual([{ status: 'signed-out', session: null }]));
  });

  it('reports offline when the sign-in could not be renewed with no signal', async () => {
    const client = fakeClient({ getSession: { data: { session: null }, error: offlineError() } });
    const states = [];
    startAuth(client, (s) => states.push(s));
    await vi.waitFor(() => expect(states).toEqual([{ status: 'offline', session: null }]));
  });

  it('reports signed-out when the renewal was refused, not offline', async () => {
    const client = fakeClient({ getSession: { data: { session: null }, error: new Error('Invalid Refresh Token') } });
    const states = [];
    startAuth(client, (s) => states.push(s));
    await vi.waitFor(() => expect(states).toEqual([{ status: 'signed-out', session: null }]));
  });

  it('ignores INITIAL_SESSION, which repeats getSession (as null when renewal failed offline)', async () => {
    const client = fakeClient({ getSession: { data: { session: null }, error: offlineError() } });
    const states = [];
    startAuth(client, (s) => states.push(s));
    await vi.waitFor(() => expect(states).toHaveLength(1));
    client.fire('INITIAL_SESSION', null);
    expect(states).toEqual([{ status: 'offline', session: null }]);
  });

  it('follows later sign-in and sign-out events', async () => {
    const client = fakeClient();
    const states = [];
    startAuth(client, (s) => states.push(s));
    await vi.waitFor(() => expect(states).toHaveLength(1));
    client.fire('SIGNED_IN', session('b'));
    client.fire('SIGNED_OUT', null);
    expect(states.slice(1)).toEqual([
      { status: 'signed-in', session: session('b') },
      { status: 'signed-out', session: null },
    ]);
  });

  it('returns a stop function that ends the subscription', () => {
    const client = fakeClient();
    const stop = startAuth(client, () => {});
    stop();
    expect(client.unsubscribe).toHaveBeenCalled();
  });
});

describe('renewedUser', () => {
  it("says whose the fresh session is", async () => {
    const client = fakeClient({ refresh: async () => ({ data: { session: session('c') }, error: null }) });
    expect(await renewedUser(client)).toBe('c');
  });

  it('is null when renewal fails, throws, or there is no client', async () => {
    expect(await renewedUser(fakeClient({ refresh: async () => ({ data: { session: null }, error: offlineError() }) }))).toBe(null);
    expect(await renewedUser(fakeClient({ refresh: async () => { throw offlineError(); } }))).toBe(null);
    expect(await renewedUser(null)).toBe(null);
  });
});
