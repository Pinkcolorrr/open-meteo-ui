import { useOpenMeteoData } from "@domain/open-meteo";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Skeleton } from "@shared/ui/skeleton.tsx";
import { clsx } from "clsx";

import { FeatureWeatherCard } from "./ui/feature-weather-card.tsx";
import { toViewModel } from "./ui/feature-weather-view-model.ts";

export function FutureWeather() {
  const { data, isLoading } = useOpenMeteoData();
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <Skeleton
        className={clsx("w-[370px] h-[520px] shrink-0", {
          "w-[100%]": isMobile,
        })}
      />
    );
  }

  return data && <FeatureWeatherCard viewModel={toViewModel(data)} />;
}
