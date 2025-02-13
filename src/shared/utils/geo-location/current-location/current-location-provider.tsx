import { ipApi } from "@domain/ip-api/ip-api.ts";
import { osmApi } from "@domain/osm";
import { getCurrentPositionAsync } from "@shared/utils/async-navigator-geolocation.ts";
import { ReactNode, useEffect, useState } from "react";

import { GeoLocation } from "../models/geo-location.ts";
import { CurrentLocationContext } from "./current-location-context.ts";

const FAKE_LOCATION_DATA: GeoLocation = {
  lat: 51.50853,
  lon: -0.12574,
  city: "London",
  country: "United Kingdom",
  countryCode: "UK",
};

export const CurrentLocationProvider = ({ children }: { children: ReactNode }) => {
  const [getIpLocation, { isLoading: ipLoading }] = ipApi.useLazyResolveIpQuery();
  const [getReverseLocation, { isLoading: reverseLoading }] = osmApi.useLazyGetReverseGeoQuery();
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const resolveLocationByNavigator = async (): Promise<GeoLocation | undefined> => {
    try {
      const position = await getCurrentPositionAsync();
      const response = await getReverseLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });

      if (response.error) {
        throw response.error;
      }

      if (response.data) {
        return {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          city: response.data.address.city,
          country: response.data.address.country,
          countryCode: response.data.address.country_code,
        };
      }
    } catch (error) {
      console.error("Failed while resolve location by navigator", error);
    }
  };

  const resolveLocationByIp = async (): Promise<GeoLocation | undefined> => {
    try {
      const response = await getIpLocation();
      if (response.data) {
        return {
          lat: response.data.lat,
          lon: response.data.lon,
          city: response.data.city,
          country: response.data.country,
          countryCode: response.data.countryCode,
        };
      }
    } catch (error) {
      console.error("Failed while resolve location by IP", error);
    }
  };

  const resolveLocation = async () => {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });
    if (permission.state === "granted") {
      const result = await resolveLocationByNavigator();
      if (result) {
        setLocation(result);
        return;
      }
    }

    const ipResult = await resolveLocationByIp();
    if (ipResult) {
      setLocation(ipResult);
    }

    const navigatorResult = await resolveLocationByNavigator();
    if (navigatorResult) {
      setLocation(navigatorResult);
      return;
    }

    setError("Unable to resolve location");
    setLocation(FAKE_LOCATION_DATA);
  };

  useEffect(() => {
    resolveLocation();
  }, []);

  useEffect(() => {
    if (ipLoading || reverseLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [ipLoading, reverseLoading]);

  return (
    <CurrentLocationContext.Provider value={{ location, isLoading, error }}>
      {children}
    </CurrentLocationContext.Provider>
  );
};
