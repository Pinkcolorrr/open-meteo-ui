import { useOpenMeteoData } from "@domain/open-meteo";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { useActiveDate } from "@shared/utils/date";
import { clsx } from "clsx";

import { FeatureWeatherCard } from "./ui/feature-weather-card/feature-weather-card.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureWeather() {
  const { data, isLoading } = useOpenMeteoData();
  const isMobile = useIsMobile();
  const { date, setDate } = useActiveDate();

  const onDateSelected = (date: Date) => {
    setDate(date.getTime());
  };

  if (isLoading) {
    return (
      <Skeleton
        className={clsx("w-[370px] h-[520px] shrink-0", {
          "w-[100%]": isMobile,
        })}
      />
    );
  }

  return (
    data && (
      <FeatureWeatherCard
        viewModel={toViewModel(data)}
        onDateSelected={onDateSelected}
        activeDate={new Date(date)}
      />
    )
  );
}
