import { useParams } from 'react-router-dom';
import { MODULES } from '../data/modules';
import { ICON_REGISTRY } from '../data/icon-registry';
import PillarHeader from '../components/shared/PillarHeader';

const ICON_MAP = ICON_REGISTRY;

const modulesById = Object.fromEntries(MODULES.map((m) => [m.id, m]));

export default function ModulePlaceholder() {
  const { moduleId } = useParams();
  const mod = modulesById[moduleId];

  if (!mod) {
    return (
      <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--text)' }}>Objective not found</h2>
        <p style={{ color: 'var(--text2)', marginTop: 'var(--space-2)' }}>
          The requested objective does not exist.
        </p>
      </div>
    );
  }

  const Icon = ICON_MAP[mod.icon];

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId={moduleId} />

      <div
        style={{
          marginTop: 'var(--space-8)',
          padding: 'var(--space-10)',
          background: 'var(--surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        {Icon && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-lg)',
              background: `color-mix(in srgb, ${mod.color} 10%, transparent)`,
              marginBottom: 'var(--space-5)',
            }}
          >
            <Icon size={32} style={{ color: mod.color }} />
          </div>
        )}

        <h2 style={{ color: 'var(--text)', fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>
          {mod.name}
        </h2>

        <p style={{ color: 'var(--text2)', marginTop: 'var(--space-2)', fontSize: '0.95rem' }}>
          {mod.description}
        </p>

        <div
          style={{
            display: 'inline-block',
            marginTop: 'var(--space-6)',
            padding: 'var(--space-2) var(--space-4)',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-bg)',
            color: 'var(--accent)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}
        >
          Coming Soon
        </div>

        {mod.features && mod.features.length > 0 && (
          <div style={{ marginTop: 'var(--space-8)', textAlign: 'left', maxWidth: 400, margin: 'var(--space-8) auto 0' }}>
            <h4 style={{ color: 'var(--text2)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-3)' }}>
              Planned Features
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {mod.features.map((f, i) => (
                <li
                  key={i}
                  style={{
                    padding: 'var(--space-2) 0',
                    color: 'var(--text)',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    borderBottom: i < mod.features.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <span style={{ color: mod.color, fontSize: '0.7rem' }}>&#9679;</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
