import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isSupabaseConfigured } from '../services/supabase';
import {
  ArrowRight, ArrowLeft,
  Moon, Sun, Briefcase,
} from 'lucide-react';
import { useAuthStore } from '../store/auth-store';
import { useSettingsStore } from '../store/settings-store';
import { useOnboardingStore } from '../store/onboarding-store';
import { useThresholdStore } from '../store/threshold-store';
import { genUserId } from '../services/id';
import { MAQASID_PILLARS } from '../data/maqasid';
import { ICON_REGISTRY } from '../data/icon-registry';
import '../styles/landing.css';

const PILLAR_ICON_MAP = ICON_REGISTRY;

// Steps: 0=Welcome, 1=Profile, 2=Values, and optionally 3=Sync (when Supabase configured)
const STEPS = isSupabaseConfigured
  ? ['Welcome', 'Profile', 'Values', 'Sync']
  : ['Welcome', 'Profile', 'Values'];

const INTENT_OPTIONS = [
  { id: 'personal', emoji: '🕌', label: 'Personal & Spiritual' },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family & Community' },
  { id: 'business', label: 'Business & Operations', Icon: Briefcase },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const setValuesLayer = useSettingsStore((s) => s.setValuesLayer);
  const { setWizardIntent, recordFirstLogin } = useOnboardingStore();
  const skipNiyyah = useThresholdStore((s) => s.skipNiyyah);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [intent, setIntent] = useState(null);
  const [values, setValues] = useState('islamic');

  const canNext = () => {
    if (step === 1) return name.trim().length > 0;
    return true;
  };

  const finish = (skipToSync = false) => {
    if (intent) setWizardIntent(intent);
    recordFirstLogin();
    const trimmedName = name.trim();
    login({
      id: genUserId(),
      name: trimmedName,
      org: org.trim(),
      modules: [],
      valuesLayer: values,
      createdAt: new Date().toISOString(),
    });
    setValuesLayer(values);
    // No pillar selection in onboarding — mark Niyyah as skipped so user
    // isn't blocked by a second ceremony on first dashboard visit.
    skipNiyyah();
    if (skipToSync && isSupabaseConfigured) {
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

  // Progress bar: 4 bars for steps 1-4, hidden on step 0
  const showProgress = step > 0;

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
              {[0, 1].map((i) => (
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
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--text2)' }}>
                    Your Name *
                  </label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name" autoFocus
                    style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 'var(--space-1)', color: 'var(--text2)' }}>
                    Organization (optional)
                  </label>
                  <input
                    type="text" value={org} onChange={(e) => setOrg(e.target.value)}
                    placeholder="Your company or team name"
                    style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius)' }}
                  />
                </div>
              </div>

              {/* Intent section */}
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text2)', marginBottom: 'var(--space-3)' }}>
                What brings you here?
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {INTENT_OPTIONS.map((opt) => {
                  const selected = intent === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setIntent(opt.id)}
                      style={{
                        flex: 1, minWidth: 120, padding: 'var(--space-3)',
                        border: `1px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius)', cursor: 'pointer',
                        background: selected ? 'var(--primary-bg)' : 'var(--bg)',
                        textAlign: 'center', transition: 'all var(--duration) var(--ease)',
                      }}
                    >
                      {opt.emoji ? (
                        <div style={{ fontSize: 20, marginBottom: 4 }}>{opt.emoji}</div>
                      ) : opt.Icon ? (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
                          <opt.Icon size={20} style={{ color: selected ? 'var(--primary)' : 'var(--text3)' }} />
                        </div>
                      ) : null}
                      <div style={{ fontSize: '0.8rem', fontWeight: 500, color: selected ? 'var(--primary)' : 'var(--text2)' }}>
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 2: Values Framing ── */}
          {step === 2 && (
            <div className="fade-in">
              <h2 style={{ marginBottom: 'var(--space-2)' }}>Choose your path</h2>
              <p style={{ color: 'var(--text2)', marginBottom: 'var(--space-6)' }}>
                MAQASID offers two framing layers. Both have identical tools.
              </p>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                {[
                  {
                    id: 'islamic',
                    title: 'Islamic Governance',
                    desc: 'Divine attributes, duas, spiritual readiness checks, and Islamic ethical framework guiding every decision.',
                    Icon: Moon,
                  },
                  {
                    id: 'universal',
                    title: 'Universal Ethics',
                    desc: 'The same excellence principles expressed in universal language — stewardship, integrity, and purpose.',
                    Icon: Sun,
                  },
                ].map((path) => {
                  const selected = values === path.id;
                  return (
                    <button
                      key={path.id}
                      onClick={() => setValues(path.id)}
                      style={{
                        flex: '1 1 200px',
                        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        padding: 'var(--space-6)',
                        background: selected ? 'var(--primary-bg)' : 'var(--surface)',
                        border: `2px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
                        borderRadius: 'var(--radius-xl)', cursor: 'pointer',
                        transition: 'all var(--duration) var(--ease)', textAlign: 'left',
                      }}
                    >
                      <path.Icon
                        size={28}
                        style={{ color: selected ? 'var(--primary)' : 'var(--text3)' }}
                      />
                      <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{path.title}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.6 }}>{path.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Step 3: Sync (only when Supabase configured) ── */}
          {isSupabaseConfigured && step === 3 && (
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
          {step > 0 && !(isSupabaseConfigured && step === 3) && (
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
                  onClick={() => finish()}
                  disabled={!canNext()}
                >
                  Launch MAQASID <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleNext}
                  disabled={!canNext()}
                >
                  Continue <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
          {/* Back button on sync step */}
          {isSupabaseConfigured && step === 3 && (
            <button className="btn btn-ghost" style={{ marginTop: 'var(--space-4)', display: 'block', margin: '1rem auto 0' }} onClick={() => setStep(step - 1)}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
        </div>
      </div>
    </>
  );
}
