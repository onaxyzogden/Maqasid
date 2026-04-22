import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Play, X, ChevronDown, ChevronUp } from "lucide-react";
import { postureMap } from "@components/islamic/postures";
import { PRAYER_SEQUENCES } from "@data/prayer-sequences";
import { PRAYER_PILLARS, PRAYER_LEVEL_COLORS } from "@data/prayer-pillars";
import { useArabic } from "../../hooks/useArabic";
import "./PrayerHeroDuring.css";

const MODE_KEY = "bbiz_prayer_during_mode";
const MODES = { REFERENCE: "reference", PRAYALONG: "prayalong" };

function readMode() {
  try {
    const v = localStorage.getItem(MODE_KEY);
    return v === MODES.PRAYALONG ? MODES.PRAYALONG : MODES.REFERENCE;
  } catch {
    return MODES.REFERENCE;
  }
}

export default function PrayerHeroDuring({ pillarKey }) {
  const [mode, setModeState] = useState(readMode);

  const setMode = useCallback((next) => {
    setModeState(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      /* noop */
    }
  }, []);

  const sequence = PRAYER_SEQUENCES[pillarKey];
  if (!sequence) {
    return <ComingSoonShell pillarKey={pillarKey} />;
  }

  return (
    <div className="phd-root" data-pillar={pillarKey}>
      {mode === MODES.REFERENCE ? (
        <ReferenceView
          sequence={sequence}
          pillarKey={pillarKey}
          onPrayAlong={() => setMode(MODES.PRAYALONG)}
        />
      ) : (
        <PrayAlongView
          sequence={sequence}
          onToReference={() => setMode(MODES.REFERENCE)}
        />
      )}
    </div>
  );
}

// ─── Coming Soon shell for non-Isha prayers ──────────────────────────────
function ComingSoonShell({ pillarKey }) {
  const pillar = PRAYER_PILLARS.find((p) => p.id === pillarKey);
  const color = PRAYER_LEVEL_COLORS.during;
  const Icon = pillar?.Icon;
  return (
    <div className="phd-root phd-coming-soon">
      <div className="phd-coming-soon__card" style={{ borderColor: color }}>
        {Icon && <Icon size={40} color={color} strokeWidth={1.5} />}
        <div className="phd-coming-soon__title">
          {pillar?.label || "This prayer"}: During
        </div>
        <div className="phd-coming-soon__body">
          A guided illustration for praying {pillar?.label || "this prayer"} is
          coming soon. Isha is available today — try it to preview the pattern.
        </div>
      </div>
    </div>
  );
}

