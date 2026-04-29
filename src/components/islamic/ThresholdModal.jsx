import { useState } from 'react';
import { X, Pause } from 'lucide-react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useThresholdStore } from '../../store/threshold-store';
import { MODULES } from '../../data/modules';
import {
  getModuleData, ONGOING_DUA, ISTIRJA, PAUSE_ACKNOWLEDGMENT,
  PAUSE_UNIVERSAL,
  getPauseQuestion, getPauseQuestionUniversal,
} from '@data/islamic/islamic-data';
import { lookupReadinessAyahByKey } from '@data/ayat/readiness-ayat-router';
import { getPillarForModule } from '../../data/maqasid';
import { getBbosStageIslamic } from '@data/bbos/bbos-stage-islamic';
import { getStageLayer } from '../../data/bbos/bbos-pipeline';
import { useSettingsStore } from '../../store/settings-store';
import { useArabic } from '../../hooks/useArabic';
import { useCitations } from '../../hooks/useCitations';
import AttributeCard from './AttributeCard';
import DuaSection from './DuaSection';
import ReferenceList from './ReferenceList';
import ReadinessCheck from './ReadinessCheck';
import IslamicTerm from '../shared/IslamicTerm';
import './ThresholdModal.css';

// ── Row-aware helpers ────────────────────────────────────────────────────────

function buildReadinessKey(rows, selections) {
  return rows.map((r) => (selections[r.id] === true ? '1' : '0')).join('');
}

function allFilled(rows, selections) {
  return rows.every((r) => selections[r.id] !== null && selections[r.id] !== undefined);
}

function allYes(rows, selections) {
  return rows.every((r) => selections[r.id] === true);
}

// Build row objects from the legacy flat reflection shape so the closing
// threshold can reuse the same interactive card-pair wizard as opening.
// Modules that already author `reflection.rows` explicitly pass through
// untouched.
function synthesizeReflectionRows(reflection) {
  if (!reflection) return [];
  if (Array.isArray(reflection.rows) && reflection.rows.length > 0) return reflection.rows;
  const gov = reflection.governing || [];
  const nyt = reflection.notYet || [];
  const n = Math.max(gov.length, nyt.length);
  if (n === 0) return [];
  return Array.from({ length: n }, (_, i) => ({
    id: `R${i}`,
    governing: gov[i] || '',
    notYet: nyt[i] || '',
    yesLabel: reflection.yesLabel,
    notYetLabel: reflection.notYetLabel,
  }));
}

// ── Pause label — derived from unique attribute names in the NOT YET rows ────

function getPauseLabel(rows, selections) {
  const notYetAttrs = [...new Set(
    rows.filter((r) => selections[r.id] === false).map((r) => r.attr)
  )];
  if (notYetAttrs.length === 0) return 'Not yet ready';
  if (notYetAttrs.length === 1) return `Not yet rested in ${notYetAttrs[0]}`;
  return 'Not yet aligned with the threshold';
}

