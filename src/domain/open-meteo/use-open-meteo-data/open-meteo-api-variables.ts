import { WeatherDataParams } from "@atombrenner/openmeteo";

export const OPEN_METEO_API_VARIABLES: Omit<WeatherDataParams, "longitude" | "latitude"> = {
  hourly: [
    "temperature_2m",
    "is_day",
    "rain",
    "snowfall",
    "cloud_cover",
    "precipitation",
    "showers",
  ],
  current: [
    "temperature_2m",
    "weather_code",
    "cloud_cover",
    "wind_speed_10m",
    "rain",
    "snowfall",
    "precipitation",
    "showers",
  ],
  daily: [
    "temperature_2m_max",
    "temperature_2m_min",
    "rain_sum",
    "snowfall_sum",
    "precipitation_sum",
    "showers_sum",
  ],
  forecast_days: 10,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};
