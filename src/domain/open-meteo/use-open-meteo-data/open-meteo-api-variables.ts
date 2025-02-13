import { ExtendedWeatherDataParams } from "../models/extended-weather-data-params.ts";

export const OPEN_METEO_API_VARIABLES: Omit<ExtendedWeatherDataParams, "latitude" | "longitude"> = {
  hourly: [
    "temperature_2m",
    "is_day",
    "rain",
    "snowfall",
    "cloud_cover",
    "showers",
    "precipitation_probability",
  ],
  current: ["temperature_2m", "cloud_cover", "rain", "snowfall", "showers"],
  daily: [
    "temperature_2m_max",
    "temperature_2m_min",
    "rain_sum",
    "snowfall_sum",
    "showers_sum",
    "precipitation_probability_max",
  ],
  forecast_days: 10,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};
