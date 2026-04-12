import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@store/auth-store';
import Landing from '@pages/Landing';
import Onboarding from '@pages/Onboarding';
import AppShell from '@components/layout/AppShell';
import Dashboard from '@pages/Dashboard';
import Work from '@pages/modules/Work';
import Project from '@pages/modules/Project';
import Money from '@pages/modules/Money';
import People from '@pages/modules/People';
import Office from '@pages/modules/Office';
import Tech from '@pages/modules/Tech';
import FamilyPage from '@pages/ummah/FamilyPage';
import Neighbors from '@pages/ummah/Neighbors';
import Community from '@pages/ummah/Community';
import SourcesPage from '@pages/islamic/SourcesPage';
import FaithCorePage from '@pages/faith/FaithCorePage';
import FaithGrowthPage from '@pages/faith/FaithGrowthPage';
import FaithExcellencePage from '@pages/faith/FaithExcellencePage';
import FaithShahadaPage from '@pages/faith/FaithShahadaPage';
import FaithSalahPage from '@pages/faith/FaithSalahPage';
import FaithZakahPage from '@pages/faith/FaithZakahPage';
import FaithSawmPage from '@pages/faith/FaithSawmPage';
import FaithHajjPage from '@pages/faith/FaithHajjPage';
import LifePhysicalPage from '@pages/life/LifePhysicalPage';
import LifeMentalPage from '@pages/life/LifeMentalPage';
import LifeSafetyPage from '@pages/life/LifeSafetyPage';
import LifeSocialPage from '@pages/life/LifeSocialPage';
import IntellectLearningPage from '@pages/intellect/IntellectLearningPage';
import IntellectThinkingPage from '@pages/intellect/IntellectThinkingPage';
import IntellectCognitivePage from '@pages/intellect/IntellectCognitivePage';
import IntellectProfessionalPage from '@pages/intellect/IntellectProfessionalPage';
import FamilyMarriagePage from '@pages/family/FamilyMarriagePage';
import FamilyParentingPage from '@pages/family/FamilyParentingPage';
import FamilyKinshipPage from '@pages/family/FamilyKinshipPage';
import FamilyHomePage from '@pages/family/FamilyHomePage';
import WealthEarningPage from '@pages/wealth/WealthEarningPage';
import WealthFinancialPage from '@pages/wealth/WealthFinancialPage';
import WealthOwnershipPage from '@pages/wealth/WealthOwnershipPage';
import WealthCirculationPage from '@pages/wealth/WealthCirculationPage';
import EnvironmentResourcePage from '@pages/environment/EnvironmentResourcePage';
import EnvironmentWastePage from '@pages/environment/EnvironmentWastePage';
import EnvironmentEcosystemPage from '@pages/environment/EnvironmentEcosystemPage';
import EnvironmentSourcingPage from '@pages/environment/EnvironmentSourcingPage';
import CollectivePage from '@pages/ummah/CollectivePage';
import PillarDashboard from '@pages/PillarDashboard';
import FaithDashboard from '@pages/faith/FaithDashboard';
import LifeDashboard from '@pages/life/LifeDashboard';
import IntellectDashboard from '@pages/intellect/IntellectDashboard';
import FamilyDashboard from '@pages/family/FamilyDashboard';
import WealthDashboard from '@pages/wealth/WealthDashboard';
import EnvironmentDashboard from '@pages/environment/EnvironmentDashboard';
import UmmahDashboard from '@pages/ummah/UmmahDashboard';
import Settings from '@pages/Settings';
import ModulePlaceholder from '@pages/ModulePlaceholder';
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/get-started" element={<Onboarding />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:projectId" element={<Project />}>
          <Route path="people" element={<People embedded />} />
          <Route path="tasks" element={<ProjectTasks />} />
          <Route path="money" element={<Money embedded />} />
          <Route path="assets" element={<ProjectAssets />} />
          <Route path="office" element={<Office embedded />} />
          <Route path="tech" element={<Tech embedded />} />
          <Route path="journal" element={<ProjectJournal />} />
        </Route>
        <Route path="money" element={<Money />} />
        <Route path="people" element={<People />} />
        <Route path="office" element={<Office />} />
        <Route path="tech" element={<Tech />} />
        <Route path="family" element={<FamilyPage />} />
        <Route path="neighbors" element={<Neighbors />} />
        <Route path="community" element={<Community />} />
        <Route path="sources" element={<SourcesPage />} />
        <Route path="quran" element={<Navigate to="/app/sources?tab=quran" replace />} />
        <Route path="hadith" element={<Navigate to="/app/sources?tab=hadith" replace />} />
        <Route path="islamic-knowledge" element={<Navigate to="/app/sources?tab=islamic-knowledge" replace />} />
        <Route path="faith-core" element={<FaithCorePage />} />
        <Route path="faith-growth" element={<FaithGrowthPage />} />
        <Route path="faith-excellence" element={<FaithExcellencePage />} />
        <Route path="faith-shahada" element={<FaithShahadaPage />} />
        <Route path="faith-salah" element={<FaithSalahPage />} />
        <Route path="faith-zakah" element={<FaithZakahPage />} />
        <Route path="faith-sawm" element={<FaithSawmPage />} />
        <Route path="faith-hajj" element={<FaithHajjPage />} />
        <Route path="life-physical" element={<LifePhysicalPage />} />
        <Route path="life-mental" element={<LifeMentalPage />} />
        <Route path="life-safety" element={<LifeSafetyPage />} />
        <Route path="life-social" element={<LifeSocialPage />} />
        <Route path="intellect-learning" element={<IntellectLearningPage />} />
        <Route path="intellect-thinking" element={<IntellectThinkingPage />} />
        <Route path="intellect-cognitive" element={<IntellectCognitivePage />} />
        <Route path="intellect-professional" element={<IntellectProfessionalPage />} />
        <Route path="family-marriage" element={<FamilyMarriagePage />} />
        <Route path="family-parenting" element={<FamilyParentingPage />} />
        <Route path="family-kinship" element={<FamilyKinshipPage />} />
        <Route path="family-home" element={<FamilyHomePage />} />
        <Route path="family-office" element={<Office embedded />} />
        <Route path="wealth-earning" element={<WealthEarningPage />} />
        <Route path="wealth-financial" element={<WealthFinancialPage />} />
        <Route path="wealth-ownership" element={<WealthOwnershipPage />} />
        <Route path="wealth-circulation" element={<WealthCirculationPage />} />
        <Route path="env-resource" element={<EnvironmentResourcePage />} />
        <Route path="env-waste" element={<EnvironmentWastePage />} />
        <Route path="env-ecosystem" element={<EnvironmentEcosystemPage />} />
        <Route path="env-sourcing" element={<EnvironmentSourcingPage />} />
        <Route path="collective" element={<CollectivePage />} />
        <Route path="pillar/faith" element={<FaithCorePage />} />
        <Route path="pillar/life" element={<LifeDashboard />} />
        <Route path="pillar/intellect" element={<IntellectDashboard />} />
        <Route path="pillar/family" element={<FamilyDashboard />} />
        <Route path="pillar/wealth" element={<WealthDashboard />} />
        <Route path="pillar/environment" element={<EnvironmentDashboard />} />
        <Route path="pillar/ummah" element={<UmmahDashboard />} />
        <Route path="pillar/:pillarId" element={<PillarDashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path=":moduleId" element={<ModulePlaceholder />} />
      </Route>
    </Routes>
  );
}
