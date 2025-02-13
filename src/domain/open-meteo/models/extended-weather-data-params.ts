import { HourlyVariable, WeatherDataParams } from "@atombrenner/openmeteo";

export interface ExtendedWeatherDataParams extends Omit<WeatherDataParams, "hourly"> {
  hourly: (HourlyVariable | "precipitation_probability")[];
}
