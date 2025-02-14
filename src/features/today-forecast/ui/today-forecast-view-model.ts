import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";

export interface TodayForecastViewModel {
  date: number;
  temperature: number;
  isDay: boolean;
  rain: number;
  snow: number;
  clouds: number;
}

export const toViewModel = (
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable>,
  from?: number,
): TodayForecastViewModel[] => {
  const fromIndex = data.hourly.time.findIndex((v) => v * 1000 === from);
  const toIndex = fromIndex + 24;

  return data.hourly.time.slice(fromIndex, toIndex).map((unixTimestamp, index) => ({
    date: new Date(unixTimestamp * 1000).getTime(),
    temperature: Math.round(data.hourly.temperature_2m[index + fromIndex]),
    isDay: Boolean(data.hourly.is_day[index + fromIndex]),
    rain: data.hourly.rain[index + fromIndex] || data.hourly.showers[index + fromIndex],
    snow: data.hourly.snowfall[index + fromIndex],
    clouds: data.hourly.cloud_cover[index + fromIndex],
  }));
};
