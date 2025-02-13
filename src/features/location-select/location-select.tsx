import { openMeteoGeoApi, OpenMeteoGeoResponse } from "@domain/open-meteo";
import { useCurrentLocationName } from "@domain/osm";
import { LocationList } from "@features/location-select/ui/location-list.tsx";
import { toViewModel } from "@features/location-select/ui/location-view-model.ts";
import { useDebounce } from "@shared/hooks/use-debounce";
import { Input } from "@shared/ui/input.tsx";
import { Progress } from "@shared/ui/progress.tsx";
import { useState } from "react";

export function LocationSelect() {
  const [getLocations, { isFetching }] = openMeteoGeoApi.useLazySearchLocationQuery();
  const [searchResults, setSearchResults] = useState<OpenMeteoGeoResponse>();
  const [data] = useCurrentLocationName();

  const search = useDebounce(async (value: string) => {
    if (value.length > 1) {
      const response = await getLocations(value);
      setSearchResults(response.data);
    }
  });

  return (
    <div className={"p-4"}>
      <Input placeholder={"Location name"} onInput={(event) => search(event.currentTarget.value)} />
      {isFetching && <Progress />}
      <LocationList {...toViewModel(searchResults, data!)} />
    </div>
  );
}
