import { openMeteoGeoApi, OpenMeteoGeoResponse } from "@domain/open-meteo";
import { LocationItem } from "@features/location-select/ui/location-item/location-item.tsx";
import { useDebounce } from "@shared/hooks/use-debounce";
import { Coords } from "@shared/models/coords.ts";
import { Input } from "@shared/ui/input.tsx";
import { useActiveLocation, useCurrentGeoLocation } from "@shared/utils/geo-location";
import { Frown } from "lucide-react";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { LocationList } from "./ui/location-list.tsx";
import { LocationViewModelItem, toViewModel } from "./ui/location-view-model.ts";
import { SkeletonLocationList } from "./ui/skeleton-location-list.tsx";

export function LocationSelect() {
  const [getLocations, { isFetching, isSuccess }] = openMeteoGeoApi.useLazySearchLocationQuery();
  const [searchResults, setSearchResults] = useState<OpenMeteoGeoResponse>();
  const { location: userLocation } = useCurrentGeoLocation();
  const { location: currentLocation, isUserLocation } = useActiveLocation();
  const navigate = useNavigate();

  const search = useDebounce(async (value: string) => {
    if (value.length > 1) {
      const response = await getLocations(value);
      setSearchResults(response.data);
    }
  });

  const navigateToLocation = ({ lat, lon }: Coords) => {
    navigate({
      pathname: "",
      search: createSearchParams({
        lat: lat.toString(),
        lon: lon.toString(),
      }).toString(),
    });
  };

  const onLocationSelect = (location: LocationViewModelItem) => {
    const data = searchResults?.results.find((item) => item.id === location.id);
    if (data) {
      navigateToLocation({ lon: data.longitude, lat: data.latitude });
    }
  };

  return (
    <div className={"p-4 overflow-auto"}>
      <Input placeholder={"Location name"} onInput={(event) => search(event.currentTarget.value)} />
      {userLocation && (
        <button className={"w-full text-start"}>
          <LocationItem {...userLocation} title={"current"} isActive={isUserLocation} />
        </button>
      )}
      {!isUserLocation && currentLocation && (
        <button className={"w-full text-start"}>
          <LocationItem {...currentLocation} title={"active"} isActive={true} />
        </button>
      )}
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
