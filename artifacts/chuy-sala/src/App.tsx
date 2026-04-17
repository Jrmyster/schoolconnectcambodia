import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
import { Home } from "@/pages/Home";
import { MapPage } from "@/pages/MapPage";
import { BrowseNeeds } from "@/pages/BrowseNeeds";
import { CompletedProjects } from "@/pages/CompletedProjects";
import { Admin } from "@/pages/Admin";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { Login } from "@/pages/Login";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { ResetPassword } from "@/pages/ResetPassword";
import { SchoolProfile } from "@/pages/SchoolProfile";
import { CharityDirectory } from "@/pages/CharityDirectory";
import { LaunchpadPage } from "@/pages/LaunchpadPage";
import { SanctuaryPage } from "@/pages/SanctuaryPage";
import { AlumniPage } from "@/pages/AlumniPage";
import { SafetyPage } from "@/pages/SafetyPage";
import { ExamPrepPage } from "@/pages/ExamPrepPage";
import { SubmitStoryPage } from "@/pages/SubmitStoryPage";
import { SpacePage } from "@/pages/SpacePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { ScientificLiteracyPage } from "@/pages/ScientificLiteracyPage";
import { ReadingListPage } from "@/pages/ReadingListPage";
import { Dashboard } from "@/pages/Dashboard";
import { FinLitIntroPage } from "@/pages/FinLitIntroPage";
import { SchoolInbox } from "@/pages/SchoolInbox";
import { ElectricalSafetyPage } from "@/pages/ElectricalSafetyPage";
import { ChemistryHubPage } from "@/pages/ChemistryHubPage";
import {
  ChemistryBuildingBlocksPage,
  ChemistryReactionsPage,
  ChemistryAdvancedPage,
  ChemistryRealWorldPage,
} from "@/pages/ChemistryModulePages";
import { FunLabPage } from "@/pages/FunLabPage";
import { PhysicsHubPage, PhysicsModulePlaceholder } from "@/pages/PhysicsHubPage";
import { PhysicsMotionPage } from "@/pages/PhysicsMotionPage";
import { PhysicsForcesPage } from "@/pages/PhysicsForcesPage";
import { PhysicsEnergyPage } from "@/pages/PhysicsEnergyPage";
import { PhysicsWavesPage } from "@/pages/PhysicsWavesPage";
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIChatPanel } from "@/components/AIChatPanel";
import { AdminRoute } from "@/components/AdminRoute";
import { HeatSafetyAlert } from "@/components/HeatSafetyAlert";

// Auth
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HeatSafetyAlert />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/map" component={MapPage} />
          <Route path="/needs" component={BrowseNeeds} />
          <Route path="/projects" component={CompletedProjects} />
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
          <Route path="/submit-story" component={SubmitStoryPage} />
          <Route path="/space" component={SpacePage} />
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
          <Route path="/fun-lab" component={FunLabPage} />
          <Route path="/physics" component={PhysicsHubPage} />
          <Route path="/physics/motion" component={PhysicsMotionPage} />
          <Route path="/physics/forces" component={PhysicsForcesPage} />
          <Route path="/physics/energy" component={PhysicsEnergyPage} />
          <Route path="/physics/waves" component={PhysicsWavesPage} />
          <Route path="/physics/:slug" component={PhysicsModulePlaceholder} />
          <Route path="/admin/dashboard">
            {() => <AdminRoute component={AdminDashboard} />}
          </Route>
          <Route path="/admin">
            {() => <AdminRoute component={Admin} />}
          </Route>
          <Route component={NotFound} />
        </Switch>
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
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
