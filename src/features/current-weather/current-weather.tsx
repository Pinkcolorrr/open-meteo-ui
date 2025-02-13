import { useOpenMeteoData } from "@domain/open-meteo";
import { useGeoLocation } from "@shared/utils/geo-location";

import { CurrentWeatherItem } from "./ui/current-weather-item.tsx";
import { CurrentWeatherItemSkeleton } from "./ui/current-weather-item-skeleton.tsx";
import { toViewModel } from "./ui/current-weather-view-model.ts";

export function CurrentWeather() {
  const { data, isLoading } = useOpenMeteoData();
  const { location, isLoading: isGeoLoading } = useGeoLocation();

  if (isLoading || isGeoLoading) {
    return <CurrentWeatherItemSkeleton />;
  }

  return data && location && <CurrentWeatherItem {...toViewModel(data, location.city)} />;
}
