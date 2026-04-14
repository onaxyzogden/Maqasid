import { useState } from 'react';
import { Moon, Sun, Download, Upload, Trash2, LogOut, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../store/settings-store';
import { useAuthStore } from '../store/auth-store';
import { exportAll, importAll, clearAll, validateImport, createBackup, restoreBackup, hasBackup } from '../services/storage';
import { AI_PROVIDERS } from '../services/ai/ai-settings';

export default function Settings() {
  const navigate = useNavigate();
  const {
    theme, setTheme, valuesLayer, setValuesLayer,
    aiProvider, setAiProvider, aiApiKey, setAiApiKey,
    aiModel, setAiModel, aiBaseUrl, setAiBaseUrl,
  } = useSettingsStore();
  const { user, logout } = useAuthStore();
  const [showKey, setShowKey] = useState(false);

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
