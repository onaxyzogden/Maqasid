import { quranWBW } from '@data/quran-wbw';
import './QuranVerseCard.css';

export default function QuranVerseCard({ verseKey }) {
  const data = quranWBW[verseKey];
  if (!data) return null;

  return (
    <div className="qvc">
      <div className="qvc__header">
        <span className="qvc__ref">Surah {data.surah} [{verseKey}]</span>
        <span className="qvc__ayah-num">({data.ayahNum})</span>
      </div>
      <div className="qvc__words">
        {data.words.map((word, i) => (
          <div key={i} className="qvc__word">
            <span className="qvc__word-ar">{word.ar}</span>
            <span className="qvc__word-en">{word.en}</span>
          </div>
        ))}
      </div>
      <div className="qvc__translation">{data.translation}</div>
    </div>
  );
}
