import { useState } from 'react';
import PillarHeader from '@components/shared/PillarHeader';
import ViewToggle from '@components/shared/ViewToggle';
import OverviewCards from '@components/shared/OverviewCards';
import MaqasidTable from '@components/shared/MaqasidTable';
import { OVERVIEW, MAQASID } from '@data/module-overviews/neighbors-overview';
import { useAyahBanner } from '@hooks/useAyahBanner';

const GROUNDING =
  'Grounded with quran.ai: fetch_quran & fetch_translation (ar-simple-clean, en-abdel-haleem) for ayah 4:36. Hadith: Sunan al-Tirmidhi 1944.';

export default function Neighbors() {
  const [view, setView] = useState('overview');
  useAyahBanner('ummah_neighbors');

  return (
    <div style={{ maxWidth: 900 }}>
      <PillarHeader moduleId="neighbors" />
      <ViewToggle view={view} onChange={setView} />
      {view === 'overview' ? (
        <OverviewCards
          items={OVERVIEW}
          moduleColor="var(--mod-neighbors)"
          grounding={GROUNDING}
        />
      ) : (
        <MaqasidTable data={MAQASID} moduleColor="var(--mod-neighbors)" />
      )}
    </div>
  );
}
