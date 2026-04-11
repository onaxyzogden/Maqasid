import { useMemo, Fragment } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Star } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import { getBbosTaskDefsByStage } from '../../data/bbos/bbos-task-definitions';
import { getStage } from '../../data/bbos/bbos-pipeline';
import { getTaskAccessLevel } from '../../data/bbos/bbos-role-access';
import DashboardTaskCard from '../shared/DashboardTaskCard';
import './BbosFullDashboard.css';

// ── Helpers ───────────────────────────────────────────────────────────────────

function splitLines(text) {
  if (!text) return [];
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

function truncate(text, max) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '…' : text;
}

function resolveSelectLabel(field, value) {
  if (!value || !field.options) return value || null;
  const opt = field.options.find((o) => o.value === value);
  return opt ? opt.label : value;
}

function countFilledFields(def, fieldData) {
  if (!fieldData) return { filled: 0, total: def.fields.length };
  const filled = def.fields.filter((f) => {
    const v = fieldData[f.id];
    return v !== undefined && v !== null && String(v).trim() !== '';
  }).length;
  return { filled, total: def.fields.length };
}

function getSubLevelPrefix(subLevel) {
  if (!subLevel) return 'OTHER';
  if (subLevel.startsWith('AF'))  return 'AF';
  if (subLevel.startsWith('IFB')) return 'IFB';
  if (subLevel.startsWith('FP'))  return 'FP';
  if (subLevel.startsWith('S'))   return 'S';
  if (subLevel.startsWith('A'))   return 'A';
  if (subLevel.startsWith('V'))   return 'V';
  if (subLevel.startsWith('IC'))  return 'IC';
  return 'OTHER';
}

const PREFIX_LABELS = {
  AF:    'Analysis Framework',
  S:     'Strategic Tasks',
  A:     'Asset Tasks',
  V:     'Validation Gates',
  FP:    'Framework Prompts',
  IFB:   'IFB Forms',
  IC:    'Integrity Check',
  OTHER: 'Additional Tasks',
};

// ── Factory classification ───────────────────────────────────────────────────
const RESEARCH_PREFIXES = new Set(['S', 'V', 'FP']);
const ASSET_PREFIXES = new Set(['A', 'AF', 'IC']);

function getFactory(prefix) {
  if (RESEARCH_PREFIXES.has(prefix)) return 'research';
  if (ASSET_PREFIXES.has(prefix)) return 'asset';
  return 'research'; // default fallback
}

// ── Bento grid spans (12-column) ─────────────────────────────────────────────

function computeGroupSpans(prefix, defs) {
  if (prefix === 'IC') return defs.map(() => 12);
  const spans = [];
  for (let i = 0; i < defs.length; i += 2) {
    const a = defs[i];
    const b = defs[i + 1];
    if (!b) {
      spans.push(12); // solo card at end of odd-count group
    } else {
      const aLen = a.label.length;
      const bLen = b.label.length;
      if (aLen >= bLen) {
        spans.push(7, 5); // a longer or equal → a gets wide slot
      } else {
        spans.push(5, 7); // b longer → b gets wide slot
      }
    }
  }
  return spans;
}

// ── Star rating helpers ───────────────────────────────────────────────────────

