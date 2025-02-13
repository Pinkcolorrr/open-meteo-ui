import { useContext } from "react";

import { LocationContext } from "./location-context.ts";
import { GeoLocationContext } from "./models/geo-location-context.ts";

export function useGeoLocation(): GeoLocationContext {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useGeoLocation must be used within a LocationProvider");
  }

  return context;
}
