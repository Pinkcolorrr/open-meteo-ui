import {
  CurrentVariable,
  DailyVariable,
  HourlyVariable,
  WeatherData,
} from "@atombrenner/openmeteo";
import { getDayStart } from "@shared/date";

export interface CurrentWeatherViewProps {
  viewModel: CurrentWeatherViewModel;
}

export interface CurrentWeatherViewModel {
  location: string;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
  clouds: number;
  rain: number;
  snow: number;
  isUserLocation: boolean;
  date: Date;
}

export function toViewModel(
  data: WeatherData<HourlyVariable, DailyVariable, CurrentVariable>,
  name: string,
  isUserLocation: boolean,
  date: Date,
): CurrentWeatherViewModel {
  const isToday = date.getTime() === getDayStart(new Date()).getTime();
  const searchDayIndex = data.daily.time.findIndex((day) => day * 1000 === date.getTime());

  if (isToday) {
    return {
      location: name ?? "",
      temperature: Math.round(data.current.temperature_2m),
      maxTemperature: Math.round(data.daily.temperature_2m_max[0]),
      minTemperature: Math.round(data.daily.temperature_2m_min[0]),
      clouds: data.current.cloud_cover,
      rain: data.current.rain || data.current.showers,
      snow: data.current.snowfall,
      date: date,
      isUserLocation,
    };
  }

  return {
    location: name ?? "",
    temperature: Math.round(data.daily.temperature_2m_max[searchDayIndex]),
    maxTemperature: Math.round(data.daily.temperature_2m_max[searchDayIndex]),
    minTemperature: Math.round(data.daily.temperature_2m_min[searchDayIndex]),
    clouds: 0,
    rain: data.daily.rain_sum[searchDayIndex] || data.daily.showers_sum[searchDayIndex],
    snow: data.daily.snowfall_sum[searchDayIndex],
    date: date,
    isUserLocation,
  };
}
