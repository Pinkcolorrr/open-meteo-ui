import {
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  Cloudy,
  LucideProps,
  Moon,
  Snowflake,
  SunIcon,
} from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import * as react from "react";

export interface WeatherConditionsParams {
  snow?: number;
  rain?: number;
  clouds?: number;
  isNight?: boolean;
}

export type WeatherConditions =
  | "snow"
  | "rain"
  | "clouds"
  | "clear"
  | "night"
  | "snow_night"
  | "rain_night"
  | "clouds_night";

export const resolveWeatherConditionIcon = (
  conditions: WeatherConditionsParams,
): WeatherConditions => {
  if (conditions.snow && conditions.snow > 0) {
    return conditions.isNight ? "snow_night" : "snow";
  }

  if (conditions.rain && conditions.rain > 0) {
    return conditions.isNight ? "rain_night" : "rain";
  }

  if (conditions.clouds && conditions.clouds > 0) {
    return conditions.isNight ? "clouds_night" : "clouds";
  }

  return conditions.isNight ? "night" : "clear";
};

export const WEATHER_CONDITIONS_ICON_MAP = new Map<
  WeatherConditions,
  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>
>([
  ["clear", SunIcon],
  ["snow", Snowflake],
  ["rain", CloudRain],
  ["clouds", Cloudy],
  ["night", Moon],
  ["snow_night", Snowflake],
  ["rain_night", CloudMoonRain],
  ["clouds_night", CloudMoon],
]);

export function useWeatherCondition(params: WeatherConditionsParams) {
  const condition = resolveWeatherConditionIcon(params);
  const Icon = WEATHER_CONDITIONS_ICON_MAP.get(condition)!;
  return { condition, Icon };
}
