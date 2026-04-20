import MaqasidComparisonWheel from './components/MaqasidComparisonWheel';
import PathToExcellenceCards from './components/PathToExcellenceCards';
import './DashboardWheelTestPage.css';

const FAITH_SEGMENTS = [
  { id: 'shahada', label: 'Shahada', current: 100, aspirational: 100, color: '#4a6b8a' },
  { id: 'salah',   label: 'Salah',   current: 95,  aspirational: 100, color: '#3a7a4a' },
  { id: 'zakah',   label: 'Zakah',   current: 85,  aspirational: 100, color: '#c9a05a' },
  { id: 'siyam',   label: 'Siyam',   current: 90,  aspirational: 100, color: '#3a5a45' },
  { id: 'hajj',    label: 'Hajj',    current: 25,  aspirational: 100, color: '#8a3a3a' },
];

export default function DashboardWheelTestPage() {
  return (
    <div className="dwt-page">
      <div className="dwt-container">
        <div className="dwt-card">
          <h1 className="dwt-heading">Maqasid Comparison Wheel: Current vs. Aspirational</h1>
          <MaqasidComparisonWheel centerLabel="FAITH" segments={FAITH_SEGMENTS} />
        </div>

        <PathToExcellenceCards />
      </div>
    </div>
  );
}
