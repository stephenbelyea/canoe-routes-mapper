import type { ReactNode } from "react";
import { Marker, Tooltip } from "react-leaflet";
import type { Icon, IconOptions, LatLngExpression } from "leaflet";
import type { MapSite } from "../hooks/use-get-sites";

export interface SiteMarkerProps extends MapSite {
  icon: Icon<IconOptions>;
}

export const SiteMarker = ({ icon, point, id }: SiteMarkerProps) => (
  <Marker position={point} icon={icon} opacity={0.95}>
    <Tooltip>Site {id}</Tooltip>
  </Marker>
);
