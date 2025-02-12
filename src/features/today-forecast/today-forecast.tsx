import { useOpenMeteoData } from "@domain/open-meteo";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { clsx } from "clsx";

import { TodayForecastCard } from "./ui/today-forecast-card.tsx";
import { toViewModel } from "./ui/today-forecast-view-model.ts";

export function TodayForecast() {
  const { data, isLoading } = useOpenMeteoData();
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <Skeleton
        className={clsx("h-[208px] mx-[24px] w-[734px] shrink-0", { "w-[100%]": isMobile })}
      />
    );
  }

  return data && <TodayForecastCard viewModel={toViewModel(data)} />;
}
