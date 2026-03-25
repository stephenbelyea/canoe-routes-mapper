import { useMemo, useState } from "react";
import { MapContainer } from "react-leaflet";
import {
  AllCampsitesPoints,
  AllSegmentsPaths,
  Layout,
  MapControls,
  MapMeta,
  SelectedRoute,
} from "../components";
import { useGetCampsites, useGetSegments } from "../hooks";
import { MAP_CONFIG } from "../constants";
import { useGetSavedRoutes } from "../hooks/use-get-saved-routes";
import type { SavedRoute } from "../types/saved-routes-data";

export const Overview = () => {
  const { segments, center } = useGetSegments();
  const { campsites } = useGetCampsites();
  const { savedRoutes } = useGetSavedRoutes();

  const [showSegments, setShowSegments] = useState(true);
  const [showCampsites, setShowCampsites] = useState(false);
  const [showHaveCamped, setShowHaveCamped] = useState(false);
  const [selectedSegments, setSelectedSegments] = useState<string[]>([]);
  const [savedRoute, setSavedRoute] = useState<string>("");

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

  const selectedRoute = useMemo(() => {
    if (selectedSegments.length === 0) return [];
    return segments.filter((segment) => selectedSegments.includes(segment.id));
  }, [selectedSegments, segments]);

  const savedRoutesOptions = useMemo(() => {
    if (savedRoutes.length === 0) return [];
    return [
      { value: "", label: "Select a saved route" },
      ...savedRoutes.map((route: SavedRoute) => ({
        value: route.id,
        label: route.name,
      })),
    ];
  }, [savedRoutes]);

  const setSelectSavedRoute = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const segments = [];

    if (value !== "") {
      const saved = savedRoutes.find(({ id }) => id === value);
      if (saved) {
        segments.push(...saved.segments);
      }
    }

    setSavedRoute(value);
    setSelectedSegments(segments);
  };

  return (
    <Layout
      heading="Canoe Routes Mapper"
      className="home"
      above={
        <MapControls
          showCampsites={showCampsites}
          showHaveCamped={showHaveCamped}
          showSegments={showSegments}
          selectedRoute={savedRoute}
          savedRoutesOptions={savedRoutesOptions}
          setShowCampsites={setShowCampsites}
          setShowHaveCamped={setShowHaveCamped}
          setShowSegments={setShowSegments}
          setSelectedRoute={setSelectSavedRoute}
        />
      }
    >
      <SelectedRoute
        selectedRoute={selectedRoute}
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
        <AllSegmentsPaths
          isSelectedSet
          segments={selectedRoute}
          selectedSegments={selectedSegments}
          setSelectedSegments={setSelectedSegments}
        />
        <AllCampsitesPoints campsites={allCampsites} />
      </MapContainer>
    </Layout>
  );
};
