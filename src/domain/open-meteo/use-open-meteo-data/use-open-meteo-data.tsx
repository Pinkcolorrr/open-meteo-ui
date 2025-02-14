import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";
import { selectActiveLocation } from "@store/geo-location";
import { useAppSelector } from "@store/lib/hooks.ts";
import { RequestedValue } from "@store/lib/requested-value";
import { useEffect } from "react";

import { openMeteoApi } from "../open-meteo-api.ts";
import { OPEN_METEO_API_VARIABLES } from "./open-meteo-api-variables.ts";

export function useOpenMeteoData(): RequestedValue<
  WeatherData<HourlyVariable, DailyVariable, CurrentVariable> | undefined
> {
  const location = useAppSelector(selectActiveLocation);
  const [getForecast, params] = openMeteoApi.useLazyGetForecastQuery();

  useEffect(() => {
    if (location.data?.lon && location.data?.lat) {
      getForecast({
        longitude: location.data.lon,
        latitude: location.data.lat,
        ...OPEN_METEO_API_VARIABLES,
      });
    }
  }, [location.data?.lon, location.data?.lat]);

  return {
    ...params,
    isLoading: params.isFetching,
    data: params.data ?? null,
    error: params.error as string,
  };
}
