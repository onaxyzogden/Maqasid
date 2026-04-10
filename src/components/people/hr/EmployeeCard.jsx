import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import AvatarInitials from '../shared/AvatarInitials';
import { getAvatarColor } from '@data/config/contact-config';
import { EMPLOYEE_STATUSES } from '@data/config/people-departments';

export default function EmployeeCard({ employee, department, onClick, onMenuAction }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const status = EMPLOYEE_STATUSES.find((s) => s.id === employee.status) || EMPLOYEE_STATUSES[0];
  const displayName = employee.name || [employee.firstName, employee.lastName].filter(Boolean).join(' ') || 'Unnamed';
  const first = employee.firstName || (employee.name || '').split(' ')[0] || '';
  const last = employee.lastName || (employee.name || '').split(' ').slice(1).join(' ') || '';

  return (
    <div className="emp-card" onClick={onClick}>
      <div className="emp-card__header">
        <span className="emp-card__status" style={{ background: status.color + '18', color: status.color }}>
          {status.label}
        </span>
        <button
          className="emp-card__menu"
          onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
        >
          <MoreHorizontal size={14} />
        </button>
        {menuOpen && (
          <>
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 98 }}
              onClick={(e) => { e.stopPropagation(); setMenuOpen(false); }}
            />
            <div className="emp-card__dropdown">
              <button
                className="emp-card__dropdown-item"
                onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onClick?.(); }}
              >
                View Details
              </button>
              <button
                className="emp-card__dropdown-item emp-card__dropdown-item--danger"
                onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onMenuAction?.('archive', employee); }}
              >
                Archive
              </button>
            </div>
          </>
        )}
      </div>
      <div className="emp-card__body">
        <AvatarInitials
          firstName={first}
          lastName={last}
          color={employee.avatarColor || getAvatarColor(employee.id)}
          size={52}
        />
        <div className="emp-card__name">{displayName}</div>
        {department && (
          <div className="emp-card__dept" style={{ color: department.color }}>
            {department.name}
          </div>
        )}
        {employee.role && <div className="emp-card__role">{employee.role}</div>}
      </div>
    </div>
  );
}
