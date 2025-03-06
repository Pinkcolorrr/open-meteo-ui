import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/date";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { clsx } from "clsx";
import { useCallback, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { FeatureForecastWidget } from "./ui/feature-forecast-card/feature-forecast-widget.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

function FutureForecastComponent() {
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
    [setDate],
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

export function FutureForecast() {
  return (
    <ErrorBoundary fallback={null}>
      <FutureForecastComponent />
    </ErrorBoundary>
  );
}
