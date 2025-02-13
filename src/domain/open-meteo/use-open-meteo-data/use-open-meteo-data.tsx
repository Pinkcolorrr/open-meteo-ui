import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";
import { useGeoLocation } from "@shared/lib/hooks/useGeoLocation.ts";
import { useEffect, useState } from "react";

import { openMeteoApi } from "../open-meteo-api.ts";
import { OPEN_METEO_API_VARIABLES } from "./open-meteo-api-variables.ts";

export function useOpenMeteoData(): {
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable> | undefined;
  isLoading: boolean;
  error: unknown;
} {
  const [location, locationLoading] = useGeoLocation();
  const [getForecast, { data, isLoading: dataLoading, error }] =
    openMeteoApi.useLazyGetForecastQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!locationLoading) {
      getForecast({
        longitude: location ? location.lon : 0,
        latitude: location ? location.lat : 0,
        ...OPEN_METEO_API_VARIABLES,
      });
    }
  }, [getForecast, location, locationLoading]);

  useEffect(() => {
    if (dataLoading || locationLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [dataLoading, locationLoading]);

  return { data, isLoading, error };
}
