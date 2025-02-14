import { FeatureForecastItem } from "@features/future-forecast/ui/feature-forecast-item/feature-forecast-item.tsx";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { clsx } from "clsx";
import { Calendar } from "lucide-react";
import { memo } from "react";

import { FutureWeatherWidgetProps } from "./future-weather-widget-props.ts";

function FeatureForecastWidgetComponent({
  viewModel,
  onDateSelected,
  activeDate,
}: FutureWeatherWidgetProps) {
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
            <FeatureForecastItem viewModel={model} />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

export const FeatureForecastWidget = memo(FeatureForecastWidgetComponent);
FeatureForecastWidget.displayName = "FeatureForecastWidget";
