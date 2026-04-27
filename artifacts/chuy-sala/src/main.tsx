import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "katex/dist/katex.min.css";
import { initPwa } from "./lib/pwa";
import { initAnalytics } from "./lib/analytics";
import { RootErrorBoundary } from "./components/RootErrorBoundary";

// Bring react-ga4 into the same configuration the HTML gtag snippet set up,
// then disable its automatic page_view so our route tracker is the single
// source of truth for SPA navigations.
initAnalytics();

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>,
);

initPwa();
