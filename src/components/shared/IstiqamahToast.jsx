import { useToastStore } from '@store/toastStore';
import './IstiqamahToast.css';

export default function IstiqamahToast() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  if (!toasts.length) return null;

  return (
    <div className="istiqamah-toast-stack" aria-live="polite">
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          className="istiqamah-toast"
          style={t.levelColor ? { borderColor: t.levelColor } : undefined}
          onClick={() => dismiss(t.id)}
        >
          <div className="istiqamah-toast__glyph" style={t.levelColor ? { color: t.levelColor } : undefined}>
            ﷽
          </div>
          <div className="istiqamah-toast__body">
            <div className="istiqamah-toast__title">{t.message}</div>
            {t.pillar && (
              <div
                className="istiqamah-toast__meta"
                style={t.levelColor ? { color: t.levelColor } : undefined}
              >
                Istiqāmah · {t.pillar}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
