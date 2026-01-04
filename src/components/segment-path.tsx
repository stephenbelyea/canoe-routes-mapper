import React from "react";
import { Circle, Polyline, Tooltip } from "react-leaflet";
import type { MapSegment } from "../hooks/use-get-segments";
import { formatLength } from "../utilities";

export interface SegmentPathProps extends MapSegment {
  isLast?: boolean;
}

export const SegmentPath = ({
  path,
  id,
  length,
  isLast = false,
}: SegmentPathProps) => {
  const first = path[0];
  const last = path[path.length - 1];
  return (
    <React.Fragment>
      <Circle center={first} radius={75} color="crimson" opacity={0.85} />
      <Polyline positions={path} weight={5} opacity={0.5} color="crimson">
        <Tooltip sticky>
          <span>Segment {id}</span>
          <br />
          <strong>{formatLength(length)}</strong>
        </Tooltip>
      </Polyline>
      {isLast && (
        <Circle center={last} radius={75} color="crimson" opacity={0.85} />
      )}
    </React.Fragment>
  );
};
