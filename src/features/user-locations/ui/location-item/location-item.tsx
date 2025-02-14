import { clsx } from "clsx";

import { LocationItemProps } from "./location-item-props.ts";

export function LocationItem({ country, countryCode, name, title, isActive }: LocationItemProps) {
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
