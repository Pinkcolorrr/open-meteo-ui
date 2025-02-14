import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";
import { selectActiveLocation } from "@store/geo-location";
import { useAppSelector } from "@store/hooks.ts";
import { useEffect } from "react";

import { openMeteoApi } from "../open-meteo-api.ts";
import { OPEN_METEO_API_VARIABLES } from "./open-meteo-api-variables.ts";

export function useOpenMeteoData(): {
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable> | undefined;
  isLoading: boolean;
  error: unknown;
} {
  const location = useAppSelector(selectActiveLocation);
  const [getForecast, { data, isFetching, error }] = openMeteoApi.useLazyGetForecastQuery();
  useEffect(() => {
    if (location.data) {
      getForecast({
        longitude: location.data.lon,
        latitude: location.data.lat,
        ...OPEN_METEO_API_VARIABLES,
      });
    }
  }, [location.data?.lon, location.data?.lat]);

  return { data, isLoading: isFetching, error };
}
