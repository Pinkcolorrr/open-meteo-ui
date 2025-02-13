import { Clock } from "lucide-react";

import { LocationViewModelItem } from "./location-view-model.ts";

export function LocationListItem(params: LocationViewModelItem) {
  return (
    <>
      <div>
        {params.country} ({params.countryCode}), {params.name}
      </div>
      <div className={"flex gap-1 items-center text-xs"}>
        {params.timezone} <Clock className={"size-3"} />
      </div>
    </>
  );
}
