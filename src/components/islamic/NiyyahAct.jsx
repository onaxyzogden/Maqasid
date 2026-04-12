import { Sun } from 'lucide-react';
import { useThresholdStore } from '../../store/threshold-store';
import { useSettingsStore } from '../../store/settings-store';
import { useCitations } from '../../hooks/useCitations';
import DuaSection from './DuaSection';
import ReferenceList from './ReferenceList';
import IslamicTerm from '../shared/IslamicTerm';
import './NiyyahAct.css';

const MORNING_DUA = {
  title: 'Morning Supplication',
  arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
  trans: 'Allāhumma bika aṣbaḥnā wa bika amsaynā wa bika naḥyā wa bika namūtu wa ilayka n-nushūr',
  meaning: 'O Allah, by You we enter the morning and by You we enter the evening; by You we live and by You we die, and to You is the resurrection.',
  source: 'Sunan at-Tirmidhi 3391',
};

const UNIVERSAL_PROMPT = {
  meaning: 'Take a moment to set your intention for today. What matters most? Where will you direct your energy with purpose and clarity?',
};

export default function NiyyahAct() {
  const completeNiyyah = useThresholdStore((s) => s.completeNiyyah);
  const skipNiyyah = useThresholdStore((s) => s.skipNiyyah);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const { citations, citationMap, citationsVisible } = useCitations(
    isIslamic ? [MORNING_DUA.source] : []
  );

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
            {isIslamic ? <>Daily <IslamicTerm id="niyyah">Niyyah</IslamicTerm></> : 'Daily Intention'}
          </h2>
          <p className="niyyah-subtitle">
            {isIslamic
              ? 'Orient yourself under divine mercy before entering your work'
              : 'Set your focus before entering your workspace'}
          </p>
        </div>

        {/* Body */}
        <div className="niyyah-body">
          {isIslamic ? (
            <>
              <div className="niyyah-bismillah">
                <p className="niyyah-bismillah-ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
                <p className="niyyah-bismillah-en">In the name of Allah, the Most Gracious, the Most Merciful</p>
              </div>
              <DuaSection dua={MORNING_DUA} color="var(--accent)" citationIndex={citationMap[MORNING_DUA.source]} showCitations={citationsVisible} />
            </>
          ) : (
            <div className="niyyah-mindfulness">
              <p className="niyyah-mindfulness-text">{UNIVERSAL_PROMPT.meaning}</p>
            </div>
          )}
        </div>

        <ReferenceList citations={citations} visible={citationsVisible && isIslamic} />

        {/* Footer */}
        <div className="niyyah-footer">
          <button className="niyyah-skip" onClick={() => skipNiyyah()}>
            Skip
          </button>
          <button className="niyyah-confirm" onClick={() => completeNiyyah(['confirmed'])}>
            <Sun size={16} />
            {isIslamic ? <><IslamicTerm id="bismillah">Bismillah</IslamicTerm> — Begin</> : 'Begin'}
          </button>
        </div>
      </div>
    </div>
  );
}
