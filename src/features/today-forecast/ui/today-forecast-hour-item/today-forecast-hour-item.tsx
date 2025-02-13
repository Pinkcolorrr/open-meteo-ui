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

  return (
    <div
      ref={ref}
      className={clsx("flex flex-col items-center gap-2", {
        "font-bold": isNow,
      })}
    >
      <span>{params.hour}</span>
      <span>{params.isDay ? <Sun /> : <Moon />}</span>
      <span>{params.temperature}</span>
      <span className={"font-light text-gray-500"}>{isNow && "now"}</span>
    </div>
  );
}
