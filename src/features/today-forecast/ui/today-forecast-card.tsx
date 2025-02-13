import { TodayForecastViewModel } from "@features/today-forecast/ui/today-forecast-view-model.ts";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { TodayForecastHourItem } from "./today-forecast-hour-item";

export function TodayForecastCard({ viewModel }: { viewModel: TodayForecastViewModel[] }) {
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
          className={"flex gap-4 max-w-[700px] overflow-x-auto no-scrollbar pb-0"}
          ref={scrollRef}
        >
          {viewModel.map((model) => (
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
