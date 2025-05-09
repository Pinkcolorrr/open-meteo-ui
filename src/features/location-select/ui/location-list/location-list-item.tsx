import { Spinner } from "@shared/ui/spinner.tsx";
import { Clock } from "lucide-react";
import { memo } from "react";

import { LocationViewModelItem } from "../location-view-model.ts";

function LocationListItemComponent(params: LocationViewModelItem) {
  const time = Intl.DateTimeFormat("eu-EU", {
    timeZone: params.timezone,
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  return (
    <div className={"flex justify-between items-center gap-3"}>
      <div className={"whitespace-nowrap overflow-hidden shrink-1"}>
        <div
          className={"truncate"}
          title={`${params.country} (${params.countryCode}) ${params.name}`}
        >
          {params.country} ({params.countryCode}), {params.name}
        </div>
        <div className={"flex gap-1 items-center text-xs"}>
          {params.timezone} - {time} <Clock className={"size-3"} />
        </div>
      </div>
      {params.isLoading && (
        <div className={"shrink-0"}>
          <Spinner size={"small"} />
        </div>
      )}
    </div>
  );
}

export const LocationListItem = memo(LocationListItemComponent);
LocationListItem.displayName = "LocationListItem";
