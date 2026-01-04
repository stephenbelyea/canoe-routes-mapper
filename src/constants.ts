import type { IconOptions, LatLngExpression } from "leaflet";

export const MAP_CONFIG = {
  ATTRIBUTION:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  CENTER: [47.311, -80.22] as LatLngExpression,
  CONTAINER_ID: "map",
  SCROLL_ZOOM: false,
  URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ZOOM: 12,
};

export const BASE_ICON_SIZE = 24;
export const SITE_ICON_OPTIONS: IconOptions = {
  iconUrl: "icons/tent.svg",
  iconSize: [BASE_ICON_SIZE, BASE_ICON_SIZE],
  iconAnchor: [BASE_ICON_SIZE * 0.5, BASE_ICON_SIZE * 0.85],
  tooltipAnchor: [BASE_ICON_SIZE * 0.35, BASE_ICON_SIZE * -0.35],
};
