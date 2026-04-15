import { useState, useMemo } from 'react';
import { Search, X, Send, Trash2 } from 'lucide-react';
import { useTechStore } from '../../store/tech-store';

export default function EmailCampaignsTab() {
  const campaigns = useTechStore((s) => s.campaigns);
  const addCampaign = useTechStore((s) => s.addCampaign);
  const sendCampaign = useTechStore((s) => s.sendCampaign);
  const deleteCampaign = useTechStore((s) => s.deleteCampaign);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [search, setSearch] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [fName, setFName] = useState('');
  const [fSubject, setFSubject] = useState('');
  const [fContent, setFContent] = useState('');

  const filtered = useMemo(() => {
    let list = [...campaigns];
    if (showArchived) list = list.filter((c) => c.isArchived);
    else list = list.filter((c) => !c.isArchived);
    if (statusFilter !== 'all') list = list.filter((c) => c.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) => (c.name || '').toLowerCase().includes(q) || (c.subject || '').toLowerCase().includes(q));
    }
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return list;
  }, [campaigns, statusFilter, showArchived, search]);

  const handleCreate = () => {
    if (!fName.trim()) return;
    addCampaign({ name: fName, subject: fSubject, content: fContent });
    setShowPanel(false); setFName(''); setFSubject(''); setFContent('');
  };

  return (
    <div>
      <div className="tech-campaigns-filter">
        <div className="tech-campaigns-filter-left">
          <span style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>Status:</span>
          <div className="money-toggle-group">
            <button className={`money-toggle-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>All</button>
            <button className={`money-toggle-btn ${statusFilter === 'pending' ? 'active' : ''}`} onClick={() => setStatusFilter('pending')}>Pending</button>
            <button className={`money-toggle-btn ${statusFilter === 'sent' ? 'active' : ''}`} onClick={() => setStatusFilter('sent')}>Sent</button>
          </div>
          <div className="tech-archive-toggle">
            <span>Active</span>
            <div className={`tech-archive-toggle-track ${showArchived ? 'active' : ''}`} onClick={() => setShowArchived(!showArchived)}>
              <div className="tech-archive-toggle-thumb" style={{ left: showArchived ? '18px' : '2px' }} />
            </div>
            <span>Archived</span>
          </div>
        </div>
        <div className="tech-campaigns-filter-right">
          <div className="tech-campaign-search">
            <Search size={14} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" />
          </div>
          <button className="btn btn-primary" onClick={() => setShowPanel(true)} style={{ background: 'var(--mod-tech)' }}>
            Create email campaign
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="tech-campaigns-empty">No email campaigns found</div>
      ) : (
        <table className="money-table">
          <thead>
            <tr><th>Name</th><th>Subject</th><th>Status</th><th>Created</th><th>Sent</th><th style={{ width: 80 }} /></tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td style={{ color: 'var(--text2)' }}>{c.subject || '—'}</td>
                <td><span className={`status-badge status-${c.status === 'sent' ? 'paid' : 'unpaid'}`}>{c.status}</span></td>
                <td>{new Date(c.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                <td>{c.sentAt ? new Date(c.sentAt).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</td>
                <td>
                  <div className="row-actions" style={{ opacity: 1 }}>
                    {c.status === 'pending' && (
                      <button className="row-action-btn" onClick={() => sendCampaign(c.id)} title="Send"><Send size={14} /></button>
                    )}
                    <button className="row-action-btn danger" onClick={() => { if (confirm('Delete?')) deleteCampaign(c.id); }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Create campaign slide-in */}
      {showPanel && (
        <div className="money-slidein-overlay" onClick={() => setShowPanel(false)}>
          <div className="money-slidein" onClick={(e) => e.stopPropagation()}>
            <div className="money-slidein-header">
              <h3>Create Email Campaign</h3>
              <button className="money-slidein-close" onClick={() => setShowPanel(false)}><X size={18} /></button>
            </div>
            <div className="money-slidein-body">
              <div className="money-field">
                <label>Campaign name *</label>
                <input value={fName} onChange={(e) => setFName(e.target.value)} placeholder="Campaign name" autoFocus />
              </div>
              <div className="money-field">
                <label>Subject</label>
                <input value={fSubject} onChange={(e) => setFSubject(e.target.value)} placeholder="Email subject" />
              </div>
              <div className="money-field">
                <label>Content</label>
                <textarea value={fContent} onChange={(e) => setFContent(e.target.value)} placeholder="Email content..." rows={6} className="money-note-input" />
              </div>
            </div>
            <div className="money-slidein-footer">
              <div style={{ flex: 1 }} />
              <button className="btn btn-ghost" onClick={() => setShowPanel(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={!fName.trim()} style={{ background: 'var(--mod-tech)' }}>
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
