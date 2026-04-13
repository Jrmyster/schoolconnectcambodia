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
import NotFound from "@/pages/not-found";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin" component={Admin} />
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
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
