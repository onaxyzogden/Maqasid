import { quranWBW } from '@data/quran-wbw';
import { useArabic } from '../../hooks/useArabic';
import './QuranVerseCard.css';

function SingleVerseCard({ verseKey }) {
  const fmt = useArabic();
  const data = quranWBW[verseKey];
  if (!data) {
    return (
      <div className="qvc qvc--stub">
        <div className="qvc__header">
          <span className="qvc__ref">Quran [{verseKey}]</span>
        </div>
      </div>
    );
  }

  return (
    <div className="qvc">
      <div className="qvc__header">
        <span className="qvc__ref">Surah {data.surah} [{verseKey}]</span>
        <span className="qvc__ayah-num">({data.ayahNum})</span>
      </div>
      <div className="qvc__words">
        {data.words.map((word, i) => (
          <div key={i} className="qvc__word">
            <span className="qvc__word-ar">{fmt(word.ar)}</span>
            <span className="qvc__word-en">{word.en}</span>
          </div>
        ))}
      </div>
      <div className="qvc__translation">{data.translation}</div>
    </div>
  );
}

export default function QuranVerseCard({ verseKey }) {
  const rangeMatch = verseKey.match(/^(\d+):(\d+)-(\d+)$/);
  if (rangeMatch) {
    const surah = rangeMatch[1];
    const from = parseInt(rangeMatch[2], 10);
    const to = parseInt(rangeMatch[3], 10);
    if (to >= from) {
      const keys = [];
      for (let v = from; v <= to; v++) keys.push(`${surah}:${v}`);
      return (
        <>
          {keys.map(k => <SingleVerseCard key={k} verseKey={k} />)}
        </>
      );
    }
  }
  return <SingleVerseCard verseKey={verseKey} />;
}
