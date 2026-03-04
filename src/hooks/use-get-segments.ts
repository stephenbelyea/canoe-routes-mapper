import type { RawGeoData, SegmentsData } from "../types";
import { transformSegmentsData } from "../utilities";

import * as data from "../data/temagami-segments-jan-2026.json";

export const useGetSegments = () => {
  const segmentsData: SegmentsData = transformSegmentsData(
    data as unknown as RawGeoData,
  );

  return segmentsData;
};
