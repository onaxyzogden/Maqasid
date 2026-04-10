import { useMemo } from 'react';
import { useTaskStore } from '../../store/task-store';
import './StrDashboard.css';

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

export default function StrDashboard({ project, onSelectTask }) {
  const tasksByProject = useTaskStore((s) => s.tasksByProject);

  const data = useMemo(() => {
    const tasks = tasksByProject[project.id] || [];
    const findTask = (type) => tasks.find((t) => t.bbosTaskType === type);
    const fieldData = (type) => findTask(type)?.bbosFieldData || {};

    const af1 = fieldData('STR-AF1');
    const af2 = fieldData('STR-AF2');
    const af3 = fieldData('STR-AF3');
    const af4 = fieldData('STR-AF4');
    const af5 = fieldData('STR-AF5');
    const v1  = fieldData('STR-V1');

    // AF1 — The Belief
    const beliefStatement  = af1.beliefStatement  || '';
    const vocPhrases       = splitLines(af1.vocSourcePhrases).slice(0, 3);
    const beliefValidation = af1.beliefValidation  || '';

    // AF2 — Enemy Narrative (3-part arc)
    const beforeState    = af2.beforeState    || '';
    const transformation = af2.transformation || '';
    const afterState     = af2.afterState     || '';

    // AF3 — Positioning
    const positioningStatement     = af3.positioningStatement     || '';
    const competitorDifferentiation = af3.competitorDifferentiation || '';
    const vocSeedPhrases           = splitLines(af3.vocSeedPhrases).slice(0, 4);

    // AF4 — Content Engine (6 angles)
    const contentAngles = [
      af4.contentAngle1, af4.contentAngle2, af4.contentAngle3,
      af4.contentAngle4, af4.contentAngle5, af4.contentAngle6,
    ].filter(Boolean);

    // AF5 — Truth-Gate safe phrases
    const safePhrases = [
      { phrase: af5.safePhrase1 || '', justification: af5.safePhrase1Justification || '' },
      { phrase: af5.safePhrase2 || '', justification: af5.safePhrase2Justification || '' },
      { phrase: af5.safePhrase3 || '', justification: af5.safePhrase3Justification || '' },
    ].filter((p) => p.phrase);
    const truthGateConclusion = af5.truthGateConclusion || '';

    // V1 — Integrity Gate verdict
    const integrityVerdictRaw = v1.integrityVerdict || '';
    const integrityAssessment = v1.integrityAssessment || '';
    const verdictMap = { pass: 'CLEARED', conditionalPass: 'CONDITIONAL', fail: 'BLOCKED' };
    const verdictDisplay = verdictMap[integrityVerdictRaw] || 'PENDING';
    const verdictMod = verdictDisplay.toLowerCase();

    // Task IDs for click-through
    const taskIds = {};
    ['STR-AF1', 'STR-AF2', 'STR-AF3', 'STR-AF4', 'STR-AF5'].forEach((type) => {
      const t = findTask(type);
      if (t) taskIds[type] = t.id;
    });

    return {
      beliefStatement, vocPhrases, beliefValidation,
      beforeState, transformation, afterState,
      positioningStatement, competitorDifferentiation, vocSeedPhrases,
      contentAngles,
      safePhrases, truthGateConclusion,
      verdictDisplay, verdictMod, integrityAssessment,
      taskIds,
    };
  }, [tasksByProject, project]);

  const {
    beliefStatement, vocPhrases, beliefValidation,
    beforeState, transformation, afterState,
    positioningStatement, competitorDifferentiation, vocSeedPhrases,
    contentAngles,
    safePhrases, truthGateConclusion,
    verdictDisplay, verdictMod, integrityAssessment,
    taskIds,
  } = data;

  const headProps = (type) => {
    const id = taskIds[type];
    const base = { className: 'str-dash__card-head' };
    if (!onSelectTask || !id) return base;
    return {
      className: 'str-dash__card-head str-dash__card-head--link',
      onClick: () => onSelectTask(id),
      role: 'button',
      tabIndex: 0,
      onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') onSelectTask(id); },
    };
  };

  return (
    <div className="str-dash">

      {/* ── Header ── */}
      <div className="str-dash__header">
        <div className="str-dash__eyebrow">BBOS · Stage 3 · Strategy</div>
        <h2 className="str-dash__title">Strategic Positioning Intelligence</h2>
        <p className="str-dash__desc">
          Market intelligence synthesis for offer positioning. This dossier evaluates belief
          architecture, enemy narrative, and content strategy against Amanah standards.
        </p>
      </div>

      {/* ── Bento Grid ── */}
      <div className="str-dash__grid">

        {/* ── 01: STR-AF1 The Belief ── */}
        <div className="str-dash__card str-dash__card--af1">
          <div {...headProps('STR-AF1')}>
            <span className="str-dash__card-num">01</span>
            <span className="str-dash__card-label">STR-AF1: The Belief</span>
          </div>
          {beliefStatement ? (
            <div className="str-dash__belief-body">
              <p className="str-dash__belief-statement">"{beliefStatement}"</p>
              {vocPhrases.length > 0 && (
                <div className="str-dash__voc-chips">
                  {vocPhrases.map((p, i) => (
                    <span key={i} className="str-dash__voc-chip">"{p}"</span>
                  ))}
                </div>
              )}
              {beliefValidation && (
                <p className="str-dash__belief-validation">{truncate(beliefValidation, 160)}</p>
              )}
            </div>
          ) : (
            <div className="str-dash__empty-field">
              Complete STR-AF1 to populate the core belief statement.
            </div>
          )}
        </div>

        {/* ── 02: STR-AF2 Enemy Narrative ── */}
        <div className="str-dash__card str-dash__card--af2">
          <div {...headProps('STR-AF2')}>
            <span className="str-dash__card-num">02</span>
            <span className="str-dash__card-label">STR-AF2: Enemy Narrative</span>
          </div>
          {(beforeState || transformation || afterState) ? (
            <div className="str-dash__arc">
              <div className="str-dash__arc-step str-dash__arc-step--before">
                <span className="str-dash__arc-label">Before</span>
                <p className="str-dash__arc-text">{truncate(beforeState, 150)}</p>
              </div>
              <div className="str-dash__arc-divider">→</div>
              <div className="str-dash__arc-step str-dash__arc-step--transform">
                <span className="str-dash__arc-label">Transformation</span>
                <p className="str-dash__arc-text">{truncate(transformation, 150)}</p>
              </div>
              <div className="str-dash__arc-divider">→</div>
              <div className="str-dash__arc-step str-dash__arc-step--after">
                <span className="str-dash__arc-label">After</span>
                <p className="str-dash__arc-text">{truncate(afterState, 150)}</p>
              </div>
            </div>
          ) : (
            <div className="str-dash__empty-field">
              Complete STR-AF2 to populate the transformation arc.
            </div>
          )}
        </div>

        {/* ── 03: STR-AF3 Positioning ── */}
        <div className="str-dash__card str-dash__card--af3">
          <div {...headProps('STR-AF3')}>
            <span className="str-dash__card-num">03</span>
            <span className="str-dash__card-label">STR-AF3: Positioning</span>
          </div>
          {positioningStatement ? (
            <div className="str-dash__positioning-body">
              <blockquote className="str-dash__positioning-quote">
                "{positioningStatement}"
              </blockquote>
              {competitorDifferentiation && (
                <p className="str-dash__diff-text">{truncate(competitorDifferentiation, 200)}</p>
              )}
              {vocSeedPhrases.length > 0 && (
                <div className="str-dash__seed-chips">
                  {vocSeedPhrases.map((p, i) => (
                    <span key={i} className="str-dash__seed-chip">{p}</span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="str-dash__empty-field">
              Complete STR-AF3 to populate the positioning statement.
            </div>
          )}
        </div>

        {/* ── 04: STR-AF4 Content Engine ── */}
        <div className="str-dash__card str-dash__card--af4">
          <div {...headProps('STR-AF4')}>
            <span className="str-dash__card-num">04</span>
            <span className="str-dash__card-label">STR-AF4: Content Engine</span>
          </div>
          {contentAngles.length > 0 ? (
            <div className="str-dash__angles-grid">
              {contentAngles.map((angle, i) => (
                <div key={i} className="str-dash__angle-card">
                  <span className="str-dash__angle-num">Angle {i + 1}</span>
                  <p className="str-dash__angle-text">{truncate(angle, 110)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="str-dash__empty-field">
              Complete STR-AF4 to populate the 6 content angles.
            </div>
          )}
        </div>

        {/* ── 05: STR-AF5 Truth-Gate Advisory ── */}
        <div className="str-dash__card str-dash__card--af5">

          {/* Left — Integrity Gate verdict */}
          <div className="str-dash__audit-left">
            <div {...headProps('STR-AF5')}>
              <span className="str-dash__card-num">05</span>
              <span className="str-dash__card-label">STR-AF5: Truth-Gate Advisory</span>
            </div>
            <div className="str-dash__verdict-wrap">
              <div className="str-dash__verdict-label">Integrity Gate</div>
              <div className={`str-dash__verdict-value str-dash__verdict-value--${verdictMod}`}>
                {verdictDisplay}
              </div>
            </div>
            {integrityAssessment && (
              <p className="str-dash__integrity-note">
                "{truncate(integrityAssessment, 200)}"
              </p>
            )}
            {truthGateConclusion && (
              <p className="str-dash__gate-conclusion">{truncate(truthGateConclusion, 160)}</p>
            )}
          </div>

          {/* Right — Safe headline phrases */}
          <div className="str-dash__audit-right">
            <div className="str-dash__phrases-title">Safe Headline Phrases</div>
            {safePhrases.length > 0 ? (
              <div className="str-dash__phrases-list">
                {safePhrases.map((item, i) => (
                  <div key={i} className="str-dash__phrase-card">
                    <div className="str-dash__phrase-num">{String(i + 1).padStart(2, '0')}</div>
                    <div className="str-dash__phrase-body">
                      <span className="str-dash__phrase-text">"{item.phrase}"</span>
                      {item.justification && (
                        <span className="str-dash__phrase-just">
                          {truncate(item.justification, 100)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="str-dash__empty-field">
                Complete STR-AF5 to populate safe headline phrases.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="str-dash__footer">
        <p className="str-dash__footer-quote">
          "The most powerful position is not the highest ground — it is the one the enemy cannot contest."
        </p>
        <p className="str-dash__footer-meta">
          BBOS Strategy Engine · Stage 03 STR · {project.name}
        </p>
      </div>

    </div>
  );
}