export default function ThresholdModal({ type }) {
  const openingModuleId = useThresholdStore((s) => s.openingModuleId);
  const closingModuleId = useThresholdStore((s) => s.closingModuleId);
  const setOpeningModuleId = useThresholdStore((s) => s.setOpeningModuleId);
  const setClosingModuleId = useThresholdStore((s) => s.setClosingModuleId);
  const completeOpening = useThresholdStore((s) => s.completeOpening);
  const completeClosing = useThresholdStore((s) => s.completeClosing);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const fmt = useArabic();

  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [leaving, setLeaving] = useState(false);
  // Keyed by row id (dynamic per module — starts empty, keys added on selection)
  const [readinessSelections, setReadinessSelections] = useState({});
  const [reflectionSelections, setReflectionSelections] = useState({});

  const isOpening = type === 'opening';
  const moduleId = isOpening ? openingModuleId : closingModuleId;
  const isIslamic = valuesLayer === 'islamic';

  // Detect BBOS stage ceremony keys (e.g. 'bbos:IDY')
  const isBbosStage = moduleId?.startsWith('bbos:');
  const bbosStageId = isBbosStage ? moduleId.slice(5) : null;
  const bbosStageData = bbosStageId ? getBbosStageIslamic(bbosStageId) : null;

  const mod = isBbosStage ? null : MODULES.find((m) => m.id === moduleId);
  const rawData = isBbosStage ? bbosStageData : getModuleData(moduleId, valuesLayer);
  const accentColor = 'var(--accent)';

  // ── Pillar fallback — sub-modules (e.g. faith-zakah) fall back to pillar data ─
  // MODULE_ATTRS only has pillar-level keys (faith, life, etc.), not sub-module keys.
  // rawData is null for sub-modules; pillarData provides the fallback for all steps.
  // Map BBOS layers to Maqasid pillars: Think/Reckon → intellect, Execute → work (wealth)
  const LAYER_TO_MODULE = { think: 'intellect-thinking', execute: 'work', reckon: 'intellect-thinking' };
  const bbosPillarModule = isBbosStage
    ? LAYER_TO_MODULE[getStageLayer(bbosStageId)?.id] || 'work'
    : null;
  const pillar = isBbosStage ? getPillarForModule(bbosPillarModule) : getPillarForModule(moduleId);
  const pillarData = pillar ? getModuleData(pillar.id, valuesLayer) : null;
  const data = rawData ?? pillarData;
  const readinessRows = data?.readiness?.rows ?? [];
  const effectiveReadinessData = data?.readiness;

  // Is this module using interactive readiness? (has rows)
  const hasInteractiveReadiness = isOpening && readinessRows.length > 0;

  // ── Reflection (closing) interactive state ──────────────────────────────────
  // Most modules author `reflection` in the legacy flat shape
  // ({ frame, yesLabel, notYetLabel, governing: [...], notYet: [...] }) without
  // a `.rows` array. Synthesize rows from those parallel arrays so the
  // closing threshold renders the same interactive card-pair wizard as opening.
  const reflectionRows = synthesizeReflectionRows(data?.reflection);
  const hasInteractiveReflection = !isOpening && reflectionRows.length > 0;
  const reflectionFilled = hasInteractiveReflection && allFilled(reflectionRows, reflectionSelections);
  const reflectionAllYes = hasInteractiveReflection && allYes(reflectionRows, reflectionSelections);

  // ── Readiness key and derived state ─────────────────────────────────────────
  const readinessFilled = hasInteractiveReadiness && allFilled(readinessRows, readinessSelections);
  const readinessAllYes = hasInteractiveReadiness && allYes(readinessRows, readinessSelections);
  const readinessKey = hasInteractiveReadiness ? buildReadinessKey(readinessRows, readinessSelections) : '111111';

  // ── Ayat lookup via pillar's readinessAyatKey ────────────────────────────────
  const readinessAyatKey = pillar?.readinessAyatKey;
  const pauseAyah = (hasInteractiveReadiness && isIslamic && readinessKey !== '111111')
    ? lookupReadinessAyahByKey(readinessAyatKey, readinessKey)
    : null;

  // ── Citation collection for all ceremony sources ────────────────────────────
  const { citations, citationMap, citationsVisible } = useCitations(
    isIslamic ? [
      isOpening ? data?.dua?.source : null,
      data?.closingDua?.source,
      ONGOING_DUA.source,
      pauseAyah?.source,
      ISTIRJA.source,
    ] : []
  );

  const resetState = () => {
    setStep(0);
    setPaused(false);
    setReadinessSelections({});
    setReflectionSelections({});
  };

  const close = () => {
    setLeaving(true);
    setTimeout(() => {
      resetState();
      setLeaving(false);
      if (isOpening) setOpeningModuleId(null);
      else setClosingModuleId(null);
    }, 200);
  };

  const trapRef = useFocusTrap(!!moduleId, close);

  if (!moduleId) return null;

  // Dynamic steps — Pause or Closing Dua appends after Readiness/Reflection when triggered
  const baseSteps = isOpening
    ? ['Dua', 'Attributes', 'Readiness']
    : ['Dua', 'Attributes', 'Reflection'];

  // Closing Dua always appears on the closing threshold (whether the user
  // was fully aligned or not) — the duʿāʾ is how we mark the return, not a
  // remedial step for misalignment alone.
  const showClosingDuaStep = !isOpening && hasInteractiveReflection;
  const steps = paused
    ? [...baseSteps, 'Pause']
    : showClosingDuaStep
      ? [...baseSteps, 'Closing Dua']
      : baseSteps;

  const currentStepName = steps[step];

  const complete = () => {
    setLeaving(true);
    setTimeout(() => {
      if (isOpening) completeOpening(moduleId);
      else completeClosing(moduleId);
      resetState();
      setLeaving(false);
    }, 200);
  };

  const handleSkip = () => {
    const label = isOpening ? 'Opening Threshold' : 'Closing Threshold';
    if (window.confirm(`Skip the ${label} ceremony? It will be marked complete without going through the steps.`)) {
      complete();
    }
  };

  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  const prev = () => {
    if (step > 0) {
      if (currentStepName === 'Pause') { setPaused(false); setStep(2); return; }
      if (currentStepName === 'Closing Dua') { setStep(2); return; }
      setStep(step - 1);
    }
  };

  const triggerPause = () => {
    setPaused(true);
    setStep(3);
  };

  const handleNext = () => {
    if (currentStepName === 'Readiness' && hasInteractiveReadiness && readinessFilled && !readinessAllYes) {
      triggerPause();
      return;
    }
    // Reflection always advances to 'Closing Dua' (aligned or not).
    next();
  };

  const handleReadinessSelect = (id, value) => {
    setReadinessSelections((prev) => ({ ...prev, [id]: value }));
  };

  const handleReflectionSelect = (id, value) => {
    setReflectionSelections((prev) => ({ ...prev, [id]: value }));
  };

  const pauseQuestion = isIslamic
    ? getPauseQuestion(moduleId)
    : getPauseQuestionUniversal(moduleId);

  // Count unanswered rows for hint text
  const unfilledCount = readinessRows.filter(
    (r) => readinessSelections[r.id] === null || readinessSelections[r.id] === undefined
  ).length;

  return (
    <div className={`thr-overlay${leaving ? ' thr-overlay--leaving' : ''}`}>
      <div className="thr-modal" ref={trapRef} role="dialog" aria-modal="true" aria-labelledby="threshold-modal-title">

        {/* ══════════════════════════════════════════════ */}
        {/* CEREMONY FLOW                                 */}
        {/* ══════════════════════════════════════════════ */}

            <div className="thr-header">
              <div>
                <span className="thr-module-badge">{mod?.name || 'Objective'}</span>
                <h2 className="thr-title" id="threshold-modal-title">
                  {isOpening ? 'Opening Threshold' : 'Closing Threshold'}
                </h2>
              </div>
              <button className="thr-close" onClick={close} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="thr-steps">
              {steps.map((s, i) => (
                <button
                  key={s}
                  className={`thr-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''} ${s === 'Pause' ? 'thr-step-pause' : ''}`}
                  onClick={() => { if (i <= step) setStep(i); }}
                >
                  {s === 'Pause'
                    ? <><Pause size={14} /> Pause</>
                    : s === 'Dua' && isIslamic
                      ? <IslamicTerm id="dua">Dua</IslamicTerm>
                      : s === 'Attributes' && isIslamic
                        ? 'Allah ﷻ'
                        : s === 'Readiness'
                          ? 'Ready?'
                          : s
                  }
                </button>
              ))}
              {currentStepName !== 'Pause' && (
                <button className="thr-step thr-step-skip" onClick={handleSkip} title="Skip ceremony">
                  Skip
                </button>
              )}
            </div>

            <div className="thr-body">
              <div key={step} className="thr-step-anim">
              {currentStepName === 'Dua' && data && (
                <div className="thr-step-content fade-in">
                  {isIslamic ? (
                    <DuaSection dua={isOpening ? data.dua : (data.closingDua || ONGOING_DUA)} color={accentColor} citationIndex={citationMap[(isOpening ? data.dua : (data.closingDua || ONGOING_DUA))?.source]} showCitations={citationsVisible} />
                  ) : (
                    <div className="il-mindfulness">
                      <p>{isOpening ? data.mindfulness : (data.closingMindfulness || 'Take a moment to reflect on your session and what you accomplished.')}</p>
                    </div>
                  )}
                </div>
              )}

              {currentStepName === 'Attributes' && data && (
                <div className="thr-step-content fade-in">
                  {isIslamic
                    ? data.attrs?.map((attr, i) => <AttributeCard key={i} attr={attr} color={accentColor} />)
                    : data.principles?.map((p, i) => <AttributeCard key={i} attr={p} color={accentColor} />)
                  }
                </div>
              )}

              {(currentStepName === 'Readiness' || currentStepName === 'Reflection') && (
                <div className="thr-step-content fade-in">
                  {isOpening && hasInteractiveReadiness ? (
                    <ReadinessCheck
                      readiness={effectiveReadinessData}
                      color={accentColor}
                      interactive={true}
                      selections={readinessSelections}
                      onSelect={handleReadinessSelect}
                    />
                  ) : isOpening ? (
                    <ReadinessCheck readiness={data?.readiness} color={accentColor} />
                  ) : hasInteractiveReflection ? (
                    <ReadinessCheck
                      readiness={{ ...(data?.reflection || {}), rows: reflectionRows }}
                      color={accentColor}
                      interactive={true}
                      selections={reflectionSelections}
                      onSelect={handleReflectionSelect}
                    />
                  ) : (
                    <ReadinessCheck reflection={data?.reflection} color={accentColor} />
                  )}
                </div>
              )}

              {currentStepName === 'Closing Dua' && data && (
                <div className="thr-step-content fade-in">
                  {isIslamic ? (
                    <DuaSection dua={data.closingDua || ONGOING_DUA} color={accentColor} citationIndex={citationMap[(data.closingDua || ONGOING_DUA)?.source]} showCitations={citationsVisible} />
                  ) : (
                    <div className="il-mindfulness">
                      <p>{data.closingMindfulness || 'Take a moment to reflect on your session and what you accomplished.'}</p>
                    </div>
                  )}
                </div>
              )}

              {currentStepName === 'Pause' && (
                <div className="thr-step-content thr-pause-content fade-in">
                  {isIslamic && data?.pauseWarning && data?.pauseRiseNow ? (
                    <>
                      {data.pauseWarning && (
                        <div className="thr-pause-ayah">
                          <div className="dua" style={{ borderColor: 'var(--border2)', background: 'var(--bg)' }}>
                            <p className="dua-arabic arabic">{fmt(data.pauseWarning.arabic)}</p>
                            <p className="dua-trans">{data.pauseWarning.trans}</p>
                            <p className="dua-meaning" style={{ borderLeftColor: 'var(--border2)' }}>{data.pauseWarning.meaning}</p>
                            <p className="dua-source">{data.pauseWarning.source}</p>
                          </div>
                        </div>
                      )}
                      {data.pauseRiseNow && (
                        <div className="thr-pause-istirja">
                          <div className="dua" style={{ borderColor: 'var(--border2)', background: 'var(--bg)' }}>
                            <p className="dua-arabic arabic">{fmt(data.pauseRiseNow.arabic)}</p>
                            <p className="dua-trans">{data.pauseRiseNow.trans}</p>
                            <p className="dua-meaning" style={{ borderLeftColor: 'var(--border2)' }}>{data.pauseRiseNow.meaning}</p>
                            <p className="dua-source">{data.pauseRiseNow.source}</p>
                          </div>
                        </div>
                      )}
                      <p className="thr-pause-question">This prayer has not yet left its time. Rise.</p>
                    </>
                  ) : (
                    <>
                      <p className="thr-pause-ack">
                        {isIslamic ? PAUSE_ACKNOWLEDGMENT : PAUSE_UNIVERSAL.acknowledgment}
                      </p>

                      {pauseAyah && (
                        <div className="thr-pause-ayah">
                          <p className="thr-pause-ayah-framing">{pauseAyah.framing}</p>
                          <div className="dua" style={{ borderColor: 'var(--border2)', background: 'var(--bg)' }}>
                            <p className="dua-arabic arabic">{fmt(pauseAyah.arabic)}</p>
                            <p className="dua-trans">{pauseAyah.transliteration}</p>
                            <p className="dua-meaning" style={{ borderLeftColor: 'var(--border2)' }}>
                              {pauseAyah.translation}
                            </p>
                            <p className="dua-source">
                              {pauseAyah.source}
                              {citationsVisible && citationMap[pauseAyah.source] != null && (
                                <span className="dua-citation-badge">[{citationMap[pauseAyah.source]}]</span>
                              )}
                            </p>
                          </div>
                        </div>
                      )}

                      {isIslamic ? (
                        <div className="thr-pause-istirja">
                          <div className="dua" style={{ borderColor: 'var(--border2)', background: 'var(--bg)' }}>
                            <p className="dua-arabic arabic">{fmt(ISTIRJA.arabic)}</p>
                            <p className="dua-trans">{ISTIRJA.trans}</p>
                            <p className="dua-meaning" style={{ borderLeftColor: 'var(--border2)' }}>{ISTIRJA.meaning}</p>
                            <p className="dua-source">
                              {ISTIRJA.source}
                              {citationsVisible && citationMap[ISTIRJA.source] != null && (
                                <span className="dua-citation-badge">[{citationMap[ISTIRJA.source]}]</span>
                              )}
                            </p>
                          </div>
                          <p className="thr-pause-note">{ISTIRJA.note}</p>
                        </div>
                      ) : (
                        <div className="il-mindfulness"><p>{PAUSE_UNIVERSAL.reflection}</p></div>
                      )}
                      <p className="thr-pause-question">{pauseQuestion}</p>
                    </>
                  )}
                </div>
              )}

              </div>{/* end thr-step-anim */}
            </div>

            <div className="thr-footer">
              {currentStepName === 'Pause' ? (
                <>
                  <button className="thr-btn thr-btn-ghost" onClick={prev}>Previous</button>
                  <div className="thr-footer-spacer" />
                  <button className="thr-btn thr-btn-primary thr-btn-bismillah" onClick={complete}>
                    <span className="thr-btn-label">{isOpening ? 'Bismillah' : 'Alhamdulillah'}</span>
                    <span className="thr-btn-arabic arabic" dir="rtl">{isOpening ? '\u0628\u0650\u0633\u0652\u0645\u0650\u0020\u0627\u0644\u0644\u0651\u064E\u0647\u0650' : '\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F\u0020\u0644\u0650\u0644\u0651\u064E\u0647\u0650'}</span>
                  </button>
                </>
              ) : (
                <>
                  {step > 0 && (
                    <button className="thr-btn thr-btn-ghost" onClick={prev}>Previous</button>
                  )}

                  {currentStepName === 'Readiness' && hasInteractiveReadiness && readinessFilled && !readinessAllYes && !paused && (
                    <button className="thr-btn thr-btn-pause" onClick={triggerPause}>
                      {getPauseLabel(readinessRows, readinessSelections)}
                    </button>
                  )}

                  {currentStepName === 'Readiness' && !hasInteractiveReadiness && isOpening && !paused && (
                    <button className="thr-btn thr-btn-pause" onClick={triggerPause}>I'm not yet ready</button>
                  )}

                  {currentStepName === 'Readiness' && hasInteractiveReadiness && (
                    <span className={`thr-readiness-hint ${readinessFilled ? (readinessAllYes ? 'thr-readiness-hint--yes' : 'thr-readiness-hint--nyt') : ''}`}>
                      {!readinessFilled
                        ? `${unfilledCount} row${unfilledCount !== 1 ? 's' : ''} still need a selection.`
                        : readinessAllYes
                          ? 'All conditions confirmed. You may proceed.'
                          : ''
                      }
                    </span>
                  )}

                  {currentStepName === 'Reflection' && hasInteractiveReflection && (() => {
                    const reflUnfilled = reflectionRows.filter(
                      (r) => reflectionSelections[r.id] === null || reflectionSelections[r.id] === undefined
                    ).length;
                    return (
                      <span className={`thr-readiness-hint ${reflectionFilled ? (reflectionAllYes ? 'thr-readiness-hint--yes' : 'thr-readiness-hint--nyt') : ''}`}>
                        {!reflectionFilled
                          ? `${reflUnfilled} row${reflUnfilled !== 1 ? 's' : ''} still need a selection.`
                          : reflectionAllYes
                            ? 'Alhamdulillah. You may proceed.'
                            : ''
                        }
                      </span>
                    );
                  })()}

                  <div className="thr-footer-spacer" />
                  {(() => {
                    const isFinalize =
                      (currentStepName === 'Readiness' && hasInteractiveReadiness && readinessAllYes) ||
                      currentStepName === 'Closing Dua';
                    if (isFinalize) {
                      return (
                        <button className="thr-btn thr-btn-primary thr-btn-bismillah" onClick={complete}>
                          <span className="thr-btn-label">{isOpening ? 'Bismillah' : 'Alhamdulillah'}</span>
                          <span className="thr-btn-arabic arabic" dir="rtl">{isOpening ? '\u0628\u0650\u0633\u0652\u0645\u0650\u0020\u0627\u0644\u0644\u0651\u064E\u0647\u0650' : '\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F\u0020\u0644\u0650\u0644\u0651\u064E\u0647\u0650'}</span>
                        </button>
                      );
                    }
                    const nextDisabled =
                      (currentStepName === 'Readiness' && hasInteractiveReadiness && !readinessFilled) ||
                      (currentStepName === 'Reflection' && hasInteractiveReflection && !reflectionFilled);
                    return (
                      <button
                        className="thr-btn thr-btn-primary"
                        onClick={handleNext}
                        disabled={nextDisabled}
                        style={{
                          opacity: nextDisabled ? 0.4 : 1,
                          cursor: nextDisabled ? 'not-allowed' : 'pointer',
                        }}
                      >
                        Next
                      </button>
                    );
                  })()}
                </>
              )}
            </div>
            <ReferenceList citations={citations} visible={citationsVisible && isIslamic} />
      </div>
    </div>
  );
}
