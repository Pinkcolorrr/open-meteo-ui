import { getHourStart } from "@shared/date";
import { useWeatherCondition } from "@shared/hooks/resolve-weather-conditions.ts";
import { Temperature } from "@shared/ui/temperature";
import { clsx } from "clsx";
import { useEffect, useRef } from "react";

import { TodayForecastViewModel } from "../today-forecast-view-model.ts";

export function TodayForecastHourItem(params: TodayForecastViewModel) {
  const isNow = params.date === getHourStart().getTime();
  const ref = useRef<HTMLDivElement>(null);
  const { Icon } = useWeatherCondition({
    snow: params.snow,
    clouds: params.clouds,
    rain: params.rain,
    isNight: !params.isDay,
  });

  useEffect(() => {
    if (isNow) {
      ref.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, [ref, isNow]);

  const formatHour = (hour: number) => {
    return String(new Date(hour).getHours()).padStart(2, "0");
  };

  return (
    <div
      ref={ref}
      className={clsx("flex flex-col items-center gap-2 relative pb-[1.5rem]", {
        "font-bold": isNow,
      })}
    >
      <span>{formatHour(params.date)}</span>
      <span>{<Icon />}</span>
      <Temperature temperature={params.temperature} />
      <span className={"font-light absolute bottom-0 text-gray-500"}>{isNow && "now"}</span>
    </div>
  );
}
