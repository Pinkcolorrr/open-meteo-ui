import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";
import { useCurrentLocation } from "@shared/utils/geo-location";
import { useEffect, useState } from "react";

import { openMeteoApi } from "../open-meteo-api.ts";
import { OPEN_METEO_API_VARIABLES } from "./open-meteo-api-variables.ts";

export function useOpenMeteoData(): {
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable> | undefined;
  isLoading: boolean;
  error: unknown;
} {
  const { location, isLoading: locationLoading } = useCurrentLocation();
  const [getForecast, { data, isLoading: dataLoading, error }] =
    openMeteoApi.useLazyGetForecastQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (location) {
      getForecast({
        longitude: location.lon,
        latitude: location.lat,
        ...OPEN_METEO_API_VARIABLES,
      });
    }
  }, [location]);

  useEffect(() => {
    if (dataLoading || locationLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [dataLoading, locationLoading]);

  return { data, isLoading, error };
}
