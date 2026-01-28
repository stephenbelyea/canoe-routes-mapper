import { MapContainer } from "react-leaflet";
import { Layout, MapMeta } from "../components";
import { useGetSegments } from "../hooks";
import { MAP_CONFIG } from "../constants";

export const Overview = () => {
  const segments = useGetSegments();
  console.log("Segments: ", segments);

  return (
    <Layout heading="Canoe Routes Mapper" className="home">
      <MapContainer
        center={MAP_CONFIG.CENTER}
        id={MAP_CONFIG.CONTAINER_ID}
        zoom={MAP_CONFIG.ZOOM}
      >
        <MapMeta />
      </MapContainer>
    </Layout>
  );
};
