import { useOpenMeteoData } from "@domain/open-meteo";
import { useActiveDate } from "@shared/utils/date";
import { useMergeRequestedStates } from "@shared/utils/resolve-multiple-state.ts";
import { selectActiveLocation, selectIsUserLocation } from "@store/geo-location";
import { useAppSelector } from "@store/hooks.ts";

import { CurrentWeatherItem } from "./ui/current-weather-item.tsx";
import { CurrentWeatherItemSkeleton } from "./ui/current-weather-item-skeleton.tsx";
import { toViewModel } from "./ui/current-weather-view-model.ts";

export function CurrentWeather() {
  const location = useAppSelector(selectActiveLocation);
  const isUserLocation = useAppSelector(selectIsUserLocation);
  const weather = useOpenMeteoData();
  const { date } = useActiveDate();
  const { isLoading } = useMergeRequestedStates(location, weather);

  if (isLoading) {
    return <CurrentWeatherItemSkeleton />;
  }

  return (
    weather.data &&
    location.data && (
      <CurrentWeatherItem
        {...toViewModel(weather.data, location.data.name, isUserLocation, new Date(date))}
      />
    )
  );
}
