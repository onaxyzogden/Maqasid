import { useState } from 'react';
import { Sun } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { useCitations } from '../../hooks/useCitations';
import { MAQASID_PILLARS } from '../../data/maqasid';
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

export default function NiyyahAct({ initialStep = 'dua', onClose }) {
  const completeNiyyah = useThresholdStore((s) => s.completeNiyyah);
  const skipNiyyah = useThresholdStore((s) => s.skipNiyyah);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const dua = getDua();
  const { citations, citationMap, citationsVisible } = useCitations(
    isIslamic ? [dua.source] : []
  );

  const [step, setStep] = useState(initialStep);
  const [selected, setSelected] = useState([]);

  function togglePillar(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSkipAll() {
    skipNiyyah();
    onClose?.();
  }

  function handleBegin() {
    setStep('pillars');
  }

  function handleSetFocus() {
    completeNiyyah(selected);
    onClose?.();
  }

  function handleSkipFocus() {
    completeNiyyah([]);
    onClose?.();
  }

  const showStepDots = initialStep === 'dua';

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
              : 'Which pillars will you direct your energy toward today?'}
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
                  <p className="niyyah-bismillah-ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
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
              <p className="niyyah-focus-heading">Select pillar(s)</p>
              <div className="niyyah-pillars">
                {MAQASID_PILLARS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`niyyah-pillar-btn${selected.includes(p.id) ? ' niyyah-pillar-btn--selected' : ''}`}
                    onClick={() => togglePillar(p.id)}
                  >
                    <span className="niyyah-pillar-dot" style={{ background: p.accentColor }} />
                    <span>
                      <span className="niyyah-pillar-label">{p.sidebarLabel}</span>
                      <span className="niyyah-pillar-root">{p.arabicRootAr}</span>
                    </span>
                  </button>
                ))}
              </div>
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
                disabled={selected.length === 0}
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
