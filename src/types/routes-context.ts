import type { CampsiteSet } from "./campsites-data";
import type { Coordinate } from "./common";
import type { SavedRoute } from "./saved-routes-data";
import type { SegmentSet } from "./segments-data";

export type RoutesContextType = {
  segments: SegmentSet[];
  center: Coordinate | undefined;
  campsites: CampsiteSet[];
  savedRoutes: SavedRoute[];
  showSegments: boolean;
  showCampsites: boolean;
  showHaveCamped: boolean;
  selectedSegments: string[];
  savedRoute: string;
  allSegments: SegmentSet[];
  allCampsites: CampsiteSet[];
  selectedRoute: SegmentSet[];
  savedRoutesOptions: { value: string; label: string }[];
  setShowSegments: (show: boolean) => void;
  setShowCampsites: (show: boolean) => void;
  setShowHaveCamped: (show: boolean) => void;
  setSelectedSegments: (segments: string[]) => void;
  setSavedRoute: (routeId: string) => void;
  setSelectSavedRoute: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  clearSelectedSegments: () => void;
};
