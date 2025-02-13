import { cn } from "@shared/lib/utils";
import { HTMLAttributes } from "react";

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-neutral-900/10 dark:bg-neutral-50/10", className)}
      {...props}
    />
  );
}

export { Skeleton };
