import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/date";
import { selectActiveLocation, selectIsUserLocation } from "@store/geo-location";
import { useAppSelector } from "@store/lib/hooks.ts";
import { useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { toViewModel } from "./ui/current-weather-view-model.ts";
import { CurrentWeatherWidget } from "./ui/current-weather-widget.tsx";
import { CurrentWeatherWidgetSkeleton } from "./ui/current-weather-widget-skeleton.tsx";

export function CurrentWeatherComponent() {
  const location = useAppSelector(selectActiveLocation);
  const isUserLocation = useAppSelector(selectIsUserLocation);
  const weather = useOpenMeteoData();
  const { date } = useActiveDate();

  const viewModel = useMemo(
    () =>
      weather.data && location.data
        ? toViewModel(weather.data, location.data.name, isUserLocation, new Date(date))
        : null,
    [weather.data, location.data, isUserLocation, date],
  );

  if (weather.isLoading) {
    return <CurrentWeatherWidgetSkeleton />;
  }

  return viewModel && <CurrentWeatherWidget viewModel={viewModel} />;
}

export function CurrentWeather() {
  return (
    <ErrorBoundary fallback={null}>
      <CurrentWeatherComponent />
    </ErrorBoundary>
  );
}
