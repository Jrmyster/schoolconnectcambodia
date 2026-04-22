import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components (eager — needed on every page or for the shell)
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatPanel } from "@/components/AIChatPanel";
import { PWAStatusBar } from "@/components/PWAStatusBar";
import { AdminRoute } from "@/components/AdminRoute";
import { HeatSafetyAlert } from "@/components/HeatSafetyAlert";
import { MascotCheer } from "@/components/MascotCheer";
import { BackToTop } from "@/components/BackToTop";

// Auth
import { AuthProvider } from "@/context/AuthContext";

// ── Route-level code splitting ────────────────────────────────────────────────
// Every page is dynamically imported so that visitors on slow 3G connections
// only download the JS for the page they actually open. Named exports are
// re-shaped to default exports inside the loader so React.lazy can use them.

// Default exports
const OceanographyPage          = lazy(() => import("@/pages/OceanographyPage"));
const WeatherPage               = lazy(() => import("@/pages/WeatherPage"));
const SnowPage                  = lazy(() => import("@/pages/SnowPage").then(m => ({ default: m.SnowPage })));
const QuantumLimitPage          = lazy(() => import("@/pages/QuantumLimitPage"));
const MagnetsPage               = lazy(() => import("@/pages/MagnetsPage"));
const HvacPage                  = lazy(() => import("@/pages/HvacPage"));
const AviationPage              = lazy(() => import("@/pages/AviationPage"));
const MusicTheoryPage           = lazy(() => import("@/pages/MusicTheoryPage"));
const MathematicsPage           = lazy(() => import("@/pages/MathematicsPage"));
const LogarithmsPage            = lazy(() => import("@/pages/LogarithmsPage").then(m => ({ default: m.LogarithmsPage })));
const SurvivalSkillsPage        = lazy(() => import("@/pages/SurvivalSkillsPage").then(m => ({ default: m.SurvivalSkillsPage })));
const NanotechnologyPage        = lazy(() => import("@/pages/NanotechnologyPage").then(m => ({ default: m.NanotechnologyPage })));
const RadarPage                 = lazy(() => import("@/pages/RadarPage").then(m => ({ default: m.RadarPage })));
const TelevisionPage            = lazy(() => import("@/pages/TelevisionPage").then(m => ({ default: m.TelevisionPage })));
const FutureIntelligencePage    = lazy(() => import("@/pages/FutureIntelligencePage").then(m => ({ default: m.FutureIntelligencePage })));
const LanguagesWorldPage        = lazy(() => import("@/pages/LanguagesWorldPage").then(m => ({ default: m.LanguagesWorldPage })));
const BehaviorismPage           = lazy(() => import("@/pages/BehaviorismPage").then(m => ({ default: m.BehaviorismPage })));
const UnitedStatesPage          = lazy(() => import("@/pages/UnitedStatesPage").then(m => ({ default: m.UnitedStatesPage })));
const GlobalConflictsPage       = lazy(() => import("@/pages/GlobalConflictsPage").then(m => ({ default: m.GlobalConflictsPage })));
const TrainsRailwaysPage        = lazy(() => import("@/pages/TrainsRailwaysPage").then(m => ({ default: m.TrainsRailwaysPage })));
const LinguisticsPage           = lazy(() => import("@/pages/LinguisticsPage").then(m => ({ default: m.LinguisticsPage })));
const CambodiaPage              = lazy(() => import("@/pages/CambodiaPage").then(m => ({ default: m.CambodiaPage })));
const EnergyFuturePage          = lazy(() => import("@/pages/EnergyFuturePage").then(m => ({ default: m.EnergyFuturePage })));
const PublicHealthPage          = lazy(() => import("@/pages/PublicHealthPage").then(m => ({ default: m.PublicHealthPage })));
const CompetitionCooperationPage = lazy(() => import("@/pages/CompetitionCooperationPage").then(m => ({ default: m.CompetitionCooperationPage })));
const BotanyPage                 = lazy(() => import("@/pages/BotanyPage").then(m => ({ default: m.BotanyPage })));
const GeologicalWondersPage      = lazy(() => import("@/pages/GeologicalWondersPage").then(m => ({ default: m.GeologicalWondersPage })));
const ArtOfLearningPage         = lazy(() => import("@/pages/ArtOfLearningPage"));
const PathwayToMedicinePage     = lazy(() => import("@/pages/PathwayToMedicinePage"));
const HumanEnginePage           = lazy(() => import("@/pages/HumanEnginePage"));
const WildlifeExplorerPage      = lazy(() => import("@/pages/WildlifeExplorerPage"));
const FossilFuelsPage           = lazy(() => import("@/pages/FossilFuelsPage"));
const BicyclePhysicsPage        = lazy(() => import("@/pages/BicyclePhysicsPage"));
const RoboticsPage              = lazy(() => import("@/pages/RoboticsPage"));
const VideoGamesPage            = lazy(() => import("@/pages/VideoGamesPage"));
const SpellingForgePage         = lazy(() => import("@/pages/SpellingForgePage"));
const SexualHealthPage          = lazy(() => import("@/pages/SexualHealthPage"));
const GlobalCitiesPage          = lazy(() => import("@/pages/GlobalCitiesPage"));
const CinematographyPage        = lazy(() => import("@/pages/CinematographyPage"));
const BeginnerGuidePage         = lazy(() => import("@/pages/BeginnerGuidePage"));
const WorldHistoryPage          = lazy(() => import("@/pages/WorldHistoryPage"));
const NotFound                  = lazy(() => import("@/pages/not-found"));

