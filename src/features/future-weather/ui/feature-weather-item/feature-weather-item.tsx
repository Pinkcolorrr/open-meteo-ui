import { useWeatherCondition } from "@shared/lib/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";
import { clsx } from "clsx";
import { Thermometer } from "lucide-react";

import { FeatureWeatherViewModel } from "../feature-weather-view-model.ts";

export function FeatureWeatherItem(params: FeatureWeatherViewModel) {
  const { Icon } = useWeatherCondition({
    rain: params.rain,
    snow: params.snow,
  });
  const isToday = params.date.getDate() === new Date().getDate();

  return (
    <div className={"flex justify-between gap-2 border-b-2 p-2"}>
      <span className={clsx("w-[40px] text-left", { "font-bold": isToday })}>
        {isToday ? "Today" : params.date.toLocaleDateString("en-US", { weekday: "short" })}
      </span>
      <span className={"flex gap-4"}>
        <Icon />
        <span className={"flex gap-1"}>
          {<Temperature className={"pr-[8px]"} temperature={params.minTemperature} />} -
          {<Temperature temperature={params.maxTemperature} />}
          <Thermometer />
        </span>
      </span>
    </div>
  );
}
