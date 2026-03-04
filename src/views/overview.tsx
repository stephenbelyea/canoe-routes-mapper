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
import { useState } from "react";

export const Overview = () => {
  const { segments, center } = useGetSegments();
  const { campsites } = useGetCampsites();

  const [showSegments, setShowSegments] = useState(true);
  const [showCampsites, setShowCampsites] = useState(true);

  return (
    <Layout
      heading="Canoe Routes Mapper"
      className="home"
      above={
        <MapControls
          showCampsites={showCampsites}
          showSegments={showSegments}
          setShowCampsites={setShowCampsites}
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
        <AllSegmentsPaths segments={showSegments ? segments : []} />
        <AllCampsitesPoints campsites={showCampsites ? campsites : []} />
      </MapContainer>
    </Layout>
  );
};
