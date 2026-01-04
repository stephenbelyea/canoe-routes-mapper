import type { LatLngExpression } from "leaflet";
import * as segmentsData from "../data/segments.json";

export type SegmentType = "paddle" | "portage";

export type MapSegment = {
  id: string;
  path: LatLngExpression[];
  type: SegmentType;
  length?: number;
};

export type MapPath = {
  id: string;
  segments: string[];
  length: number;
};

export const useGetSegments = () => {
  const segments: MapSegment[] = segmentsData.segments.map((segment) => ({
    id: segment.id as string,
    path: segment.path as LatLngExpression[],
    type: segment.type as SegmentType,
    length: segment.length as number,
  }));

  const paths: MapPath[] = segmentsData.paths.map((path) => ({
    id: path.id as string,
    segments: path.segments as string[],
    length: path.length as number,
  }));

  return { segments, paths };
};
