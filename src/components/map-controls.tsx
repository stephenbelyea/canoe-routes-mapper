export type MapControlsProps = {
  showCampsites: boolean;
  showSegments: boolean;
  setShowCampsites: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSegments: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MapControls = ({
  showCampsites,
  showSegments,
  setShowCampsites,
  setShowSegments,
}: MapControlsProps) => {
  return (
    <div className="map-controls">
      <strong>Showing:</strong>
      <button
        className="control"
        aria-pressed={showSegments}
        onClick={() => setShowSegments(!showSegments)}
      >
        Segments
      </button>
      <button
        className="control"
        aria-pressed={showCampsites}
        onClick={() => setShowCampsites(!showCampsites)}
      >
        Campsites
      </button>
    </div>
  );
};
