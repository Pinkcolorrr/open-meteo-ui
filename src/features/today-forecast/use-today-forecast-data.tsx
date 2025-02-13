import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";
import { openMeteoApi } from "@domain/open-meteo";
import { useGeoLocation } from "@shared/lib/hooks/useGeoLocation.ts";
import { useEffect, useState } from "react";

export function useTodayForecastData(): [
  WeatherData<HourlyVariable, DailyVariable, CurrentVariable> | undefined,
  boolean,
  unknown,
] {
  const [location, locationLoading] = useGeoLocation();
  const [getForecast, { data, isLoading: dataLoading, error }] =
    openMeteoApi.useLazyGetForecastQuery();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!locationLoading) {
      getForecast({
        longitude: location ? location.lon : 0,
        latitude: location ? location.lat : 0,
        hourly: ["temperature_2m", "is_day"],
        forecast_days: 1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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

  return [data, isLoading, error];
}
