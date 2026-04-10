import { useMemo } from 'react';
import { Star, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import './TruDashboard.css';

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Split a textarea value into non-empty lines */
function splitLines(text) {
  if (!text) return [];
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

/** Parse "Name: Score" or "Name — Score" patterns from a line */
function parseCandidateLine(line) {
  const match = line.match(/^(.+?)[\s—:–]+(\d+(?:\.\d+)?)\s*(?:\/\s*\d+)?(?:\s+(.*))?$/);
  if (match) {
    return { name: match[1].trim(), score: parseFloat(match[2]), note: match[3] || '' };
  }
  return { name: line.trim(), score: null, note: '' };
}

/** Render star icons for a 1–5 score */
function Stars({ score, max = 5 }) {
  return (
    <span className="tru-dash__stars">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < score ? 'currentColor' : 'none'}
          className={i < score ? '' : 'tru-dash__star--empty'}
        />
      ))}
    </span>
  );
}

/** Map proof-strength text/select value → 1–5 star score */
function proofStrengthToStars(val) {
  const map = { strong: 5, moderate: 3, weak: 2, insufficient: 1 };
  if (!val) return 3;
  const lower = val.toLowerCase();
  for (const [k, v] of Object.entries(map)) {
    if (lower.includes(k)) return v;
  }
  return 3;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function TruDashboard({ project, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const data = useMemo(() => {
    const tasks = tasksByProject[project.id] || [];

    const findTask = (type) => tasks.find((t) => t.bbosTaskType === type);
    const fieldData = (type) => findTask(type)?.bbosFieldData || {};

    const af1 = fieldData('TRU-AF1');
    const af2 = fieldData('TRU-AF2');
    const af3 = fieldData('TRU-AF3');
    const af4 = fieldData('TRU-AF4');
    const af5 = fieldData('TRU-AF5');
    const s3  = fieldData('TRU-S3');
    const v1  = fieldData('TRU-V1');

    // AF1: matched categories (parse lines into cards)
    const categoryLines = splitLines(af1.matchedCategories);
    const rationaleLines = splitLines(af1.matchRationale);
    const categories = categoryLines.slice(0, 4).map((name, i) => ({
      name,
      rationale: rationaleLines[i] || null,
      priority: i === 0 ? 'High Priority' : 'Developing',
    }));

    // AF2: scored niche candidates
    const candidateLines = splitLines(af2.scoredCandidates);
    const velocityLines = splitLines(af2.marketVelocityScores);
    const strategicLines = splitLines(af2.strategicScores);
    const candidates = candidateLines.slice(0, 5).map((line, i) => {
      const parsed = parseCandidateLine(line);
      const marketVelocity = velocityLines[i] ? parseFloat(velocityLines[i]) : parsed.score;
      const strategicScore = strategicLines[i] ? parseFloat(strategicLines[i]) : parsed.score;
      return { ...parsed, marketVelocity, strategicScore };
    });

    // AF3: top candidate ranking → populate matrix cells
    const topRankLines = splitLines(af3.topCandidateRanking);
    const topCandidates = topRankLines.slice(0, 3).map((l, i) => ({
      label: l.replace(/^\d+[\.\)]\s*/, ''),
      index: i + 1,
    }));

    // AF4: analysis text
    const strategicImplications = af4.strategicImplications || '';
    const gapAnalysisText = af4.gapAnalysis || '';
    const gapItems = splitLines(gapAnalysisText).slice(0, 4);

    // AF5 + S3 + V1: audit verdict
    const auditConclusion = af5.auditConclusion || '';
    const overallStrength = s3.overallProofStrength || 'moderate';
    const verdictMap = { strong: 'QUALIFIED', moderate: 'DEVELOPING', weak: 'REVIEW NEEDED', insufficient: 'BLOCKED' };
    const verdict = verdictMap[overallStrength] || 'DEVELOPING';
    const thresholdMap = { strong: '92', moderate: '68', weak: '44', insufficient: '20' };
    const threshold = thresholdMap[overallStrength] || '68';

    // Claim strength cards — from AF5 or fall back to V1 gate results
    const claimRatingsText = af5.claimStrengthRatings || '';
    const claimLines = splitLines(claimRatingsText).slice(0, 4);
    const defaultClaims = [
      { name: 'Asset Transparency', sub: 'Institutional Grade', score: v1.gateBMarketFit === 'pass' ? 5 : 3 },
      { name: 'Stakeholder Equity', sub: 'Verified Claims', score: v1.gateCCompetenceProof === 'pass' ? 5 : 3 },
      { name: 'Impact Veracity', sub: 'Secondary Audit Pending', score: v1.gateDProvenDemand === 'pass' ? 4 : 2 },
      { name: 'Governance Ethics', sub: 'Board Level Confirmed', score: v1.gateARegulatory === 'pass' ? 5 : 3 },
    ];
    const claims = claimLines.length >= 2
      ? claimLines.map((l, i) => {
          const parsed = parseCandidateLine(l);
          return {
            name: parsed.name,
            sub: parsed.note || defaultClaims[i]?.sub || 'Under Review',
            score: parsed.score ? Math.min(5, Math.round(parsed.score / 20)) : defaultClaims[i]?.score || 3,
          };
        })
      : defaultClaims;

    const taskIds = {};
    ['TRU-AF1', 'TRU-AF2', 'TRU-AF3', 'TRU-AF4', 'TRU-AF5'].forEach((type) => {
      const t = findTask(type);
      if (t) taskIds[type] = t.id;
    });

    return {
      categories, candidates, topCandidates,
      strategicImplications, gapItems,
      verdict, threshold, auditConclusion, claims,
      taskIds,
    };
  }, [tasksByProject, project]);

  const {
    categories, candidates, topCandidates,
    strategicImplications, gapItems,
    verdict, threshold, auditConclusion, claims,
    taskIds,
  } = data;

  const headProps = (type) => {
    const id = taskIds[type];
    const base = { className: 'tru-dash__card-head' };
    if (!onSelectTask || !id) return base;
    return {
      className: 'tru-dash__card-head tru-dash__card-head--link',
      onClick: () => onSelectTask(id),
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTask(id); },
    };
  };

  return (
    <div className="tru-dash">
      {/* ── Header ── */}
      <div className="tru-dash__header">
        <div className="tru-dash__eyebrow">BBOS · Stage 2 · Truth</div>
        <h2 className="tru-dash__title">Strategic Niche Analysis Dashboard</h2>
        <p className="tru-dash__desc">
          Aggregated intelligence for market expansion. This dossier evaluates niche candidates
          against Amanah standards and strategic alignment patterns.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="tru-dash__grid">

        {/* ── 01: TRU-AF1 Offer Category Match ── */}
        <div className="tru-dash__card tru-dash__card--af1">
          <div {...headProps('TRU-AF1')}>
            <span className="tru-dash__card-num">01</span>
            <span className="tru-dash__card-label">TRU-AF1: Offer Category Match</span>
          </div>
          {categories.length > 0 ? (
            <div className="tru-dash__category-list">
              {categories.map((cat, i) => (
                <div
                  key={i}
                  className={`tru-dash__category-item${i > 0 ? ' tru-dash__category-item--secondary' : ''}`}
                >
                  <div className="tru-dash__category-top">
                    <span className="tru-dash__category-tag">Matched Category</span>
                    <span className={`tru-dash__category-badge tru-dash__category-badge--${i === 0 ? 'primary' : 'secondary'}`}>
                      {cat.priority}
                    </span>
                  </div>
                  <div className="tru-dash__category-title">{cat.name}</div>
                  {cat.rationale && (
                    <p className="tru-dash__category-rationale">"{cat.rationale}"</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="tru-dash__empty-field">
              Complete TRU-AF1 to populate matched offer categories.
            </div>
          )}
        </div>

        {/* ── 02: TRU-AF2 Niche Candidates Scored ── */}
        <div className="tru-dash__card tru-dash__card--af2">
          <div className="tru-dash__table-head">
            <div {...headProps('TRU-AF2')} style={{ margin: 0 }}>
              <span className="tru-dash__card-num">02</span>
              <span className="tru-dash__card-label">TRU-AF2: Niche Candidates</span>
            </div>
          </div>
          {candidates.length > 0 ? (
            <table className="tru-dash__candidates-table">
              <thead>
                <tr>
                  <th>Candidate Profile</th>
                  <th>Market Velocity</th>
                  <th>Strategic Score</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((c, i) => {
                  const fallback = 90 - i * 8;
                  const velPct = Math.min(100, c.marketVelocity ?? fallback);
                  const stratScore = Math.round(c.strategicScore ?? fallback);
                  return (
                    <tr key={i}>
                      <td><span className="tru-dash__candidate-name">{c.name}</span></td>
                      <td>
                        <span className="tru-dash__vel-wrap">
                          <span className="tru-dash__vel-track">
                            <span className="tru-dash__vel-fill" style={{ width: `${velPct}%` }} />
                          </span>
                          <span className="tru-dash__vel-score">{(velPct / 10).toFixed(1)}/10</span>
                        </span>
                      </td>
                      <td>
                        <span className="tru-dash__strategic-score">{stratScore}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="tru-dash__empty-field">
              Complete TRU-AF2 to populate scored niche candidates.
            </div>
          )}
        </div>

        {/* ── 03: TRU-AF3 Niche Scoring Matrix ── */}
        <div className="tru-dash__card tru-dash__card--af3">
          <div {...headProps('TRU-AF3')}>
            <span className="tru-dash__card-num">03</span>
            <span className="tru-dash__card-label">TRU-AF3: Scoring Matrix</span>
          </div>
          <div className="tru-dash__matrix-outer">
            <span className="tru-dash__matrix-axis tru-dash__matrix-axis--y">Revenue Potential</span>
            <div className="tru-dash__matrix-grid">
              {/* Top-left: Challengers */}
              <div className="tru-dash__matrix-cell tru-dash__matrix-cell--challengers">
                <span className="tru-dash__matrix-qlabel">Challengers</span>
                <div className="tru-dash__matrix-dots">
                  {topCandidates.slice(2, 3).map((c, i) => (
                    <span key={i} className="tru-dash__matrix-dot tru-dash__matrix-dot--sm" style={{ background: 'var(--accent)', opacity: 0.4 }} />
                  ))}
                </div>
              </div>
              {/* Top-right: Top Candidates */}
              <div className="tru-dash__matrix-cell tru-dash__matrix-cell--top">
                <span className="tru-dash__matrix-qlabel">Top Candidates</span>
                <div className="tru-dash__matrix-dots">
                  {topCandidates.slice(0, 2).map((c, i) => (
                    <span key={i} className="tru-dash__matrix-dot" title={c.label}>
                      {c.index}
                      <span className="tru-dash__matrix-tooltip">{c.label}</span>
                    </span>
                  ))}
                  {topCandidates.length === 0 && (
                    <span className="tru-dash__matrix-dot" style={{ opacity: 0.2 }}>?</span>
                  )}
                </div>
              </div>
              {/* Bottom-left: Deferred */}
              <div className="tru-dash__matrix-cell tru-dash__matrix-cell--deferred">
                <span className="tru-dash__matrix-qlabel">Deferred</span>
                <div className="tru-dash__matrix-dots" />
              </div>
              {/* Bottom-right: Niche Specialty */}
              <div className="tru-dash__matrix-cell tru-dash__matrix-cell--niche">
                <span className="tru-dash__matrix-qlabel">Niche Specialty</span>
                <div className="tru-dash__matrix-dots">
                  <span className="tru-dash__matrix-dot tru-dash__matrix-dot--sm" style={{ background: 'var(--text3)', opacity: 0.3 }} />
                </div>
              </div>
            </div>
            <span className="tru-dash__matrix-axis">Ease of Implementation</span>
          </div>
        </div>

        {/* ── 04: TRU-AF4 Score Pattern Analysis ── */}
        <div className="tru-dash__card tru-dash__card--af4">
          <div {...headProps('TRU-AF4')}>
            <span className="tru-dash__card-num">04</span>
            <span className="tru-dash__card-label">TRU-AF4: Pattern Analysis</span>
          </div>
          <div className="tru-dash__analysis-label">Strategic Implications</div>
          {strategicImplications ? (
            <p
              className="tru-dash__analysis-body"
              dangerouslySetInnerHTML={{
                __html: strategicImplications
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\n/g, '<br/>'),
              }}
            />
          ) : (
            <p className="tru-dash__analysis-body" style={{ fontStyle: 'italic', opacity: 0.5 }}>
              Complete TRU-AF4 to see strategic implications from your scoring analysis.
            </p>
          )}
          <div className="tru-dash__gap-box">
            <div className="tru-dash__gap-title">Gap Analysis</div>
            <div className="tru-dash__gap-items">
              {gapItems.length > 0 ? (
                gapItems.map((item, i) => (
                  <span key={i} className="tru-dash__gap-item">
                    <span className="tru-dash__gap-icon">
                      {item.toLowerCase().includes('surplus') || item.toLowerCase().includes('strength')
                        ? <CheckCircle size={13} style={{ color: 'var(--success)' }} />
                        : <AlertTriangle size={13} style={{ color: 'var(--pri-urgent)' }} />
                      }
                    </span>
                    {item}
                  </span>
                ))
              ) : (
                <span className="tru-dash__gap-item" style={{ fontStyle: 'italic', opacity: 0.5 }}>
                  Gap analysis will appear once TRU-AF4 is completed.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── 05: TRU-AF5 Amanah Proof Audit ── */}
        <div className="tru-dash__card tru-dash__card--af5">
          <div className="tru-dash__audit-left">
            <div {...headProps('TRU-AF5')}>
              <span className="tru-dash__card-num">05</span>
              <span className="tru-dash__card-label">TRU-AF5: Amanah Audit</span>
            </div>
            <div className="tru-dash__verdict-wrap">
              <div className="tru-dash__verdict-label">Audit Conclusion</div>
              <div className="tru-dash__verdict-value">{verdict}</div>
              <div className="tru-dash__verdict-sub">Integrity Threshold: {threshold}% Met</div>
            </div>
            {auditConclusion && (
              <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text3)', lineHeight: 1.5, fontStyle: 'italic' }}>
                "{auditConclusion.slice(0, 180)}{auditConclusion.length > 180 ? '…' : ''}"
              </p>
            )}
          </div>
          <div className="tru-dash__audit-right">
            <div className="tru-dash__audit-right-title">Audited Claim Strength</div>
            <div className="tru-dash__claims-grid">
              {claims.map((claim, i) => (
                <div key={i} className="tru-dash__claim-card">
                  <div className="tru-dash__claim-info">
                    <span className="tru-dash__claim-name">{claim.name}</span>
                    <span className="tru-dash__claim-sub">{claim.sub}</span>
                  </div>
                  <Stars score={claim.score} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="tru-dash__footer">
        <p className="tru-dash__footer-quote">
          "True expansion is not the conquest of space, but the fulfillment of purpose."
        </p>
        <p className="tru-dash__footer-meta">
          BBOS Strategy Engine · Stage 02 TRU · {project.name}
        </p>
      </div>
    </div>
  );
}
