import { useContext } from "react";
import { Button } from "./button";
import { Select } from "./select";
import { RoutesContext } from "../context/routes-context";

export const MapControls = () => {
  const {
    showCampsites,
    showHaveCamped,
    showSegments,
    savedRoute,
    savedRoutesOptions,
    setShowCampsites,
    setShowHaveCamped,
    setShowSegments,
    setSelectSavedRoute,
  } = useContext(RoutesContext);
  return (
    <>
      <div className="map-controls flex">
        <div className="layers">
          <p>
            <strong>Layer Options:</strong>
          </p>
          <div className="flex">
            <Button
              toggle
              pressed={showSegments}
              onClick={() => setShowSegments(!showSegments)}
            >
              Segments
            </Button>
            <Button
              toggle
              pressed={showCampsites}
              onClick={() => setShowCampsites(!showCampsites)}
            >
              Campsites
            </Button>
            <Button
              toggle
              pressed={showHaveCamped}
              onClick={() => setShowHaveCamped(!showHaveCamped)}
              disabled={!showCampsites}
            >
              Only Sites With Notes
            </Button>
          </div>
        </div>
        <div className="routes">
          <p id="saved-routes-label">
            <strong>Saved Routes:</strong>
          </p>
          <div className="flex">
            <Select
              label="saved routes"
              selected={savedRoute}
              options={savedRoutesOptions}
              onChange={setSelectSavedRoute}
            />
          </div>
        </div>
      </div>
    </>
  );
};
