import { osmApi } from "@domain/osm";
import { Coords } from "@shared/models/coords.ts";
import { useCurrentGeoLocation } from "@shared/utils/geo-location/current-location/use-current-geo-location.ts";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { GeoLocation } from "../models/geo-location.ts";
import { ActiveLocationContext } from "./active-location-context.ts";

type paramsDataSource = `params?lat=${number}&lon=${number}`;

export function ActiveLocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [params] = useSearchParams();
  const [dataSource, setDataSource] = useState<"user" | paramsDataSource | null>(null);
  const lat = params.has("lat") && Number(params.get("lat"));
  const lon = params.has("lon") && Number(params.get("lon"));

  const [getReverseLocation, { isLoading: reverseLoading }] = osmApi.useLazyGetReverseGeoQuery();
  const { location: userLocation, isLoading, error } = useCurrentGeoLocation();

  const isUserLocation =
    (location?.city === userLocation?.city && location?.country === userLocation?.country) ||
    (location?.lat === userLocation?.lat && location?.lon === userLocation?.lon);

  const getLocationByCoords = async (coords: Coords) => {
    try {
      const location = await getReverseLocation(coords);

      if (!location.data) {
        throw new Error("Could not find location");
      }

      return {
        lat: Number(location.data.lat),
        lon: Number(location.data.lon),
        city: location.data.address.city ?? location.data.address.town,
        country: location.data.address.country,
        countryCode: location.data.address.country_code,
      };
    } catch (err) {
      console.error(err);
    }
  };

  const resolveLocation = async (source: "user" | paramsDataSource) => {
    if (source.includes("params") && lat && lon) {
      const data = await getLocationByCoords({ lat: lat!, lon: lon! });
      if (data) {
        setLocation(data);
        return;
      }
    }

    setLocation(userLocation);
  };

  useEffect(() => {
    if (dataSource) {
      resolveLocation(dataSource);
    }
  }, [dataSource]);

  useEffect(() => {
    if (lat && lon) {
      setDataSource(`params?lat=${lat}&lon=${lon}`);
    } else if (userLocation) {
      setDataSource("user");
    }
  }, [lat, lon, userLocation]);

  return (
    <ActiveLocationContext.Provider
      value={{
        error,
        isLoading: isLoading || reverseLoading,
        location,
        isUserLocation,
      }}
    >
      {children}
    </ActiveLocationContext.Provider>
  );
}
