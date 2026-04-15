import { useState, useMemo } from 'react';
import { Settings, Plus, X, Check, Trash2 } from 'lucide-react';
import { useTechStore } from '../../store/tech-store';

export default function DarkWebTab() {
  const darkWebEnabled = useTechStore((s) => s.darkWebEnabled);
  const toggleDarkWeb = useTechStore((s) => s.toggleDarkWeb);
  const darkWebEmails = useTechStore((s) => s.darkWebEmails);
  const addDarkWebEmail = useTechStore((s) => s.addDarkWebEmail);
  const removeDarkWebEmail = useTechStore((s) => s.removeDarkWebEmail);
  const breaches = useTechStore((s) => s.breaches);
  const clearBreach = useTechStore((s) => s.clearBreach);
  const deleteBreach = useTechStore((s) => s.deleteBreach);
  const [subTab, setSubTab] = useState('leaks');
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const openBreaches = useMemo(() => breaches.filter((b) => b.status === 'open'), [breaches]);
  const clearedBreaches = useMemo(() => breaches.filter((b) => b.status === 'cleared'), [breaches]);
  const displayed = subTab === 'leaks' ? openBreaches : clearedBreaches;

  // Monthly breach data (last 6 months)
  const monthlyData = useMemo(() => {
    const months = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toISOString().slice(0, 7);
      const label = d.toLocaleDateString('en', { month: 'short' });
      const count = breaches.filter((b) => b.detectedAt?.slice(0, 7) === key).length;
      months.push({ key, label, count });
    }
    return months;
  }, [breaches]);
  const maxMonthly = Math.max(1, ...monthlyData.map((m) => m.count));

  const handleAddEmail = () => {
    if (emailInput.trim() && emailInput.includes('@')) {
      addDarkWebEmail(emailInput.trim());
      setEmailInput('');
      setShowAddEmail(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="tech-darkweb-header">
        <h3 className="tech-darkweb-title">Dark Web Monitor</h3>
        <div className="tech-darkweb-controls">
          <span className="tech-toggle-label">On</span>
          <label className="tech-toggle-switch">
            <input type="checkbox" checked={darkWebEnabled} onChange={toggleDarkWeb} />
            <div className="tech-toggle-track" />
            <div className="tech-toggle-thumb" />
          </label>
          <button className="row-action-btn" onClick={() => setShowAddEmail(true)} title="Settings"><Settings size={18} /></button>
        </div>
      </div>

      <p className="tech-darkweb-desc">
        Through Aqtos Data, our system monitors the email accounts of your users, employees, and contractors to ensure the security of their information. If the service detects their data on the dark web, where hackers sell stolen information, Aqtos will send an alert to you along with recommended actions to take.
      </p>

      {/* Sub-tabs */}
      <div className="tech-darkweb-subtabs">
        <button className={`tech-darkweb-subtab ${subTab === 'leaks' ? 'active' : ''}`} onClick={() => setSubTab('leaks')}>
          Leaks <span className={`tech-darkweb-subtab-count ${openBreaches.length === 0 ? 'zero' : ''}`}>{openBreaches.length}</span>
        </button>
        <button className={`tech-darkweb-subtab ${subTab === 'cleared' ? 'active' : ''}`} onClick={() => setSubTab('cleared')}>
          Cleared <span className={`tech-darkweb-subtab-count ${clearedBreaches.length === 0 ? 'zero' : ''}`}>{clearedBreaches.length}</span>
        </button>
      </div>

      {/* Layout */}
      <div className="tech-darkweb-layout">
        <div className="tech-darkweb-main">
          {displayed.length === 0 ? (
            <div className="tech-zen-empty">
              <svg viewBox="0 0 64 64" width="80" height="80" fill="none">
                <circle cx="32" cy="12" r="6" fill="currentColor" />
                <path d="M32 20 c-12 0-18 8-18 16 c0 2 1 3 2 3 h32 c1 0 2-1 2-3 c0-8-6-16-18-16z" fill="currentColor" />
                <path d="M20 40 c-4 4-6 10-6 14 h36 c0-4-2-10-6-14" fill="currentColor" />
              </svg>
              <span>Everything is fine, for now.</span>
            </div>
          ) : (
            <table className="money-table">
              <thead>
                <tr><th>Email</th><th>Source</th><th>Detected</th><th style={{ width: 80 }} /></tr>
              </thead>
              <tbody>
                {displayed.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 500 }}>{b.email}</td>
                    <td style={{ color: 'var(--text2)' }}>{b.source || '—'}</td>
                    <td>{new Date(b.detectedAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td>
                      <div className="row-actions" style={{ opacity: 1 }}>
                        {b.status === 'open' && (
                          <button className="row-action-btn" onClick={() => clearBreach(b.id)} title="Clear"><Check size={14} /></button>
                        )}
                        <button className="row-action-btn danger" onClick={() => { if (confirm('Delete breach?')) deleteBreach(b.id); }}><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Stats sidebar */}
        <div className="tech-darkweb-sidebar">
          <div className="tech-darkweb-stat-grid">
            <div className="tech-darkweb-stat-card">
              <div className="tech-darkweb-stat-value">{breaches.length}</div>
              <div className="tech-darkweb-stat-label" style={{ color: 'var(--danger)' }}>Total Breaches</div>
            </div>
            <div className="tech-darkweb-stat-card">
              <div className="tech-darkweb-stat-value">{clearedBreaches.length}</div>
              <div className="tech-darkweb-stat-label" style={{ color: '#22c55e' }}>Cleared</div>
            </div>
            <div className="tech-darkweb-stat-card">
              <div className="tech-darkweb-stat-value">{openBreaches.length}</div>
              <div className="tech-darkweb-stat-label" style={{ color: '#f59e0b' }}>Open</div>
            </div>
            <div className="tech-darkweb-stat-card">
              <div className="tech-darkweb-stat-value">{darkWebEmails.length}</div>
              <div className="tech-darkweb-stat-label">Monitored Emails</div>
            </div>
          </div>

          {/* Breaches by status pie */}
          <div className="tech-darkweb-chart-card">
            <div className="tech-darkweb-chart-title">Breaches by status</div>
            <div className="tech-darkweb-pie-container">
              <svg viewBox="0 0 80 80" width="80" height="80">
                {breaches.length === 0 ? (
                  <circle cx="40" cy="40" r="36" fill="var(--border)" />
                ) : (() => {
                  const openPct = breaches.length ? openBreaches.length / breaches.length : 0;
                  const clearedPct = 1 - openPct;
                  if (openPct === 1) return <circle cx="40" cy="40" r="36" fill="#1e293b" />;
                  if (clearedPct === 1) return <circle cx="40" cy="40" r="36" fill="#2aa198" />;
                  const angle = openPct * 2 * Math.PI;
                  const x = 40 + 36 * Math.sin(angle);
                  const y = 40 - 36 * Math.cos(angle);
                  const large = openPct > 0.5 ? 1 : 0;
                  return (
                    <>
                      <circle cx="40" cy="40" r="36" fill="#2aa198" />
                      <path d={`M40,40 L40,4 A36,36 0 ${large},1 ${x},${y} Z`} fill="#1e293b" />
                    </>
                  );
                })()}
              </svg>
              <div className="tech-darkweb-pie-legend">
                <div className="tech-darkweb-pie-legend-item">
                  <div className="tech-darkweb-pie-legend-dot" style={{ background: '#1e293b' }} /> Open
                </div>
                <div className="tech-darkweb-pie-legend-item">
                  <div className="tech-darkweb-pie-legend-dot" style={{ background: '#2aa198' }} /> Closed
                </div>
              </div>
            </div>
          </div>

          {/* Breaches by month */}
          <div className="tech-darkweb-chart-card">
            <div className="tech-darkweb-chart-title">Breaches by month</div>
            <div className="tech-breach-month-chart">
              {monthlyData.map((m) => (
                <div key={m.key} className="tech-breach-month-bar">
                  <div className="tech-breach-month-fill" style={{ height: `${(m.count / maxMonthly) * 60}px` }} />
                  <span className="tech-breach-month-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add email slide-in */}
      {showAddEmail && (
        <div className="money-slidein-overlay" onClick={() => setShowAddEmail(false)}>
          <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
            <div className="money-slidein-header">
              <h3>Monitored Emails</h3>
              <button className="money-slidein-close" onClick={() => setShowAddEmail(false)}><X size={18} /></button>
            </div>
            <div className="money-slidein-body">
              <div className="money-field">
                <label>Add email to monitor</label>
                <div style={{ display: 'flex', gap: 4 }}>
                  <input value={emailInput} onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddEmail()}
                    placeholder="user@example.com" style={{ flex: 1 }} autoFocus />
                  <button className="btn btn-primary" onClick={handleAddEmail} style={{ background: 'var(--mod-tech)' }}>Add</button>
                </div>
              </div>
              {darkWebEmails.length > 0 && (
                <div style={{ marginTop: 'var(--space-4)' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 'var(--space-2)', display: 'block' }}>Currently monitored:</label>
                  {darkWebEmails.map((e) => (
                    <div key={e.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '0.85rem' }}>{e.email}</span>
                      <button className="row-action-btn danger" onClick={() => removeDarkWebEmail(e.id)}><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="money-slidein-footer">
              <div style={{ flex: 1 }} />
              <button className="btn btn-ghost" onClick={() => setShowAddEmail(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
