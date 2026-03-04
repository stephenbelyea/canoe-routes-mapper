export type MapControlsProps = {
  showCampsites: boolean;
  showHaveCamped: boolean;
  showSegments: boolean;
  setShowCampsites: React.Dispatch<React.SetStateAction<boolean>>;
  setShowHaveCamped: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSegments: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MapControls = ({
  showCampsites,
  showHaveCamped,
  showSegments,
  setShowCampsites,
  setShowHaveCamped,
  setShowSegments,
}: MapControlsProps) => {
  return (
    <>
      <div className="map-controls">
        <strong>Showing:</strong>
        <button
          className="control button"
          aria-pressed={showSegments}
          onClick={() => setShowSegments(!showSegments)}
        >
          Segments
        </button>
        <button
          className="control button"
          aria-pressed={showCampsites}
          onClick={() => setShowCampsites(!showCampsites)}
        >
          Campsites
        </button>
        <button
          className="control button"
          aria-pressed={showHaveCamped}
          onClick={() => setShowHaveCamped(!showHaveCamped)}
          disabled={!showCampsites}
        >
          Only Sites I've Camped At
        </button>
      </div>
    </>
  );
};
