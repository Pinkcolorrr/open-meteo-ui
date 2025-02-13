import { Skeleton } from "@shared/ui/skeleton.tsx";

import { TodayForecastCard } from "./ui/today-forecast-card/today-forecast-card.tsx";
import { toViewModel } from "./ui/today-forecast-card/today-forecast-card-utils.ts";
import { useTodayForecastData } from "./use-today-forecast-data.tsx";

export function TodayForecast() {
  const [data, isLoading, error] = useTodayForecastData();

  if (isLoading) {
    return <Skeleton className="h-[100px] w-[250px]" />;
  }

  if (error) {
    return <div>error fetching dara</div>;
  }

  return data && <TodayForecastCard viewModel={toViewModel(data)} />;
}
