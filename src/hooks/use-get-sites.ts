import type { LatLngExpression } from "leaflet";
import * as sitesData from "../data/sites.json";

export type MapSite = {
  id: string;
  point: LatLngExpression;
};

export const useGetSites = () => {
  const sites: MapSite[] = sitesData.sites.map((site) => ({
    id: site.id as string,
    point: site.point as LatLngExpression,
  }));

  return { sites };
};
