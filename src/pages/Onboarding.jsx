import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cloudAccountsEnabled } from '../services/supabase';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { useOnboardingStore } from '../store/onboarding-store';
import { useThresholdStore } from '../store/threshold-store';
import { genUserId } from '../services/id';
import { safeGetJSON, safeRemove } from '../services/storage';
import { MAQASID_PILLARS } from '../data/maqasid';
import { ICON_REGISTRY } from '../data/icon-registry';
import '../styles/landing.css';
import { useRequiredField } from '../hooks/useRequiredField';
import FieldError from '../components/shared/FieldError';

const PILLAR_ICON_MAP = ICON_REGISTRY;

// Steps: 0=Welcome, 1=Profile (name only), and optionally 2=Sync (when Supabase configured).
// The organization field, the "What brings you here?" intent and the values
// framing step were removed 2026-10-14: nothing read the first two, and the
// values layer defaults to Islamic and is switchable in Settings / the Islamic panel.
const STEPS = cloudAccountsEnabled
  ? ['Welcome', 'Profile', 'Sync']
  : ['Welcome', 'Profile'];
const SYNC_STEP = 2;

export default function Onboarding() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const { recordFirstLogin } = useOnboardingStore();
  const skipNiyyah = useThresholdStore((s) => s.skipNiyyah);

  // A profile left behind by Sign Out — reuse it rather than creating a new user.
  const [prevUser] = useState(() => safeGetJSON('user_prev', null));
  const [step, setStep] = useState(0);
  const [name, setName] = useState(prevUser?.name || '');
  const req = useRequiredField(name.trim().length > 0, 'onboarding-your-name');

  const finish = (skipToSync = false) => {
    recordFirstLogin();
    const trimmedName = name.trim();
    login({
      ...(prevUser || {}),
      id: prevUser?.id || genUserId(),
      name: trimmedName,
      modules: prevUser?.modules || [],
      createdAt: prevUser?.createdAt || new Date().toISOString(),
    });
    if (prevUser) safeRemove('user_prev');
    // No pillar selection in onboarding — mark Niyyah as skipped so user
    // isn't blocked by a second ceremony on first dashboard visit.
    skipNiyyah();
    if (skipToSync && cloudAccountsEnabled) {
      navigate(`/auth?mode=signup&prefill_name=${encodeURIComponent(trimmedName)}`);
    } else {
      navigate('/app');
    }
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  // Progress bar + "Step n of m": hidden on the welcome step, and when there is
  // only one form step (no sync step) — "Step 1 of 1" tells the operator nothing.
  const showProgress = step > 0 && STEPS.length > 2;

  return (
    <>
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg)', padding: 'var(--space-6)',
      }}>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)',
          width: '100%', maxWidth: 520, boxShadow: 'var(--shadow-lg)',
        }}>

          {/* Progress bar — hidden on step 0 */}
          {showProgress && (
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
              {STEPS.slice(1).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: 4, borderRadius: 2,
                  background: i < step ? 'var(--primary)' : 'var(--bg4)',
                  transition: 'background var(--duration) var(--ease)',
                }} />
              ))}
            </div>
          )}

          {/* Step label — hidden on step 0 */}
          {showProgress && (
            <p style={{
              fontSize: '0.8rem', color: 'var(--text3)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 'var(--space-2)',
            }}>
              Step {step} of {STEPS.length - 1}
            </p>
          )}

          {/* ── Step 0: Welcome ── */}
          {step === 0 && (
            <div style={{ textAlign: 'center' }}>
              <h1
                className="onboarding-fade-up"
                style={{
                  fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em',
                  marginBottom: 'var(--space-3)',
                  animationDelay: '0ms',
                }}
              >
                Peace be upon you.
              </h1>
              <p
                className="onboarding-fade-up"
                style={{
                  fontSize: '1.05rem', color: 'var(--text2)', marginBottom: 'var(--space-6)',
                  animationDelay: '150ms',
                }}
              >
                Organize your life around what truly matters.
              </p>

              {/* Pillar icons row */}
              <div
                className="onboarding-fade-up"
                style={{
                  display: 'flex', justifyContent: 'center', gap: 'var(--space-3)',
                  marginBottom: 'var(--space-8)', flexWrap: 'wrap',
                  animationDelay: '300ms',
                }}
              >
                {MAQASID_PILLARS.map((pillar) => {
                  const Icon = PILLAR_ICON_MAP[pillar.icon];
                  return (
                    <div key={pillar.id} title={pillar.sidebarLabel}>
                      {Icon && <Icon size={22} style={{ color: pillar.accentColor }} />}
                    </div>
                  );
                })}
              </div>

              <div
                className="onboarding-fade-up"
                style={{ animationDelay: '450ms' }}
              >
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={handleNext}
                >
                  Begin <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </button>
              </div>
            </div>
          )}

          {/* ── Step 1: Profile + Intent ── */}
          {step === 1 && (
            <div className="fade-in">
              <h2 style={{ marginBottom: 'var(--space-2)' }}>About you</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 'var(--space-6)' }}>Tell us a little about yourself.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div>
                  <label htmlFor="onboarding-your-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--text2)' }}>
                    Your Name *
                  </label>
                  <input id="onboarding-your-name" {...req.fieldProps}
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" autoFocus
                    style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius)' }}
                  />
<FieldError id={req.errorId} show={req.show}>Enter your name to continue</FieldError>
                </div>
              </div>

            </div>
          )}

          {/* ── Sync step (only when Supabase configured) ── */}
          {cloudAccountsEnabled && step === SYNC_STEP && (
            <div className="fade-in" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>☁️</div>
              <h2 style={{ marginBottom: 'var(--space-2)' }}>Continue anywhere</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
                Create a free account to sync your data across all your devices. Your tasks, intentions, and progress will follow you everywhere.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <button
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => finish(true)}
                >
                  Create a free account <ArrowRight size={16} />
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => finish(false)}
                >
                  Skip for now — continue as guest
                </button>
              </div>
              <p style={{ color: 'var(--text3)', fontSize: '0.78rem', marginTop: 'var(--space-4)' }}>
                You can always create an account later from Settings.
              </p>
            </div>
          )}

          {/* ── Navigation ── */}
          {step > 0 && !(cloudAccountsEnabled && step === SYNC_STEP) && (
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginTop: 'var(--space-8)', gap: 'var(--space-3)',
            }}>
              <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>
                <ArrowLeft size={16} /> Back
              </button>

              {step === STEPS.length - 1 ? (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={req.guard(() => finish())}
                >
                  Launch MIOS <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={step === 1 ? req.guard(handleNext) : handleNext}
                >
                  Continue <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
          {/* Back button on sync step */}
          {cloudAccountsEnabled && step === SYNC_STEP && (
            <button className="btn btn-ghost" style={{ marginTop: 'var(--space-4)', display: 'block', margin: '1rem auto 0' }} onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
      </div>
    </>
  );
}
