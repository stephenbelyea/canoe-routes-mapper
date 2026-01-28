import type {
  BoundingBox,
  Coordinate,
  LakeItem,
  ParkItem,
  RawBoundingBox,
  RawCoordinate,
  RawFeatureProperties,
  RawSegmentsData,
  SegmentsData,
  SegmentSet,
} from "./types";

export const formatLength = (length: number = 0): string => {
  if (length < 999) return `${length}m`;
  return `${(length / 1000).toFixed(2)}km`;
};

export const transformCoordinate = (coord: RawCoordinate): Coordinate => [
  coord[1],
  coord[0],
];

export const transformBoundingBox = (bbox: RawBoundingBox): BoundingBox => [
  [bbox[1], bbox[0]],
  [bbox[4], bbox[3]],
];

export const transformLength = (length: number = 0): number =>
  Math.ceil(length * 100000);

export const transformPropertyGroup = (
  properties: RawFeatureProperties,
  prefix: string
): LakeItem[] | ParkItem[] => {
  const items: LakeItem[] | ParkItem[] = [];
  Object.keys(properties).forEach((key) => {
    if (key.startsWith(prefix)) {
      const name = properties[key as keyof RawFeatureProperties] as
        | string
        | null;
      if (name) {
        items.push({ key, name });
      }
    }
  });
  return items;
};

export const transformCenter = (bbox: BoundingBox): Coordinate => [
  (bbox[0][0] + bbox[1][0]) / 2,
  (bbox[0][1] + bbox[1][1]) / 2,
];

export const transformSegmentsData = ({
  bbox: rawBbox,
  features,
  name,
  type,
}: RawSegmentsData): SegmentsData => {
  const segments: SegmentSet[] = [];
  const bbox = transformBoundingBox(rawBbox);
  const center = transformCenter(bbox);

  features.forEach(({ type: rawType, bbox: rawBbox, geometry, properties }) => {
    const segment: SegmentSet = {
      lakes: transformPropertyGroup(properties, "Lake") as LakeItem[],
      parks: transformPropertyGroup(properties, "Park") as ParkItem[],
      coords: geometry.coordinates.map(transformCoordinate),
      length: transformLength(properties.Shape_Leng),
      bbox: transformBoundingBox(rawBbox),
      type: `${rawType}|${geometry.type}`,
      distance: properties.Distance,
    };
    segments.push(segment);
  });

  const segmentsData: SegmentsData = {
    segments,
    center,
    bbox,
    name,
    type,
  };
  return segmentsData;
};
