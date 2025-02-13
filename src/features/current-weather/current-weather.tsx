import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveLocation } from "@shared/utils/geo-location";

import { CurrentWeatherItem } from "./ui/current-weather-item.tsx";
import { CurrentWeatherItemSkeleton } from "./ui/current-weather-item-skeleton.tsx";
import { toViewModel } from "./ui/current-weather-view-model.ts";

export function CurrentWeather() {
  const { data, isLoading } = useOpenMeteoData();
  const { location, isUserLocation } = useActiveLocation();

  if (isLoading) {
    return <CurrentWeatherItemSkeleton />;
  }

  return (
    data &&
    location && (
      <CurrentWeatherItem {...toViewModel(data, location.city, isUserLocation, new Date())} />
    )
  );
}
