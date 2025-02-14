import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/utils/date";
import { selectActiveLocation, selectIsUserLocation } from "@store/geo-location";
import { useAppSelector } from "@store/hooks.ts";

import { CurrentWeatherItem } from "./ui/current-weather-item.tsx";
import { CurrentWeatherItemSkeleton } from "./ui/current-weather-item-skeleton.tsx";
import { toViewModel } from "./ui/current-weather-view-model.ts";

export function CurrentWeather() {
  const location = useAppSelector(selectActiveLocation);
  const isUserLocation = useAppSelector(selectIsUserLocation);
  const { data, isLoading } = useOpenMeteoData();
  const { date } = useActiveDate();

  if (isLoading || location.status === "loading") {
    return <CurrentWeatherItemSkeleton />;
  }

  return (
    data &&
    location.data && (
      <CurrentWeatherItem
        {...toViewModel(data, location.data.city, isUserLocation, new Date(date))}
      />
    )
  );
}
