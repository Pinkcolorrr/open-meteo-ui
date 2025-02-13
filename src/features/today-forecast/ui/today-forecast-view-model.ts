import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";

export interface TodayForecastViewModel {
  hour: number;
  temperature: number;
  isDay: boolean;
  rain: number;
  snow: number;
  clouds: number;
}

export const toViewModel = (
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable>,
): TodayForecastViewModel[] => {
  return data.hourly.time.slice(0, 24).map((unixTimestamp, index) => ({
    hour: new Date(unixTimestamp * 1000).getHours(),
    temperature: Math.round(data.hourly.temperature_2m[index]),
    isDay: Boolean(data.hourly.is_day[index]),
    rain: data.hourly.rain[index] || data.hourly.showers[index],
    snow: data.hourly.snowfall[index],
    clouds: data.hourly.cloud_cover[index],
  }));
};
