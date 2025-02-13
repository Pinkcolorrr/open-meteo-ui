import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";

import { TodayForecastViewModel } from "../today-forecast-view-model.ts";

export const toViewModel = (
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable>,
): TodayForecastViewModel[] => {
  return data.hourly.time.map((unixTimestamp, index) => ({
    hour: new Date(unixTimestamp * 1000).getHours(),
    temperature: Math.round(data.hourly.temperature_2m[index]),
    isDay: Boolean(data.hourly.is_day[index]),
  }));
};
