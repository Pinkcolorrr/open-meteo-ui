import { useContext } from "react";

import { CurrentLocationContext } from "./current-location-context.ts";

export function useCurrentLocation() {
  const context = useContext(CurrentLocationContext);

  if (!context) {
    throw new Error("useGeoLocation must be used within a LocationProvider");
  }

  return context;
}
