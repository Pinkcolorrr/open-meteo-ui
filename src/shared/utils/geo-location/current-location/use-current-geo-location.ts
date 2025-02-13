import { useContext } from "react";

import { GeoLocationData } from "../models/geo-location-data.ts";
import { CurrentLocationContext } from "./current-location-context.ts";

export function useCurrentGeoLocation(): GeoLocationData {
  const context = useContext(CurrentLocationContext);

  if (!context) {
    throw new Error("useGeoLocation must be used within a LocationProvider");
  }

  return context;
}
