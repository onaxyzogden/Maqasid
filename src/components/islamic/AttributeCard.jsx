import './AttributeCard.css';

// Three zones, in order of how the reader needs them: who the Name is (gloss),
// what it asks of this module (application), and what attests it (source).
// The universal-values layer passes principles that have only `{ name, body }`,
// so every zone past the header is conditional.
export default function AttributeCard({ attr, color }) {
  if (!attr) return null;

  const accent = color || 'var(--accent)';

  return (
    <div className="attr-card" style={{ borderLeftColor: accent + '66' }}>
      <div className="attr-card-header">
        <span className="attr-card-name" style={{ color: accent + 'dd' }}>
          {attr.name}
        </span>
        {attr.name_ar && (
          <span className="attr-card-name-ar arabic">{attr.name_ar}</span>
        )}
        <span className="attr-card-title">{attr.title}</span>
      </div>

      {attr.gloss && <p className="attr-card-gloss">{attr.gloss}</p>}

      <p className="attr-card-body">{attr.application ?? attr.body}</p>

      {attr.source && (
        <p className="attr-card-source">
          <cite className="attr-card-source-ref" style={{ color: accent + 'cc' }}>
            {attr.source.ref}
          </cite>
          <span className="attr-card-source-quote">
            {'“' + attr.source.translation + '”'}
          </span>
        </p>
      )}
    </div>
  );
}
