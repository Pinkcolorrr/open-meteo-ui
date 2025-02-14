import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/date";
import { selectActiveLocation, selectIsUserLocation } from "@store/geo-location";
import { useAppSelector } from "@store/lib/hooks.ts";

import { toViewModel } from "./ui/current-weather-view-model.ts";
import { CurrentWeatherWidget } from "./ui/current-weather-widget.tsx";
import { CurrentWeatherWidgetSkeleton } from "./ui/current-weather-widget-skeleton.tsx";

export function CurrentWeather() {
  const location = useAppSelector(selectActiveLocation);
  const isUserLocation = useAppSelector(selectIsUserLocation);
  const weather = useOpenMeteoData();
  const { date } = useActiveDate();

  if (weather.isLoading) {
    return <CurrentWeatherWidgetSkeleton />;
  }

  return (
    weather.data &&
    location.data && (
      <CurrentWeatherWidget
        viewModel={toViewModel(weather.data, location.data.name, isUserLocation, new Date(date))}
      />
    )
  );
}
