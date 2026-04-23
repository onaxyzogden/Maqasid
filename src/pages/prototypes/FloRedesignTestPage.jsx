import { useEffect, useState, useCallback } from 'react';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import LevelNavigator from '@components/shared/LevelNavigator';
import IslamicTerm from '@components/shared/IslamicTerm';
import IstiqamahToast from '@components/shared/IstiqamahToast';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import PathToExcellenceCards from '@components/faith/PathToExcellenceCards';
import { useToastStore } from '@store/toastStore';
import { FAITH_PILLAR_WISDOM } from '@data/faith-pillar-wisdom';
import { FAITH_NEXT_ACTIONS } from '@data/faith-next-actions';
import { MODULE_PALETTE } from '@data/module-palette';
import {
  FAITH_PILLARS,
  FAITH_LEVEL_ROUTES,
  FAITH_STORAGE_KEY,
  FAITH_ENSURE_PROJECTS,
} from '@pages/faith/FaithLevelNavigator';
import './FloRedesignTestPage.css';

/* ── Inline MasteryRing (mirrors LevelOverviewPage.jsx) ── */
function MasteryRing({ percent, color, id, muted }) {
  const r = 42;
  const stroke = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `floRxRing_${id}`;
  const ringColor = muted ? 'var(--border2)' : color;

  return (
    <svg width="110" height="110" viewBox="0 0 110 110" className="flo__ring">
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={ringColor} stopOpacity="0.5" />
          <stop offset="100%" stopColor={ringColor} />
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke={`url(#${gradId})`} strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        transform="rotate(-90 55 55)"
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
      <text x="55" y="50" textAnchor="middle" className="flo__ring-pct">{percent}%</text>
      <text x="55" y="66" textAnchor="middle" className="flo__ring-label">Complete</text>
    </svg>
  );
}

/* ── Level config (mirrors LevelNavigator internal const) ── */
const LEVEL_CONFIG = {
  core:       { color: '#C8A96E', label: 'core' },
  growth:     { color: '#4ab8a8', label: 'growth' },
  excellence: { color: '#8b5cf6', label: 'excellence' },
};

const LEVEL_PATTERN = { core: 'dots', growth: 'stripes', excellence: 'crosshatch' };

/* Mock progress — shows Active Neutrality treatment with mix of 0% and ≥1% */
const MOCK_PROGRESS = {
  shahada: { pct: 42 },
  salat:   { pct: 0  },
  zakat:   { pct: 0  },
  siyam:   { pct: 18 },
  hajj:    { pct: 0  },
};

/* Faith accent from MAQASID_PILLARS canonical (duplicated here to avoid hop) */
const FAITH_PILLAR_ACCENT = '#C8A96E';

const FAITH_OVERVIEW_PILLARS = FAITH_PILLARS.map((p) => ({ ...p, glossaryId: p.id }));

export default function FloRedesignTestPage() {
  const [level, setLevel] = useState('core');
  const levelColor = LEVEL_CONFIG[level].color;

  const ensureProjectsFn = useProjectStore(FAITH_ENSURE_PROJECTS);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);
  const pushToast = useToastStore((s) => s.push);

  useEffect(() => { ensureProjectsFn?.(); }, []);

  useEffect(() => {
    for (const { id } of FAITH_PILLARS) {
      const boardId = `faith_${id}_${level}`;
      if (projects.some((p) => p.id === boardId)) loadTasks(boardId);
    }
  }, [projects, level, loadTasks]);

  const onReach100 = useCallback(
    (seg) => pushToast({ message: `Your consistency in ${seg.label} has flourished today.`, pillar: seg.label, levelColor }),
    [pushToast, levelColor],
  );

  return (
    <div
      className="flo flo-rx"
      style={{
        '--pillar-accent': FAITH_PILLAR_ACCENT,
        '--level-color':   levelColor,
      }}
    >
      {/* Level selector — use prototype-local handler so the page stays on /flo-redesign-test */}
      <LevelNavigator
        compact
        controlledLevel={level}
        onLevelChange={setLevel}
        pillars={FAITH_OVERVIEW_PILLARS}
        storageKey={FAITH_STORAGE_KEY}
        ensureProjects={FAITH_ENSURE_PROJECTS}
        levelRoutes={FAITH_LEVEL_ROUTES}
      />

      {/* ── Section 1: Comparison wheel ── */}
      <div className="flo__wheel flo-rx__wheel">
        <MaqasidComparisonWheel
          centerLabel="FAITH"
          levelColor={levelColor}
          segments={FAITH_OVERVIEW_PILLARS.map((p) => ({
            id: p.id,
            label: p.label,
            Icon: p.Icon,
            route: p.route,
            current: MOCK_PROGRESS[p.id]?.pct ?? 0,
          }))}
          levelPattern={LEVEL_PATTERN[level]}
          level={level}
          onReach100={onReach100}
          pillarWisdom={FAITH_PILLAR_WISDOM}
          nextActions={FAITH_NEXT_ACTIONS}
          themeColor={MODULE_PALETTE.faith.theme}
        />
      </div>

      {/* ── Section 2: Bento grid ── */}
      <div className="flo__grid flo-rx__grid">
        {FAITH_OVERVIEW_PILLARS.map(({ id, label, glossaryId, Icon, route }, i) => {
          const pct = MOCK_PROGRESS[id]?.pct ?? 0;
          const state = pct > 0 ? 'started' : '0';
          return (
            <div
              key={id}
              className="flo__card"
              data-index={i}
              data-progress={state}
              role="button"
              tabIndex={0}
            >
              <div
                className="flo__card-icon"
                style={{ color: levelColor, background: `color-mix(in srgb, ${levelColor} 12%, var(--surface))` }}
              >
                <Icon size={20} />
              </div>
              <h3 className="flo__card-name">
                {glossaryId
                  ? <IslamicTerm id={glossaryId}>{label}</IslamicTerm>
                  : label}
              </h3>
              <MasteryRing percent={pct} color={levelColor} id={id} muted={pct === 0} />
            </div>
          );
        })}
      </div>

      {/* ── Section 3: Path to Excellence ── */}
      <div className="flo__excellence flo-rx__excellence">
        <PathToExcellenceCards />
      </div>

      <IstiqamahToast />
    </div>
  );
}
