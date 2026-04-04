import { createContext } from "react";
import type { RoutesContextType } from "../types/routes-context";

export const RoutesContext = createContext({
  segments: [],
  center: undefined,
  campsites: [],
  savedRoutes: [],
  savedRoute: "",
  showSegments: true,
  selectedSegments: [],
  showCampsites: false,
  showHaveCamped: false,
  allSegments: [],
  allCampsites: [],
  selectedRoute: [],
  savedRoutesOptions: [],
  setShowSegments: () => {},
  setShowCampsites: () => {},
  setShowHaveCamped: () => {},
  setSelectedSegments: () => {},
  setSavedRoute: () => {},
  setSelectSavedRoute: () => {},
} as RoutesContextType);
