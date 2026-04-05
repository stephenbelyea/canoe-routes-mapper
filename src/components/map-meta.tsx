import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { TileLayer, useMap, useMapEvents } from "react-leaflet";
import { RoutesContext } from "../context/routes-context";
import { MAP_CONFIG } from "../constants";

const trimValue = (value: number) => +value.toFixed(6);
const trimLatLng = ({ lat, lng }: { lat: number; lng: number }) => [
  trimValue(lat),
  trimValue(lng),
];

export const MapMeta = () => {
  const map = useMap();
  const { savedRouteId } = useParams();
  const { savedRoutes } = useContext(RoutesContext);

  useMapEvents({
    click: (event) => {
      console.log(trimLatLng(event.latlng));
    },
  });

  useEffect(() => {
    if (savedRouteId) {
      const savedRoute = savedRoutes.find(({ id }) => id === savedRouteId);
      const center = savedRoute?.center || MAP_CONFIG.CENTER;
      map.setView(center, MAP_CONFIG.ZOOM_SELECTED);
    }
    if (!savedRouteId) {
      map.setView(MAP_CONFIG.CENTER, MAP_CONFIG.ZOOM);
    }
  }, [savedRouteId, savedRoutes, map]);

  return (
    <TileLayer attribution={MAP_CONFIG.ATTRIBUTION} url={MAP_CONFIG.URL} />
  );
};
