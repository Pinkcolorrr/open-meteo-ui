import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/date";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { clsx } from "clsx";
import { ErrorBoundary } from "react-error-boundary";

import { toViewModel } from "./ui/today-forecast-view-model.ts";
import { TodayForecastWidget } from "./ui/today-forecast-widget.tsx";

function TodayForecastComponent() {
  const weather = useOpenMeteoData();
  const { date } = useActiveDate();

  if (weather.isLoading) {
    return <Skeleton className={clsx("h-[200px] mx-[24px] max-w-[734px] w-[100%] shrink-0")} />;
  }

  return weather.data && <TodayForecastWidget viewModel={toViewModel(weather.data, date)} />;
}

export function TodayForecast() {
  return (
    <ErrorBoundary fallback={null}>
      <TodayForecastComponent />
    </ErrorBoundary>
  );
}
