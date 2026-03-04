import React from "react";
import { Circle, Polyline, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import type { SegmentSet } from "../types";
import { formatLength } from "../utilities";
import { SEGMENT_PATH_COLOUR, SEGMENT_SELECTED_COLOUR } from "../constants";

const circleProps = {
  color: SEGMENT_PATH_COLOUR,
  opacity: 0.95,
  radius: 75,
};

export type SegmentsPathsProps = {
  segments: SegmentSet[];
  selectedSegments?: string[];
  setSelectedSegments?: React.Dispatch<React.SetStateAction<string[]>>;
};

export const AllSegmentsPaths = ({
  segments,
  selectedSegments,
  setSelectedSegments,
}: SegmentsPathsProps) => {
  const onSelectSegment = (id: string): void => {
    if (!setSelectedSegments) return;
    const newSegments = selectedSegments?.includes(id)
      ? selectedSegments.filter((segmentId) => segmentId !== id)
      : [...(selectedSegments || []), id];
    setSelectedSegments(newSegments);
  };

  return (
    <>
      {segments.map((segment) => {
        const lakes = segment.lakes.map((lake) => lake.name).join(", ");
        const parks = segment.parks.map((park) => park.name).join(", ");

        const coords = segment.coords as LatLngExpression[];
        const last = coords[coords.length - 1];
        const first = coords[0];

        const selected = selectedSegments?.includes(segment.id);
        const pathOptions = {
          color: selected ? SEGMENT_SELECTED_COLOUR : SEGMENT_PATH_COLOUR,
          opacity: selected ? 0.85 : 0.45,
          weight: 5,
        };
        const eventHandlers = {
          click: () => onSelectSegment(segment.id),
        };

        return (
          <React.Fragment key={segment.id}>
            <Circle center={first} {...circleProps} />
            <Polyline
              positions={coords}
              pathOptions={pathOptions}
              bubblingMouseEvents={false}
              eventHandlers={eventHandlers}
            >
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
