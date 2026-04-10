import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { BookOpen, Plus, X, Tag } from 'lucide-react';
import { safeGetJSON, safeSet } from '../../services/storage';
import { useAppStore } from '../../store/app-store';
import { getBbosTaskDef } from '@data/bbos/bbos-task-definitions';
import './JournalPanel.css';

const STORAGE_KEY = 'global_journal_reflection';

const SUBMODULE_LABELS = {
  pipeline: 'Pipeline',
  people: 'People',
  tasks: 'Tasks',
  money: 'Money',
  assets: 'Assets',
  office: 'Office',
  tech: 'Tech',
};

const MODULE_LABELS = {
  work: 'Work',
  money: 'Money',
  people: 'People',
  office: 'Office',
  tech: 'Tech',
};

function deriveContextBadges(pathname, activeBbosTaskType) {
  const badges = [];
  const parts = pathname.replace('/app', '').split('/').filter(Boolean);

  // Project sub-route: /app/work/:projectId or /app/work/:projectId/money
  if (parts[0] === 'work' && parts[1]) {
    const sub = parts[2] || 'pipeline';
    // Only add submodule badge for actual work tabs (not meta-routes like journal)
    if (SUBMODULE_LABELS[sub]) {
      badges.push({ type: 'submodule', label: SUBMODULE_LABELS[sub], id: sub });
    }
  } else if (parts[0] && MODULE_LABELS[parts[0]]) {
    // Top-level module: /app/money
    badges.push({ type: 'module', label: MODULE_LABELS[parts[0]], id: parts[0] });
  }

  // Active BBOS task
  if (activeBbosTaskType) {
    const def = getBbosTaskDef(activeBbosTaskType);
    if (def) {
      badges.push({
        type: 'bbos-task',
        label: `${def.id}: ${def.label}`,
        id: def.id,
      });
    }
  }

  return badges;
}

/** Collect all unique badge IDs from entries for the filter bar */
function collectFilterTags(entries) {
  const seen = new Map(); // id → label
  for (const entry of entries) {
    for (const b of entry.badges || []) {
      if (!seen.has(b.id)) seen.set(b.id, b.label);
    }
  }
  return Array.from(seen, ([id, label]) => ({ id, label }));
}