// ─── Reference mode — vertical scroll, all recitations expanded ──────────
function ReferenceView({ sequence, pillarKey, onPrayAlong }) {
  const { steps, label, labelAr, fardRakahSummary } = sequence;
  const grouped = useMemo(() => {
    const map = new Map();
    for (const s of steps) {
      const k = s.rakah ?? 0;
      if (!map.has(k)) map.set(k, []);
      map.get(k).push(s);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }, [steps]);

  return (
    <div className="phd-ref">
      <div className="phd-ref__intro">
        <div className="phd-ref__eyebrow">{label} · {labelAr}</div>
        <h2 className="phd-ref__title">
          How to pray {label} Fard ({fardRakahSummary})
        </h2>
        <p className="phd-ref__subtitle">
          Study each posture and its recitations below, then switch to
          Pray-Along for a step-by-step companion you can swipe through.
        </p>
      </div>

      {grouped.map(([rakah, items]) => (
        <section key={rakah} className="phd-ref__rakah">
          <h3 className="phd-ref__rakah-header">Rakʿah {rakah}</h3>
          {items.map((step) => (
            <ReferenceRow key={step.id} step={step} />
          ))}
        </section>
      ))}

      {pillarKey === "isha" && (
        <section className="phd-ref__appendix">
          <h3 className="phd-ref__rakah-header">After Isha fard</h3>
          <p className="phd-ref__appendix-body">
            The Sunnah (2 rakʿāt) and Witr (3 rakʿāt) are continued afterward.
            Guided content for these is coming soon.
          </p>
        </section>
      )}

      <button
        type="button"
        className="phd-ref__cta"
        onClick={onPrayAlong}
        aria-label="Begin Pray-Along mode"
      >
        <Play size={16} strokeWidth={2} />
        Begin Pray-Along
      </button>
    </div>
  );
}

function ReferenceRow({ step }) {
  const Figure = postureMap[step.posture];
  const fmt = useArabic();
  return (
    <article className="phd-ref__row">
      <div className="phd-ref__figure" aria-hidden="true">
        {Figure && <Figure size={72} color="var(--phd-ink)" />}
      </div>
      <div className="phd-ref__body">
        <div className="phd-ref__row-title">
          <span className="phd-ref__ar">{fmt(step.label.ar)}</span>
          <span className="phd-ref__en">{step.label.en}</span>
        </div>
        {step.note && <p className="phd-ref__note">{step.note}</p>}
        <ul className="phd-ref__recs">
          {step.recitations.map((rec) => (
            <li key={rec.key} className="phd-ref__rec">
              <div className="phd-ref__rec-ar">{fmt(rec.ar)}</div>
              <div className="phd-ref__rec-translit">{rec.translit}</div>
              {rec.meaning && (
                <div className="phd-ref__rec-meaning">“{rec.meaning}”</div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

// ─── Pray-Along mode — full-bleed swipeable cards ────────────────────────
function PrayAlongView({ sequence, onToReference }) {
  const { steps, postures: POSTURES_PER_RAKAH, rakahCount } = sequence;
  const [index, setIndex] = useState(0);
  const [chromeVisible, setChromeVisible] = useState(true);
  const [exitSheetOpen, setExitSheetOpen] = useState(false);
  const chromeTimerRef = useRef(null);
  const touchStartRef = useRef(null);

  const step = steps[index];
  const totalSteps = steps.length;
  const atFirst = index === 0;
  const atLast = index === totalSteps - 1;

  const bumpChrome = useCallback(() => {
    setChromeVisible(true);
    clearTimeout(chromeTimerRef.current);
    chromeTimerRef.current = setTimeout(() => setChromeVisible(false), 2000);
  }, []);

  // Auto-fade chrome on mount — only schedule the timer; chromeVisible is
  // already true from initial state, so no setState needed in the effect body.
  useEffect(() => {
    const t = setTimeout(() => setChromeVisible(false), 2000);
    chromeTimerRef.current = t;
    return () => clearTimeout(t);
  }, []);

  const next = useCallback(() => {
    if (!atLast) setIndex((i) => i + 1);
  }, [atLast]);
  const prev = useCallback(() => {
    if (!atFirst) setIndex((i) => i - 1);
  }, [atFirst]);

  // Keyboard navigation (desktop).
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setExitSheetOpen(true);
      bumpChrome();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, bumpChrome]);

  // Touch swipe handlers.
  const onTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, t: Date.now() };
  };
  const onTouchEnd = (e) => {
    const start = touchStartRef.current;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dt = Date.now() - start.t;
    if (Math.abs(dx) > 40 && dt < 500) {
      if (dx < 0) next();
      else prev();
    }
    touchStartRef.current = null;
  };

  // Long-press on the card opens the exit sheet.
  const longPressTimerRef = useRef(null);
  const onPressStart = () => {
    clearTimeout(longPressTimerRef.current);
    longPressTimerRef.current = setTimeout(
      () => setExitSheetOpen(true),
      600,
    );
  };
  const onPressEnd = () => clearTimeout(longPressTimerRef.current);

  // Compute rakah dot states — one dot per rakah, each filled/half/empty.
  const rakahDots = useMemo(() => {
    const counts = {};
    for (let i = 0; i <= index; i++) {
      const r = steps[i].rakah;
      if (r) counts[r] = (counts[r] || 0) + 1;
    }
    const rakahs = Array.from({ length: rakahCount }, (_, i) => i + 1);
    return rakahs.map((r) => {
      const done = counts[r] || 0;
      const total = POSTURES_PER_RAKAH[r] || 0;
      if (done === 0) return "empty";
      if (done >= total) return "full";
      return "half";
    });
  }, [index, steps, rakahCount, POSTURES_PER_RAKAH]);

  const Figure = postureMap[step.posture];
  const primaryRec = step.recitations[0];
  const fmt = useArabic();

  return (
    <div
      className="phd-pa"
      onClick={bumpChrome}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onPressStart}
      onMouseUp={onPressEnd}
      onMouseLeave={onPressEnd}
      onTouchCancel={onPressEnd}
    >
      {/* Top-left: rakah dots */}
      <div
        className={`phd-pa__dots ${chromeVisible ? "" : "phd-pa__dots--faded"}`}
        aria-label={`Rakʿah progress: step ${index + 1} of ${totalSteps}`}
      >
        {rakahDots.map((state, i) => (
          <span
            key={i}
            className={`phd-pa__dot phd-pa__dot--${state}`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Top-right: mode + exit */}
      <div
        className={`phd-pa__corner ${chromeVisible ? "" : "phd-pa__corner--faded"}`}
      >
        <button
          type="button"
          className="phd-pa__icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToReference();
          }}
          aria-label="Switch to Reference mode"
          title="Reference mode"
        >
          <BookOpen size={18} strokeWidth={1.8} />
        </button>
        <button
          type="button"
          className="phd-pa__icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            setExitSheetOpen(true);
          }}
          aria-label="Exit prayer companion"
        >
          <X size={18} strokeWidth={1.8} />
        </button>
      </div>

      {/* Card center */}
      <div className="phd-pa__card">
        <div className="phd-pa__figure-wrap" aria-hidden="true">
          <div className="phd-pa__figure-halo" />
          <div className="phd-pa__figure">
            {Figure && <Figure size={180} color="var(--phd-ink)" />}
          </div>
        </div>
        <div className="phd-pa__label">
          <div className="phd-pa__label-ar">{fmt(step.label.ar)}</div>
          <div className="phd-pa__label-en">{step.label.en}</div>
        </div>
        <RecitationPanel
          key={step.id}
          primaryRec={primaryRec}
          extraCount={step.recitations.length - 1}
          note={step.note}
        />
      </div>

      {/* Footer: swipe affordance */}
      <div
        className={`phd-pa__swipe ${chromeVisible ? "" : "phd-pa__swipe--faded"}`}
      >
        {atFirst ? "" : "← prev"} <span className="phd-pa__swipe-sep">·</span>{" "}
        {atLast ? "tap × to close" : "next →"}
      </div>

      {/* Edge tap zones for non-touch users */}
      <button
        type="button"
        className="phd-pa__edge phd-pa__edge--left"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label="Previous step"
        disabled={atFirst}
      />
      <button
        type="button"
        className="phd-pa__edge phd-pa__edge--right"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label="Next step"
        disabled={atLast}
      />

      {/* Exit sheet */}
      {exitSheetOpen && (
        <div
          className="phd-pa__sheet-overlay"
          onClick={() => setExitSheetOpen(false)}
        >
          <div
            className="phd-pa__sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="phd-pa__sheet-title">Pause Pray-Along?</div>
            <div className="phd-pa__sheet-body">
              Return to Reference mode or keep going where you are.
            </div>
            <div className="phd-pa__sheet-actions">
              <button
                type="button"
                className="phd-pa__sheet-btn phd-pa__sheet-btn--ghost"
                onClick={() => setExitSheetOpen(false)}
              >
                Keep praying
              </button>
              <button
                type="button"
                className="phd-pa__sheet-btn"
                onClick={() => {
                  setExitSheetOpen(false);
                  onToReference();
                }}
              >
                Back to Reference
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Recitation block for Pray-Along mode. Parent passes `key={step.id}` so the
// show-meaning state resets automatically on step change — no effect needed.
function RecitationPanel({ primaryRec, extraCount, note }) {
  const [showMeaning, setShowMeaning] = useState(false);
  const fmt = useArabic();
  return (
    <div className="phd-pa__rec">
      <div className="phd-pa__rec-ar">{fmt(primaryRec.ar)}</div>
      {showMeaning ? (
        <div className="phd-pa__rec-expanded">
          <div className="phd-pa__rec-translit">{primaryRec.translit}</div>
          {primaryRec.meaning && (
            <div className="phd-pa__rec-meaning">“{primaryRec.meaning}”</div>
          )}
          <button
            type="button"
            className="phd-pa__disclose"
            onClick={(e) => {
              e.stopPropagation();
              setShowMeaning(false);
            }}
          >
            <ChevronUp size={14} /> hide meaning
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="phd-pa__disclose"
          onClick={(e) => {
            e.stopPropagation();
            setShowMeaning(true);
          }}
        >
          <ChevronDown size={14} /> show meaning
        </button>
      )}
      {extraCount > 0 && (
        <div className="phd-pa__rec-more">
          + {extraCount} more in Reference mode
        </div>
      )}
      {note && <div className="phd-pa__rec-note">{note}</div>}
    </div>
  );
}
