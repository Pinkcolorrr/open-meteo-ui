import { useContext } from "react";

import { ActiveLocationContext } from "./active-location-context.ts";

export function useActiveLocation() {
  const context = useContext(ActiveLocationContext);

  if (!context) {
    throw new Error("useGeoLocation must be used within a LocationProvider");
  }

  return context;
}
