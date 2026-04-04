import { MapContainer } from "react-leaflet";
import {
  AllCampsitesPoints,
  AllSegmentsPaths,
  Layout,
  MapControls,
  MapMeta,
  SelectedRoute,
} from "../components";
import { useOverviewContext } from "../hooks/use-overview-context";
import { MAP_CONFIG } from "../constants";
import { RoutesContext } from "../context/routes-context";
import type { RoutesContextType } from "../types/routes-context";

export const Overview = () => {
  const context: RoutesContextType = useOverviewContext();
  const { center, selectedRoute, allSegments, allCampsites } = context;

  return (
    <RoutesContext.Provider value={context}>
      <Layout
        heading="Canoe Routes Mapper"
        className="home"
        above={<MapControls />}
      >
        <SelectedRoute />
        <MapContainer
          center={center || MAP_CONFIG.CENTER}
          id={MAP_CONFIG.CONTAINER_ID}
          zoom={MAP_CONFIG.ZOOM}
        >
          <MapMeta />
          <AllSegmentsPaths segments={allSegments} />
          <AllSegmentsPaths segments={selectedRoute} isSelectedSet />
          <AllCampsitesPoints campsites={allCampsites} />
        </MapContainer>
      </Layout>
    </RoutesContext.Provider>
  );
};
