import { openMeteoGeoApi, OpenMeteoGeoResponse } from "@domain/open-meteo";
import { useDebounceValue } from "@shared/hooks/use-debounce-value.tsx";
import { Input } from "@shared/ui/input.tsx";
import { selectActiveLocation } from "@store/geo-location";
import { useAppSelector } from "@store/lib/hooks.ts";
import { Frown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { LocationList } from "./ui/location-list/location-list.tsx";
import { SkeletonLocationList } from "./ui/location-list/skeleton-location-list.tsx";
import { LocationViewModelItem, toViewModel } from "./ui/location-view-model.ts";

export function LocationSelectComponent() {
  const [getLocations, { isFetching }] = openMeteoGeoApi.useLazySearchLocationQuery();
  const [searchResults, setSearchResults] = useState<OpenMeteoGeoResponse | null>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue<string>(query);
  const activeLocation = useAppSelector(selectActiveLocation);
  const [params] = useSearchParams();
  const lat = params.has("lat") && Number(params.get("lat"));
  const lon = params.has("lon") && Number(params.get("lon"));
  const viewModel = useMemo(
    () =>
      searchResults?.results
        ? toViewModel(
            searchResults?.results,
            activeLocation.isLoading,
            lat && lon ? { lat, lon } : null,
          )
        : [],
    [searchResults, lat, lon, activeLocation.isLoading],
  );

  useEffect(() => {
    search(debouncedQuery);
  }, [debouncedQuery]);

  const search = async (value: string) => {
    if (value.length < 2) {
      setSearchResults(null);
      return;
    }
    const response = await getLocations(value);
    if (response.data) {
      setSearchResults(response.data);
    }
  };

  const onLocationSelect = useCallback(
    (location: LocationViewModelItem) => {
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
    },
    [searchResults],
  );

  return (
    <div className={"p-4 overflow-auto"}>
      {isFetching && <SkeletonLocationList />}
      {searchResults?.results && !isFetching && query.length > 1 && (
        <LocationList viewModel={viewModel} onLocationSelect={onLocationSelect} />
      )}
      {searchResults && !searchResults.results && (
        <div className={"my-2"}>
          <div className={"flex gap-1"}>
            Nothing found <Frown />
          </div>
          <div className={"text-sm"}>please try another query</div>
        </div>
      )}
      <Input
        className={"mt-4"}
        placeholder={"Location name"}
        onInput={(event) => setQuery(event.currentTarget.value)}
      />
    </div>
  );
}

export function LocationSelect() {
  return (
    <ErrorBoundary fallback={null}>
      <LocationSelectComponent />
    </ErrorBoundary>
  );
}
