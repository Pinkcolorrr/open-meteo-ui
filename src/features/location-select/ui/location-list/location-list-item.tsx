import { Clock } from "lucide-react";

import { LocationViewModelItem } from "../location-view-model.ts";

export function LocationListItem(params: LocationViewModelItem) {
  const time = Intl.DateTimeFormat("eu-EU", {
    timeZone: params.timezone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return (
    <div className={"flex justify-between items-center"}>
      <div>
        <div>
          {params.country} ({params.countryCode}), {params.name}
        </div>
        <div className={"flex gap-1 items-center text-xs"}>
          {params.timezone} - {time} <Clock className={"size-3"} />
        </div>
      </div>
    </div>
  );
}