// Named exports — wrapped to look like default exports
const Home                      = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const MapPage                   = lazy(() => import("@/pages/MapPage").then(m => ({ default: m.MapPage })));
const BrowseNeeds               = lazy(() => import("@/pages/BrowseNeeds").then(m => ({ default: m.BrowseNeeds })));
const CompletedProjects         = lazy(() => import("@/pages/CompletedProjects").then(m => ({ default: m.CompletedProjects })));
const Admin                     = lazy(() => import("@/pages/Admin").then(m => ({ default: m.Admin })));
const AdminDashboard            = lazy(() => import("@/pages/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const Login                     = lazy(() => import("@/pages/Login").then(m => ({ default: m.Login })));
const ForgotPassword            = lazy(() => import("@/pages/ForgotPassword").then(m => ({ default: m.ForgotPassword })));
const ResetPassword             = lazy(() => import("@/pages/ResetPassword").then(m => ({ default: m.ResetPassword })));
const SchoolProfile             = lazy(() => import("@/pages/SchoolProfile").then(m => ({ default: m.SchoolProfile })));
const CharityDirectory          = lazy(() => import("@/pages/CharityDirectory").then(m => ({ default: m.CharityDirectory })));
const LaunchpadPage             = lazy(() => import("@/pages/LaunchpadPage").then(m => ({ default: m.LaunchpadPage })));
const SanctuaryPage             = lazy(() => import("@/pages/SanctuaryPage").then(m => ({ default: m.SanctuaryPage })));
const AlumniPage                = lazy(() => import("@/pages/AlumniPage").then(m => ({ default: m.AlumniPage })));
const SafetyPage                = lazy(() => import("@/pages/SafetyPage").then(m => ({ default: m.SafetyPage })));
const ExamPrepPage              = lazy(() => import("@/pages/ExamPrepPage").then(m => ({ default: m.ExamPrepPage })));
const EnglishWritingPage        = lazy(() => import("@/pages/EnglishWritingPage").then(m => ({ default: m.EnglishWritingPage })));
const SubmitStoryPage           = lazy(() => import("@/pages/SubmitStoryPage").then(m => ({ default: m.SubmitStoryPage })));
const SubmitNeedPage            = lazy(() => import("@/pages/SubmitNeedPage").then(m => ({ default: m.SubmitNeedPage })));
const SpacePage                 = lazy(() => import("@/pages/SpacePage").then(m => ({ default: m.SpacePage })));
const ProfilePage               = lazy(() => import("@/pages/ProfilePage").then(m => ({ default: m.ProfilePage })));
const ScientificLiteracyPage    = lazy(() => import("@/pages/ScientificLiteracyPage").then(m => ({ default: m.ScientificLiteracyPage })));
const ReadingListPage           = lazy(() => import("@/pages/ReadingListPage").then(m => ({ default: m.ReadingListPage })));
const Dashboard                 = lazy(() => import("@/pages/Dashboard").then(m => ({ default: m.Dashboard })));
const FinLitIntroPage           = lazy(() => import("@/pages/FinLitIntroPage").then(m => ({ default: m.FinLitIntroPage })));
const SchoolInbox               = lazy(() => import("@/pages/SchoolInbox").then(m => ({ default: m.SchoolInbox })));
const ElectricalSafetyPage      = lazy(() => import("@/pages/ElectricalSafetyPage").then(m => ({ default: m.ElectricalSafetyPage })));
const ChemistryHubPage          = lazy(() => import("@/pages/ChemistryHubPage").then(m => ({ default: m.ChemistryHubPage })));
const OrganicChemistry101Page   = lazy(() => import("@/pages/OrganicChemistry101Page").then(m => ({ default: m.OrganicChemistry101Page })));
const InorganicChemistry101Page = lazy(() => import("@/pages/InorganicChemistry101Page").then(m => ({ default: m.InorganicChemistry101Page })));
const PhysicalChemistry101Page  = lazy(() => import("@/pages/PhysicalChemistry101Page").then(m => ({ default: m.PhysicalChemistry101Page })));
const AnalyticalChemistry101Page = lazy(() => import("@/pages/AnalyticalChemistry101Page").then(m => ({ default: m.AnalyticalChemistry101Page })));
const BiochemistryPage          = lazy(() => import("@/pages/BiochemistryPage").then(m => ({ default: m.BiochemistryPage })));
const ChemistryBuildingBlocksPage = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryBuildingBlocksPage })));
const ChemistryReactionsPage    = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryReactionsPage })));
const ChemistryAdvancedPage     = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryAdvancedPage })));
const ChemistryRealWorldPage    = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryRealWorldPage })));
const FunLabPage                = lazy(() => import("@/pages/FunLabPage").then(m => ({ default: m.FunLabPage })));
const PhysicsHubPage            = lazy(() => import("@/pages/PhysicsHubPage").then(m => ({ default: m.PhysicsHubPage })));
const PhysicsModulePlaceholder  = lazy(() => import("@/pages/PhysicsHubPage").then(m => ({ default: m.PhysicsModulePlaceholder })));
const BiologyHubPage            = lazy(() => import("@/pages/BiologyHubPage").then(m => ({ default: m.BiologyHubPage })));
const GeologyHubPage            = lazy(() => import("@/pages/GeologyHubPage").then(m => ({ default: m.GeologyHubPage })));
const DisasterPrepPage          = lazy(() => import("@/pages/DisasterPrepPage").then(m => ({ default: m.DisasterPrepPage })));
const HowComputersWorkPage      = lazy(() => import("@/pages/HowComputersWorkPage").then(m => ({ default: m.HowComputersWorkPage })));
const PhysicsMotionPage         = lazy(() => import("@/pages/PhysicsMotionPage").then(m => ({ default: m.PhysicsMotionPage })));
const PhysicsForcesPage         = lazy(() => import("@/pages/PhysicsForcesPage").then(m => ({ default: m.PhysicsForcesPage })));
const PhysicsEnergyPage         = lazy(() => import("@/pages/PhysicsEnergyPage").then(m => ({ default: m.PhysicsEnergyPage })));
const PhysicsWavesPage          = lazy(() => import("@/pages/PhysicsWavesPage").then(m => ({ default: m.PhysicsWavesPage })));
const SimpleMachinesPage        = lazy(() => import("@/pages/SimpleMachinesPage").then(m => ({ default: m.SimpleMachinesPage })));
const MaterialsSciencePage      = lazy(() => import("@/pages/MaterialsSciencePage").then(m => ({ default: m.MaterialsSciencePage })));
const ArchitectureStrengthPage  = lazy(() => import("@/pages/ArchitectureStrengthPage").then(m => ({ default: m.ArchitectureStrengthPage })));
const GlaciologyPage             = lazy(() => import("@/pages/GlaciologyPage").then(m => ({ default: m.GlaciologyPage })));
const NeurologyPage             = lazy(() => import("@/pages/NeurologyPage").then(m => ({ default: m.NeurologyPage })));
const ImpactReportPage          = lazy(() => import("@/pages/ImpactReportPage").then(m => ({ default: m.ImpactReportPage })));
const PhilosophyPage            = lazy(() => import("@/pages/PhilosophyPage").then(m => ({ default: m.PhilosophyPage })));
const SociologyPage             = lazy(() => import("@/pages/SociologyPage").then(m => ({ default: m.SociologyPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Bilingual loading fallback — kept tiny so it ships in the main bundle.
function PageLoading() {
  return (
    <div
      className="min-h-[60vh] grid place-items-center text-slate-600 text-sm"
      role="status"
      aria-live="polite"
    >
      <span>Loading… <span className="font-khmer">កំពុង​ផ្ទុក…</span></span>
    </div>
  );
}

/**
 * Resets the window scroll position to the top on every route change.
 * Without this, wouter (like most SPA routers) preserves the previous page's
 * scroll offset, so a user who clicked a nav link from the bottom of one page
 * would land mid-way down the next one.
 *
 * Uses `behavior: "instant"` so the new page appears at the top immediately
 * rather than animating — users perceive it as a normal page navigation.
 *
 * Skips the reset when the URL contains a hash (e.g. /page#section), so
 * in-page anchor links continue to work as expected.
 */
function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <PWAStatusBar />
      <Navbar />
      <HeatSafetyAlert />
      <main className="flex-grow">
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/map" component={MapPage} />
            <Route path="/needs" component={BrowseNeeds} />
            <Route path="/projects" component={CompletedProjects} />
            <Route path="/impact" component={ImpactReportPage} />
            <Route path="/world-history" component={WorldHistoryPage} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/school/:id" component={SchoolProfile} />
            <Route path="/charities" component={CharityDirectory} />
            <Route path="/launchpad" component={LaunchpadPage} />
            <Route path="/sanctuary" component={SanctuaryPage} />
            <Route path="/alumni" component={AlumniPage} />
            <Route path="/safety" component={SafetyPage} />
            <Route path="/exam-prep" component={ExamPrepPage} />
            <Route path="/english-writing" component={EnglishWritingPage} />
            <Route path="/submit-story" component={SubmitStoryPage} />
            <Route path="/submit-need" component={SubmitNeedPage} />
            <Route path="/space" component={SpacePage} />
            <Route path="/oceanography" component={OceanographyPage} />
            <Route path="/weather" component={WeatherPage} />
            <Route path="/weather/snow" component={SnowPage} />
            <Route path="/quantum-limit" component={QuantumLimitPage} />
            <Route path="/magnets" component={MagnetsPage} />
            <Route path="/hvac" component={HvacPage} />
            <Route path="/aviation" component={AviationPage} />
            <Route path="/music-theory" component={MusicTheoryPage} />
            <Route path="/mathematics" component={MathematicsPage} />
            <Route path="/mathematics/logarithms" component={LogarithmsPage} />
            <Route path="/well-being/survival-skills" component={SurvivalSkillsPage} />
            <Route path="/technology/nanotechnology" component={NanotechnologyPage} />
            <Route path="/technology/radar" component={RadarPage} />
            <Route path="/technology/television" component={TelevisionPage} />
            <Route path="/technology/future-intelligence" component={FutureIntelligencePage} />
            <Route path="/study-center/languages" component={LanguagesWorldPage} />
            <Route path="/study-center/behaviorism" component={BehaviorismPage} />
            <Route path="/study-center/united-states" component={UnitedStatesPage} />
            <Route path="/study-center/global-conflicts" component={GlobalConflictsPage} />
            <Route path="/science/trains-railways" component={TrainsRailwaysPage} />
            <Route path="/study-center/linguistics" component={LinguisticsPage} />
            <Route path="/cambodia" component={CambodiaPage} />
            <Route path="/science/energy-future" component={EnergyFuturePage} />
            <Route path="/well-being/public-health" component={PublicHealthPage} />
            <Route path="/study-center/competition-cooperation" component={CompetitionCooperationPage} />
            <Route path="/biology/botany" component={BotanyPage} />
            <Route path="/geology/wonders" component={GeologicalWondersPage} />
            <Route path="/art-of-learning" component={ArtOfLearningPage} />
            <Route path="/pathway-to-medicine" component={PathwayToMedicinePage} />
            <Route path="/human-engine" component={HumanEnginePage} />
            <Route path="/study-center/wildlife-explorer" component={WildlifeExplorerPage} />
            <Route path="/fossil-fuels" component={FossilFuelsPage} />
            <Route path="/physics/bicycle" component={BicyclePhysicsPage} />
            <Route path="/robotics" component={RoboticsPage} />
            <Route path="/video-games" component={VideoGamesPage} />
            <Route path="/spelling-forge" component={SpellingForgePage} />
            <Route path="/sexual-health" component={SexualHealthPage} />
            <Route path="/global-cities" component={GlobalCitiesPage} />
            <Route path="/cinematography" component={CinematographyPage} />
            <Route path="/science" component={ScientificLiteracyPage} />
            <Route path="/reading-list" component={ReadingListPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/finlit-intro" component={FinLitIntroPage} />
            <Route path="/school-inbox" component={SchoolInbox} />
            <Route path="/electrical-safety" component={ElectricalSafetyPage} />
            <Route path="/chemistry" component={ChemistryHubPage} />
            <Route path="/chemistry/building-blocks" component={ChemistryBuildingBlocksPage} />
            <Route path="/chemistry/reactions-math" component={ChemistryReactionsPage} />
            <Route path="/chemistry/advanced" component={ChemistryAdvancedPage} />
            <Route path="/chemistry/real-world" component={ChemistryRealWorldPage} />
            <Route path="/chemistry/organic-101" component={OrganicChemistry101Page} />
            <Route path="/science/chemistry/inorganic" component={InorganicChemistry101Page} />
            <Route path="/chemistry/inorganic-101" component={InorganicChemistry101Page} />
            <Route path="/science/chemistry/physical" component={PhysicalChemistry101Page} />
            <Route path="/chemistry/physical-101" component={PhysicalChemistry101Page} />
            <Route path="/science/chemistry/analytical" component={AnalyticalChemistry101Page} />
            <Route path="/chemistry/analytical" component={AnalyticalChemistry101Page} />
            <Route path="/science/chemistry/biochemistry" component={BiochemistryPage} />
            <Route path="/chemistry/biochemistry" component={BiochemistryPage} />
            <Route path="/fun-lab" component={FunLabPage} />
            <Route path="/physics" component={PhysicsHubPage} />
            <Route path="/physics/motion" component={PhysicsMotionPage} />
            <Route path="/physics/forces" component={PhysicsForcesPage} />
            <Route path="/physics/energy" component={PhysicsEnergyPage} />
            <Route path="/physics/waves" component={PhysicsWavesPage} />
            <Route path="/physics/simple-machines" component={SimpleMachinesPage} />
            <Route path="/science/materials" component={MaterialsSciencePage} />
            <Route path="/science/architecture" component={ArchitectureStrengthPage} />
            <Route path="/science/glaciology" component={GlaciologyPage} />
            <Route path="/science/neurology" component={NeurologyPage} />
            <Route path="/physics/:slug" component={PhysicsModulePlaceholder} />
            <Route path="/biology" component={BiologyHubPage} />
            <Route path="/geology" component={GeologyHubPage} />
            <Route path="/disaster-prep" component={DisasterPrepPage} />
            <Route path="/how-computers-work" component={HowComputersWorkPage} />
            <Route path="/beginner-guide" component={BeginnerGuidePage} />
            <Route path="/study-center/philosophy" component={PhilosophyPage} />
            <Route path="/study-center/sociology" component={SociologyPage} />
            <Route path="/admin/dashboard">
              {() => <AdminRoute component={AdminDashboard} />}
            </Route>
            <Route path="/admin">
              {() => <AdminRoute component={Admin} />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
          <AIChatPanel />
          <MascotCheer />
          <BackToTop />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
