import * as data from "../data/saved-routes.json";
import type { SavedRoute } from "../types/saved-routes-data";

export const useGetSavedRoutes = () => {
  const savedRoutes: SavedRoute[] = data?.routes as SavedRoute[];

  return { savedRoutes };
};
