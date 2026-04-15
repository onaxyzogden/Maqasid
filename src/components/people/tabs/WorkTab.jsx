import { useMemo } from 'react';
import { useTaskStore } from '@store/task-store';
import { useProjectStore } from '@store/project-store';
import { Inbox } from 'lucide-react';

export default function WorkTab({ contactId }) {
  const getTasksByAssignee = useTaskStore((s) => s.getTasksByAssignee);
  const projects = useProjectStore((s) => s.projects);

  const tasks = useMemo(() => {
    const raw = getTasksByAssignee(contactId);
    return raw.sort((a, b) => {
      if (a.completedAt && !b.completedAt) return 1;
      if (!a.completedAt && b.completedAt) return -1;
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    });
  }, [contactId, getTasksByAssignee]);

  const projectMap = useMemo(() =>
    Object.fromEntries(projects.map((p) => [p.id, p.name])),
    [projects],
  );

  if (!contactId) return null;

  if (tasks.length === 0) {
    return (
      <div style={{ paddingTop: 32, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          maxWidth: 300, padding: 32, borderRadius: 16,
          background: 'var(--bg3)', textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
        }}>
          <Inbox size={28} style={{ color: 'var(--text3)' }} />
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>No assigned tasks</div>
          <div style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.5 }}>
            Assign tasks to this person from any project board to see them here.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            {['Task', 'Project', 'Priority', 'Due', 'Status'].map((h) => (
              <th key={h} style={{
                padding: '7px 8px', textAlign: 'left', fontWeight: 600,
                color: 'var(--text3)', fontSize: 12,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const done = !!task.completedAt;
            const overdue = !done && task.dueDate && new Date(task.dueDate) < new Date();
            const dueLabel = task.dueDate
              ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
              : '\u2014';
            return (
              <tr key={`${task.projectId}_${task.id}`} style={{
                borderBottom: '1px solid var(--border)',
                opacity: done ? 0.5 : 1,
              }}>
                <td style={{
                  padding: '8px 8px', color: 'var(--text)', fontWeight: 500,
                  textDecoration: done ? 'line-through' : 'none',
                }}>{task.title}</td>
                <td style={{ padding: '8px 8px', color: 'var(--text2)', fontSize: 12 }}>
                  {projectMap[task.projectId] || '\u2014'}
                </td>
                <td style={{ padding: '8px 8px' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
                    background: task.priority === 'urgent' ? 'var(--pri-urgent)'
                      : task.priority === 'high' ? 'var(--pri-high)'
                      : task.priority === 'medium' ? 'var(--pri-medium)'
                      : 'var(--pri-low)',
                    color: '#fff',
                  }}>
                    {task.priority || 'low'}
                  </span>
                </td>
                <td style={{
                  padding: '8px 8px', fontSize: 12,
                  color: overdue ? 'var(--pri-urgent)' : 'var(--text2)',
                  fontWeight: overdue ? 600 : 400,
                }}>{dueLabel}</td>
                <td style={{ padding: '8px 8px', fontSize: 12, color: 'var(--text2)' }}>
                  {done ? 'Done' : 'Active'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ fontSize: 12, color: 'var(--text3)', padding: '8px 8px' }}>
        {tasks.length} task{tasks.length !== 1 ? 's' : ''} assigned
      </div>
    </div>
  );
}
