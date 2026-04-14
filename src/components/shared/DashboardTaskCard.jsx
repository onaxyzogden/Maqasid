import { Calendar } from 'lucide-react';
import './DashboardTaskCard.css';

// ── Sub-components ───────────────────────────────────────────────────────────

function SubtaskBar({ done, total, color }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="dtc__subtask-row">
      <span className="dtc__subtask-label">{done}/{total} subtasks</span>
      <div className="dtc__subtask-track">
        <div className="dtc__subtask-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="dtc__subtask-pct">{pct}%</span>
    </div>
  );
}

function FieldProgressBar({ filled, total }) {
  if (!total) return null;
  const pct = Math.round((filled / total) * 100);
  const fillColor =
    pct === 100 ? 'var(--col-done)' :
    pct >= 50   ? 'var(--accent)'   : 'var(--pri-high)';
  return (
    <div className="dtc__progress-row">
      <div className="dtc__progress-track">
        <div className="dtc__progress-fill" style={{ width: `${pct}%`, background: fillColor }} />
      </div>
      <span className="dtc__progress-pct">{pct}%</span>
    </div>
  );
}

function DueDateRow({ text, colorVar }) {
  return (
    <div className="dtc__due-row" style={{ color: colorVar }}>
      <Calendar size={11} />
      <span>{text}</span>
    </div>
  );
}

function TagPills({ tags }) {
  return (
    <div className="dtc__tag-list">
      {tags.map((tag, i) => (
        <span key={i} className="dtc__tag">{tag}</span>
      ))}
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function DashboardTaskCard({
  taskId,
  index,
  title,
  span,
  status,
  accentColor,
  statusTint,
  chips,
  subtasks,
  fieldProgress,
  dueDate,
  tags,
  purpose,
  emptyMessage,
  onSelectTask,
  children,
}) {
  const clickable = !!(onSelectTask && taskId);

  const handleClick = (e) => {
    if (!clickable) return;
    if (e.target.closest('a, button, input, select, textarea')) return;
    onSelectTask(taskId);
  };

  const handleKeyDown = (e) => {
    if (!clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectTask(taskId);
    }
  };

  const numStyle = accentColor
    ? { background: `color-mix(in srgb, ${accentColor} 14%, transparent)`, color: accentColor }
    : undefined;

  const cardClassName = [
    'dtc__card',
    `dtc__card--${status}`,
    clickable && 'dtc__card--clickable',
  ].filter(Boolean).join(' ');

  const cardStyle = {
    ...(span ? { gridColumn: `span ${span}` } : {}),
    ...statusTint,
  };

  const hasBody = children || emptyMessage;

  return (
    <div
      data-task-id={taskId}
      className={cardClassName}
      style={cardStyle}
      onClick={handleClick}
      onKeyDown={clickable ? handleKeyDown : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      {/* Head */}
      <div className="dtc__card-head">
        <div className="dtc__card-num" style={numStyle}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="dtc__card-head-info">
          <span className="dtc__card-title">{title}</span>
          {chips?.length > 0 && (
            <div className="dtc__card-chips">
              {chips.map((chip, i) => (
                <span key={i} className={chip.className || 'dtc__chip'} style={chip.style}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Subtask progress (Pillar) */}
      {subtasks?.total > 0 && (
        <SubtaskBar done={subtasks.done} total={subtasks.total} color={subtasks.color} />
      )}

      {/* Field progress (BBOS) */}
      {fieldProgress && (
        <FieldProgressBar filled={fieldProgress.filled} total={fieldProgress.total} />
      )}

      {/* Purpose text (BBOS) */}
      {purpose && <p className="dtc__card-purpose">{purpose}</p>}

      {/* Due date (Pillar) */}
      {dueDate && <DueDateRow text={dueDate.text} colorVar={dueDate.colorVar} />}

      {/* Tags (Pillar) */}
      {tags?.length > 0 && <TagPills tags={tags} />}

      {/* Body */}
      {hasBody && (
        <div className="dtc__card-body">
          {children || (emptyMessage && <div className="dtc__card-empty">{emptyMessage}</div>)}
        </div>
      )}
    </div>
  );
}
