import type { LatLngTuple } from "leaflet";

export type RawCoordinate = LatLngTuple;
export type RawBoundingBox = [...RawCoordinate, ...RawCoordinate];

export type RawFeatureProperties = {
  Distance: string;
  Lake_1: string | null;
  Lake_2: string | null;
  Lake_3: string | null;
  Lake4: string | null;
  Lake5: string | null;
  Lake6: string | null;
  Lake7: string | null;
  Park_1: string | null;
  Park_2: string | null;
  Shape_Leng: number;
};

export type RawSegmentsFeature = {
  geometry: { type: string; coordinates: RawCoordinate[] };
  properties: RawFeatureProperties;
  bbox: RawBoundingBox;
  type: string;
};

export type RawSegmentsSet = {
  features: RawSegmentsFeature[];
  bbox: RawBoundingBox;
  name: string;
  type: string;
};

export interface RawSegmentsData extends RawSegmentsSet {
  default: RawSegmentsSet;
}
