import { clsx } from "clsx";
import { memo } from "react";

import { LocationItemProps } from "./location-item-props.ts";

export function LocationItemComponent({
  country,
  countryCode,
  name,
  title,
  isActive,
}: LocationItemProps) {
  return (
    <div
      className={clsx("p-2 bg-gray-300 rounded-lg", {
        "bg-gray-400": isActive,
      })}
    >
      {title && <div className={"text-xs uppercase"}>{title}</div>}
      <div>
        {country} <span className={"uppercase"}>({countryCode})</span>, {name}
      </div>
    </div>
  );
}

export const LocationItem = memo(LocationItemComponent);
LocationItem.displayName = "LocationItem";
