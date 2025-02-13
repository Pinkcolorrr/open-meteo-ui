import { ipApi } from "@domain/ip-api/ip-api.ts";
import { osmApi } from "@domain/osm";
import { Coords } from "@shared/models/coords.ts";
import { getCurrentPositionAsync } from "@shared/utils/async-navigator-geolocation.ts";
import { useEffect, useState } from "react";

export interface GeoLocation extends Coords {
  lat: number;
  lon: number;
  city: string;
  country: string;
  countryCode: string;
  timezone: string;
}

const FAKE_LOCATION_DATA: GeoLocation = {
  lat: 51.50853,
  lon: -0.12574,
  city: "London",
  country: "United Kingdom",
  countryCode: "UK",
  timezone: "Greenwich Mean Time",
};

export function useGeoLocation(): {
  location: GeoLocation | null;
  error: unknown;
  isLoading: boolean;
} {
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
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
      }
    } catch (error) {
      console.error("Failed while resolve location by IP", error);
    }
  };

  const resolveLocation = async () => {
    const permission = await navigator.permissions.query({ name: "geolocation" });
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

  return { location, isLoading, error };
}
