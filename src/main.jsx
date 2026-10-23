import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/tokens.css';
import './styles/global.css';
import '@ogden/ui-components/style.css';
import './styles/level-navigator-responsive.css'; // mobile stacked-rows override - must load AFTER the package CSS
import { runMigrations } from './services/migration';
import { supabase, cloudAccountsEnabled } from './services/supabase';
import { renewedUser } from './services/cloud-auth';
import { createServer } from './services/sync-server';
import { prepareSync, startSync } from './services/sync-boot';
import { cloudOwner, setOwnerSource } from './services/sync-owner';
import { chooseFirst } from './services/sync-first';
import { importSnapshot, leaveSnapshot, noSnapshot, readSnapshot, snapshotState } from './services/sync-snapshot';
import { shelfStore, within } from './services/offline-store';
import { listKeys, onStoredChange, safeGet } from './services/storage';

// Init theme from storage
const savedTheme = localStorage.getItem('bbiz_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Disable infinite animations under the Claude Code preview window so the
// MCP screenshot tool can capture frames (the renderer waits for paint to
// settle, which never happens with an endless marquee).
if (typeof navigator !== 'undefined' && /Claude\//.test(navigator.userAgent)) {
  document.documentElement.classList.add('reduce-motion');
}

// Run data migrations synchronously before React mounts
runMigrations();

/** The account this device last signed in to, read from the device; null for a guest or when it takes too long. */
async function savedOwner() {
  if (!cloudAccountsEnabled) return null;
  const got = await within(supabase.auth.getSession().catch(() => null), 2000);
  return got?.data?.session?.user?.id ?? null;
}

/**
 * The account's copy from the old snapshot sync, when it has one and this device
 * has not answered for it yet; null otherwise. With no signal it is skipped
 * quietly and offered on a later visit.
 */
async function snapshotOffer({ owner, meta }) {
  if (await snapshotState(meta, owner)) return null;
  const got = await within(readSnapshot(supabase, owner).then((snapshot) => ({ snapshot }), () => null), 2000);
  if (!got) return null;
  if (!got.snapshot) {
    await noSnapshot(meta, owner);
    return null;
  }
  return got.snapshot;
}

// The stores read localStorage when they are first imported, so the account's
// changes are pulled before App (and the stores with it) is imported. A guest
// skips all of this: no IndexedDB, no outbox, no network.
(async () => {
  const server = cloudAccountsEnabled ? createServer(supabase) : null;
  let ready = null;
  try {
    const owner = await savedOwner();
    ready = await prepareSync({
      owner,
      server,
      onLate: () => window.dispatchEvent(new Event('mios:pull-late')),
    });
  } catch (e) {
    console.warn('[bbiz] record sync did not start:', e);
  }

  // The first sign-in on a device holding records of its own: the sheet asks
  // before App (and the stores) load, and the page starts over once it is answered.
  if (ready?.undecided) {
    const { default: FirstSignInSheet } = await import('./components/shared/FirstSignInSheet');
    const restart = () => window.location.reload();
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <FirstSignInSheet
          counts={ready.counts}
          onChoose={(choice) => chooseFirst({ choice, ready, server, openShelf: () => shelfStore() })}
          onSignOut={async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            restart();
          }}
          onDone={restart}
        />
      </React.StrictMode>
    );
    return;
  }

  // An account the old snapshot sync saved a copy of: offered once, before App,
  // and the page starts over once it is answered.
  const snapshot = ready ? await snapshotOffer(ready).catch(() => null) : null;
  if (snapshot) {
    const { default: SnapshotSheet } = await import('./components/shared/SnapshotSheet');
    const { owner, meta, book, outbox } = ready;
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <SnapshotSheet
          savedAt={snapshot.updatedAt}
          onBring={() => importSnapshot({ owner, server, meta, book, outbox, snapshot: snapshot.data })}
          onLeave={() => leaveSnapshot(meta, owner)}
          onDone={() => window.location.reload()}
        />
      </React.StrictMode>
    );
    return;
  }

  const [{ default: App }, { useAuthStore }, { invoiceNumbers }] = await Promise.all([
    import('./App'),
    import('./store/auth-store'),
    import('./store/money-store'),
  ]);

  // While sign-in is still being read, or can't be renewed with no signal, the
  // device keeps working in the account it opened in, so offline changes wait
  // for that account rather than being treated as a guest's.
  if (ready) {
    setOwnerSource(() => {
      const { authStatus, supabaseSession } = useAuthStore.getState();
      if (authStatus === 'loading' || authStatus === 'offline') return ready.owner;
      return supabaseSession?.user?.id ?? null;
    });
  }

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );

  // Signing in during a visit that opened signed out starts the page over, so
  // the record sync (and the first-sign-in sheet) run for the new account.
  if (!ready && cloudAccountsEnabled) {
    useAuthStore.subscribe((now, before) => {
      if (before.authStatus === 'signed-out' && now.authStatus === 'signed-in') window.location.reload();
    });
  }

  if (!ready) return;
  startSync({
    ready,
    owner: cloudOwner,
    renew: () => renewedUser(supabase),
    server,
    invoices: invoiceNumbers,
    keys: listKeys(''),
    read: (key) => safeGet(key, undefined),
    watch: onStoredChange,
  });
})();
