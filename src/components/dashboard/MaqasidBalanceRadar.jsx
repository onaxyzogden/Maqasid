import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAQASID_PILLARS, MAQASID_CORE_PILLARS } from '../../data/maqasid';
import './MaqasidBalanceRadar.css';

/**
 * Maqasid Balance Radar — 7-axis reflection of effort distribution.
 *
 * Tracks completed-task counts per pillar over the last 30 days.
 * Each axis is normalized against the max pillar value so the polygon
 * reveals shape (balance) rather than absolute volume.
 *
 * Barakah-tier widget. Invites reflection on neglected pillars —
 * NOT a scoreboard. No numeric scores, no "winner" pillar.
 *
 * Props:
 *   tasksByProject  — store shape, used to count completions per pillar
 *   projects        — store shape, used to resolve pillarId ownership
 *   days            — lookback window in days (default 30)
 *   valuesLayer     — 'islamic' | 'universal'
 */

function getPillarId(project) {
  if (project.moduleId) {
    const match = MAQASID_PILLARS.find((p) => p.subModuleIds.includes(project.moduleId));
    if (match) return match.id;
  }
  for (const pillar of MAQASID_PILLARS) {
    if (project.id.startsWith(pillar.id + '_')) return pillar.id;
  }
  return null;
}

export default function MaqasidBalanceRadar({
  tasksByProject,
  projects,
  days = 30,
  valuesLayer = 'universal',
}) {
  const isIslamic = valuesLayer === 'islamic';
  const [hover, setHover] = useState(null);

  const counts = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    cutoff.setHours(0, 0, 0, 0);
    const out = {};
    for (const p of MAQASID_CORE_PILLARS) out[p.id] = 0;
    for (const project of projects) {
      if (project.archived) continue;
      const pid = getPillarId(project);
      if (!pid || out[pid] === undefined) continue;
      const tasks = tasksByProject[project.id] || [];
      for (const t of tasks) {
        if (!t.completedAt) continue;
        if (new Date(t.completedAt) < cutoff) continue;
        out[pid] += 1;
      }
    }
    return out;
  }, [projects, tasksByProject, days]);

  const maxCount = Math.max(1, ...MAQASID_CORE_PILLARS.map((p) => counts[p.id]));
  const total = MAQASID_CORE_PILLARS.reduce((s, p) => s + counts[p.id], 0);
  const hasData = total > 0;

  // Geometry — 7-axis radar. Center at (0,0), radius 100 (viewBox 260 wide for labels).
  const N = MAQASID_CORE_PILLARS.length;
  const R = 100;
  const VB = 280;
  const cx = VB / 2;
  const cy = VB / 2;
  // Extra horizontal padding so left/right labels (e.g. "Environment", "Community")
  // aren't clipped when textAnchor pushes them past the viewBox edge.
  const PAD_X = 60;

  // Start angle: top of circle (−π/2) so first pillar appears at 12 o'clock.
  const axes = MAQASID_CORE_PILLARS.map((p, i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    return { pillar: p, angle, cos: Math.cos(angle), sin: Math.sin(angle) };
  });

  const gridRings = [0.25, 0.5, 0.75, 1];

  const polygonPoints = axes.map(({ pillar, cos, sin }) => {
    const v = counts[pillar.id] / maxCount;
    const r = v * R;
    return `${(cx + cos * r).toFixed(1)},${(cy + sin * r).toFixed(1)}`;
  }).join(' ');

  // Ghost polygon (empty state) — faint regular heptagon at 0.35 radius
  const ghostPoints = axes.map(({ cos, sin }) => {
    const r = R * 0.35;
    return `${(cx + cos * r).toFixed(1)},${(cy + sin * r).toFixed(1)}`;
  }).join(' ');

  return (
    <div className="mbr" role="figure" aria-label="Maqasid balance radar">
      <div className="mbr__header">
        <div className="mbr__title-group">
          <span className="mbr__title">
            {isIslamic ? 'Maqasid Balance' : 'Pillar Balance'}
          </span>
          {isIslamic && <span className="mbr__title-ar">توازن المقاصد</span>}
        </div>
        <span className="mbr__window">Last {days} days</span>
      </div>

      <div className="mbr__chart-wrap">
        <svg
          className="mbr__svg"
          viewBox={`${-PAD_X} 0 ${VB + PAD_X * 2} ${VB}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-hidden="true"
        >
          {/* Grid rings */}
          {gridRings.map((g, i) => (
            <polygon
              key={`ring-${i}`}
              points={axes.map(({ cos, sin }) => {
                const r = R * g;
                return `${(cx + cos * r).toFixed(1)},${(cy + sin * r).toFixed(1)}`;
              }).join(' ')}
              fill="none"
              stroke="var(--border)"
              strokeWidth={g === 1 ? 1 : 0.5}
              strokeDasharray={g === 1 ? '0' : '2 3'}
              opacity={g === 1 ? 0.7 : 0.5}
            />
          ))}

          {/* Axis spokes */}
          {axes.map(({ pillar, cos, sin }) => (
            <line
              key={`spoke-${pillar.id}`}
              x1={cx}
              y1={cy}
              x2={cx + cos * R}
              y2={cy + sin * R}
              stroke="var(--border)"
              strokeWidth={0.5}
              opacity={0.5}
            />
          ))}

          {/* Data polygon — or ghost heptagon if empty */}
          {hasData ? (
            <polygon
              points={polygonPoints}
              fill="color-mix(in srgb, var(--primary) 12%, transparent)"
              stroke="var(--primary)"
              strokeWidth={1.5}
              strokeLinejoin="round"
            />
          ) : (
            <polygon
              points={ghostPoints}
              fill="none"
              stroke="var(--text3)"
              strokeWidth={1}
              strokeDasharray="3 4"
              opacity={0.35}
            />
          )}

          {/* Axis vertices — small dots at each pillar's actual value */}
          {hasData && axes.map(({ pillar, cos, sin }) => {
            const v = counts[pillar.id] / maxCount;
            const r = v * R;
            const isHover = hover === pillar.id;
            return (
              <circle
                key={`vertex-${pillar.id}`}
                cx={cx + cos * r}
                cy={cy + sin * r}
                r={isHover ? 4 : 2.5}
                fill={pillar.accentColor}
                stroke="var(--surface)"
                strokeWidth={1.5}
                style={{ transition: 'r 160ms ease' }}
              />
            );
          })}

          {/* Labels — positioned just outside R with alignment by quadrant */}
          {axes.map(({ pillar, cos, sin }) => {
            const labelR = R + 18;
            const x = cx + cos * labelR;
            const y = cy + sin * labelR;
            const anchor = cos > 0.1 ? 'start' : cos < -0.1 ? 'end' : 'middle';
            const label = isIslamic ? pillar.sidebarLabel : pillar.universalLabel;
            const isHover = hover === pillar.id;
            return (
              <g
                key={`label-${pillar.id}`}
                onMouseEnter={() => setHover(pillar.id)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: 'pointer' }}
              >
                <text
                  x={x}
                  y={y}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  fill={isHover ? pillar.accentColor : 'var(--text2)'}
                  fontSize="10"
                  fontWeight={isHover ? 700 : 600}
                  style={{ transition: 'fill 160ms ease' }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend — subtle chip row so users can connect pillar → vertex */}
      {hasData ? (
        <div className="mbr__legend">
          {MAQASID_CORE_PILLARS.map((p) => {
            const n = counts[p.id];
            const neglected = n === 0;
            return (
              <Link
                key={p.id}
                to={`/app/pillar/${p.id}`}
                className={`mbr__chip${neglected ? ' mbr__chip--neglected' : ''}`}
                onMouseEnter={() => setHover(p.id)}
                onMouseLeave={() => setHover(null)}
                style={{ '--mbr-accent': p.accentColor }}
              >
                <span className="mbr__chip-dot" />
                <span className="mbr__chip-label">
                  {isIslamic ? p.sidebarLabel : p.universalLabel}
                </span>
                <span className="mbr__chip-count">{n}</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="mbr__empty-hint">
          {isIslamic
            ? 'Seven axes unfold as your practice accumulates — quality and harmony, not just quantity.'
            : 'The shape of your balance emerges as you complete tasks across pillars.'}
        </p>
      )}
    </div>
  );
}
