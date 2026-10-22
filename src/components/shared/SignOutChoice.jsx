// Sign out of the account, with the choice of what happens to this device's data.
// Keeping it is the default and the first button; removing it asks again.
// The local profile and device-only settings stay either way (auth-store signOut).
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/auth-store';
import { requestConfirm } from '../../store/confirm-store';

export default function SignOutChoice() {
  const navigate = useNavigate();
  const signOut = useAuthStore((s) => s.signOut);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(null); // null | 'keep' | 'remove'
  const [error, setError] = useState(null);

  const run = async (removeData) => {
    if (busy) return;
    if (removeData && !(await requestConfirm({
      title: 'Remove your data from this device?',
      body: 'Your entries on this device are deleted. Only what is already saved to your account can come back. Your profile and device settings stay.',
      confirmLabel: 'Sign out and remove',
      danger: true,
    }))) return;
    setError(null);
    setBusy(removeData ? 'remove' : 'keep');
    const { error: err } = await signOut({ removeData });
    setBusy(null);
    if (err) {
      setError("We couldn't sign you out. Check your connection, then try again. Nothing on this device changed.");
      return;
    }
    navigate('/auth', { replace: true });
  };

  if (!open) {
    return (
      <button className="btn btn-ghost" onClick={() => setOpen(true)} style={{ justifyContent: 'center', color: 'var(--text2)' }}>
        <LogOut size={16} aria-hidden="true" /> Sign out
      </button>
    );
  }

  return (
    <div role="group" aria-labelledby="signout-q" aria-busy={!!busy} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2, 0.5rem)', padding: 'var(--space-3, 0.75rem)', border: '1px solid var(--border)', borderRadius: 'var(--radius, 8px)', width: '100%' }}>
      <span id="signout-q" style={{ fontSize: 'var(--text-sm, 0.88rem)', lineHeight: 1.5 }}>
        Sign out of your account? Your data can stay on this device, so you can keep using MIOS here.
      </span>
      <div style={{ display: 'flex', gap: 'var(--space-2, 0.5rem)', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={() => run(false)} disabled={!!busy} autoFocus>
          <LogOut size={16} aria-hidden="true" /> {busy === 'keep' ? 'Signing out…' : 'Sign out, keep my data'}
        </button>
        <button className="btn btn-ghost" onClick={() => run(true)} disabled={!!busy} style={{ color: 'var(--error, #e53935)' }}>
          {busy === 'remove' ? 'Removing…' : 'Sign out and remove it'}
        </button>
        <button className="btn btn-ghost" onClick={() => { setOpen(false); setError(null); }} disabled={!!busy}>
          Cancel
        </button>
      </div>
      {error && <p role="alert" style={{ color: 'var(--error, #e53935)', fontSize: '0.85rem', margin: 0 }}>{error}</p>}
    </div>
  );
}
