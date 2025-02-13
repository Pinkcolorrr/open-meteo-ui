import { useWeatherCondition } from "@shared/hooks/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";

import { CurrentWeatherItemParams } from "./current-weather-item-params.ts";

export function CurrentWeatherItem({ viewModel }: CurrentWeatherItemParams) {
  const { condition, Icon } = useWeatherCondition({
    clouds: viewModel.cloud,
    rain: viewModel.rain,
    snow: viewModel.snow,
  });

  return (
    <>
      <div className={"flex flex-col items-center w-fit"}>
        <span>{new Date().toDateString()}</span>
        <span className={"uppercase text-s"}>current location</span>
        <span className={"text-2xl font-bold"}>{viewModel.location}</span>
        <Temperature temperature={viewModel.temperature} className={"text-6xl"} />
        <span className={"font-bold text-gray-500 flex gap-1 capitalize"}>
          {condition} <Icon />
        </span>
        <span>
          Max: <Temperature temperature={viewModel.maxTemperature} className={"pr-[8px]"} /> - Min:{" "}
          <Temperature temperature={viewModel.minTemperature} />
        </span>
      </div>
    </>
  );
}
