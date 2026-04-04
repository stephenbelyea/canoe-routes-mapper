import React, { useContext, useMemo } from "react";
import { Circle, Polyline, Tooltip } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import { RoutesContext } from "../context/routes-context";
import { formatLength } from "../utilities";
import { SEGMENT_PATH_COLOUR, SEGMENT_SELECTED_COLOUR } from "../constants";
import type { SegmentSet } from "../types";

export const AllSegmentsPaths = ({
  isSelectedSet,
  segments,
}: {
  isSelectedSet?: boolean;
  segments: SegmentSet[];
}) => {
  const { selectedSegments, setSelectedSegments } = useContext(RoutesContext);

  const onSelectSegment = (id: string): void => {
    if (!setSelectedSegments) return;
    const newSegments = selectedSegments?.includes(id)
      ? selectedSegments.filter((segmentId) => segmentId !== id)
      : [...(selectedSegments || []), id];
    setSelectedSegments(newSegments);
  };

  const pathOptions = useMemo(
    () => ({
      color: isSelectedSet ? SEGMENT_SELECTED_COLOUR : SEGMENT_PATH_COLOUR,
      opacity: isSelectedSet ? 0.75 : 0.45,
      weight: 8,
    }),
    [isSelectedSet],
  );

  const circleOptions = useMemo(
    () => ({
      color: isSelectedSet ? SEGMENT_SELECTED_COLOUR : SEGMENT_PATH_COLOUR,
      opacity: 0.95,
      radius: 75,
    }),
    [isSelectedSet],
  );

  return (
    <>
      {segments.map((segment) => {
        const lakes = segment.lakes.map((lake) => lake.name).join(", ");
        const parks = segment.parks.map((park) => park.name).join(", ");

        const coords = segment.coords as LatLngExpression[];
        const last = coords[coords.length - 1];
        const first = coords[0];

        const eventHandlers = {
          click: () => onSelectSegment(segment.id),
        };

        return (
          <React.Fragment key={segment.id}>
            <Circle center={first} pathOptions={circleOptions} />
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
            <Circle center={last} pathOptions={circleOptions} />
          </React.Fragment>
        );
      })}
    </>
  );
};
