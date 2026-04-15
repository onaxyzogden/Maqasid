import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './ChartTooltip.css';

const MIN_ABOVE = 180;
const EDGE_PAD = 8;
const IS_TOUCH = typeof window !== 'undefined' && ('ontouchstart' in window);

/**
 * ChartTooltip — shared tooltip rendered via portal to document.body.
 *
 * Props:
 *   visible      boolean       Show/hide the tooltip
 *   x            number        Horizontal position (viewport px, from getBoundingClientRect)
 *   y            number        Vertical position (viewport px)
 *   anchor       'above'|'crosshair'   Positioning mode
 *   children     ReactNode     Tooltip content (each chart provides its own)
 *   crosshairTop    number (optional)  Top edge of crosshair line (for anchor="crosshair")
 *   crosshairHeight number (optional)  Height of crosshair line
 *   onDismiss    function (optional)   Called on outside tap for mobile dismiss
 */
export default function ChartTooltip({
  visible,
  x,
  y,
  anchor = 'above',
  children,
  crosshairTop,
  crosshairHeight,
  onDismiss,
}) {
  // Outside-tap dismiss for touch devices
  useEffect(() => {
    if (!visible || !IS_TOUCH || !onDismiss) return;
    const handler = () => onDismiss();
    // Delay attaching so the current tap doesn't immediately dismiss
    const id = setTimeout(() => document.addEventListener('pointerdown', handler, { once: true }), 10);
    return () => {
      clearTimeout(id);
      document.removeEventListener('pointerdown', handler);
    };
  }, [visible, onDismiss]);

  if (!visible) return null;

  // Determine if we need to flip below (for "above" mode)
  const flipped = anchor === 'above' && y < MIN_ABOVE;

  // Calculate tooltip position
  let style = {};
  if (anchor === 'above') {
    style = {
      left: Math.max(EDGE_PAD, Math.min(x, window.innerWidth - EDGE_PAD)),
      transform: 'translateX(-50%)',
      ...(flipped
        ? { top: y + 10 }
        : { bottom: window.innerHeight - y + 10 }),
    };
  } else {
    // Crosshair mode — float to the right of x with 12px offset
    const nearRightEdge = x > window.innerWidth - 200;
    const crossLeft = nearRightEdge
      ? undefined
      : Math.max(EDGE_PAD, x + 12);
    const crossRight = nearRightEdge
      ? Math.max(EDGE_PAD, window.innerWidth - x + 12)
      : undefined;
    style = {
      top: Math.max(EDGE_PAD, y - 30),
      ...(crossLeft != null ? { left: crossLeft } : { right: crossRight }),
    };
  }

  const className = [
    'chart-tooltip',
    visible && 'chart-tooltip--visible',
    flipped && 'chart-tooltip--below',
  ].filter(Boolean).join(' ');

  return createPortal(
    <>
      <div className={className} style={style}>
        {children}
        {anchor === 'above' && <div className="chart-tooltip__arrow" />}
      </div>
      {anchor === 'crosshair' && crosshairTop != null && crosshairHeight != null && (
        <div
          className={`chart-tooltip__crosshair${visible ? ' chart-tooltip__crosshair--visible' : ''}`}
          style={{
            left: x,
            top: crosshairTop,
            height: crosshairHeight,
          }}
        />
      )}
    </>,
    document.body,
  );
}
