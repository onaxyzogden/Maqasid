import { lazy, Suspense, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ChunkErrorBoundary from './ChunkErrorBoundary';
// SubtaskSources renders into tdp-* classes owned by TaskDetailPanel.css —
// imported here rather than duplicated (see shared/CONTEXT.md Gotchas).
import '../work/TaskDetailPanel.css';

// SubtaskSources pulls in hadith.js (1.3 MB) + quran-wbw.js (536 KB) via
// HadithCard/QuranVerseCard — lazy-load, same pattern as TaskDetailPanel.jsx.
const SubtaskSources = lazy(() => import('../work/SubtaskSources'));

function SourcesSkeleton() {
  const row = {
    height: 14,
    borderRadius: 4,
    background: 'var(--surface-2, #eee)',
    marginBottom: 10,
    opacity: 0.6,
  };
  return (
    <div aria-busy="true" aria-label="Loading sources" style={{ padding: '12px 0' }}>
      <div style={{ ...row, width: '55%' }} />
      <div style={{ ...row, width: '92%' }} />
      <div style={{ ...row, width: '78%' }} />
    </div>
  );
}

// `label`/`defaultOpen` let the same lazy-sources accordion serve as a detail
// view's "Source" section (collapsed until asked, so the 1.8 MB hadith/Qur'an
// chunk only loads on demand). Defaults suit that primary use. Class names keep
// the historical orient-evidence__ prefix (moved here from orientation/).
export default function SubtaskEvidence({ subtask, label = 'Source', defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="orient-evidence">
      <button
        type="button"
        className="orient-evidence__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{label}</span>
        <ChevronDown
          size={16}
          className={`orient-evidence__chevron${open ? ' orient-evidence__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="orient-evidence__body">
          <ChunkErrorBoundary label="Could not load sources.">
            <Suspense fallback={<SourcesSkeleton />}>
              <SubtaskSources subtask={subtask} />
            </Suspense>
          </ChunkErrorBoundary>
        </div>
      )}
    </div>
  );
}
