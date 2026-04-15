import { useState, useMemo } from 'react';
import { Plus, ArrowDown, X, MoreHorizontal, Link2, ExternalLink, Copy, Check, ChevronLeft, Calendar, MapPin, Briefcase, Users as UsersIcon, Clock } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useRecruitmentStore } from '@store/recruitment-store';
import { JOB_STAGES, FILTER_TABS, EMPLOYMENT_OPTIONS, SENIORITY_OPTIONS, LOCATION_TYPE_OPTIONS, generatePostingLink } from '@data/config/recruitment-config';
import './RecruitmentPage.css';

function JobDetailPanel({ posting, onClose, store }) {
  const [copied, setCopied] = useState(false);
  const link = posting.stage === 'published' ? generatePostingLink(posting) : null;

  const empLabel = EMPLOYMENT_OPTIONS.find((o) => o.id === posting.type)?.label || posting.type;
  const senLabel = SENIORITY_OPTIONS.find((o) => o.id === posting.seniority)?.label;
  const locLabel = LOCATION_TYPE_OPTIONS.find((o) => o.id === posting.locationType)?.label;
  const stageInfo = JOB_STAGES.find((s) => s.id === posting.stage);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '/' + link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return createPortal(
    <div className="recruit-detail-overlay" onClick={onClose}>
      <div className="recruit-detail-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="recruit-detail__header">
          <button className="recruit-detail__back" onClick={onClose}>
            <ChevronLeft size={18} />
          </button>
          <div style={{ flex: 1 }}>
            <div className="recruit-detail__title">{posting.title}</div>
            <div className="recruit-detail__meta-row">
              {stageInfo && (
                <span className="recruit-detail__stage-badge" style={{ background: stageInfo.color + '18', color: stageInfo.color, borderColor: stageInfo.color + '40' }}>
                  {stageInfo.label}
                </span>
              )}
              <span className="recruit-detail__meta-item"><Briefcase size={14} /> {empLabel}</span>
              {senLabel && posting.seniority !== 'not_specified' && (
                <span className="recruit-detail__meta-item"><UsersIcon size={14} /> {senLabel}</span>
              )}
              {locLabel && posting.locationType !== 'not_specified' && (
                <span className="recruit-detail__meta-item"><MapPin size={14} /> {locLabel}</span>
              )}
            </div>
          </div>
          <button className="recruit-detail__close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Published link banner */}
        {link && (
          <div className="recruit-detail__link-banner">
            <Link2 size={14} />
            <span className="recruit-detail__link-url">{link}</span>
            <button className="recruit-detail__link-copy" onClick={copyLink}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button className="recruit-detail__link-open" onClick={() => window.open('/' + link, '_blank')}>
              <ExternalLink size={14} /> Open
            </button>
          </div>
        )}

        {/* Body */}
        <div className="recruit-detail__body">
          {/* Info cards row */}
          <div className="recruit-detail__info-cards">
            <div className="recruit-detail__info-card">
              <div className="recruit-detail__info-label">Open Positions</div>
              <div className="recruit-detail__info-value">{posting.openPositions || 1}</div>
            </div>
            <div className="recruit-detail__info-card">
              <div className="recruit-detail__info-label">Deadline</div>
              <div className="recruit-detail__info-value">
                {posting.deadline ? new Date(posting.deadline + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
              </div>
            </div>
            <div className="recruit-detail__info-card">
              <div className="recruit-detail__info-label">Created</div>
              <div className="recruit-detail__info-value">
                {new Date(posting.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          {/* Description */}
          {posting.description && (
            <div className="recruit-detail__section">
              <div className="recruit-detail__section-title">Job Description</div>
              <div className="recruit-detail__description">{posting.description}</div>
            </div>
          )}

          {/* Move actions */}
          <div className="recruit-detail__section">
            <div className="recruit-detail__section-title">Move to Stage</div>
            <div className="recruit-detail__move-actions">
              {JOB_STAGES.filter((s) => s.id !== posting.stage).map((s) => (
                <button
                  key={s.id}
                  className="recruit-detail__move-btn"
                  style={{ borderColor: s.color + '40', color: s.color }}
                  onClick={() => { store.move(posting.id, s.id); onClose(); }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="recruit-detail__footer">
          <button className="recruit-detail__delete" onClick={() => { store.remove(posting.id); onClose(); }}>
            Delete Posting
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function AddJobModal({ onClose }) {
  const store = useRecruitmentStore();
  const [title, setTitle]             = useState('');
  const [openPositions, setOpenPositions] = useState(1);
  const [empType, setEmpType]         = useState('full_time');
  const [seniority, setSeniority]     = useState('not_specified');
  const [locationType, setLocationType] = useState('not_specified');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline]       = useState(new Date().toISOString().slice(0, 10));

  const canSubmit = title.trim();
  const inputStyle = {
    width: '100%', padding: '8px 12px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--bg)',
    color: 'var(--text)', fontSize: 13, outline: 'none', boxSizing: 'border-box',
  };
  const selectStyle = { ...inputStyle, appearance: 'auto' };
  const labelStyle = { fontSize: 12, fontWeight: 500, color: 'var(--text2)', marginBottom: 4, display: 'block' };

  function handleSubmit() {
    if (!canSubmit) return;
    store.add({
      title: title.trim(),
      openPositions: Number(openPositions) || 1,
      type: empType,
      seniority,
      locationType,
      description: description.trim(),
      deadline,
    });
    onClose();
  }

  return createPortal(
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'var(--overlay)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
    }} onClick={onClose}>
      <div
        style={{
          width: 480, height: '100%', background: 'var(--surface)',
          boxShadow: 'var(--shadow-xl)', overflowY: 'auto',
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 200ms var(--ease)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text)' }}>Create new job posting</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>Fill in the details below to create a new job posting</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '20px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Row 1: Job Title + Open Positions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: 10 }}>
            <div>
              <label style={labelStyle}>Job Title *</label>
              <input style={inputStyle} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job Title" autoFocus />
            </div>
            <div>
              <label style={labelStyle}>Open Positions</label>
              <input style={inputStyle} type="number" min="1" value={openPositions} onChange={(e) => setOpenPositions(e.target.value)} />
            </div>
          </div>

          {/* Row 2: Employment Type, Seniority Level, Location Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <div>
              <label style={labelStyle}>Employment Type *</label>
              <select style={selectStyle} value={empType} onChange={(e) => setEmpType(e.target.value)}>
                {EMPLOYMENT_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Seniority Level *</label>
              <select style={selectStyle} value={seniority} onChange={(e) => setSeniority(e.target.value)}>
                {SENIORITY_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Location Type *</label>
              <select style={selectStyle} value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                {LOCATION_TYPE_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Job Description</div>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: 160, lineHeight: 1.5 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role, responsibilities, requirements, and benefits."
            />
          </div>

          {/* Timeline */}
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 8 }}>Timeline</div>
            <div style={{ maxWidth: 200 }}>
              <label style={labelStyle}>Application Deadline</label>
              <input style={inputStyle} type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '0 24px 20px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={onClose} style={{
            padding: '10px 20px', borderRadius: 8,
            background: 'transparent', border: '1.5px solid var(--border)',
            color: 'var(--text2)', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={!canSubmit} style={{
            padding: '10px 24px', borderRadius: 8,
            background: canSubmit ? 'var(--text)' : 'var(--bg4)',
            color: canSubmit ? 'var(--bg)' : 'var(--text3)',
            border: 'none', fontWeight: 600, fontSize: 13,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}>
            Create job posting
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function RecruitmentPage() {
  const store = useRecruitmentStore();
  const postings = store.postings;
  const [stageFilter, setStageFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedPosting, setSelectedPosting] = useState(null);

  const postingsByStage = useMemo(() => {
    const m = {};
    JOB_STAGES.forEach((s) => { m[s.id] = []; });
    postings.forEach((p) => {
      if (m[p.stage]) m[p.stage].push(p);
      else m['draft'].push(p);
    });
    return m;
  }, [postings]);

  const visibleColumns = stageFilter === 'all'
    ? JOB_STAGES
    : JOB_STAGES.filter((s) => s.id === stageFilter);

  return (
    <div className="recruit-page">
      {/* Filter tabs */}
      <div className="recruit-filter-tabs">
        {FILTER_TABS.map((f) => (
          <button
            key={f.id}
            className={`recruit-filter-tab ${stageFilter === f.id ? 'active' : ''}`}
            onClick={() => setStageFilter(f.id)}
          >
            {f.label}
          </button>
        ))}

        <div className="recruit-toggle">
          <span className={`recruit-toggle__opt ${!showArchived ? 'active' : ''}`} onClick={() => setShowArchived(false)}>Active</span>
          <span className={`recruit-toggle__opt ${showArchived ? 'active' : ''}`} onClick={() => setShowArchived(true)}>Archived</span>
        </div>

        <div className="recruit-filter-tabs__actions">
          <button className="recruit-add-btn" onClick={() => setShowAdd(true)}>
            + Create Job Posting
          </button>
        </div>
      </div>

      {/* Kanban */}
      <div className="recruit-board">
        {visibleColumns.map((stage) => {
          const stagePostings = postingsByStage[stage.id] || [];
          return (
            <div key={stage.id} className="recruit-col">
              <div className="recruit-col__header">
                <span className="recruit-col__title">
                  {stage.label.toUpperCase()}
                  <span className="recruit-col__count">{stagePostings.length}</span>
                </span>
              </div>
              <div className="recruit-col__body">
                {stagePostings.map((posting) => {
                  const isOnHold = posting.stage === 'on_hold';
                  const isPublished = posting.stage === 'published';
                  const link = isPublished ? generatePostingLink(posting) : null;
                  return (
                    <div key={posting.id} className="recruit-card" onClick={() => setSelectedPosting(posting)}>
                      <div className="recruit-card__top">
                        <div className="recruit-card__title">{posting.title}</div>
                        {isOnHold && (
                          <span className="recruit-card__pill recruit-card__pill--hold">On Hold</span>
                        )}
                        {!isOnHold && (
                          <button className="recruit-card__menu" onClick={(e) => e.stopPropagation()}>
                            <MoreHorizontal size={14} />
                          </button>
                        )}
                      </div>
                      {posting.locationType && posting.locationType !== 'not_specified' && (
                        <div className="recruit-card__dept">
                          {LOCATION_TYPE_OPTIONS.find((o) => o.id === posting.locationType)?.label}
                        </div>
                      )}
                      {posting.openPositions > 1 && (
                        <div className="recruit-card__loc">{posting.openPositions} positions</div>
                      )}
                      {isPublished && link && (
                        <div className="recruit-card__link" onClick={(e) => e.stopPropagation()}>
                          <Link2 size={14} />
                          <span>{link}</span>
                        </div>
                      )}
                      <div className="recruit-card__moves">
                        {JOB_STAGES
                          .filter((s) => s.id !== stage.id)
                          .slice(0, 3)
                          .map((s) => (
                            <button
                              key={s.id}
                              className="recruit-move-btn"
                              style={{ borderColor: s.color + '40', color: s.color }}
                              onClick={(e) => { e.stopPropagation(); store.move(posting.id, s.id); }}
                            >
                              {s.label}
                            </button>
                          ))}
                      </div>
                    </div>
                  );
                })}
                {stagePostings.length === 0 && (
                  <div className="recruit-empty"><ArrowDown size={16} /></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAdd && <AddJobModal onClose={() => setShowAdd(false)} />}
      {selectedPosting && (
        <JobDetailPanel
          posting={selectedPosting}
          onClose={() => setSelectedPosting(null)}
          store={store}
        />
      )}
    </div>
  );
}
