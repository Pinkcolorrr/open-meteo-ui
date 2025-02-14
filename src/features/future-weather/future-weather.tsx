import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/date";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { clsx } from "clsx";

import { FeatureWeatherWidget } from "./ui/feature-weather-card/feature-weather-widget.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureWeather() {
  const weather = useOpenMeteoData();
  const isMobile = useIsMobile();
  const { date, setDate } = useActiveDate();

  const onDateSelected = (date: Date) => {
    setDate(date.getTime());
  };

  if (weather.isLoading) {
    return (
      <Skeleton
        className={clsx("w-[370px] h-[520px] shrink-0", {
          "w-[100%]": isMobile,
        })}
      />
    );
  }

  return (
    weather.data && (
      <FeatureWeatherWidget
        viewModel={toViewModel(weather.data)}
        onDateSelected={onDateSelected}
        activeDate={new Date(date)}
      />
    )
  );
}
