import { useOpenMeteoData } from "@domain/open-meteo";
import {  useCurrentLocationName } from "@domain/osm";
import { CurrentWeatherItemSkeleton } from "@features/current-weather/ui/current-weather-item-skeleton.tsx";

import { CurrentWeatherItem } from "./ui/current-weather-item.tsx";
import { toViewModel } from "./ui/current-weather-view-model.ts";

export function CurrentWeather() {
  const { data, error, isLoading } = useOpenMeteoData();
  const [locationNameData, locationNameLoading] = useCurrentLocationName()

  if (error) {
    return <div>error fetching dara</div>;
  }

  return isLoading || locationNameLoading ? (
    <CurrentWeatherItemSkeleton />
  ) : (
    data && <CurrentWeatherItem viewModel={toViewModel(data, locationNameData!.address.city)} />
  );
}
