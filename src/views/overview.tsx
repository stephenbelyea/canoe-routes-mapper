import { MapContainer } from "react-leaflet";
import {
  AllCampsitesPoints,
  AllSegmentsPaths,
  Layout,
  MapControls,
  MapMeta,
} from "../components";
import { useGetCampsites, useGetSegments } from "../hooks";
import { MAP_CONFIG } from "../constants";
import { useMemo, useState } from "react";

export const Overview = () => {
  const { segments, center } = useGetSegments();
  const { campsites } = useGetCampsites();

  const [showSegments, setShowSegments] = useState(true);
  const [showCampsites, setShowCampsites] = useState(true);
  const [showHaveCamped, setShowHaveCamped] = useState(false);

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
      <MapContainer
        center={center || MAP_CONFIG.CENTER}
        id={MAP_CONFIG.CONTAINER_ID}
        zoom={MAP_CONFIG.ZOOM}
      >
        <MapMeta />
        <AllSegmentsPaths segments={allSegments} />
        <AllCampsitesPoints campsites={allCampsites} />
      </MapContainer>
    </Layout>
  );
};
