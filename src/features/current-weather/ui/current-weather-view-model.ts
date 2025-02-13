import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";

export interface CurrentWeatherViewModel {
  location: string;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  clouds: number;
  rain: number;
  snow: number;
}

export function toViewModel(
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable>,
  city: string,
): CurrentWeatherViewModel {
  return {
    location: city ?? "",
    temperature: Math.round(data.current.temperature_2m),
    maxTemperature: Math.round(data.daily.temperature_2m_max[0]),
    minTemperature: Math.round(data.daily.temperature_2m_min[0]),
    clouds: data.current.cloud_cover,
    rain: data.current.rain || data.current.showers,
    snow: data.current.snowfall,
  };
}
