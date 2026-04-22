import { useState } from 'react';
import { useModulesProgress } from '@hooks/useModuleProgress';
import { useToastStore } from '@store/toastStore';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import './ModuleWheelSection.css';

const LEVEL_PATTERN = {
  core: 'dots',
  growth: 'stripes',
  excellence: 'crosshatch',
};

const LEVELS = [
  { key: 'core',       label: 'Core' },
  { key: 'growth',     label: 'Growth' },
  { key: 'excellence', label: 'Excellence' },
];

/**
 * Shared wheel mount for every Maqasid module dashboard.
 *
 * Renders a 3-way level toggle (Core / Growth / Excellence) above the
 * Maqasid Comparison Wheel. Progress is re-keyed to the selected level via
 * `useModulesProgress`, and the wheel recolors per the module's palette.
 *
 * Props:
 *   moduleLabel   — hub center label (e.g. 'LIFE')
 *   pillars       — [{ id, label, Icon, route? }]
 *   moduleIds     — string[] (usually pillars.map(p => p.id))
 *   levelColors   — { core, growth, excellence } hex map (from MODULE_PALETTE)
 *   pillarWisdom  — { [id]: {arabic, english, citation} } | null
 *   nextActions   — { [id]: {core, growth, excellence} } | null
 *   defaultLevel  — 'core' | 'growth' | 'excellence' (default: 'core')
 */
export default function ModuleWheelSection({
  moduleLabel,
  pillars = [],
  moduleIds,
  levelColors,
  pillarWisdom = null,
  nextActions = null,
  defaultLevel = 'core',
}) {
  const [level, setLevel] = useState(defaultLevel);
  const ids = moduleIds || pillars.map((p) => p.id);
  const { progressMap } = useModulesProgress(ids, level);
  const pushToast = useToastStore((s) => s.push);

  const levelColor = levelColors?.[level] || '#4ab8a8';

  const segments = pillars.map((p) => ({
    id: p.id,
    label: p.label,
    Icon: p.Icon,
    route: p.route,
    current: progressMap[p.id]?.pct ?? 0,
  }));

  const onReach100 = (seg) => {
    pushToast({
      message: `Your consistency in ${seg.label} has flourished today.`,
      pillar: seg.label,
      levelColor,
    });
  };

  return (
    <section className="mws">
      <div className="mws__toggle" role="tablist" aria-label={`${moduleLabel} level selector`}>
        {LEVELS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={level === key}
            className={`mws__toggle-btn${level === key ? ' is-active' : ''}`}
            onClick={() => setLevel(key)}
            style={level === key ? { '--mws-accent': levelColors?.[key] || levelColor } : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mws__wheel-host">
        <MaqasidComparisonWheel
          centerLabel={moduleLabel}
          levelColor={levelColor}
          levelPattern={LEVEL_PATTERN[level] || 'dots'}
          level={level}
          segments={segments}
          onReach100={onReach100}
          pillarWisdom={pillarWisdom}
          nextActions={nextActions}
        />
      </div>
    </section>
  );
}
