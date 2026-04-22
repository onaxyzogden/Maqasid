import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import QuranEmbed from '../islamic/QuranEmbed';
import HadithCard from '../islamic/HadithCard';
import AmanahTierBadge from '../shared/AmanahTierBadge';
import RelevanceChip from '../shared/RelevanceChip';
import { hadithData } from '@data/hadith';
import { useArabic } from '../../hooks/useArabic';

void HadithCard; void hadithData;

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

const PROVENANCE_LABEL_TO_TIER = { Bayyinah: 'T1', Qarina: 'T2', Niyyah: 'T3' };

function parseQuranRef(ref) {
  const m = /^Quran\s*\(?(\d+):(\d+)(?:-(\d+))?\)?$/.exec((ref || '').trim());
  if (!m) return null;
  return m[3] ? `${m[1]}:${m[2]}-${m[3]}` : `${m[1]}:${m[2]}`;
}

function parseHadithRef(ref) {
  return matchHadithHeading((ref || '').trim());
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
    if (hadith) {
      if (hadithData[hadith]) return <HadithCard hadithKey={hadith} />;
      const sunnahUrl = `https://sunnah.com/${hadith}`;
      return (
        <div className="hc">
          <div className="hc__header">
            <span className="hc__ref">{text}</span>
          </div>
          <div className="hc__english">
            Text unavailable in offline cache.{' '}
            <a href={sunnahUrl} target="_blank" rel="noopener noreferrer">View on sunnah.com</a>
          </div>
        </div>
      );
    }
    return <h3>{children}</h3>;
  },
};

function cleanSources(raw) {
  return ((raw || '') + '\n\n### __END__ 0')
    .replace(/\*\*Arabic:\*\* [^\n]*\n\*\*Translation:\*\* [^\n]*/g, '')
    .replace(/(^### (?:Sahih (?:al-)?Bukhari|Sahih Muslim|Sunan (?:Abi|Abu) Dawud|Sunan Ibn Majah|Sunan a[ln]-Nasa'?i|Jami at-Tirmidhi|Sunan al-Tirmidhi|Muwatta Malik) \d+\s*$)([\s\S]*?)(?=^### )/gm, '$1\n\n')
    .replace(/\n*### __END__ 0\s*$/, '');
}

function GroundingSourceCard({ entry }) {
  const fmt = useArabic();
  const tier = PROVENANCE_LABEL_TO_TIER[entry.provenanceTier] || null;
  const quranKey = entry.kind === 'quran' ? parseQuranRef(entry.ref) : null;
  const hadithKey = entry.kind === 'hadith' ? parseHadithRef(entry.ref) : null;
  const sunnahUrl = hadithKey ? `https://sunnah.com/${hadithKey}` : null;

  return (
    <div className="tdp-grounding-source">
      <div className="tdp-grounding-source__badges">
        {tier && <AmanahTierBadge tier={tier} size="sm" />}
        <RelevanceChip value={entry.relevance} size="sm" />
        {entry.kind === 'hadith' && entry.hadithGrade && (
          <span
            className="tdp-grounding-source__grade"
            style={{
              display: 'inline-flex', alignItems: 'center', padding: '1px 6px',
              fontSize: '0.65rem', fontWeight: 600, fontFamily: 'var(--font-mono)',
              color: 'var(--text3)',
              background: 'color-mix(in oklab, var(--text3) 12%, transparent)',
              border: '1px solid color-mix(in oklab, var(--text3) 25%, transparent)',
              borderRadius: '4px',
              letterSpacing: '0.03em', lineHeight: 1.4,
            }}
          >
            {entry.hadithGrade}
          </span>
        )}
      </div>

      {quranKey && <QuranEmbed verseKey={quranKey} />}
      {entry.kind === 'hadith' && (
        <div className="tdp-grounding-source__fallback">
          <h4>{entry.ref}</h4>
          {entry.arabic && <p dir="rtl" style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.35em', lineHeight: 2, textAlign: 'center' }}>{fmt(entry.arabic)}</p>}
          {entry.translation && <p style={{ fontStyle: 'italic' }}>{entry.translation}</p>}
          {sunnahUrl && (
            <p style={{ fontSize: '0.8rem', marginTop: 6 }}>
              <a href={sunnahUrl} target="_blank" rel="noopener noreferrer">View on sunnah.com</a>
            </p>
          )}
        </div>
      )}
      {entry.kind !== 'hadith' && !quranKey && (
        <div className="tdp-grounding-source__fallback">
          <h4>{entry.ref}</h4>
          {entry.arabic && <p dir="rtl" style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.35em', lineHeight: 2, textAlign: 'center' }}>{fmt(entry.arabic)}</p>}
          {entry.translation && <p style={{ fontStyle: 'italic' }}>{entry.translation}</p>}
        </div>
      )}

      {entry.rationale && (
        <p className="tdp-grounding-source__rationale" style={{ fontSize: '0.85rem', color: 'var(--text2)', margin: '8px 0 0' }}>
          {entry.rationale}
        </p>
      )}
    </div>
  );
}

export default function SubtaskSources({ subtask }) {
  if (!subtask) return null;
  const isArray = Array.isArray(subtask.sources);
  const hasSources = isArray ? subtask.sources.length > 0 : Boolean(subtask.sources);

  return (
    <div className="tdp-subtask-detail__body">
      {subtask.tier && subtask.amanahRationale && (
        <div className="tdp-amanah-rationale">
          <AmanahTierBadge tier={subtask.tier} size="md" />
          <p className="tdp-amanah-rationale__text">{subtask.amanahRationale}</p>
        </div>
      )}

      {hasSources && isArray && (
        <div className="tdp-subtask-detail__content">
          {subtask.sources.map((entry, i) => (
            <GroundingSourceCard key={i} entry={entry} />
          ))}
        </div>
      )}

      {hasSources && !isArray && (
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
      )}

      {!hasSources && (
        <p className="tdp-subtask-detail__text tdp-subtask-detail__empty-text">
          No sources available for this subtask yet.
        </p>
      )}
    </div>
  );
}
