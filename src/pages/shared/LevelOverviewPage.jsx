import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { useModulesProgress } from '@hooks/useModuleProgress';
import IslamicTerm from '@components/shared/IslamicTerm';
import LevelNavigator from '@components/shared/LevelNavigator';
import IstiqamahToast from '@components/shared/IstiqamahToast';
import { useAyahBanner } from '@hooks/useAyahBanner';
import { MAQASID_PILLARS } from '@data/maqasid';
import './LevelOverviewPage.css';

function MasteryRing({ percent, color, id, muted }) {
  const r = 42;
  const stroke = 8;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  const gradId = `floRing_${id}`;
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

/**
 * Generic level overview page — bento grid of pillar cards with mastery rings.
 *
 * Props:
 *   level          — 'core' | 'growth' | 'excellence'
 *   levelColor     — hex color for this level (e.g. '#C8A96E')
 *   pillars        — array of { id, label, Icon, glossaryId?, route }
 *   storageKey     — localStorage key for active tab (passed to LevelNavigator)
 *   ensureProjects — Zustand selector fn, e.g. (s) => s.ensureHealthProjects
 *   levelRoutes    — { core: '/app/...', growth: '/app/...', excellence: '/app/...' }
 *   boardPrefix    — string, e.g. 'health' → board IDs like 'health_physical_core'
 */
export default function LevelOverviewPage({
  level,
  levelColor,
  pillars = [],
  storageKey,
  ensureProjects,
  levelRoutes = {},
  boardPrefix,
  levelDescriptions,
  showComparisonWheel = false,
  wheelCenterLabel,
  wheelExtraProps,
  ComparisonWheelComponent,
  ExcellenceCardsComponent,
  pillarAccent: pillarAccentOverride,
}) {
  const navigate = useNavigate();
  const ensureProjectsFn = useProjectStore(ensureProjects);
  const projects = useProjectStore((s) => s.projects);
  const loadTasks = useTaskStore((s) => s.loadTasks);

  const moduleIds = pillars.map((p) => p.id);

  useEffect(() => {
    ensureProjectsFn();
    // reason: mount-only ensure; ensureProjectsFn is a stable store wrapper
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (const { id } of pillars) {
      const boardId = `${boardPrefix}_${id}_${level}`;
      if (projects.some((p) => p.id === boardId)) {
        loadTasks(boardId);
      }
    }
    // reason: pillars/boardPrefix are caller-stable for a given page; deps narrowed
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, level, loadTasks]);

  const { progressMap } = useModulesProgress(moduleIds, level);
  useAyahBanner(`${boardPrefix}_${level}`);

  // Pillar identity — 2px top rule + wheel aura source of truth. Modules outside
  // MAQASID_PILLARS (e.g. OGDEN Ecosystem) pass `pillarAccent` explicitly.
  const pillarAccent =
    pillarAccentOverride ??
    MAQASID_PILLARS.find((p) => p.id === boardPrefix)?.accentColor ??
    'transparent';

  return (
    <div
      className="flo"
      style={{
        '--pillar-accent': pillarAccent,
        '--level-color': levelColor,
      }}
    >
      {/* Level selector */}
      <LevelNavigator
        compact
        controlledLevel={level}
        onLevelChange={(key) => navigate(levelRoutes[key], { viewTransition: true })}
        pillars={pillars}
        storageKey={storageKey}
        ensureProjects={ensureProjects}
        levelRoutes={levelRoutes}
        levelDescriptions={levelDescriptions}
      />

      {/* Optional: comparison wheel (per-pillar opt-in) — framed in a
          soft-glass section so the wheel has a home without feeling caged. */}
      {showComparisonWheel && ComparisonWheelComponent && (
        <section
          className="flo__section flo__section--wheel motif-soft-glass motif-shimmer-border"
          aria-label="Your pattern at this tier"
        >
          <div className="flo__wheel">
            <ComparisonWheelComponent
              centerLabel={wheelCenterLabel}
              levelColor={levelColor}
              segments={pillars.map((p) => ({
                id: p.id,
                label: p.label,
                Icon: p.Icon,
                route: p.route,
                current: progressMap[p.id]?.pct ?? 0,
              }))}
              {...(wheelExtraProps || {})}
            />
          </div>
        </section>
      )}

      {/* Bento grid */}
      <div
        className={`flo__grid${pillars.some((p) => (progressMap[p.id]?.pct ?? 0) > 0) ? ' flo__grid--has-progress' : ''}`}
      >
        {pillars.map(({ id, label, glossaryId, Icon, route }, i) => {
          const pct = progressMap[id]?.pct ?? 0;
          const state = pct > 0 ? 'started' : '0';
          return (
            <div
              key={id}
              className="flo__card"
              onClick={() => navigate(route, { viewTransition: true })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(route, { viewTransition: true })}
              data-index={i}
              data-progress={state}
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
                  : label
                }
              </h3>
              <MasteryRing percent={pct} color={levelColor} id={id} muted={pct === 0} />
            </div>
          );
        })}
      </div>

      {/* Optional: path-to-excellence cards (per-pillar opt-in) */}
      {ExcellenceCardsComponent && (
        <div className="flo__excellence">
          <ExcellenceCardsComponent />
        </div>
      )}

      {/* Milestone toast host — singleton, reads from useToastStore */}
      <IstiqamahToast />
    </div>
  );
}
