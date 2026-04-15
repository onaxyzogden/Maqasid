import { Link } from 'react-router-dom';
import './EmptyState.css';

/**
 * EmptyState — standardised zero-data placeholder.
 *
 * Per NLM design intelligence: empty states must include an icon, a clear
 * heading, a supportive description, and a primary CTA. Never leave the user
 * staring at a blank surface with no direction.
 *
 * Usage:
 *   <EmptyState
 *     icon={Receipt}
 *     title="No expenses yet"
 *     description="Track your business expenses to understand where money goes."
 *     action={{ label: 'Add Expense', onClick: () => setShowPanel(true) }}
 *     color="var(--mod-money)"
 *   />
 *
 *   // Or with a route CTA:
 *   <EmptyState
 *     icon={Kanban}
 *     title="No tasks yet"
 *     description="Add your first task to get started."
 *     action={{ label: '+ Create Task', to: '/app/work' }}
 *   />
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  color,
  size = 'md',
  className = '',
}) {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 48 : 36;

  return (
    <div className={`empty-state empty-state--${size} ${className}`}>
      {Icon && (
        <div
          className="empty-state__icon-wrap"
          style={color ? { color, background: color + '14', borderColor: color + '30' } : undefined}
        >
          <Icon size={iconSize} />
        </div>
      )}
      {title && <p className="empty-state__title">{title}</p>}
      {description && <p className="empty-state__desc">{description}</p>}
      {action && (
        action.to ? (
          <Link
            to={action.to}
            className="empty-state__cta"
            style={color ? { background: color, borderColor: color } : undefined}
          >
            {action.label}
          </Link>
        ) : (
          <button
            className="empty-state__cta"
            onClick={action.onClick}
            style={color ? { background: color, borderColor: color } : undefined}
          >
            {action.label}
          </button>
        )
      )}
    </div>
  );
}
