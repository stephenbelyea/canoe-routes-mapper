import { MapContainer } from "react-leaflet";
import { icon } from "leaflet";
import { useGetSegments, useGetSites } from "../hooks";
import { Layout, MapMeta, PathSegments, SiteMarker } from "../components";
import { MAP_CONFIG, SITE_ICON_OPTIONS } from "../constants";

export const Home = () => {
  const { sites } = useGetSites();
  const { paths } = useGetSegments();

  const siteIcon = icon(SITE_ICON_OPTIONS);

  return (
    <Layout heading="Canoe Routes Mapper" className="home">
      <MapContainer
        center={MAP_CONFIG.CENTER}
        id={MAP_CONFIG.CONTAINER_ID}
        zoom={MAP_CONFIG.ZOOM}
      >
        <MapMeta />
        {sites.map((site) => (
          <SiteMarker {...site} key={site.id} icon={siteIcon} />
        ))}
        {paths.map((path) => (
          <PathSegments {...path} key={path.id} />
        ))}
      </MapContainer>
    </Layout>
  );
};
