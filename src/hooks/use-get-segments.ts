/* eslint-disable @typescript-eslint/no-explicit-any */
import * as data from "../data/temagami-segments-jan-2025.json";

export const useGetSegments = () => {
  console.log("Data: ", data);
  return data as any;
};
