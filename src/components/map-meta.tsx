import { TileLayer, useMapEvents } from "react-leaflet";
import { MAP_CONFIG } from "../constants";

const trimValue = (value: number) => +value.toFixed(6);
const trimLatLng = ({ lat, lng }: { lat: number; lng: number }) => [
  trimValue(lat),
  trimValue(lng),
];

export const MapMeta = () => {
  useMapEvents({
    click: (event) => {
      console.log(trimLatLng(event.latlng));
    },
  });

  return (
    <TileLayer attribution={MAP_CONFIG.ATTRIBUTION} url={MAP_CONFIG.URL} />
  );
};
