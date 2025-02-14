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
    <div className={clsx("w-full flex items-center justify-center", { "w-full": isMobile })}>
      {!isMobile && (
        <button onClick={scrollLeft}>
          <ChevronLeft />
        </button>
      )}
      <Card title="TodayForecastCard" className={"flex-grow max-w-[734px] overflow-hidden"}>
        <CardHeader>
          <CardTitle>Today forecast</CardTitle>
        </CardHeader>
        <CardContent className={"flex gap-4 overflow-x-auto no-scrollbar pb-0"} ref={scrollRef}>
          {viewModel.map((model) => (
            <TodayForecastHourItem key={model.date} {...model} />
          ))}
        </CardContent>
      </Card>
      {!isMobile && (
        <button onClick={scrollRight}>
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
