import { useWeatherCondition } from "@shared/hooks/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";

import { CurrentWeatherViewModel } from "./current-weather-view-model.ts";

export function CurrentWeatherItem({
  location,
  temperature,
  maxTemperature,
  minTemperature,
  clouds,
  rain,
  snow,
}: CurrentWeatherViewModel) {
  const { condition, Icon } = useWeatherCondition({
    clouds,
    rain,
    snow,
  });

  return (
    <>
      <div className={"flex flex-col items-center w-fit"}>
        <span className={"uppercase text-xs"}>current location</span>
        <span className={"text-2xl font-bold"}>{location}</span>
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
