import { useContext, useMemo } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { RoutesContext } from "../context/routes-context";
import { formatLength } from "../utilities";
import { Button } from "./button";

export const SelectedRoute = () => {
  const { selectedRoute, selectedSegments, setSelectedSegments } =
    useContext(RoutesContext);
  const hasSelected = selectedSegments.length > 0;

  const onClearSelected = () => {
    if (
      window.confirm("Are you sure you want to clear the selected segments?")
    ) {
      setSelectedSegments([]);
    }
  };

  const totalLength = useMemo(() => {
    let length = 0;
    selectedRoute.forEach((segment) => {
      length += segment.length;
    });
    return formatLength(length);
  }, [selectedRoute]);

  const selectedSegmentsString = useMemo(() => {
    if (selectedSegments.length === 0) return "";
    return JSON.stringify(selectedSegments);
  }, [selectedSegments]);

  const onCopySegments = () => {
    window.alert("Selected segments have been copied to your clipboard!");
  };

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
      <CopyToClipboard text={selectedSegmentsString} onCopy={onCopySegments}>
        <Button size="small" disabled={!hasSelected}>
          Save
        </Button>
      </CopyToClipboard>
    </div>
  );
};
