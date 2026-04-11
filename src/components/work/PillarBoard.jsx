import React, { useEffect, useState, useRef } from 'react';
import { Plus, ExternalLink, Trash2, KeyRound, ArrowUpCircle, Stars, Clock, Heart, Moon, Calculator, HandHeart, Landmark, Utensils, Brain, CalendarClock, Plane, Map, Building2, Shield, HeartPulse, Activity, Users, Eye, Siren, Handshake, Crown, ScrollText, DoorOpen, Link, BookOpen, Upload, FileText, FileAudio, FileVideo, File, Download } from 'lucide-react';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useModuleProgress } from '../../hooks/useModuleProgress';
import { safeGet, safeSet, safeGetJSON, safeRemove } from '../../services/storage';
import ProjectBoard from './ProjectBoard';
import './PillarBoard.css';

const TABS = [
  { key: 'dashboard',  label: 'Dashboard',  color: '#64748b', type: 'page' },
  { key: 'core',       label: 'CORE',       color: '#C8A96E', type: 'board' },
  { key: 'growth',     label: 'GROWTH',     color: '#4ab8a8', type: 'board' },
  { key: 'excellence', label: 'EXCELLENCE', color: '#8b5cf6', type: 'board' },
  { key: 'resources',  label: 'Resources',  color: '#3b82f6', type: 'page' },
];

/* ── Icon map (data icon name → Lucide component) ── */
const ICON_MAP = {
  lock: KeyRound,
  expand_circle_up: ArrowUpCircle,
  stars: Stars,
  schedule: Clock,
  self_improvement: Heart,
  nights_stay: Moon,
  calculate: Calculator,
  volunteer_activism: HandHeart,
  account_balance: Landmark,
  restaurant: Utensils,
  psychology: Brain,
  event_repeat: CalendarClock,
  flight_takeoff: Plane,
  map: Map,
  mosque: Building2,
  shield: Shield,
  heart_pulse: HeartPulse,
  activity: Activity,
  users: Users,
  eye: Eye,
  siren: Siren,
  handshake: Handshake,
  crown: Crown,
  heart: Heart,
  book_open: BookOpen,
  scroll: ScrollText,
  door_open: DoorOpen,
};

/* ── SVG Progress Ring ── */
function MasteryRing({ percent, pillarColor, pillarKey }) {
  const r = 70;
  const stroke = 10;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `ringGrad_${pillarKey}`;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180" className="fpd__ring-svg">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={pillarColor} stopOpacity="0.6" />
          <stop offset="100%" stopColor={pillarColor} />
        </linearGradient>
      </defs>
      <circle cx="90" cy="90" r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx="90" cy="90" r={r} fill="none"
        stroke={`url(#${gradId})`} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 90 90)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x="90" y="82" textAnchor="middle" className="fpd__ring-percent">{percent}%</text>
      <text x="90" y="104" textAnchor="middle" className="fpd__ring-label">Mastery</text>
    </svg>
  );
}

