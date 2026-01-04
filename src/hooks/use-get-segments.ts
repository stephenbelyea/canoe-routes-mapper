import type { LatLngExpression } from "leaflet";
import * as segmentsData from "../data/segments.json";

export type MapSegment = {
  id: string;
  length: number;
  path: LatLngExpression[];
};

export const useGetSegments = () => {
  const segments: MapSegment[] = segmentsData.segments.map((segment) => ({
    id: segment.id as string,
    length: segment.length as number,
    path: segment.path as LatLngExpression[],
  }));

  return { segments };
};
