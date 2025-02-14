import { useWeatherCondition } from "@shared/hooks/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";

import { CurrentWeatherViewProps } from "./current-weather-view-model.ts";

export function CurrentWeatherWidget({
  viewModel: {
    location,
    temperature,
    maxTemperature,
    minTemperature,
    clouds,
    rain,
    snow,
    isUserLocation,
    date,
  },
}: CurrentWeatherViewProps) {
  const { condition, Icon } = useWeatherCondition({
    clouds,
    rain,
    snow,
  });

  return (
    <>
      <div className={"flex flex-col items-center w-fit"}>
        <span>{date.toDateString()}</span>
        <span className={"text-2xl font-bold relative pt-3 px-3 mt-1"}>
          {isUserLocation && (
            <span className={"uppercase text-xs absolute top-0 left-0 right-0 leading-4"}>
              current location
            </span>
          )}
          {location}
        </span>
        <Temperature temperature={temperature} className={"text-6xl"} />
        <span className={"font-bold text-gray-500 flex gap-1 capitalize"}>
          {condition} <Icon />
        </span>
        <span>
          Max: <Temperature temperature={maxTemperature} className={"pr-[8px]"} /> - Min:{" "}
          <Temperature temperature={minTemperature} />
        </span>
      </div>
    </>
  );
}
