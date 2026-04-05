import { MoreHorizontal } from 'lucide-react';
import AvatarInitials from './AvatarInitials';
import { getAvatarColor } from '../../data/contact-config';
import { EMPLOYEE_STATUSES } from '../../data/people-departments';

export default function EmployeeCard({ employee, department, onClick }) {
  const status = EMPLOYEE_STATUSES.find((s) => s.id === employee.status) || EMPLOYEE_STATUSES[0];

  return (
    <div className="emp-card" onClick={onClick}>
      <div className="emp-card__header">
        <span className="emp-card__status" style={{ background: status.color + '18', color: status.color }}>
          {status.label}
        </span>
        <button className="emp-card__menu" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal size={14} />
        </button>
      </div>
      <div className="emp-card__body">
        <AvatarInitials
          firstName={employee.name}
          lastName=""
          color={getAvatarColor(employee.id)}
          size={52}
        />
        <div className="emp-card__name">{employee.name || 'Unnamed'}</div>
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
