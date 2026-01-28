import type { RawSegmentsData, SegmentsData } from "../types";
import { transformSegmentsData } from "../utilities";

import * as data from "../data/temagami-segments-jan-2025.json";

export const useGetSegments = () => {
  const segmentsData: SegmentsData = transformSegmentsData(
    data as unknown as RawSegmentsData
  );

  return segmentsData;
};
