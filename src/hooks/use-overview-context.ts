import { useMemo, useState } from "react";
import { useGetSavedRoutes } from "./use-get-saved-routes";
import { useGetCampsites } from "./use-get-campsites";
import { useGetSegments } from "./use-get-segments";
import type { SavedRoute, RoutesContextType } from "../types";

export const useOverviewContext = () => {
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

  return {
    segments,
    center,
    campsites,
    savedRoutes,
    showSegments,
    setShowSegments,
    showCampsites,
    setShowCampsites,
    showHaveCamped,
    setShowHaveCamped,
    selectedSegments,
    setSelectedSegments,
    savedRoute,
    setSavedRoute,
    allSegments,
    allCampsites,
    selectedRoute,
    savedRoutesOptions,
    setSelectSavedRoute,
  } as RoutesContextType;
};
