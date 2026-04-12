import './ReferenceList.css';

/**
 * Numbered reference list for Islamic citations.
 *
 * Props:
 *   citations — array of source strings (e.g. ['Surah Ta-Ha 20:25-26', ...])
 *   visible   — boolean controlling render (tied to citationsVisible global)
 */
export default function ReferenceList({ citations, visible }) {
  if (!visible || !citations?.length) return null;

  return (
    <div className="il-references">
      <div className="il-references-header">References</div>
      <ol className="il-references-list">
        {citations.map((src, i) => (
          <li key={src} className="il-references-item">
            <span className="il-ref-number">{i + 1}</span>
            <span className="il-ref-source">{src}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
