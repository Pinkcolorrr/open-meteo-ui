import { useWeatherCondition } from "@shared/hooks/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";
import { clsx } from "clsx";
import { useEffect, useRef } from "react";

import { TodayForecastViewModel } from "../today-forecast-view-model.ts";

export function TodayForecastHourItem(params: TodayForecastViewModel) {
  const isNow = params.hour === new Date().getHours();
  const ref = useRef<HTMLDivElement>(null);
  const { Icon } = useWeatherCondition({
    snow: params.snow,
    clouds: params.clouds,
    rain: params.rain,
    isNight: !params.isDay,
  });

  useEffect(() => {
    if (isNow) {
      ref.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [ref, isNow]);

  const formatHour = (hour: number) => {
    return String(hour).padStart(2, "0");
  };

  return (
    <div
      ref={ref}
      className={clsx("flex flex-col items-center gap-2", {
        "font-bold": isNow,
      })}
    >
      <span>{formatHour(params.hour)}</span>
      <span>{<Icon />}</span>
      <Temperature temperature={params.temperature} />
      <span className={"font-light text-gray-500"}>{isNow && "now"}</span>
    </div>
  );
}
