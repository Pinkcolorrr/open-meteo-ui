import { useOpenMeteoData } from "@domain/open-meteo";
import { Skeleton } from "@shared/ui/skeleton.tsx";

import { TodayForecastCard } from "./ui/today-forecast-card.tsx";
import { toViewModel } from "./ui/today-forecast-view-model.ts";

export function TodayForecast() {
  const { data, isLoading } = useOpenMeteoData();

  if (isLoading) {
    return <Skeleton className="h-[208px] w-[734px] mx-[24px]" />;
  }

  return data && <TodayForecastCard viewModel={toViewModel(data)} />;
}
