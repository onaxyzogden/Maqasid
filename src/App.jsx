import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth-store';
import Landing from '@pages/Landing';
import Onboarding from '@pages/Onboarding';
import AppShell from '@components/layout/AppShell';
import Dashboard from '@pages/Dashboard';
import RouteSpinner from '@components/shared/RouteSpinner';
import ChunkErrorBoundary from '@components/shared/ChunkErrorBoundary';
// Phase 3 — Work module subtree is lazy: pulls in @dnd-kit + react-markdown
// + remark-gfm only when a user opens a Work/Project route.
const Work = lazy(() => import('@pages/modules/Work'));
const Project = lazy(() => import('@pages/modules/Project'));
import Money from '@pages/modules/Money';
import People from '@pages/modules/People';
import Office from '@pages/modules/Office';
import Tech from '@pages/modules/Tech';
import FamilyPage from '@pages/ummah/FamilyPage';
import Neighbors from '@pages/ummah/Neighbors';
import Community from '@pages/ummah/Community';
// Phase 2 — /app/sources route is lazy; reuses the SubtaskSources chunk from
// Phase 1 so hadith.js + quran-wbw.js stay out of the main bundle.
const SourcesPage = lazy(() => import('@pages/islamic/SourcesPage'));
import FaithCorePage from '@pages/faith/FaithCorePage';
import FaithGrowthPage from '@pages/faith/FaithGrowthPage';
import FaithExcellencePage from '@pages/faith/FaithExcellencePage';
import HealthCorePage from '@pages/health/HealthCorePage';
import HealthGrowthPage from '@pages/health/HealthGrowthPage';
import HealthExcellencePage from '@pages/health/HealthExcellencePage';
import IntellectCorePage from '@pages/intellect/IntellectCorePage';
import IntellectGrowthPage from '@pages/intellect/IntellectGrowthPage';
import IntellectExcellencePage from '@pages/intellect/IntellectExcellencePage';
import FamilyCorePage from '@pages/family/FamilyCorePage';
import FamilyGrowthPage from '@pages/family/FamilyGrowthPage';
import FamilyExcellencePage from '@pages/family/FamilyExcellencePage';
import EnvironmentCorePage from '@pages/environment/EnvironmentCorePage';
import EnvironmentGrowthPage from '@pages/environment/EnvironmentGrowthPage';
import EnvironmentExcellencePage from '@pages/environment/EnvironmentExcellencePage';
import FaithShahadaPage from '@pages/faith/FaithShahadaPage';
import FaithSalahPage from '@pages/faith/FaithSalahPage';
import FaithZakahPage from '@pages/faith/FaithZakahPage';
import FaithSiyamPage from '@pages/faith/FaithSiyamPage';
import FaithHajjPage from '@pages/faith/FaithHajjPage';
import HealthPhysicalPage from '@pages/health/HealthPhysicalPage';
import HealthMentalPage from '@pages/health/HealthMentalPage';
import HealthSafetyPage from '@pages/health/HealthSafetyPage';
import HealthSocialPage from '@pages/health/HealthSocialPage';
import IntellectLearningPage from '@pages/intellect/IntellectLearningPage';
import IntellectThinkingPage from '@pages/intellect/IntellectThinkingPage';
import IntellectCognitivePage from '@pages/intellect/IntellectCognitivePage';
import IntellectProfessionalPage from '@pages/intellect/IntellectProfessionalPage';
import FamilyMarriagePage from '@pages/family/FamilyMarriagePage';
import FamilyParentingPage from '@pages/family/FamilyParentingPage';
import FamilyKinshipPage from '@pages/family/FamilyKinshipPage';
import FamilyHomePage from '@pages/family/FamilyHomePage';
import WealthCorePage from '@pages/wealth/WealthCorePage';
import WealthGrowthPage from '@pages/wealth/WealthGrowthPage';
import WealthExcellencePage from '@pages/wealth/WealthExcellencePage';
import WealthEarningPage from '@pages/wealth/WealthEarningPage';
import WealthFinancialPage from '@pages/wealth/WealthFinancialPage';
import WealthOwnershipPage from '@pages/wealth/WealthOwnershipPage';
import WealthCirculationPage from '@pages/wealth/WealthCirculationPage';
import EnvironmentResourcePage from '@pages/environment/EnvironmentResourcePage';
import EnvironmentWastePage from '@pages/environment/EnvironmentWastePage';
import EnvironmentEcosystemPage from '@pages/environment/EnvironmentEcosystemPage';
import EnvironmentSourcingPage from '@pages/environment/EnvironmentSourcingPage';
import CollectivePage from '@pages/ummah/CollectivePage';
// Moontrance Land/Seasonal/Residency pull in heavy LevelNavigator data.
// Lazy-load so the chunk only ships when those routes are visited.
const MoontraceLandPage = lazy(() => import('@pages/ummah/MoontraceLandPage'));
const MoontranceSeasonalPage = lazy(() => import('@pages/ummah/MoontranceSeasonalPage'));
const MoontranceResidencyPage = lazy(() => import('@pages/ummah/MoontranceResidencyPage'));
import OgdenFoundationPage from '@pages/ogden/OgdenFoundationPage';
import OgdenIntegrationPage from '@pages/ogden/OgdenIntegrationPage';
import OgdenRealizationPage from '@pages/ogden/OgdenRealizationPage';
import OgdenBbosPage from '@pages/ogden/OgdenBbosPage';
import OgdenMilosPage from '@pages/ogden/OgdenMilosPage';
import OgdenAtlasPage from '@pages/ogden/OgdenAtlasPage';
import OgdenPresentationPage from '@pages/ogden/OgdenPresentationPage';
import PillarDashboard from '@pages/PillarDashboard';
import FaithDashboard from '@pages/faith/FaithDashboard';
import HealthDashboard from '@pages/health/HealthDashboard';
import IntellectDashboard from '@pages/intellect/IntellectDashboard';
import FamilyDashboard from '@pages/family/FamilyDashboard';
import EnvironmentDashboard from '@pages/environment/EnvironmentDashboard';
import UmmahDashboard from '@pages/ummah/UmmahDashboard';
import MoontraceDashboard from '@pages/moontrance/MoontraceDashboard';
import Settings from '@pages/Settings';
import ModulePlaceholder from '@pages/ModulePlaceholder';
import PropheticPathPage from '@pages/PropheticPathPage';
import CeremonyGuard from '@components/islamic/CeremonyGuard';
import CeremonyGuardDynamic from '@components/islamic/CeremonyGuardDynamic';
import ProjectBoard from '@components/work/ProjectBoard';
import AssetsTab from '@components/money/AssetsTab';
import ProjectJournal from '@components/journal/ProjectJournal';
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
  return (
    <ChunkErrorBoundary>
    <Suspense fallback={<RouteSpinner />}>
    <Routes>
      <Route path="/" element={<Landing />} />
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
        <Route path="prophetic-path" element={<PropheticPathPage />} />
        <Route path="prophetic-path-test" element={<Navigate to="/app/prophetic-path" replace />} />
        <Route path=":moduleId" element={<CeremonyGuardDynamic><ModulePlaceholder /></CeremonyGuardDynamic>} />
      </Route>
    </Routes>
    </Suspense>
    </ChunkErrorBoundary>
  );
}
