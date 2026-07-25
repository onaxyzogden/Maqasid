import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth-store';
import Landing from '@pages/Landing';
import RouteSpinner from '@components/shared/RouteSpinner';
import ChunkErrorBoundary from '@components/shared/ChunkErrorBoundary';

// ─── Route pages — all lazy so each ships its own chunk and stays out of the
// initial bundle (previously a single ~1.75 MB entry chunk eagerly importing
// ~60 pages). Only Landing above stays eager, for an instant spinner-free '/'.
// The top-level <Suspense> renders <RouteSpinner /> while a route chunk loads;
// <ChunkErrorBoundary> catches chunk-load failures.

// AppShell is lazy so Landing '/' never pays for the shell tree (sidebar,
// topbar, Islamic panel, prayer overlays). It hosts its own <Suspense>
// around <Outlet/>, so inner-route chunk loads never unmount the chrome.
const AppShell = lazy(() => import('@components/layout/AppShell'));

const Onboarding = lazy(() => import('@pages/Onboarding'));
const Dashboard = lazy(() => import('@pages/Dashboard'));

// Modules — Work/Project pull in @dnd-kit + react-markdown + remark-gfm.
const Work = lazy(() => import('@pages/modules/Work'));
const Project = lazy(() => import('@pages/modules/Project'));
const Money = lazy(() => import('@pages/modules/Money'));
const People = lazy(() => import('@pages/modules/People'));
const Office = lazy(() => import('@pages/modules/Office'));
const Tech = lazy(() => import('@pages/modules/Tech'));
const FamilyPage = lazy(() => import('@pages/ummah/FamilyPage'));
const Neighbors = lazy(() => import('@pages/ummah/Neighbors'));
const Community = lazy(() => import('@pages/ummah/Community'));

// /app/sources reuses the SubtaskSources chunk so hadith.js + quran-wbw.js
// stay out of the main bundle.
const SourcesPage = lazy(() => import('@pages/islamic/SourcesPage'));

// Pillar Core / Growth / Excellence pages
const FaithCorePage = lazy(() => import('@pages/faith/FaithCorePage'));
const FaithGrowthPage = lazy(() => import('@pages/faith/FaithGrowthPage'));
const FaithExcellencePage = lazy(() => import('@pages/faith/FaithExcellencePage'));
const HealthCorePage = lazy(() => import('@pages/health/HealthCorePage'));
const HealthGrowthPage = lazy(() => import('@pages/health/HealthGrowthPage'));
const HealthExcellencePage = lazy(() => import('@pages/health/HealthExcellencePage'));
const IntellectCorePage = lazy(() => import('@pages/intellect/IntellectCorePage'));
const IntellectGrowthPage = lazy(() => import('@pages/intellect/IntellectGrowthPage'));
const IntellectExcellencePage = lazy(() => import('@pages/intellect/IntellectExcellencePage'));
const FamilyCorePage = lazy(() => import('@pages/family/FamilyCorePage'));
const FamilyGrowthPage = lazy(() => import('@pages/family/FamilyGrowthPage'));
const FamilyExcellencePage = lazy(() => import('@pages/family/FamilyExcellencePage'));
const EnvironmentCorePage = lazy(() => import('@pages/environment/EnvironmentCorePage'));
const EnvironmentGrowthPage = lazy(() => import('@pages/environment/EnvironmentGrowthPage'));
const EnvironmentExcellencePage = lazy(() => import('@pages/environment/EnvironmentExcellencePage'));

// Faith sub-pillars
const FaithShahadaPage = lazy(() => import('@pages/faith/FaithShahadaPage'));
const FaithSalahPage = lazy(() => import('@pages/faith/FaithSalahPage'));
const FaithZakahPage = lazy(() => import('@pages/faith/FaithZakahPage'));
const FaithSiyamPage = lazy(() => import('@pages/faith/FaithSiyamPage'));
const FaithHajjPage = lazy(() => import('@pages/faith/FaithHajjPage'));

// Health sub-pages
const HealthPhysicalPage = lazy(() => import('@pages/health/HealthPhysicalPage'));
const HealthMentalPage = lazy(() => import('@pages/health/HealthMentalPage'));
const HealthSafetyPage = lazy(() => import('@pages/health/HealthSafetyPage'));
const HealthSocialPage = lazy(() => import('@pages/health/HealthSocialPage'));