export default function JournalPanel() {
  const reflectionOpen = useAppStore((s) => s.reflectionOpen);
  const setReflectionOpen = useAppStore((s) => s.setReflectionOpen);
  const activeBbosTaskType = useAppStore((s) => s.activeBbosTaskType);
  const location = useLocation();

  const [isPanelClosing, setIsPanelClosing] = useState(false);
  const [draft, setDraft] = useState('');
  const [entries, setEntries] = useState(() => safeGetJSON(STORAGE_KEY, []));

  // Custom user tags
  const [customTags, setCustomTags] = useState([]);
  const [tagInput, setTagInput] = useState('');

  // Tag filter
  const [filterTag, setFilterTag] = useState(null);

  // Compute context badges based on current route & active BBOS task
  const contextBadges = useMemo(
    () => deriveContextBadges(location.pathname, activeBbosTaskType),
    [location.pathname, activeBbosTaskType]
  );

  // Editable badge list — user can remove badges before saving
  const [removedBadgeIds, setRemovedBadgeIds] = useState(new Set());

  // Reset removed badges when context changes
  const activeBadges = contextBadges.filter((b) => !removedBadgeIds.has(`${b.type}:${b.id}`));

  const toggleBadge = (badge) => {
    const key = `${badge.type}:${badge.id}`;
    setRemovedBadgeIds((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const addCustomTag = () => {
    const tag = tagInput.trim();
    if (!tag || customTags.includes(tag)) return;
    setCustomTags((prev) => [...prev, tag]);
    setTagInput('');
  };

  const removeCustomTag = (tag) => {
    setCustomTags((prev) => prev.filter((t) => t !== tag));
  };

  const addEntry = () => {
    if (!draft.trim()) return;
    const allBadges = [
      ...activeBadges.map((b) => ({ type: b.type, label: b.label, id: b.id })),
      ...customTags.map((t) => ({ type: 'custom', label: t, id: t })),
    ];
    const entry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      text: draft.trim(),
      createdAt: new Date().toISOString(),
      badges: allBadges,
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    safeSet(STORAGE_KEY, updated);
    setDraft('');
    setRemovedBadgeIds(new Set());
    setCustomTags([]);
  };

  const removeEntry = (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    safeSet(STORAGE_KEY, updated);
  };

  const closePanel = () => {
    setIsPanelClosing(true);
    setTimeout(() => {
      setReflectionOpen(false);
      setIsPanelClosing(false);
    }, 220);
  };

  // Filter tags derived from all entries
  const allFilterTags = useMemo(() => collectFilterTags(entries), [entries]);
  const filteredEntries = filterTag
    ? entries.filter((e) => e.badges?.some((b) => b.id === filterTag))
    : entries;

  if (!reflectionOpen) return null;

  return (
    <>
      <div className="journal-panel-overlay" onClick={closePanel} />
      <div className={`journal-panel${isPanelClosing ? ' journal-panel--closing' : ''}`}>
        <div className="journal-panel__header">
          <span className="journal-panel__title">Reflection</span>
          <button className="journal-panel__close" onClick={closePanel}>
            <X size={16} />
          </button>
        </div>

        <div className="journal-panel__body">
          <div className="journal-panel__section-header">
            <BookOpen size={20} style={{ color: 'var(--text2)' }} aria-hidden="true" />
            <h3 className="journal-panel__section-title">Reflection Journal</h3>
          </div>
          <p className="journal-panel__desc">A space for personal reflection, intentions, and insights.</p>

          {/* Context badges */}
          {contextBadges.length > 0 && (
            <div className="journal-panel__badges">
              {contextBadges.map((badge) => {
                const key = `${badge.type}:${badge.id}`;
                const isActive = !removedBadgeIds.has(key);
                return (
                  <button
                    key={key}
                    className={`journal-panel__badge journal-panel__badge--${badge.type}${isActive ? '' : ' journal-panel__badge--removed'}`}
                    onClick={() => toggleBadge(badge)}
                    title={isActive ? 'Click to remove badge' : 'Click to re-add badge'}
                  >
                    {badge.label}
                    {isActive && <X size={10} />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Custom tags */}
          <div className="journal-panel__custom-tags">
            {customTags.map((tag) => (
              <span key={tag} className="journal-panel__badge journal-panel__badge--custom">
                {tag}
                <button
                  className="journal-panel__custom-tag-remove"
                  onClick={() => removeCustomTag(tag)}
                  aria-label={`Remove tag ${tag}`}
                >
                  <X size={10} />
                </button>
              </span>
            ))}
            <div className="journal-panel__tag-input-row">
              <Tag size={12} style={{ color: 'var(--text3)', flexShrink: 0 }} />
              <input
                className="journal-panel__tag-input"
                type="text"
                placeholder="Add tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCustomTag(); } }}
              />
              {tagInput.trim() && (
                <button className="journal-panel__tag-add-btn" onClick={addCustomTag}>
                  <Plus size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Compose */}
          <div className="journal-panel__compose">
            <textarea
              className="journal-panel__textarea"
              placeholder="Write a reflection..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) addEntry(); }}
              rows={3}
            />
            <button
              className="btn btn-primary journal-panel__add"
              onClick={addEntry}
              disabled={!draft.trim()}
            >
              <Plus size={14} aria-hidden="true" /> Add Entry
            </button>
          </div>

          {/* Tag filter bar */}
          {allFilterTags.length > 0 && (
            <div className="journal-panel__filter-bar">
              <button
                className={`journal-panel__filter-pill${filterTag === null ? ' journal-panel__filter-pill--active' : ''}`}
                onClick={() => setFilterTag(null)}
              >
                All
              </button>
              {allFilterTags.map((t) => (
                <button
                  key={t.id}
                  className={`journal-panel__filter-pill${filterTag === t.id ? ' journal-panel__filter-pill--active' : ''}`}
                  onClick={() => setFilterTag(filterTag === t.id ? null : t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          {/* Entries */}
          {filteredEntries.length === 0 ? (
            <div className="journal-panel__empty">
              {entries.length === 0
                ? 'No journal entries yet. Start by writing a reflection above.'
                : 'No entries match this filter.'}
            </div>
          ) : (
            <div className="journal-panel__list">
              {filteredEntries.map((entry) => (
                <div key={entry.id} className="journal-panel__entry">
                  <div className="journal-panel__entry-header">
                    <span className="journal-panel__entry-date">
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                      })}
                    </span>
                    <button className="journal-panel__entry-remove" onClick={() => removeEntry(entry.id)} title="Remove entry">&times;</button>
                  </div>
                  {entry.badges?.length > 0 && (
                    <div className="journal-panel__entry-badges">
                      {entry.badges.map((b) => (
                        <span key={`${b.type}:${b.id}`} className={`journal-panel__entry-badge journal-panel__entry-badge--${b.type}`}>
                          {b.label}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="journal-panel__entry-text">{entry.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
