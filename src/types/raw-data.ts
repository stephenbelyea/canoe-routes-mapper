import type { LatLngTuple } from "leaflet";

export type RawCoordinate = LatLngTuple;
export type RawBoundingBox = [...RawCoordinate, ...RawCoordinate];

export type RawSegmentProperties = {
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

export type YesOrNo = "Yes" | "No";

export type RawCampsiteProperties = {
  Number?: string;
  Lake?: string;
  Park?: string;
  Camped?: YesOrNo;
  Info?: string;
  DateCamped?: string;
};

export type RawFeature = {
  geometry: { type: string; coordinates: RawCoordinate[] | RawCoordinate };
  properties: RawSegmentProperties | RawCampsiteProperties;
  bbox: RawBoundingBox;
  type: string;
};

export type RawGeoDataSet = {
  features: RawFeature[];
  bbox: RawBoundingBox;
  name: string;
  type: string;
};

export interface RawGeoData extends RawGeoDataSet {
  default: RawGeoDataSet;
}
