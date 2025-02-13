import { CloudRain, Cloudy, LucideProps, Snowflake, SunIcon } from "lucide-react";
import { ForwardRefExoticComponent } from "react";
import * as react from "react";

export interface WeatherConditionsParams {
  snow?: number;
  rain?: number;
  clouds?: number;
}

export type WeatherConditions = "snow" | "rain" | "clouds" | "clear";

export const resolveWeatherConditionIcon = (conditions: WeatherConditionsParams) => {
  if (conditions.snow && conditions.snow > 0) {
    return "snow";
  }

  if (conditions.rain && conditions.rain > 0) {
    return "rain";
  }

  if (conditions.clouds && conditions.clouds > 0) {
    return "clouds";
  }

  return "clear";
};

export const WEATHER_CONDITIONS_ICON_MAP = new Map<
  WeatherConditions,
  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & react.RefAttributes<SVGSVGElement>>
>([
  ["snow", Snowflake],
  ["rain", CloudRain],
  ["clouds", Cloudy],
  ["clear", SunIcon],
]);

export function useWeatherCondition(params: WeatherConditionsParams) {
  const condition = resolveWeatherConditionIcon(params);
  const Icon = WEATHER_CONDITIONS_ICON_MAP.get(condition)!;
  return { condition, Icon };
}
