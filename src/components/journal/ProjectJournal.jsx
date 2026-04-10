import { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { safeGetJSON } from '../../services/storage';
import './ProjectJournal.css';

const STORAGE_KEY = 'global_journal_reflection';

const FILTER_TABS = [
  { id: 'all', label: 'All' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'people', label: 'People' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'money', label: 'Money' },
  { id: 'assets', label: 'Assets' },
  { id: 'office', label: 'Office' },
  { id: 'tech', label: 'Tech' },
];

export default function ProjectJournal() {
  const [activeFilter, setActiveFilter] = useState('all');
  const entries = useMemo(() => safeGetJSON(STORAGE_KEY, []), []);

  // Show entries that have any work-context badge (submodule or bbos-task)
  const workEntries = useMemo(() => {
    return entries.filter((entry) =>
      entry.badges?.some((b) => b.type === 'submodule' || b.type === 'bbos-task')
    );
  }, [entries]);

  const filteredEntries = useMemo(() => {
    if (activeFilter === 'all') return workEntries;
    return workEntries.filter((entry) =>
      entry.badges?.some((b) => b.id === activeFilter)
    );
  }, [workEntries, activeFilter]);

  return (
    <div className="project-journal">
      <div className="project-journal__header">
        <BookOpen size={20} style={{ color: 'var(--text2)' }} />
        <h2 className="project-journal__title">Journal</h2>
        <span className="project-journal__count">{filteredEntries.length} entries</span>
      </div>

      <div className="project-journal__filter-bar">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            className={`project-journal__filter-btn${activeFilter === tab.id ? ' project-journal__filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredEntries.length === 0 ? (
        <div className="project-journal__empty">
          {workEntries.length === 0
            ? 'No journal entries with project context yet. Open the Reflection panel while working to create tagged entries.'
            : `No entries tagged with "${activeFilter}".`}
        </div>
      ) : (
        <div className="project-journal__list">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="project-journal__entry">
              <div className="project-journal__entry-header">
                <span className="project-journal__entry-date">
                  {new Date(entry.createdAt).toLocaleDateString(undefined, {
                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              </div>
              {entry.badges?.length > 0 && (
                <div className="project-journal__entry-badges">
                  {entry.badges.map((b) => (
                    <span
                      key={`${b.type}:${b.id}`}
                      className={`project-journal__badge project-journal__badge--${b.type}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              )}
              <p className="project-journal__entry-text">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
