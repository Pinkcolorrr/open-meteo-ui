import { useOpenMeteoData } from "@domain/open-meteo";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { useActiveDate } from "@shared/utils/date";
import { useMergeRequestedStates } from "@shared/utils/resolve-multiple-state.ts";
import { selectActiveLocation } from "@store/geo-location";
import { useAppSelector } from "@store/hooks.ts";
import { clsx } from "clsx";

import { FeatureWeatherCard } from "./ui/feature-weather-card/feature-weather-card.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureWeather() {
  const weather = useOpenMeteoData();
  const isMobile = useIsMobile();
  const location = useAppSelector(selectActiveLocation);
  const { date, setDate } = useActiveDate();
  const { isLoading } = useMergeRequestedStates(location, weather);

  const onDateSelected = (date: Date) => {
    setDate(date.getTime());
  };

  if (isLoading) {
    return (
      <Skeleton
        className={clsx("w-[370px] h-[520px] shrink-0", {
          "w-[100%]": isMobile,
        })}
      />
    );
  }

  return (
    weather.data && (
      <FeatureWeatherCard
        viewModel={toViewModel(weather.data)}
        onDateSelected={onDateSelected}
        activeDate={new Date(date)}
      />
    )
  );
}
