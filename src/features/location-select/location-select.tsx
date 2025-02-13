import { openMeteoGeoApi, OpenMeteoGeoResponse } from "@domain/open-meteo";
import { useDebounce } from "@shared/hooks/use-debounce";
import { Input } from "@shared/ui/input.tsx";
import { useGeoLocation } from "@shared/utils/geo-location";
import { Frown } from "lucide-react";
import { useState } from "react";

import { CurrentLocation } from "./ui/current-location.tsx";
import { LocationList } from "./ui/location-list.tsx";
import { LocationViewModelItem, toViewModel } from "./ui/location-view-model.ts";
import { SelectedLocation } from "./ui/selected-location.tsx";
import { SkeletonLocationList } from "./ui/skeleton-location-list.tsx";

export function LocationSelect() {
  const [getLocations, { isFetching, isSuccess }] = openMeteoGeoApi.useLazySearchLocationQuery();
  const [searchResults, setSearchResults] = useState<OpenMeteoGeoResponse>();
  const { location, setLocation } = useGeoLocation();

  const search = useDebounce(async (value: string) => {
    if (value.length > 1) {
      const response = await getLocations(value);
      setSearchResults(response.data);
    }
  });

  const onLocationSelect = (location: LocationViewModelItem) => {
    const item = searchResults?.results.find((item) => item.id === location.id);
    if (item) {
      setLocation({
        lat: item.latitude,
        lon: item.longitude,
        city: item.name,
        country: item.country,
        countryCode: item.country_code,
        timezone: item.timezone,
      });
    }
  };

  return (
    <div className={"p-4"}>
      <Input placeholder={"Location name"} onInput={(event) => search(event.currentTarget.value)} />
      {location && <CurrentLocation {...location} />}
      <SelectedLocation />
      {isFetching && <SkeletonLocationList />}
      {searchResults?.results && !isFetching && (
        <LocationList viewModel={toViewModel(searchResults)} onLocationSelect={onLocationSelect} />
      )}
      {isSuccess && !searchResults?.results?.length && !isFetching && (
        <div className={"my-2"}>
          <div className={"flex gap-1"}>
            Nothing found <Frown />
          </div>
          <div className={"text-sm"}>please try another query</div>
        </div>
      )}
    </div>
  );
}
