import { Skeleton } from "@shared/ui/skeleton.tsx";

export function CurrentWeatherWidgetSkeleton() {
  return (
    <div className={"flex flex-col items-center w-fit shrink-0"}>
      <span>{new Date().toDateString()}</span>
      <Skeleton className={"w-full h-[2.5rem] mt-[4px] mb-[4px] rounded-md"} />
      <Skeleton className={"w-[71px] h-[3.75rem] rounded-md"} />
      <Skeleton className={"w-full h-[1rem] mb-[4px] mt-[4px] rounded-md"} />
      <Skeleton className={"w-full h-[1rem] mb-[4px] mt-[4px] rounded-md"} />
    </div>
  );
}
