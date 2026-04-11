import { useMemo } from 'react';
import { AlertTriangle, CheckCircle, ShieldCheck } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import './OfrDashboard.css';

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

export default function OfrDashboard({ project, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const data = useMemo(() => {
    const tasks = tasksByProject[project.id] || [];

    const findTask = (type) => tasks.find((t) => t.bbosTaskType === type);
    const fieldData = (type) => findTask(type)?.bbosFieldData || {};

    const a1 = fieldData('OFR-A1');
    const a2 = fieldData('OFR-A2');
    const a3 = fieldData('OFR-A3');
    const a5 = fieldData('OFR-A5');
    const a6 = fieldData('OFR-A6');
    const a7 = fieldData('OFR-A7');
    const a8 = fieldData('OFR-A8');

    // Card 01 — Promise
    const gLabel = a1.promiseGLabel || '';
    const proofStatus = a1.proofStatus || '';
    const proofVerified = proofStatus === 'verified';

    // Card 02 — ICP
    const qualLines = splitLines(a2.qualificationCriteria).slice(0, 3);
    const disqualLines = splitLines(a2.disqualificationCriteria).slice(0, 3);

    // Card 03 — Mechanism
    const mechanismName = a3.mechanismName || '';

    // Card 04 — Value Stack & Pricing
    const valueItems = splitLines(a5.valueItems).slice(0, 5);
    const totalPmv = a5.totalPmv ? Number(a5.totalPmv) : null;
    const finalPrice = a7.finalPrice ? Number(a7.finalPrice) : null;
    const pricingModel = a7.pricingModel || '';
    const pricingModelLabel = {
      fixed: 'Fixed Price', retainer: 'Monthly Retainer',
      milestone: 'Milestone-Based', hybrid: 'Hybrid', other: 'Other',
    }[pricingModel] || '—';

    // Card 05 — Proof & Risk Reversal
    const proofAssets = splitLines(a8.proofAssets).slice(0, 4);
    const proofGapLines = splitLines(a8.proofGaps);
    const guaranteeGLabel = a6.guaranteeGLabel || '';
    const guaranteeLabelColor = { G1: 'var(--col-done)', G2: 'var(--primary)', G3: 'var(--pri-high)' }[guaranteeGLabel] || 'var(--text3)';

    // taskIds for click-through
    const taskIds = {};
    ['OFR-A1', 'OFR-A2', 'OFR-A3', 'OFR-A5', 'OFR-A6', 'OFR-A7', 'OFR-A8'].forEach((type) => {
      const t = findTask(type);
      if (t) taskIds[type] = t.id;
    });

    return {
      a1, a2, a3, a5, a6, a7, a8,
      gLabel, proofStatus, proofVerified,
      qualLines, disqualLines,
      mechanismName,
      valueItems, totalPmv, finalPrice, pricingModelLabel,
      proofAssets, proofGapLines, guaranteeGLabel, guaranteeLabelColor,
      taskIds,
    };
  }, [tasksByProject, project]);

  const {
    a1, a2, a3, a5, a6, a7, a8,
    gLabel, proofStatus, proofVerified,
    qualLines, disqualLines,
    mechanismName,
    valueItems, totalPmv, finalPrice, pricingModelLabel,
    proofAssets, proofGapLines, guaranteeGLabel, guaranteeLabelColor,
    taskIds,
  } = data;

  const headProps = (type) => {
    const id = taskIds[type];
    const base = { className: 'ofr-dash__card-head' };
    if (!onSelectTask || !id) return base;
    return {
      className: 'ofr-dash__card-head ofr-dash__card-head--link',
      onClick: () => onSelectTask(id),
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTask(id); },
    };
  };

  return (
    <div className="ofr-dash">
      {/* ── Header ── */}
      <div className="ofr-dash__header">
        <div className="ofr-dash__eyebrow">BBOS · Stage 4 · Offering</div>
        <h2 className="ofr-dash__title">Offer Architecture Dossier</h2>
        <p className="ofr-dash__desc">
          The assembled offer — promise, customer profile, delivery mechanism, pricing, and proof.
          Al-'Adl — equity in what is exchanged.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="ofr-dash__grid">

        {/* ── 01: OFR-A1 The Promise ── */}
        <div className="ofr-dash__card ofr-dash__card--a1">
          <div {...headProps('OFR-A1')}>
            <span className="ofr-dash__card-num">01</span>
            <span className="ofr-dash__card-label">OFR-A1: The Promise</span>
          </div>
          {a1.promiseStatement ? (
            <>
              <div className="ofr-dash__promise-badges">
                {gLabel && (
                  <span className={`ofr-dash__g-badge ofr-dash__g-badge--${gLabel.toLowerCase()}`}>
                    {gLabel}
                  </span>
                )}
                <span className={`ofr-dash__proof-badge ${proofVerified ? 'ofr-dash__proof-badge--verified' : 'ofr-dash__proof-badge--pending'}`}>
                  {proofVerified ? <CheckCircle size={11} /> : <AlertTriangle size={11} />}
                  {proofVerified ? 'Proof Verified' : 'Proof Pending'}
                </span>
              </div>
              <blockquote className="ofr-dash__promise-quote">
                "{truncate(a1.promiseStatement, 260)}"
              </blockquote>
              {a1.proofReference && (
                <div className="ofr-dash__proof-ref">
                  <span className="ofr-dash__proof-ref-label">Evidence</span>
                  <span className="ofr-dash__proof-ref-text">{truncate(a1.proofReference, 120)}</span>
                </div>
              )}
            </>
          ) : (
            <div className="ofr-dash__empty-field">
              Complete OFR-A1 to define the core client promise.
            </div>
          )}
        </div>

        {/* ── 02: OFR-A2 Ideal Customer Profile ── */}
        <div className="ofr-dash__card ofr-dash__card--a2">
          <div {...headProps('OFR-A2')}>
            <span className="ofr-dash__card-num">02</span>
            <span className="ofr-dash__card-label">OFR-A2: Ideal Customer Profile</span>
          </div>
          {a2.demographicProfile || a2.psychographicProfile ? (
            <div className="ofr-dash__icp-grid">
              <div className="ofr-dash__icp-section">
                <div className="ofr-dash__icp-section-label">Demographic</div>
                <p className="ofr-dash__icp-text">{truncate(a2.demographicProfile, 160)}</p>
              </div>
              <div className="ofr-dash__icp-section">
                <div className="ofr-dash__icp-section-label">Psychographic</div>
                <p className="ofr-dash__icp-text">{truncate(a2.psychographicProfile, 160)}</p>
              </div>
              <div className="ofr-dash__icp-section">
                <div className="ofr-dash__icp-section-label ofr-dash__icp-section-label--pass">
                  <CheckCircle size={11} /> Qualifies When
                </div>
                {qualLines.length > 0 ? (
                  <ul className="ofr-dash__icp-list">
                    {qualLines.map((q, i) => <li key={i}>{truncate(q, 80)}</li>)}
                  </ul>
                ) : <p className="ofr-dash__icp-text ofr-dash__icp-text--empty">—</p>}
              </div>
              <div className="ofr-dash__icp-section">
                <div className="ofr-dash__icp-section-label ofr-dash__icp-section-label--fail">
                  <AlertTriangle size={11} /> Disqualified When
                </div>
                {disqualLines.length > 0 ? (
                  <ul className="ofr-dash__icp-list ofr-dash__icp-list--disq">
                    {disqualLines.map((d, i) => <li key={i}>{truncate(d, 80)}</li>)}
                  </ul>
                ) : <p className="ofr-dash__icp-text ofr-dash__icp-text--empty">—</p>}
              </div>
            </div>
          ) : (
            <div className="ofr-dash__empty-field">
              Complete OFR-A2 to define the ideal customer profile.
            </div>
          )}
        </div>

        {/* ── 03: OFR-A3 The Mechanism ── */}
        <div className="ofr-dash__card ofr-dash__card--a3">
          <div {...headProps('OFR-A3')}>
            <span className="ofr-dash__card-num">03</span>
            <span className="ofr-dash__card-label">OFR-A3: The Mechanism</span>
          </div>
          {a3.mechanismName || a3.mechanismDescription ? (
            <>
              {mechanismName && (
                <div className="ofr-dash__mech-name">{mechanismName}</div>
              )}
              {a3.mechanismDescription && (
                <p className="ofr-dash__mech-desc">{truncate(a3.mechanismDescription, 300)}</p>
              )}
              {a3.mechanismDifferentiator && (
                <div className="ofr-dash__mech-diff-box">
                  <div className="ofr-dash__mech-diff-label">Differentiation</div>
                  <p className="ofr-dash__mech-diff-text">{truncate(a3.mechanismDifferentiator, 200)}</p>
                </div>
              )}
            </>
          ) : (
            <div className="ofr-dash__empty-field">
              Complete OFR-A3 to name and describe the delivery mechanism.
            </div>
          )}
        </div>

        {/* ── 04: OFR-A5 + OFR-A7 Value Stack & Pricing ── */}
        <div className="ofr-dash__card ofr-dash__card--a5">
          <div {...headProps('OFR-A5')}>
            <span className="ofr-dash__card-num">04</span>
            <span className="ofr-dash__card-label">OFR-A5/A7: Value & Pricing</span>
          </div>
          {valueItems.length > 0 || totalPmv || finalPrice ? (
            <>
              {valueItems.length > 0 && (
                <div className="ofr-dash__value-list">
                  {valueItems.map((item, i) => (
                    <div key={i} className="ofr-dash__value-item">
                      <span className="ofr-dash__value-bullet" />
                      <span className="ofr-dash__value-text">{truncate(item, 100)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="ofr-dash__price-row">
                <div className="ofr-dash__price-cell">
                  <span className="ofr-dash__price-label">Total PMV</span>
                  <span className="ofr-dash__price-value ofr-dash__price-value--pmv">
                    {totalPmv ? `$${totalPmv.toLocaleString()}` : '—'}
                  </span>
                </div>
                <div className="ofr-dash__price-divider" />
                <div className="ofr-dash__price-cell">
                  <span className="ofr-dash__price-label">Final Price</span>
                  <span className="ofr-dash__price-value">
                    {finalPrice ? `$${finalPrice.toLocaleString()}` : '—'}
                  </span>
                </div>
                <div className="ofr-dash__price-divider" />
                <div className="ofr-dash__price-cell">
                  <span className="ofr-dash__price-label">Model</span>
                  <span className="ofr-dash__price-model">{pricingModelLabel}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="ofr-dash__empty-field">
              Complete OFR-A5 and OFR-A7 to build the value stack and pricing.
            </div>
          )}
        </div>

        {/* ── 05: OFR-A8 + OFR-A6 Proof & Risk Reversal ── */}
        <div className="ofr-dash__card ofr-dash__card--a8">
          <div className="ofr-dash__proof-left">
            <div {...headProps('OFR-A8')}>
              <span className="ofr-dash__card-num">05</span>
              <span className="ofr-dash__card-label">OFR-A8: Proof Plan</span>
            </div>
            {proofAssets.length > 0 ? (
              <div className="ofr-dash__proof-assets">
                {proofAssets.map((asset, i) => (
                  <div key={i} className="ofr-dash__proof-asset">
                    <ShieldCheck size={13} className="ofr-dash__proof-asset-icon" />
                    <span>{truncate(asset, 100)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="ofr-dash__empty-field" style={{ minHeight: 60 }}>
                No proof assets logged yet.
              </div>
            )}
            {proofGapLines.length > 0 && (
              <div className="ofr-dash__proof-gaps">
                <div className="ofr-dash__proof-gaps-label">
                  <AlertTriangle size={12} /> {proofGapLines.length} Proof Gap{proofGapLines.length !== 1 ? 's' : ''} (PENDING)
                </div>
                {proofGapLines.slice(0, 3).map((gap, i) => (
                  <span key={i} className="ofr-dash__proof-gap-item">{truncate(gap, 80)}</span>
                ))}
              </div>
            )}
          </div>
          <div className="ofr-dash__guarantee-right">
            <div {...headProps('OFR-A6')} style={{ marginBottom: 18 }}>
              <span className="ofr-dash__card-label" style={{ fontSize: '0.95rem' }}>OFR-A6: Risk Reversal</span>
            </div>
            {a6.triggerCondition || a6.remedy ? (
              <>
                {guaranteeGLabel && (
                  <div className="ofr-dash__guarantee-label-row">
                    <span className="ofr-dash__routing-sub">Guarantee Class</span>
                    <span className="ofr-dash__g-badge" style={{ background: `color-mix(in srgb, ${guaranteeLabelColor} 12%, transparent)`, color: guaranteeLabelColor, borderColor: guaranteeLabelColor }}>
                      {guaranteeGLabel}
                    </span>
                  </div>
                )}
                <div className="ofr-dash__guarantee-item">
                  <div className="ofr-dash__guarantee-item-label">Trigger</div>
                  <p className="ofr-dash__guarantee-item-text">{truncate(a6.triggerCondition, 160)}</p>
                </div>
                <div className="ofr-dash__guarantee-item">
                  <div className="ofr-dash__guarantee-item-label">Remedy</div>
                  <p className="ofr-dash__guarantee-item-text">{truncate(a6.remedy, 160)}</p>
                </div>
                {a6.operatorBoundaries && (
                  <div className="ofr-dash__guarantee-item ofr-dash__guarantee-item--boundary">
                    <div className="ofr-dash__guarantee-item-label">Operator Boundaries</div>
                    <p className="ofr-dash__guarantee-item-text">{truncate(a6.operatorBoundaries, 120)}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="ofr-dash__empty-field" style={{ minHeight: 60 }}>
                Complete OFR-A6 to define the risk reversal guarantee.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="ofr-dash__footer">
        <p className="ofr-dash__footer-quote">
          "The offering is only as sound as the promise it is built upon."
        </p>
        <p className="ofr-dash__footer-meta">
          BBOS Strategy Engine · Stage 04 OFR · {project.name}
        </p>
      </div>
    </div>
  );
}
