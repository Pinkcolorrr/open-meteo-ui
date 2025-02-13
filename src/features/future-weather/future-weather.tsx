import { useOpenMeteoData } from "@domain/open-meteo";
import { Skeleton } from "@shared/ui/skeleton.tsx";

import { FeatureWeatherCard } from "./ui/feature-weather-card.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureWeather() {
  const { data, isLoading } = useOpenMeteoData();

  if (isLoading) {
    return <Skeleton className={"w-[312px] h-[520px]"} />;
  }

  return data && <FeatureWeatherCard viewModel={toViewModel(data)} />;
}
