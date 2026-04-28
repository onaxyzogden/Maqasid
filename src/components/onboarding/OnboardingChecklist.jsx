import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronRight, CheckCircle } from 'lucide-react';
import { useOnboardingStore } from '../../store/onboarding-store';

const CHECKLIST_ITEMS = [
  { id: 'profile',       label: 'Set up your profile',           href: null }, // auto-completed in wizard; no route needed
  { id: 'first-task',    label: 'Complete your first task',       href: '/app/work' },
  { id: 'sources',       label: 'Explore the Sources',           href: '/app/sources' },
  { id: 'second-pillar', label: 'Add a second higher objective',           href: '/app/settings' },
  { id: 'weekly-review', label: 'Review your weekly alignment',  href: '/app' },
];

export default function OnboardingChecklist() {
  const navigate = useNavigate();
  const checklistItems = useOnboardingStore((s) => s.checklistItems);
  const completeChecklistItem = useOnboardingStore((s) => s.completeChecklistItem);
  const checklistDismissed = useOnboardingStore((s) => s.checklistDismissed);
  const dismissChecklist = useOnboardingStore((s) => s.dismissChecklist);

  const [collapsed, setCollapsed] = useState(false);
  const [headerHovered, setHeaderHovered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [justCompleted, setJustCompleted] = useState(null);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  const completedCount = checklistItems.filter((i) => i.completed).length;
  const total = CHECKLIST_ITEMS.length;
  const allDone = completedCount === total;
  const pct = (completedCount / total) * 100;

  // When all items complete, show celebration for 4 seconds then dismiss
  useEffect(() => {
    if (allDone && !showCelebration) {
      // reason: trigger celebration overlay once when all items complete
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowCelebration(true);
      const timer = setTimeout(() => {
        dismissChecklist();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [allDone, showCelebration, dismissChecklist]);

  // If already dismissed (persisted via store), hide widget permanently
  if (checklistDismissed) return null;

  function isCompleted(id) {
    return checklistItems.find((i) => i.id === id)?.completed ?? false;
  }

  function handleItemClick(item) {
    if (!item.href || isCompleted(item.id)) return;
    completeChecklistItem(item.id);
    setJustCompleted(item.id);
    setTimeout(() => setJustCompleted(null), 300);
    navigate(item.href);
  }

  // Celebration banner (show for 4 seconds after all done)
  if (allDone && showCelebration) {
    return (
      <div style={{
        background: '#F0FFF4',
        border: '1px solid var(--primary)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        textAlign: 'center',
        marginBottom: 'var(--space-4)',
        boxShadow: '0 0 0 3px color-mix(in srgb, var(--primary) 15%, transparent)',
      }}>
        <CheckCircle size={32} style={{ color: 'var(--primary)', marginBottom: 'var(--space-2)' }} />
        <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
          Masha&apos;Allah — you&apos;re on your way.
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>
          All getting-started steps complete.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      marginBottom: 'var(--space-4)',
    }}>
      {/* Header */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={!collapsed}
        style={{
          padding: 'var(--space-4) var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          background: headerHovered ? 'var(--bg3)' : 'transparent',
          transition: 'background 0.15s ease',
          userSelect: 'none',
        }}
        onMouseEnter={() => setHeaderHovered(true)}
        onMouseLeave={() => setHeaderHovered(false)}
        onClick={() => setCollapsed((c) => !c)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCollapsed((c) => !c); } }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span style={{ color: 'var(--primary)', fontSize: '1rem', lineHeight: 1 }}>✦</span>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)' }}>
            Getting Started
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 6 }}>
            {completedCount} of {total}
            {CHECKLIST_ITEMS.map((item) => {
              const done = isCompleted(item.id);
              return (
                <span
                  key={item.id}
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: done ? 'var(--primary)' : 'var(--border)',
                    transition: 'background 0.3s ease',
                  }}
                />
              );
            })}
          </span>
          {collapsed
            ? <ChevronDown size={16} style={{ color: 'var(--text3)' }} />
            : <ChevronUp size={16} style={{ color: 'var(--text3)' }} />
          }
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--bg4)', width: '100%' }}>
        <div style={{
          height: 4,
          background: 'var(--primary)',
          width: `${pct}%`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Checklist items */}
      {!collapsed && (
        <div>
          {CHECKLIST_ITEMS.map((item) => {
            const done = isCompleted(item.id);
            const isNew = justCompleted === item.id;
            const clickable = !!item.href && !done;
            return (
              <div
                key={item.id}
                role={clickable ? 'button' : undefined}
                tabIndex={clickable ? 0 : undefined}
                style={{
                  padding: 'var(--space-3) var(--space-5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  cursor: clickable ? 'pointer' : 'default',
                  transition: 'background 0.1s ease',
                  background: hoveredItemId === item.id && clickable ? 'var(--bg3)' : 'transparent',
                }}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onClick={() => handleItemClick(item)}
                onKeyDown={(e) => { if (clickable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); handleItemClick(item); } }}
              >
                {/* Checkbox circle */}
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${done ? 'var(--primary)' : 'var(--border)'}`,
                  background: done ? 'var(--primary)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                }}>
                  <span style={{
                    color: 'white',
                    fontSize: 11,
                    fontWeight: 700,
                    opacity: done ? 1 : 0,
                    transform: isNew ? 'scale(0.8)' : 'scale(1)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                    lineHeight: 1,
                  }}>
                    ✓
                  </span>
                </div>

                {/* Label */}
                <span style={{
                  flex: 1,
                  fontSize: '0.9rem',
                  color: done ? 'var(--text3)' : 'var(--text)',
                  textDecoration: done ? 'line-through' : 'none',
                  transition: 'color 0.2s ease',
                }}>
                  {item.label}
                </span>

                {/* Arrow for clickable items */}
                {item.href && !done && (
                  <ChevronRight size={14} style={{ color: 'var(--text3)', flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
