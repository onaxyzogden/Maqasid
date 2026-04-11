import { useMemo } from 'react';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useTaskStore } from '../../store/task-store';
import './OutDashboard.css';

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

export default function OutDashboard({ project, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const data = useMemo(() => {
    const tasks = tasksByProject[project.id] || [];
    const findTask = (type) => tasks.find((t) => t.bbosTaskType === type);
    const fieldData = (type) => findTask(type)?.bbosFieldData || {};

    const s4  = fieldData('OUT-S4');
    const a1  = fieldData('OUT-A1');
    const a2  = fieldData('OUT-A2');
    const a3  = fieldData('OUT-A3');
    const a4  = fieldData('OUT-A4');
    const a6  = fieldData('OUT-A6');
    const ic  = fieldData('OUT-IC');

    // Card 01 — Channel Plan
    const channelLines = splitLines(a1.channelStrategy).slice(0, 4);

    // Card 02 — Hooks & Messages
    const hookLines = splitLines(a2.hooksByPlatform).slice(0, 3);
    const messageLines = splitLines(a3.initialMessages).slice(0, 2);

    // Card 03 — Follow-Up Sequence
    const sequenceSteps = splitLines(a4.sequenceMap).slice(0, 6);

    // Card 04 — Objection Matrix
    const objectionLines = splitLines(s4.commonObjections).slice(0, 4);
    const responseLines = splitLines(s4.objectionResponses);
    const matrixLines = splitLines(a6.objectionMatrix).slice(0, 4);
    // Prefer A6 matrix if available, else S4 pairs
    const objections = (matrixLines.length > 0 ? matrixLines : objectionLines).map((obj, i) => ({
      objection: obj,
      response: responseLines[i] ? truncate(responseLines[i], 100) : null,
    }));

    // Card 05 — Ihsan Gate
    const gateChecks = [
      { id: 'icOut1', label: 'Audience Concern Mapping', sub: 'First sentence maps to VoC data' },
      { id: 'icOut2', label: 'G-Label Compliance', sub: 'All claims labeled, no PENDING client-facing' },
      { id: 'icOut3', label: 'Singular CTA', sub: 'One CTA, stated once, unambiguous' },
      { id: 'icOut4', label: 'Scarcity Verified', sub: 'Urgency tied to documented constraint or absent' },
      { id: 'icOut5', label: 'Readability Check', sub: 'Clear without prior knowledge of the business' },
    ].map((c) => ({ ...c, status: ic[c.id] || '' }));
    const passCount = gateChecks.filter((c) => c.status === 'pass').length;
    const failCount = gateChecks.filter((c) => c.status === 'fail').length;
    const gateVerdict = gateChecks.every((c) => c.status === 'pass')
      ? 'CLEARED'
      : gateChecks.some((c) => c.status === 'fail')
        ? 'BLOCKED'
        : 'PENDING';

    // taskIds
    const taskIds = {};
    ['OUT-A1', 'OUT-A2', 'OUT-A3', 'OUT-A4', 'OUT-A6', 'OUT-IC'].forEach((type) => {
      const t = findTask(type);
      if (t) taskIds[type] = t.id;
    });

    return {
      a1, a2, a3, a4, a6, ic,
      channelLines, hookLines, messageLines,
      sequenceSteps,
      objections,
      gateChecks, passCount, failCount, gateVerdict,
      taskIds,
    };
  }, [tasksByProject, project]);

  const {
    a1, a2, a3, a4, a6,
    channelLines, hookLines, messageLines,
    sequenceSteps,
    objections,
    gateChecks, passCount, failCount, gateVerdict,
    taskIds,
  } = data;

  const headProps = (type) => {
    const id = taskIds[type];
    const base = { className: 'out-dash__card-head' };
    if (!onSelectTask || !id) return base;
    return {
      className: 'out-dash__card-head out-dash__card-head--link',
      onClick: () => onSelectTask(id),
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTask(id); },
    };
  };

  const verdictColor = { CLEARED: 'var(--col-done)', BLOCKED: 'var(--pri-urgent)', PENDING: 'var(--text3)' }[gateVerdict];

  return (
    <div className="out-dash">
      {/* ── Header ── */}
      <div className="out-dash__header">
        <div className="out-dash__eyebrow">BBOS · Stage 5 · Outreach</div>
        <h2 className="out-dash__title">Outreach Operations Dossier</h2>
        <p className="out-dash__desc">
          Channel plan, prospect criteria, message arsenal, follow-up sequence, and integrity gate.
          Al-Muqsit — equitable reach to those who truly benefit.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="out-dash__grid">

        {/* ── 01: OUT-A1 Channel Plan ── */}
        <div className="out-dash__card out-dash__card--a1">
          <div {...headProps('OUT-A1')}>
            <span className="out-dash__card-num">01</span>
            <span className="out-dash__card-label">OUT-A1: Channel Plan</span>
          </div>
          {channelLines.length > 0 || a1.idealProspectProfile ? (
            <>
              {channelLines.length > 0 && (
                <div className="out-dash__channel-list">
                  {channelLines.map((ch, i) => (
                    <div key={i} className="out-dash__channel-item">
                      <span className="out-dash__channel-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="out-dash__channel-text">{truncate(ch, 120)}</span>
                    </div>
                  ))}
                </div>
              )}
              {a1.idealProspectProfile && (
                <div className="out-dash__ipp-box">
                  <div className="out-dash__ipp-label">Ideal Prospect Profile</div>
                  <p className="out-dash__ipp-text">{truncate(a1.idealProspectProfile, 180)}</p>
                </div>
              )}
            </>
          ) : (
            <div className="out-dash__empty-field">
              Complete OUT-A1 to define the channel strategy and prospect profile.
            </div>
          )}
        </div>

        {/* ── 02: OUT-A2 + OUT-A3 Hook & Message Arsenal ── */}
        <div className="out-dash__card out-dash__card--a2">
          <div {...headProps('OUT-A2')}>
            <span className="out-dash__card-num">02</span>
            <span className="out-dash__card-label">OUT-A2/A3: Message Arsenal</span>
          </div>
          {hookLines.length > 0 || messageLines.length > 0 ? (
            <>
              {hookLines.length > 0 && (
                <>
                  <div className="out-dash__arsenal-label">Hooks</div>
                  <div className="out-dash__hook-list">
                    {hookLines.map((hook, i) => (
                      <div key={i} className="out-dash__hook-item">
                        <span className="out-dash__hook-quote">"{truncate(hook, 130)}"</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {messageLines.length > 0 && (
                <>
                  <div className="out-dash__arsenal-label" style={{ marginTop: 18 }}>Initial Messages</div>
                  <div className="out-dash__message-list">
                    {messageLines.map((msg, i) => (
                      <div key={i} className="out-dash__message-item">
                        <span className="out-dash__message-num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="out-dash__message-text">{truncate(msg, 160)}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="out-dash__empty-field">
              Complete OUT-A2 and OUT-A3 to build the hook and message library.
            </div>
          )}
        </div>

        {/* ── 03: OUT-A4 Follow-Up Sequence ── */}
        <div className="out-dash__card out-dash__card--a4">
          <div {...headProps('OUT-A4')}>
            <span className="out-dash__card-num">03</span>
            <span className="out-dash__card-label">OUT-A4: Follow-Up Sequence</span>
          </div>
          {sequenceSteps.length > 0 ? (
            <div className="out-dash__sequence">
              {sequenceSteps.map((step, i) => (
                <div key={i} className="out-dash__seq-step">
                  <div className="out-dash__seq-marker">
                    <span className="out-dash__seq-dot" />
                    {i < sequenceSteps.length - 1 && <span className="out-dash__seq-line" />}
                  </div>
                  <div className="out-dash__seq-body">
                    <span className="out-dash__seq-touch">Touch {i + 1}</span>
                    <span className="out-dash__seq-text">{truncate(step, 110)}</span>
                  </div>
                </div>
              ))}
              {a4.exitCriteria && (
                <div className="out-dash__exit-box">
                  <div className="out-dash__exit-label">Exit Criteria</div>
                  <p className="out-dash__exit-text">{truncate(a4.exitCriteria, 120)}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="out-dash__empty-field">
              Complete OUT-A4 to map the follow-up touch sequence.
            </div>
          )}
        </div>

        {/* ── 04: OUT-A6 Objection Matrix ── */}
        <div className="out-dash__card out-dash__card--a6">
          <div {...headProps('OUT-A6')}>
            <span className="out-dash__card-num">04</span>
            <span className="out-dash__card-label">OUT-A6: Objection Matrix</span>
          </div>
          {objections.length > 0 ? (
            <div className="out-dash__obj-list">
              {objections.map((obj, i) => (
                <div key={i} className="out-dash__obj-item">
                  <div className="out-dash__obj-q">
                    <AlertTriangle size={12} className="out-dash__obj-icon" />
                    <span>{truncate(obj.objection, 100)}</span>
                  </div>
                  {obj.response && (
                    <div className="out-dash__obj-a">{obj.response}</div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="out-dash__empty-field">
              Complete OUT-S4 or OUT-A6 to populate the objection matrix.
            </div>
          )}
        </div>

        {/* ── 05: OUT-IC Ihsan Gate ── */}
        <div className="out-dash__card out-dash__card--ic">
          <div className="out-dash__gate-left">
            <div {...headProps('OUT-IC')}>
              <span className="out-dash__card-num">05</span>
              <span className="out-dash__card-label">OUT-IC: Ihsan Gate</span>
            </div>
            <div className="out-dash__gate-verdict" style={{ color: verdictColor, borderColor: `color-mix(in srgb, ${verdictColor} 20%, transparent)`, background: `color-mix(in srgb, ${verdictColor} 8%, transparent)` }}>
              <div className="out-dash__gate-verdict-label">Gate Status</div>
              <div className="out-dash__gate-verdict-value">{gateVerdict}</div>
              <div className="out-dash__gate-verdict-sub">{passCount} / {gateChecks.length} checks passed</div>
            </div>
          </div>
          <div className="out-dash__gate-checks">
            <div className="out-dash__gate-checks-title">Baseline Compliance Checks</div>
            {gateChecks.map((check, i) => {
              const isPending = !check.status;
              const isPass = check.status === 'pass';
              return (
                <div key={i} className={`out-dash__gate-check out-dash__gate-check--${check.status || 'pending'}`}>
                  <div className="out-dash__gate-check-icon">
                    {isPending
                      ? <span className="out-dash__gate-pending-dot" />
                      : isPass
                        ? <CheckCircle size={14} style={{ color: 'var(--col-done)' }} />
                        : <XCircle size={14} style={{ color: 'var(--pri-urgent)' }} />
                    }
                  </div>
                  <div className="out-dash__gate-check-info">
                    <span className="out-dash__gate-check-label">{check.label}</span>
                    <span className="out-dash__gate-check-sub">{check.sub}</span>
                  </div>
                  <span className={`out-dash__gate-check-badge out-dash__gate-check-badge--${check.status || 'pending'}`}>
                    {isPending ? '—' : isPass ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="out-dash__footer">
        <p className="out-dash__footer-quote">
          "Reach those who need you — not those you want to sell to."
        </p>
        <p className="out-dash__footer-meta">
          BBOS Strategy Engine · Stage 05 OUT · {project.name}
        </p>
      </div>
    </div>
  );
}
