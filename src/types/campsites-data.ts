import type { BoundingBox, Coordinate, LakeItem, ParkItem } from "./common";

export type CampsiteSet = {
  coords: Coordinate;
  lakes: LakeItem[];
  parks: ParkItem[];
  bbox?: BoundingBox;
  type: string;
  number?: string;
  camped?: boolean;
  dates?: string[];
  notes?: string;
};

export type CampsitesData = {
  name: string;
  type: string;
  bbox?: BoundingBox;
  center?: Coordinate;
  campsites: CampsiteSet[];
};
