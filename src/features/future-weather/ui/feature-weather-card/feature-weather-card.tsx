import { FeatureWeatherItem } from "@features/future-weather/ui/feature-weather-item/feature-weather-item.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Calendar } from "lucide-react";

import { FeatureWeatherCardParams } from "./feature-weather-card-params.ts";

export function FeatureWeatherCard(params: FeatureWeatherCardParams) {
  return (
    <Card className={"w-[312px]"}>
      <CardHeader>
        <CardTitle className={"flex"}>
          <Calendar className={"h-4"} /> 10 days forecast
        </CardTitle>
      </CardHeader>

      <CardContent>
        {params.viewModel.map((model) => (
          <FeatureWeatherItem key={model.date.getTime()} {...model} />
        ))}
      </CardContent>
    </Card>
  );
}
