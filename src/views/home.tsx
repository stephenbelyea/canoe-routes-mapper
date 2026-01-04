import { MapContainer, TileLayer } from "react-leaflet";
import { icon } from "leaflet";
import { useGetSites } from "../hooks/use-get-sites";
import { useGetSegments } from "../hooks/use-get-segments";
import { Layout } from "../components/layout";
import { SiteMarker } from "../components/site-marker";
import { SegmentPath } from "../components/segment-path";
import { MAP_CONFIG, SITE_ICON_OPTIONS } from "../constants";

export const Home = () => {
  const { sites } = useGetSites();
  const { segments } = useGetSegments();

  const siteIcon = icon(SITE_ICON_OPTIONS);

  return (
    <Layout heading="Canoe Routes Mapper" className="home">
      <MapContainer
        center={MAP_CONFIG.CENTER}
        id={MAP_CONFIG.CONTAINER_ID}
        zoom={MAP_CONFIG.ZOOM}
      >
        <TileLayer attribution={MAP_CONFIG.ATTRIBUTION} url={MAP_CONFIG.URL} />
        {sites.map((site) => (
          <SiteMarker {...site} key={site.id} icon={siteIcon} />
        ))}
        {segments.map((segment, idx) => (
          <SegmentPath
            {...segment}
            key={segment.id}
            isLast={idx === segments.length - 1}
          />
        ))}
      </MapContainer>
    </Layout>
  );
};
