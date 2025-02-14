import { FeatureWeatherViewModel } from "../feature-weather-view-model.ts";

export interface FutureWeatherWidgetProps {
  viewModel: FeatureWeatherViewModel[];
  onDateSelected: (date: Date) => void;
  activeDate: Date;
}
