import { useEffect, useState } from 'react';
import MaqasidComparisonWheel from '@components/faith/MaqasidComparisonWheel';
import { OGDEN_SUB_PILLARS, OGDEN_ACCENT } from '@data/ogden-ecosystem';
import { PILLAR_WISDOM } from '@data/pillar-wisdom';
import { PILLAR_NEXT_ACTIONS } from '@data/pillar-next-actions';
import './EcosystemPresentationFrame.css';

/**
 * Fullscreen presentation wrapper for the OGDEN ecosystem wheel.
 *
 * Designed for OBS capture during the 2:45 "Khalif as-Salam Ecosystem Intro"
 * recording. Hides AppShell chrome, listens on window for keyboard beats,
 * and drives the wheel via forceHover / forceConverged props.
 *
 * Keyboard map:
 *   0 / Esc  Reset (calm)
 *   1        Highlight BBOS
 *   2        Highlight OLOS (Atlas)
 *   3        Highlight MILOS
 *   4        Convergence (all three lit + center brightens)
 *   z        Zoom in (~1.6x)
 *   Z        Zoom out
 *   Right /  Auto-advance through 0 -> 1 -> 2 -> 3 -> 4 -> 0
 *   Space
 *   i        Toggle on-screen beat indicator
 */

const SEGMENT_PRESET = {
  bbos:  65,
  milos: 70,
  atlas: 60,
};

const SEGMENT_COLOR = {
  bbos:  '#c9a05a', // GOLD
  atlas: '#5fa873', // GREEN (OLOS)
  milos: '#f3efe4', // WHITE
};

const SEGMENT_DESCRIPTION = {
  bbos: {
    label: 'BBOS',
    text: 'Business Operating System — run work as an act of worship.',
  },
  atlas: {
    label: 'OLOS',
    text: 'Land intelligence — know the land before asking anything of it.',
  },
  milos: {
    label: 'MILOS',
    text: 'Life Operating System — your whole life as one coherent trust.',
  },
};

const BEAT_SEQUENCE = [0, 1, 2, 3, 4];

const KEY_TO_ID = { 1: 'bbos', 2: 'atlas', 3: 'milos' };

export default function EcosystemPresentationFrame() {
  const [beat, setBeat] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [showHud, setShowHud] = useState(false);

  // Hide AppShell chrome via body class (works even if router placement changes).
  useEffect(() => {
    document.body.classList.add('is-presenting');
    return () => document.body.classList.remove('is-presenting');
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === '0') { setBeat(0); return; }
      if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
        setBeat(Number(e.key));
        return;
      }
      if (e.key === 'z') { setZoomed(true); return; }
      if (e.key === 'Z') { setZoomed(false); return; }
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setBeat((b) => {
          const idx = BEAT_SEQUENCE.indexOf(b);
          return BEAT_SEQUENCE[(idx + 1) % BEAT_SEQUENCE.length];
        });
        return;
      }
      if (e.key === 'i') { setShowHud((v) => !v); return; }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const segments = OGDEN_SUB_PILLARS.map((p) => ({
    id: p.id,
    label: p.label,
    Icon: p.Icon,
    route: null, // navigation disabled in presentation mode
    current: SEGMENT_PRESET[p.id] ?? 60,
    color: SEGMENT_COLOR[p.id],
    tooltipLabel: SEGMENT_DESCRIPTION[p.id]?.label,
    tooltipText:  SEGMENT_DESCRIPTION[p.id]?.text,
    tooltipWidth: 200,
    tooltipHeight: 80,
  }));

  const forceHover = beat >= 1 && beat <= 3 ? KEY_TO_ID[beat] : null;
  const forceConverged = beat === 4;

  const beatLabels = ['Calm', 'BBOS', 'OLOS (Atlas)', 'MILOS', 'Convergence'];

  return (
    <div className="ogp-frame">
      <div className={`ogp-stage${zoomed ? ' ogp-stage--zoomed' : ''}`}>
        <MaqasidComparisonWheel
          centerLabel="OGDEN"
          centerLabelOverride="MOONTRANCE"
          levelColor={OGDEN_ACCENT}
          levelPattern="stripes"
          level="growth"
          segments={segments}
          pillarWisdom={PILLAR_WISDOM.ogden}
          nextActions={PILLAR_NEXT_ACTIONS.ogden}
          forceHover={forceHover}
          forceConverged={forceConverged}
        />
      </div>

      {showHud && (
        <div className="ogp-hud" aria-hidden="true">
          <span className="ogp-hud__beat">Beat {beat} / 4</span>
          <span className="ogp-hud__label">{beatLabels[beat]}</span>
          {zoomed && <span className="ogp-hud__zoom">zoom</span>}
        </div>
      )}
    </div>
  );
}
