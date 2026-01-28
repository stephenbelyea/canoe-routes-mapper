export type Coordinate = [number, number];

export type BoundingBox = [Coordinate, Coordinate];

export type LakeItem = {
  key: string;
  name: string;
};

export type ParkItem = LakeItem;

export type SegmentSet = {
  coords: Coordinate[];
  lakes: LakeItem[];
  parks: ParkItem[];
  bbox: BoundingBox;
  distance: string;
  length: number;
  type: string;
};

export type SegmentsData = {
  name: string;
  type: string;
  bbox: BoundingBox;
  center: Coordinate;
  segments: SegmentSet[];
};
