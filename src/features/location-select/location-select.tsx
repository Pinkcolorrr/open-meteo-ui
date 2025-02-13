import { openMeteoGeoApi, OpenMeteoGeoResponse } from "@domain/open-meteo";
import { useDebounce } from "@shared/hooks/use-debounce";
import { Input } from "@shared/ui/input.tsx";
import { useCurrentLocation, useUserGeoLocation } from "@shared/utils/geo-location";
import { Frown } from "lucide-react";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { LocationList } from "./ui/location-list.tsx";
import { LocationViewModelItem, toViewModel } from "./ui/location-view-model.ts";
import { SkeletonLocationList } from "./ui/skeleton-location-list.tsx";
import { UserLocation } from "./ui/user-location.tsx";

export function LocationSelect() {
  const [getLocations, { isFetching, isSuccess }] = openMeteoGeoApi.useLazySearchLocationQuery();
  const [searchResults, setSearchResults] = useState<OpenMeteoGeoResponse>();
  const { location: userLocation } = useUserGeoLocation();
  const { location: currentLocation } = useCurrentLocation();
  const navigate = useNavigate();

  const search = useDebounce(async (value: string) => {
    if (value.length > 1) {
      const response = await getLocations(value);
      setSearchResults(response.data);
    }
  });

  const onLocationSelect = (location: LocationViewModelItem) => {
    const data = searchResults?.results.find((item) => item.id === location.id);
    if (data) {
      navigate({
        pathname: "",
        search: createSearchParams({
          lat: data.latitude.toString(),
          lon: data.longitude.toString(),
        }).toString(),
      });
    }
  };

  return (
    <div className={"p-4"}>
      <Input placeholder={"Location name"} onInput={(event) => search(event.currentTarget.value)} />
      {userLocation && <UserLocation {...userLocation} />}
      {currentLocation && <UserLocation {...currentLocation} />}
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
