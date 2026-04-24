import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "katex/dist/katex.min.css";
import { initPwa } from "./lib/pwa";
import { RootErrorBoundary } from "./components/RootErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>,
);

initPwa();
