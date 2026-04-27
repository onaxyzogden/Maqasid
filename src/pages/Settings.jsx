import { useEffect, useState } from 'react';
import { Moon, Sun, Download, Upload, Trash2, LogOut, Eye, EyeOff, Sparkles, RotateCcw, Plane, MapPin, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/settings-store';
import { useAuthStore } from '../store/auth-store';
import { useOnboardingStore } from '../store/onboarding-store';
import { useFastingStore } from '../store/fasting-store';
import { useTravelStore } from '../store/travel-store';
import { usePrayerTimes } from '../hooks/usePrayerTimes';
import { isTashreeq, isRamadan } from '../data/prophetic-path-submodules';
import { exportAll, importAll, clearAll, validateImport, createBackup, restoreBackup, hasBackup } from '../services/storage';
import { AI_PROVIDERS } from '../services/ai/ai-settings';

export default function Settings() {
  const navigate = useNavigate();
  const {
    theme, setTheme, valuesLayer, setValuesLayer,
    aiProvider, setAiProvider, aiApiKey, setAiApiKey,
    aiModel, setAiModel, aiBaseUrl, setAiBaseUrl,
    disableL1ThresholdGate, setDisableL1ThresholdGate,
    disableL23ThresholdGate, setDisableL23ThresholdGate,
  } = useSettingsStore();
  const { user, logout } = useAuthStore();
  const {
    tourCompleted, checklistDismissed, seenPillars,
    disableOnboarding, resetOnboarding,
  } = useOnboardingStore();
  const onboardingDisabled =
    tourCompleted && checklistDismissed && seenPillars.length >= 7;
  const [showKey, setShowKey] = useState(false);

  // Sunnah Mode — fasting + travel state
  const { hijri } = usePrayerTimes();
  const userOverride = useFastingStore((s) => s.userOverride);
  const setUserOverride = useFastingStore((s) => s.setUserOverride);
  const computeIsFasting = useFastingStore((s) => s.computeIsFasting);
  const isFastingNow = computeIsFasting(hijri);

  const travelActive = useTravelStore((s) => s.active);
  const travelStartedAt = useTravelStore((s) => s.startedAt);
  const travelExpiresAt = useTravelStore((s) => s.expiresAt);
  const setTravel = useTravelStore((s) => s.setTravel);
  const clearTravel = useTravelStore((s) => s.clearTravel);
  const [travelDays, setTravelDays] = useState(0); // 0 = no auto-expire

  // `now` ticks every 60s so the travel countdown stays fresh while this page
  // is open. Captured in state to keep render pure (Date.now is impure).
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!travelActive) return undefined;
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, [travelActive]);

  const fastingReason = isTashreeq(hijri)
    ? 'Off (Tashreeq — fasting prohibited)'
    : isRamadan(hijri)
    ? 'Active (Ramadan)'
    : userOverride
    ? 'Active (manual)'
    : 'Off';

  const formatRemaining = (expiresAt) => {
    if (!expiresAt) return null;
    const ms = expiresAt - now;
    if (ms <= 0) return 'Expired';
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    if (days > 0) return `Auto-clears in ${days}d ${hours}h`;
    return `Auto-clears in ${hours}h`;
  };

  const formatStarted = (startedAt) => {
    if (!startedAt) return null;
    const ms = now - startedAt;
    const days = Math.floor(ms / 86400000);
    const hours = Math.floor((ms % 86400000) / 3600000);
    if (days > 0) return `Started ${days}d ${hours}h ago`;
    if (hours > 0) return `Started ${hours}h ago`;
    const mins = Math.floor((ms % 3600000) / 60000);
    return `Started ${mins}m ago`;
  };

  const handleExport = () => {
    const data = exportAll();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bbos-biz-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          const validation = validateImport(data);
          if (!validation.valid) {
            alert('Import validation failed:\n' + validation.errors.join('\n'));
            return;
          }
          if (!createBackup()) {
            alert('Could not create backup before import. Aborting to protect your data.');
            return;
          }
          importAll(data);
          window.location.reload();
        } catch {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleRestoreBackup = () => {
    if (!hasBackup()) {
      alert('No backup available.');
      return;
    }
    if (confirm('Restore data from before the last import? This will overwrite current data.')) {
      restoreBackup();
      window.location.reload();
    }
  };

  const handleClearData = () => {
    if (confirm('This will delete ALL your data. Are you sure?')) {
      clearAll();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ marginBottom: 'var(--space-6)' }}>Settings</h2>

      {/* Profile */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Profile</h4>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '1.1rem',
          }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{user?.name || 'User'}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{user?.org || 'No organization'}</div>
          </div>
        </div>
      </section>

      {/* Theme */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Appearance</h4>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {[
            { id: 'light', icon: <Sun size={18} />, label: 'Light' },
            { id: 'dark', icon: <Moon size={18} />, label: 'Dark' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: 'var(--space-2)', padding: 'var(--space-4)',
                background: theme === t.id ? 'var(--primary-bg)' : 'var(--surface)',
                border: `1px solid ${theme === t.id ? 'var(--primary-border)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', cursor: 'pointer',
                fontWeight: 500, color: theme === t.id ? 'var(--primary)' : 'var(--text2)',
                transition: 'all var(--duration) var(--ease)',
              }}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* Values Layer */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Values Layer</h4>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          {[
            { id: 'islamic', label: 'Islamic' },
            { id: 'universal', label: 'Universal' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setValuesLayer(v.id)}
              style={{
                flex: 1, padding: 'var(--space-3)',
                background: valuesLayer === v.id ? 'var(--accent-bg)' : 'var(--surface)',
                border: `1px solid ${valuesLayer === v.id ? 'var(--accent-border)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', cursor: 'pointer',
                fontWeight: 500, color: valuesLayer === v.id ? 'var(--accent)' : 'var(--text2)',
                transition: 'all var(--duration) var(--ease)',
              }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </section>

      {/* AI Provider */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>AI Draft Generation</h4>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
        }}>
          {/* Provider selector */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 'var(--space-1)' }}>
              Provider
            </label>
            <select
              value={aiProvider}
              onChange={(e) => setAiProvider(e.target.value)}
              style={{
                width: '100%', padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem',
              }}
            >
              {AI_PROVIDERS.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* API Key */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 'var(--space-1)' }}>
              API Key
            </label>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <input
                type={showKey ? 'text' : 'password'}
                value={aiApiKey}
                onChange={(e) => setAiApiKey(e.target.value)}
                placeholder={aiProvider === 'openrouter' ? 'sk-or-...' : 'sk-ant-...'}
                style={{
                  flex: 1, padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem',
                  fontFamily: "var(--font-mono)",
                }}
              />
              <button
                onClick={() => setShowKey(!showKey)}
                style={{
                  padding: 'var(--space-2)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)', background: 'none',
                  cursor: 'pointer', color: 'var(--text3)', display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Model */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 'var(--space-1)' }}>
              Model
            </label>
            <input
              type="text"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              placeholder={aiProvider === 'openrouter' ? 'anthropic/claude-sonnet-4' : 'claude-sonnet-4-20250514'}
              style={{
                width: '100%', padding: 'var(--space-2) var(--space-3)',
                border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem',
                fontFamily: "var(--font-mono)",
              }}
            />
          </div>

          {/* Base URL (custom only) */}
          {aiProvider === 'custom' && (
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 'var(--space-1)' }}>
                Base URL
              </label>
              <input
                type="text"
                value={aiBaseUrl}
                onChange={(e) => setAiBaseUrl(e.target.value)}
                placeholder="https://your-api.example.com/v1"
                style={{
                  width: '100%', padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem',
                  fontFamily: "var(--font-mono)",
                }}
              />
            </div>
          )}

          {/* Anthropic proxy note */}
          {aiProvider === 'anthropic' && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text3)', lineHeight: 1.5 }}>
              Anthropic API requires a CORS proxy for browser access. Set a proxy URL in the Base URL field below, or use OpenRouter instead.
              {!aiBaseUrl && (
                <div style={{ marginTop: 'var(--space-2)' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text2)', display: 'block', marginBottom: 'var(--space-1)' }}>
                    Proxy Base URL
                  </label>
                  <input
                    type="text"
                    value={aiBaseUrl}
                    onChange={(e) => setAiBaseUrl(e.target.value)}
                    placeholder="https://your-proxy.workers.dev/v1"
                    style={{
                      width: '100%', padding: 'var(--space-2) var(--space-3)',
                      border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem',
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Ritual Gates */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Ritual Gates</h4>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={disableL1ThresholdGate}
              onChange={(e) => setDisableL1ThresholdGate(e.target.checked)}
            />
            <span>Disable Threshold Opening gate for Level 1 submodules</span>
          </label>
          <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: 'var(--space-2)' }}>
            When enabled, Level 1 (<code>*-core</code>) pages open without the ritual.
          </div>
        </div>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          marginTop: 'var(--space-3)',
        }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={disableL23ThresholdGate}
              onChange={(e) => setDisableL23ThresholdGate(e.target.checked)}
            />
            <span>Disable Threshold Opening gate for Level 2 &amp; 3 submodules</span>
          </label>
          <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: 'var(--space-2)' }}>
            When enabled, Level 2 (<code>*-growth</code>) and Level 3 (<code>*-excellence</code>) pages open without the ritual.
          </div>
        </div>
      </section>

      {/* Sunnah Mode — fasting + travel toggles for spine variants */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Sunnah Mode</h4>

        {/* Fasting */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          marginBottom: 'var(--space-3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer', flex: 1 }}>
              <input
                type="checkbox"
                checked={userOverride}
                onChange={(e) => setUserOverride(e.target.checked)}
                disabled={isTashreeq(hijri)}
              />
              <Utensils size={16} style={{ color: 'var(--text2)' }} />
              <span>I&rsquo;m fasting today (Mon/Thu, Ayy&#x101;m al-B&#x12B;&#x1E0D;, Arafah, &#x02BB;&#x100;sh&#x16B;r&#x101;&apos;)</span>
            </label>
            <span style={{
              fontSize: '0.78rem', fontWeight: 600,
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-pill)',
              background: isFastingNow ? 'var(--accent-bg)' : 'var(--surface-2, var(--surface))',
              color: isFastingNow ? 'var(--accent)' : 'var(--text3)',
              border: `1px solid ${isFastingNow ? 'var(--accent-border)' : 'var(--border)'}`,
            }}>
              {fastingReason}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: 'var(--space-2)', lineHeight: 1.5 }}>
            Ramadan auto-activates this. Tashreeq (11&ndash;13 Dhul-&#x1E24;ijjah) overrides off &mdash; fasting is prohibited those days (Muslim 1141).
          </div>
        </div>

        {/* Travel */}
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <Plane size={16} style={{ color: 'var(--text2)' }} />
              <span style={{ fontWeight: 500 }}>
                {travelActive ? 'Currently traveling' : 'Not traveling'}
              </span>
            </div>
            <span style={{
              fontSize: '0.78rem', fontWeight: 600,
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-pill)',
              background: travelActive ? 'var(--accent-bg)' : 'var(--surface-2, var(--surface))',
              color: travelActive ? 'var(--accent)' : 'var(--text3)',
              border: `1px solid ${travelActive ? 'var(--accent-border)' : 'var(--border)'}`,
            }}>
              {travelActive ? 'Active' : 'Off'}
            </span>
          </div>

          {travelActive && (
            <div style={{ fontSize: '0.78rem', color: 'var(--text3)', marginBottom: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
              {formatStarted(travelStartedAt) && <div>{formatStarted(travelStartedAt)}</div>}
              {travelExpiresAt && <div>{formatRemaining(travelExpiresAt)}</div>}
              {!travelExpiresAt && <div>No auto-expire &mdash; end manually when you return.</div>}
            </div>
          )}

          {!travelActive ? (
            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ fontSize: '0.78rem', color: 'var(--text2)' }}>Auto-expire:</label>
              <select
                value={travelDays}
                onChange={(e) => setTravelDays(Number(e.target.value))}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg)', color: 'var(--text)', fontSize: '0.85rem',
                }}
              >
                <option value={0}>None</option>
                <option value={1}>1 day</option>
                <option value={3}>3 days</option>
                <option value={7}>7 days</option>
                <option value={14}>14 days</option>
              </select>
              <button
                className="btn btn-secondary"
                onClick={() => setTravel(travelDays || undefined)}
                style={{ marginLeft: 'auto' }}
              >
                <Plane size={16} /> Begin Travel
              </button>
            </div>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => clearTravel()}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <MapPin size={16} /> End Travel (return home)
            </button>
          )}

          <div style={{ fontSize: '0.8rem', color: 'var(--text3)', marginTop: 'var(--space-3)', lineHeight: 1.5 }}>
            Activates qasr (2-rak&#x02BF;at fard), jam&apos; (combine prayers), and the traveler du&apos;a moments. Hides Friday Jumu&#x02BF;ah; dhuhr returns. Fast deferral applies in Ramadan (Q 2:184).
          </div>
        </div>
      </section>

      {/* Onboarding */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Onboarding</h4>
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
          display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.5 }}>
            {onboardingDisabled
              ? 'All onboarding hints are hidden. Reset to experience them again.'
              : 'Guided tour, Dashboard checklist, and pillar intro modals are active.'}
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button
              className="btn btn-secondary"
              onClick={disableOnboarding}
              disabled={onboardingDisabled}
              style={{ justifyContent: 'center', flex: 1, opacity: onboardingDisabled ? 0.5 : 1 }}
            >
              <Sparkles size={16} /> Disable onboarding hints
            </button>
            <button
              className="btn btn-ghost"
              onClick={resetOnboarding}
              style={{ justifyContent: 'center', flex: 1 }}
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
      </section>

      {/* Data */}
      <section style={{ marginBottom: 'var(--space-8)' }}>
        <h4 style={{ marginBottom: 'var(--space-3)', color: 'var(--text2)' }}>Data</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary" onClick={handleExport} style={{ justifyContent: 'flex-start' }}>
            <Download size={16} /> Export All Data
          </button>
          <button className="btn btn-secondary" onClick={handleImport} style={{ justifyContent: 'flex-start' }}>
            <Upload size={16} /> Import Data
          </button>
          {hasBackup() && (
            <button className="btn btn-secondary" onClick={handleRestoreBackup} style={{ justifyContent: 'flex-start' }}>
              <Upload size={16} /> Restore from Backup
            </button>
          )}
          <button className="btn btn-ghost" onClick={handleClearData} style={{ justifyContent: 'flex-start', color: 'var(--danger)' }}>
            <Trash2 size={16} /> Clear All Data
          </button>
        </div>
      </section>

      {/* Logout */}
      <button className="btn btn-ghost" onClick={handleLogout} style={{ color: 'var(--text2)' }}>
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );
}
