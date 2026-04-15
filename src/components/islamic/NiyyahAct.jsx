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

const getDua = () => (new Date().getHours() < 12 ? MORNING_DUA : EVENING_DUA);

const UNIVERSAL_PROMPT = {
  meaning: 'Take a moment to set your intention for today. What matters most? Where will you direct your energy with purpose and clarity?',
};

export default function NiyyahAct() {
  const completeNiyyah = useThresholdStore((s) => s.completeNiyyah);
  const skipNiyyah = useThresholdStore((s) => s.skipNiyyah);
  const valuesLayer = useSettingsStore((s) => s.valuesLayer);
  const isIslamic = valuesLayer === 'islamic';
  const dua = getDua();
  const { citations, citationMap, citationsVisible } = useCitations(
    isIslamic ? [dua.source] : []
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
              <DuaSection dua={dua} color="var(--accent)" citationIndex={citationMap[dua.source]} showCitations={citationsVisible} />
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
