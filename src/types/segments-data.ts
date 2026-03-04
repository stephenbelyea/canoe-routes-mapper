import type { BoundingBox, Coordinate, LakeItem, ParkItem } from "./common";

export type SegmentSet = {
  coords: Coordinate[];
  lakes: LakeItem[];
  parks: ParkItem[];
  bbox?: BoundingBox;
  distance: string;
  length: number;
  type: string;
  id: string;
};

export type SegmentsData = {
  name: string;
  type: string;
  bbox?: BoundingBox;
  center?: Coordinate;
  segments: SegmentSet[];
};
