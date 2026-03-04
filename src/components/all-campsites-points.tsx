import { Marker, Tooltip } from "react-leaflet";
import { Icon, type LatLngExpression } from "leaflet";
import type { CampsiteSet } from "../types";

const tentIcon = new Icon({
  iconUrl: "icons/tent.svg",
  iconSize: [26, 26],
  iconAnchor: [13, 13],
});

export type CampsitesPointsProps = {
  campsites: CampsiteSet[];
};

export const AllCampsitesPoints = ({ campsites }: CampsitesPointsProps) => {
  return (
    <>
      {campsites.map((campsite) => {
        const key = campsite.coords.toString();
        const coords = campsite.coords as LatLngExpression;
        const lakes = campsite.lakes.map((lake) => lake.name).join(", ");
        const parks = campsite.parks.map((park) => park.name).join(", ");
        return (
          <Marker key={key} position={coords} icon={tentIcon} opacity={0.85}>
            <Tooltip sticky>
              <span>Lake(s): {lakes ? lakes : "-"}</span>
              <br />
              <span>Park(s): {parks ? parks : "-"}</span>
              <br />
              <span>
                Number:{" "}
                <strong>{campsite.number ? campsite.number : "-"}</strong>
              </span>
              {campsite.camped && (
                <>
                  <br />
                  <span>
                    Date(s) Camped:{" "}
                    {campsite.dates?.map((date) => date).join(", ")}
                  </span>
                  <br />
                  <span>Notes: {campsite.notes ? campsite.notes : "-"}</span>
                </>
              )}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
};
