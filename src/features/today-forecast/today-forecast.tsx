import { useOpenMeteoData } from "@domain/open-meteo";
import { Skeleton } from "@shared/ui/skeleton.tsx";

import { TodayForecastCard } from "./ui/today-forecast-card/today-forecast-card.tsx";
import { toViewModel } from "./ui/today-forecast-view-model.ts";

export function TodayForecast() {
  const { data, error, isLoading } = useOpenMeteoData();

  if (isLoading) {
    return <Skeleton className="h-[208px] w-[734px] mx-[24px]" />;
  }

  if (error) {
    return <div>error fetching dara</div>;
  }

  return data && <TodayForecastCard viewModel={toViewModel(data)} />;
}
