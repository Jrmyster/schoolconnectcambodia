import { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminRoute } from "@/components/AdminRoute";
import { RouteScopedErrorBoundary } from "@/components/RouteErrorBoundary";
const Admin = lazy(() =>
  import("@/pages/Admin").then((m) => ({ default: m.Admin })),
);
const AdminDashboard = lazy(() =>
  import("@/pages/AdminDashboard").then((m) => ({ default: m.AdminDashboard })),
);
const AlumniPage = lazy(() =>
  import("@/pages/AlumniPage").then((m) => ({ default: m.AlumniPage })),
);
const BrowseNeeds = lazy(() =>
  import("@/pages/BrowseNeeds").then((m) => ({ default: m.BrowseNeeds })),
);
const CharityDirectory = lazy(() =>
  import("@/pages/CharityDirectory").then((m) => ({
    default: m.CharityDirectory,
  })),
);
const CompletedProjects = lazy(() =>
  import("@/pages/CompletedProjects").then((m) => ({
    default: m.CompletedProjects,
  })),
);
const Dashboard = lazy(() =>
  import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })),
);
const ForgotPassword = lazy(() =>
  import("@/pages/ForgotPassword").then((m) => ({ default: m.ForgotPassword })),
);
const Login = lazy(() =>
  import("@/pages/Login").then((m) => ({ default: m.Login })),
);
const MapPage = lazy(() =>
  import("@/pages/MapPage").then((m) => ({ default: m.MapPage })),
);
const ResetPassword = lazy(() =>
  import("@/pages/ResetPassword").then((m) => ({ default: m.ResetPassword })),
);
const SchoolInbox = lazy(() =>
  import("@/pages/SchoolInbox").then((m) => ({ default: m.SchoolInbox })),
);
const SchoolProfile = lazy(() =>
  import("@/pages/SchoolProfile").then((m) => ({ default: m.SchoolProfile })),
);
const SubmitNeedPage = lazy(() =>
  import("@/pages/SubmitNeedPage").then((m) => ({ default: m.SubmitNeedPage })),
);
const SubmitStoryPage = lazy(() =>
  import("@/pages/SubmitStoryPage").then((m) => ({
    default: m.SubmitStoryPage,
  })),
);
const client = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});
export default function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <TooltipProvider>
          <Navbar />
          <RouteScopedErrorBoundary>
            <Suspense
              fallback={
                <p role="status" className="p-8">
                  Loading… / កំពុងផ្ទុក…
                </p>
              }
            >
              <Switch>
                <Route path="/" component={MapPage} />
                <Route path="/map" component={MapPage} />
                <Route path="/school/:id" component={SchoolProfile} />
                <Route path="/needs" component={BrowseNeeds} />
                <Route path="/projects" component={CompletedProjects} />
                <Route path="/submit-need" component={SubmitNeedPage} />
                <Route path="/school-inbox" component={SchoolInbox} />
                <Route path="/charities" component={CharityDirectory} />
                <Route path="/alumni" component={AlumniPage} />
                <Route path="/submit-story" component={SubmitStoryPage} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/admin">
                  {() => <AdminRoute component={Admin} />}
                </Route>
                <Route path="/admin/dashboard">
                  {() => <AdminRoute component={AdminDashboard} />}
                </Route>
                <Route>
                  <main className="p-8">
                    Page not found. <a href="/map">Digital Map</a>
                  </main>
                </Route>
              </Switch>
            </Suspense>
          </RouteScopedErrorBoundary>
          <Footer />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
