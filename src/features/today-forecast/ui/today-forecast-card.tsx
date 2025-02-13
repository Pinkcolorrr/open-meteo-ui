import { TodayForecastViewModel } from "@features/today-forecast/ui/today-forecast-view-model.ts";
import { useIsMobile } from "@shared/hooks/use-mobile.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { TodayForecastHourItem } from "./today-forecast-hour-item";

export function TodayForecastCard({ viewModel }: { viewModel: TodayForecastViewModel[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 275, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -275, behavior: "smooth" });
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
          className={clsx("flex gap-4 max-w-[700px] overflow-x-auto no-scrollbar pb-0", {
            "max-w-[700px]": !isMobile,
            "max-w-[300px]": isMobile,
          })}
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
