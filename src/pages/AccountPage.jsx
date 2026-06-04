import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, RefreshCw, LogOut, Trash2, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { formatDistanceToNow } from 'date-fns';
import SyncStatusChip from '../components/shared/SyncStatusChip';

export default function AccountPage() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const supabaseSession = useAuthStore((s) => s.supabaseSession);
  const syncStatus = useAuthStore((s) => s.syncStatus);
  const lastSyncedAt = useAuthStore((s) => s.lastSyncedAt);
  const updateUser = useAuthStore((s) => s.updateUser);
  const signOut = useAuthStore((s) => s.signOut);
  const syncNow = useAuthStore((s) => s.syncNow);
  const sendMagicLink = useAuthStore((s) => s.sendMagicLink);

  const [name, setName] = useState(user?.name || '');
  const [org, setOrg] = useState(user?.org || '');
  const [saved, setSaved] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [pwResetSent, setPwResetSent] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const email = supabaseSession?.user?.email;

  const handleSaveProfile = () => {
    updateUser({ name: name.trim(), org: org.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSyncNow = async () => {
    setSyncing(true);
    await syncNow();
    setSyncing(false);
  };

  const handlePasswordReset = async () => {
    if (!email) return;
    await sendMagicLink(email);
    setPwResetSent(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const sectionStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.25rem',
  };
  const labelStyle = { display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' };
  const inputStyle = {
    width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px',
    border: '1px solid var(--border)', background: 'var(--surface-2)',
    color: 'var(--text)', fontSize: '0.92rem', boxSizing: 'border-box',
  };

  return (
    <div style={{ maxWidth: '560px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text)' }}>Account</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
        Manage your profile and cloud sync settings.
      </p>

      {/* Profile */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <User size={16} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>Profile</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <label style={labelStyle}>Display name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Organization</label>
            <input value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Optional" style={inputStyle} />
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          style={{ padding: '0.55rem 1.25rem', borderRadius: '8px', border: 'none', background: saved ? 'var(--success, #4caf50)' : 'var(--accent)', color: '#fff', cursor: 'pointer', fontWeight: 500, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          {saved ? <><CheckCircle size={14} /> Saved</> : 'Save changes'}
        </button>
      </div>

      {/* Account */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Mail size={16} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>Account</h2>
        </div>
        {email && (
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Signed in as <strong style={{ color: 'var(--text)' }}>{email}</strong>
          </p>
        )}
        {!pwResetSent ? (
          <button
            onClick={handlePasswordReset}
            style={{ padding: '0.55rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '0.88rem' }}
          >
            Send password reset email
          </button>
        ) : (
          <p style={{ color: 'var(--success, #4caf50)', fontSize: '0.88rem' }}>
            <CheckCircle size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
            Reset link sent to {email}
          </p>
        )}
      </div>

      {/* Sync */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <RefreshCw size={16} style={{ color: 'var(--accent)' }} />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>Sync</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <SyncStatusChip collapsed={false} />
            {lastSyncedAt && (
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginLeft: '0.6rem' }}>
                Last synced {formatDistanceToNow(new Date(lastSyncedAt), { addSuffix: true })}
              </p>
            )}
          </div>
          <button
            onClick={handleSyncNow}
            disabled={syncing || syncStatus === 'syncing'}
            style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: syncing ? 'not-allowed' : 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', opacity: syncing ? 0.6 : 1 }}
          >
            <RefreshCw size={14} style={{ animation: syncing ? 'spin 1s linear infinite' : undefined }} />
            {syncing ? 'Syncing...' : 'Sync now'}
          </button>
        </div>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Your data syncs automatically every 30 seconds after a change and every 5 minutes in the background.
          Task attachments are kept on the originating device only.
        </p>
      </div>

      {/* Danger zone */}
      <div style={{ ...sectionStyle, borderColor: 'var(--error-muted, rgba(229,57,53,0.25))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <AlertTriangle size={16} style={{ color: 'var(--error, #e53935)' }} />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--error, #e53935)', margin: 0 }}>Danger zone</h2>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={handleSignOut}
            style={{ padding: '0.55rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LogOut size={14} /> Sign out
          </button>
          {!deleteConfirm ? (
            <button
              onClick={() => setDeleteConfirm(true)}
              style={{ padding: '0.55rem 1.25rem', borderRadius: '8px', border: '1px solid var(--error-muted, rgba(229,57,53,0.4))', background: 'transparent', color: 'var(--error, #e53935)', cursor: 'pointer', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Trash2 size={14} /> Delete account
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Are you sure? This cannot be undone.</span>
              <button
                onClick={async () => {
                  if (supabaseSession) {
                    const { supabase } = await import('../services/supabase');
                    await supabase?.from('user_snapshots').delete().eq('user_id', supabaseSession.user.id);
                    await supabase?.auth.admin?.deleteUser(supabaseSession.user.id).catch(() => {
                      // Fallback: sign out — full deletion requires server-side admin key
                      handleSignOut();
                    });
                  }
                  await handleSignOut();
                }}
                style={{ padding: '0.45rem 0.9rem', borderRadius: '8px', border: 'none', background: 'var(--error, #e53935)', color: '#fff', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                Yes, delete
              </button>
              <button onClick={() => setDeleteConfirm(false)} style={{ padding: '0.45rem 0.9rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.82rem' }}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
