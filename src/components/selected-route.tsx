import { useMemo } from "react";
import { formatLength } from "../utilities";
import type { SegmentSet } from "../types";
import { Button } from "./button";

export type SelectedRouteProps = {
  selectedRoute: SegmentSet[];
  selectedSegments: string[];
  setSelectedSegments: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SelectedRoute = ({
  selectedRoute,
  selectedSegments,
  setSelectedSegments,
}: SelectedRouteProps) => {
  const hasSelected = selectedSegments.length > 0;

  const onClearSelected = () => {
    setSelectedSegments([]);
  };

  const totalLength = useMemo(() => {
    let length = 0;
    selectedRoute.forEach((segment) => {
      length += segment.length;
    });
    return formatLength(length);
  }, [selectedRoute]);

  return (
    <div className="selected-segments">
      <div>
        {hasSelected ? (
          <span>
            Total length: <strong>{totalLength}</strong>
          </span>
        ) : (
          <span>No route selected.</span>
        )}
      </div>
      <Button size="small" disabled={!hasSelected} onClick={onClearSelected}>
        Clear
      </Button>
    </div>
  );
};
