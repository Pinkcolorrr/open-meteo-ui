import { clsx } from "clsx";

import { LocationItemProps } from "./location-item-props.ts";

export function LocationItem({ country, countryCode, city, title, isActive }: LocationItemProps) {
  return (
    <div
      className={clsx("p-2 bg-gray-300 rounded-lg mt-2", {
        "bg-gray-400": isActive,
      })}
    >
      <div className={"text-xs uppercase"}>{title}</div>
      <div>
        {country} <span className={"uppercase"}>({countryCode})</span>, {city}
      </div>
    </div>
  );
}
