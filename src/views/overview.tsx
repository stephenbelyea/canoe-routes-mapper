import { MapContainer } from "react-leaflet";
import {
  AllCampsitesPoints,
  AllSegmentsPaths,
  Layout,
  MapControls,
  MapMeta,
  SelectedSegments,
} from "../components";
import { useGetCampsites, useGetSegments } from "../hooks";
import { MAP_CONFIG } from "../constants";
import { useMemo, useState } from "react";

export const Overview = () => {
  const { segments, center } = useGetSegments();
  const { campsites } = useGetCampsites();

  const [showSegments, setShowSegments] = useState(true);
  const [showCampsites, setShowCampsites] = useState(false);
  const [showHaveCamped, setShowHaveCamped] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);

  const allSegments = useMemo(
    () => (showSegments ? segments : []),
    [showSegments, segments],
  );
  const allCampsites = useMemo(() => {
    if (!showCampsites) return [];
    if (showHaveCamped) {
      return campsites.filter((campsite) => campsite.camped);
    }
    return campsites;
  }, [showCampsites, showHaveCamped, campsites]);

  return (
    <Layout
      heading="Canoe Routes Mapper"
      className="home"
      above={
        <MapControls
          showCampsites={showCampsites}
          showHaveCamped={showHaveCamped}
          showSegments={showSegments}
          setShowCampsites={setShowCampsites}
          setShowHaveCamped={setShowHaveCamped}
          setShowSegments={setShowSegments}
        />
      }
    >
      <SelectedSegments
        selectedSegments={selectedSegments}
        setSelectedSegments={setSelectedSegments}
      />
      <MapContainer
        center={center || MAP_CONFIG.CENTER}
        id={MAP_CONFIG.CONTAINER_ID}
        zoom={MAP_CONFIG.ZOOM}
      >
        <MapMeta />
        <AllSegmentsPaths
          segments={allSegments}
          selectedSegments={selectedSegments}
          setSelectedSegments={setSelectedSegments}
        />
        <AllCampsitesPoints campsites={allCampsites} />
      </MapContainer>
    </Layout>
  );
};
