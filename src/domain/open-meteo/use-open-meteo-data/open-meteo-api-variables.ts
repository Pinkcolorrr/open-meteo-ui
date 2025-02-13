import { WeatherDataParams } from "@atombrenner/openmeteo";

export const OPEN_METEO_API_VARIABLES: Omit<WeatherDataParams, "longitude" | "latitude"> = {
  hourly: ["temperature_2m", "is_day"],
  current: ["temperature_2m", "precipitation", "weather_code", "cloud_cover", "wind_speed_10m"],
  daily: ["temperature_2m_max", "temperature_2m_min"],
  forecast_days: 1,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
};