// Intellect sub-pages
const IntellectLearningPage = lazy(() => import('@pages/intellect/IntellectLearningPage'));
const IntellectThinkingPage = lazy(() => import('@pages/intellect/IntellectThinkingPage'));
const IntellectCognitivePage = lazy(() => import('@pages/intellect/IntellectCognitivePage'));
const IntellectProfessionalPage = lazy(() => import('@pages/intellect/IntellectProfessionalPage'));

// Family sub-pages
const FamilyMarriagePage = lazy(() => import('@pages/family/FamilyMarriagePage'));
const FamilyParentingPage = lazy(() => import('@pages/family/FamilyParentingPage'));
const FamilyKinshipPage = lazy(() => import('@pages/family/FamilyKinshipPage'));
const FamilyHomePage = lazy(() => import('@pages/family/FamilyHomePage'));

// Wealth pages
const WealthCorePage = lazy(() => import('@pages/wealth/WealthCorePage'));
const WealthGrowthPage = lazy(() => import('@pages/wealth/WealthGrowthPage'));
const WealthExcellencePage = lazy(() => import('@pages/wealth/WealthExcellencePage'));
const WealthEarningPage = lazy(() => import('@pages/wealth/WealthEarningPage'));
const WealthFinancialPage = lazy(() => import('@pages/wealth/WealthFinancialPage'));
const WealthOwnershipPage = lazy(() => import('@pages/wealth/WealthOwnershipPage'));
const WealthCirculationPage = lazy(() => import('@pages/wealth/WealthCirculationPage'));

// Environment sub-pages
const EnvironmentResourcePage = lazy(() => import('@pages/environment/EnvironmentResourcePage'));
const EnvironmentWastePage = lazy(() => import('@pages/environment/EnvironmentWastePage'));
const EnvironmentEcosystemPage = lazy(() => import('@pages/environment/EnvironmentEcosystemPage'));
const EnvironmentSourcingPage = lazy(() => import('@pages/environment/EnvironmentSourcingPage'));

const CollectivePage = lazy(() => import('@pages/ummah/CollectivePage'));

// Moontrance Land/Seasonal/Residency pull in heavy LevelNavigator data.
const MoontraceLandPage = lazy(() => import('@pages/ummah/MoontraceLandPage'));
const MoontranceSeasonalPage = lazy(() => import('@pages/ummah/MoontranceSeasonalPage'));
const MoontranceResidencyPage = lazy(() => import('@pages/ummah/MoontranceResidencyPage'));

// Ogden layer
const OgdenFoundationPage = lazy(() => import('@pages/ogden/OgdenFoundationPage'));
const OgdenIntegrationPage = lazy(() => import('@pages/ogden/OgdenIntegrationPage'));
const OgdenRealizationPage = lazy(() => import('@pages/ogden/OgdenRealizationPage'));
const OgdenBbosPage = lazy(() => import('@pages/ogden/OgdenBbosPage'));
const OgdenMilosPage = lazy(() => import('@pages/ogden/OgdenMilosPage'));
const OgdenAtlasPage = lazy(() => import('@pages/ogden/OgdenAtlasPage'));
const OgdenPresentationPage = lazy(() => import('@pages/ogden/OgdenPresentationPage'));

// Dashboards
const PillarDashboard = lazy(() => import('@pages/PillarDashboard'));
const UmmahDashboard = lazy(() => import('@pages/ummah/UmmahDashboard'));
const MoontraceDashboard = lazy(() => import('@pages/moontrance/MoontraceDashboard'));

const Settings = lazy(() => import('@pages/Settings'));
const AccountPage = lazy(() => import('@pages/AccountPage'));
const AuthPage = lazy(() => import('@pages/AuthPage'));
const ModulePlaceholder = lazy(() => import('@pages/ModulePlaceholder'));
const PropheticPathPage = lazy(() => import('@pages/PropheticPathPage'));
const OrientationPage = lazy(() => import('@pages/OrientationPage'));
// Route-element wrappers + heavy work components — lazy so they leave the
// entry graph (ProjectBoard alone drags @dnd-kit; guards drag CeremonyGate).
const CeremonyGuard = lazy(() => import('@components/islamic/CeremonyGuard'));
const CeremonyGuardDynamic = lazy(() => import('@components/islamic/CeremonyGuardDynamic'));
const ProjectBoard = lazy(() => import('@components/work/ProjectBoard'));
const AssetsTab = lazy(() => import('@components/money/AssetsTab'));
const ProjectJournal = lazy(() => import('@components/journal/ProjectJournal'));
import { useParams } from 'react-router-dom';
import { useProjectStore } from '@store/project-store';
import { useTaskStore } from '@store/task-store';
import { useEffect } from 'react';

