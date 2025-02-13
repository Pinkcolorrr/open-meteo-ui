import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Calendar } from "lucide-react";

import { FeatureWeatherItem } from "./feature-weather-item/feature-weather-item.tsx";
import { FeatureWeatherViewModel } from "./feature-weather-view-model.ts";

export function FeatureWeatherCard({ viewModel }: { viewModel: FeatureWeatherViewModel[] }) {
  return (
    <Card className={"w-[370px]"}>
      <CardHeader>
        <CardTitle className={"flex"}>
          <Calendar className={"h-4"} /> 10 days forecast
        </CardTitle>
      </CardHeader>

      <CardContent>
        {viewModel.map((model) => (
          <FeatureWeatherItem key={model.date.getTime()} {...model} />
        ))}
      </CardContent>
    </Card>
  );
}
