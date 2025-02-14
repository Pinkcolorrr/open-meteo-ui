import { useOpenMeteoData } from "@domain/open-meteo";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { useActiveDate } from "@shared/utils/date";
import { selectActiveLocation } from "@store/geo-location";
import { useAppSelector } from "@store/hooks.ts";
import { clsx } from "clsx";

import { TodayForecastCard } from "./ui/today-forecast-card.tsx";
import { toViewModel } from "./ui/today-forecast-view-model.ts";

export function TodayForecast() {
  const location = useAppSelector(selectActiveLocation);
  const { data, isLoading } = useOpenMeteoData();
  const { date } = useActiveDate();

  if (isLoading || location.status === "loading") {
    return <Skeleton className={clsx("h-[200px] mx-[24px] max-w-[734px] w-[100%] shrink-0")} />;
  }

  return data && <TodayForecastCard viewModel={toViewModel(data, date)} />;
}
