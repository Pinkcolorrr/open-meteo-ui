import { usePersistentState } from "@shared/hooks/use-persistent-state.tsx";
import { GeoLocation } from "@shared/utils/geo-location";

import { RECENT_LOCATION_KEY } from "./recent-locations-models.ts";

export function useRecentLocations(max = 5): {
  locations: GeoLocation[];
  pushLocation: (location: GeoLocation) => void;
} {
  const [locations, setLocations] = usePersistentState<GeoLocation[]>(RECENT_LOCATION_KEY, []);

  const pushLocation = (location: GeoLocation) => {
    setLocations((current) => {
      if (current.find((loc) => loc.lat === location.lat && loc.lon === location.lon)) {
        return current;
      }

      if (current.length < max) {
        return current.concat(location);
      }

      return current.slice(1, max).concat(location);
    });
  };

  return { locations, pushLocation };
}
