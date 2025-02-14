import { useOpenMeteoData } from "@domain/open-meteo";
import { FeatureForecastWidget } from "@features/future-forecast/ui/feature-forecast-card/feature-forecast-widget.tsx";
import { useActiveDate } from "@shared/date";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { clsx } from "clsx";
import { useCallback, useMemo } from "react";

import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureForecast() {
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
      <FeatureForecastWidget
        viewModel={viewModel}
        onDateSelected={onDateSelected}
        activeDate={new Date(date)}
      />
    )
  );
}
