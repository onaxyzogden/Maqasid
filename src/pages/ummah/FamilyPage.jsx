import { useState } from 'react';
import { useThresholdStore } from '@store/threshold-store';
import CeremonyGate from '@components/islamic/CeremonyGate';
import PillarHeader from '@components/shared/PillarHeader';
import ViewToggle from '@components/shared/ViewToggle';
import OverviewCards from '@components/shared/OverviewCards';
import MaqasidTable from '@components/shared/MaqasidTable';
import Office from '@pages/modules/Office';
import { OVERVIEW, MAQASID } from '@data/module-overviews/family-overview';

const GROUNDING =
  'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 30:21, 66:6, 4:1.';

const MODULE_TABS = [
  { id: 'content', label: 'Overview' },
  { id: 'office', label: 'Office' },
];

export default function FamilyPage() {
  const hasCompletedOpening = useThresholdStore((s) => !!s.completedOpening['family']);
  const [mainTab, setMainTab] = useState('content');
  const [view, setView] = useState('overview');

  if (!hasCompletedOpening) {
    return <CeremonyGate moduleId="family" />;
  }

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="family" />
      <div className="office-tabs">
        {MODULE_TABS.map((t) => (
          <button
            key={t.id}
            className={`office-tab${mainTab === t.id ? ' active' : ''}`}
            onClick={() => setMainTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      {mainTab === 'content' ? (
        <>
          <ViewToggle view={view} onChange={setView} />
          {view === 'overview' ? (
            <OverviewCards
              items={OVERVIEW}
              moduleColor="var(--mod-family)"
              grounding={GROUNDING}
            />
          ) : (
            <MaqasidTable data={MAQASID} moduleColor="var(--mod-family)" />
          )}
        </>
      ) : (
        <Office embedded />
      )}
    </div>
  );
}
