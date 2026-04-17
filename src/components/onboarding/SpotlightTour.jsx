import { useState, useEffect, useCallback } from 'react';

/**
 * SpotlightTour — 3-step cutout overlay tour
 *
 * Props:
 *   steps     — array of { target: string, title: string, description: string }
 *               target is the value of data-tour="..." on the DOM element
 *   onComplete — called when the user finishes or skips the tour
 */
export default function SpotlightTour({ steps = [], onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [rect, setRect] = useState(null);

  const step = steps[currentStep];
  const total = steps.length;

  const measureTarget = useCallback(() => {
    if (!step) return;
    requestAnimationFrame(() => {
      const el = document.querySelector('[data-tour="' + step.target + '"]');
      if (!el) {
        // Skip step if element not found
        if (currentStep < total - 1) {
          setCurrentStep((s) => s + 1);
        } else {
          onComplete?.();
        }
        return;
      }
      setRect(el.getBoundingClientRect());
    });
  }, [step, currentStep, total, onComplete]);

  useEffect(() => {
    measureTarget();
    window.addEventListener('resize', measureTarget);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onComplete?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', measureTarget);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [measureTarget, onComplete]);

  if (!step || !rect) return null;

  const handleNext = () => {
    if (currentStep < total - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      onComplete?.();
    }
  };

  const handleSkip = () => {
    onComplete?.();
  };

  // Popover positioning
  const popoverWidth = 280;
  const gap = 12;
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;

  // Horizontal: center on the cutout rect, clamped to viewport
  let popoverLeft = rect.left + rect.width / 2 - popoverWidth / 2;
  popoverLeft = Math.max(12, Math.min(popoverLeft, viewportWidth - popoverWidth - 12));

  // Estimated popover height for overflow detection — estimated, actual height varies with description length
  const popoverEstimatedHeight = 220;
  const spaceBelow = viewportHeight - (rect.bottom + gap);
  const placeAbove = spaceBelow < popoverEstimatedHeight && rect.top > popoverEstimatedHeight + gap;

  const popoverTop = placeAbove
    ? rect.top - gap - popoverEstimatedHeight
    : rect.bottom + gap;

  const isLast = currentStep === total - 1;

  return (
    <>
      {/* Transparent cutout div — its box-shadow fills everything outside it */}
      <div
        style={{
          position: 'fixed',
          top: rect.top - 4,
          left: rect.left - 4,
          width: rect.width + 8,
          height: rect.height + 8,
          zIndex: 9000,
          pointerEvents: 'none',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 0 0 9999px rgba(0,0,0,0.55)',
          outline: '2px solid var(--primary)',
          outlineOffset: '4px',
        }}
      />

      {/* Popover card */}
      <div
        role="region"
        aria-label="Guided tour"
        style={{
          position: 'fixed',
          top: popoverTop,
          left: popoverLeft,
          width: popoverWidth,
          zIndex: 9001,
          pointerEvents: 'all',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Step counter */}
        <div style={{ fontSize: '0.75rem', color: 'var(--text3)' }}>
          Step {currentStep + 1} of {total}
        </div>

        {/* Title */}
        <div style={{ fontWeight: 600, fontSize: '1rem', marginTop: 'var(--space-1)' }}>
          {step.title}
        </div>

        {/* Description */}
        <div
          style={{
            color: 'var(--text2)',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            marginTop: 'var(--space-2)',
          }}
        >
          {step.description}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 'var(--space-4)',
          }}
        >
          <button
            className="btn-ghost"
            onClick={handleSkip}
            style={{ fontSize: '0.8125rem', color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer', padding: '0' }}
          >
            Skip
          </button>
          <button className="btn-primary" onClick={handleNext}>
            {isLast ? 'Finish \u2713' : 'Next \u2192'}
          </button>
        </div>
      </div>
    </>
  );
}
