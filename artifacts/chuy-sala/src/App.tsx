import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Components (eager — needed on every page or for the shell)
import { Navbar } from "@/components/layout/Navbar";
import { STIBanner } from "@/components/STIBanner";
import { RouteTracker } from "@/components/RouteTracker";
import { Footer } from "@/components/layout/Footer";
import { AIChatPanel } from "@/components/AIChatPanel";
import { PWAStatusBar } from "@/components/PWAStatusBar";
import { AdminRoute } from "@/components/AdminRoute";
import { HeatSafetyAlert } from "@/components/HeatSafetyAlert";
import { MascotCheer } from "@/components/MascotCheer";
import { BackToTop } from "@/components/BackToTop";
import { RouteScopedErrorBoundary } from "@/components/RouteErrorBoundary";

// Auth
import { AuthProvider } from "@/context/AuthContext";

// ── Route-level code splitting ────────────────────────────────────────────────
// Every page is dynamically imported so that visitors on slow 3G connections
// only download the JS for the page they actually open. Named exports are
// re-shaped to default exports inside the loader so React.lazy can use them.

// Default exports
const MindGym                   = lazy(() => import("@/pages/MindGym"));
const SoftSkills                = lazy(() => import("@/pages/SoftSkills"));
const OceanographyPage          = lazy(() => import("@/pages/OceanographyPage"));
const HorologyPage              = lazy(() => import("@/pages/HorologyPage"));
const ThreeDPrintingPage        = lazy(() => import("@/pages/ThreeDPrintingPage"));
const MaritimeTechPage          = lazy(() => import("@/pages/MaritimeTechPage"));
const ResumeBuilderPage         = lazy(() => import("@/pages/ResumeBuilderPage"));
const WeatherPage               = lazy(() => import("@/pages/WeatherPage"));
const SnowPage                  = lazy(() => import("@/pages/SnowPage").then(m => ({ default: m.SnowPage })));
const QuantumLimitPage          = lazy(() => import("@/pages/QuantumLimitPage"));
const MagnetsPage               = lazy(() => import("@/pages/MagnetsPage"));
const HvacPage                  = lazy(() => import("@/pages/HvacPage"));
const VacuumCleanerPage         = lazy(() => import("@/pages/VacuumCleanerPage").then(m => ({ default: m.VacuumCleanerPage })));
const AviationPage              = lazy(() => import("@/pages/AviationPage"));
const MusicTheoryPage           = lazy(() => import("@/pages/MusicTheoryPage"));
const MathematicsPage           = lazy(() => import("@/pages/MathematicsPage"));
const GeometryPage              = lazy(() => import("@/pages/GeometryPage"));
const LogarithmsPage            = lazy(() => import("@/pages/LogarithmsPage").then(m => ({ default: m.LogarithmsPage })));
const LimitsDerivativesPage     = lazy(() => import("@/pages/LimitsDerivativesPage").then(m => ({ default: m.LimitsDerivativesPage })));
const IntegralsPage             = lazy(() => import("@/pages/IntegralsPage").then(m => ({ default: m.IntegralsPage })));
const AdvancedMathPage          = lazy(() => import("@/pages/AdvancedMathPage").then(m => ({ default: m.AdvancedMathPage })));
const TensorsPage               = lazy(() => import("@/pages/TensorsPage"));
const SurvivalSkillsPage        = lazy(() => import("@/pages/SurvivalSkillsPage").then(m => ({ default: m.SurvivalSkillsPage })));
const NanotechnologyPage        = lazy(() => import("@/pages/NanotechnologyPage").then(m => ({ default: m.NanotechnologyPage })));
const RadioTechPage             = lazy(() => import("@/pages/RadioTechPage"));
const MassProductionPage        = lazy(() => import("@/pages/MassProductionPage"));
const ElectromagnetismPage      = lazy(() => import("@/pages/ElectromagnetismPage"));
const HeisenbergPage            = lazy(() => import("@/pages/HeisenbergPage"));
const LanguageRealityPage       = lazy(() => import("@/pages/LanguageRealityPage"));
const DentistryPage             = lazy(() => import("@/pages/DentistryPage"));
const VeterinaryMedicinePage    = lazy(() => import("@/pages/VeterinaryMedicinePage"));
const ArchaeologyPaleontologyPage = lazy(() => import("@/pages/ArchaeologyPaleontologyPage"));
const WomenInSciencePage        = lazy(() => import("@/pages/WomenInSciencePage"));
const FourierTransformPage      = lazy(() => import("@/pages/FourierTransformPage"));
const NavierStokesPage          = lazy(() => import("@/pages/NavierStokesPage"));
const ElectricalEngineeringPage = lazy(() => import("@/pages/ElectricalEngineeringPage"));
const CirculatorySystemPage     = lazy(() => import("@/pages/CirculatorySystemPage"));
const LymphaticSystemPage       = lazy(() => import("@/pages/LymphaticSystemPage"));
const IntegumentarySystemPage   = lazy(() => import("@/pages/IntegumentarySystemPage"));
const KesslerSyndromePage       = lazy(() => import("@/pages/KesslerSyndromePage"));
const FlameTestPage             = lazy(() => import("@/pages/FlameTestPage"));
const RayleighScatteringPage    = lazy(() => import("@/pages/RayleighScatteringPage"));
const EuropeHistoryPage         = lazy(() => import("@/pages/EuropeHistoryPage"));
const AfricaGeographyPage       = lazy(() => import("@/pages/AfricaGeographyPage").then(m => ({ default: m.AfricaGeographyPage })));
const AsiaContinentPage         = lazy(() => import("@/pages/AsiaContinentPage").then(m => ({ default: m.AsiaContinentPage })));
const GlobalAtlasPage           = lazy(() => import("@/pages/GlobalAtlas"));
const WorldTimelinePage         = lazy(() => import("@/pages/WorldTimeline"));
const LatinAmericaPage          = lazy(() => import("@/pages/LatinAmericaPage").then(m => ({ default: m.LatinAmericaPage })));
const CoordinatesPage           = lazy(() => import("@/pages/CoordinatesPage").then(m => ({ default: m.CoordinatesPage })));
const CrisprPage                = lazy(() => import("@/pages/CrisprPage"));
const CellDivisionPage          = lazy(() => import("@/pages/CellDivisionPage"));
const RomanEmpirePage           = lazy(() => import("@/pages/RomanEmpirePage"));
const TwentiethCenturyMusicPage = lazy(() => import("@/pages/TwentiethCenturyMusicPage"));
const RadarPage                 = lazy(() => import("@/pages/RadarPage").then(m => ({ default: m.RadarPage })));
const TelevisionPage            = lazy(() => import("@/pages/TelevisionPage").then(m => ({ default: m.TelevisionPage })));
const FutureIntelligencePage    = lazy(() => import("@/pages/FutureIntelligencePage").then(m => ({ default: m.FutureIntelligencePage })));
const CellularPowerPlantPage    = lazy(() => import("@/pages/CellularPowerPlantPage").then(m => ({ default: m.CellularPowerPlantPage })));
const StrengthEndurancePage     = lazy(() => import("@/pages/StrengthEndurancePage").then(m => ({ default: m.StrengthEndurancePage })));
const AuthorityConformityPage   = lazy(() => import("@/pages/AuthorityConformityPage").then(m => ({ default: m.AuthorityConformityPage })));
const LanguagesWorldPage        = lazy(() => import("@/pages/LanguagesWorldPage").then(m => ({ default: m.LanguagesWorldPage })));
const BehaviorismPage           = lazy(() => import("@/pages/BehaviorismPage").then(m => ({ default: m.BehaviorismPage })));
const UnitedStatesPage          = lazy(() => import("@/pages/UnitedStatesPage").then(m => ({ default: m.UnitedStatesPage })));
const GlobalConflictsPage       = lazy(() => import("@/pages/GlobalConflictsPage").then(m => ({ default: m.GlobalConflictsPage })));
const GlobalDiplomacyPage       = lazy(() => import("@/pages/GlobalDiplomacyPage").then(m => ({ default: m.GlobalDiplomacyPage })));
const TrainsRailwaysPage        = lazy(() => import("@/pages/TrainsRailwaysPage").then(m => ({ default: m.TrainsRailwaysPage })));
const LinguisticsPage           = lazy(() => import("@/pages/LinguisticsPage").then(m => ({ default: m.LinguisticsPage })));
const CambodiaPage              = lazy(() => import("@/pages/CambodiaPage").then(m => ({ default: m.CambodiaPage })));
const EnergyFuturePage          = lazy(() => import("@/pages/EnergyFuturePage").then(m => ({ default: m.EnergyFuturePage })));
const PublicHealthPage          = lazy(() => import("@/pages/PublicHealthPage").then(m => ({ default: m.PublicHealthPage })));
const DiseaseDividePage         = lazy(() => import("@/pages/DiseaseDividePage").then(m => ({ default: m.DiseaseDividePage })));
const AddictionSciencePage      = lazy(() => import("@/pages/AddictionSciencePage"));
const CompetitionCooperationPage = lazy(() => import("@/pages/CompetitionCooperationPage").then(m => ({ default: m.CompetitionCooperationPage })));
const EndocrineSystemPage        = lazy(() => import("@/pages/EndocrineSystemPage"));
const ImmuneSystemPage           = lazy(() => import("@/pages/ImmuneSystemPage"));
const SkeletalSystemPage         = lazy(() => import("@/pages/SkeletalSystemPage"));
const RespiratorySystemPage      = lazy(() => import("@/pages/RespiratorySystemPage"));
const DigestiveSystemPage        = lazy(() => import("@/pages/Science/DigestiveSystem"));
const ReproductiveSystem         = lazy(() => import("@/pages/Science/ReproductiveSystem"));
const ExcretorySystemPage        = lazy(() => import("@/pages/Science/ExcretorySystem"));
const BotanyPage                 = lazy(() => import("@/pages/BotanyPage").then(m => ({ default: m.BotanyPage })));
const MicrobiologyPage           = lazy(() => import("@/pages/MicrobiologyPage"));
const GeologicalWondersPage      = lazy(() => import("@/pages/GeologicalWondersPage").then(m => ({ default: m.GeologicalWondersPage })));
const ArtOfLearningPage         = lazy(() => import("@/pages/ArtOfLearningPage"));
const PathwayToMedicinePage     = lazy(() => import("@/pages/PathwayToMedicinePage"));
const RadiologyPage              = lazy(() => import("@/pages/RadiologyPage"));
const MCATPrepPage               = lazy(() => import("@/pages/MCATPrepPage"));
const HumanEnginePage           = lazy(() => import("@/pages/HumanEnginePage"));
const WildlifeExplorerPage      = lazy(() => import("@/pages/WildlifeExplorerPage"));
const GalacticGrammarPage       = lazy(() => import("@/pages/GalacticGrammarPage"));
const AnthropologyPage          = lazy(() => import("@/pages/AnthropologyPage"));
const PandemicsHistoryPage      = lazy(() => import("@/pages/PandemicsHistoryPage"));
const MovingHumanityPage        = lazy(() => import("@/pages/MovingHumanityPage"));
const HealthyFoodsPage          = lazy(() => import("@/pages/HealthyFoodsPage"));
const DinosaurExtinctionPage    = lazy(() => import("@/pages/DinosaurExtinctionPage"));
const FossilFuelsPage           = lazy(() => import("@/pages/FossilFuelsPage"));
const BicyclePhysicsPage        = lazy(() => import("@/pages/BicyclePhysicsPage"));
const RoboticsPage              = lazy(() => import("@/pages/RoboticsPage"));
const VideoGamesPage            = lazy(() => import("@/pages/VideoGamesPage"));
const SpellingForgePage         = lazy(() => import("@/pages/SpellingForgePage"));
const SexualHealthPage          = lazy(() => import("@/pages/SexualHealthPage"));
const GlobalCitiesPage          = lazy(() => import("@/pages/GlobalCitiesPage"));
const CinematographyPage        = lazy(() => import("@/pages/CinematographyPage"));
const BeginnerGuidePage         = lazy(() => import("@/pages/BeginnerGuidePage"));
const MyDayActionsPage          = lazy(() => import("@/pages/MyDayActionsPage"));
const AnimalsNearAndFarPage     = lazy(() => import("@/pages/AnimalsNearAndFarPage"));
const MyFeelingsPage            = lazy(() => import("@/pages/MyFeelingsPage"));
const KidsScience               = lazy(() => import("@/pages/KidsScience"));
const KidsCommunity             = lazy(() => import("@/pages/KidsCommunity"));
const KidsElectronics           = lazy(() => import("@/pages/KidsElectronics"));
const KidsMath                  = lazy(() => import("@/pages/KidsMath"));
const WordPopperPage            = lazy(() => import("@/pages/WordPopperPage"));
const HabitatSorterPage         = lazy(() => import("@/pages/HabitatSorterPage"));
const AntarcticaScience         = lazy(() => import("@/pages/AntarcticaScience").then(m => ({ default: m.AntarcticaScience })));
const AncientProfessionsPage    = lazy(() => import("@/pages/AncientProfessionsPage"));
const ScaleOfUniversePage       = lazy(() => import("@/pages/ScaleOfUniversePage"));
const MissionStatementPage      = lazy(() => import("@/pages/MissionStatementPage"));
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
const StructuralViolencePage    = lazy(() => import("@/pages/StructuralViolence").then(m => ({ default: m.StructuralViolence })));
const AbundanceScarcityPage     = lazy(() => import("@/pages/AbundanceScarcity").then(m => ({ default: m.AbundanceScarcity })));
const FamilyDevelopmentPage     = lazy(() => import("@/pages/FamilyDevelopmentPage"));
const InfantNutritionPage       = lazy(() => import("@/pages/InfantNutritionPage").then(m => ({ default: m.InfantNutritionPage })));
const SurvivalHydrationPage     = lazy(() => import("@/pages/SurvivalHydrationPage").then(m => ({ default: m.SurvivalHydrationPage })));
const MicroscopesPage           = lazy(() => import("@/pages/Microscopes").then(m => ({ default: m.Microscopes })));
const UniversityExpectationsPage = lazy(() => import("@/pages/UniversityExpectations").then(m => ({ default: m.UniversityExpectations })));
const AlumniPage                = lazy(() => import("@/pages/AlumniPage").then(m => ({ default: m.AlumniPage })));
const SafetyPage                = lazy(() => import("@/pages/SafetyPage").then(m => ({ default: m.SafetyPage })));
const ExamPrepPage              = lazy(() => import("@/pages/ExamPrepPage").then(m => ({ default: m.ExamPrepPage })));
const EnglishWritingPage        = lazy(() => import("@/pages/EnglishWritingPage").then(m => ({ default: m.EnglishWritingPage })));
const DisprovenTheoriesPage     = lazy(() => import("@/pages/DisprovenTheoriesPage").then(m => ({ default: m.DisprovenTheoriesPage })));
const PublicSpeakingPage        = lazy(() => import("@/pages/PublicSpeakingPage").then(m => ({ default: m.PublicSpeakingPage })));
const UniversitiesPage          = lazy(() => import("@/pages/UniversitiesPage").then(m => ({ default: m.UniversitiesPage })));
const BridgesPage               = lazy(() => import("@/pages/BridgesPage").then(m => ({ default: m.BridgesPage })));
const PlumbingSewersPage        = lazy(() => import("@/pages/PlumbingSewersPage").then(m => ({ default: m.PlumbingSewersPage })));
const PumpsPage                 = lazy(() => import("@/pages/PumpsPage").then(m => ({ default: m.PumpsPage })));
const VexillologyPage           = lazy(() => import("@/pages/VexillologyPage").then(m => ({ default: m.VexillologyPage })));
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
const InorganicAtomicStructurePage = lazy(() => import("@/pages/InorganicAtomicStructurePage").then(m => ({ default: m.InorganicAtomicStructurePage })));
const InorganicBondingMolecularPage = lazy(() => import("@/pages/InorganicBondingMolecularPage").then(m => ({ default: m.InorganicBondingMolecularPage })));
const InorganicSymmetryGroupPage = lazy(() => import("@/pages/InorganicSymmetryGroupPage").then(m => ({ default: m.InorganicSymmetryGroupPage })));
const InorganicCoordinationPage = lazy(() => import("@/pages/InorganicCoordinationPage").then(m => ({ default: m.InorganicCoordinationPage })));
const InorganicMainGroupPage    = lazy(() => import("@/pages/InorganicMainGroupPage").then(m => ({ default: m.InorganicMainGroupPage })));
const InorganicOrganometallicPage = lazy(() => import("@/pages/InorganicOrganometallicPage").then(m => ({ default: m.InorganicOrganometallicPage })));
const InorganicSpectroscopyPage = lazy(() => import("@/pages/InorganicSpectroscopyPage").then(m => ({ default: m.InorganicSpectroscopyPage })));
const AdminStudentsPage         = lazy(() => import("@/pages/AdminStudentsPage").then(m => ({ default: m.AdminStudentsPage })));
const PhysicalChemistry101Page  = lazy(() => import("@/pages/PhysicalChemistry101Page").then(m => ({ default: m.PhysicalChemistry101Page })));
const HaberBoschProcessPage     = lazy(() => import("@/pages/HaberBoschProcessPage").then(m => ({ default: m.HaberBoschProcessPage })));
const NitrogenCyclePage         = lazy(() => import("@/pages/NitrogenCyclePage").then(m => ({ default: m.NitrogenCyclePage })));
const SweetSciencePage          = lazy(() => import("@/pages/SweetSciencePage").then(m => ({ default: m.SweetSciencePage })));
const AnalyticalChemistry101Page = lazy(() => import("@/pages/AnalyticalChemistry101Page").then(m => ({ default: m.AnalyticalChemistry101Page })));
const BiochemistryPage          = lazy(() => import("@/pages/BiochemistryPage").then(m => ({ default: m.BiochemistryPage })));
const ChemistryBuildingBlocksPage = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryBuildingBlocksPage })));
const ChemistryReactionsPage    = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryReactionsPage })));
const ChemistryAdvancedPage     = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryAdvancedPage })));
const ChemistryRealWorldPage    = lazy(() => import("@/pages/ChemistryModulePages").then(m => ({ default: m.ChemistryRealWorldPage })));
const IonCalculatorPage         = lazy(() => import("@/pages/IonCalculator").then(m => ({ default: m.IonCalculator })));
const FunLabPage                = lazy(() => import("@/pages/FunLabPage").then(m => ({ default: m.FunLabPage })));
const PhysicsHubPage            = lazy(() => import("@/pages/PhysicsHubPage").then(m => ({ default: m.PhysicsHubPage })));
const PhysicsModulePlaceholder  = lazy(() => import("@/pages/PhysicsHubPage").then(m => ({ default: m.PhysicsModulePlaceholder })));
const BiologyHubPage            = lazy(() => import("@/pages/BiologyHubPage").then(m => ({ default: m.BiologyHubPage })));
const GeologyHubPage            = lazy(() => import("@/pages/GeologyHubPage").then(m => ({ default: m.GeologyHubPage })));
const MountainsVolcanoesPage    = lazy(() => import("@/pages/MountainsVolcanoesPage").then(m => ({ default: m.MountainsVolcanoesPage })));
const ChemicalEngineeringPage   = lazy(() => import("@/pages/ChemicalEngineeringPage").then(m => ({ default: m.ChemicalEngineeringPage })));
const DeepTimePage              = lazy(() => import("@/pages/DeepTimePage").then(m => ({ default: m.DeepTimePage })));
const AutomotiveTechPage        = lazy(() => import("@/pages/AutomotiveTechPage").then(m => ({ default: m.AutomotiveTechPage })));
const LockMechanicsPage         = lazy(() => import("@/pages/LockMechanicsPage"));
const WeldingSciencePage        = lazy(() => import("@/pages/WeldingSciencePage"));
const ElectrostaticPrecipitator = lazy(() => import("@/pages/ElectrostaticPrecipitator"));
const WaterFiltration           = lazy(() => import("@/pages/WaterFiltration"));
const GreatInventionsPage       = lazy(() => import("@/pages/GreatInventionsPage"));
const DisasterPrepPage          = lazy(() => import("@/pages/DisasterPrepPage").then(m => ({ default: m.DisasterPrepPage })));
const HowComputersWorkPage      = lazy(() => import("@/pages/HowComputersWorkPage").then(m => ({ default: m.HowComputersWorkPage })));
const PhysicsMotionPage         = lazy(() => import("@/pages/PhysicsMotionPage").then(m => ({ default: m.PhysicsMotionPage })));
const PhysicsForcesPage         = lazy(() => import("@/pages/PhysicsForcesPage").then(m => ({ default: m.PhysicsForcesPage })));
const PhysicsEnergyPage         = lazy(() => import("@/pages/PhysicsEnergyPage").then(m => ({ default: m.PhysicsEnergyPage })));
const PhysicsWavesPage          = lazy(() => import("@/pages/PhysicsWavesPage").then(m => ({ default: m.PhysicsWavesPage })));
const DoubleSlitPage            = lazy(() => import("@/pages/DoubleSlitPage"));
const PhysicsGyroscopesPage     = lazy(() => import("@/pages/PhysicsGyroscopesPage").then(m => ({ default: m.PhysicsGyroscopesPage })));
const FrugalPhysicsLab          = lazy(() => import("@/pages/FrugalPhysicsLab").then(m => ({ default: m.FrugalPhysicsLab })));
const SimpleMachinesPage        = lazy(() => import("@/pages/SimpleMachinesPage").then(m => ({ default: m.SimpleMachinesPage })));
const MaterialsSciencePage      = lazy(() => import("@/pages/MaterialsSciencePage").then(m => ({ default: m.MaterialsSciencePage })));
const RecyclingSciencePage      = lazy(() => import("@/pages/RecyclingSciencePage"));
const EntrepreneurshipPage      = lazy(() => import("@/pages/EntrepreneurshipPage"));
const ArchitectureStrengthPage  = lazy(() => import("@/pages/ArchitectureStrengthPage").then(m => ({ default: m.ArchitectureStrengthPage })));
const GlaciologyPage             = lazy(() => import("@/pages/GlaciologyPage").then(m => ({ default: m.GlaciologyPage })));
const NeurologyPage             = lazy(() => import("@/pages/NeurologyPage").then(m => ({ default: m.NeurologyPage })));
const EntomologyPage            = lazy(() => import("@/pages/EntomologyPage").then(m => ({ default: m.EntomologyPage })));
const PharmacologyPage          = lazy(() => import("@/pages/PharmacologyPage").then(m => ({ default: m.PharmacologyPage })));
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
      <STIBanner />
      <ScrollToTop />
      <RouteTracker />
      <PWAStatusBar />
      <Navbar />
      <HeatSafetyAlert />
      <main className="flex-grow">
        <RouteScopedErrorBoundary>
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
            <Route path="/english-writing/public-speaking" component={PublicSpeakingPage} />
            <Route path="/launchpad/universities" component={UniversitiesPage} />
            <Route path="/technology/bridges" component={BridgesPage} />
            <Route path="/technology/plumbing" component={PlumbingSewersPage} />
            <Route path="/technology/pumps" component={PumpsPage} />
            <Route path="/study-center/flags" component={VexillologyPage} />
            <Route path="/submit-story" component={SubmitStoryPage} />
            <Route path="/submit-need" component={SubmitNeedPage} />
            <Route path="/space" component={SpacePage} />
            <Route path="/oceanography" component={OceanographyPage} />
            <Route path="/technology/horology" component={HorologyPage} />
            <Route path="/technology/3d-printing" component={ThreeDPrintingPage} />
            <Route path="/technology/maritime" component={MaritimeTechPage} />
            <Route path="/career/resume-builder" component={ResumeBuilderPage} />
            <Route path="/weather" component={WeatherPage} />
            <Route path="/weather/snow" component={SnowPage} />
            <Route path="/quantum-limit" component={QuantumLimitPage} />
            <Route path="/magnets" component={MagnetsPage} />
            <Route path="/hvac" component={HvacPage} />
            <Route path="/technology/vacuum-cleaner" component={VacuumCleanerPage} />
            <Route path="/aviation" component={AviationPage} />
            <Route path="/music-theory" component={MusicTheoryPage} />
            <Route path="/mathematics" component={MathematicsPage} />
            <Route path="/mathematics/geometry" component={GeometryPage} />
            <Route path="/mathematics/logarithms" component={LogarithmsPage} />
            <Route path="/mathematics/limits-derivatives" component={LimitsDerivativesPage} />
            <Route path="/mathematics/integrals" component={IntegralsPage} />
            <Route path="/mathematics/advanced" component={AdvancedMathPage} />
            <Route path="/mathematics/tensors" component={TensorsPage} />
            <Route path="/well-being/survival-skills" component={SurvivalSkillsPage} />
            <Route path="/technology/nanotechnology" component={NanotechnologyPage} />
            <Route path="/technology/radio" component={RadioTechPage} />
            <Route path="/technology/mass-production" component={MassProductionPage} />
            <Route path="/science/electromagnetism" component={ElectromagnetismPage} />
            <Route path="/science/chemistry/heisenberg" component={HeisenbergPage} />
            <Route path="/philosophy/language" component={LanguageRealityPage} />
            <Route path="/science/dentistry" component={DentistryPage} />
            <Route path="/science/veterinary" component={VeterinaryMedicinePage} />
            <Route path="/science/archaeology-paleontology" component={ArchaeologyPaleontologyPage} />
            <Route path="/science/women-in-science" component={WomenInSciencePage} />
            <Route path="/science/fourier-transform" component={FourierTransformPage} />
            <Route path="/science/navier-stokes" component={NavierStokesPage} />
            <Route path="/electrical-engineering" component={ElectricalEngineeringPage} />
            <Route path="/science/circulatory-system" component={CirculatorySystemPage} />
            <Route path="/science/lymphatic-system" component={LymphaticSystemPage} />
            <Route path="/science/integumentary-system" component={IntegumentarySystemPage} />
            <Route path="/science/scale-of-universe" component={ScaleOfUniversePage} />
            <Route path="/science/kessler-syndrome" component={KesslerSyndromePage} />
            <Route path="/explore/mission-statement" component={MissionStatementPage} />
            <Route path="/science/weather/sky-color" component={RayleighScatteringPage} />
            <Route path="/study-center/europe" component={EuropeHistoryPage} />
            <Route path="/study-center/africa" component={AfricaGeographyPage} />
            <Route path="/study-center/asia" component={AsiaContinentPage} />
            <Route path="/study-center/global-atlas" component={GlobalAtlasPage} />
            <Route path="/study-center/world-timeline" component={WorldTimelinePage} />
            <Route path="/geography/latin-america" component={LatinAmericaPage} />
            <Route path="/study-center/coordinates" component={CoordinatesPage} />
            <Route path="/science/biology/crispr" component={CrisprPage} />
            <Route path="/science/biology/cell-division" component={CellDivisionPage} />
            <Route path="/study-center/history/roman-empire" component={RomanEmpirePage} />
            <Route path="/study-center/ancient-professions" component={AncientProfessionsPage} />
            <Route path="/study-center/pandemics-history" component={PandemicsHistoryPage} />
            <Route path="/study-center/moving-humanity" component={MovingHumanityPage} />
            <Route path="/music/20th-century" component={TwentiethCenturyMusicPage} />
            <Route path="/technology/radar" component={RadarPage} />
            <Route path="/technology/television" component={TelevisionPage} />
            <Route path="/technology/future-intelligence" component={FutureIntelligencePage} />
            <Route path="/biology/cellular-power-plant" component={CellularPowerPlantPage} />
            <Route path="/well-being/strength-endurance" component={StrengthEndurancePage} />
            <Route path="/study-center/authority-conformity" component={AuthorityConformityPage} />
            <Route path="/study-center/languages" component={LanguagesWorldPage} />
            <Route path="/study-center/behaviorism" component={BehaviorismPage} />
            <Route path="/study-center/united-states" component={UnitedStatesPage} />
            <Route path="/study-center/global-conflicts" component={GlobalConflictsPage} />
            <Route path="/study-center/global-diplomacy" component={GlobalDiplomacyPage} />
            <Route path="/study-center/entrepreneurship" component={EntrepreneurshipPage} />
            <Route path="/science/trains-railways" component={TrainsRailwaysPage} />
            <Route path="/science/entomology" component={EntomologyPage} />
            <Route path="/science/pharmacology" component={PharmacologyPage} />
            <Route path="/study-center/linguistics" component={LinguisticsPage} />
            <Route path="/cambodia" component={CambodiaPage} />
            <Route path="/science/energy-future" component={EnergyFuturePage} />
            <Route path="/well-being/public-health" component={PublicHealthPage} />
            <Route path="/well-being/disease-divide" component={DiseaseDividePage} />
            <Route path="/well-being/addiction-science" component={AddictionSciencePage} />
            <Route path="/well-being/sanctuary/structural-violence" component={StructuralViolencePage} />
            <Route path="/well-being/abundance-vs-scarcity" component={AbundanceScarcityPage} />
            <Route path="/well-being/family-development" component={FamilyDevelopmentPage} />
            <Route path="/well-being/infant-nutrition" component={InfantNutritionPage} />
            <Route path="/well-being/survival-hydration" component={SurvivalHydrationPage} />
            <Route path="/well-being/soft-skills" component={SoftSkills} />
            <Route path="/science/biology/microscopes" component={MicroscopesPage} />
            <Route path="/future-hub/university-guide" component={UniversityExpectationsPage} />
            <Route path="/study-center/competition-cooperation" component={CompetitionCooperationPage} />
            <Route path="/science/human-body/endocrine-system" component={EndocrineSystemPage} />
            <Route path="/science/human-body/immune-system" component={ImmuneSystemPage} />
            <Route path="/science/human-body/skeletal-system" component={SkeletalSystemPage} />
            <Route path="/science/human-body/respiratory-system" component={RespiratorySystemPage} />
            <Route path="/science/human-body/digestive-system" component={DigestiveSystemPage} />
            <Route path="/science/human-body/reproductive-system" component={ReproductiveSystem} />
            <Route path="/science/human-body/excretory-system" component={ExcretorySystemPage} />
            <Route path="/biology/botany" component={BotanyPage} />
            <Route path="/science/biology/microbiology" component={MicrobiologyPage} />
            <Route path="/geology/wonders" component={GeologicalWondersPage} />
            <Route path="/science/geology/deep-time" component={DeepTimePage} />
            <Route path="/technology/automotive" component={AutomotiveTechPage} />
            <Route path="/technology/locks" component={LockMechanicsPage} />
            <Route path="/technology/welding" component={WeldingSciencePage} />
            <Route path="/technology/electrostatic-precipitators" component={ElectrostaticPrecipitator} />
            <Route path="/technology/water-filtration" component={WaterFiltration} />
            <Route path="/technology/inventions" component={GreatInventionsPage} />
            <Route path="/art-of-learning" component={ArtOfLearningPage} />
            <Route path="/pathway-to-medicine" component={PathwayToMedicinePage} />
            <Route path="/pathway-to-medicine/radiology" component={RadiologyPage} />
            <Route path="/pathway-to-medicine/mcat" component={MCATPrepPage} />
            <Route path="/human-engine" component={HumanEnginePage} />
            <Route path="/study-center/wildlife-explorer" component={WildlifeExplorerPage} />
            <Route path="/study-center/galactic-grammar" component={GalacticGrammarPage} />
            <Route path="/study-center/dinosaur-extinction" component={DinosaurExtinctionPage} />
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
            <Route path="/chemistry/ion-calculator" component={IonCalculatorPage} />
            <Route path="/chemistry/flame-test" component={FlameTestPage} />
            <Route path="/chemistry/organic-101" component={OrganicChemistry101Page} />
            <Route path="/science/chemistry/inorganic" component={InorganicChemistry101Page} />
            <Route path="/science/chemistry/inorganic/atomic-structure" component={InorganicAtomicStructurePage} />
            <Route path="/science/chemistry/inorganic/bonding-molecular" component={InorganicBondingMolecularPage} />
            <Route path="/science/chemistry/inorganic/symmetry-group" component={InorganicSymmetryGroupPage} />
            <Route path="/science/chemistry/inorganic/coordination" component={InorganicCoordinationPage} />
            <Route path="/science/chemistry/inorganic/main-group" component={InorganicMainGroupPage} />
            <Route path="/science/chemistry/inorganic/organometallic" component={InorganicOrganometallicPage} />
            <Route path="/science/chemistry/inorganic/spectroscopy" component={InorganicSpectroscopyPage} />
            <Route path="/admin/students" component={AdminStudentsPage} />
            <Route path="/science/chemistry/physical" component={PhysicalChemistry101Page} />
            <Route path="/science/chemistry/haber-bosch" component={HaberBoschProcessPage} />
            <Route path="/science/chemistry/nitrogen-cycle" component={NitrogenCyclePage} />
            <Route path="/science/chemistry/analytical" component={AnalyticalChemistry101Page} />
            <Route path="/science/chemistry/biochemistry" component={BiochemistryPage} />
            <Route path="/science/chemistry/sweet-science" component={SweetSciencePage} />
            <Route path="/fun-lab" component={FunLabPage} />
            <Route path="/physics" component={PhysicsHubPage} />
            <Route path="/physics/motion" component={PhysicsMotionPage} />
            <Route path="/physics/forces" component={PhysicsForcesPage} />
            <Route path="/physics/energy" component={PhysicsEnergyPage} />
            <Route path="/physics/waves" component={PhysicsWavesPage} />
            <Route path="/physics/waves/double-slit" component={DoubleSlitPage} />
            <Route path="/physics/simple-machines" component={SimpleMachinesPage} />
            <Route path="/physics/gyroscopes" component={PhysicsGyroscopesPage} />
            <Route path="/physics/frugal-lab" component={FrugalPhysicsLab} />
            <Route path="/science/materials" component={MaterialsSciencePage} />
            <Route path="/science/materials/recycling" component={RecyclingSciencePage} />
            <Route path="/science/architecture" component={ArchitectureStrengthPage} />
            <Route path="/science/glaciology" component={GlaciologyPage} />
            <Route path="/science/neurology" component={NeurologyPage} />
            <Route path="/science/disproven-theories" component={DisprovenTheoriesPage} />
            <Route path="/physics/:slug" component={PhysicsModulePlaceholder} />
            <Route path="/biology" component={BiologyHubPage} />
            <Route path="/geology" component={GeologyHubPage} />
            <Route path="/science/geology" component={MountainsVolcanoesPage} />
            <Route path="/science/chemical-engineering" component={ChemicalEngineeringPage} />
            <Route path="/disaster-prep" component={DisasterPrepPage} />
            <Route path="/how-computers-work" component={HowComputersWorkPage} />
            <Route path="/beginner-guide" component={BeginnerGuidePage} />
            <Route path="/for-kids/my-day" component={MyDayActionsPage} />
            <Route path="/for-kids/animals" component={AnimalsNearAndFarPage} />
            <Route path="/for-kids/feelings" component={MyFeelingsPage} />
            <Route path="/for-kids/word-popper" component={WordPopperPage} />
            <Route path="/for-kids/habitat-sorter" component={HabitatSorterPage} />
            <Route path="/for-kids/healthy-foods" component={HealthyFoodsPage} />
            <Route path="/kids/science" component={KidsScience} />
            <Route path="/kids/community" component={KidsCommunity} />
            <Route path="/kids/electronics" component={KidsElectronics} />
            <Route path="/kids/math-tables" component={KidsMath} />
            <Route path="/study-center/antarctica" component={AntarcticaScience} />
            <Route path="/study-center/puzzles" component={MindGym} />
            <Route path="/study-center/philosophy" component={PhilosophyPage} />
            <Route path="/study-center/sociology" component={SociologyPage} />
            <Route path="/study-center/anthropology" component={AnthropologyPage} />
            <Route path="/admin/dashboard">
              {() => <AdminRoute component={AdminDashboard} />}
            </Route>
            <Route path="/admin">
              {() => <AdminRoute component={Admin} />}
            </Route>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
        </RouteScopedErrorBoundary>
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
