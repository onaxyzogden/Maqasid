import { useMemo } from 'react';
import { AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import './FndDashboard.css';

// ── Helpers ─────────────────────────────────────────────────────────────────

function splitLines(text) {
  if (!text) return [];
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

function truncate(text, max) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '…' : text;
}

// ── Component ────────────────────────────────────────────────────────────────

export default function FndDashboard({ project, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const data = useMemo(() => {
    const tasks = tasksByProject[project.id] || [];

    const findTask = (type) => tasks.find((t) => t.bbosTaskType === type);
    const fieldData = (type) => findTask(type)?.bbosFieldData || {};

    const s1     = fieldData('FND-S1');
    const s2     = fieldData('FND-S2');
    const s3     = fieldData('FND-S3');
    const s4     = fieldData('FND-S4');
    const ifbS3  = fieldData('FND-IFB-S3');

    // Card 01 — Capability declarations
    const declarations = [
      { label: 'Capital',      value: s1.capitalDeclaration },
      { label: 'Skills',       value: s1.skillsDeclaration },
      { label: 'Constraints',  value: s1.constraintsDeclaration },
      { label: 'Geography',    value: s1.geographyDeclaration },
    ];

    // Card 02 — Normalised mappings table
    const mappings = [
      { field: 'Capital',    value: s2.capitalMapping },
      { field: 'Skills',     value: s2.skillsMapping },
      { field: 'Proof',      value: s2.proofMapping },
      { field: 'Constraints',value: s2.constraintsMapping },
      { field: 'Geography',  value: s2.geographyMapping },
      { field: 'Regulatory', value: s2.regulatoryMapping },
    ].filter((m) => m.value);
    const flagLines = splitLines(s2.mappingFlags);

    // Card 03 — Gap analysis
    const gapLines = splitLines(s3.gapList).slice(0, 6);
    const resolutionLines = splitLines(s3.resolutionActions);
    const gapSeverity = s3.gapSeverity || 'none';
    const severityColor = {
      disqualifying: 'var(--pri-urgent)',
      major:         'var(--pri-high)',
      minor:         'var(--pri-medium)',
      none:          'var(--col-done)',
    }[gapSeverity] || 'var(--text3)';
    const severityLabel = {
      disqualifying: 'DISQUALIFYING',
      major:         'MAJOR',
      minor:         'MINOR',
      none:          'NONE',
    }[gapSeverity] || '—';

    // Card 04 — Proof evidence
    const proofLinks = splitLines(s1.proofLinks).slice(0, 5);
    const proofMapping = s2.proofMapping || '';

    // Card 05 — Routing verdict
    const routingDecision = s4.routingDecision || '';
    const routingBasis = s4.routingBasis || '';
    const disqualifierLines = splitLines(s4.disqualifierFlags);
    const formLink = ifbS3.formLink || '';
    const verdictMap = {
      proceed:    { label: 'PROCEED',    color: 'var(--col-done)' },
      incomplete: { label: 'INCOMPLETE', color: 'var(--pri-high)' },
      reject:     { label: 'REJECT',     color: 'var(--pri-urgent)' },
    };
    const verdict = verdictMap[routingDecision] || { label: 'PENDING', color: 'var(--text3)' };

    // taskIds for click-through
    const taskIds = {};
    ['FND-S1', 'FND-S2', 'FND-S3', 'FND-S4', 'FND-IFB-S3'].forEach((type) => {
      const t = findTask(type);
      if (t) taskIds[type] = t.id;
    });

    return {
      declarations, mappings, flagLines,
      gapLines, resolutionLines, gapSeverity, severityColor, severityLabel,
      proofLinks, proofMapping,
      routingDecision, routingBasis, disqualifierLines, formLink, verdict,
      taskIds,
    };
  }, [tasksByProject, project]);

  const {
    declarations, mappings, flagLines,
    gapLines, resolutionLines, gapSeverity, severityColor, severityLabel,
    proofLinks, proofMapping,
    routingDecision, routingBasis, disqualifierLines, formLink, verdict,
    taskIds,
  } = data;

  const headProps = (type) => {
    const id = taskIds[type];
    const base = { className: 'fnd-dash__card-head' };
    if (!onSelectTask || !id) return base;
    return {
      className: 'fnd-dash__card-head fnd-dash__card-head--link',
      onClick: () => onSelectTask(id),
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTask(id); },
    };
  };

  return (
    <div className="fnd-dash">
      {/* ── Header ── */}
      <div className="fnd-dash__header">
        <div className="fnd-dash__eyebrow">BBOS · Stage 1 · Foundation</div>
        <h2 className="fnd-dash__title">Intake & Readiness Dossier</h2>
        <p className="fnd-dash__desc">
          Captured declarations, normalised fields, gap findings, and routing signal for this
          pipeline intake cycle. Al-Awwal — the record begins here.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="fnd-dash__grid">

        {/* ── 01: FND-S1 Capability Declaration ── */}
        <div className="fnd-dash__card fnd-dash__card--s1">
          <div {...headProps('FND-S1')}>
            <span className="fnd-dash__card-num">01</span>
            <span className="fnd-dash__card-label">FND-S1: Raw Declarations</span>
          </div>
          {declarations.some((d) => d.value) ? (
            <div className="fnd-dash__decl-list">
              {declarations.map((d, i) => (
                <div key={i} className="fnd-dash__decl-row">
                  <span className="fnd-dash__decl-label">{d.label}</span>
                  {d.value ? (
                    <span className="fnd-dash__decl-value">{truncate(d.value, 140)}</span>
                  ) : (
                    <span className="fnd-dash__decl-value fnd-dash__decl-value--empty">—</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="fnd-dash__empty-field">
              Complete FND-S1 to capture your raw capability declarations.
            </div>
          )}
        </div>

        {/* ── 02: FND-S2 Normalised Packet ── */}
        <div className="fnd-dash__card fnd-dash__card--s2">
          <div {...headProps('FND-S2')}>
            <span className="fnd-dash__card-num">02</span>
            <span className="fnd-dash__card-label">FND-S2: Normalised Packet</span>
          </div>
          {mappings.length > 0 ? (
            <>
              <table className="fnd-dash__map-table">
                <thead>
                  <tr>
                    <th>BBOS Field</th>
                    <th>Normalised Value</th>
                  </tr>
                </thead>
                <tbody>
                  {mappings.map((m, i) => (
                    <tr key={i}>
                      <td className="fnd-dash__map-field">{m.field}</td>
                      <td className="fnd-dash__map-value">{truncate(m.value, 120)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {flagLines.length > 0 && (
                <div className="fnd-dash__flag-row">
                  <AlertTriangle size={13} className="fnd-dash__flag-icon" />
                  <div className="fnd-dash__flag-chips">
                    {flagLines.map((flag, i) => (
                      <span key={i} className="fnd-dash__flag-chip">{truncate(flag, 80)}</span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="fnd-dash__empty-field">
              Complete FND-S2 to see the normalised BBOS field mappings.
            </div>
          )}
        </div>

        {/* ── 03: FND-S3 Gap Analysis ── */}
        <div className="fnd-dash__card fnd-dash__card--s3">
          <div {...headProps('FND-S3')}>
            <span className="fnd-dash__card-num">03</span>
            <span className="fnd-dash__card-label">FND-S3: Gap Analysis</span>
          </div>
          {gapLines.length > 0 ? (
            <>
              <div className="fnd-dash__severity-bar">
                <span className="fnd-dash__severity-label">Overall Severity</span>
                <span
                  className="fnd-dash__severity-badge"
                  style={{ background: `color-mix(in srgb, ${severityColor} 15%, transparent)`, color: severityColor, borderColor: severityColor }}
                >
                  {severityLabel}
                </span>
              </div>
              <div className="fnd-dash__gap-list">
                {gapLines.map((gap, i) => (
                  <div key={i} className="fnd-dash__gap-item">
                    <AlertTriangle size={12} className="fnd-dash__gap-icon" />
                    <div className="fnd-dash__gap-body">
                      <span className="fnd-dash__gap-text">{gap}</span>
                      {resolutionLines[i] && (
                        <span className="fnd-dash__gap-resolution">
                          <CheckCircle size={11} /> {truncate(resolutionLines[i], 100)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="fnd-dash__empty-field">
              Complete FND-S3 to surface identified gaps and resolution actions.
            </div>
          )}
        </div>

        {/* ── 04: FND-S1 Proof Evidence ── */}
        <div className="fnd-dash__card fnd-dash__card--s1b">
          <div {...headProps('FND-S1')}>
            <span className="fnd-dash__card-num">04</span>
            <span className="fnd-dash__card-label">FND-S1: Proof Evidence</span>
          </div>
          {proofLinks.length > 0 ? (
            <>
              <div className="fnd-dash__proof-list">
                {proofLinks.map((link, i) => (
                  <div key={i} className="fnd-dash__proof-item">
                    <span className="fnd-dash__proof-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="fnd-dash__proof-text">{truncate(link, 120)}</span>
                  </div>
                ))}
              </div>
              {proofMapping && (
                <div className="fnd-dash__proof-callout">
                  <div className="fnd-dash__proof-callout-label">Normalised Proof Assessment</div>
                  <p className="fnd-dash__proof-callout-text">{truncate(proofMapping, 200)}</p>
                </div>
              )}
            </>
          ) : (
            <div className="fnd-dash__empty-field">
              Complete FND-S1 proof links to build the evidence chain.
            </div>
          )}
        </div>

        {/* ── 05: FND-S4 Routing Verdict ── */}
        <div className="fnd-dash__card fnd-dash__card--s4">
          <div className="fnd-dash__routing-left">
            <div {...headProps('FND-S4')}>
              <span className="fnd-dash__card-num">05</span>
              <span className="fnd-dash__card-label">FND-S4: Routing Verdict</span>
            </div>
            <div className="fnd-dash__verdict-wrap">
              <div className="fnd-dash__verdict-label">Routing Decision</div>
              <div
                className="fnd-dash__verdict-value"
                style={{ color: verdict.color }}
              >
                {verdict.label}
              </div>
            </div>
            {routingBasis && (
              <p className="fnd-dash__routing-basis">
                "{truncate(routingBasis, 200)}"
              </p>
            )}
          </div>
          <div className="fnd-dash__routing-right">
            <div className="fnd-dash__routing-right-title">Disqualifier Flags</div>
            {disqualifierLines.length > 0 ? (
              <div className="fnd-dash__disq-list">
                {disqualifierLines.map((flag, i) => (
                  <div key={i} className="fnd-dash__disq-item">
                    <AlertTriangle size={13} className="fnd-dash__disq-icon" />
                    <span>{flag}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="fnd-dash__disq-clear">
                <CheckCircle size={14} style={{ color: 'var(--col-done)' }} />
                <span>No disqualifier flags raised</span>
              </div>
            )}
            <div className="fnd-dash__ifb-section">
              <div {...headProps('FND-IFB-S3')} style={{ marginBottom: 10 }}>
                <span className="fnd-dash__routing-right-title" style={{ margin: 0 }}>
                  IFB-S3: Intake Form
                </span>
              </div>
              {formLink ? (
                <a
                  href={formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fnd-dash__form-link"
                >
                  <ExternalLink size={13} />
                  <span>{truncate(formLink, 60)}</span>
                </a>
              ) : (
                <span className="fnd-dash__form-link--empty">Form not yet deployed</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="fnd-dash__footer">
        <p className="fnd-dash__footer-quote">
          "He who is not truthful in establishing the foundation has built upon sand."
        </p>
        <p className="fnd-dash__footer-meta">
          BBOS Strategy Engine · Stage 01 FND · {project.name}
        </p>
      </div>
    </div>
  );
}
