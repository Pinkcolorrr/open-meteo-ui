import { Skeleton } from "@shared/ui/skeleton.tsx";

export function SkeletonLocationList() {
  return (
    <ul>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((value) => (
        <li key={value}>
          <Skeleton className={"w-full h-[50px] my-2"} />
        </li>
      ))}
    </ul>
  );
}
