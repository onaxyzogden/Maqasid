import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookOpen, ScrollText, GraduationCap } from 'lucide-react';
import QuranPage from './QuranPage';
import HadithPage from './HadithPage';
import IslamicKnowledgePage from './IslamicKnowledgePage';
import './SourcesPage.css';

const TABS = [
  { id: 'quran', label: 'Quran', Icon: BookOpen },
  { id: 'hadith', label: 'Hadith', Icon: ScrollText },
  { id: 'islamic-knowledge', label: 'Islamic Knowledge', Icon: GraduationCap },
];

export default function SourcesPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'quran');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && TABS.some((t) => t.id === tab)) setActiveTab(tab);
  }, [searchParams]);

  return (
    <div className="sources-page">
      <div className="sources-tab-bar">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`sources-tab ${activeTab === id ? 'sources-tab--active' : ''}`}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="sources-tab-content">
        {activeTab === 'quran' && <QuranPage />}
        {activeTab === 'hadith' && <HadithPage />}
        {activeTab === 'islamic-knowledge' && <IslamicKnowledgePage />}
      </div>
    </div>
  );
}
