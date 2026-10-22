import { useState } from 'react';
import Modal from './Modal';
import { snapshotSummary } from './first-sign-in-copy';

// Offered once per account when the old snapshot sync left a copy of it in the
// cloud (sync-snapshot.js). It renders before App, like FirstSignInSheet:
// main.jsx hands it the bring-in, the leave and a reload for when it is done.
// Nothing changes until a choice is made, and the old copy is never removed.
//
//   <SnapshotSheet savedAt={snapshot.updatedAt} onBring={…} onLeave={…} onDone={…} />

const OFFLINE = "We couldn't reach your account. Nothing on this device changed. Try again when you have a signal.";

const savedOn = (iso) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' });
};

export default function SnapshotSheet({ savedAt, onBring, onLeave, onDone }) {
  const [busy, setBusy] = useState(null); // 'bring' | 'leave'
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  async function bring() {
    setBusy('bring');
    setError('');
    try {
      setResult(await onBring());
    } catch {
      setError(OFFLINE);
    } finally {
      setBusy(null);
    }
  }

  async function leave() {
    setBusy('leave');
    setError('');
    try {
      await onLeave();
      onDone();
    } catch {
      setError('Nothing changed. Try again.');
      setBusy(null);
    }
  }

  const locked = busy !== null;
  const when = savedOn(savedAt);

  return (
    <Modal
      onClose={() => {}}
      dismissible={false}
      labelledBy="snapshot-title"
      describedBy="snapshot-body"
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
      {result ? (
        <>
          <h2 id="snapshot-title" style={{ margin: '0 0 var(--space-3)', fontSize: '1.5rem' }}>
            Your earlier records are in
          </h2>
          <div id="snapshot-body" aria-live="polite">
            {snapshotSummary(result).map((line) => (
              <p key={line} style={{ margin: '0 0 var(--space-2)', color: 'var(--text2)', fontSize: 'var(--text-sm)' }}>{line}</p>
            ))}
          </div>
          <button type="button" className="btn btn-primary" style={{ width: '100%', minHeight: 44, marginTop: 'var(--space-3)' }} onClick={onDone} autoFocus>
            Continue
          </button>
        </>
      ) : (
        <>
          <h2 id="snapshot-title" style={{ margin: '0 0 var(--space-2)', fontSize: '1.5rem' }}>
            Your account has an earlier copy
          </h2>
          <p id="snapshot-body" style={{ margin: '0 0 var(--space-3)', color: 'var(--text2)', fontSize: 'var(--text-sm)' }}>
            The earlier sync saved a copy of your records{when ? <> on <span style={{ whiteSpace: 'nowrap' }}>{when}</span></> : null}.
            {' '}Nothing on this device is changed or removed either way.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ minHeight: 44 }}
              onClick={bring}
              disabled={locked}
              aria-busy={busy === 'bring'}
              autoFocus
            >
              {busy === 'bring' ? 'Bringing in…' : 'Bring it in'}
            </button>
            <p style={{ margin: '0 0 var(--space-2)', color: 'var(--text3)', fontSize: 'var(--text-2xs)' }}>
              Records this device lacks are added. Where this device already has a record, its own copy is kept.
            </p>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ minHeight: 44 }}
              onClick={leave}
              disabled={locked}
              aria-busy={busy === 'leave'}
            >
              Leave it
            </button>
            <p style={{ margin: 0, color: 'var(--text3)', fontSize: 'var(--text-2xs)' }}>
              The earlier copy stays where it is. You won't be asked again on this device.
            </p>
          </div>

          {error && (
            <p role="alert" style={{ margin: 'var(--space-3) 0 0', color: 'var(--error)', fontSize: 'var(--text-sm)' }}>{error}</p>
          )}
        </>
      )}
    </Modal>
  );
}
