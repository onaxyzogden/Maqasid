import { useState, useMemo } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useProjectStore } from '../../store/project-store';
import { useTaskStore } from '../../store/task-store';
import { useAuthStore } from '../../store/auth-store';
import { useContactsStore } from '../../store/contacts-store';
import { useOfficeStore } from '../../store/office-store';
import './NotificationsPanel.css';

function relativeTime(iso) {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'a day ago';
  return `${days} days ago`;
}

export default function NotificationsPanel({ onClose }) {
  const [tab, setTab] = useState('all');
  const user = useAuthStore((s) => s.user);
  const projects = useProjectStore((s) => s.projects);
  const tasksByProject = useTaskStore((s) => s.tasksByProject);
  const contacts = useContactsStore((s) => s.contacts);
  const events = useOfficeStore((s) => s.events);

  const firstName = user?.name ? user.name.split(' ')[0] : 'You';
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const allTasks = useMemo(() => Object.values(tasksByProject).flat(), [tasksByProject]);

  // Build project lookup
  const projectMap = useMemo(() => {
    const m = {};
    projects.forEach((p) => { m[p.id] = p; });
    return m;
  }, [projects]);

  // Build notifications from activity data
  const notifications = useMemo(() => {
    const items = [];

    // Task completions
    allTasks
      .filter((t) => t.completedAt)
      .forEach((t) => {
        const proj = projectMap[t.projectId];
        items.push({
          id: 'tc_' + t.id,
          type: 'task_complete',
          user: firstName,
          initials,
          isMine: true,
          text: <>completed the task: <strong>{t.title}</strong></>,
          detail: proj ? <>in project <strong>{proj.name}</strong>.</> : null,
          time: t.completedAt,
        });
      });

    // Task creations
    allTasks.forEach((t) => {
      const proj = projectMap[t.projectId];
      items.push({
        id: 'cr_' + t.id,
        type: 'task_create',
        user: firstName,
        initials,
        isMine: true,
        text: <>created the task: <strong>{t.title}</strong></>,
        detail: proj ? <>in project <strong>{proj.name}</strong>.</> : null,
        time: t.createdAt,
      });
    });

    // Project creations
    projects.forEach((p) => {
      items.push({
        id: 'pr_' + p.id,
        type: 'project_create',
        user: firstName,
        initials,
        isMine: true,
        text: <>New project <strong>{p.name}</strong> has been created.</>,
        detail: null,
        time: p.createdAt,
      });
    });

    // Contacts added
    contacts.slice(-10).forEach((c) => {
      const name = [c.firstName, c.lastName].filter(Boolean).join(' ') || c.displayName || 'A contact';
      items.push({
        id: 'ct_' + c.id,
        type: 'contact_add',
        user: name,
        initials: (c.firstName?.[0] || '?').toUpperCase() + (c.lastName?.[0] || '').toUpperCase(),
        isMine: false,
        text: <>has joined the team.</>,
        detail: null,
        time: c.createdAt,
      });
    });

    // Events created
    events.forEach((e) => {
      items.push({
        id: 'ev_' + e.id,
        type: 'event_create',
        user: firstName,
        initials,
        isMine: true,
        text: <>created event: <strong>{e.title}</strong></>,
        detail: null,
        time: e.createdAt,
      });
    });

    // Sort by time descending
    return items
      .sort((a, b) => (b.time || '').localeCompare(a.time || ''))
      .slice(0, 50);
  }, [allTasks, projects, contacts, events, firstName, initials, projectMap]);

  const visible = tab === 'mine'
    ? notifications.filter((n) => n.isMine)
    : notifications;

  return createPortal(
    <div className="notif-overlay" onClick={onClose}>
      <div className="notif-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="notif-panel__header">
          <h2 className="notif-panel__title">Notifications</h2>
          <button className="notif-panel__close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="notif-panel__tabs">
          <button
            className={`notif-tab ${tab === 'all' ? 'active' : ''}`}
            onClick={() => setTab('all')}
          >All</button>
          <span className="notif-tab-sep">/</span>
          <button
            className={`notif-tab ${tab === 'mine' ? 'active' : ''}`}
            onClick={() => setTab('mine')}
          >Mine</button>
        </div>

        {/* Notification list */}
        <div className="notif-panel__list">
          {visible.length === 0 && (
            <div className="notif-empty">No notifications yet</div>
          )}
          {visible.map((n) => (
            <div key={n.id} className="notif-item">
              <div className="notif-item__avatar">{n.initials}</div>
              <div className="notif-item__body">
                <div className="notif-item__time">{relativeTime(n.time)}</div>
                <div className="notif-item__text">
                  <strong>{n.user}</strong> {n.text}
                </div>
                {n.detail && (
                  <div className="notif-item__detail">{n.detail}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="notif-panel__footer">
          <button className="notif-mark-read">Mark all as read</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
