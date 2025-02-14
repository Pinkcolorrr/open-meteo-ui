import { FeatureWeatherViewModel } from "../feature-weather-view-model.ts";

export interface FutureWeatherCardProps {
  viewModel: FeatureWeatherViewModel[];
  onDateSelected: (date: Date) => void;
  activeDate: Date;
}
