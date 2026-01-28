import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Overview } from "./views";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Overview />
  </StrictMode>
);
