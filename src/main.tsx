import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Overview } from "./views";

import "./assets/reset.css";
import "./assets/styles.css";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Overview />
  </StrictMode>,
);
