import { useContext } from "react";

import { GeoLocationData } from "../models/geo-location-data.ts";
import { UserLocationContext } from "./user-location-context.ts";

export function useUserGeoLocation(): GeoLocationData {
  const context = useContext(UserLocationContext);

  if (!context) {
    throw new Error("useGeoLocation must be used within a LocationProvider");
  }

  return context;
}
