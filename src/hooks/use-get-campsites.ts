import type { CampsitesData, RawGeoData } from "../types";
import { transformCampsitesData } from "../utilities";

import * as data from "../data/temagami-campsites-feb-2026.json";

export const useGetCampsites = () => {
  const campsitesData: CampsitesData = transformCampsitesData(
    data as unknown as RawGeoData,
  );

  return campsitesData;
};
