import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { TodayForecastHourItem } from "../today-forecast-hour-item";
import { TodayForecastCardParams } from "./today-forecast-card-params";

export function TodayForecastCard(params: TodayForecastCardParams) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    scrollRef.current?.scrollTo({ left: scrollRef.current.scrollWidth, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <div className={"w-fit flex items-center"}>
      <button onClick={scrollLeft}>
        <ChevronLeft />
      </button>
      <Card title="TodayForecastCard">
        <CardHeader>
          <CardTitle>Today forecast</CardTitle>
        </CardHeader>
        <CardContent
          className={"flex gap-3 max-w-[700px] overflow-x-auto no-scrollbar pb-0"}
          ref={scrollRef}
        >
          {params.viewModel.map((model) => (
            <TodayForecastHourItem key={model.hour} {...model} />
          ))}
        </CardContent>
      </Card>
      <button onClick={scrollRight}>
        <ChevronRight />
      </button>
    </div>
  );
}
