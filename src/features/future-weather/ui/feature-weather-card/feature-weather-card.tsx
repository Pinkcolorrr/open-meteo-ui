import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { clsx } from "clsx";
import { Calendar } from "lucide-react";

import { FeatureWeatherItem } from "../feature-weather-item/feature-weather-item.tsx";
import { FutureWeatherCardProps } from "./future-weather-card-props.ts";

export function FeatureWeatherCard({
  viewModel,
  onDateSelected,
  activeDate,
}: FutureWeatherCardProps) {
  const isMobile = useIsMobile();

  return (
    <Card
      className={clsx("w-[370px] h-[520px]", {
        "w-[100%]": isMobile,
      })}
    >
      <CardHeader>
        <CardTitle className={"flex"}>
          <Calendar className={"h-4"} /> 10 days forecast
        </CardTitle>
      </CardHeader>

      <CardContent className={clsx({ "font-sm": isMobile })}>
        {viewModel.map((model, index) => (
          <button
            className={clsx("w-full hover:bg-gray-100", {
              "rounded-md": index === 0,
              "bg-gray-200": model.date.getTime() === activeDate.getTime(),
            })}
            key={model.date.getTime()}
            onClick={() => onDateSelected(model.date)}
          >
            <FeatureWeatherItem {...model} />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}