function ProjectTasks() {
  const { projectId } = useParams();
  const project = useProjectStore((s) => s.getProject(projectId));
  const loadTasks = useTaskStore((s) => s.loadTasks);
  // reason: loadTasks is a stable store action; only react to projectId changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (projectId) loadTasks(projectId); }, [projectId]);
  if (!project) return null;
  return <ProjectBoard projectId={projectId} project={project} hideBbos />;
}

function ProjectAssets() {
  return <AssetsTab />;
}

function ProtectedRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/get-started" replace />;
  return children;
}

/* ─── Global textarea auto-resize ─── */
function autoResize(el) {
  el.style.height = 'auto';
  el.style.height = el.scrollHeight + 'px';
}

function useGlobalTextareaAutoResize() {
  useEffect(() => {
    const onInput = (e) => { if (e.target.tagName === 'TEXTAREA') autoResize(e.target); };
    const onFocus = (e) => { if (e.target.tagName === 'TEXTAREA') autoResize(e.target); };
    document.addEventListener('input', onInput);
    document.addEventListener('focusin', onFocus);
    return () => { document.removeEventListener('input', onInput); document.removeEventListener('focusin', onFocus); };
  }, []);
}

export default function App() {
  useGlobalTextareaAutoResize();

  // Initialise Supabase session once on mount (no-op when Supabase is not configured)
  const initAuth = useAuthStore((s) => s.initAuth);
  useEffect(() => { initAuth(); }, [initAuth]);

  return (
    <ChunkErrorBoundary>
    <Suspense fallback={<RouteSpinner />}>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/get-started" element={<Onboarding />} />
      <Route path="/present/ogden" element={<OgdenPresentationPage />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="work" element={<CeremonyGuard moduleId="work"><Work /></CeremonyGuard>} />
        <Route path="work/:projectId" element={<CeremonyGuard moduleId="work"><Project /></CeremonyGuard>}>
          <Route path="people" element={<People embedded />} />
          <Route path="tasks" element={<ProjectTasks />} />
          <Route path="money" element={<Money embedded />} />
          <Route path="assets" element={<ProjectAssets />} />
          <Route path="office" element={<Office embedded />} />
          <Route path="tech" element={<Tech embedded />} />
          <Route path="journal" element={<ProjectJournal />} />
        </Route>
        <Route path="money" element={<CeremonyGuard moduleId="money"><Money /></CeremonyGuard>} />
        <Route path="people" element={<CeremonyGuard moduleId="people"><People /></CeremonyGuard>} />
        <Route path="office" element={<CeremonyGuard moduleId="office"><Office /></CeremonyGuard>} />
        <Route path="tech" element={<CeremonyGuard moduleId="tech"><Tech /></CeremonyGuard>} />
        <Route path="family" element={<CeremonyGuard moduleId="family"><FamilyPage /></CeremonyGuard>} />
        <Route path="neighbors" element={<CeremonyGuard moduleId="neighbors"><Neighbors /></CeremonyGuard>} />
        <Route path="community" element={<CeremonyGuard moduleId="community"><Community /></CeremonyGuard>} />
        <Route path="sources" element={<SourcesPage />} />
        <Route path="quran" element={<Navigate to="/app/sources?tab=quran" replace />} />
        <Route path="hadith" element={<Navigate to="/app/sources?tab=hadith" replace />} />
        <Route path="islamic-knowledge" element={<Navigate to="/app/sources?tab=islamic-knowledge" replace />} />
        <Route path="faith-core" element={<CeremonyGuard moduleId="faith-core" isLevel1><FaithCorePage /></CeremonyGuard>} />
        <Route path="faith-growth" element={<CeremonyGuard moduleId="faith-growth" isLevel23><FaithGrowthPage /></CeremonyGuard>} />
        <Route path="faith-excellence" element={<CeremonyGuard moduleId="faith-excellence" isLevel23><FaithExcellencePage /></CeremonyGuard>} />
        <Route path="health-core" element={<CeremonyGuard moduleId="health-core" isLevel1><HealthCorePage /></CeremonyGuard>} />
        <Route path="health-growth" element={<CeremonyGuard moduleId="health-growth" isLevel23><HealthGrowthPage /></CeremonyGuard>} />
        <Route path="health-excellence" element={<CeremonyGuard moduleId="health-excellence" isLevel23><HealthExcellencePage /></CeremonyGuard>} />
        <Route path="intellect-core" element={<CeremonyGuard moduleId="intellect-core" isLevel1><IntellectCorePage /></CeremonyGuard>} />
        <Route path="intellect-growth" element={<CeremonyGuard moduleId="intellect-growth" isLevel23><IntellectGrowthPage /></CeremonyGuard>} />
        <Route path="intellect-excellence" element={<CeremonyGuard moduleId="intellect-excellence" isLevel23><IntellectExcellencePage /></CeremonyGuard>} />
        <Route path="family-core" element={<CeremonyGuard moduleId="family-core" isLevel1><FamilyCorePage /></CeremonyGuard>} />
        <Route path="family-growth" element={<CeremonyGuard moduleId="family-growth" isLevel23><FamilyGrowthPage /></CeremonyGuard>} />
        <Route path="family-excellence" element={<CeremonyGuard moduleId="family-excellence" isLevel23><FamilyExcellencePage /></CeremonyGuard>} />
        <Route path="environment-core" element={<CeremonyGuard moduleId="environment-core" isLevel1><EnvironmentCorePage /></CeremonyGuard>} />
        <Route path="environment-growth" element={<CeremonyGuard moduleId="environment-growth" isLevel23><EnvironmentGrowthPage /></CeremonyGuard>} />
        <Route path="environment-excellence" element={<CeremonyGuard moduleId="environment-excellence" isLevel23><EnvironmentExcellencePage /></CeremonyGuard>} />
        <Route path="faith-shahada" element={<CeremonyGuard moduleId="faith-shahada"><FaithShahadaPage /></CeremonyGuard>} />
        <Route path="faith-salah" element={<CeremonyGuard moduleId="faith-salah"><FaithSalahPage /></CeremonyGuard>} />
        <Route path="faith-zakah" element={<CeremonyGuard moduleId="faith-zakah"><FaithZakahPage /></CeremonyGuard>} />
        <Route path="faith-siyam" element={<CeremonyGuard moduleId="faith-siyam"><FaithSiyamPage /></CeremonyGuard>} />
        <Route path="faith-hajj" element={<CeremonyGuard moduleId="faith-hajj"><FaithHajjPage /></CeremonyGuard>} />
        <Route path="health-physical" element={<CeremonyGuard moduleId="health-physical"><HealthPhysicalPage /></CeremonyGuard>} />
        <Route path="health-mental" element={<CeremonyGuard moduleId="health-mental"><HealthMentalPage /></CeremonyGuard>} />
        <Route path="health-safety" element={<CeremonyGuard moduleId="health-safety"><HealthSafetyPage /></CeremonyGuard>} />
        <Route path="health-social" element={<CeremonyGuard moduleId="health-social"><HealthSocialPage /></CeremonyGuard>} />
        <Route path="intellect-learning" element={<CeremonyGuard moduleId="intellect-learning"><IntellectLearningPage /></CeremonyGuard>} />
        <Route path="intellect-thinking" element={<CeremonyGuard moduleId="intellect-thinking"><IntellectThinkingPage /></CeremonyGuard>} />
        <Route path="intellect-cognitive" element={<CeremonyGuard moduleId="intellect-cognitive"><IntellectCognitivePage /></CeremonyGuard>} />
        <Route path="intellect-professional" element={<CeremonyGuard moduleId="intellect-professional"><IntellectProfessionalPage /></CeremonyGuard>} />
        <Route path="family-marriage" element={<CeremonyGuard moduleId="family-marriage"><FamilyMarriagePage /></CeremonyGuard>} />
        <Route path="family-parenting" element={<CeremonyGuard moduleId="family-parenting"><FamilyParentingPage /></CeremonyGuard>} />
        <Route path="family-kinship" element={<CeremonyGuard moduleId="family-kinship"><FamilyKinshipPage /></CeremonyGuard>} />
        <Route path="family-home" element={<CeremonyGuard moduleId="family-home"><FamilyHomePage /></CeremonyGuard>} />
        <Route path="family-office" element={<Office embedded />} />
        <Route path="wealth-core" element={<CeremonyGuard moduleId="wealth-core" isLevel1><WealthCorePage /></CeremonyGuard>} />
        <Route path="wealth-growth" element={<CeremonyGuard moduleId="wealth-growth" isLevel23><WealthGrowthPage /></CeremonyGuard>} />
        <Route path="wealth-excellence" element={<CeremonyGuard moduleId="wealth-excellence" isLevel23><WealthExcellencePage /></CeremonyGuard>} />
        <Route path="wealth-earning" element={<CeremonyGuard moduleId="wealth-earning"><WealthEarningPage /></CeremonyGuard>} />
        <Route path="wealth-financial" element={<CeremonyGuard moduleId="wealth-financial"><WealthFinancialPage /></CeremonyGuard>} />
        <Route path="wealth-ownership" element={<CeremonyGuard moduleId="wealth-ownership"><WealthOwnershipPage /></CeremonyGuard>} />
        <Route path="wealth-circulation" element={<CeremonyGuard moduleId="wealth-circulation"><WealthCirculationPage /></CeremonyGuard>} />
        <Route path="env-resource" element={<CeremonyGuard moduleId="env-resource"><EnvironmentResourcePage /></CeremonyGuard>} />
        <Route path="env-waste" element={<CeremonyGuard moduleId="env-waste"><EnvironmentWastePage /></CeremonyGuard>} />
        <Route path="env-ecosystem" element={<CeremonyGuard moduleId="env-ecosystem"><EnvironmentEcosystemPage /></CeremonyGuard>} />
        <Route path="env-sourcing" element={<CeremonyGuard moduleId="env-sourcing"><EnvironmentSourcingPage /></CeremonyGuard>} />
        <Route path="collective" element={<CeremonyGuard moduleId="collective"><CollectivePage /></CeremonyGuard>} />
        <Route path="moontrance-land" element={<CeremonyGuard moduleId="moontrance-land"><MoontraceLandPage /></CeremonyGuard>} />
        <Route path="moontrance-seasonal" element={<CeremonyGuard moduleId="moontrance-seasonal"><MoontranceSeasonalPage /></CeremonyGuard>} />
        <Route path="moontrance-residency" element={<CeremonyGuard moduleId="moontrance-residency"><MoontranceResidencyPage /></CeremonyGuard>} />
        <Route path="ogden-foundation" element={<OgdenFoundationPage />} />
        <Route path="ogden-integration" element={<OgdenIntegrationPage />} />
        <Route path="ogden-realization" element={<OgdenRealizationPage />} />
        <Route path="ogden-bbos" element={<OgdenBbosPage />} />
        <Route path="ogden-milos" element={<OgdenMilosPage />} />
        <Route path="ogden-atlas" element={<OgdenAtlasPage />} />
        <Route path="pillar/faith" element={<CeremonyGuard moduleId="faith-core" isLevel1><FaithCorePage /></CeremonyGuard>} />
        <Route path="pillar/health" element={<CeremonyGuard moduleId="health-core" isLevel1><HealthCorePage /></CeremonyGuard>} />
        <Route path="pillar/intellect" element={<CeremonyGuard moduleId="intellect-core" isLevel1><IntellectCorePage /></CeremonyGuard>} />
        <Route path="pillar/family" element={<CeremonyGuard moduleId="family-core" isLevel1><FamilyCorePage /></CeremonyGuard>} />
        <Route path="pillar/wealth" element={<CeremonyGuard moduleId="wealth-core" isLevel1><WealthCorePage /></CeremonyGuard>} />
        <Route path="pillar/environment" element={<CeremonyGuard moduleId="environment-core" isLevel1><EnvironmentCorePage /></CeremonyGuard>} />
        <Route path="pillar/ummah" element={<CeremonyGuard moduleId="ummah"><UmmahDashboard /></CeremonyGuard>} />
        <Route path="pillar/moontrance" element={<MoontraceDashboard />} />
        <Route path="pillar/:pillarId" element={<CeremonyGuardDynamic paramKey="pillarId"><PillarDashboard /></CeremonyGuardDynamic>} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="prophetic-path" element={<PropheticPathPage />} />
        <Route path="prophetic-path-test" element={<Navigate to="/app/prophetic-path" replace />} />
        <Route path="orientation" element={<OrientationPage />} />
        <Route path=":moduleId" element={<CeremonyGuardDynamic><ModulePlaceholder /></CeremonyGuardDynamic>} />
      </Route>
    </Routes>
    </Suspense>
    </ChunkErrorBoundary>
  );
}
