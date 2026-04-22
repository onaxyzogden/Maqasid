import { useState, useMemo } from 'react';
import { Sun, ArrowUp } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useTaskStore } from '../../store/task-store';
import { useSettingsStore } from '../../store/settings-store';
import { useArabic } from '../../hooks/useArabic';
import { useCitations } from '../../hooks/useCitations';
import {
  MAQASID_PILLARS,
  getPillarLabel,
  getSubmoduleLabel,
} from '../../data/maqasid';
import { NIYYAH_FEELINGS, getFeeling, getFeelingLabel } from '../../data/niyyah-feelings';
import DuaSection from './DuaSection';
import ReferenceList from './ReferenceList';
import IslamicTerm from '../shared/IslamicTerm';
import './NiyyahAct.css';

const MORNING_DUA = {
  title: 'Morning Supplication',
  arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
  trans: 'Aṣbaḥnā wa aṣbaḥa l-mulku lillāh, wa l-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah, lahu l-mulku wa lahu l-ḥamd, wa huwa ʿalā kulli shayʾin qadīr',
  meaning: 'We have entered the morning, and the dominion belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone without partner; to Him belongs the dominion, to Him belongs all praise, and He is over all things capable.',
  source: 'Sahih Muslim 2723',
};

const EVENING_DUA = {
  title: 'Evening Supplication',
  arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ وَالْحَمْدُ لِلَّهِ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
  trans: 'Amsaynā wa amsa l-mulku lillāh, wa l-ḥamdu lillāh, lā ilāha illallāhu waḥdahu lā sharīka lah, lahu l-mulku wa lahu l-ḥamd, wa huwa ʿalā kulli shayʾin qadīr',
  meaning: 'We have entered the evening, and the dominion belongs to Allah. All praise is for Allah. None has the right to be worshipped except Allah, alone without partner; to Him belongs the dominion, to Him belongs all praise, and He is over all things capable.',
  source: 'Sahih Muslim 2723',
};

const UNIVERSAL_PROMPT = {
  meaning: 'Take a moment to set your intention for today. What matters most? Where will you direct your energy with purpose and clarity?',
};

const getDua = () => (new Date().getHours() < 12 ? MORNING_DUA : EVENING_DUA);

const LEVEL_ORDER = ['core', 'growth', 'excellence'];
const LEVEL_SHORT = { core: 'L1', growth: 'L2', excellence: 'L3' };
const LEVEL_NAME = { core: 'Foundation', growth: 'Growth', excellence: 'Excellence' };
const nextLevel = (lvl) => LEVEL_ORDER[LEVEL_ORDER.indexOf(lvl) + 1] || null;

