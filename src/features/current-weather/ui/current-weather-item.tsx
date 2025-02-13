import { Temperature } from "@shared/ui/temperature";

import { CurrentWeatherItemParams } from "./current-weather-item-params.ts";

export function CurrentWeatherItem({ viewModel }: CurrentWeatherItemParams) {
  const cloudyMap = (cloud: number) => {
    if (cloud < 30) {
      return "Clear";
    }

    if (cloud >= 30 && cloud < 70) {
      return "Partly-cloudy";
    }

    return "Cloudy";
  };

  return (
    <>
      <div className={"flex flex-col items-center w-fit"}>
        <span>{new Date().toDateString()}</span>
        <span className={"uppercase text-s"}>current location</span>
        <span className={"text-2xl font-bold"}>{viewModel.location}</span>
        <Temperature temperature={viewModel.temperature} className={"text-6xl"} />
        <span className={"font-bold text-gray-500"}>{cloudyMap(viewModel.cloud)}</span>
        <span>
          Max: <Temperature temperature={viewModel.maxTemperature} className={"pr-[8px]"} /> - Min:{" "}
          <Temperature temperature={viewModel.minTemperature} />
        </span>
      </div>
    </>
  );
}
