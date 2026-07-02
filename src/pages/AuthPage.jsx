import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Moon, Mail, Lock, ArrowRight, Send, Check } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { isSupabaseConfigured } from '../services/supabase';

export default function AuthPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialMode = params.get('mode') === 'signup' ? 'signup' : 'signin';
  const prefillName = params.get('prefill_name') || '';

  const [mode, setMode] = useState(initialMode); // 'signin' | 'signup' | 'magic'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(prefillName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [magicSent, setMagicSent] = useState(false);

  const authStatus = useAuthStore((s) => s.authStatus);
  const user = useAuthStore((s) => s.user);
  const signInWithEmail = useAuthStore((s) => s.signInWithEmail);
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);
  const sendMagicLink = useAuthStore((s) => s.sendMagicLink);
  const login = useAuthStore((s) => s.login);

  // Redirect if already authenticated and has local profile
  useEffect(() => {
    if (authStatus === 'authenticated' && user) {
      navigate('/app', { replace: true });
    }
  }, [authStatus, user, navigate]);

  if (!isSupabaseConfigured) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '2rem' }}>
        <div style={{ maxWidth: '420px', textAlign: 'center' }}>
          <Moon size={32} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
          <h2 style={{ color: 'var(--text)', marginBottom: '0.5rem' }}>Sync not configured</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            To enable cross-device sync, add your Supabase credentials to the{' '}
            <code style={{ background: 'var(--surface-2)', padding: '0.1em 0.4em', borderRadius: '4px' }}>.env</code>{' '}
            file and restart the dev server.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/')}
              style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}
            >
              Back to home
            </button>
            <button
              onClick={() => navigate('/get-started')}
              style={{ padding: '0.6rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer' }}
            >
              Continue without account
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === 'magic') {
      const { error: err } = await sendMagicLink(email.trim());
      setLoading(false);
      if (err) { setError(err.message); return; }
      setMagicSent(true);
      return;
    }

    if (mode === 'signup') {
      // Build a minimal profile — full onboarding was skipped if arriving from AuthPage directly
      const profile = {
        id: crypto.randomUUID(),
        name: name.trim() || email.split('@')[0],
        org: '',
        modules: [],
        valuesLayer: 'islamic',
        createdAt: new Date().toISOString(),
      };
      const { error: err } = await signUpWithEmail(email.trim(), password, profile);
      setLoading(false);
      if (err) { setError(err.message); return; }
      // Profile was set via signUpWithEmail; navigate after auth state change fires
      return;
    }

    // Sign in
    const { error: err } = await signInWithEmail(email.trim(), password);
    setLoading(false);
    if (err) { setError(err.message); return; }
    // If user has no local profile yet, set a minimal one from email
    if (!user) {
      login({
        id: crypto.randomUUID(),
        name: email.split('@')[0],
        org: '',
        modules: [],
        valuesLayer: 'islamic',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px',
    border: '1px solid var(--border)', background: 'var(--surface-2)',
    color: 'var(--text)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
  };
  const labelStyle = { display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
            <Moon size={22} style={{ color: 'var(--accent)' }} />
            <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em' }}>MIOS</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.4rem' }}>
            {mode === 'signup' ? 'Create your account' : mode === 'magic' ? 'Sign in with a link' : 'Welcome back'}
          </p>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--surface-2)', borderRadius: '10px', padding: '0.25rem', marginBottom: '1.5rem' }}>
          {[{ id: 'signin', label: 'Sign in' }, { id: 'signup', label: 'Create account' }].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setMode(tab.id); setError(null); }}
              style={{
                flex: 1, padding: '0.5rem', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '0.88rem',
                background: mode === tab.id ? 'var(--accent)' : 'transparent',
                color: mode === tab.id ? '#fff' : 'var(--text-muted)',
                fontWeight: mode === tab.id ? 600 : 400,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Magic link sent */}
        {magicSent ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--accent-muted)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Check size={22} style={{ color: 'var(--accent)' }} />
            </div>
            <p style={{ color: 'var(--text)', fontWeight: 600, marginBottom: '0.5rem' }}>Check your email</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              We sent a sign-in link to <strong>{email}</strong>. Click it to sign in — no password needed.
            </p>
            <button onClick={() => setMagicSent(false)} style={{ marginTop: '1.5rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.88rem' }}>
              Try a different email
            </button>
          </div>
        ) : mode === 'magic' ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} autoFocus />
            </div>
            {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Send size={16} />
              {loading ? 'Sending...' : 'Send magic link'}
            </button>
            <button type="button" onClick={() => { setMode('signin'); setError(null); }} style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}>
              Use password instead
            </button>
          </form>
        ) : (
          /* Sign in / Sign up form */
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Your name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Yousef" style={inputStyle} autoFocus />
              </div>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Email address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={inputStyle} autoFocus={mode === 'signin'} />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === 'signup' ? 'Choose a password (8+ chars)' : 'Your password'} required minLength={8} style={inputStyle} />
            </div>
            {error && <p style={{ color: 'var(--error, #e53935)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
              <ArrowRight size={16} />
              {loading ? (mode === 'signup' ? 'Creating account...' : 'Signing in...') : (mode === 'signup' ? 'Create account' : 'Sign in')}
            </button>

            {/* Magic link option */}
            <button type="button" onClick={() => { setMode('magic'); setError(null); }} style={{ width: '100%', marginTop: '0.75rem', padding: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <Mail size={14} />
              Sign in with a magic link instead
            </button>
          </form>
        )}

        {/* Back to app */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem' }}>
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
