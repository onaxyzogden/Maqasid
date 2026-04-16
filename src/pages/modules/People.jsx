import { useState } from 'react';
import { Users, Briefcase, Kanban, UserPlus } from 'lucide-react';
import { useContactsStore } from '@store/contacts-store';
import ContactsPage from '@components/people/contacts/ContactsPage';
import HRPage from '@components/people/hr/HRPage';
import SalesPipelinePage from '@components/people/recruitment/SalesPipelinePage';
import RecruitmentPage from '@components/people/recruitment/RecruitmentPage';
import DetailPanel from '@components/people/detail/DetailPanel';
import PillarHeader from '@components/shared/PillarHeader';
import './People.css';

const SECTIONS = [
  { id: 'contacts',  label: 'Contacts',        icon: Users },
  { id: 'hr',        label: 'Human Resources',  icon: Briefcase },
  { id: 'pipeline',  label: 'Sales Pipeline',   icon: Kanban },
  { id: 'recruit',   label: 'Recruitment',       icon: UserPlus },
];

export default function People({ embedded = false }) {
  const panelOpen = useContactsStore((s) => s.panelOpen);
  const [activeSection, setActiveSection] = useState('contacts');

  return (
    <div className="people">
      {!embedded && <PillarHeader moduleId="people" />}
      <div className="people-tabs">
        {SECTIONS.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              className={`people-tab ${activeSection === sec.id ? 'active' : ''}`}
              onClick={() => setActiveSection(sec.id)}
            >
              <Icon size={16} /> {sec.label}
            </button>
          );
        })}
      </div>

      {activeSection === 'contacts' && <ContactsPage />}
      {activeSection === 'hr' && <HRPage />}
      {activeSection === 'pipeline' && <SalesPipelinePage />}
      {activeSection === 'recruit' && <RecruitmentPage />}
      {panelOpen && <DetailPanel />}
    </div>
  );
}
