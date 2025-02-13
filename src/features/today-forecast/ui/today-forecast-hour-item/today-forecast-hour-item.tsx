import { Temperature } from "@shared/ui/temperature";
import { clsx } from "clsx";
import { Moon, Sun } from "lucide-react";
import { useEffect, useRef } from "react";

import { TodayForecastViewModel } from "../today-forecast-view-model.ts";

export function TodayForecastHourItem(params: TodayForecastViewModel) {
  const isNow = params.hour === new Date().getHours();
  const ref = useRef<HTMLDivElement>(null);

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
      <span>{params.isDay ? <Sun /> : <Moon />}</span>
      <Temperature temperature={params.temperature} />
      <span className={"font-light text-gray-500"}>{isNow && "now"}</span>
    </div>
  );
}
