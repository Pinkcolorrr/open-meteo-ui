import { osmApi } from "@domain/osm";
import { Coords } from "@shared/models/coords.ts";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { GeoLocation } from "../models/geo-location.ts";
import { useUserGeoLocation } from "../user-location/use-user-geo-location.ts";
import { CurrentLocationContext } from "./current-location-context.ts";

export function CurrentLocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [params] = useSearchParams();
  const [getReverseLocation, { isLoading: reverseLoading }] = osmApi.useLazyGetReverseGeoQuery();

  const { location: userLocation, isLoading, error } = useUserGeoLocation();

  const getLocationByCoords = async (coords: Coords) => {
    try {
      const location = await getReverseLocation(coords);

      if (!location.data) {
        throw new Error("Could not find location");
      }

      return {
        lat: Number(location.data.lat),
        lon: Number(location.data.lon),
        city: location.data.address.city,
        country: location.data.address.country,
        countryCode: location.data.address.country_code,
      };
    } catch (err) {
      console.error(err);
    }
  };

  const resolveLocation = async () => {
    const lat = params.has("lat") && Number(params.get("lat"));
    const lon = params.has("lon") && Number(params.get("lon"));

    if (lat && lon) {
      const data = await getLocationByCoords({ lat, lon });
      if (data) {
        setLocation(data);
        return;
      }
    }

    setLocation(userLocation);
  };

  useEffect(() => {
    resolveLocation();
  }, [params, userLocation]);

  return (
    <CurrentLocationContext.Provider
      value={{ error, isLoading: isLoading || reverseLoading, location }}
    >
      {children}
    </CurrentLocationContext.Provider>
  );
}
