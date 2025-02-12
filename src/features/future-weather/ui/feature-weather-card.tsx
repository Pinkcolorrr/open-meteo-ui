import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { clsx } from "clsx";
import { Calendar } from "lucide-react";

import { FeatureWeatherItem } from "./feature-weather-item/feature-weather-item.tsx";
import { FeatureWeatherViewModel } from "./feature-weather-view-model.ts";

export function FeatureWeatherCard({ viewModel }: { viewModel: FeatureWeatherViewModel[] }) {
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
        {viewModel.map((model) => (
          <FeatureWeatherItem key={model.date.getTime()} {...model} />
        ))}
      </CardContent>
    </Card>
  );
}