export default function NiyyahAct({ initialStep = 'dua', onClose }) {
  const completeNiyyah = useThresholdStore((s) => s.completeNiyyah);
  const skipNiyyah = useThresholdStore((s) => s.skipNiyyah);
  const niyyahHistory = useThresholdStore((s) => s.niyyahHistory);
  const getSubmoduleActiveLevel = useTaskStore((s) => s.getSubmoduleActiveLevel);
  const getPillarLevelProgress = useTaskStore((s) => s.getPillarLevelProgress);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const fmt = useArabic();
  const dua = getDua();
  const { citations, citationMap, citationsVisible } = useCitations(
    isIslamic && initialStep === 'dua' ? [dua.source] : []
  );

  const [step, setStep] = useState(initialStep);
  const [feeling, setFeeling] = useState(null);
  const [selected, setSelected] = useState([]); // pillar ids (array kept per plan)
  const [submodule, setSubmodule] = useState(null);
  const [feelingPillsOpen, setFeelingPillsOpen] = useState(false);
  const [pillarPillsOpen, setPillarPillsOpen] = useState(false);
  const [submodulePillsOpen, setSubmodulePillsOpen] = useState(false);
  // Per-submodule level override for today (persists only until niyyah is saved).
  // Populated when the user taps the "↑ Advance" affordance on a submodule pill.
  const [advanceMap, setAdvanceMap] = useState({});

  const primaryPillarId = selected[0] ?? null;
  const primaryPillar = primaryPillarId
    ? MAQASID_PILLARS.find((p) => p.id === primaryPillarId)
    : null;

  function setPrimaryPillar(id) {
    if (!id) {
      setSelected([]);
      setSubmodule(null);
      return;
    }
    if (selected[0] === id) return;
    const tail = selected.filter((x) => x !== id);
    setSelected([id, ...tail]);
    // Clear submodule — it was scoped to the previous pillar.
    setSubmodule(null);
  }

  const feelingOptions = useMemo(
    () => NIYYAH_FEELINGS.map((f) => ({
      id: f.id,
      label: getFeelingLabel(f.id, isIslamic ? 'islamic' : 'universal'),
      sublabel: isIslamic ? `${f.translit} · ${f.note}` : f.note,
    })),
    [isIslamic]
  );

  const pillarOptions = useMemo(() => {
    const feelingDef = getFeeling(feeling);
    const suggested = new Set(feelingDef?.pairsWellWith ?? []);
    const decorate = (p) => ({
      id: p.id,
      label: getPillarLabel(p, isIslamic ? 'islamic' : 'universal'),
      sublabel: suggested.has(p.id)
        ? `${isIslamic ? p.arabicRoot : p.universalStewardship} · resonates with this state`
        : (isIslamic ? p.arabicRoot : p.universalStewardship),
      color: p.accentColor,
    });
    // Soft surface: suggested pillars float to top, preserving their
    // relative order. Never filter — all pillars remain selectable.
    const suggestedList = MAQASID_PILLARS.filter((p) => suggested.has(p.id)).map(decorate);
    const rest = MAQASID_PILLARS.filter((p) => !suggested.has(p.id)).map(decorate);
    return [...suggestedList, ...rest];
  }, [isIslamic, feeling]);

  const pillarProgress = useMemo(
    () => (primaryPillar ? getPillarLevelProgress(primaryPillar.id) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [primaryPillar],
  );

  const submoduleOptions = useMemo(() => {
    if (!primaryPillar) return [];
    return primaryPillar.subModuleIds.map((id) => {
      const active = getSubmoduleActiveLevel(id);
      const effective = advanceMap[id] || active;
      const nxt = nextLevel(effective);
      // Advance is offered only when the pillar's CURRENT effective level is
      // fully complete across every submodule (pillar levels up together).
      const canAdvance = !!(nxt && pillarProgress?.[effective]);
      return {
        id,
        label: getSubmoduleLabel(id, primaryPillar.id),
        color: primaryPillar.accentColor,
        level: effective,
        canAdvance,
        nextLevel: nxt,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryPillar, advanceMap, pillarProgress]);

  const selectedSubmoduleOpt = submoduleOptions.find((o) => o.id === submodule) || null;
  const selectedLevel = selectedSubmoduleOpt?.level ?? null;

  function handleAdvance(sm, nxt) {
    setAdvanceMap((m) => ({ ...m, [sm]: nxt }));
  }

  const sentenceReady = !!(feeling && primaryPillarId && submodule);
  const overachieving = selected.length > 2;

  // Yesterday's Echo — most recent history entry, if it was "yesterday".
  const lastNiyyah = niyyahHistory?.[niyyahHistory.length - 1] ?? null;
  const yesterdayIso = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  })();
  const echo = lastNiyyah && lastNiyyah.date === yesterdayIso ? lastNiyyah : null;
  const echoPillar = echo ? MAQASID_PILLARS.find((p) => p.id === echo.pillars?.[0]) : null;

  function continueYesterday() {
    if (!echo || !echoPillar) return;
    setFeeling(echo.feeling);
    setSelected([...echo.pillars]);
    setSubmodule(echo.submodule);
  }

  function handleSkipAll() {
    skipNiyyah();
    if (isOverride) onClose?.();
  }

  function handleBegin() {
    setStep('pillars');
  }

  function handleSetFocus() {
    completeNiyyah({ feeling, pillars: selected, submodule, level: selectedLevel });
    if (isOverride) onClose?.();
  }

  function handleSkipFocus() {
    completeNiyyah({ feeling: null, pillars: [], submodule: null });
    if (isOverride) onClose?.();
  }

  const showStepDots = initialStep === 'dua';
  const isOverride = initialStep === 'pillars';

  return (
    <div className="niyyah-overlay">
      <div className="niyyah-card">
        {/* Header */}
        <div className="niyyah-header">
          <span className="niyyah-badge">
            {isIslamic ? (
              <><IslamicTerm id="al-rahman">AL-RAHMĀN</IslamicTerm> · <IslamicTerm id="al-rahim">AL-RAHĪM</IslamicTerm></>
            ) : 'DAILY ORIENTATION'}
          </span>
          <h2 className="niyyah-title">
            {step === 'dua'
              ? (isIslamic ? <>Daily <IslamicTerm id="niyyah">Niyyah</IslamicTerm></> : 'Daily Intention')
              : "Today's Focus"}
          </h2>
          <p className="niyyah-subtitle">
            {step === 'dua'
              ? (isIslamic
                  ? 'Orient yourself under divine mercy before entering your work'
                  : 'Set your focus before entering your workspace')
              : 'Complete the sentence to author your day.'}
          </p>
        </div>

        {/* Step indicator dots */}
        {showStepDots && (
          <div className="niyyah-steps">
            <div className={`niyyah-step-dot ${step === 'dua' ? 'niyyah-step-dot--active' : 'niyyah-step-dot--done'}`} />
            <div className={`niyyah-step-dot ${step === 'pillars' ? 'niyyah-step-dot--active' : ''}`} />
          </div>
        )}

        {/* Body */}
        <div className="niyyah-body">
          {step === 'dua' ? (
            isIslamic ? (
              <>
                <div className="niyyah-bismillah">
                  <p className="niyyah-bismillah-ar">{fmt('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ')}</p>
                  <p className="niyyah-bismillah-en">In the name of Allah, the Most Gracious, the Most Merciful</p>
                </div>
                <DuaSection
                  dua={dua}
                  color="var(--accent)"
                  citationIndex={citationMap[dua.source]}
                  showCitations={citationsVisible}
                />
              </>
            ) : (
              <div className="niyyah-mindfulness">
                <p className="niyyah-mindfulness-text">{UNIVERSAL_PROMPT.meaning}</p>
              </div>
            )
          ) : (
            <>
              <p className="niyyah-focus-heading">
                {isIslamic ? 'Author your day' : 'Set your intention'}
              </p>
              {echo && echoPillar && (
                <div className="niyyah-echo">
                  <p className="niyyah-echo-text">
                    Yesterday, you tended to{' '}
                    <strong>{getSubmoduleLabel(echo.submodule, echoPillar.id)}</strong>
                    {' '}with a heart of{' '}
                    <strong>{getFeelingLabel(echo.feeling, isIslamic ? 'islamic' : 'universal')}</strong>.
                  </p>
                  {echo.reflection?.feeling && (
                    <p className="niyyah-echo-text niyyah-echo-text--reflection">
                      You closed the day feeling{' '}
                      <strong>{getFeelingLabel(echo.reflection.feeling, isIslamic ? 'islamic' : 'universal')}</strong>.
                    </p>
                  )}
                  <div className="niyyah-echo-actions">
                    <button
                      type="button"
                      className="niyyah-echo-btn"
                      onClick={continueYesterday}
                    >
                      Continue the journey
                    </button>
                    <span className="niyyah-echo-hint">or author something new below</span>
                  </div>
                </div>
              )}
              <div className="niyyah-adlib">
                <div className="niyyah-adlib-line">
                  Today, my heart feels{' '}
                  <button
                    type="button"
                    className={`niyyah-feeling-word${feeling ? ' niyyah-feeling-word--filled' : ''}`}
                    aria-expanded={feelingPillsOpen}
                    aria-haspopup="true"
                    onClick={() => setFeelingPillsOpen((v) => !v)}
                  >
                    {feeling
                      ? feelingOptions.find((f) => f.id === feeling)?.label
                      : 'a state'}
                  </button>
                  {'.'}
                </div>
                {feelingPillsOpen && (
                  <div className="niyyah-feeling-pills" role="radiogroup" aria-label="How does your heart feel?">
                    {NIYYAH_FEELINGS.map((f) => {
                      const selectedPill = feeling === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          role="radio"
                          aria-checked={selectedPill}
                          onClick={() => {
                            setFeeling(selectedPill ? null : f.id);
                            setFeelingPillsOpen(false);
                          }}
                          className={`niyyah-feeling-pill${selectedPill ? ' niyyah-feeling-pill--selected' : ''}`}
                          title={f.note}
                        >
                          <span className="niyyah-feeling-pill-label">
                            {getFeelingLabel(f.id, isIslamic ? 'islamic' : 'universal')}
                          </span>
                          {isIslamic && (
                            <span className="niyyah-feeling-pill-translit">{f.translit}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
                {feeling && (
                  <>
                    <div className="niyyah-adlib-line">
                      I want to honor my pillar of{' '}
                      <button
                        type="button"
                        className={`niyyah-feeling-word${primaryPillar ? ' niyyah-feeling-word--filled' : ''}`}
                        style={primaryPillar ? { color: primaryPillar.accentColor, borderBottomColor: primaryPillar.accentColor } : undefined}
                        aria-expanded={pillarPillsOpen}
                        aria-haspopup="true"
                        onClick={() => setPillarPillsOpen((v) => !v)}
                      >
                        {primaryPillar
                          ? getPillarLabel(primaryPillar, isIslamic ? 'islamic' : 'universal')
                          : 'a pillar'}
                      </button>
                      {primaryPillar && submodule && (
                        <>
                          {' '}by tending to{' '}
                          <button
                            type="button"
                            className="niyyah-feeling-word niyyah-feeling-word--filled"
                            style={{ color: primaryPillar.accentColor, borderBottomColor: primaryPillar.accentColor }}
                            aria-expanded={submodulePillsOpen}
                            aria-haspopup="true"
                            onClick={() => setSubmodulePillsOpen((v) => !v)}
                          >
                            {getSubmoduleLabel(submodule, primaryPillar.id)}
                          </button>
                        </>
                      )}
                      {primaryPillar && !submodule && (
                        <>
                          {' '}by tending to{' '}
                          <button
                            type="button"
                            className="niyyah-feeling-word"
                            aria-expanded={submodulePillsOpen}
                            aria-haspopup="true"
                            onClick={() => setSubmodulePillsOpen((v) => !v)}
                          >
                            a focus
                          </button>
                        </>
                      )}
                      {'.'}
                    </div>
                    {pillarPillsOpen && (
                      <div className="niyyah-feeling-pills" role="radiogroup" aria-label="Which pillar?">
                        {pillarOptions.map((o) => {
                          const sel = primaryPillarId === o.id;
                          return (
                            <button
                              key={o.id}
                              type="button"
                              role="radio"
                              aria-checked={sel}
                              onClick={() => {
                                setPrimaryPillar(sel ? null : o.id);
                                setPillarPillsOpen(false);
                              }}
                              className={`niyyah-feeling-pill${sel ? ' niyyah-feeling-pill--selected' : ''}`}
                              style={sel ? { background: o.color, borderColor: o.color } : { borderColor: o.color }}
                              title={o.sublabel}
                            >
                              <span className="niyyah-feeling-pill-label">{o.label}</span>
                              <span className="niyyah-feeling-pill-translit">{o.sublabel}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {primaryPillar && submodulePillsOpen && (
                      <div className="niyyah-feeling-pills" role="radiogroup" aria-label="Which focus within the pillar?">
                        {submoduleOptions.map((o) => {
                          const sel = submodule === o.id;
                          return (
                            <button
                              key={o.id}
                              type="button"
                              role="radio"
                              aria-checked={sel}
                              onClick={() => {
                                setSubmodule(sel ? null : o.id);
                                setSubmodulePillsOpen(false);
                              }}
                              className={`niyyah-feeling-pill${sel ? ' niyyah-feeling-pill--selected' : ''}`}
                              style={sel ? { background: o.color, borderColor: o.color } : { borderColor: o.color }}
                            >
                              <span className="niyyah-feeling-pill-label">
                                {o.label}
                                {o.level && (
                                  <span className="niyyah-level-badge">
                                    {LEVEL_SHORT[o.level]} · {LEVEL_NAME[o.level]}
                                  </span>
                                )}
                              </span>
                              {o.canAdvance && (
                                <span
                                  role="button"
                                  tabIndex={0}
                                  className="niyyah-advance-chip"
                                  title={`Advance to ${LEVEL_NAME[o.nextLevel]}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAdvance(o.id, o.nextLevel);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleAdvance(o.id, o.nextLevel);
                                    }
                                  }}
                                >
                                  <ArrowUp size={10} /> Advance to {LEVEL_NAME[o.nextLevel]}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
              {overachieving && (
                <p className="niyyah-overachiever">
                  Easy there, Tiger. Even the moon takes a month to complete its cycle — maybe pick two?
                </p>
              )}
            </>
          )}
        </div>

        <ReferenceList citations={citations} visible={citationsVisible && isIslamic && step === 'dua'} />

        {/* Footer */}
        <div className="niyyah-footer">
          {step === 'dua' ? (
            <>
              <button className="niyyah-skip" onClick={handleSkipAll}>
                Skip
              </button>
              <button className="niyyah-confirm" onClick={handleBegin}>
                <Sun size={16} />
                {isIslamic ? <><IslamicTerm id="bismillah">Bismillah</IslamicTerm> — Begin</> : 'Begin'}
              </button>
            </>
          ) : (
            <>
              <button className="niyyah-skip" onClick={handleSkipFocus}>
                Skip
              </button>
              <button
                className="niyyah-confirm"
                onClick={handleSetFocus}
                disabled={!sentenceReady}
              >
                Set Focus →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
