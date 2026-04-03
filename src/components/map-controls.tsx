import { Button } from "./button";
import { Select, type SelectOption } from "./select";

export type MapControlsProps = {
  showCampsites: boolean;
  showHaveCamped: boolean;
  showSegments: boolean;
  selectedRoute: string;
  savedRoutesOptions: SelectOption[];
  setShowCampsites: React.Dispatch<React.SetStateAction<boolean>>;
  setShowHaveCamped: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSegments: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedRoute: React.Dispatch<React.ChangeEvent<HTMLSelectElement>>;
};

export const MapControls = ({
  showCampsites,
  showHaveCamped,
  showSegments,
  selectedRoute,
  savedRoutesOptions,
  setShowCampsites,
  setShowHaveCamped,
  setShowSegments,
  setSelectedRoute,
}: MapControlsProps) => {
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
              selected={selectedRoute}
              options={savedRoutesOptions}
              onChange={setSelectedRoute}
            />
          </div>
        </div>
      </div>
    </>
  );
};
