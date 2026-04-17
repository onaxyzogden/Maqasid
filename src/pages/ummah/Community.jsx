import { useState } from 'react';
import PillarHeader from '@components/shared/PillarHeader';
import ViewToggle from '@components/shared/ViewToggle';
import OverviewCards from '@components/shared/OverviewCards';
import MaqasidTable from '@components/shared/MaqasidTable';
import { OVERVIEW, MAQASID } from '@data/module-overviews/community-overview';
import { useAyahBanner } from '@hooks/useAyahBanner';

const GROUNDING =
  'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayat 3:110, 49:10, 5:2.';

export default function Community() {
  const [view, setView] = useState('overview');
  useAyahBanner('ummah_community');

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="community" />
      <ViewToggle view={view} onChange={setView} />
      {view === 'overview' ? (
        <OverviewCards
          items={OVERVIEW}
          moduleColor="var(--mod-community)"
          grounding={GROUNDING}
        />
      ) : (
        <MaqasidTable data={MAQASID} moduleColor="var(--mod-community)" />
      )}
    </div>
  );
}
