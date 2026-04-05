import type { Coordinate } from "./common";

export type SavedRoute = {
  id: string;
  name: string;
  center: Coordinate;
  segments: string[];
  zoom: number;
};
