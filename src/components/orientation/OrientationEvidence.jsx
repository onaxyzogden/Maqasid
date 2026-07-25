import { lazy, Suspense, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ChunkErrorBoundary from '../shared/ChunkErrorBoundary';
// SubtaskSources renders into tdp-* classes owned by TaskDetailPanel.css —
// imported here rather than duplicated (see orientation/CONTEXT.md Gotchas).
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

export default function OrientationEvidence({ subtask }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="orient-evidence">
      <button
        type="button"
        className="orient-evidence__toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>Why &amp; how</span>
        <ChevronDown
          size={16}
          className={`orient-evidence__chevron${open ? ' orient-evidence__chevron--open' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="orient-evidence__body">
          <ChunkErrorBoundary label="Could not load evidence.">
            <Suspense fallback={<SourcesSkeleton />}>
              <SubtaskSources subtask={subtask} />
            </Suspense>
          </ChunkErrorBoundary>
        </div>
      )}
    </div>
  );
}
