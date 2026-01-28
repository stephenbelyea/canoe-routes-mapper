import React from "react";
import { Circle, Polyline, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { SegmentSet } from "../types";
import { formatLength } from "../utilities";
import { SEGMENT_PATH_COLOUR } from "../constants";

const circleProps = {
  color: SEGMENT_PATH_COLOUR,
  opacity: 0.95,
  radius: 75,
};

const pathProps = {
  color: SEGMENT_PATH_COLOUR,
  opacity: 0.65,
  weight: 5,
};

export type SegmentsPathsProps = {
  segments: SegmentSet[];
};

export const AllSegmentsPaths = ({ segments }: SegmentsPathsProps) => {
  return (
    <>
      {segments.map((segment) => {
        const lakes = segment.lakes.map((lake) => lake.name).join(", ");
        const parks = segment.parks.map((park) => park.name).join(", ");
        const coords = segment.coords as LatLngExpression[];
        const key = segment.coords.toString();
        const last = coords[coords.length - 1];
        const first = coords[0];

        return (
          <React.Fragment key={key}>
            <Circle center={first} {...circleProps} />
            <Polyline positions={coords} {...pathProps}>
              <Tooltip sticky>
                <span>Lake(s): {lakes ? lakes : "-"}</span>
                <br />
                <span>Park(s): {parks ? parks : "-"}</span>
                <br />
                <span>
                  Distance: <strong>{formatLength(segment.length)}</strong>
                </span>
              </Tooltip>
            </Polyline>
            <Circle center={last} {...circleProps} />
          </React.Fragment>
        );
      })}
    </>
  );
};
