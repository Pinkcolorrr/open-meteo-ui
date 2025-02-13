import { useWeatherCondition } from "@shared/hooks/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";
import { clsx } from "clsx";
import { Minus, Thermometer } from "lucide-react";

import { FeatureWeatherViewModel } from "../feature-weather-view-model.ts";

export function FeatureWeatherItem(params: FeatureWeatherViewModel) {
  const { Icon, condition } = useWeatherCondition({
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
        <span className={"flex items-center gap-1"}>
          {!!params.precipitation && (condition === "snow" || condition === "rain") && (
            <span className={"text-sm"}>{params.precipitation}%</span>
          )}
          <Icon />
        </span>

        <span className={"flex gap-1 w-[112px] justify-end items-center"}>
          {
            <Temperature
              className={"w-[35px] pr-[8px] inline-block text-center"}
              temperature={params.minTemperature}
            />
          }
          <Minus />
          {
            <Temperature
              className={"w-[35px] pr-[8px] inline-block text-center"}
              temperature={params.maxTemperature}
            />
          }
          <Thermometer />
        </span>
      </span>
    </div>
  );
}
