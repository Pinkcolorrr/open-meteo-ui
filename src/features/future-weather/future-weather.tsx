import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/date";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { clsx } from "clsx";
import { useCallback, useMemo } from "react";

import { FeatureWeatherWidget } from "./ui/feature-weather-card/feature-weather-widget.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureWeather() {
  const weather = useOpenMeteoData();
  const isMobile = useIsMobile();
  const { date, setDate } = useActiveDate();
  const viewModel = useMemo(
    () => (weather.data ? toViewModel(weather.data) : null),
    [weather.data],
  );

  const onDateSelected = useCallback(
    (date: Date) => {
      setDate(date.getTime());
    },
    [date],
  );

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
    viewModel && (
      <FeatureWeatherWidget
        viewModel={viewModel}
        onDateSelected={onDateSelected}
        activeDate={new Date(date)}
      />
    )
  );
}
