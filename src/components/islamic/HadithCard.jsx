import { hadithData } from '@data/hadith';
import './HadithCard.css';

const SUNNAH_SLUG = {
  'Sahih al-Bukhari': 'bukhari',
  'Sahih Muslim': 'muslim',
  'Sunan Abi Dawud': 'abudawud',
  'Sunan Ibn Majah': 'ibnmajah',
  "Sunan an-Nasa'i": 'nasai',
  'Jami at-Tirmidhi': 'tirmidhi',
  'Muwatta Malik': 'malik',
};

export default function HadithCard({ hadithKey }) {
  const data = hadithData[hadithKey];
  if (!data) return null;

  const empty = !data.ar && !data.en;
  const slug = SUNNAH_SLUG[data.collection];
  const sunnahUrl = slug ? `https://sunnah.com/${slug}:${data.number}` : null;

  return (
    <div className="hc">
      <div className="hc__header">
        <span className="hc__ref">{data.collection} {data.number}</span>
        {data.grade && <span className="hc__grade">{data.grade}</span>}
      </div>
      {empty ? (
        <div className="hc__english">
          {sunnahUrl ? (
            <>Text unavailable in offline cache. <a href={sunnahUrl} target="_blank" rel="noopener noreferrer">View on sunnah.com</a></>
          ) : (
            <>Text unavailable.</>
          )}
        </div>
      ) : (
        <>
          {data.ar && <div className="hc__arabic" dir="rtl">{data.ar}</div>}
          {data.en && <div className="hc__english">{data.en}</div>}
        </>
      )}
    </div>
  );
}
