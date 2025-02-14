import { useOpenMeteoData } from "@domain/open-meteo";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { useActiveDate } from "@shared/utils/date";
import { useMergeRequestedStates } from "@shared/utils/resolve-multiple-state.ts";
import { selectActiveLocation } from "@store/geo-location";
import { useAppSelector } from "@store/hooks.ts";
import { clsx } from "clsx";

import { TodayForecastCard } from "./ui/today-forecast-card.tsx";
import { toViewModel } from "./ui/today-forecast-view-model.ts";

export function TodayForecast() {
  const location = useAppSelector(selectActiveLocation);
  const weather = useOpenMeteoData();
  const { date } = useActiveDate();
  const { isLoading } = useMergeRequestedStates(location, weather);

  if (isLoading) {
    return <Skeleton className={clsx("h-[200px] mx-[24px] max-w-[734px] w-[100%] shrink-0")} />;
  }

  return weather.data && <TodayForecastCard viewModel={toViewModel(weather.data, date)} />;
}
