import { useState } from 'react';
import { User, Mail, CheckCircle, WifiOff } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import SignOutChoice from '../components/shared/SignOutChoice';

export default function AccountPage() {
  const user = useAuthStore((s) => s.user);
  const supabaseSession = useAuthStore((s) => s.supabaseSession);
  const authStatus = useAuthStore((s) => s.authStatus);
  const updateUser = useAuthStore((s) => s.updateUser);

  const [name, setName] = useState(user?.name || '');
  const [org, setOrg] = useState(user?.org || '');
  const [saved, setSaved] = useState(false);

  const email = supabaseSession?.user?.email;

  const handleSaveProfile = () => {
    updateUser({ name: name.trim(), org: org.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
        Your profile and the account you're signed in to.
      </p>

      {/* Profile */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <User size={16} style={{ color: 'var(--accent)' }} aria-hidden="true" />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>Profile</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <label htmlFor="account-name" style={labelStyle}>Display name</label>
            <input id="account-name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="account-org" style={labelStyle}>Organization (optional)</label>
            <input id="account-org" autoComplete="organization" value={org} onChange={(e) => setOrg(e.target.value)} style={inputStyle} />
          </div>
        </div>
        <button
          onClick={handleSaveProfile}
          style={{ padding: '0.55rem 1.25rem', minHeight: '44px', borderRadius: '8px', border: 'none', background: saved ? 'var(--success, #4caf50)' : 'var(--accent)', color: '#fff', cursor: 'pointer', fontWeight: 500, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
        >
          {saved ? <><CheckCircle size={14} aria-hidden="true" /> Saved</> : 'Save changes'}
        </button>
      </div>

      {/* Account */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Mail size={16} style={{ color: 'var(--accent)' }} aria-hidden="true" />
          <h2 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', margin: 0 }}>Signed in</h2>
        </div>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', margin: '0 0 1rem' }}>
          {email ? <>Signed in as <strong style={{ color: 'var(--text)' }}>{email}</strong></> : 'Signed in on this device.'}
        </p>
        {authStatus === 'offline' && (
          <p role="status" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1rem', display: 'flex', gap: '0.4rem', alignItems: 'flex-start', lineHeight: 1.5 }}>
            <WifiOff size={14} aria-hidden="true" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
            You're offline. Your changes are kept on this device, and the sign-in renews when you're back online.
          </p>
        )}
        <SignOutChoice />
      </div>
    </div>
  );
}