/* ── Dashboard sub-page ── */
function PillarDashboardTab({ pillarColor, pillarKey, dashboardData, livePercent, onSwitchTab }) {
  const data = dashboardData;
  if (!data) return null;

  const displayPercent = livePercent ?? 0;

  const cardLevels = [
    { key: 'necessity', tabKey: 'core',       badge: 'NECESSITY',  className: 'fpd__card--necessity' },
    { key: 'growth',    tabKey: 'growth',     badge: 'GROWTH',     className: 'fpd__card--growth' },
    { key: 'excellence',tabKey: 'excellence', badge: 'EXCELLENCE', className: 'fpd__card--excellence' },
  ];

  return (
    <div className="fpd">
      {/* Mastery Ring + Quote */}
      <div className="fpd__ring-section">
        <MasteryRing percent={displayPercent} pillarColor={pillarColor} pillarKey={pillarKey} />
        <div className="fpd__quote-block">
          <p className="fpd__quote">{data.quote}</p>
          <p className="fpd__description">{data.description}</p>
        </div>
      </div>

      {/* 3-Card Grid */}
      <div className="fpd__grid">
        {cardLevels.map(({ key, tabKey, badge, className }) => {
          const card = data[key];
          const IconComp = ICON_MAP[card.icon] || Stars;
          return (
            <div key={key} className={`fpd__card ${className}`}>
              <IconComp size={28} className="fpd__card-icon" />
              <span className="fpd__card-badge">{badge}</span>
              <h4 className="fpd__card-title">{card.title}</h4>
              <p className="fpd__card-desc">{card.desc}</p>
              <button className="fpd__card-cta" onClick={() => onSwitchTab(tabKey)}>
                {card.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Banner */}
      <div className="fpd__banner" style={{ '--banner-color': pillarColor }}>
        <h3 className="fpd__banner-headline">{data.banner.headline}</h3>
        <p className="fpd__banner-quote">{data.banner.quote}</p>
      </div>

    </div>
  );
}

/* ── Resources sub-page ── */
const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_TYPES = '.txt,.md,.pdf,.docx,.mp3,.mp4,.wav,.ogg,.webm,.mov,.avi';

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType) {
  if (!mimeType) return File;
  if (mimeType.startsWith('audio/')) return FileAudio;
  if (mimeType.startsWith('video/')) return FileVideo;
  return FileText;
}

function PillarResourcesTab({ modulePrefix, pillarKey, pillarName }) {
  const storageKey = `${modulePrefix}_resources_${pillarKey}`;
  const [resources, setResources] = useState(() => {
    // Migrate from double-prefixed key (bbiz_bbiz_*) if it exists
    const oldKey = `bbiz_${modulePrefix}_resources_${pillarKey}`;
    const old = safeGetJSON(oldKey, null);
    if (old && old.length > 0 && safeGetJSON(storageKey, []).length === 0) {
      safeSet(storageKey, old);
      safeRemove(oldKey);
      return old;
    }
    return safeGetJSON(storageKey, []);
  });
  const [mode, setMode] = useState('link'); // 'link' | 'file'
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [note, setNote] = useState('');
  const [fileData, setFileData] = useState(null); // { fileName, fileSize, mimeType, dataUrl }
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const save = (updated) => {
    setResources(updated);
    safeSet(storageKey, updated);
  };

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setNote('');
    setFileData(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const addResource = () => {
    if (mode === 'link') {
      if (!title.trim() || !url.trim()) return;
      const resource = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: title.trim(),
        url: url.trim(),
        note: note.trim(),
        createdAt: new Date().toISOString(),
        type: 'link',
      };
      save([resource, ...resources]);
    } else {
      if (!fileData || !title.trim()) return;
      const resource = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: title.trim(),
        note: note.trim(),
        createdAt: new Date().toISOString(),
        type: 'file',
        fileName: fileData.fileName,
        fileSizeFmt: formatFileSize(fileData.fileSize),
        mimeType: fileData.mimeType,
        dataUrl: fileData.dataUrl,
      };
      save([resource, ...resources]);
    }
    resetForm();
  };

  const removeResource = (id) => {
    save(resources.filter((r) => r.id !== id));
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setFileError('');
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File too large (${formatFileSize(file.size)}). Maximum is 500 KB.`);
      setFileData(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFileData({
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type || 'application/octet-stream',
        dataUrl: reader.result,
      });
      if (!title.trim()) {
        setTitle(file.name.replace(/\.[^.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (file) handleFileSelect(file);
  };

  const openFileResource = (r) => {
    if (r.dataUrl) {
      const link = document.createElement('a');
      link.href = r.dataUrl;
      link.download = r.fileName || r.title;
      link.click();
    }
  };

  return (
    <div className="pillar-resources">
      <div className="pillar-resources__header">
        <Link size={20} style={{ color: 'var(--text2)' }} />
        <h3 className="pillar-resources__title">{pillarName} Resources</h3>
      </div>
      <p className="pillar-resources__desc">
        Collect links, files, and materials related to your {pillarName.toLowerCase()} work.
      </p>

      {/* Mode toggle */}
      <div className="pillar-resources__mode-toggle">
        <button
          className={`pillar-resources__mode-btn${mode === 'link' ? ' pillar-resources__mode-btn--active' : ''}`}
          onClick={() => { setMode('link'); setFileError(''); setFileData(null); }}
        >
          <Link size={13} /> Link
        </button>
        <button
          className={`pillar-resources__mode-btn${mode === 'file' ? ' pillar-resources__mode-btn--active' : ''}`}
          onClick={() => { setMode('file'); setFileError(''); }}
        >
          <Upload size={13} /> File
        </button>
      </div>

      {/* Add form */}
      <div className="pillar-resources__form">
        {mode === 'file' && (
          <>
            <div
              className={`pillar-resources__dropzone${fileData ? ' pillar-resources__dropzone--has-file' : ''}`}
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {fileData ? (
                <div className="pillar-resources__file-preview">
                  {React.createElement(getFileIcon(fileData.mimeType), { size: 20 })}
                  <span className="pillar-resources__file-name">{fileData.fileName}</span>
                  <span className="pillar-resources__file-size">{formatFileSize(fileData.fileSize)}</span>
                </div>
              ) : (
                <>
                  <Upload size={24} style={{ color: 'var(--text3)' }} />
                  <span className="pillar-resources__dropzone-text">Click or drop a file here</span>
                  <span className="pillar-resources__dropzone-hint">txt, md, pdf, docx, audio, video — max 500 KB</span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                style={{ display: 'none' }}
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />
            </div>
            {fileError && <div className="pillar-resources__file-error">{fileError}</div>}
          </>
        )}
        <input
          className="pillar-resources__input"
          placeholder="Resource title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {mode === 'link' && (
          <input
            className="pillar-resources__input"
            placeholder="URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}
        <textarea
          className="pillar-resources__textarea"
          placeholder="Optional note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={2}
        />
        <button
          className="btn btn-primary pillar-resources__add"
          onClick={addResource}
          disabled={mode === 'link' ? (!title.trim() || !url.trim()) : (!title.trim() || !fileData)}
        >
          <Plus size={14} /> Add Resource
        </button>
      </div>

      {/* Resource list */}
      {resources.length === 0 ? (
        <div className="pillar-resources__empty">
          No resources yet. Add a link or file above.
        </div>
      ) : (
        <div className="pillar-resources__list">
          {resources.map((r) => {
            const isFile = r.type === 'file';
            const IconCmp = isFile ? getFileIcon(r.mimeType) : ExternalLink;
            return (
              <div key={r.id} className="pillar-resources__card">
                <div className="pillar-resources__card-header">
                  {isFile ? (
                    <button
                      className="pillar-resources__card-link pillar-resources__card-link--file"
                      onClick={() => openFileResource(r)}
                    >
                      <IconCmp size={13} />
                      {r.title}
                    </button>
                  ) : (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pillar-resources__card-link"
                    >
                      <IconCmp size={13} />
                      {r.title}
                    </a>
                  )}
                  <button
                    className="pillar-resources__card-remove"
                    onClick={() => removeResource(r.id)}
                    title="Remove resource"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                {r.note && <p className="pillar-resources__card-note">{r.note}</p>}
                {isFile ? (
                  <span className="pillar-resources__card-meta">
                    <Download size={10} /> {r.fileName} &middot; {r.fileSizeFmt}
                  </span>
                ) : (
                  <span className="pillar-resources__card-url">{r.url}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Generic tabbed pillar board used by Faith and Life submodule pages.
 * Renders: Dashboard | Core | Growth | Excellence | Resources
 */
export default function PillarBoard({ pillarKey, pillarName, pillarColor, modulePrefix, ensureProjects, dashboardData }) {
  const getProject = useProjectStore((s) => s.getProject);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const tabStorageKey = `${modulePrefix}_active_tab`;
  const [activeTab, setActiveTabRaw] = useState(() => {
    const saved = safeGet(tabStorageKey, 'dashboard');
    return TABS.some((t) => t.key === saved) ? saved : 'dashboard';
  });
  const setActiveTab = (tab) => {
    setActiveTabRaw(tab);
    safeSet(tabStorageKey, tab);
  };

  useEffect(() => {
    ensureProjects();
  }, []);

  // Load tasks for all three level boards so progress is always current
  useEffect(() => {
    const levels = ['core', 'growth', 'excellence'];
    for (const level of levels) {
      const boardId = `${modulePrefix}_${pillarKey}_${level}`;
      if (projects.some((p) => p.id === boardId)) {
        loadTasks(boardId);
      }
    }
  }, [projects, modulePrefix, pillarKey, loadTasks]);

  const { pct: livePercent } = useModuleProgress(pillarKey);

  const boardId = `${modulePrefix}_${pillarKey}_${activeTab}`;
  const project = getProject(boardId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-3)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: pillarColor }} />
          <h2 style={{ fontSize: '1.3rem' }}>{pillarName}</h2>
        </div>

        {/* Tabs */}
        <div className="faith-pillar-tabs">
          {TABS.map(({ key, label, color }) => (
            <button
              key={key}
              className={`faith-pillar-tab${activeTab === key ? ' faith-pillar-tab--active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <span className="faith-pillar-tab__dot" style={{ background: color }} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && (
        <PillarDashboardTab pillarName={pillarName} pillarColor={pillarColor} pillarKey={pillarKey} dashboardData={dashboardData} livePercent={livePercent} onSwitchTab={setActiveTab} />
      )}

      {activeTab === 'resources' && (
        <PillarResourcesTab modulePrefix={modulePrefix} pillarKey={pillarKey} pillarName={pillarName} />
      )}

      {(activeTab === 'core' || activeTab === 'growth' || activeTab === 'excellence') && (
        project ? (
          <ProjectBoard projectId={boardId} project={project} />
        ) : (
          <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text2)' }}>
            Loading board...
          </div>
        )
      )}

    </div>
  );
}
