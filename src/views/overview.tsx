import { MapContainer } from "react-leaflet";
import { AllSegmentsPaths, Layout, MapMeta } from "../components";
import { useGetSegments } from "../hooks";
import { MAP_CONFIG } from "../constants";

export const Overview = () => {
  const { segments, center } = useGetSegments();

  return (
    <Layout heading="Canoe Routes Mapper" className="home">
      <MapContainer
        center={center || MAP_CONFIG.CENTER}
        id={MAP_CONFIG.CONTAINER_ID}
        zoom={MAP_CONFIG.ZOOM}
      >
        <MapMeta />
        <AllSegmentsPaths segments={segments} />
      </MapContainer>
    </Layout>
  );
};
