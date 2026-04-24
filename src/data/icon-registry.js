// Single source of truth for icon-name → lucide component mapping.
//
// Why this file exists:
//   `maqasid.js` and `modules.js` store icon NAMES as strings (e.g.
//   `icon: 'Shapes'`) so the data files stay JSON-serializable. Every
//   surface that renders those data files (Sidebar, MobileNav, Landing,
//   Onboarding, PillarCard, TaskDetailPanel, CeremonyGate, etc.) used
//   to keep its own local `ICON_MAP = { IconName, IconName, ... }`
//   block. When an icon name changed in the data files — e.g.
//   parent Ummah `Globe` → `Shapes`, or Wealth submodule icon swap —
//   any consumer that had `Globe` only in its import list (but not
//   registered in its local map) would silently render a blank glyph.
//
//   This registry consolidates every icon name referenced by the data
//   layer into one import + one export. Consumers do:
//       import { ICON_REGISTRY } from '@data/icon-registry';
//       const Icon = ICON_REGISTRY[iconName];
//   …and never have to touch an import when an icon name changes.
//
// Scope:
//   - Parent pillar glyphs from `maqasid.js` (Compass, HeartPulse, …)
//   - Submodule glyphs from `modules.js` (Shield, Activity, …)
//   - Legacy names kept for backward compat with stored project data
//     (Kanban, Wallet, PiggyBank, Store, Share2, …)
//
// If you add a new icon name to `maqasid.js` or `modules.js`, add it
// to both the import block and the ICON_REGISTRY export below.

import {
  // Parent pillar glyphs (maqasid.js)
  Compass, HeartPulse, Brain, Users, ChessRook, TreePine, Shapes, Moon,
  // Alt/legacy parents
  Coins,

  // Top-level module glyphs (modules.js, pre-pillar era)
  PencilRuler, Landmark, SquareTerminal, Building2, Heart, Home, Library,

  // Faith — pillar levels + 5 pillars
  Shield, TrendingUp, Star, CheckCircle2, HeartHandshake, HandHeart,

  // Life
  Activity, Sparkles,

  // Intellect
  BrainCircuit, Lightbulb, Wrench,

  // Family
  Baby, Handshake, HouseHeart,

  // Wealth
  CircleFadingArrowUp, ChessKnight, Scale, GitPullRequestCreateArrow,

  // Environment
  Droplets, Recycle, TreeDeciduous, ShoppingBag,

  // Ummah submodules
  Globe, MapPin,

  // Moontrance
  MapPinned, Leaf, HousePlus,

  // OGDEN Ecosystem
  Orbit, Briefcase, Globe2,

  // Legacy / backward-compat (stored project data may still reference)
  Kanban, Wallet, PiggyBank, Store, Share2, Hammer,
  CalendarHeart, GraduationCap, BarChart3, LayoutGrid,
  Boxes, UsersRound, BookOpen, ScrollText,
  Mountain, Building, CirclePile,
} from 'lucide-react';

/** Every icon name referenced by the data layer, mapped to its component. */
export const ICON_REGISTRY = {
  // Parent pillars
  Compass, HeartPulse, Brain, Users, ChessRook, TreePine, Shapes, Moon,
  Coins,

  // Top-level modules
  PencilRuler, Landmark, SquareTerminal, Building2, Heart, Home, Library,

  // Faith
  Shield, TrendingUp, Star, CheckCircle2, HeartHandshake, HandHeart,

  // Life
  Activity, Sparkles,

  // Intellect
  BrainCircuit, Lightbulb, Wrench,

  // Family
  Baby, Handshake, HouseHeart,

  // Wealth
  CircleFadingArrowUp, ChessKnight, Scale, GitPullRequestCreateArrow,

  // Environment
  Droplets, Recycle, TreeDeciduous, ShoppingBag,

  // Ummah
  Globe, MapPin,

  // Moontrance
  MapPinned, Leaf, HousePlus,

  // OGDEN Ecosystem
  Orbit, Briefcase, Globe2,

  // Legacy
  Kanban, Wallet, PiggyBank, Store, Share2, Hammer,
  CalendarHeart, GraduationCap, BarChart3, LayoutGrid,
  Boxes, UsersRound, BookOpen, ScrollText,
  Mountain, Building, CirclePile,
};

/**
 * Resolve an icon name to a lucide component.
 * @param {string|null|undefined} name — e.g. 'Shapes', 'HouseHeart'
 * @param {React.ComponentType|null} [fallback=null]
 * @returns {React.ComponentType|null}
 */
export function getIcon(name, fallback = null) {
  if (!name) return fallback;
  return ICON_REGISTRY[name] || fallback;
}

export default ICON_REGISTRY;
