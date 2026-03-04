import { useMemo } from "react";
import { useGetSegments } from "../hooks";
import { formatLength } from "../utilities";

export type SelectedSegmentsProps = {
  selectedSegments: string[];
  setSelectedSegments: React.Dispatch<React.SetStateAction<string[]>>;
};

export const SelectedSegments = ({
  selectedSegments,
  setSelectedSegments,
}: SelectedSegmentsProps) => {
  const { segments } = useGetSegments();
  const hasSelected = selectedSegments.length > 0;

  const onClearSelected = () => {
    setSelectedSegments([]);
  };

  const selectedRoute = useMemo(() => {
    if (!hasSelected) return [];
    return segments.filter((segment) => selectedSegments.includes(segment.id));
  }, [hasSelected, segments, selectedSegments]);

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
      <button
        className="button"
        disabled={!hasSelected}
        onClick={onClearSelected}
      >
        Clear
      </button>
    </div>
  );
};
