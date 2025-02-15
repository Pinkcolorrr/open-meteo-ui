import { useWeatherCondition } from "@shared/hooks/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";
import { clsx } from "clsx";
import { Minus, Thermometer } from "lucide-react";
import { memo } from "react";

import { FeatureWeatherItemProps } from "./feature-weather-item-props.ts";

function FeatureForecastItemComponent({ viewModel }: FeatureWeatherItemProps) {
  const { Icon, condition } = useWeatherCondition({
    rain: viewModel.rain,
    snow: viewModel.snow,
  });
  const isToday = viewModel.date.getDate() === new Date().getDate();

  return (
    <div className={"flex justify-between gap-2 border-b-2 p-2"}>
      <span className={clsx("w-[40px] text-left", { "font-bold": isToday })}>
        {isToday ? "Today" : viewModel.date.toLocaleDateString("en-US", { weekday: "short" })}
      </span>
      <span className={"flex gap-4"}>
        <span className={"flex items-center gap-1"}>
          {!!viewModel.precipitation && (condition === "snow" || condition === "rain") && (
            <span className={"text-sm"}>{viewModel.precipitation}%</span>
          )}
          <Icon />
        </span>

        <span className={"flex gap-1 w-[112px] justify-end items-center"}>
          {
            <Temperature
              className={"w-[35px] pr-[8px] inline-block text-center"}
              temperature={viewModel.minTemperature}
            />
          }
          <Minus />
          {
            <Temperature
              className={"w-[35px] pr-[8px] inline-block text-center"}
              temperature={viewModel.maxTemperature}
            />
          }
          <Thermometer />
        </span>
      </span>
    </div>
  );
}

export const FeatureForecastItem = memo(FeatureForecastItemComponent);
FeatureForecastItem.displayName = "FeatureForecastItem";
