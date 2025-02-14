import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";

export interface FeatureWeatherViewModel {
  date: Date;
  maxTemperature: number;
  minTemperature: number;
  rain: number;
  snow: number;
  precipitation: number;
}

export function toViewModel(
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable>,
): FeatureWeatherViewModel[] {
  return data.daily.time.map((date, index) => ({
    date: new Date(date * 1000),
    maxTemperature: Math.round(data.daily.temperature_2m_max[index]),
    minTemperature: Math.round(data.daily.temperature_2m_min[index]),
    rain: data.daily.rain_sum[index] || data.daily.showers_sum[index],
    snow: data.daily.snowfall_sum[index],
    precipitation: Math.round(data.daily.precipitation_probability_max[index]),
  }));
}
