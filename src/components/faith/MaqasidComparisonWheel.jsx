import './MaqasidComparisonWheel.css';

const CX = 200;
const CY = 200;
const HUB_R = 56;
const LABEL_INNER_R = 142;
const PROGRESS_MAX_R = LABEL_INNER_R;
const LABEL_OUTER_R = 184;
const LABEL_ARC_R = (LABEL_INNER_R + LABEL_OUTER_R) / 2;

function polar(r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function annularSector(rInner, rOuter, startDeg, endDeg) {
  const [x1o, y1o] = polar(rOuter, startDeg);
  const [x2o, y2o] = polar(rOuter, endDeg);
  const [x1i, y1i] = polar(rInner, startDeg);
  const [x2i, y2i] = polar(rInner, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${x1i} ${y1i}`,
    `L ${x1o} ${y1o}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2o} ${y2o}`,
    `L ${x2i} ${y2i}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x1i} ${y1i}`,
    'Z',
  ].join(' ');
}

// Label arc path — flips direction for bottom-half segments so text reads upright
function labelArcPath(startDeg, endDeg) {
  const midDeg = (startDeg + endDeg) / 2;
  const normalized = ((midDeg % 360) + 360) % 360;
  const flip = normalized > 0 && normalized < 180;
  if (flip) {
    const [x1, y1] = polar(LABEL_ARC_R, endDeg);
    const [x2, y2] = polar(LABEL_ARC_R, startDeg);
    return `M ${x1} ${y1} A ${LABEL_ARC_R} ${LABEL_ARC_R} 0 0 0 ${x2} ${y2}`;
  }
  const [x1, y1] = polar(LABEL_ARC_R, startDeg);
  const [x2, y2] = polar(LABEL_ARC_R, endDeg);
  return `M ${x1} ${y1} A ${LABEL_ARC_R} ${LABEL_ARC_R} 0 0 1 ${x2} ${y2}`;
}

export default function MaqasidComparisonWheel({
  centerLabel = 'FAITH',
  levelColor = '#4ab8a8',
  segments = [],
}) {
  const n = segments.length || 1;
  const arcSize = 360 / n;
  const startOffset = -90 - arcSize / 2;

  return (
    <div className="mcw-wrap">
      <svg
        viewBox="0 0 400 400"
        className="mcw-svg"
        role="img"
        aria-label={`${centerLabel} comparison wheel`}
        style={{ '--mcw-level-color': levelColor }}
      >
        <defs>
          {/* Shared progress gradient — tinted by the active level, center-origin */}
          <radialGradient
            id="mcw-progress-grad"
            gradientUnits="userSpaceOnUse"
            cx={CX} cy={CY} r={PROGRESS_MAX_R}
            fx={CX} fy={CY}
          >
            <stop offset="0%"   stopColor={levelColor} stopOpacity="1" />
            <stop offset="35%"  stopColor={levelColor} stopOpacity="0.85" />
            <stop offset="75%"  stopColor={levelColor} stopOpacity="0.55" />
            <stop offset="100%" stopColor={levelColor} stopOpacity="0.25" />
          </radialGradient>
          {/* Dim backdrop for unfilled portions */}
          <radialGradient
            id="mcw-progress-grad-dim"
            gradientUnits="userSpaceOnUse"
            cx={CX} cy={CY} r={PROGRESS_MAX_R}
          >
            <stop offset="0%" stopColor="#1a4a4e" />
            <stop offset="100%" stopColor="#0a2326" />
          </radialGradient>
          {/* Outer label band — single level-tinted linear gradient */}
          <linearGradient id="mcw-band-level" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={levelColor} stopOpacity="0.95" />
            <stop offset="100%" stopColor={levelColor} stopOpacity="0.65" />
          </linearGradient>
          {segments.map((seg, i) => {
            const s = startOffset + i * arcSize;
            const e = s + arcSize;
            return <path key={`labelarc-${seg.id}`} id={`mcw-label-${seg.id}`} d={labelArcPath(s, e)} fill="none" />;
          })}
          <marker id="mcw-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#c9a05a" />
          </marker>
        </defs>

        {/* ───── Inner progress layer ───── */}
        {segments.map((seg, i) => {
          const startDeg = startOffset + i * arcSize;
          const endDeg = startOffset + (i + 1) * arcSize;
          const pct = Math.max(0, Math.min(100, seg.current));
          const currentR = HUB_R + (PROGRESS_MAX_R - HUB_R) * (pct / 100);
          const labelDeg = startDeg + arcSize / 2;
          const [lx, ly] = polar(HUB_R + (currentR - HUB_R) * 0.55, labelDeg);
          return (
            <g key={`inner-${seg.id}`}>
              {/* Dim backdrop for unfilled portion */}
              <path
                d={annularSector(HUB_R, PROGRESS_MAX_R, startDeg, endDeg)}
                fill="url(#mcw-progress-grad-dim)"
                className="mcw-seg-bg"
              />
              {/* Actual current progress fill (level-tinted gradient) */}
              {pct > 0 && (
                <path
                  d={annularSector(HUB_R, currentR, startDeg, endDeg)}
                  fill="url(#mcw-progress-grad)"
                  className="mcw-seg-current"
                />
              )}
              {/* Percent */}
              <text x={lx} y={ly} className="mcw-percent" textAnchor="middle" dominantBaseline="middle">
                {Math.round(seg.current)}%
              </text>
            </g>
          );
        })}

        {/* ───── Outer level-colored label ring ───── */}
        {segments.map((seg, i) => {
          const startDeg = startOffset + i * arcSize;
          const endDeg = startDeg + arcSize;
          return (
            <path
              key={`band-${seg.id}`}
              d={annularSector(LABEL_INNER_R, LABEL_OUTER_R, startDeg, endDeg)}
              fill="url(#mcw-band-level)"
              stroke="rgba(10, 20, 24, 0.85)"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Outer ring outline */}
        <circle cx={CX} cy={CY} r={LABEL_OUTER_R} className="mcw-outer-stroke" />
        <circle cx={CX} cy={CY} r={LABEL_INNER_R} className="mcw-outer-stroke" />

        {/* Curved submodule labels inside the colored band */}
        {segments.map((seg) => (
          <text key={`lbl-${seg.id}`} className="mcw-segment-label">
            <textPath href={`#mcw-label-${seg.id}`} startOffset="50%" textAnchor="middle">
              {seg.label}
            </textPath>
          </text>
        ))}

        {/* Hub */}
        <circle cx={CX} cy={CY} r={HUB_R} className="mcw-hub" />
        <circle cx={CX} cy={CY} r={HUB_R - 4} className="mcw-hub-inner" />
        <text x={CX} y={CY + 5} className="mcw-hub-label" textAnchor="middle" dominantBaseline="middle">
          {centerLabel}
        </text>
      </svg>
    </div>
  );
}
