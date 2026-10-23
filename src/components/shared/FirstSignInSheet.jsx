import { useState } from 'react';
import Modal from './Modal';
import { intro, summary } from './first-sign-in-copy';

// The first sign-in on a device that already holds records of its own. It
// renders before App, so it has no stores, no router and no requestConfirm:
// main.jsx hands it the choice (sync-first.js chooseFirst), the sign-out and
// a reload for when it is done. Nothing is sent or pulled until a choice is made.
//
//   <FirstSignInSheet counts={ready.counts} onChoose={…} onSignOut={…} onDone={…} />

const areaName = (collection) => {
  const words = collection.replace(/_/g, ' ');
  return words.charAt(0).toUpperCase() + words.slice(1);
};

const OFFLINE = "We couldn't reach your account. Nothing on this device changed. Try again when you have a signal.";

export default function FirstSignInSheet({ counts, onChoose, onSignOut, onDone }) {
  const [busy, setBusy] = useState(null); // 'add' | 'empty' | 'signout'
  const [error, setError] = useState('');
  const [done, setDone] = useState(null); // { choice, result }
  const [looking, setLooking] = useState(false);

  async function choose(choice) {
    setBusy(choice);
    setError('');
    try {
      setDone({ choice, result: await onChoose(choice) });
    } catch (e) {
      setError(choice === 'add' ? OFFLINE : e?.message || 'Nothing was removed. Try again.');
    } finally {
      setBusy(null);
    }
  }

  async function signOut() {
    setBusy('signout');
    setError('');
    try {
      await onSignOut();
    } catch {
      setError("We couldn't sign you out. Your records on this device are untouched. Try again.");
      setBusy(null);
    }
  }

  const locked = busy !== null;

  return (
    <Modal
      onClose={() => {}}
      dismissible={false}
      labelledBy="first-sign-in-title"
      describedBy="first-sign-in-body"
      overlayClassName=""
      overlayStyle={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}
      className=""
      style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16,
        padding: '2rem', width: '100%', maxWidth: 440, maxHeight: 'calc(100dvh - 2rem)',
        overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.25)', minWidth: 0,
        fontFamily: 'var(--font-body)', color: 'var(--text)',
      }}
    >
      {done ? (
        <>
          <h2 id="first-sign-in-title" style={{ margin: '0 0 var(--space-3)', fontSize: '1.5rem' }}>
            {done.choice === 'add' ? 'This device is joined to your account' : 'Your account starts empty'}
          </h2>
          <div id="first-sign-in-body" aria-live="polite">
            {summary(done.choice, done.result).map((line) => (
              <p key={line} style={{ margin: '0 0 var(--space-2)', color: 'var(--text2)', fontSize: 'var(--text-sm)' }}>{line}</p>
            ))}
          </div>
          <button type="button" className="btn btn-primary" style={{ width: '100%', minHeight: 44, marginTop: 'var(--space-3)' }} onClick={onDone} autoFocus>
            Continue
          </button>
        </>
      ) : (
        <>
          <h2 id="first-sign-in-title" style={{ margin: '0 0 var(--space-2)', fontSize: '1.5rem' }}>
            This device already has records
          </h2>
          <p id="first-sign-in-body" style={{ margin: '0 0 var(--space-3)', color: 'var(--text2)', fontSize: 'var(--text-sm)' }}>
            {intro(counts.total)}
            Nothing is sent or changed until you choose.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ minHeight: 44 }}
              onClick={() => choose('add')}
              disabled={locked}
              aria-busy={busy === 'add'}
              autoFocus
            >
              {busy === 'add' ? 'Adding…' : 'Add this device’s records'}
            </button>
            <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text3)', fontSize: 'var(--text-2xs)' }}>
              They join your account. Where your account holds a different copy, both are kept for you to choose.
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ minHeight: 44 }}
              onClick={() => choose('empty')}
              disabled={locked}
              aria-busy={busy === 'empty'}
            >
              {busy === 'empty' ? 'Setting aside…' : 'Start this account empty'}
            </button>
            <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text3)', fontSize: 'var(--text-2xs)' }}>
              The records are kept on this device, never sent, and can be put back when you sign out.
            </p>
          </div>

          {error && (
            <p role="alert" style={{ margin: '0 0 var(--space-3)', color: 'var(--error)', fontSize: 'var(--text-sm)' }}>{error}</p>
          )}

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 'var(--space-2)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'space-between' }}>
            <button
              type="button"
              className="btn btn-ghost"
              style={{ minHeight: 44 }}
              aria-expanded={looking}
              aria-controls="first-sign-in-list"
              onClick={() => setLooking((v) => !v)}
              disabled={locked}
            >
              {looking ? 'Hide the list' : 'Look through first'}
            </button>
            <button type="button" className="btn btn-ghost" style={{ minHeight: 44 }} onClick={signOut} disabled={locked}>
              {busy === 'signout' ? 'Signing out…' : 'Sign out instead'}
            </button>
          </div>

          {looking && (
            <ul id="first-sign-in-list" style={{ listStyle: 'none', margin: 'var(--space-2) 0 0', padding: 0, maxHeight: 240, overflowY: 'auto', minWidth: 0 }}>
              {counts.areas.map((area) => (
                <li key={area.collection} style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border)', minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
                    <span style={{ fontWeight: 600, minWidth: 0, overflowWrap: 'anywhere' }}>{areaName(area.collection)}</span>
                    <span style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', color: 'var(--text2)' }}>{area.count}</span>
                  </div>
                  <p style={{ margin: '2px 0 0', color: 'var(--text3)', fontSize: 'var(--text-2xs)', overflowWrap: 'anywhere' }}>
                    {area.items.slice(0, 5).join(' · ')}{area.items.length > 5 ? ` · and ${area.items.length - 5} more` : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </Modal>
  );
}
