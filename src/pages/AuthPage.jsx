// Sign-in with an emailed code, ported from Capacity Routine's src/components/SignIn.tsx.
// Step 1 sends the email; step 2 takes the code from it. The email also
// carries a link back to this app, which signs in on the device that opens it.
// Mounted only when cloud accounts are on (App.jsx).
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Send, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { signInMessage, codeMessage, CODE } from '../services/cloud-auth';

const inputStyle = {
  width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', minHeight: '48px',
  border: '1px solid var(--border)', background: 'var(--surface-2)',
  color: 'var(--text)', fontSize: '0.95rem', boxSizing: 'border-box',
};
const labelStyle = { display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.3rem' };
const primaryStyle = (busy) => ({
  width: '100%', minHeight: '44px', padding: '0.7rem', borderRadius: '8px', border: 'none',
  background: 'var(--accent)', color: '#fff', fontWeight: 600, cursor: busy ? 'not-allowed' : 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', opacity: busy ? 0.7 : 1,
});
const quietStyle = {
  width: '100%', minHeight: '44px', marginTop: '0.5rem', background: 'none', border: 'none',
  color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline',
};
const errorStyle = { color: 'var(--error, #e53935)', fontSize: '0.85rem', margin: '0 0 0.75rem', lineHeight: 1.5 };
const noteStyle = { color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1rem' };

function Frame({ subtitle, children }) {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)' }}>
            <Moon size={22} style={{ color: 'var(--accent)' }} aria-hidden="true" />
            <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em' }}>MIOS</span>
          </div>
          <h1 style={{ color: 'var(--text)', fontSize: '1.15rem', fontWeight: 600, margin: '0.75rem 0 0' }}>{subtitle}</h1>
        </div>
        {children}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/')} style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem', minHeight: '44px' }}>
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const authStatus = useAuthStore((s) => s.authStatus);
  const user = useAuthStore((s) => s.user);
  const sendCode = useAuthStore((s) => s.sendCode);
  const verifyCode = useAuthStore((s) => s.verifyCode);

  const [step, setStep] = useState('email'); // 'email' | 'code'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // Signed in (here, by the emailed link, or already): go on. With no local
  // profile yet, onboarding sets one up first.
  useEffect(() => {
    if (authStatus === 'signed-in' || authStatus === 'offline') {
      navigate(user ? '/app' : '/get-started', { replace: true });
    }
  }, [authStatus, user, navigate]);

  if (authStatus === 'guest') {
    return (
      <Frame subtitle="Sign-in isn't set up here">
        <p style={{ ...noteStyle, textAlign: 'center' }}>
          Sign-in isn't set up on this copy of the app yet. Everything you do is kept on this device.
        </p>
        <button onClick={() => navigate(user ? '/app' : '/get-started')} style={primaryStyle(false)}>
          Continue on this device <ArrowRight size={16} aria-hidden="true" />
        </button>
      </Frame>
    );
  }

  const handleSend = async (e) => {
    e.preventDefault();
    if (busy) return;
    setError(null);
    setBusy(true);
    const { error: err } = await sendCode(email);
    setBusy(false);
    if (err) { setError(signInMessage(err)); return; }
    setCode('');
    setStep('code');
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (busy) return;
    const token = code.replace(/\s/g, '');
    if (!CODE.test(token)) { setError('Type the code from the email: numbers only, at least 6.'); return; }
    setError(null);
    setBusy(true);
    const { error: err } = await verifyCode(email, token);
    setBusy(false);
    if (err) setError(codeMessage(err));
    // On success the SIGNED_IN event moves the page on (effect above).
  };

  if (step === 'code') {
    return (
      <Frame subtitle="Check your email">
        {/* Keyed so the two steps never share DOM: the code field mounts fresh and takes focus. */}
        <form key="code" onSubmit={handleVerify} noValidate aria-busy={busy}>
          <p style={noteStyle}>
            We sent a sign-in email to <strong style={{ color: 'var(--text)' }}>{email.trim()}</strong>.
            Open its link on this device, or type the code from it here.
          </p>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="auth-code" style={labelStyle}>Code from the email</label>
            <input
              id="auth-code" name="code" type="text" inputMode="numeric" autoComplete="one-time-code"
              maxLength={14} value={code} onChange={(e) => setCode(e.target.value)} autoFocus
              aria-invalid={error ? true : undefined} aria-describedby={error ? 'auth-error' : undefined}
              style={{ ...inputStyle, letterSpacing: '0.2em', fontVariantNumeric: 'tabular-nums' }}
            />
          </div>
          {error && <p id="auth-error" role="alert" style={errorStyle}>{error}</p>}
          <button type="submit" disabled={busy} style={primaryStyle(busy)}>
            <ArrowRight size={16} aria-hidden="true" />
            {busy ? 'Checking…' : 'Sign in'}
          </button>
          <p style={{ ...noteStyle, fontSize: '0.8rem', margin: '1rem 0 0' }}>
            On an iPhone with the app on the Home Screen, use the code: the link opens in Safari instead.
          </p>
          <button type="button" onClick={() => { setStep('email'); setError(null); }} style={quietStyle}>
            Use a different email
          </button>
        </form>
      </Frame>
    );
  }

  return (
    <Frame subtitle="Sign in to your account">
      <form key="email" onSubmit={handleSend} aria-busy={busy}>
        <p style={noteStyle}>
          We'll email you a code. No password needed. Your data on this device stays as it is.
        </p>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="auth-email" style={labelStyle}>Email address</label>
          <input
            id="auth-email" name="email" type="email" inputMode="email" autoComplete="email" required
            value={email} onChange={(e) => setEmail(e.target.value)} autoFocus
            aria-invalid={error ? true : undefined} aria-describedby={error ? 'auth-error' : undefined}
            style={inputStyle}
          />
        </div>
        {error && <p id="auth-error" role="alert" style={errorStyle}>{error}</p>}
        <button type="submit" disabled={busy || authStatus === 'loading'} style={primaryStyle(busy)}>
          <Send size={16} aria-hidden="true" />
          {busy ? 'Sending…' : 'Email me a code'}
        </button>
      </form>
    </Frame>
  );
}
