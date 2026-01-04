import { type LatLngExpression } from "leaflet";
import { useGetSegments, type MapPath, type MapSegment } from "../hooks";
import { Circle, Polyline, Tooltip } from "react-leaflet";
import { formatLength } from "../utilities";
import { SEGMENT_TYPES } from "../constants";

const pathColor = "royalblue";
const portageColor = "brown";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface SegmentPathProps extends MapPath {}

export const PathSegments = ({ length, segments }: SegmentPathProps) => {
  const allSegments = useGetSegments().segments;
  const pathSegments = [] as LatLngExpression[];
  const portageSegments = [] as MapSegment[];

  segments.forEach((segmentId) => {
    const segment = allSegments.find((seg) => seg.id === segmentId);
    if (segment) {
      pathSegments.push(...segment.path);
      if (segment.type === SEGMENT_TYPES.PORTAGE) {
        portageSegments.push(segment);
      }
    }
  });

  const first = pathSegments[0];
  const last = pathSegments[pathSegments.length - 1];

  return (
    <>
      <Circle center={first} radius={75} color={pathColor} opacity={0.95} />
      <Polyline
        color={pathColor}
        positions={pathSegments}
        opacity={0.65}
        weight={5}
      >
        <Tooltip sticky>
          <span>
            Path total <strong>{formatLength(length)}</strong>
          </span>
        </Tooltip>
      </Polyline>
      {portageSegments.map((portage) => (
        <Polyline
          key={portage.id}
          color={portageColor}
          positions={portage.path}
          opacity={0.85}
          weight={5}
        >
          <Tooltip sticky>
            <span>
              Portage <strong>{formatLength(portage.length)}</strong>
            </span>
          </Tooltip>
        </Polyline>
      ))}
      <Circle center={last} radius={75} color={pathColor} opacity={0.95} />
    </>
  );
};
