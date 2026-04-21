import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import QuranEmbed from '../islamic/QuranEmbed';
import HadithCard from '../islamic/HadithCard';
import AmanahTierBadge from '../shared/AmanahTierBadge';

const HADITH_COLLECTION_SLUGS = {
  'sahih bukhari': 'bukhari',
  'sahih al-bukhari': 'bukhari',
  'sahih muslim': 'muslim',
  'sunan abi dawud': 'abudawud',
  'sunan abu dawud': 'abudawud',
  'sunan ibn majah': 'ibnmajah',
  'sunan an-nasai': 'nasai',
  "sunan an-nasa'i": 'nasai',
  "sunan al-nasa'i": 'nasai',
  'sunan al-nasai': 'nasai',
  'jami at-tirmidhi': 'tirmidhi',
  'sunan al-tirmidhi': 'tirmidhi',
  'muwatta malik': 'malik',
};

function matchHadithHeading(text) {
  const m = text.match(/^([A-Za-z][A-Za-z' -]+?)\s+(\d+)$/);
  if (!m) return null;
  const slug = HADITH_COLLECTION_SLUGS[m[1].trim().toLowerCase()];
  return slug ? `${slug}:${m[2]}` : null;
}

const MARKDOWN_COMPONENTS = {
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
  p: ({ children }) => {
    const flat = [children].flat();
    const firstStr = flat.find(c => typeof c === 'string' && c.trim());
    const isArabic = firstStr && /[\u0600-\u06FF]/.test(firstStr.trim()[0]);
    return <p dir={isArabic ? 'rtl' : undefined} style={isArabic ? { fontFamily: 'var(--font-arabic)', fontSize: '1.5em', lineHeight: '2.2', textAlign: 'center', margin: '12px 0' } : undefined}>{children}</p>;
  },
  h3: ({ children }) => {
    const text = [children].flat().map(c => typeof c === 'string' ? c : '').join('');
    const quran = text.match(/^Quran \((\d+):(\d+)(?:-(\d+))?\)$/);
    if (quran) {
      const verseKey = quran[3]
        ? `${quran[1]}:${quran[2]}-${quran[3]}`
        : `${quran[1]}:${quran[2]}`;
      return <QuranEmbed verseKey={verseKey} />;
    }
    const hadith = matchHadithHeading(text);
    if (hadith) return <HadithCard hadithKey={hadith} />;
    return <h3>{children}</h3>;
  },
};

function cleanSources(raw) {
  return ((raw || '') + '\n\n### __END__ 0')
    .replace(/\*\*Arabic:\*\* [^\n]*\n\*\*Translation:\*\* [^\n]*/g, '')
    .replace(/(^### (?:Sahih (?:al-)?Bukhari|Sahih Muslim|Sunan (?:Abi|Abu) Dawud|Sunan Ibn Majah|Sunan a[ln]-Nasa'?i|Jami at-Tirmidhi|Sunan al-Tirmidhi|Muwatta Malik) \d+\s*$)([\s\S]*?)(?=^### )/gm, '$1\n\n')
    .replace(/\n*### __END__ 0\s*$/, '');
}

export default function SubtaskSources({ subtask }) {
  if (!subtask) return null;
  const hasSources = Boolean(subtask.sources);
  return (
    <div className="tdp-subtask-detail__body">
      {subtask.tier && subtask.amanahRationale && (
        <div className="tdp-amanah-rationale">
          <AmanahTierBadge tier={subtask.tier} size="md" />
          <p className="tdp-amanah-rationale__text">{subtask.amanahRationale}</p>
        </div>
      )}
      {hasSources ? (
        <>
          <div className={`tdp-sources-trust tdp-sources-trust--${subtask.sourcesTrust === 'scholar-reviewed' ? 'reviewed' : 'suggestive'}`}>
            {subtask.sourcesTrust === 'scholar-reviewed' ? (
              <>
                <strong>Scholar-reviewed.</strong> These citations have been attested by a qualified reviewer.
              </>
            ) : (
              <>
                <strong>Suggestive reference — pending scholar review.</strong>{' '}
                Citations are curated via semantic matching against the Quran and Sahih Bukhari/Muslim. They are provided as starting points for reflection and study, not as a fatwa. Verify with a qualified scholar before acting on contested matters.
              </>
            )}
          </div>
          <div className="tdp-subtask-detail__content">
            <Markdown remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
              {cleanSources(subtask.sources)}
            </Markdown>
          </div>
        </>
      ) : (
        <p className="tdp-subtask-detail__text tdp-subtask-detail__empty-text">
          No sources available for this subtask yet.
        </p>
      )}
    </div>
  );
}