function renderStars(score, max = 3) {
  return (
    <span className="bfd__pa-stars">
      {Array.from({ length: max }, (_, i) => i + 1).map((i) => (
        <Star
          key={i}
          size={13}
          className={i <= score ? '' : 'bfd__pa-star--empty'}
          fill={i <= score ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  );
}

function ratingToStars(text) {
  const t = (text || '').trim();
  if (t.startsWith('Strong'))                                       return 3;
  if (t.startsWith('Moderate'))                                     return 2;
  if (t.startsWith('Weak'))                                         return 1;
  if (t.startsWith('Unverifiable') || t.startsWith('Insufficient')) return 1;
  return null; // fallback: render as text
}

// ── Stage quotes ──────────────────────────────────────────────────────────────

const STAGE_QUOTES = {
  FND: '"He who is not truthful in establishing the foundation has built upon sand."',
  TRU: '"A business built on self-deception is a business that cannot sustain."',
  STR: '"Before you speak a word to the market, be certain of the truth behind it."',
  OFR: '"The offering is only as sound as the promise it is built upon."',
  OUT: '"Reach those who need you — not those you want to sell to."',
  SAL: '"A sale is not a conquest — it is a covenant entered freely by both parties."',
  DLR: '"Excellence in delivery is not efficiency alone — it is that the client feels cared for at every step."',
  RET: '"The bond after the sale is the true measure of the relationship."',
  OPT: '"Optimization without integrity is just efficient exploitation."',
};

// ── Stage weighted-signal scoring ─────────────────────────────────────────────

function countNonEmpty(...keys) {
  return (fd) => {
    const n = keys.filter((k) => !!fd?.[k]?.trim?.()).length;
    const t = keys.length;
    return n === t ? 5 : n >= t * 0.75 ? 4 : n >= t * 0.5 ? 3 : n >= 1 ? 1 : 0;
  };
}

const STAGE_SCORE_SIGNALS = {
  FND: [
    { label: 'Capital & Skills Declared',  taskId: 'FND-S1',
      score: countNonEmpty('capitalDeclaration', 'skillsDeclaration') },
    { label: 'Proof & Constraints',        taskId: 'FND-S1',
      score: countNonEmpty('proofLinks', 'constraintsDeclaration', 'geographyDeclaration', 'regulatoryDeclaration') },
    { label: 'Normalisation Complete',     taskId: 'FND-S2',
      score: countNonEmpty('capitalMapping', 'skillsMapping', 'proofMapping', 'constraintsMapping') },
    { label: 'Gap Severity Assessed',      taskId: 'FND-S3',
      score: (fd) => fd?.gapSeverity?.trim() ? (fd?.resolutionActions?.trim() ? 5 : 3) : 0 },
    { label: 'Routing Decision Made',      taskId: 'FND-S4',
      score: (fd) => fd?.routingDecision?.trim() ? (fd?.routingBasis?.trim() ? 5 : 3) : 0 },
  ],
  TRU: [
    { label: 'Overall Proof Strength',    taskId: 'TRU-S3',
      score: (fd) => ({ strong: 5, moderate: 3, weak: 1, insufficient: 0 }[fd?.overallProofStrength] ?? 0) },
    { label: 'Gate A — Regulatory',       taskId: 'TRU-V1',
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateARegulatory] ?? 0) },
    { label: 'Gate B — Market Fit',       taskId: 'TRU-V1',
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateBMarketFit] ?? 0) },
    { label: 'Gate C — Competence Proof', taskId: 'TRU-V1',
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateCCompetenceProof] ?? 0) },
    { label: 'Gate D — Proven Demand',    taskId: 'TRU-V1',
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateDProvenDemand] ?? 0) },
  ],
  STR: [
    { label: 'Integrity Verdict',     taskId: 'STR-V1',
      score: (fd) => ({ pass: 5, conditionalPass: 3, fail: 0 }[fd?.integrityVerdict] ?? 0) },
    { label: 'VoC Depth',             taskId: 'STR-S2',
      score: (fd) => { const n = splitLines(fd?.verbatimPhrases).length; return n >= 15 ? 5 : n >= 8 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Content Angles',        taskId: 'STR-AF4',
      score: (fd) => { const n = [1,2,3,4,5,6].filter((i) => !!fd?.[`contentAngle${i}`]?.trim()).length; return n === 6 ? 5 : n >= 4 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Core Belief Defined',   taskId: 'STR-AF1',
      score: (fd) => fd?.beliefStatement?.trim() ? 5 : 0 },
    { label: 'Transformation Arc',    taskId: 'STR-AF2',
      score: (fd) => { const n = ['beforeState','transformation','afterState'].filter((k) => !!fd?.[k]?.trim()).length; return n === 3 ? 5 : n === 2 ? 3 : n === 1 ? 1 : 0; } },
  ],
  OFR: [
    { label: 'Promise G-Label',       taskId: 'OFR-A1',
      score: (fd) => ({ G1: 5, G2: 3 }[fd?.promiseGLabel] ?? 0) },
    { label: 'ICP Completeness',      taskId: 'OFR-A2',
      score: (fd) => { const n = ['demographicProfile','psychographicProfile','qualificationCriteria','disqualificationCriteria'].filter((k) => !!fd?.[k]?.trim()).length; return n === 4 ? 5 : n === 3 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Guarantee Rigor',       taskId: 'OFR-A6',
      score: (fd) => { const n = ['triggerCondition','guaranteeScope','remedy','operatorBoundaries'].filter((k) => !!fd?.[k]?.trim()).length; return n === 4 ? 5 : n === 3 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Scope Map',             taskId: 'OFR-A4',
      score: (fd) => (!!fd?.scopeIncluded?.trim() && !!fd?.scopeExcluded?.trim()) ? 5 : (!!fd?.scopeIncluded?.trim() || !!fd?.scopeExcluded?.trim()) ? 3 : 0 },
    { label: 'Promise Proof',         taskId: 'OFR-A1',
      score: (fd) => ({ verified: 5, pending: 1 }[fd?.proofStatus] ?? 0) },
  ],
  OUT: [
    { label: 'Audience Concern Mapping', taskId: 'OUT-IC',
      score: (fd) => fd?.icOut1 === 'pass' ? 5 : 0 },
    { label: 'G-Label Compliance',       taskId: 'OUT-IC',
      score: (fd) => fd?.icOut2 === 'pass' ? 5 : 0 },
    { label: 'Singular CTA',             taskId: 'OUT-IC',
      score: (fd) => fd?.icOut3 === 'pass' ? 5 : 0 },
    { label: 'Scarcity Verified',        taskId: 'OUT-IC',
      score: (fd) => fd?.icOut4 === 'pass' ? 5 : 0 },
    { label: 'Readability Check',        taskId: 'OUT-IC',
      score: (fd) => fd?.icOut5 === 'pass' ? 5 : 0 },
  ],
  SAL: [
    { label: 'Qualification Depth',       taskId: 'SAL-S1',
      score: countNonEmpty('qualificationQuestions', 'autoDisqualifiers', 'scoringRoutingNotes') },
    { label: 'Routing Completeness',      taskId: 'SAL-S2',
      score: countNonEmpty('routingTable', 'decisionTreeSteps', 'noFitExitPath') },
    { label: 'Call Script Ready',         taskId: 'SAL-S3',
      score: countNonEmpty('callStructure', 'verbatimScript', 'branchPrompts') },
    { label: 'Objection Coverage',        taskId: 'SAL-S4',
      score: (fd) => { const n = splitLines(fd?.objectionList).length; return n >= 10 ? 5 : n >= 5 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Asset Assembly',            taskId: 'SAL-A0',
      score: (fd) => ({ complete: 5, partial: 3, pending: 1 }[fd?.assemblyStatus] ?? 0) },
  ],
  DLR: [
    { label: 'Delivery Phases Mapped',    taskId: 'DLR-S1',
      score: countNonEmpty('deliveryPhases', 'checkpoints', 'ownerAssignments') },
    { label: 'Quality & Risk Coverage',   taskId: 'DLR-S2',
      score: countNonEmpty('failureModes', 'qcChecks', 'guaranteeTriggers', 'mitigationSteps') },
    { label: 'Success Milestones',        taskId: 'DLR-S3',
      score: countNonEmpty('milestoneList', 'successDefinition') },
    { label: 'Proof Capture Plan',        taskId: 'DLR-S4',
      score: countNonEmpty('proofTypes', 'captureTimeline', 'captureMethod', 'consentLanguage') },
    { label: 'Retention Handoff',         taskId: 'DLR-S5',
      score: countNonEmpty('handoffNotes', 'retentionSeedMessage', 'nextSteps') },
  ],
  RET: [
    { label: 'Segment Definitions',       taskId: 'RET-S1',
      score: countNonEmpty('coldLeadDef', 'pastClientDef', 'reActivationDef', 'warmNonConvertDef') },
    { label: 'Proof Inventory',           taskId: 'RET-S2',
      score: countNonEmpty('proofAssets', 'segmentRelevance', 'claimStrength') },
    { label: 'Continuation Map',          taskId: 'RET-S3',
      score: countNonEmpty('upsellPath', 'ascensionLevels', 'eligibilityRules', 'triggerTiming') },
    { label: 'Message Spine & Tone',      taskId: 'RET-S4',
      score: countNonEmpty('warmingPosture', 'toneConstraints', 'ctaStandards', 'messageSpines') },
    { label: 'Deployment Logic',          taskId: 'RET-S5',
      score: countNonEmpty('proofToSequenceMap', 'channelAssumptions') },
  ],
  OPT: [
    { label: 'Metrics Tracked',           taskId: 'OPT-S1',
      score: countNonEmpty('cm1OutreachConversion', 'cm2FitToClose', 'cm3MilestoneCompletion', 'cm4UnpromptedReferral') },
    { label: 'Weakest Link Identified',   taskId: 'OPT-S2',
      score: countNonEmpty('weakestLinkStage', 'evidenceSummary', 'suspectedFailureModes') },
    { label: 'Root Cause Hypotheses',     taskId: 'OPT-S3',
      score: (fd) => fd?.hypotheses?.trim() ? (fd?.risksAndSideEffects?.trim() ? 5 : 3) : 0 },
    { label: 'Optimization Actions',      taskId: 'OPT-S4',
      score: countNonEmpty('action1', 'action2', 'action3') },
    { label: 'Stewardship Score',         taskId: 'OPT-A1',
      score: (fd) => { const s = Number(fd?.overallStewardshipScore); return s >= 80 ? 5 : s >= 60 ? 4 : s >= 40 ? 3 : s >= 20 ? 1 : 0; } },
  ],
};

// ── Sub-renderers ─────────────────────────────────────────────────────────────

// CategoryGridRenderer — TRU-AF1
function CategoryGridRenderer({ fieldData }) {
  const categories = splitLines(fieldData.matchedCategories).slice(0, 4);
  const rationales = splitLines(fieldData.matchRationale);
  return (
    <div className="bfd__cat-grid">
      {categories.length > 0 ? categories.map((cat, i) => (
        <div key={i} className={`bfd__cat-item ${i === 0 ? 'bfd__cat-item--primary' : ''}`}>
          <span className="bfd__cat-item-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="bfd__cat-item-body">
            <div className="bfd__cat-item-name">{truncate(cat, 70)}</div>
            {rationales[i] && <div className="bfd__cat-item-rationale">{truncate(rationales[i], 90)}</div>}
          </div>
        </div>
      )) : <span className="bfd__field-empty">—</span>}
    </div>
  );
}

// CandidateTableRenderer — TRU-AF2
function parseCandidateLine(line) {
  const match = line.match(/^(.+?)[\s:—\-]+(\d+(?:\.\d+)?)\s*(.*)$/);
  if (match) return { name: match[1].trim(), score: parseFloat(match[2]), note: match[3].trim() };
  return { name: line.trim(), score: null, note: '' };
}

function CandidateTableRenderer({ fieldData }) {
  const candidates = splitLines(fieldData.scoredCandidates).slice(0, 6);
  const velocityLines = splitLines(fieldData.marketVelocityScores);
  const strategicLines = splitLines(fieldData.strategicScores);
  if (candidates.length === 0) return <span className="bfd__field-empty">—</span>;
  return (
    <div className="bfd__cand-table">
      <div className="bfd__cand-head">
        <span>Candidate</span>
        <span>Mkt Vel.</span>
        <span>Strategic</span>
      </div>
      {candidates.map((line, i) => {
        const parsed = parseCandidateLine(line);
        const vel = parseFloat(velocityLines[i]) || (parsed.score ?? null);
        const strat = parseFloat(strategicLines[i]) || (parsed.score ?? null);
        return (
          <div key={i} className="bfd__cand-row">
            <span className="bfd__cand-name">{truncate(parsed.name, 36)}</span>
            <span className="bfd__cand-score">{vel != null ? vel : '—'}</span>
            <span className="bfd__cand-score">{strat != null ? strat : '—'}</span>
          </div>
        );
      })}
    </div>
  );
}

// Matrix2x2Renderer — TRU-AF3, OFR-A2
function Matrix2x2Renderer({ quadrants }) {
  return (
    <div className="bfd__matrix">
      {quadrants.map((q, i) => (
        <div key={i} className={`bfd__matrix-cell ${q.accent ? 'bfd__matrix-cell--accent' : ''}`}>
          <div className="bfd__matrix-cell-label">{q.label}</div>
          <div className="bfd__matrix-cell-content">
            {q.content || <span className="bfd__field-empty">—</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// GateChecksRenderer — TRU-V1, STR-V1, OUT-IC
function GateChecksRenderer({ checks, overallValue, overallLabel }) {
  const passCount = checks.filter((c) => c.value === 'pass').length;
  const allPending = checks.every((c) => !c.value);
  const verdict = allPending ? 'PENDING' : passCount === checks.length ? 'CLEARED' : checks.some((c) => c.value === 'fail') ? 'BLOCKED' : 'PARTIAL';
  const verdictColor = { CLEARED: 'var(--col-done)', BLOCKED: 'var(--pri-urgent)', PARTIAL: 'var(--pri-high)', PENDING: 'var(--text3)' }[verdict];
  return (
    <div className="bfd__gate-checks">
      <div className="bfd__gate-summary" style={{ color: verdictColor }}>
        <span className="bfd__gate-verdict">{overallLabel || verdict}</span>
        <span className="bfd__gate-count">{passCount}/{checks.length} passed</span>
      </div>
      {checks.map((check, i) => {
        const isPass = check.value === 'pass';
        const isFail = check.value === 'fail';
        const isCond = check.value === 'conditional';
        return (
          <div key={i} className={`bfd__gate-check bfd__gate-check--${check.value || 'pending'}`}>
            <span className="bfd__gate-check-icon">
              {isPass ? <CheckCircle size={13} style={{ color: 'var(--col-done)' }} />
               : isFail ? <XCircle size={13} style={{ color: 'var(--pri-urgent)' }} />
               : isCond ? <AlertTriangle size={13} style={{ color: 'var(--pri-high)' }} />
               : <span className="bfd__gate-pending-dot" />}
            </span>
            <span className="bfd__gate-check-label">{check.label}</span>
            <span className={`bfd__gate-check-badge bfd__gate-check-badge--${check.value || 'pending'}`}>
              {isPass ? 'PASS' : isFail ? 'FAIL' : isCond ? 'COND' : '—'}
            </span>
          </div>
        );
      })}
      {overallValue && (
        <div className="bfd__gate-overall">
          <span className="bfd__gate-overall-label">Overall</span>
          <span className="bfd__gate-overall-value">{overallLabel || overallValue.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

// ProofAuditRenderer — TRU-AF5
function ProofAuditRenderer({ fieldData }) {
  const claims = splitLines(fieldData.auditedClaims).slice(0, 5);
  const ratings = splitLines(fieldData.claimStrengthRatings);
  const conclusion = fieldData.auditConclusion || '';
  return (
    <div className="bfd__proof-audit">
      {claims.length > 0 && (
        <div className="bfd__audit-list">
          {claims.map((claim, i) => (
            <div key={i} className="bfd__audit-item">
              <span className="bfd__audit-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="bfd__audit-body">
                <div className="bfd__audit-claim">{truncate(claim, 90)}</div>
                {ratings[i] && (
                  <div className="bfd__audit-rating">
                    {ratingToStars(ratings[i]) !== null
                      ? <>{renderStars(ratingToStars(ratings[i]))}<span className="bfd__audit-rating-label">{ratings[i].split('—')[0].trim()}</span></>
                      : truncate(ratings[i], 70)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {conclusion && (
        <div className="bfd__audit-conclusion">
          <div className="bfd__audit-conclusion-label">Audit Conclusion</div>
          <p>{truncate(conclusion, 200)}</p>
        </div>
      )}
      {claims.length === 0 && !conclusion && <span className="bfd__field-empty">—</span>}
    </div>
  );
}

// TransformationArcRenderer — STR-AF2
function TransformationArcRenderer({ fieldData }) {
  const steps = [
    { label: 'Before', content: fieldData.beforeState, cls: 'bfd__arc-step--before' },
    { label: 'Transformation', content: fieldData.transformation, cls: 'bfd__arc-step--mid' },
    { label: 'After', content: fieldData.afterState, cls: 'bfd__arc-step--after' },
  ];
  return (
    <div className="bfd__arc">
      {steps.map((step, i) => (
        <Fragment key={i}>
          <div className={`bfd__arc-step ${step.cls}`}>
            <div className="bfd__arc-step-label">{step.label}</div>
            <div className="bfd__arc-step-content">
              {step.content ? truncate(step.content, 150) : <span className="bfd__field-empty">—</span>}
            </div>
          </div>
          {i < steps.length - 1 && <div className="bfd__arc-connector">↓</div>}
        </Fragment>
      ))}
    </div>
  );
}

// ContentGridRenderer — STR-AF4
function ContentGridRenderer({ fieldData }) {
  const angles = [1, 2, 3, 4, 5, 6]
    .map((n) => ({ n, text: fieldData[`contentAngle${n}`] }))
    .filter((a) => a.text);
  if (angles.length === 0) return <span className="bfd__field-empty">—</span>;
  return (
    <div className="bfd__content-grid">
      {angles.map(({ n, text }) => (
        <div key={n} className="bfd__content-angle">
          <div className="bfd__content-angle-num">Angle {n}</div>
          <div className="bfd__content-angle-text">{truncate(text, 100)}</div>
        </div>
      ))}
    </div>
  );
}

// VerdictBadgeRenderer — FND-S4, STR-V1
function VerdictBadgeRenderer({ verdict, color, basisLabel, basisContent }) {
  return (
    <div className="bfd__verdict-wrap">
      <div
        className="bfd__verdict-badge"
        style={{ color, borderColor: color, background: `color-mix(in srgb, ${color} 10%, transparent)` }}
      >
        <div className="bfd__verdict-badge-label">Status</div>
        <div className="bfd__verdict-badge-value">{verdict}</div>
      </div>
      {basisContent && (
        <div className="bfd__verdict-basis">
          <div className="bfd__verdict-basis-label">{basisLabel || 'Basis'}</div>
          <p className="bfd__verdict-basis-text">{truncate(basisContent, 200)}</p>
        </div>
      )}
      {!basisContent && <span className="bfd__verdict-empty">No basis recorded.</span>}
    </div>
  );
}

// TimelineRenderer — OUT-A4, DLR-S3
function TimelineRenderer({ steps, subItems, exitNote, exitLabel }) {
  if (steps.length === 0) return <span className="bfd__field-empty">—</span>;
  return (
    <div className="bfd__timeline">
      {steps.map((step, i) => (
        <div key={i} className="bfd__timeline-step">
          <div className="bfd__timeline-marker">
            <span className="bfd__timeline-dot" />
            {i < steps.length - 1 && <span className="bfd__timeline-line" />}
          </div>
          <div className="bfd__timeline-body">
            <span className="bfd__timeline-touch">{subItems?.[i] ?? `Step ${i + 1}`}</span>
            <span className="bfd__timeline-text">{truncate(step, 110)}</span>
          </div>
        </div>
      ))}
      {exitNote && (
        <div className="bfd__timeline-exit">
          <div className="bfd__timeline-exit-label">{exitLabel || 'Exit / Definition'}</div>
          <p>{truncate(exitNote, 130)}</p>
        </div>
      )}
    </div>
  );
}

// SegmentListRenderer — SAL-A3
function SegmentListRenderer({ fieldData }) {
  const SEGS = ['HOT', 'WARM', 'COLD'];
  const criteriaLines = splitLines(fieldData.criteriaDefinitions).slice(0, 3);
  const treeSteps = splitLines(fieldData.treeSteps).slice(0, 5);
  return (
    <div className="bfd__segment-wrap">
      {criteriaLines.length > 0 ? (
        <div className="bfd__segment-list">
          {criteriaLines.map((line, i) => (
            <div key={i} className={`bfd__segment bfd__segment--${(SEGS[i] || 'cold').toLowerCase()}`}>
              <span className="bfd__segment-badge">{SEGS[i] || `SEG ${i + 1}`}</span>
              <span className="bfd__segment-text">{truncate(line, 100)}</span>
            </div>
          ))}
        </div>
      ) : (
        <span className="bfd__field-empty">No criteria defined.</span>
      )}
      {treeSteps.length > 0 && (
        <div className="bfd__tree-steps">
          {treeSteps.map((step, i) => (
            <div key={i} className="bfd__tree-step">
              <span className="bfd__tree-arrow">→</span>
              <span>{truncate(step, 90)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── TASK_RENDERERS registry ───────────────────────────────────────────────────

const TASK_RENDERERS = {
  'TRU-AF1': ({ fieldData }) => <CategoryGridRenderer fieldData={fieldData} />,

  'TRU-AF2': ({ fieldData }) => <CandidateTableRenderer fieldData={fieldData} />,

  'TRU-AF3': ({ fieldData }) => {
    const lines = splitLines(fieldData.topCandidateRanking);
    const clean = lines.map((l) => l.replace(/^\d+[\.\)]\s*/, '').trim());
    const quadrants = [
      { label: 'High Revenue · High Ease',  content: clean.slice(0, 2).join('\n') || null, accent: true },
      { label: 'High Revenue · Low Ease',   content: clean[2] || null },
      { label: 'Low Revenue · High Ease',   content: clean[3] || null },
      { label: 'Low Revenue · Low Ease',    content: clean[4] || null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  'TRU-AF5': ({ fieldData }) => <ProofAuditRenderer fieldData={fieldData} />,

  'TRU-V1': ({ fieldData }) => {
    const checks = [
      { label: 'Gate A — Regulatory Clearance',   value: fieldData.gateARegulatory },
      { label: 'Gate B — Addressable Market Fit',  value: fieldData.gateBMarketFit },
      { label: 'Gate C — Competence Proof',        value: fieldData.gateCCompetenceProof },
      { label: 'Gate D — Proven Demand',           value: fieldData.gateDProvenDemand },
    ];
    const viabilityLabels = { viable: 'VIABLE', conditionallyViable: 'CONDITIONAL', removed: 'REMOVED' };
    return (
      <GateChecksRenderer
        checks={checks}
        overallValue={fieldData.overallViability}
        overallLabel={viabilityLabels[fieldData.overallViability]}
      />
    );
  },

  'STR-AF2': ({ fieldData }) => <TransformationArcRenderer fieldData={fieldData} />,

  'STR-AF4': ({ fieldData }) => <ContentGridRenderer fieldData={fieldData} />,

  'STR-V1': ({ fieldData }) => {
    const verdictMap = { pass: 'CLEARED', conditionalPass: 'CONDITIONAL', fail: 'BLOCKED' };
    const verdict = verdictMap[fieldData.integrityVerdict] || 'PENDING';
    const colorMap = {
      CLEARED:     'var(--col-done)',
      CONDITIONAL: 'var(--pri-high)',
      BLOCKED:     'var(--pri-urgent)',
      PENDING:     'var(--text3)',
    };
    return (
      <VerdictBadgeRenderer
        verdict={verdict}
        color={colorMap[verdict]}
        basisLabel="Integrity Assessment"
        basisContent={fieldData.integrityAssessment}
      />
    );
  },

  'OFR-A2': ({ fieldData }) => {
    const quadrants = [
      { label: 'Demographic Profile',    content: fieldData.demographicProfile    ? truncate(fieldData.demographicProfile, 130)    : null },
      { label: 'Psychographic Profile',  content: fieldData.psychographicProfile  ? truncate(fieldData.psychographicProfile, 130)  : null },
      { label: 'Qualifies When',         content: fieldData.qualificationCriteria ? truncate(fieldData.qualificationCriteria, 130) : null, accent: true },
      { label: 'Disqualified When',      content: fieldData.disqualificationCriteria ? truncate(fieldData.disqualificationCriteria, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  'OUT-A4': ({ fieldData }) => {
    const steps = splitLines(fieldData.sequenceMap).slice(0, 8);
    const touches = steps.map((_, i) => `Touch ${i + 1}`);
    return <TimelineRenderer steps={steps} subItems={touches} exitNote={fieldData.exitCriteria} exitLabel="Exit Criteria" />;
  },

  'OUT-IC': ({ fieldData }) => {
    const checks = [
      { label: 'Audience Concern Mapping', value: fieldData.icOut1 },
      { label: 'G-Label Compliance',       value: fieldData.icOut2 },
      { label: 'Singular CTA',             value: fieldData.icOut3 },
      { label: 'Scarcity Verified',        value: fieldData.icOut4 },
      { label: 'Readability Check',        value: fieldData.icOut5 },
    ];
    return <GateChecksRenderer checks={checks} />;
  },

  'SAL-A3': ({ fieldData }) => <SegmentListRenderer fieldData={fieldData} />,

  'FND-S4': ({ fieldData }) => {
    const verdictMap = { proceed: 'PROCEED', incomplete: 'INCOMPLETE', reject: 'REJECT' };
    const verdict = verdictMap[fieldData.routingDecision] || 'PENDING';
    const colorMap = {
      PROCEED:    'var(--col-done)',
      INCOMPLETE: 'var(--pri-high)',
      REJECT:     'var(--pri-urgent)',
      PENDING:    'var(--text3)',
    };
    return (
      <VerdictBadgeRenderer
        verdict={verdict}
        color={colorMap[verdict]}
        basisLabel="Routing Basis"
        basisContent={fieldData.routingBasis}
      />
    );
  },

  'DLR-S3': ({ fieldData }) => {
    const steps = splitLines(fieldData.milestoneList).slice(0, 5);
    const labels = steps.map((_, i) => `Milestone ${i + 1}`);
    return (
      <TimelineRenderer
        steps={steps}
        subItems={labels}
        exitNote={fieldData.successDefinition}
        exitLabel="Success Definition"
      />
    );
  },
};

// ── DefaultTaskRenderer ───────────────────────────────────────────────────────

function DefaultTaskRenderer({ def, fieldData }) {
  return (
    <div className="bfd__default-fields">
      {def.fields.map((field) => {
        const raw = fieldData?.[field.id];
        const isEmpty = !raw || String(raw).trim() === '';
        let displayValue;
        if (isEmpty) {
          displayValue = <span className="bfd__field-empty">—</span>;
        } else if (field.type === 'select') {
          displayValue = <span className="bfd__field-value">{resolveSelectLabel(field, raw)}</span>;
        } else if (field.type === 'textarea') {
          displayValue = <p className="bfd__field-textarea">{raw}</p>;
        } else {
          displayValue = <span className="bfd__field-value">{raw}</span>;
        }
        return (
          <div key={field.id} className="bfd__field">
            <div className="bfd__field-label">{field.label}</div>
            {displayValue}
          </div>
        );
      })}
    </div>
  );
}

// ── BbosTaskCard (wraps unified DashboardTaskCard) ──────────────────────────

function BbosTaskCard({ def, task, index, onSelectTask, span, doneColumnId, viewOnly }) {
  const fieldData = task?.bbosFieldData || {};
  const { filled, total } = countFilledFields(def, task ? fieldData : null);
  const CustomRenderer = TASK_RENDERERS[def.id];

  const allEmpty = task
    ? def.fields.every((f) => {
        const v = fieldData[f.id];
        return !v || String(v).trim() === '';
      })
    : true;

  const hasData = task && !allEmpty;

  const status = (task && doneColumnId && task.columnId === doneColumnId)
    ? 'complete'
    : (!task || allEmpty)
      ? 'empty'
      : 'active';

  return (
    <DashboardTaskCard
      taskId={task?.id}
      index={index - 1}
      title={def.label}
      span={span}
      status={status}
      onSelectTask={task && !viewOnly ? onSelectTask : undefined}
      chips={[
        { label: def.id, className: 'dtc__chip dtc__chip--id' },
        ...(task ? [{
          label: `${filled}/${total}`,
          className: `dtc__chip dtc__chip--complete ${filled === total && total > 0 ? 'dtc__chip--complete-full' : ''}`,
        }] : []),
        ...(def.hasGLabel ? [{ label: 'G', className: 'dtc__chip dtc__chip--glabel' }] : []),
      ]}
      fieldProgress={task ? { filled, total } : undefined}
      purpose={hasData && def.purpose ? truncate(def.purpose, 110) : undefined}

    >
      {hasData && (CustomRenderer
        ? <CustomRenderer fieldData={fieldData} />
        : <DefaultTaskRenderer def={def} fieldData={fieldData} />
      )}
    </DashboardTaskCard>
  );
}

// ── ProjectAuditCard ─────────────────────────────────────────────────────────

function hasUserFieldData(task) {
  const fd = task.bbosFieldData || {};
  return Object.entries(fd).some(([k, v]) => !k.startsWith('_') && (typeof v === 'string' ? v.trim() : !!v));
}

function ProjectAuditCard({ tasks }) {
  const total = tasks.length;
  const startedTasks = tasks.filter(hasUserFieldData);
  const started = startedTasks.length;
  const completed = tasks.filter((t) => t.completedAt).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  // Scheduling discipline measured only against started tasks
  const noDueDate = startedTasks.filter((t) => !t.dueDate && !t.completedAt).length;

  let totalSubtasks = 0;
  let doneSubtasks = 0;
  for (const t of tasks) {
    if (t.subtasks && t.subtasks.length > 0) {
      totalSubtasks += t.subtasks.length;
      doneSubtasks += t.subtasks.filter((s) => s.done).length;
    }
  }
  const subtaskPct = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

  const checks = [
    { label: 'Task Coverage', sub: started > 10 ? 'Comprehensive' : started > 3 ? 'Building' : started > 0 ? 'Started' : 'Not Started', score: started > 10 ? 3 : started > 3 ? 2 : started > 0 ? 1 : 1 },
    { label: 'Completion Rate', sub: pct > 50 ? 'Strong Progress' : pct > 0 ? 'In Progress' : 'Not Started', score: pct >= 80 ? 3 : pct >= 50 ? 2 : pct > 0 ? 1 : 1 },
    { label: 'Scheduling Discipline', sub: started === 0 ? 'Not Started' : noDueDate === 0 ? 'Well Dated' : 'Dates Needed', score: started === 0 ? 1 : noDueDate === 0 ? 3 : noDueDate < started * 0.3 ? 2 : 1 },
    { label: 'Subtask Depth', sub: totalSubtasks > 0 ? `${subtaskPct}% Complete` : 'Not Used', score: subtaskPct >= 80 ? 3 : subtaskPct >= 50 ? 2 : totalSubtasks > 0 ? 1 : 1 },
  ];

  const avgScore = checks.length > 0 ? checks.reduce((s, c) => s + c.score, 0) / checks.length : 0;
  const verdict = avgScore >= 2.5 ? 'STRONG' : avgScore >= 2 ? 'QUALIFIED' : avgScore >= 1.5 ? 'DEVELOPING' : 'NEEDS WORK';
  const thresholdPct = Math.round((avgScore / 3) * 100);

  return (
    <div className="bfd__pa" style={{ gridColumn: '1 / -1' }}>
      <div className="bfd__pa-left">
        <div className="bfd__card-head">
          <span className="bfd__card-num">
            <Star size={13} fill="currentColor" />
          </span>
          <span className="bfd__card-label">Project Audit</span>
        </div>
        <div className="bfd__pa-verdict-box">
          <div className="bfd__pa-verdict-label">Audit Conclusion</div>
          <div className="bfd__pa-verdict-value">{verdict}</div>
          <div className="bfd__pa-verdict-sub">Health Threshold: {thresholdPct}% Met</div>
        </div>
      </div>
      <div className="bfd__pa-right">
        <div className="bfd__pa-title">Audited Metrics</div>
        <div className="bfd__pa-grid">
          {checks.map((chk, i) => (
            <div key={i} className="bfd__pa-item">
              <div className="bfd__pa-item-info">
                <span className="bfd__pa-item-name">{chk.label}</span>
                <span className="bfd__pa-item-sub">{chk.sub}</span>
              </div>
              {renderStars(chk.score)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── StageScoreCard ────────────────────────────────────────────────────────────

function StageScoreCard({ bbosFilter, taskMap }) {
  const signals = STAGE_SCORE_SIGNALS[bbosFilter];
  if (!signals) return null;

  const MAX_PER_SIGNAL = 5;
  const scored = signals.map((sig) => {
    const fd = taskMap[sig.taskId]?.bbosFieldData || {};
    return { label: sig.label, pts: sig.score(fd) };
  });

  const totalPts = scored.reduce((s, r) => s + r.pts, 0);
  const maxPts = signals.length * MAX_PER_SIGNAL;
  const pct = Math.round((totalPts / maxPts) * 100);
  const verdict =
    pct >= 75 ? 'QUALIFIED' :
    pct >= 50 ? 'DEVELOPING' :
    pct >= 25 ? 'REVIEW NEEDED' : 'BLOCKED';
  const verdictColor = {
    QUALIFIED:       'var(--col-done)',
    DEVELOPING:      'var(--pri-high)',
    'REVIEW NEEDED': 'var(--pri-urgent)',
    BLOCKED:         'var(--pri-urgent)',
  }[verdict];

  return (
    <div className="bfd__ssc" style={{ gridColumn: '1 / -1' }}>
      <div className="bfd__ssc-left">
        <div className="bfd__card-head">
          <span className="bfd__card-num"><CheckCircle size={13} /></span>
          <span className="bfd__card-label">Stage Health Score</span>
        </div>
        <div className="bfd__ssc-verdict-box">
          <div className="bfd__ssc-verdict-label">Stage Verdict</div>
          <div className="bfd__ssc-verdict-value" style={{ color: verdictColor }}>{verdict}</div>
          <div className="bfd__ssc-verdict-sub">{pct}% · {totalPts}/{maxPts} pts</div>
        </div>
      </div>
      <div className="bfd__ssc-right">
        <div className="bfd__ssc-title">Weighted Signals</div>
        <div className="bfd__ssc-grid">
          {scored.map((sig, i) => (
            <div key={i} className="bfd__ssc-signal">
              <div className="bfd__ssc-signal-info">
                <span className="bfd__ssc-signal-label">{sig.label}</span>
              </div>
              {renderStars(sig.pts, 5)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BbosFullDashboard ─────────────────────────────────────────────────────────

export default function BbosFullDashboard({ project, bbosFilter, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const bbosRole = project.bbosRole || 'all';

  const { stageMeta, taskGroups, taskMap, globalIdxMap, stageTasks, doneColumnId } = useMemo(() => {
    const stageMeta = getStage(bbosFilter) || { label: bbosFilter, description: '', attributes: '', order: 0 };
    const allDefs = getBbosTaskDefsByStage(bbosFilter);
    const tasks = tasksByProject[project.id] || [];

    // Filter defs by role access — hide tasks the role cannot see
    const defs = (!bbosRole || bbosRole === 'all')
      ? allDefs
      : allDefs.filter((d) => getTaskAccessLevel(bbosRole, d.id) !== '-');

    const taskMap = {};
    const stageTasks = [];
    for (const t of tasks) {
      if (t.bbosTaskType) {
        taskMap[t.bbosTaskType] = t;
        if (t.bbosTaskType.startsWith(bbosFilter + '-')) stageTasks.push(t);
      }
    }

    // Group defs by subLevel prefix
    const groups = [];
    let currentGroup = null;
    for (const def of defs) {
      const prefix = getSubLevelPrefix(def.subLevel);
      if (!currentGroup || currentGroup.prefix !== prefix) {
        currentGroup = { prefix, label: PREFIX_LABELS[prefix] || 'Additional Tasks', defs: [] };
        groups.push(currentGroup);
      }
      currentGroup.defs.push(def);
    }

    // Global sequential index across all groups
    const globalIdxMap = {};
    let idx = 0;
    for (const g of groups) {
      for (const def of g.defs) {
        idx++;
        globalIdxMap[def.id] = idx;
      }
    }

    const doneColumnId = project.columns?.find((c) => c.name === 'Done')?.id ?? null;

    return { stageMeta, taskGroups: groups, taskMap, globalIdxMap, stageTasks, doneColumnId };
  }, [tasksByProject, project, bbosFilter, bbosRole]);

  const quote = STAGE_QUOTES[bbosFilter] || '';

  return (
    <div className="bfd">
      {/* ── Header ── */}
      <div className="bfd__header">
        <div className="bfd__eyebrow">BBOS · Stage {(stageMeta.order ?? 0) + 1} · {stageMeta.label}</div>
        <h2 className="bfd__title">{stageMeta.label} Dossier</h2>
        <p className="bfd__desc">
          {stageMeta.description}
          {stageMeta.attributes && <>{' '}<em>{stageMeta.attributes}</em></>}
        </p>
      </div>

      {/* ── Task grid ── */}
      <div className="bfd__grid">
        {(() => {
          const researchGroups = taskGroups.filter((g) => getFactory(g.prefix) === 'research');
          const assetGroups = taskGroups.filter((g) => getFactory(g.prefix) === 'asset');

          // Assembly gate: are all research tasks in Done column?
          const researchDefs = researchGroups.flatMap((g) => g.defs);
          const researchAllDone = researchDefs.length > 0 && researchDefs.every((def) => {
            const t = taskMap[def.id];
            return t && t.columnId === doneColumnId;
          });
          const gateCleared = researchAllDone;

          const renderGroup = (group, assetLocked) => {
            const spans = computeGroupSpans(group.prefix, group.defs);
            return (
              <Fragment key={group.prefix}>
                <div className="bfd__divider">
                  <span className="bfd__divider-label">{group.label}</span>
                  <span className="bfd__divider-count">{group.defs.length} task{group.defs.length !== 1 ? 's' : ''}</span>
                </div>
                {group.defs.map((def, i) => (
                  <BbosTaskCard
                    key={def.id}
                    def={def}
                    task={taskMap[def.id]}
                    index={globalIdxMap[def.id]}
                    onSelectTask={onSelectTask}
                    span={spans[i]}
                    doneColumnId={doneColumnId}
                    viewOnly={assetLocked || (bbosRole !== 'all' && getTaskAccessLevel(bbosRole, def.id) === 'V')}
                  />
                ))}
              </Fragment>
            );
          };

          return (
            <>
              {/* Research Factory */}
              {researchGroups.length > 0 && (
                <div className="bfd__factory bfd__factory--research">
                  <div className="bfd__factory-header">
                    <span className="bfd__factory-label">Research Factory</span>
                    <span className="bfd__factory-meta">{researchDefs.length} task{researchDefs.length !== 1 ? 's' : ''}</span>
                  </div>
                  {researchGroups.map((g) => renderGroup(g, false))}
                </div>
              )}

              {/* Assembly Gate */}
              {researchGroups.length > 0 && assetGroups.length > 0 && (
                <div className={`bfd__assembly-gate ${gateCleared ? 'bfd__assembly-gate--cleared' : 'bfd__assembly-gate--locked'}`}>
                  <span className="bfd__assembly-gate-icon">{gateCleared ? '✓' : '⏳'}</span>
                  <span className="bfd__assembly-gate-text">
                    {gateCleared
                      ? 'Assembly Gate: CLEARED — Asset Pack unlocked'
                      : 'Assembly Gate: LOCKED — complete Research tasks first'}
                  </span>
                </div>
              )}

              {/* Asset Factory */}
              {assetGroups.length > 0 && (
                <div className={`bfd__factory bfd__factory--asset ${!gateCleared ? 'bfd__factory--locked' : ''}`}>
                  <div className="bfd__factory-header">
                    <span className="bfd__factory-label">Asset Factory</span>
                    <span className="bfd__factory-meta">{assetGroups.flatMap((g) => g.defs).length} task{assetGroups.flatMap((g) => g.defs).length !== 1 ? 's' : ''}</span>
                  </div>
                  {assetGroups.map((g) => renderGroup(g, !gateCleared))}
                </div>
              )}
            </>
          );
        })()}

        {/* ── Stage Health Score ── */}
        <StageScoreCard bbosFilter={bbosFilter} taskMap={taskMap} />

        {/* ── Project Audit ── */}
        <ProjectAuditCard tasks={stageTasks} />
      </div>

      {/* ── Footer ── */}
      <div className="bfd__footer">
        {quote && <p className="bfd__footer-quote">{quote}</p>}
        <p className="bfd__footer-meta">
          BBOS Strategy Engine · Stage {String((stageMeta.order ?? 0) + 1).padStart(2, '0')} {bbosFilter} · {project.name}
        </p>
      </div>
    </div>
  );
}
