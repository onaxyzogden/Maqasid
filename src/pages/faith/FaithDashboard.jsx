import { Leaf, Diamond, Infinity as InfinityIcon } from 'lucide-react';
import FaithLevelNavigator from './FaithLevelNavigator';
import './FaithDashboard.css';

export default function FaithDashboard() {
  return (
    <div className="faith-dash font-manrope">

      {/* ── Level Navigator ── */}
      <FaithLevelNavigator />

      {/* ── Footer ── */}
      <footer className="faith-footer">
        <div className="faith-footer__text">
          <span>The Modern Manuscript &copy; 2024</span>
          <div className="faith-footer__dot" />
          <span>Faith Objective Details</span>
        </div>
        <div className="faith-footer__icons">
          <Leaf size={20} />
          <Diamond size={20} />
          <InfinityIcon size={20} />
        </div>
      </footer>

    </div>
  );
}
