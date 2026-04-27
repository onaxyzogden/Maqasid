// Shared helpers for the pillar-style dashboard task card layout.
// Used by PillarLevelDashboard and the regular project KanbanBoard so both
// boards can render DashboardTaskCard with consistent status/due-date semantics.

export function statusFromColumnId(columnId) {
  if (!columnId) return 'todo';
  if (columnId.endsWith('_done')) return 'done';
  if (columnId.endsWith('_progress')) return 'in-progress';
  return 'todo';
}

export function statusLabel(status) {
  return status === 'done' ? 'Done' : status === 'in-progress' ? 'In Progress' : 'To Do';
}

export function formatDue(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const diff = d - now;
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days < 0)   return { text: 'Overdue', colorVar: 'var(--danger)' };
  if (days === 0) return { text: 'Today',   colorVar: 'var(--warning)' };
  if (days <= 3)  return { text: `${days}d`, colorVar: 'var(--warning)' };
  return {
    text: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    colorVar: 'var(--text3)',
  };
}
