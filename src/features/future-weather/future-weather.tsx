import { useOpenMeteoData } from "@domain/open-meteo";

import { FeatureWeatherCard } from "./ui/feature-weather-card/feature-weather-card.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureWeather() {
  const { data } = useOpenMeteoData();

  return data && <FeatureWeatherCard viewModel={toViewModel(data)} />;
}
