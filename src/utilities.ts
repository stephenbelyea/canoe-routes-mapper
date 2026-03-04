import type {
  BoundingBox,
  CampsitesData,
  CampsiteSet,
  Coordinate,
  LakeItem,
  ParkItem,
  RawBoundingBox,
  RawCoordinate,
  RawGeoData,
  RawCampsiteProperties,
  RawSegmentProperties,
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

export const transformBoundingBox = (
  bbox?: RawBoundingBox,
): BoundingBox | undefined => {
  if (!bbox) return undefined;
  return [
    [bbox[1], bbox[0]],
    [bbox[4], bbox[3]],
  ];
};

export const transformLength = (length: number = 0): number =>
  Math.ceil(length * 100000);

export const transformPropertyGroup = (
  properties: RawSegmentProperties,
  prefix: string,
): LakeItem[] | ParkItem[] => {
  const items: LakeItem[] | ParkItem[] = [];
  Object.keys(properties).forEach((key) => {
    if (key.startsWith(prefix)) {
      const name = properties[key as keyof RawSegmentProperties] as
        | string
        | null;
      if (name) {
        items.push({ key, name });
      }
    }
  });
  return items;
};

export const transformCenter = (bbox?: BoundingBox): Coordinate | undefined => {
  if (!bbox) return undefined;
  return [(bbox[0][0] + bbox[1][0]) / 2, (bbox[0][1] + bbox[1][1]) / 2];
};

export const transformSegmentsData = ({
  bbox: rawBbox,
  features,
  name,
  type,
}: RawGeoData): SegmentsData => {
  const segments: SegmentSet[] = [];
  const bbox = transformBoundingBox(rawBbox);
  const center = transformCenter(bbox);

  features.forEach(({ type: rawType, bbox: rawBbox, geometry, properties }) => {
    const props = properties as RawSegmentProperties;
    const segment: SegmentSet = {
      lakes: transformPropertyGroup(props, "Lake") as LakeItem[],
      parks: transformPropertyGroup(props, "Park") as ParkItem[],
      coords: (geometry.coordinates as RawCoordinate[]).map(
        transformCoordinate,
      ),
      length: transformLength(props.Shape_Leng),
      bbox: transformBoundingBox(rawBbox),
      type: `${rawType}|${geometry.type}`,
      distance: props.Distance,
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

export const transformCampsitesData = ({
  bbox: rawBbox,
  features,
  name,
  type,
}: RawGeoData): CampsitesData => {
  const campsites: CampsiteSet[] = [];
  const bbox = transformBoundingBox(rawBbox);
  const center = transformCenter(bbox);

  features.forEach(({ type: rawType, bbox: rawBbox, geometry, properties }) => {
    const props = properties as RawCampsiteProperties;
    const campsite: CampsiteSet = {
      coords: transformCoordinate(geometry.coordinates as RawCoordinate),
      bbox: transformBoundingBox(rawBbox),
      type: `${rawType}|${geometry.type}`,
      number: props.Number,
      camped: props.Camped === "Yes",
      notes: props.Info,
      dates: props.DateCamped ? [props.DateCamped] : [],
      lakes: props.Lake ? [{ key: "Lake", name: props.Lake }] : [],
      parks: props.Park ? [{ key: "Park", name: props.Park }] : [],
    };
    campsites.push(campsite);
  });

  const campsitesData: CampsitesData = {
    campsites,
    center,
    bbox,
    name,
    type,
  };
  return campsitesData;
};
